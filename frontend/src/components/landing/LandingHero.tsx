import React, { useState } from 'react';
import { Mission, CelestialBody } from '../../types';
import { soundEffects } from '../../audio/soundEffects';
import {
  RocketIcon,
  BotIcon,
  Volume2Icon,
  VolumeXIcon,
  SparklesIcon,
  ChevronRightIcon,
  CompassIcon,
} from '../icons/Icons';

export interface LandingHeroProps {
  missions: Mission[];
  onSelectMission: (mission: Mission) => void;
  onExploreGlobe: (body: CelestialBody) => void;
  onOpenChat: () => void;
  onLaunchRocket?: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  missions,
  onSelectMission,
  onExploreGlobe,
  onOpenChat,
  onLaunchRocket,
}) => {
  const [isMuted, setIsMuted] = useState(soundEffects.getMuted());

  const handleToggleAudio = () => {
    const muted = soundEffects.toggleMute();
    setIsMuted(muted);
    soundEffects.playClick();
  };

  return (
    <section className="relative w-full min-h-[92vh] overflow-hidden bg-[#0B1124] flex flex-col justify-between selection:bg-cyan-500 selection:text-slate-900 font-sans">
      {/* Background Deep Space Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[15%] left-[10%] w-1.5 h-1.5 bg-cyan-300 rounded-full animate-star-twinkle" />
        <div className="absolute top-[35%] right-[15%] w-2 h-2 bg-sky-200 rounded-full animate-star-twinkle [animation-delay:1s]" />
        <div className="absolute bottom-[20%] left-[25%] w-1.5 h-1.5 bg-white rounded-full animate-star-twinkle [animation-delay:2s]" />
      </div>

      {/* Top Navigation Bar */}
      <header className="relative z-20 w-full px-6 py-5 flex items-center justify-between max-w-7xl mx-auto">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-2xl bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center text-cyan-300  transform -rotate-3">
            <RocketIcon className="w-6 h-6 text-cyan-300" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-wider text-white uppercase flex items-center space-x-1.5 font-display">
              <span>APOLLO X</span>
              <span className="text-cyan-300 text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40">
                ADVENTURE
              </span>
            </h1>
            <div className="text-[11px] font-bold text-slate-300">
              Space Exploration for Curious Explorers
            </div>
          </div>
        </div>

        {/* Right Navigation Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={handleToggleAudio}
            className="btn-bouncy btn-secondary p-2.5 rounded-2xl text-xs text-slate-200 transition-all cursor-pointer"
            title={isMuted ? 'Turn Sound On' : 'Turn Sound Off'}
          >
            {isMuted ? (
              <VolumeXIcon className="w-4 h-4 text-slate-400" />
            ) : (
              <Volume2Icon className="w-4 h-4 text-cyan-300 animate-pulse" />
            )}
          </button>
        </div>
      </header>

      {/* Main Title Centerpiece */}
      <main className="relative z-20 max-w-5xl mx-auto px-6 py-12 text-center flex flex-col items-center justify-center my-auto">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border-2 border-cyan-400/50 text-cyan-200 text-xs font-bold mb-4  animate-fadeIn">
          <SparklesIcon className="w-3.5 h-3.5 text-cyan-300" />
          <span>Space Explorer Mission Archive</span>
          <SparklesIcon className="w-3.5 h-3.5 text-cyan-300" />
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6 font-display drop-">
          The Moon & Mars <br />
          <span className="text-cyan-300">
            Adventure Stories
          </span>
        </h2>

        <p className="max-w-2xl text-slate-200 text-base sm:text-lg leading-relaxed mb-8 font-medium">
          Discover incredible spacecraft, astronaut moonwalks, clever ALSEP science detectives, and brave robot rovers exploring rocky worlds!
        </p>

        {/* CTA Launch Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <button
            onClick={() => {
              soundEffects.playMarkerSelect();
              onExploreGlobe('moon');
            }}
            className="btn-bouncy btn-primary px-6 py-3.5 rounded-2xl font-black text-sm flex items-center space-x-2 cursor-pointer"
          >
            <CompassIcon className="w-4 h-4 text-cyan-200" />
            <span>Explore The Moon (Apollo Missions)</span>
            <ChevronRightIcon className="w-4 h-4 ml-1" />
          </button>

          <button
            onClick={() => {
              soundEffects.playMarkerSelect();
              onExploreGlobe('mars');
            }}
            className="btn-bouncy btn-indigo px-6 py-3.5 rounded-2xl font-black text-sm flex items-center space-x-2 cursor-pointer"
          >
            <CompassIcon className="w-4 h-4 text-indigo-200" />
            <span>Explore Mars (Robot Rovers)</span>
            <ChevronRightIcon className="w-4 h-4 ml-1" />
          </button>
        </div>

        {/* Featured Mission Hardware Quick Jump Cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 max-w-5xl">
          {missions.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                soundEffects.playMarkerSelect();
                onSelectMission(m);
              }}
              className="btn-bouncy p-4 rounded-2xl bg-[#131D38]/80 hover:bg-[#182344] border-2 border-slate-700/80 hover:border-cyan-400/50 text-left transition-all duration-300 transform hover:-translate-y-1  group cursor-pointer"
            >
              <div className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-cyan-300 text-xs font-mono font-bold mb-2 inline-block">
                {m.badgeEmoji}
              </div>
              <div className="font-black text-sm text-white group-hover:text-cyan-300 transition-colors">
                {m.name}
              </div>
              <div className="text-xs text-slate-300 font-medium">
                {m.spacecraftName}
              </div>
            </button>
          ))}
        </div>
      </main>
    </section>
  );
};
