import React from 'react';
import {
  Dna,
  RefreshCw,
  Pill,
  ShieldCheck,
  BrainCircuit,
  Activity,
  Radio,
} from 'lucide-react';

export type ActiveTab = 'lab' | 'replication' | 'drugs' | 'prevention' | 'quiz';

interface NavigationProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'lab', label: '3D Molecular Lab', icon: Dna, color: 'text-cyan-400', badge: '3D' },
    { id: 'replication', label: 'Replication Cycle', icon: RefreshCw, color: 'text-emerald-400', badge: '6 Steps' },
    { id: 'drugs', label: 'Drug Targets & U=U', icon: Pill, color: 'text-purple-400', badge: '6 Classes' },
    { id: 'prevention', label: 'Prevention & Testing', icon: ShieldCheck, color: 'text-rose-400', badge: 'Clinical' },
    { id: 'quiz', label: 'Myth-Buster Quiz', icon: BrainCircuit, color: 'text-amber-400', badge: '8 Qs' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#050510]/90 backdrop-blur-2xl border-b border-slate-800/90 transition shadow-2xl">
      {/* Top Micro-Telemetry Bar */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1 bg-slate-950/90 border-b border-slate-900 text-[10px] font-mono text-slate-400 select-none">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-cyan-400">
            <Radio className="w-3 h-3 animate-pulse text-cyan-400" />
            <strong className="tracking-widest">SYS:ONLINE</strong>
          </span>
          <span className="text-slate-600">|</span>
          <span>ENGINE: THREE.JS PARAMETRIC WEBGL</span>
          <span className="text-slate-600">|</span>
          <span>COORDINATES: BIO-PARAMETRIC ANGSTROM SCALE</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <Activity className="w-3 h-3" />
            <span>CLINICAL EVIDENCE: U=U CONFIRMED</span>
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">VERSION 2.0 (HUD PRO)</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-2.5">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-400 via-teal-500 to-emerald-400 flex items-center justify-center text-slate-950 shadow-glow-cyan transition group-hover:scale-105">
              <Dna className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="absolute -inset-1 rounded-2xl bg-cyan-500/20 blur opacity-0 group-hover:opacity-100 transition" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black tracking-tight text-white font-display">
                HIV Molecular Lab <span className="text-cyan-400 font-mono text-xs font-bold px-1.5 py-0.5 rounded-md bg-cyan-950/80 border border-cyan-500/30">3D</span>
              </h1>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              Interactive Virology &bull; Biomathematics &bull; Public Health
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex flex-wrap items-center justify-center gap-1 p-1 rounded-2xl bg-slate-950/80 border border-slate-800/80 shadow-inner">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id as ActiveTab)}
                className={`cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition relative group ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-4 h-4 transition ${isActive ? tab.color : 'text-slate-400 group-hover:text-slate-200'}`} />
                <span className="font-display tracking-wide">{tab.label}</span>
                <span
                  className={`text-[9px] font-mono px-1.5 py-0.2 rounded border transition hidden sm:inline-block ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                      : 'bg-slate-800/80 text-slate-400 border-slate-700/60'
                  }`}
                >
                  {tab.badge}
                </span>

                {/* Active glow underline */}
                {isActive && (
                  <span className="absolute -bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full shadow-[0_0_8px_#00f7ff]" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
