import React, { useState, useEffect } from 'react';
import { Mission, CelestialBody } from '../../types';
import { DualPlanetCanvas } from '../world-select/DualPlanetCanvas';
import { LandingHero3D } from './LandingHero3D';
import { StoryViewportPresenter } from '../story/StoryViewportPresenter';
import { LoadingScreen } from '../loading/LoadingScreen';

export interface LandingPageProps {
  missions: Mission[];
  onSelectWorld: (world: CelestialBody) => void;
  onSelectMission: (mission: Mission) => void;
  onOpenChat: () => void;
  onLaunchRocket?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  missions,
  onSelectWorld,
  onSelectMission,
  onOpenChat,
  onLaunchRocket,
}) => {
  const [hoveredWorld, setHoveredWorld] = useState<'moon' | 'mars' | null>(null);
  const [focusedPlanet, setFocusedPlanet] = useState<'moon' | 'mars' | null>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [currentAsset, setCurrentAsset] = useState('Initializing Spacecraft Systems...');
  const [isAssetsLoaded, setIsAssetsLoaded] = useState(false);

  // Fallback safety timeout so app always reveals even on low connectivity
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      setLoadProgress(100);
      setIsAssetsLoaded(true);
    }, 7000);
    return () => clearTimeout(safetyTimer);
  }, []);

  const handleLoadingProgress = (progress: number, asset: string) => {
    setLoadProgress((prev) => Math.max(prev, progress));
    if (asset) setCurrentAsset(asset);
  };

  const handleLoadingComplete = () => {
    setLoadProgress(100);
    setIsAssetsLoaded(true);
  };

  return (
    <div className="relative w-full h-screen min-h-screen max-h-screen bg-[#0B1124] text-slate-100 overflow-hidden selection:bg-cyan-500 selection:text-slate-900 font-sans">
      {/* ===================================================================== */}
      {/* 0. FULLPAGE SYSTEM LOADING SCREEN (WAITS UNTIL ALL 3D MODELS LOAD)   */}
      {/* ===================================================================== */}
      <LoadingScreen
        progress={loadProgress}
        currentAsset={currentAsset}
        isComplete={isAssetsLoaded}
      />

      {/* ===================================================================== */}
      {/* 1. PERSISTENT FIXED 3D CANVAS (CONTROLLABLE PLANETS IN BACKGROUND)     */}
      {/* ===================================================================== */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <DualPlanetCanvas
          hoveredWorld={hoveredWorld}
          focusedPlanet={focusedPlanet}
          onSelectWorld={(world) => {
            setFocusedPlanet(world);
          }}
          onHoverWorld={(world) => setHoveredWorld(world)}
          onLoadingProgress={handleLoadingProgress}
          onLoadingComplete={handleLoadingComplete}
          isFixedBackground={true}
        />
      </div>

      {/* Cinematic Border Vignette (Feathers Viewport Edges into Deep Space) */}
      <div className="cinematic-vignette-overlay" aria-hidden="true" />

      {/* ===================================================================== */}
      {/* 2. FOREGROUND CONTENT: FIRST SCREEN CHOICE OR 1920x1080 STORY VIEWPORT */}
      {/* ===================================================================== */}
      <div className="relative z-10 w-full h-screen max-h-screen overflow-hidden flex flex-col">
        {!focusedPlanet ? (
          <LandingHero3D
            focusedPlanet={null}
            onSelectPlanet={(planet) => setFocusedPlanet(planet)}
            onSelectWorld={onSelectWorld}
            onOpenChat={onOpenChat}
            onLaunchRocket={onLaunchRocket}
          />
        ) : (
          <StoryViewportPresenter
            planet={focusedPlanet}
            missions={
              focusedPlanet === 'moon'
                ? missions.filter((m) => m.celestialBody === 'moon')
                : missions.filter((m) => m.celestialBody === 'mars' || m.id === 'near-shoemaker')
            }
            onBackToWorlds={() => setFocusedPlanet(null)}
            onSelectMission={onSelectMission}
            onExploreGlobe={(body, mission) => {
              onSelectMission(mission);
              onSelectWorld(body);
            }}
          />
        )}
      </div>
    </div>
  );
};
