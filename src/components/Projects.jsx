import React, { useRef, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { FaGithub } from 'react-icons/fa';
import { projects } from '../utils/data';

/* ─── 3D Brain Model ─── */
function BrainModel() {
  const { scene } = useGLTF('/models/brain_areas__1_.glb');
  const ref = useRef();
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone();
        child.material.color.setHex(0x00D4A8);
        child.material.emissive.setHex(0x003D30);
        child.material.emissiveIntensity = 0.3;
        child.material.transparent = true;
        child.material.opacity = 0.85;
      }
    });
  }, [scene]);
  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.4;
  });
  return <primitive ref={ref} object={scene} scale={1.2} position={[0, -0.5, 0]} />;
}
useGLTF.preload('/models/brain_areas__1_.glb');

/* ─── 3D Cricket Scene ─── */
function CricketScene() {
  const bat = useGLTF('/models/cricket_bat.glb');
  const ball = useGLTF('/models/cricket_ball_sports_.glb');
  const batRef = useRef();
  const ballRef = useRef();
  useFrame((state, delta) => {
    if (batRef.current) batRef.current.rotation.y += delta * 0.3;
    if (ballRef.current) {
      ballRef.current.rotation.y += delta * 0.8;
      ballRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.15;
    }
  });
  return (
    <>
      <primitive ref={batRef} object={bat.scene} scale={0.8} position={[-0.8, -0.5, 0]} rotation={[0.2, 0.3, 0.1]} />
      <primitive ref={ballRef} object={ball.scene} scale={0.5} position={[0.8, 0, 0]} />
    </>
  );
}
useGLTF.preload('/models/cricket_bat.glb');
useGLTF.preload('/models/cricket_ball_sports_.glb');

/* ─── F1 Circuit SVG ─── */
function F1Circuit() {
  return (
    <svg viewBox="0 0 400 300" style={{ width: '100%', maxWidth: '380px' }}>
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="dotGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Circuit path */}
      <path
        id="circuit-path"
        d="M 40,150 L 120,150 Q 140,150 140,130 L 140,80 Q 140,50 170,50 L 280,50 Q 320,50 340,80 L 340,120 Q 340,150 310,160 L 260,170 Q 240,175 240,195 L 240,230 Q 240,250 220,250 L 100,250 Q 60,250 50,220 L 40,180 Q 38,165 40,150 Z"
        stroke="#00D4A8"
        strokeWidth="2.5"
        fill="none"
        opacity="0.6"
        filter="url(#glow)"
      />

      {/* Pit stop markers */}
      <circle cx="170" cy="50" r="5" fill="#3B8BFF" opacity="0.8" filter="url(#glow)" />
      <circle cx="310" cy="160" r="5" fill="#3B8BFF" opacity="0.8" filter="url(#glow)" />
      <circle cx="100" cy="250" r="5" fill="#3B8BFF" opacity="0.8" filter="url(#glow)" />

      {/* Animated racing dot */}
      <circle r="5" fill="#00D4A8" filter="url(#dotGlow)">
        <animateMotion dur="4s" repeatCount="indefinite">
          <mpath href="#circuit-path" />
        </animateMotion>
      </circle>

      {/* Racing dot trail */}
      <circle r="3" fill="#00D4A8" opacity="0.4">
        <animateMotion dur="4s" repeatCount="indefinite" begin="0.15s">
          <mpath href="#circuit-path" />
        </animateMotion>
      </circle>
      <circle r="2" fill="#00D4A8" opacity="0.2">
        <animateMotion dur="4s" repeatCount="indefinite" begin="0.3s">
          <mpath href="#circuit-path" />
        </animateMotion>
      </circle>
    </svg>
  );
}

/* ─── Styles ─── */
const projStyles = `
  .proj-section { padding: 100px 0; position: relative; }
  .proj-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
  .proj-heading {
    font-family: 'Syne', sans-serif; font-size: clamp(32px,5vw,48px);
    font-weight: 700; color: #FFFFFF; margin-bottom: 8px;
  }
  .proj-heading-line {
    width: 48px; height: 3px; background: #00D4A8;
    border-radius: 99px; margin-bottom: 48px;
  }
  .proj-list { display: flex; flex-direction: column; gap: 40px; }

  /* ── Shared card base ── */
  .proj-card {
    background: #0F1722; border-radius: 20px; padding: 40px;
    transition: all 0.3s ease; position: relative; overflow: hidden;
  }
  .proj-card:hover { transform: translateY(-6px); }

  /* ── Featured F1 ── */
  .proj-card.featured {
    border: 1px solid rgba(0,212,168,0.45);
    box-shadow: 0 0 50px rgba(0,212,168,0.08), 0 0 100px rgba(0,212,168,0.04);
  }
  .proj-card.featured:hover {
    box-shadow: 0 0 60px rgba(0,212,168,0.18), 0 0 100px rgba(0,212,168,0.08);
  }

  /* ── NeuroLens ── */
  .proj-card.aiml {
    border: 1px solid rgba(59,139,255,0.45);
    box-shadow: 0 0 50px rgba(59,139,255,0.08);
  }
  .proj-card.aiml:hover {
    box-shadow: 0 0 60px rgba(59,139,255,0.18);
  }

  /* ── IPL ── */
  .proj-card.analytics {
    border: 1px solid rgba(0,212,168,0.25);
  }
  .proj-card.analytics:hover {
    box-shadow: 0 0 40px rgba(0,212,168,0.12);
  }

  /* ── Mini card ── */
  .proj-card.mini {
    border: 1px solid #1E2A3A; max-width: 700px; margin: 0 auto;
    padding: 32px;
  }
  .proj-card.mini:hover { box-shadow: 0 0 30px rgba(0,0,0,0.3); }

  /* ── Two-column layout ── */
  .proj-two-col {
    display: grid; grid-template-columns: 55% 45%; gap: 32px; align-items: center;
  }

  /* ── Badge ── */
  @keyframes badgePulse {
    0% { box-shadow: 0 0 0px rgba(0,212,168,0); }
    50% { box-shadow: 0 0 12px rgba(0,212,168,0.5); }
    100% { box-shadow: 0 0 0px rgba(0,212,168,0); }
  }
  .proj-badge {
    display: inline-block; font-family: 'DM Mono', monospace; font-size: 11px;
    font-weight: 500; padding: 4px 12px; border-radius: 99px;
    text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px;
  }
  .proj-badge.featured {
    background: rgba(0,212,168,0.15); border: 1px solid #00D4A8; color: #00D4A8;
    animation: badgePulse 2s ease-in-out infinite;
  }
  .proj-badge.aiml {
    background: rgba(59,139,255,0.15); border: 1px solid #3B8BFF; color: #3B8BFF;
  }
  .proj-badge.analytics {
    background: rgba(0,212,168,0.1); border: 1px solid rgba(0,212,168,0.4); color: #00D4A8;
  }
  .proj-badge.fullstack {
    background: rgba(136,153,170,0.1); border: 1px solid rgba(136,153,170,0.3); color: #8899AA;
  }

  .proj-title {
    font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 700;
    color: #FFFFFF; line-height: 1.2; margin-bottom: 16px;
  }

  .proj-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
  .proj-tag {
    font-family: 'DM Mono', monospace; font-size: 12px; color: #8899AA;
    background: #080C14; padding: 5px 12px; border-radius: 6px;
    border: 1px solid #1E2A3A; transition: all 0.2s ease;
  }
  .proj-tag:hover { color: #FFFFFF; border-color: #8899AA; }

  .proj-label {
    font-family: 'DM Mono', monospace; font-size: 11px; color: #00D4A8;
    text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px; margin-top: 20px;
  }
  .proj-label.blue { color: #3B8BFF; }
  .proj-desc {
    font-family: 'DM Mono', monospace; font-size: 13px; color: #C8D4E0;
    line-height: 1.8;
  }

  /* ── Impact chips ── */
  .proj-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
  .proj-chip {
    font-family: 'DM Mono', monospace; font-size: 12px; padding: 6px 14px;
    border-radius: 6px; display: inline-flex; align-items: center;
  }
  .proj-chip.teal {
    background: rgba(0,212,168,0.08); border: 1px solid rgba(0,212,168,0.2); color: #00D4A8;
  }
  .proj-chip.blue {
    background: rgba(59,139,255,0.08); border: 1px solid rgba(59,139,255,0.2); color: #3B8BFF;
  }

  .proj-how {
    font-family: 'DM Mono', monospace; font-size: 12px; color: #8899AA;
    line-height: 1.8; margin-top: 8px;
  }

  .proj-github {
    display: inline-flex; align-items: center; gap: 8px; margin-top: 20px;
    font-family: 'DM Mono', monospace; font-size: 13px; color: #8899AA;
    text-decoration: none; padding: 10px 20px; border-radius: 8px;
    border: 1px solid #1E2A3A; transition: all 0.2s ease;
  }
  .proj-github:hover {
    color: #00D4A8; border-color: #00D4A8;
    box-shadow: 0 0 15px rgba(0,212,168,0.15);
  }

  .proj-visual {
    display: flex; align-items: center; justify-content: center;
  }

  /* ── Mini card overrides ── */
  .proj-card.mini .proj-title { font-size: 22px; }
  .proj-mini-desc {
    font-family: 'DM Mono', monospace; font-size: 13px; color: #C8D4E0;
    line-height: 1.7; margin-bottom: 16px;
  }

  @media (max-width: 1024px) {
    .proj-two-col { grid-template-columns: 1fr; }
    .proj-visual { margin-top: 24px; }
  }
  @media (max-width: 768px) {
    .proj-card { padding: 24px; border-radius: 14px; }
    .proj-title { font-size: 22px; }
    .proj-card.mini { max-width: 100%; }
  }
`;

/* ─── 3D Canvas Wrapper ─── */
function ModelCanvas({ children, height = '300px', cameraPos = [0, 0, 4] }) {
  return (
    <Canvas
      style={{ width: '100%', height, background: 'transparent' }}
      camera={{ position: cameraPos, fov: 45 }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} color="#00D4A8" intensity={1.2} />
      <pointLight position={[-5, -5, 5]} color="#3B8BFF" intensity={0.8} />
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}

/* ─── Individual Project Cards ─── */
function F1Card({ project }) {
  return (
    <motion.div
      className="proj-card featured"
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-80px' }}
    >
      <div className="proj-two-col">
        <div>
          <span className="proj-badge featured">{project.badge}</span>
          <h3 className="proj-title">{project.title}</h3>
          <div className="proj-tags">
            {project.tags.map((t) => <span key={t} className="proj-tag">{t}</span>)}
          </div>
          <p className="proj-label">THE PROBLEM</p>
          <p className="proj-desc">{project.whatISolved}</p>
          <p className="proj-label">KEY IMPACT</p>
          <div className="proj-chips">
            {project.impactPoints.map((p, i) => (
              <span key={i} className="proj-chip teal">{p}</span>
            ))}
          </div>
          <p className="proj-label">HOW I BUILT IT</p>
          <p className="proj-how">{project.howIBuiltIt}</p>
          <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="proj-github">
            <FaGithub /> View on GitHub
          </a>
        </div>
        <div className="proj-visual">
          <F1Circuit />
        </div>
      </div>
    </motion.div>
  );
}

function NeuroLensCard({ project }) {
  return (
    <motion.div
      className="proj-card aiml"
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-80px' }}
    >
      <div className="proj-two-col">
        <div>
          <span className="proj-badge aiml">{project.badge}</span>
          <h3 className="proj-title">{project.title}</h3>
          <div className="proj-tags">
            {project.tags.map((t) => <span key={t} className="proj-tag">{t}</span>)}
          </div>
          <p className="proj-label blue">THE PROBLEM</p>
          <p className="proj-desc">{project.whatISolved}</p>
          <p className="proj-label blue">KEY IMPACT</p>
          <div className="proj-chips">
            {project.impactPoints.map((p, i) => (
              <span key={i} className="proj-chip blue">{p}</span>
            ))}
          </div>
          <p className="proj-label blue">HOW I BUILT IT</p>
          <p className="proj-how">{project.howIBuiltIt}</p>
          <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="proj-github">
            <FaGithub /> View on GitHub
          </a>
        </div>
        <div className="proj-visual">
          <ModelCanvas height="300px" cameraPos={[0, 0, 4]}>
            <BrainModel />
          </ModelCanvas>
        </div>
      </div>
    </motion.div>
  );
}

function IPLCard({ project }) {
  return (
    <motion.div
      className="proj-card analytics"
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-80px' }}
    >
      <div className="proj-two-col">
        <div>
          <span className="proj-badge analytics">{project.badge}</span>
          <h3 className="proj-title">{project.title}</h3>
          <div className="proj-tags">
            {project.tags.map((t) => <span key={t} className="proj-tag">{t}</span>)}
          </div>
          <p className="proj-label">THE PROBLEM</p>
          <p className="proj-desc">{project.whatISolved}</p>
          <p className="proj-label">KEY IMPACT</p>
          <div className="proj-chips">
            {project.impactPoints.map((p, i) => (
              <span key={i} className="proj-chip teal">{p}</span>
            ))}
          </div>
          <p className="proj-label">HOW I BUILT IT</p>
          <p className="proj-how">{project.howIBuiltIt}</p>
          <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="proj-github">
            <FaGithub /> View on GitHub
          </a>
        </div>
        <div className="proj-visual">
          <ModelCanvas height="280px" cameraPos={[0, 1, 5]}>
            <CricketScene />
          </ModelCanvas>
        </div>
      </div>
    </motion.div>
  );
}

function MiniCard({ project }) {
  return (
    <motion.div
      className="proj-card mini"
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-80px' }}
    >
      <span className="proj-badge fullstack">{project.badge}</span>
      <h3 className="proj-title">{project.title}</h3>
      <p className="proj-mini-desc">{project.whatISolved}</p>
      <div className="proj-tags">
        {project.tags.map((t) => <span key={t} className="proj-tag">{t}</span>)}
      </div>
      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="proj-github">
        <FaGithub /> View on GitHub
      </a>
    </motion.div>
  );
}

/* ─── Main Projects Section ─── */
export default function Projects() {
  const f1 = projects.find((p) => p.id === 'f1-strategy');
  const neuro = projects.find((p) => p.id === 'neurolens');
  const ipl = projects.find((p) => p.id === 'ipl-analytics');
  const boutique = projects.find((p) => p.id === 'hoshitha-boutique');

  return (
    <>
      <style>{projStyles}</style>
      <section id="projects" className="proj-section">
        <div className="proj-container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="proj-heading">Projects</h2>
            <div className="proj-heading-line" />
          </motion.div>

          <div className="proj-list">
            {f1 && <F1Card project={f1} />}
            {neuro && <NeuroLensCard project={neuro} />}
            {ipl && <IPLCard project={ipl} />}
            {boutique && <MiniCard project={boutique} />}
          </div>
        </div>
      </section>
    </>
  );
}
