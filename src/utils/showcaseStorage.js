import { initialShowcaseProjects } from '../data/initialShowcaseProjects.js';

const STORAGE_KEY = 'procolour_before_after_projects';
const AUTH_KEY = 'procolour_admin_auth';
export const ADMIN_DEFAULT_PASSWORD = 'procolour2026!';

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
 * Retrieve all Before/After projects
 */
export function getShowcaseProjects() {
  if (typeof window === 'undefined') return initialShowcaseProjects;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialShowcaseProjects;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (e) {
    console.error('Failed to parse stored projects:', e);
  }
  return initialShowcaseProjects;
}

/**
 * Save projects and notify listeners
 */
export function saveShowcaseProjects(projects) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    window.dispatchEvent(new CustomEvent('procolour:showcase-updated', { detail: projects }));
  } catch (e) {
    console.error('Failed to save projects to localStorage:', e);
    throw new Error('Speicherlimit erreicht oder Browser-Speicher blockiert.');
  }
}

/**
 * Add a new Before/After project
 */
export function addShowcaseProject(projectData) {
  const current = getShowcaseProjects();
  const newProject = {
    id: 'pc-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6),
    createdAt: new Date().toISOString(),
    ...projectData
  };
  const updated = [newProject, ...current];
  saveShowcaseProjects(updated);
  return updated;
}

/**
 * Update an existing project
 */
export function updateShowcaseProject(id, updatedFields) {
  const current = getShowcaseProjects();
  const index = current.findIndex(p => p.id === id);
  if (index === -1) return current;

  const updated = [...current];
  updated[index] = {
    ...updated[index],
    ...updatedFields,
    updatedAt: new Date().toISOString()
  };
  saveShowcaseProjects(updated);
  return updated;
}

/**
 * Delete a project by ID
 */
export function deleteShowcaseProject(id) {
  const current = getShowcaseProjects();
  const updated = current.filter(p => p.id !== id);
  saveShowcaseProjects(updated);
  return updated;
}

/**
 * Reset back to initial default projects
 */
export function resetShowcaseProjectsToDefault() {
  if (typeof window === 'undefined') return initialShowcaseProjects;
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent('procolour:showcase-updated', { detail: initialShowcaseProjects }));
  return initialShowcaseProjects;
}

/**
 * Authentication helpers
 */
export function isAuthenticated() {
  if (typeof window === 'undefined') return false;
  return (
    sessionStorage.getItem(AUTH_KEY) === 'true' ||
    localStorage.getItem(AUTH_KEY) === 'true'
  );
}

export function loginAdmin(password, rememberMe = false) {
  if (password === ADMIN_DEFAULT_PASSWORD) {
    if (rememberMe) {
      localStorage.setItem(AUTH_KEY, 'true');
    } else {
      sessionStorage.setItem(AUTH_KEY, 'true');
    }
    return true;
  }
  return false;
}

export function logoutAdmin() {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(AUTH_KEY);
}
