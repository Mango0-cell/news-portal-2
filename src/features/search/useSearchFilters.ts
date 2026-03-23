import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { useSearchArticlesQuery } from '@/services/newsApi';

export function useSearchFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const q = searchParams.get('q') ?? '';
  const category = searchParams.get('category') ?? '';
  const dateStart = searchParams.get('dateStart') ?? '';
  const dateEnd = searchParams.get('dateEnd') ?? '';
  const lang = searchParams.get('lang') ?? 'eng';
  const sort = searchParams.get('sort') ?? 'date';
  const page = Number(searchParams.get('page') ?? '1');

  const { data, isLoading, isError, isFetching } = useSearchArticlesQuery({
    keyword: q || undefined,
    category: category || undefined,
    lang,
    sortBy: sort,
    dateStart: dateStart || undefined,
    dateEnd: dateEnd || undefined,
    page,
  });

  const setParam = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(searchParams.toString());
      if (value) {
        next.set(key, value);
      } else {
        next.delete(key);
      }
      if (key !== 'page') next.set('page', '1');
      router.push(`${pathname}?${next.toString()}`);
    },
    [searchParams, router, pathname],
  );

  const clearAll = useCallback(() => {
    const next = new URLSearchParams();
    if (q) next.set('q', q);
    router.push(`${pathname}?${next.toString()}`);
  }, [q, router, pathname]);

  const goToPage = useCallback(
    (p: number) => {
      const next = new URLSearchParams(searchParams.toString());
      next.set('page', String(p));
      router.push(`${pathname}?${next.toString()}`);
    },
    [searchParams, router, pathname],
  );

  return {
    q,
    category,
    dateStart,
    dateEnd,
    lang,
    sort,
    page,
    data,
    isLoading,
    isError,
    isFetching,
    setParam,
    clearAll,
    goToPage,
    totalPages: data?.articles.pages ?? 0,
    totalResults: data?.articles.totalResults ?? 0,
  };
}
