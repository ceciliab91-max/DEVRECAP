import { cloudLogin, cloudRegister, cloudUpdateProfile } from '../services/cloudStorageService';

const KEYS = {
  USERS: 'devexam_users',
  CURRENT_USER: 'devexam_current_user'
};

export const DEFAULT_USERS = [
  {
    id: 'user-student-demo',
    username: 'studente',
    email: 'studente@devexam.it',
    passwordHash: 'b23711a454a1a527e16632020f8c635491fb9f9bf39224881df223f01e2ff0a0',
    name: 'Cecilia',
    role: 'student', // 'student' | 'admin'
    avatar: '👩‍💻',
    bio: 'Sviluppatrice Web Junior in preparazione per l\'esame finale.',
    targetGrade: '28/30',
    examDate: '2026-09-30',
    apiKey: '',
    createdAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'user-admin-demo',
    username: 'admin',
    email: 'admin@devexam.it',
    passwordHash: '1daafa46864f5a434c489d0c7ec46f747529457350a96819cbe11fd0b5bc705b',
    name: 'Prof. Loris',
    role: 'admin',
    avatar: '👨‍🏫',
    bio: 'Docente ed Esaminatore per lo Sviluppo Web (CSS, JS, React, SQL).',
    targetGrade: '30L',
    examDate: '2026-10-15',
    apiKey: '',
    createdAt: '2026-01-01T00:00:00.000Z'
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
      if (u.id === 'user-student-demo' && (!u.username || u.name === 'Mario Rossi')) {
        modified = true;
        return { ...u, username: 'studente', name: 'Cecilia', avatar: '👩‍💻', bio: 'Sviluppatrice Web Junior in preparazione per l\'esame finale.' };
      }
      if (u.id === 'user-admin-demo' && (!u.username || u.name === 'Prof. Alessandro')) {
        modified = true;
        return { ...u, username: 'admin', name: 'Prof. Loris' };
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

// Get current active session (returns null if user has not logged in)
export const getCurrentUser = () => {
  try {
    const data = localStorage.getItem(KEYS.CURRENT_USER);
    if (data) {
      const current = JSON.parse(data);
      return current;
    }
  } catch (e) {
    console.error("Failed to parse current user from localStorage", e);
  }

  // Do NOT auto-login as default demo user anymore
  return null;
};

export const setCurrentUser = (user) => {
  if (user) {
    localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(KEYS.CURRENT_USER);
  }
};

const SALT = "devexam_security_salt_2026";

async function hashPassword(plainText) {
  if (!plainText) return "";
  const encoder = new TextEncoder();
  const data = encoder.encode(`${SALT}:${plainText}`);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// Login action (supports both Cloud Netlify Blobs and Local Fallback)
export const loginUser = async (usernameOrEmail, password) => {
  const cleanIdentifier = usernameOrEmail.trim().toLowerCase();

  // Try Cloud Netlify Functions first
  try {
    const cloudUser = await cloudLogin(cleanIdentifier, password);
    if (cloudUser) {
      setCurrentUser(cloudUser);
      return cloudUser;
    }
  } catch (cloudErr) {
    // If it's a specific credential error from backend, rethrow it
    if (cloudErr.message && cloudErr.message.includes('Credenziali non valide')) {
      throw cloudErr;
    }
    // Otherwise fallback to local storage
  }

  // Local Storage Fallback with secure hashing
  const users = getUsers();
  const inputHash = await hashPassword(password);

  const found = users.find(u => {
    const isMatch = (u.username?.toLowerCase() === cleanIdentifier || u.email?.toLowerCase() === cleanIdentifier);
    if (!isMatch) return false;
    return u.passwordHash === inputHash || u.password === password;
  });

  if (!found) {
    throw new Error('Credenziali non valide. Verifica nome utente e password.');
  }

  const { password: _, passwordHash: __, ...safeUser } = found;
  setCurrentUser(safeUser);
  return safeUser;
};

// Register action (supports both Cloud Netlify Blobs and Local Fallback)
export const registerUser = async ({ username, email, password, name, role = 'student', apiKey = '' }) => {
  const cleanUsername = (username || (email ? email.split('@')[0] : '')).trim().toLowerCase();
  const cleanEmail = (email || `${cleanUsername}@devexam.local`).trim().toLowerCase();

  // Try Cloud Netlify Functions first
  try {
    const cloudUser = await cloudRegister({
      username: cleanUsername,
      email: cleanEmail,
      password,
      name,
      role,
      apiKey
    });
    if (cloudUser) {
      setCurrentUser(cloudUser);
      return cloudUser;
    }
  } catch (cloudErr) {
    if (cloudErr.message && (cloudErr.message.includes('già registrato') || cloudErr.message.includes('già in uso'))) {
      throw cloudErr;
    }
    // Fallback to local
  }

  // Local Storage Fallback
  const users = getUsers();
  const existing = users.find(
    u => (u.username && u.username.toLowerCase() === cleanUsername) || 
         (u.email && u.email.toLowerCase() === cleanEmail)
  );

  if (existing) {
    throw new Error('Nome utente o Email già in uso nel sistema.');
  }

  const hashed = await hashPassword(password);

  const newUser = {
    id: `user-${Date.now()}`,
    username: cleanUsername,
    name: name?.trim() || cleanUsername,
    email: cleanEmail,
    passwordHash: hashed,
    role: role,
    avatar: role === 'admin' ? '👨‍🏫' : '👨‍💻',
    bio: role === 'admin' ? 'Docente & Amministratore della piattaforma.' : 'Studente in preparazione per l\'esame.',
    targetGrade: '28/30',
    examDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    apiKey: apiKey ? apiKey.trim() : '',
    createdAt: new Date().toISOString()
  };

  const updatedUsers = [...users, newUser];
  saveUsers(updatedUsers);

  const { passwordHash: _, ...safeUser } = newUser;
  setCurrentUser(safeUser);
  return safeUser;
};

// Update profile action
export const updateUserProfile = async (userId, updatedFields) => {
  // Try cloud update
  try {
    const cloudUpdated = await cloudUpdateProfile(userId, updatedFields);
    if (cloudUpdated) {
      setCurrentUser(cloudUpdated);
      return cloudUpdated;
    }
  } catch {
    // Fallback to local
  }

  const users = getUsers();
  const userIdx = users.findIndex(u => u.id === userId);

  if (userIdx === -1) {
    throw new Error('Utente non trovato.');
  }

  const updatedUser = { ...users[userIdx], ...updatedFields };
  if (updatedFields.password) {
    updatedUser.passwordHash = await hashPassword(updatedFields.password);
    delete updatedUser.password;
  }
  users[userIdx] = updatedUser;
  saveUsers(users);

  // Update current session if matching
  const current = getCurrentUser();
  if (current && current.id === userId) {
    const { password: _, passwordHash: __, ...safeUser } = updatedUser;
    setCurrentUser(safeUser);
    return safeUser;
  }

  const { password: _, passwordHash: __, ...safeUser } = updatedUser;
  return safeUser;
};

// Logout action
export const logoutUser = () => {
  localStorage.removeItem(KEYS.CURRENT_USER);
};


