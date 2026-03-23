'use client';

import { useHomeNews } from './useHomeNews';
import { HeroSection } from './HeroSection';
import { GenreButtons } from './GenreButtons';
import { LatestNews } from './LatestNews';
import { HeroSkeleton } from '@/components/ui/Skeleton';
import { SideArticle } from './SideArticle';

export function HomePage() {
  const {
    heroArticle,
    gridArticles,
    sideArticles,
    isLoading,
    isError,
    isFetching,
    page,
    totalPages,
    goToPage,
    category,
    selectCategory,
  } = useHomeNews();

  return (
    <div className="pt-6 pb-10">
      {/* Hero + side articles */}
      <div className="px-6 mb-8">
        <div className="mx-auto max-w-7xl">
          {isLoading ? (
            <HeroSkeleton />
          ) : (
            heroArticle && (
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
                <HeroSection article={heroArticle} />
                {/* Side column — top 3 articles */}
                {sideArticles.length > 0 && (
                  <div className="hidden lg:flex flex-col gap-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      More Top Stories
                    </h3>
                    {sideArticles.map((article) => (
                      <SideArticle key={article.uri} article={article} />
                    ))}
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>

      {/* Genre pills — sticky below navbar */}
      <div className="sticky top-16 md:top-16 z-10 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-y border-gray-100 dark:border-gray-800 py-3 px-6">
        <div className="mx-auto max-w-7xl">
          <GenreButtons active={category} onChange={selectCategory} />
        </div>
      </div>

      {/* Section header */}
      <div className="px-6 pt-8 pb-2">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-gray-100">
            Latest News
          </h2>
          {!isLoading && gridArticles.length > 0 && (
            <span className="text-sm text-gray-400 dark:text-gray-500 tabular-nums">
              Page {page}
            </span>
          )}
        </div>
      </div>

      {/* News grid */}
      <div className="px-6 pb-8">
        <div className="mx-auto max-w-7xl">
          <LatestNews
            articles={gridArticles}
            isLoading={isLoading}
            isError={isError}
            isFetching={isFetching}
            page={page}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
        </div>
      </div>
    </div>
  );
}
