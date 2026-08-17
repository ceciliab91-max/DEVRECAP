import React, { useState } from 'react';
import { 
  RotateCw, 
  CheckCircle2, 
  RotateCcw, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  BrainCircuit, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Zap, 
  FolderDown, 
  FileText
} from 'lucide-react';

import { flashcardsData } from '../data/flashcardsData';
import { mindmapsData } from '../data/mindmapsData';
import { getFlashcardStatus, setFlashcardStatus, resetFlashcardStatus } from '../utils/storage';

export default function HubStudio() {
  const [subTab, setSubTab] = useState('flashcards'); // 'flashcards', 'mindmaps', 'notebooklm'
  
  // Flashcards state
  const [subjectFilter, setSubjectFilter] = useState('ALL'); // 'ALL', 'CSS', 'JavaScript', 'React', 'SQL'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardStatusMap, setCardStatusMap] = useState(() => getFlashcardStatus());

  // Mindmaps state
  const [mindmapSubject, setMindmapSubject] = useState('CSS');

  // Filtered flashcards
  const filteredFlashcards = subjectFilter === 'ALL'
    ? flashcardsData
    : flashcardsData.filter(card => card.subject === subjectFilter);

  const currentCard = filteredFlashcards[currentIndex] || filteredFlashcards[0];

  // Navigation for flashcards
  const handleNextCard = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % filteredFlashcards.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + filteredFlashcards.length) % filteredFlashcards.length);
  };

  const handleMarkStatus = (cardId, status) => {
    const updated = setFlashcardStatus(cardId, status);
    setCardStatusMap(updated);
    handleNextCard();
  };

  const handleResetCards = () => {
    const updated = resetFlashcardStatus();
    setCardStatusMap(updated);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  // Stats calculation for flashcards
  const knownCount = Object.values(cardStatusMap).filter(st => st === 'known').length;
  const totalCards = flashcardsData.length;
  const percentageKnown = Math.round((knownCount / totalCards) * 100) || 0;

  return (
    <div className="space-y-8 pb-16 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-slate-800 p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hub Studio & Ripasso Visivo</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Strumenti di Ripasso & Materiali d'Esame
            </h1>
            <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
              Consolida la tua preparazione con le Flashcard ad effetto flip, esplora le Mappe Concettuali ad albero prima dell'esame o colleghi le tue dispense su NotebookLM.
            </p>
          </div>

          {/* Flashcard Progress Widget in Header */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center space-x-4 min-w-[220px]">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="w-12 h-12 transform -rotate-90">
                <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="4" className="text-slate-800" fill="transparent" />
                <circle 
                  cx="24" 
                  cy="24" 
                  r="18" 
                  stroke="currentColor" 
                  strokeWidth="4" 
                  className="text-emerald-400 transition-all duration-500" 
                  fill="transparent" 
                  strokeDasharray={113}
                  strokeDashoffset={113 - (113 * percentageKnown) / 100}
                />
              </svg>
              <span className="absolute text-[11px] font-bold text-white">{percentageKnown}%</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium block">Flashcard Apprese</span>
              <span className="text-sm font-bold text-white">
                <strong className="text-emerald-400">{knownCount}</strong> / {totalCards} Card
              </span>
            </div>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-800/80 mt-6">
          <button
            onClick={() => setSubTab('flashcards')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              subTab === 'flashcards'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Flashcard Interattive</span>
          </button>

          <button
            onClick={() => setSubTab('mindmaps')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              subTab === 'mindmaps'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BrainCircuit className="w-4 h-4" />
            <span>Mappe Concettuali / Schemi</span>
          </button>

          <button
            onClick={() => setSubTab('notebooklm')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              subTab === 'notebooklm'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Card NotebookLM</span>
          </button>
        </div>
      </div>

      {/* --- SUB TAB 1: FLASHCARD INTERATTIVE --- */}
      {subTab === 'flashcards' && (
        <div className="space-y-6">
          
          {/* Controls & Subject Filter */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Subject Selector Pills */}
            <div className="flex flex-wrap gap-2">
              {['ALL', 'CSS', 'JavaScript', 'React', 'SQL'].map((sub) => (
                <button
                  key={sub}
                  onClick={() => {
                    setSubjectFilter(sub);
                    setCurrentIndex(0);
                    setIsFlipped(false);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    subjectFilter === sub
                      ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {sub === 'ALL' ? 'Tutte le Materie' : sub}
                </button>
              ))}
            </div>

            {/* Reset Button */}
            <button
              onClick={handleResetCards}
              className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-red-400 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Resetta Progresso</span>
            </button>
          </div>

          {/* Main Flashcard 3D Card Area */}
          {currentCard ? (
            <div className="max-w-2xl mx-auto space-y-6">
              
              {/* Card Counter & Status Badge */}
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold">
                  Card {currentIndex + 1} di {filteredFlashcards.length}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-indigo-400 font-bold">
                    {currentCard.subject} &bull; {currentCard.category}
                  </span>
                  {cardStatusMap[currentCard.id] === 'known' && (
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[11px] font-bold">
                      La so ✅
                    </span>
                  )}
                  {cardStatusMap[currentCard.id] === 'review' && (
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[11px] font-bold">
                      Da rivedere 🔄
                    </span>
                  )}
                </div>
              </div>

              {/* Interactive Flip Card Container */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="cursor-pointer group relative min-h-[320px] rounded-3xl bg-slate-900 border-2 border-indigo-500/30 hover:border-indigo-500/60 p-8 shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Hint */}
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="font-medium text-indigo-300">
                      {isFlipped ? 'RETRO: Spiegazione & Codice' : 'FRONTE: Concetto Teorico'}
                    </span>
                  </span>
                  <span className="flex items-center space-x-1 text-slate-400 group-hover:text-indigo-400 transition-colors">
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Clicca per Ruotare</span>
                  </span>
                </div>

                {/* Card Content (Front vs Back) */}
                <div className="py-6 space-y-4">
                  {!isFlipped ? (
                    // FRONT CONTENT
                    <div className="space-y-4 text-center">
                      <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
                        {currentCard.title}
                      </h2>
                      <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-lg mx-auto">
                        "{currentCard.front}"
                      </p>
                    </div>
                  ) : (
                    // BACK CONTENT
                    <div className="space-y-4">
                      <h3 className="text-base font-bold text-emerald-400 flex items-center space-x-2">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Spiegazione Concetto:</span>
                      </h3>
                      <p className="text-slate-200 text-sm leading-relaxed">
                        {currentCard.back}
                      </p>
                      {currentCard.codeSnippet && (
                        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-indigo-300 font-mono text-xs overflow-x-auto">
                          <pre><code>{currentCard.codeSnippet}</code></pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Bottom Action Footer */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>Valuta la tua conoscenza di questa card:</span>
                </div>
              </div>

              {/* Status Rating Action Buttons */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => handleMarkStatus(currentCard.id, 'review')}
                  className="flex-1 max-w-[200px] flex items-center justify-center space-x-2 py-3 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold transition-all shadow-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Da rivedere 🔄</span>
                </button>

                <button
                  onClick={() => handleMarkStatus(currentCard.id, 'known')}
                  className="flex-1 max-w-[200px] flex items-center justify-center space-x-2 py-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition-all shadow-sm"
                >
                  <Check className="w-4 h-4" />
                  <span>La so ✅</span>
                </button>
              </div>

              {/* Prev / Next Card Controls */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={handlePrevCard}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-800 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Precedente</span>
                </button>

                <button
                  onClick={handleNextCard}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-800 transition-colors"
                >
                  <span>Successiva</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ) : (
            <div className="text-center py-12 text-slate-400">
              Nessuna flashcard trovata per la materia selezionata.
            </div>
          )}

        </div>
      )}

      {/* --- SUB TAB 2: MAPPE CONCETTUALI / SCHEMI --- */}
      {subTab === 'mindmaps' && (
        <div className="space-y-6">
          
          {/* Subject Switcher */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {mindmapsData.map((map) => (
              <button
                key={map.subject}
                onClick={() => setMindmapSubject(map.subject)}
                className={`flex items-center space-x-2 px-5 py-3 rounded-2xl text-xs font-bold border transition-all ${
                  mindmapSubject === map.subject
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/30 scale-105'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
                }`}
              >
                <BrainCircuit className="w-4 h-4" />
                <span>Mappa {map.subject}</span>
              </button>
            ))}
          </div>

          {/* Active Mindmap tree view */}
          {(() => {
            const activeMap = mindmapsData.find(m => m.subject === mindmapSubject) || mindmapsData[0];
            return (
              <div className="space-y-6">
                
                <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${activeMap.badgeColor}`}>
                      {activeMap.subject}
                    </span>
                    <h2 className="text-xl font-bold text-white">{activeMap.title}</h2>
                  </div>
                  <p className="text-xs text-slate-400">{activeMap.description}</p>
                </div>

                {/* Mindmap Nodes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeMap.nodes.map((node, idx) => (
                    <div
                      key={node.id}
                      className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all space-y-4 flex flex-col justify-between shadow-lg"
                    >
                      <div className="space-y-3">
                        
                        {/* Node Title Header */}
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                          <h3 className="text-base font-bold text-white flex items-center space-x-2">
                            <span className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold">
                              {idx + 1}
                            </span>
                            <span>{node.title}</span>
                          </h3>
                        </div>

                        {/* Summary */}
                        <p className="text-xs font-medium text-slate-300">
                          {node.summary}
                        </p>

                        {/* Tree Points List */}
                        <ul className="space-y-2 text-xs text-slate-400">
                          {node.points.map((pt, ptIdx) => (
                            <li key={ptIdx} className="flex items-start space-x-2">
                              <ChevronRight className="w-3.5 h-3.5 text-indigo-400 mt-0.5 flex-shrink-0" />
                              <span className="leading-relaxed">{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Exam Tip Footer Box */}
                      {node.tip && (
                        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 flex items-start space-x-2">
                          <Zap className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                          <span><strong>Trucco Esame:</strong> {node.tip}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

              </div>
            );
          })()}

        </div>
      )}

      {/* --- SUB TAB 3: CARD NOTEBOOKLM --- */}
      {subTab === 'notebooklm' && (
        <div className="max-w-3xl mx-auto space-y-8">
          
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-tr from-slate-900 via-slate-900 to-indigo-950 border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden">
            
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">Integrazione Studio IA</span>
                <h2 className="text-2xl font-black text-white tracking-tight">Google NotebookLM</h2>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              Studia le dispense del corso con la potenza dell'IA personalizzata! Puoi caricare le dispense presenti nel tuo progetto direttamente su NotebookLM per creare podcast audio automatici, guide di studio, e fare domande interattive sulle dispense di <strong>JavaScript</strong>, <strong>React</strong> e <strong>SQL</strong>.
            </p>

            {/* Folder structure overview */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-white flex items-center space-x-2">
                <FolderDown className="w-4 h-4 text-emerald-400" />
                <span>Cartelle Dispense Disponibili nel Progetto:</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-mono">
                  📁 dispense_javascript
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-mono">
                  📁 dispense_react
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-mono">
                  📁 dispense_sql
                </div>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-3 text-xs text-slate-300">
              <h4 className="font-bold text-white">Come Utilizzare NotebookLM:</h4>
              <ol className="space-y-2 list-decimal list-inside text-slate-400">
                <li>Apri Google NotebookLM cliccando il pulsante qui sotto.</li>
                <li>Crea un nuovo taccuino (es. "Ripasso Esame Web Developer").</li>
                <li>Carica i file Markdown/PDF contenuti nelle cartelle `dispense_*`.</li>
                <li>Genera schemi automatici o fai domande direttamente ai tuoi documenti!</li>
              </ol>
            </div>

            {/* External Button Link */}
            <div className="pt-2">
              <a
                href="https://notebooklm.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-3 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-95 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all transform hover:-translate-y-0.5"
              >
                <span>Apri NotebookLM per studiare con le tue dispense</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
