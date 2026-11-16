import React, { useState } from 'react';
import {
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  Activity,
  AlertTriangle,
  FileCheck,
  Calendar,
} from 'lucide-react';

export const PreventionAndTesting: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number>(30);

  const getTestReliability = (day: number) => {
    return {
      rna: day >= 10 ? (day >= 33 ? '100% (Conclusive)' : '85-95% (Highly Sensitive)') : 'Too early (<10 days)',
      agAb: day >= 18 ? (day >= 45 ? '99% (Conclusive)' : '85-95% (High Reliability)') : 'Too early (<18 days)',
      rapid: day >= 23 ? (day >= 90 ? '99% (Conclusive)' : '60-80% (Partial Sensitivity)') : 'Too early (<23 days)',
    };
  };

  const reliability = getTestReliability(selectedDay);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-9 text-slate-100 animate-fade-in">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-rose-950/80 text-rose-300 border border-rose-800/60 font-mono">
          Public Health &bull; Prevention Protocols
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2 tracking-tight">
          Transmission Vectors, Prevention &amp; Diagnostic Testing
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          Scientific clarity on verified transmission fluids vs common zero-risk myths, biomedical prevention tools (PrEP and PEP), and evidence-based diagnostic window periods.
        </p>
      </div>

      {/* Transmission Matrix: Vectors vs Myths */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Confirmed Transmission Routes */}
        <div className="bg-[#0f172a] border border-rose-900/50 rounded-2xl p-6 shadow-card space-y-4">
          <div className="flex items-center gap-2.5 text-rose-400 font-bold text-base">
            <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />
            <span>Verified Transmission Routes</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            HIV can only be transmitted through specific body fluids (blood, semen, pre-seminal fluid, rectal fluids, vaginal fluids, and breast milk) coming into contact with a mucous membrane, damaged tissue, or injected directly into the bloodstream.
          </p>

          <div className="space-y-2.5">
            {[
              {
                title: 'Condomless Sexual Intercourse',
                desc: 'Anal or vaginal intercourse without condoms or PrEP with a partner who is not virally suppressed (U=U).',
              },
              {
                title: 'Shared Injection Equipment',
                desc: 'Sharing needles, syringes, cookers, or preparation equipment directly introduces contaminated blood into the bloodstream.',
              },
              {
                title: 'Perinatal / Vertical Transmission',
                desc: 'During pregnancy, childbirth, or breastfeeding without maternal antiretroviral therapy (preventable to <1% with ART).',
              },
              {
                title: 'Unscreened Blood Transfusions',
                desc: 'Extremely rare in modern healthcare systems due to universal nucleic acid testing; risk persists only in unscreened emergencies.',
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                <CheckCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200 block text-xs">{item.title}</strong>
                  <span className="text-slate-400 text-[11px] leading-snug">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transmission Myths (Zero Risk) */}
        <div className="bg-[#0f172a] border border-emerald-900/50 rounded-2xl p-6 shadow-card space-y-4">
          <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-base">
            <XCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Zero-Risk Transmission Myths</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            HIV is structurally fragile, cannot survive outside human host cellular environments, and is never transmitted by casual non-sexual contact, environmental surfaces, or common vectors.
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              { title: 'Saliva & Deep Kissing', desc: 'Saliva enzymes (SLPI) neutralize HIV' },
              { title: 'Tears & Sweat', desc: 'No infectious viral particles present' },
              { title: 'Mosquitoes & Insects', desc: 'HIV cannot replicate in insects' },
              { title: 'Toilet Seats & Doorknobs', desc: 'Virus dries and dies within minutes' },
              { title: 'Sharing Food & Utensils', desc: 'Stomach acid destroys viral particles' },
              { title: 'Swimming Pools & Saunas', desc: 'Chlorine and water instantly inactivate virus' },
              { title: 'Shaking Hands & Hugs', desc: 'Intact skin is an impenetrable barrier' },
              { title: 'Coughing & Sneezing', desc: 'HIV is not airborne' },
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <div>
                  <strong className="text-slate-200 text-xs block">{item.title}</strong>
                  <span className="text-slate-400 text-[10px] leading-tight block mt-0.5">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Biomedical Prevention Toolkit: PrEP and PEP */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-sky-400" /> Biomedical Prevention Arsenal
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PrEP */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 space-y-4 shadow-card">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-sky-950/80 text-sky-300 border border-sky-800/60">
                PRE-EXPOSURE &bull; PrEP
              </span>
              <span className="text-xs text-emerald-400 font-bold font-mono">&gt;99% EFFICACY</span>
            </div>
            <h4 className="text-2xl font-bold text-white">PrEP (Pre-Exposure Prophylaxis)</h4>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
              Medication taken regularly before potential exposure by HIV-negative individuals to prevent HIV from establishing permanent infection in mucosal tissues.
            </p>

            <div className="space-y-2 text-xs pt-1">
              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                <span className="font-semibold text-sky-300 block mb-0.5">Daily Oral Pills:</span>
                <span className="text-slate-300">
                  Truvada (TDF/FTC) or Descovy (TAF/FTC) taken once daily with or without food.
                </span>
              </div>
              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                <span className="font-semibold text-sky-300 block mb-0.5">Long-Acting Injectable:</span>
                <span className="text-slate-300">
                  Apretude (Cabotegravir extended-release) injected by a clinician once every 2 months.
                </span>
              </div>
            </div>
          </div>

          {/* PEP */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 space-y-4 shadow-card">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-amber-950/80 text-amber-300 border border-amber-800/60">
                EMERGENCY POST-EXPOSURE &bull; PEP
              </span>
              <span className="text-xs text-amber-400 font-bold flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5" /> WITHIN 72 HOURS
              </span>
            </div>
            <h4 className="text-2xl font-bold text-white">PEP (Post-Exposure Prophylaxis)</h4>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
              Emergency 28-day course of 3 antiretroviral drugs taken after a single high-risk exposure (e.g. broken condom, sexual assault, or needlestick injury).
            </p>

            <div className="space-y-2 text-xs pt-1">
              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                <span className="font-semibold text-amber-300 block mb-0.5">Time Critical:</span>
                <span className="text-slate-300">
                  Must be started as soon as possible, and no later than 72 hours (3 days) following potential exposure. Every hour counts.
                </span>
              </div>
              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                <span className="font-semibold text-amber-300 block mb-0.5">Standard 28-Day Regimen:</span>
                <span className="text-slate-300">
                  TDF/FTC (Truvada) plus Dolutegravir (Tivicay) or Raltegravir (Isentress) taken daily for exactly 28 days without interruption.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clinical Testing Methods & Interactive Window Periods */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6 shadow-card">
        <div>
          <span className="text-xs font-semibold text-sky-400 font-mono">DIAGNOSTIC TIMELINE</span>
          <h3 className="text-2xl font-bold text-white mt-1">
            Diagnostic Window Periods
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Drag the slider to see which diagnostic tests are conclusive at different times following potential exposure.
          </p>
        </div>

        {/* Interactive Day Scrubber */}
        <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-sky-400" /> Days Since Potential Exposure:
            </span>
            <span className="text-sm font-bold text-sky-300 bg-slate-950 px-3 py-1 rounded-md border border-slate-800">
              Day {selectedDay}
            </span>
          </div>

          <input
            type="range"
            min="5"
            max="95"
            step="1"
            value={selectedDay}
            onChange={(e) => setSelectedDay(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
          />

          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>Day 5</span>
            <span>Day 18 (4th-Gen Earliest)</span>
            <span>Day 45 (4th-Gen Conclusive)</span>
            <span>Day 90 (All Conclusive)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <Activity className="w-5 h-5 text-rose-400" />
              <span className="text-xs font-mono font-semibold text-rose-400">10 &ndash; 33 Days</span>
            </div>
            <h4 className="text-sm font-bold text-white">Nucleic Acid Test (RNA PCR)</h4>
            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono">
              Status at Day {selectedDay}:{' '}
              <strong className={selectedDay >= 10 ? 'text-emerald-400' : 'text-amber-400'}>
                {reliability.rna}
              </strong>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Detects viral RNA directly in blood plasma. Earliest detection method; primarily used for high-risk early exposure and donor blood screening.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-sky-800/40 space-y-2">
            <div className="flex items-center justify-between">
              <FileCheck className="w-5 h-5 text-sky-400" />
              <span className="text-xs font-mono font-semibold text-sky-400">18 &ndash; 45 Days</span>
            </div>
            <h4 className="text-sm font-bold text-white">4th-Gen Ag/Ab Combination</h4>
            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono">
              Status at Day {selectedDay}:{' '}
              <strong className={selectedDay >= 18 ? 'text-emerald-400' : 'text-amber-400'}>
                {reliability.agAb}
              </strong>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Gold standard laboratory test from a vein draw. Simultaneously detects viral p24 protein antigen and human IgM/IgG antibodies.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <Clock className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-mono font-semibold text-emerald-400">23 &ndash; 90 Days</span>
            </div>
            <h4 className="text-sm font-bold text-white">Rapid Antibody Tests</h4>
            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono">
              Status at Day {selectedDay}:{' '}
              <strong className={selectedDay >= 23 ? 'text-emerald-400' : 'text-amber-400'}>
                {reliability.rapid}
              </strong>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Fingerstick blood or oral fluid tests providing results in 20 minutes. Detects host antibodies; any positive test requires confirmatory lab testing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
