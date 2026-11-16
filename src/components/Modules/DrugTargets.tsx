import React, { useState } from 'react';
import { ShieldCheck, Award, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { DRUG_CLASSES, U_EQUALS_U_SCIENCE, DrugClassInfo } from '../../data/drugMechanisms';

export const DrugTargets: React.FC = () => {
  const [selectedClassId, setSelectedClassId] = useState<string>('all');

  const filteredClasses =
    selectedClassId === 'all'
      ? DRUG_CLASSES
      : DRUG_CLASSES.filter((c) => c.id === selectedClassId);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 text-slate-100 animate-fade-in">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Pharmacology & Antiretroviral Therapy (ART)
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Drug Targets & Antiretroviral Mechanisms
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          Modern HIV therapy transforms a once-fatal infection into a manageable chronic condition through combination therapy that blocks viral replication at multiple stages.
        </p>
      </div>

      {/* U=U Showcase Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-cyan-950/80 border border-emerald-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm tracking-wide">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>GLOBAL SCIENTIFIC CONSENSUS</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            {U_EQUALS_U_SCIENCE.statement}
          </h3>
          <p className="text-sm text-slate-200 leading-relaxed">
            {U_EQUALS_U_SCIENCE.summary}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {U_EQUALS_U_SCIENCE.landmarkStudies.map((study, i) => (
              <div key={i} className="bg-slate-900/80 border border-slate-800 p-3 rounded-2xl text-xs">
                <span className="font-bold text-emerald-300 block mb-1">{study.name}</span>
                <p className="text-slate-400 text-[11px] leading-snug">{study.details}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 pt-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Clinical suppression threshold: {U_EQUALS_U_SCIENCE.clinicalThreshold}</span>
          </div>
        </div>
      </div>

      {/* Class Filter Bar */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs font-semibold text-slate-400 mr-1">Filter Class:</span>
        <button
          onClick={() => setSelectedClassId('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
            selectedClassId === 'all'
              ? 'bg-cyan-500 text-slate-950 font-bold'
              : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800'
          }`}
        >
          All Classes ({DRUG_CLASSES.length})
        </button>
        {DRUG_CLASSES.map((cls) => (
          <button
            key={cls.id}
            onClick={() => setSelectedClassId(cls.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              selectedClassId === cls.id
                ? 'bg-slate-800 text-white border border-slate-600'
                : 'bg-slate-900/60 text-slate-400 hover:bg-slate-800/80'
            }`}
          >
            {cls.acronym}
          </button>
        ))}
      </div>

      {/* Drug Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredClasses.map((cls: DrugClassInfo) => (
          <div
            key={cls.id}
            className="bg-slate-900/80 backdrop-blur-md border rounded-3xl p-6 shadow-xl flex flex-col justify-between space-y-4 transition hover:border-slate-600"
            style={{ borderColor: `${cls.color}35` }}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold"
                  style={{
                    backgroundColor: `${cls.color}20`,
                    color: cls.color,
                    border: `1px solid ${cls.color}40`,
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

              <h4 className="text-xl font-bold text-white">{cls.className}</h4>
              <p className="text-xs text-slate-400 font-mono mt-0.5">Target: {cls.molecularTarget}</p>

              {/* Mechanism */}
              <div className="mt-3 bg-slate-950/50 p-3.5 rounded-2xl border border-slate-800/60 text-xs text-slate-300 leading-relaxed">
                {cls.mechanismOfAction}
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-slate-800/80">
              {/* Representative Drugs */}
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                  Representative Medications:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {cls.representativeDrugs.map((drug, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded-lg text-xs bg-slate-800/90 text-slate-200 border border-slate-700/50"
                    >
                      {drug}
                    </span>
                  ))}
                </div>
              </div>

              {/* Clinical Advantage */}
              <div className="flex items-start gap-2 bg-slate-800/40 p-2.5 rounded-xl text-xs text-slate-300">
                <Award className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{cls.keyAdvantages}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gold Standard Regimen Note */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center gap-4">
        <HeartHandshake className="w-10 h-10 text-cyan-400 shrink-0" />
        <div className="text-xs text-slate-300 space-y-1">
          <h5 className="text-sm font-bold text-white">Modern First-Line Regimen: &ldquo;Single Tablet Regimen (STR)&rdquo;</h5>
          <p className="leading-relaxed">
            Most patients initiate treatment with a single daily pill combining 2 NRTIs + 1 INSTI (e.g. Bictegravir / Emtricitabine / Tenofovir alafenamide), achieving sustained undetectable viral loads with minimal side effects.
          </p>
        </div>
      </div>
    </div>
  );
};
