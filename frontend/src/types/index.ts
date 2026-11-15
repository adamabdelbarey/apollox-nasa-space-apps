export type CelestialBody = 'moon' | 'mars' | 'asteroid';

export type ArchiveChapter = 'lunar' | 'martian' | 'beyond';

export type AudienceMode = 'documentary' | 'junior';

export interface Coordinates {
  lat: number;
  lng: number;
  elevationKm?: number;
  siteName: string;
  selectionReason?: string;
  geologicalFeatures?: string[];
  nearbyMissions?: string[];
}

export interface ScienceInstrument {
  id: string;
  name: string;
  acronym?: string;
  purpose: string;
  discovery: string;
  status: string;
  iconName?: string;
}

export interface NarrativeStage {
  stageNumber: 1 | 2 | 3 | 4 | 5 | 6;
  stageTitle: string;
  documentaryTitle: string;
  juniorTitle: string;
  documentaryText: string;
  juniorText: string;
  highlightFacts: string[];
  scientificDetails?: {
    label: string;
    value: string;
  }[];
  imageUrl?: string;
  quote?: {
    speaker: string;
    text: string;
  };
}

export interface RemainingArtifact {
  name: string;
  description: string;
  condition: string;
  coordinates: string;
  significance: string;
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  type: 'launch' | 'transit' | 'landing' | 'milestone' | 'end';
}

export interface LifetimeMetric {
  sols?: number;
  earthDays: number;
  earthYears?: string;
  plannedDuration?: string;
  achievedRatio?: string;
  isStillActive?: boolean;
  notes?: string;
}

export interface SpacecraftComponentHotspot {
  id: string;
  name: string;
  position: [number, number, number];
  description: string;
  technicalRole?: string;
}

export interface ModelConfig {
  modelUrl: string;
  modelType: 'gltf' | 'procedural';
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  hotspots?: SpacecraftComponentHotspot[];
}

export interface MissionLegacy {
  hardwareRemaining: string[];
  scientificInstruments: string[];
  keyDiscoveries: string[];
  ongoingSignificance: string;
}

export interface Mission {
  id: string;
  name: string;
  codeName?: string;
  spacecraftName: string;
  spacecraftType: 'Lunar Module' | 'Rover' | 'Interplanetary Probe' | 'Lander & Rover' | 'Lander' | 'Helicopter' | 'Orbiter & Lander' | 'Space Telescope';
  celestialBody: CelestialBody;
  archiveChapter: ArchiveChapter;
  launchDate: string;
  landingDate?: string;
  missionEndDate: string;
  crew?: string[];
  coordinates: Coordinates;
  summary: string;
  juniorHook: string;
  storyTitle?: string;
  storyText?: string;
  audioUrl?: string;
  archiveImageUrl?: string;
  archiveImageCaption?: string;
  badgeEmoji: string;
  primaryColor: string;
  accentColor: string;
  modelConfig?: ModelConfig;
  timeline: TimelineEvent[];
  lifetime: LifetimeMetric;
  legacy: MissionLegacy;
  stages: NarrativeStage[];
  instruments: ScienceInstrument[];
  artifacts: RemainingArtifact[];
  technicalSpecs: {
    massKg: number | string;
    powerSource: string;
    missionDuration: string;
    distanceTraveled?: string;
    communicationsFreq?: string;
  };
  sources?: {
    title: string;
    url: string;
  }[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  missionId?: string;
  isStreaming?: boolean;
}

export interface TTSVoiceOption {
  voice: SpeechSynthesisVoice;
  displayName: string;
}
