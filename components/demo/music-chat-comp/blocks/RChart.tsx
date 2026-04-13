'use client';

import { cn } from '@/lib/utils';

export function RChart({ title, bars }: { title: string; bars: { label: string; value: number }[] }) {
  const mx = Math.max(...bars.map((x) => x.value), 1);

  return (
    <div className="bg-card border border-border rounded-md shadow-sm px-4 py-4 my-3">
      <div className="text-[11px] font-normal text-muted-foreground mb-3">{title}</div>
      <div className="flex items-end gap-1.5 h-[100px]">
        {bars.map((b, j) => (
          <div key={j} className="flex-1 flex flex-col items-center gap-0.5">
            <div className="text-[10px] font-mono text-muted-foreground font-normal">
              {b.value}
            </div>
            <div
              className="w-full max-w-9 bg-primary rounded opacity-70"
              style={{ height: `${(b.value / mx) * 80}px` }}
            />
            <div className="text-[9px] text-muted-foreground/60 text-center max-w-[60px] truncate">
              {b.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
