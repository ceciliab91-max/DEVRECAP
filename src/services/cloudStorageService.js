/**
 * Cloud Storage & Authentication Service for DevExam PRO.
 * Communicates with Netlify Serverless Functions + Netlify Blobs
 * with graceful fallback to LocalStorage when running offline/locally or on LAN.
 */

const API_ENDPOINTS = {
  AUTH: '/api/auth',
  SYNC: '/api/sync'
};

/**
 * Returns true if running in standalone Vite dev without Netlify Functions proxy
 * (supports localhost, 127.0.0.1, 0.0.0.0, .local, and local LAN IP ranges e.g. 192.168.x.x for mobile testing).
 */
function isStandaloneViteDev() {
  if (typeof window === 'undefined') return false;
  const hostname = window.location.hostname;
  const port = window.location.port;

  const isLocalHostOrIp = 
    hostname === 'localhost' || 
    hostname === '127.0.0.1' || 
    hostname === '0.0.0.0' ||
    hostname.endsWith('.local') ||
    /^192\.168\.\d+\.\d+$/.test(hostname) ||
    /^10\.\d+\.\d+\.\d+$/.test(hostname) ||
    /^172\.(1[6-9]|2\d|3[01])\.\d+\.\d+$/.test(hostname);

  const isNetlifyDev = port === '8888';
  return isLocalHostOrIp && !isNetlifyDev;
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

  try {
    const res = await fetch(API_ENDPOINTS.AUTH, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'login',
        username: usernameOrEmail,
        password: password
      })
    });

    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return null;
    }

    const data = await res.json().catch(() => null);
    if (!data) return null;

    if (!res.ok || !data.success) {
      if (res.status === 400 || res.status === 401) {
        throw new Error(data.message || 'Credenziali non valide');
      }
      return null;
    }

    return data.user;
  } catch (err) {
    if (err.message && err.message.includes('Credenziali non valide')) {
      throw err;
    }
    return null;
  }
}

/**
 * Register new user via Netlify Functions (Netlify Blobs)
 */
export async function cloudRegister({ username, email, password, name, role = 'student', apiKey = '' }) {
  if (isStandaloneViteDev()) {
    return null;
  }

  try {
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

    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return null;
    }

    const data = await res.json().catch(() => null);
    if (!data) return null;

    if (!res.ok || !data.success) {
      if (res.status === 400 && data.message) {
        throw new Error(data.message);
      }
      return null;
    }

    return data.user;
  } catch (err) {
    if (err.message && (err.message.includes('già registrato') || err.message.includes('già in uso') || err.message.includes('obbligatori'))) {
      throw err;
    }
    return null;
  }
}

/**
 * Update user profile in Netlify Blobs
 */
export async function cloudUpdateProfile(userId, updatedFields) {
  if (isStandaloneViteDev()) {
    return null;
  }

  try {
    const res = await fetch(API_ENDPOINTS.AUTH, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'update-profile',
        userId,
        updatedFields
      })
    });

    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return null;
    }

    const data = await res.json().catch(() => null);
    if (!data || !res.ok || !data.success) {
      return null;
    }

    return data.user;
  } catch {
    return null;
  }
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


