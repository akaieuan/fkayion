import type { StatItem } from '../types';
import { cn } from '@/lib/utils';

export function RStats({ stats, compact = false }: { stats: StatItem[]; compact?: boolean }) {
  return (
    <div className={cn('flex flex-wrap', compact ? 'gap-1 my-1.5' : 'gap-1.5 my-3')}>
      {stats.map((s, i) => (
        <div
          key={i}
          className={cn(
            'bg-card border border-border rounded-md shadow-sm',
            compact ? 'min-w-[70px] px-2.5 py-2' : 'min-w-[100px] p-3',
            'flex-1 basis-20'
          )}
        >
          <div
            className={cn(
              'uppercase tracking-wider text-muted-foreground/60',
              compact ? 'text-[9px]' : 'text-[10px]'
            )}
          >
            {s.label}
          </div>
          <div
            className={cn(
              'font-mono font-normal tracking-tight text-foreground',
              compact ? 'text-[15px] mt-px' : 'text-xl mt-0.5'
            )}
          >
            {s.value}
          </div>
          {s.delta && (
            <div
              className={cn(
                'font-mono font-normal',
                s.up ? 'text-emerald-500' : 'text-red-500',
                compact ? 'text-[10px] mt-px' : 'text-[11px] mt-0.5'
              )}
            >
              {s.delta}
            </div>
          )}
          {s.sub && (
            <div
              className={cn(
                'text-muted-foreground/60',
                compact ? 'text-[9px] mt-px' : 'text-[10px] mt-0.5'
              )}
            >
              {s.sub}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
