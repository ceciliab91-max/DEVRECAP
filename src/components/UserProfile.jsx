import React, { useState } from 'react';
import { 
  User, 
  Calendar, 
  Target, 
  Award, 
  Save, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Layers, 
  Key, 
  Eye, 
  EyeOff, 
  ExternalLink,
  Download,
  Upload,
  Database
} from 'lucide-react';
import { updateUserProfile } from '../utils/authStorage';
import { getAggregateStats, getFlashcardStatus } from '../utils/storage';

export default function UserProfile({ currentUser, onUpdateUser }) {
  const safeUser = currentUser || {};
  const [formData, setFormData] = useState(() => ({
    name: safeUser.name || safeUser.username || '',
    bio: safeUser.bio || '',
    avatar: safeUser.avatar || '👨‍💻',
    examDate: safeUser.examDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    targetGrade: safeUser.targetGrade || '28/30',
    apiKey: safeUser.apiKey || ''
  }));
  const [showApiKey, setShowApiKey] = useState(false);

  const [savedSuccess, setSavedSuccess] = useState(false);
  const stats = getAggregateStats();
  const flashcardStatus = getFlashcardStatus();
  const knownCards = Object.values(flashcardStatus).filter(s => s === 'known').length;

  // Calculate countdown days
  const calculateCountdownDays = (targetDateStr) => {
    if (!targetDateStr) return 0;
    const target = new Date(targetDateStr);
    const today = new Date();
    target.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const daysRemaining = calculateCountdownDays(formData.examDate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = safeUser.id || 'user-student-demo';
      const updated = await updateUserProfile(userId, formData);
      if (onUpdateUser) onUpdateUser(updated);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  // Lean & Pragmatic JSON Export
  const handleExportBackup = () => {
    try {
      const backupData = {
        version: "1.0",
        timestamp: new Date().toISOString(),
        user: {
          name: formData.name,
          bio: formData.bio,
          avatar: formData.avatar,
          examDate: formData.examDate,
          targetGrade: formData.targetGrade
        },
        devexam_results: localStorage.getItem('devexam_results'),
        devexam_error_pool: localStorage.getItem('devexam_error_pool'),
        devexam_custom_questions: localStorage.getItem('devexam_custom_questions'),
        devexam_notes: localStorage.getItem('devexam_notes'),
        devexam_flashcards: localStorage.getItem('devexam_flashcards'),
        devexam_study_streak: localStorage.getItem('devexam_study_streak'),
        devexam_study_time: localStorage.getItem('devexam_study_time')
      };
      const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `devexam-backup-${new Date().toISOString().slice(0, 10)}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      alert('Errore durante la generazione del file di backup.');
    }
  };

  // Lean & Pragmatic JSON Import
  const handleImportBackup = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (!data || !data.version) {
          alert('Il file selezionato non è un backup valido di DevExam.');
          return;
        }
        const keys = [
          'devexam_results', 'devexam_error_pool', 'devexam_custom_questions',
          'devexam_notes', 'devexam_flashcards', 'devexam_study_streak', 'devexam_study_time'
        ];
        keys.forEach(k => {
          if (data[k] !== undefined && data[k] !== null) {
            localStorage.setItem(k, data[k]);
          }
        });
        alert('Backup ripristinato con successo! Ricarico la pagina.');
        window.location.reload();
      } catch {
        alert('Errore nella lettura del file JSON di backup.');
      }
    };
    reader.readAsText(file);
  };

  const avatars = ['👨‍💻', '👩‍💻', '🧑‍🎓', '🚀', '⚡', '🤖', '💡', '🔥'];

  const badges = [
    { id: 1, title: 'Primo Passo', desc: 'Completa la tua prima simulazione', unlocked: stats.totalSimulations > 0, icon: CheckCircle2 },
    { id: 2, title: 'Cecchino del Codice', desc: 'Ottieni una media punteggio superiore a 25/30', unlocked: stats.averageScore30 >= 25, icon: Target },
    { id: 3, title: 'Memoria d\'Acciaio', desc: 'Memorizza almeno 5 flashcard concettuali', unlocked: knownCards >= 5, icon: Layers },
    { id: 4, title: 'Maratoneta dello Studio', desc: 'Mantieni una serie di studio attiva', unlocked: true, icon: Clock }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-4 sm:p-6 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-indigo-950/40 dark:to-slate-900 border border-indigo-100/80 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100/80 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-500/20">
              <User className="w-3.5 h-3.5" />
              <span>Profilo & Impostazioni</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Profilo Studente & Obiettivo Esame
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl">
              Personalizza i tuoi parametri di studio, la data del colloquio finale, la chiave API AI e il salvataggio dei tuoi dati.
            </p>
          </div>

          <div className="flex items-center space-x-2 p-2 rounded-2xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 shadow-xs shrink-0">
            <Clock className="w-4 h-4 text-indigo-500" />
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Mancano <strong className="text-indigo-600 dark:text-indigo-400 font-extrabold">{daysRemaining}</strong> giorni all'esame
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Settings & Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Profile Form */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2 pb-2">
              <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Dati Personali & Target Accademico</span>
            </h3>

            {/* Avatar Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Avatar Profilo</label>
              <div className="flex flex-wrap gap-2">
                {avatars.map((av) => (
                  <button
                    type="button"
                    key={av}
                    onClick={() => setFormData({ ...formData, avatar: av })}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all ${
                      formData.avatar === av
                        ? 'bg-indigo-600 text-white shadow-md scale-110'
                        : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            {/* Name Input */}
            <div>
              <label htmlFor="user-fullname" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Nome Completo</label>
              <input
                id="user-fullname"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Il tuo nome o nickname"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>

            {/* Bio / Obiettivo */}
            <div>
              <label htmlFor="user-bio" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Bio / Obiettivo Professionale</label>
              <textarea
                id="user-bio"
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Descrivi brevemente i tuoi obiettivi..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
              />
            </div>

            {/* Target Grade & Exam Date Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="user-target-grade" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center space-x-1">
                  <Target className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Obiettivo Voto Esame</span>
                </label>
                <select
                  id="user-target-grade"
                  value={formData.targetGrade}
                  onChange={(e) => setFormData({ ...formData, targetGrade: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                >
                  <option value="Superamento (18-21)">Superamento (18-21)</option>
                  <option value="Buono (22-25)">Buono (22-25)</option>
                  <option value="Distinto (26-28)">Distinto (26-28)</option>
                  <option value="28/30">28/30 (Consigliato)</option>
                  <option value="30 e Lode">30 e Lode</option>
                </select>
              </div>

              <div>
                <label htmlFor="user-exam-date" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-purple-500" />
                  <span>Data Esame Finale</span>
                </label>
                <input
                  id="user-exam-date"
                  type="date"
                  value={formData.examDate}
                  onChange={(e) => setFormData({ ...formData, examDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
            </div>

            {/* Gemini API Key Config */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="user-api-key" className="text-xs font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                  <Key className="w-3.5 h-3.5 text-amber-500" />
                  <span>Chiave API Google Gemini (Personale)</span>
                </label>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline flex items-center space-x-1"
                >
                  <span>Ottieni gratis</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              
              <div className="relative">
                <input
                  id="user-api-key"
                  type={showApiKey ? "text" : "password"}
                  value={formData.apiKey}
                  onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                  placeholder="Incolla qui la tua API Key Gemini..."
                  className="w-full pl-3.5 pr-10 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                La chiave abilita il Tutor IA e le simulazioni orali. Viene salvata localmente nel tuo browser.
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center space-x-2 transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Salva Modifiche Profilo</span>
              </button>

              {savedSuccess && (
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center space-x-1 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Salvato con successo!</span>
                </span>
              )}
            </div>
          </form>

          {/* Lean & Pragmatic Backup/Restore Section */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center space-x-2">
              <Database className="w-4 h-4 text-emerald-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Portabilità & Backup Dati Locale (KISS)
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Esporta tutti i tuoi appunti, errori, statistiche e quiz in un unico file JSON scaricabile, oppure ripristina un backup per sincronizzare un altro dispositivo senza bisogno di cloud.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={handleExportBackup}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center space-x-2 transition-all cursor-pointer border border-slate-200 dark:border-slate-700"
              >
                <Download className="w-3.5 h-3.5 text-indigo-500" />
                <span>Esporta Backup JSON</span>
              </button>

              <label className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center space-x-2 transition-all cursor-pointer border border-slate-200 dark:border-slate-700">
                <Upload className="w-3.5 h-3.5 text-emerald-500" />
                <span>Ripristina da File JSON</span>
                <input
                  type="file"
                  accept=".json,application/json"
                  onChange={handleImportBackup}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Summary & Badges */}
        <div className="space-y-6">
          
          {/* Quick Academic Summary */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center space-x-2 pb-1">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Riepilogo Avanzamento</span>
            </h3>

            <div className="space-y-2.5">
              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-slate-600 dark:text-slate-400">Simulazioni Svolte:</span>
                <strong className="text-slate-900 dark:text-white font-bold text-sm">{stats.totalSimulations}</strong>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-slate-600 dark:text-slate-400">Media Punteggio:</span>
                <strong className="text-indigo-600 dark:text-indigo-400 font-bold text-sm">{stats.averageScore30}/30</strong>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-slate-600 dark:text-slate-400">Flashcard Apprese:</span>
                <strong className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">{knownCards}</strong>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-slate-600 dark:text-slate-400">Target Voto:</span>
                <strong className="text-pink-600 dark:text-pink-400 font-bold text-sm">{formData.targetGrade}</strong>
              </div>
            </div>
          </div>

          {/* Badges / Traguardi Grid */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center space-x-2 pb-1">
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>Obiettivi & Badge</span>
            </h3>

            <div className="space-y-3">
              {badges.map((b) => {
                const Icon = b.icon;
                return (
                  <div
                    key={b.id}
                    className={`p-3 rounded-2xl border flex items-center space-x-3 transition-all ${
                      b.unlocked
                        ? 'bg-indigo-500/10 dark:bg-indigo-950/40 border-indigo-500/30 text-slate-900 dark:text-slate-200'
                        : 'bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 opacity-60'
                    }`}
                  >
                    <div className={`p-2 rounded-xl flex-shrink-0 ${
                      b.unlocked ? 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-400' : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-600'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-xs">{b.title}</h4>
                      <p className="text-[10px] text-slate-600 dark:text-slate-400 leading-tight">{b.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
