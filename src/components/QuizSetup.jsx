import React, { useState } from 'react';
import { 
  Clock, 
  Sparkles, 
  Target, 
  Play, 
  ShieldCheck, 
  FileCode2, 
  Code2, 
  Layers, 
  Database 
} from 'lucide-react';

export default function QuizSetup({ onStartQuiz }) {
  const [examMode, setExamMode] = useState('full'); // 'full' | 'subject'
  const [selectedSubject, setSelectedSubject] = useState('CSS');
  const [timerSetting, setTimerSetting] = useState(30); // 30, 45, 0 (0 = no limit)

  const subjectOptions = [
    { id: 'CSS', name: 'CSS 3 & Flexbox', icon: FileCode2, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
    { id: 'JavaScript', name: 'JavaScript ES6+', icon: Code2, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
    { id: 'React', name: 'React 18 & Hooks', icon: Layers, color: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20' },
    { id: 'SQL', name: 'SQL & Relational DB', icon: Database, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' }
  ];

  const handleLaunch = () => {
    onStartQuiz({
      mode: examMode,
      subject: examMode === 'subject' ? selectedSubject : null,
      timerMinutes: timerSetting
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 border border-indigo-500/20 p-8 shadow-2xl space-y-4 text-center sm:text-left text-white">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold border border-indigo-500/30 bg-indigo-500/10 text-indigo-300">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Configuratore Simulazione Ufficiale</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Configura la tua Prova d'Esame
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
          Scegli la modalità di prova, la materia target ed il tempo a disposizione prima di avviare il motore del quiz.
        </p>
      </div>

      {/* Configuration Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-8">
        
        {/* Step 1: Select Mode */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Target className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
            <span>1. Seleziona la Modalità di Esame</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Full Exam Card */}
            <div
              onClick={() => setExamMode('full')}
              className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                examMode === 'full'
                  ? 'bg-indigo-500/10 dark:bg-indigo-600/20 border-indigo-500 text-slate-900 dark:text-white font-bold ring-2 ring-indigo-500/50'
                  : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold">Esame Completo Mix 4 Materie</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
                  30 Domande
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                Selezione casuale da tutte le 100 domande di CSS, JavaScript, React ed SQL. Simula una vera prova esame.
              </p>
            </div>

            {/* Single Subject Card */}
            <div
              onClick={() => setExamMode('subject')}
              className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                examMode === 'subject'
                  ? 'bg-indigo-500/10 dark:bg-indigo-600/20 border-indigo-500 text-slate-900 dark:text-white font-bold ring-2 ring-indigo-500/50'
                  : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold">Allenamento per Materia Singola</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                  25 Quesiti
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                Test focalizzato esclusivamente su uno dei 4 moduli ufficiali a tua scelta.
              </p>
            </div>

          </div>
        </div>

        {/* Step 2: Select Subject (If mode === 'subject') */}
        {examMode === 'subject' && (
          <div className="space-y-4 animate-fadeIn">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-500 dark:text-amber-400" />
              <span>2. Seleziona la Materia Target</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {subjectOptions.map(sub => {
                const Icon = sub.icon;
                const isSelected = selectedSubject === sub.id;

                return (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubject(sub.id)}
                    className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                      isSelected
                        ? `${sub.bg} ${sub.color} font-bold ring-2 ring-indigo-500`
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="block text-sm">{sub.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Timer Setting */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Clock className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />
            <span>{examMode === 'subject' ? '3.' : '2.'} Seleziona il Timer di Prova</span>
          </h2>

          <div className="grid grid-cols-3 gap-3">
            {[
              { mins: 30, label: '30 Minuti (Standard)' },
              { mins: 45, label: '45 Minuti (Esteso)' },
              { mins: 0, label: 'Senza Limite di Tempo' }
            ].map(timerOpt => (
              <button
                key={timerOpt.mins}
                onClick={() => setTimerSetting(timerOpt.mins)}
                className={`py-3.5 px-4 rounded-2xl border text-xs font-bold transition-all text-center ${
                  timerSetting === timerOpt.mins
                    ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border-cyan-500/50 ring-2 ring-cyan-500/40'
                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {timerOpt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Launch Action Button */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={handleLaunch}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-extrabold text-base shadow-lg shadow-indigo-600/30 flex items-center justify-center space-x-3 transition-all hover:scale-[1.01]"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Inizia Prova Ufficiale</span>
          </button>
        </div>

      </div>

    </div>
  );
}
