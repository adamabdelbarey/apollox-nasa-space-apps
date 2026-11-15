import React from 'react';
import { RocketShip } from './RocketShip';
import { LaunchPhase } from './useLaunchAnimation';
import { soundEffects } from '../../audio/soundEffects';
import { RocketIcon, SparklesIcon, CompassIcon } from '../icons/Icons';

export interface LaunchScreenProps {
  rocketRef?: React.RefObject<HTMLDivElement | null>;
  onStartLaunch?: (onCompleteOverride?: () => void) => void;
  isLaunching?: boolean;
  launchPhase?: LaunchPhase;
  className?: string;
  onLaunchComplete?: () => void;
}

export const LaunchScreen: React.FC<LaunchScreenProps> = ({
  rocketRef,
  onStartLaunch,
  isLaunching = false,
  launchPhase = 'idle',
  className = '',
  onLaunchComplete,
}) => {
  const handleLaunchTrigger = () => {
    if (isLaunching) return;
    soundEffects.playRocketIgnition();
    if (onStartLaunch) {
      onStartLaunch();
    } else if (onLaunchComplete) {
      onLaunchComplete();
    }
  };

  return (
    <div
      className={`relative w-full h-screen overflow-hidden bg-[#070B18] flex flex-col justify-between items-center selection:bg-cyan-500 selection:text-slate-900 select-none font-sans ${className}`}
    >
      {/* Background Starfield & Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Soft Radial Ambient Nebula */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#101E3D] via-[#090E20] to-[#050814] opacity-90" />

        {/* CSS Sparkle Stars */}
        <div className="absolute inset-0">
          <div className="absolute top-[12%] left-[18%] w-1.5 h-1.5 rounded-full bg-cyan-200 animate-star-twinkle" />
          <div className="absolute top-[22%] left-[78%] w-2 h-2 rounded-full bg-sky-200 animate-star-twinkle [animation-delay:0.8s]" />
          <div className="absolute top-[35%] left-[32%] w-1 h-1 rounded-full bg-white animate-star-twinkle [animation-delay:1.4s]" />
          <div className="absolute top-[48%] left-[85%] w-1.5 h-1.5 rounded-full bg-cyan-300 animate-star-twinkle [animation-delay:0.3s]" />
          <div className="absolute top-[65%] left-[12%] w-2 h-2 rounded-full bg-white animate-star-twinkle [animation-delay:1.9s]" />
          <div className="absolute top-[75%] left-[68%] w-1.5 h-1.5 rounded-full bg-cyan-200 animate-star-twinkle [animation-delay:0.6s]" />
        </div>

        {/* Faint Orbital Depth Rings */}
        <svg className="absolute inset-0 w-full h-full opacity-25 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50%" cy="50%" rx="38vw" ry="18vh" fill="none" stroke="url(#ringGrad)" strokeWidth="1" strokeDasharray="6 8" />
          <defs>
            <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#818CF8" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>

        {/* Cinematic Border Vignette */}
        <div className="cinematic-vignette-overlay" aria-hidden="true" />
      </div>

      {/* Top Right Quick Skip to Explorer */}
      {onLaunchComplete && (
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
          <button
            type="button"
            onClick={() => {
              soundEffects.playClick();
              onLaunchComplete();
            }}
            className="btn-bouncy btn-secondary px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white cursor-pointer"
            title="Skip directly to Apollo X"
          >
            Skip to Explorer
          </button>
        </div>
      )}

      {/* TOP HEADER: PLAYFUL WELCOME FOR SPACE CADETS */}
      <header className="relative z-10 w-full pt-6 sm:pt-8 md:pt-10 px-6 flex flex-col items-center text-center transition-all duration-700">
        <div className="inline-flex items-center space-x-2 text-cyan-300 text-xs sm:text-sm font-black font-cinematic-sub tracking-[0.25em] uppercase mb-2">
          <RocketIcon className="w-4 h-4 text-cyan-300" />
          <span>APOLLO X // MISSION INITIATION</span>
          <SparklesIcon className="w-4 h-4 text-cyan-300" />
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white font-cinematic-title uppercase leading-[0.95]">
          READY FOR BLASTOFF?
        </h1>
      </header>

      {/* CENTER / HERO: ROCKET DOMINATING 65-70% OF THE VIEWPORT */}
      <main className="relative z-10 flex-1 flex flex-col justify-end items-center w-full px-4 pb-2">
        <RocketShip
          rocketRef={rocketRef}
          onClick={handleLaunchTrigger}
          isLaunching={isLaunching}
          launchPhase={launchPhase}
          className="transition-all duration-700"
        />
      </main>

      {/* BOTTOM FOOTER: FRIENDLY INVITATION & BOUNCY TACTILE BUTTON */}
      <footer className="relative z-10 w-full pb-6 sm:pb-8 px-6 flex flex-col items-center text-center">
        <p className="text-base sm:text-lg md:text-xl font-bold text-slate-200 tracking-normal max-w-lg mb-3">
          Hop in the rocket and press <span className="font-black text-cyan-300 underline decoration-wavy decoration-cyan-400">START</span> to explore the Moon and Mars!
        </p>

        <button
          type="button"
          onClick={handleLaunchTrigger}
          className={`btn-bouncy px-6 py-2.5 rounded-2xl font-black text-sm tracking-wide flex items-center space-x-2.5 cursor-pointer select-none transition-all ${
            isLaunching
              ? 'btn-indigo animate-pulse'
              : 'btn-primary'
          }`}
        >
          {isLaunching ? (
            <>
              <SparklesIcon className="w-4 h-4 text-cyan-200 animate-spin" />
              <span>
                {launchPhase === 'ignition'
                  ? 'ENGINES ROARING! BLASTOFF!'
                  : launchPhase === 'liftoff'
                  ? 'SOARING INTO SPACE!'
                  : 'GETTING READY TO FLY...'}
              </span>
            </>
          ) : (
            <>
              <RocketIcon className="w-4 h-4 text-white" />
              <span>TAP THE ROCKET TO BLAST OFF!</span>
              <CompassIcon className="w-4 h-4 text-cyan-200" />
            </>
          )}
        </button>
      </footer>
    </div>
  );
};
