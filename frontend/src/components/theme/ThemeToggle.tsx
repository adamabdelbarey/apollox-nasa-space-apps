import React from 'react';
import { useTheme } from '../../theme/ThemeContext';
import { SunIcon, MoonIcon } from '../icons/Icons';
import { soundEffects } from '../../audio/soundEffects';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  showLabel = false,
}) => {
  const { theme, toggleTheme, isDark } = useTheme();

  const handleToggle = () => {
    soundEffects.playClick();
    toggleTheme();
  };

  return (
    <button
      onClick={handleToggle}
      className={`btn-bouncy p-2.5 rounded-2xl border transition-all cursor-pointer shadow-lg flex items-center space-x-2 ${
        isDark
          ? 'bg-slate-900/90 border-slate-800 text-slate-200 hover:text-white hover:border-cyan-500/60'
          : 'bg-white/90 border-slate-300 text-slate-700 hover:text-slate-950 hover:border-sky-500'
      } ${className}`}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDark ? (
        <SunIcon className="w-4 h-4 text-cyan-400" />
      ) : (
        <MoonIcon className="w-4 h-4 text-sky-600" />
      )}
      {showLabel && (
        <span className="text-xs font-black uppercase tracking-wider">
          {isDark ? 'Light' : 'Dark'}
        </span>
      )}
    </button>
  );
};
