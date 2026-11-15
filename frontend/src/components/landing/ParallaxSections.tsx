import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mission, CelestialBody } from '../../types';
import { soundEffects } from '../../audio/soundEffects';
import {
  RocketIcon,
  SparklesIcon,
  ChevronRightIcon,
  ActivityIcon,
  CompassIcon,
  ShieldIcon,
  BookOpenIcon,
} from '../icons/Icons';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxSectionsProps {
  missions: Mission[];
  onSelectMission: (mission: Mission) => void;
  onExploreGlobe: (body: CelestialBody) => void;
}

export const ParallaxSections: React.FC<ParallaxSectionsProps> = ({
  missions,
  onSelectMission,
  onExploreGlobe,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.parallax-card');
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const apollo12 = missions.find(m => m.id === 'apollo-12');
  const sojourner = missions.find(m => m.id === 'mars-pathfinder-sojourner');
  const apollo15 = missions.find(m => m.id === 'apollo-15');

  return (
    <div ref={containerRef} className="relative w-full text-slate-100 py-20 px-6 overflow-hidden pointer-events-none">
      <div className="max-w-6xl mx-auto space-y-24">
        {/* Section 1: Apollo 12 */}
        {apollo12 && (
          <div className="parallax-card pointer-events-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-4 sm:p-6 relative">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center space-x-2 text-cyan-300 text-xs font-mono font-bold tracking-wider uppercase">
                <RocketIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span>Apollo 12 • November 19, 1969</span>
              </div>
              <h3 className="text-3xl sm:text-5xl font-black text-white font-cinematic-title tracking-tight uppercase leading-[0.95]">
                The Moon's Little <br />
                <span className="text-cyan-400">Science Laboratory</span>
              </h3>
              <p className="text-slate-200 leading-relaxed text-base sm:text-lg font-bold">
                Imagine travelling to the Moon, not just to explore it, but to build a permanent science laboratory there! Intrepid touched down in the Ocean of Storms just 180 meters from Surveyor 3. The nuclear-powered ALSEP instruments studied moonquakes, dust, and solar wind for nearly eight continuous years!
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-xs font-mono text-cyan-300 flex items-center space-x-1 py-1 pr-3 font-semibold">
                  ALSEP Seismometer
                </span>
                <span className="text-xs font-mono text-cyan-300 flex items-center space-x-1 py-1 pr-3 font-semibold">
                  72-Minute Moon Vibration
                </span>
                <span className="text-xs font-mono text-cyan-300 flex items-center space-x-1 py-1 pr-3 font-semibold">
                  Surveyor 3 Retrieval
                </span>
              </div>
              <div className="pt-4 flex items-center space-x-3">
                <button
                  onClick={() => {
                    soundEffects.playMarkerSelect();
                    onSelectMission(apollo12);
                  }}
                  className="btn-bouncy btn-primary px-5 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 cursor-pointer"
                >
                  <span>Explore Apollo 12 Story</span>
                  <ChevronRightIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    onExploreGlobe('moon');
                  }}
                  className="btn-bouncy btn-secondary px-4 py-2.5 rounded-xl text-slate-200 text-xs font-bold cursor-pointer"
                >
                  Locate on 3D Moon
                </button>
              </div>
            </div>

            {/* Right Telemetry Card */}
            <div className="lg:col-span-5 p-4 sm:p-6 space-y-4 font-mono text-xs">
              <div className="text-cyan-400 font-bold uppercase tracking-wider flex items-center justify-between pb-2">
                <span>LM-6 Intrepid Telemetry</span>
                <ActivityIcon className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="space-y-2 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-500">Landing Site:</span>
                  <span className="text-white font-bold">Ocean of Storms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Coordinates:</span>
                  <span className="text-cyan-300">3.0124° S, 23.4216° W</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Surface Stay:</span>
                  <span className="text-white">31.6 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Impact Vibration:</span>
                  <span className="text-emerald-400 font-bold">72 minutes continuous</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Power Source:</span>
                  <span className="text-white">SNAP-27 Plutonium RTG</span>
                </div>
              </div>
              <div className="py-2 text-cyan-200 text-xs italic leading-relaxed">
                "The instruments were like little detectives studying moonquakes, dust, and solar wind until NASA switched them off in 1977."
              </div>
            </div>
          </div>
        )}

        {/* Section 2: Sojourner */}
        {sojourner && (
          <div className="parallax-card pointer-events-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-4 sm:p-6 relative">
            <div className="lg:col-span-5 order-2 lg:order-1 p-4 sm:p-6 space-y-4 font-mono text-xs">
              <div className="text-indigo-400 font-bold uppercase tracking-wider flex items-center justify-between pb-2">
                <span>Sojourner Microrover Telemetry</span>
                <CompassIcon className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="space-y-2 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-500">Landing Date:</span>
                  <span className="text-white font-bold">July 4, 1997</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Landing Dynamics:</span>
                  <span className="text-cyan-300">15+ Airbag Bounces</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Landing Site:</span>
                  <span className="text-white">Ares Vallis (-3.6 km)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Designed Lifespan:</span>
                  <span className="text-slate-400">7 Sols</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Achieved Lifespan:</span>
                  <span className="text-emerald-400 font-bold">83 Sols (1,180%)</span>
                </div>
              </div>
              <div className="py-2 text-indigo-200 text-xs italic leading-relaxed">
                "BOING! BOING! BOING! We bounced on the Martian ground more than 15 times before finally stopping! What a landing!"
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-4">
              <div className="inline-flex items-center space-x-2 text-indigo-300 text-xs font-mono font-bold tracking-wider uppercase">
                <RocketIcon className="w-3.5 h-3.5 text-indigo-400" />
                <span>Mars Pathfinder • July 4, 1997</span>
              </div>
              <h3 className="text-3xl sm:text-5xl font-black text-white font-cinematic-title tracking-tight uppercase leading-[0.95]">
                Sojourner: The Little Robot <br />
                <span className="text-indigo-400">That Visited Mars</span>
              </h3>
              <p className="text-slate-200 leading-relaxed text-base sm:text-lg font-bold">
                A 10.5 kg microrover no larger than a microwave oven captured the world's imagination. Bouncing across Ares Vallis inside giant airbags, Sojourner rolled down its ramp and proved Mars once possessed running liquid water and a dynamic volcanic past.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-xs font-mono text-indigo-300 flex items-center space-x-1 py-1 pr-3 font-semibold">
                  APXS Spectrometer
                </span>
                <span className="text-xs font-mono text-indigo-300 flex items-center space-x-1 py-1 pr-3 font-semibold">
                  Barnacle Bill & Yogi Rocks
                </span>
                <span className="text-xs font-mono text-indigo-300 flex items-center space-x-1 py-1 pr-3 font-semibold">
                  Ancient Catastrophic Floodplain
                </span>
              </div>
              <div className="pt-4 flex items-center space-x-3">
                <button
                  onClick={() => {
                    soundEffects.playMarkerSelect();
                    onSelectMission(sojourner);
                  }}
                  className="btn-bouncy btn-indigo px-5 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 cursor-pointer"
                >
                  <span>Explore Sojourner Story</span>
                  <ChevronRightIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    onExploreGlobe('mars');
                  }}
                  className="btn-bouncy btn-secondary px-4 py-2.5 rounded-xl text-slate-200 text-xs font-bold cursor-pointer"
                >
                  Locate on 3D Mars
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Section 3: Apollo 15 */}
        {apollo15 && (
          <div className="parallax-card pointer-events-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-4 sm:p-6 relative">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center space-x-2 text-cyan-300 text-xs font-mono font-bold tracking-wider uppercase">
                <RocketIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span>Apollo 15 • July 30, 1971</span>
              </div>
              <h3 className="text-3xl sm:text-5xl font-black text-white font-cinematic-title tracking-tight uppercase leading-[0.95]">
                Falcon and The Great <br />
                <span className="text-cyan-400">Moon Adventure (A Moon Car!)</span>
              </h3>
              <p className="text-slate-200 leading-relaxed text-base sm:text-lg font-bold">
                In 1971, Falcon travelled to the Moon with David and Jim. The astronauts unfolded their special Lunar Rover, driving 27.8 km along the edge of Hadley Rille gorge, finding the 4.1-billion-year-old Genesis Rock, and dropping a hammer and feather in the vacuum!
              </p>
              <div className="pt-4 flex items-center space-x-3">
                <button
                  onClick={() => {
                    soundEffects.playMarkerSelect();
                    onSelectMission(apollo15);
                  }}
                  className="btn-bouncy btn-primary px-5 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 cursor-pointer"
                >
                  <span>Explore Apollo 15 Story</span>
                  <ChevronRightIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    onExploreGlobe('moon');
                  }}
                  className="btn-bouncy btn-secondary px-4 py-2.5 rounded-xl text-slate-200 text-xs font-bold cursor-pointer"
                >
                  Locate on 3D Moon
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 p-4 sm:p-6 space-y-3 font-mono text-xs">
              <div className="text-cyan-400 font-bold uppercase tracking-wider pb-2">
                LRV-1 Moon Car Specs
              </div>
              <div className="space-y-1.5 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-500">Traverse Distance:</span>
                  <span className="text-white font-bold">27.76 km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Top Speed:</span>
                  <span className="text-white">12 km/h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Genesis Rock:</span>
                  <span className="text-cyan-300 font-bold">4.1 Billion Years Old</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Current Status:</span>
                  <span className="text-emerald-400">Parked at Hadley Base</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
