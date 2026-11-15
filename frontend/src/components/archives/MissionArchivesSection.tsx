import React, { useState, useMemo } from 'react';
import { Mission, CelestialBody } from '../../types';
import { soundEffects } from '../../audio/soundEffects';
import { MissionStoryCard } from './MissionStoryCard';
import {
  RocketIcon,
  CompassIcon,
  SparklesIcon,
  SearchIcon,
  BookOpenIcon,
  ActivityIcon,
  ShieldIcon,
} from '../icons/Icons';

export interface MissionArchivesSectionProps {
  missions: Mission[];
  onSelectMission?: (mission: Mission) => void;
  onExploreGlobe: (body: CelestialBody, mission: Mission) => void;
  filterPlanet?: 'moon' | 'mars' | null;
}

export const MissionArchivesSection: React.FC<MissionArchivesSectionProps> = ({
  missions,
  onExploreGlobe,
  filterPlanet = null,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Categorize missions into chapters
  const lunarMissions = useMemo(() => missions.filter((m) => m.archiveChapter === 'lunar'), [missions]);
  const martianMissions = useMemo(() => missions.filter((m) => m.archiveChapter === 'martian'), [missions]);
  const beyondMissions = useMemo(() => missions.filter((m) => m.archiveChapter === 'beyond'), [missions]);

  // Search filter
  const filterMissions = (list: Mission[]) => {
    if (!searchQuery.trim()) return list;
    const query = searchQuery.toLowerCase();
    return list.filter(
      (m) =>
        m.name.toLowerCase().includes(query) ||
        m.spacecraftName.toLowerCase().includes(query) ||
        m.summary.toLowerCase().includes(query) ||
        m.juniorHook.toLowerCase().includes(query) ||
        m.coordinates.siteName.toLowerCase().includes(query)
    );
  };

  const filteredLunar = useMemo(() => filterMissions(lunarMissions), [lunarMissions, searchQuery]);
  const filteredMartian = useMemo(() => filterMissions(martianMissions), [martianMissions, searchQuery]);
  const filteredBeyond = useMemo(() => filterMissions(beyondMissions), [beyondMissions, searchQuery]);

  const scrollToAnchor = (id: string) => {
    soundEffects.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Determine what to show based on filterPlanet
  const showLunar = filterPlanet === null || filterPlanet === 'moon';
  const showMartian = filterPlanet === null || filterPlanet === 'mars';
  const showBeyond = filterPlanet === null;

  return (
    <section id="mission-archives" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col space-y-24 bg-transparent">
      {/* =================================================================== */}
      {/* 1. SECTION MAIN BANNER & SEARCH (NO BACKGROUND!)                    */}
      {/* =================================================================== */}
      <div className="space-y-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800 text-xs font-black text-cyan-300 uppercase tracking-wider">
          <BookOpenIcon className="w-4 h-4 text-cyan-400" />
          <span>
            {filterPlanet === 'moon'
              ? 'LUNAR ARCHIVES • APOLLO EXPLORATION'
              : filterPlanet === 'mars'
              ? 'MARTIAN ARCHIVES • ROBOT EXPLORATION'
              : 'SPACE STORYBOOK • ALL ADVENTURES IN ONE PLACE'}
          </span>
        </div>

        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-cinematic-title text-white tracking-tight uppercase leading-[0.95]">
          {filterPlanet === 'moon'
            ? 'THE MOON STORIES'
            : filterPlanet === 'mars'
            ? 'THE MARS STORIES'
            : 'THE MISSION STORIES'}
        </h2>

        <p className="text-xl sm:text-2xl text-slate-200 font-black leading-snug max-w-2xl mx-auto">
          {filterPlanet === 'moon'
            ? 'Scroll down to follow real Apollo astronauts as they walk, hop, and drive across the Moon!'
            : filterPlanet === 'mars'
            ? 'Scroll down to follow NASA robot rovers and the Ingenuity helicopter as they conquer Mars!'
            : 'Scroll down to watch real NASA space robots and planets move around big comic adventures!'}
        </p>

        {/* Chapter Jump Bar & Search Input */}
        <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-4 p-3 rounded-3xl bg-transparent">
          {/* Quick Anchor Links */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            {showLunar && (
              <button
                onClick={() => scrollToAnchor('chapter-lunar')}
                className="btn-bouncy px-4 py-2.5 rounded-2xl bg-slate-900/90 border-2 border-cyan-800 text-cyan-300 font-black hover:bg-cyan-950 transition-all cursor-pointer"
              >
                Moon Walks ({filteredLunar.length})
              </button>
            )}
            {showMartian && (
              <>
                <button
                  onClick={() => scrollToAnchor('chapter-martian')}
                  className="btn-bouncy px-4 py-2.5 rounded-2xl bg-slate-900/90 border-2 border-indigo-800 text-indigo-300 font-black hover:bg-indigo-950 transition-all cursor-pointer"
                >
                  Mars Robots ({filteredMartian.length})
                </button>
                <button
                  onClick={() => scrollToAnchor('mission-ingenuity')}
                  className="btn-bouncy btn-primary px-4 py-2.5 rounded-2xl text-white font-black cursor-pointer flex items-center space-x-1.5"
                >
                  <SparklesIcon className="w-3.5 h-3.5 text-white" />
                  <span>Fly Ingenuity</span>
                </button>
              </>
            )}
            {showBeyond && (
              <button
                onClick={() => scrollToAnchor('chapter-beyond')}
                className="btn-bouncy px-4 py-2.5 rounded-2xl bg-slate-900/90 border-2 border-emerald-800 text-emerald-300 font-black hover:bg-emerald-950 transition-all cursor-pointer"
              >
                Deep Space ({filteredBeyond.length})
              </button>
            )}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <SearchIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search a robot or adventure..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-900/90 border-2 border-slate-700 text-xs font-black text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* 2. CHAPTER 01: LUNAR ARCHIVES                                      */}
      {/* =================================================================== */}
      {showLunar && (
        <div id="chapter-lunar" className="space-y-12 scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-950 text-cyan-300 border-2 border-cyan-800 text-xs font-black uppercase tracking-wider">
              <CompassIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>Chapter 01 • The Moon Adventures</span>
            </div>
            <h3 className="text-4xl sm:text-6xl font-black font-cinematic-title text-white uppercase tracking-tight leading-[0.95]">
              THE FOOTPRINTS WE LEFT BEHIND
            </h3>
            <p className="text-lg sm:text-2xl text-slate-200 font-black leading-snug">
              Meet the brave Apollo astronauts who hopped across craters, drove electric Moon cars, and dropped in on robot neighbors!
            </p>
          </div>

          <div className="space-y-24">
            {filteredLunar.map((mission, idx) => (
              <MissionStoryCard
                key={mission.id}
                mission={mission}
                index={idx}
                onExploreGlobe={onExploreGlobe}
              />
            ))}
            {filteredLunar.length === 0 && (
              <div className="p-8 text-center text-slate-400 text-sm font-bold">
                No Moon missions found with that name.
              </div>
            )}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 3. CHAPTER 02: MARTIAN ARCHIVES                                    */}
      {/* =================================================================== */}
      {showMartian && (
        <div id="chapter-martian" className="space-y-12 scroll-mt-24 pt-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-950 text-indigo-300 border-2 border-indigo-800 text-xs font-black uppercase tracking-wider">
              <ActivityIcon className="w-3.5 h-3.5 text-indigo-400" />
              <span>Chapter 02 • The Mars Robots</span>
            </div>
            <h3 className="text-4xl sm:text-6xl font-black font-cinematic-title text-white uppercase tracking-tight leading-[0.95]">
              THE MACHINES THAT CONQUERED MARS
            </h3>
            <p className="text-lg sm:text-2xl text-slate-200 font-black leading-snug">
              Tough robot rovers, bouncing beach ball landers, and tiny helicopters that conquered the red planet!
            </p>
          </div>

          <div className="space-y-24">
            {filteredMartian.map((mission, idx) => (
              <MissionStoryCard
                key={mission.id}
                mission={mission}
                index={idx}
                onExploreGlobe={onExploreGlobe}
              />
            ))}
            {filteredMartian.length === 0 && (
              <div className="p-8 text-center text-slate-400 text-sm font-bold">
                No Mars missions found with that name.
              </div>
            )}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 4. CHAPTER 03: BEYOND THE WORLDS                                   */}
      {/* =================================================================== */}
      {showBeyond && (
        <div id="chapter-beyond" className="space-y-12 scroll-mt-24 pt-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-950 text-emerald-300 border-2 border-emerald-800 text-xs font-black uppercase tracking-wider">
              <ShieldIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span>Chapter 03 • Deep Space & Asteroids</span>
            </div>
            <h3 className="text-4xl sm:text-6xl font-black font-cinematic-title text-white uppercase tracking-tight leading-[0.95]">
              ADVENTURES IN THE ASTEROID BELT
            </h3>
            <p className="text-lg sm:text-2xl text-slate-200 font-black leading-snug">
              Blue glowing ion engines and giant space potatoes circling deep in the solar system!
            </p>
          </div>

          <div className="space-y-24">
            {filteredBeyond.map((mission, idx) => (
              <MissionStoryCard
                key={mission.id}
                mission={mission}
                index={idx}
                onExploreGlobe={onExploreGlobe}
              />
            ))}
            {filteredBeyond.length === 0 && (
              <div className="p-8 text-center text-slate-400 text-sm font-bold">
                No deep space missions found with that name.
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
