import React, { useState, useEffect } from 'react';

const messages = [
  'Initializing data pipelines...',
  'Loading neural networks...',
  'Calibrating race engine...',
  'Ready.',
];

export default function LoadingScreen({ onComplete }) {
  const [msgIndex, setMsgIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => {
        if (prev < messages.length - 1) return prev + 1;
        return prev;
      });
    }, 600);

    const fadeTimer = setTimeout(() => {
      setOpacity(0);
    }, 2200);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#06091A',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: opacity,
        transition: 'opacity 0.6s ease',
      }}
    >
      <style>{`
        @keyframes vvPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        @keyframes fillBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>

      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: '72px',
          fontWeight: 800,
          color: '#4F7FFF',
          animation: 'vvPulse 2s ease-in-out infinite',
          userSelect: 'none',
        }}
      >
        VV
      </div>

      <div
        style={{
          width: '220px',
          height: '2px',
          background: '#1E2535',
          borderRadius: '99px',
          marginTop: '24px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #4F7FFF, #9B6DFF)',
            borderRadius: '99px',
            animation: 'fillBar 2.2s ease-in-out forwards',
          }}
        />
      </div>

      <div
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: '12px',
          color: '#6B7A99',
          marginTop: '16px',
          letterSpacing: '0.5px',
        }}
      >
        {messages[msgIndex]}
      </div>
    </div>
  );
}
