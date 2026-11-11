import React, { useRef, useEffect, Suspense, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';
import { FaGithub } from 'react-icons/fa';
import { projects } from '../utils/data';

/* ─── (Brain model removed — project replaced) ─── */

/* ─── IPL Bar Chart ─── */
/* ─── IPL Line Chart ─── */
function IPLLineChart() {
  const canvasRef = React.useRef(null)
  const chartRef = React.useRef(null)

  React.useEffect(() => {
    if (!canvasRef.current) return
    let frameId;

    const initChart = () => {
      const Chart = window.Chart
      if (!Chart) return

      const ctx = canvasRef.current.getContext('2d')

      const areaGrad = ctx.createLinearGradient(0, 0, 0, 200)
      areaGrad.addColorStop(0, 'rgba(79,127,255,0.25)')
      areaGrad.addColorStop(0.6, 'rgba(155,109,255,0.08)')
      areaGrad.addColorStop(1, 'rgba(155,109,255,0)')

      const seasons = ['2008','2009','2010','2011','2012','2013',
                       '2014','2015','2016','2017','2018','2019',
                       '2020','2021','2022','2023']
      const counts  = [2,1,3,4,5,6,4,5,8,7,9,8,6,9,12,14]

      chartRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: seasons,
          datasets: [{
            label: '200+ totals',
            data: counts,
            borderColor: '#4F7FFF',
            borderWidth: 2.5,
            pointBackgroundColor: counts.map(v =>
              v >= 10 ? '#4F7FFF' : '#9B6DFF'
            ),
            pointBorderColor: counts.map(v =>
              v >= 10 ? '#4F7FFF' : '#9B6DFF'
            ),
            pointRadius: counts.map(v => v >= 10 ? 6 : 3),
            pointHoverRadius: 7,
            backgroundColor: areaGrad,
            fill: true,
            tension: 0.45,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#06091A',
              borderColor: '#4F7FFF',
              borderWidth: 1,
              titleColor: '#4F7FFF',
              bodyColor: '#8899BB',
              titleFont: { family: 'DM Mono, monospace', size: 11 },
              bodyFont: { family: 'DM Mono, monospace', size: 11 },
              padding: 10,
              callbacks: {
                title: (i) => `IPL ${i[0].label}`,
                label: (i) => `  ${i.raw} scores of 200+`
              }
            }
          },
          scales: {
            x: {
              ticks: {
                font: { family: 'DM Mono, monospace', size: 9 },
                color: '#6B7A99',
                maxRotation: 45,
                autoSkip: false
              },
              grid: { color: 'rgba(255,255,255,0.04)' },
              border: { color: 'rgba(255,255,255,0.08)' }
            },
            y: {
              beginAtZero: true,
              max: 16,
              ticks: {
                font: { family: 'DM Mono, monospace', size: 9 },
                color: '#6B7A99',
                stepSize: 2
              },
              grid: { color: 'rgba(255,255,255,0.06)' },
              border: { color: 'rgba(255,255,255,0.08)' }
            }
          }
        },
        plugins: [{
          id: 'progressiveReveal',
          beforeDatasetsDraw: (chart) => {
            const ctx = chart.ctx;
            const chartArea = chart.chartArea;
            if (!chartArea) return;
            const width = chartArea.right - chartArea.left;
            const progress = chart._revealProgress !== undefined ? chart._revealProgress : 0;
            
            ctx.save();
            ctx.beginPath();
            ctx.rect(chartArea.left, chartArea.top - 20, width * progress, chartArea.bottom - chartArea.top + 40);
            ctx.clip();
          },
          afterDatasetsDraw: (chart) => {
            chart.ctx.restore();
          }
        }]
      })

      let start = null;
      const duration = 2500;
      const pauseDuration = 1500;
      const animate = (timestamp) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        
        let p = elapsed / duration;
        let isWaiting = false;
        
        if (p >= 1) {
          p = 1;
          isWaiting = (elapsed - duration) < pauseDuration;
          if (!isWaiting) {
            start = timestamp; // Reset loop
            p = 0;
          }
        }
        
        const easeP = -(Math.cos(Math.PI * p) - 1) / 2;

        if (chartRef.current) {
          chartRef.current._revealProgress = easeP;
          chartRef.current.update('none');
        }

        frameId = requestAnimationFrame(animate);
      };
      frameId = requestAnimationFrame(animate);
    }

    if (!window.Chart) {
      const script = document.createElement('script')
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js'
      script.async = true
      script.onload = initChart
      document.head.appendChild(script)
    } else {
      initChart()
    }

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      if (chartRef.current) {
        chartRef.current.destroy()
        chartRef.current = null
      }
    }
  }, [])

  return (
    <div style={{
      background: 'rgba(13,19,32,0.8)',
      borderRadius: '12px',
      padding: '16px 20px',
      border: '1px solid rgba(79,127,255,0.15)',
      width: '100%',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '4px',
      }}>
        <span style={{
          color: '#4F7FFF',
          fontFamily: 'DM Mono, monospace',
          fontSize: '11px',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
        }}>
          200+ TOTALS PER SEASON
        </span>
        <span style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          color: '#6B7A99',
          fontFamily: 'DM Mono, monospace',
          fontSize: '10px',
        }}>
          LIVE
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#4F7FFF',
            display: 'inline-block',
            animation: 'livePulse 1s infinite',
          }} />
        </span>
      </div>

      <div style={{
        color: '#6B7A99',
        fontFamily: 'DM Mono, monospace',
        fontSize: '10px',
        marginBottom: '14px',
      }}>
        T20 batting ceiling rising — 600% increase in 15 years
      </div>

      <div style={{ position: 'relative', height: '200px' }}>
        <canvas ref={canvasRef} />
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '10px',
        paddingTop: '8px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        <span style={{
          color: '#6B7A99',
          fontFamily: 'DM Mono, monospace',
          fontSize: '9px',
        }}>
          200,000+ rows · MySQL + Power BI · 2008–2023
        </span>
        <span style={{
          color: '#4F7FFF',
          fontFamily: 'DM Mono, monospace',
          fontSize: '9px',
        }}>
          peak: 14 in 2023
        </span>
      </div>
    </div>
  )
}

/* ─── F1 Circuit SVG ─── */
const S1 = [
  ['M', 350, 130],
  ['L', 450, 210], 
  ['Q', 490, 240, 480, 290], // 01
  ['L', 465, 350], 
  ['Q', 455, 390, 490, 410], // 02
  ['L', 520, 425], 
  ['Q', 550, 435, 530, 460], // 03 — pulled up
  ['L', 505, 480], 
  ['Q', 490, 495, 505, 510], // 04 — pulled up
  ['L', 520, 520], 
  ['Q', 545, 540, 570, 515], // 05 — pulled up
  ['L', 760, 280] // straight to 06
];
const S2 = [
  ['M', 760, 280],
  ['Q', 780, 250, 750, 230], // 06
  ['L', 720, 210],
  ['Q', 680, 180, 710, 150], // 07 entry
  ['Q', 740, 120, 790, 160], // 07 exit
  ['L', 840, 210], 
  ['Q', 880, 250, 890, 310], // 08
  ['L', 910, 480], 
  ['Q', 920, 550, 860, 560], // 09
  ['L', 780, 575], 
  ['Q', 740, 590, 710, 600], // 10 — pushed down
  ['Q', 675, 615, 640, 605], // 11 — pushed down
  ['Q', 600, 595, 565, 600], // 12 — pushed down
  ['Q', 530, 610, 490, 630], // 13 entry — pushed down
  ['Q', 455, 655, 435, 620], // 13-14 — pushed down
  ['Q', 420, 595, 390, 570]  // 14 — pushed down
];
const S3 = [
  ['M', 390, 570],
  ['L', 180, 340], 
  ['Q', 150, 310, 160, 265], // 15
  ['Q', 170, 220, 210, 200], // 15 exit
  ['L', 260, 165], 
  ['Q', 280, 155, 270, 135], // 16
  ['Q', 260, 115, 280, 95], // 17
  ['Q', 300, 75, 330, 85], // 18 entry
  ['Q', 360, 95, 350, 130] // 18 exit
];

const buildSVG = (cmds) => cmds.map(c => c.join(' ')).join(' ');
const pathS1 = buildSVG(S1);
const pathS2 = buildSVG(S2);
const pathS3 = buildSVG(S3);
const pathFull = buildSVG([...S1, ...S2.slice(1), ...S3.slice(1)]);

const f1Path = new THREE.Path();
const mapX = (x) => ((x + 50) / 1100) * 4 - 2;
const mapY = (y) => 1.5 - ((y + 50) / 900) * 3;

[...S1, ...S2.slice(1), ...S3.slice(1)].forEach(cmd => {
  if (cmd[0] === 'M') f1Path.moveTo(mapX(cmd[1]), mapY(cmd[2]));
  if (cmd[0] === 'L') f1Path.lineTo(mapX(cmd[1]), mapY(cmd[2]));
  if (cmd[0] === 'Q') f1Path.quadraticCurveTo(mapX(cmd[1]), mapY(cmd[2]), mapX(cmd[3]), mapY(cmd[4]));
});

function F1TrackCar() {
  const { scene } = useGLTF('/models/generic_f1.glb')
  const clonedScene = useMemo(() => scene.clone(), [scene])
  const groupRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return
    const t = (state.clock.elapsedTime / 6.0) % 1.0;
    const pt = f1Path.getPointAt(t);
    const tangent = f1Path.getTangentAt(t);

    groupRef.current.position.x = pt.x;
    groupRef.current.position.y = pt.y;
    groupRef.current.rotation.z = Math.atan2(tangent.y, tangent.x);
  })

  return (
    <group ref={groupRef}>
      <Center>
        <primitive
          object={clonedScene}
          scale={0.10}
          position={[0, 0, 0]}
          rotation={[Math.PI / 2, Math.PI / 2, 0]}
        />
      </Center>
    </group>
  )
}

function F1Circuit() {
  return (
    <div style={{ 
      width: '100%', 
      maxWidth: '450px',
      aspectRatio: '4 / 3',
      position: 'relative',
      margin: '0 auto'
    }}>
      <svg
        viewBox="-50 -50 1100 900"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <path d={pathFull} stroke="#FFF" strokeWidth="12" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d={pathFull} stroke="#1A1D20" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Track Segments */}
        <path d={S1.map(c => c.join(' ')).join(' ')} stroke="#FF1E1E" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d={S2.map(c => c.join(' ')).join(' ')} stroke="#00A8FF" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d={S3.map(c => c.join(' ')).join(' ')} stroke="#FFD700" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />

        {/* Turn Numbers */}
        {[
          { n: 1, x: 510, y: 260 }, { n: 2, x: 450, y: 410 }, { n: 3, x: 490, y: 440 },
          { n: 4, x: 465, y: 500 }, { n: 5, x: 585, y: 540 }, { n: 6, x: 720, y: 250 },
          { n: 7, x: 670, y: 140 }, { n: 8, x: 920, y: 280 }, { n: 9, x: 890, y: 580 },
          { n: 10, x: 710, y: 560 }, { n: 11, x: 640, y: 640 }, { n: 12, x: 560, y: 560 },
          { n: 13, x: 440, y: 665 }, { n: 14, x: 355, y: 600 }, { n: 15, x: 120, y: 270 },
          { n: 16, x: 240, y: 150 }, { n: 17, x: 250, y: 80 }, { n: 18, x: 330, y: 50 }
        ].map(t => (
          <g key={t.n} transform={`translate(${t.x}, ${t.y})`}>
            <circle cx="0" cy="0" r="14" fill="#1A1D20" stroke="#FFF" strokeWidth="1.5" />
            <text x="0" y="4" fill="#FFF" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
              {t.n < 10 ? '0' + t.n : t.n}
            </text>
          </g>
        ))}

        {/* SECTOR LABELS */}
        <text x="540" y="510" fill="#FF1E1E" fontSize="16" fontWeight="bold" transform="rotate(20, 540, 510)" fontFamily="sans-serif">SECTOR 1</text>
        <text x="800" y="600" fill="#00A8FF" fontSize="16" fontWeight="bold" transform="rotate(-8, 800, 600)" fontFamily="sans-serif">SECTOR 2</text>
        <text x="275" y="440" fill="#FFD700" fontSize="16" fontWeight="bold" transform="rotate(-45, 275, 440)" fontFamily="sans-serif">SECTOR 3</text>

        {/* Dashed DRS Activation lines */}
        <line x1="596" y1="500" x2="756" y2="319" stroke="#11CC11" strokeWidth="4" strokeDasharray="6,6" />
        <line x1="384" y1="530" x2="214" y2="346" stroke="#11CC11" strokeWidth="4" strokeDasharray="6,6" />
        <line x1="390" y1="140" x2="450" y2="188" stroke="#11CC11" strokeWidth="4" strokeDasharray="6,6" />

        {/* SPEED TRAP */}
        <circle cx="220" cy="380" r="6" fill="#FF00FF" />
        <polyline points="220,380 160,380 160,470" stroke="#FF00FF" strokeWidth="2" fill="none" />
        <rect x="85" y="470" width="150" height="50" rx="6" fill="#FF00FF" />
        <text x="160" y="492" fill="#FFF" fontSize="18" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">SPEED</text>
        <text x="160" y="512" fill="#FFF" fontSize="18" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">TRAP</text>

        {/* DRS DETECTION ZONE 1 */}
        <circle cx="520" cy="460" r="6" fill="#11CC11" />
        <polyline points="520,460 520,400 620,400" stroke="#11CC11" strokeWidth="2" fill="none" />
        <rect x="620" y="365" width="180" height="70" rx="6" fill="#11CC11" />
        <text x="710" y="388" fill="#FFF" fontSize="16" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">DRS</text>
        <text x="710" y="408" fill="#FFF" fontSize="16" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">DETECTION</text>
        <text x="710" y="428" fill="#FFF" fontSize="16" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">ZONE 1</text>

        {/* DRS DETECTION ZONE 2 */}
        <circle cx="640" cy="605" r="6" fill="#11CC11" />
        <polyline points="640,605 640,690 660,690" stroke="#11CC11" strokeWidth="2" fill="none" />
        <rect x="660" y="655" width="180" height="70" rx="6" fill="#11CC11" />
        <text x="750" y="678" fill="#FFF" fontSize="16" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">DRS</text>
        <text x="750" y="698" fill="#FFF" fontSize="16" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">DETECTION</text>
        <text x="750" y="718" fill="#FFF" fontSize="16" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">ZONE 2</text>

        {/* Start / Finish */}
        <g transform="translate(345, 125) rotate(39)">
          <rect x="0" y="-10" width="10" height="10" fill="#FFF" />
          <rect x="10" y="-10" width="10" height="10" fill="#1A1D20" />
          <rect x="0" y="0" width="10" height="10" fill="#1A1D20" />
          <rect x="10" y="0" width="10" height="10" fill="#FFF" />
          <rect x="20" y="-10" width="10" height="10" fill="#FFF" />
          <rect x="20" y="0" width="10" height="10" fill="#1A1D20" />
        </g>
        <path d="M 375 144 L 385 154 L 375 164 M 385 152 L 395 162 L 385 172" stroke="#FFF" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <Canvas
        style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          pointerEvents: 'none'
        }}
        camera={{ position: [0, 0, 3.621], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={5.0} />
        <directionalLight position={[10, 10, 10]} intensity={4.0} />
        <Suspense fallback={null}>
          <F1TrackCar />
        </Suspense>
      </Canvas>
    </div>
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
    width: 48px; height: 3px; background: #4F7FFF;
    border-radius: 99px; margin-bottom: 48px;
  }
  .proj-list { display: flex; flex-direction: column; gap: 40px; }

  /* ── Shared card base ── */
  .proj-card {
    background: #0D1230; border-radius: 20px; padding: 40px;
    transition: all 0.3s ease; position: relative; overflow: hidden;
  }
  .proj-card:hover { transform: translateY(-6px); }

  /* ── Featured F1 ── */
  .proj-card.featured {
    border: 1px solid rgba(79,127,255,0.45);
    box-shadow: 0 0 50px rgba(79,127,255,0.08), 0 0 100px rgba(79,127,255,0.04);
  }
  .proj-card.featured:hover {
    box-shadow: 0 0 60px rgba(79,127,255,0.18), 0 0 100px rgba(79,127,255,0.08);
  }

  /* ── NeuroLens ── */
  .proj-card.aiml {
    border: 1px solid rgba(155,109,255,0.45);
    box-shadow: 0 0 50px rgba(155,109,255,0.08);
  }
  .proj-card.aiml:hover {
    box-shadow: 0 0 60px rgba(155,109,255,0.18);
  }

  /* ── IPL ── */
  .proj-card.analytics {
    border: 1px solid rgba(79,127,255,0.25);
  }
  .proj-card.analytics:hover {
    box-shadow: 0 0 40px rgba(79,127,255,0.12);
  }

  /* ── Mini card ── */
  .proj-card.mini {
    border: 1px solid #1E2535; max-width: 700px; margin: 0 auto;
    padding: 32px;
  }
  .proj-card.mini:hover { box-shadow: 0 0 30px rgba(0,0,0,0.3); }

  /* ── Two-column layout ── */
  .proj-two-col {
    display: grid; grid-template-columns: 55% 45%; gap: 32px; align-items: center;
  }

  /* ── Badge ── */
  @keyframes badgePulse {
    0% { box-shadow: 0 0 0px rgba(79,127,255,0); }
    50% { box-shadow: 0 0 12px rgba(79,127,255,0.5); }
    100% { box-shadow: 0 0 0px rgba(79,127,255,0); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
  @keyframes livePulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.2; }
  }
  .proj-badge {
    display: inline-block; font-family: 'DM Mono', monospace; font-size: 11px;
    font-weight: 500; padding: 4px 12px; border-radius: 99px;
    text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px;
  }
  .proj-badge.featured {
    background: rgba(79,127,255,0.15); border: 1px solid #4F7FFF; color: #4F7FFF;
    animation: badgePulse 2s ease-in-out infinite;
  }
  .proj-badge.aiml {
    background: rgba(155,109,255,0.15); border: 1px solid #9B6DFF; color: #9B6DFF;
  }
  .proj-badge.analytics {
    background: rgba(79,127,255,0.1); border: 1px solid rgba(79,127,255,0.4); color: #4F7FFF;
  }
  .proj-badge.fullstack {
    background: rgba(136,153,170,0.1); border: 1px solid rgba(136,153,170,0.3); color: #6B7A99;
  }

  .proj-title {
    font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 700;
    color: #FFFFFF; line-height: 1.2; margin-bottom: 16px;
  }

  .proj-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
  .proj-tag {
    font-family: 'DM Mono', monospace; font-size: 12px; color: #6B7A99;
    background: #06091A; padding: 5px 12px; border-radius: 6px;
    border: 1px solid #1E2535; transition: all 0.2s ease;
  }
  .proj-tag:hover { color: #FFFFFF; border-color: #6B7A99; }

  .proj-label {
    font-family: 'DM Mono', monospace; font-size: 11px; color: #4F7FFF;
    text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px; margin-top: 20px;
  }
  .proj-label.blue { color: #9B6DFF; }
  .proj-desc {
    font-family: 'DM Mono', monospace; font-size: 13px; color: #8899BB;
    line-height: 1.8;
  }

  /* ── Impact chips ── */
  .proj-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
  .proj-chip {
    font-family: 'DM Mono', monospace; font-size: 12px; padding: 6px 14px;
    border-radius: 6px; display: inline-flex; align-items: center;
  }
  .proj-chip.teal {
    background: rgba(79,127,255,0.08); border: 1px solid rgba(79,127,255,0.2); color: #4F7FFF;
  }
  .proj-chip.blue {
    background: rgba(155,109,255,0.08); border: 1px solid rgba(155,109,255,0.2); color: #9B6DFF;
  }

  .proj-how {
    font-family: 'DM Mono', monospace; font-size: 12px; color: #6B7A99;
    line-height: 1.8; margin-top: 8px;
  }

  .proj-github {
    display: inline-flex; align-items: center; gap: 8px; margin-top: 20px;
    font-family: 'DM Mono', monospace; font-size: 13px; color: #6B7A99;
    text-decoration: none; padding: 10px 20px; border-radius: 8px;
    border: 1px solid #1E2535; transition: all 0.2s ease;
  }
  .proj-github:hover {
    color: #4F7FFF; border-color: #4F7FFF;
    box-shadow: 0 0 15px rgba(79,127,255,0.15);
  }

  .proj-visual {
    display: flex; align-items: center; justify-content: center;
  }

  /* ── Mini card overrides ── */
  .proj-card.mini .proj-title { font-size: 22px; }
  .proj-mini-desc {
    font-family: 'DM Mono', monospace; font-size: 13px; color: #8899BB;
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
      <pointLight position={[5, 5, 5]} color="#4F7FFF" intensity={1.2} />
      <pointLight position={[-5, -5, 5]} color="#9B6DFF" intensity={0.8} />
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

/* ─── Hospital Readmission Pipeline + Risk Gauge ─── */
function ReadmissionPipeline() {
  const [progress, setProgress] = React.useState(0);
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    let frameId;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = null;
          const fillDuration = 5000;   // slower sweep: 5 seconds
          const holdDuration = 2000;   // pause at 73% for 2 seconds
          const totalCycle = fillDuration + holdDuration;

          const animate = (ts) => {
            if (!start) start = ts;
            const elapsed = (ts - start) % totalCycle; // loop!

            if (elapsed < fillDuration) {
              const p = elapsed / fillDuration;
              // Smooth easeInOutCubic for a nice sweep feel
              const eased = p < 0.5
                ? 4 * p * p * p
                : 1 - Math.pow(-2 * p + 2, 3) / 2;
              setProgress(eased);
            } else {
              // Hold at full
              setProgress(1);
            }

            frameId = requestAnimationFrame(animate);
          };
          frameId = requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  const steps = [
    { label: '81,414', sub: 'Raw patient encounters', abbr: 'IN' },
    { label: 'CLEAN', sub: 'Drop 95% sparse columns', abbr: 'CL' },
    { label: '46,816', sub: 'Deduplicated patients', abbr: 'DD' },
    { label: 'ENGINEER', sub: '50 → 31 features', abbr: 'FE' },
    { label: 'PREDICT', sub: 'LogisticRegressionCV', abbr: 'ML' },
  ];

  const pipelineEnd = 0.6;
  const gaugeStart = 0.55;
  const targetRisk = 73;

  // Gauge math — using stroke-dasharray for perfect alignment
  const gaugeProgress = Math.max(0, Math.min(1, (progress - gaugeStart) / (1 - gaugeStart)));
  const needleEased = gaugeProgress === 1 ? 1 : 1 - Math.pow(2, -10 * gaugeProgress);
  const riskValue = Math.round(needleEased * targetRisk);

  // Arc geometry: semicircle from left to right
  const cx = 100, cy = 90, radius = 65;
  // Total arc length of semicircle = π * r
  const totalArc = Math.PI * radius; // ~204
  // How much of the arc to fill (73% of semicircle)
  const fillLength = needleEased * (targetRisk / 100) * totalArc;
  const dashOffset = totalArc - fillLength;

  // Needle angle: starts pointing left (-180°), sweeps to right (0°)
  // At 0% risk → -180°, at 100% → 0°, at 73% → -180 + 131.4 = -48.6°
  const needleAngleDeg = -180 + needleEased * (targetRisk / 100) * 180;
  const needleAngleRad = (needleAngleDeg * Math.PI) / 180;
  const needleLen = 48;
  const nx = cx + needleLen * Math.cos(needleAngleRad);
  const ny = cy + needleLen * Math.sin(needleAngleRad);

  const riskColor = riskValue > 60 ? '#EF4444' : riskValue > 35 ? '#EAB308' : '#22C55E';

  // The semicircle arc path (left to right, counter-clockwise in SVG)
  const arcPath = `M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`;

  return (
    <div ref={containerRef} style={{
      background: 'rgba(6,9,26,0.9)',
      borderRadius: '16px',
      padding: '22px 18px 16px',
      border: '1px solid rgba(155,109,255,0.2)',
      width: '100%',
      maxWidth: '300px',
      margin: '0 auto',
      boxShadow: '0 0 40px rgba(155,109,255,0.06)',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: '20px', paddingBottom: '10px',
        borderBottom: '1px solid rgba(155,109,255,0.1)',
      }}>
        <span style={{
          color: '#9B6DFF', fontFamily: 'DM Mono, monospace',
          fontSize: '10px', letterSpacing: '2px', fontWeight: 500,
        }}>ML PIPELINE</span>
        <span style={{
          display: 'flex', alignItems: 'center', gap: '5px',
          color: '#6B7A99', fontFamily: 'DM Mono, monospace', fontSize: '9px',
        }}>
          PROCESSING
          <span style={{
            width: '5px', height: '5px', borderRadius: '50%',
            background: '#9B6DFF', display: 'inline-block',
            animation: 'livePulse 1.2s infinite',
          }} />
        </span>
      </div>

      {/* Pipeline Steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
        {steps.map((step, i) => {
          const stepT = Math.max(0, Math.min(1,
            (progress / pipelineEnd - i * 0.18) / 0.28
          ));
          const visible = stepT > 0;
          const done = stepT >= 1;
          const lineT = Math.max(0, Math.min(1,
            (progress / pipelineEnd - (i + 0.6) * 0.18) / 0.2
          ));

          return (
            <React.Fragment key={i}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                opacity: visible ? 1 : 0.15,
                transform: visible ? 'translateX(0)' : 'translateX(-12px)',
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              }}>
                <div style={{
                  width: '30px', height: '30px', borderRadius: '8px',
                  background: done ? 'rgba(155,109,255,0.2)' : 'rgba(30,37,53,0.8)',
                  border: `1px solid ${done ? 'rgba(155,109,255,0.5)' : '#1E2535'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'DM Mono, monospace', fontSize: '9px', fontWeight: 700,
                  color: done ? '#9B6DFF' : '#6B7A99',
                  flexShrink: 0, letterSpacing: '0.5px',
                  transition: 'all 0.4s ease',
                  boxShadow: done ? '0 0 12px rgba(155,109,255,0.15)' : 'none',
                }}>{step.abbr}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: 'DM Mono, monospace', fontSize: '13px',
                    fontWeight: 600, color: done ? '#E8EEFF' : '#6B7A99',
                    lineHeight: 1.2, letterSpacing: '0.5px',
                    transition: 'color 0.3s ease',
                  }}>{step.label}</div>
                  <div style={{
                    fontFamily: 'DM Mono, monospace', fontSize: '9px',
                    color: '#4F5B73', lineHeight: 1.4, marginTop: '1px',
                  }}>{step.sub}</div>
                </div>
                <div style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: done ? '#22C55E' : '#1E2535',
                  border: done ? 'none' : '1px solid #2A3547',
                  flexShrink: 0, transition: 'all 0.3s ease',
                  boxShadow: done ? '0 0 6px rgba(34,197,94,0.4)' : 'none',
                }} />
              </div>
              {i < steps.length - 1 && (
                <div style={{
                  width: '1.5px', height: '14px', marginLeft: '14px',
                  background: lineT > 0 ? '#9B6DFF' : '#1E2535',
                  opacity: lineT > 0 ? 0.6 : 0.3,
                  transition: 'all 0.3s ease',
                }} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Divider + Arrow */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        margin: '12px 0 2px',
        opacity: gaugeProgress > 0 ? 1 : 0.2,
        transition: 'opacity 0.5s ease',
      }}>
        <div style={{ width: '1.5px', height: '10px', background: '#9B6DFF', opacity: 0.4 }} />
        <span style={{ color: '#9B6DFF', fontSize: '10px', lineHeight: 1 }}>▼</span>
      </div>

      {/* Risk Gauge */}
      <div style={{
        opacity: gaugeProgress > 0 ? 1 : 0,
        transform: gaugeProgress > 0 ? 'scale(1)' : 'scale(0.85)',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        <svg viewBox="0 0 200 120" width="100%" style={{ display: 'block', overflow: 'visible' }}>
          <defs>
            <linearGradient id="riskGaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22C55E" />
              <stop offset="40%" stopColor="#EAB308" />
              <stop offset="75%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
          </defs>

          {/* Background track (dim, full semicircle) */}
          <path d={arcPath} fill="none" stroke="#1E2535" strokeWidth="10" strokeLinecap="round" />

          {/* Colored fill arc — SAME path, masked with dasharray to only show up to needle */}
          <path
            d={arcPath}
            fill="none"
            stroke="url(#riskGaugeGrad)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={totalArc}
            strokeDashoffset={dashOffset}
          />

          {/* Tick marks on the arc */}
          {[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0].map((t, i) => {
            const angle = -180 + t * 180;
            const rad = (angle * Math.PI) / 180;
            const ix = cx + (radius - 7) * Math.cos(rad);
            const iy = cy + (radius - 7) * Math.sin(rad);
            const ox = cx + (radius + 2) * Math.cos(rad);
            const oy = cy + (radius + 2) * Math.sin(rad);
            return <line key={i} x1={ix} y1={iy} x2={ox} y2={oy} stroke="#2A3547" strokeWidth="1" />;
          })}

          {/* Needle glow */}
          <circle cx={nx} cy={ny} r="6" fill={riskColor} opacity="0.2" />

          {/* Needle line */}
          <line x1={cx} y1={cy} x2={nx} y2={ny}
            stroke="#E8EEFF" strokeWidth="2" strokeLinecap="round" />

          {/* Needle hub */}
          <circle cx={cx} cy={cy} r="5" fill="#06091A" stroke="#9B6DFF" strokeWidth="1.5" />
          <circle cx={cx} cy={cy} r="2" fill="#9B6DFF" />

          {/* Risk percentage */}
          <text x={cx} y={cy - 16} textAnchor="middle"
            fontFamily="'DM Mono', monospace" fontSize="24" fontWeight="700"
            fill={riskColor}
          >{riskValue}%</text>

          {/* Label below hub */}
          <text x={cx} y={cy + 17} textAnchor="middle"
            fontFamily="'DM Mono', monospace" fontSize="6.5" fill="#6B7A99"
            letterSpacing="1.5"
          >READMISSION RISK</text>

          {/* Zone labels */}
          <text x={cx - radius - 2} y={cy + 16} textAnchor="middle"
            fontFamily="'DM Mono', monospace" fontSize="7" fill="#22C55E" fontWeight="600"
          >LOW</text>
          <text x={cx} y={cy - radius - 4} textAnchor="middle"
            fontFamily="'DM Mono', monospace" fontSize="7" fill="#EAB308" fontWeight="600"
          >MED</text>
          <text x={cx + radius + 2} y={cy + 16} textAnchor="middle"
            fontFamily="'DM Mono', monospace" fontSize="7" fill="#EF4444" fontWeight="600"
          >HIGH</text>
        </svg>
      </div>

      {/* Bottom stats */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        paddingTop: '10px', borderTop: '1px solid rgba(155,109,255,0.08)',
        marginTop: '4px',
        opacity: gaugeProgress > 0.5 ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}>
        <span style={{ color: '#4F5B73', fontFamily: 'DM Mono, monospace', fontSize: '8px', letterSpacing: '0.5px' }}>
          130 hospitals · UCI dataset
        </span>
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', fontWeight: 600, color: '#9B6DFF' }}>
          recall: 65%
        </span>
      </div>
    </div>
  );
}

function ReadmissionCard({ project }) {
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
          <ReadmissionPipeline />
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Cute Chibi Agent Bot Toy Mascot Component ─── */
function AgentToyBot({ x, y, angle = 0, state = 'normal', tool = 'idea', label = '', scale = 1, accentColor }) {
  const isWarning = state === 'warning';
  const isSuccess = state === 'success';
  const eyeColor = isWarning ? '#F59E0B' : isSuccess ? '#10B981' : (accentColor || '#38BDF8');
  const botBorder = isWarning ? '#F59E0B' : isSuccess ? '#10B981' : (accentColor || '#4F7FFF');

  return (
    <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${angle})`} style={{ transition: 'transform 0.08s linear' }}>
      {/* Jet thruster ion flame underneath */}
      <g transform="translate(0, 13)">
        <ellipse cx="0" cy="0" rx="4.5" ry="1.6" fill={eyeColor} opacity="0.7" />
        <polygon points="-3,0 3,0 0,7" fill={isWarning ? '#F59E0B' : isSuccess ? '#10B981' : '#60A5FA'} opacity="0.85" />
        <circle cx="0" cy="5" r="1.2" fill="#FFFFFF" opacity="0.9" />
      </g>

      {/* Shadow under bot */}
      <ellipse cx="0" cy="18" rx="8" ry="2.2" fill="rgba(0,0,0,0.5)" />

      {/* Main Chibi Robot Body */}
      <rect
        x="-12"
        y="-12"
        width="24"
        height="24"
        rx="8"
        fill="#0B132B"
        stroke={botBorder}
        strokeWidth="1.8"
        style={{ filter: `drop-shadow(0 0 8px ${botBorder}88)` }}
      />

      {/* Cute Head Antenna with Pulsing Light */}
      <line x1="0" y1="-12" x2="0" y2="-18" stroke={botBorder} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="0" cy="-19" r="2.5" fill={eyeColor} />
      <circle cx="0" cy="-19" r="4.5" fill={eyeColor} opacity="0.35" />

      {/* Robot Ears / Side Nodes */}
      <rect x="-14.5" y="-6" width="2.5" height="7" rx="1.2" fill={botBorder} />
      <rect x="12" y="-6" width="2.5" height="7" rx="1.2" fill={botBorder} />

      {/* Visor Screen */}
      <rect x="-9" y="-8" width="18" height="9.5" rx="4" fill="#04060F" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" />

      {/* Cute Expressive Chibi Eyes */}
      {isWarning ? (
        // Alert / Worried expression ( > < )
        <g stroke={eyeColor} strokeWidth="1.6" strokeLinecap="round">
          <line x1="-6" y1="-5" x2="-2.5" y2="-3" />
          <line x1="-6" y1="-3" x2="-2.5" y2="-5" />
          <line x1="2.5" y1="-3" x2="6" y2="-5" />
          <line x1="2.5" y1="-5" x2="6" y2="-3" />
        </g>
      ) : isSuccess ? (
        // Happy triumphant eyes ( ^ ^ )
        <g stroke={eyeColor} strokeWidth="1.6" strokeLinecap="round" fill="none">
          <path d="M -6 -2.5 Q -4.2 -6 -2.5 -2.5" />
          <path d="M 2.5 -2.5 Q 4.2 -6 6 -2.5" />
        </g>
      ) : (
        // Bright open digital eyes ( • • ) with catchlight
        <g>
          <circle cx="-4" cy="-3.5" r="1.8" fill={eyeColor} />
          <circle cx="-3.3" cy="-4.2" r="0.7" fill="#FFFFFF" />
          <circle cx="4" cy="-3.5" r="1.8" fill={eyeColor} />
          <circle cx="4.7" cy="-4.2" r="0.7" fill="#FFFFFF" />
        </g>
      )}

      {/* Chest Core Reactor */}
      <circle cx="0" cy="5.5" r="2.2" fill={eyeColor} opacity="0.95" />
      <circle cx="0" cy="5.5" r="4" fill={eyeColor} opacity="0.25" />

      {/* Tool / Payload in Hand */}
      {tool === 'idea' && (
        <g transform="translate(11, 2)">
          <circle r="4.5" fill="#FBBF24" opacity="0.3" />
          <text x="0" y="3.5" fontSize="9" textAnchor="middle">💡</text>
        </g>
      )}
      {tool === 'search' && (
        <g transform="translate(11, 2)">
          <circle r="4.5" fill="#38BDF8" opacity="0.3" />
          <text x="0" y="3.5" fontSize="9" textAnchor="middle">🔍</text>
        </g>
      )}
      {tool === 'quill' && (
        <g transform="translate(11, 2)">
          <circle r="4.5" fill="#818CF8" opacity="0.3" />
          <text x="0" y="3.5" fontSize="9" textAnchor="middle">✍️</text>
        </g>
      )}
      {tool === 'scales' && (
        <g transform="translate(11, 2)">
          <circle r="4.5" fill={isWarning ? '#F59E0B' : '#10B981'} opacity="0.3" />
          <text x="0" y="3.5" fontSize="9" textAnchor="middle">⚖️</text>
        </g>
      )}
      {tool === 'firstaid' && (
        <g transform="translate(11, 2)">
          <circle r="4.5" fill="#F43F5E" opacity="0.3" />
          <text x="0" y="3.5" fontSize="9" textAnchor="middle">🩺</text>
        </g>
      )}
      {tool === 'package' && (
        <g transform="translate(11, 2)">
          <circle r="5" fill="#10B981" opacity="0.3" />
          <text x="0" y="4" fontSize="10" textAnchor="middle">📦</text>
        </g>
      )}
      {tool === 'rocket' && (
        <g transform="translate(10, 2)">
          <text x="0" y="3.5" fontSize="8" textAnchor="middle">🚀</text>
        </g>
      )}
      {tool === 'palette' && (
        <g transform="translate(10, 2)">
          <text x="0" y="3.5" fontSize="8" textAnchor="middle">🎨</text>
        </g>
      )}
      {tool === 'scissors' && (
        <g transform="translate(10, 2)">
          <text x="0" y="3.5" fontSize="8" textAnchor="middle">✂️</text>
        </g>
      )}

      {/* Floating Status Pill Banner */}
      {label && (
        <g transform="translate(0, -28)">
          <rect
            x={-(label.length * 3.5 + 8)}
            y="-7.5"
            width={label.length * 7 + 16}
            height="14"
            rx="4.5"
            fill="#06091A"
            stroke={botBorder}
            strokeWidth="0.9"
            style={{ filter: `drop-shadow(0 0 5px ${botBorder}66)` }}
          />
          <text
            x="0"
            y="2.5"
            textAnchor="middle"
            fontFamily="'DM Mono', monospace"
            fontSize="7"
            fill={eyeColor}
            fontWeight="700"
            letterSpacing="0.4px"
          >
            {label}
          </text>
        </g>
      )}
    </g>
  );
}

/* ─── Content Maker: Autonomous Multi-Agent Swarm Visual ─── */
function ContentMakerVisual() {
  const [progress, setProgress] = React.useState(0);
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    let frameId;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = null;
          const cycleDuration = 8000;
          const holdDuration = 2500;
          const totalCycle = cycleDuration + holdDuration;

          const animate = (ts) => {
            if (!start) start = ts;
            const elapsed = (ts - start) % totalCycle;
            if (elapsed < cycleDuration) {
              setProgress(elapsed / cycleDuration);
            } else {
              setProgress(1);
            }
            frameId = requestAnimationFrame(animate);
          };
          frameId = requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  const p = progress;

  // Node active states
  const isInput = p < 0.16;
  const isResearch = p >= 0.12 && p < 0.32;
  const isWriter = p >= 0.28 && p < 0.48;
  const isCritic1 = p >= 0.44 && p < 0.58;
  const isDoctor = p >= 0.54 && p < 0.68;
  const isCritic2 = p >= 0.64 && p < 0.74;
  const isPackaging = p >= 0.72 && p < 0.90;
  const isDone = p >= 0.90;

  // Subtle hovering bob for the toy agent
  const bob = Math.sin(p * Math.PI * 18) * 2.2;

  // Compute Rubric Score & Color
  let rubricScore = '5/5';
  let rubricColor = '#10B981';
  if (p >= 0.46 && p < 0.58) {
    rubricScore = '2/5';
    rubricColor = '#EF4444';
  } else if (p >= 0.58 && p < 0.70) {
    const t = (p - 0.58) / 0.12;
    rubricScore = t > 0.6 ? '5/5' : '3/5';
    rubricColor = t > 0.6 ? '#10B981' : '#F59E0B';
  } else if (p < 0.46) {
    rubricScore = '—';
    rubricColor = '#6B7A99';
  } else {
    rubricScore = '5/5';
    rubricColor = '#10B981';
  }

  // Trajectory calculation for the Main Agent Toy Bot
  let mainBot = null;
  let subBots = [];

  if (p < 0.16) {
    // Stage 1: Input (35, 55) -> Research (125, 55)
    const t = p / 0.16;
    mainBot = {
      x: 35 + t * 90,
      y: 55 + bob,
      angle: 0,
      state: 'normal',
      tool: 'idea',
      label: 'AGENT: INGEST',
      scale: 1,
    };
  } else if (p < 0.32) {
    // Stage 2: Research (125, 55) -> Writer (225, 55)
    const t = (p - 0.16) / 0.16;
    mainBot = {
      x: 125 + t * 100,
      y: 55 + bob,
      angle: 0,
      state: 'normal',
      tool: 'search',
      label: 'AGENT: 14 SOURCES',
      scale: 1,
    };
  } else if (p < 0.46) {
    // Stage 3: Writer (225, 55) -> Critic (315, 115)
    const t = (p - 0.32) / 0.14;
    mainBot = {
      x: 225 + t * 90,
      y: 55 + t * 60 + bob,
      angle: 16,
      state: 'normal',
      tool: 'quill',
      label: 'AGENT: 1,480w DRAFT',
      scale: 1,
    };
  } else if (p < 0.58) {
    // Stage 4: Critic (315, 115) -> Doctor (195, 115) [Auto-revision route]
    const t = (p - 0.46) / 0.12;
    const arcY = -Math.sin(t * Math.PI) * 18;
    mainBot = {
      x: 315 - t * 120,
      y: 115 + arcY + bob,
      angle: -10,
      state: 'warning',
      tool: 'scales',
      label: 'CRITIC 2/5 → DOCTOR',
      scale: 1,
    };
  } else if (p < 0.70) {
    // Stage 5: Doctor (195, 115) -> Critic (315, 115) [Upgraded to 5/5!]
    const t = (p - 0.58) / 0.12;
    const arcY = Math.sin(t * Math.PI) * 18;
    const isPassing = t > 0.6;
    mainBot = {
      x: 195 + t * 120,
      y: 115 + arcY + bob,
      angle: 10,
      state: isPassing ? 'success' : 'normal',
      tool: isPassing ? 'scales' : 'firstaid',
      label: isPassing ? 'RUBRIC 5/5 APPROVED ✓' : 'AGENT: RE-WRITING',
      scale: 1,
    };
  } else if (p < 0.88) {
    // Stage 6: Parallel Dispatch!
    mainBot = {
      x: 195,
      y: 115 + bob,
      angle: 0,
      state: 'success',
      tool: 'package',
      label: 'PARALLEL SWARM DISPATCH',
      scale: 1.05,
    };

    // 3 Mini Worker Agent Bots fly to packaging stations in parallel!
    const t = (p - 0.70) / 0.18;
    subBots = [
      {
        x: 195 + t * (75 - 195),
        y: 115 + t * (185 - 115) + bob,
        angle: -18,
        tool: 'rocket',
        label: 'SEO BOT',
        state: 'normal',
        accentColor: '#10B981',
        scale: 0.82,
      },
      {
        x: 195 + t * (185 - 195),
        y: 115 + t * (185 - 115) + bob,
        angle: 0,
        tool: 'palette',
        label: 'THUMB BOT',
        state: 'normal',
        accentColor: '#6366F1',
        scale: 0.82,
      },
      {
        x: 195 + t * (295 - 195),
        y: 115 + t * (185 - 115) + bob,
        angle: 18,
        tool: 'scissors',
        label: 'SHORTS BOT',
        state: 'normal',
        accentColor: '#A855F7',
        scale: 0.82,
      },
    ];
  } else {
    // Stage 7: Complete!
    mainBot = {
      x: 195,
      y: 115 + bob,
      angle: 0,
      state: 'success',
      tool: 'package',
      label: 'YOUTUBE PACKAGE COMPLETE ✓',
      scale: 1.08,
    };
    subBots = [
      { x: 75, y: 185 + bob, angle: 0, tool: 'rocket', label: 'TAGS OK', state: 'success', accentColor: '#10B981', scale: 0.82 },
      { x: 185, y: 185 + bob, angle: 0, tool: 'palette', label: 'THUMB OK', state: 'success', accentColor: '#6366F1', scale: 0.82 },
      { x: 295, y: 185 + bob, angle: 0, tool: 'scissors', label: 'CLIPS OK', state: 'success', accentColor: '#A855F7', scale: 0.82 },
    ];
  }

  // Live status stream message
  let logText = '';
  if (p < 0.16) {
    logText = 'Agent Bot: Ingesting topic prompt "Building Agent Swarms"...';
  } else if (p < 0.32) {
    logText = 'Agent Bot: Synthesizing 14 verified knowledge sources...';
  } else if (p < 0.46) {
    logText = 'Agent Bot: Drafting 3-act YouTube script (1,480 words)...';
  } else if (p < 0.58) {
    logText = 'Critic Evaluator: Rubric 2/5 (Weak Hook) → Flying to Doctor';
  } else if (p < 0.70) {
    logText = 'Script Doctor: Hook revised (Loop 1) → Rubric 5/5 APPROVED ✓';
  } else if (p < 0.88) {
    logText = 'Parallel Swarm: 3 Mini Bots packaging SEO, Thumbnails & Shorts...';
  } else {
    logText = 'YouTube Production Package Complete · Zero human intervention';
  }

  return (
    <div ref={containerRef} style={{
      background: '#06091A',
      borderRadius: '16px',
      padding: '20px 16px 14px',
      border: '1px solid rgba(155,109,255,0.25)',
      width: '100%',
      maxWidth: '380px',
      margin: '0 auto',
      boxShadow: '0 0 40px rgba(155,109,255,0.08)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Top Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: '14px', paddingBottom: '10px',
        borderBottom: '1px solid rgba(155,109,255,0.12)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            color: '#9B6DFF', fontFamily: 'DM Mono, monospace',
            fontSize: '10px', letterSpacing: '2px', fontWeight: 600
          }}>
            LANGGRAPH SWARM
          </span>
          <span style={{
            background: isDone ? 'rgba(16,185,129,0.15)' : 'rgba(79,127,255,0.15)',
            border: `1px solid ${isDone ? '#10B981' : '#4F7FFF'}`,
            color: isDone ? '#10B981' : '#4F7FFF',
            fontFamily: 'DM Mono, monospace',
            fontSize: '8px', padding: '1px 6px', borderRadius: '4px', fontWeight: 600
          }}>
            {isDone ? 'COMPLETE' : 'ACTIVE'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontFamily: 'DM Mono, monospace', fontSize: '9px',
            color: rubricColor, fontWeight: 700
          }}>
            RUBRIC: {rubricScore}
          </span>
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: isDone ? '#10B981' : '#9B6DFF',
            display: 'inline-block',
            animation: 'livePulse 1.2s infinite'
          }} />
        </div>
      </div>

      {/* Interactive Agent Swarm SVG Environment */}
      <svg viewBox="0 0 360 230" width="100%" height="auto" style={{ display: 'block', overflow: 'visible' }}>
        <defs>
          <filter id="swarmGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Blueprint Circuit Grid Lines */}
        <line x1="35" y1="55" x2="125" y2="55" stroke="rgba(79,127,255,0.2)" strokeWidth="1.5" strokeDasharray="3,3" />
        <line x1="125" y1="55" x2="225" y2="55" stroke="rgba(155,109,255,0.2)" strokeWidth="1.5" strokeDasharray="3,3" />
        <line x1="225" y1="55" x2="315" y2="115" stroke="rgba(245,158,11,0.2)" strokeWidth="1.5" strokeDasharray="3,3" />
        
        {/* Cyclic Loop between Critic (315, 115) and Doctor (195, 115) */}
        <path d="M 315 110 Q 255 88 195 110" fill="none" stroke="rgba(244,63,94,0.3)" strokeWidth="1.5" strokeDasharray="3,3" />
        <path d="M 195 120 Q 255 142 315 120" fill="none" stroke="rgba(16,185,129,0.3)" strokeWidth="1.5" strokeDasharray="3,3" />

        {/* Parallel Packaging Lines */}
        <line x1="195" y1="115" x2="75" y2="185" stroke="rgba(16,185,129,0.2)" strokeWidth="1.5" strokeDasharray="3,3" />
        <line x1="195" y1="115" x2="185" y2="185" stroke="rgba(99,102,241,0.2)" strokeWidth="1.5" strokeDasharray="3,3" />
        <line x1="195" y1="115" x2="295" y2="185" stroke="rgba(168,85,247,0.2)" strokeWidth="1.5" strokeDasharray="3,3" />

        {/* Active Flow Energy Rays */}
        {p < 0.18 && (
          <line x1="35" y1="55" x2={mainBot?.x || 35} y2="55" stroke="#4F7FFF" strokeWidth="2.5" />
        )}
        {p >= 0.16 && p < 0.36 && (
          <line x1="125" y1="55" x2={mainBot?.x || 125} y2="55" stroke="#9B6DFF" strokeWidth="2.5" />
        )}
        {p >= 0.32 && p < 0.48 && (
          <line x1="225" y1="55" x2={mainBot?.x || 225} y2={mainBot?.y || 55} stroke="#F59E0B" strokeWidth="2.5" />
        )}

        {/* ── 1. INPUT NODE (35, 55) ── */}
        <g transform="translate(35, 55)">
          <circle r={isInput ? "16" : "13"} fill="#0D1230" stroke={isInput ? "#4F7FFF" : "#1E2535"} strokeWidth="1.5" />
          {isInput && <circle r="20" fill="none" stroke="#4F7FFF" opacity="0.3" strokeWidth="1" />}
          <text y="-2" textAnchor="middle" fontSize="10">💡</text>
          <text y="24" textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="8" fill={isInput ? "#4F7FFF" : "#6B7A99"} fontWeight="600">INPUT</text>
        </g>

        {/* ── 2. RESEARCH AGENT (125, 55) ── */}
        <g transform="translate(125, 55)">
          <circle r={isResearch ? "18" : "15"} fill="#0D1230" stroke={isResearch ? "#38BDF8" : "#1E2535"} strokeWidth="1.5" />
          {isResearch && <circle r="22" fill="none" stroke="#38BDF8" opacity="0.3" strokeWidth="1" />}
          <text y="-2" textAnchor="middle" fontSize="10">🔍</text>
          <text y="24" textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="8" fill={isResearch ? "#38BDF8" : "#6B7A99"} fontWeight="600">RESEARCH</text>
          <text y="32" textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="6.5" fill="#4F5B73">14 sources</text>
        </g>

        {/* ── 3. SCRIPT WRITER AGENT (225, 55) ── */}
        <g transform="translate(225, 55)">
          <circle r={isWriter ? "18" : "15"} fill="#0D1230" stroke={isWriter ? "#818CF8" : "#1E2535"} strokeWidth="1.5" />
          {isWriter && <circle r="22" fill="none" stroke="#818CF8" opacity="0.3" strokeWidth="1" />}
          <text y="-2" textAnchor="middle" fontSize="10">✍️</text>
          <text y="24" textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="8" fill={isWriter ? "#818CF8" : "#6B7A99"} fontWeight="600">WRITER</text>
          <text y="32" textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="6.5" fill="#4F5B73">1,480 words</text>
        </g>

        {/* ── 4. SCRIPT DOCTOR AGENT (195, 115) ── */}
        <g transform="translate(195, 115)">
          <circle r={isDoctor ? "18" : "14"} fill="#0D1230" stroke={isDoctor ? "#F43F5E" : "#1E2535"} strokeWidth="1.5" />
          {isDoctor && <circle r="22" fill="none" stroke="#F43F5E" opacity="0.4" strokeWidth="1" />}
          <text y="-2" textAnchor="middle" fontSize="10">🩺</text>
          <text y="23" textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="8" fill={isDoctor ? "#F43F5E" : "#6B7A99"} fontWeight="600">DOCTOR</text>
          <text y="31" textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="6.5" fill="#4F5B73">Loop 1/3</text>
        </g>

        {/* ── 5. CRITIC AGENT (JUDGE) (315, 115) ── */}
        <g transform="translate(315, 115)">
          <circle r={isCritic1 || isCritic2 ? "20" : "16"} fill="#0D1230" stroke={rubricColor} strokeWidth="1.8" />
          {(isCritic1 || isCritic2) && <circle r="25" fill="none" stroke={rubricColor} opacity="0.4" strokeWidth="1" />}
          <text y="-2" textAnchor="middle" fontSize="11">⚖️</text>
          <text y="24" textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="8" fill={rubricColor} fontWeight="700">CRITIC</text>
          <text y="33" textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="7" fill={rubricColor} fontWeight="600">{rubricScore}</text>
        </g>

        {/* ── 6. SEO AGENT (75, 185) ── */}
        <g transform="translate(75, 185)">
          <circle r={isPackaging ? "16" : "13"} fill="#0D1230" stroke={isPackaging || isDone ? "#10B981" : "#1E2535"} strokeWidth="1.5" />
          <text y="-1" textAnchor="middle" fontSize="9">🚀</text>
          <text y="22" textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="8" fill={isPackaging || isDone ? "#10B981" : "#6B7A99"} fontWeight="600">SEO</text>
          <text y="30" textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="6.5" fill="#4F5B73">Keywords</text>
        </g>

        {/* ── 7. THUMBNAIL AGENT (185, 185) ── */}
        <g transform="translate(185, 185)">
          <circle r={isPackaging ? "16" : "13"} fill="#0D1230" stroke={isPackaging || isDone ? "#6366F1" : "#1E2535"} strokeWidth="1.5" />
          <text y="-1" textAnchor="middle" fontSize="9">🎨</text>
          <text y="22" textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="8" fill={isPackaging || isDone ? "#6366F1" : "#6B7A99"} fontWeight="600">THUMB</text>
          <text y="30" textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="6.5" fill="#4F5B73">3 Concepts</text>
        </g>

        {/* ── 8. REPURPOSER AGENT (295, 185) ── */}
        <g transform="translate(295, 185)">
          <circle r={isPackaging ? "16" : "13"} fill="#0D1230" stroke={isPackaging || isDone ? "#A855F7" : "#1E2535"} strokeWidth="1.5" />
          <text y="-1" textAnchor="middle" fontSize="9">✂️</text>
          <text y="22" textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="8" fill={isPackaging || isDone ? "#A855F7" : "#6B7A99"} fontWeight="600">SHORTS</text>
          <text y="30" textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize="6.5" fill="#4F5B73">Chapters</text>
        </g>

        {/* ── MINI WORKER ASSISTANT AGENT BOTS (Parallel Swarm) ── */}
        {subBots.map((sb, i) => (
          <AgentToyBot
            key={i}
            x={sb.x}
            y={sb.y}
            angle={sb.angle}
            tool={sb.tool}
            label={sb.label}
            state={sb.state}
            scale={sb.scale}
            accentColor={sb.accentColor}
          />
        ))}

        {/* ── MAIN AUTONOMOUS AGENT TOY CHARACTER! ── */}
        {mainBot && (
          <AgentToyBot
            x={mainBot.x}
            y={mainBot.y}
            angle={mainBot.angle}
            tool={mainBot.tool}
            label={mainBot.label}
            state={mainBot.state}
            scale={mainBot.scale}
          />
        )}
      </svg>

      {/* Real-Time Live Activity Feed Console */}
      <div style={{
        marginTop: '10px',
        padding: '8px 12px',
        background: '#0D1230',
        borderRadius: '8px',
        border: '1px solid rgba(155,109,255,0.15)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <span style={{ color: '#9B6DFF', fontSize: '9px', fontFamily: 'DM Mono, monospace' }}>▸</span>
        <span style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: '9.5px',
          color: isDone ? '#10B981' : '#94A3B8',
          letterSpacing: '0.2px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          flex: 1
        }}>
          {logText}
        </span>
        <span style={{
          width: '4px', height: '10px', background: '#9B6DFF',
          display: 'inline-block', animation: 'livePulse 0.8s infinite'
        }} />
      </div>

      {/* Bottom Telemetry Bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        paddingTop: '10px', borderTop: '1px solid rgba(155,109,255,0.08)',
        marginTop: '10px'
      }}>
        <span style={{ color: '#4F5B73', fontFamily: 'DM Mono, monospace', fontSize: '8px', letterSpacing: '0.5px' }}>
          7 LLM AGENTS · LANGGRAPH
        </span>
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', fontWeight: 600, color: '#9B6DFF' }}>
          100% AUTONOMOUS
        </span>
      </div>
    </div>
  );
}

function ContentMakerCard({ project }) {
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
          <ContentMakerVisual />
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
          <IPLLineChart />
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
      <div className="proj-tags">
        {project.tags.map((t) => <span key={t} className="proj-tag">{t}</span>)}
      </div>
      
      <p className="proj-label">THE PROBLEM</p>
      <p className="proj-mini-desc">{project.whatISolved}</p>
      
      {project.impactPoints && (
        <>
          <p className="proj-label">KEY IMPACT</p>
          <div className="proj-chips">
            {project.impactPoints.map((p, i) => (
              <span key={i} className="proj-chip blue">{p}</span>
            ))}
          </div>
        </>
      )}

      {project.howIBuiltIt && (
        <>
          <p className="proj-label">HOW I BUILT IT</p>
          <p className="proj-how">{project.howIBuiltIt}</p>
        </>
      )}

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '20px' }}>
        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="proj-github" style={{ marginTop: 0 }}>
          <FaGithub /> View on GitHub
        </a>
        {project.liveLink && (
          <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="proj-github" style={{ marginTop: 0, borderColor: '#9B6DFF', color: '#9B6DFF' }}>
            Visit Live Site →
          </a>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Main Projects Section ─── */
export default function Projects() {
  const f1 = projects.find((p) => p.id === 'f1-strategy');
  const contentMaker = projects.find((p) => p.id === 'content-maker');
  const readmission = projects.find((p) => p.id === 'hospital-readmission');
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
            {contentMaker && <ContentMakerCard project={contentMaker} />}
            {readmission && <ReadmissionCard project={readmission} />}
            {ipl && <IPLCard project={ipl} />}
            {boutique && <MiniCard project={boutique} />}
          </div>
        </div>
      </section>
    </>
  );
}
