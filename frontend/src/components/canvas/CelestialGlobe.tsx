import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { CelestialBody, Mission } from '../../types';
import { getPlanetTextures } from './planetTextures';
import { soundEffects } from '../../audio/soundEffects';
import {
  CompassIcon,
  BookOpenIcon,
  SparklesIcon,
  RocketIcon,
} from '../icons/Icons';

interface CelestialGlobeProps {
  currentBody: CelestialBody;
  missions: Mission[];
  selectedMission: Mission | null;
  onSelectMission: (mission: Mission) => void;
  onSwitchBody: (body: CelestialBody) => void;
}

export const CelestialGlobe: React.FC<CelestialGlobeProps> = ({
  currentBody,
  missions,
  selectedMission,
  onSelectMission,
  onSwitchBody,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredMission, setHoveredMission] = useState<Mission | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  // References to Three.js elements
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const planetMeshRef = useRef<THREE.Mesh | null>(null);
  const atmosphereMeshRef = useRef<THREE.Mesh | null>(null);
  const markersGroupRef = useRef<THREE.Group | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Textures cache
  const texturesRef = useRef<{
    moon: { diffuse: THREE.CanvasTexture; bump: THREE.CanvasTexture } | null;
    mars: { diffuse: THREE.CanvasTexture; bump: THREE.CanvasTexture } | null;
  }>({ moon: null, mars: null });

  // Camera glide target for smooth transitions
  const cameraTargetRef = useRef<{
    position: THREE.Vector3;
    lookAt: THREE.Vector3;
    isTransitioning: boolean;
  }>({
    position: new THREE.Vector3(0, 0, 6.2),
    lookAt: new THREE.Vector3(0, 0, 0),
    isTransitioning: false,
  });

  // Rotation & Drag state
  const isDraggingRef = useRef(false);
  const previousMousePosRef = useRef({ x: 0, y: 0 });
  const rotationVelocityRef = useRef({ x: 0, y: 0.0015 });
  const isReducedMotionRef = useRef(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      isReducedMotionRef.current = mediaQuery.matches;
      const handler = (e: MediaQueryListEvent) => {
        isReducedMotionRef.current = e.matches;
      };
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  // Filter missions by currently active celestial body
  const bodyMissions = missions.filter(m => m.celestialBody === currentBody);

  // Convert lat/lng to 3D Cartesian coordinates on sphere
  const latLngToVector3 = useCallback((lat: number, lng: number, radius: number): THREE.Vector3 => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
  }, []);

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 6.5);
    cameraRef.current = camera;

    // 3. Renderer with antialiasing and high precision
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting (Dramatic cinematic sun & soft earthshine)
    const ambientLight = new THREE.AmbientLight(0x222633, 0.7);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff8ee, 2.8);
    sunLight.position.set(8, 4, 6);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.4);
    rimLight.position.set(-6, -2, -4);
    scene.add(rimLight);

    // 5. Starfield Background
    const starsGeo = new THREE.BufferGeometry();
    const starCount = 1800;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      const radius = 60 + Math.random() * 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      starPositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i + 2] = radius * Math.cos(phi);

      const colorVariance = Math.random();
      if (colorVariance > 0.8) {
        // Subtle blue-white
        starColors[i] = 0.8;
        starColors[i + 1] = 0.9;
        starColors[i + 2] = 1.0;
      } else if (colorVariance > 0.6) {
        // Warm gold
        starColors[i] = 1.0;
        starColors[i + 1] = 0.85;
        starColors[i + 2] = 0.6;
      } else {
        // Crisp white
        starColors[i] = 0.95;
        starColors[i + 1] = 0.95;
        starColors[i + 2] = 0.95;
      }
    }

    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starsGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.6,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const starField = new THREE.Points(starsGeo, starMaterial);
    scene.add(starField);

    // 6. Planet Mesh
    const sphereRadius = 2.2;
    const sphereGeo = new THREE.SphereGeometry(sphereRadius, 64, 64);
    const planetMat = new THREE.MeshStandardMaterial({
      roughness: 0.85,
      metalness: 0.05,
      bumpScale: 0.04,
    });
    const planetMesh = new THREE.Mesh(sphereGeo, planetMat);
    scene.add(planetMesh);
    planetMeshRef.current = planetMesh;

    // 7. Mars Atmosphere Outer Glow Shell
    const atmoGeo = new THREE.SphereGeometry(sphereRadius * 1.025, 48, 48);
    const atmoMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.2);
          gl_FragColor = vec4(1.0, 0.45, 0.25, 1.0) * intensity * 0.8;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const atmoMesh = new THREE.Mesh(atmoGeo, atmoMat);
    atmoMesh.visible = false;
    scene.add(atmoMesh);
    atmosphereMeshRef.current = atmoMesh;

    // 8. Markers Group attached to Planet (so they rotate seamlessly with the surface)
    const markersGroup = new THREE.Group();
    planetMesh.add(markersGroup);
    markersGroupRef.current = markersGroup;

    // Render loop
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Planet rotation logic
      if (planetMeshRef.current && !isDraggingRef.current) {
        if (!isReducedMotionRef.current) {
          planetMeshRef.current.rotation.y += rotationVelocityRef.current.y;
          planetMeshRef.current.rotation.x += rotationVelocityRef.current.x;
          // Apply gentle damping to velocity
          rotationVelocityRef.current.x *= 0.96;
          rotationVelocityRef.current.y = THREE.MathUtils.lerp(rotationVelocityRef.current.y, 0.0012, 0.04);
        }
      }

      // Smooth camera transition if gliding
      if (cameraRef.current && cameraTargetRef.current.isTransitioning) {
        cameraRef.current.position.lerp(cameraTargetRef.current.position, 0.06);
        cameraRef.current.lookAt(cameraTargetRef.current.lookAt);

        if (cameraRef.current.position.distanceTo(cameraTargetRef.current.position) < 0.05) {
          cameraTargetRef.current.isTransitioning = false;
        }
      }

      // Animate pulsing marker rings
      if (markersGroupRef.current) {
        const time = clock.getElapsedTime();
        markersGroupRef.current.children.forEach((markerGroup) => {
          const pulseRing = markerGroup.getObjectByName('pulseRing');
          if (pulseRing) {
            const scale = 1 + (Math.sin(time * 3 + (markerGroup.userData.index || 0)) + 1) * 0.25;
            pulseRing.scale.set(scale, scale, scale);
            const ringMat = (pulseRing as THREE.Mesh).material as THREE.MeshBasicMaterial;
            if (ringMat) {
              ringMat.opacity = 0.9 - (scale - 1) * 1.5;
            }
          }
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update textures and atmosphere when currentBody changes
  useEffect(() => {
    if (!planetMeshRef.current || !atmosphereMeshRef.current) return;

    const planetMesh = planetMeshRef.current;
    const material = planetMesh.material as THREE.MeshStandardMaterial;

    if (currentBody === 'moon') {
      const tex = getPlanetTextures('moon');
      material.map = tex.color;
      material.bumpMap = tex.bump || null;
      material.bumpScale = 0.05;
      material.roughness = 0.88;
      material.metalness = 0.02;
      material.needsUpdate = true;
      atmosphereMeshRef.current.visible = false;
    } else {
      const tex = getPlanetTextures('mars');
      material.map = tex.color;
      material.bumpMap = tex.bump || null;
      material.bumpScale = 0.05;
      material.roughness = 0.82;
      material.metalness = 0.04;
      material.needsUpdate = true;
      atmosphereMeshRef.current.visible = true;
    }
  }, [currentBody]);

  // Build 3D Discovery Markers for current celestial body
  useEffect(() => {
    if (!markersGroupRef.current) return;
    const markersGroup = markersGroupRef.current;

    // Clear existing markers
    while (markersGroup.children.length > 0) {
      const child = markersGroup.children[0];
      markersGroup.remove(child);
    }

    const sphereRadius = 2.2;

    bodyMissions.forEach((mission, index) => {
      const markerRoot = new THREE.Group();
      markerRoot.userData = { mission, index };

      const surfacePos = latLngToVector3(mission.coordinates.lat, mission.coordinates.lng, sphereRadius);
      const normal = surfacePos.clone().normalize();

      markerRoot.position.copy(surfacePos);
      markerRoot.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);

      // 1. Telemetry pin stem
      const stemHeight = 0.22;
      const stemGeo = new THREE.CylinderGeometry(0.015, 0.015, stemHeight, 8);
      stemGeo.translate(0, stemHeight / 2, 0);
      const stemMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(mission.primaryColor),
        transparent: true,
        opacity: 0.85,
      });
      const stem = new THREE.Mesh(stemGeo, stemMat);
      markerRoot.add(stem);

      // 2. Head beacon sphere
      const beaconGeo = new THREE.SphereGeometry(0.065, 16, 16);
      const beaconMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(mission.primaryColor),
        emissive: new THREE.Color(mission.primaryColor),
        emissiveIntensity: 0.8,
        roughness: 0.2,
      });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.set(0, stemHeight, 0);
      beacon.name = 'beaconMesh';
      markerRoot.add(beacon);

      // 3. Pulsing radar ring
      const ringGeo = new THREE.RingGeometry(0.08, 0.12, 32);
      ringGeo.rotateX(-Math.PI / 2);
      ringGeo.translate(0, 0.01, 0);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(mission.primaryColor),
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide,
      });
      const pulseRing = new THREE.Mesh(ringGeo, ringMat);
      pulseRing.name = 'pulseRing';
      markerRoot.add(pulseRing);

      // 4. Large invisible raycast hit sphere for easy clicking/touching
      const hitGeo = new THREE.SphereGeometry(0.18, 8, 8);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      hitMesh.position.set(0, stemHeight / 2, 0);
      hitMesh.userData = { mission };
      markerRoot.add(hitMesh);

      markersGroup.add(markerRoot);
    });

    // Proximity connection lines for nearby landing sites (e.g. Apollo 12 & Surveyor 3)
    const handledPairs = new Set<string>();
    bodyMissions.forEach((m1) => {
      if (m1.coordinates.nearbyMissions) {
        m1.coordinates.nearbyMissions.forEach((m2Id) => {
          const m2 = bodyMissions.find((m) => m.id === m2Id);
          if (m2) {
            const pairKey = [m1.id, m2.id].sort().join('--');
            if (!handledPairs.has(pairKey)) {
              handledPairs.add(pairKey);
              const p1 = latLngToVector3(m1.coordinates.lat, m1.coordinates.lng, sphereRadius + 0.02);
              const p2 = latLngToVector3(m2.coordinates.lat, m2.coordinates.lng, sphereRadius + 0.02);
              const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5).normalize().multiplyScalar(sphereRadius + 0.08);
              const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
              const points = curve.getPoints(20);
              const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
              const lineMat = new THREE.LineDashedMaterial({
                color: 0x38bdf8,
                dashSize: 0.04,
                gapSize: 0.02,
              });
              const line = new THREE.Line(lineGeo, lineMat);
              line.computeLineDistances();
              markersGroup.add(line);
            }
          }
        });
      }
    });
  }, [bodyMissions, latLngToVector3]);

  // Handle Raycasting for hover & click interactions
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) {
      const deltaX = e.clientX - previousMousePosRef.current.x;
      const deltaY = e.clientY - previousMousePosRef.current.y;

      if (planetMeshRef.current) {
        planetMeshRef.current.rotation.y += deltaX * 0.005;
        planetMeshRef.current.rotation.x += deltaY * 0.005;
        rotationVelocityRef.current = {
          x: deltaY * 0.001,
          y: deltaX * 0.001,
        };
      }

      previousMousePosRef.current = { x: e.clientX, y: e.clientY };
      return;
    }

    // Raycast hover check
    if (!containerRef.current || !cameraRef.current || !markersGroupRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);

    const hitTargets: THREE.Object3D[] = [];
    markersGroupRef.current.traverse((obj) => {
      if (obj.userData && obj.userData.mission) {
        hitTargets.push(obj);
      }
    });

    const intersects = raycaster.intersectObjects(hitTargets, false);
    if (intersects.length > 0) {
      const mission = intersects[0].object.userData.mission as Mission;
      setHoveredMission(mission);
      setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      containerRef.current.style.cursor = 'pointer';
    } else {
      setHoveredMission(null);
      containerRef.current.style.cursor = 'grab';
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    previousMousePosRef.current = { x: e.clientX, y: e.clientY };
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing';
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const wasDragging = Math.hypot(
      e.clientX - previousMousePosRef.current.x,
      e.clientY - previousMousePosRef.current.y
    ) > 4;

    isDraggingRef.current = false;
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }

    // If it was a quick click without dragging, check for marker selection
    if (!wasDragging && hoveredMission) {
      soundEffects.playMarkerSelect();
      onSelectMission(hoveredMission);

      // Smooth camera fly-to centering the landing site
      if (planetMeshRef.current && cameraRef.current) {
        const markerVec = latLngToVector3(
          hoveredMission.coordinates.lat,
          hoveredMission.coordinates.lng,
          2.2
        );
        markerVec.applyEuler(planetMeshRef.current.rotation);

        const targetCamPos = markerVec.clone().normalize().multiplyScalar(5.2);
        cameraTargetRef.current = {
          position: targetCamPos,
          lookAt: new THREE.Vector3(0, 0, 0),
          isTransitioning: !isReducedMotionRef.current,
        };

        if (isReducedMotionRef.current) {
          cameraRef.current.position.copy(targetCamPos);
          cameraRef.current.lookAt(0, 0, 0);
        }
      }
    }
  };

  // Zoom with wheel
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!cameraRef.current) return;
    const camera = cameraRef.current;
    const newZ = camera.position.z + e.deltaY * 0.003;
    camera.position.z = Math.max(3.8, Math.min(8.5, newZ));
  };

  return (
    <div className="relative w-full h-full select-none overflow-hidden">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full"
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={() => {
          isDraggingRef.current = false;
          setHoveredMission(null);
        }}
        onWheel={handleWheel}
      />

      {/* Floating Child-Friendly Tooltip when hovering over a marker */}
      {hoveredMission && tooltipPos && (
        <div
          className="absolute z-30 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-4 px-4 py-3 bg-[#151E38]/95 backdrop- border-2 border-cyan-400/80 rounded-2xl  text-white min-w-[220px] animate-fadeIn"
          style={{ left: `${tooltipPos.x}px`, top: `${tooltipPos.y - 12}px` }}
        >
          <div className="flex items-center space-x-2 mb-1">
            <span className="px-2 py-0.5 rounded-lg bg-cyan-950 border border-cyan-500/50 text-cyan-300 font-mono text-xs font-bold">
              {hoveredMission.badgeEmoji}
            </span>
            <div>
              <div className="font-black text-sm tracking-wide text-cyan-300">
                {hoveredMission.name}
              </div>
              <div className="text-xs text-sky-300 font-bold">
                {hoveredMission.spacecraftName}
              </div>
            </div>
          </div>
          <div className="text-xs text-slate-200 mt-1 border-t border-slate-700/80 pt-1.5 flex items-center space-x-1.5">
            <CompassIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>{hoveredMission.coordinates.siteName}</span>
          </div>
          <div className="mt-2 text-xs text-cyan-200 font-extrabold text-center bg-cyan-500/20 py-1.5 rounded-xl border border-cyan-400/40 flex items-center justify-center space-x-1.5">
            <BookOpenIcon className="w-3.5 h-3.5 text-cyan-300" />
            <span>Tap to Open Storybook!</span>
          </div>
        </div>
      )}

      {/* Planet Switcher & Telemetry HUD Controls */}
      <div className="absolute top-20 left-6 z-20 flex flex-col space-y-3 pointer-events-auto">
        <div className="flex items-center space-x-2 bg-slate-900/90 backdrop- p-1.5 rounded-2xl border-2 border-slate-700/80 ">
          <button
            onClick={() => {
              soundEffects.playClick();
              onSwitchBody('moon');
            }}
            className={`btn-bouncy px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center space-x-2 cursor-pointer ${
              currentBody === 'moon'
                ? 'btn-primary'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <CompassIcon className="w-4 h-4 text-cyan-300" />
            <span>The Moon</span>
          </button>
          <button
            onClick={() => {
              soundEffects.playClick();
              onSwitchBody('mars');
            }}
            className={`btn-bouncy px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center space-x-2 cursor-pointer ${
              currentBody === 'mars'
                ? 'btn-indigo'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <CompassIcon className="w-4 h-4 text-indigo-300" />
            <span>Mars</span>
          </button>
        </div>

        {/* Fun Cadet Mission Helper */}
        <div className="bg-[#10172E]/90 backdrop- px-4 py-3 rounded-2xl border-2 border-slate-700/70 text-xs text-slate-200 max-w-[220px] ">
          <div className="text-cyan-300 font-bold mb-1 flex items-center space-x-1.5">
            <SparklesIcon className="w-3.5 h-3.5 text-cyan-300" />
            <span>Space Explorer Guide</span>
          </div>
          <div className="text-[11px] text-slate-300 mt-1">
            Tap any glowing pin on the planet to discover its secret mission!
          </div>
          <div className="text-[10px] text-sky-300 font-medium mt-1.5 flex items-center space-x-1.5">
            <SparklesIcon className="w-3 h-3 text-sky-300" />
            <span>Drag to spin • Scroll to zoom</span>
          </div>
        </div>
      </div>

      {/* Floating Mission Quick-Bar on Bottom */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex items-center space-x-2 bg-slate-900/90 backdrop- px-4 py-3 rounded-2xl border-2 border-slate-700/80  overflow-x-auto max-w-[90vw]">
        <span className="text-xs font-bold text-cyan-300 whitespace-nowrap mr-2 flex items-center space-x-1.5">
          <RocketIcon className="w-4 h-4 text-cyan-400" />
          <span>{currentBody === 'moon' ? 'Moon Missions:' : 'Mars Missions:'}</span>
        </span>
        {bodyMissions.map((m) => {
          const isSelected = selectedMission?.id === m.id;
          return (
            <button
              key={m.id}
              onClick={() => {
                soundEffects.playMarkerSelect();
                onSelectMission(m);
              }}
              className={`btn-bouncy px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-2 cursor-pointer ${
                isSelected
                  ? 'btn-primary'
                  : 'bg-slate-800/90 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-600/60'
              }`}
            >
              <span>{m.badgeEmoji}</span>
              <span>{m.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
