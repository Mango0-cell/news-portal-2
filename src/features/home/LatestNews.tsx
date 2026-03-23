import type { Article } from '@/types/news';
import { ArticleCard } from '@/components/shared/ArticleCard';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { Icon } from '@/components/ui/Icon';
import { CardSkeleton } from '@/components/ui/Skeleton';
import { cn } from '@/lib/utils';

interface LatestNewsProps {
  articles: Article[];
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function LatestNews({
  articles,
  isLoading,
  isError,
  isFetching,
  page,
  totalPages,
  onPageChange,
}: LatestNewsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 stagger-children">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return <ErrorMessage message="Failed to load articles." />;
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-16 animate-fade-in-up">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 mb-4">
          <Icon name="article" size="lg" className="text-gray-400 dark:text-gray-500" />
        </div>
        <p className="text-gray-600 dark:text-gray-400 font-medium">No articles found for this category.</p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Try selecting a different topic above.</p>
      </div>
    );
  }

  return (
    <div className={cn('transition-opacity duration-300', isFetching && 'opacity-60')}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 stagger-children">
        {articles.map((article) => (
          <ArticleCard key={article.uri} article={article} />
        ))}
      </div>
      {totalPages > 1 && (
        <nav aria-label="Pagination" className="flex items-center justify-center gap-2 py-10 animate-fade-in-up">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            aria-label="Previous page"
            className={cn(
              'flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200',
              'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300',
              'dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800',
              'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-gray-900',
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
              'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-gray-900',
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
