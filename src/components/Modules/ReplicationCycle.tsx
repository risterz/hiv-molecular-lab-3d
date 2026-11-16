import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  Pill,
  ExternalLink,
  MapPin,
  Dna,
  Activity,
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
    <div className="w-full max-w-6xl mx-auto space-y-7 text-slate-100 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 font-mono">
            Cellular Virology &bull; Lifecycle Stages
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2 tracking-tight">
            HIV-1 Replication &amp; Cellular Infection Stages
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Detailed step-by-step molecular sequence of viral attachment, reverse transcription, integration into host chromatin, and virion maturation.
          </p>
        </div>

        {/* Stepper Navigation buttons */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
            disabled={activeStep === 1}
            className="cursor-pointer p-2 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-200 transition"
            aria-label="Previous stage"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-slate-300 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg font-semibold">
            Stage {activeStep} of {REPLICATION_STAGES.length}
          </span>
          <button
            onClick={() => setActiveStep((prev) => Math.min(REPLICATION_STAGES.length, prev + 1))}
            disabled={activeStep === REPLICATION_STAGES.length}
            className="cursor-pointer p-2 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-200 transition"
            aria-label="Next stage"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stepper Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {REPLICATION_STAGES.map((stage) => {
          const isActive = stage.step === activeStep;
          const isPassed = stage.step < activeStep;
          return (
            <button
              key={stage.id}
              onClick={() => setActiveStep(stage.step)}
              className={`cursor-pointer text-left p-3 rounded-xl border transition ${
                isActive
                  ? 'bg-slate-900 border-sky-500 shadow-sm'
                  : isPassed
                  ? 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/60'
                  : 'bg-slate-950/30 border-slate-900 hover:bg-slate-900/30 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className="w-5 h-5 rounded-md text-[10px] font-bold flex items-center justify-center font-mono"
                  style={{
                    backgroundColor: isActive ? stage.color : isPassed ? '#1e293b' : '#0f172a',
                    color: isActive ? '#ffffff' : '#94a3b8',
                  }}
                >
                  {stage.step}
                </span>
              </div>
              <div className="text-xs font-semibold text-slate-100 truncate">{stage.title}</div>
              <div className="text-[11px] text-slate-400 truncate mt-0.5">{stage.subtitle}</div>
            </button>
          );
        })}
      </div>

      {/* Stage Detail Card */}
      <div
        className="bg-[#0f172a] border rounded-2xl p-6 sm:p-8 shadow-card"
        style={{ borderColor: `${currentStage.color}35` }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content Column */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span
                  className="px-2.5 py-0.5 rounded-md text-xs font-mono font-semibold"
                  style={{
                    backgroundColor: `${currentStage.color}15`,
                    color: currentStage.color,
                    border: `1px solid ${currentStage.color}40`,
                  }}
                >
                  Stage {currentStage.step} of 6
                </span>
                <span className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900 border border-slate-800 px-2.5 py-0.5 rounded-md">
                  <MapPin className="w-3.5 h-3.5 text-sky-400" />
                  {currentStage.cellularLocation}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {currentStage.title}
              </h3>
              <p className="text-sm text-slate-300 mt-1">{currentStage.subtitle}</p>
            </div>

            {/* Biochemical Mechanism */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-sky-400" /> Biochemical Mechanism
              </h4>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                {currentStage.mechanism}
              </p>
            </div>

            {/* Molecular Actors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-rose-500/20 space-y-1.5">
                <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                  <Dna className="w-3.5 h-3.5" /> Viral Proteins Involved
                </span>
                <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                  {currentStage.viralProteins.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-sky-500/20 space-y-1.5">
                <span className="text-xs font-bold text-sky-300 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5" /> Host Factors Required
                </span>
                <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                  {currentStage.hostFactors.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quick 3D Demo Jump Link (Stage 3 specific) */}
            {currentStage.step === 3 && onJumpTo3DModel && (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-700/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h5 className="text-sm font-bold text-emerald-200">
                    Interactive 3D Simulation Available
                  </h5>
                  <p className="text-xs text-slate-300 mt-0.5">
                    View reverse transcriptase elongating cDNA and the molecular mechanism of NRTI chain-termination.
                  </p>
                </div>
                <button
                  onClick={onJumpTo3DModel}
                  className="cursor-pointer px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition flex items-center gap-1.5 whitespace-nowrap shadow-sm"
                >
                  View 3D Model <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Therapeutics & Clinical Significance */}
          <div className="lg:col-span-5 space-y-4">
            {/* Targeted Antiretrovirals */}
            <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
                <Pill className="w-4 h-4" /> Targeted Antiretroviral Classes
              </div>
              <div className="space-y-2">
                {currentStage.antiretroviralTargets.map((target, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 flex items-start gap-2.5"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1 shrink-0" />
                    <span className="leading-relaxed">{target}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Clinical & Scientific Highlight */}
            <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
                <ShieldAlert className="w-4 h-4" /> Clinical Virology Insight
              </div>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800/60">
                {currentStage.clinicalHighlight}
              </p>
            </div>

            {/* Key Molecular Complex */}
            <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
              <span className="text-slate-400 font-mono text-[11px] block mb-0.5">
                KEY INTERMEDIATE COMPLEX:
              </span>
              <span className="font-semibold text-slate-200 font-mono block">
                {currentStage.keyMolecules}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
