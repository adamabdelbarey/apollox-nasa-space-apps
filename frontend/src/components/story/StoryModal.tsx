import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Mission, AudienceMode, NarrativeStage } from '../../types';
import { speechSynthesizer, SpeechState } from '../../audio/speechSynthesizer';
import { soundEffects } from '../../audio/soundEffects';
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
  FilmIcon,
  ActivityIcon,
  CompassIcon,
  RadioIcon,
  SunIcon,
  AwardIcon,
  CheckIcon,
} from '../icons/Icons';

interface StoryModalProps {
  mission: Mission | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenChat: () => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({
  mission,
  isOpen,
  onClose,
  onOpenChat,
}) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [audienceMode, setAudienceMode] = useState<AudienceMode>('junior');
  const [activeTab, setActiveTab] = useState<'narrative' | 'instruments' | 'artifacts'>('narrative');
  const [ttsState, setTtsState] = useState<SpeechState>(speechSynthesizer.getState());

  useEffect(() => {
    const unsub = speechSynthesizer.subscribe((state) => {
      setTtsState(state);
    });
    return unsub;
  }, []);

  // Reset stage index when mission changes
  useEffect(() => {
    setCurrentStageIndex(0);
    setActiveTab('narrative');
  }, [mission]);

  // Celebrate with confetti on reaching Stage 6
  useEffect(() => {
    if (isOpen && currentStageIndex === 5 && audienceMode === 'junior') {
      soundEffects.playDiscoveryChime();
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#38bdf8', '#60a5fa', '#818cf8', '#a855f7', '#34d399', '#ffffff'],
      });
    }
  }, [currentStageIndex, isOpen, audienceMode]);

  if (!isOpen || !mission) return null;

  const currentStage: NarrativeStage = mission.stages[currentStageIndex];
  const isDocumentary = audienceMode === 'documentary';
  const stageStoryText = isDocumentary ? currentStage.documentaryText : currentStage.juniorText;
  const stageTitle = isDocumentary ? currentStage.documentaryTitle : currentStage.juniorTitle;
  const storyAudioId = `story-${mission.id}-stage-${currentStage.stageNumber}-${audienceMode}`;

  const isNarrating = ttsState.currentMessageId === storyAudioId && ttsState.status === 'playing';
  const isPaused = ttsState.currentMessageId === storyAudioId && ttsState.status === 'paused';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#10172E] border-2 border-cyan-400/60 rounded-3xl  overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header & Mission Identity */}
        <div className="px-6 py-4 bg-[#151F3D] border-b-2 border-slate-700/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1.5 bg-cyan-500/20 rounded-2xl border-2 border-cyan-400/50  font-mono text-sm font-bold text-cyan-300">
              {mission.badgeEmoji}
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-black tracking-wide text-white font-display">
                  {mission.name}
                </h2>
                <span className="px-3 py-0.5 text-xs font-bold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                  {mission.spacecraftName}
                </span>
              </div>
              <div className="text-xs text-slate-300 mt-1 flex flex-wrap items-center gap-x-2">
                <span className="flex items-center space-x-1">
                  <CompassIcon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Landing Spot: <strong className="text-sky-300">{mission.coordinates.siteName}</strong></span>
                </span>
              </div>
            </div>
          </div>

          {/* Mode Switcher: Junior Explorer vs Older Explorer */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center p-1 bg-slate-900/90 border border-slate-700 rounded-2xl ">
              <button
                onClick={() => {
                  soundEffects.playDiscoveryChime();
                  speechSynthesizer.stop();
                  setAudienceMode('junior');
                }}
                className={`btn-bouncy px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all flex items-center space-x-1.5 cursor-pointer ${
                  !isDocumentary
                    ? 'btn-primary'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <SparklesIcon className="w-3.5 h-3.5 text-cyan-300" />
                <span>Junior Story</span>
              </button>
              <button
                onClick={() => {
                  soundEffects.playClick();
                  speechSynthesizer.stop();
                  setAudienceMode('documentary');
                }}
                className={`btn-bouncy px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all flex items-center space-x-1.5 cursor-pointer ${
                  isDocumentary
                    ? 'btn-secondary text-cyan-300 border-cyan-400/50'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <BookOpenIcon className="w-3.5 h-3.5 text-cyan-300" />
                <span>Detailed History</span>
              </button>
            </div>

            <button
              onClick={() => {
                soundEffects.playClick();
                speechSynthesizer.stop();
                onClose();
              }}
              className="btn-bouncy btn-bouncy-dark p-2 text-slate-300 hover:text-white rounded-xl transition-all cursor-pointer"
              title="Close Storybook"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 6-Stage Narrative Stepper Tracker */}
        <div className="px-6 py-2.5 bg-slate-900/50 border-b border-slate-800/80 flex items-center justify-between overflow-x-auto">
          <div className="flex items-center space-x-2 min-w-max">
            {mission.stages.map((st, idx) => {
              const isCurrent = idx === currentStageIndex;
              const isCompleted = idx < currentStageIndex;
              return (
                <button
                  key={st.stageNumber}
                  onClick={() => {
                    soundEffects.playClick();
                    speechSynthesizer.stop();
                    setCurrentStageIndex(idx);
                  }}
                  className={`flex items-center space-x-2 px-3 py-1 rounded-xl text-xs font-mono transition-all ${
                    isCurrent
                      ? 'bg-cyan-500 text-slate-950 font-bold  shadow-cyan-500/30'
                      : isCompleted
                      ? 'bg-slate-800/90 text-cyan-300 border border-cyan-800/50'
                      : 'bg-slate-900 text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] border border-current">
                    {isCompleted ? <CheckIcon className="w-3 h-3" /> : st.stageNumber}
                  </span>
                  <span>{st.stageTitle}</span>
                </button>
              );
            })}
          </div>

          {/* Ask AI Assistant shortcut button */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onOpenChat();
            }}
            className="ml-4 px-3 py-1 bg-cyan-950 hover:bg-cyan-900 border border-cyan-600/50 text-cyan-300 rounded-xl text-xs font-semibold flex items-center space-x-1.5 whitespace-nowrap "
          >
            <RadioIcon className="w-3.5 h-3.5" />
            <span>Ask WALLE X</span>
          </button>
        </div>

        {/* Modal Tabs: Narrative, Instruments, Artifacts */}
        <div className="flex items-center px-6 pt-3 space-x-4 border-b border-slate-800/60 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('narrative')}
            className={`pb-2 transition-all flex items-center space-x-1.5 ${
              activeTab === 'narrative'
                ? 'text-cyan-400 border-b-2 border-cyan-400 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpenIcon className="w-4 h-4" />
            <span>Story Chapter ({currentStageIndex + 1}/6)</span>
          </button>
          <button
            onClick={() => setActiveTab('instruments')}
            className={`pb-2 transition-all flex items-center space-x-1.5 ${
              activeTab === 'instruments'
                ? 'text-cyan-400 border-b-2 border-cyan-400 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ActivityIcon className="w-4 h-4" />
            <span>Scientific Detectives ({mission.instruments.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('artifacts')}
            className={`pb-2 transition-all flex items-center space-x-1.5 ${
              activeTab === 'artifacts'
                ? 'text-cyan-400 border-b-2 border-cyan-400 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CompassIcon className="w-4 h-4" />
            <span>Surface Remains Today ({mission.artifacts.length})</span>
          </button>
        </div>

        {/* Modal Main Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'narrative' && (
            <div className="space-y-6">
              {/* Stage Chapter Title & Read Aloud Narration Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 ">
                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-1">
                    Stage {currentStage.stageNumber}: {currentStage.stageTitle}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {stageTitle}
                  </h3>
                </div>

                {/* Audio Narration Button with live waveform */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      speechSynthesizer.speak(stageStoryText, storyAudioId);
                    }}
                    className={`btn-bouncy px-4 py-2.5 rounded-2xl text-xs font-black tracking-wide flex items-center space-x-2 cursor-pointer transition-all  ${
                      isNarrating
                        ? 'btn-indigo animate-pulse'
                        : isPaused
                        ? 'btn-secondary text-cyan-300'
                        : 'btn-primary'
                    }`}
                  >
                    {isNarrating ? (
                      <>
                        <PauseIcon className="w-4 h-4" />
                        <span>Pause Story</span>
                      </>
                    ) : isPaused ? (
                      <>
                        <PlayIcon className="w-4 h-4" />
                        <span>Resume Story</span>
                      </>
                    ) : (
                      <>
                        <Volume2Icon className="w-4 h-4" />
                        <span>Read Story to Me</span>
                      </>
                    )}
                  </button>

                  {(isNarrating || isPaused) && (
                    <button
                      onClick={() => {
                        soundEffects.playClick();
                        speechSynthesizer.stop();
                      }}
                      title="Stop Audio"
                      className="btn-bouncy btn-secondary p-2.5 text-slate-300 hover:text-white rounded-xl cursor-pointer"
                    >
                      <StopIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Story Narrative Card */}
              <div className={`p-6 rounded-3xl border  leading-relaxed text-base ${
                isDocumentary
                  ? 'bg-slate-900/50 border-slate-800 text-slate-200'
                  : 'bg-cyan-950/20 border-cyan-500/30 text-cyan-100 font-sans'
              }`}>
                <p className="whitespace-pre-line text-lg font-medium leading-relaxed">
                  {stageStoryText}
                </p>

                {/* Astronaut / Historical Quote if present */}
                {currentStage.quote && (
                  <blockquote className="mt-5 p-4 rounded-xl bg-slate-950/80 border-l-4 border-cyan-400 text-slate-300 italic text-sm">
                    "{currentStage.quote.text}"
                    <footer className="mt-2 text-xs font-mono text-cyan-400 font-bold not-italic">
                      — {currentStage.quote.speaker}
                    </footer>
                  </blockquote>
                )}
              </div>

              {/* Key Discoveries & Scientific Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 ">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center space-x-2">
                    <SparklesIcon className="w-4 h-4 text-cyan-400" />
                    <span>Key Discoveries & Achievements</span>
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    {currentStage.highlightFacts.map((fact, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Scientific Parameters / Telemetry Details */}
                {currentStage.scientificDetails && (
                  <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800  font-mono">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center space-x-2">
                      <ActivityIcon className="w-4 h-4 text-cyan-400" />
                      <span>Telemetry & Physics Constants</span>
                    </h4>
                    <div className="space-y-2 text-xs">
                      {currentStage.scientificDetails.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between border-b border-slate-800/80 pb-1">
                          <span className="text-slate-400">{item.label}</span>
                          <span className="text-white font-bold">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Instruments Tab (ALSEP, APXS, Seismometers) */}
          {activeTab === 'instruments' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-800/40 text-sm text-cyan-200">
                Scientific payloads deployed by <strong>{mission.name}</strong> designed to study planetary geology, moonquakes, solar winds, and atmospheric dust.
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mission.instruments.map((inst) => (
                  <div
                    key={inst.id}
                    className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all  space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-base text-white">
                        {inst.name}
                      </div>
                      {inst.acronym && (
                        <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                          {inst.acronym}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400">
                      <strong>Scientific Purpose:</strong> {inst.purpose}
                    </div>
                    <div className="text-xs text-cyan-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                      <strong>Breakthrough Discovery:</strong> {inst.discovery}
                    </div>
                    <div className="text-[11px] font-mono text-slate-500 flex items-center justify-between pt-1">
                      <span>Status: {inst.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Artifacts Tab (What Remains Today) */}
          {activeTab === 'artifacts' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/40 text-sm text-cyan-200">
                Because there is no atmospheric weather or water erosion on the Moon, historical hardware and astronaut bootprints remain in pristine state.
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mission.artifacts.map((art, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-400/40 transition-all  space-y-2"
                  >
                    <div className="font-bold text-base text-white">
                      {art.name}
                    </div>
                    <p className="text-xs text-slate-300">
                      {art.description}
                    </p>
                    <div className="text-xs text-cyan-300 font-mono bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                      Coordinates: {art.coordinates}
                    </div>
                    <div className="text-xs text-slate-400">
                      <strong>Preservation Condition:</strong> {art.condition}
                    </div>
                    <div className="text-xs text-cyan-400 italic">
                      {art.significance}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Stage Navigation Bar */}
        <div className="px-6 py-4 bg-[#151F3D] border-t-2 border-slate-700/80 flex items-center justify-between">
          <button
            onClick={handlePrevStage}
            disabled={currentStageIndex === 0}
            className="btn-bouncy btn-secondary px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-200 disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <ChevronLeftIcon className="w-4 h-4" />
            <span>Previous Chapter</span>
          </button>

          <div className="text-xs font-bold text-cyan-300">
            Chapter <span className="text-white text-sm">{currentStageIndex + 1}</span> of{' '}
            <span className="text-white text-sm">{mission.stages.length}</span>
          </div>

          {currentStageIndex < mission.stages.length - 1 ? (
            <button
              onClick={handleNextStage}
              className="btn-bouncy btn-primary px-5 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <span>Next Chapter</span>
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                soundEffects.playDiscoveryChime();
                confetti({ particleCount: 50, spread: 60 });
                onOpenChat();
              }}
              className="btn-bouncy btn-primary px-5 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <AwardIcon className="w-4 h-4" />
              <span>Story Complete! Chat with Buddy</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
