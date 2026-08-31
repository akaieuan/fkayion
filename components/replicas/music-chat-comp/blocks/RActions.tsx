'use client';

import type { Action } from '../types';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

export function RActions({
  actions,
  onAsk,
}: {
  actions: Action[];
  onAsk: (prompt: string) => void;
}) {
  return (
    <div className="flex gap-1.5 flex-wrap my-3">
      {actions.map((a, j) => (
        <button
          key={j}
          onClick={() => a.prompt && onAsk(a.prompt)}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs border border-border transition-colors',
            a.prompt
              ? 'bg-card text-foreground cursor-pointer hover:bg-card/80'
              : 'bg-border text-muted-foreground cursor-default'
          )}
        >
          {a.prompt && <Sparkles size={11} className="text-primary" />}
          {a.label}
        </button>
      ))}
    </div>
  );
}
