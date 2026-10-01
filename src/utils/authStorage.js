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

/**
 * Pure JS SHA-256 fallback for non-secure HTTP contexts (e.g. mobile LAN IP testing).
 */
function pureJsSha256(ascii) {
  function rightRotate(value, amount) {
    return (value >>> amount) | (value << (32 - amount));
  }

  const words = [];
  const asciiBitLength = ascii.length * 8;

  let hash = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
  ];

  const k = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  ];

  words[asciiBitLength >> 5] |= 0x80 << (24 - (asciiBitLength % 32));
  words[(((asciiBitLength + 64) >> 9) << 4) + 15] = asciiBitLength;

  for (let i = 0; i < ascii.length; i++) {
    words[i >> 2] |= ascii.charCodeAt(i) << ((3 - (i % 4)) * 8);
  }

  for (let j = 0; j < words.length; j += 16) {
    const w = [];
    let a = hash[0], b = hash[1], c = hash[2], d = hash[3];
    let e = hash[4], f = hash[5], g = hash[6], h = hash[7];

    for (let i = 0; i < 64; i++) {
      if (i < 16) {
        w[i] = words[j + i] | 0;
      } else {
        const gamma0 = rightRotate(w[i - 15], 7) ^ rightRotate(w[i - 15], 18) ^ (w[i - 15] >>> 3);
        const gamma1 = rightRotate(w[i - 2], 17) ^ rightRotate(w[i - 2], 19) ^ (w[i - 2] >>> 10);
        w[i] = (w[i - 16] + gamma0 + w[i - 7] + gamma1) | 0;
      }

      const s1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
      const ch = (e & f) ^ (~e & g);
      const temp1 = (h + s1 + ch + k[i] + w[i]) | 0;
      const s0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const temp2 = (s0 + maj) | 0;

      h = g;
      g = f;
      f = e;
      e = (d + temp1) | 0;
      d = c;
      c = b;
      b = a;
      a = (temp1 + temp2) | 0;
    }

    hash[0] = (hash[0] + a) | 0;
    hash[1] = (hash[1] + b) | 0;
    hash[2] = (hash[2] + c) | 0;
    hash[3] = (hash[3] + d) | 0;
    hash[4] = (hash[4] + e) | 0;
    hash[5] = (hash[5] + f) | 0;
    hash[6] = (hash[6] + g) | 0;
    hash[7] = (hash[7] + h) | 0;
  }

  let result = '';
  for (let i = 0; i < 8; i++) {
    for (let j = 3; j >= 0; j--) {
      const b = (hash[i] >> (8 * j)) & 255;
      result += (b < 16 ? '0' : '') + b.toString(16);
    }
  }

  return result;
}

async function hashPassword(plainText) {
  if (!plainText) return "";
  const salted = `${SALT}:${plainText}`;

  // Use Web Crypto API when in secure context (HTTPS / localhost)
  if (typeof crypto !== "undefined" && crypto.subtle && typeof crypto.subtle.digest === "function") {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(salted);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    } catch {
      // Fallback below
    }
  }

  // Pure JavaScript SHA-256 fallback for non-secure HTTP contexts (mobile testing on LAN IP)
  return pureJsSha256(salted);
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


