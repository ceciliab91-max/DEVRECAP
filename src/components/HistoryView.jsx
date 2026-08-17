import React, { useState } from 'react';
import { 
  History, 
  Award, 
  Clock, 
  Calendar, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { getHistory, clearAllData } from '../utils/storage';

export default function HistoryView({ onRefreshStats }) {
  const [historyList, setHistoryList] = useState(() => getHistory());

  const handleClearHistory = () => {
    if (window.confirm("Attenzione: sei sicuro di voler cancellare tutto lo storico delle simulazioni e resettare i dati?")) {
      clearAllData();
      setHistoryList([]);
      onRefreshStats();
    }
  };

  const formatDate = (isoString) => {
    const d = new Date(isoString);
    return d.toLocaleString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTimeMinutes = (seconds) => {
    if (!seconds) return 'N/A';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-800/80 border border-slate-700 p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold border border-purple-500/30 bg-purple-500/10 text-purple-300">
              <History className="w-3.5 h-3.5" />
              <span>Storico & Log Simulazioni</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Registro delle Prove Effettuate
            </h1>
            <p className="text-slate-300 text-xs sm:text-base max-w-2xl leading-relaxed">
              Consulta tutti i tuoi tentativi passati con date, durata del test, punteggio conseguito in trentesimi ed esito percentuale.
            </p>
          </div>

          {historyList.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-red-400 border border-slate-700 text-xs font-semibold transition-all"
            >
              <Trash2 className="w-4 h-4" />
              <span>Azzera Dati & Storico</span>
            </button>
          )}
        </div>
      </div>

      {/* History Log List */}
      {historyList.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-slate-800/40 border border-slate-700 space-y-4">
          <div className="w-16 h-16 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center mx-auto">
            <History className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">Nessuna Simulazione Trovata</h3>
          <p className="text-slate-400 text-xs sm:text-base max-w-md mx-auto">
            Non hai ancora eseguito prove d'esame. Completa la tua prima simulazione per iniziare a costruire il tuo storico.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {historyList.map((item) => {
            const isPass = item.score30 >= 18;

            return (
              <div
                key={item.id}
                className="p-5 sm:p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 hover:border-slate-600 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md"
              >
                
                {/* Left details */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                      item.mode === 'full' 
                        ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                        : item.mode === 'subject'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        : 'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                      {item.mode === 'full' ? 'Simulazione Completa' : item.mode === 'subject' ? `Allenamento (${item.subjectFilter})` : 'Revisione Errori'}
                    </span>

                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                      isPass ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                      {isPass ? 'Superato' : 'Non Superato'}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center space-x-4 text-xs text-slate-400 font-medium">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>{formatDate(item.date)}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>Durata: {formatTimeMinutes(item.timeSpentSeconds)}</span>
                    </span>
                  </div>
                </div>

                {/* Right score display */}
                <div className="flex items-center space-x-6 sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-700">
                  <div className="text-right">
                    <div className="text-2xl font-black text-white">
                      {item.score30} <span className="text-xs font-bold text-slate-500">/ 30</span>
                    </div>
                    <span className="text-xs text-indigo-400 font-semibold">
                      {item.percentage}% ({item.score}/{item.totalQuestions} risposte esatte)
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
