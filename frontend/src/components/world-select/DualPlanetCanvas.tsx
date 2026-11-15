import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { getPlanetTextures } from '../canvas/planetTextures';

export interface DualPlanetCanvasProps {
  hoveredWorld: 'moon' | 'mars' | null;
  onSelectWorld: (world: 'moon' | 'mars') => void;
  onHoverWorld: (world: 'moon' | 'mars' | null) => void;
  isFixedBackground?: boolean;
  focusedPlanet?: 'moon' | 'mars' | null;
  onLoadingProgress?: (progress: number, assetName: string) => void;
  onLoadingComplete?: () => void;
}

export const DualPlanetCanvas: React.FC<DualPlanetCanvasProps> = ({
  hoveredWorld,
  onSelectWorld,
  onHoverWorld,
  focusedPlanet = null,
  onLoadingProgress,
  onLoadingComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const hoveredWorldRef = useRef(hoveredWorld);
  hoveredWorldRef.current = hoveredWorld;

  const onSelectWorldRef = useRef(onSelectWorld);
  onSelectWorldRef.current = onSelectWorld;

  const onHoverWorldRef = useRef(onHoverWorld);
  onHoverWorldRef.current = onHoverWorld;

  const focusedPlanetRef = useRef(focusedPlanet);
  focusedPlanetRef.current = focusedPlanet;

  const onLoadingProgressRef = useRef(onLoadingProgress);
  onLoadingProgressRef.current = onLoadingProgress;

  const onLoadingCompleteRef = useRef(onLoadingComplete);
  onLoadingCompleteRef.current = onLoadingComplete;

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.8);

    // 3. WebGL Renderer with ACES Tone Mapping
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 4. Directional Space Lighting
    const ambientLight = new THREE.AmbientLight(0x0a1226, 0.95);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xf0f6ff, 2.5);
    sunLight.position.set(0, 4, 8);
    scene.add(sunLight);

    const moonRimLight = new THREE.DirectionalLight(0x38bdf8, 2.4);
    moonRimLight.position.set(-8, 2, -3.5);
    scene.add(moonRimLight);

    const marsRimLight = new THREE.DirectionalLight(0x818cf8, 2.4);
    marsRimLight.position.set(8, -1, -4);
    scene.add(marsRimLight);

    const spacecraftFillLight = new THREE.DirectionalLight(0xe0f2fe, 1.8);
    spacecraftFillLight.position.set(-4, -2, 6);
    scene.add(spacecraftFillLight);

    // 5. Starfield Background
    const starCount = 1400;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      const radius = 40 + Math.random() * 55;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      starPositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i + 2] = radius * Math.cos(phi);

      const tint = Math.random();
      if (tint > 0.6) {
        starColors[i] = 0.55;
        starColors[i + 1] = 0.85;
        starColors[i + 2] = 1.0;
      } else if (tint > 0.3) {
        starColors[i] = 0.75;
        starColors[i + 1] = 0.78;
        starColors[i + 2] = 1.0;
      } else {
        starColors[i] = 0.98;
        starColors[i + 1] = 0.98;
        starColors[i + 2] = 1.0;
      }
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // 6. Orbital Trajectory Curves
    const curvePointsCount = 120;
    const orbitCurvePoints: THREE.Vector3[] = [];
    const orbit2Points: THREE.Vector3[] = [];

    for (let i = 0; i <= curvePointsCount; i++) {
      const angle = (i / curvePointsCount) * Math.PI * 2;
      orbitCurvePoints.push(
        new THREE.Vector3(
          Math.cos(angle) * 4.6,
          Math.sin(angle * 2.0) * 0.9,
          Math.sin(angle) * 3.8
        )
      );
      orbit2Points.push(
        new THREE.Vector3(
          Math.cos(angle) * 3.8,
          -Math.sin(angle * 1.5) * 0.7,
          Math.sin(angle) * 4.8
        )
      );
    }

    const orbitCurveGeo = new THREE.BufferGeometry().setFromPoints(orbitCurvePoints);
    const orbitMaterial = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.2,
    });
    const orbitLine = new THREE.LineLoop(orbitCurveGeo, orbitMaterial);
    orbitLine.rotation.x = 0.25;
    scene.add(orbitLine);

    const orbit2Geo = new THREE.BufferGeometry().setFromPoints(orbit2Points);
    const orbit2Material = new THREE.LineBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.15,
    });
    const orbit2Line = new THREE.LineLoop(orbit2Geo, orbit2Material);
    orbit2Line.rotation.x = -0.3;
    scene.add(orbit2Line);

    // 7. Planetary Bodies (Moon & Mars)
    const marsRadius = 2.35;
    const moonRadius = 1.20;

    // Loading Manager for All Textures & 3D Models
    const loadingManager = new THREE.LoadingManager();
    loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
      const pct = Math.min(Math.round((itemsLoaded / itemsTotal) * 100), 100);
      const name = url.split('/').pop()?.replace(/%20/g, ' ') || 'Space Asset';
      onLoadingProgressRef.current?.(pct, name);
    };
    loadingManager.onLoad = () => {
      onLoadingCompleteRef.current?.();
    };
    loadingManager.onError = (url) => {
      console.warn('Canvas Asset loading error:', url);
    };

    const moonTextures = getPlanetTextures('moon', loadingManager);
    const marsTextures = getPlanetTextures('mars', loadingManager);

    const moonGeometry = new THREE.SphereGeometry(moonRadius, 64, 64);
    const marsGeometry = new THREE.SphereGeometry(marsRadius, 64, 64);

    // --- MOON ---
    const moonGroup = new THREE.Group();
    moonGroup.rotation.z = 0.09;
    moonGroup.rotation.x = 0.05;
    scene.add(moonGroup);

    const moonMaterial = new THREE.MeshStandardMaterial({
      map: moonTextures.color,
      bumpMap: moonTextures.bump,
      bumpScale: 0.045,
      roughness: 0.9,
      metalness: 0.02,
    });
    const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
    moonMesh.userData = { world: 'moon' };
    moonGroup.add(moonMesh);

    // --- MARS ---
    const marsGroup = new THREE.Group();
    marsGroup.rotation.z = -0.44;
    marsGroup.rotation.x = 0.08;
    scene.add(marsGroup);

    const marsMaterial = new THREE.MeshStandardMaterial({
      map: marsTextures.color,
      bumpMap: marsTextures.bump,
      bumpScale: 0.04,
      roughness: 0.85,
      metalness: 0.04,
    });
    const marsMesh = new THREE.Mesh(marsGeometry, marsMaterial);
    marsMesh.userData = { world: 'mars' };
    marsGroup.add(marsMesh);

    // 7.1 Glowing Landing Site Pinpoint Markers (pulsating rings on surface)
    const createPinpointMarker = (colorHex: number) => {
      const pinGroup = new THREE.Group();

      const ringGeo = new THREE.RingGeometry(0.045, 0.09, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      pinGroup.add(ringMesh);

      const dotGeo = new THREE.CircleGeometry(0.026, 24);
      const dotMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
      });
      const dotMesh = new THREE.Mesh(dotGeo, dotMat);
      dotMesh.position.z = 0.003;
      pinGroup.add(dotMesh);

      pinGroup.visible = false;
      return { pinGroup, ringMesh, ringMat };
    };

    const moonPin = createPinpointMarker(0x38bdf8);
    moonMesh.add(moonPin.pinGroup);

    const marsPin = createPinpointMarker(0x818cf8);
    marsMesh.add(marsPin.pinGroup);

    const setPinCoordinates = (
      pinGroup: THREE.Group,
      lat: number,
      lng: number,
      radius: number
    ) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const r = radius * 1.012;

      const x = -r * Math.cos(theta) * Math.sin(phi);
      const y = r * Math.cos(phi);
      const z = r * Math.sin(theta) * Math.sin(phi);

      pinGroup.position.set(x, y, z);
      const normal = new THREE.Vector3(x, y, z).normalize();
      pinGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
      pinGroup.visible = true;
    };

    // Interactive Raycast Targets
    const interactiveMeshes: THREE.Object3D[] = [moonMesh, marsMesh];

    // 8. Spacecraft Hardware Models (All in this single background canvas!)
    const spacecraftMasterGroup = new THREE.Group();
    scene.add(spacecraftMasterGroup);

    const ingenuityGroup = new THREE.Group();
    const dawnGroup = new THREE.Group();
    const sojournerGroup = new THREE.Group();
    const vikingGroup = new THREE.Group();
    const viking2Group = new THREE.Group();
    const spiritGroup = new THREE.Group();
    const opportunityGroup = new THREE.Group();
    const insightGroup = new THREE.Group();

    ingenuityGroup.userData = { craft: 'ingenuity' };
    dawnGroup.userData = { craft: 'dawn' };
    sojournerGroup.userData = { craft: 'sojourner' };
    vikingGroup.userData = { craft: 'viking1' };
    viking2Group.userData = { craft: 'viking2' };
    spiritGroup.userData = { craft: 'spirit' };
    opportunityGroup.userData = { craft: 'opportunity' };
    insightGroup.userData = { craft: 'insight' };

    spacecraftMasterGroup.add(ingenuityGroup);
    spacecraftMasterGroup.add(dawnGroup);
    spacecraftMasterGroup.add(sojournerGroup);
    spacecraftMasterGroup.add(vikingGroup);
    spacecraftMasterGroup.add(viking2Group);
    spacecraftMasterGroup.add(spiritGroup);
    spacecraftMasterGroup.add(opportunityGroup);
    spacecraftMasterGroup.add(insightGroup);

    let ingenuityRotor1: THREE.Object3D | null = null;
    let ingenuityRotor2: THREE.Object3D | null = null;
    let dawnIonLight: THREE.PointLight | null = null;

    const gltfLoader = new GLTFLoader(loadingManager);
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');
    gltfLoader.setDRACOLoader(dracoLoader);

    // Preload alternate InSight deployment models so all variants are fully cached and counted
    gltfLoader.load('/models/insight_panels.glb', () => {});
    gltfLoader.load('/models/insight_panels_stowed.glb', () => {});
    gltfLoader.load('/models/insight_stowed.glb', () => {});

    let isDisposed = false;

    // Helper to center and normalize loaded model
    const normalizeModel = (root: THREE.Object3D, targetSize: number) => {
      root.updateMatrixWorld(true);
      const box = new THREE.Box3().setFromObject(root);
      const size = new THREE.Vector3();
      box.getSize(size);
      const maxDim = Math.max(size.x, size.y, size.z);
      root.scale.setScalar(targetSize / (maxDim > 0.0001 ? maxDim : 1));
      root.updateMatrixWorld(true);
      const center = new THREE.Vector3();
      new THREE.Box3().setFromObject(root).getCenter(center);
      root.position.sub(center);
    };

    // 1. Load Ingenuity Mars Helicopter
    gltfLoader.load(
      '/models/ingenuity.glb',
      (gltf) => {
        if (isDisposed) return;
        const root = gltf.scene;
        root.traverse((child) => {
          if (child.name === 'rotors_01') ingenuityRotor1 = child;
          if (child.name === 'rotors_02') ingenuityRotor2 = child;
          if (child instanceof THREE.Mesh) {
            child.userData = { craft: 'ingenuity' };
            child.castShadow = true;
            interactiveMeshes.push(child);
            if (child.material) {
              const mats = Array.isArray(child.material) ? child.material : [child.material];
              mats.forEach((m) => {
                m.side = THREE.DoubleSide;
                if ('roughness' in m && m.roughness < 0.25) m.roughness = 0.25;
              });
            }
          }
        });
        normalizeModel(root, 1.15);
        ingenuityGroup.add(root);
      },
      undefined,
      (err) => console.warn('Main Canvas: Ingenuity load failed:', err)
    );

    // 2. Load Dawn / NEAR Asteroid Explorer
    gltfLoader.load(
      '/models/Dawn.glb',
      (gltf) => {
        if (isDisposed) return;
        const root = gltf.scene;
        root.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.userData = { craft: 'dawn' };
            child.castShadow = true;
            interactiveMeshes.push(child);
            if (child.material) {
              const mats = Array.isArray(child.material) ? child.material : [child.material];
              mats.forEach((m) => {
                m.side = THREE.DoubleSide;
                if ('roughness' in m && m.roughness < 0.25) m.roughness = 0.25;
              });
            }
          }
        });
        normalizeModel(root, 1.4);

        dawnIonLight = new THREE.PointLight(0x38bdf8, 3.0, 5.0);
        dawnIonLight.position.set(0, 0, -0.6);
        root.add(dawnIonLight);

        dawnGroup.add(root);
      },
      undefined,
      (err) => console.warn('Main Canvas: Dawn load failed:', err)
    );

    // 3. Load Sojourner Microrover (Distinct compact microrover scale)
    gltfLoader.load(
      '/models/mer_rover.glb',
      (gltf) => {
        if (isDisposed) return;
        const root = gltf.scene;
        root.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.userData = { craft: 'sojourner' };
            child.castShadow = true;
            interactiveMeshes.push(child);
            if (child.material) {
              const mats = Array.isArray(child.material) ? child.material : [child.material];
              mats.forEach((m) => {
                m.side = THREE.DoubleSide;
                if ('roughness' in m && m.roughness < 0.25) m.roughness = 0.25;
              });
            }
          }
        });
        // Scale to 0.75 for compact microrover look with forward tilt
        normalizeModel(root, 0.75);
        root.rotation.y = 0.35;
        sojournerGroup.add(root);
      },
      undefined,
      (err) => console.warn('Main Canvas: Sojourner load failed:', err)
    );

    // 4. Load Viking 1 Lander (Classic three-legged hex lander with RTG pods)
    gltfLoader.load(
      '/models/insight_stowed.glb',
      (gltf) => {
        if (isDisposed) return;
        const root = gltf.scene;
        root.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.userData = { craft: 'viking1' };
            child.castShadow = true;
            interactiveMeshes.push(child);
            if (child.material) {
              const mats = Array.isArray(child.material) ? child.material : [child.material];
              mats.forEach((m) => {
                m.side = THREE.DoubleSide;
                if ('roughness' in m && m.roughness < 0.25) m.roughness = 0.25;
              });
            }
          }
        });
        normalizeModel(root, 1.25);
        vikingGroup.add(root);
      },
      undefined,
      (err) => console.warn('Main Canvas: Viking 1 load failed:', err)
    );

    // 5. Load Viking 2 Lander (Utopia Planitia station with circular solar arrays)
    gltfLoader.load(
      '/models/insight_panels.glb',
      (gltf) => {
        if (isDisposed) return;
        const root = gltf.scene;
        root.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.userData = { craft: 'viking2' };
            child.castShadow = true;
            interactiveMeshes.push(child);
            if (child.material) {
              const mats = Array.isArray(child.material) ? child.material : [child.material];
              mats.forEach((m) => {
                m.side = THREE.DoubleSide;
                if ('roughness' in m && m.roughness < 0.25) m.roughness = 0.25;
              });
            }
          }
        });
        normalizeModel(root, 1.3);
        root.rotation.y = -0.5;
        viking2Group.add(root);
      },
      undefined,
      (err) => console.warn('Main Canvas: Viking 2 load failed:', err)
    );

    // 6. Load Spirit Rover MER-A (Gusev Crater explorer)
    gltfLoader.load(
      '/models/mer_rover.glb',
      (gltf) => {
        if (isDisposed) return;
        const root = gltf.scene;
        root.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.userData = { craft: 'spirit' };
            child.castShadow = true;
            interactiveMeshes.push(child);
            if (child.material) {
              const mats = Array.isArray(child.material) ? child.material : [child.material];
              mats.forEach((m) => {
                m.side = THREE.DoubleSide;
                if ('roughness' in m && m.roughness < 0.25) m.roughness = 0.25;
              });
            }
          }
        });
        normalizeModel(root, 1.15);
        root.rotation.y = -0.3;
        spiritGroup.add(root);
      },
      undefined,
      (err) => console.warn('Main Canvas: Spirit Rover load failed:', err)
    );

    // 7. Load Opportunity Rover MER-B (Meridiani Planum marathon explorer)
    gltfLoader.load(
      '/models/mer_rover.glb',
      (gltf) => {
        if (isDisposed) return;
        const root = gltf.scene;
        root.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.userData = { craft: 'opportunity' };
            child.castShadow = true;
            interactiveMeshes.push(child);
            if (child.material) {
              const mats = Array.isArray(child.material) ? child.material : [child.material];
              mats.forEach((m) => {
                m.side = THREE.DoubleSide;
                if ('roughness' in m && m.roughness < 0.25) m.roughness = 0.25;
              });
            }
          }
        });
        normalizeModel(root, 1.15);
        root.rotation.y = 0.65;
        opportunityGroup.add(root);
      },
      undefined,
      (err) => console.warn('Main Canvas: Opportunity Rover load failed:', err)
    );

    // 8. Load InSight Lander
    const loadInsightModel = (url: string) => {
      gltfLoader.load(
        url,
        (gltf) => {
          if (isDisposed) return;
          insightGroup.clear();
          const root = gltf.scene;
          root.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.userData = { craft: 'insight' };
              child.castShadow = true;
              interactiveMeshes.push(child);
              if (child.material) {
                const mats = Array.isArray(child.material) ? child.material : [child.material];
                mats.forEach((m) => {
                  m.side = THREE.DoubleSide;
                  if ('roughness' in m && m.roughness < 0.25) m.roughness = 0.25;
                });
              }
            }
          });
          normalizeModel(root, 1.25);
          insightGroup.add(root);
        },
        undefined,
        (err) => console.warn('Main Canvas: InSight load failed:', err)
      );
    };

    loadInsightModel('/models/insight_arm.glb');

    const handleInsightVariantEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ url: string }>;
      if (customEvent.detail?.url) {
        loadInsightModel(customEvent.detail.url);
      }
    };
    window.addEventListener('set-insight-variant', handleInsightVariantEvent);

    let activeMissionOverride: string | null = null;
    const handleSetActiveMissionEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ id: string }>;
      if (customEvent.detail?.id) {
        activeMissionOverride = customEvent.detail.id;
      }
    };
    window.addEventListener('set-active-mission-id', handleSetActiveMissionEvent);

    // 9. Base Layout Settings
    let baseMoonX = -2.85;
    let baseMarsX = 2.85;
    let baseCameraZ = 7.8;
    let targetCameraZ = 7.8;

    const updateLayout = () => {
      const aspect = width / height;
      if (aspect >= 1.2) {
        const posX = Math.min(3.3, Math.max(2.5, aspect * 1.7));
        baseMoonX = -posX;
        baseMarsX = posX;
        baseCameraZ = 7.8;
      } else if (aspect >= 0.85) {
        baseMoonX = -2.2;
        baseMarsX = 2.3;
        baseCameraZ = 8.6;
      } else {
        baseMoonX = -1.2;
        baseMarsX = 1.2;
        baseCameraZ = 9.4;
      }
      targetCameraZ = baseCameraZ;
    };
    updateLayout();

    // 10. Interactive 3D Drag & Inertia Controls
    const pointer = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    type InteractiveTargetType = 'moon' | 'mars' | 'ingenuity' | 'dawn' | 'sojourner' | 'viking1' | 'viking2' | 'spirit' | 'opportunity' | 'insight' | 'scene' | null;

    let isPointerDown = false;
    let dragTarget: InteractiveTargetType = null;
    let currentEffectiveCraft: InteractiveTargetType = null;
    let pointerStartX = 0;
    let pointerStartY = 0;
    let previousPointerX = 0;
    let previousPointerY = 0;
    let hasMovedSignificantly = false;

    let moonVelX = 0;
    let moonVelY = 0;
    let marsVelX = 0;
    let marsVelY = 0;
    let craftVelX = 0;
    let craftVelY = 0;
    let sceneVelX = 0;
    let sceneVelY = 0;

    let sceneRotX = 0;
    let sceneRotY = 0;

    let lastRaycastHover: string | null = null;

    const getRaycastIntersect = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -(((clientY - rect.top) / rect.height) * 2 - 1);
      raycaster.setFromCamera(pointer, camera);
      return raycaster.intersectObjects(interactiveMeshes, true);
    };

    const getInteractiveTarget = (intersects: THREE.Intersection[]): InteractiveTargetType => {
      if (intersects.length === 0) return null;
      for (const hit of intersects) {
        let current: THREE.Object3D | null = hit.object;
        while (current) {
          if (current.userData?.world) {
            return current.userData.world as 'moon' | 'mars';
          }
          if (current.userData?.craft) {
            return current.userData.craft as InteractiveTargetType;
          }
          current = current.parent;
        }
      }
      return null;
    };

    const handlePointerDown = (e: MouseEvent) => {
      // Don't intercept clicks on interactive UI elements (buttons, inputs, chat, etc.)
      const targetEl = e.target as HTMLElement | null;
      if (targetEl && (
        targetEl.closest('button') ||
        targetEl.closest('input') ||
        targetEl.closest('textarea') ||
        targetEl.closest('select') ||
        targetEl.closest('form') ||
        targetEl.closest('.chat-window') ||
        targetEl.closest('#mission-archives')
      )) {
        return;
      }

      isPointerDown = true;
      hasMovedSignificantly = false;
      pointerStartX = e.clientX;
      pointerStartY = e.clientY;
      previousPointerX = e.clientX;
      previousPointerY = e.clientY;

      const intersects = getRaycastIntersect(e.clientX, e.clientY);
      const target = getInteractiveTarget(intersects);
      if (target) {
        dragTarget = target;
      } else {
        if (currentEffectiveCraft) {
          dragTarget = currentEffectiveCraft;
        } else if (focusedPlanetRef.current) {
          dragTarget = focusedPlanetRef.current;
        } else {
          // Intuitive fallback: left side controls Moon, right side controls Mars!
          const normX = e.clientX / window.innerWidth;
          dragTarget = normX < 0.5 ? 'moon' : 'mars';
        }
      }
      container.style.cursor = 'grabbing';
    };

    const handlePointerMove = (e: MouseEvent) => {
      const deltaX = e.clientX - previousPointerX;
      const deltaY = e.clientY - previousPointerY;
      previousPointerX = e.clientX;
      previousPointerY = e.clientY;

      if (isPointerDown) {
        const totalDist = Math.hypot(e.clientX - pointerStartX, e.clientY - pointerStartY);
        if (totalDist > 4) hasMovedSignificantly = true;

        const rotFactor = 0.012; // Responsive, tactile planetary rotation

        if (dragTarget === 'moon') {
          moonMesh.rotation.y += deltaX * rotFactor;
          moonMesh.rotation.x += deltaY * rotFactor;
          moonVelY = deltaX * rotFactor;
          moonVelX = deltaY * rotFactor;
        } else if (dragTarget === 'mars') {
          marsMesh.rotation.y += deltaX * rotFactor;
          marsMesh.rotation.x += deltaY * rotFactor;
          marsVelY = deltaX * rotFactor;
          marsVelX = deltaY * rotFactor;
        } else if (dragTarget === 'scene') {
          sceneRotY += deltaX * rotFactor * 0.5;
          sceneRotX += deltaY * rotFactor * 0.5;
          sceneVelY = deltaX * rotFactor * 0.5;
          sceneVelX = deltaY * rotFactor * 0.5;
        } else {
          // Any active spacecraft 3D rotation
          ingenuityGroup.rotation.y += deltaX * rotFactor;
          ingenuityGroup.rotation.x += deltaY * rotFactor;
          dawnGroup.rotation.y += deltaX * rotFactor;
          dawnGroup.rotation.x += deltaY * rotFactor;
          sojournerGroup.rotation.y += deltaX * rotFactor;
          sojournerGroup.rotation.x += deltaY * rotFactor;
          vikingGroup.rotation.y += deltaX * rotFactor;
          vikingGroup.rotation.x += deltaY * rotFactor;
          viking2Group.rotation.y += deltaX * rotFactor;
          viking2Group.rotation.x += deltaY * rotFactor;
          spiritGroup.rotation.y += deltaX * rotFactor;
          spiritGroup.rotation.x += deltaY * rotFactor;
          opportunityGroup.rotation.y += deltaX * rotFactor;
          opportunityGroup.rotation.x += deltaY * rotFactor;
          insightGroup.rotation.y += deltaX * rotFactor;
          insightGroup.rotation.x += deltaY * rotFactor;
          craftVelY = deltaX * rotFactor;
          craftVelX = deltaY * rotFactor;
        }
      } else {
        const intersects = getRaycastIntersect(e.clientX, e.clientY);
        const hitKey = getInteractiveTarget(intersects);
        if (hitKey) {
          container.style.cursor = 'grab';
          if (hitKey === 'moon' || hitKey === 'mars') {
            if (hitKey !== lastRaycastHover) {
              lastRaycastHover = hitKey;
              onHoverWorldRef.current(hitKey);
            }
          } else {
            if (lastRaycastHover !== null) {
              lastRaycastHover = null;
              onHoverWorldRef.current(null);
            }
          }
        } else {
          container.style.cursor = 'default';
          if (lastRaycastHover !== null) {
            lastRaycastHover = null;
            onHoverWorldRef.current(null);
          }
        }
      }
    };

    const handlePointerUp = () => {
      if (isPointerDown && !hasMovedSignificantly) {
        if (!focusedPlanetRef.current) {
          if (dragTarget === 'moon' || dragTarget === 'mars') {
            onSelectWorldRef.current(dragTarget);
          }
        }
      }
      isPointerDown = false;
      dragTarget = null;
      container.style.cursor = lastRaycastHover ? 'grab' : 'default';
    };

    const handleWheel = (e: WheelEvent) => {
      if (lastRaycastHover !== null) {
        targetCameraZ = Math.min(Math.max(targetCameraZ + e.deltaY * 0.005, 5.0), 11.5);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const targetEl = e.target as HTMLElement | null;
      if (targetEl && (
        targetEl.closest('button') ||
        targetEl.closest('input') ||
        targetEl.closest('textarea') ||
        targetEl.closest('form') ||
        targetEl.closest('#mission-archives')
      )) {
        return;
      }

      if (window.scrollY < 450) {
        const touch = e.touches[0];
        isPointerDown = true;
        hasMovedSignificantly = false;
        pointerStartX = touch.clientX;
        pointerStartY = touch.clientY;
        previousPointerX = touch.clientX;
        previousPointerY = touch.clientY;

        const intersects = getRaycastIntersect(touch.clientX, touch.clientY);
        const target = getInteractiveTarget(intersects);
        if (target) {
          dragTarget = target;
        } else {
          if (currentEffectiveCraft) {
            dragTarget = currentEffectiveCraft;
          } else if (focusedPlanetRef.current) {
            dragTarget = focusedPlanetRef.current;
          } else {
            const normX = touch.clientX / window.innerWidth;
            dragTarget = normX < 0.5 ? 'moon' : 'mars';
          }
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPointerDown || e.touches.length !== 1) return;
      const touch = e.touches[0];
      const deltaX = touch.clientX - previousPointerX;
      const deltaY = touch.clientY - previousPointerY;
      previousPointerX = touch.clientX;
      previousPointerY = touch.clientY;

      const totalDist = Math.hypot(touch.clientX - pointerStartX, touch.clientY - pointerStartY);
      if (totalDist > 6) hasMovedSignificantly = true;

      const rotFactor = 0.012;
      if (dragTarget === 'moon') {
        moonMesh.rotation.y += deltaX * rotFactor;
        moonMesh.rotation.x += deltaY * rotFactor;
        moonVelY = deltaX * rotFactor;
        moonVelX = deltaY * rotFactor;
      } else if (dragTarget === 'mars') {
        marsMesh.rotation.y += deltaX * rotFactor;
        marsMesh.rotation.x += deltaY * rotFactor;
        marsVelY = deltaX * rotFactor;
        marsVelX = deltaY * rotFactor;
      } else if (dragTarget === 'scene') {
        sceneRotY += deltaX * rotFactor * 0.5;
        sceneRotX += deltaY * rotFactor * 0.5;
      } else {
        // Any active spacecraft touch drag
        ingenuityGroup.rotation.y += deltaX * rotFactor;
        dawnGroup.rotation.y += deltaX * rotFactor;
        sojournerGroup.rotation.y += deltaX * rotFactor;
        vikingGroup.rotation.y += deltaX * rotFactor;
        viking2Group.rotation.y += deltaX * rotFactor;
        spiritGroup.rotation.y += deltaX * rotFactor;
        opportunityGroup.rotation.y += deltaX * rotFactor;
        insightGroup.rotation.y += deltaX * rotFactor;
        craftVelY = deltaX * rotFactor;
      }
    };

    const handleTouchEnd = () => {
      if (isPointerDown && !hasMovedSignificantly) {
        if (!focusedPlanetRef.current) {
          if (dragTarget === 'moon' || dragTarget === 'mars') {
            onSelectWorldRef.current(dragTarget);
          }
        }
      }
      isPointerDown = false;
      dragTarget = null;
    };

    const handleResize = () => {
      if (!containerRef.current) return;
      width = containerRef.current.clientWidth || window.innerWidth;
      height = containerRef.current.clientHeight || window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      updateLayout();
    };

    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    container.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('resize', handleResize);

    // =========================================================================
    // 10.1 PLANETARY LANDING SITE COORDINATES
    // =========================================================================
    const LUNAR_COORDS: Record<string, { lat: number; lng: number }> = {
      'apollo-11': { lat: 0.674, lng: 23.473 },
      'apollo-12': { lat: -3.0128, lng: -23.4219 },
      'surveyor-3': { lat: -3.000, lng: -23.410 },
      'apollo-15': { lat: 26.1233, lng: 3.6333 },
    };

    const MARS_COORDS: Record<string, { lat: number; lng: number }> = {
      'mars-pathfinder-sojourner': { lat: 19.33, lng: -33.55 },
      'mars-pathfinder': { lat: 19.33, lng: -33.55 },
      'spirit': { lat: -14.5692, lng: 175.4729 },
      'opportunity': { lat: -1.9462, lng: -5.5266 }, // 354.4734° = -5.5266°
      'viking-1': { lat: 22.483, lng: -47.94 },
      'viking-2': { lat: 47.64, lng: 134.29 },
      'insight': { lat: 4.502384, lng: 135.623447 },
      'phoenix': { lat: 68.21878, lng: -125.75155 },
      'near-shoemaker': { lat: -35.78, lng: 80.42 },
      'ingenuity': { lat: 18.4457, lng: 77.4508 },
    };

    const getActiveMissionId = (body: 'moon' | 'mars'): string | null => {
      if (activeMissionOverride) {
        if (body === 'moon' && LUNAR_COORDS[activeMissionOverride]) return activeMissionOverride;
        if (body === 'mars' && MARS_COORDS[activeMissionOverride]) return activeMissionOverride;
      }

      const scrollY = window.scrollY;
      const viewH = window.innerHeight || 800;
      const centerY = scrollY + viewH * 0.45;

      const ids = body === 'moon'
        ? ['apollo-11', 'apollo-12', 'surveyor-3', 'apollo-15']
        : ['mars-pathfinder-sojourner', 'viking-1', 'viking-2', 'spirit', 'opportunity', 'insight', 'ingenuity', 'near-shoemaker'];

      let bestId: string | null = null;
      let minDistance = Infinity;

      for (const id of ids) {
        const el = document.getElementById(`mission-${id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          const mid = scrollY + rect.top + rect.height * 0.5;
          const dist = Math.abs(centerY - mid);
          if (dist < minDistance && dist < viewH * 0.85) {
            minDistance = dist;
            bestId = id;
          }
        }
      }

      if (!bestId) {
        return body === 'moon' ? 'apollo-11' : 'mars-pathfinder-sojourner';
      }

      return bestId;
    };

    // =========================================================================
    // 11. ACTIVE SPOTLIGHT DETERMINATION
    // Determine which 3D celestial object owns the spotlight based on scroll!
    // When another object appears, the Moon and Mars animation ends / they recede!
    // =========================================================================
    type SpotlightMode =
      | 'hero'
      | 'crossing'
      | 'lunar'
      | 'mars_surface'
      | 'mer_rover'
      | 'insight'
      | 'ingenuity'
      | 'dawn';

    const getActiveSpotlightMode = (): SpotlightMode => {
      const scrollY = window.scrollY;
      const viewH = window.innerHeight || 800;
      const centerY = scrollY + viewH * 0.5;

      if (scrollY < 250) return 'hero';

      const getMid = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return scrollY + rect.top + rect.height * 0.5;
      };

      const crossingMid = getMid('story-scroll');
      if (crossingMid && Math.abs(centerY - crossingMid) < viewH * 0.55) {
        return 'crossing';
      }

      // Check specific missions / chapters
      const candidates: { mode: SpotlightMode; mid: number }[] = [];

      const lunarMid = getMid('chapter-lunar');
      if (lunarMid) candidates.push({ mode: 'lunar', mid: lunarMid });

      const pathfinderMid = getMid('mission-mars-pathfinder-sojourner') || getMid('mission-mars-pathfinder') || getMid('mission-viking-1');
      if (pathfinderMid) candidates.push({ mode: 'mars_surface', mid: pathfinderMid });

      const opportunityMid = getMid('mission-opportunity') || getMid('mission-spirit');
      if (opportunityMid) candidates.push({ mode: 'mer_rover', mid: opportunityMid });

      const insightMid = getMid('mission-insight');
      if (insightMid) candidates.push({ mode: 'insight', mid: insightMid });

      const ingenuityMid = getMid('mission-ingenuity');
      if (ingenuityMid) candidates.push({ mode: 'ingenuity', mid: ingenuityMid });

      const dawnMid = getMid('mission-dawn') || getMid('mission-near-shoemaker') || getMid('chapter-beyond');
      if (dawnMid) candidates.push({ mode: 'dawn', mid: dawnMid });

      if (candidates.length === 0) return 'hero';

      let closest = candidates[0];
      let minDist = Math.abs(centerY - candidates[0].mid);

      for (let i = 1; i < candidates.length; i++) {
        const dist = Math.abs(centerY - candidates[i].mid);
        if (dist < minDist) {
          minDist = dist;
          closest = candidates[i];
        }
      }

      return closest.mode;
    };

    // Current interpolated scales and positions
    let currentMoonScale = 1.0;
    let currentMarsScale = 1.0;
    let currentIngScale = 0.001;
    let currentDawnScale = 0.001;
    let currentSojournerScale = 0.001;
    let currentViking1Scale = 0.001;
    let currentViking2Scale = 0.001;
    let currentSpiritScale = 0.001;
    let currentOppScale = 0.001;
    let currentInsScale = 0.001;

    let targetScrollProgress = 0;
    let currentScrollProgress = 0;

    const handleScroll = () => {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      targetScrollProgress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      currentScrollProgress += (targetScrollProgress - currentScrollProgress) * 0.08;
      const sp = currentScrollProgress;

      // Inertia decay
      if (!isPointerDown) {
        moonMesh.rotation.y += moonVelY;
        moonMesh.rotation.x += moonVelX;
        moonVelY *= 0.94;
        moonVelX *= 0.94;

        marsMesh.rotation.y += marsVelY;
        marsMesh.rotation.x += marsVelX;
        marsVelY *= 0.94;
        marsVelX *= 0.94;

        ingenuityGroup.rotation.y += craftVelY;
        dawnGroup.rotation.y += craftVelY;
        sojournerGroup.rotation.y += craftVelY;
        vikingGroup.rotation.y += craftVelY;
        viking2Group.rotation.y += craftVelY;
        spiritGroup.rotation.y += craftVelY;
        opportunityGroup.rotation.y += craftVelY;
        insightGroup.rotation.y += craftVelY;
        craftVelY *= 0.94;
        craftVelX *= 0.94;

        sceneRotY += sceneVelY;
        sceneRotX += sceneVelX;
        sceneVelY *= 0.92;
        sceneVelX *= 0.92;
      }

      const focus = focusedPlanetRef.current;
      const activeHover = hoveredWorldRef.current;
      const activeMissionMoon = focus === 'moon' ? getActiveMissionId('moon') : null;
      const activeMissionMars = focus === 'mars' ? getActiveMissionId('mars') : null;

      if (!isPointerDown || dragTarget !== 'moon') {
        if (!activeMissionMoon) {
          moonMesh.rotation.y += (activeHover === 'moon' ? 0.0028 : 0.0014);
        }
      }
      if (!isPointerDown || dragTarget !== 'mars') {
        if (!activeMissionMars) {
          marsMesh.rotation.y += (activeHover === 'mars' ? 0.0034 : 0.0019);
        }
      }

      starField.rotation.y += 0.00015;
      orbitLine.rotation.z += 0.0004;
      orbit2Line.rotation.z -= 0.0003;

      // Mechanical blade rotation for Ingenuity (twin counter-rotating blades along local X axis)
      if (ingenuityRotor1) (ingenuityRotor1 as THREE.Object3D).rotateX(0.55);
      if (ingenuityRotor2) (ingenuityRotor2 as THREE.Object3D).rotateX(-0.55);

      const animClock = performance.now() * 0.001;
      if (dawnIonLight) {
        dawnIonLight.intensity = 2.4 + Math.sin(animClock * 6.0) * 0.8;
      }

      // Pulsating landing site pinpoint markers
      const pulse = 0.85 + Math.sin(animClock * 5.0) * 0.25;
      moonPin.ringMesh.scale.set(pulse, pulse, pulse);
      marsPin.ringMesh.scale.set(pulse, pulse, pulse);

      // =======================================================================
      // SPOTLIGHT CHOREOGRAPHY
      // When another object shows up, Moon & Mars animation ends / they recede!
      // =======================================================================
      const mode = getActiveSpotlightMode();
      const aspect = width / height;
      const isMobile = aspect < 1.0;

      // Spotlight coordinates: placed in the MIDDLE and elevated slightly above bottom controls
      const spotX = 0.0;
      const spotY = isMobile ? 0.15 : 0.22;

      // Determine effective mode based on active mission or scroll mode
      let effectiveMode: SpotlightMode = mode;
      if (focus === 'mars') {
        const cur = activeMissionMars || activeMissionOverride;
        if (cur === 'ingenuity') {
          effectiveMode = 'ingenuity';
          currentEffectiveCraft = 'ingenuity';
        } else if (cur === 'insight') {
          effectiveMode = 'insight';
          currentEffectiveCraft = 'insight';
        } else if (cur === 'mars-pathfinder-sojourner' || cur === 'mars-pathfinder') {
          effectiveMode = 'sojourner' as any;
          currentEffectiveCraft = 'sojourner';
        } else if (cur === 'viking-1') {
          effectiveMode = 'viking1' as any;
          currentEffectiveCraft = 'viking1';
        } else if (cur === 'viking-2') {
          effectiveMode = 'viking2' as any;
          currentEffectiveCraft = 'viking2';
        } else if (cur === 'spirit') {
          effectiveMode = 'spirit' as any;
          currentEffectiveCraft = 'spirit';
        } else if (cur === 'opportunity') {
          effectiveMode = 'opportunity' as any;
          currentEffectiveCraft = 'opportunity';
        } else if (cur === 'near-shoemaker' || cur === 'dawn') {
          effectiveMode = 'dawn';
          currentEffectiveCraft = 'dawn';
        } else {
          effectiveMode = 'mars_surface';
          currentEffectiveCraft = 'mars';
        }
      } else if (focus === 'moon') {
        effectiveMode = 'lunar';
        currentEffectiveCraft = 'moon';
      } else {
        currentEffectiveCraft = null;
      }

      let targetMoonX = baseMoonX;
      let targetMoonY = 0;
      let targetMoonZ = 0;
      let targetMoonScale = 1.0;

      let targetMarsX = baseMarsX;
      let targetMarsY = 0;
      let targetMarsZ = 0;
      let targetMarsScale = 1.0;

      let targetIngX = 0, targetIngY = 0, targetIngZ = -25, targetIngScale = 0.00001;
      let targetDawnX = 0, targetDawnY = 0, targetDawnZ = -25, targetDawnScale = 0.00001;
      let targetSojournerX = 0, targetSojournerY = 0, targetSojournerZ = -25, targetSojournerScale = 0.00001;
      let targetViking1X = 0, targetViking1Y = 0, targetViking1Z = -25, targetViking1Scale = 0.00001;
      let targetViking2X = 0, targetViking2Y = 0, targetViking2Z = -25, targetViking2Scale = 0.00001;
      let targetSpiritX = 0, targetSpiritY = 0, targetSpiritZ = -25, targetSpiritScale = 0.00001;
      let targetOppX = 0, targetOppY = 0, targetOppZ = -25, targetOppScale = 0.00001;
      let targetInsX = 0, targetInsY = 0, targetInsZ = -25, targetInsScale = 0.00001;

      orbitLine.visible = !focus;
      orbit2Line.visible = !focus;

      if (focus === 'moon') {
        // THE MOON IS MAGNIFIED IN THE MIDDLE AND BIG (GENTLE FRAMING LIKE MARS)
        targetMoonX = 0.0;
        targetMoonY = isMobile ? 0.15 : 0.22;

        // Mars is banished into deep space
        targetMarsX = -18.0;
        targetMarsY = -8.0;
        targetMarsZ = -38.0;
        targetMarsScale = 0.00001;

        if (activeMissionMoon && LUNAR_COORDS[activeMissionMoon]) {
          const coords = LUNAR_COORDS[activeMissionMoon];
          setPinCoordinates(moonPin.pinGroup, coords.lat, coords.lng, moonRadius);

          // Rotate Moon so (lat, lng) coordinates face the viewer!
          const targetRotY = -((coords.lng + 90) * Math.PI / 180);
          const targetRotX = (coords.lat * Math.PI / 180);

          if (!isPointerDown) {
            let diffY = (targetRotY - moonMesh.rotation.y) % (Math.PI * 2);
            if (diffY > Math.PI) diffY -= Math.PI * 2;
            if (diffY < -Math.PI) diffY += Math.PI * 2;
            moonMesh.rotation.y += diffY * 0.06;
            moonMesh.rotation.x += (targetRotX - moonMesh.rotation.x) * 0.06;
          }

          // Gentle framing of landing site (reduced from 3.2 / 2.95 to match Mars proportion!)
          targetMoonScale = isMobile ? 1.55 : 1.85;
          targetMoonZ = 0.6;
        } else {
          moonPin.pinGroup.visible = false;
          targetMoonZ = 0.2;
          targetMoonScale = isMobile ? 1.35 : 1.65;
        }
      } else if (focus === 'mars') {
        // Moon is ALWAYS banished into deep space when Mars is selected!
        targetMoonX = -18.0;
        targetMoonY = 8.0;
        targetMoonZ = -38.0;
        targetMoonScale = 0.00001;

        if (activeMissionMars && MARS_COORDS[activeMissionMars]) {
          const coords = MARS_COORDS[activeMissionMars];
          setPinCoordinates(marsPin.pinGroup, coords.lat, coords.lng, marsRadius);

          const targetRotY = -((coords.lng + 90) * Math.PI / 180);
          const targetRotX = (coords.lat * Math.PI / 180);

          if (!isPointerDown) {
            let diffY = (targetRotY - marsMesh.rotation.y) % (Math.PI * 2);
            if (diffY > Math.PI) diffY -= Math.PI * 2;
            if (diffY < -Math.PI) diffY += Math.PI * 2;
            marsMesh.rotation.y += diffY * 0.06;
            marsMesh.rotation.x += (targetRotX - marsMesh.rotation.x) * 0.06;
          }
        } else {
          marsPin.pinGroup.visible = false;
        }

        // CRAFT SPOTLIGHTS: MARS RECEDES TO BACKGROUND, DEDICATED UNIQUE CRAFT TAKES STAGE!
        const isCraftActive = effectiveMode !== 'mars_surface';
        if (isCraftActive) {
          targetMarsX = 0.0;
          targetMarsY = 1.35;
          targetMarsZ = -11.0;
          targetMarsScale = 0.45;
        }

        if (effectiveMode === 'sojourner' as any) {
          // 1. Sojourner Microrover
          targetSojournerX = 0.0;
          targetSojournerY = isMobile ? 0.02 : 0.08;
          targetSojournerZ = 2.8;
          targetSojournerScale = isMobile ? 1.8 : 2.3;
          if (!isPointerDown || dragTarget !== 'sojourner') {
            sojournerGroup.rotation.y += 0.005;
          }
        } else if (effectiveMode === 'viking1' as any) {
          // 2. Viking 1 Lander
          targetViking1X = 0.0;
          targetViking1Y = isMobile ? 0.05 : 0.12;
          targetViking1Z = 2.8;
          targetViking1Scale = isMobile ? 2.0 : 2.6;
          if (!isPointerDown || dragTarget !== 'viking1') {
            vikingGroup.rotation.y += 0.005;
          }
        } else if (effectiveMode === 'viking2' as any) {
          // 3. Viking 2 Utopia Station
          targetViking2X = 0.0;
          targetViking2Y = isMobile ? 0.05 : 0.12;
          targetViking2Z = 2.8;
          targetViking2Scale = isMobile ? 2.0 : 2.6;
          if (!isPointerDown || dragTarget !== 'viking2') {
            viking2Group.rotation.y += 0.005;
          }
        } else if (effectiveMode === 'spirit' as any) {
          // 4. Spirit Rover (MER-A)
          targetSpiritX = 0.0;
          targetSpiritY = isMobile ? -0.05 : 0.02;
          targetSpiritZ = 2.8;
          targetSpiritScale = isMobile ? 2.0 : 2.65;
          if (!isPointerDown || dragTarget !== 'spirit') {
            spiritGroup.rotation.y += 0.005;
          }
        } else if (effectiveMode === 'opportunity' as any) {
          // 5. Opportunity Rover (MER-B)
          targetOppX = 0.0;
          targetOppY = isMobile ? -0.05 : 0.02;
          targetOppZ = 2.8;
          targetOppScale = isMobile ? 2.0 : 2.65;
          if (!isPointerDown || dragTarget !== 'opportunity') {
            opportunityGroup.rotation.y += 0.005;
          }
        } else if (effectiveMode === 'insight') {
          // 6. InSight Lander
          targetInsX = 0.0;
          targetInsY = isMobile ? 0.05 : 0.12;
          targetInsZ = 2.8;
          targetInsScale = isMobile ? 2.2 : 2.8;
          if (!isPointerDown || dragTarget !== 'insight') {
            insightGroup.rotation.y += 0.005;
          }
        } else if (effectiveMode === 'ingenuity') {
          // 7. Ingenuity Mars Helicopter
          const hoverBob = Math.sin(animClock * 3.5) * 0.06;
          targetIngX = 0.0;
          targetIngY = (isMobile ? 0.25 : 0.32) + hoverBob;
          targetIngZ = 3.2;
          targetIngScale = isMobile ? 2.2 : 2.85;
          if (!isPointerDown || dragTarget !== 'ingenuity') {
            ingenuityGroup.rotation.y += 0.006;
          }
          ingenuityGroup.rotation.z = Math.sin(animClock * 2.0) * 0.04;
          ingenuityGroup.rotation.x = 0.08 + Math.cos(animClock * 2.2) * 0.02;
        } else if (effectiveMode === 'dawn') {
          // 8. Dawn / NEAR Shoemaker Asteroid Probe
          targetMarsScale = 0.00001;
          targetMarsZ = -25.0;

          targetDawnX = 0.0;
          targetDawnY = isMobile ? 0.2 : 0.28;
          targetDawnZ = 2.9;
          targetDawnScale = isMobile ? 2.0 : 2.6;
          if (!isPointerDown || dragTarget !== 'dawn') {
            dawnGroup.rotation.y += 0.006;
          }
          dawnGroup.rotation.z = Math.sin(animClock * 1.2) * 0.05;
        } else {
          // MARS SURFACE SPOTLIGHT IN THE CENTER - GENTLE ZOOMING
          targetMarsX = 0.0;
          targetMarsY = isMobile ? 0.15 : 0.22;
          if (activeMissionMars) {
            targetMarsScale = isMobile ? 0.85 : 1.05;
            targetMarsZ = 0.6;
          } else {
            targetMarsScale = isMobile ? 0.75 : 0.92;
            targetMarsZ = 0.2;
          }
        }
      } else if (mode === 'hero') {
        // Moon on Left, Mars on Right
        targetMoonX = baseMoonX;
        targetMoonY = Math.sin(animClock * 0.8) * 0.15;
        targetMoonZ = 0.3;
        targetMoonScale = activeHover === 'moon' ? 1.15 : 1.0;

        targetMarsX = baseMarsX;
        targetMarsY = -Math.sin(animClock * 0.8) * 0.15;
        targetMarsZ = -0.3;
        targetMarsScale = activeHover === 'mars' ? 1.15 : 1.0;
      } else if (mode === 'crossing') {
        // Planetary Crossing: Moon and Mars swap sides in 3D!
        const t = Math.min(Math.max((sp - 0.04) / 0.12, 0), 1);
        targetMoonX = baseMoonX + t * (baseMarsX * 1.95);
        targetMoonY = Math.sin(t * Math.PI) * 1.2;
        targetMoonZ = 0.3 + Math.sin(t * Math.PI) * 2.8;

        targetMarsX = baseMarsX - t * (baseMarsX * 1.95);
        targetMarsY = -Math.sin(t * Math.PI) * 1.4;
        targetMarsZ = -0.3 - Math.sin(t * Math.PI) * 2.2;
      } else if (mode === 'lunar') {
        // MOON TAKES THE SPOTLIGHT IN THE CENTER (GENTLE FRAMING LIKE MARS)
        targetMoonX = 0.0;
        targetMoonY = spotY;
        targetMoonZ = 0.6;
        targetMoonScale = isMobile ? 1.55 : 1.85;

        targetMarsX = 5.0;
        targetMarsY = -3.0;
        targetMarsZ = -25.0;
        targetMarsScale = 0.0001; // Mars is gone!
      } else if (mode === 'mars_surface') {
        // MARS TAKES THE SPOTLIGHT IN THE CENTER AND BIG!
        targetMoonX = -5.0;
        targetMoonY = 3.0;
        targetMoonZ = -25.0;
        targetMoonScale = 0.0001; // Moon is gone!

        targetMarsX = 0.0;
        targetMarsY = spotY;
        targetMarsZ = 0.6;
        targetMarsScale = isMobile ? 0.85 : 1.05;
      } else if (mode === 'mer_rover') {
        // MER ROVER IN SPOTLIGHT IN THE CENTER AND BIG!
        targetMoonScale = 0.0001;
        targetMoonZ = -25.0;

        targetMarsX = 0.0;
        targetMarsY = 1.4;
        targetMarsZ = -11.0;
        targetMarsScale = 0.55; // Background Mars

        targetSpiritX = 0.0;
        targetSpiritY = isMobile ? -0.05 : 0.02;
        targetSpiritZ = 2.8;
        targetSpiritScale = isMobile ? 2.0 : 2.65;
        spiritGroup.rotation.y += 0.005;
      } else if (mode === 'insight') {
        // INSIGHT LANDER IN SPOTLIGHT IN THE CENTER AND BIG!
        targetMoonScale = 0.0001;
        targetMoonZ = -25.0;

        targetMarsX = 0.0;
        targetMarsY = 1.4;
        targetMarsZ = -11.0;
        targetMarsScale = 0.55;

        targetInsX = 0.0;
        targetInsY = isMobile ? 0.05 : 0.12;
        targetInsZ = 2.8;
        targetInsScale = isMobile ? 2.2 : 2.8;
        insightGroup.rotation.y += 0.005;
      } else if (mode === 'ingenuity') {
        // INGENUITY HELICOPTER IN SPOTLIGHT IN THE CENTER AND BIG!
        targetMoonScale = 0.0001;
        targetMoonZ = -25.0;

        targetMarsX = 0.0;
        targetMarsY = 1.4;
        targetMarsZ = -11.0;
        targetMarsScale = 0.55;

        const hoverBob = Math.sin(animClock * 3.5) * 0.06;
        targetIngX = 0.0;
        targetIngY = (isMobile ? 0.25 : 0.32) + hoverBob;
        targetIngZ = 3.2;
        targetIngScale = isMobile ? 2.2 : 2.85;

        // Smooth yaw rotation so kids can view from all sides, plus subtle aerodynamic hover
        if (!isPointerDown || dragTarget !== 'ingenuity') {
          ingenuityGroup.rotation.y += 0.006;
        }
        ingenuityGroup.rotation.z = Math.sin(animClock * 2.0) * 0.04;
        ingenuityGroup.rotation.x = 0.08 + Math.cos(animClock * 2.2) * 0.02;
      } else if (mode === 'dawn') {
        // DAWN ASTEROID SPACECRAFT IN SPOTLIGHT IN THE CENTER AND BIG!
        targetMoonScale = 0.0001;
        targetMoonZ = -25.0;

        targetMarsScale = 0.0001;
        targetMarsZ = -25.0;

        targetDawnX = 0.0;
        targetDawnY = isMobile ? 0.2 : 0.28;
        targetDawnZ = 2.9;
        targetDawnScale = isMobile ? 2.0 : 2.6;

        dawnGroup.rotation.y += 0.006;
        dawnGroup.rotation.z = Math.sin(animClock * 1.2) * 0.05;
      }

      // Smooth interpolation for all objects
      const lerpSpeed = 0.07;

      moonGroup.position.x += (targetMoonX - moonGroup.position.x) * lerpSpeed;
      moonGroup.position.y += (targetMoonY - moonGroup.position.y) * lerpSpeed;
      moonGroup.position.z += (targetMoonZ - moonGroup.position.z) * lerpSpeed;
      currentMoonScale += (targetMoonScale - currentMoonScale) * lerpSpeed;
      moonGroup.scale.setScalar(currentMoonScale);

      marsGroup.position.x += (targetMarsX - marsGroup.position.x) * lerpSpeed;
      marsGroup.position.y += (targetMarsY - marsGroup.position.y) * lerpSpeed;
      marsGroup.position.z += (targetMarsZ - marsGroup.position.z) * lerpSpeed;
      currentMarsScale += (targetMarsScale - currentMarsScale) * lerpSpeed;
      marsGroup.scale.setScalar(currentMarsScale);

      ingenuityGroup.position.x += (targetIngX - ingenuityGroup.position.x) * lerpSpeed;
      ingenuityGroup.position.y += (targetIngY - ingenuityGroup.position.y) * lerpSpeed;
      ingenuityGroup.position.z += (targetIngZ - ingenuityGroup.position.z) * lerpSpeed;
      currentIngScale += (targetIngScale - currentIngScale) * lerpSpeed;
      ingenuityGroup.scale.setScalar(currentIngScale);

      dawnGroup.position.x += (targetDawnX - dawnGroup.position.x) * lerpSpeed;
      dawnGroup.position.y += (targetDawnY - dawnGroup.position.y) * lerpSpeed;
      dawnGroup.position.z += (targetDawnZ - dawnGroup.position.z) * lerpSpeed;
      currentDawnScale += (targetDawnScale - currentDawnScale) * lerpSpeed;
      dawnGroup.scale.setScalar(currentDawnScale);

      sojournerGroup.position.x += (targetSojournerX - sojournerGroup.position.x) * lerpSpeed;
      sojournerGroup.position.y += (targetSojournerY - sojournerGroup.position.y) * lerpSpeed;
      sojournerGroup.position.z += (targetSojournerZ - sojournerGroup.position.z) * lerpSpeed;
      currentSojournerScale += (targetSojournerScale - currentSojournerScale) * lerpSpeed;
      sojournerGroup.scale.setScalar(currentSojournerScale);

      vikingGroup.position.x += (targetViking1X - vikingGroup.position.x) * lerpSpeed;
      vikingGroup.position.y += (targetViking1Y - vikingGroup.position.y) * lerpSpeed;
      vikingGroup.position.z += (targetViking1Z - vikingGroup.position.z) * lerpSpeed;
      currentViking1Scale += (targetViking1Scale - currentViking1Scale) * lerpSpeed;
      vikingGroup.scale.setScalar(currentViking1Scale);

      viking2Group.position.x += (targetViking2X - viking2Group.position.x) * lerpSpeed;
      viking2Group.position.y += (targetViking2Y - viking2Group.position.y) * lerpSpeed;
      viking2Group.position.z += (targetViking2Z - viking2Group.position.z) * lerpSpeed;
      currentViking2Scale += (targetViking2Scale - currentViking2Scale) * lerpSpeed;
      viking2Group.scale.setScalar(currentViking2Scale);

      spiritGroup.position.x += (targetSpiritX - spiritGroup.position.x) * lerpSpeed;
      spiritGroup.position.y += (targetSpiritY - spiritGroup.position.y) * lerpSpeed;
      spiritGroup.position.z += (targetSpiritZ - spiritGroup.position.z) * lerpSpeed;
      currentSpiritScale += (targetSpiritScale - currentSpiritScale) * lerpSpeed;
      spiritGroup.scale.setScalar(currentSpiritScale);

      opportunityGroup.position.x += (targetOppX - opportunityGroup.position.x) * lerpSpeed;
      opportunityGroup.position.y += (targetOppY - opportunityGroup.position.y) * lerpSpeed;
      opportunityGroup.position.z += (targetOppZ - opportunityGroup.position.z) * lerpSpeed;
      currentOppScale += (targetOppScale - currentOppScale) * lerpSpeed;
      opportunityGroup.scale.setScalar(currentOppScale);

      insightGroup.position.x += (targetInsX - insightGroup.position.x) * lerpSpeed;
      insightGroup.position.y += (targetInsY - insightGroup.position.y) * lerpSpeed;
      insightGroup.position.z += (targetInsZ - insightGroup.position.z) * lerpSpeed;
      currentInsScale += (targetInsScale - currentInsScale) * lerpSpeed;
      insightGroup.scale.setScalar(currentInsScale);

      // Camera view with scene orbit
      camera.position.z += (targetCameraZ - camera.position.z) * 0.08;
      camera.position.x = Math.sin(sceneRotY) * camera.position.z * 0.35;
      camera.position.y = Math.sin(sceneRotX) * camera.position.z * 0.25;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      isDisposed = true;
      try { dracoLoader.dispose(); } catch {}
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('set-insight-variant', handleInsightVariantEvent);
      window.removeEventListener('set-active-mission-id', handleSetActiveMissionEvent);
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      container.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);

      moonGeometry.dispose();
      marsGeometry.dispose();
      starGeometry.dispose();
      orbitCurveGeo.dispose();
      orbit2Geo.dispose();

      moonMaterial.dispose();
      marsMaterial.dispose();
      starMaterial.dispose();
      orbitMaterial.dispose();
      orbit2Material.dispose();

      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden select-none"
      style={{ touchAction: 'none' }}
    />
  );
};
