const CURRENT_YEAR = new Date().getFullYear();
import React, { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import QuizSetup from './components/QuizSetup';
import QuizEngine from './components/QuizEngine';
import QuizResults from './components/QuizResults';
import AITutorChat from './components/AITutorChat';

// Code-split heavy views for faster initial load
const AuthModal = lazy(() => import('./components/AuthModal'));
const AuthScreen = lazy(() => import('./components/AuthScreen'));
const HubStudio = lazy(() => import('./components/HubStudio'));
const Notebook = lazy(() => import('./components/Notebook'));
const LiveCoding = lazy(() => import('./components/LiveCoding'));
const StatisticheView = lazy(() => import('./components/StatisticheView'));
const UserProfile = lazy(() => import('./components/UserProfile'));
const AdminHub = lazy(() => import('./components/AdminHub'));
const StudyPlanner = lazy(() => import('./components/StudyPlanner'));

import { questionsData } from './data/questionsData';
import { 
  getTheme, 
  setTheme, 
  getAggregateStats, 
  saveTestResult, 
  getErrorPool, 
  getCustomQuestions 
} from './utils/storage';
import { getCurrentUser, logoutUser } from './utils/authStorage';
import { cloudSyncUserData, cloudFetchUserData } from './services/cloudStorageService';

function TabLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-24 space-y-3">
      <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
      <span className="text-xs font-medium text-slate-400">Caricamento modulo...</span>
    </div>
  );
}


export default function App() {
  const [themeState, setThemeState] = useState(() => getTheme());
  const [activeTab, setActiveTab] = useState('dashboard'); 
  
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Stats State
  const [stats, setStats] = useState(() => getAggregateStats());
  
  // Active Quiz State (Lifted to App root to allow smooth transition)
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizModeInfo, setQuizModeInfo] = useState(null);
  const [lastResult, setLastResult] = useState(null);

  // External context trigger for AI Tutor (e.g. asking explanation on a missed quiz question)
  const [aiTutorTriggerContext, setAiTutorTriggerContext] = useState(null);

  // Initialize and apply theme to DOM root
  useEffect(() => {
    setTheme(themeState);
    if (themeState === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [themeState]);

  // Sync background cloud data on login / mount
  useEffect(() => {
    if (currentUser) {
      cloudFetchUserData().then((cloudData) => {
        if (cloudData && cloudData.updatedAt) {
          console.log('[DevExam Cloud] Snapshot caricato con successo da Netlify Blobs.');
          setStats(getAggregateStats());
        }
      }).catch(err => {
        console.warn('[DevExam Cloud] Sincronizzazione offline attiva:', err?.message || err);
      });
    }
  }, [currentUser]);

  const toggleTheme = () => {
    const nextTheme = themeState === 'dark' ? 'light' : 'dark';
    setThemeState(nextTheme);
    setTheme(nextTheme);
  };

  const refreshStats = () => {
    setStats(getAggregateStats());
    // In background, sync snapshot on cloud
    if (currentUser) {
      cloudSyncUserData().catch(err => {
        console.warn('[DevExam Cloud] Sync snapshot background fallita:', err);
      });
    }
  };

  // Auth Handlers
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setIsAuthModalOpen(false);
    refreshStats();
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    setActiveTab('dashboard');
  };

  const handleUpdateUser = (updatedUser) => {
    setCurrentUser(updatedUser);
  };

  // Quiz Workflow Handlers
  const handleStartQuiz = (modeInfo) => {
    const allAvailable = [...questionsData, ...getCustomQuestions()];
    let filtered = [];

    if (modeInfo.subject === 'ALL') {
      filtered = allAvailable;
    } else {
      filtered = allAvailable.filter(q => q.subject.toLowerCase() === modeInfo.subject.toLowerCase());
    }

    // If filtering by chapter (from StudyPlanner / Roadmap)
    if (modeInfo.chapter) {
      const byChapter = filtered.filter(q => q.chapter === modeInfo.chapter);
      if (byChapter.length > 0) filtered = byChapter;
    }

    // Shuffle questions
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    const count = Math.min(modeInfo.count || 10, shuffled.length > 0 ? shuffled.length : 10);
    const selected = shuffled.slice(0, count);

    setQuizQuestions(selected.length > 0 ? selected : questionsData.slice(0, 10));
    setQuizModeInfo(modeInfo);
    setActiveTab('quiz-run');
  };

  const handleStartErrorReview = () => {
    const errorPool = getErrorPool();
    if (errorPool.length === 0) {
      alert("Nessun errore salvato nella banca errori! Ottimo lavoro.");
      return;
    }

    // Map errorPool items back to full question objects
    const allAvailable = [...questionsData, ...getCustomQuestions()];
    const errorQuestions = errorPool.map(err => {
      const found = allAvailable.find(q => q.id === err.questionId);
      return found || {
        id: err.questionId,
        subject: err.subject,
        chapter: 'Recupero Errori',
        question: err.question,
        codeSnippet: null,
        options: ['Opzione 1', 'Opzione 2', 'Opzione 3', 'Opzione 4'],
        correctIndex: 0,
        explanation: 'Domanda recuperata dalla banca errori.',
        difficulty: 'Intermedio'
      };
    });

    setQuizQuestions(errorQuestions);
    setQuizModeInfo({
      modeId: 'error-recovery',
      title: 'Recupero Errori',
      subject: 'ALL',
      count: errorQuestions.length,
      timeLimitMinutes: 0
    });
    setActiveTab('quiz-run');
  };

  const handleFinishQuiz = (resultPayload) => {
    saveTestResult(resultPayload);
    setLastResult(resultPayload);
    refreshStats();
    setActiveTab('quiz-results');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-indigo-500 selection:text-white transition-colors duration-200">
      
      {/* Navbar Header */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        theme={themeState} 
        toggleTheme={toggleTheme}
        stats={stats}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Area: Show AuthScreen if not authenticated */}
      <main id="main-content" role="main" tabIndex="-1" className="flex-1 w-full focus:outline-none">
        {!currentUser ? (
          <Suspense fallback={<TabLoader />}>
            <AuthScreen onLoginSuccess={handleLoginSuccess} />
          </Suspense>
        ) : (
          <div className={activeTab === 'tutor-ai' ? 'max-w-7xl w-full mx-auto px-2 sm:px-6 lg:px-8 py-1 sm:py-2 h-[calc(100dvh-7.5rem)] sm:h-[calc(100dvh-5.5rem)] flex flex-col overflow-hidden' : 'max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-4 sm:pb-4'}>
            <Suspense fallback={<TabLoader />}>
            {/* 1. Dashboard / Studio */}
            {activeTab === 'dashboard' && (
              <Dashboard 
                stats={stats}
                onStartQuiz={handleStartQuiz}
                onStartErrorReview={handleStartErrorReview}
                setActiveTab={setActiveTab}
                currentUser={currentUser}
              />
            )}

            {/* 2. Mappe & Schemi */}
            {(activeTab === 'mappe-schemi' || activeTab === 'hub-studio') && (
              <HubStudio />
            )}

            {/* 3. Notebook */}
            {activeTab === 'notebook' && (
              <Notebook />
            )}

            {/* 4. Tutor AI */}
            {activeTab === 'tutor-ai' && (
              <AITutorChat 
                isFullPage={true}
                onGoToProfile={() => setActiveTab('profile')}
              />
            )}

            {/* 5. Statistiche (Progressi, Errori, Storico) */}
            {(activeTab === 'statistiche' || activeTab === 'errors' || activeTab === 'history') && (
              <StatisticheView 
                stats={stats}
                onStartErrorReview={handleStartErrorReview}
                onRefreshStats={refreshStats}
                setActiveTab={setActiveTab}
                initialSubTab={activeTab === 'errors' ? 'errors' : activeTab === 'history' ? 'history' : 'overview'}
              />
            )}

            {/* Secondary / Action Views */}
            {activeTab === 'quiz-select' && (
              <QuizSetup 
                onStartQuiz={handleStartQuiz}
              />
            )}

            {activeTab === 'live-coding' && (
              <LiveCoding onGoToProfile={() => setActiveTab('profile')} />
            )}

            {activeTab === 'quiz-run' && (
              <QuizEngine 
                questions={quizQuestions}
                modeInfo={quizModeInfo}
                onFinishQuiz={handleFinishQuiz}
                onCancelQuiz={() => setActiveTab('dashboard')}
              />
            )}

            {activeTab === 'quiz-results' && lastResult && (
              <QuizResults 
                result={lastResult}
                onRestartQuiz={() => handleStartQuiz(quizModeInfo)}
                onGoHome={() => setActiveTab('dashboard')}
                onStartErrorReview={handleStartErrorReview}
                onAskAITutor={(qContext) => {
                  setAiTutorTriggerContext(qContext);
                  setActiveTab('tutor-ai');
                }}
              />
            )}

            {activeTab === 'planner' && (
              <StudyPlanner 
                onStartQuiz={handleStartQuiz}
              />
            )}

            {activeTab === 'profile' && (
              <UserProfile 
                currentUser={currentUser}
                onUpdateUser={handleUpdateUser}
              />
            )}

            {activeTab === 'admin' && (
              <AdminHub 
                currentUser={currentUser}
              />
            )}
          </Suspense>
        </div>
      )}
      </main>



      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Floating AI Tutor Chatbot FAB (only when authenticated and activeTab !== 'tutor-ai') */}
      {currentUser && activeTab !== 'tutor-ai' && (
        <AITutorChat 
          externalTriggerContext={aiTutorTriggerContext}
          onClearTriggerContext={() => setAiTutorTriggerContext(null)}
          onGoToProfile={() => setActiveTab('profile')}
        />
      )}


      {/* Footer (hidden in full-screen tutor-ai tab) */}
      {activeTab !== 'tutor-ai' && <Footer />}

    </div>
  );
}

function Footer() {
  return (
    <footer className="py-3 sm:py-4 text-center text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-1.5">
        <span>DevExam Simulator & Study Planner &copy; {CURRENT_YEAR}</span>
        <span className="hidden sm:inline">CSS &bull; JavaScript &bull; React &bull; SQL</span>
      </div>
    </footer>
  );
}
