import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Mission, CelestialBody } from '../../types';
import { soundEffects } from '../../audio/soundEffects';
import {
  PlayIcon,
  PauseIcon,
  RotateCcwIcon,
  LockIcon,
  CheckIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  BookOpenIcon,
  ListIcon,
  XIcon,
  Volume2Icon,
  VolumeXIcon,
  SparklesIcon,
  CompassIcon,
  RocketIcon,
  AwardIcon,
  StarIcon,
} from '../icons/Icons';
import { ThemeToggle } from '../theme/ThemeToggle';
import { CadetMissionQuiz } from '../quiz/CadetMissionQuiz';

export interface StoryViewportPresenterProps {
  planet: 'moon' | 'mars';
  missions: Mission[];
  onBackToWorlds: () => void;
  onSelectMission?: (mission: Mission) => void;
  onExploreGlobe?: (body: CelestialBody, mission: Mission) => void;
}

export const StoryViewportPresenter: React.FC<StoryViewportPresenterProps> = ({
  planet,
  missions,
  onBackToWorlds,
  onSelectMission,
  onExploreGlobe,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [listenedMap, setListenedMap] = useState<Record<string, boolean>>({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showLockAlert, setShowLockAlert] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(soundEffects.getMuted());
  const [isShakeAudio, setIsShakeAudio] = useState(false);
  const [activeInsightVariant, setActiveInsightVariant] = useState<string>('/models/insight_arm.glb');
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [completedQuizMap, setCompletedQuizMap] = useState<Record<string, boolean>>(() => {
    try {
      const raw = localStorage.getItem('apollo_completed_quizzes');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const handleCompleteQuiz = (missionId: string) => {
    setCompletedQuizMap((prev) => {
      const updated = { ...prev, [missionId]: true };
      try {
        localStorage.setItem('apollo_completed_quizzes', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lockAlertTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollCooldownRef = useRef(false);

  const currentMission = missions[activeIndex] || missions[0];
  const isLastMission = activeIndex === missions.length - 1;
  const isCurrentListened = !!listenedMap[currentMission?.id];

  // Dispatch 3D coordinate zoom and focus event when active mission changes
  useEffect(() => {
    if (!currentMission) return;
    window.dispatchEvent(
      new CustomEvent('set-active-mission-id', {
        detail: { id: currentMission.id },
      })
    );
    if (onSelectMission) {
      onSelectMission(currentMission);
    }
  }, [currentMission, onSelectMission]);

  // Audio setup and reset when mission changes
  useEffect(() => {
    if (!currentMission?.audioUrl) return;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = currentMission.audioUrl;
      audioRef.current.load();
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [currentMission?.audioUrl]);

  // Handle Audio Time Updates and Completion
  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const cur = audioRef.current.currentTime;
    const dur = audioRef.current.duration || 0;
    setCurrentTime(cur);
    setDuration(dur);

    // If listened to 90% or more, unlock
    if (dur > 0 && cur >= dur * 0.9 && !listenedMap[currentMission.id]) {
      setListenedMap((prev) => ({ ...prev, [currentMission.id]: true }));
      soundEffects.playSuccess();
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTime(duration);
    if (!listenedMap[currentMission.id]) {
      setListenedMap((prev) => ({ ...prev, [currentMission.id]: true }));
      soundEffects.playSuccess();
    }
  };

  const handleAudioLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  };

  // Play / Pause Toggle
  const togglePlayAudio = () => {
    if (!audioRef.current) return;
    soundEffects.playClick();

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  // Replay Audio from Start
  const replayAudio = () => {
    if (!audioRef.current) return;
    soundEffects.playClick();
    audioRef.current.currentTime = 0;
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  };

  // Trigger Lock Alert when user tries to scroll or advance without listening
  const triggerLockAlert = useCallback(() => {
    soundEffects.playRattle();
    setShowLockAlert(true);
    setIsShakeAudio(true);
    setTimeout(() => setIsShakeAudio(false), 600);

    if (lockAlertTimeoutRef.current) {
      clearTimeout(lockAlertTimeoutRef.current);
    }
    lockAlertTimeoutRef.current = setTimeout(() => {
      setShowLockAlert(false);
    }, 2800);
  }, []);

  // Advance to Next Mission (guarded by audio listening requirement)
  const handleNextMission = useCallback(() => {
    if (!isCurrentListened) {
      triggerLockAlert();
      return;
    }
    if (activeIndex < missions.length - 1) {
      soundEffects.playTransition();
      setActiveIndex((prev) => prev + 1);
    }
  }, [isCurrentListened, activeIndex, missions.length, triggerLockAlert]);

  // Go to Previous Mission
  const handlePrevMission = useCallback(() => {
    if (activeIndex > 0) {
      soundEffects.playClick();
      setActiveIndex((prev) => prev - 1);
    }
  }, [activeIndex]);

  // Jump to specific unlocked mission index
  const handleJumpToIndex = (index: number) => {
    if (index === activeIndex) return;
    if (index < activeIndex) {
      soundEffects.playClick();
      setActiveIndex(index);
      return;
    }
    // Check if all preceding missions are listened to
    let canAdvance = true;
    for (let i = 0; i < index; i++) {
      if (!listenedMap[missions[i]?.id]) {
        canAdvance = false;
        break;
      }
    }
    if (canAdvance) {
      soundEffects.playClick();
      setActiveIndex(index);
    } else {
      triggerLockAlert();
    }
  };

  // Prevent scrolling if unlistened: intercept wheel, touch, and arrow keys
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (scrollCooldownRef.current) return;

      if (e.deltaY > 20) {
        // Scrolling down / advance
        if (!isCurrentListened) {
          triggerLockAlert();
          scrollCooldownRef.current = true;
          setTimeout(() => {
            scrollCooldownRef.current = false;
          }, 600);
        } else if (activeIndex < missions.length - 1) {
          handleNextMission();
          scrollCooldownRef.current = true;
          setTimeout(() => {
            scrollCooldownRef.current = false;
          }, 800);
        }
      } else if (e.deltaY < -20) {
        // Scrolling up / previous
        if (activeIndex > 0) {
          handlePrevMission();
          scrollCooldownRef.current = true;
          setTimeout(() => {
            scrollCooldownRef.current = false;
          }, 800);
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        if (!isCurrentListened) {
          triggerLockAlert();
        } else {
          handleNextMission();
        }
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        handlePrevMission();
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (scrollCooldownRef.current) return;
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY - touchEndY;
      if (diffY > 40) {
        // Swipe up -> Next
        if (!isCurrentListened) {
          triggerLockAlert();
        } else {
          handleNextMission();
        }
        scrollCooldownRef.current = true;
        setTimeout(() => {
          scrollCooldownRef.current = false;
        }, 800);
      } else if (diffY < -40) {
        // Swipe down -> Prev
        handlePrevMission();
        scrollCooldownRef.current = true;
        setTimeout(() => {
          scrollCooldownRef.current = false;
        }, 800);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isCurrentListened, activeIndex, missions.length, handleNextMission, handlePrevMission, triggerLockAlert]);

  // Audio seek handler
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
    }
  };

  // Format mm:ss
  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Mute audio handler
  const toggleMute = () => {
    const m = soundEffects.toggleMute();
    setIsAudioMuted(m);
    if (audioRef.current) {
      audioRef.current.muted = m;
    }
  };

  const storyTitle = currentMission.storyTitle || currentMission.name;
  const storyText = currentMission.storyText || currentMission.juniorHook || currentMission.summary;
  const coords = currentMission.coordinates;

  const get3DModelInfo = () => {
    const id = currentMission.id;
    if (id === 'mars-pathfinder-sojourner' || id === 'mars-pathfinder') {
      return {
        title: '3D MODEL: SOJOURNER MICROROVER',
        subtitle: '10.5 kg 6-wheel rover & APXS rock analysis spectrometer',
        hasVariants: false,
      };
    }
    if (id === 'viking-1') {
      return {
        title: '3D MODEL: VIKING 1 MARS LANDER',
        subtitle: 'Titanium chassis, SNAP-19 RTGs & surface biology collector',
        hasVariants: false,
      };
    }
    if (id === 'viking-2') {
      return {
        title: '3D MODEL: VIKING 2 UTOPIA STATION',
        subtitle: 'Surface seismometer & panoramic imaging station',
        hasVariants: false,
      };
    }
    if (id === 'spirit') {
      return {
        title: '3D MODEL: SPIRIT ROVER (MER-A)',
        subtitle: '6-wheel rocker-bogie rover in Gusev Crater & Columbia Hills',
        hasVariants: false,
      };
    }
    if (id === 'opportunity') {
      return {
        title: '3D MODEL: OPPORTUNITY ROVER (MER-B)',
        subtitle: 'Marathon rover (45.16 km driven across Meridiani Planum)',
        hasVariants: false,
      };
    }
    if (id === 'insight') {
      return {
        title: '3D MODEL: INSIGHT GEOPHYSICAL LANDER',
        subtitle: 'Interactive robotic deployment arm & SEIS dome',
        hasVariants: true,
      };
    }
    if (id === 'ingenuity') {
      return {
        title: '3D MODEL: INGENUITY HELICOPTER',
        subtitle: 'Twin counter-rotating carbon fiber rotor blades',
        hasVariants: false,
      };
    }
    if (id === 'near-shoemaker') {
      return {
        title: '3D MODEL: DAWN / NEAR ASTEROID PROBE',
        subtitle: 'Xenon ion propulsion thrusters & 20-meter solar wings',
        hasVariants: false,
      };
    }
    if (planet === 'moon') {
      return {
        title: '3D MODEL: LUNAR SURFACE PINPOINT',
        subtitle: '3D elevation topography with active coordinates beacon',
        hasVariants: false,
      };
    }
    return {
      title: '3D MODEL: MARTIAN SURFACE PINPOINT',
      subtitle: 'Real planetary topography with active coordinates beacon',
      hasVariants: false,
    };
  };

  const modelInfo = get3DModelInfo();

  return (
    <div className="relative w-full h-screen max-h-screen overflow-hidden flex flex-col justify-between selection:bg-cyan-500 selection:text-slate-900 font-sans select-none pointer-events-none">
      {/* Hidden HTML5 Audio Element for Narrative Playback */}
      <audio
        ref={audioRef}
        src={currentMission.audioUrl}
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleAudioEnded}
        onLoadedMetadata={handleAudioLoadedMetadata}
      />

      {/* =================================================================== */}
      {/* 1. TOP STATUS & NAVIGATION BAR                                      */}
      {/* =================================================================== */}
      <header className="relative z-30 w-full px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between max-w-7xl mx-auto pointer-events-auto">
        {/* Left: Brand & Back to Both Planets */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              soundEffects.playClick();
              onBackToWorlds();
            }}
            className="btn-bouncy px-3 sm:px-4 py-2 rounded-xl bg-slate-900/90 border-2 border-cyan-800 hover:border-cyan-400 text-cyan-300 hover:text-white text-xs font-black flex items-center space-x-1.5 transition-all cursor-pointer shadow-lg"
          >
            <ChevronLeftIcon className="w-4 h-4 text-cyan-400" />
            <span>Back to Both Worlds</span>
          </button>

          <div className="hidden md:flex items-center space-x-2 text-xs font-black tracking-wider uppercase text-slate-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>
              {planet === 'moon' ? 'Lunar Expedition' : 'Martian Expedition'}
            </span>
          </div>
        </div>

        {/* Center: Story Part Step Pills */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800 shadow-xl">
          <span className="text-[11px] sm:text-xs font-black text-slate-300 uppercase tracking-widest mr-1 sm:mr-2">
            Part {activeIndex + 1} of {missions.length}
          </span>
          {missions.map((m, idx) => {
            const isUnlocked = idx <= activeIndex || !!listenedMap[m.id];
            const isActive = idx === activeIndex;

            return (
              <button
                key={m.id}
                onClick={() => handleJumpToIndex(idx)}
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full text-[10px] sm:text-xs font-black flex items-center justify-center transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 ring-2 ring-cyan-300 scale-110 shadow-lg'
                    : isUnlocked
                    ? 'bg-cyan-950 border border-cyan-700 text-cyan-300 hover:bg-cyan-900'
                    : 'bg-slate-900 border border-slate-800 text-slate-500 cursor-not-allowed opacity-60'
                }`}
                title={`${m.name} ${!isUnlocked ? '(Listen to previous story to unlock)' : ''}`}
              >
                {listenedMap[m.id] ? (
                  <CheckIcon className="w-3 h-3 text-cyan-300" />
                ) : !isUnlocked ? (
                  <LockIcon className="w-2.5 h-2.5 text-slate-500" />
                ) : (
                  idx + 1
                )}
              </button>
            );
          })}
        </div>

        {/* Right: Audio Mute Toggle & Globe Button */}
        <div className="flex items-center space-x-2">
          {onExploreGlobe && (
            <button
              onClick={() => {
                soundEffects.playClick();
                onExploreGlobe(planet, currentMission);
              }}
              className="hidden lg:flex btn-bouncy px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-400 text-slate-200 text-xs font-bold items-center space-x-1.5 cursor-pointer"
            >
              <CompassIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>3D Globe</span>
            </button>
          )}

          {/* Dark / Light Theme Toggle Button */}
          <ThemeToggle />

          <button
            onClick={toggleMute}
            className="btn-bouncy p-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-200 hover:text-white transition-all cursor-pointer shadow-lg"
            title={isAudioMuted ? 'Turn Sound On' : 'Turn Sound Off'}
          >
            {isAudioMuted ? (
              <VolumeXIcon className="w-4 h-4 text-slate-500" />
            ) : (
              <Volume2Icon className="w-4 h-4 text-cyan-300 animate-pulse" />
            )}
          </button>
        </div>
      </header>

      {/* =================================================================== */}
      {/* 2. MAIN VIEWPORT STAGE FOR THE 3D MODEL IN THE CENTER AND BIG       */}
      {/* The 3D model occupies the entire center stage unobstructed!          */}
      {/* =================================================================== */}
      <main className="relative z-20 w-full flex-1 max-w-7xl mx-auto px-4 sm:px-8 py-2 flex flex-col justify-between pointer-events-none">
        {/* Floating Top Bar Info Overlay (Model Info & Telemetry) */}
        <div className="w-full flex items-start justify-between pointer-events-none">
          {/* Subtle Coordinates Tag */}
          <div className="hidden sm:flex items-center space-x-2 bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-cyan-900/60 font-mono text-xs text-cyan-300 pointer-events-auto shadow-lg">
            <CompassIcon className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="font-bold text-white">{currentMission.name}</span>
            <span className="text-slate-500">•</span>
            <span>
              {coords.lat >= 0 ? `${coords.lat.toFixed(3)}°N` : `${Math.abs(coords.lat).toFixed(3)}°S`},{' '}
              {coords.lng >= 0 ? `${coords.lng.toFixed(3)}°E` : `${Math.abs(coords.lng).toFixed(3)}°W`}
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-cyan-400">{coords.siteName}</span>
            {currentMission.archiveImageUrl && (
              <>
                <span className="text-slate-500">•</span>
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    setIsPhotoModalOpen(true);
                  }}
                  className="text-cyan-300 hover:text-white underline font-bold cursor-pointer"
                >
                  View Archive Photo
                </button>
              </>
            )}
          </div>

          {/* Top-Right: 3D Model Name, Variants & Controls Badge */}
          <div className="bg-slate-950/85 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-cyan-800/80 font-mono text-right shadow-2xl pointer-events-auto ml-auto">
            <div className="flex items-center justify-end space-x-2 text-xs font-black text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>{modelInfo.title}</span>
            </div>
            <div className="text-[10px] font-semibold text-slate-300 pt-0.5">
              {modelInfo.subtitle}
            </div>

            {/* InSight Interactive Deployment State Switcher */}
            {currentMission.id === 'insight' && (
              <div className="pt-2 flex items-center justify-end gap-1.5">
                {[
                  { label: 'Arm Out', url: '/models/insight_arm.glb' },
                  { label: 'Panels Out', url: '/models/insight_panels.glb' },
                  { label: 'Panels In', url: '/models/insight_panels_stowed.glb' },
                  { label: 'Stowed', url: '/models/insight_stowed.glb' },
                ].map((v) => (
                  <button
                    key={v.url}
                    onClick={() => {
                      soundEffects.playClick();
                      setActiveInsightVariant(v.url);
                      window.dispatchEvent(new CustomEvent('set-insight-variant', { detail: { url: v.url } }));
                    }}
                    className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase transition-all cursor-pointer ${
                      activeInsightVariant === v.url
                        ? 'bg-cyan-500 text-slate-950 font-black'
                        : 'bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center Prompt: Drag to Inspect in 360° */}
        <div className="w-full flex justify-center items-center pointer-events-none mb-20 sm:mb-24">
          <div className="text-center font-mono text-[10px] sm:text-xs text-cyan-400/80 bg-slate-950/70 backdrop-blur px-4 py-1.5 rounded-full border border-cyan-900/40 shadow-xl pointer-events-none">
            Interactive 3D Model in Center • Click and drag anywhere to inspect in 360°
          </div>
        </div>
      </main>

      {/* =================================================================== */}
      {/* 3. CENTERED BOTTOM CONTROLS & EXPANDABLE STORY DRAWER              */}
      {/* Text appears in a list button that opens when clicking it!          */}
      {/* =================================================================== */}
      <div className="fixed bottom-3 inset-x-0 z-40 max-w-3xl mx-auto px-4 flex flex-col items-center gap-2 pointer-events-auto">
        {/* EXPANDABLE STORY & PASSAGES MODAL / DRAWER (OPENS WHEN LIST BUTTON IS CLICKED) */}
        {isStoryOpen && (
          <div className="w-full max-h-[66vh] bg-[#070D1E]/95 backdrop-blur-2xl p-4 sm:p-5 rounded-2xl border-2 border-cyan-500/80 shadow-[0_0_50px_rgba(6,182,212,0.35)] flex flex-col space-y-3 overflow-hidden animate-fadeIn pointer-events-auto">
            {/* Top Bar of Modal */}
            <div className="flex items-center justify-between pb-2 border-b border-cyan-900/50">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-md bg-cyan-950 border border-cyan-700 text-cyan-300 text-[10px] sm:text-xs font-black uppercase">
                  Part {activeIndex + 1} of {missions.length}
                </span>
                <span className="text-xs font-mono text-slate-300">
                  {currentMission.spacecraftType} • {coords.siteName}
                </span>
              </div>

              <button
                onClick={() => {
                  soundEffects.playClick();
                  setIsStoryOpen(false);
                }}
                className="px-2.5 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white text-xs font-bold flex items-center space-x-1 transition-all cursor-pointer shadow"
              >
                <ChevronDownIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span>Close Story</span>
              </button>
            </div>

            {/* Story Title & Landing Site Coordinates */}
            <div>
              <h3 className="text-lg sm:text-2xl font-black font-cinematic-title text-white uppercase tracking-tight leading-snug">
                {storyTitle}
              </h3>
              <div className="text-xs font-bold text-cyan-300 flex items-center space-x-2 pt-0.5 font-mono">
                <span>Landing Coordinates:</span>
                <span>
                  {coords.lat >= 0 ? `${coords.lat.toFixed(4)}°N` : `${Math.abs(coords.lat).toFixed(4)}°S`},{' '}
                  {coords.lng >= 0 ? `${coords.lng.toFixed(4)}°E` : `${Math.abs(coords.lng).toFixed(4)}°W`}
                </span>
              </div>
            </div>

            {/* Complete Story Text from Document */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950/85 border border-cyan-900/60 max-h-40 sm:max-h-52 overflow-y-auto select-text shadow-inner">
              <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
                {storyText}
              </p>
            </div>

            {/* Authentic NASA Historical Mission Archive Photograph */}
            {currentMission.archiveImageUrl && (
              <div className="p-2 sm:p-2.5 rounded-xl bg-slate-950/90 border border-cyan-800/80 flex flex-col sm:flex-row items-center gap-3 shadow-lg">
                <div 
                  className="relative group cursor-pointer overflow-hidden rounded-lg shrink-0 border border-cyan-500/50"
                  onClick={() => setIsPhotoModalOpen(true)}
                  title="Click to view full-size historical photograph"
                >
                  <img
                    src={currentMission.archiveImageUrl}
                    alt={currentMission.name}
                    className="w-full sm:w-36 h-24 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-transparent transition-colors flex items-center justify-center">
                    <span className="text-[10px] bg-cyan-950/90 border border-cyan-400 text-cyan-200 px-1.5 py-0.5 rounded font-mono font-bold uppercase shadow">
                      Zoom Photo
                    </span>
                  </div>
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex items-center space-x-1.5 text-[10px] font-black uppercase text-cyan-300 font-mono pb-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    <span>Official NASA Mission Archive Photo</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-snug line-clamp-2">
                    {currentMission.archiveImageCaption || currentMission.summary}
                  </p>
                  <div className="pt-1 flex items-center space-x-2">
                    <button
                      onClick={() => setIsPhotoModalOpen(true)}
                      className="text-[10px] text-cyan-400 hover:text-cyan-300 font-bold underline flex items-center space-x-1 cursor-pointer"
                    >
                      <span>View Full Resolution</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Cadet Mission Quiz Card inside Drawer */}
            <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/80 flex items-center justify-between gap-3">
              <div className="flex items-center space-x-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-cyan-900/60 border border-cyan-500/60 flex items-center justify-center shrink-0">
                  <AwardIcon className="w-4 h-4 text-cyan-300" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-black text-white flex items-center space-x-1.5">
                    <span>Space Cadet Knowledge Quiz</span>
                    {completedQuizMap[currentMission.id] && (
                      <span className="text-[10px] text-cyan-300 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-600 font-mono">
                        Badge Earned
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-300 truncate">
                    Answer questions from this mission data to earn Explorer XP and Cadet Ranks!
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setIsQuizOpen(true);
                }}
                className="btn-bouncy px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black shrink-0 transition-all cursor-pointer shadow-lg"
              >
                {completedQuizMap[currentMission.id] ? 'Review Quiz' : 'Take Quiz'}
              </button>
            </div>

            {/* Complete Expedition Passages List (Jump to any unlocked passage) */}
            <div className="flex flex-col space-y-1.5 pt-1">
              <div className="text-[11px] font-black uppercase tracking-wider text-cyan-400 flex items-center space-x-1.5">
                <ListIcon className="w-3.5 h-3.5" />
                <span>Expedition Missions & Stories ({missions.length} Parts):</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 max-h-28 overflow-y-auto">
                {missions.map((m, idx) => {
                  const isUnlocked = idx <= activeIndex || !!listenedMap[m.id];
                  const isActive = idx === activeIndex;

                  return (
                    <button
                      key={m.id}
                      onClick={() => {
                        handleJumpToIndex(idx);
                      }}
                      className={`p-2 rounded-xl text-left border transition-all text-xs flex flex-col justify-between ${
                        isActive
                          ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-lg'
                          : isUnlocked
                          ? 'bg-slate-900/80 border-slate-700 hover:border-cyan-600 text-slate-300 cursor-pointer'
                          : 'bg-slate-950/60 border-slate-800 text-slate-600 cursor-not-allowed opacity-50'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="font-black text-cyan-300">Part {idx + 1}</span>
                        {listenedMap[m.id] ? (
                          <CheckIcon className="w-3 h-3 text-cyan-400" />
                        ) : !isUnlocked ? (
                          <LockIcon className="w-2.5 h-2.5 text-slate-600" />
                        ) : null}
                      </div>
                      <div className="font-bold truncate text-[11px] mt-0.5 text-slate-100">
                        {m.name.split('/')[0]}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 1. LIST BUTTON & CADET QUIZ BUTTON (CENTERED AT BOTTOM) */}
        <div className="w-full flex items-center gap-2">
          <button
            onClick={() => {
              soundEffects.playClick();
              setIsStoryOpen(!isStoryOpen);
            }}
            className="btn-bouncy flex-1 py-2.5 px-3.5 sm:px-4 rounded-2xl bg-slate-900/95 hover:bg-slate-800/95 border-2 border-cyan-500/80 hover:border-cyan-400 text-white text-xs sm:text-sm font-black flex items-center justify-between shadow-[0_0_20px_rgba(6,182,212,0.25)] transition-all cursor-pointer min-w-0"
          >
            <div className="flex items-center space-x-2.5 min-w-0">
              <BookOpenIcon className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="truncate">
                {isStoryOpen ? 'Close Mission Story' : 'Read Mission Story & Passages'}
              </span>
              <span className="hidden md:inline text-cyan-400 font-mono text-xs shrink-0">
                (Part {activeIndex + 1})
              </span>
            </div>

            <div className="flex items-center space-x-1.5 shrink-0 ml-2">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase hidden xs:inline">
                {isStoryOpen ? 'Minimize' : 'Open'}
              </span>
              {isStoryOpen ? (
                <ChevronDownIcon className="w-4 h-4 text-cyan-400" />
              ) : (
                <ChevronUpIcon className="w-4 h-4 text-cyan-400" />
              )}
            </div>
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              setIsQuizOpen(true);
            }}
            className="btn-bouncy px-3.5 sm:px-4 py-2.5 rounded-2xl bg-cyan-950/90 hover:bg-cyan-900 border-2 border-cyan-400 text-cyan-200 text-xs sm:text-sm font-black flex items-center space-x-1.5 sm:space-x-2 shrink-0 shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-pointer transition-all"
            title="Take Cadet Mission Quiz to earn Explorer XP & Badges"
          >
            <AwardIcon className="w-4 h-4 text-cyan-400" />
            <span>Cadet Quiz</span>
            {completedQuizMap[currentMission.id] ? (
              <CheckIcon className="w-3.5 h-3.5 text-cyan-300" />
            ) : (
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500 text-slate-950 font-bold">
                +XP
              </span>
            )}
          </button>
        </div>

        {/* 2. AUDIO NARRATION PLAYER & NEXT MISSION CONTROLS (CENTERED AT BOTTOM) */}
        <div
          className={`w-full p-2.5 sm:p-3 rounded-2xl bg-slate-950/95 backdrop-blur-md border-2 transition-all flex items-center justify-between gap-2.5 sm:gap-3.5 shadow-2xl ${
            isShakeAudio
              ? 'border-cyan-400 ring-2 ring-cyan-400 animate-shake'
              : isCurrentListened
              ? 'border-cyan-700/80'
              : 'border-slate-800'
          }`}
        >
          {/* Previous Mission Button */}
          <button
            onClick={handlePrevMission}
            disabled={activeIndex === 0}
            className={`p-2 rounded-xl text-xs font-black flex items-center justify-center transition-all shrink-0 ${
              activeIndex === 0
                ? 'bg-slate-900/50 text-slate-600 border border-slate-800 cursor-not-allowed opacity-50'
                : 'btn-bouncy bg-slate-900 border border-slate-700 text-slate-200 hover:text-white hover:bg-slate-800 cursor-pointer shadow-lg'
            }`}
            title="Previous Mission Part"
          >
            <ChevronLeftIcon className="w-4 h-4 text-cyan-400" />
          </button>

          {/* Play / Pause Button */}
          <button
            onClick={togglePlayAudio}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-lg"
            title={isPlaying ? 'Pause Narration' : 'Play Narration'}
          >
            {isPlaying ? (
              <PauseIcon className="w-4 h-4 text-slate-950" />
            ) : (
              <PlayIcon className="w-4 h-4 text-slate-950 ml-0.5" />
            )}
          </button>

          {/* Replay Button */}
          <button
            onClick={replayAudio}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center transition-all cursor-pointer shrink-0"
            title="Restart Narration"
          >
            <RotateCcwIcon className="w-3.5 h-3.5 text-slate-200" />
          </button>

          {/* Progress Bar & Timing */}
          <div className="flex-1 flex flex-col justify-center space-y-1 min-w-0">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-300 font-bold">
              <span className="truncate mr-2">
                {isPlaying ? 'Playing Audio Story...' : 'Story Narration'}
              </span>
              <span className="shrink-0">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <input
              type="range"
              min={0}
              max={duration || 100}
              step={0.1}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
            />
          </div>

          {/* Next Mission Button (Guarded & Locked Until Audio Listened) */}
          {!isLastMission ? (
            <button
              onClick={handleNextMission}
              className={`btn-bouncy px-3.5 py-2 rounded-xl text-xs font-black flex items-center space-x-1.5 transition-all cursor-pointer shrink-0 ${
                isCurrentListened
                  ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20 ring-2 ring-cyan-300 animate-pulse shadow-lg'
                  : 'bg-slate-800/80 text-slate-400 border border-slate-700 hover:bg-slate-800'
              }`}
              title={
                isCurrentListened
                  ? 'Advance to Next Mission'
                  : 'Listen to narration to unlock next mission'
              }
            >
              <span className="hidden sm:inline">
                {isCurrentListened ? 'Next Part' : 'Locked'}
              </span>
              {isCurrentListened ? (
                <ChevronRightIcon className="w-4 h-4 text-slate-950" />
              ) : (
                <LockIcon className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>
          ) : (
            <div className="px-3 py-2 rounded-xl bg-cyan-950 border border-cyan-600 text-cyan-300 text-[10px] font-black uppercase flex items-center space-x-1 shrink-0">
              <SparklesIcon className="w-3 h-3 text-cyan-400" />
              <span>Done</span>
            </div>
          )}
        </div>
      </div>

      {/* FLOATING LOCK ALERT (TRIGGERED ON SCROLL OR CLICK WHEN UNLISTENED) */}
      {showLockAlert && (
        <div className="fixed top-20 inset-x-0 z-50 flex items-center justify-center pointer-events-auto animate-bounce">
          <div className="px-5 py-3 rounded-2xl bg-cyan-950 border-2 border-cyan-400 text-white text-xs sm:text-sm font-black flex items-center space-x-2.5 shadow-2xl">
            <LockIcon className="w-4 h-4 text-cyan-300" />
            <span>Please listen to the audio story first to unlock the next mission!</span>
          </div>
        </div>
      )}

      {/* 4. GAMIFIED SPACE CADET MISSION QUIZ MODAL */}
      <CadetMissionQuiz
        missionId={currentMission.id}
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onCompleteQuiz={handleCompleteQuiz}
      />

      {/* 5. FULL RESOLUTION HISTORIC PHOTO MODAL */}
      {isPhotoModalOpen && currentMission.archiveImageUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-2xl animate-fadeIn pointer-events-auto select-none"
          onClick={() => setIsPhotoModalOpen(false)}
        >
          <div
            className="relative max-w-3xl w-full bg-[#070D1E]/95 border-2 border-cyan-500/80 rounded-3xl p-4 sm:p-6 flex flex-col space-y-3 shadow-[0_0_60px_rgba(6,182,212,0.4)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-cyan-900/60">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-md bg-cyan-950 border border-cyan-600 text-cyan-300 text-xs font-black uppercase font-mono">
                  NASA Archive Photo
                </span>
                <span className="text-sm font-bold text-white">
                  {currentMission.name}
                </span>
              </div>
              <button
                onClick={() => setIsPhotoModalOpen(false)}
                className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer border border-slate-700"
              >
                <XIcon className="w-5 h-5 text-cyan-400" />
              </button>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-cyan-800/80 max-h-[60vh] flex items-center justify-center bg-black">
              <img
                src={currentMission.archiveImageUrl}
                alt={currentMission.name}
                className="w-full h-auto max-h-[60vh] object-contain"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-cyan-900/60">
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                {currentMission.archiveImageCaption || currentMission.summary}
              </p>
              <div className="text-[10px] text-cyan-400 font-mono pt-1">
                Coordinates: {coords.lat.toFixed(4)}°, {coords.lng.toFixed(4)}° • {coords.siteName}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
