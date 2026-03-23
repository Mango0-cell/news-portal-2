import { GENRES } from '@/lib/constants';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

interface GenreButtonsProps {
  active: string;
  onChange: (category: string) => void;
}

export function GenreButtons({ active, onChange }: GenreButtonsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
      {GENRES.map((genre) => {
        const isActive = active === genre.value;
        return (
          <button
            key={genre.value}
            onClick={() => onChange(genre.value)}
            aria-label={`Filter by ${genre.label}`}
            aria-pressed={isActive}
            className={cn(
              'flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium',
              'transition-all duration-250 ease-out',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
              'active:scale-95',
              isActive
                ? 'bg-gray-900 text-white shadow-md shadow-gray-900/20 dark:bg-white dark:text-gray-900 dark:shadow-white/10'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200',
            )}
          >
            <Icon name={genre.icon} size="sm" className={cn(
              'text-[16px] transition-colors duration-250',
              isActive ? 'text-current' : 'text-gray-400 dark:text-gray-500',
            )} />
            {genre.label}
          </button>
        );
      })}
    </div>
  );
}
