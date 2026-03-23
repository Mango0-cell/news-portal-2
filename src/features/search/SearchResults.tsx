import type { Article } from '@/types/news';
import { ResultCard } from './ResultCard';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { Icon } from '@/components/ui/Icon';
import { GENRES } from '@/lib/constants';
import { ResultCardSkeleton } from '@/components/ui/Skeleton';
import { cn } from '@/lib/utils';

interface SearchResultsProps {
  articles: Article[];
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function SearchResults({
  articles,
  isLoading,
  isError,
  isFetching,
  page,
  totalPages,
  onPageChange,
}: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="space-y-4 stagger-children">
        {Array.from({ length: 5 }).map((_, i) => (
          <ResultCardSkeleton key={i} />
        ))}
      </div>
    );
  }
  if (isError) return <ErrorMessage message="Search failed. Please try again." />;

  if (articles.length === 0) {
    return (
      <div className="text-center py-16 animate-fade-in-up">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 mb-4">
          <Icon name="search_off" size="lg" className="text-gray-400 dark:text-gray-500" />
        </div>
        <p className="text-gray-600 dark:text-gray-400 font-medium mb-2">No results found</p>
        <p className="text-sm text-gray-500 dark:text-gray-500 max-w-sm mx-auto">
          Try different keywords or explore topics like{' '}
          {GENRES.slice(1, 4).map((g) => g.label).join(', ')}
        </p>
      </div>
    );
  }

  return (
    <div className={cn('transition-opacity duration-300', isFetching && 'opacity-60')}>
      <div className="space-y-4 stagger-children">
        {articles.map((article) => (
          <ResultCard key={article.uri} article={article} />
        ))}
      </div>
      {totalPages > 1 && (
        <nav aria-label="Search pagination" className="flex items-center justify-center gap-2 py-10 animate-fade-in-up">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            aria-label="Previous page"
            className={cn(
              'flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200',
              'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300',
              'dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800',
              'disabled:opacity-40 disabled:cursor-not-allowed',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
              'active:scale-95',
            )}
          >
            <Icon name="chevron_left" size="sm" />
            Previous
          </button>
          <span className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 tabular-nums">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            aria-label="Next page"
            className={cn(
              'flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200',
              'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300',
              'dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800',
              'disabled:opacity-40 disabled:cursor-not-allowed',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
              'active:scale-95',
            )}
          >
            Next
            <Icon name="chevron_right" size="sm" />
          </button>
        </nav>
      )}
    </div>
  );
}
