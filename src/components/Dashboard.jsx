import React from 'react';
import { 
  Play, 
  BrainCircuit, 
  Target, 
  RotateCcw, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  ArrowRight,
  Sparkles,
  Layers,
  Code2,
  Database,
  FileCode2,
  Clock,
  History,
  BookOpen
} from 'lucide-react';
import { getHistory, getErrorPool } from '../utils/storage';
import { questionsData } from '../data/questionsData';
import StreakWidget from './StreakWidget';

export default function Dashboard({ stats, onStartQuiz, onStartErrorReview, setActiveTab, currentUser }) {
  const historyList = getHistory().slice(0, 3); // top 3 recent attempts
  const errorIds = getErrorPool();
  const recentErrorQuestions = questionsData.filter(q => errorIds.includes(q.id)).slice(0, 3);

  // Countdown calculation
  const calculateDays = (dateStr) => {
    if (!dateStr) return null;
    const target = new Date(dateStr);
    const today = new Date();
    target.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const daysRemaining = currentUser ? calculateDays(currentUser.examDate) : null;

  const subjectConfig = [
    { 
      id: 'CSS', 
      name: 'CSS 3 & Flexbox', 
      icon: FileCode2, 
      count: questionsData.filter(q => q.subject === 'CSS').length,
      description: 'Selettori avanzati, pseudo-classi :nth-child, Flexbox layout, position absolute/relative, rem/em ed opacità.',
      color: 'from-blue-500 to-cyan-500', 
      accent: 'text-blue-600 dark:text-blue-400', 
      bg: 'bg-blue-500/10 border-blue-500/20' 
    },
    { 
      id: 'JavaScript', 
      name: 'JavaScript ES6+', 
      icon: Code2, 
      count: questionsData.filter(q => q.subject === 'JavaScript').length,
      description: 'Scope, arrow functions, .map/.filter/.reduce, DOM manipulation, preventDefault, localStorage ed async/await.',
      color: 'from-yellow-500 to-amber-500', 
      accent: 'text-amber-600 dark:text-amber-400', 
      bg: 'bg-amber-500/10 border-amber-500/20' 
    },
    { 
      id: 'React', 
      name: 'React 18 & Hooks', 
      icon: Layers, 
      count: questionsData.filter(q => q.subject === 'React').length,
      description: 'Sintassi JSX, Props & children, useState, immutabilità con spread, useEffect lifecycle, Context e React Router.',
      color: 'from-cyan-400 to-sky-500', 
      accent: 'text-cyan-600 dark:text-cyan-400', 
      bg: 'bg-cyan-500/10 border-cyan-500/20' 
    },
    { 
      id: 'SQL', 
      name: 'SQL & Database', 
      icon: Database, 
      count: questionsData.filter(q => q.subject === 'SQL').length,
      description: 'RDBMS, SELECT con WHERE/ORDER BY, transazioni START TRANSACTION, INNER/LEFT JOIN, GROUP BY e HAVING.',
      color: 'from-purple-500 to-indigo-500', 
      accent: 'text-purple-600 dark:text-purple-400', 
      bg: 'bg-purple-500/10 border-purple-500/20' 
    }
  ];

  const formatDate = (isoString) => {
    const d = new Date(isoString);
    return d.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-8 pb-16 animate-fadeIn">
      
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 p-8 sm:p-10 border border-indigo-500/20 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DevExam Dashboard / Studio</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {currentUser ? (
              <>Bentornato, <span className="bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-300 bg-clip-text text-transparent">{currentUser.name}</span>!</>
            ) : (
              <>Piattaforma di Preparazione all'Esame di <span className="bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-300 bg-clip-text text-transparent">Sviluppo Web</span></>
            )}
          </h1>
          
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Allenati sulle 4 materie del corso (CSS, JS, React, SQL), simula prove ufficiali a tempo e monitora la tua preparazione giorno per giorno.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('quiz-select')}
              className="py-3 px-5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/25 flex items-center space-x-2 transition-all hover:scale-[1.02]"
            >
              <BrainCircuit className="w-4 h-4" />
              <span>Simula Esame Completo</span>
            </button>

            <button
              onClick={() => setActiveTab('mappe-schemi')}
              className="py-3 px-5 rounded-2xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-200 border border-indigo-500/40 font-semibold text-xs flex items-center space-x-2 transition-all"
            >
              <Layers className="w-4 h-4 text-indigo-300" />
              <span>Mappe & Schemi Visivi</span>
            </button>

            <button
              onClick={() => setActiveTab('notebook')}
              className="py-3 px-5 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs flex items-center space-x-2 transition-all"
            >
              <BookOpen className="w-4 h-4 text-indigo-300" />
              <span>Appunti Notebook</span>
            </button>
          </div>
        </div>

        {/* Exam Countdown Widget */}
        {daysRemaining !== null && (
          <div 
            onClick={() => setActiveTab('profile')}
            className="cursor-pointer group relative z-10 p-5 rounded-2xl bg-slate-950/80 border border-indigo-500/30 hover:border-indigo-500/60 shadow-xl transition-all min-w-[200px] text-center space-y-2"
          >
            <div className="flex items-center justify-center space-x-1.5 text-xs text-indigo-400 font-bold uppercase tracking-wider">
              <Clock className="w-4 h-4" />
              <span>Obiettivo Esame</span>
            </div>
            <div className="text-3xl font-black text-white group-hover:scale-105 transition-transform">
              {daysRemaining} <span className="text-sm font-bold text-slate-400">Giorni</span>
            </div>
            <div className="text-[11px] text-slate-400 font-medium">
              Target: <strong className="text-pink-400">{currentUser.targetGrade}</strong>
            </div>
            <span className="text-[10px] text-indigo-300 block underline group-hover:text-indigo-200">
              Modifica data nel profilo
            </span>
          </div>
        )}

      </div>

      {/* Daily Streak & Weekly Activity Widget */}
      <StreakWidget />

      {/* Global Stats Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Simulazioni Completate */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm rounded-2xl hover:border-slate-300 dark:hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Simulazioni</span>
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{stats.totalSimulations}</span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">completate</span>
          </div>
        </div>

        {/* Card 2: Media Punteggio */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm rounded-2xl hover:border-slate-300 dark:hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Media Voto</span>
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div>
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                {stats.averageScore30 > 0 ? `${stats.averageScore30}` : '0'}
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400 font-semibold">/30</span>
            </div>
            <span className="text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
              {stats.averagePercentage}% esito
            </span>
          </div>
        </div>

        {/* Card 3: Accuratezza Globale */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm rounded-2xl hover:border-slate-300 dark:hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Accuratezza Risposte</span>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{stats.averagePercentage}%</span>
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">risposte esatte</span>
          </div>
        </div>

        {/* Card 4: Errori da Rivedere */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm rounded-2xl hover:border-slate-300 dark:hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Banca Errori</span>
            <div className="p-2.5 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{stats.errorsCount}</span>
            <button 
              onClick={() => setActiveTab('statistiche')}
              className="text-xs font-semibold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1"
            >
              Vedi Errori <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>

      {/* 4 Interactive Subject Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center space-x-2">
            <Target className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
            <span>Materie dell'Esame (Dispense Ufficiali)</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {subjectConfig.map((sub) => {
            const Icon = sub.icon;
            const subData = stats.subjectAccuracy[sub.id] || { percent: 0, correct: 0, total: 0 };

            return (
              <div
                key={sub.id}
                className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm rounded-2xl hover:border-indigo-500/50 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-2xl ${sub.bg}`}>
                      <Icon className={`w-6 h-6 ${sub.accent}`} />
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {sub.count} Quesiti
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{sub.name}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1 font-normal">
                      {sub.description}
                    </p>
                  </div>

                  {/* Accuracy Bar */}
                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      <span>Accuratezza:</span>
                      <span className={sub.accent}>{subData.percent}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className={`h-full rounded-full bg-gradient-to-r ${sub.color}`}
                        style={{ width: `${subData.percent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onStartQuiz({ mode: 'subject', subject: sub.id })}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center space-x-2 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Allenati su {sub.id}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Attività Recenti & Argomenti Deboli Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Attività Recenti */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <History className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
              <span>Attività Recenti</span>
            </h3>
            <button 
              onClick={() => setActiveTab('statistiche')}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              Vedi Storico <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {historyList.length === 0 ? (
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center py-6">
              Nessuna prova effettuata di recente. Avvia una simulazione!
            </p>
          ) : (
            <div className="space-y-3">
              {historyList.map(item => (
                <div key={item.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">
                      {item.mode === 'full' ? 'Simulazione Completa' : item.mode === 'subject' ? `Test ${item.subjectFilter}` : 'Revisione Errori'}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">{formatDate(item.date)}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-indigo-600 dark:text-indigo-400 text-sm block">{item.score30}/30</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">{item.percentage}% esatti</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Argomenti Deboli / Banca Errori */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-red-500 dark:text-red-400" />
              <span>Argomenti Deboli ({errorIds.length})</span>
            </h3>
            <button 
              onClick={() => setActiveTab('statistiche')}
              className="text-xs font-semibold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1"
            >
              Vedi Tutti <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {recentErrorQuestions.length === 0 ? (
            <div className="text-center py-6 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 dark:text-emerald-400 mx-auto" />
              <p className="text-xs text-slate-800 dark:text-slate-300 font-semibold">Nessun errore registrato!</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">I tuoi punti deboli compariranno qui dopo i test.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentErrorQuestions.map(q => (
                <div key={q.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1 text-xs">
                  <div className="flex justify-between text-[11px]">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">{q.subject}</span>
                    <span className="text-slate-500 dark:text-slate-400">{q.chapter}</span>
                  </div>
                  <p className="text-slate-800 dark:text-slate-200 font-medium truncate">{q.question}</p>
                </div>
              ))}
              
              <button
                onClick={onStartErrorReview}
                className="w-full py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-all flex items-center justify-center space-x-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ripeti Errori ({errorIds.length})</span>
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
