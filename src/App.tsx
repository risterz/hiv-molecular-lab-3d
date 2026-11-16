import { useState } from 'react';
import { Navigation, ActiveTab } from './components/Navigation';
import { CanvasContainer } from './components/ModelViewer/CanvasContainer';
import { ReplicationCycle } from './components/Modules/ReplicationCycle';
import { DrugTargets } from './components/Modules/DrugTargets';
import { PreventionAndTesting } from './components/Modules/PreventionAndTesting';
import { MythBusterQuiz } from './components/Modules/MythBusterQuiz';
import { Heart, Globe, BookOpen } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('lab');

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      {/* Sticky Top Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {activeTab === 'lab' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  Interactive 3D WebGL Studio
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  Procedural Molecular &amp; Viral Laboratory
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  Click and drag to rotate the camera. Switch between the mathematical B-DNA double helix, complete virion, internal cutaway core, and reverse transcription.
                </p>
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
      <footer className="w-full bg-slate-950/80 border-t border-slate-800/80 py-6 px-4 sm:px-8 mt-auto text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>HIV Molecular Lab 3D &bull; Open Scientific Education Platform</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-slate-400" /> CDC &bull; WHO &bull; NIH &bull; IAS-USA Guidelines
            </span>
            <span>&bull;</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <Heart className="w-3 h-3 fill-emerald-400" /> U=U Confirmed
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
