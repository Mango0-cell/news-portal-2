import { useRouter } from 'next/navigation';
import type { Article } from '@/types/news';
import { formatDate, cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';

interface ResultCardProps {
  article: Article;
  onArticleClick?: (article: Article) => void;
}

export function ResultCard({ article, onArticleClick }: ResultCardProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onArticleClick) {
      onArticleClick(article);
    } else {
      router.push(`/article/${encodeURIComponent(article.uri)}`);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`Read article: ${article.title}`}
      className={cn(
        'group flex gap-4 sm:gap-5 cursor-pointer p-4 sm:p-5',
        'rounded-2xl bg-white dark:bg-gray-900',
        'border border-gray-100 dark:border-gray-800',
        'hover:border-blue-200 dark:hover:border-blue-800',
        'hover:shadow-lg hover:shadow-blue-500/5',
        'hover:-translate-y-0.5 active:scale-[0.99]',
        'transition-all duration-250 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
      )}
    >
      {article.image ? (
        <div className="hidden sm:block w-28 h-28 rounded-xl overflow-hidden shrink-0">
          <img
            src={article.image}
            alt={article.title}
            loading="lazy"
            decoding="async"
            sizes="112px"
            className="w-full h-full object-cover bg-gray-200 dark:bg-gray-800 transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      ) : (
        <div className="hidden sm:flex w-28 h-28 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 items-center justify-center shrink-0">
          <Icon name="article" className="text-gray-300 dark:text-gray-600" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <Badge>{article.source.title}</Badge>
          <time className="text-xs text-gray-500 dark:text-gray-400" dateTime={article.date}>
            {formatDate(article.date)}
          </time>
        </div>
        <h3 className="font-display text-lg sm:text-xl font-bold line-clamp-2 text-gray-900 dark:text-gray-100 mb-1.5 leading-snug">
          {article.title}
        </h3>
        <p className="text-sm line-clamp-2 sm:line-clamp-3 text-gray-600 dark:text-gray-400 leading-relaxed">
          {article.body}
        </p>
        <span className="inline-flex items-center gap-1.5 mt-2.5 text-xs text-blue-600 dark:text-blue-400 font-medium transition-all duration-300 group-hover:gap-2">
          Read article
          <Icon name="arrow_forward" size="sm" className="text-[14px] transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      </div>
    </div>
  );
}
