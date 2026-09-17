import React from 'react';

export default function StatCard({
  icon: Icon,
  value,
  title,
  description,
  variant = 'green',
  isProminent = false
}) {
  const variantStyles = {
    green: {
      cardClass: 'stat-card-green',
      iconBg: '#DCFCE7',
      iconColor: '#16A34A',
      border: '#BBF7D0'
    },
    blue: {
      cardClass: 'stat-card-blue',
      iconBg: '#E0F2FE',
      iconColor: '#0284C7',
      border: '#BAE6FD'
    },
    purple: {
      cardClass: 'stat-card-purple',
      iconBg: '#F3E8FF',
      iconColor: '#7C3AED',
      border: '#DDD6FE'
    },
    softblue: {
      cardClass: 'stat-card-softblue',
      iconBg: '#E2E8F0',
      iconColor: '#3B82F6',
      border: '#CBD5E1'
    },
    amber: {
      cardClass: 'stat-card-amber',
      iconBg: '#FEF3C7',
      iconColor: '#D97706',
      border: '#FDE68A'
    }
  };

  const style = variantStyles[variant] || variantStyles.green;

  return (
    <div
      className={`stat-card ${style.cardClass}`}
      style={isProminent ? {
        borderWidth: '2px',
        borderColor: style.iconColor,
        boxShadow: '0 8px 20px -3px rgba(22, 163, 74, 0.15)'
      } : {}}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span className="stat-title">{title}</span>
        <div
          className="stat-icon-wrapper"
          style={{ background: style.iconBg, color: style.iconColor }}
        >
          {Icon && <Icon size={22} />}
        </div>
      </div>
      <div className="stat-value" style={isProminent ? { fontSize: '2.1rem', color: style.iconColor } : {}}>
        {value}
      </div>
      <p className="stat-desc">{description}</p>
    </div>
  );
}
