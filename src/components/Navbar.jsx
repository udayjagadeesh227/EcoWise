import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  Sprout, 
  Recycle, 
  Trophy, 
  Gamepad2, 
  Bot, 
  User, 
  Menu, 
  X, 
  LogOut, 
  Award,
  Sparkles
} from 'lucide-react';
import { getCurrentUser, getEcoScore, logoutUser } from '../utils/storage';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(getCurrentUser());
  const [ecoScore, setEcoScore] = useState(getEcoScore());
  const navigate = useNavigate();

  // Sync user and score
  useEffect(() => {
    const handleStorageChange = () => {
      setUser(getCurrentUser());
      setEcoScore(getEcoScore());
    };
    window.addEventListener('storage', handleStorageChange);
    // Poll briefly to catch internal state updates across pages
    const interval = setInterval(handleStorageChange, 1200);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    navigate('/login');
  };

  const navItems = [
    { to: '/home', label: 'Home', icon: Sprout },
    { to: '/waste-guide', label: 'Waste Guide', icon: Recycle },
    { to: '/challenges', label: 'Challenges', icon: Trophy },
    { to: '/ecosort', label: 'EcoSort', icon: Gamepad2 },
    { to: '/ecoai', label: 'EcoAI', icon: Bot },
    { to: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <header className="navbar-header">
      <div className="navbar-inner">
        {/* Brand Logo */}
        <Link to="/home" className="brand-logo" onClick={() => setMobileMenuOpen(false)}>
          <div className="brand-icon-wrap">
            <Sprout size={22} />
          </div>
          <span>EcoWise <span style={{ fontSize: '1.1rem' }}>🌱</span></span>
        </Link>

        {/* Desktop Navigation */}
        <nav>
          <ul className="nav-links-desktop">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      isActive ? 'nav-link active' : 'nav-link'
                    }
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right side: Score & Auth */}
        <div className="nav-right">
          <Link to="/profile" className="navbar-score-badge" title="Your current Eco Score">
            <Sparkles size={15} color="#4ade80" />
            <span>{ecoScore} pts</span>
          </Link>

          {user ? (
            <button
              onClick={handleLogout}
              className="btn btn-outline"
              style={{
                color: '#fff',
                borderColor: 'rgba(255,255,255,0.25)',
                padding: '0.4rem 0.8rem',
                fontSize: '0.82rem',
                borderRadius: '8px'
              }}
              title="Logout"
            >
              <LogOut size={14} />
              <span className="desktop-only-text">Logout</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="btn btn-primary"
              style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}
            >
              Login
            </Link>
          )}

          {/* Mobile hamburger button */}
          <button
            className="nav-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      )}
    </header>
  );
}
