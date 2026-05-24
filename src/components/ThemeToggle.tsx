'use client';

import { useTheme } from './ThemeProvider';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={resolvedTheme === 'dark' ? '切换到浅色模式' : '切换到深色模式'}
      className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors overflow-hidden"
    >
      <Sun
        className={`w-5 h-5 transition-all duration-300 ${
          resolvedTheme === 'dark'
            ? 'rotate-0 scale-100 opacity-100'
            : 'rotate-90 scale-0 opacity-0 absolute'
        }`}
      />
      <Moon
        className={`w-5 h-5 transition-all duration-300 ${
          resolvedTheme === 'light'
            ? 'rotate-0 scale-100 opacity-100'
            : '-rotate-90 scale-0 opacity-0 absolute'
        }`}
      />
    </button>
  );
}
