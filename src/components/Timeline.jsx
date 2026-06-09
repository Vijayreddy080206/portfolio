import React from 'react';
import { motion } from 'framer-motion';
import {
  IoSchoolSharp, IoBarChartSharp, IoPeopleSharp, IoCodeSlashSharp,
  IoRibbonSharp, IoFlagSharp, IoBulbSharp, IoRocketSharp,
} from 'react-icons/io5';
import { timelineEvents } from '../utils/data';

const iconMap = {
  graduation: IoSchoolSharp, university: IoSchoolSharp, chart: IoBarChartSharp,
  users: IoPeopleSharp, code: IoCodeSlashSharp, certificate: IoRibbonSharp,
  flag: IoFlagSharp, brain: IoBulbSharp, rocket: IoRocketSharp,
};

const tlStyles = `
  .tl-section { padding: 100px 0; }
  .tl-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
  .tl-heading {
    font-family: 'Syne', sans-serif; font-size: clamp(32px,5vw,48px);
    font-weight: 700; color: #FFFFFF; margin-bottom: 8px;
  }
  .tl-heading-line {
    width: 48px; height: 3px; background: #6C8EFF;
    border-radius: 99px; margin-bottom: 48px;
  }
  .tl-wrapper { position: relative; padding: 20px 0; }
  .tl-wrapper::before {
    content: ''; position: absolute; left: 50%; top: 0; bottom: 0;
    width: 2px; background: linear-gradient(180deg, #6C8EFF, #A78BFA);
    transform: translateX(-50%);
  }
  .tl-entry {
    display: flex; align-items: flex-start; position: relative;
    margin-bottom: 48px; width: 100%;
  }
  .tl-entry:last-child { margin-bottom: 0; }
  .tl-entry.left { justify-content: flex-start; padding-right: calc(50% + 32px); }
  .tl-entry.right { justify-content: flex-end; padding-left: calc(50% + 32px); }

  /* ── Dots ── */
  .tl-dot {
    position: absolute; left: 50%; top: 18px; border-radius: 50%;
    transform: translateX(-50%); z-index: 2;
  }
  .tl-dot.default { width: 12px; height: 12px; background: #0A0E1A; }
  .tl-dot.default.teal { border: 2px solid #6C8EFF; }
  .tl-dot.default.blue { border: 2px solid #A78BFA; }
  .tl-dot.default.gray { border: 2px solid #2A3547; }

  @keyframes dotPulse {
    0%   { box-shadow: 0 0 0 4px rgba(108,142,255,0.2), 0 0 20px rgba(108,142,255,0.5); }
    50%  { box-shadow: 0 0 0 8px rgba(108,142,255,0.1), 0 0 30px rgba(108,142,255,0.7); }
    100% { box-shadow: 0 0 0 4px rgba(108,142,255,0.2), 0 0 20px rgba(108,142,255,0.5); }
  }
  .tl-dot.highlight {
    width: 20px; height: 20px; background: #6C8EFF; border: none;
    box-shadow: 0 0 0 4px rgba(108,142,255,0.2), 0 0 20px rgba(108,142,255,0.5);
    animation: dotPulse 2s ease-in-out infinite;
  }

  @keyframes rocketPulse {
    0%,100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
  .tl-dot.pulse {
    width: 16px; height: 16px; background: #6C8EFF; border: none;
    animation: rocketPulse 1.5s ease-in-out infinite;
  }

  /* ── Cards ── */
  .tl-card {
    max-width: 420px; background: #111827; border-radius: 12px;
    padding: 20px 24px; transition: all 0.3s ease; width: 100%;
  }
  .tl-card.teal { border-left: 3px solid #6C8EFF; }
  .tl-card.blue { border-left: 3px solid #A78BFA; }
  .tl-card.gray { border-left: 3px solid #2A3547; }
  .tl-card:hover { transform: translateY(-2px); }
  .tl-card.highlight-card {
    box-shadow: 0 0 30px rgba(108,142,255,0.08);
    padding: 24px 28px;
  }

  .tl-year {
    font-family: 'DM Mono', monospace; font-size: 12px; margin-bottom: 4px;
  }
  .tl-year.teal { color: #6C8EFF; }
  .tl-year.blue { color: #A78BFA; }
  .tl-year.gray { color: #6B7A99; }
  .tl-title {
    font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 600;
    color: #FFFFFF; line-height: 1.4;
  }
  .tl-subtitle {
    font-family: 'DM Mono', monospace; font-size: 12px; color: #6B7A99;
    margin-top: 4px; line-height: 1.5;
  }

  @media (max-width: 768px) {
    .tl-wrapper::before { left: 20px; }
    .tl-entry.left, .tl-entry.right {
      padding-left: 52px; padding-right: 0; justify-content: flex-start;
    }
    .tl-dot { left: 20px; }
    .tl-card { max-width: 100%; }
  }
`;

function TLEntry({ event, index }) {
  const isLeft = index % 2 === 0;
  const Icon = iconMap[event.icon] || IoFlagSharp;

  let dotClass = 'tl-dot';
  if (event.highlight) {
    dotClass += ' highlight';
  } else if (event.isPulse) {
    dotClass += ' pulse';
  } else {
    dotClass += ` default ${event.color}`;
  }

  const cardClass = `tl-card ${event.color}${event.highlight ? ' highlight-card' : ''}`;

  return (
    <motion.div
      className={`tl-entry ${isLeft ? 'left' : 'right'}`}
      initial={{ opacity: 0, x: isLeft ? -70 : 70 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      <div className={dotClass} />
      <div className={cardClass}>
        <p className={`tl-year ${event.color}`}>{event.year}</p>
        <h3 className="tl-title">{event.title}</h3>
        <p className="tl-subtitle">{event.subtitle}</p>
      </div>
    </motion.div>
  );
}

export default function Timeline() {
  return (
    <>
      <style>{tlStyles}</style>
      <section id="timeline" className="tl-section">
        <div className="tl-container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="tl-heading">My Journey</h2>
            <div className="tl-heading-line" />
          </motion.div>

          <div className="tl-wrapper">
            {timelineEvents.map((event, idx) => (
              <TLEntry key={event.year + event.title} event={event} index={idx} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
