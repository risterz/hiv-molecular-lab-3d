import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { ProceduralDnaModel } from './ProceduralDNA';
import { ProceduralVirionModel } from './ProceduralVirion';
import { ProceduralReverseTranscriptionModel } from './ProceduralReverseTranscription';
import { ControlsOverlay, SceneMode } from './ControlsOverlay';
import { HotspotModal } from './HotspotModal';
import { ANATOMY_DETAILS, AnatomyDetail } from '../../data/anatomyData';

interface CanvasContainerProps {
  initialSceneMode?: SceneMode;
}

export const CanvasContainer: React.FC<CanvasContainerProps> = ({ initialSceneMode = 'dna' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [sceneMode, setSceneMode] = useState<SceneMode>(initialSceneMode);
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
    scene.background = new THREE.Color(0x0b0f19);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 9);
    cameraRef.current = camera;

    // 3. Renderer with local clipping enabled for cutaway models
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.localClippingEnabled = true;
    rendererRef.current = renderer;
    mount.appendChild(renderer.domElement);

    // 4. Lighting setup (Natural Studio Lighting for accurate molecular rendering)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.0);
    dirLight1.position.set(12, 16, 12);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xdbeafe, 0.5);
    dirLight2.position.set(-12, -10, -10);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 0.4, 25);
    pointLight.position.set(0, 0, 8);
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

  const handleExportSnapshot = () => {
    const renderer = rendererRef.current;
    if (!renderer) return;

    if (sceneRef.current && cameraRef.current) {
      renderer.render(sceneRef.current, cameraRef.current);
    }

    const dataUrl = renderer.domElement.toDataURL('image/png');
    const canvas = document.createElement('canvas');
    canvas.width = renderer.domElement.width;
    canvas.height = renderer.domElement.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0);

      // Bottom scientific badge
      const barHeight = Math.max(40, canvas.height * 0.06);
      ctx.fillStyle = 'rgba(11, 15, 25, 0.9)';
      ctx.fillRect(0, canvas.height - barHeight, canvas.width, barHeight);

      ctx.fillStyle = '#38bdf8';
      ctx.font = `bold ${Math.round(barHeight * 0.4)}px sans-serif`;
      ctx.fillText(`HIV MOLECULAR LAB 3D • ${sceneMode.toUpperCase()}`, 20, canvas.height - barHeight * 0.35);

      ctx.fillStyle = '#94a3b8';
      ctx.font = `${Math.round(barHeight * 0.35)}px sans-serif`;
      ctx.fillText('Made by risterz (github.com/risterz)', canvas.width - 280, canvas.height - barHeight * 0.35);

      const stampedUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = stampedUrl;
      a.download = `hiv-molecular-3d-${sceneMode}.png`;
      a.click();
    };
    img.src = dataUrl;
  };

  const handleExportReport = () => {
    const reportText = `=====================================================
HIV MOLECULAR LAB 3D • SCIENTIFIC INVESTIGATION REPORT
Attribution: Made by risterz (https://github.com/risterz)
Generated: ${new Date().toUTCString()}
Reference Standards: CDC • WHO • NIH • HXB2 Proviral Reference
=====================================================

1. ACTIVE 3D MODEL TELEMETRY
----------------------------
Selected Mode: ${sceneMode.toUpperCase()}
Mathematical Formulation: Procedural Parametric WebGL (Zero external mesh dependencies)
${sceneMode === 'dna' ? 'B-DNA Double Helix: 10.5 base pairs/turn, 3.4 nm pitch, major & minor groove phi=2.4 rad' : ''}
${sceneMode === 'virion_outer' ? 'Complete Virion: Fibonacci spherical lattice N=72 spikes (gp120/gp41), lipid bilayer envelope' : ''}
${sceneMode === 'virion_cutaway' ? 'Cutaway Core: Conical p24 capsid fullerene cone, (+)ssRNA twin dimer coils, RT/IN/PR enzymes' : ''}
${sceneMode === 'reverse_transcription' ? `Reverse Transcription Simulation: ${Math.round(rtProgress * 100)}% elongated, NRTI Drug Block: ${isDrugInhibited ? 'ACTIVE (AZT/TDF Terminated)' : 'INACTIVE'}` : ''}

2. CORE CLINICAL & PUBLIC HEALTH EVIDENCE
-----------------------------------------
- Undetectable = Untransmittable (U=U): Confirmed by PARTNER 1, PARTNER 2, Opposites Attract, and HPTN 052.
- Suppression Threshold: Viral load < 200 copies/mL results in zero risk of sexual transmission.
- Antiretroviral Regimen: Triple therapy combining an Integrase Strand Transfer Inhibitor (INSTI) with two Nucleoside Reverse Transcriptase Inhibitors (NRTIs).
- UNAIDS 95-95-95 Targets: 95% diagnosed, 95% on ART, 95% virally suppressed halts community-level transmission.

=====================================================
HIV Molecular Lab 3D • Open Science Resource
=====================================================`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hiv-lab-report-${sceneMode}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative w-full h-[640px] sm:h-[720px] bg-[#0b0f19] rounded-2xl overflow-hidden border border-slate-800 shadow-card">
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
        onExportSnapshot={handleExportSnapshot}
        onExportReport={handleExportReport}
      />

      {/* Hotspot Anatomy Modal */}
      <HotspotModal detail={selectedHotspot} onClose={() => setSelectedHotspot(null)} />
    </div>
  );
};
