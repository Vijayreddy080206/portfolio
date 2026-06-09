import React, { useState, useEffect, useRef, useCallback } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const ringEl = useRef(null);
  const frameRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
      return;
    }

    const onMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e) => {
      if (e.target.closest('a, button, [data-hover]')) {
        setHovering(true);
      }
    };

    const onMouseOut = (e) => {
      if (e.target.closest('a, button, [data-hover]')) {
        setHovering(false);
      }
    };

    const lerp = () => {
      ringPos.current.x += (pos.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.y - ringPos.current.y) * 0.12;
      if (ringEl.current) {
        ringEl.current.style.transform = `translate(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px) scale(${hovering ? 1.6 : 1})`;
      }
      frameRef.current = requestAnimationFrame(lerp);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    frameRef.current = requestAnimationFrame(lerp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [pos.x, pos.y, hovering]);

  if (isMobile) return null;

  return (
    <>
      {/* Dot */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          background: '#6C8EFF',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: `translate(${pos.x - 4}px, ${pos.y - 4}px)`,
          transition: 'none',
        }}
      />
      {/* Ring */}
      <div
        ref={ringEl}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '36px',
          height: '36px',
          border: `1.5px solid ${hovering ? 'rgba(108,142,255,0.8)' : '#6C8EFF'}`,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9997,
          transition: 'border-color 0.2s ease, transform 0.08s ease',
        }}
      />
    </>
  );
}
