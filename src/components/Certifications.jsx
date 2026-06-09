import React from 'react';
import { motion } from 'framer-motion';
import { certifications } from '../utils/data';

const certStyles = `
  .cert-section { padding: 100px 0; background: #0D1230; }
  .cert-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
  .cert-heading {
    font-family: 'Syne', sans-serif; font-size: clamp(32px,5vw,48px);
    font-weight: 700; color: #FFFFFF; margin-bottom: 8px;
  }
  .cert-heading-line {
    width: 48px; height: 3px; background: #4F7FFF;
    border-radius: 99px; margin-bottom: 48px;
  }
  .cert-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }

  .cert-card {
    background: #0D1230; border-radius: 14px; padding: 24px;
    border: 1px solid #1E2535; transition: all 0.3s ease;
    display: flex; flex-direction: column;
  }
  .cert-card.accent-teal:hover {
    border-color: rgba(79,127,255,0.5);
    box-shadow: 0 0 28px rgba(79,127,255,0.12);
    transform: translateY(-5px);
  }
  .cert-card.accent-blue:hover {
    border-color: rgba(155,109,255,0.5);
    box-shadow: 0 0 28px rgba(155,109,255,0.12);
    transform: translateY(-5px);
  }

  .cert-issuer {
    display: inline-block; font-family: 'DM Mono', monospace;
    font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase;
    padding: 3px 10px; border-radius: 99px; width: fit-content;
  }
  .cert-issuer.teal { background: rgba(79,127,255,0.12); color: #4F7FFF; }
  .cert-issuer.blue { background: rgba(155,109,255,0.12); color: #9B6DFF; }

  .cert-title {
    font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 600;
    color: #FFFFFF; margin-top: 12px; line-height: 1.4;
  }
  .cert-topics {
    font-family: 'DM Mono', monospace; font-size: 12px; color: #6B7A99;
    margin-top: 8px; line-height: 1.5;
  }
  .cert-note {
    font-family: 'DM Mono', monospace; font-size: 11px; color: #6B7A99;
    font-style: italic; margin-top: 6px;
  }
  .cert-date {
    font-family: 'DM Mono', monospace; font-size: 11px; color: #6B7A99;
    margin-top: 8px;
  }
  .cert-btn {
    display: block; width: 100%; text-align: center; margin-top: auto;
    padding: 8px 18px; border-radius: 6px;
    font-family: 'DM Mono', monospace; font-size: 12px;
    text-decoration: none; transition: all 0.2s ease;
  }
  .cert-btn.teal {
    color: #4F7FFF; border: 1px solid #4F7FFF;
  }
  .cert-btn.teal:hover {
    background: #4F7FFF; color: #06091A;
  }
  .cert-btn.blue {
    color: #9B6DFF; border: 1px solid #9B6DFF;
  }
  .cert-btn.blue:hover {
    background: #9B6DFF; color: #06091A;
  }

  @media (max-width: 1024px) { .cert-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 768px) { .cert-grid { grid-template-columns: 1fr; } }
`;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Certifications() {
  return (
    <>
      <style>{certStyles}</style>
      <section id="certifications" className="cert-section">
        <div className="cert-container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="cert-heading">Certifications</h2>
            <div className="cert-heading-line" />
          </motion.div>

          <motion.div
            className="cert-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {certifications.map((cert) => (
              <motion.div
                key={cert.title}
                className={`cert-card accent-${cert.accent}`}
                variants={itemVariants}
              >
                <span className={`cert-issuer ${cert.accent}`}>{cert.issuer}</span>
                <h3 className="cert-title">{cert.title}</h3>
                {cert.topics && <p className="cert-topics">{cert.topics}</p>}
                {cert.note && <p className="cert-note">{cert.note}</p>}
                <p className="cert-date">{cert.date}</p>
                <a
                  href={cert.credlyLink}
                  className={`cert-btn ${cert.accent}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Certificate →
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
