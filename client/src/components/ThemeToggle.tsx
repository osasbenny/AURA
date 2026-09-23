import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="clay-sm relative h-11 w-11 flex items-center justify-center group transition-all duration-300 hover:scale-105 active:scale-95"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <Sun
          className={`absolute w-5 h-5 text-gold-500 transition-all duration-500 ${
            theme === 'light' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
          }`}
        />
        <Moon
          className={`absolute w-5 h-5 text-ocean-400 transition-all duration-500 ${
            theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-0'
          }`}
        />
      </div>
    </button>
  );
}
