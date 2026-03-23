import { useGetTopHeadlinesQuery } from '@/services/newsApi';
import { usePagination } from '@/hooks/usePagination';
import { useState, useCallback } from 'react';

export function useHomeNews() {
  const { page, goTo, reset } = usePagination();
  const [category, setCategory] = useState('');

  const { data, isLoading, isError, isFetching } = useGetTopHeadlinesQuery({
    page,
    category: category || undefined,
  });

  const selectCategory = useCallback(
    (cat: string) => {
      setCategory(cat);
      reset();
    },
    [reset],
  );

  const totalPages = data ? data.articles.pages : 0;
  const allArticles = data?.articles.results ?? [];
  const heroArticle = allArticles[0] ?? null;
  const sideArticles = allArticles.slice(1, 4);
  const gridArticles = allArticles.slice(4);

  return {
    heroArticle,
    sideArticles,
    gridArticles,
    isLoading,
    isError,
    isFetching,
    page,
    totalPages,
    goToPage: goTo,
    category,
    selectCategory,
  };
}
