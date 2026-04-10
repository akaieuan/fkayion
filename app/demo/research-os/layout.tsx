import type { ReactNode } from 'react';

export default function ResearchOSLayout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  );
}
