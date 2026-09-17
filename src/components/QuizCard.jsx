import React from 'react';
import { CheckCircle2, XCircle, Award, ArrowRight } from 'lucide-react';

export default function QuizCard({
  question,
  currentIndex,
  totalQuestions,
  score,
  selectedOption,
  isAnswered,
  onSelectOption,
  onNext
}) {
  return (
    <div className="eco-card" style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem' }}>
      {/* Top Header with Progress & Score */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <span style={{
          background: '#E0F2FE',
          color: '#0284C7',
          padding: '0.3rem 0.75rem',
          borderRadius: '999px',
          fontWeight: 700,
          fontSize: '0.85rem'
        }}>
          Question {currentIndex + 1} of {totalQuestions}
        </span>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          background: '#DCFCE7',
          color: '#166534',
          padding: '0.3rem 0.75rem',
          borderRadius: '999px',
          fontWeight: 800,
          fontSize: '0.9rem'
        }}>
          <Award size={16} />
          <span>Score: {score} pts</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{
        width: '100%',
        height: '8px',
        backgroundColor: '#E2E8F0',
        borderRadius: '999px',
        overflow: 'hidden',
        marginBottom: '1.75rem'
      }}>
        <div style={{
          width: `${((currentIndex + 1) / totalQuestions) * 100}%`,
          height: '100%',
          backgroundColor: '#16A34A',
          transition: 'width 0.3s ease'
        }} />
      </div>

      {/* Item badge & Question Title */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{
          display: 'inline-block',
          fontSize: '0.85rem',
          fontWeight: 700,
          color: '#8B5CF6',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          marginBottom: '0.4rem'
        }}>
          Item: {question.item}
        </div>
        <h3 style={{ fontSize: '1.35rem', color: '#0F172A', lineHeight: '1.4' }}>
          {question.question}
        </h3>
      </div>

      {/* Options List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {question.options.map((option, idx) => {
          const isSelected = selectedOption === idx;
          const isCorrect = idx === question.correctIndex;

          let btnBg = '#F8FAFC';
          let btnBorder = '#E2E8F0';
          let btnColor = '#0F172A';

          if (isAnswered) {
            if (isCorrect) {
              btnBg = '#DCFCE7';
              btnBorder = '#22C55E';
              btnColor = '#14532D';
            } else if (isSelected && !isCorrect) {
              btnBg = '#FEE2E2';
              btnBorder = '#EF4444';
              btnColor = '#991B1B';
            }
          } else if (isSelected) {
            btnBg = '#E0F2FE';
            btnBorder = '#0EA5E9';
            btnColor = '#0369A1';
          }

          return (
            <button
              key={idx}
              onClick={() => !isAnswered && onSelectOption(idx)}
              disabled={isAnswered}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.9rem 1.25rem',
                backgroundColor: btnBg,
                border: `2px solid ${btnBorder}`,
                borderRadius: '12px',
                textAlign: 'left',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: btnColor,
                cursor: isAnswered ? 'default' : 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <span>{option}</span>
              {isAnswered && isCorrect && <CheckCircle2 size={20} color="#16A34A" />}
              {isAnswered && isSelected && !isCorrect && <XCircle size={20} color="#EF4444" />}
            </button>
          );
        })}
      </div>

      {/* Answer feedback & Explanation */}
      {isAnswered && (
        <div style={{
          backgroundColor: selectedOption === question.correctIndex ? '#F0FDF4' : '#FFFBEB',
          border: `1.5px solid ${selectedOption === question.correctIndex ? '#86EFAC' : '#FDE68A'}`,
          borderRadius: '14px',
          padding: '1rem 1.25rem',
          marginBottom: '1.5rem',
          animation: 'fadeIn 0.25s ease'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: 800,
            fontSize: '1rem',
            color: selectedOption === question.correctIndex ? '#16A34A' : '#D97706',
            marginBottom: '0.4rem'
          }}>
            {selectedOption === question.correctIndex ? (
              <>
                <CheckCircle2 size={20} />
                <span>Spot On! +20 Points Earned</span>
              </>
            ) : (
              <>
                <XCircle size={20} />
                <span>Not quite. Proper disposal: {question.correctAnswer}</span>
              </>
            )}
          </div>
          <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.5' }}>
            {question.explanation}
          </p>
        </div>
      )}

      {/* Next Question CTA */}
      {isAnswered && (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={onNext}
            className="btn btn-primary"
            style={{ padding: '0.75rem 1.5rem', fontSize: '0.95rem' }}
          >
            <span>{currentIndex + 1 === totalQuestions ? 'View Final Results' : 'Next Question'}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
