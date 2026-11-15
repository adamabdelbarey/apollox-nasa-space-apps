import { Mission, ArchiveChapter, CelestialBody } from '../types';
import { LUNAR_MISSIONS } from './missions/lunar';
import { MARTIAN_MISSIONS } from './missions/martian';
import { BEYOND_MISSIONS } from './missions/beyond';

export { LUNAR_MISSIONS } from './missions/lunar';
export { MARTIAN_MISSIONS } from './missions/martian';
export { BEYOND_MISSIONS } from './missions/beyond';

// Combined master catalogue of all 12 missions
export const MISSIONS_DATA: Mission[] = [
  ...LUNAR_MISSIONS,
  ...MARTIAN_MISSIONS,
  ...BEYOND_MISSIONS
];

// Query helpers
export const getMissionsByChapter = (chapter: ArchiveChapter): Mission[] => {
  return MISSIONS_DATA.filter(m => m.archiveChapter === chapter);
};

export const getMissionsByBody = (body: CelestialBody): Mission[] => {
  return MISSIONS_DATA.filter(m => m.celestialBody === body);
};

export const getMissionById = (id: string): Mission | undefined => {
  return MISSIONS_DATA.find(m => m.id === id);
};
