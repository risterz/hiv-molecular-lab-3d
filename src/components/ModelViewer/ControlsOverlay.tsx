import React from 'react';
import { Play, Pause, RotateCcw, Eye, ShieldCheck, Zap } from 'lucide-react';
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
}) => {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4 sm:p-6 text-slate-100">
      {/* Top Bar: Scene Mode Switcher */}
      <div className="pointer-events-auto flex flex-wrap items-center justify-between gap-2 bg-slate-900/80 backdrop-blur-md border border-slate-800/80 p-2 rounded-2xl shadow-xl max-w-4xl mx-auto w-full">
        <div className="flex flex-wrap gap-1 w-full sm:w-auto">
          <button
            onClick={() => onSceneModeChange('dna')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
              sceneMode === 'dna'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            🧬 B-DNA Double Helix
          </button>
          <button
            onClick={() => onSceneModeChange('virion_outer')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
              sceneMode === 'virion_outer'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            🦠 HIV Virion (Envelope)
          </button>
          <button
            onClick={() => onSceneModeChange('virion_cutaway')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
              sceneMode === 'virion_cutaway'
                ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            🔍 Virion Cutaway Core
          </button>
          <button
            onClick={() => onSceneModeChange('reverse_transcription')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
              sceneMode === 'reverse_transcription'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            ⚡ Reverse Transcription
          </button>
        </div>

        {/* Global Camera & Rotation tools */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={onToggleRotate}
            className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition"
            title={isRotating ? 'Pause auto-rotation' : 'Play auto-rotation'}
            aria-label="Toggle rotation"
          >
            {isRotating ? <Pause className="w-4 h-4 text-cyan-400" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={onResetCamera}
            className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition"
            title="Reset viewpoint"
            aria-label="Reset camera"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Middle Floating Overlays / Hotspots */}
      <div className="pointer-events-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-3 mt-auto">
        {/* Left Side: Legend or Hotspot Quick Picks */}
        {sceneMode === 'dna' && (
          <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800/80 p-3 rounded-2xl shadow-lg text-xs space-y-1.5 max-w-xs">
            <div className="font-semibold text-slate-200 flex items-center gap-1.5">
              <span>Nucleotide Base Pairs</span>
              <span className="text-[10px] text-slate-400 font-mono">(10.5 bp / turn)</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              {(['A', 'T', 'G', 'C'] as DnaNucleotide[]).map((base) => {
                const info = BASE_PAIRS[base];
                return (
                  <div key={base} className="flex items-center gap-1.5 bg-slate-800/60 px-2 py-1 rounded-lg">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: info.color }} />
                    <span className="font-mono font-bold text-slate-200">{base}</span>
                    <span className="text-slate-400 text-[11px] truncate">{info.fullName}</span>
                  </div>
                );
              })}
            </div>
            <p className="text-[11px] text-slate-400 pt-1 leading-snug">
              A-T (2 H-bonds) &bull; G-C (3 H-bonds). Major groove 222.5&deg;, minor groove 137.5&deg;.
            </p>
          </div>
        )}

        {(sceneMode === 'virion_outer' || sceneMode === 'virion_cutaway') && (
          <div className="bg-slate-900/85 backdrop-blur-md border border-slate-800/80 p-3 rounded-2xl shadow-lg text-xs space-y-2 max-w-sm">
            <div className="font-semibold text-slate-200 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-cyan-400" /> Click Hotspot to Inspect
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {sceneMode === 'virion_cutaway' ? 'Internal Core' : '72 Spikes'}
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
                      className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-200 border border-slate-700/60 flex items-center gap-1.5 transition"
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span>{item.shortName}</span>
                    </button>
                  );
                }
              )}
            </div>
          </div>
        )}

        {/* Right Side: Reverse Transcription Specific Interactive Controls */}
        {sceneMode === 'reverse_transcription' && (
          <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800/80 p-4 rounded-2xl shadow-xl text-xs space-y-3 max-w-sm w-full">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-200 flex items-center gap-1.5 text-sm">
                <Zap className="w-4 h-4 text-emerald-400" /> RT Elongation Scrubber
              </span>
              <span className="font-mono text-emerald-400 font-bold">{Math.round(rtProgress * 100)}%</span>
            </div>

            <div className="space-y-1">
              <input
                type="range"
                min="0"
                max="1"
                step="0.02"
                value={rtProgress}
                onChange={(e) => onRtProgressChange(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>ssRNA Template</span>
                <span>cDNA Duplex</span>
              </div>
            </div>

            {/* Drug Inhibitor Toggle */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-semibold text-slate-200 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-red-400" /> NRTI Drug Blocker
                </span>
                <p className="text-[10px] text-slate-400">Halts 3'-OH chain elongation</p>
              </div>
              <button
                onClick={onToggleDrugInhibited}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition ${
                  isDrugInhibited
                    ? 'bg-red-500 text-white shadow-md shadow-red-500/20'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {isDrugInhibited ? 'ACTIVE (AZT/TDF)' : 'OFF'}
              </button>
            </div>
          </div>
        )}

        {/* Subtle Rotation Speed Slider in Bottom Corner */}
        <div className="bg-slate-900/70 backdrop-blur-md border border-slate-800/80 px-3 py-1.5 rounded-xl text-xs flex items-center gap-2">
          <span className="text-[11px] text-slate-400">Speed</span>
          <input
            type="range"
            min="0.2"
            max="2.5"
            step="0.1"
            value={rotationSpeed}
            onChange={(e) => onRotationSpeedChange(parseFloat(e.target.value))}
            className="w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>
      </div>
    </div>
  );
};
