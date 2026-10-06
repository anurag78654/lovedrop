/**
 * Theme (dark/light) helpers - E6
 */

const STORAGE_KEY = 'lovedrop-theme';

/** Initial theme: saved choice, else system preference */
export function getInitialTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) return 'dark';
  } catch {
    // storage blocked - fall through
  }
  return 'light';
}

/** Apply theme to <html> and persist */
export function applyTheme(theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // ignore
  }
  return theme;
}

export function toggleTheme(current) {
  return applyTheme(current === 'dark' ? 'light' : 'dark');
}
