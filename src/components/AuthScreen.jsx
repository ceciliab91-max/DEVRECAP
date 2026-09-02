import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Mail, 
  Sparkles, 
  LogIn, 
  UserPlus, 
  GraduationCap, 
  ShieldCheck, 
  AlertCircle,
  Key,
  Database,
  Cloud,
  Layers,
  Code2,
  Atom,
  CheckCircle2,
  Eye,
  EyeOff
} from 'lucide-react';
import { loginUser, registerUser } from '../utils/authStorage';

export default function AuthScreen({ onLoginSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    name: '',
    password: '',
    apiKey: '',
    role: 'student'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (mode === 'login') {
        const identifier = (formData.username || formData.email).trim();
        if (!identifier || !formData.password) {
          throw new Error('Inserisci nome utente (o email) e password.');
        }
        const user = await loginUser(identifier, formData.password);
        if (onLoginSuccess) onLoginSuccess(user);
      } else {
        if (!formData.username.trim() || !formData.password.trim()) {
          throw new Error('Nome utente e password sono obbligatori.');
        }
        const user = await registerUser(formData);
        if (onLoginSuccess) onLoginSuccess(user);
      }
    } catch (err) {
      setError(err.message || 'Errore durante l\'autenticazione.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async (username, password) => {
    setError(null);
    setIsLoading(true);
    try {
      const user = await loginUser(username, password);
      if (onLoginSuccess) onLoginSuccess(user);
    } catch (err) {
      setError(err.message || 'Errore durante il login rapido.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100dvh-4rem)] flex flex-col justify-center items-center px-4 py-2 sm:py-4 relative overflow-hidden bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/15 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/15 dark:bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-md relative z-10 space-y-2.5 my-auto">
        
        {/* Brand Header */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 dark:from-white dark:via-indigo-200 dark:to-purple-200 bg-clip-text text-transparent">
            DevExam PRO
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
            Simulatore d'esame e studio per sviluppatori web con Cloud Sync.
          </p>
          
          {/* Tech Badges */}
          <div className="flex items-center justify-center gap-1.5 pt-0.5 text-[10px] font-medium text-slate-600 dark:text-slate-400">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 shadow-sm">
              <Layers className="w-3 h-3 text-blue-500" /> CSS
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 shadow-sm">
              <Code2 className="w-3 h-3 text-yellow-500" /> JS
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 shadow-sm">
              <Atom className="w-3 h-3 text-cyan-500" /> React
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 shadow-sm">
              <Database className="w-3 h-3 text-emerald-500" /> SQL
            </span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-800 rounded-2xl shadow-xl shadow-slate-300/50 dark:shadow-none overflow-hidden">
          
          {/* Cloud Storage Status Banner */}
          <div className="px-4 py-1.5 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs">
            <span className="inline-flex items-center gap-1.5 font-medium text-indigo-600 dark:text-indigo-400 text-[11px]">
              <Cloud className="w-3.5 h-3.5" /> Netlify Blobs Cloud Sync
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Storage Attivo
            </span>
          </div>

          {/* Mode Switcher */}
          <div role="tablist" aria-label="Selezione modalità autenticazione" className="grid grid-cols-2 p-1 mx-3 sm:mx-4 my-2 bg-slate-100 dark:bg-slate-950/70 rounded-xl border border-slate-300/80 dark:border-slate-800">
            <button
              type="button"
              role="tab"
              id="tab-login"
              aria-selected={mode === 'login'}
              aria-controls="panel-login"
              onClick={() => { setMode('login'); setError(null); }}
              className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                mode === 'login'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 shadow-sm border border-slate-300 dark:border-slate-700'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              Accedi
            </button>
            <button
              type="button"
              role="tab"
              id="tab-register"
              aria-selected={mode === 'register'}
              aria-controls="panel-register"
              onClick={() => { setMode('register'); setError(null); }}
              className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                mode === 'register'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 shadow-sm border border-slate-300 dark:border-slate-700'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              Registrati
            </button>
          </div>

          {/* Quick Demo Access Bar */}
          <div className="px-3 sm:px-4 pb-1">
            <div className="p-2 sm:p-2.5 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-900/40 space-y-1">
              <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider block">
                ⚡ Accesso Rapido Demo (1-Click):
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleQuickLogin('studente', 'password')}
                  aria-label="Accedi istantaneamente con account Studente Demo"
                  className="px-2 py-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-xs font-semibold flex items-center justify-center space-x-1.5 shadow-sm transition-all disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-500" aria-hidden="true" />
                  <span>Studente Demo</span>
                </button>

                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleQuickLogin('admin', 'admin')}
                  aria-label="Accedi istantaneamente con account Docente Admin Demo"
                  className="px-2 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100/70 dark:bg-purple-500/10 dark:hover:bg-purple-500/20 text-purple-700 dark:text-purple-200 border border-purple-200 dark:border-purple-800 text-xs font-semibold flex items-center justify-center space-x-1.5 shadow-sm transition-all disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-purple-500"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
                  <span>Admin Demo</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Form */}
          <form 
            id={mode === 'login' ? 'panel-login' : 'panel-register'}
            role="tabpanel"
            aria-labelledby={mode === 'login' ? 'tab-login' : 'tab-register'}
            onSubmit={handleSubmit} 
            className="px-3 sm:px-4 pb-3 sm:pb-4 pt-1 space-y-2 sm:space-y-2.5"
          >

            {error && (
              <div 
                role="alert" 
                aria-live="assertive"
                className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center space-x-2 animate-fadeIn"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-500" aria-hidden="true" />
                <span>{error}</span>
              </div>
            )}

            {/* Username field */}
            <div className="space-y-1">
              <label htmlFor="auth-username" className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                Nome Utente {mode === 'login' && <span className="text-slate-600 dark:text-slate-300 font-normal">(o Email)</span>}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" aria-hidden="true" />
                <input
                  id="auth-username"
                  type="text"
                  required
                  aria-required="true"
                  autoComplete="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder={mode === 'login' ? 'Es. studente oppure nome@devexam.it' : 'Scegli un nome utente'}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 border border-slate-300 hover:border-slate-400 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs shadow-sm"
                />
              </div>
            </div>

            {/* Register specific fields */}
            {mode === 'register' && (
              <>
                <div className="space-y-1">
                  <label htmlFor="auth-name" className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">Nome Visualizzato (Opzionale)</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" aria-hidden="true" />
                    <input
                      id="auth-name"
                      type="text"
                      autoComplete="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Es. Mario Rossi"
                      className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 border border-slate-300 hover:border-slate-400 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs shadow-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="auth-email" className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">Email (Opzionale)</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" aria-hidden="true" />
                    <input
                      id="auth-email"
                      type="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="utente@devexam.it"
                      className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 border border-slate-300 hover:border-slate-400 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs shadow-sm"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Password field */}
            <div className="space-y-1">
              <label htmlFor="auth-password" className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" aria-hidden="true" />
                <input
                  id="auth-password"
                  type={showPassword ? "text" : "password"}
                  required
                  aria-required="true"
                  autoComplete={mode === 'login' ? "current-password" : "new-password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2 rounded-xl bg-white dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 border border-slate-300 hover:border-slate-400 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  aria-label={showPassword ? "Nascondi password" : "Mostra password in chiaro"}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 absolute right-3 top-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" aria-hidden="true" /> : <Eye className="w-4 h-4" aria-hidden="true" />}
                </button>
              </div>
            </div>

            {/* Role Selection on Register */}
            {mode === 'register' && (
              <div className="space-y-1 pt-1" role="group" aria-label="Selezione Ruolo Account">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">Ruolo:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    aria-pressed={formData.role === 'student'}
                    onClick={() => setFormData({ ...formData, role: 'student' })}
                    className={`p-2 rounded-xl border text-xs font-semibold flex items-center justify-center space-x-2 transition-all ${
                      formData.role === 'student'
                        ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300 border-indigo-500 ring-1 ring-indigo-500 shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4 text-indigo-500" aria-hidden="true" />
                    <span>Studente</span>
                  </button>

                  <button
                    type="button"
                    aria-pressed={formData.role === 'admin'}
                    onClick={() => setFormData({ ...formData, role: 'admin' })}
                    className={`p-2 rounded-xl border text-xs font-semibold flex items-center justify-center space-x-2 transition-all ${
                      formData.role === 'admin'
                        ? 'bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-300 border-purple-500 ring-1 ring-purple-500 shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-500" aria-hidden="true" />
                    <span>Docente / Admin</span>
                  </button>
                </div>
              </div>
            )}

            {/* Optional API Key on Register */}
            {mode === 'register' && (
              <div className="space-y-1 pt-1">
                <div className="flex items-center justify-between">
                  <label htmlFor="auth-apikey" className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">Gemini API Key (Opzionale)</label>
                  <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400">BYOK</span>
                </div>
                <div className="relative">
                  <Key className="w-4 h-4 text-amber-500 absolute left-3.5 top-2.5 pointer-events-none" aria-hidden="true" />
                  <input
                    id="auth-apikey"
                    type="password"
                    autoComplete="off"
                    value={formData.apiKey}
                    onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                    placeholder="AIzaSy..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 border border-slate-300 hover:border-slate-400 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs font-mono shadow-sm"
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 mt-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              {isLoading ? (
                <span>Accesso in corso...</span>
              ) : mode === 'login' ? (
                <>
                  <LogIn className="w-4 h-4" aria-hidden="true" />
                  <span>Entra nel Simulatore</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" aria-hidden="true" />
                  <span>Crea Profilo e Inizia</span>
                </>
              )}
            </button>

          </form>

        </div>

        {/* Footer info with high contrast (>= 4.5:1 ratio) */}
        <p className="text-center text-xs text-slate-700 dark:text-slate-300 font-medium">
          I tuoi dati sono sincronizzati via Netlify Blobs &bull; DevExam PRO
        </p>

      </div>

    </div>
  );
}
