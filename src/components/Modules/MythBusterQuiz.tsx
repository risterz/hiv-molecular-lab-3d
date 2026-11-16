import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  ChevronRight,
  BookOpen,
  Sparkles,
  BrainCircuit,
} from 'lucide-react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../../data/quizQuestions';

export const MythBusterQuiz: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentIndex];
  const hasAnsweredCurrent = selectedAnswers[currentQ.id] !== undefined;
  const selectedOptionIndex = selectedAnswers[currentQ.id];

  const handleSelectOption = (optionIndex: number) => {
    if (hasAnsweredCurrent) return; // Prevent changing answer after reveal
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setIsCompleted(false);
  };

  // Calculate score
  const totalCorrect = QUIZ_QUESTIONS.reduce((acc, q) => {
    return selectedAnswers[q.id] === q.correctAnswerIndex ? acc + 1 : acc;
  }, 0);

  const percentage = Math.round((totalCorrect / QUIZ_QUESTIONS.length) * 100);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 text-slate-100 animate-fade-in">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800/80 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
            MODULE 05 &bull; KNOWLEDGE ASSESSMENT
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 font-display tracking-tight">
            Virology &amp; Public Health Myth-Buster
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Test your understanding of viral replication genetics, transmission realities, U=U, and biomedical prevention.
          </p>
        </div>

        {!isCompleted && (
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3.5 py-2 rounded-2xl text-xs font-mono">
            <BrainCircuit className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400">QUESTION:</span>
            <span className="font-bold text-cyan-400">
              0{currentIndex + 1} / 0{QUIZ_QUESTIONS.length}
            </span>
          </div>
        )}
      </div>

      {!isCompleted ? (
        <div className="bg-slate-950/85 backdrop-blur-xl border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 hud-corner-tl hud-corner-br">
          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-amber-400 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>

          {/* Question Tag & Content */}
          <div className="space-y-2.5">
            <span className="text-[10px] font-bold font-mono uppercase tracking-widest text-amber-300 bg-amber-950/40 px-3 py-1 rounded-full border border-amber-500/30 inline-block">
              {currentQ.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug font-display">
              {currentQ.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOptionIndex === idx;
              const isCorrect = idx === currentQ.correctAnswerIndex;

              let btnStyle =
                'bg-slate-900/60 border-slate-800/80 text-slate-200 hover:bg-slate-900 hover:border-slate-700';

              if (hasAnsweredCurrent) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/50 border-emerald-500/80 text-emerald-200 shadow-glow-emerald';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-950/50 border-rose-500/80 text-rose-200 shadow-glow-rose';
                } else {
                  btnStyle = 'bg-slate-950/30 border-slate-900 text-slate-500 opacity-50';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={hasAnsweredCurrent}
                  className={`cursor-pointer w-full text-left p-4 rounded-2xl border transition flex items-start justify-between gap-3 ${btnStyle}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-800 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 text-slate-300">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm font-medium leading-relaxed">{option}</span>
                  </div>

                  {hasAnsweredCurrent && (
                    <div className="shrink-0 mt-0.5">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : isSelected ? (
                        <XCircle className="w-5 h-5 text-rose-400" />
                      ) : null}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box (Visible once answered) */}
          {hasAnsweredCurrent && (
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5 animate-fade-in shadow-inner">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">
                <BookOpen className="w-4 h-4" /> Scientific Rationale &amp; Mechanism
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {currentQ.explanation}
              </p>
              <div className="text-[11px] text-slate-400 font-mono pt-1 border-t border-slate-800/80">
                Primary Clinical Citation: <span className="text-cyan-300">{currentQ.scientificReference}</span>
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
            <span className="text-xs text-slate-400 font-mono">
              {hasAnsweredCurrent ? 'REVIEW RATIONALE ABOVE' : 'SELECT AN OPTION TO REVEAL CLINICAL DATA'}
            </span>
            {hasAnsweredCurrent && (
              <button
                onClick={handleNext}
                className="cursor-pointer px-5 py-2.5 rounded-xl font-bold text-xs bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition flex items-center gap-1.5 shadow-glow-cyan"
              >
                {currentIndex < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'View Assessment Result'}
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Completed Screen */
        <div className="bg-slate-950/90 backdrop-blur-xl border border-slate-800/90 rounded-3xl p-8 sm:p-12 shadow-2xl text-center space-y-6 hud-corner-tl hud-corner-br">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-glow-cyan">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h3 className="text-3xl font-black text-white font-display">Assessment Completed</h3>
            <p className="text-sm text-slate-300">
              You scored{' '}
              <span className="font-extrabold text-cyan-400 text-xl font-mono">
                {totalCorrect} / {QUIZ_QUESTIONS.length}
              </span>{' '}
              ({percentage}%)
            </p>
          </div>

          <div className="max-w-lg mx-auto p-5 rounded-2xl bg-slate-900/70 border border-slate-800 text-xs text-slate-200 leading-relaxed">
            {percentage === 100 && (
              <div className="space-y-1">
                <span className="text-emerald-400 font-bold font-display text-sm flex items-center justify-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Perfect Virology Mastery!
                </span>
                <p className="text-slate-300">
                  You demonstrated comprehensive command of HIV molecular genetics, reverse transcriptase infidelity, U=U trial evidence, and clinical window periods.
                </p>
              </div>
            )}
            {percentage >= 75 && percentage < 100 && (
              <div className="space-y-1">
                <span className="text-cyan-400 font-bold font-display text-sm">
                  Clinical Competence Achieved!
                </span>
                <p className="text-slate-300">
                  Strong grasp of transmission science, PrEP/PEP timing, and antiretroviral mechanisms.
                </p>
              </div>
            )}
            {percentage < 75 && (
              <div className="space-y-1">
                <span className="text-amber-400 font-bold font-display text-sm">
                  Good Review Opportunity!
                </span>
                <p className="text-slate-300">
                  Review the 3D Molecular Lab and Replication Cycle tabs to reinforce understanding of viral enzymes and transmission vectors.
                </p>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={handleRestart}
              className="cursor-pointer px-6 py-3 rounded-2xl font-bold text-xs bg-slate-900 hover:bg-slate-800 text-slate-100 transition inline-flex items-center gap-2 border border-slate-700 shadow-lg"
            >
              <RotateCcw className="w-4 h-4" /> Retake Assessment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
