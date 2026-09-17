import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sprout, 
  Recycle, 
  Trophy, 
  Gamepad2, 
  Bot, 
  Globe, 
  TreePine, 
  Sun, 
  Flame, 
  ArrowRight, 
  Sparkles,
  CheckCircle,
  Lightbulb,
  ShieldCheck,
  Search,
  Compass
} from 'lucide-react';
import StatCard from '../components/StatCard';
import { 
  getCurrentUser, 
  getEcoScore, 
  getWasteSortedCount, 
  getQuizScore, 
  getDayStreak, 
  getStorage,
  getWasteCounts
} from '../utils/storage';
import { DEFAULT_CHALLENGES } from '../data/challenges';

export default function Home() {
  const [user, setUser] = useState(getCurrentUser());
  const [ecoScore, setEcoScore] = useState(getEcoScore());
  const [wasteSorted, setWasteSorted] = useState(getWasteSortedCount());
  const [quizScore, setQuizScore] = useState(getQuizScore());
  const [streak, setStreak] = useState(getDayStreak());
  const [wasteCounts, setWasteCounts] = useState(getWasteCounts());
  const [challenges, setChallenges] = useState(() => getStorage('ecowise_challenges', DEFAULT_CHALLENGES));

  const navigate = useNavigate();

  useEffect(() => {
    const syncState = () => {
      setUser(getCurrentUser());
      setEcoScore(getEcoScore());
      const counts = getWasteCounts();
      setWasteCounts(counts);
      setWasteSorted(counts.total);
      setQuizScore(getQuizScore());
      setStreak(getDayStreak());
    };

    syncState();
    window.addEventListener('ecowise_waste_updated', syncState);
    window.addEventListener('storage', syncState);
    return () => {
      window.removeEventListener('ecowise_waste_updated', syncState);
      window.removeEventListener('storage', syncState);
    };
  }, []);

  const completedChallengesCount = challenges.filter(c => c.isCompleted).length;

  return (
    <div className="home-dashboard">
      {/* 1. SOFT ECO HERO SECTION */}
      <section style={{
        background: 'linear-gradient(135deg, #F0FDF4 0%, #E0F2FE 50%, #F3E8FF 100%)',
        borderRadius: '24px',
        padding: '2.5rem 2rem',
        border: '1.5px solid #BBF7D0',
        marginBottom: '2.5rem',
        boxShadow: '0 8px 24px -4px rgba(22, 163, 74, 0.12)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '2rem',
          alignItems: 'center'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              backgroundColor: '#DCFCE7',
              color: '#166534',
              padding: '0.35rem 0.85rem',
              borderRadius: '999px',
              fontSize: '0.85rem',
              fontWeight: 700,
              marginBottom: '1rem',
              border: '1px solid #86EFAC'
            }}>
              <Sprout size={16} />
              <span>Small Actions. A Greener Tomorrow.</span>
            </div>

            <h1 style={{
              fontSize: '2.4rem',
              color: '#14532D',
              lineHeight: '1.2',
              marginBottom: '0.75rem'
            }}>
              Welcome back, {user?.name || 'Eco Warrior'}! 🌱
            </h1>

            <p style={{
              color: '#334155',
              fontSize: '1.05rem',
              lineHeight: '1.6',
              marginBottom: '1.75rem',
              maxWidth: '540px'
            }}>
              Small daily segregation habits and mindful choices compound to safeguard our ecosystems. Explore the guide, tackle weekly quests, and ask EcoAI anything!
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/waste-guide" className="btn btn-primary" style={{ padding: '0.85rem 1.6rem', fontSize: '1rem' }}>
                <Recycle size={19} />
                <span>Start Sorting Waste</span>
                <ArrowRight size={17} />
              </Link>
              <Link to="/ecoai" className="btn btn-outline" style={{ backgroundColor: '#fff', padding: '0.85rem 1.4rem' }}>
                <Bot size={18} color="#8B5CF6" />
                <span>Ask EcoAI</span>
              </Link>
            </div>
          </div>

          {/* Eco Visual Graphic on the Right */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            minHeight: '220px'
          }}>
            <div style={{
              position: 'relative',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #DCFCE7 20%, #E0F2FE 70%, transparent 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Central Earth Globe */}
              <div style={{
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                backgroundColor: '#0EA5E9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 8px 24px rgba(14, 165, 233, 0.35)'
              }}>
                <Globe size={52} />
              </div>

              {/* Orbiting Eco Badges */}
              <div style={{
                position: 'absolute',
                top: '5px',
                right: '25px',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: '#F0FDF4',
                border: '2px solid #86EFAC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#16A34A',
                boxShadow: '0 4px 10px rgba(0,0,0,0.06)'
              }} title="Sprout 🌱">
                <Sprout size={22} />
              </div>

              <div style={{
                position: 'absolute',
                bottom: '10px',
                right: '15px',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: '#DCFCE7',
                border: '2px solid #22C55E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#15803D',
                boxShadow: '0 4px 10px rgba(0,0,0,0.06)'
              }} title="Recycling ♻️">
                <Recycle size={24} />
              </div>

              <div style={{
                position: 'absolute',
                bottom: '15px',
                left: '15px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#ECFDF5',
                border: '2px solid #34D399',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#059669',
                boxShadow: '0 4px 10px rgba(0,0,0,0.06)'
              }} title="Trees 🌳">
                <TreePine size={22} />
              </div>

              <div style={{
                position: 'absolute',
                top: '20px',
                left: '15px',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: '#FEF3C7',
                border: '2px solid #FBBF24',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#D97706',
                boxShadow: '0 4px 10px rgba(0,0,0,0.06)'
              }} title="Sun ☀️">
                <Sun size={22} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DASHBOARD STATISTICS */}
      <section style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', color: '#0F172A' }}>Your Green Impact Metrics</h2>
            <p style={{ fontSize: '0.88rem', color: '#64748B' }}>Real-time statistics recorded from your sustainable actions</p>
          </div>
        </div>

        <div className="stats-grid">
          {/* Eco Score -> light green, visually prominent */}
          <StatCard
            icon={Sparkles}
            value={ecoScore}
            title="Eco Score"
            description="Overall sustainability points"
            variant="green"
            isProminent={true}
          />
          {/* Waste Sorted -> light blue */}
          <StatCard
            icon={Recycle}
            value={wasteSorted}
            title="Waste Sorted"
            description="Items diverted properly"
            variant="blue"
          />
          {/* Challenges Completed -> light purple */}
          <StatCard
            icon={Trophy}
            value={completedChallengesCount}
            title="Challenges"
            description="Weekly quests accomplished"
            variant="purple"
          />
          {/* Quiz Score -> soft blue */}
          <StatCard
            icon={Gamepad2}
            value={quizScore}
            title="Quiz Score"
            description="EcoSort knowledge points"
            variant="softblue"
          />
          {/* Day Streak -> light amber */}
          <StatCard
            icon={Flame}
            value={`${streak} Days`}
            title="Day Streak"
            description="Consecutive active days"
            variant="amber"
          />
        </div>
      </section>

      {/* 2.5 WASTE SEGREGATION BREAKDOWN */}
      <section style={{ marginBottom: '2.5rem' }}>
        <div className="eco-card" style={{
          padding: '1.75rem',
          borderRadius: '20px',
          border: '1.5px solid #E2E8F0',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '1.25rem',
            borderBottom: '1px solid #F1F5F9',
            paddingBottom: '0.85rem'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Recycle size={22} color="#16A34A" />
                <h2 style={{ fontSize: '1.35rem', color: '#0F172A', letterSpacing: '-0.01em' }}>
                  WASTE SEGREGATION
                </h2>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '0.2rem' }}>
                EcoWise tracks how everyday items are properly diverted across 6 key municipal and circular streams
              </p>
            </div>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#DCFCE7',
              border: '1.5px solid #86EFAC',
              color: '#166534',
              padding: '0.45rem 1rem',
              borderRadius: '999px',
              fontWeight: 800,
              fontSize: '0.88rem'
            }}>
              <span>Total Waste Identified:</span>
              <span style={{ fontSize: '1.15rem', color: '#14532D' }}>{wasteCounts.total}</span>
            </div>
          </div>

          {/* 6 Clean Category Breakdown Tiles */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '0.85rem'
          }}>
            {/* Wet Waste */}
            <div style={{
              backgroundColor: '#F0FDF4',
              border: '1px solid #BBF7D0',
              borderRadius: '14px',
              padding: '0.9rem 0.75rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#166534', marginBottom: '0.4rem' }}>
                🟢 Wet Waste
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#16A34A', fontFamily: 'var(--font-heading)' }}>
                {wasteCounts.wetWaste}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '0.3rem' }}>
                Organic / Compost
              </div>
            </div>

            {/* Dry Waste */}
            <div style={{
              backgroundColor: '#F0F9FF',
              border: '1px solid #BAE6FD',
              borderRadius: '14px',
              padding: '0.9rem 0.75rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0369A1', marginBottom: '0.4rem' }}>
                🔵 Dry Waste
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0EA5E9', fontFamily: 'var(--font-heading)' }}>
                {wasteCounts.dryWaste}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '0.3rem' }}>
                Non-biodegradable
              </div>
            </div>

            {/* Recyclable */}
            <div style={{
              backgroundColor: '#ECFDF5',
              border: '1px solid #A7F3D0',
              borderRadius: '14px',
              padding: '0.9rem 0.75rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#065F46', marginBottom: '0.4rem' }}>
                ♻️ Recyclable
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--font-heading)' }}>
                {wasteCounts.recyclable}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '0.3rem' }}>
                Bottles, cans, paper
              </div>
            </div>

            {/* E-Waste */}
            <div style={{
              backgroundColor: '#FAF5FF',
              border: '1px solid #DDD6FE',
              borderRadius: '14px',
              padding: '0.9rem 0.75rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6D28D9', marginBottom: '0.4rem' }}>
                🟣 E-Waste
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#7C3AED', fontFamily: 'var(--font-heading)' }}>
                {wasteCounts.eWaste}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '0.3rem' }}>
                Gadgets, cords, circuits
              </div>
            </div>

            {/* Donate / Reuse */}
            <div style={{
              backgroundColor: '#FFFBEB',
              border: '1px solid #FDE68A',
              borderRadius: '14px',
              padding: '0.9rem 0.75rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#92400E', marginBottom: '0.4rem' }}>
                🟡 Donate / Reuse
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#D97706', fontFamily: 'var(--font-heading)' }}>
                {wasteCounts.donateReuse}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '0.3rem' }}>
                Clothes, shoes, books
              </div>
            </div>

            {/* Hazardous Disposal */}
            <div style={{
              backgroundColor: '#FEF2F2',
              border: '1px solid #FECACA',
              borderRadius: '14px',
              padding: '0.9rem 0.75rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#991B1B', marginBottom: '0.4rem' }}>
                🔴 Hazardous
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#DC2626', fontFamily: 'var(--font-heading)' }}>
                {wasteCounts.hazardous}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '0.3rem' }}>
                Batteries, CFLs, paint
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. QUICK ACTIONS WITH PRIMARY HIGHLIGHTED "IDENTIFY WASTE" */}
      <section style={{ marginBottom: '3.5rem' }}>
        <div style={{ marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1.5rem', color: '#0F172A' }}>Quick Actions</h2>
          <p style={{ fontSize: '0.88rem', color: '#64748B' }}>
            Choose a sustainability activity to build habits and gain eco points
          </p>
        </div>

        <div className="actions-grid">
          {/* PRIMARY HIGHLIGHTED ACTION: ♻️ Identify Waste */}
          <div className="hero-primary-action-card">
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: '#16A34A',
                color: '#FFFFFF',
                padding: '0.3rem 0.75rem',
                borderRadius: '999px',
                fontSize: '0.78rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '1rem'
              }}>
                ⭐ Primary Core Feature
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '16px',
                  backgroundColor: '#16A34A',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 6px 16px rgba(22, 163, 74, 0.3)'
                }}>
                  <Recycle size={30} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.45rem', color: '#14532D' }}>Identify Waste</h3>
                  <span style={{ fontSize: '0.85rem', color: '#15803D', fontWeight: 600 }}>
                    Instant AI Disposal Guidance
                  </span>
                </div>
              </div>

              <p style={{ color: '#166534', fontSize: '0.96rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                Find the right way to dispose of an item. Search through hundreds of household items or upload a photo to ensure proper segregation.
              </p>
            </div>

            <Link
              to="/waste-guide"
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '0.85rem 1.25rem',
                fontSize: '1rem',
                fontWeight: 700,
                backgroundColor: '#16A34A'
              }}
            >
              <span>Identify Waste →</span>
            </Link>
          </div>

          {/* SECONDARY ACTION 1: 🏆 Eco Challenges */}
          <div className="eco-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '4px solid #8B5CF6' }}>
            <div>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: '#F3E8FF',
                color: '#7C3AED',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <Trophy size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', color: '#0F172A' }}>Eco Challenges</h3>
              <p style={{ fontSize: '0.88rem', color: '#64748B', lineHeight: '1.5', marginBottom: '1.25rem' }}>
                Adopt weekly eco habits: refillable bottles, reduced single-use plastics, and light switches.
              </p>
            </div>
            <Link to="/challenges" className="btn btn-purple" style={{ width: '100%', padding: '0.7rem' }}>
              <span>View Challenges</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* SECONDARY ACTION 2: 🎮 Play EcoSort */}
          <div className="eco-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '4px solid #0EA5E9' }}>
            <div>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: '#E0F2FE',
                color: '#0284C7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <Gamepad2 size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', color: '#0F172A' }}>Play EcoSort</h3>
              <p style={{ fontSize: '0.88rem', color: '#64748B', lineHeight: '1.5', marginBottom: '1.25rem' }}>
                Test your sorting instincts in a 10-question rapid quiz and earn up to 200 points.
              </p>
            </div>
            <Link to="/ecosort" className="btn btn-blue" style={{ width: '100%', padding: '0.7rem' }}>
              <span>Play Quiz Game</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* SECONDARY ACTION 3: 🤖 Ask EcoAI */}
          <div className="eco-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '4px solid #10B981' }}>
            <div>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: '#D1FAE5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <Bot size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', color: '#0F172A' }}>Ask EcoAI</h3>
              <p style={{ fontSize: '0.88rem', color: '#64748B', lineHeight: '1.5', marginBottom: '1.25rem' }}>
                Got a tricky item or zero-waste question? Get instant answers from our AI sustainability bot.
              </p>
            </div>
            <Link to="/ecoai" className="btn btn-outline" style={{ width: '100%', padding: '0.7rem', borderColor: '#34D399', color: '#065F46', backgroundColor: '#ECFDF5' }}>
              <span>Ask Assistant</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. HOW ECOWISE WORKS (5-STEP FLOW) */}
      <section style={{ marginBottom: '3.5rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '620px', margin: '0 auto 1.75rem auto' }}>
          <h2 style={{ fontSize: '1.65rem', color: '#0F172A', marginBottom: '0.35rem' }}>
            How EcoWise Works
          </h2>
          <p style={{ color: '#64748B', fontSize: '0.92rem' }}>
            A proven 5-step circular lifecycle to turn small individual acts into global sustainability
          </p>
        </div>

        <div className="how-steps-container">
          {/* Step 1: Identify */}
          <div className="step-card">
            <span className="step-badge">STEP 01</span>
            <div className="step-icon-circle" style={{ backgroundColor: '#DCFCE7', color: '#16A34A' }}>
              <Search size={24} />
            </div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '0.35rem', color: '#0F172A' }}>01 Identify</h4>
            <p style={{ fontSize: '0.82rem', color: '#64748B', lineHeight: '1.45' }}>
              Search or scan any household product or byproduct before discarding.
            </p>
          </div>

          {/* Step 2: Learn */}
          <div className="step-card">
            <span className="step-badge" style={{ backgroundColor: '#E0F2FE', color: '#0284C7' }}>STEP 02</span>
            <div className="step-icon-circle" style={{ backgroundColor: '#E0F2FE', color: '#0284C7' }}>
              <Lightbulb size={24} />
            </div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '0.35rem', color: '#0F172A' }}>02 Learn</h4>
            <p style={{ fontSize: '0.82rem', color: '#64748B', lineHeight: '1.45' }}>
              Understand degradation cycles, bin designations, and recycling benefits.
            </p>
          </div>

          {/* Step 3: Act */}
          <div className="step-card">
            <span className="step-badge" style={{ backgroundColor: '#F3E8FF', color: '#7C3AED' }}>STEP 03</span>
            <div className="step-icon-circle" style={{ backgroundColor: '#F3E8FF', color: '#7C3AED' }}>
              <Recycle size={24} />
            </div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '0.35rem', color: '#0F172A' }}>03 Act</h4>
            <p style={{ fontSize: '0.82rem', color: '#64748B', lineHeight: '1.45' }}>
              Dispose, compost, donate, or recycle into authorized channels.
            </p>
          </div>

          {/* Step 4: Earn */}
          <div className="step-card">
            <span className="step-badge" style={{ backgroundColor: '#FEF3C7', color: '#D97706' }}>STEP 04</span>
            <div className="step-icon-circle" style={{ backgroundColor: '#FEF3C7', color: '#D97706' }}>
              <Trophy size={24} />
            </div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '0.35rem', color: '#0F172A' }}>04 Earn</h4>
            <p style={{ fontSize: '0.82rem', color: '#64748B', lineHeight: '1.45' }}>
              Collect Eco Points, maintain day streaks, and unlock achievement badges.
            </p>
          </div>

          {/* Step 5: Improve */}
          <div className="step-card">
            <span className="step-badge" style={{ backgroundColor: '#D1FAE5', color: '#059669' }}>STEP 05</span>
            <div className="step-icon-circle" style={{ backgroundColor: '#D1FAE5', color: '#059669' }}>
              <Globe size={24} />
            </div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '0.35rem', color: '#0F172A' }}>05 Improve</h4>
            <p style={{ fontSize: '0.82rem', color: '#64748B', lineHeight: '1.45' }}>
              Measure long-term waste reduction and contribute to UN SDG goals.
            </p>
          </div>
        </div>
      </section>

      {/* 5. SDG SECTION */}
      <section style={{ marginBottom: '2rem' }}>
        <div style={{ marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1.5rem', color: '#0F172A' }}>UN Sustainable Development Goals</h2>
          <p style={{ fontSize: '0.88rem', color: '#64748B' }}>
            EcoWise directly aligns civic actions with global United Nations sustainability targets
          </p>
        </div>

        <div className="sdg-grid">
          {/* SDG 11: Sustainable Cities & Communities -> Amber */}
          <div className="sdg-card sdg-11">
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              backgroundColor: '#F59E0B',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.2rem',
              flexShrink: 0
            }}>
              11
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#B45309', textTransform: 'uppercase' }}>
                SDG 11
              </span>
              <h3 style={{ fontSize: '1.1rem', color: '#78350F', marginBottom: '0.35rem' }}>
                Sustainable Cities & Communities
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#92400E', lineHeight: '1.45' }}>
                Reduce the adverse per capita environmental impact of cities by improving municipal solid waste management and air quality.
              </p>
            </div>
          </div>

          {/* SDG 12: Responsible Consumption -> Golden / Amber */}
          <div className="sdg-card sdg-12">
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              backgroundColor: '#EA580C',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.2rem',
              flexShrink: 0
            }}>
              12
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#C2410C', textTransform: 'uppercase' }}>
                SDG 12
              </span>
              <h3 style={{ fontSize: '1.1rem', color: '#9A3412', marginBottom: '0.35rem' }}>
                Responsible Consumption & Production
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#9A3412', lineHeight: '1.45' }}>
                Substantially reduce waste generation through prevention, reduction, recycling, and reuse in everyday citizen households.
              </p>
            </div>
          </div>

          {/* SDG 13: Climate Action -> Green */}
          <div className="sdg-card sdg-13">
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              backgroundColor: '#16A34A',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.2rem',
              flexShrink: 0
            }}>
              13
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#15803D', textTransform: 'uppercase' }}>
                SDG 13
              </span>
              <h3 style={{ fontSize: '1.1rem', color: '#14532D', marginBottom: '0.35rem' }}>
                Climate Action
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#166534', lineHeight: '1.45' }}>
                Diverting organic waste from anaerobic landfills drastically prevents potent methane gas release into our atmosphere.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
