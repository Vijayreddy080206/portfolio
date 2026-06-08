import React, { memo } from 'react';
import { IoLogoGithub, IoLogoLinkedin } from 'react-icons/io5';

import { personalInfo } from '../utils/data';

const footerStyles = `
  .footer {
    border-top: 1px solid var(--border-color);
    padding: 30px 24px;
    background: var(--bg-primary);
  }
  .footer-container {
    max-width: var(--container-width);
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .footer-left {
    font-family: var(--font-mono);
    font-size: 13px;
    color: var(--text-secondary);
  }
  .footer-center {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--text-secondary);
    opacity: 0.6;
  }
  .footer-right {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .footer-social-link {
    color: var(--text-secondary);
    font-size: 18px;
    transition: all var(--transition-fast);
    display: flex;
    align-items: center;
    text-decoration: none;
  }
  .footer-social-link:hover {
    color: var(--accent-teal);
    transform: translateY(-2px);
  }
  @media (max-width: 768px) {
    .footer-container {
      flex-direction: column;
      gap: 16px;
      text-align: center;
    }
  }
`;

const Footer = memo(function Footer() {
  return (
    <>
      <style>{footerStyles}</style>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-left">
            © 2026 Vijay Vardhan Reddy Yammanuru
          </div>
          <div className="footer-center">
          </div>
          <div className="footer-right">
            {/* TODO: Replace with your actual GitHub URL */}
            <a
              className="footer-social-link"
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <IoLogoGithub />
            </a>
            {/* TODO: Replace with your actual LinkedIn URL */}
            <a
              className="footer-social-link"
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <IoLogoLinkedin />
            </a>

          </div>
        </div>
      </footer>
    </>
  );
});

export default Footer;
