import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bot, Sparkles } from 'lucide-react';

export default function FloatingEcoAI() {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide the floating button if already on the full /ecoai page or /login or /register
  if (location.pathname === '/ecoai' || location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <button
      onClick={() => navigate('/ecoai')}
      className="floating-ecoai-btn"
      aria-label="Ask EcoAI Chatbot"
      title="Ask EcoAI"
    >
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Bot size={28} />
        <span style={{
          position: 'absolute',
          top: '-6px',
          right: '-6px',
          width: '12px',
          height: '12px',
          backgroundColor: '#4ade80',
          border: '2px solid #fff',
          borderRadius: '50%'
        }} />
      </div>

      <div className="floating-ecoai-tooltip">
        Ask EcoAI 🌱
      </div>
    </button>
  );
}
