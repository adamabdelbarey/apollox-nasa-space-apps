import React, { useEffect, useState } from 'react';
import { RocketIcon, CheckIcon, Loader2Icon } from '../icons/Icons';

export interface LoadingScreenProps {
  progress: number;
  currentAsset: string;
  isComplete: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  progress,
  currentAsset,
  isComplete,
}) => {
  const [shouldRender, setShouldRender] = useState(true);

  // Fade out smoothly after completion
  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 750);
      return () => clearTimeout(timer);
    }
  }, [isComplete]);

  if (!shouldRender) return null;

  const boundedProgress = Math.min(Math.max(Math.round(progress), 0), 100);

  const checklistItems = [
    { label: 'Lunar & Martian Elevation Maps', threshold: 15 },
    { label: 'Ingenuity Mars Helicopter 3D Model', threshold: 35 },
    { label: 'InSight Cruise Lander Systems', threshold: 55 },
    { label: 'MER Rover 6-Wheel Mobility Chassis', threshold: 75 },
    { label: 'Dawn Asteroid Explorer Array', threshold: 90 },
    { label: 'Audio Narration & Planetary Coordinates', threshold: 98 },
  ];

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-[#070D1E] text-slate-100 font-sans select-none transition-opacity duration-700 ${
        isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="Loading Apollo X Mission Assets"
      role="status"
    >
      {/* Background Subtle Starfield / Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Center Mission Card */}
      <div className="relative z-10 w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-slate-950/90 border-2 border-cyan-500/70 shadow-[0_0_60px_rgba(6,182,212,0.25)] backdrop-blur-2xl flex flex-col items-center text-center space-y-6">
        {/* Brand Icon with Pulsating Orbital Ring */}
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-cyan-600/90 border-2 border-cyan-400 flex items-center justify-center text-white shadow-[0_0_30px_rgba(6,182,212,0.5)]">
            <RocketIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-pulse" />
          </div>
          <div className="absolute -inset-2.5 rounded-3xl border border-cyan-500/30 animate-ping pointer-events-none" />
        </div>

        {/* Header Titles */}
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700 text-[10px] sm:text-xs font-black uppercase tracking-widest text-cyan-300 mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>NASA Space Apps Telemetry</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black font-cinematic-title tracking-tight uppercase text-white leading-tight">
            APOLLO X // EXPEDITION
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-300 pt-1">
            Mounting High-Resolution 3D Models & Planetary Data
          </p>
        </div>

        {/* Progress Bar & Percentage */}
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-300">
            <span className="text-cyan-300 flex items-center space-x-1.5">
              <Loader2Icon className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
              <span>{isComplete ? 'Assets Loaded' : 'Downloading Assets...'}</span>
            </span>
            <span className="text-lg sm:text-xl font-black font-cinematic-num text-white">
              {boundedProgress}%
            </span>
          </div>

          <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-cyan-900/60 p-0.5 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full transition-all duration-300 ease-out shadow-[0_0_15px_rgba(6,182,212,0.8)]"
              style={{ width: `${boundedProgress}%` }}
            />
          </div>

          <div className="text-[11px] font-mono text-slate-400 truncate pt-1">
            {isComplete ? (
              <span className="text-cyan-300 font-bold">ALL SYSTEMS NOMINAL • LAUNCH READY</span>
            ) : (
              <span>Mounting: {currentAsset || 'Spacecraft 3D Geometry'}</span>
            )}
          </div>
        </div>

        {/* Telemetry Checklist */}
        <div className="w-full bg-slate-900/70 p-3.5 sm:p-4 rounded-2xl border border-slate-800 text-left space-y-2">
          <div className="text-[10px] font-mono font-black uppercase tracking-widest text-slate-400 border-b border-slate-800 pb-1.5">
            Mission Readiness Telemetry:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {checklistItems.map((item, idx) => {
              const isReady = boundedProgress >= item.threshold;
              return (
                <div
                  key={idx}
                  className={`flex items-center space-x-2 transition-all ${
                    isReady ? 'text-cyan-300 font-bold' : 'text-slate-500'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 border ${
                      isReady
                        ? 'bg-cyan-950 border-cyan-500 text-cyan-400'
                        : 'bg-slate-950 border-slate-800 text-slate-700'
                    }`}
                  >
                    {isReady && <CheckIcon className="w-2.5 h-2.5" />}
                  </div>
                  <span className="truncate text-[11px]">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
