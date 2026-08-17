import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Layers, 
  Code2, 
  Database, 
  FileCode2, 
  Sparkles,
  Play,
  RotateCcw,
  Award
} from 'lucide-react';
import { roadmapData } from '../data/roadmapData';
import { getRoadmapCompleted, toggleRoadmapTopic } from '../utils/storage';

export default function StudyPlanner({ onStartQuiz }) {
  const [completedMap, setCompletedMap] = useState(() => getRoadmapCompleted());
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState('ALL');

  const handleToggle = (topicId) => {
    const updated = toggleRoadmapTopic(topicId);
    setCompletedMap(updated);
  };

  // Calculate total stats
  let totalTopicsCount = 0;
  let completedTopicsCount = 0;
  let totalEstimatedHours = 0;

  roadmapData.forEach(sub => {
    sub.topics.forEach(t => {
      totalTopicsCount += 1;
      totalEstimatedHours += t.estimatedHours;
      if (completedMap[t.id]) {
        completedTopicsCount += 1;
      }
    });
  });

  const overallPercent = totalTopicsCount > 0 ? Math.round((completedTopicsCount / totalTopicsCount) * 100) : 0;

  const subjectIconMap = {
    CSS: FileCode2,
    JavaScript: Code2,
    React: Layers,
    SQL: Database
  };

  const filteredRoadmap = selectedSubjectFilter === 'ALL'
    ? roadmapData
    : roadmapData.filter(r => r.subject === selectedSubjectFilter);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-800/80 border border-slate-700 p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold border border-indigo-500/30 bg-indigo-500/10 text-indigo-300">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Piano & Roadmap di Ripasso</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Tabella di Marcia Settimanale
            </h1>
            <p className="text-slate-300 text-xs sm:text-base max-w-2xl leading-relaxed">
              Segna i capitoli completati per misurare la tua preparazione globale e visualizzare il grado di padronanza per ciascuna materia.
            </p>
          </div>

          {/* Progress Circle & Counter */}
          <div className="flex items-center space-x-6 p-4 rounded-2xl bg-slate-900/80 border border-slate-700/80">
            <div className="space-y-1 text-right">
              <span className="text-xs font-semibold text-slate-400 block">Completamento Roadmap</span>
              <span className="text-3xl font-black text-white">{overallPercent}%</span>
              <span className="text-[11px] text-indigo-400 block font-semibold">{completedTopicsCount} di {totalTopicsCount} Capitoli</span>
            </div>
            <div className="w-14 h-14 rounded-full border-4 border-indigo-500/30 flex items-center justify-center relative">
              <Award className="w-7 h-7 text-indigo-400" />
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-slate-800">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500"
              style={{ width: `${overallPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2 overflow-x-auto pb-1">
          <button
            onClick={() => setSelectedSubjectFilter('ALL')}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
              selectedSubjectFilter === 'ALL'
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
            }`}
          >
            Tutte le Materie ({roadmapData.length})
          </button>
          {roadmapData.map(sub => (
            <button
              key={sub.subject}
              onClick={() => setSelectedSubjectFilter(sub.subject)}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                selectedSubjectFilter === sub.subject
                  ? `${sub.badgeBg} font-extrabold ring-1 ring-indigo-400`
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
              }`}
            >
              {sub.subject}
            </button>
          ))}
        </div>
      </div>

      {/* Subject Sections & Topic Cards */}
      <div className="space-y-8">
        {filteredRoadmap.map((sub) => {
          const Icon = subjectIconMap[sub.subject] || BookOpen;

          // Subject completion stats
          let subCompleted = 0;
          sub.topics.forEach(t => {
            if (completedMap[t.id]) subCompleted += 1;
          });
          const subPercent = Math.round((subCompleted / sub.topics.length) * 100);

          return (
            <div 
              key={sub.subject}
              className="p-6 sm:p-8 rounded-3xl bg-slate-800/60 border border-slate-700 space-y-6 shadow-xl"
            >
              
              {/* Subject Title Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-700/80">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-2xl ${sub.badgeBg}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{sub.subject}</h2>
                    <span className="text-xs text-slate-400 font-medium">
                      {subCompleted} su {sub.topics.length} capitoli completati ({subPercent}%)
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => onStartQuiz({ mode: 'subject', subject: sub.subject })}
                    className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold border border-slate-600 transition-all"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Testa {sub.subject}</span>
                  </button>
                </div>
              </div>

              {/* Topics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sub.topics.map((t) => {
                  const isDone = Boolean(completedMap[t.id]);

                  return (
                    <div
                      key={t.id}
                      onClick={() => handleToggle(t.id)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start space-x-4 group ${
                        isDone
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-slate-300'
                          : 'bg-slate-900/50 border-slate-700/80 hover:bg-slate-700/30 hover:border-slate-600'
                      }`}
                    >
                      {/* Checkbox Icon */}
                      <div className="mt-0.5">
                        {isDone ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-400 fill-emerald-500/20" />
                        ) : (
                          <Circle className="w-6 h-6 text-slate-500 group-hover:text-slate-300" />
                        )}
                      </div>

                      {/* Topic Content */}
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center justify-between">
                          <span className={`font-bold text-sm leading-snug ${isDone ? 'line-through text-slate-400' : 'text-white'}`}>
                            {t.title}
                          </span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {t.estimatedHours}h
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {t.description}
                        </p>
                        <span className="inline-block pt-1 text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                          {t.week}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
