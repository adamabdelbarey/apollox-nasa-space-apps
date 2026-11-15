import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SparklesIcon, CompassIcon, ActivityIcon } from '../icons/Icons';

gsap.registerPlugin(ScrollTrigger);

export const ParallaxScrollStory: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const revealItems = gsap.utils.toArray<HTMLElement>('.scroll-reveal-text');
      revealItems.forEach((item) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="story-scroll"
      ref={containerRef}
      className="relative w-full py-28 px-4 sm:px-8 lg:px-12 overflow-hidden pointer-events-none"
    >
      <div className="max-w-5xl mx-auto space-y-48">
        {/* Story Beat 1: The Planetary Crossing (Completely Transparent, Zero Borders, Zero Background) */}
        <div className="scroll-reveal-text pointer-events-auto p-4 sm:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center space-x-2 text-cyan-300 text-xs font-bold tracking-wider uppercase">
                <CompassIcon className="w-4 h-4 text-cyan-400" />
                <span>PLANET FUN FACTS • WATCH THEM PLAY TAG!</span>
              </div>
              <h3 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white font-cinematic-title tracking-tight uppercase leading-[0.95]">
                Mars is Twice as Big as the Moon!
              </h3>
              <p className="text-slate-100 text-lg sm:text-xl leading-relaxed font-bold">
                Watch them swap sides as you scroll down! The Moon swoops across in front, while giant Red Mars swings behind. You can grab either planet with your mouse or finger to spin them while they fly!
              </p>
            </div>

            {/* Transparent Telemetry Stats */}
            <div className="flex flex-row md:flex-col gap-6 shrink-0">
              <div className="text-left md:text-right">
                <div className="text-xs sm:text-sm font-black text-slate-300 uppercase tracking-wider">Moon Size</div>
                <div className="text-3xl sm:text-4xl font-black font-cinematic-num text-cyan-300">1,737 km</div>
                <div className="text-xs text-cyan-400 font-bold">The Little Brother!</div>
              </div>
              <div className="text-left md:text-right">
                <div className="text-xs sm:text-sm font-black text-slate-300 uppercase tracking-wider">Mars Size</div>
                <div className="text-3xl sm:text-4xl font-black font-cinematic-num text-indigo-300">3,390 km</div>
                <div className="text-xs text-indigo-400 font-bold">Almost 2x Bigger!</div>
              </div>
            </div>
          </div>
        </div>

        {/* Story Beat 2: Human Footsteps & Airbags (Completely Transparent, Zero Borders, Zero Background) */}
        <div className="scroll-reveal-text pointer-events-auto p-4 sm:p-6">
          <div className="flex flex-col md:flex-row-reverse md:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center space-x-2 text-indigo-300 text-xs font-bold tracking-wider uppercase">
                <ActivityIcon className="w-4 h-4 text-indigo-400" />
                <span>SPACE ADVENTURE • MOON BOOTS & MARS ROVERS</span>
              </div>
              <h3 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white font-cinematic-title tracking-tight uppercase leading-[0.95]">
                From Kangaroo Hops to Mars Dune Buggies!
              </h3>
              <p className="text-slate-100 text-lg sm:text-xl leading-relaxed font-bold">
                Twelve brave astronauts hopped across the Moon like kangaroos, leaving footprints in powdery grey dust. And on Mars, tough robots bounced down in giant airbags like huge beach balls and drove across red sand dunes!
              </p>
            </div>

            {/* Transparent Telemetry Stats */}
            <div className="flex flex-row md:flex-col gap-6 shrink-0">
              <div className="text-left">
                <div className="text-xs sm:text-sm font-black text-slate-300 uppercase tracking-wider">Moon Walks</div>
                <div className="text-3xl sm:text-4xl font-black font-cinematic-num text-cyan-300">12 Astronauts</div>
                <div className="text-xs text-cyan-400 font-bold">Hopped & Collected Rocks</div>
              </div>
              <div className="text-left">
                <div className="text-xs sm:text-sm font-black text-slate-300 uppercase tracking-wider">Mars Landings</div>
                <div className="text-3xl sm:text-4xl font-black font-cinematic-num text-indigo-300">Robot Pioneers</div>
                <div className="text-xs text-indigo-400 font-bold">Bounced in Airbags & Flew!</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
