import React, { useState } from 'react';
import { CelestialBody } from '../../types';
import { DualPlanetCanvas } from './DualPlanetCanvas';
import { soundEffects } from '../../audio/soundEffects';
import {
  RocketIcon,
  BotIcon,
  Volume2Icon,
  VolumeXIcon,
  ChevronLeftIcon,
  SparklesIcon,
  CompassIcon,
  ActivityIcon,
  ShieldIcon,
} from '../icons/Icons';

export interface WorldSelectScreenProps {
  onSelectWorld: (world: CelestialBody) => void;
  onBackToLaunch: () => void;
  onOpenChat: () => void;
}

export const WorldSelectScreen: React.FC<WorldSelectScreenProps> = ({
  onSelectWorld,
  onBackToLaunch,
  onOpenChat,
}) => {
  const [hoveredWorld, setHoveredWorld] = useState<'moon' | 'mars' | null>(null);
  const [isMuted, setIsMuted] = useState(soundEffects.getMuted());

  const handleToggleAudio = () => {
    const muted = soundEffects.toggleMute();
    setIsMuted(muted);
    soundEffects.playClick();
  };

  const handlePlanetHover = (world: 'moon' | 'mars' | null) => {
    if (world && world !== hoveredWorld) {
      soundEffects.playClick();
    }
    setHoveredWorld(world);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[#0B1124] text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-slate-900 font-sans select-none">
      {/* Background Interactive 3D WebGL Canvas */}
      <DualPlanetCanvas
        hoveredWorld={hoveredWorld}
        onSelectWorld={onSelectWorld}
        onHoverWorld={handlePlanetHover}
      />

      {/* Atmospheric Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0B1124]/90 via-transparent to-[#0B1124]/95 z-[1]" />

      {/* TOP NAVIGATION BAR */}
      <header className="relative z-10 w-full px-4 sm:px-8 py-5 flex items-center justify-between max-w-7xl mx-auto pointer-events-auto">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              soundEffects.playClick();
              onBackToLaunch();
            }}
            className="btn-bouncy btn-secondary px-4 py-2 rounded-2xl text-xs font-bold flex items-center space-x-2 transition-all  cursor-pointer"
          >
            <ChevronLeftIcon className="w-4 h-4 text-cyan-400" />
            <span>Launch Pad</span>
          </button>
        </div>

        <div className="flex items-center space-x-2.5 sm:space-x-4">
          <button
            onClick={handleToggleAudio}
            className="btn-bouncy btn-secondary p-2.5 rounded-2xl text-xs text-slate-200 transition-all  cursor-pointer"
            title={isMuted ? 'Turn Sound On' : 'Turn Sound Off'}
          >
            {isMuted ? (
              <VolumeXIcon className="w-4 h-4 text-slate-400" />
            ) : (
              <Volume2Icon className="w-4 h-4 text-cyan-300 animate-pulse" />
            )}
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              onOpenChat();
            }}
            className="btn-bouncy btn-primary flex items-center space-x-2 px-4 py-2 rounded-2xl text-xs font-black  cursor-pointer"
          >
            <BotIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Ask Space Buddy</span>
            <span className="sm:hidden">Buddy</span>
          </button>
        </div>
      </header>

      {/* CENTER PROMPT */}
      <div className="relative z-10 w-full text-center px-4 pointer-events-none">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border-2 border-cyan-400/50 text-cyan-200 text-xs sm:text-sm font-bold tracking-wide mb-2  backdrop-">
          <SparklesIcon className="w-3.5 h-3.5 text-cyan-300" />
          <span>MISSION CONTROL • CHOOSE YOUR DESTINATION</span>
          <SparklesIcon className="w-3.5 h-3.5 text-cyan-300" />
        </div>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-display tracking-tight drop-">
          Where Are We Heading, Cadet?
        </h2>
      </div>

      {/* BOTTOM TWO DESTINATION CARDS */}
      <div className="relative z-10 w-full px-4 sm:px-8 pb-8 max-w-6xl mx-auto pointer-events-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          {/* LEFT PANEL: THE MOON */}
          <div
            onMouseEnter={() => handlePlanetHover('moon')}
            onMouseLeave={() => handlePlanetHover(null)}
            className={`card-storybook rounded-[2rem] p-6 sm:p-7 border-3 transition-all duration-300 backdrop- ${
              hoveredWorld === 'moon'
                ? 'bg-[#102042]/95 border-cyan-400  -translate-y-2'
                : 'bg-[#0E1B38]/80 border-slate-700/70 hover:border-cyan-400/60'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-400/40">
                Destination 01
              </span>
              <CompassIcon className="w-5 h-5 text-cyan-300" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
              The Moon
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              Our cratered companion in space! Explore where courageous astronauts walked on lunar dust and deployed seismometer instruments.
            </p>

            <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold">
              <span className="px-3 py-1 rounded-xl bg-cyan-950/60 text-cyan-200 border border-cyan-800">
                Astronaut Footprints
              </span>
              <span className="px-3 py-1 rounded-xl bg-sky-950/60 text-sky-200 border border-sky-800">
                ALSEP Detectives
              </span>
              <span className="px-3 py-1 rounded-xl bg-emerald-950/60 text-emerald-200 border border-emerald-800">
                Apollo 15 Moon Rover
              </span>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => onSelectWorld('moon')}
                className="btn-bouncy btn-primary w-full py-4 px-6 rounded-2xl font-black text-sm sm:text-base tracking-wide flex items-center justify-center space-x-2 cursor-pointer"
              >
                <RocketIcon className="w-4 h-4 text-white" />
                <span>Fly to the Moon!</span>
              </button>
            </div>
          </div>

          {/* RIGHT PANEL: MARS */}
          <div
            onMouseEnter={() => handlePlanetHover('mars')}
            onMouseLeave={() => handlePlanetHover(null)}
            className={`card-storybook rounded-[2rem] p-6 sm:p-7 border-3 transition-all duration-300 backdrop- ${
              hoveredWorld === 'mars'
                ? 'bg-[#181236]/95 border-indigo-400  -translate-y-2'
                : 'bg-[#140F2E]/80 border-slate-700/70 hover:border-indigo-400/60'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/40">
                Destination 02
              </span>
              <CompassIcon className="w-5 h-5 text-indigo-300" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
              The Martian Horizon
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              A fascinating world of gigantic volcanoes, deep gorges, and clever little robot rovers discovering ancient water evidence!
            </p>

            <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold">
              <span className="px-3 py-1 rounded-xl bg-indigo-950/60 text-indigo-200 border border-indigo-800">
                Little Rover Sojourner
              </span>
              <span className="px-3 py-1 rounded-xl bg-purple-950/60 text-purple-200 border border-purple-800">
                15 Airbag Bounces
              </span>
              <span className="px-3 py-1 rounded-xl bg-cyan-950/60 text-cyan-200 border border-cyan-800">
                Olympus Mons
              </span>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => onSelectWorld('mars')}
                className="btn-bouncy btn-indigo w-full py-4 px-6 rounded-2xl font-black text-sm sm:text-base tracking-wide flex items-center justify-center space-x-2 cursor-pointer"
              >
                <RocketIcon className="w-4 h-4 text-white" />
                <span>Fly to Mars!</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
