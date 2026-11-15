import React, { useState, useEffect } from 'react';
import { Mission } from '../../types';
import { SpacecraftViewer } from './SpacecraftViewer';
import { soundEffects } from '../../audio/soundEffects';
import { SparklesIcon, CompassIcon, ActivityIcon, ShieldIcon } from '../icons/Icons';

export interface SpacecraftHangarStageProps {
  missions: Mission[];
  activeMissionId?: string;
  onSelectMission?: (mission: Mission) => void;
  onExploreGlobe?: (mission: Mission) => void;
}

export interface GLBModelFile {
  id: string;
  name: string;
  fileName: string;
  fileUrl: string;
  destination: string;
  description: string;
  associatedMissionId?: string;
}

export const GLB_FILES: GLBModelFile[] = [
  {
    id: 'ingenuity',
    name: 'Ingenuity Mars Helicopter',
    fileName: 'Ingenuity Mars Helicopter.glb',
    fileUrl: '/models/ingenuity.glb',
    destination: 'MARS',
    description: 'First powered aircraft on another planet. 1.8 kg drone with twin coaxial carbon-fiber counter-rotating blades.',
    associatedMissionId: 'ingenuity',
  },
  {
    id: 'insight-arm',
    name: 'InSight (Arm Deployed)',
    fileName: 'InSight Cruise Lander (arm deployed).glb',
    fileUrl: '/models/insight_arm.glb',
    destination: 'MARS',
    description: 'Geophysics lander with robotic arm deployed to place the SEIS seismometer on the Martian soil.',
    associatedMissionId: 'insight',
  },
  {
    id: 'insight-panels',
    name: 'InSight (Panels Deployed)',
    fileName: 'InSight Cruise Lander (panels deployed).glb',
    fileUrl: '/models/insight_panels.glb',
    destination: 'MARS',
    description: 'Surface configuration showing two 2.2-meter circular UltraFlex solar arrays deployed to harvest solar power.',
    associatedMissionId: 'insight',
  },
  {
    id: 'insight-stowed',
    name: 'InSight (Cruise Stowed)',
    fileName: 'InSight Cruise Lander (stowed).glb',
    fileUrl: '/models/insight_stowed.glb',
    destination: 'MARS',
    description: 'Interplanetary cruise configuration packaged inside the aeroshell heatshield for the voyage from Earth.',
    associatedMissionId: 'insight',
  },
  {
    id: 'mer-rover',
    name: 'MER Rover (Spirit & Opportunity)',
    fileName: 'MER_static.glb',
    fileUrl: '/models/mer_rover.glb',
    destination: 'MARS',
    description: 'Mars Exploration Rover platform featuring rocker-bogie suspension, camera mast, and surface abrasion tool.',
    associatedMissionId: 'opportunity',
  },
  {
    id: 'dawn',
    name: 'Dawn Asteroid Explorer',
    fileName: 'Dawn.glb',
    fileUrl: '/models/Dawn.glb',
    destination: 'ASTEROID BELT',
    description: 'Deep-space probe equipped with three xenon ion thrusters and 19.7-meter solar wings that orbited Vesta and Ceres.',
    associatedMissionId: 'dawn',
  },
];

export const SpacecraftHangarStage: React.FC<SpacecraftHangarStageProps> = ({
  missions,
  activeMissionId,
  onSelectMission,
  onExploreGlobe,
}) => {
  const [selectedFileId, setSelectedFileId] = useState<string>('ingenuity');

  // React to external activeMissionId
  useEffect(() => {
    if (activeMissionId) {
      const match = GLB_FILES.find((f) => f.associatedMissionId === activeMissionId);
      if (match) setSelectedFileId(match.id);
    }
  }, [activeMissionId]);

  const activeFile = GLB_FILES.find((f) => f.id === selectedFileId) || GLB_FILES[0];
  const matchingMission = missions.find((m) => m.id === activeFile.associatedMissionId);

  return (
    <div id="spacecraft-hangar" className="relative w-full my-12 rounded-3xl overflow-hidden border border-slate-800 bg-slate-950/80 backdrop-blur-xl">
      {/* Top Hangar Banner */}
      <div className="px-6 py-5 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/40">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/80 text-xs font-mono font-bold text-cyan-300 uppercase tracking-widest">
            <SparklesIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive 3D File Viewer // Direct GLB Renderer</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black font-cinematic-title text-white tracking-wide mt-1.5 uppercase">
            {activeFile.name}
          </h3>
          <p className="text-xs sm:text-sm font-mono text-cyan-400 font-bold">
            FILE: {activeFile.fileName} // {activeFile.destination}
          </p>
        </div>

        {/* GLB File Selector */}
        <div className="flex flex-wrap items-center gap-2">
          {GLB_FILES.map((file) => {
            const isSelected = file.id === activeFile.id;
            return (
              <button
                key={file.id}
                onClick={() => {
                  soundEffects.playMarkerSelect();
                  setSelectedFileId(file.id);
                  if (matchingMission && onSelectMission) {
                    onSelectMission(matchingMission);
                  }
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 font-black border border-cyan-400'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-700/80 hover:border-cyan-500/50'
                }`}
              >
                {file.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3D Hardware Viewport Rendering the Actual GLB File */}
      <div className="relative w-full">
        <SpacecraftViewer
          modelUrl={activeFile.fileUrl}
          mission={matchingMission}
          height="500px"
          className="w-full"
        />

        {/* Controls Overlay Tips */}
        <div className="absolute top-4 left-4 pointer-events-none hidden sm:flex flex-col space-y-1 text-[11px] font-mono text-slate-400 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800 backdrop-blur-md">
          <span className="text-cyan-300 font-bold uppercase">3D Navigation:</span>
          <span>Rotate: Left Click + Drag</span>
          <span>Zoom: Scroll / Pinch</span>
          <span>Pan: Right Click + Drag</span>
        </div>

        {/* Bottom Actions */}
        <div className="absolute bottom-4 right-4 flex items-center space-x-2">
          {matchingMission && matchingMission.celestialBody !== 'asteroid' && onExploreGlobe && (
            <button
              onClick={() => {
                soundEffects.playClick();
                onExploreGlobe(matchingMission);
              }}
              className="btn-bouncy btn-primary px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 cursor-pointer"
            >
              <CompassIcon className="w-4 h-4" />
              <span>Locate Landing Site on 3D Globe</span>
            </button>
          )}
        </div>
      </div>

      {/* File Info Strip */}
      <div className="px-6 py-4 bg-slate-900/60 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
        <p className="text-slate-300 font-medium">
          {activeFile.description}
        </p>
        <div className="shrink-0 text-slate-400">
          Source: <span className="text-cyan-300 font-bold font-mono">{activeFile.fileName}</span>
        </div>
      </div>
    </div>
  );
};
