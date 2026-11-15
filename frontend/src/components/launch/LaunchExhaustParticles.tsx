import React, { useRef, useEffect, useCallback } from 'react';
import { LaunchPhase } from './useLaunchAnimation';

export interface LaunchExhaustParticlesProps {
  /** Current launch phase ('idle' | 'activation' | 'ignition' | 'liftoff' | 'transition') */
  launchPhase?: LaunchPhase | number | string;
  /** Alias for launchPhase */
  phase?: LaunchPhase | number | string;
  /** Normalized exhaust intensity from 0.0 to 1.0 */
  exhaustIntensity?: number;
  /** Alias for exhaustIntensity */
  intensity?: number;
  /** Optional Ref to the rocket element to dynamically track its nozzle position */
  rocketRef?: { current: HTMLElement | null } | null;
  /** Explicit origin point if rocketRef is not supplied (in pixels or percentages) */
  origin?: { x: number; y: number };
  /** Custom container class */
  className?: string;
  /** Custom z-index (defaults to 30) */
  zIndex?: number;
  /** Callback fired when Phase 4 achieves 100% full-screen coverage */
  onFullCoverage?: () => void;
}

interface Particle {
  type: 'spark' | 'flame_core' | 'flame_outer' | 'smoke_warm' | 'smoke_cool' | 'cosmic_dust';
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  maxSize: number;
  alpha: number;
  maxAlpha: number;
  age: number;
  maxAge: number;
  rotation: number;
  angularVelocity: number;
}

/**
 * Normalizes phase input to standard LaunchPhase type
 */
function normalizePhase(p: LaunchPhase | number | string | undefined): LaunchPhase {
  if (!p || p === 'idle' || p === 0 || p === '0') return 'idle';
  if (p === 'activation' || p === 1 || p === '1') return 'activation';
  if (p === 'ignition' || p === 2 || p === '2') return 'ignition';
  if (p === 'liftoff' || p === 3 || p === '3') return 'liftoff';
  if (p === 'transition' || p === 4 || p === '4' || p === 'completed' || p === 5) return 'transition';
  return 'idle';
}

/**
 * Multi-layered high-performance HTML5 Canvas particle system representing
 * the rocket's launch exhaust plume, supersonic flame blast, billowing smoke,
 * and the 100% full-screen smoke storm transition to State 2.
 */
export const LaunchExhaustParticles: React.FC<LaunchExhaustParticlesProps> = ({
  launchPhase: propLaunchPhase,
  phase: propPhase,
  exhaustIntensity: propExhaustIntensity,
  intensity: propIntensity,
  rocketRef,
  origin,
  className = '',
  zIndex = 30,
  onFullCoverage,
}) => {
  const currentPhase = normalizePhase(propLaunchPhase ?? propPhase);
  const currentIntensity = Math.max(0, Math.min(1, propExhaustIntensity ?? propIntensity ?? 0));

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const lastTimeRef = useRef<number>(performance.now());
  const phase4ProgressRef = useRef<number>(0);
  const fullCoverageReportedRef = useRef<boolean>(false);

  // Cached offscreen sprites for ultra-high performance rendering
  const spritesRef = useRef<{
    spark: HTMLCanvasElement;
    flameCore: HTMLCanvasElement;
    flameOuter: HTMLCanvasElement;
    smokeWarm: HTMLCanvasElement;
    smokeCool: HTMLCanvasElement;
    cosmicDust: HTMLCanvasElement;
  } | null>(null);

  // Initialize offscreen gradient sprites once
  useEffect(() => {
    const createOffscreenCanvas = (size: number, draw: (ctx: CanvasRenderingContext2D) => void) => {
      const c = document.createElement('canvas');
      c.width = size;
      c.height = size;
      const ctx = c.getContext('2d');
      if (ctx) draw(ctx);
      return c;
    };

    // 1. Spark sprite (32x32)
    const spark = createOffscreenCanvas(32, (ctx) => {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(254, 240, 138, 0.9)');
      grad.addColorStop(0.7, 'rgba(249, 115, 22, 0.4)');
      grad.addColorStop(1, 'rgba(249, 115, 22, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(16, 16, 16, 0, Math.PI * 2);
      ctx.fill();
    });

    // 2. Flame core sprite (64x64, hot white plasma to golden yellow)
    const flameCore = createOffscreenCanvas(64, (ctx) => {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.35, 'rgba(255, 245, 160, 0.95)');
      grad.addColorStop(0.7, 'rgba(251, 191, 36, 0.6)');
      grad.addColorStop(1, 'rgba(245, 158, 11, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(32, 32, 32, 0, Math.PI * 2);
      ctx.fill();
    });

    // 3. Flame outer plume sprite (96x96, roaring orange/crimson envelope)
    const flameOuter = createOffscreenCanvas(96, (ctx) => {
      const grad = ctx.createRadialGradient(48, 48, 0, 48, 48, 48);
      grad.addColorStop(0, 'rgba(255, 180, 50, 0.9)');
      grad.addColorStop(0.4, 'rgba(249, 115, 22, 0.7)');
      grad.addColorStop(0.75, 'rgba(225, 29, 72, 0.4)');
      grad.addColorStop(1, 'rgba(159, 18, 57, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(48, 48, 48, 0, Math.PI * 2);
      ctx.fill();
    });

    // 4. Smoke warm sprite (128x128, backlit amber billow)
    const smokeWarm = createOffscreenCanvas(128, (ctx) => {
      const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, 'rgba(110, 70, 50, 0.75)');
      grad.addColorStop(0.4, 'rgba(60, 40, 35, 0.55)');
      grad.addColorStop(0.75, 'rgba(35, 25, 28, 0.3)');
      grad.addColorStop(1, 'rgba(20, 15, 20, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(64, 64, 64, 0, Math.PI * 2);
      ctx.fill();
    });

    // 5. Smoke cool sprite (160x160, dense dark slate/nebula cloud)
    const smokeCool = createOffscreenCanvas(160, (ctx) => {
      const grad = ctx.createRadialGradient(80, 80, 0, 80, 80, 80);
      grad.addColorStop(0, 'rgba(15, 23, 42, 0.95)');
      grad.addColorStop(0.45, 'rgba(9, 14, 28, 0.85)');
      grad.addColorStop(0.75, 'rgba(5, 8, 18, 0.5)');
      grad.addColorStop(1, 'rgba(3, 5, 12, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(80, 80, 80, 0, Math.PI * 2);
      ctx.fill();
    });

    // 6. Cosmic dust sprite (128x128, deep space star dust cloud)
    const cosmicDust = createOffscreenCanvas(128, (ctx) => {
      const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, 'rgba(6, 182, 212, 0.6)');
      grad.addColorStop(0.3, 'rgba(14, 116, 144, 0.35)');
      grad.addColorStop(0.7, 'rgba(15, 23, 42, 0.2)');
      grad.addColorStop(1, 'rgba(2, 6, 23, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(64, 64, 64, 0, Math.PI * 2);
      ctx.fill();
    });

    spritesRef.current = {
      spark,
      flameCore,
      flameOuter,
      smokeWarm,
      smokeCool,
      cosmicDust,
    };
  }, []);

  // Compute current rocket nozzle emission point dynamically
  const getNozzleOrigin = useCallback((): { x: number; y: number } => {
    if (rocketRef?.current) {
      const rect = rocketRef.current.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        y: rect.bottom - rect.height * 0.08, // exact bottom nozzle base
      };
    }

    if (origin) {
      return origin;
    }

    // Default: bottom-center area where the rocket rests on desktop/mobile
    const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const h = typeof window !== 'undefined' ? window.innerHeight : 800;
    return {
      x: w / 2,
      y: h * 0.68,
    };
  }, [rocketRef, origin]);

  // Reset Phase 4 progress when returning to idle
  useEffect(() => {
    if (currentPhase === 'idle') {
      phase4ProgressRef.current = 0;
      fullCoverageReportedRef.current = false;
      particlesRef.current = [];
    }
  }, [currentPhase]);

  // Main Canvas Setup and Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Handle high DPI displays
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Particle Spawner Routine based on active phase
    const spawnParticles = (dt: number, nozzle: { x: number; y: number }) => {
      const particles = particlesRef.current;
      const maxParticles = 650;

      // =========================================================
      // PHASE 1 — ACTIVATION: Ignition sparks beneath nozzle
      // =========================================================
      if (currentPhase === 'activation') {
        const sparkRate = 4 + Math.floor(currentIntensity * 12);
        for (let i = 0; i < sparkRate; i++) {
          if (particles.length >= maxParticles) break;
          const angle = (Math.PI / 2) + (Math.random() - 0.5) * 1.2;
          const speed = 4 + Math.random() * 9;
          particles.push({
            type: 'spark',
            x: nozzle.x + (Math.random() - 0.5) * 20,
            y: nozzle.y + (Math.random() - 0.5) * 8,
            vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 3,
            vy: Math.sin(angle) * speed + 2,
            size: 2 + Math.random() * 3,
            maxSize: 4 + Math.random() * 2,
            alpha: 0.9,
            maxAlpha: 1.0,
            age: 0,
            maxAge: 0.3 + Math.random() * 0.4,
            rotation: Math.random() * Math.PI * 2,
            angularVelocity: (Math.random() - 0.5) * 0.2,
          });
        }
      }

      // =========================================================
      // PHASE 2 & 3 — IGNITION & LIFTOFF: Roaring fire column,
      // billowing smoke discs expanding downward and outward
      // =========================================================
      if (currentPhase === 'ignition' || currentPhase === 'liftoff') {
        const intensity = Math.max(0.4, currentIntensity);

        // 1. Supersonic flame core blast
        const flameCoreCount = 4 + Math.floor(intensity * 6);
        for (let i = 0; i < flameCoreCount; i++) {
          if (particles.length >= maxParticles) break;
          particles.push({
            type: 'flame_core',
            x: nozzle.x + (Math.random() - 0.5) * 18,
            y: nozzle.y + Math.random() * 12,
            vx: (Math.random() - 0.5) * 3,
            vy: 14 + Math.random() * 22 * intensity,
            size: 16 + Math.random() * 14,
            maxSize: 48 + Math.random() * 36,
            alpha: 0.95,
            maxAlpha: 1.0,
            age: 0,
            maxAge: 0.25 + Math.random() * 0.35,
            rotation: Math.random() * Math.PI * 2,
            angularVelocity: (Math.random() - 0.5) * 0.05,
          });
        }

        // 2. Outer flame envelope & turbulent fire billow
        const flameOuterCount = 5 + Math.floor(intensity * 8);
        for (let i = 0; i < flameOuterCount; i++) {
          if (particles.length >= maxParticles) break;
          const spread = (Math.random() - 0.5) * 45;
          particles.push({
            type: 'flame_outer',
            x: nozzle.x + spread * 0.5,
            y: nozzle.y + 15 + Math.random() * 30,
            vx: (Math.random() - 0.5) * 7,
            vy: 9 + Math.random() * 16 * intensity,
            size: 28 + Math.random() * 24,
            maxSize: 85 + Math.random() * 65,
            alpha: 0.85,
            maxAlpha: 0.9,
            age: 0,
            maxAge: 0.45 + Math.random() * 0.4,
            rotation: Math.random() * Math.PI * 2,
            angularVelocity: (Math.random() - 0.5) * 0.06,
          });
        }

        // 3. Billowing smoke discs (warm and cool ground roll)
        const smokeCount = 7 + Math.floor(intensity * 12);
        for (let i = 0; i < smokeCount; i++) {
          if (particles.length >= maxParticles) break;
          const isWarm = Math.random() < 0.35;
          const dir = Math.random() < 0.5 ? -1 : 1;
          const horizontalSpeed = (4 + Math.random() * 12) * dir;
          particles.push({
            type: isWarm ? 'smoke_warm' : 'smoke_cool',
            x: nozzle.x + (Math.random() - 0.5) * 50,
            y: nozzle.y + 60 + Math.random() * 70,
            vx: horizontalSpeed,
            vy: 2 + Math.random() * 6 - (currentPhase === 'liftoff' ? 2 : 0),
            size: 35 + Math.random() * 30,
            maxSize: 140 + Math.random() * 120,
            alpha: 0.8,
            maxAlpha: 0.85,
            age: 0,
            maxAge: 0.8 + Math.random() * 0.8,
            rotation: Math.random() * Math.PI * 2,
            angularVelocity: (Math.random() - 0.5) * 0.03,
          });
        }

        // 4. Flying sparks & fiery embers
        const emberCount = 3 + Math.floor(intensity * 5);
        for (let i = 0; i < emberCount; i++) {
          if (particles.length >= maxParticles) break;
          particles.push({
            type: 'spark',
            x: nozzle.x + (Math.random() - 0.5) * 40,
            y: nozzle.y + 40 + Math.random() * 40,
            vx: (Math.random() - 0.5) * 16,
            vy: 4 + Math.random() * 18,
            size: 2 + Math.random() * 3,
            maxSize: 4 + Math.random() * 3,
            alpha: 1.0,
            maxAlpha: 1.0,
            age: 0,
            maxAge: 0.4 + Math.random() * 0.5,
            rotation: Math.random() * Math.PI * 2,
            angularVelocity: (Math.random() - 0.5) * 0.1,
          });
        }
      }

      // =========================================================
      // PHASE 4 — FULL-SCREEN TRANSITION: Volumetric smoke storm
      // High-density smoke expanding outwards to 100% cover screen
      // =========================================================
      if (currentPhase === 'transition') {
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;

        // Generate intense volumetric smoke clusters across all directions
        const stormCount = 18;
        for (let i = 0; i < stormCount; i++) {
          if (particles.length >= maxParticles) break;
          // Spawn across the screen with bias from center outward
          const angle = Math.random() * Math.PI * 2;
          const dist = Math.random() * Math.max(screenW, screenH) * 0.6;
          const spawnX = nozzle.x + Math.cos(angle) * dist * 0.5;
          const spawnY = nozzle.y + Math.sin(angle) * dist * 0.5;

          const isCosmic = Math.random() < 0.25;
          particles.push({
            type: isCosmic ? 'cosmic_dust' : (Math.random() < 0.5 ? 'smoke_cool' : 'smoke_warm'),
            x: spawnX,
            y: spawnY,
            vx: Math.cos(angle) * (6 + Math.random() * 15),
            vy: Math.sin(angle) * (6 + Math.random() * 15),
            size: 60 + Math.random() * 60,
            maxSize: 220 + Math.random() * 180,
            alpha: 0.85,
            maxAlpha: 0.95,
            age: 0,
            maxAge: 0.9 + Math.random() * 0.8,
            rotation: Math.random() * Math.PI * 2,
            angularVelocity: (Math.random() - 0.5) * 0.02,
          });
        }
      }
    };

    // Render Supersonic Mach Shock Diamonds along the exhaust centerline
    const drawMachDiamonds = (nozzle: { x: number; y: number }, intensity: number) => {
      const diamondCount = 4;
      const spacing = 28 + intensity * 12;

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      for (let i = 1; i <= diamondCount; i++) {
        const dy = nozzle.y + i * spacing;
        const width = (16 - i * 2.5) * (0.8 + intensity * 0.4);
        const height = (24 - i * 3.5) * (0.8 + intensity * 0.4);

        const grad = ctx.createRadialGradient(nozzle.x, dy, 0, nozzle.x, dy, width);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        grad.addColorStop(0.35, 'rgba(125, 211, 252, 0.8)'); // cyan-300 shockwave
        grad.addColorStop(0.7, 'rgba(251, 146, 60, 0.4)');
        grad.addColorStop(1, 'rgba(249, 115, 22, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(nozzle.x, dy, width, height, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    // Animation loop
    const animate = (time: number) => {
      const dt = Math.min((time - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = time;

      const width = window.innerWidth;
      const height = window.innerHeight;
      const nozzle = getNozzleOrigin();

      // Clear main canvas frame
      ctx.clearRect(0, 0, width, height);

      const sprites = spritesRef.current;

      // Update Phase 4 obscuration progress
      if (currentPhase === 'transition') {
        phase4ProgressRef.current = Math.min(1.0, phase4ProgressRef.current + dt / 1.1);

        if (phase4ProgressRef.current >= 0.95 && !fullCoverageReportedRef.current) {
          fullCoverageReportedRef.current = true;
          onFullCoverage?.();
        }
      }

      // Spawn new particles if active
      if (currentPhase !== 'idle' || particlesRef.current.length > 0) {
        spawnParticles(dt, nozzle);
      }

      // Draw Mach Diamonds during Ignition & Liftoff
      if ((currentPhase === 'ignition' || currentPhase === 'liftoff') && currentIntensity > 0.3) {
        drawMachDiamonds(nozzle, currentIntensity);
      }

      // Update and draw active particles
      const particles = particlesRef.current;
      const nextParticles: Particle[] = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.age += dt;
        if (p.age >= p.maxAge) continue;

        const progress = p.age / p.maxAge;

        // Position & velocity update with aerodynamic drag
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.rotation += p.angularVelocity;

        // Dynamic size swelling
        const currentSize = p.size + (p.maxSize - p.size) * Math.sin(progress * Math.PI * 0.5);

        // Smooth alpha envelope (fade in quickly, hold, fade out)
        let alpha = p.maxAlpha;
        if (progress < 0.15) {
          alpha = p.maxAlpha * (progress / 0.15);
        } else if (progress > 0.6) {
          alpha = p.maxAlpha * (1 - (progress - 0.6) / 0.4);
        }

        if (alpha <= 0.01) continue;

        // Draw particle with corresponding pre-rendered offscreen sprite
        if (sprites) {
          let sprite: HTMLCanvasElement | null = null;
          let blendMode: GlobalCompositeOperation = 'source-over';

          switch (p.type) {
            case 'spark':
              sprite = sprites.spark;
              blendMode = 'lighter';
              break;
            case 'flame_core':
              sprite = sprites.flameCore;
              blendMode = 'lighter';
              break;
            case 'flame_outer':
              sprite = sprites.flameOuter;
              blendMode = 'lighter';
              break;
            case 'smoke_warm':
              sprite = sprites.smokeWarm;
              blendMode = 'source-over';
              break;
            case 'smoke_cool':
              sprite = sprites.smokeCool;
              blendMode = 'source-over';
              break;
            case 'cosmic_dust':
              sprite = sprites.cosmicDust;
              blendMode = 'screen';
              break;
          }

          if (sprite) {
            ctx.save();
            ctx.globalCompositeOperation = blendMode;
            ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            ctx.drawImage(
              sprite,
              -currentSize,
              -currentSize,
              currentSize * 2,
              currentSize * 2
            );
            ctx.restore();
          }
        }

        nextParticles.push(p);
      }

      particlesRef.current = nextParticles;

      // =========================================================
      // PHASE 4 FULL-SCREEN VOLUMETRIC GRADIENT TRANSITION
      // Covers 100% of the viewport ensuring no black gaps exist
      // =========================================================
      if (currentPhase === 'transition' && phase4ProgressRef.current > 0) {
        const progress = phase4ProgressRef.current;
        const maxRadius = Math.hypot(width, height) * 1.15;
        const currentRadius = maxRadius * Math.min(1.0, progress * 1.25);

        ctx.save();
        ctx.globalCompositeOperation = 'source-over';

        // High-density volumetric radial obscuration storm
        const grad = ctx.createRadialGradient(
          nozzle.x,
          nozzle.y,
          0,
          nozzle.x,
          nozzle.y,
          Math.max(10, currentRadius)
        );

        const fillAlpha = Math.min(1.0, progress * 1.3);
        grad.addColorStop(0, `rgba(3, 5, 12, ${fillAlpha})`);
        grad.addColorStop(0.4, `rgba(7, 11, 22, ${fillAlpha})`);
        grad.addColorStop(0.75, `rgba(15, 23, 42, ${fillAlpha})`);
        grad.addColorStop(1, `rgba(3, 5, 12, ${fillAlpha})`);

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // Golden/Amber & Cyan cosmic dust filament overlays
        if (progress > 0.4) {
          const accentAlpha = Math.min(0.45, (progress - 0.4) * 0.75);
          const accentGrad = ctx.createRadialGradient(
            width * 0.5,
            height * 0.5,
            0,
            width * 0.5,
            height * 0.5,
            width * 0.75
          );
          accentGrad.addColorStop(0, `rgba(6, 182, 212, ${accentAlpha * 0.5})`);
          accentGrad.addColorStop(0.5, `rgba(245, 158, 11, ${accentAlpha * 0.3})`);
          accentGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.globalCompositeOperation = 'screen';
          ctx.fillStyle = accentGrad;
          ctx.fillRect(0, 0, width, height);
        }

        ctx.restore();
      }

      // Continue animation loop if active or particles remain
      if (currentPhase !== 'idle' || particlesRef.current.length > 0) {
        animationFrameId.current = requestAnimationFrame(animate);
      } else {
        animationFrameId.current = null;
      }
    };

    // Start loop
    if (currentPhase !== 'idle' || particlesRef.current.length > 0) {
      if (animationFrameId.current === null) {
        lastTimeRef.current = performance.now();
        animationFrameId.current = requestAnimationFrame(animate);
      }
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    };
  }, [currentPhase, currentIntensity, getNozzleOrigin, onFullCoverage]);

  return (
    <div
      className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ zIndex }}
      aria-hidden="true"
    >
      {/* Dynamic Launchpad Ground Ambient Light Cast */}
      <div
        className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
        style={{
          opacity: currentPhase === 'idle' ? 0 : currentIntensity * 0.85,
          background:
            currentPhase === 'activation'
              ? 'radial-gradient(circle at 50% 75%, rgba(245, 158, 11, 0.18) 0%, transparent 60%)'
              : currentPhase === 'ignition' || currentPhase === 'liftoff'
              ? 'radial-gradient(circle at 50% 80%, rgba(249, 115, 22, 0.35) 0%, rgba(225, 29, 72, 0.15) 40%, transparent 70%)'
              : 'transparent',
        }}
      />

      {/* Main High-Performance Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Phase 4 Airtight Full-Screen Fog Layer (Ensures 100% gapless coverage) */}
      <div
        className="absolute inset-0 bg-[#03050C] pointer-events-none transition-opacity duration-1000 ease-in-out"
        style={{
          opacity: currentPhase === 'transition' ? 1 : 0,
        }}
      />
    </div>
  );
};
