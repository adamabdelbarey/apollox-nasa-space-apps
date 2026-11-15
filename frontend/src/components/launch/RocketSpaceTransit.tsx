import React, { useState, useEffect, useRef } from 'react';
import { soundEffects } from '../../audio/soundEffects';
import {
  RocketIcon,
  SparklesIcon,
  CompassIcon,
  GlobeIcon,
  ChevronRightIcon,
  ActivityIcon,
} from '../icons/Icons';

export interface RocketSpaceTransitProps {
  onCompleteTransit: () => void;
  onSkip?: () => void;
}

export const RocketSpaceTransit: React.FC<RocketSpaceTransitProps> = ({
  onCompleteTransit,
  onSkip,
}) => {
  const [transitProgress, setTransitProgress] = useState(0); // 0 to 100%
  const [distanceKm, setDistanceKm] = useState(54600000); // 54.6M km down to orbit
  const [countdown, setCountdown] = useState(7);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sound effect on entry
  useEffect(() => {
    soundEffects.playSuccess();
  }, []);

  // Countdown & auto-advance timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onCompleteTransit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onCompleteTransit]);

  // Telemetry & distance countdown animation
  useEffect(() => {
    let frameId: number;
    const start = performance.now();
    const duration = 7000; // 7 seconds

    const updateTelemetry = (now: number) => {
      const elapsed = Math.min((now - start) / duration, 1);
      setTransitProgress(Math.floor(elapsed * 100));
      // Distance from 54.6M km to 400 km orbit approach
      const dist = Math.max(Math.floor(54600000 * (1 - Math.pow(elapsed, 0.8))), 420);
      setDistanceKm(dist);

      if (elapsed < 1) {
        frameId = requestAnimationFrame(updateTelemetry);
      }
    };

    frameId = requestAnimationFrame(updateTelemetry);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // HTML5 Canvas Starfield and Cosmic Travel Speed Streaks
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Cosmic speed streaks
    interface Streak {
      x: number;
      y: number;
      speed: number;
      length: number;
      opacity: number;
      size: number;
    }

    const streaks: Streak[] = Array.from({ length: 90 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 8 + Math.random() * 16,
      length: 25 + Math.random() * 80,
      opacity: 0.2 + Math.random() * 0.7,
      size: 1 + Math.random() * 1.8,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw travel speed lines (moving from top-right to bottom-left as rocket flies toward top-right Mars)
      for (const s of streaks) {
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.length, s.y + s.length * 0.35);
        ctx.strokeStyle = `rgba(56, 189, 248, ${s.opacity})`;
        ctx.lineWidth = s.size;
        ctx.stroke();

        s.x -= s.speed;
        s.y += s.speed * 0.35;

        if (s.x < -100 || s.y > height + 100) {
          s.x = width + Math.random() * 200;
          s.y = Math.random() * height - 100;
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleProceed = () => {
    soundEffects.playClick();
    onCompleteTransit();
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#050814] flex flex-col justify-between selection:bg-cyan-500 selection:text-slate-900 font-sans select-none pointer-events-auto">
      {/* Background Star Speed Streaks Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Atmospheric Nebula Glows */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-950/40 via-transparent to-[#050814] opacity-80" />

      {/* CELESTIAL BODIES IN SPACE */}
      {/* 1. Receding Earth (Bottom Left) */}
      <div className="absolute -bottom-16 -left-16 sm:-bottom-24 sm:-left-24 z-10 pointer-events-none flex flex-col items-center opacity-85 animate-pulse">
        <div className="relative w-48 h-48 sm:w-72 sm:h-72 rounded-full bg-[radial-gradient(circle_at_35%_35%,_#38bdf8,_#0284c7,_#0c4a6e,_#020617)] shadow-[0_0_80px_rgba(56,189,248,0.4)] border border-cyan-400/30">
          {/* Earth Atmosphere Halo */}
          <div className="absolute inset-0 rounded-full border-2 border-cyan-300/40 blur-sm" />
          <div className="absolute inset-x-0 bottom-6 text-center text-[10px] sm:text-xs font-mono font-black text-cyan-200 uppercase tracking-widest">
            Earth Receding Behind
          </div>
        </div>
      </div>

      {/* 2. Target Planet Mars (Approaching Ahead in Upper Right) */}
      <div className="absolute top-12 right-6 sm:top-20 sm:right-24 z-10 pointer-events-none flex flex-col items-center">
        <div
          className="relative w-36 h-36 sm:w-56 sm:h-56 rounded-full bg-[radial-gradient(circle_at_35%_35%,_#cbd5e1,_#64748b,_#334155,_#0f172a)] shadow-[0_0_90px_rgba(100,116,139,0.35)] border border-slate-400/30 transition-transform duration-1000"
          style={{
            transform: `scale(${1 + (transitProgress / 100) * 0.45})`,
          }}
        >
          {/* Planetary details */}
          <div className="absolute inset-0 rounded-full border border-cyan-400/20" />
          <div className="absolute top-4 left-6 px-2 py-0.5 rounded-full bg-slate-950/70 border border-slate-600 text-[10px] font-mono text-cyan-300 font-bold">
            Target Destination: Mars
          </div>
        </div>
      </div>

      {/* TOP HEADER: FLIGHT COMPUTER HUD & SKIP BUTTON */}
      <header className="relative z-20 w-full pt-6 sm:pt-8 px-6 sm:px-12 flex items-center justify-between pointer-events-auto">
        <div className="flex flex-col space-y-1">
          <div className="inline-flex items-center space-x-2 text-cyan-300 text-xs sm:text-sm font-black font-cinematic-sub tracking-[0.25em] uppercase">
            <RocketIcon className="w-4 h-4 text-cyan-400" />
            <span>SCENE 2 // INTERPLANETARY TRANSIT</span>
            <SparklesIcon className="w-4 h-4 text-cyan-400" />
          </div>
          <h2 className="text-xl sm:text-3xl font-black font-cinematic-title text-white tracking-tight uppercase">
            TRAVELLING TO MARS
          </h2>
        </div>

        {/* Skip to Worlds */}
        <button
          onClick={() => {
            soundEffects.playClick();
            if (onSkip) onSkip();
            else onCompleteTransit();
          }}
          className="btn-bouncy px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-white text-xs font-bold transition-all cursor-pointer shadow-lg"
          title="Skip transit animation directly to planet explorer"
        >
          Skip Transit
        </button>
      </header>

      {/* CENTER: THE APOLLO X ROCKET CRUISING THROUGH SPACE */}
      <main className="relative z-20 flex-1 flex items-center justify-center pointer-events-none">
        <div className="relative flex items-center justify-center -rotate-12 translate-x-[-8%] sm:translate-x-[-12%]">
          {/* Cyan Plasma Ion Thruster Plume firing backwards */}
          <div className="absolute -left-28 sm:-left-36 top-1/2 -translate-y-1/2 flex items-center">
            {/* Plasma Core Glow */}
            <div className="w-32 sm:w-44 h-7 sm:h-9 bg-gradient-to-l from-cyan-400 via-sky-500 to-transparent rounded-l-full blur-sm opacity-90 animate-pulse" />
            <div className="w-20 sm:w-28 h-3 sm:h-4 bg-white rounded-l-full blur-[1px] absolute right-0" />
            {/* Ion Sparkle Particles */}
            <div className="w-2 h-2 rounded-full bg-cyan-200 absolute -left-6 animate-ping" />
            <div className="w-1.5 h-1.5 rounded-full bg-white absolute -left-12 top-0 animate-ping" />
          </div>

          {/* Sleek Cruiser Rocket SVG */}
          <div className="relative w-44 sm:w-64 h-24 sm:h-32 drop-shadow-[0_0_40px_rgba(6,182,212,0.6)]">
            <svg
              viewBox="0 0 240 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              {/* Main Fuselage */}
              <path
                d="M40 35 L170 30 Q220 50 235 50 Q220 50 170 70 L40 65 Q30 50 40 35 Z"
                fill="url(#fuselageGrad)"
                stroke="#38bdf8"
                strokeWidth="2.5"
              />
              {/* Upper Wing */}
              <path
                d="M60 34 L30 10 L80 33 Z"
                fill="#0f172a"
                stroke="#38bdf8"
                strokeWidth="2"
              />
              {/* Lower Wing */}
              <path
                d="M60 66 L30 90 L80 67 Z"
                fill="#0f172a"
                stroke="#38bdf8"
                strokeWidth="2"
              />
              {/* Cockpit Canopy */}
              <ellipse
                cx="165"
                cy="50"
                rx="22"
                ry="9"
                fill="#06b6d4"
                opacity="0.85"
                stroke="#e0f2fe"
                strokeWidth="1.5"
              />
              {/* Heat Shield Nose */}
              <path
                d="M210 42 Q235 50 210 58 Z"
                fill="#0284c7"
              />
              {/* NASA / Apollo Insignia Decal */}
              <text
                x="110"
                y="54"
                fill="#e0f2fe"
                fontSize="11"
                fontWeight="900"
                fontFamily="monospace"
                letterSpacing="2"
              >
                APOLLO X
              </text>
              <defs>
                <linearGradient id="fuselageGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#0f172a" />
                  <stop offset="50%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#f8fafc" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </main>

      {/* BOTTOM FOOTER: FLIGHT TELEMETRY HUD & ACTION TRIGGER */}
      <footer className="relative z-20 w-full max-w-4xl mx-auto pb-6 sm:pb-8 px-4 flex flex-col items-center space-y-3.5 pointer-events-auto">
        {/* Real-time Telemetry Dashboard Card */}
        <div className="w-full bg-slate-950/85 backdrop-blur-xl border border-cyan-800/80 rounded-2xl p-3 sm:p-4 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
          {/* Metric 1: Velocity */}
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-950 border border-cyan-500 flex items-center justify-center text-cyan-300">
              <ActivityIcon className="w-4 h-4 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Interplanetary Speed</div>
              <div className="text-sm font-black text-cyan-300">39,600 km/h (Mach 32)</div>
            </div>
          </div>

          {/* Metric 2: Distance to Mars */}
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-200">
              <CompassIcon className="w-4 h-4 text-cyan-300" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Distance Remaining</div>
              <div className="text-sm font-black text-white">
                {distanceKm > 10000 ? `${(distanceKm / 1000000).toFixed(1)} Million km` : `${distanceKm} km`}
              </div>
            </div>
          </div>

          {/* Metric 3: Orbit Arrival Progress */}
          <div className="flex items-center space-x-2.5 w-full sm:w-48">
            <div className="flex-1">
              <div className="flex justify-between text-[10px] text-slate-300 pb-1 font-bold">
                <span>Orbit Approach</span>
                <span className="text-cyan-400">{transitProgress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden border border-cyan-900/60">
                <div
                  className="h-full bg-gradient-to-r from-sky-500 to-cyan-400 transition-all duration-300 rounded-full shadow-[0_0_10px_rgba(56,189,248,0.8)]"
                  style={{ width: `${transitProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Enter Mars & Moon System Button */}
        <button
          onClick={handleProceed}
          className="btn-bouncy px-8 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-black text-sm tracking-wide flex items-center space-x-2.5 shadow-[0_0_30px_rgba(6,182,212,0.4)] cursor-pointer transition-all"
        >
          <GlobeIcon className="w-4 h-4 text-slate-950" />
          <span>ENTER MARS & MOON SYSTEM</span>
          <ChevronRightIcon className="w-4 h-4 text-slate-950" />
          <span className="text-[11px] font-mono font-bold bg-slate-950/20 px-2 py-0.5 rounded-full">
            {countdown}s
          </span>
        </button>
      </footer>
    </div>
  );
};
