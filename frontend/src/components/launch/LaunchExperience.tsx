import React, { useState, useRef } from 'react';
import { LaunchScreen } from './LaunchScreen';
import { LaunchExhaustParticles } from './LaunchExhaustParticles';
import { useLaunchAnimation } from './useLaunchAnimation';
import { RocketSpaceTransit } from './RocketSpaceTransit';

export interface LaunchExperienceProps {
  onLaunchComplete: () => void;
}

/**
 * LaunchExperience orchestrates the 2-Scene Rocket Blastoff sequence:
 *  - Scene 1: Launch Pad liftoff, camera rumble, and volumetric exhaust plume.
 *  - Scene 2: Deep space transit (the rocket traveling to Mars with telemetry HUD).
 *  - Final: Transitions into State Two (Choose Your World).
 */
export const LaunchExperience: React.FC<LaunchExperienceProps> = ({
  onLaunchComplete,
}) => {
  const [currentScene, setCurrentScene] = useState<'launchpad' | 'transit'>('launchpad');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rocketRef = useRef<HTMLDivElement | null>(null);

  const handleLaunchpadComplete = () => {
    // Transition from Scene 1 to Scene 2: Rocket travelling through deep space to Mars!
    setCurrentScene('transit');
  };

  const {
    launchPhase,
    isLaunching,
    startLaunch,
    exhaustIntensity,
  } = useLaunchAnimation({
    rocketRef,
    containerRef,
    onComplete: handleLaunchpadComplete,
  });

  if (currentScene === 'transit') {
    return (
      <RocketSpaceTransit
        onCompleteTransit={onLaunchComplete}
        onSkip={onLaunchComplete}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#0B1124]"
    >
      {/* State One Visual Scene (Canvas starfield, rocket, headings, START trigger) */}
      <LaunchScreen
        rocketRef={rocketRef}
        onStartLaunch={startLaunch}
        onLaunchComplete={onLaunchComplete}
        isLaunching={isLaunching}
        launchPhase={launchPhase}
      />

      {/* Multi-tier HTML5 Canvas Exhaust & Volumetric Full-Screen Smoke Transition */}
      <LaunchExhaustParticles
        launchPhase={launchPhase}
        exhaustIntensity={exhaustIntensity}
        rocketRef={rocketRef}
        zIndex={35}
      />
    </div>
  );
};
