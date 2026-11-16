import React, { useState } from 'react';
import { HIV_GENES, HivGene } from '../../data/genomeData';
import {
  Dna,
  ExternalLink,
  Layers,
  Box,
} from 'lucide-react';
import { SceneMode } from '../ModelViewer/ControlsOverlay';

interface GenomeMapProps {
  onJumpTo3DModel?: (mode: SceneMode) => void;
}

export const GenomeMap: React.FC<GenomeMapProps> = ({ onJumpTo3DModel }) => {
  const [selectedGene, setSelectedGene] = useState<HivGene>(
    HIV_GENES.find((g) => g.id === 'pol') || HIV_GENES[1]
  );
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const totalBp = 9719;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-sky-950/70 text-sky-400 border border-sky-800/60 font-mono">
            MODULE 03 &bull; PROVIRAL GENOME ARCHITECTURE
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 font-display tracking-tight">
            HIV-1 Proviral Genetic Map (9.7 kb)
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
            Explore the 9 genes and flanking Long Terminal Repeats (LTRs) of HIV-1. Click any gene on the reading frame tracks to inspect its molecular functions, cleavage products, and view its structural counterpart in the 3D lab.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl">
          <Dna className="w-3.5 h-3.5 text-sky-400" />
          <span>HXB2 Reference Genome</span>
        </div>
      </div>

      {/* Main Map Box */}
      <div className="bg-[#151f32] border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-6">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            <span className="font-semibold text-slate-200">Gene Function Categories:</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'All 9 Genes & LTRs' },
              { id: 'structural', label: 'Structural (Gag, Env)' },
              { id: 'enzymatic', label: 'Enzymatic (Pol)' },
              { id: 'regulatory', label: 'Regulatory (Tat, Rev)' },
              { id: 'accessory', label: 'Accessory (Vif, Vpr, Vpu, Nef)' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`cursor-pointer px-3 py-1 rounded-lg text-xs font-medium transition ${
                  categoryFilter === cat.id
                    ? 'bg-sky-950 text-sky-300 border border-sky-700/80'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Genome Visual Track (SVG) */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
            <span>5&apos; LTR (1 bp)</span>
            <span className="text-slate-500">Scale: 9,719 Base Pairs</span>
            <span>3&apos; LTR (9,719 bp)</span>
          </div>

          <div className="w-full overflow-x-auto bg-[#080c14] border border-slate-800/80 rounded-xl p-3 select-none">
            <svg viewBox="0 0 980 180" className="w-full min-w-[750px] font-mono text-[10px]">
              {/* Coordinate axis ruler */}
              <line x1={20} y1={25} x2={960} y2={25} stroke="#334155" strokeWidth={1.5} />
              {[0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 9719].map((bp) => {
                const x = 20 + (bp / totalBp) * 940;
                return (
                  <g key={bp}>
                    <line x1={x} y1={20} x2={x} y2={30} stroke="#475569" strokeWidth={1} />
                    <text x={x} y={15} textAnchor="middle" fill="#64748b" fontSize={8}>
                      {bp}
                    </text>
                  </g>
                );
              })}

              {/* Reading Frame Labels */}
              <text x={8} y={58} fill="#64748b" fontSize={9} textAnchor="end">
                F0
              </text>
              <text x={8} y={103} fill="#64748b" fontSize={9} textAnchor="end">
                F1
              </text>
              <text x={8} y={148} fill="#64748b" fontSize={9} textAnchor="end">
                F2
              </text>

              {/* Frame Track Guide Lines */}
              <line x1={20} y1={55} x2={960} y2={55} stroke="#1e293b" strokeDasharray="3 3" />
              <line x1={20} y1={100} x2={960} y2={100} stroke="#1e293b" strokeDasharray="3 3" />
              <line x1={20} y1={145} x2={960} y2={145} stroke="#1e293b" strokeDasharray="3 3" />

              {/* Gene Blocks */}
              {HIV_GENES.map((gene) => {
                const x = 20 + (gene.startBp / totalBp) * 940;
                const width = Math.max(16, ((gene.endBp - gene.startBp) / totalBp) * 940);
                const isSelected = selectedGene.id === gene.id;
                const isFiltered =
                  categoryFilter === 'all' || gene.category === categoryFilter;

                // Position by reading frame
                const frameY = gene.readingFrame === 0 ? 40 : gene.readingFrame === 1 ? 85 : 130;

                return (
                  <g
                    key={gene.id}
                    onClick={() => setSelectedGene(gene)}
                    className="cursor-pointer transition-all duration-200"
                    opacity={isFiltered ? 1.0 : 0.25}
                  >
                    {/* Shadow if selected */}
                    {isSelected && (
                      <rect
                        x={x - 2}
                        y={frameY - 2}
                        width={width + 4}
                        height={34}
                        rx={6}
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth={2}
                      />
                    )}

                    {/* Gene Block */}
                    <rect
                      x={x}
                      y={frameY}
                      width={width}
                      height={30}
                      rx={4}
                      fill={gene.color}
                      opacity={isSelected ? 0.95 : 0.8}
                      className="hover:opacity-100"
                    />

                    {/* Gene Label */}
                    <text
                      x={x + width / 2}
                      y={frameY + 18}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize={width > 40 ? 11 : 9}
                      fontWeight="bold"
                    >
                      {gene.symbol}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Selected Gene Detailed Inspector */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: selectedGene.color }}
              ></span>
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>{selectedGene.name}</span>
                  <span className="text-xs font-mono font-normal text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    Frame {selectedGene.readingFrame}
                  </span>
                </h3>
                <span className="text-xs text-sky-400 font-mono capitalize">
                  {selectedGene.category} &bull; Coordinates: {selectedGene.startBp} &ndash;{' '}
                  {selectedGene.endBp} bp ({selectedGene.endBp - selectedGene.startBp + 1} bp)
                </span>
              </div>
            </div>

            {/* Jump to 3D View Button */}
            {selectedGene.threeDLinkTarget && onJumpTo3DModel && (
              <button
                onClick={() => onJumpTo3DModel(selectedGene.threeDLinkTarget!)}
                className="cursor-pointer flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-sky-950 hover:bg-sky-900 text-sky-300 border border-sky-800 text-xs font-semibold transition shadow-sm"
              >
                <Box className="w-3.5 h-3.5" />
                <span>Inspect Protein in 3D Lab</span>
                <ExternalLink className="w-3 h-3 text-sky-400" />
              </button>
            )}
          </div>

          {/* Gene Detail Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-3">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block font-mono">
                  Primary Function
                </span>
                <p className="text-slate-200 mt-1 leading-relaxed">
                  {selectedGene.primaryFunction}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block font-mono">
                  Molecular Mechanism
                </span>
                <p className="text-slate-300 mt-1 leading-relaxed">
                  {selectedGene.molecularMechanism}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block font-mono">
                  Cleaved Protein Products
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {selectedGene.proteinProducts.map((p, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-200 border border-slate-700/80 font-mono text-[11px]"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                <span className="text-[11px] font-semibold text-sky-400 uppercase tracking-wider block font-mono">
                  Clinical &amp; Drug Relevance
                </span>
                <p className="text-slate-300 mt-1 text-[11px] leading-relaxed">
                  {selectedGene.clinicalRelevance}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
