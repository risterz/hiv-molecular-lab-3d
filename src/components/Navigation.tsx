import React from 'react';
import {
  Dna,
  RefreshCw,
  Pill,
  ShieldCheck,
  BrainCircuit,
  CheckCircle2,
  User,
} from 'lucide-react';

export type ActiveTab = 'lab' | 'replication' | 'drugs' | 'prevention' | 'quiz';

interface NavigationProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'lab', label: '3D Molecular Lab', icon: Dna, color: 'text-sky-400' },
    { id: 'replication', label: 'Replication Cycle', icon: RefreshCw, color: 'text-emerald-400' },
    { id: 'drugs', label: 'Drug Targets & U=U', icon: Pill, color: 'text-indigo-400' },
    { id: 'prevention', label: 'Prevention & Testing', icon: ShieldCheck, color: 'text-rose-400' },
    { id: 'quiz', label: 'Myth-Buster Quiz', icon: BrainCircuit, color: 'text-amber-400' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0b0f19]/95 backdrop-blur-md border-b border-slate-800 transition shadow-sm">
      {/* Top Academic Sub-header */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1.5 bg-[#080c14] border-b border-slate-800/80 text-[11px] text-slate-400 select-none">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-slate-300 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
            <span>Open Science Education Resource</span>
          </span>
          <span className="text-slate-700">&bull;</span>
          <span>CDC &bull; WHO &bull; NIH Peer-Reviewed Guidelines</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-slate-300 bg-slate-900 border border-slate-800 px-2.5 py-0.5 rounded-full font-medium">
            <User className="w-3 h-3 text-sky-400" />
            <span>Made by <strong className="text-white">risterz</strong></span>
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-3">
        {/* Brand identity */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center text-sky-400 shadow-sm">
            <Dna className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-white">
                HIV Molecular Lab <span className="text-slate-400 font-mono text-xs font-semibold px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700">3D</span>
              </h1>
              <span className="text-[11px] font-medium text-sky-300 bg-sky-950/70 border border-sky-800/60 px-2 py-0.5 rounded-full hidden sm:inline-block">
                by risterz
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Interactive Virology &bull; Molecular Biology &bull; Public Health
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex flex-wrap items-center justify-center gap-1 p-1 rounded-xl bg-slate-900/90 border border-slate-800 shadow-sm">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id as ActiveTab)}
                className={`cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition ${
                  isActive
                    ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? tab.color : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
