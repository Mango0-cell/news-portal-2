'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGetArticleByUriQuery } from '@/services/newsApi';
import { formatDate, cn } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface ArticlePageProps {
  uri: string;
}

export function ArticlePage({ uri }: ArticlePageProps) {
  const router = useRouter();
  const { data, isLoading, isError } = useGetArticleByUriQuery({ uri });
  const article = data?.articles.results[0];

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-[40vh] sm:h-[50vh] bg-gray-200 dark:bg-gray-800" />
        <div className="mx-auto max-w-7xl px-6 -mt-16 relative z-10">
          <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 sm:p-8 lg:p-10 shadow-xl">
            <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-5" />
            <div className="h-10 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
            <div className="h-10 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-8" />
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !article) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-24 text-center">
        <Icon name="article" size="lg" className="text-gray-300 dark:text-gray-600 mb-4" />
        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-100 mb-2">
          Article not found
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          This article may have been removed or the link is invalid.
        </p>
        <Link href="/">
          <Button>
            <Icon name="arrow_back" size="sm" className="mr-1.5" />
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <article className="animate-fade-in-up">
      {/* Hero image */}
      <div className="relative w-full">
        {article.image ? (
          <div className="relative h-[40vh] sm:h-[50vh] lg:h-[60vh] overflow-hidden">
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <button
              onClick={() => router.back()}
              className={cn(
                'absolute top-6 left-6 z-10',
                'flex items-center gap-1.5 px-4 py-2 rounded-full',
                'bg-black/30 backdrop-blur-md text-white',
                'hover:bg-black/50 transition-colors duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white',
              )}
            >
              <Icon name="arrow_back" size="sm" />
              <span className="text-sm font-medium">Back</span>
            </button>
          </div>
        ) : (
          <div className="relative h-48 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-900 dark:to-gray-900">
            <button
              onClick={() => router.back()}
              className={cn(
                'absolute top-6 left-6 z-10',
                'flex items-center gap-1.5 px-4 py-2 rounded-full',
                'bg-white/20 backdrop-blur-md text-white',
                'hover:bg-white/30 transition-colors duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white',
              )}
            >
              <Icon name="arrow_back" size="sm" />
              <span className="text-sm font-medium">Back</span>
            </button>
          </div>
        )}
      </div>

      {/* Content area */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 -mt-16 relative z-10">
          {/* Main content */}
          <div className={cn(
            'rounded-2xl p-6 sm:p-8 lg:p-10',
            'bg-white dark:bg-gray-900',
            'border border-gray-100 dark:border-gray-800',
            'shadow-xl shadow-gray-200/50 dark:shadow-gray-950/50',
          )}>
            {/* Meta badges */}
            <div className="flex flex-wrap items-center gap-2 mb-5 animate-fade-in-up animation-delay-100">
              <Badge variant="accent">{article.source.title}</Badge>
              <span className="text-gray-300 dark:text-gray-600">&middot;</span>
              <time
                dateTime={article.date}
                className="text-sm text-gray-500 dark:text-gray-400"
              >
                {formatDate(article.date)}
              </time>
            </div>

            {/* Title */}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 dark:text-gray-100 mb-6 animate-fade-in-up animation-delay-200">
              {article.title}
            </h1>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-blue-500/40 via-blue-500/10 to-transparent mb-8" />

            {/* Body */}
            <div className="prose-article animate-fade-in-up animation-delay-300">
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line max-w-prose">
                {article.body}
              </p>
            </div>

            {/* CTA */}
            <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800 animate-fade-in-up animation-delay-400">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button size="lg">
                  Read full article
                  <Icon name="open_in_new" size="sm" className="ml-2" />
                </Button>
              </a>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block animate-fade-in-up animation-delay-300">
            <div className={cn(
              'sticky top-24 rounded-2xl p-6',
              'bg-white dark:bg-gray-900',
              'border border-gray-100 dark:border-gray-800',
              'shadow-lg shadow-gray-200/30 dark:shadow-gray-950/30',
            )}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
                Article Info
              </h3>

              <div className="space-y-5">
                {/* Source */}
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-900/20 shrink-0">
                    <Icon name="newspaper" size="sm" className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Source</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {article.source.title}
                    </p>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-green-50 dark:bg-green-900/20 shrink-0">
                    <Icon name="calendar_today" size="sm" className="text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Published</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {formatDate(article.date)}
                    </p>
                    {article.time && (
                      <p className="text-xs text-gray-400 dark:text-gray-500">{article.time}</p>
                    )}
                  </div>
                </div>

                {/* Reading time estimate */}
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-900/20 shrink-0">
                    <Icon name="schedule" size="sm" className="text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Reading time</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {Math.max(1, Math.ceil((article.body?.split(/\s+/).length ?? 0) / 200))} min read
                    </p>
                  </div>
                </div>
              </div>

              <div className="h-px bg-gray-100 dark:bg-gray-800 my-5" />

              {/* Share / actions */}
              <div className="space-y-2">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'flex items-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-medium',
                    'text-blue-600 dark:text-blue-400',
                    'bg-blue-50 dark:bg-blue-900/20',
                    'hover:bg-blue-100 dark:hover:bg-blue-900/40',
                    'transition-colors duration-200',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
                  )}
                >
                  <Icon name="open_in_new" size="sm" />
                  Visit source
                </a>
                <button
                  onClick={() => navigator.clipboard.writeText(article.url)}
                  className={cn(
                    'flex items-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-medium',
                    'text-gray-600 dark:text-gray-400',
                    'bg-gray-50 dark:bg-gray-800',
                    'hover:bg-gray-100 dark:hover:bg-gray-700',
                    'transition-colors duration-200',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
                  )}
                >
                  <Icon name="content_copy" size="sm" />
                  Copy link
                </button>
              </div>
            </div>
          </aside>
        </div>

        {/* Mobile metadata */}
        <div className="lg:hidden mt-6 mb-8 animate-fade-in-up animation-delay-400">
          <div className={cn(
            'rounded-2xl p-5',
            'bg-white dark:bg-gray-900',
            'border border-gray-100 dark:border-gray-800',
          )}>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Icon name="newspaper" size="sm" className="text-blue-500" />
                {article.source.title}
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Icon name="schedule" size="sm" className="text-amber-500" />
                {Math.max(1, Math.ceil((article.body?.split(/\s+/).length ?? 0) / 200))} min read
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button className="w-full">
                  <Icon name="open_in_new" size="sm" className="mr-1.5" />
                  Visit source
                </Button>
              </a>
              <button
                onClick={() => navigator.clipboard.writeText(article.url)}
                className={cn(
                  'flex items-center justify-center w-11 h-11 rounded-lg',
                  'border border-gray-200 dark:border-gray-700',
                  'text-gray-600 dark:text-gray-400',
                  'hover:bg-gray-50 dark:hover:bg-gray-800',
                  'transition-colors duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
                )}
                aria-label="Copy link"
              >
                <Icon name="content_copy" size="sm" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
