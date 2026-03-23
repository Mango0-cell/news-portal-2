'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { Article } from '@/types/news';
import { formatDate, cn } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';

interface SideArticleProps {
  article: Article;
}

export function SideArticle({ article }: SideArticleProps) {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/article/${encodeURIComponent(article.uri)}`);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleNavigate}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleNavigate();
        }
      }}
      aria-label={`Read: ${article.title}`}
      className={cn(
        'group flex gap-3 cursor-pointer p-3 rounded-xl flex-1',
        'bg-white dark:bg-gray-900',
        'border border-gray-100 dark:border-gray-800',
        'hover:border-blue-200 dark:hover:border-blue-800',
        'hover:shadow-md transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
        'active:scale-[0.99]',
      )}
    >
      {article.image ? (
        <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 relative">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="80px"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      ) : (
        <div className="w-20 h-20 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
          <Icon name="article" size="sm" className="text-gray-300 dark:text-gray-600" />
        </div>
      )}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h4 className="text-sm font-semibold line-clamp-2 text-gray-900 dark:text-gray-100 leading-snug mb-1">
          {article.title}
        </h4>
        <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
          <span className="truncate">{article.source.title}</span>
          <span>&middot;</span>
          <time dateTime={article.date}>{formatDate(article.date)}</time>
        </div>
      </div>
    </div>
  );
}
