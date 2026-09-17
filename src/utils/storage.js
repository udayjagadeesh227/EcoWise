// LocalStorage management for EcoWise
const STORAGE_KEYS = {
  CURRENT_USER: 'ecowise_currentUser',
  USERS: 'ecowise_users',
  ECO_SCORE: 'ecowise_ecoScore',
  WASTE_SORTED: 'ecowise_wasteSorted',
  WASTE_COUNTS: 'ecowise_wasteCounts',
  CHALLENGES: 'ecowise_challenges',
  QUIZ_SCORE: 'ecowise_quizScore',
  DAY_STREAK: 'ecowise_dayStreak',
  BADGES: 'ecowise_badges',
  ACTIVITY_HISTORY: 'ecowise_activityHistory',
  CHAT_HISTORY: 'ecowise_chatHistory',
};

// Default initial state for a new eco-warrior
const DEFAULT_USER = {
  name: 'Eco Warrior',
  email: 'warrior@ecowise.earth',
  isGuest: false,
  joinedDate: '2026-09-01'
};

const DEFAULT_WASTE_COUNTS = {
  wetWaste: 3,
  dryWaste: 2,
  recyclable: 3,
  eWaste: 1,
  donateReuse: 1,
  hazardous: 1,
  total: 11
};

export const getStorage = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e);
    return fallback;
  }
};

export const setStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error writing ${key} to localStorage`, e);
  }
};

// Auth helpers
export const getCurrentUser = () => {
  return getStorage(STORAGE_KEYS.CURRENT_USER, DEFAULT_USER);
};

export const setCurrentUser = (user) => {
  setStorage(STORAGE_KEYS.CURRENT_USER, user);
};

export const logoutUser = () => {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
};

export const registerUser = (userData) => {
  const users = getStorage(STORAGE_KEYS.USERS, []);
  const existing = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
  if (existing) {
    throw new Error('An account with this email already exists.');
  }
  const newUser = {
    ...userData,
    joinedDate: new Date().toISOString().split('T')[0]
  };
  users.push(newUser);
  setStorage(STORAGE_KEYS.USERS, users);
  setCurrentUser(newUser);
  return newUser;
};

export const loginUser = (email, password) => {
  const users = getStorage(STORAGE_KEYS.USERS, []);
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (!user) {
    // For demo convenience, if credentials don't match existing users, create demo user
    if (email && password) {
      const demoUser = {
        name: email.split('@')[0].replace('.', ' '),
        email,
        joinedDate: new Date().toISOString().split('T')[0]
      };
      setCurrentUser(demoUser);
      return demoUser;
    }
    throw new Error('Invalid email or password.');
  }
  setCurrentUser(user);
  return user;
};

export const continueAsGuest = () => {
  const guestUser = {
    name: 'Guest Explorer',
    email: 'guest@ecowise.earth',
    isGuest: true,
    joinedDate: new Date().toISOString().split('T')[0]
  };
  setCurrentUser(guestUser);
  return guestUser;
};

// ===================== WASTE SEGREGATION COUNTS =====================
export const getWasteCounts = () => {
  const stored = getStorage(STORAGE_KEYS.WASTE_COUNTS, null);
  if (stored) {
    const wetWaste = Number(stored.wetWaste) || 0;
    const dryWaste = Number(stored.dryWaste) || 0;
    const recyclable = Number(stored.recyclable) || 0;
    const eWaste = Number(stored.eWaste) || 0;
    const donateReuse = Number(stored.donateReuse) || 0;
    const hazardous = Number(stored.hazardous) || 0;
    const total = wetWaste + dryWaste + recyclable + eWaste + donateReuse + hazardous;
    return { wetWaste, dryWaste, recyclable, eWaste, donateReuse, hazardous, total };
  }

  // Safe fallback if user has existing legacy WASTE_SORTED
  const legacyTotal = getStorage(STORAGE_KEYS.WASTE_SORTED, null);
  if (typeof legacyTotal === 'number' && legacyTotal > 0) {
    const counts = {
      wetWaste: Math.floor(legacyTotal * 0.35),
      dryWaste: Math.floor(legacyTotal * 0.2),
      recyclable: Math.floor(legacyTotal * 0.25),
      eWaste: Math.max(1, Math.floor(legacyTotal * 0.1)),
      donateReuse: Math.floor(legacyTotal * 0.05),
      hazardous: Math.max(0, legacyTotal - (Math.floor(legacyTotal * 0.35) + Math.floor(legacyTotal * 0.2) + Math.floor(legacyTotal * 0.25) + Math.max(1, Math.floor(legacyTotal * 0.1)) + Math.floor(legacyTotal * 0.05))),
      total: legacyTotal
    };
    setStorage(STORAGE_KEYS.WASTE_COUNTS, counts);
    return counts;
  }

  setStorage(STORAGE_KEYS.WASTE_COUNTS, DEFAULT_WASTE_COUNTS);
  return { ...DEFAULT_WASTE_COUNTS };
};

export const setWasteCounts = (counts) => {
  const total = (Number(counts.wetWaste) || 0) +
                (Number(counts.dryWaste) || 0) +
                (Number(counts.recyclable) || 0) +
                (Number(counts.eWaste) || 0) +
                (Number(counts.donateReuse) || 0) +
                (Number(counts.hazardous) || 0);

  const updated = { ...counts, total };
  setStorage(STORAGE_KEYS.WASTE_COUNTS, updated);
  setStorage(STORAGE_KEYS.WASTE_SORTED, total);
  window.dispatchEvent(new Event('ecowise_waste_updated'));
  return updated;
};

// Map item category key or text to counts field
export const mapCategoryToKey = (categoryOrKey) => {
  if (!categoryOrKey) return 'dryWaste';
  const str = String(categoryOrKey).toUpperCase();
  if (str.includes('WET')) return 'wetWaste';
  if (str.includes('RECYCL')) return 'recyclable';
  if (str.includes('E_WASTE') || str.includes('E-WASTE') || str.includes('ELECTRONIC')) return 'eWaste';
  if (str.includes('DONATE') || str.includes('REUSE')) return 'donateReuse';
  if (str.includes('HAZARD')) return 'hazardous';
  if (str.includes('DRY')) return 'dryWaste';
  return 'dryWaste';
};

export const getCategoryDisplayName = (keyOrField) => {
  const map = {
    wetWaste: 'Wet Waste',
    dryWaste: 'Dry Waste',
    recyclable: 'Recyclable',
    eWaste: 'E-Waste',
    donateReuse: 'Donate / Reuse',
    hazardous: 'Hazardous Disposal',
    WET: 'Wet Waste',
    DRY: 'Dry Waste',
    RECYCLABLE: 'Recyclable',
    E_WASTE: 'E-Waste',
    DONATE_REUSE: 'Donate / Reuse',
    HAZARDOUS: 'Hazardous Disposal'
  };
  return map[keyOrField] || 'Waste';
};

// Record waste identification (Text Search or Image Recognition)
export const recordWasteIdentification = (item, source = 'Search') => {
  if (!item) return null;
  const targetField = mapCategoryToKey(item.categoryKey || item.category);
  const currentCounts = getWasteCounts();

  const updatedCounts = {
    ...currentCounts,
    [targetField]: (currentCounts[targetField] || 0) + 1,
    total: currentCounts.total + 1
  };

  setWasteCounts(updatedCounts);
  addEcoScore(10);
  const categoryLabel = item.category || getCategoryDisplayName(targetField);
  logActivity(`Identified ${item.name || 'item'} (${categoryLabel})`, categoryLabel, 10);

  return {
    success: true,
    categoryField: targetField,
    categoryName: categoryLabel,
    updatedCounts,
    points: 10
  };
};

// Gamification & Scores
export const getEcoScore = () => getStorage(STORAGE_KEYS.ECO_SCORE, 140);
export const getWasteSortedCount = () => {
  const counts = getWasteCounts();
  return counts.total;
};
export const getQuizScore = () => getStorage(STORAGE_KEYS.QUIZ_SCORE, 120);
export const getDayStreak = () => getStorage(STORAGE_KEYS.DAY_STREAK, 4);

export const getActivityHistory = () => getStorage(STORAGE_KEYS.ACTIVITY_HISTORY, [
  { id: 1, action: 'Sorted Plastic Water Bottle', category: 'Recyclable', points: 10, time: '2 hours ago' },
  { id: 2, action: 'Completed EcoSort Challenge Quiz', category: 'Quiz', points: 40, time: 'Yesterday' },
  { id: 3, action: 'Challenge: Switch Off Unused Lights', category: 'Challenge', points: 25, time: '2 days ago' },
  { id: 4, action: 'Identified Banana Peel', category: 'Wet Waste', points: 10, time: '3 days ago' },
]);

export const logActivity = (action, category, points) => {
  const history = getActivityHistory();
  const newEntry = {
    id: Date.now(),
    action,
    category,
    points,
    time: 'Just now'
  };
  setStorage(STORAGE_KEYS.ACTIVITY_HISTORY, [newEntry, ...history.slice(0, 19)]);
};

export const addEcoScore = (points) => {
  const current = getEcoScore();
  const next = current + points;
  setStorage(STORAGE_KEYS.ECO_SCORE, next);
  checkBadges(next);
  return next;
};

export const incrementWasteSorted = () => {
  const counts = getWasteCounts();
  return recordWasteIdentification({ name: 'Household Item', category: 'Recyclable', categoryKey: 'RECYCLABLE' });
};

export const updateQuizScore = (points) => {
  const current = getQuizScore();
  const next = current + points;
  setStorage(STORAGE_KEYS.QUIZ_SCORE, next);
  logActivity('EcoSort Quiz Completed', 'EcoSort Game', points);
  return next;
};

// Badges & Levels
export const getBadges = () => {
  const defaultBadges = [
    { id: 'badge-1', name: 'Eco Beginner', desc: 'Score 50+ Eco Points', icon: 'Sprout', unlocked: true, minScore: 50 },
    { id: 'badge-2', name: 'Waste Warrior', desc: 'Sort at least 5 waste items', icon: 'Recycle', unlocked: true, minScore: 100 },
    { id: 'badge-3', name: 'Green Explorer', desc: 'Reach 200+ Eco Points', icon: 'Globe', unlocked: false, minScore: 200 },
    { id: 'badge-4', name: 'Green Guardian', desc: 'Score 500+ Eco Points', icon: 'TreePine', unlocked: false, minScore: 500 },
    { id: 'badge-5', name: 'Planet Protector', desc: 'Attain 1,000+ Eco Points', icon: 'Trophy', unlocked: false, minScore: 1000 }
  ];
  return getStorage(STORAGE_KEYS.BADGES, defaultBadges);
};

export const checkBadges = (score) => {
  const badges = getBadges();
  let updated = false;
  const newBadges = badges.map(b => {
    if (!b.unlocked && score >= b.minScore) {
      updated = true;
      return { ...b, unlocked: true };
    }
    return b;
  });
  if (updated) {
    setStorage(STORAGE_KEYS.BADGES, newBadges);
  }
  return newBadges;
};

export const getLevelInfo = (score) => {
  if (score >= 1000) return { title: 'Planet Protector', level: 5, nextLevelScore: 2000, color: '#16A34A' };
  if (score >= 501) return { title: 'Green Guardian', level: 4, nextLevelScore: 1000, color: '#0EA5E9' };
  if (score >= 301) return { title: 'Waste Warrior', level: 3, nextLevelScore: 500, color: '#8B5CF6' };
  if (score >= 101) return { title: 'Green Explorer', level: 2, nextLevelScore: 300, color: '#F59E0B' };
  return { title: 'Eco Beginner', level: 1, nextLevelScore: 100, color: '#16A34A' };
};

// Chat history
export const getChatHistory = () => getStorage(STORAGE_KEYS.CHAT_HISTORY, [
  {
    id: 1,
    sender: 'ai',
    text: "Hello! I am EcoAI, your personal sustainability and waste management assistant 🌱. How can I help you sort waste or live more sustainably today?",
    timestamp: '10:00 AM'
  }
]);

export const saveChatHistory = (messages) => {
  setStorage(STORAGE_KEYS.CHAT_HISTORY, messages);
};
