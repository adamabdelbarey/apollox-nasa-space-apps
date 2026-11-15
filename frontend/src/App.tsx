import React, { useState } from 'react';
import { Mission, CelestialBody } from './types';
import { MISSIONS_DATA } from './data/missions';
import { LandingPage } from './components/landing/LandingPage';
import { LaunchExperience } from './components/launch/LaunchExperience';
import { CelestialGlobe } from './components/canvas/CelestialGlobe';
import { ChatAssistant } from './components/chat/ChatAssistant';
import { soundEffects } from './audio/soundEffects';
import {
  BotIcon,
  Volume2Icon,
  VolumeXIcon,
  ChevronLeftIcon,
  SparklesIcon,
} from './components/icons/Icons';
import { ThemeProvider } from './theme/ThemeContext';
import { ThemeToggle } from './components/theme/ThemeToggle';

export type ViewMode = 'landing' | 'explore3d' | 'launch';

export const App: React.FC = () => {
  // Primary View Mode: Starts on Rocket Blastoff -> Transitions to Landing Page -> 3D Globe Explorer
  const [viewMode, setViewMode] = useState<ViewMode>('launch');
  const [currentBody, setCurrentBody] = useState<CelestialBody>('moon');
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(soundEffects.getMuted());

  // Handle mission selection from any component (scrolls to mission on page)
  const handleSelectMission = (mission: Mission) => {
    setSelectedMission(mission);
    setCurrentBody(mission.celestialBody);
    if (viewMode !== 'landing') {
      setViewMode('landing');
    }
    setTimeout(() => {
      const el = document.getElementById(`mission-${mission.id}`);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  // Launch into 3D Globe exploration for selected celestial body
  const handleSelectWorld = (body: CelestialBody) => {
    setCurrentBody(body);
    setViewMode('explore3d');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Callback when rocket launch sequence completes
  const handleLaunchComplete = () => {
    setViewMode('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleAudio = () => {
    const muted = soundEffects.toggleMute();
    setIsMuted(muted);
    soundEffects.playClick();
  };

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-[#0B1124] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-900 overflow-x-hidden">
      {/* ===================================================================== */}
      {/* VIEW 1: THE LANDING PAGE                                              */}
      {/* - Hero Section: 3D Models (Moon & Mars) as the Main Section           */}
      {/* - Dedicated Section: Two Cartoony Destination Cards (Not Futuristic)  */}
      {/* - Mission Stories & NASA Space Apps Cadet Accreditation               */}
      {/* ===================================================================== */}
      {viewMode === 'landing' && (
        <LandingPage
          missions={MISSIONS_DATA}
          onSelectWorld={handleSelectWorld}
          onSelectMission={handleSelectMission}
          onOpenChat={() => setIsChatOpen(true)}
          onLaunchRocket={() => setViewMode('launch')}
        />
      )}

      {/* ===================================================================== */}
      {/* VIEW 2: FULLSCREEN 3D CELESTIAL GLOBE EXPLORER                        */}
      {/* ===================================================================== */}
      {viewMode === 'explore3d' && (
        <div className="relative w-full h-screen overflow-hidden flex flex-col bg-[#0B1124]">
          {/* Top 3D Navigation Bar */}
          <div className="absolute top-0 inset-x-0 z-30 px-4 sm:px-6 py-4 flex items-center justify-between bg-gradient-to-b from-[#0B1124]/90 to-transparent pointer-events-none">
            {/* Left: Return to Landing Page */}
            <div className="pointer-events-auto flex items-center space-x-3">
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setViewMode('landing');
                }}
                className="btn-bouncy btn-secondary px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center space-x-2 transition-all  cursor-pointer"
              >
                <ChevronLeftIcon className="w-4 h-4 text-cyan-400" />
                <span>Back to Landing Page</span>
              </button>
            </div>

            {/* Right: Theme Toggle & Audio Toggle */}
            <div className="pointer-events-auto flex items-center space-x-3">
              <ThemeToggle />

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
          </div>

          {/* 3D WebGL Canvas Globe */}
          <div className="w-full h-full">
            <CelestialGlobe
              currentBody={currentBody}
              missions={MISSIONS_DATA}
              selectedMission={selectedMission}
              onSelectMission={handleSelectMission}
              onSwitchBody={(body) => setCurrentBody(body)}
            />
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* VIEW 3: ROCKET LAUNCH EXPERIENCE (BLASTOFF MODE)                      */}
      {/* ===================================================================== */}
      {viewMode === 'launch' && (
        <LaunchExperience onLaunchComplete={handleLaunchComplete} />
      )}

      {/* Floating WALLE X Space Rover Assistant */}
      <ChatAssistant
        currentMission={selectedMission}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      {/* Persistent Floating Chat Trigger (when chat is closed and not in rocket launch mode) */}
      {!isChatOpen && viewMode !== 'launch' && (
        <button
          onClick={() => {
            soundEffects.playClick();
            setIsChatOpen(true);
          }}
          className="btn-bouncy btn-primary fixed bottom-6 right-6 z-40 px-4 py-3 rounded-2xl flex items-center space-x-2.5 font-black text-xs cursor-pointer select-none"
          title="Open WALLE X Assistant"
        >
          <BotIcon className="w-5 h-5 text-white" />
          <span>Ask WALLE X!</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </button>
      )}
      </div>
    </ThemeProvider>
  );
};

export default App;
