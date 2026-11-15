import React, { useState } from 'react';
import { CelestialBody } from '../../types';
import { soundEffects } from '../../audio/soundEffects';
import {
  RocketIcon,
  Volume2Icon,
  VolumeXIcon,
} from '../icons/Icons';
import { ThemeToggle } from '../theme/ThemeToggle';

export interface LandingHero3DProps {
  focusedPlanet?: 'moon' | 'mars' | null;
  onCloseFocus?: () => void;
  onSelectPlanet?: (planet: 'moon' | 'mars') => void;
  onSelectWorld?: (world: CelestialBody) => void;
  onOpenChat?: () => void;
  onLaunchRocket?: () => void;
}

export const LandingHero3D: React.FC<LandingHero3DProps> = ({
  focusedPlanet = null,
  onCloseFocus,
  onSelectPlanet,
}) => {
  const [isMuted, setIsMuted] = useState(soundEffects.getMuted());

  const handleToggleAudio = () => {
    const muted = soundEffects.toggleMute();
    setIsMuted(muted);
    soundEffects.playClick();
  };

  return (
    <section className="relative w-full h-[88vh] sm:h-[92vh] min-h-[560px] flex flex-col justify-between selection:bg-cyan-500 selection:text-slate-900 font-sans select-none pointer-events-none">
      {/* ===================================================================== */}
      {/* 1. TOP NAVIGATION BAR                                                 */}
      {/* ===================================================================== */}
      <header className="relative z-10 w-full px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between max-w-7xl mx-auto pointer-events-auto">
        {/* Brand Logo - Solid, clean, no shadow, no glow */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-600 flex items-center justify-center text-white">
            <RocketIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-black tracking-wider text-white uppercase flex items-center space-x-2 font-display">
              <span>APOLLO X</span>
              <span className="text-cyan-300 text-[10px] px-1.5 py-0.5 font-bold tracking-widest">
                EXPLORER
              </span>
            </h1>
            <div className="text-[11px] font-semibold text-slate-300">
              Space Adventures for Curious Explorers
            </div>
          </div>
        </div>

        {/* Right Navigation Controls */}
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          {focusedPlanet && onCloseFocus && (
            <button
              onClick={() => {
                soundEffects.playClick();
                onCloseFocus();
              }}
              className="btn-bouncy btn-secondary px-3.5 py-1.5 rounded-xl text-xs font-bold text-cyan-300 hover:text-white cursor-pointer"
            >
              Back to Both Planets
            </button>
          )}

          {/* Theme Toggle Button (Dark / Light Mode) */}
          <ThemeToggle />

          <button
            onClick={handleToggleAudio}
            className="btn-bouncy btn-secondary p-2.5 rounded-2xl text-xs text-slate-200 transition-colors cursor-pointer"
            title={isMuted ? 'Turn Sound On' : 'Turn Sound Off'}
          >
            {isMuted ? (
              <VolumeXIcon className="w-4 h-4 text-slate-400" />
            ) : (
              <Volume2Icon className="w-4 h-4 text-cyan-300" />
            )}
          </button>
        </div>
      </header>

      {/* ===================================================================== */}
      {/* 2. DYNAMIC CONTENT: FIRST SCREEN CHOICE PROMPT OR MAGNIFIED PLANET   */}
      {/* ===================================================================== */}

      {/* FIRST SCREEN WELCOME & CHOICE PROMPT (EASY FOR KIDS TO CHOOSE) */}
      {!focusedPlanet && (
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center pointer-events-none mt-2 sm:mt-6 transition-all duration-500 animate-fadeIn flex flex-col items-center space-y-4 sm:space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border-2 border-cyan-700/80 text-xs sm:text-sm font-black text-cyan-300 uppercase tracking-widest pointer-events-auto shadow-lg">
            <span>PICK YOUR SPACE MISSION</span>
          </div>

          {/* Main Title */}
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white font-cinematic-title tracking-tight uppercase leading-[0.95]">
            CHOOSE YOUR WORLD
          </h2>

          {/* Simple explanation for kids */}
          <p className="text-lg sm:text-2xl font-bold text-slate-200 max-w-xl mx-auto leading-snug">
            Tap the <span className="text-cyan-300 font-black">Moon</span> or <span className="text-indigo-300 font-black">Mars</span> to explore real astronaut footprints and robot rovers!
          </p>

          {/* Interactive Choice Buttons for Kids */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 pointer-events-auto w-full max-w-lg">
            {/* Moon Choice Card / Button */}
            <button
              onClick={() => {
                soundEffects.playClick();
                onSelectPlanet?.('moon');
              }}
              className="btn-bouncy w-full sm:w-1/2 py-3 px-5 rounded-2xl bg-[#070D1E]/90 hover:bg-cyan-950/90 border-2 border-cyan-500/70 hover:border-cyan-400 text-left transition-all duration-300 cursor-pointer flex flex-col space-y-1 shadow-xl group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-cyan-300 uppercase tracking-widest">
                  DESTINATION 1
                </span>
                <span className="text-xs font-black text-cyan-400 group-hover:translate-x-1 transition-transform">
                  &rarr;
                </span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white font-cinematic-title uppercase leading-none">
                THE MOON
              </div>
              <div className="text-xs font-semibold text-slate-300">
                Astronauts & craters
              </div>
            </button>

            {/* Mars Choice Card / Button */}
            <button
              onClick={() => {
                soundEffects.playClick();
                onSelectPlanet?.('mars');
              }}
              className="btn-bouncy w-full sm:w-1/2 py-3 px-5 rounded-2xl bg-[#070D1E]/90 hover:bg-indigo-950/90 border-2 border-indigo-500/70 hover:border-indigo-400 text-left transition-all duration-300 cursor-pointer flex flex-col space-y-1 shadow-xl group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">
                  DESTINATION 2
                </span>
                <span className="text-xs font-black text-indigo-400 group-hover:translate-x-1 transition-transform">
                  &rarr;
                </span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white font-cinematic-title uppercase leading-none">
                MARS
              </div>
              <div className="text-xs font-semibold text-slate-300">
                Rovers & red rocks
              </div>
            </button>
          </div>

          {/* Quick tactile hint */}
          <div className="text-xs sm:text-sm font-bold text-slate-400 pt-1">
            Tip: You can also tap and drag either 3D planet directly!
          </div>
        </div>
      )}

      {/* MAGNIFIED MOON PANEL (PANEL ON LEFT, MAGNIFIED MOON ON RIGHT) */}
      {focusedPlanet === 'moon' && (
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 py-2 flex flex-col md:flex-row items-center justify-between gap-8 pointer-events-none transition-all duration-500 animate-fadeIn">
          {/* Left content panel for THE MOON */}
          <div className="w-full md:w-1/2 max-w-lg pointer-events-auto bg-[#070D1E]/90 backdrop-blur-md p-6 sm:p-7 rounded-3xl border-2 border-cyan-500/50 shadow-2xl flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-cyan-300 uppercase tracking-widest px-3.5 py-1 bg-cyan-950/90 rounded-full border border-cyan-800">
                Earth's Moon • 384,400 KM Away
              </span>
              {onCloseFocus && (
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    onCloseFocus();
                  }}
                  className="btn-bouncy btn-secondary px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-200 hover:text-white cursor-pointer"
                >
                  Back to Both Planets
                </button>
              )}
            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-white font-cinematic-title tracking-tight uppercase leading-none">
              THE MOON
            </h2>

            <p className="text-sm sm:text-base text-cyan-200 font-bold leading-relaxed">
              Our closest celestial companion! A silent, cratered world where astronauts hopped like kangaroos and left bootprints that stay forever.
            </p>

            <div className="space-y-2.5 text-xs sm:text-sm text-slate-200">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start space-x-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 mt-1 shrink-0" />
                <div>
                  <span className="font-black text-white">Hop 6 Times Higher: </span>
                  Lunar gravity is only 1/6th of Earth. A 60-pound explorer weighs only 10 pounds here!
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start space-x-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 mt-1 shrink-0" />
                <div>
                  <span className="font-black text-white">Forever Bootprints: </span>
                  Without wind, weather, or rain, Apollo 11 bootprints from 1969 are completely unchanged today.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start space-x-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 mt-1 shrink-0" />
                <div>
                  <span className="font-black text-white">Dead Silence: </span>
                  With zero air, sound cannot travel. Astronauts had to talk over helmet radios!
                </div>
              </div>
            </div>

            <div className="text-xs font-bold text-cyan-300 pt-1">
              Tip: Click and drag the magnified Moon to spin it all the way around!
            </div>
          </div>

          {/* Right spacer so the magnified Moon on the right has clear stage */}
          <div className="hidden md:block w-1/2 pointer-events-none" />
        </div>
      )}

      {/* MAGNIFIED MARS PANEL (PANEL ON LEFT, MAGNIFIED MARS ON RIGHT) */}
      {focusedPlanet === 'mars' && (
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 py-2 flex flex-col md:flex-row items-center justify-between gap-8 pointer-events-none transition-all duration-500 animate-fadeIn">
          {/* Left content panel for MARS */}
          <div className="w-full md:w-1/2 max-w-lg pointer-events-auto bg-[#070D1E]/90 backdrop-blur-md p-6 sm:p-7 rounded-3xl border-2 border-indigo-500/50 shadow-2xl flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-indigo-300 uppercase tracking-widest px-3.5 py-1 bg-indigo-950/90 rounded-full border border-indigo-800">
                The Red Planet • 225M KM Away
              </span>
              {onCloseFocus && (
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    onCloseFocus();
                  }}
                  className="btn-bouncy btn-secondary px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-200 hover:text-white cursor-pointer"
                >
                  Back to Both Planets
                </button>
              )}
            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-white font-cinematic-title tracking-tight uppercase leading-none">
              MARS
            </h2>

            <p className="text-sm sm:text-base text-indigo-200 font-bold leading-relaxed">
              The legendary rusty world! A dusty desert planet home to monster volcanoes, massive canyons, and a brave fleet of NASA robot explorers.
            </p>

            <div className="space-y-2.5 text-xs sm:text-sm text-slate-200">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start space-x-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 mt-1 shrink-0" />
                <div>
                  <span className="font-black text-white">Covered in Real Rust: </span>
                  Mars is red because its rocks and dust are coated in iron oxide—the exact same rust on old bicycles!
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start space-x-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 mt-1 shrink-0" />
                <div>
                  <span className="font-black text-white">Solar System's Biggest Volcano: </span>
                  Olympus Mons is 3 times taller than Mount Everest! Its base would cover all of Arizona.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start space-x-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 mt-1 shrink-0" />
                <div>
                  <span className="font-black text-white">Robot Kingdom: </span>
                  Explored by wheeled rovers like Spirit & Opportunity, plus the twin-blade Ingenuity helicopter!
                </div>
              </div>
            </div>

            <div className="text-xs font-bold text-indigo-300 pt-1">
              Tip: Click and drag magnified Mars to spin it and explore its giant canyons!
            </div>
          </div>

          {/* Right spacer so magnified Mars on the right has clear stage */}
          <div className="hidden md:block w-1/2 pointer-events-none" />
        </div>
      )}

      {/* Empty bottom spacer to let the 3D background planets breathe */}
      <div className="w-full h-12 pointer-events-none" />
    </section>
  );
};
