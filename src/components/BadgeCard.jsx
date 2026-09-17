import React from 'react';
import { Lock, Check, Award, Sprout, Recycle, Globe, TreePine, Trophy } from 'lucide-react';

const BADGE_ICONS = {
  Sprout,
  Recycle,
  Globe,
  TreePine,
  Trophy
};

export default function BadgeCard({ badge, isUnlocked }) {
  const IconComponent = BADGE_ICONS[badge.icon] || Award;

  return (
    <div
      className="eco-card"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1.25rem',
        opacity: isUnlocked ? 1 : 0.65,
        backgroundColor: isUnlocked ? '#FFFFFF' : '#F8FAFC',
        border: isUnlocked ? `2px solid ${badge.color || '#16A34A'}` : '1.5px dashed #CBD5E1',
        position: 'relative'
      }}
    >
      <div
        style={{
          width: '54px',
          height: '54px',
          borderRadius: '16px',
          backgroundColor: isUnlocked ? (badge.bg || '#DCFCE7') : '#E2E8F0',
          color: isUnlocked ? (badge.color || '#16A34A') : '#94A3B8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: isUnlocked ? '0 4px 10px rgba(0,0,0,0.06)' : 'none'
        }}
      >
        {isUnlocked ? <IconComponent size={28} /> : <Lock size={22} />}
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
          <h4 style={{ fontSize: '1rem', color: isUnlocked ? '#0F172A' : '#64748B' }}>
            {badge.name}
          </h4>
          {isUnlocked && (
            <span style={{
              background: '#DCFCE7',
              color: '#166534',
              borderRadius: '50%',
              width: '18px',
              height: '18px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px'
            }}>
              ✓
            </span>
          )}
        </div>
        <p style={{ fontSize: '0.82rem', color: '#64748B', lineHeight: '1.4' }}>
          {badge.desc || badge.description}
        </p>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: isUnlocked ? '#16A34A' : '#94A3B8' }}>
          {isUnlocked ? 'Unlocked' : `Requires ${badge.minScore} pts`}
        </span>
      </div>
    </div>
  );
}
