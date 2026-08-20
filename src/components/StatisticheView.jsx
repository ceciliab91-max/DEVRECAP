import React, { useState } from 'react';
import { 
  BarChart3, 
  AlertTriangle, 
  History, 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  FileCode2, 
  Code2, 
  Layers, 
  Database,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import ErrorPool from './ErrorPool';
import HistoryView from './HistoryView';
import { questionsData } from '../data/questionsData';

export default function StatisticheView({ stats, onStartErrorReview, onRefreshStats, setActiveTab }) {
  const [subTab, setSubTab] = useState('overview'); // 'overview', 'errors', 'history'

  const subjectConfig = [
    { id: 'CSS', name: 'CSS 3 & Flexbox', icon: FileCode2, accent: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
    { id: 'JavaScript', name: 'JavaScript ES6+', icon: Code2, accent: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
    { id: 'React', name: 'React 18 & Hooks', icon: Layers, accent: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20' },
    { id: 'SQL', name: 'SQL & Database', icon: Database, accent: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' }
  ];

  return (
    <div className="space-y-8 pb-16 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-slate-800 p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Statistiche & Analytics Pro</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Progressi, Banca Errori e Storico Test
            </h1>
            <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
              Analizza le tue prestazioni su ciascuna materia dell'esame, rivedi le risposte errate per azzerare le lacune e consulta lo storico completo.
            </p>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-800/80 mt-6">
          <button
            onClick={() => setSubTab('overview')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              subTab === 'overview'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Panoramica Progressi</span>
          </button>

          <button
            onClick={() => setSubTab('errors')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              subTab === 'errors'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span>Banca Errori ({stats.errorsCount})</span>
          </button>

          <button
            onClick={() => setSubTab('history')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              subTab === 'history'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <History className="w-4 h-4 text-indigo-400" />
            <span>Storico Test ({stats.totalSimulations})</span>
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: PANORAMICA PROGRESSI */}
      {subTab === 'overview' && (
        <div className="space-y-8">
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-md">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase">
                <span>Simulazioni Totali</span>
                <CheckCircle2 className="w-5 h-5 text-indigo-400" />
              </div>
              <div className="mt-4 text-3xl font-extrabold text-white">
                {stats.totalSimulations}
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-md">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase">
                <span>Media Voto /30</span>
                <Award className="w-5 h-5 text-amber-400" />
              </div>
              <div className="mt-4 text-3xl font-extrabold text-white">
                {stats.averageScore30 > 0 ? `${stats.averageScore30}/30` : 'N/A'}
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-md">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase">
                <span>Accuratezza Risposte</span>
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="mt-4 text-3xl font-extrabold text-white">
                {stats.averagePercentage}%
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-md">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase">
                <span>Errori da Azzerare</span>
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-white">{stats.errorsCount}</span>
                <button
                  onClick={() => setSubTab('errors')}
                  className="text-xs font-bold text-red-400 hover:underline"
                >
                  Vedi Errori
                </button>
              </div>
            </div>
          </div>

          {/* Subject Breakdown Cards */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight">Accuratezza per Materia</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {subjectConfig.map((sub) => {
                const Icon = sub.icon;
                const accuracy = stats.subjectAccuracy[sub.id] || { percent: 0, correct: 0, total: 0 };

                return (
                  <div key={sub.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-2xl ${sub.bg}`}>
                          <Icon className={`w-6 h-6 ${sub.accent}`} />
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-base">{sub.name}</h3>
                          <span className="text-xs text-slate-400">
                            {accuracy.correct} esatte su {accuracy.total} risposte fornite
                          </span>
                        </div>
                      </div>

                      <span className={`text-xl font-black ${sub.accent}`}>
                        {accuracy.percent}%
                      </span>
                    </div>

                    <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                        style={{ width: `${accuracy.percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* SUB-TAB 2: BANCA ERRORI */}
      {subTab === 'errors' && (
        <ErrorPool onStartErrorReview={onStartErrorReview} />
      )}

      {/* SUB-TAB 3: STORICO TEST */}
      {subTab === 'history' && (
        <HistoryView onRefreshStats={onRefreshStats} />
      )}

    </div>
  );
}
