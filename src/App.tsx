import { useState } from 'react';
import { Navigation, ActiveTab } from './components/Navigation';
import { CanvasContainer } from './components/ModelViewer/CanvasContainer';
import { ReplicationCycle } from './components/Modules/ReplicationCycle';
import { DrugTargets } from './components/Modules/DrugTargets';
import { PreventionAndTesting } from './components/Modules/PreventionAndTesting';
import { MythBusterQuiz } from './components/Modules/MythBusterQuiz';
import { Heart, Globe, BookOpen, UserCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('lab');

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col selection:bg-sky-800 selection:text-white">
      {/* Sticky Top Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {activeTab === 'lab' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-sky-950/70 text-sky-400 border border-sky-800/60 font-mono">
                  MODULE 01 &bull; 3D WEBGL STUDIO
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 font-display tracking-tight">
                  Procedural Molecular &amp; Viral Laboratory
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
                  Drag to orbit camera. Switch between the mathematical B-DNA double helix, complete virion, internal cutaway core with enzyme clusters, and real-time reverse transcription with NRTI drug chain-termination.
                </p>
              </div>

              {/* Quick Tech Specs */}
              <div className="hidden md:flex items-center gap-3 text-[11px] font-mono text-slate-400 bg-slate-900/90 px-3.5 py-2 rounded-xl border border-slate-800">
                <span className="text-sky-400 font-semibold">100% MATH MESHES</span>
                <span className="text-slate-700">&bull;</span>
                <span>ZERO EXTERNAL ASSETS</span>
              </div>
            </div>

            {/* 3D WebGL Studio */}
            <CanvasContainer />
          </div>
        )}

        {activeTab === 'replication' && (
          <ReplicationCycle onJumpTo3DModel={() => setActiveTab('lab')} />
        )}

        {activeTab === 'drugs' && <DrugTargets />}

        {activeTab === 'prevention' && <PreventionAndTesting />}

        {activeTab === 'quiz' && <MythBusterQuiz />}
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#080c14] border-t border-slate-800/80 py-6 px-4 sm:px-8 mt-auto text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-sky-400" />
              <span className="font-display font-medium text-slate-300">HIV Molecular Lab 3D</span>
            </div>
            <span className="hidden sm:inline text-slate-700">&bull;</span>
            <a
              href="https://github.com/risterz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 px-2.5 py-0.5 rounded-full text-[11px] transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>Made by <strong className="text-white hover:text-sky-400 underline underline-offset-2">risterz</strong></span>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-sky-400" /> CDC &bull; WHO &bull; NIH &bull; IAS-USA Guidelines
            </span>
            <span>&bull;</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 fill-emerald-400" /> U=U Confirmed (Zero Risk)
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
