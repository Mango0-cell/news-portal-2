'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import type { Article } from '@/types/news';
import { formatDate, cn } from '@/lib/utils';
import { Icon } from '../ui/Icon';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface ArticleDrawerProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ArticleDrawer({ article, isOpen, onClose }: ArticleDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Trap focus
  useEffect(() => {
    if (!isOpen || !drawerRef.current) return;
    const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (focusable.length > 0) focusable[0].focus();
  }, [isOpen]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !article) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm backdrop-enter"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Article details"
        className={cn(
          'relative z-10 flex flex-col w-full sm:w-[55%] lg:w-[45%] h-full overflow-y-auto',
          'bg-white dark:bg-gray-900 shadow-2xl',
          'drawer-enter',
        )}
      >
        {/* Sticky header */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-5 py-3
            bg-white/90 dark:bg-gray-900/90 backdrop-blur-md
            border-b border-gray-100 dark:border-gray-800"
        >
          <button
            onClick={onClose}
            aria-label="Close article drawer"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400
              hover:text-gray-900 dark:hover:text-gray-100
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg px-2 py-1"
          >
            <Icon name="arrow_back" size="sm" />
            Back
          </button>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open original article"
            className="flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400
              hover:underline
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg px-2 py-1"
          >
            Open original
            <Icon name="open_in_new" size="sm" />
          </a>
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Image */}
          {article.image ? (
            <div className="relative w-full aspect-video">
              <Image
                src={article.image}
                alt={article.title}
                fill
                sizes="(max-width: 640px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-full aspect-video bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
              <Icon name="article" size="lg" className="text-gray-400 dark:text-gray-600" />
            </div>
          )}

          <div className="px-6 py-5 space-y-4">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Badge variant="accent">{article.source.title}</Badge>
              <span>&middot;</span>
              <time dateTime={article.date}>{formatDate(article.date)}</time>
            </div>

            {/* Title */}
            <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
              {article.title}
            </h2>

            {/* Body */}
            <div className="text-base leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line">
              {article.body}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button>
                  Open full article
                  <Icon name="arrow_forward" size="sm" className="ml-1.5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
