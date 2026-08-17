import React from 'react';
import { 
  BrainCircuit, 
  LayoutDashboard, 
  BookOpen, 
  AlertTriangle, 
  History, 
  Sun, 
  Moon,
  Award,
  Sparkles,
  Code2,
  Layers,
  User,
  ShieldCheck,
  LogIn,
  LogOut
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  theme, 
  toggleTheme, 
  stats, 
  currentUser, 
  onOpenAuthModal, 
  onLogout 
}) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'quiz-select', label: 'Simula Esame', icon: BrainCircuit },
    { id: 'hub-studio', label: 'Hub Studio', icon: Layers },
    { id: 'live-coding', label: 'Sfida Pratica (CSS)', icon: Code2 },
    { id: 'planner', label: 'Piano di Studio', icon: BookOpen },
    { id: 'errors', label: 'Banca Errori', icon: AlertTriangle, badge: stats.errorsCount },
    { id: 'history', label: 'Storico Test', icon: History }
  ];

  // Add Admin Panel item if user is admin
  if (currentUser && currentUser.role === 'admin') {
    navItems.push({ id: 'admin', label: 'Pannello Admin', icon: ShieldCheck });
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/90 dark:bg-slate-900/90 light:bg-white/90 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center space-x-3 cursor-pointer group flex-shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  DevExam
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  PRO
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Simulator & Study Planner</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 relative ${
                    isActive
                      ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 dark:hover:text-slate-200 light:hover:text-slate-700 hover:bg-slate-800/50 light:hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-400' : ''}`} />
                  <span>{item.label}</span>
                  {item.badge > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Quick Stats Pill */}
            <div className="hidden xl:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-800/80 dark:bg-slate-800/80 light:bg-slate-100 border border-slate-700 dark:border-slate-700 light:border-slate-200 text-xs">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="text-slate-300 dark:text-slate-300 light:text-slate-700 font-medium">
                Media: <strong className="text-white dark:text-white light:text-slate-900">{stats.averageScore30 > 0 ? `${stats.averageScore30}/30` : 'N/A'}</strong>
              </span>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-800/80 dark:bg-slate-800/80 light:bg-slate-100 text-slate-300 hover:text-white border border-slate-700 transition-all duration-200"
              title={theme === 'dark' ? 'Passa alla Modalità Chiara' : 'Passa alla Modalità Scura'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </button>

            {/* User Session Pill / Auth Controls */}
            {currentUser ? (
              <div className="flex items-center space-x-2">
                
                {/* Profile Link Button */}
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                    activeTab === 'profile'
                      ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500'
                      : 'bg-slate-800/80 text-slate-200 border-slate-700 hover:bg-slate-700'
                  }`}
                  title="Apri il tuo Profilo"
                >
                  <span className="text-sm">{currentUser.avatar || '👨‍💻'}</span>
                  <span className="hidden sm:inline font-bold">{currentUser.name.split(' ')[0]}</span>
                  <span className={`px-1.5 py-0.2 rounded text-[9px] font-extrabold uppercase ${
                    currentUser.role === 'admin' ? 'bg-purple-500/20 text-purple-300' : 'bg-indigo-500/20 text-indigo-300'
                  }`}>
                    {currentUser.role === 'admin' ? 'Admin' : 'Student'}
                  </span>
                </button>

                {/* Logout Button */}
                <button
                  onClick={onLogout}
                  className="p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-red-400 hover:bg-slate-800 border border-slate-700 transition-colors"
                  title="Disconnetti Account"
                >
                  <LogOut className="w-4 h-4" />
                </button>

              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all"
              >
                <LogIn className="w-4 h-4" />
                <span>Accedi / Registrati</span>
              </button>
            )}

          </div>

        </div>
      </div>

      {/* Mobile Navigation Bar */}
      <div className="lg:hidden flex items-center justify-around border-t border-slate-800/80 px-2 py-2 bg-slate-900/95 overflow-x-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-medium transition-colors relative flex-shrink-0 ${
                isActive ? 'text-indigo-400 font-semibold' : 'text-slate-400'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
