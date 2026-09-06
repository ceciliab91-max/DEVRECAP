import React, { useState } from 'react';
import { 
  AlertTriangle, 
  RotateCcw, 
  Trash2, 
  CheckCircle2, 
  Sparkles,
  Filter
} from 'lucide-react';
import { questionsData } from '../data/questionsData';
import { getErrorPool, setErrorPool, toggleErrorQuestion } from '../utils/storage';

export default function ErrorPool({ onStartErrorReview }) {
  const [errorIds, setErrorIds] = useState(() => getErrorPool());
  const [selectedSubject, setSelectedSubject] = useState('ALL');

  // Filter full questions matching error IDs
  const errorQuestions = questionsData.filter(q => errorIds.includes(q.id));

  const filteredQuestions = selectedSubject === 'ALL'
    ? errorQuestions
    : errorQuestions.filter(q => q.subject === selectedSubject);

  const handleRemoveError = (questionId) => {
    const updated = toggleErrorQuestion(questionId);
    setErrorIds(updated);
  };

  const handleClearAllErrors = () => {
    if (window.confirm("Sei sicuro di voler svuotare interamente la Banca Errori?")) {
      setErrorPool([]);
      setErrorIds([]);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold border border-red-500/30 bg-red-500/10 text-red-400">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Banca Errori & Punti Deboli</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Revisione Mirata degli Errori
            </h1>
            <p className="text-slate-300 text-xs sm:text-base max-w-2xl leading-relaxed">
              Tutte le domande che hai sbagliato durante i test vengono salvate qui automaticamente. Allenati finché non hai eliminato ogni dubbio!
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              disabled={errorQuestions.length === 0}
              onClick={onStartErrorReview}
              className={`flex items-center space-x-2 px-5 py-3 rounded-2xl font-bold text-xs shadow-lg transition-all ${
                errorQuestions.length > 0
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-red-600/25'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Avvia Test Errori ({errorQuestions.length})</span>
            </button>

            {errorQuestions.length > 0 && (
              <button
                onClick={handleClearAllErrors}
                className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-red-400 border border-slate-700 transition-colors"
                title="Svuota banca errori"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Subject Filter Bar */}
      {errorQuestions.length > 0 && (
        <div className="flex items-center space-x-2 overflow-x-auto pb-1">
          <Filter className="w-4 h-4 text-slate-500 dark:text-slate-400 mr-2" />
          {['ALL', 'CSS', 'JavaScript', 'React', 'SQL'].map(sub => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                selectedSubject === sub
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {sub === 'ALL' ? `Tutti (${errorQuestions.length})` : sub}
            </button>
          ))}
        </div>
      )}

      {/* Questions list */}
      {filteredQuestions.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Nessun Errore Presente!</h3>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-base max-w-md mx-auto">
            {errorQuestions.length === 0
              ? 'Non ci sono errori salvati nella banca dati. Completa nuove simulazioni per identificare eventuali punti deboli.'
              : 'Nessun errore presente per la materia selezionata.'}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredQuestions.map((q) => (
            <div 
              key={q.id}
              className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                    {q.subject}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {q.chapter}
                  </span>
                </div>

                <button
                  onClick={() => handleRemoveError(q.id)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-200 dark:border-slate-700 text-xs font-semibold transition-all"
                  title="Segna come imparato"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Segna Riconquistata</span>
                </button>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                {q.question}
              </h3>

              {q.codeSnippet && (
                <div className="rounded-2xl bg-slate-950 p-4 border border-slate-800 font-mono text-xs text-indigo-300 overflow-x-auto">
                  <pre><code>{q.codeSnippet}</code></pre>
                </div>
              )}

              {/* Correct option badge */}
              <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center justify-between">
                <span>Risposta Corretta: <strong>{q.options[q.correctIndex]}</strong></span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>

              {/* Explanation box */}
              <div className="p-4 rounded-2xl bg-indigo-500/10 dark:bg-indigo-950/30 border border-indigo-500/20 space-y-1.5 text-xs">
                <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>Spiegazione Concetto Tecnico</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {q.explanation}
                </p>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
