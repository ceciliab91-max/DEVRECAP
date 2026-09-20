/**
 * Cloud Storage & Authentication Service for DevExam PRO.
 * Communicates with Netlify Serverless Functions + Netlify Blobs
 * with graceful fallback to LocalStorage when running offline/locally.
 */

const API_ENDPOINTS = {
  AUTH: '/api/auth',
  SYNC: '/api/sync'
};

/**
 * Returns true if running in standalone Vite dev without Netlify Functions proxy.
 */
function isStandaloneViteDev() {
  if (typeof window === 'undefined') return false;
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  // Netlify CLI typically runs on port 8888 or custom port with functions
  const isNetlifyDev = window.location.port === '8888';
  return isLocal && !isNetlifyDev;
}

/**
 * Checks if the remote Netlify Functions API is available.
 */
export async function isCloudAvailable() {
  if (isStandaloneViteDev()) return false;
  try {
    const res = await fetch(API_ENDPOINTS.AUTH, { method: 'OPTIONS' });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Login via Netlify Functions (Netlify Blobs)
 */
export async function cloudLogin(usernameOrEmail, password) {
  if (isStandaloneViteDev()) {
    return null; // Gracefully use local storage in Vite dev mode without throwing network 404
  }

  const res = await fetch(API_ENDPOINTS.AUTH, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'login',
      username: usernameOrEmail,
      password: password
    })
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Credenziali non valide');
  }

  return data.user;
}

/**
 * Register new user via Netlify Functions (Netlify Blobs)
 */
export async function cloudRegister({ username, email, password, name, role = 'student', apiKey = '' }) {
  if (isStandaloneViteDev()) {
    return null;
  }

  const res = await fetch(API_ENDPOINTS.AUTH, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'register',
      username,
      email,
      password,
      name,
      role,
      apiKey
    })
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Errore durante la registrazione');
  }

  return data.user;
}

/**
 * Update user profile in Netlify Blobs
 */
export async function cloudUpdateProfile(userId, updatedFields) {
  if (isStandaloneViteDev()) {
    return null;
  }

  const res = await fetch(API_ENDPOINTS.AUTH, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'update-profile',
      userId,
      updatedFields
    })
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Errore aggiornamento profilo cloud');
  }

  return data.user;
}

/**
 * Sync user application state (stats, history, flashcards, error pool) to Netlify Blobs
 */
export async function cloudSyncUserData(userId, userData) {
  if (isStandaloneViteDev()) {
    return false;
  }

  try {
    const res = await fetch(API_ENDPOINTS.SYNC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        data: userData
      })
    });

    const data = await res.json().catch(() => ({}));
    return data.success === true;
  } catch {
    return false;
  }
}

/**
 * Fetch remote state from Netlify Blobs
 */
export async function cloudFetchUserData(userId) {
  if (isStandaloneViteDev()) {
    return null;
  }

  try {
    const res = await fetch(`${API_ENDPOINTS.SYNC}?userId=${encodeURIComponent(userId)}`);
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success && data.data) {
      return data.data;
    }
    return null;
  } catch {
    return null;
  }
}

