'use client';

import { useRouter } from 'next/navigation';
import type { Article } from '@/types/news';
import { formatDate, cn } from '@/lib/utils';
import { Badge } from '../ui/Badge';
import { Icon } from '../ui/Icon';
import { ArticleImage } from '../ui/ArticleImage';

interface ArticleCardProps {
  article: Article;
  onArticleClick?: (article: Article) => void;
}

export function ArticleCard({ article, onArticleClick }: ArticleCardProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onArticleClick) {
      onArticleClick(article);
    } else {
      router.push(`/article/${encodeURIComponent(article.uri)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`Read article: ${article.title}`}
      className={cn(
        'group cursor-pointer rounded-2xl overflow-hidden',
        'bg-white dark:bg-gray-900',
        'border border-gray-100 dark:border-gray-800',
        'hover:border-blue-200 dark:hover:border-blue-800',
        'hover:shadow-xl hover:shadow-blue-500/5',
        'hover:-translate-y-1 active:scale-[0.98]',
        'transition-all duration-300 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
      )}
    >
      <div className="overflow-hidden">
        <div className="transition-transform duration-500 group-hover:scale-105">
          <ArticleImage
            src={article.image}
            alt={article.title}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2.5">
          <Badge>{article.source.title}</Badge>
          <time
            dateTime={article.date}
            className="text-xs text-gray-400 dark:text-gray-500"
          >
            {formatDate(article.date)}
          </time>
        </div>
        <h2 className="font-display font-bold text-lg leading-snug line-clamp-2 text-gray-900 dark:text-gray-100">
          {article.title}
        </h2>
        <p className="mt-2 text-sm line-clamp-2 text-gray-600 dark:text-gray-400 leading-relaxed">
          {article.body}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Read more
            <Icon name="arrow_forward" size="sm" className="text-[14px] transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
          <Icon name="arrow_forward" size="sm" className="text-gray-300 dark:text-gray-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300" />
        </div>
      </div>
    </div>
  );
}
