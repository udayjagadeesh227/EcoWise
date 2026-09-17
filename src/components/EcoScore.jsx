import React from 'react';
import { Sparkles, Award } from 'lucide-react';
import { getLevelInfo } from '../utils/storage';

export default function EcoScore({ score }) {
  const levelInfo = getLevelInfo(score);
  const progressPercent = Math.min(100, Math.round((score / levelInfo.nextLevelScore) * 100));

  return (
    <div className="eco-card" style={{
      background: 'linear-gradient(135deg, #F0FDF4 0%, #FFFFFF 100%)',
      border: '2px solid #BBF7D0',
      padding: '1.75rem'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#16A34A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Current Standing
          </span>
          <h2 style={{ fontSize: '1.5rem', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {levelInfo.title}
            <span style={{
              fontSize: '0.8rem',
              backgroundColor: '#DCFCE7',
              color: '#166534',
              padding: '0.2rem 0.6rem',
              borderRadius: '999px',
              fontWeight: 800
            }}>
              Tier {levelInfo.level}
            </span>
          </h2>
        </div>

        <div style={{
          width: '54px',
          height: '54px',
          borderRadius: '50%',
          backgroundColor: '#DCFCE7',
          color: '#16A34A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(22, 163, 74, 0.2)'
        }}>
          <Sparkles size={28} />
        </div>
      </div>

      {/* Big Score Display */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '1rem' }}>
        <span style={{ fontSize: '3rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#166534', lineHeight: 1 }}>
          {score}
        </span>
        <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#64748B' }}>Eco Points</span>
      </div>

      {/* Level Progress */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 600, color: '#64748B', marginBottom: '0.4rem' }}>
          <span>Next Rank: {levelInfo.nextLevelScore} pts</span>
          <span style={{ color: '#16A34A' }}>{progressPercent}% Complete</span>
        </div>
        <div style={{
          width: '100%',
          height: '10px',
          backgroundColor: '#E2E8F0',
          borderRadius: '999px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${progressPercent}%`,
            height: '100%',
            backgroundColor: '#16A34A',
            borderRadius: '999px',
            transition: 'width 0.4s ease'
          }} />
        </div>
      </div>
    </div>
  );
}
