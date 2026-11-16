import React from 'react';
import { X, ShieldAlert, Pill, Dna, Info } from 'lucide-react';
import { AnatomyDetail } from '../../data/anatomyData';

interface HotspotModalProps {
  detail: AnatomyDetail | null;
  onClose: () => void;
}

export const HotspotModal: React.FC<HotspotModalProps> = ({ detail, onClose }) => {
  if (!detail) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-lg bg-slate-900/95 border border-slate-700/80 rounded-2xl p-6 shadow-2xl text-slate-100 overflow-hidden"
        style={{ borderColor: detail.color }}
      >
        {/* Glow accent */}
        <div
          className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: detail.color }}
        />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span
              className="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full mb-1.5"
              style={{
                backgroundColor: `${detail.color}20`,
                color: detail.color,
                border: `1px solid ${detail.color}40`,
              }}
            >
              {detail.category}
            </span>
            <h3 className="text-xl font-bold tracking-tight text-white">{detail.name}</h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">MW: {detail.molecularWeight}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content */}
        <div className="mt-4 space-y-4 text-sm max-h-[60vh] overflow-y-auto pr-1">
          <div>
            <h4 className="flex items-center gap-1.5 font-semibold text-slate-200 mb-1">
              <Info className="w-4 h-4 text-cyan-400" /> Biological Function
            </h4>
            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">{detail.function}</p>
          </div>

          <div>
            <h4 className="flex items-center gap-1.5 font-semibold text-slate-200 mb-1">
              <Dna className="w-4 h-4 text-purple-400" /> Structure & Architecture
            </h4>
            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">{detail.structure}</p>
          </div>

          <div>
            <h4 className="flex items-center gap-1.5 font-semibold text-slate-200 mb-1">
              <ShieldAlert className="w-4 h-4 text-amber-400" /> Clinical & Diagnostic Significance
            </h4>
            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">{detail.clinicalSignificance}</p>
          </div>

          {detail.therapeutics.length > 0 && (
            <div>
              <h4 className="flex items-center gap-1.5 font-semibold text-slate-200 mb-1.5">
                <Pill className="w-4 h-4 text-emerald-400" /> Targeted Therapeutics & Inhibitors
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {detail.therapeutics.map((drug, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs rounded-md bg-slate-800/90 text-emerald-300 border border-emerald-500/20"
                  >
                    {drug}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-3 border-t border-slate-800/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
