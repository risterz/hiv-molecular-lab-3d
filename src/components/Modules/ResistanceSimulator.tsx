import React, { useState } from 'react';
import { RESISTANCE_MUTATIONS, ResistanceMutation } from '../../data/resistanceData';
import {
  CheckCircle2,
  XCircle,
  ShieldAlert,
  ShieldCheck,
  Zap,
  Info,
} from 'lucide-react';

export const ResistanceSimulator: React.FC = () => {
  const [selectedMutation, setSelectedMutation] = useState<ResistanceMutation>(
    RESISTANCE_MUTATIONS[0]
  );
  const [isMutated, setIsMutated] = useState<boolean>(true);
  const [incomingMolecule, setIncomingMolecule] = useState<'drug' | 'natural'>('drug');

  // Biophysical calculation
  const hasClash = isMutated && incomingMolecule === 'drug';
  const vdwDistance = hasClash
    ? selectedMutation.stericClashDistance
    : incomingMolecule === 'drug'
    ? 3.4
    : 2.9;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-sky-950/70 text-sky-400 border border-sky-800/60 font-mono">
            MODULE 04 &bull; BIOPHYSICAL RESISTANCE SIMULATOR
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 font-display tracking-tight">
            Active-Site Steric Hindrance &amp; Drug Resistance
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
            Examine how single amino acid substitutions physically block antiretroviral drug binding while permitting natural nucleotides to replicate.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Molecular Docking Model</span>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Pocket Canvas (7 cols) */}
        <div className="lg:col-span-7 bg-[#151f32] border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
            {/* Mutation Select */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-300 font-mono">Mutation:</span>
              <select
                value={selectedMutation.id}
                onChange={(e) => {
                  const m = RESISTANCE_MUTATIONS.find((x) => x.id === e.target.value);
                  if (m) setSelectedMutation(m);
                }}
                className="bg-slate-900 text-xs text-white border border-slate-700 rounded-lg px-2.5 py-1 font-mono focus:outline-none focus:border-sky-500"
              >
                {RESISTANCE_MUTATIONS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Toggle State */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMutated(false)}
                className={`cursor-pointer px-2.5 py-1 rounded-md text-xs font-medium transition ${
                  !isMutated
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                Wild Type ({selectedMutation.wildTypeResidue.split(' ')[0]})
              </button>
              <button
                onClick={() => setIsMutated(true)}
                className={`cursor-pointer px-2.5 py-1 rounded-md text-xs font-medium transition ${
                  isMutated
                    ? 'bg-rose-950 text-rose-300 border border-rose-700'
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                Mutant ({selectedMutation.mutantResidue.split(' ')[0]})
              </button>
            </div>
          </div>

          {/* Incoming Substrate Toggle */}
          <div className="flex items-center justify-between bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-300 font-medium">Test Incoming Molecule:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIncomingMolecule('drug')}
                className={`cursor-pointer px-3 py-1 rounded-lg font-semibold transition ${
                  incomingMolecule === 'drug'
                    ? 'bg-indigo-950 text-indigo-300 border border-indigo-700'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                Drug Analog ({selectedMutation.affectedDrugs[0].split(' ')[0]})
              </button>
              <button
                onClick={() => setIncomingMolecule('natural')}
                className={`cursor-pointer px-3 py-1 rounded-lg font-semibold transition ${
                  incomingMolecule === 'natural'
                    ? 'bg-sky-950 text-sky-300 border border-sky-700'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                Natural Substrate (dNTP)
              </button>
            </div>
          </div>

          {/* Molecular Active Site Canvas (SVG) */}
          <div className="w-full bg-[#080c14] border border-slate-800 rounded-xl p-4 select-none flex flex-col items-center">
            <svg viewBox="0 0 520 280" className="w-full max-w-md font-mono text-[11px]">
              {/* Catalytic Cavity Boundary */}
              <path
                d="M 60 40 Q 90 200 240 210 Q 380 200 460 40"
                fill="none"
                stroke="#1e293b"
                strokeWidth={3}
                strokeDasharray="4 4"
              />
              <text x={260} y={235} textAnchor="middle" fill="#64748b" fontSize={9}>
                {selectedMutation.targetEnzyme} Catalytic Cavity
              </text>

              {/* Catalytic Triad Aspartate 185 */}
              <g transform="translate(140, 160)">
                <circle cx={0} cy={0} r={12} fill="#334155" />
                <text x={0} y={4} textAnchor="middle" fill="#94a3b8" fontSize={9} fontWeight="bold">
                  Asp
                </text>
                <text x={0} y={24} textAnchor="middle" fill="#64748b" fontSize={8}>
                  185
                </text>
                <circle cx={-4} cy={-4} r={3} fill="#ef4444" />
                <circle cx={4} cy={-4} r={3} fill="#ef4444" />
              </g>

              {/* Catalytic Triad Aspartate 186 */}
              <g transform="translate(380, 160)">
                <circle cx={0} cy={0} r={12} fill="#334155" />
                <text x={0} y={4} textAnchor="middle" fill="#94a3b8" fontSize={9} fontWeight="bold">
                  Asp
                </text>
                <text x={0} y={24} textAnchor="middle" fill="#64748b" fontSize={8}>
                  186
                </text>
                <circle cx={-4} cy={-4} r={3} fill="#ef4444" />
                <circle cx={4} cy={-4} r={3} fill="#ef4444" />
              </g>

              {/* Residue 184 (or Target Codon) Sidechain */}
              <g transform="translate(200, 150)">
                {isMutated ? (
                  // Mutant Valine: Branched Beta-methyls extending upward
                  <g>
                    <path
                      d="M 0 0 L 15 -35 M 15 -35 L 5 -55 M 15 -35 L 35 -50"
                      stroke="#f43f5e"
                      strokeWidth={3}
                    />
                    <circle cx={5} cy={-55} r={8} fill="#f43f5e" />
                    <text x={5} y={-52} textAnchor="middle" fill="#ffffff" fontSize={7} fontWeight="bold">
                      CH3
                    </text>
                    <circle cx={35} cy={-50} r={8} fill="#f43f5e" />
                    <text x={35} y={-47} textAnchor="middle" fill="#ffffff" fontSize={7} fontWeight="bold">
                      CH3
                    </text>
                    <text x={-10} y={20} fill="#f43f5e" fontSize={9} fontWeight="bold">
                      Val{selectedMutation.codonNumber} (Branched)
                    </text>
                  </g>
                ) : (
                  // Wild Type Methionine: Flexible, folded away
                  <g>
                    <path
                      d="M 0 0 L -10 -25 L -35 -30 L -50 -15"
                      stroke="#10b981"
                      strokeWidth={3}
                    />
                    <circle cx={-35} cy={-30} r={7} fill="#eab308" />
                    <text x={-35} y={-27} textAnchor="middle" fill="#000" fontSize={7} fontWeight="bold">
                      S
                    </text>
                    <circle cx={-50} cy={-15} r={7} fill="#10b981" />
                    <text x={-50} y={-12} textAnchor="middle" fill="#fff" fontSize={7} fontWeight="bold">
                      C
                    </text>
                    <text x={-40} y={20} fill="#10b981" fontSize={9} fontWeight="bold">
                      Met{selectedMutation.codonNumber} (Flexible)
                    </text>
                  </g>
                )}
              </g>

              {/* Incoming Molecule (Docked or Clashing) */}
              <g transform={hasClash ? 'translate(265, 80)' : 'translate(260, 95)'}>
                {incomingMolecule === 'drug' ? (
                  // Drug Analog with bulky/rigid sulfur/oxathiolane ring
                  <g>
                    <rect
                      x={-24}
                      y={-18}
                      width={48}
                      height={36}
                      rx={8}
                      fill={hasClash ? '#f43f5e' : '#6366f1'}
                      stroke={hasClash ? '#ffffff' : '#a5b4fc'}
                      strokeWidth={1.5}
                    />
                    <text x={0} y={-2} textAnchor="middle" fill="#ffffff" fontSize={8} fontWeight="bold">
                      {selectedMutation.affectedDrugs[0].split(' ')[0]}
                    </text>
                    <text x={0} y={10} textAnchor="middle" fill="#e0e7ff" fontSize={7}>
                      Oxathiolane Ring
                    </text>
                  </g>
                ) : (
                  // Natural dNTP with compact planar deoxyribose
                  <g>
                    <ellipse
                      cx={0}
                      cy={0}
                      rx={20}
                      ry={14}
                      fill="#0284c7"
                      stroke="#7dd3fc"
                      strokeWidth={1.5}
                    />
                    <text x={0} y={3} textAnchor="middle" fill="#ffffff" fontSize={8} fontWeight="bold">
                      Natural dNTP
                    </text>
                  </g>
                )}
              </g>

              {/* Van der Waals Collision Distance Line */}
              <line
                x1={235}
                y1={95}
                x2={hasClash ? 245 : 240}
                y2={95}
                stroke={hasClash ? '#ef4444' : '#10b981'}
                strokeWidth={2}
              />
              <text
                x={260}
                y={hasClash ? 45 : 60}
                textAnchor="middle"
                fill={hasClash ? '#f43f5e' : '#10b981'}
                fontSize={10}
                fontWeight="bold"
              >
                Distance: {vdwDistance.toFixed(1)} &Aring; {hasClash ? '(STERIC CLASH!)' : '(Fit OK)'}
              </text>

              {/* Collision Burst Rays if clashing */}
              {hasClash && (
                <g transform="translate(240, 95)" stroke="#f43f5e" strokeWidth={2}>
                  <line x1={-12} y1={-12} x2={-20} y2={-20} />
                  <line x1={12} y1={-12} x2={20} y2={-20} />
                  <line x1={-12} y1={12} x2={-20} y2={20} />
                  <line x1={12} y1={12} x2={20} y2={20} />
                </g>
              )}
            </svg>

            {/* Status Callout below Canvas */}
            <div
              className={`w-full mt-3 p-3 rounded-xl border flex items-center gap-3 text-xs ${
                hasClash
                  ? 'bg-rose-950/50 border-rose-800 text-rose-200'
                  : 'bg-emerald-950/50 border-emerald-800 text-emerald-200'
              }`}
            >
              {hasClash ? (
                <>
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  <div>
                    <strong className="block font-bold">DRUG REJECTED: STERIC CLASH DETECTED</strong>
                    <span>
                      The mutated {selectedMutation.mutantResidue} sidechain overlaps with the drug
                      ring ({vdwDistance.toFixed(1)} &Aring; &lt; 2.0 &Aring; VDW threshold).
                      Incorporation is physically blocked.
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <strong className="block font-bold">PERMITTED BINDING: CATALYTIC DOCKING</strong>
                    <span>
                      Sufficient clearance ({vdwDistance.toFixed(1)} &Aring;). The molecule docks
                      smoothly into the catalytic pocket without collision.
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right: Detailed Pharmacological Intelligence (5 cols) */}
        <div className="lg:col-span-5 bg-[#151f32] border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4">
          <div className="pb-3 border-b border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
              Mutation Profile
            </span>
            <h3 className="text-xl font-bold text-white mt-0.5">
              {selectedMutation.name}
            </h3>
            <span className="text-xs text-sky-400 font-mono">
              Enzyme: {selectedMutation.targetEnzyme} &bull; Codon {selectedMutation.codonNumber}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {/* Fold Resistance */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] font-semibold text-slate-400 uppercase block font-mono">
                Resistance Impact
              </span>
              <span className="text-rose-400 font-bold block mt-0.5">
                {selectedMutation.foldResistance}
              </span>
            </div>

            {/* Affected vs Spared Drugs */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-900/60">
                <span className="text-[10px] font-semibold text-rose-300 uppercase block font-mono flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3" /> Compromised
                </span>
                <div className="mt-1 space-y-0.5">
                  {selectedMutation.affectedDrugs.map((d, i) => (
                    <div key={i} className="text-slate-200 text-[11px]">
                      &bull; {d}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-900/60">
                <span className="text-[10px] font-semibold text-emerald-300 uppercase block font-mono flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Spared / Active
                </span>
                <div className="mt-1 space-y-0.5">
                  {selectedMutation.sparedDrugs.map((d, i) => (
                    <div key={i} className="text-slate-200 text-[11px]">
                      &bull; {d}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Biophysics Explanation */}
            <div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase block font-mono">
                Molecular Biophysics
              </span>
              <p className="text-slate-300 mt-1 leading-relaxed text-[11px]">
                {selectedMutation.molecularBiophysics}
              </p>
            </div>

            {/* Viral Fitness Impact */}
            <div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase block font-mono">
                Viral Fitness &amp; Replication Penalty
              </span>
              <p className="text-slate-300 mt-1 leading-relaxed text-[11px]">
                {selectedMutation.fitnessImpact}
              </p>
            </div>

            {/* Clinical Practice Guideline */}
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
              <span className="text-[10px] font-semibold text-sky-400 uppercase block font-mono flex items-center gap-1">
                <Info className="w-3 h-3" /> Clinical Practice Strategy
              </span>
              <p className="text-slate-300 mt-1 text-[11px] leading-relaxed">
                {selectedMutation.clinicalGuideline}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
