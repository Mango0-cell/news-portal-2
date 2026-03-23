import { useState, useCallback } from 'react';

export function usePagination(initialPage = 1) {
  const [page, setPage] = useState(initialPage);

  const next = useCallback(() => setPage((p) => p + 1), []);
  const prev = useCallback(() => setPage((p) => Math.max(1, p - 1)), []);
  const goTo = useCallback((p: number) => setPage(p), []);
  const reset = useCallback(() => setPage(1), []);

  return { page, next, prev, goTo, reset };
}
