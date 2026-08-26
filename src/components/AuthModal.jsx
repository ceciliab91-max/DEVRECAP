import React, { useState } from 'react';
import { 
  X, 
  User, 
  Lock, 
  Mail, 
  Shield, 
  Sparkles, 
  LogIn, 
  UserPlus, 
  GraduationCap, 
  ShieldCheck, 
  AlertCircle,
  Key
} from 'lucide-react';
import { loginUser, registerUser } from '../utils/authStorage';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    apiKey: '',
    role: 'student' // 'student' | 'admin'
  });
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (mode === 'login') {
        const user = loginUser(formData.email, formData.password);
        if (onLoginSuccess) onLoginSuccess(user);
        onClose();
      } else {
        if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
          throw new Error('Compila tutti i campi richiesti.');
        }
        const user = registerUser(formData);
        if (onLoginSuccess) onLoginSuccess(user);
        onClose();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleQuickLogin = (email, password) => {
    setError(null);
    try {
      const user = loginUser(email, password);
      if (onLoginSuccess) onLoginSuccess(user);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 dark:bg-black/70 backdrop-blur-sm animate-fadeIn">
      
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden text-slate-900 dark:text-slate-100">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-indigo-900/80 via-slate-900 to-slate-900 border-b border-slate-800 flex items-center justify-between text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                {mode === 'login' ? 'Accedi a DevExam PRO' : 'Crea Nuovo Account'}
              </h2>
              <p className="text-xs text-slate-300">
                {mode === 'login' ? 'Inserisci le tue credenziali di studio' : 'Registrati come Studente o Docente'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
          <button
            onClick={() => { setMode('login'); setError(null); }}
            className={`flex-1 py-3 text-xs font-bold transition-all border-b-2 ${
              mode === 'login'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-indigo-500/10'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Accedi
          </button>
          <button
            onClick={() => { setMode('register'); setError(null); }}
            className={`flex-1 py-3 text-xs font-bold transition-all border-b-2 ${
              mode === 'register'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-indigo-500/10'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Registrati
          </button>
        </div>

        {/* Quick Demo Login Bar */}
        <div className="p-4 bg-indigo-500/10 border-b border-indigo-500/20 space-y-2">
          <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider block">
            ⚡ Account Test Rapido (1-Click Login):
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickLogin('studente@devexam.it', 'password')}
              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all"
            >
              <GraduationCap className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
              <span>Studente Demo</span>
            </button>

            <button
              onClick={() => handleQuickLogin('admin@devexam.it', 'admin')}
              className="px-3 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 dark:text-purple-200 border border-purple-500/30 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
              <span>Admin Demo</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-300 text-xs flex items-center space-x-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-500 dark:text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {mode === 'register' && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Nome e Cognome</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Es. Cecilia"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-purple-500 text-xs"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Indirizzo Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="nome@devexam.it"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-purple-500 text-xs"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-purple-500 text-xs"
              />
            </div>
          </div>

          {mode === 'register' && (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Gemini API Key Personale (Opzionale)</label>
                <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400">BYOK</span>
              </div>
              <div className="relative">
                <Key className="w-4 h-4 text-amber-500 absolute left-3 top-3" />
                <input
                  type="password"
                  value={formData.apiKey}
                  onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                  placeholder="AIzaSy..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-purple-500 text-xs transition-colors"
                />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                Inserisci la tua chiave per sbloccare il Tutor IA e le correzioni del Live Coding a costo zero.
              </p>
            </div>
          )}

          {mode === 'register' && (
            <div className="space-y-1.5 pt-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Seleziona Ruolo Utente:</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'student' })}
                  className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center space-y-1 transition-all ${
                    formData.role === 'student'
                      ? 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <GraduationCap className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                  <span>Studente</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'admin' })}
                  className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center space-y-1 transition-all ${
                    formData.role === 'admin'
                      ? 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <ShieldCheck className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                  <span>Docente / Admin</span>
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center space-x-2"
          >
            {mode === 'login' ? (
              <>
                <LogIn className="w-4 h-4" />
                <span>Accedi alla Piattaforma</span>
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Crea Account</span>
              </>
            )}
          </button>

        </form>

      </div>

    </div>
  );
}
