import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  Award,
  HeartHandshake,
  CheckCircle2,
  Search,
  X,
  Pill,
} from 'lucide-react';
import { DRUG_CLASSES, U_EQUALS_U_SCIENCE, DrugClassInfo } from '../../data/drugMechanisms';

export const DrugTargets: React.FC = () => {
  const [selectedClassId, setSelectedClassId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredClasses = useMemo(() => {
    return DRUG_CLASSES.filter((c) => {
      const matchesClass = selectedClassId === 'all' || c.id === selectedClassId;
      if (!matchesClass) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const matchName = c.className.toLowerCase().includes(q) || c.acronym.toLowerCase().includes(q);
      const matchDrugs = c.representativeDrugs.some((d) => d.toLowerCase().includes(q));
      const matchTarget = c.molecularTarget.toLowerCase().includes(q);
      return matchName || matchDrugs || matchTarget;
    });
  }, [selectedClassId, searchQuery]);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 text-slate-100 animate-fade-in">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800/80">
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 font-mono">
          MODULE 03 &bull; CLINICAL PHARMACOLOGY
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 font-display tracking-tight">
          Antiretroviral Drug Targets &amp; Mechanisms
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          Modern HIV therapy transforms a once-fatal diagnosis into a manageable chronic condition through combination therapy blocking viral replication at multiple stages.
        </p>
      </div>

      {/* U=U Showcase Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950/90 via-slate-950 to-cyan-950/90 border border-emerald-500/40 p-6 sm:p-8 shadow-glow-emerald hud-corner-tl hud-corner-br">
        <div className="max-w-4xl space-y-4 relative z-10">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs tracking-wider font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>GLOBAL SCIENTIFIC CONSENSUS</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
            {U_EQUALS_U_SCIENCE.statement}
          </h3>

          <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            {U_EQUALS_U_SCIENCE.summary}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            {U_EQUALS_U_SCIENCE.landmarkStudies.map((study, i) => (
              <div key={i} className="bg-slate-900/80 border border-slate-800/90 p-3.5 rounded-2xl text-xs space-y-1">
                <span className="font-bold text-emerald-300 block font-display">{study.name}</span>
                <p className="text-slate-400 text-[11px] leading-snug">{study.details}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 pt-1">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Clinical suppression threshold: {U_EQUALS_U_SCIENCE.clinicalThreshold}</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-950/70 p-3 rounded-2xl border border-slate-800/80">
        {/* Class Filter Buttons */}
        <div className="flex flex-wrap gap-1.5 items-center">
          <button
            onClick={() => setSelectedClassId('all')}
            className={`cursor-pointer px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              selectedClassId === 'all'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-glow-cyan'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            All Classes ({DRUG_CLASSES.length})
          </button>
          {DRUG_CLASSES.map((cls) => (
            <button
              key={cls.id}
              onClick={() => setSelectedClassId(cls.id)}
              className={`cursor-pointer px-2.5 py-1.5 rounded-xl text-xs font-semibold transition font-display ${
                selectedClassId === cls.id
                  ? 'bg-slate-800 text-cyan-300 border border-cyan-500/50'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800/60'
              }`}
            >
              {cls.acronym}
            </button>
          ))}
        </div>

        {/* Quick Medication Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search drug or target..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-8 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="cursor-pointer absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Drug Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredClasses.map((cls: DrugClassInfo) => (
          <div
            key={cls.id}
            className="bg-slate-950/80 backdrop-blur-xl border rounded-3xl p-6 shadow-xl flex flex-col justify-between space-y-5 transition hover:border-slate-700 hud-corner-tl"
            style={{ borderColor: `${cls.color}40` }}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold"
                  style={{
                    backgroundColor: `${cls.color}20`,
                    color: cls.color,
                    border: `1px solid ${cls.color}50`,
                  }}
                >
                  {cls.acronym}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  Resistance Barrier:{' '}
                  <span
                    className={`font-bold ${
                      cls.geneticBarrier.includes('Very High')
                        ? 'text-emerald-400'
                        : cls.geneticBarrier.includes('High')
                        ? 'text-cyan-400'
                        : 'text-amber-400'
                    }`}
                  >
                    {cls.geneticBarrier}
                  </span>
                </span>
              </div>

              <h4 className="text-xl font-bold text-white font-display">{cls.className}</h4>
              <p className="text-xs text-slate-400 font-mono mt-0.5">Target: {cls.molecularTarget}</p>

              {/* Mechanism */}
              <div className="mt-3.5 bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                {cls.mechanismOfAction}
              </div>
            </div>

            <div className="space-y-3.5 pt-3 border-t border-slate-800/80">
              {/* Representative Drugs */}
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono block mb-1.5 flex items-center gap-1">
                  <Pill className="w-3 h-3 text-cyan-400" /> Representative Medications:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {cls.representativeDrugs.map((drug, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-xl text-xs bg-slate-900/90 text-slate-200 border border-slate-800 font-medium"
                    >
                      {drug}
                    </span>
                  ))}
                </div>
              </div>

              {/* Clinical Advantage */}
              <div className="flex items-start gap-2 bg-slate-900/40 p-3 rounded-xl text-xs text-slate-300 border border-slate-800/60">
                <Award className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{cls.keyAdvantages}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredClasses.length === 0 && (
        <div className="text-center py-12 text-slate-400 bg-slate-950/40 rounded-3xl border border-slate-800">
          <p className="text-sm">No medications match &ldquo;{searchQuery}&rdquo;</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedClassId('all');
            }}
            className="cursor-pointer mt-2 text-xs text-cyan-400 hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Gold Standard Regimen Note */}
      <div className="p-6 rounded-3xl bg-slate-950/80 border border-slate-800/90 flex flex-col sm:flex-row items-center gap-4 shadow-xl">
        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
          <HeartHandshake className="w-6 h-6" />
        </div>
        <div className="text-xs text-slate-300 space-y-1">
          <h5 className="text-sm font-bold text-white font-display">
            Modern First-Line Standard: &ldquo;Single Tablet Regimen (STR)&rdquo;
          </h5>
          <p className="leading-relaxed">
            Most patients initiate treatment with a single daily pill combining 2 NRTIs + 1 INSTI (e.g. Bictegravir / Emtricitabine / Tenofovir alafenamide), achieving sustained undetectable viral loads with minimal side effects.
          </p>
        </div>
      </div>
    </div>
  );
};
