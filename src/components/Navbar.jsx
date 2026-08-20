import React from 'react';
import { 
  LayoutDashboard, 
  BrainCircuit, 
  BookOpen, 
  Bot, 
  BarChart3, 
  Sun, 
  Moon,
  Award,
  Sparkles,
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
  const mainNavItems = [
    { id: 'dashboard', label: 'Dashboard / Studio', icon: LayoutDashboard },
    { id: 'mappe-schemi', label: 'Mappe & Schemi', icon: BrainCircuit },
    { id: 'notebook', label: 'Notebook', icon: BookOpen },
    { id: 'tutor-ai', label: 'Tutor AI', icon: Bot },
    { id: 'statistiche', label: 'Statistiche', icon: BarChart3, badge: stats?.errorsCount || 0 }
  ];

  if (currentUser && currentUser.role === 'admin') {
    mainNavItems.push({ id: 'admin', label: 'Admin', icon: ShieldCheck });
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors duration-200">
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
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  DevExam
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20">
                  PRO
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Simulator & Study Planner</p>
            </div>
          </div>

          {/* Main Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id || 
                (item.id === 'dashboard' && (activeTab === 'quiz-select' || activeTab === 'quiz-run' || activeTab === 'quiz-results')) ||
                (item.id === 'statistiche' && (activeTab === 'errors' || activeTab === 'history'));

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 relative ${
                    isActive
                      ? 'bg-indigo-600/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 font-bold shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : ''}`} />
                  <span>{item.label}</span>
                  {item.badge > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-red-500/20 text-red-500 dark:text-red-400 border border-red-500/30">
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
            <div className="hidden xl:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
              <Award className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              <span className="text-slate-600 dark:text-slate-300 font-medium">
                Media: <strong className="text-slate-900 dark:text-white">{stats?.averageScore30 > 0 ? `${stats.averageScore30}/30` : 'N/A'}</strong>
              </span>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-amber-300 border border-slate-200 dark:border-slate-700 transition-all duration-200"
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
                      ? 'bg-indigo-600/20 text-indigo-600 dark:text-indigo-300 border-indigo-500'
                      : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                  title="Apri il tuo Profilo"
                >
                  <span className="text-sm">{currentUser.avatar || '👨‍💻'}</span>
                  <span className="hidden sm:inline font-bold">{currentUser.name.split(' ')[0]}</span>
                  <span className={`px-1.5 py-0.2 rounded text-[9px] font-extrabold uppercase ${
                    currentUser.role === 'admin' ? 'bg-purple-500/20 text-purple-600 dark:text-purple-300' : 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-300'
                  }`}>
                    {currentUser.role === 'admin' ? 'Admin' : 'Student'}
                  </span>
                </button>

                {/* Logout Button */}
                <button
                  onClick={onLogout}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-500 hover:text-red-500 dark:hover:text-red-400 border border-slate-200 dark:border-slate-700 transition-colors"
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

      {/* Mobile Bottom Navigation Bar (5 Main Navigation Items) */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-200 dark:border-slate-800/80 px-2 py-2 bg-white/95 dark:bg-slate-900/95 overflow-x-auto sticky bottom-0 z-40">
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id ||
            (item.id === 'dashboard' && (activeTab === 'quiz-select' || activeTab === 'quiz-run' || activeTab === 'quiz-results')) ||
            (item.id === 'statistiche' && (activeTab === 'errors' || activeTab === 'history'));

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-medium transition-colors relative flex-shrink-0 ${
                isActive 
                  ? 'text-indigo-600 dark:text-indigo-400 font-bold' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span>{item.label}</span>
              {item.badge > 0 && (
                <span className="absolute top-0 right-1 w-2 h-2 rounded-full bg-red-500" />
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
}
