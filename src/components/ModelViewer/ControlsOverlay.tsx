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
      {/* Top Scientific Toolbar */}
      <div className="pointer-events-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 bg-slate-900/95 backdrop-blur-md border border-slate-800 p-2 sm:p-2.5 rounded-xl shadow-lg max-w-5xl mx-auto w-full">
        {/* Model Selectors */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 w-full sm:w-auto">
          <button
            onClick={() => onSceneModeChange('dna')}
            className={`cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition ${
              sceneMode === 'dna'
                ? 'bg-sky-950/80 text-sky-200 border border-sky-700/80 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
            }`}
          >
            <Dna className="w-4 h-4 text-sky-400" />
            <span>B-DNA Helix</span>
          </button>

          <button
            onClick={() => onSceneModeChange('virion_outer')}
            className={`cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition ${
              sceneMode === 'virion_outer'
                ? 'bg-rose-950/80 text-rose-200 border border-rose-700/80 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
            }`}
          >
            <Radio className="w-4 h-4 text-rose-400" />
            <span>Virion Envelope</span>
          </button>

          <button
            onClick={() => onSceneModeChange('virion_cutaway')}
            className={`cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition ${
              sceneMode === 'virion_cutaway'
                ? 'bg-indigo-950/80 text-indigo-200 border border-indigo-700/80 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
            }`}
          >
            <Crosshair className="w-4 h-4 text-indigo-400" />
            <span>Cutaway Core</span>
          </button>

          <button
            onClick={() => onSceneModeChange('reverse_transcription')}
            className={`cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition ${
              sceneMode === 'reverse_transcription'
                ? 'bg-emerald-950/80 text-emerald-200 border border-emerald-700/80 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
            }`}
          >
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>Reverse Transcription</span>
          </button>
        </div>

        {/* Camera Control Toolbar */}
        <div className="flex items-center gap-1 self-center sm:self-auto bg-slate-950/80 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => onPresetView('front')}
            className="cursor-pointer p-1.5 rounded text-slate-400 hover:text-sky-300 hover:bg-slate-800 transition text-xs font-mono"
            title="Front Angle"
            aria-label="Front view"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onPresetView('top')}
            className="cursor-pointer p-1.5 rounded text-slate-400 hover:text-sky-300 hover:bg-slate-800 transition"
            title="Top-Down Angle"
            aria-label="Top-down view"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onPresetView('iso')}
            className="cursor-pointer p-1.5 rounded text-slate-400 hover:text-sky-300 hover:bg-slate-800 transition"
            title="Isometric Angle"
            aria-label="Isometric angle"
          >
            <Compass className="w-3.5 h-3.5" />
          </button>

          <span className="w-px h-4 bg-slate-800 mx-0.5" />

          <button
            onClick={onZoomIn}
            className="cursor-pointer p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Zoom In"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onZoomOut}
            className="cursor-pointer p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Zoom Out"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <span className="w-px h-4 bg-slate-800 mx-0.5" />

          <button
            onClick={onToggleRotate}
            className="cursor-pointer p-1.5 rounded text-slate-300 hover:text-white hover:bg-slate-800 transition"
            title={isRotating ? 'Pause auto-rotation' : 'Resume auto-rotation'}
            aria-label="Toggle rotation"
          >
            {isRotating ? <Pause className="w-3.5 h-3.5 text-sky-400" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={onResetCamera}
            className="cursor-pointer p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Reset view"
            aria-label="Reset camera"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Floating Info / Control Trays */}
      <div className="pointer-events-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-3 mt-auto">
        {/* Left Side: DNA Legend */}
        {sceneMode === 'dna' && (
          <div className="bg-slate-900/95 backdrop-blur-md border border-slate-800 p-3 rounded-xl shadow-lg text-xs space-y-2 max-w-xs">
            <div className="font-semibold text-slate-200 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-200">
                <Dna className="w-4 h-4 text-sky-400" /> Base Pairs
              </span>
              <span className="text-[11px] text-slate-400 font-mono">10.5 bp / turn</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {(['A', 'T', 'G', 'C'] as DnaNucleotide[]).map((base) => {
                const info = BASE_PAIRS[base];
                return (
                  <div key={base} className="flex items-center gap-1.5 bg-slate-950/80 px-2 py-1 rounded border border-slate-800">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: info.color }} />
                    <span className="font-mono font-bold text-slate-200">{base}</span>
                    <span className="text-slate-400 text-[11px] truncate">{info.fullName}</span>
                  </div>
                );
              })}
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              A-T (2 H-bonds) &bull; G-C (3 H-bonds) &bull; Pitch 3.4 nm
            </p>
          </div>
        )}

        {/* Left Side: Virion Hotspots */}
        {(sceneMode === 'virion_outer' || sceneMode === 'virion_cutaway') && (
          <div className="bg-slate-900/95 backdrop-blur-md border border-slate-800 p-3 rounded-xl shadow-lg text-xs space-y-2 max-w-md">
            <div className="font-semibold text-slate-200 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-200">
                <Layers className="w-4 h-4 text-sky-400" /> Protein Callouts
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                {sceneMode === 'virion_cutaway' ? 'Internal Core & Enzymes' : 'Envelope Trimers'}
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {['gp120', 'gp41', 'lipid_membrane', 'matrix_p17', 'capsid_p24', 'reverse_transcriptase', 'integrase', 'protease'].map(
                (id) => {
                  const item = ANATOMY_DETAILS[id];
                  if (!item) return null;
                  return (
                    <button
                      key={id}
                      onClick={() => onSelectHotspot(id)}
                      className="cursor-pointer px-2 py-1 rounded-md bg-slate-950/80 hover:bg-slate-800 text-[11px] text-slate-300 border border-slate-800 hover:border-slate-700 flex items-center gap-1.5 transition"
                    >
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span>{item.shortName}</span>
                    </button>
                  );
                }
              )}
            </div>
          </div>
        )}

        {/* Right Side: Reverse Transcription Controls */}
        {sceneMode === 'reverse_transcription' && (
          <div className="bg-slate-900/95 backdrop-blur-md border border-slate-800 p-4 rounded-xl shadow-lg text-xs space-y-3 max-w-sm w-full">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-200 flex items-center gap-1.5 text-sm">
                <Zap className="w-4 h-4 text-emerald-400" /> Elongation Scrubber
              </span>
              <span className="font-mono text-emerald-300 font-bold px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/60">
                {Math.round(rtProgress * 100)}%
              </span>
            </div>

            <div className="space-y-1">
              <input
                type="range"
                min="0"
                max="1"
                step="0.02"
                value={rtProgress}
                onChange={(e) => onRtProgressChange(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>ssRNA Template</span>
                <span>cDNA Duplex</span>
              </div>
            </div>

            {/* Drug Inhibitor Blocker Toggle */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
              <div>
                <span className="font-medium text-slate-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-rose-400" /> NRTI Drug Blocker
                </span>
                <p className="text-[10px] text-slate-400">Simulate AZT/Tenofovir chain-termination</p>
              </div>
              <button
                onClick={onToggleDrugInhibited}
                className={`cursor-pointer px-3 py-1.5 rounded-lg font-semibold text-xs transition ${
                  isDrugInhibited
                    ? 'bg-rose-700 text-white'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {isDrugInhibited ? 'ACTIVE' : 'OFF'}
              </button>
            </div>
          </div>
        )}

        {/* Speed Adjustment Pill */}
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-lg text-xs flex items-center gap-2">
          <span className="text-[11px] text-slate-400 font-medium">Rotation</span>
          <input
            type="range"
            min="0.2"
            max="2.5"
            step="0.1"
            value={rotationSpeed}
            onChange={(e) => onRotationSpeedChange(parseFloat(e.target.value))}
            className="w-16 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
          />
        </div>
      </div>
    </div>
  );
};
