import React from 'react';
import { motion } from 'framer-motion';
import { skillCategories } from '../utils/data';

const skillsStyles = `
  .skills-section { padding: 100px 0; }
  .skills-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
  .skills-heading {
    font-family: 'Syne', sans-serif; font-size: clamp(32px,5vw,48px);
    font-weight: 700; color: #FFFFFF; margin-bottom: 8px;
  }
  .skills-heading-line {
    width: 48px; height: 3px; background: #00D4A8;
    border-radius: 99px; margin-bottom: 48px;
  }
  .skills-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
  .skill-cat {
    background: #0D1320; border-radius: 12px; padding: 24px;
    transition: all 0.3s ease;
  }
  .skill-cat.accent-teal { border-left: 3px solid #00D4A8; }
  .skill-cat.accent-blue { border-left: 3px solid #3B8BFF; }
  .skill-cat.accent-gray { border-left: 3px solid #2A3547; }
  .skill-cat.accent-teal:hover { box-shadow: 0 0 20px rgba(0,212,168,0.08); }
  .skill-cat.accent-blue:hover { box-shadow: 0 0 20px rgba(59,139,255,0.08); }
  .skill-cat.accent-gray:hover { box-shadow: 0 0 20px rgba(136,153,170,0.06); }

  .skill-cat-header { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
  .skill-cat-dot { width: 10px; height: 10px; border-radius: 50%; }
  .skill-cat-dot.teal { background: #00D4A8; }
  .skill-cat-dot.blue { background: #3B8BFF; }
  .skill-cat-dot.gray { background: #8899AA; }
  .skill-cat-name {
    font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 600; color: #FFFFFF;
  }

  .skill-pills { display: flex; flex-wrap: wrap; gap: 8px; }
  .sk-pill {
    font-family: 'DM Mono', monospace; font-size: 12px; padding: 6px 14px;
    background: #0D1320; border: 1px solid #1E2A3A; border-radius: 6px;
    color: #8899AA; transition: all 0.2s ease; cursor: default;
  }
  .sk-pill.teal:hover {
    background: rgba(0,212,168,0.1); border-color: #00D4A8; color: #00D4A8;
    box-shadow: 0 0 14px rgba(0,212,168,0.2); transform: scale(1.04);
  }
  .sk-pill.blue:hover {
    background: rgba(59,139,255,0.1); border-color: #3B8BFF; color: #3B8BFF;
    box-shadow: 0 0 14px rgba(59,139,255,0.2); transform: scale(1.04);
  }
  .sk-pill.gray:hover { border-color: #8899AA; color: #FFFFFF; }

  @media (max-width: 768px) {
    .skills-grid { grid-template-columns: 1fr; }
  }
`;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Skills() {
  return (
    <>
      <style>{skillsStyles}</style>
      <section id="skills" className="skills-section">
        <div className="skills-container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="skills-heading">Technical Skills</h2>
            <div className="skills-heading-line" />
          </motion.div>

          <motion.div
            className="skills-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {skillCategories.map((cat) => (
              <motion.div
                key={cat.name}
                className={`skill-cat accent-${cat.accent}`}
                variants={itemVariants}
              >
                <div className="skill-cat-header">
                  <div className={`skill-cat-dot ${cat.accent}`} />
                  <span className="skill-cat-name">{cat.name}</span>
                </div>
                <div className="skill-pills">
                  {cat.skills.map((skill) => (
                    <span key={skill} className={`sk-pill ${cat.accent}`}>{skill}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
