import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { ProceduralDnaModel } from './ProceduralDNA';
import { ProceduralVirionModel } from './ProceduralVirion';
import { ProceduralReverseTranscriptionModel } from './ProceduralReverseTranscription';
import { ControlsOverlay, SceneMode } from './ControlsOverlay';
import { HotspotModal } from './HotspotModal';
import { ANATOMY_DETAILS, AnatomyDetail } from '../../data/anatomyData';

export const CanvasContainer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [sceneMode, setSceneMode] = useState<SceneMode>('dna');
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [rotationSpeed, setRotationSpeed] = useState<number>(1.0);
  const [rtProgress, setRtProgress] = useState<number>(0.5);
  const [isDrugInhibited, setIsDrugInhibited] = useState<boolean>(false);
  const [selectedHotspot, setSelectedHotspot] = useState<AnatomyDetail | null>(null);

  // Keep fresh refs for animation loop and interaction
  const isRotatingRef = useRef<boolean>(isRotating);
  isRotatingRef.current = isRotating;
  const rotationSpeedRef = useRef<number>(rotationSpeed);
  rotationSpeedRef.current = rotationSpeed;
  const rtProgressRef = useRef<number>(rtProgress);
  rtProgressRef.current = rtProgress;
  const isDrugInhibitedRef = useRef<boolean>(isDrugInhibited);
  isDrugInhibitedRef.current = isDrugInhibited;

  // Three.js internal references
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelRootRef = useRef<THREE.Group | null>(null);
  const animFrameIdRef = useRef<number>(0);

  // Active models
  const dnaModelRef = useRef<ProceduralDnaModel | null>(null);
  const virionModelRef = useRef<ProceduralVirionModel | null>(null);
  const rtModelRef = useRef<ProceduralReverseTranscriptionModel | null>(null);

  // Mouse interaction state for manual orbit rotation
  const isDraggingRef = useRef<boolean>(false);
  const prevMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const mouseDownPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseVecRef = useRef<THREE.Vector2>(new THREE.Vector2());

  // Switch 3D Model logic
  const loadScene = useCallback((mode: SceneMode) => {
    const root = modelRootRef.current;
    if (!root) return;

    // Clear existing children from model root
    while (root.children.length > 0) {
      root.remove(root.children[0]);
    }

    // Dispose existing model resources
    dnaModelRef.current?.dispose();
    dnaModelRef.current = null;
    virionModelRef.current?.dispose();
    virionModelRef.current = null;
    rtModelRef.current?.dispose();
    rtModelRef.current = null;

    // Reset root transforms
    root.rotation.set(0, 0, 0);

    const camera = cameraRef.current;
    if (!camera) return;

    if (mode === 'dna') {
      const dna = new ProceduralDnaModel({ turns: 2.8, bpPerTurn: 10.5, radius: 1.2, pitch: 3.4 });
      dnaModelRef.current = dna;
      root.add(dna.group);
      camera.position.set(0, 0, 9);
    } else if (mode === 'virion_outer') {
      const virion = new ProceduralVirionModel({ isCutaway: false });
      virionModelRef.current = virion;
      root.add(virion.group);
      camera.position.set(0, 0, 11);
    } else if (mode === 'virion_cutaway') {
      const cutaway = new ProceduralVirionModel({ isCutaway: true });
      virionModelRef.current = cutaway;
      root.add(cutaway.group);
      camera.position.set(0, 0, 11);
    } else if (mode === 'reverse_transcription') {
      const rt = new ProceduralReverseTranscriptionModel({
        progress: rtProgressRef.current,
        isDrugInhibited: isDrugInhibitedRef.current,
      });
      rtModelRef.current = rt;
      root.add(rt.group);
      camera.position.set(0, 0, 9);
    }
  }, []);

  // Initialize Three.js WebGL scene
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || 600;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0f1d);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 9);
    cameraRef.current = camera;

    // 3. Renderer with local clipping enabled for cutaway models
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.localClippingEnabled = true;
    rendererRef.current = renderer;
    mount.appendChild(renderer.domElement);

    // 4. Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 1.2);
    dirLight1.position.set(10, 15, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xa855f7, 0.8);
    dirLight2.position.set(-10, -10, -10);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 0.6, 20);
    pointLight.position.set(0, 0, 6);
    scene.add(pointLight);

    // 5. Model Root
    const modelRoot = new THREE.Group();
    scene.add(modelRoot);
    modelRootRef.current = modelRoot;

    // Initial load
    loadScene(sceneMode);

    // 6. Animation loop
    let lastTime = performance.now();
    const animate = (time: number) => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (isRotatingRef.current && modelRootRef.current) {
        modelRootRef.current.rotation.y += delta * 0.35 * rotationSpeedRef.current;
      }

      renderer.render(scene, camera);
    };
    animFrameIdRef.current = requestAnimationFrame(animate);

    // 7. Resize Observer
    const handleResize = () => {
      if (!mount || !renderer || !camera) return;
      const newWidth = mount.clientWidth;
      const newHeight = mount.clientHeight;
      if (newWidth <= 0 || newHeight <= 0) return;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(mount);

    // Cleanup
    return () => {
      cancelAnimationFrame(animFrameIdRef.current);
      resizeObserver.disconnect();
      dnaModelRef.current?.dispose();
      virionModelRef.current?.dispose();
      rtModelRef.current?.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []); // Run once on mount

  // Watch sceneMode change
  useEffect(() => {
    loadScene(sceneMode);
  }, [sceneMode, loadScene]);

  // Watch Reverse Transcription update
  useEffect(() => {
    if (sceneMode === 'reverse_transcription' && rtModelRef.current) {
      rtModelRef.current.update(rtProgress, isDrugInhibited);
    }
  }, [rtProgress, isDrugInhibited, sceneMode]);

  // Mouse drag orbit handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    prevMousePosRef.current = { x: e.clientX, y: e.clientY };
    mouseDownPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !modelRootRef.current) return;
    const deltaX = e.clientX - prevMousePosRef.current.x;
    const deltaY = e.clientY - prevMousePosRef.current.y;
    prevMousePosRef.current = { x: e.clientX, y: e.clientY };

    modelRootRef.current.rotation.y += deltaX * 0.008;
    modelRootRef.current.rotation.x += deltaY * 0.008;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Canvas click raycasting for hotspots
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Ignore click if mouse moved more than 5px (was dragging)
    const dragDistance = Math.hypot(
      e.clientX - mouseDownPosRef.current.x,
      e.clientY - mouseDownPosRef.current.y
    );
    if (dragDistance > 5) return;

    const mount = mountRef.current;
    const camera = cameraRef.current;
    const scene = sceneRef.current;
    if (!mount || !camera || !scene) return;

    const rect = mount.getBoundingClientRect();
    mouseVecRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseVecRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycasterRef.current.setFromCamera(mouseVecRef.current, camera);

    if (virionModelRef.current && virionModelRef.current.hotspotObjects.length > 0) {
      const intersects = raycasterRef.current.intersectObjects(virionModelRef.current.hotspotObjects, true);
      if (intersects.length > 0) {
        let currentObj: THREE.Object3D | null = intersects[0].object;
        while (currentObj && !currentObj.userData.hotspot) {
          currentObj = currentObj.parent;
        }
        if (currentObj && currentObj.userData.hotspot) {
          const hotspotId = currentObj.userData.hotspot.id;
          if (ANATOMY_DETAILS[hotspotId]) {
            setSelectedHotspot(ANATOMY_DETAILS[hotspotId]);
          }
        }
      }
    }
  };

  const handleResetCamera = () => {
    if (modelRootRef.current) {
      modelRootRef.current.rotation.set(0, 0, 0);
    }
    if (cameraRef.current) {
      const z = sceneMode === 'dna' || sceneMode === 'reverse_transcription' ? 9 : 11;
      cameraRef.current.position.set(0, 0, z);
    }
  };

  const handleZoomIn = () => {
    if (!cameraRef.current) return;
    cameraRef.current.position.z = Math.max(4, cameraRef.current.position.z - 1.2);
  };

  const handleZoomOut = () => {
    if (!cameraRef.current) return;
    cameraRef.current.position.z = Math.min(20, cameraRef.current.position.z + 1.2);
  };

  const handlePresetView = (preset: 'front' | 'top' | 'iso') => {
    if (!cameraRef.current || !modelRootRef.current) return;
    const baseZ = sceneMode === 'dna' || sceneMode === 'reverse_transcription' ? 9 : 11;
    if (preset === 'front') {
      modelRootRef.current.rotation.set(0, 0, 0);
      cameraRef.current.position.set(0, 0, baseZ);
    } else if (preset === 'top') {
      modelRootRef.current.rotation.set(Math.PI / 2, 0, 0);
      cameraRef.current.position.set(0, 0, baseZ);
    } else if (preset === 'iso') {
      modelRootRef.current.rotation.set(0.4, 0.6, 0);
      cameraRef.current.position.set(0, 0, baseZ);
    }
  };

  const handleSelectHotspot = (hotspotId: string) => {
    if (ANATOMY_DETAILS[hotspotId]) {
      setSelectedHotspot(ANATOMY_DETAILS[hotspotId]);
    }
  };

  return (
    <div className="relative w-full h-[640px] sm:h-[720px] bg-[#050510] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl hud-corner-tl hud-corner-br">
      {/* 3D WebGL Canvas Viewport */}
      <div
        ref={mountRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleCanvasClick}
        className="w-full h-full cursor-grab active:cursor-grabbing select-none"
      />

      {/* Interactive HUD Overlays */}
      <ControlsOverlay
        sceneMode={sceneMode}
        onSceneModeChange={setSceneMode}
        isRotating={isRotating}
        onToggleRotate={() => setIsRotating((prev) => !prev)}
        rotationSpeed={rotationSpeed}
        onRotationSpeedChange={setRotationSpeed}
        rtProgress={rtProgress}
        onRtProgressChange={setRtProgress}
        isDrugInhibited={isDrugInhibited}
        onToggleDrugInhibited={() => setIsDrugInhibited((prev) => !prev)}
        onSelectHotspot={handleSelectHotspot}
        onResetCamera={handleResetCamera}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onPresetView={handlePresetView}
      />

      {/* Hotspot Anatomy Modal */}
      <HotspotModal detail={selectedHotspot} onClose={() => setSelectedHotspot(null)} />
    </div>
  );
};
