'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;

    if (!document.startViewTransition) return;
    document.startViewTransition(() => {
      // React re-renders handled by router
    });
  }, [pathname]);

  return <div className="page-transition-root">{children}</div>;
}
