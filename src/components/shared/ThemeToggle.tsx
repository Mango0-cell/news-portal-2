'use client';

import { Icon } from '../ui/Icon';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

export function ThemeToggle() {
  const { isDark, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={cn(
        'flex items-center justify-center w-10 h-10 rounded-full',
        'transition-all duration-300',
        'bg-gray-100 hover:bg-gray-200 hover:scale-110',
        'dark:bg-gray-800 dark:hover:bg-gray-700',
        'active:scale-95',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
      )}
    >
      <Icon
        name={isDark ? 'light_mode' : 'dark_mode'}
        className={cn(
          'transition-all duration-300',
          isDark ? 'text-amber-400' : 'text-gray-600',
        )}
      />
    </button>
  );
}
