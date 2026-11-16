import React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Eye,
  ShieldCheck,
  Zap,
  Dna,
  Radio,
  Crosshair,
  ZoomIn,
  ZoomOut,
  Compass,
  ArrowUp,
  Activity,
  Layers,
} from 'lucide-react';
import { BASE_PAIRS, DnaNucleotide } from '../../utils/dnaMath';
import { ANATOMY_DETAILS } from '../../data/anatomyData';

export type SceneMode = 'dna' | 'virion_outer' | 'virion_cutaway' | 'reverse_transcription';

interface ControlsOverlayProps {
  sceneMode: SceneMode;
  onSceneModeChange: (mode: SceneMode) => void;
  isRotating: boolean;
  onToggleRotate: () => void;
  rotationSpeed: number;
  onRotationSpeedChange: (speed: number) => void;
  rtProgress: number;
  onRtProgressChange: (progress: number) => void;
  isDrugInhibited: boolean;
  onToggleDrugInhibited: () => void;
  onSelectHotspot: (hotspotId: string) => void;
  onResetCamera: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onPresetView: (preset: 'front' | 'top' | 'iso') => void;
}

export const ControlsOverlay: React.FC<ControlsOverlayProps> = ({
  sceneMode,
  onSceneModeChange,
  isRotating,
  onToggleRotate,
  rotationSpeed,
  onRotationSpeedChange,
  rtProgress,
  onRtProgressChange,
  isDrugInhibited,
  onToggleDrugInhibited,
  onSelectHotspot,
  onResetCamera,
  onZoomIn,
  onZoomOut,
  onPresetView,
}) => {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-3 sm:p-5 text-slate-100 select-none">
      {/* Top HUD Console */}
      <div className="pointer-events-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 bg-slate-950/85 backdrop-blur-xl border border-slate-800/90 p-2 sm:p-2.5 rounded-2xl shadow-2xl max-w-5xl mx-auto w-full">
        {/* Model Selectors */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 w-full sm:w-auto">
          <button
            onClick={() => onSceneModeChange('dna')}
            className={`cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition font-display ${
              sceneMode === 'dna'
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.35)]'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900 border border-transparent'
            }`}
          >
            <Dna className="w-4 h-4 text-cyan-400" />
            <span>B-DNA Helix</span>
          </button>

          <button
            onClick={() => onSceneModeChange('virion_outer')}
            className={`cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition font-display ${
              sceneMode === 'virion_outer'
                ? 'bg-rose-500/15 text-rose-300 border border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.35)]'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900 border border-transparent'
            }`}
          >
            <Radio className="w-4 h-4 text-rose-400" />
            <span>Virion Envelope</span>
          </button>

          <button
            onClick={() => onSceneModeChange('virion_cutaway')}
            className={`cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition font-display ${
              sceneMode === 'virion_cutaway'
                ? 'bg-purple-500/15 text-purple-300 border border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.35)]'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900 border border-transparent'
            }`}
          >
            <Crosshair className="w-4 h-4 text-purple-400" />
            <span>Cutaway Core</span>
          </button>

          <button
            onClick={() => onSceneModeChange('reverse_transcription')}
            className={`cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition font-display ${
              sceneMode === 'reverse_transcription'
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.35)]'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900 border border-transparent'
            }`}
          >
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>Reverse Transcription</span>
          </button>
        </div>

        {/* Camera Control Toolbar */}
        <div className="flex items-center gap-1.5 self-center sm:self-auto bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          {/* Preset Angles */}
          <button
            onClick={() => onPresetView('front')}
            className="cursor-pointer p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition"
            title="Front View"
            aria-label="Front view"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onPresetView('top')}
            className="cursor-pointer p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition"
            title="Top-Down View"
            aria-label="Top-down view"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onPresetView('iso')}
            className="cursor-pointer p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition"
            title="Isometric Angle"
            aria-label="Isometric angle"
          >
            <Compass className="w-3.5 h-3.5" />
          </button>

          <span className="w-px h-4 bg-slate-800 mx-0.5" />

          {/* Zoom In/Out */}
          <button
            onClick={onZoomIn}
            className="cursor-pointer p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Zoom In"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onZoomOut}
            className="cursor-pointer p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Zoom Out"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <span className="w-px h-4 bg-slate-800 mx-0.5" />

          {/* Auto Rotation Toggle */}
          <button
            onClick={onToggleRotate}
            className="cursor-pointer p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
            title={isRotating ? 'Pause rotation' : 'Resume rotation'}
            aria-label="Toggle rotation"
          >
            {isRotating ? <Pause className="w-3.5 h-3.5 text-cyan-400" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          {/* Reset Camera */}
          <button
            onClick={onResetCamera}
            className="cursor-pointer p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Reset camera viewpoint"
            aria-label="Reset camera"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Middle HUD Reticle Info Overlay */}
      <div className="pointer-events-none flex justify-between items-start text-[10px] font-mono text-slate-500 px-2 mt-3">
        <div className="flex items-center gap-2 bg-slate-950/70 border border-slate-900/80 px-2.5 py-1 rounded-lg backdrop-blur">
          <Activity className="w-3 h-3 text-cyan-400" />
          <span>VIEWPORT: 60FPS</span>
          <span className="text-slate-700">|</span>
          <span className="text-cyan-400 uppercase">MODE: {sceneMode}</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 bg-slate-950/70 border border-slate-900/80 px-2.5 py-1 rounded-lg backdrop-blur">
          <span>SCALE: 1 UNIT = 1.0 NM</span>
          <span className="text-slate-700">|</span>
          <span>DRAG TO ORBIT</span>
        </div>
      </div>

      {/* Bottom Floating Control Trays */}
      <div className="pointer-events-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-3 mt-auto">
        {/* Left Side: DNA Legend */}
        {sceneMode === 'dna' && (
          <div className="bg-slate-950/90 backdrop-blur-xl border border-slate-800/90 p-3.5 rounded-2xl shadow-2xl text-xs space-y-2 max-w-xs">
            <div className="font-semibold text-slate-200 flex items-center justify-between font-display">
              <span className="flex items-center gap-1.5 text-cyan-300">
                <Dna className="w-4 h-4 text-cyan-400" /> Watson-Crick Base Pairs
              </span>
              <span className="text-[10px] text-slate-400 font-mono">10.5 bp / turn</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 pt-0.5">
              {(['A', 'T', 'G', 'C'] as DnaNucleotide[]).map((base) => {
                const info = BASE_PAIRS[base];
                return (
                  <div key={base} className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1.5 rounded-xl border border-slate-800">
                    <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: info.color }} />
                    <span className="font-mono font-bold text-slate-200">{base}</span>
                    <span className="text-slate-400 text-[11px] truncate">{info.fullName}</span>
                  </div>
                );
              })}
            </div>
            <p className="text-[10px] text-slate-400 pt-1 leading-snug font-mono">
              A-T (2 H-bonds) &bull; G-C (3 H-bonds) &bull; Pitch: 3.4 nm
            </p>
          </div>
        )}

        {/* Left Side: Virion Hotspot Selectors */}
        {(sceneMode === 'virion_outer' || sceneMode === 'virion_cutaway') && (
          <div className="bg-slate-950/90 backdrop-blur-xl border border-slate-800/90 p-3.5 rounded-2xl shadow-2xl text-xs space-y-2 max-w-md">
            <div className="font-semibold text-slate-200 flex items-center justify-between font-display">
              <span className="flex items-center gap-1.5 text-cyan-300">
                <Layers className="w-4 h-4 text-cyan-400" /> Virion Protein Hotspots
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {sceneMode === 'virion_cutaway' ? 'Internal Core & Enzymes' : 'Envelope Trimers'}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['gp120', 'gp41', 'lipid_membrane', 'matrix_p17', 'capsid_p24', 'reverse_transcriptase', 'integrase', 'protease'].map(
                (id) => {
                  const item = ANATOMY_DETAILS[id];
                  if (!item) return null;
                  return (
                    <button
                      key={id}
                      onClick={() => onSelectHotspot(id)}
                      className="cursor-pointer px-2.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-[11px] text-slate-200 border border-slate-800 hover:border-slate-700 flex items-center gap-1.5 transition active:scale-95"
                    >
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="font-medium">{item.shortName}</span>
                    </button>
                  );
                }
              )}
            </div>
          </div>
        )}

        {/* Right Side: Reverse Transcription Interactive Controls */}
        {sceneMode === 'reverse_transcription' && (
          <div className="bg-slate-950/90 backdrop-blur-xl border border-slate-800/90 p-4 rounded-2xl shadow-2xl text-xs space-y-3.5 max-w-sm w-full">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-200 flex items-center gap-2 font-display text-sm">
                <Zap className="w-4 h-4 text-emerald-400" /> Elongation Scrubber
              </span>
              <span className="font-mono text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30">
                {Math.round(rtProgress * 100)}%
              </span>
            </div>

            <div className="space-y-1.5">
              <input
                type="range"
                min="0"
                max="1"
                step="0.02"
                value={rtProgress}
                onChange={(e) => onRtProgressChange(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>ssRNA Template (5&apos;)</span>
                <span>cDNA Duplex (3&apos;)</span>
              </div>
            </div>

            {/* Drug Inhibitor Blocker Toggle */}
            <div className="pt-2.5 border-t border-slate-800 flex items-center justify-between gap-2">
              <div>
                <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-rose-400" /> NRTI Drug Blocker
                </span>
                <p className="text-[10px] text-slate-400 mt-0.5">Simulate AZT/Tenofovir chain-termination</p>
              </div>
              <button
                onClick={onToggleDrugInhibited}
                className={`cursor-pointer px-3 py-1.5 rounded-xl font-bold text-xs transition font-mono ${
                  isDrugInhibited
                    ? 'bg-rose-500 text-white shadow-glow-rose'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {isDrugInhibited ? 'ACTIVE (BLOCK)' : 'INACTIVE'}
              </button>
            </div>
          </div>
        )}

        {/* Speed Adjustment Pill */}
        <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800/90 px-3 py-1.5 rounded-xl text-xs flex items-center gap-2.5 font-mono">
          <span className="text-[10px] text-slate-400">ROTATION</span>
          <input
            type="range"
            min="0.2"
            max="2.5"
            step="0.1"
            value={rotationSpeed}
            onChange={(e) => onRotationSpeedChange(parseFloat(e.target.value))}
            className="w-16 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>
      </div>
    </div>
  );
};
