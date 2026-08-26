import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Database, 
  Code2, 
  Users, 
  TrendingUp, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  X, 
  BookOpen, 
  Award
} from 'lucide-react';

import { questionsData } from '../data/questionsData';
import { challengesData } from './LiveCoding';
import { 
  getCustomQuestions, 
  saveCustomQuestions, 
  getCustomChallenges, 
  saveCustomChallenges,
  getAggregateStats 
} from '../utils/storage';
import { getUsers } from '../utils/authStorage';

export default function AdminHub({ currentUser }) {
  const [activeTab, setActiveTab] = useState('metrics'); // 'metrics' | 'questions' | 'challenges'
  
  // Custom storage state
  const [customQuestions, setCustomQuestions] = useState(() => getCustomQuestions());
  const [customChallenges, setCustomChallenges] = useState(() => getCustomChallenges());

  // Search & Filters for questions
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('ALL');

  // Question Modal state
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [questionFormData, setQuestionFormData] = useState({
    subject: 'CSS',
    chapter: 'Modulo 1',
    question: '',
    codeSnippet: '',
    options: ['', '', '', ''],
    correctIndex: 0,
    explanation: ''
  });

  // Challenge Modal state
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [challengeFormData, setChallengeFormData] = useState({
    subject: 'CSS',
    title: '',
    description: '',
    htmlTemplate: '<div class="test"></div>',
    initialCode: '/* Scrivi il tuo codice qui */',
    officialSolution: '/* Soluzione ufficiali */',
    hint: ''
  });

  // Security guard check
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="max-w-2xl mx-auto my-12 p-8 rounded-3xl bg-red-500/10 border border-red-500/30 text-center space-y-4">
        <ShieldCheck className="w-12 h-12 text-red-500 dark:text-red-400 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Accesso Riservato agli Amministratori</h2>
        <p className="text-xs text-slate-600 dark:text-slate-300">
          Questa sezione è accessibile soltanto agli utenti con ruolo Docente/Admin.
        </p>
      </div>
    );
  }

  // Merged effective datasets
  const allQuestions = [...questionsData, ...customQuestions];
  const allChallenges = [...challengesData, ...customChallenges];
  const usersList = getUsers();
  const globalStats = getAggregateStats();

  // --- QUESTION CRUD HANDLERS ---
  const handleOpenQuestionModal = (q = null) => {
    if (q) {
      setEditingQuestion(q);
      setQuestionFormData({
        subject: q.subject,
        chapter: q.chapter || 'Modulo 1',
        question: q.question,
        codeSnippet: q.codeSnippet || '',
        options: [...q.options],
        correctIndex: q.correctIndex,
        explanation: q.explanation || ''
      });
    } else {
      setEditingQuestion(null);
      setQuestionFormData({
        subject: 'CSS',
        chapter: 'Modulo 1',
        question: '',
        codeSnippet: '',
        options: ['', '', '', ''],
        correctIndex: 0,
        explanation: ''
      });
    }
    setShowQuestionModal(true);
  };

  const handleSaveQuestion = (e) => {
    e.preventDefault();
    let updated;
    if (editingQuestion) {
      // Edit existing custom question or replace in custom list
      const filtered = customQuestions.filter(q => q.id !== editingQuestion.id);
      const updatedItem = { ...editingQuestion, ...questionFormData };
      updated = [updatedItem, ...filtered];
    } else {
      // Create new question
      const newQuestion = {
        id: `custom-q-${Date.now()}`,
        ...questionFormData,
        isCustom: true
      };
      updated = [newQuestion, ...customQuestions];
    }
    setCustomQuestions(updated);
    saveCustomQuestions(updated);
    setShowQuestionModal(false);
  };

  const handleDeleteQuestion = (qId) => {
    if (confirm("Sei sicuro di voler eliminare questo quesito?")) {
      const updated = customQuestions.filter(q => q.id !== qId);
      setCustomQuestions(updated);
      saveCustomQuestions(updated);
    }
  };

  // --- CHALLENGE CRUD HANDLERS ---
  const handleSaveChallenge = (e) => {
    e.preventDefault();
    const newChallenge = {
      id: `custom-c-${Date.now()}`,
      pdfReference: "Traccia Personalizzata Docente",
      ...challengeFormData,
      checkRules: [{ name: "Sintassi valida", regex: /.*/ }],
      isCustom: true
    };
    const updated = [newChallenge, ...customChallenges];
    setCustomChallenges(updated);
    saveCustomChallenges(updated);
    setShowChallengeModal(false);
  };

  const handleDeleteChallenge = (cId) => {
    if (confirm("Sei sicuro di voler eliminare questa sfida pratica?")) {
      const updated = customChallenges.filter(c => c.id !== cId);
      setCustomChallenges(updated);
      saveCustomChallenges(updated);
    }
  };

  // Filtered Questions list
  const filteredQuestionsList = allQuestions.filter(q => {
    const matchesSubject = subjectFilter === 'ALL' || q.subject === subjectFilter;
    const matchesSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (q.chapter && q.chapter.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSubject && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-16 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-purple-500/30 p-6 sm:p-10 shadow-2xl text-white">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Area Riservata Docenti ed Amministratori</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Pannello di Amministrazione "Admin Hub"
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Gestisci la banca dati delle domande d'esame, monitora le metriche globali degli studenti e aggiungi nuove sfide pratiche di codice.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-white">Modalità Admin Attiva</span>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-800 mt-6">
          <button
            onClick={() => setActiveTab('metrics')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'metrics'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-slate-800/60 text-slate-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Dashboard Metriche</span>
          </button>

          <button
            onClick={() => setActiveTab('questions')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'questions'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-slate-800/60 text-slate-400 hover:text-white'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Gestione Quesiti ({allQuestions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('challenges')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'challenges'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-slate-800/60 text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Sfida Pratica Live Coding ({allChallenges.length})</span>
          </button>
        </div>
      </div>

      {/* --- TAB 1: METRICHE GLOBALI --- */}
      {activeTab === 'metrics' && (
        <div className="space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Domande Totali Caricate</span>
                <Database className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="text-3xl font-black text-slate-900 dark:text-white">{allQuestions.length}</div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">CSS, JS, React e SQL</p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Sfide Pratiche Live Coding</span>
                <Code2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div className="text-3xl font-black text-slate-900 dark:text-white">{allChallenges.length}</div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Esercizi pratici per gli studenti</p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Studenti Iscritti</span>
                <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-3xl font-black text-slate-900 dark:text-white">{usersList.length}</div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Account registrati in piattaforma</p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Media Voti Globale</span>
                <Award className="w-5 h-5 text-amber-500 dark:text-amber-400" />
              </div>
              <div className="text-3xl font-black text-slate-900 dark:text-white">{globalStats.averageScore30 > 0 ? `${globalStats.averageScore30}/30` : 'N/A'}</div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Tutte le simulazioni svolte</p>
            </div>

          </div>

          {/* Subject Breakdown Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Ripartizione Domande per Materia</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              {['CSS', 'JavaScript', 'React', 'SQL'].map((sub) => {
                const count = allQuestions.filter(q => q.subject === sub).length;
                return (
                  <div key={sub} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                    <span className="text-slate-600 dark:text-slate-400 font-semibold block">{sub}</span>
                    <span className="text-xl font-bold text-slate-900 dark:text-white">{count} Quesiti</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* --- TAB 2: GESTIONE BANCA DATI QUESITI --- */}
      {activeTab === 'questions' && (
        <div className="space-y-6">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              {/* Search input */}
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cerca domanda o capitolo..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-purple-500 text-xs"
                />
              </div>

              {/* Subject selector */}
              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-purple-500 text-xs"
              >
                <option value="ALL">Tutte le Materie</option>
                <option value="CSS">CSS</option>
                <option value="JavaScript">JavaScript</option>
                <option value="React">React</option>
                <option value="SQL">SQL</option>
              </select>
            </div>

            <button
              onClick={() => handleOpenQuestionModal(null)}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Aggiungi Nuova Domanda</span>
            </button>

          </div>

          {/* Questions Table */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-4">Materia / Capitolo</th>
                    <th className="p-4">Testo Domanda</th>
                    <th className="p-4">Opzioni</th>
                    <th className="p-4 text-right">Azioni</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60">
                  {filteredQuestionsList.map((q) => (
                    <tr key={q.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 font-bold block w-max">
                          {q.subject}
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">{q.chapter || 'Generale'}</span>
                      </td>

                      <td className="p-4 max-w-md">
                        <p className="font-semibold text-slate-900 dark:text-white leading-snug truncate">{q.question}</p>
                        {q.isCustom && (
                          <span className="inline-block mt-1 px-1.5 py-0.2 rounded text-[9px] bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30">
                            Personalizzata Admin
                          </span>
                        )}
                      </td>

                      <td className="p-4 text-[11px] text-slate-500 dark:text-slate-400">
                        <span>4 Opzioni (Corretta: {String.fromCharCode(65 + (q.correctIndex || 0))})</span>
                      </td>

                      <td className="p-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleOpenQuestionModal(q)}
                            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-indigo-600 dark:text-indigo-300 transition-colors"
                            title="Modifica Quesito"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          
                          {q.isCustom && (
                            <button
                              onClick={() => handleDeleteQuestion(q.id)}
                              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-red-100 dark:hover:bg-red-900/60 text-red-600 dark:text-red-400 transition-colors"
                              title="Elimina Quesito"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* --- TAB 3: GESTIONE SFIDE LIVE CODING --- */}
      {activeTab === 'challenges' && (
        <div className="space-y-6">
          
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Elenco Sfide Pratiche per lo Studio</h3>
            <button
              onClick={() => setShowChallengeModal(true)}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Nuova Sfida Pratica</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allChallenges.map((c) => (
              <div key={c.id} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3 relative">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-slate-100 dark:bg-slate-950 text-cyan-600 dark:text-cyan-400 border border-slate-200 dark:border-slate-700">
                    {c.subject}
                  </span>
                  {c.isCustom && (
                    <button
                      onClick={() => handleDeleteChallenge(c.id)}
                      className="p-1.5 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                      title="Elimina Sfida"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <h4 className="text-base font-bold text-slate-900 dark:text-white">{c.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{c.description}</p>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                  Riferimento: {c.pdfReference}
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* --- MODAL FORM: AGGIUNGI / MODIFICA DOMANDA --- */}
      {showQuestionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 dark:bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-6 space-y-4 max-h-[90vh] overflow-y-auto text-xs text-slate-900 dark:text-slate-100">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {editingQuestion ? 'Modifica Domanda' : 'Aggiungi Nuova Domanda d\'Esame'}
              </h3>
              <button onClick={() => setShowQuestionModal(false)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveQuestion} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-700 dark:text-slate-300 font-semibold">Materia</label>
                  <select
                    value={questionFormData.subject}
                    onChange={(e) => setQuestionFormData({ ...questionFormData, subject: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="CSS">CSS</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="React">React</option>
                    <option value="SQL">SQL</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-700 dark:text-slate-300 font-semibold">Capitolo / Argomento</label>
                  <input
                    type="text"
                    required
                    value={questionFormData.chapter}
                    onChange={(e) => setQuestionFormData({ ...questionFormData, chapter: e.target.value })}
                    placeholder="Es. Flexbox Dispensa"
                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 dark:text-slate-300 font-semibold">Testo Quesito / Domanda</label>
                <textarea
                  rows={2}
                  required
                  value={questionFormData.question}
                  onChange={(e) => setQuestionFormData({ ...questionFormData, question: e.target.value })}
                  placeholder="Scrivi qui la domanda d'esame..."
                  className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 dark:text-slate-300 font-semibold">Snippet di Codice (Opzionale)</label>
                <textarea
                  rows={2}
                  value={questionFormData.codeSnippet}
                  onChange={(e) => setQuestionFormData({ ...questionFormData, codeSnippet: e.target.value })}
                  placeholder="const example = () => {}"
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-indigo-300 font-mono"
                />
              </div>

              {/* 4 Options */}
              <div className="space-y-2">
                <label className="text-slate-700 dark:text-slate-300 font-semibold block">Opzioni di Risposta (Seleziona la corretta):</label>
                {questionFormData.options.map((opt, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="correctIndex"
                      checked={questionFormData.correctIndex === idx}
                      onChange={() => setQuestionFormData({ ...questionFormData, correctIndex: idx })}
                      className="text-purple-600 focus:ring-purple-500"
                    />
                    <strong className="text-slate-500 dark:text-slate-400 w-4">{String.fromCharCode(65 + idx)}.</strong>
                    <input
                      type="text"
                      required
                      value={opt}
                      onChange={(e) => {
                        const newOpts = [...questionFormData.options];
                        newOpts[idx] = e.target.value;
                        setQuestionFormData({ ...questionFormData, options: newOpts });
                      }}
                      placeholder={`Opzione ${String.fromCharCode(65 + idx)}`}
                      className="flex-1 p-2 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 dark:text-slate-300 font-semibold">Spiegazione Didattica Concetto</label>
                <textarea
                  rows={2}
                  required
                  value={questionFormData.explanation}
                  onChange={(e) => setQuestionFormData({ ...questionFormData, explanation: e.target.value })}
                  placeholder="Spiegazione chiara che verrà mostrata dopo la risposta..."
                  className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowQuestionModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold"
                >
                  Salva Domanda
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL FORM: AGGIUNGI SFIDA LIVE CODING --- */}
      {showChallengeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 dark:bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-6 space-y-4 max-h-[90vh] overflow-y-auto text-xs text-slate-900 dark:text-slate-100">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Aggiungi Nuova Sfida Pratica Live Coding</h3>
              <button onClick={() => setShowChallengeModal(false)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveChallenge} className="space-y-3">
              <div className="space-y-1">
                <label className="text-slate-700 dark:text-slate-300 font-semibold">Titolo Sfida</label>
                <input
                  type="text"
                  required
                  value={challengeFormData.title}
                  onChange={(e) => setChallengeFormData({ ...challengeFormData, title: e.target.value })}
                  placeholder="Es. Centratura Flexbox"
                  className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 dark:text-slate-300 font-semibold">Descrizione Traccia</label>
                <textarea
                  rows={2}
                  required
                  value={challengeFormData.description}
                  onChange={(e) => setChallengeFormData({ ...challengeFormData, description: e.target.value })}
                  placeholder="Spiega l'obiettivo dell'esercizio..."
                  className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 dark:text-slate-300 font-semibold">HTML Template</label>
                <textarea
                  rows={2}
                  value={challengeFormData.htmlTemplate}
                  onChange={(e) => setChallengeFormData({ ...challengeFormData, htmlTemplate: e.target.value })}
                  className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-indigo-300 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 dark:text-slate-300 font-semibold">CSS Iniziale</label>
                <textarea
                  rows={2}
                  value={challengeFormData.initialCode}
                  onChange={(e) => setChallengeFormData({ ...challengeFormData, initialCode: e.target.value })}
                  className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-indigo-300 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 dark:text-slate-300 font-semibold">Soluzione Ufficiale</label>
                <textarea
                  rows={2}
                  value={challengeFormData.officialSolution}
                  onChange={(e) => setChallengeFormData({ ...challengeFormData, officialSolution: e.target.value })}
                  className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-emerald-300 font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowChallengeModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold"
                >
                  Salva Sfida
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
