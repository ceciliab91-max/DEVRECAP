import { getCompressedItem, setCompressedItem, removeCompressedItem } from './compressedStorage';

const KEYS = {
  THEME: 'theme',
  THEME_ALT: 'devexam_theme',
  HISTORY: 'devexam_history',
  ERRORS: 'devexam_errors',
  BOOKMARKS: 'devexam_bookmarks',
  ROADMAP: 'devexam_roadmap',
  FLASHCARDS: 'devexam_flashcards',
  CUSTOM_QUESTIONS: 'devexam_custom_questions',
  CUSTOM_CHALLENGES: 'devexam_custom_challenges',
  STREAK_DATA: 'devexam_streak_data',
  LAST_STUDY_DATE: 'lastStudyDate',
  WEEKLY_ACTIVITY: 'weeklyActivity'
};

// Helper: Get currently authenticated user ID to isolate data
export const getCurrentUserId = () => {
  try {
    const raw = localStorage.getItem('devexam_current_user');
    if (raw) {
      const u = JSON.parse(raw);
      if (u && u.id) return u.id;
    }
  } catch (e) {
    console.error("Failed to read current user", e);
  }
  return 'guest';
};

// Helper: Return user-isolated key
const getScopedKey = (baseKey) => {
  if (baseKey === KEYS.THEME || baseKey === KEYS.THEME_ALT || baseKey === KEYS.CUSTOM_QUESTIONS || baseKey === KEYS.CUSTOM_CHALLENGES) {
    return baseKey;
  }
  const userId = getCurrentUserId();
  return `${baseKey}_${userId}`;
};

// --- THEME ---
export const getTheme = () => {
  return localStorage.getItem(KEYS.THEME) || localStorage.getItem(KEYS.THEME_ALT) || 'dark';
};

export const setTheme = (theme) => {
  localStorage.setItem(KEYS.THEME, theme);
  localStorage.setItem(KEYS.THEME_ALT, theme);
};

// --- DAILY STREAK & WEEKLY ACTIVITY ---
export const getWeekDays = () => {
  const now = new Date();
  const currentDay = now.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
  const distToMon = currentDay === 0 ? 6 : currentDay - 1;
  const monday = new Date(now);
  monday.setDate(now.getDate() - distToMon);

  const dayNames = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
  const todayStr = now.toISOString().split('T')[0];

  return dayNames.map((name, index) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + index);
    const dateStr = d.toISOString().split('T')[0];
    return {
      name,
      dateStr,
      isToday: dateStr === todayStr,
      isPast: dateStr < todayStr
    };
  });
};

export const getStreakData = () => {
  try {
    const data = getCompressedItem(getScopedKey(KEYS.STREAK_DATA), null);
    const rawLastDate = localStorage.getItem(getScopedKey(KEYS.LAST_STUDY_DATE));
    let weeklyActivity = getCompressedItem(getScopedKey(KEYS.WEEKLY_ACTIVITY), []);
    if (!Array.isArray(weeklyActivity)) weeklyActivity = [];

    const todayStr = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    let streakCount = data?.streakCount || 0;
    let lastStudyDate = data?.lastStudyDate || rawLastDate || null;

    // Check if streak was broken (lastStudyDate was before yesterday and not today)
    if (lastStudyDate && lastStudyDate !== todayStr && lastStudyDate !== yesterdayStr) {
      streakCount = 0;
    }

    return {
      streakCount,
      lastStudyDate,
      weeklyActivity: data?.weeklyActivity || weeklyActivity
    };
  } catch (e) {
    console.error("Failed to parse streak data from storage", e);
    return { streakCount: 0, lastStudyDate: null, weeklyActivity: [] };
  }
};

export const recordStudyActivity = () => {
  const current = getStreakData();
  const todayStr = new Date().toISOString().split('T')[0];

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  let newStreak = current.streakCount;
  const lastDate = current.lastStudyDate;

  if (lastDate === todayStr) {
    // Already recorded today, keep streak
    if (newStreak === 0) newStreak = 1;
  } else if (lastDate === yesterdayStr) {
    // Consecutive day study!
    newStreak += 1;
  } else {
    // Missed a day or first session
    newStreak = 1;
  }

  const updatedWeekly = Array.from(new Set([...current.weeklyActivity, todayStr]));

  const updatedData = {
    streakCount: newStreak,
    lastStudyDate: todayStr,
    weeklyActivity: updatedWeekly
  };

  setCompressedItem(getScopedKey(KEYS.STREAK_DATA), updatedData);
  localStorage.setItem(getScopedKey(KEYS.LAST_STUDY_DATE), todayStr);
  setCompressedItem(getScopedKey(KEYS.WEEKLY_ACTIVITY), updatedWeekly);

  return updatedData;
};

// Helper to generate minimal test seeds for demo accounts in 4 lines
const generateSeedHistory = (scores) => {
  return scores.map((score, i) => ({
    id: Date.now() - (scores.length - i) * 86400000,
    date: new Date(Date.now() - (scores.length - i) * 86400000).toISOString(),
    score30: score,
    percentage: Math.round((score / 30) * 100),
    correctCount: score,
    totalQuestions: 30,
    modeInfo: { mode: 'full', timerMinutes: 30 }
  }));
};

// --- TEST HISTORY ---
export const getHistory = () => {
  try {
    const key = getScopedKey(KEYS.HISTORY);
    const data = getCompressedItem(key, null);
    if (data && Array.isArray(data)) return data;

    // Initial mock presets for specific test usernames
    const userRaw = localStorage.getItem('devexam_current_user');
    if (userRaw) {
      const uname = JSON.parse(userRaw)?.username?.toLowerCase();
      const seeds = uname === 'gae' ? [26, 27, 28] : uname === 'mario' ? [28, 29, 30, 29, 30] : null;
      if (seeds) {
        const history = generateSeedHistory(seeds);
        setCompressedItem(key, history);
        return history;
      }
    }

    return [];
  } catch (e) {
    console.error("Failed to parse history from storage", e);
    return [];
  }
};

export const saveTestResult = (result) => {
  const history = getHistory();
  const newEntry = {
    id: Date.now(),
    date: new Date().toISOString(),
    ...result
  };
  const updated = [newEntry, ...history];
  setCompressedItem(getScopedKey(KEYS.HISTORY), updated);

  // Automatically record daily streak on test completion
  recordStudyActivity();

  // Also update Error Pool automatically
  if (result.questions && Array.isArray(result.questions)) {
    const currentErrors = new Set(getErrorPool());
    result.questions.forEach(q => {
      if (!q.isCorrect) {
        currentErrors.add(q.questionId);
      } else {
        // If they got it right in a test, remove it from error pool
        currentErrors.delete(q.questionId);
      }
    });
    setErrorPool(Array.from(currentErrors));
  }

  return newEntry;
};

// --- ERROR POOL ---
export const getErrorPool = () => {
  try {
    return getCompressedItem(getScopedKey(KEYS.ERRORS), []);
  } catch (e) {
    console.error("Failed to parse error pool from storage", e);
    return [];
  }
};

export const setErrorPool = (errorIds) => {
  setCompressedItem(getScopedKey(KEYS.ERRORS), errorIds);
};

export const toggleErrorQuestion = (questionId) => {
  const errors = new Set(getErrorPool());
  if (errors.has(questionId)) {
    errors.delete(questionId);
  } else {
    errors.add(questionId);
  }
  const updated = Array.from(errors);
  setErrorPool(updated);
  return updated;
};

// --- BOOKMARKS ---
export const getBookmarks = () => {
  try {
    return getCompressedItem(getScopedKey(KEYS.BOOKMARKS), []);
  } catch (e) {
    console.error("Failed to parse bookmarks from storage", e);
    return [];
  }
};

export const toggleBookmark = (questionId) => {
  const bookmarks = new Set(getBookmarks());
  if (bookmarks.has(questionId)) {
    bookmarks.delete(questionId);
  } else {
    bookmarks.add(questionId);
  }
  const updated = Array.from(bookmarks);
  setCompressedItem(getScopedKey(KEYS.BOOKMARKS), updated);
  return updated;
};

// --- ROADMAP CHECKLIST ---
export const getRoadmapCompleted = () => {
  try {
    return getCompressedItem(getScopedKey(KEYS.ROADMAP), {});
  } catch (e) {
    console.error("Failed to parse roadmap from storage", e);
    return {};
  }
};

export const toggleRoadmapTopic = (topicId) => {
  const current = getRoadmapCompleted();
  const updated = { ...current, [topicId]: !current[topicId] };
  setCompressedItem(getScopedKey(KEYS.ROADMAP), updated);
  return updated;
};

// --- CALCULATE AGGREGATE STATS ---
export const getAggregateStats = () => {
  const history = getHistory();
  const errorPool = getErrorPool();

  const totalSimulations = history.length;

  if (totalSimulations === 0) {
    return {
      totalSimulations: 0,
      averageScore30: 0,
      averagePercentage: 0,
      subjectAccuracy: {
        CSS: { correct: 0, total: 0, percent: 0 },
        JavaScript: { correct: 0, total: 0, percent: 0 },
        React: { correct: 0, total: 0, percent: 0 },
        SQL: { correct: 0, total: 0, percent: 0 }
      },
      errorsCount: errorPool.length
    };
  }

  let totalScore30Sum = 0;
  let totalPercentSum = 0;

  const subjectTracker = {
    CSS: { correct: 0, total: 0 },
    JavaScript: { correct: 0, total: 0 },
    React: { correct: 0, total: 0 },
    SQL: { correct: 0, total: 0 }
  };

  history.forEach(item => {
    totalScore30Sum += (item.score30 || 0);
    totalPercentSum += (item.percentage || 0);

    if (item.questions && Array.isArray(item.questions)) {
      item.questions.forEach(q => {
        if (subjectTracker[q.subject]) {
          subjectTracker[q.subject].total += 1;
          if (q.isCorrect) {
            subjectTracker[q.subject].correct += 1;
          }
        }
      });
    }
  });

  const averageScore30 = (totalScore30Sum / totalSimulations).toFixed(1);
  const averagePercentage = Math.round(totalPercentSum / totalSimulations);

  const subjectAccuracy = {};
  Object.keys(subjectTracker).forEach(sub => {
    const { correct, total } = subjectTracker[sub];
    subjectAccuracy[sub] = {
      correct,
      total,
      percent: total > 0 ? Math.round((correct / total) * 100) : 0
    };
  });

  return {
    totalSimulations,
    averageScore30: parseFloat(averageScore30),
    averagePercentage,
    subjectAccuracy,
    errorsCount: errorPool.length
  };
};

// --- FLASHCARDS STATUS ---
export const getFlashcardStatus = () => {
  try {
    return getCompressedItem(getScopedKey(KEYS.FLASHCARDS), {});
  } catch (e) {
    console.error("Failed to parse flashcard status from storage", e);
    return {};
  }
};

export const setFlashcardStatus = (cardId, status) => {
  const current = getFlashcardStatus();
  const updated = { ...current, [cardId]: status };
  setCompressedItem(getScopedKey(KEYS.FLASHCARDS), updated);
  return updated;
};

export const resetFlashcardStatus = () => {
  removeCompressedItem(getScopedKey(KEYS.FLASHCARDS));
  return {};
};

// --- CUSTOM QUESTIONS MANAGEMENT (ADMIN) ---
export const getCustomQuestions = () => {
  try {
    return getCompressedItem(KEYS.CUSTOM_QUESTIONS, []);
  } catch (e) {
    console.error("Failed to parse custom questions from storage", e);
    return [];
  }
};

export const saveCustomQuestions = (questions) => {
  setCompressedItem(KEYS.CUSTOM_QUESTIONS, questions);
};

// --- CUSTOM CHALLENGES MANAGEMENT (ADMIN) ---
export const getCustomChallenges = () => {
  try {
    return getCompressedItem(KEYS.CUSTOM_CHALLENGES, []);
  } catch (e) {
    console.error("Failed to parse custom challenges from storage", e);
    return [];
  }
};

export const saveCustomChallenges = (challenges) => {
  setCompressedItem(KEYS.CUSTOM_CHALLENGES, challenges);
};

export const clearAllData = () => {
  removeCompressedItem(getScopedKey(KEYS.HISTORY));
  removeCompressedItem(getScopedKey(KEYS.ERRORS));
  removeCompressedItem(getScopedKey(KEYS.BOOKMARKS));
  removeCompressedItem(getScopedKey(KEYS.ROADMAP));
  removeCompressedItem(getScopedKey(KEYS.FLASHCARDS));
  removeCompressedItem(getScopedKey(KEYS.STREAK_DATA));
  removeCompressedItem(getScopedKey(KEYS.LAST_STUDY_DATE));
  removeCompressedItem(getScopedKey(KEYS.WEEKLY_ACTIVITY));
};


