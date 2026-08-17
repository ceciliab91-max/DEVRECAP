import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import QuizSetup from './components/QuizSetup';
import QuizEngine from './components/QuizEngine';
import QuizResults from './components/QuizResults';
import StudyPlanner from './components/StudyPlanner';
import ErrorPool from './components/ErrorPool';
import HistoryView from './components/HistoryView';
import LiveCoding from './components/LiveCoding';
import HubStudio from './components/HubStudio';
import AITutorChat from './components/AITutorChat';
import UserProfile from './components/UserProfile';
import AdminHub from './components/AdminHub';
import AuthModal from './components/AuthModal';

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

export default function App() {
  const [themeState, setThemeState] = useState(() => getTheme());
  const [activeTab, setActiveTab] = useState('dashboard'); 
  // 'dashboard', 'hub-studio', 'quiz-select', 'quiz-run', 'quiz-results', 'live-coding', 'planner', 'errors', 'history', 'profile', 'admin'
  
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizModeInfo, setQuizModeInfo] = useState({ mode: 'full', subject: null, timerMinutes: 30 });
  const [lastResult, setLastResult] = useState(null);
  const [aiTutorTriggerContext, setAiTutorTriggerContext] = useState(null);

  const [stats, setStats] = useState(() => getAggregateStats());

  // Apply theme class to document element
  useEffect(() => {
    if (themeState === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
    setTheme(themeState);
  }, [themeState]);

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const refreshStats = () => {
    setStats(getAggregateStats());
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setStats(getAggregateStats());
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    if (activeTab === 'profile' || activeTab === 'admin') {
      setActiveTab('dashboard');
    }
  };

  const handleUpdateUser = (updatedUser) => {
    setCurrentUser(updatedUser);
  };

  // Launch a new quiz session (merges base questions with custom admin questions)
  const handleStartQuiz = ({ mode, subject, timerMinutes = 30 }) => {
    const custom = getCustomQuestions();
    let pool = [...questionsData, ...custom];

    if (mode === 'subject' && subject) {
      pool = pool.filter(q => q.subject === subject);
    } else if (mode === 'full') {
      // Pick 30 random questions mixed from all subjects
      pool = pool.sort(() => Math.random() - 0.5).slice(0, 30);
    }

    setQuizQuestions(pool);
    setQuizModeInfo({ mode, subject: subject || null, timerMinutes });
    setActiveTab('quiz-run');
  };

  // Launch error pool review quiz
  const handleStartErrorReview = () => {
    const errorIds = getErrorPool();
    const custom = getCustomQuestions();
    const all = [...questionsData, ...custom];
    const pool = all.filter(q => errorIds.includes(q.id));
    if (pool.length === 0) return;

    setQuizQuestions(pool);
    setQuizModeInfo({ mode: 'error', subject: null, timerMinutes: 0 });
    setActiveTab('quiz-run');
  };

  // When user completes a quiz
  const handleFinishQuiz = (resultData) => {
    const savedEntry = saveTestResult(resultData);
    setLastResult(savedEntry);
    refreshStats();
    setActiveTab('quiz-results');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 dark:bg-slate-950 light:bg-slate-50 text-slate-100 dark:text-slate-100 light:text-slate-900 transition-colors duration-200">
      
      {/* Top Sticky Header */}
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

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {activeTab === 'dashboard' && (
          <Dashboard 
            stats={stats}
            onStartQuiz={handleStartQuiz}
            onStartErrorReview={handleStartErrorReview}
            setActiveTab={setActiveTab}
            currentUser={currentUser}
          />
        )}

        {activeTab === 'hub-studio' && (
          <HubStudio />
        )}

        {activeTab === 'quiz-select' && (
          <QuizSetup 
            onStartQuiz={handleStartQuiz}
          />
        )}

        {activeTab === 'live-coding' && (
          <LiveCoding />
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
            onAskAITutor={(qContext) => setAiTutorTriggerContext(qContext)}
          />
        )}

        {activeTab === 'planner' && (
          <StudyPlanner 
            onStartQuiz={handleStartQuiz}
          />
        )}

        {activeTab === 'errors' && (
          <ErrorPool 
            onStartErrorReview={handleStartErrorReview}
          />
        )}

        {activeTab === 'history' && (
          <HistoryView 
            onRefreshStats={refreshStats}
          />
        )}

        {activeTab === 'profile' && currentUser && (
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

      </main>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Floating AI Tutor Chatbot */}
      <AITutorChat 
        externalTriggerContext={aiTutorTriggerContext}
        onClearTriggerContext={() => setAiTutorTriggerContext(null)}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 py-6 text-center text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>DevExam Simulator & Study Planner &copy; {new Date().getFullYear()}</span>
        <span>CSS &bull; JavaScript &bull; React &bull; SQL</span>
      </div>
    </footer>
  );
}
