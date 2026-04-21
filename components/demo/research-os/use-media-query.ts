'use client';

import { useSyncExternalStore } from 'react';

/** SSR-safe `matchMedia`; `getServerSnapshot` is false so first paint matches mobile-first layout. */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
