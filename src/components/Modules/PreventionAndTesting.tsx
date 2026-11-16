import React from 'react';
import {
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  Activity,
  AlertTriangle,
  FileCheck,
} from 'lucide-react';

export const PreventionAndTesting: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-10 text-slate-100 animate-fade-in">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          Public Health & Preventive Virology
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Transmission Vectors, Prevention & Testing Protocols
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          Scientific clarity on how HIV is and is not transmitted, biomedical prevention tools (PrEP and PEP), and evidence-based clinical testing timelines.
        </p>
      </div>

      {/* Transmission Matrix: Vectors vs Myths */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Confirmed Transmission Routes */}
        <div className="bg-slate-900/80 backdrop-blur-md border border-rose-500/30 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
            <AlertTriangle className="w-5 h-5 text-rose-500" />
            <span>Actual Transmission Routes</span>
          </div>
          <p className="text-xs text-slate-300">
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
                desc: 'Rare in modern healthcare systems due to universal nucleic acid testing; risk persists only in unscreened emergencies.',
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 p-3 rounded-2xl bg-rose-950/20 border border-rose-500/20 text-xs">
                <CheckCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-rose-200 block">{item.title}</strong>
                  <span className="text-slate-300 text-[11px] leading-snug">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transmission Myths (Zero Risk) */}
        <div className="bg-slate-900/80 backdrop-blur-md border border-emerald-500/30 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
            <XCircle className="w-5 h-5 text-emerald-400" />
            <span>Zero Risk Transmission Myths</span>
          </div>
          <p className="text-xs text-slate-300">
            HIV cannot survive outside human host cells and is never transmitted by casual non-sexual contact, environmental surfaces, or common vectors.
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              { title: 'Saliva & Deep Kissing', desc: 'Saliva contains enzymes that break down HIV' },
              { title: 'Tears & Sweat', desc: 'No infectious viral particles present' },
              { title: 'Mosquitoes & Insects', desc: 'HIV cannot replicate in insects' },
              { title: 'Toilet Seats & Doorknobs', desc: 'Virus dries and dies within minutes' },
              { title: 'Sharing Food & Utensils', desc: 'Stomach acid destroys viral particles' },
              { title: 'Swimming Pools & Saunas', desc: 'Chlorine and water instantly inactivate virus' },
              { title: 'Shaking Hands & Hugs', desc: 'Intact skin is an impenetrable barrier' },
              { title: 'Coughing & Sneezing', desc: 'HIV is not airborne' },
            ].map((item, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <div>
                  <strong className="text-emerald-200 text-xs block">{item.title}</strong>
                  <span className="text-slate-400 text-[10px] leading-tight block">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Biomedical Prevention Toolkit: PrEP and PEP */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-cyan-400" /> Biomedical Prevention Arsenal
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PrEP */}
          <div className="bg-slate-900/80 border border-cyan-500/30 rounded-3xl p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                PRE-EXPOSURE
              </span>
              <span className="text-xs text-emerald-400 font-bold">&gt;99% Efficacy</span>
            </div>
            <h4 className="text-2xl font-extrabold text-white">PrEP (Pre-Exposure Prophylaxis)</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Medication taken regularly before potential exposure by HIV-negative individuals to prevent HIV from establishing permanent infection in mucosal tissues.
            </p>

            <div className="space-y-2 text-xs pt-2">
              <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
                <span className="font-bold text-cyan-300 block mb-0.5">Daily Oral Pills:</span>
                <span className="text-slate-300">
                  Truvada (TDF/FTC) or Descovy (TAF/FTC) taken once daily with or without food.
                </span>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
                <span className="font-bold text-cyan-300 block mb-0.5">Long-Acting Injectable:</span>
                <span className="text-slate-300">
                  Apretude (Cabotegravir extended-release) injected by a clinician once every 2 months.
                </span>
              </div>
            </div>
          </div>

          {/* PEP */}
          <div className="bg-slate-900/80 border border-amber-500/30 rounded-3xl p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                EMERGENCY POST-EXPOSURE
              </span>
              <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Within 72 Hours
              </span>
            </div>
            <h4 className="text-2xl font-extrabold text-white">PEP (Post-Exposure Prophylaxis)</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Emergency 28-day course of 3 antiretroviral drugs taken after a single high-risk exposure (e.g. broken condom, sexual assault, or needlestick injury).
            </p>

            <div className="space-y-2 text-xs pt-2">
              <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
                <span className="font-bold text-amber-300 block mb-0.5">Time Critical:</span>
                <span className="text-slate-300">
                  Must be started as soon as possible, and no later than 72 hours (3 days) following potential exposure. Every hour counts.
                </span>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
                <span className="font-bold text-amber-300 block mb-0.5">Standard Regimen:</span>
                <span className="text-slate-300">
                  TDF/FTC (Truvada) plus Dolutegravir (Tivicay) or Raltegravir (Isentress) taken daily for exactly 28 days without interruption.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clinical Testing Methods & Window Periods */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs font-semibold text-cyan-400 font-mono">DIAGNOSTIC TIMELINE</span>
          <h3 className="text-2xl font-bold text-white mt-1">Understanding Window Periods & Testing Types</h3>
          <p className="text-xs text-slate-400 mt-1">
            The &ldquo;window period&rdquo; is the time between potential exposure and when a diagnostic test can reliably detect infection biomarkers in blood.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <Activity className="w-5 h-5 text-rose-400" />
              <span className="text-xs font-mono font-bold text-rose-400">10 – 33 Days</span>
            </div>
            <h4 className="text-sm font-bold text-white">Nucleic Acid Test (NAT / RNA PCR)</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Detects viral RNA directly in blood plasma. Earliest detection method; primarily used for high-risk early exposure and donor blood screening.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-cyan-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <FileCheck className="w-5 h-5 text-cyan-400" />
              <span className="text-xs font-mono font-bold text-cyan-400">18 – 45 Days</span>
            </div>
            <h4 className="text-sm font-bold text-white">4th-Gen Antigen / Antibody Immunoassay</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Gold standard laboratory test from a vein draw. Simultaneously detects viral p24 protein antigen and human IgM/IgG antibodies.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <Clock className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-mono font-bold text-emerald-400">23 – 90 Days</span>
            </div>
            <h4 className="text-sm font-bold text-white">Rapid Antibody Tests</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Fingerstick blood or oral fluid tests providing results in 20 minutes. Detects host antibodies; any positive test requires confirmatory lab testing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
