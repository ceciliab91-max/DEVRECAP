import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Bookmark, 
  BookmarkCheck, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Grid, 
  Send,
  Code
} from 'lucide-react';
import { toggleBookmark, getBookmarks } from '../utils/storage';

export default function QuizEngine({ questions, modeInfo, onFinishQuiz }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [questionId]: selectedOptionIndex }
  const [flagged, setFlagged] = useState({}); // { [questionId]: boolean }

  const initialTimerSecs = modeInfo.timerMinutes && modeInfo.timerMinutes > 0 
    ? modeInfo.timerMinutes * 60 
    : (modeInfo.mode === 'full' ? 30 * 60 : 0);

  const [timeLeft, setTimeLeft] = useState(initialTimerSecs); // 0 means no limit
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const [showDrawer, setShowDrawer] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const currentQ = questions[currentIndex];
  const totalQ = questions.length;

  // Load existing bookmarks
  useEffect(() => {
    const saved = new Set(getBookmarks());
    const initialFlags = {};
    questions.forEach(q => {
      if (saved.has(q.id)) {
        initialFlags[q.id] = true;
      }
    });
    setFlagged(initialFlags);
  }, [questions]);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);

      if (initialTimerSecs > 0) {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleFinalSubmit();
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [initialTimerSecs]);

  // Keyboard shortcut listener (1-4 or A-D, Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showSubmitModal) return;

      if (e.key >= '1' && e.key <= '4') {
        const optionIdx = parseInt(e.key) - 1;
        if (currentQ && currentQ.options[optionIdx] !== undefined) {
          handleSelectOption(optionIdx);
        }
      } else if (e.key === 'ArrowRight' && currentIndex < totalQ - 1) {
        setCurrentIndex(prev => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, currentQ, showSubmitModal, totalQ]);

  const handleSelectOption = (optionIndex) => {
    if (!currentQ) return;
    setUserAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionIndex
    }));
  };

  const handleToggleFlag = () => {
    if (!currentQ) return;
    const isFlagged = !flagged[currentQ.id];
    setFlagged(prev => ({ ...prev, [currentQ.id]: isFlagged }));
    toggleBookmark(currentQ.id);
  };

  const handleFinalSubmit = () => {
    const totalTimeSpent = initialTimerSecs > 0 ? (initialTimerSecs - timeLeft) : elapsedSeconds;

    let correctCount = 0;
    const questionsBreakdown = questions.map(q => {
      const userChoice = userAnswers[q.id];
      const isCorrect = userChoice === q.correctIndex;
      if (isCorrect) correctCount += 1;

      return {
        questionId: q.id,
        subject: q.subject,
        chapter: q.chapter,
        question: q.question,
        codeSnippet: q.codeSnippet,
        options: q.options,
        correctIndex: q.correctIndex,
        explanation: q.explanation,
        userChoice: userChoice !== undefined ? userChoice : null,
        isCorrect
      };
    });

    const score30 = parseFloat(((correctCount / totalQ) * 30).toFixed(1));
    const percentage = Math.round((correctCount / totalQ) * 100);

    onFinishQuiz({
      mode: modeInfo.mode,
      subjectFilter: modeInfo.subject || null,
      score: correctCount,
      totalQuestions: totalQ,
      score30,
      percentage,
      timeSpentSeconds: totalTimeSpent > 0 ? totalTimeSpent : 0,
      questions: questionsBreakdown
    });
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(userAnswers).length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQ) * 100);

  const getSubjectBadge = (sub) => {
    switch (sub) {
      case 'CSS': return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
      case 'JavaScript': return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      case 'React': return 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20';
      case 'SQL': return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
      default: return 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20';
    }
  };

  if (!currentQ) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      
      {/* Top Header Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          {/* Question Index & Subject Badge */}
          <div className="flex items-center space-x-3">
            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${getSubjectBadge(currentQ.subject)}`}>
              {currentQ.subject}
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {currentQ.chapter}
            </span>
          </div>

          {/* Right Controls: Timer & Drawer Toggle */}
          <div className="flex items-center space-x-3">
            
            {/* Live Countdown Timer */}
            <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all ${
              initialTimerSecs > 0 && timeLeft < 300 
                ? 'bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400 animate-pulse' 
                : 'bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border-slate-200 dark:border-slate-700'
            }`}>
              <Clock className="w-4 h-4" />
              <span>{initialTimerSecs > 0 ? formatTime(timeLeft) : `Senza Limite (${formatTime(elapsedSeconds)})`}</span>
            </div>

            {/* Bookmark / Flag Question */}
            <button
              onClick={handleToggleFlag}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                flagged[currentQ.id]
                  ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/40 font-bold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
              title="Contrassegna per rivedere dopo"
            >
              {flagged[currentQ.id] ? <BookmarkCheck className="w-4 h-4 text-amber-500" /> : <Bookmark className="w-4 h-4" />}
              <span className="hidden sm:inline">{flagged[currentQ.id] ? 'Contrassegnata' : 'Rivedi dopo'}</span>
            </button>

            {/* Grid Drawer Toggle */}
            <button
              onClick={() => setShowDrawer(!showDrawer)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="Vedi griglia domande"
            >
              <Grid className="w-4 h-4" />
            </button>

          </div>

        </div>

        {/* Progress Bar & Counter */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span>Domanda {currentIndex + 1} di {totalQ}</span>
            <span>Risposte completate: {answeredCount} / {totalQ}</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-200 dark:border-slate-700">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

      </div>

      {/* Expandable Question Grid Drawer */}
      {showDrawer && (
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3 animate-fadeIn">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>Seleziona una domanda per saltarvi direttamente:</span>
            <span>Verde = Risposta, Giallo = Rivedere</span>
          </div>
          <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 gap-2">
            {questions.map((q, idx) => {
              const isAnswered = userAnswers[q.id] !== undefined;
              const isFlagged = flagged[q.id];
              const isCurrent = idx === currentIndex;

              let btnClass = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700';
              if (isAnswered) btnClass = 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-500/40 font-bold';
              if (isFlagged) btnClass = 'bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-500/40 font-bold';
              if (isCurrent) btnClass += ' ring-2 ring-indigo-500 border-indigo-500';

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setShowDrawer(false);
                  }}
                  className={`h-9 rounded-lg text-xs font-semibold border flex items-center justify-center transition-all ${btnClass}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Question & Options Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        
        {/* Question Text */}
        <div className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
            {currentQ.question}
          </h2>
        </div>

        {/* Code Snippet Box (If available) */}
        {currentQ.codeSnippet && (
          <div className="relative rounded-2xl bg-slate-950 p-4 sm:p-5 border border-slate-800 font-mono text-xs sm:text-sm text-indigo-300 overflow-x-auto shadow-inner">
            <div className="flex justify-between items-center pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-500">
              <span className="flex items-center space-x-1">
                <Code className="w-3.5 h-3.5 text-indigo-400" />
                <span>Codice di Esempio</span>
              </span>
              <span>{currentQ.subject}</span>
            </div>
            <pre className="leading-relaxed">
              <code>{currentQ.codeSnippet}</code>
            </pre>
          </div>
        )}

        {/* Options List */}
        <div className="space-y-3 pt-2">
          {currentQ.options.map((option, idx) => {
            const isSelected = userAnswers[currentQ.id] === idx;
            const keyLetters = ['A', 'B', 'C', 'D'];

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between group ${
                  isSelected
                    ? 'bg-indigo-500/15 dark:bg-indigo-600/20 border-indigo-500 text-indigo-900 dark:text-indigo-200 font-semibold shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <span className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200'
                  }`}>
                    {keyLetters[idx]}
                  </span>
                  <span className="text-sm leading-snug">{option}</span>
                </div>

                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-600 text-white'
                    : 'border-slate-400 dark:border-slate-600 bg-transparent'
                }`}>
                  {isSelected && <CheckCircle2 className="w-4 h-4 fill-current" />}
                </div>
              </button>
            );
          })}
        </div>

      </div>

      {/* Bottom Navigation Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex(prev => prev - 1)}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
            currentIndex === 0
              ? 'bg-slate-100 dark:bg-slate-800/40 text-slate-400 dark:text-slate-600 border-slate-200 dark:border-slate-800 cursor-not-allowed'
              : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Precedente</span>
        </button>

        <div className="flex items-center space-x-3">
          {currentIndex < totalQ - 1 ? (
            <button
              onClick={() => setCurrentIndex(prev => prev + 1)}
              className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all"
            >
              <span>Successiva</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setShowSubmitModal(true)}
              className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/25 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Concludi Simulazione</span>
            </button>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 dark:bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
              <Send className="w-6 h-6" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Confermi l'invio dell'esame?</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Hai risposto a <strong className="text-indigo-600 dark:text-indigo-400">{answeredCount}</strong> domande su <strong className="text-slate-900 dark:text-white">{totalQ}</strong> complessive.
                {answeredCount < totalQ && (
                  <span className="block mt-1 text-amber-600 dark:text-amber-400 font-semibold">
                    Attenzione: ci sono ancora {totalQ - answeredCount} domande non risposte!
                  </span>
                )}
              </p>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all"
              >
                Torna al Test
              </button>
              <button
                onClick={handleFinalSubmit}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all"
              >
                Invia e Calcola Voto
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
