import { Suspense } from 'react';
import { SearchPage } from '@/features/search/SearchPage';

export default function Search() {
  return (
    <Suspense>
      <SearchPage />
    </Suspense>
  );
}
