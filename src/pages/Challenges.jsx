import React, { useState, useEffect } from 'react';
import { Trophy, Award, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';
import ChallengeCard from '../components/ChallengeCard';
import { DEFAULT_CHALLENGES } from '../data/challenges';
import { getStorage, setStorage, addEcoScore, logActivity } from '../utils/storage';

export default function Challenges() {
  const [challenges, setChallenges] = useState(() => 
    getStorage('ecowise_challenges', DEFAULT_CHALLENGES)
  );
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    setStorage('ecowise_challenges', challenges);
  }, [challenges]);

  const handleCompleteChallenge = (id) => {
    setChallenges(prev => prev.map(c => {
      if (c.id === id && !c.isCompleted) {
        addEcoScore(c.points);
        logActivity(`Completed challenge: ${c.title}`, 'Challenges', c.points);
        setFeedback(`🎉 Awesome! +${c.points} Eco Points earned for completing "${c.title}"!`);
        return {
          ...c,
          currentProgress: c.targetDays,
          isCompleted: true
        };
      }
      return c;
    }));

    setTimeout(() => {
      setFeedback(null);
    }, 4500);
  };

  const handleProgressChallenge = (id) => {
    setChallenges(prev => prev.map(c => {
      if (c.id === id && !c.isCompleted) {
        const nextProg = Math.min(c.targetDays, c.currentProgress + 1);
        const willComplete = nextProg >= c.targetDays;
        if (willComplete) {
          addEcoScore(c.points);
          logActivity(`Completed challenge: ${c.title}`, 'Challenges', c.points);
          setFeedback(`🎉 Awesome! You completed "${c.title}" (+${c.points} Eco Points)!`);
        } else {
          addEcoScore(5);
          logActivity(`Logged habit for: ${c.title}`, 'Challenges', 5);
          setFeedback(`👍 Logged 1 day towards "${c.title}" (+5 Eco Points)!`);
        }
        return {
          ...c,
          currentProgress: nextProg,
          isCompleted: willComplete
        };
      }
      return c;
    }));

    setTimeout(() => {
      setFeedback(null);
    }, 4000);
  };

  const handleResetChallenges = () => {
    setChallenges(DEFAULT_CHALLENGES);
    setStorage('ecowise_challenges', DEFAULT_CHALLENGES);
    setFeedback('🔄 Challenges reset to weekly baseline.');
    setTimeout(() => setFeedback(null), 3000);
  };

  const completedCount = challenges.filter(c => c.isCompleted).length;
  const totalPointsAvailable = challenges.reduce((acc, c) => acc + c.points, 0);

  return (
    <div className="challenges-page">
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2.5rem auto' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          backgroundColor: '#F3E8FF',
          color: '#7C3AED',
          padding: '0.35rem 0.85rem',
          borderRadius: '999px',
          fontSize: '0.85rem',
          fontWeight: 700,
          marginBottom: '0.85rem'
        }}>
          <Trophy size={16} />
          <span>Weekly Sustainability Quests</span>
        </div>
        <h1 style={{ fontSize: '2.5rem', color: '#14532D', marginBottom: '0.5rem' }}>
          Eco Challenges
        </h1>
        <p style={{ fontSize: '1.05rem', color: '#64748B', lineHeight: '1.5' }}>
          Build lifelong green habits one day at a time. Complete weekly challenges to earn Eco Points, level up, and unlock prestigious badges.
        </p>
      </div>

      {/* Overview Stat Strip */}
      <div style={{
        maxWidth: '960px',
        margin: '0 auto 2rem auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #FAF5FF 0%, #F0FDF4 100%)',
        border: '1.5px solid #DDD6FE',
        borderRadius: '16px',
        padding: '1.25rem 1.75rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: '#8B5CF6',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Award size={26} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.15rem', color: '#0F172A' }}>
              {completedCount} of {challenges.length} Challenges Done
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#64748B' }}>
              Earn up to {totalPointsAvailable} points by maintaining consistent daily actions
            </p>
          </div>
        </div>

        <button
          onClick={handleResetChallenges}
          className="btn btn-outline"
          style={{
            fontSize: '0.85rem',
            padding: '0.45rem 0.85rem',
            backgroundColor: '#FFFFFF',
            borderColor: '#CBD5E1'
          }}
          title="Reset weekly challenges"
        >
          <RotateCcw size={14} />
          <span>Reset Week</span>
        </button>
      </div>

      {/* Floating feedback alert */}
      {feedback && (
        <div style={{
          maxWidth: '960px',
          margin: '0 auto 1.5rem auto',
          padding: '0.85rem 1.25rem',
          backgroundColor: '#DCFCE7',
          border: '1.5px solid #86EFAC',
          borderRadius: '12px',
          color: '#166534',
          fontWeight: 700,
          fontSize: '0.95rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          animation: 'fadeIn 0.25s ease'
        }}>
          <Sparkles size={20} color="#16A34A" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Challenges Grid */}
      <div style={{
        maxWidth: '960px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
        gap: '1.5rem'
      }}>
        {challenges.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            onComplete={handleCompleteChallenge}
            onProgress={handleProgressChallenge}
          />
        ))}
      </div>
    </div>
  );
}
