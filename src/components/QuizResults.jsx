import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  Home, 
  BookOpen, 
  Code, 
  Sparkles,
  Bookmark,
  AlertTriangle,
  ArrowRight,
  Bot
} from 'lucide-react';
import { toggleErrorQuestion, getErrorPool } from '../utils/storage';

export default function QuizResults({ result, onRestartQuiz, onGoHome, onStartErrorReview, onAskAITutor }) {
  const [errorPoolIds, setErrorPoolIds] = useState(() => new Set(getErrorPool()));

  const { score30, percentage, score, totalQuestions, timeSpentSeconds, questions } = result;

  const getEvaluation = (score30Val) => {
    if (score30Val >= 28) return { label: 'Eccellente! Esame Superato a Pieni Voti', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };
    if (score30Val >= 18) return { label: 'Esame Superato con Successo', color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30' };
    return { label: 'Esame Non Superato - Richiede Ripasso', color: 'text-red-400 bg-red-500/10 border-red-500/30' };
  };

  const evalStatus = getEvaluation(score30);

  const handleToggleError = (questionId) => {
    const updated = toggleErrorQuestion(questionId);
    setErrorPoolIds(new Set(updated));
  };

  const formatTimeMinutes = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16 animate-fadeIn">
      
      {/* Top Hero Score Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-800/90 border border-slate-700 p-6 sm:p-10 shadow-2xl text-center space-y-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold border border-indigo-500/30 bg-indigo-500/10 text-indigo-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Esito Simulazione Completa</span>
        </div>

        {/* Big Score Displays */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
          
          {/* Grade in 30ths */}
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Voto in Trentesimi</span>
            <div className="flex items-baseline justify-center space-x-1">
              <span className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
                {score30}
              </span>
              <span className="text-xl font-bold text-slate-500">/ 30</span>
            </div>
          </div>

          <div className="hidden sm:block w-px h-16 bg-slate-700" />

          {/* Percentage */}
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Percentuale Esatta</span>
            <span className="text-4xl sm:text-5xl font-black text-white">
              {percentage}%
            </span>
          </div>

          <div className="hidden sm:block w-px h-16 bg-slate-700" />

          {/* Time spent */}
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Tempo Impiegato</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-300">
              {formatTimeMinutes(timeSpentSeconds)}
            </span>
          </div>

        </div>

        {/* Evaluation Pill */}
        <div>
          <span className={`inline-block px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold border ${evalStatus.color}`}>
            {evalStatus.label}
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={onGoHome}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={onRestartQuiz}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Nuova Simulazione</span>
          </button>

          {errorPoolIds.size > 0 && (
            <button
              onClick={onStartErrorReview}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-red-600/90 hover:bg-red-500 text-white text-xs font-bold shadow-md shadow-red-600/20 transition-all"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Ripeti Errori ({errorPoolIds.size})</span>
            </button>
          )}
        </div>

      </div>

      {/* Educational Feedback: Question by Question Review */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <span>Revisione Dettagliata Domande ({score}/{totalQuestions} Corrette)</span>
          </h2>
        </div>

        <div className="space-y-6">
          {questions.map((q, idx) => {
            const isCorrect = q.isCorrect;
            const inErrorPool = errorPoolIds.has(q.questionId);

            return (
              <div 
                key={q.questionId}
                className={`p-6 sm:p-7 rounded-3xl border transition-all space-y-4 ${
                  isCorrect
                    ? 'bg-slate-800/40 border-emerald-500/30'
                    : 'bg-slate-800/70 border-red-500/40'
                }`}
              >
                
                {/* Header info */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold ${
                      isCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {idx + 1}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-900 text-indigo-400 border border-slate-700">
                      {q.subject}
                    </span>
                    <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                      {q.chapter}
                    </span>
                  </div>

                  {/* Action buttons: AI Explanation + Error pool */}
                  <div className="flex items-center space-x-2">
                    {!isCorrect && (
                      <button
                        onClick={() => onAskAITutor && onAskAITutor({
                          question: q.question,
                          subject: q.subject,
                          correctAnswer: q.options[q.correctIndex],
                          userChoice: q.userChoice !== undefined && q.userChoice !== null ? q.options[q.userChoice] : 'Nessuna'
                        })}
                        className="flex items-center space-x-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/40 hover:text-white transition-all shadow-sm"
                        title="Genera spiegazione personalizzata dell'errore"
                      >
                        <Bot className="w-3.5 h-3.5 text-indigo-400" />
                        <span>💡 Chiedi al Tutor IA</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleToggleError(q.questionId)}
                      className={`flex items-center space-x-1.5 px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
                        inErrorPool
                          ? 'bg-red-500/20 text-red-300 border-red-500/40'
                          : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>{inErrorPool ? 'In Banca Errori' : 'Salva in Errori'}</span>
                    </button>
                  </div>
                </div>

                {/* Question Text */}
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {q.question}
                </h3>

                {/* Code Snippet if present */}
                {q.codeSnippet && (
                  <div className="rounded-2xl bg-slate-950 p-4 border border-slate-800 font-mono text-xs text-indigo-300 overflow-x-auto">
                    <pre><code>{q.codeSnippet}</code></pre>
                  </div>
                )}

                {/* Options list with correct/incorrect markers */}
                <div className="space-y-2 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isUserChoice = q.userChoice === optIdx;
                    const isCorrectChoice = q.correctIndex === optIdx;

                    let rowStyle = 'bg-slate-900/40 border-slate-800 text-slate-400';
                    if (isCorrectChoice) {
                      rowStyle = 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 font-semibold';
                    } else if (isUserChoice && !isCorrectChoice) {
                      rowStyle = 'bg-red-500/15 border-red-500/40 text-red-300 font-semibold';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-3.5 rounded-xl border text-xs flex items-center justify-between transition-colors ${rowStyle}`}
                      >
                        <span className="flex items-center space-x-2">
                          <strong className="opacity-75">{String.fromCharCode(65 + optIdx)}.</strong>
                          <span>{opt}</span>
                        </span>

                        <div className="flex items-center space-x-2">
                          {isUserChoice && (
                            <span className="px-2 py-0.5 text-[10px] rounded bg-slate-800 font-bold text-slate-300">
                              Tua Risposta
                            </span>
                          )}
                          {isCorrectChoice && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          )}
                          {isUserChoice && !isCorrectChoice && (
                            <XCircle className="w-4 h-4 text-red-400" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Educational Explanation Box */}
                <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 space-y-1.5 text-xs">
                  <div className="flex items-center space-x-2 text-indigo-400 font-bold">
                    <Sparkles className="w-4 h-4" />
                    <span>Spiegazione Concetto Tecnico</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {q.explanation}
                  </p>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
