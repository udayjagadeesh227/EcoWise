import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sprout, Lock, Mail, ArrowRight, UserCheck, Sparkles, Leaf } from 'lucide-react';
import { loginUser, continueAsGuest } from '../utils/storage';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    try {
      loginUser(email, password);
      navigate('/home');
    } catch (err) {
      setError(err.message || 'Login failed.');
    }
  };

  const handleGuest = () => {
    continueAsGuest();
    navigate('/home');
  };

  return (
    <div style={{
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      position: 'relative'
    }}>
      <div className="form-card" style={{ width: '100%', maxWidth: '440px' }}>
        {/* Logo and Tagline */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            background: '#DCFCE7',
            color: '#16A34A',
            borderRadius: '16px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0.85rem',
            boxShadow: '0 4px 12px rgba(22, 163, 74, 0.2)'
          }}>
            <Sprout size={32} />
          </div>
          <h1 style={{ fontSize: '1.85rem', color: '#14532D', marginBottom: '0.35rem' }}>
            EcoWise 🌱
          </h1>
          <p style={{ color: '#64748B', fontSize: '0.92rem', fontWeight: 500 }}>
            Small Actions. A Greener Tomorrow.
          </p>
        </div>

        {error && (
          <div style={{
            background: '#FEE2E2',
            border: '1px solid #FCA5A5',
            color: '#991B1B',
            padding: '0.65rem 0.9rem',
            borderRadius: '10px',
            fontSize: '0.85rem',
            marginBottom: '1.25rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                className="form-input"
                placeholder="warrior@ecowise.earth"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '1.75rem' }}>
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', marginBottom: '1rem' }}
          >
            <span>Login to EcoWise</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          margin: '1.25rem 0',
          color: '#94A3B8',
          fontSize: '0.82rem'
        }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#E2E8F0' }} />
          <span>OR</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#E2E8F0' }} />
        </div>

        <button
          onClick={handleGuest}
          className="btn btn-outline"
          style={{ width: '100%', padding: '0.8rem', fontSize: '0.95rem', marginBottom: '1.5rem', backgroundColor: '#F0FDF4', borderColor: '#BBF7D0', color: '#166534' }}
        >
          <UserCheck size={18} color="#16A34A" />
          <span>Continue as Guest Explorer</span>
        </button>

        <div style={{ textAlign: 'center', fontSize: '0.88rem', color: '#64748B' }}>
          Don't have an account yet?{' '}
          <Link to="/register" style={{ color: '#16A34A', fontWeight: 700, textDecoration: 'underline' }}>
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
