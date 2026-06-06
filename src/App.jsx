import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const keyBuffer = useRef('');

  // F1 Easter egg
  useEffect(() => {
    const handleKeyDown = (e) => {
      keyBuffer.current += e.key.toUpperCase();
      if (keyBuffer.current.length > 10) {
        keyBuffer.current = keyBuffer.current.slice(-10);
      }
      if (keyBuffer.current.includes('F1')) {
        keyBuffer.current = '';
        setShowEasterEgg(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (showEasterEgg) {
      const t = setTimeout(() => setShowEasterEgg(false), 3500);
      return () => clearTimeout(t);
    }
  }, [showEasterEgg]);

  return (
    <>
      <CustomCursor />

      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      <div
        style={{
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.5s ease',
        }}
      >
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Certifications />
          <Timeline />
          <Contact />
        </main>
        <Footer />
      </div>

      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              bottom: '28px',
              right: '28px',
              zIndex: 9999,
              background: '#0D1320',
              border: '1px solid #00D4A8',
              boxShadow: '0 0 24px rgba(0,212,168,0.25)',
              borderRadius: '10px',
              padding: '14px 20px',
              fontFamily: "'DM Mono', monospace",
              fontSize: '13px',
              color: '#00D4A8',
            }}
          >
            89.1% strategy alignment achieved 🏎️
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
