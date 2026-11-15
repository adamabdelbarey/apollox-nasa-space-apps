import React, { useState, useEffect, useRef } from 'react';
import { Mission, CelestialBody } from '../../types';
import { FUNNY_MISSION_LORE, FunnyMissionLore } from '../../data/missions/funnyLore';
import { soundEffects } from '../../audio/soundEffects';
import {
  SparklesIcon,
  CompassIcon,
  PlayIcon,
  PauseIcon,
  StopIcon,
  ShieldIcon,
  CheckIcon,
} from '../icons/Icons';

export interface MissionStoryCardProps {
  mission: Mission;
  index?: number;
  onExploreGlobe: (body: CelestialBody, mission: Mission) => void;
}

export const MissionStoryCard: React.FC<MissionStoryCardProps> = ({
  mission,
  index = 0,
  onExploreGlobe,
}) => {
  const [isPlayingTTS, setIsPlayingTTS] = useState(false);
  const [isPausedTTS, setIsPausedTTS] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeInsightVariant, setActiveInsightVariant] = useState<string>('/models/insight_arm.glb');
  const sectionRef = useRef<HTMLElement>(null);

  const lore: FunnyMissionLore | undefined = FUNNY_MISSION_LORE[mission.id];
  const isMoon = mission.celestialBody === 'moon';
  const isMars = mission.celestialBody === 'mars';

  // Split narrative into short, punchy statements for children
  const rawStory = lore?.funnyHook || mission.juniorHook || mission.summary;
  const storySentences = rawStory.split(/(?<=[.!?])\s+/).filter(Boolean);
  const punchyLine1 = storySentences[0] || rawStory;
  const punchyLine2 = storySentences.slice(1, 3).join(' ') || lore?.funnySubtitle || '';
  const topFact1 = lore?.didYouKnowFunny?.[0] || '';

  // Trigger line-by-line scroll reveal
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Handle InSight Deployment State switching in the main background canvas!
  const handleSelectInsightVariant = (url: string) => {
    soundEffects.playClick();
    setActiveInsightVariant(url);
    window.dispatchEvent(new CustomEvent('set-insight-variant', { detail: { url } }));
  };

  // Browser Text-To-Speech
  const handleToggleTTS = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isPlayingTTS) {
      if (isPausedTTS) {
        window.speechSynthesis.resume();
        setIsPausedTTS(false);
      } else {
        window.speechSynthesis.pause();
        setIsPausedTTS(true);
      }
      return;
    }

    window.speechSynthesis.cancel();
    const spokenText = lore
      ? `${lore.funnyTitle}. ${punchyLine1} ${punchyLine2}. Did you know: ${topFact1}.`
      : `${mission.name}. ${mission.summary}`;

    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.rate = 1.0;
    utterance.pitch = 1.05;

    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(
      (v) => (v.name.includes('Natural') || v.name.includes('Google') || v.lang.startsWith('en'))
    );
    if (naturalVoice) utterance.voice = naturalVoice;

    utterance.onstart = () => {
      setIsPlayingTTS(true);
      setIsPausedTTS(false);
    };

    utterance.onend = () => {
      setIsPlayingTTS(false);
      setIsPausedTTS(false);
    };

    utterance.onerror = () => {
      setIsPlayingTTS(false);
      setIsPausedTTS(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleStopTTS = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingTTS(false);
    setIsPausedTTS(false);
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <article
      ref={sectionRef}
      id={`mission-${mission.id}`}
      className="relative w-full min-h-[70vh] sm:min-h-[80vh] py-16 sm:py-24 flex items-center bg-transparent border-0 shadow-none overflow-hidden select-none"
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* ================================================================= */}
        {/* TEXT COLUMN: GIANT BOLD LINES REVEALED SEQUENTIALLY ON SCROLL     */}
        {/* ================================================================= */}
        <div className="flex flex-col space-y-6 lg:col-span-7 text-left pointer-events-auto">
          {/* Line 0: Badge & Category */}
          <div
            className={`flex flex-wrap items-center gap-2.5 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span
              className={`px-3.5 py-1.5 rounded-full text-xs font-black tracking-wider uppercase ${
                isMoon
                  ? 'bg-cyan-950/90 text-cyan-300 border-2 border-cyan-700'
                  : isMars
                  ? 'bg-indigo-950/90 text-indigo-300 border-2 border-indigo-700'
                  : 'bg-emerald-950/90 text-emerald-300 border-2 border-emerald-700'
              }`}
            >
              {isMoon ? 'Moon Mission' : isMars ? 'Mars Explorer' : 'Deep Space'}
            </span>

            {/* Coordinates Pill */}
            {mission.coordinates && (
              <span
                className={`px-3.5 py-1.5 rounded-full text-xs font-black tracking-wider flex items-center space-x-1.5 ${
                  isMoon
                    ? 'bg-cyan-950/90 text-cyan-300 border-2 border-cyan-600'
                    : isMars
                    ? 'bg-indigo-950/90 text-indigo-300 border-2 border-indigo-600'
                    : 'bg-slate-900/90 text-slate-300 border-2 border-slate-700'
                }`}
              >
                <CompassIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span>
                  Coordinates: {mission.coordinates.lat >= 0 ? `${mission.coordinates.lat}° N` : `${Math.abs(mission.coordinates.lat)}° S`}, {mission.coordinates.lng >= 0 ? `${mission.coordinates.lng}° E` : `${Math.abs(mission.coordinates.lng)}° W`}
                </span>
              </span>
            )}

            {mission.coordinates?.siteName && (
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-200 bg-slate-900/90 border-2 border-slate-700">
                Site: {mission.coordinates.siteName}
              </span>
            )}

            {lore?.comicBadge && (
              <span className="px-3.5 py-1.5 rounded-full text-xs font-black tracking-wider uppercase bg-slate-900/90 text-cyan-300 border-2 border-slate-700">
                {lore.comicBadge}
              </span>
            )}

            <span className="text-xs font-black text-slate-400">
              Launched: {mission.launchDate.split('-')[0] || mission.launchDate}
            </span>
          </div>

          {/* Line 1: Giant Title */}
          <h3
            className={`text-4xl sm:text-6xl lg:text-7xl font-black font-cinematic-title text-white uppercase tracking-tight leading-[0.95] transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {lore?.funnyTitle || mission.name}
          </h3>

          {/* Line 2: Giant Subtitle */}
          <div
            className={`text-2xl sm:text-3xl lg:text-4xl font-black text-cyan-300 leading-tight transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {lore?.funnySubtitle || mission.summary}
          </div>

          {/* Line 3: Big Adventure Statement */}
          <p
            className={`text-xl sm:text-2xl font-black text-slate-100 leading-snug transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {punchyLine1}
          </p>

          {/* Line 4: Second Adventure Statement (if exists) */}
          {punchyLine2 && (
            <p
              className={`text-lg sm:text-xl font-black text-slate-200 leading-snug transition-all duration-700 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              {punchyLine2}
            </p>
          )}

          {/* Line 5: Fun Fact Callout */}
          {topFact1 && (
            <div
              className={`p-4 rounded-2xl bg-cyan-950/30 border-2 border-cyan-800/80 space-y-1 transition-all duration-700 delay-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <span className="text-xs font-black text-cyan-300 uppercase tracking-wider block">
                Awesome Thing You Didn't Know:
              </span>
              <p className="text-sm sm:text-base font-bold text-slate-100 leading-relaxed">
                {topFact1}
              </p>
            </div>
          )}

          {/* Line 6: InSight Interactive Model Part Switcher (Updates Main Canvas!) */}
          {mission.id === 'insight' && (
            <div
              className={`space-y-2 transition-all duration-700 delay-650 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <span className="text-xs font-black text-cyan-300 uppercase tracking-wider flex items-center space-x-1.5">
                <SparklesIcon className="w-4 h-4 text-cyan-400" />
                <span>Move 3D InSight Parts in Background Canvas:</span>
              </span>
              <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-900/80 border-2 border-slate-700 text-xs">
                {[
                  { label: 'Robot Arm Out', url: '/models/insight_arm.glb' },
                  { label: 'Solar Wings Open', url: '/models/insight_panels.glb' },
                  { label: 'Wings Folded', url: '/models/insight_panels_stowed.glb' },
                  { label: 'Cruise Mode', url: '/models/insight_stowed.glb' },
                ].map((cfg) => (
                  <button
                    key={cfg.url}
                    onClick={() => handleSelectInsightVariant(cfg.url)}
                    className={`btn-bouncy px-3 py-1.5 rounded-xl font-black transition-all cursor-pointer ${
                      activeInsightVariant === cfg.url
                        ? 'btn-primary text-white'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {cfg.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Line 7: What's Left on the Surface Today */}
          {lore?.weirdStuffLeftBehindFunny && (
            <div
              className={`space-y-1.5 transition-all duration-700 delay-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <span className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                <ShieldIcon className="w-4 h-4 text-cyan-400" />
                <span>Left on the Surface Today:</span>
              </span>
              <ul className="flex flex-wrap gap-2 text-xs font-bold text-slate-200">
                {lore.weirdStuffLeftBehindFunny.slice(0, 3).map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center space-x-1.5 bg-slate-900/60 px-3 py-1.5 rounded-xl border border-slate-700"
                  >
                    <CheckIcon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Line 8: Interactive Actions (Read Aloud Voice & Find on Globe) */}
          <div
            className={`pt-2 flex flex-wrap items-center gap-3.5 transition-all duration-700 delay-800 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <button
              onClick={handleToggleTTS}
              className="btn-bouncy btn-primary px-4 py-2.5 rounded-2xl text-xs font-black flex items-center space-x-2 cursor-pointer"
              title="Listen to story read aloud"
            >
              {isPlayingTTS && !isPausedTTS ? (
                <>
                  <PauseIcon className="w-4 h-4 text-white" />
                  <span>Pause Story</span>
                </>
              ) : (
                <>
                  <PlayIcon className="w-4 h-4 text-white" />
                  <span>Read Aloud</span>
                </>
              )}
            </button>

            {isPlayingTTS && (
              <button
                onClick={handleStopTTS}
                className="btn-bouncy btn-secondary p-2.5 rounded-2xl text-xs text-slate-200 cursor-pointer"
                title="Stop Speech"
              >
                <StopIcon className="w-4 h-4" />
              </button>
            )}

            {mission.celestialBody !== 'asteroid' && (
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onExploreGlobe(mission.celestialBody, mission);
                }}
                className="btn-bouncy btn-secondary px-4 py-2.5 rounded-2xl text-xs font-black text-slate-200 flex items-center space-x-2 cursor-pointer"
              >
                <CompassIcon className="w-4 h-4 text-cyan-400" />
                <span>Locate on 3D Globe</span>
              </button>
            )}
          </div>
        </div>

        {/* ================================================================= */}
        {/* RIGHT COLUMN: OPEN 3D SPACE FOR MAIN BACKGROUND CANVAS MODEL       */}
        {/* ================================================================= */}
        <div className="lg:col-span-5 h-64 lg:h-96 flex flex-col items-center justify-end pb-8 pointer-events-auto">
          <div className="text-xs font-black text-cyan-300 uppercase tracking-widest bg-cyan-950/70 px-4 py-2 rounded-2xl border-2 border-cyan-800/80 backdrop-blur-md">
            Interactive 3D • Click & Drag Spacecraft to Spin!
          </div>
        </div>
      </div>
    </article>
  );
};
