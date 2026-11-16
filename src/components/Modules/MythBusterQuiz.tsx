import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  ChevronRight,
  BookOpen,
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
      <div className="pb-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-950/80 text-amber-300 border border-amber-800/60 font-mono">
            Clinical Knowledge Assessment
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2 tracking-tight">
            Virology &amp; Public Health Myth-Buster
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Test your understanding of viral replication genetics, transmission realities, U=U, and biomedical prevention.
          </p>
        </div>

        {!isCompleted && (
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono">
            <BrainCircuit className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400">Question</span>
            <span className="font-bold text-sky-400">
              {currentIndex + 1} / {QUIZ_QUESTIONS.length}
            </span>
          </div>
        )}
      </div>

      {!isCompleted ? (
        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-card space-y-6">
          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-sky-500 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>

          {/* Question Tag & Content */}
          <div className="space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-300 bg-amber-950/50 px-2.5 py-0.5 rounded border border-amber-800/50 inline-block font-mono">
              {currentQ.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOptionIndex === idx;
              const isCorrect = idx === currentQ.correctAnswerIndex;

              let btnStyle =
                'bg-slate-900/80 border-slate-800 text-slate-200 hover:bg-slate-850 hover:border-slate-700';

              if (hasAnsweredCurrent) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/60 border-emerald-600/80 text-emerald-200';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-950/60 border-rose-600/80 text-rose-200';
                } else {
                  btnStyle = 'bg-slate-900/30 border-slate-900 text-slate-500 opacity-50';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={hasAnsweredCurrent}
                  className={`cursor-pointer w-full text-left p-3.5 sm:p-4 rounded-xl border transition flex items-start justify-between gap-3 ${btnStyle}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded bg-slate-800 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 text-slate-300">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm leading-relaxed">{option}</span>
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
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider font-mono">
                <BookOpen className="w-4 h-4" /> Scientific Rationale &amp; Mechanism
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {currentQ.explanation}
              </p>
              <div className="text-[11px] text-slate-400 font-mono pt-1 border-t border-slate-800">
                Primary Reference: <span className="text-slate-300">{currentQ.scientificReference}</span>
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <span className="text-xs text-slate-400">
              {hasAnsweredCurrent ? 'Review rationale above' : 'Select an answer to reveal clinical details'}
            </span>
            {hasAnsweredCurrent && (
              <button
                onClick={handleNext}
                className="cursor-pointer px-4 py-2 rounded-lg font-semibold text-xs bg-sky-600 hover:bg-sky-500 text-white transition flex items-center gap-1.5"
              >
                {currentIndex < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'View Final Score'}
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Completed Screen */
        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-8 sm:p-10 shadow-card text-center space-y-5">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-sky-950/80 border border-sky-800/60 flex items-center justify-center text-sky-400">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-white">Assessment Completed</h3>
            <p className="text-sm text-slate-300">
              Score:{' '}
              <span className="font-bold text-sky-400 text-lg font-mono">
                {totalCorrect} / {QUIZ_QUESTIONS.length}
              </span>{' '}
              ({percentage}%)
            </p>
          </div>

          <div className="max-w-md mx-auto p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
            {percentage === 100 && (
              <p className="text-emerald-300 font-medium">
                Perfect score! You demonstrated thorough command of HIV molecular biology, transmission vectors, and clinical U=U guidelines.
              </p>
            )}
            {percentage >= 75 && percentage < 100 && (
              <p className="text-sky-300 font-medium">
                Well done! You have strong understanding of core transmission realities and prevention methods.
              </p>
            )}
            {percentage < 75 && (
              <p className="text-amber-300 font-medium">
                Good attempt. Review the 3D Molecular Lab and Lifecycle stages to sharpen your understanding.
              </p>
            )}
          </div>

          <div>
            <button
              onClick={handleRestart}
              className="cursor-pointer px-5 py-2.5 rounded-lg font-semibold text-xs bg-slate-800 hover:bg-slate-700 text-slate-100 transition inline-flex items-center gap-2 border border-slate-700"
            >
              <RotateCcw className="w-4 h-4" /> Retake Assessment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
