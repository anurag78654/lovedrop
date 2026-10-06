import { useState, useEffect } from 'react';
import { getInitialTheme, toggleTheme } from '../../lib/theme';

/**
 * Dark/light mode toggle button (persists choice, respects system pref)
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme);

  // Ensure class is applied on first mount (e.g. first visit, system pref)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handleClick = () => setTheme((t) => toggleTheme(t));

  return (
    <button
      onClick={handleClick}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="w-9 h-9 rounded-full flex items-center justify-center text-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
    >
      {theme === 'dark' ? '🌞' : '🌙'}
    </button>
  );
}
