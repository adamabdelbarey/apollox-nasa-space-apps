import React, { useState, useEffect } from 'react';
import { Mission, AudienceMode, NarrativeStage, CelestialBody } from '../../types';
import { speechSynthesizer, SpeechState } from '../../audio/speechSynthesizer';
import { soundEffects } from '../../audio/soundEffects';
import { SpacecraftViewer } from '../canvas/SpacecraftViewer';
import { MissionTimeline } from './MissionTimeline';
import { LifetimeVisualizer } from './LifetimeVisualizer';
import {
  RocketIcon,
  PlayIcon,
  PauseIcon,
  StopIcon,
  Volume2Icon,
  XIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  SparklesIcon,
  BookOpenIcon,
  CompassIcon,
  ActivityIcon,
  ShieldIcon,
  CheckIcon,
} from '../icons/Icons';

export interface MissionStoryDetailProps {
  mission: Mission;
  isOpen: boolean;
  onClose: () => void;
  onLocateOnGlobe?: (body: CelestialBody, mission: Mission) => void;
  onOpenChat?: () => void;
}

export const MissionStoryDetail: React.FC<MissionStoryDetailProps> = ({
  mission,
  isOpen,
  onClose,
  onLocateOnGlobe,
  onOpenChat,
}) => {
  const [activeTab, setActiveTab] = useState<'story' | 'spacecraft' | 'site' | 'timeline' | 'legacy'>('story');
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [audienceMode, setAudienceMode] = useState<AudienceMode>('junior');
  const [ttsState, setTtsState] = useState<SpeechState>(speechSynthesizer.getState());

  useEffect(() => {
    const unsub = speechSynthesizer.subscribe((state) => {
      setTtsState(state);
    });
    return unsub;
  }, []);

  useEffect(() => {
    setCurrentStageIndex(0);
    setActiveTab('story');
    speechSynthesizer.stop();
  }, [mission]);

  if (!isOpen) return null;

  const currentStage: NarrativeStage = mission.stages[currentStageIndex] || mission.stages[0];
  const isDoc = audienceMode === 'documentary';
  const storyText = isDoc ? currentStage.documentaryText : currentStage.juniorText;
  const stageHeading = isDoc ? currentStage.documentaryTitle : currentStage.juniorTitle;
  const storyAudioId = `story-${mission.id}-stage-${currentStage.stageNumber}-${audienceMode}`;

  const isNarrating = ttsState.currentMessageId === storyAudioId && ttsState.status === 'playing';
  const isPaused = ttsState.currentMessageId === storyAudioId && ttsState.status === 'paused';

  const handleToggleNarration = () => {
    if (isNarrating) {
      soundEffects.playClick();
      speechSynthesizer.pause();
    } else if (isPaused) {
      soundEffects.playClick();
      speechSynthesizer.resume();
    } else {
      soundEffects.playDiscoveryChime();
      speechSynthesizer.speak(storyText, storyAudioId);
    }
  };

  const handleStopNarration = () => {
    soundEffects.playClick();
    speechSynthesizer.stop();
  };

  const handleNextStage = () => {
    if (currentStageIndex < mission.stages.length - 1) {
      soundEffects.playClick();
      speechSynthesizer.stop();
      setCurrentStageIndex((prev) => prev + 1);
    }
  };

  const handlePrevStage = () => {
    if (currentStageIndex > 0) {
      soundEffects.playClick();
      speechSynthesizer.stop();
      setCurrentStageIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-[#090E1E] border border-cyan-500/40 rounded-3xl overflow-hidden flex flex-col max-h-[94vh] shadow-2xl">
        {/* ================================================================= */}
        {/* TOP HEADER: MISSION IDENTITY & CONTROLS                           */}
        {/* ================================================================= */}
        <div className="px-6 py-4 bg-[#0E172F] border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 bg-cyan-500/20 rounded-xl border border-cyan-400/50 font-mono text-xs font-bold text-cyan-300">
              {mission.badgeEmoji}
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl sm:text-2xl font-black text-white font-cinematic-title uppercase tracking-tight">
                  {mission.name}
                </h2>
                <span className="text-xs font-bold text-cyan-400 font-mono hidden sm:inline">
                  // {mission.launchDate.split(',')[1]?.trim() || mission.launchDate}
                </span>
              </div>
              <div className="text-xs text-slate-300 font-medium">
                {mission.spacecraftName} • {mission.coordinates.siteName}
              </div>
            </div>
          </div>

          {/* Mode Switcher & Close */}
          <div className="flex items-center space-x-3">
            {/* Junior vs Documentary Mode Switcher */}
            <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl">
              <button
                onClick={() => {
                  soundEffects.playClick();
                  speechSynthesizer.stop();
                  setAudienceMode('junior');
                }}
                className={`btn-bouncy px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  !isDoc ? 'btn-primary' : 'text-slate-400 hover:text-white'
                }`}
              >
                Junior Story
              </button>
              <button
                onClick={() => {
                  soundEffects.playClick();
                  speechSynthesizer.stop();
                  setAudienceMode('documentary');
                }}
                className={`btn-bouncy px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isDoc ? 'btn-indigo' : 'text-slate-400 hover:text-white'
                }`}
              >
                Documentary
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={() => {
                soundEffects.playClick();
                speechSynthesizer.stop();
                onClose();
              }}
              className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 transition-all cursor-pointer"
              title="Close Mission Story"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ================================================================= */}
        {/* NAVIGATION TABS: ARCHIVE CHAPTERS (A - G)                         */}
        {/* ================================================================= */}
        <div className="px-6 py-2.5 bg-[#0A1024] border-b border-slate-800 flex items-center space-x-2 sm:space-x-4 overflow-x-auto text-xs font-bold font-mono shrink-0">
          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('story');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'story' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpenIcon className="w-4 h-4" />
            <span>Story Chapters</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('spacecraft');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'spacecraft' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <RocketIcon className="w-4 h-4" />
            <span>3D Spacecraft Viewer</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('site');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'site' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <CompassIcon className="w-4 h-4" />
            <span>Landing Site & Globe</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('timeline');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'timeline' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ActivityIcon className="w-4 h-4" />
            <span>Timeline & Lifetime</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('legacy');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'legacy' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldIcon className="w-4 h-4" />
            <span>What It Left Behind</span>
          </button>
        </div>

        {/* ================================================================= */}
        {/* MAIN BODY CONTENT AREA (SCROLLABLE)                               */}
        {/* ================================================================= */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: STORY CHAPTERS */}
          {activeTab === 'story' && (
            <div className="space-y-6">
              {/* Cinematic Intro Banner */}
              <div className="p-5 rounded-2xl bg-[#0F172E] border border-cyan-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1 max-w-2xl">
                  <div className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-widest">
                    Chapter 0{currentStage.stageNumber} // {currentStage.stageTitle}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white font-cinematic-title tracking-tight uppercase">
                    {stageHeading}
                  </h3>
                  <p className="text-xs sm:text-sm text-cyan-200/90 font-medium italic">
                    "{mission.juniorHook}"
                  </p>
                </div>

                {/* Text-To-Speech Narrator Controls */}
                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={handleToggleNarration}
                    className={`btn-bouncy px-4 py-2 rounded-xl text-xs font-black flex items-center space-x-2 cursor-pointer ${
                      isNarrating ? 'bg-emerald-600 text-white animate-pulse' : 'btn-primary'
                    }`}
                  >
                    {isNarrating ? (
                      <>
                        <PauseIcon className="w-4 h-4" />
                        <span>Pause Narration</span>
                      </>
                    ) : (
                      <>
                        <PlayIcon className="w-4 h-4" />
                        <span>Read Aloud</span>
                      </>
                    )}
                  </button>

                  {(isNarrating || isPaused) && (
                    <button
                      onClick={handleStopNarration}
                      className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white cursor-pointer"
                      title="Stop Audio"
                    >
                      <StopIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Story Narrative Text */}
              <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-100 text-base sm:text-lg leading-relaxed font-medium">
                {storyText}
              </div>

              {/* Highlight Facts Badges */}
              {currentStage.highlightFacts && currentStage.highlightFacts.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                    Key Historical Facts:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {currentStage.highlightFacts.map((fact, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-200 flex items-start space-x-2 font-medium">
                        <CheckIcon className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{fact}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Chapter Stage Step Navigation */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={handlePrevStage}
                  disabled={currentStageIndex === 0}
                  className={`btn-bouncy px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 cursor-pointer ${
                    currentStageIndex === 0
                      ? 'opacity-40 cursor-not-allowed bg-slate-900 text-slate-500'
                      : 'btn-secondary text-slate-200'
                  }`}
                >
                  <ChevronLeftIcon className="w-4 h-4" />
                  <span>Previous Chapter</span>
                </button>

                {/* Progress Indicators */}
                <div className="flex items-center space-x-1.5">
                  {mission.stages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        soundEffects.playClick();
                        speechSynthesizer.stop();
                        setCurrentStageIndex(idx);
                      }}
                      className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                        idx === currentStageIndex ? 'bg-cyan-400 scale-125' : 'bg-slate-700 hover:bg-slate-500'
                      }`}
                      title={`Go to Stage ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNextStage}
                  disabled={currentStageIndex === mission.stages.length - 1}
                  className={`btn-bouncy px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 cursor-pointer ${
                    currentStageIndex === mission.stages.length - 1
                      ? 'opacity-40 cursor-not-allowed bg-slate-900 text-slate-500'
                      : 'btn-primary text-white'
                  }`}
                >
                  <span>Next Chapter</span>
                  <ChevronRightIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: 3D SPACECRAFT VIEWER */}
          {activeTab === 'spacecraft' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-white font-cinematic-title uppercase tracking-tight">
                    Interactive 3D Hardware Model
                  </h3>
                  <p className="text-xs text-slate-300 font-medium">
                    Drag to rotate • Scroll to zoom • Select component tags to inspect real NASA engineering!
                  </p>
                </div>
              </div>

              {/* 3D WebGL Spacecraft Viewer Canvas */}
              <SpacecraftViewer mission={mission} height="520px" />
            </div>
          )}

          {/* TAB 3: LANDING SITE & GLOBE EXPLORATION */}
          {activeTab === 'site' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-widest flex items-center space-x-2">
                    <CompassIcon className="w-4 h-4 text-cyan-400" />
                    <span>LANDING SITE COORDINATES & GEOLOGICAL SELECTION</span>
                  </div>
                  {onLocateOnGlobe && mission.celestialBody !== 'asteroid' && (
                    <button
                      onClick={() => {
                        soundEffects.playMarkerSelect();
                        onClose();
                        onLocateOnGlobe(mission.celestialBody, mission);
                      }}
                      className="btn-bouncy btn-primary px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 cursor-pointer"
                    >
                      <CompassIcon className="w-4 h-4 text-white" />
                      <span>Locate on 3D {mission.celestialBody === 'moon' ? 'Moon' : 'Mars'} Globe</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                    <div className="text-[11px] font-mono text-slate-400 uppercase">Site Name</div>
                    <div className="text-base font-bold text-white mt-0.5">{mission.coordinates.siteName}</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                    <div className="text-[11px] font-mono text-slate-400 uppercase">Coordinates</div>
                    <div className="text-base font-mono font-bold text-cyan-300 mt-0.5">
                      {mission.coordinates.lat}° N, {mission.coordinates.lng}° E
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                    <div className="text-[11px] font-mono text-slate-400 uppercase">Target World</div>
                    <div className="text-base font-bold text-indigo-300 mt-0.5 capitalize">
                      {mission.celestialBody}
                    </div>
                  </div>
                </div>

                {/* Why Selected */}
                {mission.coordinates.selectionReason && (
                  <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-1">
                    <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                      Why Scientists Selected This Site:
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed font-medium">
                      {mission.coordinates.selectionReason}
                    </p>
                  </div>
                )}

                {/* Geological Features */}
                {mission.coordinates.geologicalFeatures && (
                  <div className="space-y-2">
                    <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                      Surrounding Geological Terrain:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {mission.coordinates.geologicalFeatures.map((feat, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-xs font-mono text-cyan-300">
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Proximity / Related Missions */}
                {mission.coordinates.nearbyMissions && mission.coordinates.nearbyMissions.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-xs text-indigo-200 flex items-center space-x-2">
                    <SparklesIcon className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>
                      <strong>Nearby Exploration Proximity:</strong> Located within proximity to{' '}
                      {mission.coordinates.nearbyMissions.join(', ')}!
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: TIMELINE & LIFETIME */}
          {activeTab === 'timeline' && (
            <div className="space-y-6">
              {/* Lifetime Endurance Metric Visualizer */}
              <LifetimeVisualizer lifetime={mission.lifetime} celestialBody={mission.celestialBody} />

              {/* Chronological Mission Milestones Timeline */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                <div className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-widest">
                  CHRONOLOGICAL MISSION MILESTONES
                </div>
                <MissionTimeline timeline={mission.timeline} />
              </div>
            </div>
          )}

          {/* TAB 5: THE LEGACY (WHAT IT LEFT BEHIND) */}
          {activeTab === 'legacy' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
                <div>
                  <div className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-widest flex items-center space-x-2">
                    <ShieldIcon className="w-4 h-4 text-cyan-400" />
                    <span>EXTRATERRESTRIAL ARTIFACTS & ENDURING LEGACY</span>
                  </div>
                  <h3 className="text-2xl font-black text-white font-cinematic-title uppercase tracking-tight mt-1">
                    What It Left Behind
                  </h3>
                </div>

                {/* Hardware Remaining */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                    Physical Hardware Resting at Landing Site:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {mission.legacy.hardwareRemaining.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-200 flex items-start space-x-2 font-medium">
                        <RocketIcon className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Scientific Discoveries */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                    Major Scientific Discoveries:
                  </h4>
                  <div className="space-y-2">
                    {mission.legacy.keyDiscoveries.map((disc, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-950/50 border border-slate-800 text-xs text-slate-200 flex items-start space-x-2 font-medium">
                        <SparklesIcon className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{disc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ongoing Significance */}
                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-200 leading-relaxed font-medium space-y-1">
                  <div className="font-bold uppercase tracking-wider text-cyan-300">
                    Why This Mission Still Matters Today:
                  </div>
                  <p>{mission.legacy.ongoingSignificance}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ================================================================= */}
        {/* BOTTOM FOOTER: QUICK ACTIONS                                      */}
        {/* ================================================================= */}
        <div className="px-6 py-3.5 bg-[#0E172F] border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs font-mono text-slate-400">
            NASA Open Data Archives • Catalog ID: {mission.id}
          </div>

          <div className="flex items-center space-x-3">
            {onOpenChat && (
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onOpenChat();
                }}
                className="btn-bouncy btn-secondary px-3.5 py-1.5 rounded-xl text-xs font-bold text-cyan-300 cursor-pointer"
              >
                Ask Buddy About {mission.name}
              </button>
            )}

            <button
              onClick={() => {
                soundEffects.playClick();
                speechSynthesizer.stop();
                onClose();
              }}
              className="btn-bouncy btn-primary px-4 py-1.5 rounded-xl text-xs font-bold text-white cursor-pointer"
            >
              Close Archive
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
