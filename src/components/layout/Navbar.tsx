'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '../shared/ThemeToggle';
import { SearchBar } from '../shared/SearchBar';
import { Icon } from '../ui/Icon';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const isSearchPage = pathname === '/search';

  const navLinkClass = (href: string) =>
    cn(
      'relative px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
      pathname === href
        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800',
    );

  return (
    <header
      className="sticky top-0 z-30
        bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl
        border-b border-gray-100 dark:border-gray-800"
    >
      <div className="mx-auto max-w-7xl h-16 flex items-center gap-4 px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg
            group"
        >
          <span className="font-display font-bold text-xl text-gray-900 dark:text-white tracking-tight">
            News<span className="text-blue-600 dark:text-blue-400">Portal</span>
          </span>
        </Link>

        {/* Nav links — desktop */}
        <nav className="hidden md:flex items-center gap-1 ml-2">
          <Link href="/" className={navLinkClass('/')}>
            Home
          </Link>
          <Link href="/search" className={navLinkClass('/search')}>
            Search
          </Link>
        </nav>

        {/* SearchBar — center, hidden on search page and mobile */}
        <div className={cn(
          'flex-1 max-w-md mx-auto hidden lg:block',
          isSearchPage && 'invisible',
        )}>
          <SearchBar compact />
        </div>

        {/* Spacer on smaller screens */}
        <div className="flex-1 lg:hidden" />

        {/* Right actions */}
        <div className="flex items-center gap-1">
          <Link
            href="/search"
            aria-label="Search"
            className={cn(
              'lg:hidden flex items-center justify-center w-10 h-10 rounded-full',
              'transition-colors duration-200',
              'text-gray-600 dark:text-gray-400',
              'hover:bg-gray-100 dark:hover:bg-gray-800',
              'active:scale-95',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
            )}
          >
            <Icon name="search" size="sm" />
          </Link>
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile nav — bottom row */}
      <nav className="md:hidden flex items-center gap-1 px-6 pb-2 -mt-1">
        <Link href="/" className={navLinkClass('/')}>
          Home
        </Link>
        <Link href="/search" className={navLinkClass('/search')}>
          Search
        </Link>
      </nav>
    </header>
  );
}
