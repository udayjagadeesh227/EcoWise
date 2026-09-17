import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, Sparkles, RefreshCw, User, HelpCircle, ShieldAlert } from 'lucide-react';
import { getChatHistory, saveChatHistory } from '../utils/storage';
import { sendChatMessage } from '../services/ecoAI';

export default function EcoAI() {
  const [messages, setMessages] = useState(getChatHistory());
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeNotice, setActiveNotice] = useState(null);
  const messagesEndRef = useRef(null);

  const suggestedQuestions = [
    'What should I do with an old battery?',
    'Can plastic bottles be recycled?',
    'How can I reduce plastic use?',
    'How should I dispose of an old phone?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    saveChatHistory(messages);
  }, [messages]);

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await sendChatMessage(query, messages);
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: response.reply,
        isDemo: response.isDemoMode,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      if (response.notice) {
        setActiveNotice(response.notice);
      }
    } catch (err) {
      const errorMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: "I'm having trouble connecting right now. Please try asking again in a moment.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    const initial = [
      {
        id: 1,
        sender: 'ai',
        text: "Hello! I am EcoAI, your personal sustainability and waste management assistant 🌱. How can I help you sort waste or live more sustainably today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
    setMessages(initial);
    saveChatHistory(initial);
    setActiveNotice(null);
  };

  return (
    <div className="ecoai-page" style={{ maxWidth: '860px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
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
          <Sparkles size={16} />
          <span>AI Sustainability Assistant</span>
        </div>

        <h1 style={{ fontSize: '2.4rem', color: '#14532D', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem' }}>
          <span>🤖 EcoAI</span>
        </h1>
        <p style={{ fontSize: '1rem', color: '#64748B' }}>
          Your personal sustainability assistant. Ask questions about recycling, zero-waste tips, and eco-friendly alternatives.
        </p>
      </div>

      {/* Mode / Health Notice */}
      {activeNotice && (
        <div style={{
          backgroundColor: '#EFF6FF',
          border: '1px solid #BFDBFE',
          borderRadius: '12px',
          padding: '0.65rem 1rem',
          fontSize: '0.82rem',
          color: '#1E40AF',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <ShieldAlert size={16} color="#3B82F6" style={{ flexShrink: 0 }} />
          <span>{activeNotice}</span>
        </div>
      )}

      {/* Suggested Questions Chips */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        flexWrap: 'wrap',
        marginBottom: '1rem'
      }}>
        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748B' }}>
          Suggested questions:
        </span>
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            disabled={isLoading}
            style={{
              backgroundColor: '#FFFFFF',
              color: '#4338CA',
              border: '1px solid #C7D2FE',
              padding: '0.35rem 0.75rem',
              borderRadius: '999px',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Container */}
      <div className="eco-card" style={{
        padding: 0,
        overflow: 'hidden',
        border: '1.5px solid #E2E8F0',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        height: '560px'
      }}>
        {/* Chat Header */}
        <div style={{
          padding: '0.85rem 1.25rem',
          borderBottom: '1px solid #E2E8F0',
          backgroundColor: '#F8FAFC',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: '#8B5CF6',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Bot size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0F172A' }}>EcoAI Online</div>
              <div style={{ fontSize: '0.75rem', color: '#16A34A', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#22C55E' }} />
                <span>Ready to assist</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleClearChat}
            className="btn btn-outline"
            style={{ padding: '0.35rem 0.7rem', fontSize: '0.78rem', backgroundColor: '#FFFFFF' }}
            title="Reset conversation"
          >
            <RefreshCw size={12} />
            <span>Reset Chat</span>
          </button>
        </div>

        {/* Message Log */}
        <div style={{
          flex: 1,
          padding: '1.25rem',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          backgroundColor: '#FCFDFF'
        }}>
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  justifyContent: isUser ? 'flex-end' : 'flex-start',
                  gap: '0.65rem',
                  alignItems: 'flex-start'
                }}
              >
                {!isUser && (
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#EDE9FE',
                    color: '#7C3AED',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    <Bot size={18} />
                  </div>
                )}

                <div style={{
                  maxWidth: '78%',
                  backgroundColor: isUser ? '#16A34A' : '#FFFFFF',
                  color: isUser ? '#FFFFFF' : '#0F172A',
                  padding: '0.85rem 1.15rem',
                  borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  boxShadow: '0 2px 8px rgba(15, 23, 42, 0.05)',
                  border: isUser ? 'none' : '1px solid #E2E8F0',
                  lineHeight: '1.55',
                  fontSize: '0.94rem'
                }}>
                  <div style={{ whiteSpace: 'pre-line' }}>
                    {msg.text}
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '0.4rem',
                    fontSize: '0.72rem',
                    color: isUser ? 'rgba(255,255,255,0.75)' : '#94A3B8',
                    marginTop: '0.4rem'
                  }}>
                    {msg.isDemo && (
                      <span style={{
                        backgroundColor: '#FEF3C7',
                        color: '#B45309',
                        padding: '0.1rem 0.35rem',
                        borderRadius: '4px',
                        fontWeight: 700
                      }}>
                        Demo
                      </span>
                    )}
                    <span>{msg.timestamp}</span>
                  </div>
                </div>

                {isUser && (
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#DCFCE7',
                    color: '#16A34A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    <User size={18} />
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isLoading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#EDE9FE',
                color: '#7C3AED',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Bot size={18} />
              </div>
              <div style={{
                backgroundColor: '#F1F5F9',
                padding: '0.75rem 1rem',
                borderRadius: '16px 16px 16px 4px',
                color: '#64748B',
                fontSize: '0.88rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span>EcoAI is thinking...</span>
                <span className="typing-dots">🌱</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div style={{
          padding: '1rem 1.25rem',
          borderTop: '1px solid #E2E8F0',
          backgroundColor: '#FFFFFF'
        }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            style={{ display: 'flex', gap: '0.75rem' }}
          >
            <input
              type="text"
              className="form-input"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask how to dispose of an item, reduce plastic, or live sustainably..."
              disabled={isLoading}
              style={{ flex: 1, padding: '0.75rem 1rem' }}
            />
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="btn btn-primary"
              style={{ padding: '0.75rem 1.4rem' }}
            >
              <Send size={18} />
              <span className="desktop-only-text">Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
