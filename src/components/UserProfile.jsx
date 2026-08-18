import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Calendar, 
  Target, 
  Award, 
  Save, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  BookOpen, 
  Layers, 
  AlertTriangle,
  RotateCcw,
  Zap,
  Key,
  Eye,
  EyeOff,
  ExternalLink
} from 'lucide-react';
import { updateUserProfile } from '../utils/authStorage';
import { getAggregateStats, getFlashcardStatus } from '../utils/storage';

export default function UserProfile({ currentUser, onUpdateUser }) {
  const [formData, setFormData] = useState({
    name: currentUser.name || '',
    bio: currentUser.bio || '',
    avatar: currentUser.avatar || '👨‍💻',
    examDate: currentUser.examDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    targetGrade: currentUser.targetGrade || '28/30',
    apiKey: currentUser.apiKey || ''
  });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const updated = updateUserProfile(currentUser.id, formData);
      if (onUpdateUser) onUpdateUser(updated);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  const avatarOptions = ['👨‍💻', '👩‍💻', '👨‍🏫', '🎓', '⚡', '🚀', '🧠', '💻'];

  // Achievement Badges calculation
  const badges = [
    {
      id: 'b1',
      title: 'Primo Passo 🏆',
      desc: 'Hai completato la tua prima simulazione d\'esame.',
      unlocked: stats.totalSimulations > 0,
      icon: Award
    },
    {
      id: 'b2',
      title: 'Active Recall 📚',
      desc: 'Hai contrassegnato almeno 5 flashcard come apprese.',
      unlocked: knownCards >= 5,
      icon: Layers
    },
    {
      id: 'b3',
      title: 'Studioso Costante ⏱️',
      desc: 'Hai completato almeno 3 simulazioni d\'esame.',
      unlocked: stats.totalSimulations >= 3,
      icon: Clock
    },
    {
      id: 'b4',
      title: 'Voto Eccellente 🌟',
      desc: 'Hai raggiunto la media globale di 27/30 o superiore.',
      unlocked: stats.averageScore30 >= 27,
      icon: Sparkles
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16 animate-fadeIn">
      
      {/* Profile Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-slate-800 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
          
          {/* Avatar Display */}
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-1 shadow-xl flex-shrink-0">
            <div className="w-full h-full rounded-[22px] bg-slate-900 flex items-center justify-center text-4xl">
              {formData.avatar}
            </div>
          </div>

          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {currentUser.name}
              </h1>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase tracking-wider border ${
                currentUser.role === 'admin' 
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' 
                  : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
              }`}>
                {currentUser.role === 'admin' ? 'Docente / Admin' : 'Studente'}
              </span>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm font-medium">
              {currentUser.email}
            </p>

            <p className="text-slate-300 text-xs max-w-lg leading-relaxed pt-1">
              "{formData.bio}"
            </p>
          </div>

          {/* Exam Countdown Widget Box */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-indigo-500/30 text-center min-w-[180px] space-y-1 shadow-lg">
            <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider block flex items-center justify-center space-x-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Countdown Esame</span>
            </span>
            <div className="text-3xl font-black bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
              {daysRemaining} Giorni
            </div>
            <span className="text-[10px] text-slate-400 block">
              Data: {formData.examDate}
            </span>
          </div>

        </div>
      </div>

      {/* Main Grid: Form + Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Form Edit */}
        <div className="md:col-span-2 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center space-x-2 border-b border-slate-800 pb-4">
              <User className="w-5 h-5 text-indigo-400" />
              <span>Personalizza il tuo Profilo</span>
            </h2>

            {savedSuccess && (
              <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center space-x-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Profilo aggiornato con successo!</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Name */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Nome Completo</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Bio */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Biografia / Note Personali</label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Es. Sviluppatore Web Junior in preparazione per l'esame finale."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              {/* Avatar Selector */}
              <div className="space-y-2 pt-1">
                <label className="font-semibold text-slate-300 block">Scegli Avatar:</label>
                <div className="flex flex-wrap gap-2">
                  {avatarOptions.map((av) => (
                    <button
                      key={av}
                      type="button"
                      onClick={() => setFormData({ ...formData, avatar: av })}
                      className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center border transition-all ${
                        formData.avatar === av
                          ? 'bg-indigo-600/30 border-indigo-500 scale-110'
                          : 'bg-slate-950 border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              {/* Exam Date & Target Grade Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300 flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Data Obiettivo Esame</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.examDate}
                    onChange={(e) => setFormData({ ...formData, examDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300 flex items-center space-x-1">
                    <Target className="w-3.5 h-3.5 text-pink-400" />
                    <span>Target Voto Finale</span>
                  </label>
                  <select
                    value={formData.targetGrade}
                    onChange={(e) => setFormData({ ...formData, targetGrade: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  >
                    <option value="18/30">18 / 30 (Sufficiente)</option>
                    <option value="24/30">24 / 30 (Buono)</option>
                    <option value="28/30">28 / 30 (Ottimo)</option>
                    <option value="30/30">30 / 30 (Eccellente)</option>
                    <option value="30L">30 e Lode (Massimo)</option>
                  </select>
                </div>

              </div>

              {/* Card Configurazione AI & API Key */}
              <div className="pt-6 border-t border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Key className="w-4 h-4 text-amber-400" />
                    <h3 className="font-bold text-white text-sm">Configurazione AI & API Key</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                    BYOK Model
                  </span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Inserisci la tua API Key personale Google Gemini per sbloccare il Tutor IA e le valutazioni del Live Coding a costo zero.
                </p>

                <div className="space-y-2">
                  <label className="font-semibold text-slate-300 block">Gemini API Key Personale</label>
                  <div className="relative flex items-center">
                    <input
                      type={showApiKey ? "text" : "password"}
                      value={formData.apiKey}
                      onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                      placeholder="Inserisci la tua chiave API (es. AIzaSy...)"
                      className="w-full pl-4 pr-12 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500 transition-colors font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute right-3 p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
                      title={showApiKey ? "Nascondi chiave" : "Mostra chiave"}
                    >
                      {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-4 transition-colors"
                  >
                    <span>Ottieni una chiave gratuita su Google AI Studio</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="pt-4 flex items-center space-x-3">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-600 hover:from-indigo-500 hover:to-amber-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center space-x-2 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Salva Chiave & Profilo</span>
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* Right Column: Stats & Badges */}
        <div className="space-y-6">
          
          {/* Quick Stats Summary */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl text-xs">
            <h3 className="font-bold text-white text-sm flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Statistiche di Studio</span>
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="text-slate-400">Simulazioni Svolte:</span>
                <strong className="text-white font-bold text-sm">{stats.totalSimulations}</strong>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="text-slate-400">Media Punteggio:</span>
                <strong className="text-indigo-400 font-bold text-sm">{stats.averageScore30}/30</strong>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="text-slate-400">Flashcard Apprese:</span>
                <strong className="text-emerald-400 font-bold text-sm">{knownCards}</strong>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="text-slate-400">Target Voto:</span>
                <strong className="text-pink-400 font-bold text-sm">{formData.targetGrade}</strong>
              </div>
            </div>
          </div>

          {/* Badges / Traguardi Grid */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl text-xs">
            <h3 className="font-bold text-white text-sm flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Sparkles className="w-4 h-4 text-purple-400" />
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
                        ? 'bg-indigo-950/40 border-indigo-500/40 text-slate-200'
                        : 'bg-slate-950/40 border-slate-800 text-slate-500 opacity-60'
                    }`}
                  >
                    <div className={`p-2 rounded-xl flex-shrink-0 ${
                      b.unlocked ? 'bg-indigo-600/30 text-indigo-400' : 'bg-slate-800 text-slate-600'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-xs">{b.title}</h4>
                      <p className="text-[10px] text-slate-400 leading-tight">{b.desc}</p>
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
