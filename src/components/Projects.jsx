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
  ['Q', 550, 440, 520, 470], // 03
  ['L', 490, 500], 
  ['Q', 470, 520, 490, 540], // 04
  ['L', 500, 550], 
  ['Q', 530, 580, 560, 550], // 05
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
  ['L', 780, 570], 
  ['Q', 740, 580, 710, 550], // 10
  ['Q', 680, 520, 640, 550], // 11
  ['Q', 600, 580, 560, 560], // 12
  ['Q', 520, 540, 480, 580], // 13 entry
  ['Q', 450, 620, 430, 580], // 13-14
  ['Q', 420, 560, 390, 530]  // 14
];
const S3 = [
  ['M', 390, 530],
  ['L', 180, 320], 
  ['Q', 150, 290, 160, 250], // 15
  ['Q', 170, 210, 210, 190], // 15 exit
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
const mapY = (y) => 1.5 - ((y + 50) / 825) * 3;

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
        viewBox="-50 -50 1100 825"
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
          { n: 1, x: 510, y: 260 }, { n: 2, x: 450, y: 410 }, { n: 3, x: 480, y: 450 },
          { n: 4, x: 450, y: 530 }, { n: 5, x: 580, y: 580 }, { n: 6, x: 720, y: 250 },
          { n: 7, x: 670, y: 140 }, { n: 8, x: 920, y: 280 }, { n: 9, x: 890, y: 580 },
          { n: 10, x: 710, y: 510 }, { n: 11, x: 640, y: 590 }, { n: 12, x: 560, y: 520 },
          { n: 13, x: 430, y: 620 }, { n: 14, x: 350, y: 560 }, { n: 15, x: 120, y: 250 },
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
        <text x="530" y="550" fill="#FF1E1E" fontSize="16" fontWeight="bold" transform="rotate(20, 530, 550)" fontFamily="sans-serif">SECTOR 1</text>
        <text x="800" y="595" fill="#00A8FF" fontSize="16" fontWeight="bold" transform="rotate(-8, 800, 595)" fontFamily="sans-serif">SECTOR 2</text>
        <text x="275" y="415" fill="#FFD700" fontSize="16" fontWeight="bold" transform="rotate(-45, 275, 415)" fontFamily="sans-serif">SECTOR 3</text>

        {/* Dashed DRS Activation lines */}
        <line x1="596" y1="535" x2="756" y2="319" stroke="#11CC11" strokeWidth="4" strokeDasharray="6,6" />
        <line x1="384" y1="496" x2="214" y2="326" stroke="#11CC11" strokeWidth="4" strokeDasharray="6,6" />
        <line x1="390" y1="140" x2="450" y2="188" stroke="#11CC11" strokeWidth="4" strokeDasharray="6,6" />

        {/* SPEED TRAP */}
        <circle cx="220" cy="360" r="6" fill="#FF00FF" />
        <polyline points="220,360 160,360 160,450" stroke="#FF00FF" strokeWidth="2" fill="none" />
        <rect x="85" y="450" width="150" height="50" rx="6" fill="#FF00FF" />
        <text x="160" y="472" fill="#FFF" fontSize="18" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">SPEED</text>
        <text x="160" y="492" fill="#FFF" fontSize="18" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">TRAP</text>

        {/* DRS DETECTION ZONE 1 */}
        <circle cx="520" cy="470" r="6" fill="#11CC11" />
        <polyline points="520,470 520,400 620,400" stroke="#11CC11" strokeWidth="2" fill="none" />
        <rect x="620" y="365" width="180" height="70" rx="6" fill="#11CC11" />
        <text x="710" y="388" fill="#FFF" fontSize="16" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">DRS</text>
        <text x="710" y="408" fill="#FFF" fontSize="16" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">DETECTION</text>
        <text x="710" y="428" fill="#FFF" fontSize="16" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">ZONE 1</text>

        {/* DRS DETECTION ZONE 2 */}
        <circle cx="640" cy="550" r="6" fill="#11CC11" />
        <polyline points="640,550 640,650 660,650" stroke="#11CC11" strokeWidth="2" fill="none" />
        <rect x="660" y="615" width="180" height="70" rx="6" fill="#11CC11" />
        <text x="750" y="638" fill="#FFF" fontSize="16" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">DRS</text>
        <text x="750" y="658" fill="#FFF" fontSize="16" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">DETECTION</text>
        <text x="750" y="678" fill="#FFF" fontSize="16" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">ZONE 2</text>

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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = null;
          const duration = 3500;
          const animate = (ts) => {
            if (!start) start = ts;
            const p = Math.min((ts - start) / duration, 1);
            // Smooth easeOutCubic
            const eased = 1 - Math.pow(1 - p, 3);
            setProgress(eased);
            if (p < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
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

  // Gauge math
  const gaugeProgress = Math.max(0, Math.min(1, (progress - gaugeStart) / (1 - gaugeStart)));
  // Smooth easeOutExpo for the needle
  const needleEased = gaugeProgress === 1 ? 1 : 1 - Math.pow(2, -10 * gaugeProgress);
  const riskValue = Math.round(needleEased * targetRisk);
  // Needle angle: -90 (left/0%) to +90 (right/100%), we go to 73% of that range
  const needleAngle = -90 + (needleEased * targetRisk / 100) * 180;

  // SVG arc helper: compute point on arc at a given angle (0=left, 180=right)
  const cx = 120, cy = 105, r = 70;
  const arcPoint = (angleDeg) => {
    const rad = (angleDeg - 180) * Math.PI / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  // Build the filled arc path from 0° to current risk%
  const fillAngle = needleEased * targetRisk / 100 * 180;
  const startPt = arcPoint(0);
  const endPt = arcPoint(fillAngle);
  const largeArc = fillAngle > 90 ? 1 : 0;
  const filledArcPath = fillAngle > 0.5
    ? `M ${startPt.x} ${startPt.y} A ${r} ${r} 0 ${largeArc} 1 ${endPt.x} ${endPt.y}`
    : '';

  // Needle endpoint
  const needleLen = 52;
  const needleRad = (needleAngle - 90) * Math.PI / 180;
  const needleX = cx + needleLen * Math.cos(needleRad);
  const needleY = cy + needleLen * Math.sin(needleRad);

  // Risk color
  const riskColor = riskValue > 60 ? '#EF4444' : riskValue > 35 ? '#EAB308' : '#22C55E';

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
                {/* Step icon */}
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
                {/* Step text */}
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
                {/* Status indicator */}
                <div style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: done ? '#22C55E' : '#1E2535',
                  border: done ? 'none' : '1px solid #2A3547',
                  flexShrink: 0,
                  transition: 'all 0.3s ease',
                  boxShadow: done ? '0 0 6px rgba(34,197,94,0.4)' : 'none',
                }} />
              </div>

              {/* Connecting Line */}
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
        margin: '12px 0 6px',
        opacity: gaugeProgress > 0 ? 1 : 0.2,
        transition: 'opacity 0.5s ease',
      }}>
        <div style={{
          width: '1.5px', height: '12px',
          background: 'linear-gradient(180deg, #9B6DFF, #4F7FFF)',
          opacity: 0.5,
        }} />
        <span style={{ color: '#9B6DFF', fontSize: '10px', lineHeight: 1 }}>▼</span>
      </div>

      {/* Risk Gauge */}
      <div style={{
        opacity: gaugeProgress > 0 ? 1 : 0,
        transform: gaugeProgress > 0 ? 'scale(1)' : 'scale(0.9)',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        <svg viewBox="0 0 240 140" width="100%" style={{ display: 'block' }}>
          {/* Gauge background arc (full semicircle, dim) */}
          <path
            d={`M ${arcPoint(0).x} ${arcPoint(0).y} A ${r} ${r} 0 1 1 ${arcPoint(180).x} ${arcPoint(180).y}`}
            fill="none"
            stroke="#1E2535"
            strokeWidth="12"
            strokeLinecap="round"
          />

          {/* Tick marks */}
          {[0, 18, 36, 54, 72, 90, 108, 126, 144, 162, 180].map((deg) => {
            const inner = arcPoint(deg);
            const outerR = r + 8;
            const rad = (deg - 180) * Math.PI / 180;
            const outer = { x: cx + outerR * Math.cos(rad), y: cy + outerR * Math.sin(rad) };
            return (
              <line key={deg}
                x1={inner.x} y1={inner.y}
                x2={outer.x} y2={outer.y}
                stroke="#2A3547" strokeWidth="1.5"
              />
            );
          })}

          {/* Filled arc — only up to current risk level */}
          {filledArcPath && (
            <path
              d={filledArcPath}
              fill="none"
              stroke="url(#gaugeGradient)"
              strokeWidth="12"
              strokeLinecap="round"
            />
          )}

          {/* Gradient definition */}
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22C55E" />
              <stop offset="45%" stopColor="#EAB308" />
              <stop offset="80%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
          </defs>

          {/* Glow behind needle tip */}
          <circle
            cx={needleX} cy={needleY} r="8"
            fill={riskColor} opacity="0.15"
          />

          {/* Needle */}
          <line
            x1={cx} y1={cy}
            x2={needleX} y2={needleY}
            stroke="#E8EEFF"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Needle center hub */}
          <circle cx={cx} cy={cy} r="6" fill="#0D1230" stroke="#9B6DFF" strokeWidth="2" />
          <circle cx={cx} cy={cy} r="2.5" fill="#9B6DFF" />

          {/* Risk value text */}
          <text x={cx} y={cy - 18} textAnchor="middle"
            fontFamily="DM Mono, monospace" fontSize="28" fontWeight="700"
            fill={riskColor}
          >{riskValue}%</text>

          {/* Label */}
          <text x={cx} y={cy + 24} textAnchor="middle"
            fontFamily="DM Mono, monospace" fontSize="7" fill="#6B7A99"
            letterSpacing="2"
          >READMISSION RISK</text>

          {/* Zone labels */}
          <text x="22" y={cy + 18} fontFamily="DM Mono, monospace" fontSize="7" fill="#22C55E" fontWeight="600">LOW</text>
          <text x={cx - 5} y="25" fontFamily="DM Mono, monospace" fontSize="7" fill="#EAB308" fontWeight="600">MED</text>
          <text x="205" y={cy + 18} fontFamily="DM Mono, monospace" fontSize="7" fill="#EF4444" fontWeight="600">HIGH</text>
        </svg>
      </div>

      {/* Bottom stats bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        paddingTop: '10px', borderTop: '1px solid rgba(155,109,255,0.08)',
        marginTop: '8px',
        opacity: gaugeProgress > 0.5 ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}>
        <span style={{
          color: '#4F5B73', fontFamily: 'DM Mono, monospace', fontSize: '8px',
          letterSpacing: '0.5px',
        }}>
          130 hospitals · UCI dataset
        </span>
        <span style={{
          fontFamily: 'DM Mono, monospace', fontSize: '9px', fontWeight: 600,
          color: '#9B6DFF', letterSpacing: '0.5px',
        }}>
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
            {readmission && <ReadmissionCard project={readmission} />}
            {ipl && <IPLCard project={ipl} />}
            {boutique && <MiniCard project={boutique} />}
          </div>
        </div>
      </section>
    </>
  );
}
