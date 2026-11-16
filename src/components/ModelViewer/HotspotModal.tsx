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
        className="relative w-full max-w-lg bg-[#0f172a] border border-slate-700/80 rounded-2xl p-6 sm:p-7 shadow-2xl text-slate-100 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span
              className="inline-block px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider rounded-md mb-1.5"
              style={{
                backgroundColor: `${detail.color}20`,
                color: detail.color,
                border: `1px solid ${detail.color}40`,
              }}
            >
              {detail.category} Target
            </span>
            <h3 className="text-xl font-bold tracking-tight text-white">{detail.name}</h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">Molecular Weight: {detail.molecularWeight}</p>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content */}
        <div className="mt-4 space-y-4 text-sm max-h-[60vh] overflow-y-auto pr-1">
          <div>
            <h4 className="flex items-center gap-1.5 font-semibold text-slate-200 mb-1">
              <Info className="w-4 h-4 text-sky-400" /> Biological Function
            </h4>
            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
              {detail.function}
            </p>
          </div>

          <div>
            <h4 className="flex items-center gap-1.5 font-semibold text-slate-200 mb-1">
              <Dna className="w-4 h-4 text-indigo-400" /> Structure &amp; Architecture
            </h4>
            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
              {detail.structure}
            </p>
          </div>

          <div>
            <h4 className="flex items-center gap-1.5 font-semibold text-slate-200 mb-1">
              <ShieldAlert className="w-4 h-4 text-amber-400" /> Clinical &amp; Diagnostic Significance
            </h4>
            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
              {detail.clinicalSignificance}
            </p>
          </div>

          {detail.therapeutics.length > 0 && (
            <div>
              <h4 className="flex items-center gap-1.5 font-semibold text-slate-200 mb-1.5">
                <Pill className="w-4 h-4 text-emerald-400" /> Targeted Therapeutics &amp; Inhibitors
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {detail.therapeutics.map((drug, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-xs rounded-lg bg-slate-900 text-emerald-300 border border-emerald-500/20 font-medium"
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
            className="cursor-pointer px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
