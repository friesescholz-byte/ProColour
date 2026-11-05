import { initialShowcaseProjects } from '../data/initialShowcaseProjects.js';

const STORAGE_KEY = 'procolour_before_after_projects_v5';
const AUTH_KEY = 'procolour_admin_auth';
const AUTH_TOKEN_KEY = 'procolour_auth_token';
const DEVICE_TOKEN_KEY = 'procolour_device_token';

/**
 * Optimizes an uploaded image file (JPG, PNG, WebP) directly in the browser:
 * - Downscales to max 1600px width/height
 * - Encodes as WebP (quality 0.85) matching Scholz & Friese standards
 * - Returns a high-efficiency Base64 Data URL
 */
export async function optimizeImageFileToWebP(file, maxDimension = 1600, quality = 0.85) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      return reject(new Error('Bitte eine gültige Bilddatei (JPG, PNG, WebP) auswählen.'));
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Fehler beim Lesen der Bilddatei.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Bild konnte nicht dekodiert werden.'));
      img.onload = () => {
        try {
          let { width, height } = img;

          // Downscale proportionally if needed
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          
          // Smooth rendering
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);

          // Convert to WebP or fallback to JPEG
          let dataUrl = canvas.toDataURL('image/webp', quality);
          if (!dataUrl.startsWith('data:image/webp')) {
            dataUrl = canvas.toDataURL('image/jpeg', quality);
          }

          resolve({
            dataUrl,
            width,
            height,
            sizeBytes: Math.round(dataUrl.length * (3 / 4)),
            name: file.name
          });
        } catch (err) {
          reject(err);
        }
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Retrieve cached Before/After projects immediately (synchronous)
 */
export function getShowcaseProjects() {
  if (typeof window === 'undefined') return initialShowcaseProjects;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to parse stored projects:', e);
  }
  return initialShowcaseProjects;
}

/**
 * Fetches latest projects from Cloudflare KV and updates local cache
 */
export async function fetchShowcaseProjects() {
  if (typeof window === 'undefined') return initialShowcaseProjects;
  try {
    const res = await fetch('/api/projects');
    if (res.ok) {
      const projects = await res.json();
      if (Array.isArray(projects) && projects.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
        window.dispatchEvent(new CustomEvent('procolour:showcase-updated', { detail: projects }));
        return projects;
      }
    }
  } catch (e) {
    console.warn('Could not fetch projects from Cloudflare KV, using local cache:', e);
  }
  return getShowcaseProjects();
}

/**
 * Save projects to both Cloudflare KV (persisted across all visitors) and localStorage
 */
export async function saveShowcaseProjects(projects) {
  if (typeof window === 'undefined') return;
  
  // 1. Instant local update for optimistic UI
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    window.dispatchEvent(new CustomEvent('procolour:showcase-updated', { detail: projects }));
  } catch (e) {
    console.error('Failed saving to localStorage:', e);
  }

  // 2. Persist to Cloudflare KV via API
  const token = getAuthToken();
  try {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify(projects)
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || 'Fehler beim Speichern in Cloudflare KV.');
    }
  } catch (err) {
    console.error('KV save error:', err);
    throw err;
  }
}

/**
 * Add a new Before/After project (persists to KV)
 */
export async function addShowcaseProject(projectData) {
  const current = getShowcaseProjects();
  const newProject = {
    id: 'pc-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6),
    createdAt: new Date().toISOString(),
    ...projectData
  };
  const updated = [newProject, ...current];
  await saveShowcaseProjects(updated);
  return updated;
}

/**
 * Update an existing project (persists to KV)
 */
export async function updateShowcaseProject(id, updatedFields) {
  const current = getShowcaseProjects();
  const index = current.findIndex(p => p.id === id);
  if (index === -1) return current;

  const updated = [...current];
  updated[index] = {
    ...updated[index],
    ...updatedFields,
    updatedAt: new Date().toISOString()
  };
  await saveShowcaseProjects(updated);
  return updated;
}

/**
 * Delete a project by ID (persists to KV)
 */
export async function deleteShowcaseProject(id) {
  const current = getShowcaseProjects();
  const updated = current.filter(p => p.id !== id);
  await saveShowcaseProjects(updated);
  return updated;
}

/**
 * Reset back to initial default projects in Cloudflare KV
 */
export async function resetShowcaseProjectsToDefault() {
  if (typeof window === 'undefined') return initialShowcaseProjects;
  const token = getAuthToken();
  try {
    await fetch('/api/projects/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      }
    });
  } catch (e) {}

  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialShowcaseProjects));
  window.dispatchEvent(new CustomEvent('procolour:showcase-updated', { detail: initialShowcaseProjects }));
  return initialShowcaseProjects;
}

/**
 * Token and Auth Helpers
 */
export function getAuthToken() {
  if (typeof window === 'undefined') return '';
  return sessionStorage.getItem(AUTH_TOKEN_KEY) || localStorage.getItem(AUTH_TOKEN_KEY) || '';
}

export function getDeviceToken() {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(DEVICE_TOKEN_KEY) || '';
}

export function isAuthenticated() {
  if (typeof window === 'undefined') return false;
  return (
    sessionStorage.getItem(AUTH_KEY) === 'true' ||
    localStorage.getItem(AUTH_KEY) === 'true'
  );
}

/**
 * Step 1: Login with Password + Turnstile (Triggers 2FA or bypasses if trusted)
 */
export async function loginAdmin(password, rememberMe = false, turnstileToken = '') {
  const clean = (password || '').trim();
  if (!clean) return { success: false, error: 'Bitte ein Passwort eingeben.' };

  const deviceToken = getDeviceToken();

  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: clean, turnstileToken, deviceToken })
    });
    const data = await res.json();

    if (res.ok && data?.success) {
      // 2FA required
      if (data.require2FA) {
        return {
          success: true,
          require2FA: true,
          challengeId: data.challengeId,
          email: data.email || 'info@pro-colour.de'
        };
      }

      // Trusted device login
      if (data.token) {
        if (rememberMe) {
          localStorage.setItem(AUTH_KEY, 'true');
          localStorage.setItem(AUTH_TOKEN_KEY, data.token);
        } else {
          sessionStorage.setItem(AUTH_KEY, 'true');
          sessionStorage.setItem(AUTH_TOKEN_KEY, data.token);
        }
      }
      return { success: true };
    }

    if (data?.error) {
      return { success: false, error: data.error };
    }
  } catch (err) {
    console.warn('Server login error:', err);
  }

  // Fallback: SHA-256 for local / offline recovery
  const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(clean));
  const hashHex = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
  if (hashHex === '9e036ab964d8b296f762374e6160b8e5b6706630cb4b784397c418801fb648be') {
    if (rememberMe) {
      localStorage.setItem(AUTH_KEY, 'true');
    } else {
      sessionStorage.setItem(AUTH_KEY, 'true');
    }
    return { success: true };
  }
  return { success: false, error: 'Ungültiges Passwort. Bitte überprüfen.' };
}

/**
 * Step 2: Verify 6-digit 2FA code sent to info@pro-colour.de
 */
export async function verify2FA(challengeId, code, rememberDevice = true) {
  const cleanCode = (code || '').trim();
  if (!cleanCode || cleanCode.length < 6) {
    return { success: false, error: 'Bitte den vollständigen 6-stelligen Sicherheitscode eingeben.' };
  }

  try {
    const res = await fetch('/api/admin/verify-2fa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ challengeId, code: cleanCode, rememberDevice })
    });
    const data = await res.json();

    if (res.ok && data?.success) {
      sessionStorage.setItem(AUTH_KEY, 'true');
      if (data.token) {
        sessionStorage.setItem(AUTH_TOKEN_KEY, data.token);
      }
      if (data.deviceToken) {
        localStorage.setItem(DEVICE_TOKEN_KEY, data.deviceToken);
      }
      if (rememberDevice) {
        localStorage.setItem(AUTH_KEY, 'true');
        if (data.token) localStorage.setItem(AUTH_TOKEN_KEY, data.token);
      }
      return { success: true };
    }

    return { success: false, error: data?.error || 'Ungültiger oder abgelaufener Sicherheitscode.' };
  } catch (err) {
    return { success: false, error: 'Netzwerkfehler bei der Bestätigung des Codes.' };
  }
}

/**
 * Resend a new 2FA code
 */
export async function resend2FA(password) {
  try {
    const res = await fetch('/api/admin/resend-2fa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    const data = await res.json();
    return data;
  } catch (err) {
    return { success: false, error: 'Fehler beim erneuten Senden des Codes.' };
  }
}

export function logoutAdmin() {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(AUTH_KEY);
  sessionStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(AUTH_TOKEN_KEY);
}
