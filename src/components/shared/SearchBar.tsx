'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '../ui/Icon';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  defaultValue?: string;
  onSearch?: (keyword: string) => void;
  compact?: boolean;
  placeholder?: string;
}

export function SearchBar({
  defaultValue = '',
  onSearch,
  compact = false,
  placeholder = 'Search articles...',
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (onSearch) {
      onSearch(trimmed);
    } else if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <Icon
        name="search"
        size="sm"
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
      />
      <input
        type="search"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search articles"
        className={cn(
          'w-full pl-10 pr-4 outline-none transition-all',
          compact
            ? 'py-2 text-sm rounded-full bg-gray-100 dark:bg-gray-800 border border-transparent focus-within:border-blue-500 focus-within:bg-white dark:focus-within:bg-gray-900'
            : 'py-3.5 text-lg rounded-2xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 focus-within:border-blue-500 shadow-sm',
          'text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
        )}
      />
    </form>
  );
}
