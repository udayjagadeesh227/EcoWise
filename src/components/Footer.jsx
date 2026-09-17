import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Sprout, Globe, Heart, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-inner">
        <div className="footer-top">
          {/* Brand info */}
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
              <div style={{
                width: '34px',
                height: '34px',
                background: 'rgba(255,255,255,0.15)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#4ade80'
              }}>
                <Sprout size={20} />
              </div>
              <h3 style={{ color: '#fff', fontSize: '1.35rem' }}>EcoWise 🌱</h3>
            </div>
            <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '1rem' }}>
              Small Actions. A Greener Tomorrow. An AI-powered civic platform guiding daily sustainable habits, responsible segregation, and climate consciousness.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{
                background: 'rgba(245, 158, 11, 0.25)',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                padding: '0.25rem 0.6rem',
                borderRadius: '999px',
                fontSize: '0.78rem',
                color: '#fef08a'
              }}>
                SDG 11: Sustainable Cities
              </span>
              <span style={{
                background: 'rgba(249, 115, 22, 0.25)',
                border: '1px solid rgba(249, 115, 22, 0.4)',
                padding: '0.25rem 0.6rem',
                borderRadius: '999px',
                fontSize: '0.78rem',
                color: '#fed7aa'
              }}>
                SDG 12: Responsible Consumption
              </span>
              <span style={{
                background: 'rgba(34, 197, 94, 0.25)',
                border: '1px solid rgba(34, 197, 94, 0.4)',
                padding: '0.25rem 0.6rem',
                borderRadius: '999px',
                fontSize: '0.78rem',
                color: '#bbf7d0'
              }}>
                SDG 13: Climate Action
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="footer-nav">
            <div className="footer-col">
              <h4>Explore EcoWise</h4>
              <ul>
                <li><Link to="/home">Home Dashboard</Link></li>
                <li><Link to="/waste-guide">Smart Waste Guide</Link></li>
                <li><Link to="/challenges">Weekly Challenges</Link></li>
                <li><Link to="/ecosort">EcoSort Game Quiz</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Intelligence & Account</h4>
              <ul>
                <li><Link to="/ecoai">EcoAI Chat Assistant</Link></li>
                <li><Link to="/profile">Profile & Badges</Link></li>
                <li><Link to="/login">Login / Register</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="footer-bottom">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span>Built with</span>
            <Leaf size={14} color="#4ade80" />
            <span>for sustainable community impact • 2026 EcoWise</span>
          </div>
          <div>
            <span>Empowered by Gemini AI • Small Actions, Big Impact</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
