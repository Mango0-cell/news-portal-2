'use client';

import { useEffect, type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { useDispatch } from 'react-redux';
import { store } from '@/store';
import { initTheme } from '@/store/themeSlice';

function ThemeInit() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initTheme());
  }, [dispatch]);
  return null;
}

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <ThemeInit />
      {children}
    </Provider>
  );
}
