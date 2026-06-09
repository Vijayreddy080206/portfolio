import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function NeuralBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const PARTICLE_COUNT = 1800;
    const CONNECTION_DIST = 120;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(0, width, 0, height, -1000, 1000);

    // Circular soft-glow texture
    const texCanvas = document.createElement('canvas');
    texCanvas.width = 64;
    texCanvas.height = 64;
    const ctx = texCanvas.getContext('2d');
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.35, 'rgba(255,255,255,0.5)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    const texture = new THREE.CanvasTexture(texCanvas);

    // Particle data
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 2);

    const teal = new THREE.Color('#4F7FFF');
    const blue = new THREE.Color('#9B6DFF');

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = Math.random() * width;
      positions[i * 3 + 1] = Math.random() * height;
      positions[i * 3 + 2] = 0;
      velocities[i * 2] = (Math.random() - 0.5) * 0.7;
      velocities[i * 2 + 1] = (Math.random() - 0.5) * 0.7;
      const c = Math.random() < 0.62 ? teal : blue;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 4.5,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 1.0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(particleGeo, particleMat);
    scene.add(points);

    // Connection lines
    const maxLines = PARTICLE_COUNT * 4;
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));
    lineGeo.setDrawRange(0, 0);

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    // Mouse parallax
    const mouse = { x: width / 2, y: height / 2 };
    const mouseTarget = { x: width / 2, y: height / 2 };

    const onMouseMove = (e) => {
      mouseTarget.x = e.clientX;
      mouseTarget.y = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Animation loop
    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      // Lerp mouse
      mouse.x += (mouseTarget.x - mouse.x) * 0.04;
      mouse.y += (mouseTarget.y - mouse.y) * 0.04;

      const shiftX = (mouse.x - width / 2) * 0.025;
      const shiftY = (mouse.y - height / 2) * 0.025;

      // Update particle positions
      const pos = particleGeo.attributes.position.array;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        pos[i * 3] += velocities[i * 2];
        pos[i * 3 + 1] += velocities[i * 2 + 1];

        if (pos[i * 3] < 0 || pos[i * 3] > width) velocities[i * 2] *= -1;
        if (pos[i * 3 + 1] < 0 || pos[i * 3 + 1] > height) velocities[i * 2 + 1] *= -1;

        pos[i * 3] = Math.max(0, Math.min(width, pos[i * 3]));
        pos[i * 3 + 1] = Math.max(0, Math.min(height, pos[i * 3 + 1]));
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Parallax shift
      points.position.x = shiftX;
      points.position.y = shiftY;
      lines.position.x = shiftX;
      lines.position.y = shiftY;

      // Connections — check every other pair for performance
      let lineIdx = 0;
      const lp = lineGeo.attributes.position.array;
      const lc = lineGeo.attributes.color.array;
      const distSq = CONNECTION_DIST * CONNECTION_DIST;

      for (let i = 0; i < PARTICLE_COUNT && lineIdx < maxLines; i += 2) {
        for (let j = i + 1; j < PARTICLE_COUNT && lineIdx < maxLines; j += 2) {
          const dx = pos[i * 3] - pos[j * 3];
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
          const d = dx * dx + dy * dy;
          if (d < distSq) {
            const idx = lineIdx * 6;
            lp[idx] = pos[i * 3];
            lp[idx + 1] = pos[i * 3 + 1];
            lp[idx + 2] = 0;
            lp[idx + 3] = pos[j * 3];
            lp[idx + 4] = pos[j * 3 + 1];
            lp[idx + 5] = 0;
            const alpha = 1 - Math.sqrt(d) / CONNECTION_DIST;
            lc[idx] = alpha * 0.541;
            lc[idx + 1] = alpha * 0.169;
            lc[idx + 2] = alpha * 0.886;
            lc[idx + 3] = alpha * 0.541;
            lc[idx + 4] = alpha * 0.169;
            lc[idx + 5] = alpha * 0.886;
            lineIdx++;
          }
        }
      }
      lineGeo.setDrawRange(0, lineIdx * 2);
      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      renderer.setSize(width, height);
      camera.right = width;
      camera.bottom = height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      particleGeo.dispose();
      particleMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
