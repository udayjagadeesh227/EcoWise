import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Calendar, 
  Sparkles, 
  Recycle, 
  Trophy, 
  Gamepad2, 
  Flame, 
  Award,
  History,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { 
  getCurrentUser, 
  getEcoScore, 
  getWasteSortedCount, 
  getQuizScore, 
  getDayStreak, 
  getBadges, 
  getLevelInfo, 
  getActivityHistory,
  getStorage,
  getWasteCounts
} from '../utils/storage';
import { ALL_BADGES } from '../data/badges';
import BadgeCard from '../components/BadgeCard';
import EcoScore from '../components/EcoScore';
import StatCard from '../components/StatCard';
import { DEFAULT_CHALLENGES } from '../data/challenges';

export default function Profile() {
  const [user, setUser] = useState(getCurrentUser());
  const [ecoScore, setEcoScore] = useState(getEcoScore());
  const [wasteSorted, setWasteSorted] = useState(getWasteSortedCount());
  const [wasteCounts, setWasteCounts] = useState(getWasteCounts());
  const [quizScore, setQuizScore] = useState(getQuizScore());
  const [streak, setStreak] = useState(getDayStreak());
  const [badges, setBadges] = useState(getBadges());
  const [activityHistory, setActivityHistory] = useState(getActivityHistory());
  const [challenges, setChallenges] = useState(() => getStorage('ecowise_challenges', DEFAULT_CHALLENGES));
  const [copyNotice, setCopyNotice] = useState(false);

  useEffect(() => {
    const syncProfile = () => {
      setUser(getCurrentUser());
      setEcoScore(getEcoScore());
      const counts = getWasteCounts();
      setWasteCounts(counts);
      setWasteSorted(counts.total);
      setQuizScore(getQuizScore());
      setStreak(getDayStreak());
      setBadges(getBadges());
      setActivityHistory(getActivityHistory());
    };

    syncProfile();
    window.addEventListener('ecowise_waste_updated', syncProfile);
    window.addEventListener('storage', syncProfile);
    return () => {
      window.removeEventListener('ecowise_waste_updated', syncProfile);
      window.removeEventListener('storage', syncProfile);
    };
  }, []);

  const levelInfo = getLevelInfo(ecoScore);
  const completedChallengesCount = challenges.filter(c => c.isCompleted).length;

  const handleShareBadge = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`I've reached ${levelInfo.title} with ${ecoScore} Eco Points on EcoWise 🌱! Join me in taking small steps for a greener tomorrow.`);
      setCopyNotice(true);
      setTimeout(() => setCopyNotice(false), 3000);
    }
  };

  return (
    <div className="profile-page" style={{ maxWidth: '1080px', margin: '0 auto' }}>
      {/* User Header Profile Card */}
      <div className="eco-card" style={{
        background: 'linear-gradient(135deg, #F0FDF4 0%, #FFFFFF 60%, #E0F2FE 100%)',
        border: '2px solid #BBF7D0',
        padding: '2rem',
        borderRadius: '24px',
        marginBottom: '2rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{
              width: '74px',
              height: '74px',
              borderRadius: '50%',
              backgroundColor: '#16A34A',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              fontWeight: 800,
              boxShadow: '0 6px 20px rgba(22, 163, 74, 0.3)'
            }}>
              {user?.name ? user.name.charAt(0).toUpperCase() : 'E'}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <h1 style={{ fontSize: '1.85rem', color: '#14532D' }}>{user?.name || 'Eco Warrior'}</h1>
                <span style={{
                  backgroundColor: '#DCFCE7',
                  color: '#166534',
                  padding: '0.2rem 0.65rem',
                  borderRadius: '999px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  border: '1px solid #86EFAC'
                }}>
                  {levelInfo.title}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginTop: '0.35rem', color: '#64748B', fontSize: '0.88rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Mail size={15} />
                  <span>{user?.email || 'warrior@ecowise.earth'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Calendar size={15} />
                  <span>Member since {user?.joinedDate || 'Sep 2026'}</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleShareBadge}
            className="btn btn-outline"
            style={{ backgroundColor: '#FFFFFF', borderColor: '#86EFAC', color: '#166534' }}
          >
            <Share2 size={16} />
            <span>{copyNotice ? 'Status Copied!' : 'Share Progress'}</span>
          </button>
        </div>
      </div>

      {/* Grid: EcoScore & Quick Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <EcoScore score={ecoScore} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <StatCard
            icon={Recycle}
            value={wasteSorted}
            title="Waste Sorted"
            description="Items diverted from landfills"
            variant="blue"
          />
          <StatCard
            icon={Trophy}
            value={completedChallengesCount}
            title="Challenges"
            description="Weekly quests accomplished"
            variant="purple"
          />
          <StatCard
            icon={Gamepad2}
            value={quizScore}
            title="Quiz Points"
            description="EcoSort trivia score"
            variant="softblue"
          />
          <StatCard
            icon={Flame}
            value={`${streak} Days`}
            title="Day Streak"
            description="Consecutive daily participation"
            variant="amber"
          />
        </div>
      </div>

      {/* Waste Segregation Summary */}
      <section style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div>
            <h2 style={{ fontSize: '1.45rem', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Recycle size={22} color="#16A34A" />
              <span>Waste Segregation Summary</span>
            </h2>
            <p style={{ fontSize: '0.88rem', color: '#64748B' }}>
              Detailed breakdown of items you have diverted into proper circular streams
            </p>
          </div>

          <div style={{
            backgroundColor: '#DCFCE7',
            border: '1.5px solid #86EFAC',
            color: '#166534',
            padding: '0.35rem 0.95rem',
            borderRadius: '999px',
            fontWeight: 800,
            fontSize: '0.88rem'
          }}>
            Total Waste Identified: {wasteCounts.total}
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: '1rem'
        }}>
          {/* Wet Waste */}
          <div className="eco-card" style={{ padding: '1.1rem 1rem', backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#166534', marginBottom: '0.25rem' }}>
              🟢 Wet Waste
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#16A34A', fontFamily: 'var(--font-heading)' }}>
              {wasteCounts.wetWaste}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '0.2rem' }}>
              Organic & compostable
            </div>
          </div>

          {/* Dry Waste */}
          <div className="eco-card" style={{ padding: '1.1rem 1rem', backgroundColor: '#F0F9FF', border: '1px solid #BAE6FD' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0369A1', marginBottom: '0.25rem' }}>
              🔵 Dry Waste
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0EA5E9', fontFamily: 'var(--font-heading)' }}>
              {wasteCounts.dryWaste}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '0.2rem' }}>
              Inorganic clean scrap
            </div>
          </div>

          {/* Recyclable */}
          <div className="eco-card" style={{ padding: '1.1rem 1rem', backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#065F46', marginBottom: '0.25rem' }}>
              ♻️ Recyclable
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--font-heading)' }}>
              {wasteCounts.recyclable}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '0.2rem' }}>
              Plastics, metals, paper
            </div>
          </div>

          {/* E-Waste */}
          <div className="eco-card" style={{ padding: '1.1rem 1rem', backgroundColor: '#FAF5FF', border: '1px solid #DDD6FE' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6D28D9', marginBottom: '0.25rem' }}>
              🟣 E-Waste
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#7C3AED', fontFamily: 'var(--font-heading)' }}>
              {wasteCounts.eWaste}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '0.2rem' }}>
              Gadgets & electronics
            </div>
          </div>

          {/* Donate / Reuse */}
          <div className="eco-card" style={{ padding: '1.1rem 1rem', backgroundColor: '#FFFBEB', border: '1px solid #FDE68A' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#92400E', marginBottom: '0.25rem' }}>
              🟡 Donate / Reuse
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#D97706', fontFamily: 'var(--font-heading)' }}>
              {wasteCounts.donateReuse}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '0.2rem' }}>
              Wearables & utilities
            </div>
          </div>

          {/* Hazardous Disposal */}
          <div className="eco-card" style={{ padding: '1.1rem 1rem', backgroundColor: '#FEF2F2', border: '1px solid #FECACA' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#991B1B', marginBottom: '0.25rem' }}>
              🔴 Hazardous
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#DC2626', fontFamily: 'var(--font-heading)' }}>
              {wasteCounts.hazardous}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '0.2rem' }}>
              Batteries & chemicals
            </div>
          </div>
        </div>
      </section>

      {/* Badges Section */}
      <section style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h2 style={{ fontSize: '1.45rem', color: '#0F172A' }}>Earned Sustainability Badges</h2>
            <p style={{ fontSize: '0.88rem', color: '#64748B' }}>Unlock milestones as your civic eco score increases</p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
          gap: '1.25rem'
        }}>
          {ALL_BADGES.map((badge) => {
            const isUnlocked = ecoScore >= badge.minScore;
            return (
              <BadgeCard
                key={badge.id}
                badge={badge}
                isUnlocked={isUnlocked}
              />
            );
          })}
        </div>
      </section>

      {/* Recent Activity History */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <History size={22} color="#16A34A" />
          <h2 style={{ fontSize: '1.45rem', color: '#0F172A' }}>Recent Sustainability Activity</h2>
        </div>

        <div className="eco-card" style={{ padding: '0.75rem 1.25rem' }}>
          {activityHistory.length === 0 ? (
            <p style={{ padding: '1.5rem', color: '#64748B', textAlign: 'center' }}>
              No recorded activities yet. Start by identifying waste or taking the EcoSort quiz!
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {activityHistory.map((item, idx) => (
                <div
                  key={item.id || idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.9rem 0',
                    borderBottom: idx !== activityHistory.length - 1 ? '1px solid #F1F5F9' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '8px',
                      backgroundColor: '#DCFCE7',
                      color: '#16A34A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <CheckCircle2 size={18} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.92rem', color: '#0F172A' }}>
                        {item.action}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                        {item.category} • {item.time}
                      </div>
                    </div>
                  </div>

                  <span style={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: '#16A34A',
                    backgroundColor: '#F0FDF4',
                    border: '1px solid #BBF7D0',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '999px'
                  }}>
                    +{item.points} pts
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
