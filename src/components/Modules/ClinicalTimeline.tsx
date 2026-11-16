import React, { useState, useMemo } from 'react';
import {
  generateTimelineSeries,
  calculateTimelinePoint,
  ArtConfig,
  SimulationPoint,
} from '../../utils/timelineMath';
import {
  Activity,
  ShieldAlert,
  ShieldCheck,
  Clock,
  Pill,
  Info,
  Sliders,
} from 'lucide-react';

export const ClinicalTimeline: React.FC = () => {
  // Simulator configuration state
  const [artEnabled, setArtEnabled] = useState<boolean>(true);
  const [artStartWeek, setArtStartWeek] = useState<number>(104); // Default starts at Year 2 (104 wks)
  const [adherence, setAdherence] = useState<number>(95);
  const [currentWeek, setCurrentWeek] = useState<number>(156); // Scrubber at Year 3

  const artConfig: ArtConfig = useMemo(
    () => ({
      enabled: artEnabled,
      startWeek: artStartWeek,
      adherencePercent: adherence,
    }),
    [artEnabled, artStartWeek, adherence]
  );

  // Generate continuous series
  const timelineSeries = useMemo(() => generateTimelineSeries(artConfig, 624, 8), [artConfig]);

  // Current active data point
  const currentPoint: SimulationPoint = useMemo(
    () => calculateTimelinePoint(currentWeek, artConfig),
    [currentWeek, artConfig]
  );

  // SVG Chart Dimensions
  const svgWidth = 800;
  const svgHeight = 320;
  const padding = { top: 30, right: 60, bottom: 40, left: 60 };
  const graphWidth = svgWidth - padding.left - padding.right;
  const graphHeight = svgHeight - padding.top - padding.bottom;

  // Scale functions
  const scaleX = (week: number) => padding.left + (week / 624) * graphWidth;
  // CD4 scale: 0 to 1200 cells/uL
  const scaleYCd4 = (cd4: number) =>
    padding.top + graphHeight - (Math.max(0, Math.min(1200, cd4)) / 1200) * graphHeight;
  // Viral Load scale (log10): 1 to 7 (10 to 10,000,000 copies)
  const scaleYVl = (log10: number) =>
    padding.top + graphHeight - ((Math.max(1, Math.min(7, log10)) - 1) / 6) * graphHeight;

  // Build SVG path strings
  const cd4Path = useMemo(() => {
    return timelineSeries.reduce((acc, pt, idx) => {
      const x = scaleX(pt.timeWeeks);
      const y = scaleYCd4(pt.cd4Count);
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  }, [timelineSeries]);

  const vlPath = useMemo(() => {
    return timelineSeries.reduce((acc, pt, idx) => {
      const x = scaleX(pt.timeWeeks);
      const y = scaleYVl(pt.viralLoadLog10);
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  }, [timelineSeries]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-sky-950/70 text-sky-400 border border-sky-800/60 font-mono">
            MODULE 02 &bull; CLINICAL TIMELINE SIMULATOR
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 font-display tracking-tight">
            CD4+ T-Cell &amp; Viral Load Natural History vs. ART
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
            Simulate 12 years of HIV pathophysiological progression. Scrub across the disease stages or trigger Antiretroviral Therapy (ART) to observe rapid biphasic viral suppression and immune recovery.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl">
          <Activity className="w-3.5 h-3.5 text-sky-400" />
          <span>Biomathematical Model</span>
        </div>
      </div>

      {/* Simulator Interactive Panel */}
      <div className="bg-[#151f32] border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-6">
        {/* Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4 border-b border-slate-800 text-xs">
          {/* ART Toggle */}
          <div className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                <Pill className="w-3.5 h-3.5 text-indigo-400" />
                ART Intervention
              </span>
              <button
                onClick={() => setArtEnabled(!artEnabled)}
                className={`cursor-pointer px-2.5 py-1 rounded-md text-[11px] font-semibold transition ${
                  artEnabled
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                {artEnabled ? 'ACTIVE' : 'NATURAL HISTORY (NO ART)'}
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              Modern triple-combination antiretroviral therapy (e.g., INSTI + 2 NRTIs).
            </p>
          </div>

          {/* ART Initiation Time Slider */}
          <div className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-slate-300">
              <span className="font-semibold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                ART Initiation Time
              </span>
              <span className="font-mono text-sky-400 font-bold">
                Year {(artStartWeek / 52).toFixed(1)} (Wk {artStartWeek})
              </span>
            </div>
            <input
              type="range"
              min={12}
              max={520}
              step={8}
              disabled={!artEnabled}
              value={artStartWeek}
              onChange={(e) => setArtStartWeek(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500 disabled:opacity-40"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>Wk 12 (Early)</span>
              <span>Yr 5</span>
              <span>Yr 10 (Late)</span>
            </div>
          </div>

          {/* Adherence Slider */}
          <div className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-slate-300">
              <span className="font-semibold flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                Adherence Rate
              </span>
              <span
                className={`font-mono font-bold ${
                  adherence >= 95
                    ? 'text-emerald-400'
                    : adherence >= 80
                    ? 'text-amber-400'
                    : 'text-rose-400'
                }`}
              >
                {adherence}%
              </span>
            </div>
            <input
              type="range"
              min={50}
              max={100}
              step={5}
              disabled={!artEnabled}
              value={adherence}
              onChange={(e) => setAdherence(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 disabled:opacity-40"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>50% Suboptimal</span>
              <span>85%</span>
              <span>100% Strict</span>
            </div>
          </div>
        </div>

        {/* Dynamic Dual-Axis Graph */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between text-xs gap-3">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span className="w-3 h-0.5 bg-emerald-400 inline-block"></span>
                CD4+ T-Cells (cells/&mu;L)
              </span>
              <span className="flex items-center gap-1.5 text-rose-400 font-semibold">
                <span className="w-3 h-0.5 bg-rose-400 inline-block"></span>
                HIV-1 RNA (log10 copies/mL)
              </span>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Normal CD4 (&gt;500)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                AIDS (&lt;200)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                Undetectable (&le;50)
              </span>
            </div>
          </div>

          {/* SVG Canvas Container */}
          <div className="w-full overflow-x-auto bg-[#080c14] border border-slate-800/80 rounded-xl p-2 select-none">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-auto min-w-[650px] font-mono text-[10px]"
            >
              {/* Opportunistic Infection Danger Zone (CD4 < 200) */}
              <rect
                x={padding.left}
                y={scaleYCd4(200)}
                width={graphWidth}
                height={scaleYCd4(0) - scaleYCd4(200)}
                fill="rgba(244, 63, 94, 0.06)"
              />
              <text
                x={padding.left + 8}
                y={scaleYCd4(100)}
                fill="#f43f5e"
                opacity={0.6}
                fontSize={9}
              >
                AIDS Threshold (CD4 &lt; 200 cells/&mu;L &bull; Severe OI Vulnerability)
              </text>

              {/* Undetectable Viral Load Zone (<= 50 copies / log10 1.7) */}
              <rect
                x={padding.left}
                y={scaleYVl(1.7)}
                width={graphWidth}
                height={scaleYVl(1.0) - scaleYVl(1.7)}
                fill="rgba(2, 132, 199, 0.08)"
              />
              <text
                x={svgWidth - padding.right - 8}
                y={scaleYVl(1.3)}
                textAnchor="end"
                fill="#38bdf8"
                opacity={0.8}
                fontSize={9}
              >
                U=U Undetectable Threshold (&le;50 copies/mL)
              </text>

              {/* Grid Lines */}
              {/* CD4 Normal Line (500) */}
              <line
                x1={padding.left}
                y1={scaleYCd4(500)}
                x2={svgWidth - padding.right}
                y2={scaleYCd4(500)}
                stroke="#334155"
                strokeDasharray="4 4"
                strokeWidth={1}
              />
              {/* AIDS Line (200) */}
              <line
                x1={padding.left}
                y1={scaleYCd4(200)}
                x2={svgWidth - padding.right}
                y2={scaleYCd4(200)}
                stroke="#e11d48"
                strokeDasharray="2 2"
                strokeWidth={1}
                opacity={0.5}
              />

              {/* X Axis Time Labels */}
              {[0, 52, 156, 260, 364, 468, 572, 624].map((wk) => {
                const x = scaleX(wk);
                const yr = (wk / 52).toFixed(0);
                return (
                  <g key={wk}>
                    <line
                      x1={x}
                      y1={padding.top}
                      x2={x}
                      y2={svgHeight - padding.bottom}
                      stroke="#1e293b"
                      strokeWidth={1}
                    />
                    <text
                      x={x}
                      y={svgHeight - padding.bottom + 16}
                      textAnchor="middle"
                      fill="#64748b"
                      fontSize={9}
                    >
                      {wk === 0 ? '0' : `Yr ${yr}`}
                    </text>
                  </g>
                );
              })}

              {/* Left Y Axis (CD4) */}
              {[0, 200, 500, 800, 1000].map((cd4) => {
                const y = scaleYCd4(cd4);
                return (
                  <text key={cd4} x={padding.left - 8} y={y + 3} textAnchor="end" fill="#10b981">
                    {cd4}
                  </text>
                );
              })}
              <text
                x={12}
                y={svgHeight / 2}
                fill="#10b981"
                transform={`rotate(-90 12 ${svgHeight / 2})`}
                textAnchor="middle"
                fontSize={9}
              >
                CD4+ T-Cells (cells/&mu;L)
              </text>

              {/* Right Y Axis (Viral Load) */}
              {[1, 2, 3, 4, 5, 6].map((log) => {
                const y = scaleYVl(log);
                return (
                  <text
                    key={log}
                    x={svgWidth - padding.right + 8}
                    y={y + 3}
                    textAnchor="start"
                    fill="#f43f5e"
                  >
                    10^{log}
                  </text>
                );
              })}
              <text
                x={svgWidth - 10}
                y={svgHeight / 2}
                fill="#f43f5e"
                transform={`rotate(90 ${svgWidth - 10} ${svgHeight / 2})`}
                textAnchor="middle"
                fontSize={9}
              >
                HIV RNA (log10 copies/mL)
              </text>

              {/* Curve Paths */}
              <path d={cd4Path} fill="none" stroke="#10b981" strokeWidth={2.4} strokeLinecap="round" />
              <path d={vlPath} fill="none" stroke="#f43f5e" strokeWidth={2.4} strokeLinecap="round" />

              {/* ART Initiation Marker */}
              {artEnabled && (
                <g>
                  <line
                    x1={scaleX(artStartWeek)}
                    y1={padding.top}
                    x2={scaleX(artStartWeek)}
                    y2={svgHeight - padding.bottom}
                    stroke="#38bdf8"
                    strokeWidth={1.5}
                    strokeDasharray="3 3"
                  />
                  <rect
                    x={scaleX(artStartWeek) - 30}
                    y={padding.top - 18}
                    width={60}
                    height={16}
                    rx={4}
                    fill="#0284c7"
                  />
                  <text
                    x={scaleX(artStartWeek)}
                    y={padding.top - 6}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize={8}
                    fontWeight="bold"
                  >
                    ART START
                  </text>
                </g>
              )}

              {/* Active Scrubber Marker */}
              <line
                x1={scaleX(currentWeek)}
                y1={padding.top}
                x2={scaleX(currentWeek)}
                y2={svgHeight - padding.bottom}
                stroke="#f8fafc"
                strokeWidth={2}
              />
              <circle
                cx={scaleX(currentWeek)}
                cy={scaleYCd4(currentPoint.cd4Count)}
                r={4.5}
                fill="#10b981"
                stroke="#ffffff"
                strokeWidth={1.5}
              />
              <circle
                cx={scaleX(currentWeek)}
                cy={scaleYVl(currentPoint.viralLoadLog10)}
                r={4.5}
                fill="#f43f5e"
                stroke="#ffffff"
                strokeWidth={1.5}
              />
            </svg>
          </div>

          {/* Master Timeline Scrubber Slider */}
          <div className="pt-2 space-y-1">
            <div className="flex justify-between items-center text-xs text-slate-300">
              <span className="font-semibold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                Inspect Timeline Position
              </span>
              <span className="font-mono text-white bg-slate-800 px-2.5 py-0.5 rounded-md font-bold">
                {currentPoint.timeLabel} ({currentWeek} weeks)
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={624}
              step={2}
              value={currentWeek}
              onChange={(e) => setCurrentWeek(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>Week 0 (Infection)</span>
              <span>Acute (0-12w)</span>
              <span>Latency (Yr 1-6)</span>
              <span>Late Chronic (Yr 7-9)</span>
              <span>Year 12 (AIDS)</span>
            </div>
          </div>
        </div>

        {/* Real-Time Clinical Readout Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {/* CD4 Count Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
              CD4+ T-Cell Count
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-emerald-400 font-mono">
                {currentPoint.cd4Count}
              </span>
              <span className="text-xs text-slate-400">cells/&mu;L</span>
            </div>
            <span
              className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold font-mono ${
                currentPoint.cd4Count >= 500
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  : currentPoint.cd4Count >= 200
                  ? 'bg-amber-950 text-amber-300 border border-amber-800'
                  : 'bg-rose-950 text-rose-300 border border-rose-800'
              }`}
            >
              {currentPoint.cd4Count >= 500
                ? 'Adequate Immune Function'
                : currentPoint.cd4Count >= 200
                ? 'Mild/Moderate Deficit'
                : 'AIDS Diagnostic Criterion'}
            </span>
          </div>

          {/* Viral Load Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
              HIV-1 RNA Viral Load
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-rose-400 font-mono">
                {currentPoint.viralLoad.toLocaleString()}
              </span>
              <span className="text-xs text-slate-400">copies/mL</span>
            </div>
            <span
              className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold font-mono ${
                currentPoint.viralLoad <= 50
                  ? 'bg-sky-950 text-sky-300 border border-sky-800'
                  : currentPoint.viralLoad <= 200
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  : 'bg-rose-950 text-rose-300 border border-rose-800'
              }`}
            >
              {currentPoint.viralLoad <= 50
                ? 'Undetectable (<50)'
                : currentPoint.viralLoad <= 200
                ? 'Suppressed (<200)'
                : 'Active Replication'}
            </span>
          </div>

          {/* Disease Phase */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
              Clinical Stage
            </span>
            <div className="text-sm font-bold text-white capitalize">
              {currentPoint.phase.replace('_', ' ')}
            </div>
            <p className="text-[11px] text-slate-400 line-clamp-2">
              {currentPoint.clinicalNote}
            </p>
          </div>

          {/* Transmission & OI Status */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
              Transmission Risk &bull; U=U
            </span>
            <div className="flex items-center gap-1.5 text-sm font-bold">
              {currentPoint.viralLoad <= 200 ? (
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" /> ZERO RISK (U=U)
                </span>
              ) : (
                <span className="text-rose-400 flex items-center gap-1">
                  <ShieldAlert className="w-4 h-4" /> TRANSMISSIBLE
                </span>
              )}
            </div>
            <span className="text-[10px] text-slate-400 block font-mono">
              OI Risk: <strong className="text-slate-200 uppercase">{currentPoint.oiRiskLevel}</strong>
            </span>
          </div>
        </div>

        {/* Opportunistic Infections Threshold Reference Box */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-xs space-y-2">
          <div className="flex items-center gap-2 text-slate-200 font-semibold">
            <Info className="w-4 h-4 text-sky-400" />
            <span>Opportunistic Infection Vulnerabilities by CD4 Stratum (Untreated vs Treated)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] text-slate-300">
            <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
              <span className="font-bold text-emerald-400 block font-mono">CD4 &gt; 500 cells/&mu;L</span>
              <p className="text-slate-400 mt-0.5">
                Normal host immunity. Acute retroviral syndrome may occur during initial infection, but typical opportunistic infections do not manifest.
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
              <span className="font-bold text-amber-400 block font-mono">CD4 200 - 500 cells/&mu;L</span>
              <p className="text-slate-400 mt-0.5">
                Mild to moderate immunodeficiency. Susceptible to oral candidiasis (thrush), herpes zoster (shingles), oral hairy leukoplakia, and recurrent bacterial infections.
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
              <span className="font-bold text-rose-400 block font-mono">CD4 &lt; 200 cells/&mu;L (AIDS)</span>
              <p className="text-slate-400 mt-0.5">
                Severe vulnerability: Pneumocystis jirovecii pneumonia (PCP &lt;200), Toxoplasma gondii encephalitis (&lt;100), MAC and CMV retinitis (&lt;50).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
