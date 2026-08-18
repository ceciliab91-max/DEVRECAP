const KEYS = {
  USERS: 'devexam_users',
  CURRENT_USER: 'devexam_current_user'
};

const DEFAULT_USERS = [
  {
    id: 'user-student-demo',
    email: 'studente@devexam.it',
    password: 'password',
    name: 'Cecilia',
    role: 'student', // 'student' | 'admin'
    avatar: '👩‍💻',
    bio: 'Sviluppatrice Web Junior in preparazione per l\'esame finale.',
    targetGrade: '28/30',
    examDate: '2026-09-30',
    apiKey: '',
    createdAt: new Date().toISOString()
  },
  {
    id: 'user-admin-demo',
    email: 'admin@devexam.it',
    password: 'admin',
    name: 'Prof. Loris',
    role: 'admin',
    avatar: '👨‍🏫',
    bio: 'Docente ed Esaminatore per lo Sviluppo Web (CSS, JS, React, SQL).',
    targetGrade: '30L',
    examDate: '2026-10-15',
    apiKey: '',
    createdAt: new Date().toISOString()
  }
];

// Initialize users list if empty
export const getUsers = () => {
  try {
    const data = localStorage.getItem(KEYS.USERS);
    if (!data) {
      localStorage.setItem(KEYS.USERS, JSON.stringify(DEFAULT_USERS));
      return DEFAULT_USERS;
    }
    let users = JSON.parse(data);
    let modified = false;
    users = users.map(u => {
      if (u.id === 'user-student-demo' && (u.name === 'Mario Rossi' || !u.name)) {
        modified = true;
        return { ...u, name: 'Cecilia', avatar: '👩‍💻', bio: 'Sviluppatrice Web Junior in preparazione per l\'esame finale.' };
      }
      if (u.id === 'user-admin-demo' && (u.name === 'Prof. Alessandro' || !u.name)) {
        modified = true;
        return { ...u, name: 'Prof. Loris' };
      }
      return u;
    });
    if (modified) {
      localStorage.setItem(KEYS.USERS, JSON.stringify(users));
    }
    return users;
  } catch (e) {
    console.error("Failed to parse users from localStorage", e);
    return DEFAULT_USERS;
  }
};

export const saveUsers = (users) => {
  localStorage.setItem(KEYS.USERS, JSON.stringify(users));
};

// Get current active session
export const getCurrentUser = () => {
  try {
    const data = localStorage.getItem(KEYS.CURRENT_USER);
    if (data) {
      let current = JSON.parse(data);
      if (current.id === 'user-student-demo' && current.name === 'Mario Rossi') {
        current.name = 'Cecilia';
        current.avatar = '👩‍💻';
        current.bio = 'Sviluppatrice Web Junior in preparazione per l\'esame finale.';
        localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(current));
      }
      if (current.id === 'user-admin-demo' && current.name === 'Prof. Alessandro') {
        current.name = 'Prof. Loris';
        localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(current));
      }
      return current;
    }
  } catch (e) {
    console.error("Failed to parse current user from localStorage", e);
  }

  // Default to student demo if no session exists yet
  const users = getUsers();
  const defaultUser = users[0] || DEFAULT_USERS[0];
  localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(defaultUser));
  return defaultUser;
};

export const setCurrentUser = (user) => {
  if (user) {
    localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(KEYS.CURRENT_USER);
  }
};

// Login action
export const loginUser = (email, password) => {
  const users = getUsers();
  const found = users.find(
    u => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
  );

  if (!found) {
    throw new Error('Credenziali non valide. Verifica email e password.');
  }

  setCurrentUser(found);
  return found;
};

// Register action
export const registerUser = ({ name, email, password, role = 'student', apiKey = '' }) => {
  const users = getUsers();
  const existing = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());

  if (existing) {
    throw new Error('Indirizzo Email già registrato nel sistema.');
  }

  const newUser = {
    id: `user-${Date.now()}`,
    name: name.trim() || 'Studente DevExam',
    email: email.trim().toLowerCase(),
    password: password,
    role: role,
    avatar: role === 'admin' ? '👨‍🏫' : '👨‍💻',
    bio: role === 'admin' ? 'Docente & Amministratore della piattaforma.' : 'Studente in preparazione per l\'esame.',
    targetGrade: '28/30',
    examDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // +30 days default
    apiKey: apiKey ? apiKey.trim() : '',
    createdAt: new Date().toISOString()
  };

  const updatedUsers = [...users, newUser];
  saveUsers(updatedUsers);
  setCurrentUser(newUser);
  return newUser;
};

// Update profile action
export const updateUserProfile = (userId, updatedFields) => {
  const users = getUsers();
  const userIdx = users.findIndex(u => u.id === userId);

  if (userIdx === -1) {
    throw new Error('Utente non trovato.');
  }

  const updatedUser = { ...users[userIdx], ...updatedFields };
  users[userIdx] = updatedUser;
  saveUsers(users);

  // Update current session if matching
  const current = getCurrentUser();
  if (current && current.id === userId) {
    setCurrentUser(updatedUser);
  }

  return updatedUser;
};

// Logout action
export const logoutUser = () => {
  localStorage.removeItem(KEYS.CURRENT_USER);
};
