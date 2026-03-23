import { useState, useCallback } from 'react';
import type { Article } from '../types/news';

export function useArticleDrawer() {
  const [selected, setSelected] = useState<Article | null>(null);

  const open = useCallback((article: Article) => {
    if (document.startViewTransition) {
      document.startViewTransition(() => setSelected(article));
    } else {
      setSelected(article);
    }
  }, []);

  const close = useCallback(() => {
    if (document.startViewTransition) {
      document.startViewTransition(() => setSelected(null));
    } else {
      setSelected(null);
    }
  }, []);

  return { selected, open, close, isOpen: selected !== null };
}
