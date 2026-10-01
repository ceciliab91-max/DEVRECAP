import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import ErrorPool from "./ErrorPool";
import HistoryView from "./HistoryView";

export default function StatisticheView({
  stats,
  onStartErrorReview,
  onRefreshStats,
  initialSubTab = "overview"
}) {
  const [subTab, setSubTab] = useState(initialSubTab);

  useEffect(() => {
    if (initialSubTab) {
      setSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  const subjectConfig = [
    {
      id: "CSS",
      name: "CSS 3 & Flexbox",
      icon: FileCode2,
      accent: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
    },
    {
      id: "JavaScript",
      name: "JavaScript ES6+",
      icon: Code2,
      accent: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20",
    },
    {
      id: "React",
      name: "React 19 & Hooks",
      icon: Layers,
      accent: "text-cyan-600 dark:text-cyan-400",
      bg: "bg-cyan-500/10 border-cyan-500/20",
    },
    {
      id: "SQL",
      name: "MySQL & Relazioni",
      icon: Database,
      accent: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/20",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-4 sm:p-6 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-indigo-950/40 dark:to-slate-900 border border-indigo-100/80 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100/80 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-500/20">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Pannello Statistiche & Revisione</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Report Prestazioni & Banca Errori
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl">
              Monitora l'andamento per materia, riesegui i quiz falliti per azzerare le lacune e consulta lo storico cronologico dei tuoi esami.
            </p>
          </div>

          {/* Sub-Tabs Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-950/80 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs shrink-0 self-stretch sm:self-auto justify-center">
            <button
              type="button"
              onClick={() => setSubTab("overview")}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                subTab === "overview"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Panoramica</span>
            </button>

            <button
              type="button"
              onClick={() => setSubTab("errors")}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer relative ${
                subTab === "errors"
                  ? "bg-amber-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Banca Errori</span>
              {stats?.errorsCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-extrabold bg-red-500 text-white">
                  {stats.errorsCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setSubTab("history")}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                subTab === "history"
                  ? "bg-purple-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Storico Quiz</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub-View Content */}
      {subTab === "overview" && (
        <div className="space-y-4 animate-fadeIn">
          {/* Global KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium mb-1">
                <span>Quiz Completati</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {stats?.totalQuizzes || 0}
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Sessioni concluse</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium mb-1">
                <span>Media Punteggio</span>
                <TrendingUp className="w-4 h-4 text-indigo-500" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {stats?.averageScore || 0}%
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Accuratezza complessiva</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium mb-1">
                <span>Errori Attivi</span>
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-2xl font-black text-amber-600 dark:text-amber-400">
                {stats?.errorsCount || 0}
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Da recuperare nella banca</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium mb-1">
                <span>Livello Preparazione</span>
                <Award className="w-4 h-4 text-purple-500" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {(stats?.averageScore || 0) >= 80 ? "Avanzato" : (stats?.averageScore || 0) >= 60 ? "Intermedio" : "Base"}
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Stima per l'esame</span>
            </div>
          </div>

          {/* Subject Breakdown Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {subjectConfig.map((sub) => {
              const Icon = sub.icon;
              const subData = stats?.bySubject?.[sub.id] || { total: 0, correct: 0, percentage: 0 };
              return (
                <div
                  key={sub.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between gap-4"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${sub.bg}`}>
                      <Icon className={`w-5 h-5 ${sub.accent}`} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                        {sub.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {subData.correct} corrette su {subData.total} risposte
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className={`text-base font-black ${subData.percentage >= 75 ? 'text-emerald-500' : subData.percentage >= 50 ? 'text-amber-500' : 'text-slate-400'}`}>
                      {subData.percentage}%
                    </span>
                    <div className="w-20 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                      <div
                        className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${subData.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {subTab === "errors" && (
        <div className="animate-fadeIn">
          <ErrorPool onStartErrorReview={onStartErrorReview} />
        </div>
      )}

      {subTab === "history" && (
        <div className="animate-fadeIn">
          <HistoryView onRefreshStats={onRefreshStats} />
        </div>
      )}
    </div>
  );
}
