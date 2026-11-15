import * as THREE from 'three';

/**
 * Procedural texture generator for photorealistic Moon and Mars surfaces.
 * Generates ultra-crisp procedural canvas textures without relying on huge external network downloads.
 */

// Simple pseudo-random hash for reproducible noise
function pseudoRandom(x: number, y: number): number {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453123;
  return n - Math.floor(n);
}

// 2D Smooth Value Noise
function noise2D(x: number, y: number): number {
  const i = Math.floor(x);
  const j = Math.floor(y);
  const fX = x - i;
  const fY = y - j;

  // Smoothstep interpolation
  const u = fX * fX * (3.0 - 2.0 * fX);
  const v = fY * fY * (3.0 - 2.0 * fY);

  const a = pseudoRandom(i, j);
  const b = pseudoRandom(i + 1, j);
  const c = pseudoRandom(i, j + 1);
  const d = pseudoRandom(i + 1, j + 1);

  return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v;
}

// Fractal Brownian Motion (fBM)
function fbm(x: number, y: number, octaves = 6): number {
  let value = 0;
  let amplitude = 0.5;
  let frequency = 1;
  let maxValue = 0;

  for (let o = 0; o < octaves; o++) {
    value += noise2D(x * frequency, y * frequency) * amplitude;
    maxValue += amplitude;
    amplitude *= 0.5;
    frequency *= 2;
  }
  return value / maxValue;
}

/**
 * Generates realistic Moon diffuse texture with dark maria, crater rays, and highland regolith.
 */
export function createMoonTexture(): { diffuse: THREE.CanvasTexture; bump: THREE.CanvasTexture } {
  const width = 1024;
  const height = 512;

  const canvasDiffuse = document.createElement('canvas');
  canvasDiffuse.width = width;
  canvasDiffuse.height = height;
  const ctxD = canvasDiffuse.getContext('2d')!;

  const canvasBump = document.createElement('canvas');
  canvasBump.width = width;
  canvasBump.height = height;
  const ctxB = canvasBump.getContext('2d')!;

  const imgDataD = ctxD.createImageData(width, height);
  const imgDataB = ctxB.createImageData(width, height);
  const dataD = imgDataD.data;
  const dataB = imgDataB.data;

  for (let y = 0; y < height; y++) {
    const v = y / height;
    const lat = (v - 0.5) * Math.PI;

    for (let x = 0; x < width; x++) {
      const u = x / width;
      const lng = u * 2 * Math.PI;

      // Map equirectangular coordinates to 3D sphere point to avoid severe seam distortion
      const nx = Math.cos(lat) * Math.sin(lng);
      const ny = Math.sin(lat);
      const nz = Math.cos(lat) * Math.cos(lng);

      // Multi-frequency noise
      const n1 = fbm(nx * 4 + 10, ny * 4 + 10, 6);
      const n2 = fbm(nx * 12 + 50, ny * 12 + 50, 4);
      const combined = n1 * 0.7 + n2 * 0.3;

      // Maria simulation: smooth lowlands in certain hemispheres (Ocean of Storms, Mare Tranquillitatis)
      const mariaDist1 = Math.hypot(nx - 0.4, ny - 0.1, nz - 0.5); // Near-side maria
      const isMaria = mariaDist1 < 0.6 ? Math.sin((0.6 - mariaDist1) / 0.6 * Math.PI / 2) : 0;

      // Base lunar brightness (0-255)
      let brightness = 140 + combined * 70 - isMaria * 65;
      brightness = Math.max(35, Math.min(235, brightness));

      // Bump elevation (higher for highlands, lower for smooth maria)
      let bumpVal = combined * 180 - isMaria * 60;
      bumpVal = Math.max(20, Math.min(255, bumpVal));

      const idx = (y * width + x) * 4;

      // Diffuse RGBA (cool silver-grey with slight warm tint)
      dataD[idx] = brightness * 0.98;
      dataD[idx + 1] = brightness * 0.96;
      dataD[idx + 2] = brightness * 0.94;
      dataD[idx + 3] = 255;

      // Bump RGBA
      dataB[idx] = bumpVal;
      dataB[idx + 1] = bumpVal;
      dataB[idx + 2] = bumpVal;
      dataB[idx + 3] = 255;
    }
  }

  ctxD.putImageData(imgDataD, 0, 0);
  ctxB.putImageData(imgDataB, 0, 0);

  // Paint distinct crater ray rings (e.g. Tycho-like crater ray splash)
  const drawCraterRays = (cx: number, cy: number, r: number) => {
    const gradient = ctxD.createRadialGradient(cx, cy, 2, cx, cy, r * 4);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(0.15, 'rgba(230, 230, 240, 0.5)');
    gradient.addColorStop(0.4, 'rgba(200, 200, 210, 0.15)');
    gradient.addColorStop(1, 'rgba(200, 200, 210, 0)');

    ctxD.fillStyle = gradient;
    ctxD.beginPath();
    ctxD.arc(cx, cy, r * 4, 0, Math.PI * 2);
    ctxD.fill();

    // Crater rim
    ctxB.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctxB.beginPath();
    ctxB.arc(cx, cy, r, 0, Math.PI * 2);
    ctxB.stroke();
  };

  drawCraterRays(width * 0.45, height * 0.7, 14); // Tycho
  drawCraterRays(width * 0.38, height * 0.38, 11); // Copernicus
  drawCraterRays(width * 0.32, height * 0.35, 9); // Kepler

  const diffuse = new THREE.CanvasTexture(canvasDiffuse);
  diffuse.wrapS = THREE.RepeatWrapping;
  diffuse.wrapT = THREE.ClampToEdgeWrapping;

  const bump = new THREE.CanvasTexture(canvasBump);
  bump.wrapS = THREE.RepeatWrapping;
  bump.wrapT = THREE.ClampToEdgeWrapping;

  return { diffuse, bump };
}

/**
 * Generates realistic Mars diffuse texture with red rust deserts, dark basaltic volcanic zones,
 * Valles Marineris canyon rift, and white polar ice caps.
 */
export function createMarsTexture(): { diffuse: THREE.CanvasTexture; bump: THREE.CanvasTexture } {
  const width = 1024;
  const height = 512;

  const canvasDiffuse = document.createElement('canvas');
  canvasDiffuse.width = width;
  canvasDiffuse.height = height;
  const ctxD = canvasDiffuse.getContext('2d')!;

  const canvasBump = document.createElement('canvas');
  canvasBump.width = width;
  canvasBump.height = height;
  const ctxB = canvasBump.getContext('2d')!;

  const imgDataD = ctxD.createImageData(width, height);
  const imgDataB = ctxB.createImageData(width, height);
  const dataD = imgDataD.data;
  const dataB = imgDataB.data;

  for (let y = 0; y < height; y++) {
    const v = y / height;
    const lat = (v - 0.5) * Math.PI;
    const absLat = Math.abs(lat);

    for (let x = 0; x < width; x++) {
      const u = x / width;
      const lng = u * 2 * Math.PI;

      const nx = Math.cos(lat) * Math.sin(lng);
      const ny = Math.sin(lat);
      const nz = Math.cos(lat) * Math.cos(lng);

      const n1 = fbm(nx * 3.5 + 20, ny * 3.5 + 20, 6);
      const n2 = fbm(nx * 9 + 80, ny * 9 + 80, 4);
      const combined = n1 * 0.75 + n2 * 0.25;

      // Dark basaltic plains (Syrtis Major, Acidalia Planitia)
      const darkPatch = Math.sin(nx * 3) * Math.cos(nz * 3) * 0.5 + 0.5;
      const isDarkVolcanic = darkPatch > 0.65 ? (darkPatch - 0.65) * 2.5 : 0;

      // Base Martian palette: rich rust red to orange ochre
      let r = 180 + combined * 55 - isDarkVolcanic * 60;
      let g = 85 + combined * 45 - isDarkVolcanic * 35;
      let b = 45 + combined * 35 - isDarkVolcanic * 20;

      let bumpVal = combined * 180;

      // Polar ice caps (frozen CO2 and H2O)
      if (absLat > 1.25) {
        const iceIntensity = Math.min(1.0, (absLat - 1.25) / 0.25);
        r = r * (1 - iceIntensity) + 245 * iceIntensity;
        g = g * (1 - iceIntensity) + 248 * iceIntensity;
        b = b * (1 - iceIntensity) + 255 * iceIntensity;
        bumpVal = bumpVal * (1 - iceIntensity) + 230 * iceIntensity;
      }

      const idx = (y * width + x) * 4;
      dataD[idx] = Math.max(0, Math.min(255, r));
      dataD[idx + 1] = Math.max(0, Math.min(255, g));
      dataD[idx + 2] = Math.max(0, Math.min(255, b));
      dataD[idx + 3] = 255;

      dataB[idx] = Math.max(0, Math.min(255, bumpVal));
      dataB[idx + 1] = Math.max(0, Math.min(255, bumpVal));
      dataB[idx + 2] = Math.max(0, Math.min(255, bumpVal));
      dataB[idx + 3] = 255;
    }
  }

  ctxD.putImageData(imgDataD, 0, 0);
  ctxB.putImageData(imgDataB, 0, 0);

  // Paint Valles Marineris canyon rift
  ctxD.strokeStyle = 'rgba(60, 20, 10, 0.75)';
  ctxD.lineWidth = 6;
  ctxD.beginPath();
  ctxD.moveTo(width * 0.42, height * 0.56);
  ctxD.bezierCurveTo(width * 0.48, height * 0.58, width * 0.55, height * 0.55, width * 0.62, height * 0.58);
  ctxD.stroke();

  // Bump canyon incision
  ctxB.strokeStyle = 'rgba(0, 0, 0, 0.8)';
  ctxB.lineWidth = 6;
  ctxB.beginPath();
  ctxB.moveTo(width * 0.42, height * 0.56);
  ctxB.bezierCurveTo(width * 0.48, height * 0.58, width * 0.55, height * 0.55, width * 0.62, height * 0.58);
  ctxB.stroke();

  // Paint Olympus Mons caldera
  const drawVolcano = (cx: number, cy: number, r: number) => {
    const grad = ctxD.createRadialGradient(cx, cy, 2, cx, cy, r);
    grad.addColorStop(0, '#5a1f12');
    grad.addColorStop(0.3, '#7d2b17');
    grad.addColorStop(0.7, '#c25835');
    grad.addColorStop(1, 'rgba(194, 88, 53, 0)');
    ctxD.fillStyle = grad;
    ctxD.beginPath();
    ctxD.arc(cx, cy, r, 0, Math.PI * 2);
    ctxD.fill();

    const bumpGrad = ctxB.createRadialGradient(cx, cy, 2, cx, cy, r);
    bumpGrad.addColorStop(0, 'white');
    bumpGrad.addColorStop(0.5, 'rgb(220, 220, 220)');
    bumpGrad.addColorStop(1, 'rgb(128, 128, 128)');
    ctxB.fillStyle = bumpGrad;
    ctxB.beginPath();
    ctxB.arc(cx, cy, r, 0, Math.PI * 2);
    ctxB.fill();
  };

  drawVolcano(width * 0.35, height * 0.48, 22); // Olympus Mons

  const diffuse = new THREE.CanvasTexture(canvasDiffuse);
  diffuse.wrapS = THREE.RepeatWrapping;
  diffuse.wrapT = THREE.ClampToEdgeWrapping;

  const bump = new THREE.CanvasTexture(canvasBump);
  bump.wrapS = THREE.RepeatWrapping;
  bump.wrapT = THREE.ClampToEdgeWrapping;

  return { diffuse, bump };
}
