import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  Pill,
  ExternalLink,
  MapPin,
  Dna,
} from 'lucide-react';
import { REPLICATION_STAGES, ReplicationStage } from '../../data/replicationStages';

interface ReplicationCycleProps {
  onJumpTo3DModel?: () => void;
}

export const ReplicationCycle: React.FC<ReplicationCycleProps> = ({ onJumpTo3DModel }) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const currentStage: ReplicationStage =
    REPLICATION_STAGES.find((s) => s.step === activeStep) || REPLICATION_STAGES[0];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 text-slate-100 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            Cellular Virology Module
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            HIV-1 Replication & Cellular Lifecycle
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Explore the six sequential steps of HIV host-cell invasion, proviral synthesis, chromosomal integration, and virion maturation.
          </p>
        </div>

        {/* Stepper Navigation buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
            disabled={activeStep === 1}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 transition"
            aria-label="Previous stage"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-mono text-slate-300 px-2 font-semibold">
            Stage {activeStep} of {REPLICATION_STAGES.length}
          </span>
          <button
            onClick={() => setActiveStep((prev) => Math.min(REPLICATION_STAGES.length, prev + 1))}
            disabled={activeStep === REPLICATION_STAGES.length}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 transition"
            aria-label="Next stage"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stepper Progress Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {REPLICATION_STAGES.map((stage) => {
          const isActive = stage.step === activeStep;
          const isPassed = stage.step < activeStep;
          return (
            <button
              key={stage.id}
              onClick={() => setActiveStep(stage.step)}
              className={`text-left p-3 rounded-2xl border transition relative overflow-hidden ${
                isActive
                  ? 'bg-slate-800/95 border-cyan-400 shadow-lg shadow-cyan-500/10'
                  : isPassed
                  ? 'bg-slate-900/60 border-slate-700/60 hover:bg-slate-800/60'
                  : 'bg-slate-900/30 border-slate-800/60 hover:bg-slate-800/40 opacity-70'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className="w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center font-mono"
                  style={{
                    backgroundColor: isActive ? stage.color : isPassed ? '#334155' : '#1e293b',
                    color: isActive ? '#0a0f1d' : '#94a3b8',
                  }}
                >
                  {stage.step}
                </span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: stage.color }} />
                )}
              </div>
              <div className="text-xs font-bold text-slate-100 truncate">{stage.title}</div>
              <div className="text-[10px] text-slate-400 truncate">{stage.subtitle}</div>
            </button>
          );
        })}
      </div>

      {/* Stage Detail Card */}
      <div
        className="bg-slate-900/80 backdrop-blur-md border rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
        style={{ borderColor: `${currentStage.color}40` }}
      >
        {/* Ambient background glow */}
        <div
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ backgroundColor: currentStage.color }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content Column */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold font-mono uppercase tracking-wider"
                  style={{
                    backgroundColor: `${currentStage.color}20`,
                    color: currentStage.color,
                    border: `1px solid ${currentStage.color}50`,
                  }}
                >
                  Stage {currentStage.step}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-full">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  {currentStage.cellularLocation}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">{currentStage.title}</h3>
              <p className="text-sm font-medium text-slate-300 mt-1">{currentStage.subtitle}</p>
            </div>

            {/* Biochemical Mechanism */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Biochemical Mechanism
              </h4>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed bg-slate-950/40 p-4 rounded-2xl border border-slate-800/80">
                {currentStage.mechanism}
              </p>
            </div>

            {/* Molecular Actors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/40 space-y-1">
                <span className="text-xs font-semibold text-rose-400 flex items-center gap-1.5">
                  <Dna className="w-3.5 h-3.5" /> Viral Proteins Involved
                </span>
                <ul className="text-xs text-slate-300 space-y-0.5 list-disc list-inside">
                  {currentStage.viralProteins.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/40 space-y-1">
                <span className="text-xs font-semibold text-cyan-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5" /> Host Factors Required
                </span>
                <ul className="text-xs text-slate-300 space-y-0.5 list-disc list-inside">
                  {currentStage.hostFactors.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quick 3D Demo Jump Link (Stage 3 specific) */}
            {currentStage.step === 3 && onJumpTo3DModel && (
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between gap-4">
                <div>
                  <h5 className="text-sm font-bold text-emerald-300">Interactive 3D Simulation Available</h5>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Watch the mathematical double helix unzipping and 3D NRTI drug chain-termination in real-time.
                  </p>
                </div>
                <button
                  onClick={onJumpTo3DModel}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition flex items-center gap-1.5 whitespace-nowrap shadow-md shadow-emerald-500/20"
                >
                  Open 3D Lab <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Therapeutics & Clinical Significance */}
          <div className="lg:col-span-5 space-y-5">
            {/* Targeted Antiretrovirals */}
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
                <Pill className="w-4 h-4" /> Targeted Antiretroviral Classes
              </div>
              <div className="space-y-1.5">
                {currentStage.antiretroviralTargets.map((target, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-200 flex items-start gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    <span>{target}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Clinical & Scientific Highlight */}
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
                <ShieldAlert className="w-4 h-4" /> Clinical Virology Insight
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentStage.clinicalHighlight}
              </p>
            </div>

            {/* Key Molecular Complex */}
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/60 text-xs">
              <span className="text-slate-400 font-mono text-[11px] block mb-0.5">Key Intermediate Complex:</span>
              <span className="font-semibold text-slate-200 font-mono">{currentStage.keyMolecules}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
