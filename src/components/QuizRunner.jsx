import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Award, 
  ArrowRight, 
  RotateCcw, 
  FileText, 
  ExternalLink,
  BookOpen,
  Sparkles
} from 'lucide-react';

export default function QuizRunner({ title, questions, onClose, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQ = questions[currentIndex];
  const isSelected = selectedAnswers[currentIndex] !== undefined;

  const handleSelectOption = (optionIdx) => {
    if (isSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIndex]: optionIdx
    });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setIsSubmitted(true);
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) {
        correctCount++;
      }
    });

    const scorePercentage = Math.round((correctCount / questions.length) * 100);

    if (scorePercentage >= 60) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    if (onComplete) {
      onComplete({
        scorePercentage,
        correctCount,
        totalQuestions: questions.length
      });
    }
  };

  // Calculate final score if submitted
  const getResults = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) correct++;
    });
    return {
      correct,
      total: questions.length,
      pct: Math.round((correct / questions.length) * 100)
    };
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Quiz Header */}
        <div className="p-4 bg-slate-800/80 border-b border-slate-700/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Interactive MoSPI Assessment
            </span>
            <h2 className="text-base font-bold text-white mt-1">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white border border-slate-700 text-xs"
          >
            ✕ Close
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-1.5">
          <div
            className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {!isSubmitted ? (
            <>
              {/* Question Index Badge */}
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Question {currentIndex + 1} of {questions.length}</span>
                <span className="text-amber-400 font-semibold">
                  {Object.keys(selectedAnswers).length} answered
                </span>
              </div>

              {/* Question Text */}
              <div className="text-sm font-semibold text-slate-100 leading-relaxed bg-slate-800/40 p-4 rounded-xl border border-slate-800">
                {currentQ.question}
              </div>

              {/* Options list */}
              <div className="space-y-3">
                {currentQ.options.map((opt, optIdx) => {
                  const isOptSelected = selectedAnswers[currentIndex] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full text-left p-3.5 rounded-xl border transition flex items-start space-x-3 text-xs font-medium ${
                        isOptSelected
                          ? 'bg-amber-500/20 border-amber-500 text-amber-200 font-semibold shadow-md'
                          : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border shrink-0 mt-0.5 ${
                        isOptSelected
                          ? 'bg-amber-500 text-slate-950 border-amber-400'
                          : 'bg-slate-800 text-slate-400 border-slate-600'
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="leading-snug">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            /* Results Screen */
            <div className="text-center space-y-6 py-4">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">Assessment Complete!</h3>
                <p className="text-xs text-slate-400 mt-1">Your competency scores have been updated in your profile.</p>
              </div>

              {/* Score breakdown card */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-slate-800/60 rounded-xl border border-slate-700 text-center">
                <div>
                  <div className="text-xl font-extrabold text-amber-400">{getResults().pct}%</div>
                  <div className="text-[10px] text-slate-400">Score Percentage</div>
                </div>
                <div>
                  <div className="text-xl font-extrabold text-emerald-400">{getResults().correct} / {getResults().total}</div>
                  <div className="text-[10px] text-slate-400">Correct Answers</div>
                </div>
                <div>
                  <div className="text-xl font-extrabold text-sky-400">+150 XP</div>
                  <div className="text-[10px] text-slate-400">iGOT Karmayogi</div>
                </div>
              </div>

              {/* Question Explanations & Source Citations */}
              <div className="text-left space-y-4 pt-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Detailed Answer Explanations & Manual Citations
                </h4>
                {questions.map((q, idx) => {
                  const userAns = selectedAnswers[idx];
                  const isCorrect = userAns === q.correct;
                  return (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border text-xs space-y-2 ${
                        isCorrect
                          ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                          : 'bg-rose-950/20 border-rose-500/30 text-rose-200'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span className="font-bold flex items-center space-x-1.5">
                          {isCorrect ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : (
                            <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                          )}
                          <span>Q{idx + 1}. {q.question}</span>
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-300 pl-5">
                        <span className="font-semibold text-slate-400">Your Selection:</span>{' '}
                        {userAns !== undefined ? q.options[userAns] : 'Not Answered'}
                      </div>

                      {!isCorrect && (
                        <div className="text-[11px] text-emerald-400 font-semibold pl-5">
                          Correct Option: {q.options[q.correct]}
                        </div>
                      )}

                      <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 text-[11px] text-slate-300 space-y-1.5">
                        <div className="font-semibold text-amber-400 flex items-center space-x-1">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Explanation & Rationale:</span>
                        </div>
                        <p>{q.explanation}</p>
                        {q.sourceCitation && (
                          <div className="text-[10px] text-sky-400 flex items-center space-x-1 pt-1 border-t border-slate-800">
                            <FileText className="w-3 h-3" />
                            <span>Source Citation: <strong>{q.sourceCitation}</strong></span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-800/80 border-t border-slate-700/80 flex items-center justify-between">
          {!isSubmitted ? (
            <>
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40 text-xs font-semibold"
              >
                Previous
              </button>

              {currentIndex < questions.length - 1 ? (
                <button
                  onClick={handleNext}
                  disabled={!isSelected}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center space-x-1 disabled:opacity-40 shadow-md shadow-amber-500/20"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(selectedAnswers).length === 0}
                  className="px-6 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs flex items-center space-x-1.5 shadow-md shadow-emerald-500/20"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Submit & View Results</span>
                </button>
              )}
            </>
          ) : (
            <div className="w-full flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs shadow-md shadow-amber-500/20"
              >
                Return to Platform
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
