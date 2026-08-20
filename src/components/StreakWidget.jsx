import React, { useState } from 'react';
import { Flame, Check, Sparkles, Calendar, Zap } from 'lucide-react';
import { getStreakData, getWeekDays, recordStudyActivity } from '../utils/storage';

export default function StreakWidget({ onActivityRecorded }) {
  const [streakInfo, setStreakInfo] = useState(() => getStreakData());
  const weekDays = getWeekDays();

  const handleRecordToday = () => {
    const updated = recordStudyActivity();
    setStreakInfo(updated);
    if (onActivityRecorded) {
      onActivityRecorded();
    }
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const isStudiedToday = streakInfo.lastStudyDate === todayStr || streakInfo.weeklyActivity.includes(todayStr);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-amber-500/30 p-6 shadow-xl transition-all hover:border-amber-500/50">
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Left Side: Flame Badge & Title */}
        <div className="flex items-center space-x-4">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 ${
            isStudiedToday
              ? 'bg-gradient-to-tr from-amber-500 via-orange-500 to-red-500 text-white shadow-orange-500/30 scale-105 animate-pulse'
              : 'bg-slate-800 dark:bg-slate-800 light:bg-slate-100 text-slate-400 border border-slate-700 dark:border-slate-700 light:border-slate-200'
          }`}>
            <Flame className={`w-8 h-8 ${isStudiedToday ? 'text-amber-200 fill-amber-300' : 'text-slate-400'}`} />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-black text-white dark:text-white light:text-slate-900 tracking-tight">
                🔥 {streakInfo.streakCount} {streakInfo.streakCount === 1 ? 'Giorno' : 'Giorni'} di Streak
              </span>
              {isStudiedToday && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Attivo Oggi
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 font-medium mt-0.5">
              {isStudiedToday
                ? 'Ottimo lavoro! Hai completato la tua sessione di ripasso oggi.'
                : 'Completa un quiz o ripassa le note oggi per mantenere la fiamma accesa!'}
            </p>
          </div>
        </div>

        {/* Right Side / Quick Action */}
        {!isStudiedToday && (
          <button
            onClick={handleRecordToday}
            className="self-start md:self-center px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white text-xs font-extrabold shadow-lg shadow-orange-500/20 flex items-center space-x-2 transition-all hover:scale-105"
          >
            <Zap className="w-4 h-4 fill-white" />
            <span>Registra Studio Oggi</span>
          </button>
        )}
      </div>

      {/* Minimalist Mon-Sun Weekly Activity Bar */}
      <div className="mt-6 pt-5 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
        <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 mb-3">
          <span className="font-semibold flex items-center space-x-1.5 text-slate-300 dark:text-slate-300 light:text-slate-700">
            <Calendar className="w-3.5 h-3.5 text-indigo-400" />
            <span>Attività Settimanale (Lunedì &ndash; Domenica)</span>
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-500 light:text-slate-500 font-medium">
            {streakInfo.weeklyActivity.length} sessioni questa settimana
          </span>
        </div>

        <div className="grid grid-cols-7 gap-2 sm:gap-3">
          {weekDays.map((day) => {
            const hasStudied = streakInfo.weeklyActivity.includes(day.dateStr);

            return (
              <div
                key={day.dateStr}
                className={`flex flex-col items-center p-2.5 sm:p-3 rounded-2xl border transition-all text-center ${
                  day.isToday
                    ? 'ring-2 ring-indigo-500/80 border-indigo-500/50 bg-indigo-500/10'
                    : hasStudied
                    ? 'bg-amber-500/10 border-amber-500/30'
                    : 'bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-50 border-slate-800/80 dark:border-slate-800/80 light:border-slate-200'
                }`}
              >
                <span className={`text-[11px] font-bold block ${
                  day.isToday ? 'text-indigo-400 font-black' : 'text-slate-400 dark:text-slate-400 light:text-slate-600'
                }`}>
                  {day.name}
                </span>

                <div className="mt-2 flex items-center justify-center">
                  {hasStudied ? (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-md shadow-orange-500/30">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : day.isToday ? (
                    <div className="w-6 h-6 rounded-full border-2 border-indigo-400/50 border-dashed flex items-center justify-center text-indigo-300 text-[10px] font-bold animate-pulse">
                      •
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-slate-800/60 dark:bg-slate-800/60 light:bg-slate-200 border border-slate-700/50 dark:border-slate-700/50 light:border-slate-300" />
                  )}
                </div>

                <span className="text-[9px] text-slate-500 dark:text-slate-500 light:text-slate-400 font-medium mt-1">
                  {day.isToday ? 'Oggi' : day.dateStr.slice(8)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
