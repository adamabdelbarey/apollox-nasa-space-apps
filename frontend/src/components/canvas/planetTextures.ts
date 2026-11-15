import * as THREE from 'three';
import { createMoonTexture, createMarsTexture } from './textureGenerator';

interface PlanetTextures {
  color: THREE.Texture;
  bump?: THREE.Texture;
}

let cachedMoonTextures: PlanetTextures | null = null;
let cachedMarsTextures: PlanetTextures | null = null;

const defaultTextureLoader = new THREE.TextureLoader();

/**
 * Loads the user-provided high-resolution planetary texture maps:
 * - Moon: /textures/moon.jpeg + /textures/heightmap_moon.jpeg
 * - Mars: /textures/mars.jpeg
 *
 * Uses procedural fallbacks if textures are loading or fail.
 */
export function getPlanetTextures(world: 'moon' | 'mars', manager?: THREE.LoadingManager): PlanetTextures {
  const loader = manager ? new THREE.TextureLoader(manager) : defaultTextureLoader;
  if (world === 'moon') {
    if (!cachedMoonTextures) {
      // Create fallback from procedural generator immediately
      const fallback = createMoonTexture();

      // Load uploaded full-color moon map
      const colorMap = loader.load(
        '/textures/moon.jpeg',
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.needsUpdate = true;
        },
        undefined,
        () => {
          // Fallback to moon_color.jpg
          loader.load('/textures/moon_color.jpg', (fallbackTex) => {
            fallbackTex.colorSpace = THREE.SRGBColorSpace;
            if (cachedMoonTextures) cachedMoonTextures.color = fallbackTex;
          });
        }
      );
      colorMap.colorSpace = THREE.SRGBColorSpace;

      // Load uploaded elevation / bump map
      const bumpMap = loader.load(
        '/textures/heightmap_moon.jpeg',
        (tex) => {
          tex.needsUpdate = true;
        },
        undefined,
        () => {
          loader.load('/textures/moon_elevation.jpg', (fallbackBump) => {
            if (cachedMoonTextures) cachedMoonTextures.bump = fallbackBump;
          });
        }
      );

      cachedMoonTextures = {
        color: colorMap || fallback.diffuse,
        bump: bumpMap || fallback.bump,
      };
    }
    return cachedMoonTextures;
  } else {
    if (!cachedMarsTextures) {
      const fallback = createMarsTexture();

      // Load uploaded full-color mars map
      const colorMap = loader.load(
        '/textures/mars.jpeg',
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.needsUpdate = true;
        },
        undefined,
        () => {
          loader.load('/textures/mars_color.jpg', (fallbackTex) => {
            fallbackTex.colorSpace = THREE.SRGBColorSpace;
            if (cachedMarsTextures) cachedMarsTextures.color = fallbackTex;
          });
        }
      );
      colorMap.colorSpace = THREE.SRGBColorSpace;

      cachedMarsTextures = {
        color: colorMap || fallback.diffuse,
        bump: fallback.bump,
      };
    }
    return cachedMarsTextures;
  }
}
