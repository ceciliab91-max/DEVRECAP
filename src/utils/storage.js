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
    const rawData = localStorage.getItem(KEYS.STREAK_DATA);
    let data = rawData ? JSON.parse(rawData) : null;

    const rawLastDate = localStorage.getItem(KEYS.LAST_STUDY_DATE);
    const rawWeekly = localStorage.getItem(KEYS.WEEKLY_ACTIVITY);
    let weeklyActivity = rawWeekly ? JSON.parse(rawWeekly) : [];
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
    console.error("Failed to parse streak data from localStorage", e);
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

  localStorage.setItem(KEYS.STREAK_DATA, JSON.stringify(updatedData));
  localStorage.setItem(KEYS.LAST_STUDY_DATE, todayStr);
  localStorage.setItem(KEYS.WEEKLY_ACTIVITY, JSON.stringify(updatedWeekly));

  return updatedData;
};

// --- TEST HISTORY ---
export const getHistory = () => {
  try {
    const data = localStorage.getItem(KEYS.HISTORY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to parse history from localStorage", e);
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
  localStorage.setItem(KEYS.HISTORY, JSON.stringify(updated));

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
    const data = localStorage.getItem(KEYS.ERRORS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to parse error pool from localStorage", e);
    return [];
  }
};

export const setErrorPool = (errorIds) => {
  localStorage.setItem(KEYS.ERRORS, JSON.stringify(errorIds));
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
    const data = localStorage.getItem(KEYS.BOOKMARKS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to parse bookmarks from localStorage", e);
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
  localStorage.setItem(KEYS.BOOKMARKS, JSON.stringify(updated));
  return updated;
};

// --- ROADMAP CHECKLIST ---
export const getRoadmapCompleted = () => {
  try {
    const data = localStorage.getItem(KEYS.ROADMAP);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    console.error("Failed to parse roadmap from localStorage", e);
    return {};
  }
};

export const toggleRoadmapTopic = (topicId) => {
  const current = getRoadmapCompleted();
  const updated = { ...current, [topicId]: !current[topicId] };
  localStorage.setItem(KEYS.ROADMAP, JSON.stringify(updated));
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
    const data = localStorage.getItem(KEYS.FLASHCARDS);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    console.error("Failed to parse flashcard status from localStorage", e);
    return {};
  }
};

export const setFlashcardStatus = (cardId, status) => {
  const current = getFlashcardStatus();
  const updated = { ...current, [cardId]: status };
  localStorage.setItem(KEYS.FLASHCARDS, JSON.stringify(updated));
  return updated;
};

export const resetFlashcardStatus = () => {
  localStorage.removeItem(KEYS.FLASHCARDS);
  return {};
};

// --- CUSTOM QUESTIONS MANAGEMENT (ADMIN) ---
export const getCustomQuestions = () => {
  try {
    const data = localStorage.getItem(KEYS.CUSTOM_QUESTIONS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to parse custom questions from localStorage", e);
    return [];
  }
};

export const saveCustomQuestions = (questions) => {
  localStorage.setItem(KEYS.CUSTOM_QUESTIONS, JSON.stringify(questions));
};

// --- CUSTOM CHALLENGES MANAGEMENT (ADMIN) ---
export const getCustomChallenges = () => {
  try {
    const data = localStorage.getItem(KEYS.CUSTOM_CHALLENGES);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to parse custom challenges from localStorage", e);
    return [];
  }
};

export const saveCustomChallenges = (challenges) => {
  localStorage.setItem(KEYS.CUSTOM_CHALLENGES, JSON.stringify(challenges));
};

export const clearAllData = () => {
  localStorage.removeItem(KEYS.HISTORY);
  localStorage.removeItem(KEYS.ERRORS);
  localStorage.removeItem(KEYS.BOOKMARKS);
  localStorage.removeItem(KEYS.ROADMAP);
  localStorage.removeItem(KEYS.FLASHCARDS);
  localStorage.removeItem(KEYS.CUSTOM_QUESTIONS);
  localStorage.removeItem(KEYS.CUSTOM_CHALLENGES);
  localStorage.removeItem(KEYS.STREAK_DATA);
  localStorage.removeItem(KEYS.LAST_STUDY_DATE);
  localStorage.removeItem(KEYS.WEEKLY_ACTIVITY);
};

