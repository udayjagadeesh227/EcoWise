import React, { useState } from 'react';
import { Gamepad2, Trophy, Award, RotateCcw, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import QuizCard from '../components/QuizCard';
import { updateQuizScore, addEcoScore, logActivity } from '../utils/storage';

export default function EcoSort() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (index) => {
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === currentQuestion.correctIndex) {
      setScore(prev => prev + 20);
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Finished quiz!
      setIsFinished(true);
      // Persist score & log
      if (score > 0) {
        updateQuizScore(score);
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setCorrectCount(0);
    setIsFinished(false);
  };

  return (
    <div className="ecosort-page">
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2.5rem auto' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          backgroundColor: '#E0F2FE',
          color: '#0284C7',
          padding: '0.35rem 0.85rem',
          borderRadius: '999px',
          fontSize: '0.85rem',
          fontWeight: 700,
          marginBottom: '0.85rem'
        }}>
          <Gamepad2 size={16} />
          <span>Interactive Sustainability Quiz</span>
        </div>
        <h1 style={{ fontSize: '2.5rem', color: '#14532D', marginBottom: '0.5rem' }}>
          EcoSort Game
        </h1>
        <p style={{ fontSize: '1.05rem', color: '#64748B', lineHeight: '1.5' }}>
          Sharpen your waste sorting reflexes! Test your disposal knowledge across 10 essential everyday household items.
        </p>
      </div>

      {/* Main Quiz Flow */}
      {!isFinished ? (
        <QuizCard
          question={currentQuestion}
          currentIndex={currentIndex}
          totalQuestions={QUIZ_QUESTIONS.length}
          score={score}
          selectedOption={selectedOption}
          isAnswered={isAnswered}
          onSelectOption={handleSelectOption}
          onNext={handleNext}
        />
      ) : (
        /* End of Quiz Celebration Screen */
        <div className="eco-card" style={{
          maxWidth: '640px',
          margin: '0 auto',
          textAlign: 'center',
          padding: '3rem 2rem',
          border: '2px solid #86EFAC',
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F0FDF4 100%)'
        }}>
          <div style={{
            width: '84px',
            height: '84px',
            borderRadius: '50%',
            backgroundColor: '#DCFCE7',
            color: '#16A34A',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.25rem',
            boxShadow: '0 8px 24px rgba(22, 163, 74, 0.25)'
          }}>
            <Trophy size={48} />
          </div>

          <h2 style={{ fontSize: '2.2rem', color: '#14532D', marginBottom: '0.5rem' }}>
            🎉 Great Job!
          </h2>

          <p style={{ fontSize: '1.05rem', color: '#475569', marginBottom: '1.75rem' }}>
            You answered <strong>{correctCount}</strong> out of <strong>{QUIZ_QUESTIONS.length}</strong> questions correctly!
          </p>

          <div style={{
            display: 'inline-flex',
            alignItems: 'baseline',
            gap: '0.4rem',
            backgroundColor: '#DCFCE7',
            border: '1.5px solid #86EFAC',
            padding: '1rem 2rem',
            borderRadius: '16px',
            marginBottom: '2rem'
          }}>
            <span style={{ fontSize: '2.8rem', fontWeight: 800, color: '#166534', fontFamily: 'var(--font-heading)' }}>
              {score}
            </span>
            <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#15803D' }}>/ 200 pts</span>
          </div>

          <div style={{
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '1rem',
            maxWidth: '440px',
            margin: '0 auto 2rem auto',
            fontSize: '0.88rem',
            color: '#64748B'
          }}>
            ✨ Your score has been added to your profile Eco Score and activity log!
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <button
              onClick={handleRestart}
              className="btn btn-primary"
              style={{ padding: '0.8rem 1.8rem', fontSize: '1rem' }}
            >
              <RotateCcw size={18} />
              <span>Play Again</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
