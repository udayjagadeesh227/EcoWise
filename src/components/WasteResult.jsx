import React from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Lightbulb, 
  Sparkles, 
  ShieldCheck,
  Tag
} from 'lucide-react';
import { WASTE_CATEGORIES } from '../data/wasteItems';

export default function WasteResult({ item, isRecorded = false, recordedCategoryName = '' }) {
  if (!item) return null;

  const categoryMeta = WASTE_CATEGORIES[item.categoryKey] || {
    name: item.category || 'General Waste',
    color: '#0EA5E9',
    bg: '#E0F2FE',
    border: '#BAE6FD',
    binColor: 'Designated Stream',
    badgeText: 'Disposal Guide'
  };

  const displayCategory = recordedCategoryName || item.category || categoryMeta.name;

  return (
    <div
      className="eco-card"
      style={{
        border: `2px solid ${categoryMeta.border}`,
        backgroundColor: '#FFFFFF',
        boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.08)',
        borderRadius: '20px',
        padding: '1.75rem',
        animation: 'fadeIn 0.3s ease-in-out'
      }}
    >
      {/* Category header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.75rem',
        borderBottom: '1px solid #E2E8F0',
        paddingBottom: '1.1rem',
        marginBottom: '1.25rem'
      }}>
        <div>
          <span style={{
            fontSize: '0.78rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: '#64748B'
          }}>
            ITEM IDENTIFIED
          </span>
          <h2 style={{ fontSize: '1.85rem', color: '#0F172A', marginTop: '0.2rem', lineHeight: '1.2' }}>
            {item.name}
          </h2>
        </div>

        <div style={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '0.25rem'
        }}>
          <span style={{
            fontSize: '0.72rem',
            fontWeight: 800,
            color: '#64748B',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            CATEGORY
          </span>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            backgroundColor: categoryMeta.bg,
            color: categoryMeta.color,
            border: `1.5px solid ${categoryMeta.border}`,
            padding: '0.4rem 0.9rem',
            borderRadius: '999px',
            fontWeight: 700,
            fontSize: '0.88rem'
          }}>
            <Tag size={14} />
            <span>{categoryMeta.name}</span>
            <span style={{ fontSize: '0.75rem', opacity: 0.85 }}>• {categoryMeta.binColor}</span>
          </div>
        </div>
      </div>

      {/* RECOMMENDED ACTION */}
      <div style={{
        background: categoryMeta.bg,
        border: `1.5px solid ${categoryMeta.border}`,
        borderRadius: '14px',
        padding: '1.1rem 1.25rem',
        marginBottom: '1.25rem',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.85rem'
      }}>
        <div style={{
          background: categoryMeta.color,
          color: '#fff',
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: '2px'
        }}>
          <CheckCircle2 size={18} />
        </div>
        <div>
          <h4 style={{
            color: categoryMeta.color,
            fontSize: '0.82rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.25rem'
          }}>
            RECOMMENDED ACTION
          </h4>
          <p style={{ color: '#0F172A', fontSize: '1.05rem', fontWeight: 600, lineHeight: '1.45' }}>
            {item.recommendedAction}
          </p>
        </div>
      </div>

      {/* WHY */}
      <div style={{ marginBottom: '1.25rem' }}>
        <h4 style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          color: '#0F172A',
          fontSize: '0.82rem',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '0.35rem'
        }}>
          <Info size={15} color="#0EA5E9" />
          WHY
        </h4>
        <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: '1.6' }}>
          {item.explanation}
        </p>
      </div>

      {/* ECO TIP */}
      {item.ecoTip && (
        <div style={{
          background: '#FFFBEB',
          border: '1px solid #FDE68A',
          borderRadius: '12px',
          padding: '0.85rem 1rem',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.75rem',
          marginBottom: '1.25rem'
        }}>
          <Lightbulb size={20} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{
              fontWeight: 800,
              color: '#B45309',
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: '0.2rem'
            }}>
              ECO TIP
            </div>
            <p style={{ color: '#78350F', fontSize: '0.88rem', lineHeight: '1.45' }}>
              {item.ecoTip}
            </p>
          </div>
        </div>
      )}

      {/* Municipal Warning Notice */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        fontSize: '0.8rem',
        color: '#64748B',
        backgroundColor: '#F8FAFC',
        border: '1px solid #E2E8F0',
        padding: '0.6rem 0.9rem',
        borderRadius: '10px',
        marginBottom: '1.25rem'
      }}>
        <AlertTriangle size={16} color="#F59E0B" style={{ flexShrink: 0 }} />
        <span>
          Disposal rules can vary by location. Hazardous items should be handled through authorized collection channels.
        </span>
      </div>

      {/* IDENTIFICATION CONFIRMATION BANNER */}
      {isRecorded && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.6rem',
          background: '#DCFCE7',
          border: '1.5px solid #86EFAC',
          color: '#166534',
          padding: '0.75rem 1.15rem',
          borderRadius: '12px',
          fontWeight: 700,
          fontSize: '0.92rem',
          boxShadow: '0 2px 8px rgba(22, 163, 74, 0.12)',
          animation: 'fadeIn 0.25s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={20} color="#16A34A" />
            <span>Added to your <strong>{displayCategory}</strong> count.</span>
          </div>
          <span style={{
            backgroundColor: '#16A34A',
            color: '#FFFFFF',
            padding: '0.2rem 0.6rem',
            borderRadius: '999px',
            fontSize: '0.78rem',
            fontWeight: 800
          }}>
            +10 Eco Pts
          </span>
        </div>
      )}
    </div>
  );
}
