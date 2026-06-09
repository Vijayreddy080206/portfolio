import React, { memo, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  IoMailSharp,
  IoLogoLinkedin,
  IoLogoGithub,
  IoLocationSharp,
  IoDownloadSharp,
  IoCheckmarkCircleSharp,
  IoAlertCircleSharp,
} from 'react-icons/io5';

import { personalInfo } from '../utils/data';



const contactStyles = `
  .contact-section {
    padding: var(--section-padding);
    background: var(--bg-secondary);
  }
  .contact-container {
    max-width: var(--container-width);
    margin: 0 auto;
    padding: 0 24px;
  }
  .contact-heading {
    font-family: var(--font-display);
    font-size: 40px;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 12px;
    position: relative;
    display: inline-block;
  }
  .contact-heading::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 3px;
    background: var(--accent-teal);
    border-radius: 2px;
  }
  .contact-subline {
    font-family: var(--font-mono);
    font-size: 14px;
    color: var(--text-secondary);
    margin-bottom: 50px;
    margin-top: 20px;
  }
  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: start;
  }
  /* Form Styles */
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .form-label {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .form-input,
  .form-textarea {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    padding: 12px 16px;
    font-family: var(--font-mono);
    font-size: 14px;
    color: var(--text-primary);
    outline: none;
    transition: border-color var(--transition-fast);
    width: 100%;
    box-sizing: border-box;
  }
  .form-input:focus,
  .form-textarea:focus {
    border-color: var(--accent-teal);
    box-shadow: 0 0 0 2px rgba(108, 142, 255, 0.1);
  }
  .form-input::placeholder,
  .form-textarea::placeholder {
    color: var(--text-secondary);
    opacity: 0.5;
  }
  .form-textarea {
    resize: vertical;
    min-height: 140px;
  }
  .form-submit {
    padding: 14px 32px;
    background: var(--accent-teal);
    color: var(--bg-primary);
    border: none;
    border-radius: var(--radius-sm);
    font-family: var(--font-mono);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-fast);
    width: fit-content;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .form-submit:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(108, 142, 255, 0.3);
  }
  .form-submit:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  .form-status {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-mono);
    font-size: 13px;
    padding: 12px 16px;
    border-radius: var(--radius-sm);
  }
  .form-status.success {
    background: rgba(108, 142, 255, 0.1);
    color: var(--accent-teal);
    border: 1px solid rgba(108, 142, 255, 0.2);
  }
  .form-status.error {
    background: rgba(255, 71, 87, 0.1);
    color: #ff4757;
    border: 1px solid rgba(255, 71, 87, 0.2);
  }
  /* Right Side - Links */
  .contact-links {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .contact-link-item {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px 20px;
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    transition: all var(--transition-fast);
    text-decoration: none;
    cursor: pointer;
  }
  a.contact-link-item:hover {
    border-color: var(--accent-teal);
    transform: translateX(4px);
  }
  .contact-link-icon {
    font-size: 20px;
    color: var(--accent-teal);
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }
  .contact-link-label {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .contact-link-value {
    font-family: var(--font-mono);
    font-size: 14px;
    color: var(--text-primary);
  }
  .contact-link-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .contact-cv-buttons {
    display: flex;
    gap: 12px;
    margin-top: 12px;
  }
  .cv-button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    border-radius: var(--radius-sm);
    font-family: var(--font-mono);
    font-size: 13px;
    font-weight: 500;
    text-decoration: none;
    transition: all var(--transition-fast);
    cursor: pointer;
    border: none;
  }
  .cv-button.primary {
    background: var(--accent-teal);
    color: var(--bg-primary);
  }
  .cv-button.primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(108, 142, 255, 0.3);
  }
  .cv-button.secondary {
    background: transparent;
    color: var(--accent-teal);
    border: 1px solid var(--accent-teal);
  }
  .cv-button.secondary:hover {
    background: rgba(108, 142, 255, 0.1);
    transform: translateY(-2px);
  }
  /* Spinner */
  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(8, 12, 20, 0.3);
    border-top-color: var(--bg-primary);
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  /* Success checkmark animation */
  .checkmark-icon {
    font-size: 20px;
    animation: checkPop 0.4s ease-out;
  }
  @keyframes checkPop {
    0% { transform: scale(0); opacity: 0; }
    60% { transform: scale(1.2); }
    100% { transform: scale(1); opacity: 1; }
  }
  @media (max-width: 768px) {
    .contact-grid {
      grid-template-columns: 1fr;
      gap: 36px;
    }
    .contact-heading { font-size: 32px; }
    .contact-cv-buttons {
      flex-direction: column;
    }
  }
`;

const Contact = memo(function Contact() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const formRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData(formRef.current);
    const subject = formData.get('subject') || 'Contact from Portfolio';
    const message = formData.get('message') || '';
    
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.open(gmailLink, '_blank');
    
    setStatus('success');
    formRef.current.reset();
  };

  return (
    <>
      <style>{contactStyles}</style>
      <section id="contact" className="contact-section" ref={ref}>
        <div className="contact-container">
          <motion.h2
            className="contact-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Let's Connect
          </motion.h2>
          <motion.p
            className="contact-subline"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Open to internships, collaborations, and interesting problems.
          </motion.p>

          <div className="contact-grid">
            {/* LEFT — Contact Form */}
            <motion.form
              ref={formRef}
              className="contact-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="form-group">
                <label className="form-label" htmlFor="from_name">Name</label>
                <input
                  className="form-input"
                  type="text"
                  id="from_name"
                  name="from_name"
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="reply_to">Email</label>
                <input
                  className="form-input"
                  type="email"
                  id="reply_to"
                  name="reply_to"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="subject">Subject</label>
                <input
                  className="form-input"
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="What's this about?"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea
                  className="form-textarea"
                  id="message"
                  name="message"
                  placeholder="Your message..."
                  required
                />
              </div>
              <button className="form-submit" type="submit" disabled={sending}>
                {sending ? (
                  <>
                    <span className="spinner" />
                    Sending...
                  </>
                ) : (
                  'Send Message →'
                )}
              </button>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    className="form-status success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <IoCheckmarkCircleSharp className="checkmark-icon" />
                    Message sent! I'll get back to you soon.
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    className="form-status error"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <IoAlertCircleSharp />
                    Something went wrong. Please try again or email me directly.
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.form>

            {/* RIGHT — Direct Links */}
            <motion.div
              className="contact-links"
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <a
                className="contact-link-item"
                href={`mailto:${personalInfo.email}`}
              >
                <span className="contact-link-icon"><IoMailSharp /></span>
                <div className="contact-link-text">
                  <span className="contact-link-label">Email</span>
                  <span className="contact-link-value">{personalInfo.email}</span>
                </div>
              </a>

              <a
                className="contact-link-item"
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact-link-icon"><IoLogoLinkedin /></span>
                <div className="contact-link-text">
                  <span className="contact-link-label">LinkedIn</span>
                  {/* TODO: Replace with your LinkedIn display name */}
                  <span className="contact-link-value">Vijay Vardhan Reddy</span>
                </div>
              </a>

              <a
                className="contact-link-item"
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact-link-icon"><IoLogoGithub /></span>
                <div className="contact-link-text">
                  <span className="contact-link-label">GitHub</span>
                  {/* TODO: Replace with your GitHub username */}
                  <span className="contact-link-value">GitHub Profile</span>
                </div>
              </a>


              <div className="contact-link-item" style={{ cursor: 'default' }}>
                <span className="contact-link-icon"><IoLocationSharp /></span>
                <div className="contact-link-text">
                  <span className="contact-link-label">Location</span>
                  <span className="contact-link-value">Hyderabad, India</span>
                </div>
              </div>

              <div className="contact-cv-buttons">
                <a className="cv-button primary" href="/vijay-cv.pdf" download>
                  <IoDownloadSharp /> Download CV
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
});

export default Contact;
