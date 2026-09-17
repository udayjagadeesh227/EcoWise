import React from 'react';
import { CheckCircle2, Award, ArrowRight, Droplets, Recycle, Globe, Sun, Sprout } from 'lucide-react';

const ICON_MAP = {
  Droplets,
  Recycle,
  Globe,
  Sun,
  Sprout
};

export default function ChallengeCard({ challenge, onComplete, onProgress }) {
  const { id, title, description, points, icon, accentColor, bg, targetDays, currentProgress, isCompleted, tip } = challenge;
  const IconComponent = ICON_MAP[icon] || Sprout;
  const progressPercent = Math.min(100, Math.round((currentProgress / targetDays) * 100));

  return (
    <div
      className="eco-card"
      style={{
        borderLeft: `5px solid ${accentColor}`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative'
      }}
    >
      <div>
        {/* Top bar with icon and points */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: bg,
              color: accentColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <IconComponent size={24} />
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: '#FEF3C7',
            border: '1px solid #FCD34D',
            padding: '0.25rem 0.65rem',
            borderRadius: '999px',
            fontSize: '0.82rem',
            fontWeight: 700,
            color: '#B45309'
          }}>
            <Award size={14} />
            <span>+{points} pts</span>
          </div>
        </div>

        <h3 style={{ fontSize: '1.15rem', marginBottom: '0.45rem', color: '#0F172A' }}>{title}</h3>
        <p style={{ fontSize: '0.88rem', color: '#64748B', lineHeight: '1.5', marginBottom: '1rem' }}>
          {description}
        </p>

        {tip && (
          <div style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            padding: '0.55rem 0.75rem',
            fontSize: '0.78rem',
            color: '#475569',
            marginBottom: '1.1rem'
          }}>
            💡 <strong>Eco Tip:</strong> {tip}
          </div>
        )}
      </div>

      <div>
        {/* Progress bar */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem' }}>
            <span style={{ color: '#64748B' }}>Progress ({currentProgress}/{targetDays} days)</span>
            <span style={{ color: accentColor }}>{progressPercent}%</span>
          </div>
          <div style={{
            width: '100%',
            height: '8px',
            background: '#E2E8F0',
            borderRadius: '999px',
            overflow: 'hidden'
          }}>
            <div
              style={{
                width: `${progressPercent}%`,
                height: '100%',
                background: accentColor,
                borderRadius: '999px',
                transition: 'width 0.4s ease'
              }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {isCompleted ? (
            <button
              disabled
              style={{
                width: '100%',
                padding: '0.65rem 1rem',
                background: '#DCFCE7',
                color: '#166534',
                border: '1px solid #86EFAC',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                cursor: 'default'
              }}
            >
              <CheckCircle2 size={18} color="#16A34A" />
              <span>✓ Completed</span>
            </button>
          ) : (
            <>
              <button
                onClick={() => onProgress(id)}
                className="btn btn-outline"
                style={{
                  flex: 1,
                  padding: '0.6rem 0.8rem',
                  fontSize: '0.85rem'
                }}
                title="Log one day towards this challenge"
              >
                +1 Day Log
              </button>
              <button
                onClick={() => onComplete(id)}
                className="btn btn-primary"
                style={{
                  flex: 1.2,
                  padding: '0.6rem 0.8rem',
                  fontSize: '0.85rem'
                }}
              >
                Complete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
