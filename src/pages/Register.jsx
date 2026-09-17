import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sprout, ArrowRight, UserPlus, ShieldCheck } from 'lucide-react';
import { registerUser } from '../utils/storage';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    if (!fullName || !email || !password || !confirmPassword) {
      setError('Please complete all fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      registerUser({
        name: fullName,
        email,
        password
      });
      navigate('/home');
    } catch (err) {
      setError(err.message || 'Registration failed.');
    }
  };

  return (
    <div style={{
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="form-card" style={{ width: '100%', maxWidth: '460px' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{
            width: '54px',
            height: '54px',
            background: '#DCFCE7',
            color: '#16A34A',
            borderRadius: '16px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0.75rem',
            boxShadow: '0 4px 12px rgba(22, 163, 74, 0.2)'
          }}>
            <Sprout size={30} />
          </div>
          <h1 style={{ fontSize: '1.75rem', color: '#14532D', marginBottom: '0.3rem' }}>
            Join EcoWise 🌱
          </h1>
          <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
            Start logging your eco habits and earn green badges
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

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Alex Green"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              placeholder="alex@ecowise.earth"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1.75rem' }}>
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', marginBottom: '1.25rem' }}
          >
            <span>Create EcoWise Account</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ textAlign: 'center', fontSize: '0.88rem', color: '#64748B' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#16A34A', fontWeight: 700, textDecoration: 'underline' }}>
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}
