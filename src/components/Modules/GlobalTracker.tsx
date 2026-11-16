import React, { useState } from 'react';
import {
  GLOBAL_METRICS,
  REGIONAL_DATA,
  RegionalEpidemiology,
} from '../../data/globalHivData';
import {
  Globe,
  TrendingDown,
  Target,
  ShieldCheck,
  Users,
  Award,
  Sliders,
} from 'lucide-react';

export const GlobalTracker: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<RegionalEpidemiology>(REGIONAL_DATA[0]);

  // Interactive Target Simulator State
  const [calcDiagnosed, setCalcDiagnosed] = useState<number>(86);
  const [calcOnArt, setCalcOnArt] = useState<number>(89);
  const [calcSuppressed, setCalcSuppressed] = useState<number>(93);

  // Net suppression calculation
  const calculatedTotalSuppression = Math.round(
    (calcDiagnosed / 100) * (calcOnArt / 100) * (calcSuppressed / 100) * 100
  );
  const reachesFastTrackGoal = calculatedTotalSuppression >= 86; // 0.95^3 = 85.7%

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-sky-950/70 text-sky-400 border border-sky-800/60 font-mono">
            MODULE 05 &bull; GLOBAL EPIDEMIOLOGY &amp; POLICY
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 font-display tracking-tight">
            UNAIDS 95-95-95 Global Epidemic Tracker
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
            Monitor worldwide progress toward ending AIDS as a public health threat. Explore regional testing and treatment cascades, and simulate how achieving 95-95-95 halts viral transmission globally.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl">
          <Globe className="w-3.5 h-3.5 text-sky-400" />
          <span>UNAIDS 2024 Global Data</span>
        </div>
      </div>

      {/* Global Headline Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#151f32] border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>PEOPLE LIVING WITH HIV</span>
            <Users className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {GLOBAL_METRICS.totalPlhiv}
          </div>
          <p className="text-[11px] text-slate-400">PLHIV worldwide (adults &amp; children)</p>
        </div>

        <div className="bg-[#151f32] border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>ANNUAL NEW INFECTIONS</span>
            <TrendingDown className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">1.3 Million</div>
          <p className="text-[11px] text-slate-400">Reduced by 59% since 1995 peak</p>
        </div>

        <div className="bg-[#151f32] border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>ANNUAL AIDS DEATHS</span>
            <TrendingDown className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">630,000</div>
          <p className="text-[11px] text-slate-400">Reduced by 69% since 2004 peak</p>
        </div>

        <div className="bg-[#151f32] border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>GLOBAL CASCADE (2024)</span>
            <Target className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-black text-sky-400 font-mono">
            86 &bull; 89 &bull; 93
          </div>
          <p className="text-[11px] text-slate-400">
            71% of all PLHIV are virally suppressed
          </p>
        </div>
      </div>

      {/* Main Regional Cascade & Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Regional Cascades (7 cols) */}
        <div className="lg:col-span-7 bg-[#151f32] border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">Regional Treatment Cascades</h3>
              <p className="text-xs text-slate-400">Select a world region to inspect testing, ART, and viral suppression.</p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-800 px-2 py-0.5 rounded">
              Target: 95% on each pillar
            </span>
          </div>

          {/* Region Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {REGIONAL_DATA.map((reg) => (
              <button
                key={reg.id}
                onClick={() => setSelectedRegion(reg)}
                className={`cursor-pointer px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  selectedRegion.id === reg.id
                    ? 'bg-sky-950 text-white border border-sky-700 shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {reg.name}
              </button>
            ))}
          </div>

          {/* Cascade Visualization for Selected Region */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">{selectedRegion.name}</h4>
                <span className="text-xs text-slate-400 font-mono">
                  Total PLHIV: {selectedRegion.plhivTotal}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block font-mono">ALL PLHIV SUPPRESSED</span>
                <span className="text-xl font-black text-sky-400 font-mono">
                  {selectedRegion.overallSuppressedPercent}%
                </span>
              </div>
            </div>

            {/* Pillar 1: Diagnosed */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">
                  Pillar 1: Diagnosed (Know their status)
                </span>
                <span className="font-mono font-bold text-sky-400">
                  {selectedRegion.diagnosedPercent}% / 95%
                </span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-sky-500 rounded-full transition-all duration-500"
                  style={{ width: `${selectedRegion.diagnosedPercent}%` }}
                ></div>
                {/* 95% Target Line */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-white opacity-80"
                  style={{ left: '95%' }}
                  title="95% Target"
                ></div>
              </div>
            </div>

            {/* Pillar 2: On ART */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">
                  Pillar 2: On Treatment (Receiving ART)
                </span>
                <span className="font-mono font-bold text-indigo-400">
                  {selectedRegion.onArtPercent}% / 95%
                </span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${selectedRegion.onArtPercent}%` }}
                ></div>
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-white opacity-80"
                  style={{ left: '95%' }}
                ></div>
              </div>
            </div>

            {/* Pillar 3: Virally Suppressed */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">
                  Pillar 3: Virally Suppressed (Undetectable)
                </span>
                <span className="font-mono font-bold text-emerald-400">
                  {selectedRegion.virallySuppressedPercent}% / 95%
                </span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${selectedRegion.virallySuppressedPercent}%` }}
                ></div>
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-white opacity-80"
                  style={{ left: '95%' }}
                ></div>
              </div>
            </div>

            {/* Regional Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                <span className="font-semibold text-emerald-400 block font-mono text-[11px]">
                  Regional Highlights
                </span>
                <p className="text-slate-300 mt-0.5 text-[11px]">{selectedRegion.highlights}</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                <span className="font-semibold text-rose-400 block font-mono text-[11px]">
                  Key Strategic Challenge
                </span>
                <p className="text-slate-300 mt-0.5 text-[11px]">{selectedRegion.keyChallenge}</p>
              </div>
            </div>
          </div>

          {/* Country Success Spotlight */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
            <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-bold text-white block">
                Proof of Concept: 5 African Nations Have Exceeded 95-95-95
              </span>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Botswana, Eswatini, Rwanda, Zambia, and Zimbabwe have proven that epidemic control is fully achievable even in high-burden, resource-limited settings through decentralized community testing and nurse-led universal ART initiation.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Interactive 95-95-95 Epidemic Elimination Simulator (5 cols) */}
        <div className="lg:col-span-5 bg-[#151f32] border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-5">
          <div className="pb-3 border-b border-slate-800">
            <span className="text-[11px] font-semibold text-sky-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" /> Interactive Target Calculator
            </span>
            <h3 className="text-lg font-bold text-white mt-1">
              Simulate Global Epidemic Suppression
            </h3>
            <p className="text-xs text-slate-400">
              Adjust coverage across the 3 pillars to see how overall community viral suppression changes.
            </p>
          </div>

          {/* Calculator Sliders */}
          <div className="space-y-4 text-xs">
            {/* Slider 1 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-slate-300">
                <span>Pillar 1: Diagnosed</span>
                <span className="font-mono font-bold text-sky-400">{calcDiagnosed}%</span>
              </div>
              <input
                type="range"
                min={50}
                max={100}
                value={calcDiagnosed}
                onChange={(e) => setCalcDiagnosed(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
            </div>

            {/* Slider 2 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-slate-300">
                <span>Pillar 2: On Treatment (ART)</span>
                <span className="font-mono font-bold text-indigo-400">{calcOnArt}%</span>
              </div>
              <input
                type="range"
                min={50}
                max={100}
                value={calcOnArt}
                onChange={(e) => setCalcOnArt(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            {/* Slider 3 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-slate-300">
                <span>Pillar 3: Virally Suppressed</span>
                <span className="font-mono font-bold text-emerald-400">{calcSuppressed}%</span>
              </div>
              <input
                type="range"
                min={50}
                max={100}
                value={calcSuppressed}
                onChange={(e) => setCalcSuppressed(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
          </div>

          {/* Fast-Track Shortcut Button */}
          <button
            onClick={() => {
              setCalcDiagnosed(95);
              setCalcOnArt(95);
              setCalcSuppressed(95);
            }}
            className="cursor-pointer w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 transition flex items-center justify-center gap-2"
          >
            <Target className="w-3.5 h-3.5 text-sky-400" />
            <span>Set to UNAIDS 95-95-95 Benchmark</span>
          </button>

          {/* Projected Outcome Card */}
          <div
            className={`p-4 rounded-xl border space-y-2 transition ${
              reachesFastTrackGoal
                ? 'bg-emerald-950/40 border-emerald-700/80'
                : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block font-mono">
              Total Global Population Suppressed
            </span>
            <div className="flex items-baseline gap-2">
              <span
                className={`text-3xl font-black font-mono ${
                  reachesFastTrackGoal ? 'text-emerald-400' : 'text-amber-400'
                }`}
              >
                {calculatedTotalSuppression}%
              </span>
              <span className="text-xs text-slate-400">of all PLHIV worldwide</span>
            </div>

            <div className="pt-1 text-xs">
              {reachesFastTrackGoal ? (
                <div className="text-emerald-300 flex items-start gap-1.5">
                  <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    <strong>Epidemic Halting Threshold Reached!</strong> When &gt;86% of all PLHIV are virally suppressed, population-level transmission collapses ($R_0 &lt; 1$).
                  </span>
                </div>
              ) : (
                <div className="text-slate-300 text-[11px]">
                  Requires &ge;86% net suppression to halt secondary transmission. Increase testing and early treatment initiation to close the gap.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
