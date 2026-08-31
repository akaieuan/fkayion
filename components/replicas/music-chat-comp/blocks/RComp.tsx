import type { CompRow } from '../types';
import { cn } from '@/lib/utils';

function Bar({ value, max, accent }: { value: number; max: number; accent?: boolean }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="flex-1 h-1 rounded-full bg-border overflow-hidden">
      <div
        className={cn('h-full rounded-full', accent ? 'bg-primary' : 'bg-muted-foreground/30')}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function RComp({
  title,
  rows,
  compact = false,
}: {
  title: string;
  rows: CompRow[];
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        'bg-card border border-border rounded-md shadow-sm',
        compact ? 'px-3.5 py-2.5 my-1.5' : 'px-4 py-4 my-3'
      )}
    >
      <div
        className={cn(
          'font-normal text-muted-foreground',
          compact ? 'text-[10px] mb-1.5' : 'text-[11px] mb-2.5'
        )}
      >
        {title}
      </div>
      {rows.map((r, j) => (
        <div
          key={j}
          className={cn(
            'flex items-center',
            compact ? 'gap-1.5 py-0.5' : 'gap-2 py-1.5',
            j < rows.length - 1 && 'border-b border-border'
          )}
        >
          <div className={cn(compact ? 'w-[75px]' : 'w-[90px]')}>
            <div
              className={cn(
                'truncate',
                compact ? 'text-[11px]' : 'text-xs',
                r.accent ? 'font-medium text-foreground' : 'font-normal text-muted-foreground'
              )}
            >
              {r.label}
            </div>
            {r.sub && (
              <div className={cn('text-muted-foreground/60', compact ? 'text-[9px]' : 'text-[10px]')}>
                {r.sub}
              </div>
            )}
          </div>
          <Bar value={r.value} max={r.max} accent={r.accent} />
          <div
            className={cn(
              'text-right font-mono font-normal',
              compact ? 'w-[35px] text-[11px]' : 'w-10 text-xs',
              r.accent ? 'text-primary' : 'text-foreground'
            )}
          >
            {r.value.toFixed(1)}%
          </div>
          {r.meta && (
            <div
              className={cn(
                'text-right font-mono text-muted-foreground/60',
                compact ? 'w-[70px] text-[9px]' : 'w-[85px] text-[10px]'
              )}
            >
              {r.meta}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
