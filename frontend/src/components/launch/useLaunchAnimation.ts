import { useState, useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { soundEffects } from '../../audio/soundEffects';

export type LaunchPhase =
  | 'idle'
  | 'activation'
  | 'ignition'
  | 'liftoff'
  | 'transition';

export interface UseLaunchAnimationOptions {
  /**
   * Callback fired when Phase 4 full-screen coverage is reached,
   * transitioning to State 2 (Choose Your World).
   */
  onComplete?: () => void;
  /** Optional callback fired on each phase transition */
  onPhaseChange?: (phase: LaunchPhase) => void;
  /** Optional Ref to the rocket DOM element (for micro-vibration and upward liftoff) */
  rocketRef?: React.RefObject<HTMLElement | null>;
  /** Optional Ref to the container DOM element (for camera shake and rumble) */
  containerRef?: React.RefObject<HTMLElement | null>;
  /** Optional Ref to engine glow element */
  glowRef?: React.RefObject<HTMLElement | null>;
  /** Global time scale factor (default: 1.0) */
  timeScale?: number;
}

export interface UseLaunchAnimationReturn {
  /** Current phase of the launch sequence */
  launchPhase: LaunchPhase;
  /** Whether a launch sequence is actively running (prevents duplicate clicks) */
  isLaunching: boolean;
  /** Trigger the 4-phase launch sequence */
  startLaunch: (onCompleteOverride?: () => void) => void;
  /** Reset launch animation state back to idle */
  resetLaunch: () => void;
  /** Normalized exhaust intensity from 0.0 (idle) to 1.0 (peak liftoff/transition) */
  exhaustIntensity: number;
  /** Numeric phase index: 0 (idle), 1 (activation), 2 (ignition), 3 (liftoff), 4 (transition) */
  phaseNumber: number;
  /** Whether the user has system prefers-reduced-motion enabled */
  isReducedMotion: boolean;
}

export const LAUNCH_PHASE_NUMBERS: Record<LaunchPhase, number> = {
  idle: 0,
  activation: 1,
  ignition: 2,
  liftoff: 3,
  transition: 4,
};

/**
 * Dedicated launch animation controller hook using GSAP.
 * Orchestrates the 4 distinct launch phases:
 *  - Phase 1: Activation (0.5–0.8s) - Engine glow ramps, micro-vibrations, sparks
 *  - Phase 2: Ignition (0.8–1.2s) - Flame blast, exhaust eruption, sound trigger, early rise
 *  - Phase 3: Liftoff (1.0–1.5s) - Acceleration upward, camera rumble, exit viewport
 *  - Phase 4: Full-Screen Transition (1.0–1.5s) - Volumetric smoke covers 100% of screen -> State 2
 */
export function useLaunchAnimation(
  options: UseLaunchAnimationOptions = {}
): UseLaunchAnimationReturn {
  const {
    onComplete,
    onPhaseChange,
    rocketRef,
    containerRef,
    glowRef,
    timeScale = 1.0,
  } = options;

  const [launchPhase, setLaunchPhaseState] = useState<LaunchPhase>('idle');
  const [isLaunching, setIsLaunching] = useState<boolean>(false);
  const [exhaustIntensity, setExhaustIntensity] = useState<number>(0);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  // References to keep callbacks and state fresh inside GSAP timelines
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const onPhaseChangeRef = useRef(onPhaseChange);
  onPhaseChangeRef.current = onPhaseChange;

  const isLaunchingRef = useRef(false);
  const activeTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const gsapCtxRef = useRef<gsap.Context | null>(null);
  const timeoutsRef = useRef<number[]>([]);

  // Check prefers-reduced-motion on mount & media query change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, []);

  // Phase transition helper
  const updatePhase = useCallback((newPhase: LaunchPhase) => {
    setLaunchPhaseState(newPhase);
    onPhaseChangeRef.current?.(newPhase);
  }, []);

  // Safe sound trigger
  const triggerIgnitionSound = useCallback(() => {
    try {
      const s = soundEffects as unknown as Record<string, unknown>;
      if (typeof s.playRocketLaunch === 'function') {
        (s.playRocketLaunch as () => void)();
      } else if (typeof s.playRocketIgnition === 'function') {
        (s.playRocketIgnition as () => void)();
      } else if (typeof s.playMarkerSelect === 'function') {
        (s.playMarkerSelect as () => void)();
      }
    } catch (err) {
      console.warn('ApolloX Audio: launch sound trigger error', err);
    }
  }, []);

  // Full cleanup of tweens, timers, and contexts
  const cleanupAnimations = useCallback(() => {
    timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutsRef.current = [];

    if (activeTimelineRef.current) {
      activeTimelineRef.current.kill();
      activeTimelineRef.current = null;
    }

    if (gsapCtxRef.current) {
      gsapCtxRef.current.revert();
      gsapCtxRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupAnimations();
    };
  }, [cleanupAnimations]);

  // Reset launch state
  const resetLaunch = useCallback(() => {
    cleanupAnimations();
    isLaunchingRef.current = false;
    setIsLaunching(false);
    updatePhase('idle');
    setExhaustIntensity(0);

    const rocketEl = rocketRef?.current;
    if (rocketEl) {
      gsap.killTweensOf(rocketEl);
      gsap.set(rocketEl, { clearProps: 'transform,opacity,filter' });
    }

    const containerEl = containerRef?.current;
    if (containerEl) {
      gsap.killTweensOf(containerEl);
      gsap.set(containerEl, { clearProps: 'transform' });
    }

    const glowEl = glowRef?.current;
    if (glowEl) {
      gsap.killTweensOf(glowEl);
      gsap.set(glowEl, { clearProps: 'opacity,transform,filter' });
    }
  }, [cleanupAnimations, updatePhase, rocketRef, containerRef, glowRef]);

  // Main Launch Trigger
  const startLaunch = useCallback(
    (onCompleteOverride?: () => void) => {
      // Prevent repeated clicks / re-triggering while already launching
      if (isLaunchingRef.current) return;

      isLaunchingRef.current = true;
      setIsLaunching(true);
      cleanupAnimations();

      const finalCallback = () => {
        if (typeof onCompleteOverride === 'function') {
          onCompleteOverride();
        } else if (typeof onCompleteRef.current === 'function') {
          onCompleteRef.current();
        }
      };

      // -------------------------------------------------------------
      // Reduced Motion Mode: Short, gentle fade transition
      // -------------------------------------------------------------
      if (isReducedMotion) {
        updatePhase('activation');
        setExhaustIntensity(0.3);

        const t1 = window.setTimeout(() => {
          updatePhase('ignition');
          triggerIgnitionSound();
          setExhaustIntensity(0.6);
        }, 300);

        const t2 = window.setTimeout(() => {
          updatePhase('transition');
          setExhaustIntensity(1.0);
        }, 700);

        const t3 = window.setTimeout(() => {
          finalCallback();
        }, 1200);

        timeoutsRef.current.push(t1, t2, t3);
        return;
      }

      // -------------------------------------------------------------
      // Standard Motion: Full 4-Phase Cinematic Orchestration
      // -------------------------------------------------------------
      const rocketEl = rocketRef?.current;
      const containerEl = containerRef?.current;
      const glowEl = glowRef?.current;

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: 'power2.out' },
          onComplete: () => {
            // Sequence finished
          },
        });
        activeTimelineRef.current = tl;

        // Exhaust intensity proxy object for smooth tweening
        const intensityProxy = { value: 0 };

        // =========================================================
        // PHASE 1 — ACTIVATION (0.65s)
        // Engine glow ramps up, rocket micro-vibration, sparks appear
        // =========================================================
        tl.addLabel('phase1', 0);

        tl.call(() => {
          updatePhase('activation');
        }, undefined, 'phase1');

        // Ramp exhaust intensity to ~0.35
        tl.to(
          intensityProxy,
          {
            value: 0.35,
            duration: 0.65 * timeScale,
            ease: 'power1.in',
            onUpdate: () => setExhaustIntensity(intensityProxy.value),
          },
          'phase1'
        );

        // Rocket micro-vibration
        if (rocketEl) {
          tl.to(
            rocketEl,
            {
              x: 'random(-1.5, 1.5)',
              y: 'random(-1, 1)',
              repeat: 14,
              duration: (0.65 / 15) * timeScale,
              ease: 'rough({ template: none, strength: 1, points: 20, taper: none, randomize: true })',
            },
            'phase1'
          );
        }

        // Engine glow intensifies
        if (glowEl) {
          tl.to(
            glowEl,
            {
              opacity: 0.85,
              scale: 1.3,
              duration: 0.65 * timeScale,
              ease: 'power2.in',
            },
            'phase1'
          );
        }

        // =========================================================
        // PHASE 2 — IGNITION (1.0s)
        // Engine flame blast, audio trigger, volumetric cloud expands,
        // camera rumble begins, rocket starts accelerating upward
        // =========================================================
        const phase2Start = 0.65 * timeScale;
        tl.addLabel('phase2', phase2Start);

        tl.call(() => {
          updatePhase('ignition');
          triggerIgnitionSound();
        }, undefined, 'phase2');

        // Rapid jump in exhaust intensity from 0.35 to 0.85
        tl.to(
          intensityProxy,
          {
            value: 0.85,
            duration: 1.0 * timeScale,
            ease: 'power2.out',
            onUpdate: () => setExhaustIntensity(intensityProxy.value),
          },
          'phase2'
        );

        // Intense engine blast vibration & slight pre-liftoff rise
        if (rocketEl) {
          tl.to(
            rocketEl,
            {
              x: 'random(-3, 3)',
              y: '-=16',
              scaleY: 1.02,
              repeat: 20,
              duration: (1.0 / 21) * timeScale,
              ease: 'none',
            },
            'phase2'
          );
        }

        // Camera rumble on container
        if (containerEl) {
          tl.to(
            containerEl,
            {
              x: 'random(-2.5, 2.5)',
              y: 'random(-2, 2)',
              repeat: 16,
              duration: (1.0 / 17) * timeScale,
              ease: 'none',
            },
            'phase2'
          );
        }

        // Engine glow peaks
        if (glowEl) {
          tl.to(
            glowEl,
            {
              opacity: 1,
              scale: 2.2,
              duration: 0.8 * timeScale,
              ease: 'power3.out',
            },
            'phase2'
          );
        }

        // =========================================================
        // PHASE 3 — LIFTOFF (1.25s)
        // Rocket accelerates rapidly upward out of viewport,
        // camera rumble peaks, exhaust billows across lower screen
        // =========================================================
        const phase3Start = phase2Start + 1.0 * timeScale;
        tl.addLabel('phase3', phase3Start);

        tl.call(() => {
          updatePhase('liftoff');
        }, undefined, 'phase3');

        // Exhaust reaches maximum thrust intensity
        tl.to(
          intensityProxy,
          {
            value: 1.0,
            duration: 0.5 * timeScale,
            ease: 'power1.out',
            onUpdate: () => setExhaustIntensity(intensityProxy.value),
          },
          'phase3'
        );

        // Rocket accelerates vertically out of the viewport
        if (rocketEl) {
          const targetY = typeof window !== 'undefined' ? -window.innerHeight * 1.35 : -1200;
          tl.to(
            rocketEl,
            {
              y: targetY,
              duration: 1.25 * timeScale,
              ease: 'power3.in',
            },
            'phase3'
          );
        }

        // Camera shake reaches peak and gradually follows
        if (containerEl) {
          tl.to(
            containerEl,
            {
              x: 'random(-5, 5)',
              y: 'random(-4, 4)',
              repeat: 15,
              duration: (1.25 / 16) * timeScale,
              ease: 'none',
            },
            'phase3'
          );
          // Settle container shake
          tl.to(
            containerEl,
            {
              x: 0,
              y: 0,
              duration: 0.4 * timeScale,
              ease: 'power2.out',
            },
            `phase3+=${0.9 * timeScale}`
          );
        }

        // =========================================================
        // PHASE 4 — FULL-SCREEN TRANSITION (1.25s)
        // Volumetric smoke, dust & exhaust expand to 100% cover the
        // entire screen without gaps -> triggers State 2 transition
        // =========================================================
        const phase4Start = phase3Start + 1.25 * timeScale;
        tl.addLabel('phase4', phase4Start);

        tl.call(() => {
          updatePhase('transition');
        }, undefined, 'phase4');

        // Maintain full exhaust storm intensity
        tl.to(
          intensityProxy,
          {
            value: 1.0,
            duration: 1.25 * timeScale,
            onUpdate: () => setExhaustIntensity(intensityProxy.value),
          },
          'phase4'
        );

        // When smoke completely covers 100% of viewport (~0.85s into Phase 4),
        // trigger the transition callback to State 2 (Choose Your World)!
        tl.call(
          () => {
            finalCallback();
          },
          undefined,
          `phase4+=${0.85 * timeScale}`
        );
      });

      gsapCtxRef.current = ctx;
    },
    [
      isReducedMotion,
      timeScale,
      rocketRef,
      containerRef,
      glowRef,
      cleanupAnimations,
      updatePhase,
      triggerIgnitionSound,
    ]
  );

  return {
    launchPhase,
    isLaunching,
    startLaunch,
    resetLaunch,
    exhaustIntensity,
    phaseNumber: LAUNCH_PHASE_NUMBERS[launchPhase],
    isReducedMotion,
  };
}
