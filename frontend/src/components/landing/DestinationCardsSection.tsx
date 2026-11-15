import React, { useState } from 'react';
import { CelestialBody } from '../../types';
import { soundEffects } from '../../audio/soundEffects';
import {
  RocketIcon,
  SparklesIcon,
  CompassIcon,
  BotIcon,
  ActivityIcon,
  ShieldIcon,
  BookOpenIcon,
} from '../icons/Icons';

export interface DestinationCardsSectionProps {
  onSelectWorld: (world: CelestialBody) => void;
}

export const DestinationCardsSection: React.FC<DestinationCardsSectionProps> = ({
  onSelectWorld,
}) => {
  const [hoveredCard, setHoveredCard] = useState<CelestialBody | null>(null);

  const handleSelect = (world: CelestialBody) => {
    soundEffects.playMarkerSelect();
    onSelectWorld(world);
  };

  return (
    <section
      id="destinations"
      className="relative w-full py-24 px-4 sm:px-8 lg:px-12 text-slate-100 overflow-hidden pointer-events-none"
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header (Completely Transparent, Zero Borders, Zero Background) */}
        <div className="text-center max-w-3xl mx-auto mb-16 pointer-events-auto">
          <div className="inline-flex items-center space-x-2 text-cyan-300 text-xs sm:text-sm font-bold tracking-widest uppercase mb-3">
            <SparklesIcon className="w-4 h-4 text-cyan-400" />
            <span>PICK YOUR SPACE DESTINATION</span>
            <SparklesIcon className="w-4 h-4 text-cyan-400" />
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white font-cinematic-title tracking-tight uppercase leading-[0.95]">
            Where Should We Fly Today?
          </h2>

          <p className="mt-4 text-base sm:text-xl text-slate-200 font-bold max-w-2xl mx-auto leading-relaxed">
            Choose a celestial world below to inspect historical landing sites, explore interactive 3D globes, and follow exciting spacecraft missions!
          </p>
        </div>

        {/* The Two Destinations Side by Side (Completely Transparent, Zero Borders, Zero Background) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start pointer-events-auto">
          {/* ================================================================= */}
          {/* 1. THE MOON DESTINATION (Transparent Container)                   */}
          {/* ================================================================= */}
          <div
            onMouseEnter={() => {
              setHoveredCard('moon');
              soundEffects.playClick();
            }}
            onMouseLeave={() => setHoveredCard(null)}
            className="flex flex-col justify-between space-y-6"
          >
            <div>
              {/* Destination Tag */}
              <div className="text-xs font-bold text-cyan-300 uppercase tracking-widest mb-1 flex items-center space-x-2">
                <CompassIcon className="w-4 h-4 text-cyan-400" />
                <span>Destination 01 • Closest World to Earth</span>
              </div>

              <h3 className="text-3xl sm:text-5xl font-black text-white font-cinematic-title tracking-tight uppercase">
                The Cratered Moon
              </h3>

              <p className="mt-3 text-slate-200 text-base sm:text-lg leading-relaxed font-bold">
                Our companion in the night sky! Explore where courageous astronauts took their first giant leaps, drove the lunar rover, and placed scientific instruments that listened to deep moonquakes!
              </p>

              {/* Transparent Feature Badges */}
              <div className="mt-5 flex flex-wrap gap-2.5">
                <span className="text-xs font-bold text-cyan-200 flex items-center space-x-1.5 py-1 pr-3">
                  <ActivityIcon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Astronaut Footprints</span>
                </span>
                <span className="text-xs font-bold text-sky-200 flex items-center space-x-1.5 py-1 pr-3">
                  <RocketIcon className="w-3.5 h-3.5 text-sky-400" />
                  <span>Intrepid Lunar Lander</span>
                </span>
                <span className="text-xs font-bold text-emerald-200 flex items-center space-x-1.5 py-1 pr-3">
                  <ShieldIcon className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ALSEP Science Detectives</span>
                </span>
                <span className="text-xs font-bold text-indigo-200 flex items-center space-x-1.5 py-1 pr-3">
                  <BookOpenIcon className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Apollo 15 Lunar Rover</span>
                </span>
              </div>

              {/* Landing Sites List (Transparent) */}
              <div className="mt-6 space-y-2 text-sm text-slate-200">
                <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                  <CompassIcon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Key Exploration Sites on the Moon:</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-300">Sea of Tranquility</span>
                  <span className="text-cyan-300 font-bold">Apollo 11 (First Moonwalk)</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-300">Ocean of Storms</span>
                  <span className="text-sky-300 font-bold">Apollo 12 (Science Lab)</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-300">Hadley Rille</span>
                  <span className="text-emerald-300 font-bold">Apollo 15 (Lunar Buggy)</span>
                </div>
              </div>

              {/* Fun Fact (Transparent) */}
              <div className="mt-4 text-xs text-cyan-200 flex items-start space-x-2">
                <SparklesIcon className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Moon Discovery Fact:</strong> Because there is no wind or rain on the Moon, astronaut footprints remain undisturbed for millions of years!
                </span>
              </div>
            </div>

            {/* Solid Flat Button */}
            <div className="pt-4">
              <button
                type="button"
                onClick={() => handleSelect('moon')}
                className="btn-bouncy btn-primary w-full sm:w-auto py-3.5 px-8 rounded-xl font-bold text-base tracking-wide flex items-center justify-center space-x-2.5 cursor-pointer"
              >
                <RocketIcon className="w-5 h-5 text-white" />
                <span>Explore the 3D Moon</span>
                <CompassIcon className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* ================================================================= */}
          {/* 2. THE MARS DESTINATION (Transparent Container)                   */}
          {/* ================================================================= */}
          <div
            onMouseEnter={() => {
              setHoveredCard('mars');
              soundEffects.playClick();
            }}
            onMouseLeave={() => setHoveredCard(null)}
            className="flex flex-col justify-between space-y-6"
          >
            <div>
              {/* Destination Tag */}
              <div className="text-xs font-bold text-indigo-300 uppercase tracking-widest mb-1 flex items-center space-x-2">
                <BotIcon className="w-4 h-4 text-indigo-400" />
                <span>Destination 02 • Home of Robot Rovers</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-black text-white font-display">
                The Martian Horizon
              </h3>

              <p className="mt-3 text-slate-200 text-base leading-relaxed font-medium">
                A fascinating frontier of towering volcanoes, ancient lake basins, and autonomous robot explorers analyzing rock minerals in search of past water and biological clues!
              </p>

              {/* Transparent Feature Badges */}
              <div className="mt-5 flex flex-wrap gap-2.5">
                <span className="text-xs font-bold text-indigo-200 flex items-center space-x-1.5 py-1 pr-3">
                  <BotIcon className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Microrover Sojourner</span>
                </span>
                <span className="text-xs font-bold text-purple-200 flex items-center space-x-1.5 py-1 pr-3">
                  <ActivityIcon className="w-3.5 h-3.5 text-purple-400" />
                  <span>15 Giant Airbag Bounces</span>
                </span>
                <span className="text-xs font-bold text-cyan-200 flex items-center space-x-1.5 py-1 pr-3">
                  <ShieldIcon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Olympus Mons Volcano</span>
                </span>
                <span className="text-xs font-bold text-sky-200 flex items-center space-x-1.5 py-1 pr-3">
                  <SparklesIcon className="w-3.5 h-3.5 text-sky-400" />
                  <span>Atmospheric Dust Devils</span>
                </span>
              </div>

              {/* Landing Sites List (Transparent) */}
              <div className="mt-6 space-y-2 text-sm text-slate-200">
                <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                  <CompassIcon className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Key Exploration Sites on Mars:</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-300">Ares Vallis Floodplain</span>
                  <span className="text-indigo-300 font-bold">Pathfinder & Sojourner</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-300">Gale Crater</span>
                  <span className="text-purple-300 font-bold">Curiosity Rover</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-300">Jezero Crater Delta</span>
                  <span className="text-cyan-300 font-bold">Perseverance & Ingenuity</span>
                </div>
              </div>

              {/* Fun Fact (Transparent) */}
              <div className="mt-4 text-xs text-indigo-200 flex items-start space-x-2">
                <SparklesIcon className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Mars Discovery Fact:</strong> Mars is home to Olympus Mons, an immense shield volcano three times higher than Mount Everest, and its day is 24 hours and 37 minutes!
                </span>
              </div>
            </div>

            {/* Solid Flat Button */}
            <div className="pt-4">
              <button
                type="button"
                onClick={() => handleSelect('mars')}
                className="btn-bouncy btn-indigo w-full sm:w-auto py-3.5 px-8 rounded-xl font-bold text-base tracking-wide flex items-center justify-center space-x-2.5 cursor-pointer"
              >
                <RocketIcon className="w-5 h-5 text-white" />
                <span>Explore the 3D Mars</span>
                <CompassIcon className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
