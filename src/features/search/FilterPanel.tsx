import { useEffect } from 'react';
import { GENRES, LANGUAGES } from '@/lib/constants';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

interface FilterPanelProps {
  category: string;
  dateStart: string;
  dateEnd: string;
  lang: string;
  onSetParam: (key: string, value: string) => void;
  onClear: () => void;
  open: boolean;
  onClose: () => void;
}

export function FilterPanel({
  category,
  dateStart,
  dateEnd,
  lang,
  onSetParam,
  onClear,
  open,
  onClose,
}: FilterPanelProps) {
  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  // Lock body scroll when mobile panel is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const hasActiveFilters = category || dateStart || dateEnd || lang !== 'eng';

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden',
          'transition-opacity duration-300',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-80 overflow-y-auto scrollbar-thin p-6 pb-24',
          'transition-transform duration-300 ease-out',
          'bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800',
          'lg:static lg:translate-x-0 lg:z-0 lg:h-fit lg:sticky lg:top-24 lg:w-auto lg:pb-6',
          'lg:rounded-2xl lg:border lg:border-gray-100 lg:dark:border-gray-800',
          'lg:shadow-sm lg:shadow-gray-200/30 dark:lg:shadow-gray-950/30',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider flex items-center gap-2">
            <Icon name="filter_list" size="sm" className="text-gray-400 dark:text-gray-500" />
            Filters
          </h3>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <button
                onClick={onClear}
                className={cn(
                  'text-xs font-medium px-2.5 py-1 rounded-lg',
                  'text-blue-600 dark:text-blue-400',
                  'hover:bg-blue-50 dark:hover:bg-blue-900/20',
                  'transition-colors duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
                )}
              >
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Close filters"
              className={cn(
                'lg:hidden p-1 rounded-lg',
                'text-gray-500 dark:text-gray-400',
                'hover:bg-gray-100 dark:hover:bg-gray-800',
                'transition-colors duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
              )}
            >
              <Icon name="close" size="sm" />
            </button>
          </div>
        </div>

        {/* Date Range */}
        <div className="mb-6">
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2.5 uppercase tracking-wider">
            Date Range
          </label>
          <div className="space-y-2">
            <div className="relative">
              <input
                type="date"
                value={dateStart}
                onChange={(e) => onSetParam('dateStart', e.target.value)}
                aria-label="Start date"
                className={cn(
                  'w-full rounded-xl border px-3 py-2.5 text-sm',
                  'bg-gray-50 border-gray-200 text-gray-900',
                  'dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100',
                  'hover:border-gray-300 dark:hover:border-gray-600',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500',
                  'transition-colors duration-200',
                )}
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
              <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-medium">to</span>
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            </div>
            <input
              type="date"
              value={dateEnd}
              onChange={(e) => onSetParam('dateEnd', e.target.value)}
              aria-label="End date"
              className={cn(
                'w-full rounded-xl border px-3 py-2.5 text-sm',
                'bg-gray-50 border-gray-200 text-gray-900',
                'dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100',
                'hover:border-gray-300 dark:hover:border-gray-600',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500',
                'transition-colors duration-200',
              )}
            />
          </div>
        </div>

        <div className="h-px bg-gray-100 dark:bg-gray-800 mb-6" />

        {/* Category */}
        <div className="mb-6">
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2.5 uppercase tracking-wider">
            Category
          </label>
          <div className="space-y-1">
            {GENRES.map((g) => {
              const isActive = category === g.value;
              return (
                <button
                  key={g.value}
                  type="button"
                  onClick={() => onSetParam('category', isActive ? '' : g.value)}
                  className={cn(
                    'flex items-center gap-2.5 w-full text-left cursor-pointer text-sm rounded-lg px-3 py-2',
                    'transition-colors duration-200',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
                    isActive
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800',
                  )}
                >
                  <Icon name={g.icon} size="sm" className={cn(
                    'text-[16px]',
                    isActive ? 'text-blue-500 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500',
                  )} />
                  {g.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="h-px bg-gray-100 dark:bg-gray-800 mb-6" />

        {/* Language */}
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2.5 uppercase tracking-wider">
            Language
          </label>
          <div className="space-y-1">
            {LANGUAGES.map((l) => (
              <button
                key={l.value}
                type="button"
                onClick={() => onSetParam('lang', l.value)}
                className={cn(
                  'flex items-center gap-2.5 w-full text-left cursor-pointer text-sm rounded-lg px-3 py-2',
                  'transition-colors duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
                  lang === l.value
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800',
                )}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
