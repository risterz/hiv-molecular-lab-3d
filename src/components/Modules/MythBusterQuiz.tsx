import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  ChevronRight,
  BookOpen,
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
      <div className="pb-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
            Interactive Knowledge Check
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            HIV Virology & Myth-Buster Quiz
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Test your understanding of viral genetics, transmission myths, U=U, and prevention tools.
          </p>
        </div>

        {!isCompleted && (
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-2xl text-xs font-mono">
            <span className="text-slate-400">Question</span>
            <span className="font-bold text-cyan-400">
              {currentIndex + 1} / {QUIZ_QUESTIONS.length}
            </span>
          </div>
        )}
      </div>

      {!isCompleted ? (
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Question Tag & Content */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold font-mono uppercase tracking-wider text-purple-400 bg-purple-950/40 px-2.5 py-1 rounded-full border border-purple-500/30 inline-block">
              {currentQ.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOptionIndex === idx;
              const isCorrect = idx === currentQ.correctAnswerIndex;

              let btnStyle =
                'bg-slate-950/60 border-slate-800/80 text-slate-200 hover:bg-slate-800/70 hover:border-slate-700';

              if (hasAnsweredCurrent) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/50 border-emerald-500/80 text-emerald-200 shadow-lg shadow-emerald-500/10';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-950/50 border-rose-500/80 text-rose-200';
                } else {
                  btnStyle = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={hasAnsweredCurrent}
                  className={`w-full text-left p-4 rounded-2xl border transition flex items-start justify-between gap-3 ${btnStyle}`}
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
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                <BookOpen className="w-4 h-4" /> Scientific Rationale
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentQ.explanation}
              </p>
              <span className="text-[11px] text-slate-400 font-mono block pt-1">
                Source: {currentQ.scientificReference}
              </span>
            </div>
          )}

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
            <span className="text-xs text-slate-400">
              {hasAnsweredCurrent ? 'Review rationale above' : 'Select an answer to reveal explanation'}
            </span>
            {hasAnsweredCurrent && (
              <button
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl font-bold text-xs bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
              >
                {currentIndex < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'View Final Score'}
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Completed Screen */
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h3 className="text-3xl font-extrabold text-white">Quiz Completed!</h3>
            <p className="text-sm text-slate-300">
              You scored{' '}
              <span className="font-extrabold text-cyan-400 text-lg">
                {totalCorrect} / {QUIZ_QUESTIONS.length}
              </span>{' '}
              ({percentage}%)
            </p>
          </div>

          <div className="max-w-md mx-auto p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 leading-relaxed">
            {percentage === 100 && (
              <p className="text-emerald-400 font-bold">
                🌟 Perfect Mastery! You have a comprehensive grasp of HIV molecular biology, transmission science, and U=U.
              </p>
            )}
            {percentage >= 75 && percentage < 100 && (
              <p className="text-cyan-400 font-bold">
                👏 Excellent Work! You understand core virology mechanisms and evidence-based prevention.
              </p>
            )}
            {percentage < 75 && (
              <p className="text-amber-400 font-bold">
                📚 Good effort! Review the 3D Molecular Lab and Replication Cycle tabs to sharpen key concepts.
              </p>
            )}
          </div>

          <div>
            <button
              onClick={handleRestart}
              className="px-6 py-3 rounded-2xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-100 transition inline-flex items-center gap-2 border border-slate-700 shadow-md"
            >
              <RotateCcw className="w-4 h-4" /> Retake Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
