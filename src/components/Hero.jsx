import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import NeuralBackground from './NeuralBackground';
import { personalInfo, typingLines, heroStats } from '../utils/data';

/* ─── useCountUp Hook ─── */
function useCountUp(end, duration = 2000, decimals = 0) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTime;
    let frame;
    const animate = (ts) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(parseFloat((eased * end).toFixed(decimals)));
      if (p < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [end, duration, decimals]);
  return count;
}

/* ─── Styles ─── */
const heroStyles = `
  .hero {
    min-height: 100vh; display: flex; align-items: center; position: relative;
    overflow: hidden; padding-top: 80px;
  }
  .hero-content {
    position: relative; z-index: 1; max-width: 1200px;
    margin: 0 auto; padding: 0 24px; width: 100%; text-align: center;
  }
  .hero-greeting {
    font-family: 'DM Mono', monospace; font-size: 12px; color: #00D4A8;
    letter-spacing: 3px; text-transform: uppercase; margin-bottom: 12px;
  }
  .hero-name {
    font-family: 'Syne', sans-serif; font-weight: 800;
    font-size: clamp(52px, 8vw, 92px); color: #FFFFFF;
    line-height: 1.05; letter-spacing: -0.02em; margin-bottom: 16px;
  }
  .hero-role {
    font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 600;
    background: linear-gradient(90deg, #00D4A8, #3B8BFF);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text; margin-bottom: 8px;
  }
  .hero-uni {
    font-family: 'DM Mono', monospace; font-size: 14px; color: #8899AA;
    margin-bottom: 24px;
  }
  .hero-typing {
    font-family: 'DM Mono', monospace; font-size: 16px; color: #8899AA;
    min-height: 28px; margin-bottom: 40px;
  }
  .hero-typing-prefix { color: #00D4A8; }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  .hero-cursor { animation: blink 0.8s step-end infinite; color: #00D4A8; }

  .hero-buttons { display: flex; gap: 16px; justify-content: center; margin-bottom: 52px; flex-wrap: wrap; }
  .hero-btn-primary {
    font-family: 'Syne', sans-serif; font-weight: 600; font-size: 15px;
    background: #00D4A8; color: #080C14; padding: 14px 32px;
    border-radius: 8px; border: none; text-decoration: none;
    transition: all 0.3s ease; display: inline-block;
  }
  .hero-btn-primary:hover { background: #00BF96; transform: translateY(-2px); color: #080C14; }
  .hero-btn-outline {
    font-family: 'Syne', sans-serif; font-weight: 600; font-size: 15px;
    background: transparent; color: #00D4A8; padding: 14px 32px;
    border-radius: 8px; border: 1.5px solid #00D4A8; text-decoration: none;
    transition: all 0.3s ease; display: inline-block;
  }
  .hero-btn-outline:hover { background: rgba(0,212,168,0.08); transform: translateY(-2px); color: #00D4A8; }

  .hero-stats { display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; }
  .hero-stat-card {
    background: #0F1722; border-radius: 14px; padding: 22px 26px;
    transition: all 0.3s ease; min-width: 155px; flex: 1; max-width: 240px;
  }
  .hero-stat-card.accent-teal {
    border: 1px solid rgba(0,212,168,0.3);
    box-shadow: 0 0 24px rgba(0,212,168,0.12);
  }
  .hero-stat-card.accent-blue {
    border: 1px solid rgba(59,139,255,0.3);
    box-shadow: 0 0 24px rgba(59,139,255,0.12);
  }
  .hero-stat-card:hover { transform: translateY(-5px); }
  .hero-stat-card.accent-teal:hover { box-shadow: 0 0 32px rgba(0,212,168,0.32); }
  .hero-stat-card.accent-blue:hover { box-shadow: 0 0 32px rgba(59,139,255,0.32); }
  .hero-stat-value {
    font-family: 'Syne', sans-serif; font-size: 30px; font-weight: 700;
    line-height: 1; margin-bottom: 6px;
  }
  .hero-stat-value.teal { color: #00D4A8; }
  .hero-stat-value.blue { color: #3B8BFF; }
  .hero-stat-label {
    font-family: 'DM Mono', monospace; font-size: 11px; color: #8899AA;
    text-transform: uppercase; letter-spacing: 1px;
  }

  .hero-scroll {
    margin-top: 48px; display: flex; flex-direction: column;
    align-items: center; gap: 6px;
  }
  .hero-scroll-text {
    font-family: 'DM Mono', monospace; font-size: 10px; color: #00D4A8;
    letter-spacing: 2px; text-transform: uppercase;
  }
  @keyframes bounceChevron {
    0%,100% { transform: translateY(0); }
    50% { transform: translateY(6px); }
  }
  .hero-chevron {
    color: #00D4A8; font-size: 18px;
    animation: bounceChevron 1.5s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    .hero { padding-top: 60px; }
    .hero-stats { flex-direction: column; align-items: center; }
    .hero-stat-card { min-width: unset; width: 100%; max-width: 100%; }
    .hero-buttons { flex-direction: column; align-items: center; }
    .hero-role { font-size: 18px; }
  }
`;

/* ─── StatCard ─── */
function StatCard({ stat, delay }) {
  const count = useCountUp(stat.value, 2000, stat.decimals || 0);
  return (
    <motion.div
      className={`hero-stat-card accent-${stat.accent}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className={`hero-stat-value ${stat.accent}`}>
        {count}{stat.suffix}
      </div>
      <div className="hero-stat-label">{stat.label}</div>
    </motion.div>
  );
}

/* ─── Hero ─── */
export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const lineIdx = useRef(0);
  const charIdx = useRef(0);
  const isDeleting = useRef(false);

  useEffect(() => {
    let timeout;
    const tick = () => {
      const currentLine = typingLines[lineIdx.current];
      if (!isDeleting.current) {
        charIdx.current++;
        setTypedText(currentLine.substring(0, charIdx.current));
        if (charIdx.current >= currentLine.length) {
          isDeleting.current = true;
          timeout = setTimeout(tick, 2000);
        } else {
          timeout = setTimeout(tick, 45);
        }
      } else {
        charIdx.current--;
        setTypedText(currentLine.substring(0, charIdx.current));
        if (charIdx.current <= 0) {
          isDeleting.current = false;
          lineIdx.current = (lineIdx.current + 1) % typingLines.length;
          timeout = setTimeout(tick, 400);
        } else {
          timeout = setTimeout(tick, 28);
        }
      }
    };
    timeout = setTimeout(tick, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <style>{heroStyles}</style>
      <section className="hero">
        <NeuralBackground />
        <div className="hero-content">
          <motion.p
            className="hero-greeting"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            HELLO, I'M
          </motion.p>

          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {personalInfo.shortName}
          </motion.h1>

          <motion.p
            className="hero-role"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {personalInfo.role}
          </motion.p>

          <motion.p
            className="hero-uni"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            B.Tech Big Data @ {personalInfo.university} · {personalInfo.location}
          </motion.p>

          <motion.div
            className="hero-typing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <span className="hero-typing-prefix">▸ </span>
            {typedText}
            <span className="hero-cursor">|</span>
          </motion.div>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <a href="#projects" className="hero-btn-primary">View Projects</a>
            <a href="/vijay-cv.pdf" download className="hero-btn-outline">Download CV ↓</a>
          </motion.div>

          <div className="hero-stats">
            {heroStats.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} delay={1.2 + i * 0.12} />
            ))}
          </div>

          <motion.div
            className="hero-scroll"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.0 }}
          >
            <span className="hero-scroll-text">SCROLL</span>
            <span className="hero-chevron">⌄</span>
          </motion.div>
        </div>
      </section>
    </>
  );
}
