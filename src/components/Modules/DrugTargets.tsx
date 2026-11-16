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
    <div className="w-full max-w-6xl mx-auto space-y-7 text-slate-100 animate-fade-in">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-950/80 text-indigo-300 border border-indigo-800/60 font-mono">
          Clinical Pharmacology &bull; Antiretroviral Regimens
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2 tracking-tight">
          Antiretroviral Drug Targets &amp; Mechanisms
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          Comprehensive breakdown of the 6 major drug classes, their active catalytic targets, and the clinical evidence behind Undetectable = Untransmittable.
        </p>
      </div>

      {/* U=U Showcase Banner */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-[#0e172a] border border-slate-700/80 p-6 sm:p-7 shadow-card">
        <div className="max-w-4xl space-y-3.5">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs tracking-wide font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>GLOBAL CLINICAL CONSENSUS</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            {U_EQUALS_U_SCIENCE.statement}
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            {U_EQUALS_U_SCIENCE.summary}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            {U_EQUALS_U_SCIENCE.landmarkStudies.map((study, i) => (
              <div key={i} className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl text-xs space-y-1">
                <span className="font-bold text-slate-200 block">{study.name}</span>
                <p className="text-slate-400 text-[11px] leading-snug">{study.details}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-sky-300 pt-1">
            <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
            <span>Clinical suppression threshold: {U_EQUALS_U_SCIENCE.clinicalThreshold}</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
        {/* Class Filter Buttons */}
        <div className="flex flex-wrap gap-1.5 items-center">
          <button
            onClick={() => setSelectedClassId('all')}
            className={`cursor-pointer px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              selectedClassId === 'all'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            All Classes ({DRUG_CLASSES.length})
          </button>
          {DRUG_CLASSES.map((cls) => (
            <button
              key={cls.id}
              onClick={() => setSelectedClassId(cls.id)}
              className={`cursor-pointer px-2.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedClassId === cls.id
                  ? 'bg-slate-800 text-sky-300 border border-slate-700'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800'
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
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-8 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-sky-500 transition"
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredClasses.map((cls: DrugClassInfo) => (
          <div
            key={cls.id}
            className="bg-[#0f172a] border rounded-2xl p-6 shadow-card flex flex-col justify-between space-y-4 hover:border-slate-700 transition"
            style={{ borderColor: `${cls.color}35` }}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span
                  className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold"
                  style={{
                    backgroundColor: `${cls.color}15`,
                    color: cls.color,
                    border: `1px solid ${cls.color}40`,
                  }}
                >
                  {cls.acronym}
                </span>
                <span className="text-xs text-slate-400">
                  Resistance Barrier:{' '}
                  <span
                    className={`font-semibold ${
                      cls.geneticBarrier.includes('Very High')
                        ? 'text-emerald-400'
                        : cls.geneticBarrier.includes('High')
                        ? 'text-sky-400'
                        : 'text-amber-400'
                    }`}
                  >
                    {cls.geneticBarrier}
                  </span>
                </span>
              </div>

              <h4 className="text-xl font-bold text-white">{cls.className}</h4>
              <p className="text-xs text-slate-400 font-mono mt-0.5">Target: {cls.molecularTarget}</p>

              {/* Mechanism */}
              <div className="mt-3 bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                {cls.mechanismOfAction}
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-800">
              {/* Representative Drugs */}
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1 font-mono">
                  <Pill className="w-3 h-3 text-sky-400" /> Representative Medications:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {cls.representativeDrugs.map((drug, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md text-xs bg-slate-950 text-slate-200 border border-slate-800"
                    >
                      {drug}
                    </span>
                  ))}
                </div>
              </div>

              {/* Clinical Advantage */}
              <div className="flex items-start gap-2 bg-slate-950/50 p-2.5 rounded-lg text-xs text-slate-300 border border-slate-800/60">
                <Award className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>{cls.keyAdvantages}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredClasses.length === 0 && (
        <div className="text-center py-12 text-slate-400 bg-slate-950/50 rounded-2xl border border-slate-800">
          <p className="text-sm">No medications match &ldquo;{searchQuery}&rdquo;</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedClassId('all');
            }}
            className="cursor-pointer mt-2 text-xs text-sky-400 hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Gold Standard Regimen Note */}
      <div className="p-5 rounded-2xl bg-[#0f172a] border border-slate-800 flex flex-col sm:flex-row items-center gap-4 shadow-card">
        <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-sky-400 shrink-0">
          <HeartHandshake className="w-5 h-5" />
        </div>
        <div className="text-xs text-slate-300 space-y-1">
          <h5 className="text-sm font-bold text-white">
            Current Standard of Care: &ldquo;Single Tablet Regimen (STR)&rdquo;
          </h5>
          <p className="leading-relaxed">
            Most patients initiate treatment with a single daily co-formulated tablet combining 2 NRTIs + 1 INSTI (e.g. Bictegravir / Emtricitabine / Tenofovir alafenamide), achieving sustained undetectable viral loads with high tolerability.
          </p>
        </div>
      </div>
    </div>
  );
};
