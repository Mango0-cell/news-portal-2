'use client';

import { useState } from 'react';
import { useSearchFilters } from './useSearchFilters';
import { SearchBar } from '@/components/shared/SearchBar';
import { FilterPanel } from './FilterPanel';
import { SearchResults } from './SearchResults';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { SORT_OPTIONS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function SearchPage() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const {
    q,
    category,
    dateStart,
    dateEnd,
    lang,
    sort,
    page,
    isLoading,
    isError,
    isFetching,
    data,
    setParam,
    clearAll,
    goToPage,
    totalPages,
    totalResults,
  } = useSearchFilters();

  const articles = data?.articles.results ?? [];
  const hasQuery = q.trim().length > 0;
  const activeFilterCount = [category, dateStart, dateEnd, lang !== 'eng' ? lang : ''].filter(Boolean).length;

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 animate-fade-in-up">
      {/* Search header */}
      <div className="mb-8 space-y-4">
        <div className="space-y-2">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
            Search
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Explore thousands of articles from around the world.
          </p>
        </div>
        <SearchBar
          defaultValue={q}
          onSearch={(keyword) => setParam('q', keyword)}
          placeholder="Search for news, topics, or sources..."
        />
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            {hasQuery && !isLoading && (
              <p className="text-sm text-gray-500 dark:text-gray-400 animate-fade-in-up">
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  {totalResults.toLocaleString()}
                </span>{' '}
                results for &ldquo;{q}&rdquo;
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              className={cn('lg:hidden', activeFilterCount > 0 && 'border-blue-300 dark:border-blue-700')}
              onClick={() => setFiltersOpen(true)}
              aria-label="Open filters"
            >
              <Icon name="tune" size="sm" className="mr-1.5" />
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-1.5 flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold">
                  {activeFilterCount}
                </span>
              )}
            </Button>
            <div className="flex items-center gap-1.5">
              <Icon name="sort" size="sm" className="text-gray-400 dark:text-gray-500" />
              <select
                value={sort}
                onChange={(e) => setParam('sort', e.target.value)}
                aria-label="Sort results"
                className={cn(
                  'rounded-xl border px-3 py-1.5 text-sm cursor-pointer',
                  'bg-white border-gray-200 text-gray-700',
                  'dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
                  'transition-colors duration-200',
                )}
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        <FilterPanel
          category={category}
          dateStart={dateStart}
          dateEnd={dateEnd}
          lang={lang}
          onSetParam={setParam}
          onClear={clearAll}
          open={filtersOpen}
          onClose={() => setFiltersOpen(false)}
        />

        {!hasQuery && !isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in-up">
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-3xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                <Icon name="search" size="lg" className="text-blue-400 dark:text-blue-500 text-[40px]" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
                <Icon name="auto_awesome" size="sm" className="text-amber-400" />
              </div>
            </div>
            <h2 className="text-xl font-display font-bold text-gray-900 dark:text-gray-100 mb-2">
              What are you looking for?
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-center max-w-sm mb-6">
              Search for any topic, event, or source to discover relevant articles.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {['Technology', 'Climate', 'Sports', 'Business'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setParam('q', suggestion)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium',
                    'bg-gray-100 text-gray-700 hover:bg-gray-200',
                    'dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700',
                    'transition-colors duration-200',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
                    'active:scale-95',
                  )}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <SearchResults
            articles={articles}
            isLoading={isLoading}
            isError={isError}
            isFetching={isFetching}
            page={page}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
        )}
      </div>
    </div>
  );
}
