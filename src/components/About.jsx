import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { personalInfo } from '../utils/data';

const aboutStyles = `
  .about-section { padding: 100px 0; position: relative; }
  .about-container {
    max-width: 1200px; margin: 0 auto; padding: 0 24px;
    display: grid; grid-template-columns: 280px 1fr; gap: 60px; align-items: start;
  }
  .about-photo-col { display: flex; flex-direction: column; align-items: center; gap: 24px; }
  .about-photo {
    width: 200px; height: 200px; border-radius: 50%;
    border: 2px solid #6C8EFF; box-shadow: 0 0 30px rgba(108,142,255,0.2);
    display: flex; align-items: center; justify-content: center;
    background: #111827; font-family: 'Syne', sans-serif;
    font-size: 48px; font-weight: 800; color: #6C8EFF; overflow: hidden;
  }
  .about-photo img { width: 100%; height: 100%; object-fit: cover; }
  .about-socials { display: flex; gap: 16px; }
  .about-social-link {
    color: #6B7A99; font-size: 22px; transition: all 0.2s ease;
    display: flex; align-items: center; justify-content: center;
    width: 42px; height: 42px; border-radius: 50%; border: 1px solid #1E2535;
    text-decoration: none;
  }
  .about-social-link:hover {
    color: #6C8EFF; border-color: #6C8EFF;
    box-shadow: 0 0 15px rgba(108,142,255,0.2); transform: translateY(-2px);
  }
  .about-content {}
  .about-heading {
    font-family: 'Syne', sans-serif; font-size: clamp(32px,5vw,48px);
    font-weight: 700; color: #FFFFFF; margin-bottom: 8px;
  }
  .about-heading-line {
    width: 48px; height: 3px; background: #6C8EFF;
    border-radius: 99px; margin-bottom: 32px;
  }
  .about-text {
    font-family: 'DM Mono', monospace; font-size: 14px; color: #8899BB;
    line-height: 1.9; white-space: pre-line;
  }
  .about-badges { display: flex; gap: 12px; margin-top: 28px; flex-wrap: wrap; }
  .about-badge {
    font-family: 'DM Mono', monospace; font-size: 12px; font-weight: 500;
    padding: 8px 20px; border-radius: 50px; letter-spacing: 0.5px;
  }
  .about-badge-teal { background: #6C8EFF; color: #0A0E1A; }
  .about-badge-blue { background: #A78BFA; color: #0A0E1A; }
  @media (max-width: 768px) {
    .about-container { grid-template-columns: 1fr; gap: 40px; }
    .about-photo-col { align-items: center; }
  }
`;

export default function About() {
  return (
    <>
      <style>{aboutStyles}</style>
      <section id="about" className="about-section">
        <div className="about-container">
          <motion.div
            className="about-photo-col"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="about-photo">
              {/* TODO: Replace with actual photo <img src="/photo.jpg" alt="Vijay Vardhan" /> */}
              VV
            </div>
            <div className="about-socials">
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="about-social-link" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="about-social-link" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
              <a href={`mailto:${personalInfo.email}`} className="about-social-link" aria-label="Email">
                <HiOutlineMail />
              </a>
            </div>
          </motion.div>

          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="about-heading">About Me</h2>
            <div className="about-heading-line" />
            <p className="about-text">
I'm Vijay Vardhan Reddy, a 3rd-year B.Tech Big Data student 
at NIIT University. I spend most of my time building things 
that go beyond what's expected from a student — a real-time 
F1 strategy engine, a brain activation visualizer using 2025 
AI research, and a full IPL analytics pipeline. I like finding 
real problems and building real solutions for them.

My toolkit: Python, SQL, Power BI, React, FastAPI, Redis, 
Three.js. I'm actively looking for a Data Analyst or AI/ML 
internship where I can contribute from day one.
            </p>
            <div className="about-badges">
              <span className="about-badge about-badge-teal">Open to Internships</span>
              <span className="about-badge about-badge-blue">{personalInfo.availableFrom}</span>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
