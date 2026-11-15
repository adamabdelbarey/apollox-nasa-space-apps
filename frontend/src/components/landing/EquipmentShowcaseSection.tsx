import React, { useState, useEffect, useRef } from 'react';
import { SpacecraftViewer } from '../canvas/SpacecraftViewer';
import { MISSIONS_DATA } from '../../data/missions';
import { Mission, CelestialBody } from '../../types';
import { soundEffects } from '../../audio/soundEffects';
import {
  SparklesIcon,
  CompassIcon,
  ActivityIcon,
  ShieldIcon,
  CheckIcon,
  BookOpenIcon,
} from '../icons/Icons';

export interface EquipmentShowcaseSectionProps {
  onSelectMission: (mission: Mission) => void;
  onExploreGlobe: (body: CelestialBody, mission: Mission) => void;
}

interface EquipmentItem {
  id: string;
  missionId: string;
  name: string;
  nickname: string;
  role: string;
  celestialBody: CelestialBody;
  modelUrl: string;
  variants?: { label: string; url: string }[];
  highlight: string;
  punchyLine1: string;
  punchyLine2: string;
  kidSpecs: {
    weight: string;
    power: string;
    superStat: string;
    secretFeature: string;
  };
  instrumentsLeftBehind: string[];
  funnyFact: string;
}

export const EquipmentShowcaseSection: React.FC<EquipmentShowcaseSectionProps> = ({
  onSelectMission,
  onExploreGlobe,
}) => {
  const equipmentList: EquipmentItem[] = [
    {
      id: 'ingenuity',
      missionId: 'ingenuity',
      name: 'Ingenuity Mars Helicopter',
      nickname: 'Ginny the Helicopter',
      role: 'The Tiny Flying Machine',
      celestialBody: 'mars',
      modelUrl: '/models/ingenuity.glb',
      highlight: 'First helicopter ever to fly in the thin air of Mars!',
      punchyLine1: 'Ginny is a tiny 1.8 kg helicopter with two spinning carbon-fiber blades!',
      punchyLine2: 'Everyone said flying on Mars was impossible, but Ginny flew 72 times across red sand dunes!',
      kidSpecs: {
        weight: 'Super light! Only 1.8 kg (about 4 lbs)',
        power: 'Solar wings charging tiny batteries',
        superStat: 'Completed 72 high-flying missions!',
        secretFeature: 'Carries a piece of the 1903 Wright Brothers airplane wing!',
      },
      instrumentsLeftBehind: [
        'Twin carbon rotor blades resting peacefully on Valinor Hills',
        'Original 1903 Wright Brothers flyer fabric taped under the solar wing',
        'Four springy landing legs that survived 72 landings',
      ],
      funnyFact:
        'NASA only planned 5 short test hops. Ginny was so tough she flew 72 times and became a flying scout for Perseverance!',
    },
    {
      id: 'insight',
      missionId: 'insight',
      name: 'InSight Mars Lander',
      nickname: 'InSight the Planet Doctor',
      role: 'The Robot with Super Sensitive Ears',
      celestialBody: 'mars',
      modelUrl: '/models/insight_arm.glb',
      variants: [
        { label: 'Robot Arm Out', url: '/models/insight_arm.glb' },
        { label: 'Solar Wings Open', url: '/models/insight_panels.glb' },
        { label: 'Wings Folded', url: '/models/insight_panels_stowed.glb' },
        { label: 'Cruise Mode', url: '/models/insight_stowed.glb' },
      ],
      highlight: 'Listened to the heartbeat and earthquakes of Mars!',
      punchyLine1: 'InSight is a friendly robot doctor who sat in one spot and listened to Mars!',
      punchyLine2: 'Its robotic arm gently placed a super-sensitive dome on the red dirt to hear over 1,300 marsquakes!',
      kidSpecs: {
        weight: '358 kg on the surface of Mars',
        power: 'Two big round solar wings like giant umbrellas',
        superStat: 'Listened to Mars for over 4 whole years!',
        secretFeature: 'Click the buttons below to open its arm or wings!',
      },
      instrumentsLeftBehind: [
        'SEIS round dome listening instrument resting on the dirt',
        'HP3 mole heat probe burrowed into the Martian soil',
        'Robotic arm with a claw resting beside the lander footpad',
      ],
      funnyFact:
        'Before battery power faded, InSight detected over 1,319 Marsquakes, proving the Red Planet is not a dead rock!',
    },
    {
      id: 'mer_rover',
      missionId: 'opportunity',
      name: 'Mars Exploration Rover (Spirit & Opportunity)',
      nickname: 'Spirit & Oppy: The Robot Twins',
      role: 'The Six-Wheeled Mars Dune Buggies',
      celestialBody: 'mars',
      modelUrl: '/models/mer_rover.glb',
      highlight: 'Discovered ancient water clues and drove 45 kilometers!',
      punchyLine1: 'Twin robot explorers with 6 wheels that rolled across Mars for years!',
      punchyLine2: 'Opportunity was supposed to last only 3 months, but kept driving for nearly 15 years!',
      kidSpecs: {
        weight: '185 kg (like a friendly big pony)',
        power: 'Solar panels spread out like wings on its back',
        superStat: 'Opportunity drove 45 kilometers for 14+ years!',
        secretFeature: 'A robotic arm with a rock-grinding tool to study rocks!',
      },
      instrumentsLeftBehind: [
        'Six cleated aluminum wheels parked at Endeavour Crater',
        'Camera mast pointing toward the horizon across red sand dunes',
        'Tire tracks carved into the Martian dust for 45 kilometers',
      ],
      funnyFact:
        'When Spirit front wheel jammed, drivers dragged it backward. The jammed wheel scraped a trench that accidentally uncovered ancient volcanic hot springs!',
    },
    {
      id: 'dawn',
      missionId: 'near-shoemaker',
      name: 'Dawn Asteroid Explorer',
      nickname: 'Dawn the Asteroid Detective',
      role: 'The Blue Glowing Ion Spaceship',
      celestialBody: 'asteroid',
      modelUrl: '/models/Dawn.glb',
      highlight: 'Visited two giant space worlds: Vesta and Ceres!',
      punchyLine1: 'Dawn is an amazing spaceship with glowing blue ion rocket engines!',
      punchyLine2: 'It visited giant asteroid Vesta, then flew to dwarf planet Ceres and found glowing white salt spots!',
      kidSpecs: {
        weight: 'Huge wings spanning nearly 20 meters across!',
        power: 'Glowing blue xenon ion rocket engines',
        superStat: 'Traveled 6.9 billion kilometers over 11 years!',
        secretFeature: 'Found glowing white salt mountains on Ceres!',
      },
      instrumentsLeftBehind: [
        'Dawn remains in a peaceful, silent orbit around dwarf planet Ceres',
        'Framing cameras and mapping sensors in deep-space slumber',
        'Three blue-glowing ion engines that worked for years',
      ],
      funnyFact:
        'Dawn glowing blue ion engines pushed with the gentle force of a single piece of paper, yet carried it across billions of kilometers!',
    },
  ];

  const [activeEquipmentId, setActiveEquipmentId] = useState<string>('ingenuity');
  const [activeModelVariant, setActiveModelVariant] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const activeItem = equipmentList.find((e) => e.id === activeEquipmentId) || equipmentList[0];
  const activeMission = MISSIONS_DATA.find((m) => m.id === activeItem.missionId) || MISSIONS_DATA[0];

  const currentModelUrl = activeModelVariant || activeItem.modelUrl;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleSelectEquipment = (item: EquipmentItem) => {
    soundEffects.playClick();
    setActiveEquipmentId(item.id);
    setActiveModelVariant(item.variants ? item.variants[0].url : null);
  };

  const handleScrollToMission = () => {
    soundEffects.playClick();
    const el = document.getElementById(`mission-${activeItem.missionId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="equipment-showcase"
      className="relative w-full py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col space-y-16 bg-transparent select-none"
    >
      {/* 1. Header Banner (No Background!) */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800 text-xs font-black text-cyan-300 uppercase tracking-wider">
          <SparklesIcon className="w-4 h-4 text-cyan-400" />
          <span>ROBOT PLAYGROUND • INTERACTIVE 3D MODELS</span>
        </div>

        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-cinematic-title text-white tracking-tight uppercase leading-[0.95]">
          MEET THE SPACE ROBOTS IN 3D!
        </h2>

        <p className="text-xl sm:text-2xl text-slate-200 font-black leading-snug max-w-2xl mx-auto">
          Spin them around, zoom in, and watch them move across space as you scroll!
        </p>

        {/* Equipment Selector Chips */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          {equipmentList.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelectEquipment(item)}
              className={`btn-bouncy px-4 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer flex items-center space-x-2 ${
                activeEquipmentId === item.id
                  ? 'btn-primary'
                  : 'btn-secondary text-slate-300'
              }`}
            >
              <ActivityIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>{item.nickname}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Interactive 3D Showcase Panel (Completely Transparent, No Background Box!) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-transparent">
        {/* Left Column: Interactive 3D Model Moving around the Text! */}
        <div className="lg:col-span-6 relative w-full flex flex-col items-center justify-center">
          {/* 3D WebGL Canvas (100% Transparent, No Background, Model Moves Dynamically on Scroll!) */}
          <div className="relative w-full h-[440px] sm:h-[520px]">
            <SpacecraftViewer
              mission={activeMission}
              modelUrl={currentModelUrl}
              height="100%"
              className="w-full h-full"
            />
          </div>

          {/* InSight Deployment State Switcher */}
          {activeItem.variants && (
            <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-2xl bg-slate-900/80 border-2 border-slate-700 text-xs">
              <span className="text-slate-400 px-1 font-bold">Move Parts:</span>
              {activeItem.variants.map((v) => (
                <button
                  key={v.url}
                  onClick={() => {
                    soundEffects.playClick();
                    setActiveModelVariant(v.url);
                  }}
                  className={`btn-bouncy px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    currentModelUrl === v.url
                      ? 'btn-primary text-white font-black'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          )}

          <div className="mt-2 text-xs font-bold text-slate-300 text-center">
            Tip: Drag model with mouse or finger to spin in 3D!
          </div>
        </div>

        {/* Right Column: Giant Bold Lines Appearing Line by Line! */}
        <div className="lg:col-span-6 flex flex-col space-y-6 text-left">
          {/* Line 1: Role & Name */}
          <div
            className={`space-y-1 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="text-xs text-cyan-400 font-bold uppercase tracking-wider">
              {activeItem.role}
            </div>
            <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black font-cinematic-title text-white uppercase leading-[0.95]">
              {activeItem.name}
            </h3>
          </div>

          {/* Line 2: Superpower Highlight */}
          <div
            className={`text-2xl sm:text-3xl font-black text-cyan-300 leading-tight transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {activeItem.highlight}
          </div>

          {/* Line 3: Punchy Story Line 1 */}
          <p
            className={`text-xl sm:text-2xl font-black text-slate-100 leading-snug transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {activeItem.punchyLine1}
          </p>

          {/* Line 4: Punchy Story Line 2 */}
          <p
            className={`text-lg sm:text-xl font-black text-slate-200 leading-snug transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {activeItem.punchyLine2}
          </p>

          {/* Line 5: Funny Fact Callout */}
          <div
            className={`p-4 rounded-2xl bg-cyan-950/30 border-2 border-cyan-800/80 space-y-1 transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="text-xs font-black text-indigo-300 uppercase tracking-wider block">
              Funny Fact You Didn't Know:
            </span>
            <p className="text-sm sm:text-base font-bold text-slate-100 leading-relaxed">
              {activeItem.funnyFact}
            </p>
          </div>

          {/* Line 6: Bottom Action Buttons */}
          <div
            className={`pt-2 flex flex-wrap items-center gap-3.5 transition-all duration-700 delay-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <button
              onClick={handleScrollToMission}
              className="btn-bouncy btn-primary px-4 py-2.5 rounded-2xl text-xs font-black text-white flex items-center space-x-2 cursor-pointer"
            >
              <BookOpenIcon className="w-4 h-4 text-white" />
              <span>Read Full Adventure Story</span>
            </button>

            {activeItem.celestialBody !== 'asteroid' && (
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onExploreGlobe(activeItem.celestialBody, activeMission);
                }}
                className="btn-bouncy btn-secondary px-4 py-2.5 rounded-2xl text-xs font-black text-slate-200 flex items-center space-x-2 cursor-pointer"
              >
                <CompassIcon className="w-4 h-4 text-cyan-400" />
                <span>Locate on 3D Globe</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
