import { useRouter } from 'next/navigation';
import type { Article } from '@/types/news';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';

interface HeroSectionProps {
  article: Article;
  onArticleClick?: (article: Article) => void;
}

export function HeroSection({ article, onArticleClick }: HeroSectionProps) {
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
      aria-label={`Read featured article: ${article.title}`}
      className="group relative block w-full overflow-hidden rounded-2xl cursor-pointer
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
        animate-fade-in-scale"
    >
      <div className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[16/10] w-full overflow-hidden">
        {article.image ? (
          <img
            src={article.image}
            alt={article.title}
            decoding="async"
            fetchPriority="high"
            sizes="(max-width: 1024px) 100vw, 70vw"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ viewTransitionName: 'hero-article' }}
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-900 dark:to-gray-900" />
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <Badge variant="accent" className="mb-3">
          {article.source.title}
        </Badge>
        <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white line-clamp-2 mb-2 leading-tight">
          {article.title}
        </h2>
        <p className="text-sm text-gray-300 line-clamp-2 max-w-xl mb-3 leading-relaxed">
          {article.body}
        </p>
        <div className="flex items-center justify-between">
          <time className="text-xs text-gray-400" dateTime={article.date}>
            {formatDate(article.date)}
          </time>
          <span className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md px-5 py-2 text-sm text-white font-medium transition-all duration-300 group-hover:bg-white/25 group-hover:gap-3">
            Read article
            <Icon name="arrow_forward" size="sm" className="text-[16px] transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
