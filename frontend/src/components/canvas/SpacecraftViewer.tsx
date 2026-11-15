import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Mission, SpacecraftComponentHotspot } from '../../types';
import { soundEffects } from '../../audio/soundEffects';
import { getPlanetTextures } from './planetTextures';
import {
  RotateCcwIcon,
  SparklesIcon,
  CompassIcon,
  ActivityIcon,
  ShieldIcon,
  XIcon,
} from '../icons/Icons';

interface SpacecraftViewerProps {
  mission?: Mission;
  modelUrl?: string;
  className?: string;
  height?: string;
}

export const SpacecraftViewer: React.FC<SpacecraftViewerProps> = ({
  mission,
  modelUrl: explicitModelUrl,
  className = '',
  height = '460px',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<SpacecraftComponentHotspot | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [wireframe, setWireframe] = useState(false);

  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const initialCameraPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 1.2, 3.2));
  const modelRef = useRef<THREE.Group | null>(null);

  const targetModelUrl = explicitModelUrl || mission?.modelConfig?.modelUrl;
  const hotspots = mission?.modelConfig?.hotspots || [];

  const handleResetCamera = () => {
    soundEffects.playClick();
    if (controlsRef.current && cameraRef.current) {
      cameraRef.current.position.copy(initialCameraPos.current);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  };

  const handleToggleAutoRotate = () => {
    soundEffects.playClick();
    setAutoRotate((prev) => !prev);
  };

  const handleToggleWireframe = () => {
    soundEffects.playClick();
    setWireframe((prev) => {
      const next = !prev;
      if (modelRef.current) {
        modelRef.current.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((m) => (m.wireframe = next));
            } else {
              child.material.wireframe = next;
            }
          }
        });
      }
      return next;
    });
  };

  const handleSelectHotspot = (spot: SpacecraftComponentHotspot) => {
    soundEffects.playMarkerSelect();
    setSelectedHotspot(spot);
  };

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    let width = container.clientWidth || 600;
    let heightPx = container.clientHeight || 460;

    setIsLoading(true);
    setLoadError(null);
    setSelectedHotspot(null);

    // 1. Scene & Camera (100% Transparent, No background color!)
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / heightPx, 0.1, 100);
    camera.position.set(0, 1.2, 3.2);
    cameraRef.current = camera;
    initialCameraPos.current.set(0, 1.2, 3.2);

    // 2. WebGL Renderer with ACES Tone Mapping & alpha: true
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.replaceChildren(renderer.domElement);

    // 3. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 8.0;
    controls.minDistance = 0.8;
    controls.maxPolarAngle = Math.PI / 2 + 0.1;
    controlsRef.current = controls;

    // 4. Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x1e293b, 1.8);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(5, 7, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.4);
    fillLight.position.set(-5, 2, -4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x818cf8, 1.8);
    rimLight.position.set(0, 6, -6);
    scene.add(rimLight);

    // 5. Model Group (Moves around dynamically on scroll!)
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelRef.current = modelGroup;

    let isDisposed = false;
    let dracoLoaderInstance: DRACOLoader | null = null;
    let rotor1: THREE.Object3D | null = null;
    let rotor2: THREE.Object3D | null = null;
    let ionLight: THREE.PointLight | null = null;

    if (targetModelUrl) {
      const loader = new GLTFLoader();

      try {
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/draco/');
        loader.setDRACOLoader(dracoLoader);
        dracoLoaderInstance = dracoLoader;
      } catch (dErr) {
        console.warn('Draco setup warning:', dErr);
      }

      loader.load(
        targetModelUrl,
        (gltf) => {
          if (isDisposed) return;
          const root = gltf.scene;

          root.traverse((child) => {
            if (child.name === 'rotors_01') rotor1 = child;
            if (child.name === 'rotors_02') rotor2 = child;
            if (child instanceof THREE.Mesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              if (child.material) {
                const mats = Array.isArray(child.material) ? child.material : [child.material];
                mats.forEach((mat) => {
                  mat.side = THREE.DoubleSide;
                  mat.needsUpdate = true;
                  if ('roughness' in mat && typeof mat.roughness === 'number' && mat.roughness < 0.15) {
                    mat.roughness = 0.25;
                  }
                });
              }
            }
          });

          root.updateMatrixWorld(true);
          const box = new THREE.Box3().setFromObject(root);
          const size = new THREE.Vector3();
          box.getSize(size);
          const maxDim = Math.max(size.x, size.y, size.z);
          const targetScale = 2.4 / (maxDim > 0.0001 ? maxDim : 1);
          root.scale.setScalar(targetScale);

          root.updateMatrixWorld(true);
          const scaledBox = new THREE.Box3().setFromObject(root);
          const center = new THREE.Vector3();
          scaledBox.getCenter(center);
          root.position.sub(center);

          if (targetModelUrl.toLowerCase().includes('dawn')) {
            ionLight = new THREE.PointLight(0x38bdf8, 3.2, 5.0);
            ionLight.position.set(0, 0, -0.6);
            root.add(ionLight);
          }

          const scaledSize = new THREE.Vector3();
          scaledBox.getSize(scaledSize);
          const finalMaxDim = Math.max(scaledSize.x, scaledSize.y, scaledSize.z);
          const fov = camera.fov * (Math.PI / 180);
          let dist = Math.abs(finalMaxDim / Math.sin(fov / 2)) * 0.72;
          dist = Math.max(2.6, Math.min(dist, 6.0));
          camera.position.set(0, finalMaxDim * 0.25, dist);
          controls.target.set(0, 0, 0);
          controls.minDistance = dist * 0.25;
          controls.maxDistance = dist * 3.5;
          controls.update();
          initialCameraPos.current.copy(camera.position);

          modelGroup.add(root);
          setIsLoading(false);
          setLoadError(null);
        },
        undefined,
        (err) => {
          console.error(`Error loading 3D GLB at ${targetModelUrl}:`, err);
          if (isDisposed) return;
          setLoadError('Unable to load 3D GLB model file.');
          setIsLoading(false);
        }
      );
    } else if (mission?.celestialBody === 'moon' || mission?.celestialBody === 'mars') {
      // 3D Celestial Body Sphere with real NASA texture
      const isMoon = mission.celestialBody === 'moon';
      const sphereGeo = new THREE.SphereGeometry(1.25, 64, 64);
      const textures = getPlanetTextures(isMoon ? 'moon' : 'mars');
      const sphereMat = new THREE.MeshStandardMaterial({
        map: textures.color,
        bumpMap: textures.bump,
        bumpScale: isMoon ? 0.05 : 0.04,
        roughness: isMoon ? 0.92 : 0.85,
        metalness: 0.04,
      });
      const planetSphere = new THREE.Mesh(sphereGeo, sphereMat);
      planetSphere.castShadow = true;
      planetSphere.receiveShadow = true;
      modelGroup.add(planetSphere);

      camera.position.set(0, 0, 3.4);
      controls.target.set(0, 0, 0);
      controls.minDistance = 1.6;
      controls.maxDistance = 8.0;
      controls.update();
      initialCameraPos.current.copy(camera.position);

      setIsLoading(false);
      setLoadError(null);
    } else {
      setIsLoading(false);
      setLoadError('No 3D file available.');
    }

    // 6. Animation Loop with Dynamic Scroll Motion around the Scene!
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Model dynamically moves around the scene based on scroll position!
      if (mountRef.current && modelRef.current) {
        const rect = mountRef.current.getBoundingClientRect();
        const viewH = window.innerHeight || 800;
        // scrollOffset from -1.0 (approaching) to +1.0 (leaving)
        const scrollOffset = ((rect.top + rect.height * 0.5) - viewH * 0.5) / (viewH * 0.5);

        // Dynamic 3D swoop & float (just like Moon and Mars in hero!)
        modelGroup.position.x = Math.sin(scrollOffset * Math.PI) * 0.45;
        modelGroup.position.y = -scrollOffset * 0.3;
        modelGroup.position.z = Math.cos(scrollOffset * Math.PI * 0.5) * 0.4;
        modelGroup.rotation.z = -scrollOffset * 0.12;
      }

      // Live mechanical blade rotation for Ingenuity (twin counter-rotating blades along local X axis)
      if (rotor1) (rotor1 as THREE.Object3D).rotateX(0.55);
      if (rotor2) (rotor2 as THREE.Object3D).rotateX(-0.55);

      // Live pulsing blue ion engine for Dawn
      if (ionLight) {
        ionLight.intensity = 2.4 + Math.sin(performance.now() * 0.006) * 0.8;
      }

      // Auto spin
      if (autoRotate && controlsRef.current) {
        modelGroup.rotation.y += 0.005;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth || 600;
      const h = mountRef.current.clientHeight || 460;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      isDisposed = true;
      try {
        if (dracoLoaderInstance) dracoLoaderInstance.dispose();
      } catch {}
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [targetModelUrl, explicitModelUrl, mission]);

  return (
    <div
      className={`relative w-full overflow-hidden select-none bg-transparent ${className}`}
      style={{ height }}
    >
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-transparent z-20 pointer-events-none">
          <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mb-3" />
          <div className="text-cyan-300 text-xs font-bold tracking-wider uppercase">
            Loading 3D Model...
          </div>
        </div>
      )}

      {/* Top Floating Controls */}
      <div className="absolute top-2 right-2 z-10 flex items-center space-x-2 pointer-events-auto">
        <button
          onClick={handleToggleWireframe}
          className={`btn-bouncy px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
            wireframe ? 'bg-cyan-500 text-slate-900 font-black' : 'btn-secondary text-slate-300'
          }`}
          title="Toggle Wireframe"
        >
          {wireframe ? 'Shaded' : 'Wireframe'}
        </button>

        <button
          onClick={handleToggleAutoRotate}
          className={`btn-bouncy px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
            autoRotate ? 'bg-indigo-600 text-white font-black' : 'btn-secondary text-slate-300'
          }`}
          title="Toggle Auto Spin"
        >
          {autoRotate ? 'Pause' : 'Spin'}
        </button>

        <button
          onClick={handleResetCamera}
          className="btn-bouncy btn-secondary p-1.5 rounded-xl text-slate-300 hover:text-cyan-300 cursor-pointer"
          title="Reset View"
        >
          <RotateCcwIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Component Hotspot Chips (if available) */}
      {hotspots.length > 0 && (
        <div className="absolute bottom-2 inset-x-2 z-10 flex flex-wrap gap-2 pointer-events-auto">
          {hotspots.map((spot) => (
            <button
              key={spot.id}
              onClick={() => handleSelectHotspot(spot)}
              className={`btn-bouncy px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                selectedHotspot?.id === spot.id
                  ? 'btn-primary text-white font-black'
                  : 'btn-secondary text-cyan-300'
              }`}
            >
              <ActivityIcon className="w-3.5 h-3.5" />
              <span>{spot.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Selected Component Explanation Drawer */}
      {selectedHotspot && (
        <div className="absolute top-12 left-2 right-2 sm:right-auto sm:max-w-md z-30 p-4 rounded-2xl bg-slate-900/95 text-slate-100 font-sans shadow-2xl border-2 border-cyan-500/40 pointer-events-auto">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
            <div className="flex items-center space-x-2 text-cyan-300 text-xs font-bold tracking-wider uppercase">
              <SparklesIcon className="w-4 h-4 text-cyan-400" />
              <span>Component Inspection</span>
            </div>
            <button
              onClick={() => setSelectedHotspot(null)}
              className="p-1 text-slate-400 hover:text-white cursor-pointer"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
          <h4 className="text-base font-black text-white uppercase tracking-tight">
            {selectedHotspot.name}
          </h4>
          <p className="mt-1 text-xs text-slate-200 leading-relaxed font-bold">
            {selectedHotspot.description}
          </p>
        </div>
      )}
    </div>
  );
};
