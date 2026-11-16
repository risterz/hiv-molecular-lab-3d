import React from 'react';
import {
  Dna,
  RefreshCw,
  Pill,
  ShieldCheck,
  BrainCircuit,
  Sparkles,
} from 'lucide-react';

export type ActiveTab = 'lab' | 'replication' | 'drugs' | 'prevention' | 'quiz';

interface NavigationProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'lab', label: '3D Molecular Lab', icon: Dna, color: 'text-cyan-400' },
    { id: 'replication', label: 'Replication Cycle', icon: RefreshCw, color: 'text-emerald-400' },
    { id: 'drugs', label: 'Drug Targets & U=U', icon: Pill, color: 'text-purple-400' },
    { id: 'prevention', label: 'Prevention & Testing', icon: ShieldCheck, color: 'text-rose-400' },
    { id: 'quiz', label: 'Myth-Buster Quiz', icon: BrainCircuit, color: 'text-amber-400' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0a0f1d]/85 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 py-3 transition">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500 flex items-center justify-center text-slate-950 shadow-lg shadow-cyan-500/20">
            <Dna className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-tight text-white">
                HIV Molecular Lab <span className="text-cyan-400 font-mono text-xs font-bold px-1.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20">3D</span>
              </h1>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              Interactive Virology, Procedural Biomathematics & Public Health
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-2xl bg-slate-900/90 border border-slate-800/80 shadow-inner">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id as ActiveTab)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
                  isActive
                    ? 'bg-slate-800 text-white shadow-md border border-slate-700/60'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? tab.color : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Procedural Badge */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Zero external meshes &bull; 100% Procedural Math</span>
        </div>
      </div>
    </header>
  );
};
