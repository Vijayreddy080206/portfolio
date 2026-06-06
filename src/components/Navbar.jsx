import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../utils/data';

const navStyles = `
  .navbar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    padding: 16px 0; transition: all 0.4s ease;
  }
  .navbar.scrolled {
    background: rgba(8,12,20,0.88); backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid #1E2A3A;
    padding: 12px 0;
  }
  .nav-progress {
    position: absolute; top: 0; left: 0; height: 2px;
    background: linear-gradient(90deg, #00D4A8, #3B8BFF);
    transition: width 0.1s linear; z-index: 100; border-radius: 0 1px 1px 0;
  }
  .nav-inner {
    max-width: 1200px; margin: 0 auto; padding: 0 24px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .nav-logo {
    font-family: 'Syne', sans-serif; font-weight: 800; font-size: 24px;
    color: #00D4A8; text-decoration: none; letter-spacing: -1px; user-select: none;
  }
  .nav-center {
    display: flex; align-items: center; gap: 32px; list-style: none;
    margin: 0; padding: 0;
  }
  .nav-link {
    font-family: 'DM Mono', monospace; font-size: 13px; color: #8899AA;
    text-decoration: none; transition: color 0.2s ease; letter-spacing: 0.5px;
    position: relative;
  }
  .nav-link:hover, .nav-link.active { color: #00D4A8; }
  .nav-link.active::after {
    content: ''; position: absolute; bottom: -6px; left: 0; right: 0;
    height: 2px; background: #00D4A8; border-radius: 1px;
  }
  .nav-right { display: flex; align-items: center; gap: 16px; position: relative; }
  .nav-cv-btn {
    font-family: 'DM Mono', monospace; font-size: 13px; color: #00D4A8;
    background: transparent; border: 1.5px solid #00D4A8; padding: 8px 18px;
    border-radius: 8px; transition: all 0.2s ease; display: inline-flex;
    align-items: center; gap: 6px;
  }
  .nav-cv-btn:hover {
    background: rgba(0,212,168,0.08); transform: translateY(-1px);
  }
  .nav-dropdown {
    position: absolute; top: calc(100% + 8px); right: 0; min-width: 200px;
    background: #0D1320; border: 1px solid #1E2A3A; border-radius: 8px;
    overflow: hidden; z-index: 1001;
    box-shadow: 0 8px 30px rgba(0,0,0,0.4);
  }
  .nav-dropdown a {
    display: block; padding: 10px 20px;
    font-family: 'DM Mono', monospace; font-size: 13px; color: #FFFFFF;
    text-decoration: none; transition: all 0.15s ease;
  }
  .nav-dropdown a:hover { background: #1E2A3A; color: #00D4A8; }
  .hamburger {
    display: none; flex-direction: column; gap: 5px; background: none;
    border: none; padding: 4px; z-index: 1001;
  }
  .hamburger span {
    display: block; width: 24px; height: 2px; background: #FFFFFF;
    transition: all 0.3s ease; transform-origin: center;
  }
  .hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
  .hamburger.open span:nth-child(2) { opacity: 0; }
  .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }
  .mobile-menu {
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(8,12,20,0.98); backdrop-filter: blur(20px);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 32px; z-index: 999;
  }
  .mobile-menu .nav-link { font-size: 18px; }
  @media (max-width: 768px) {
    .nav-center { display: none; }
    .nav-cv-btn { display: none; }
    .hamburger { display: flex; }
  }
`;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const total = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((l) => l.href.replace('#', ''));
    const observers = [];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCvOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const scrollTo = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <style>{navStyles}</style>
      <motion.nav
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="nav-progress" style={{ width: `${scrollProgress}%` }} />
        <div className="nav-inner">
          <a
            className="nav-logo"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            VV
          </a>

          <ul className="nav-center">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  className={`nav-link ${activeSection === link.href.replace('#', '') ? 'active' : ''}`}
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-right" ref={dropdownRef}>
            <button className="nav-cv-btn" onClick={() => setCvOpen(!cvOpen)}>
              Download CV ↓
            </button>
            <AnimatePresence>
              {cvOpen && (
                <motion.div
                  className="nav-dropdown"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <a href="/vijay-cv.pdf" download onClick={() => setCvOpen(false)}>
                    📄 Detailed CV
                  </a>
                  <a href="/vijay-resume.pdf" download onClick={() => setCvOpen(false)}>
                    📝 Short Resume
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            className={`hamburger ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                className={`nav-link ${activeSection === link.href.replace('#', '') ? 'active' : ''}`}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
              >
                {link.label}
              </a>
            ))}
            <a href="/vijay-cv.pdf" download className="nav-link" onClick={() => setMobileOpen(false)}>
              Download CV
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
