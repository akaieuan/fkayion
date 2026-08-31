'use client';

import type { Block, ArtifactData } from '../types';
import { cn } from '@/lib/utils';
import { RStats } from './RStats';
import { RChart } from './RChart';
import { RComp } from './RComp';
import { RSocialEmbed } from './RSocialEmbed';
import { RCreators } from './RCreators';
import { REmail } from './REmail';
import { RActions } from './RActions';

export function renderBlock(b: Block, i: number, onAsk: (prompt: string) => void) {
  if (b.type === 'stats' && b.stats) return <RStats key={i} stats={b.stats} />;
  if (b.type === 'chart' && b.chart)
    return <RChart key={i} title={b.chart.title} bars={b.chart.bars} />;
  if ((b.type === 'comparison' || b.type === 'compare') && b.comparisons)
    return <RComp key={i} title={b.comparisons.title} rows={b.comparisons.rows} />;
  if (b.type === 'social' && b.posts)
    return (
      <div key={i} className="my-3 overflow-x-auto flex gap-2 pb-1">
        {b.posts.map((p) => (
          <RSocialEmbed key={p.id} post={p} compact />
        ))}
      </div>
    );
  if (b.type === 'creators' && b.creators)
    return <RCreators key={i} creators={b.creators} />;
  if (b.type === 'email' && b.email) return <REmail key={i} email={b.email} />;
  if (b.type === 'actions' && b.actions)
    return <RActions key={i} actions={b.actions} onAsk={onAsk} />;
  return null;
}

export function renderArtifact(a: ArtifactData, onAsk: (prompt: string) => void) {
  return (
    <div className="px-7 py-6 overflow-auto h-full">
      {a.subtitle && (
        <div className="text-xs text-muted-foreground/60 mb-4">{a.subtitle}</div>
      )}
      {a.stats && <RStats stats={a.stats} />}
      {a.body && (
        <div
          className="text-foreground mb-4 text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: a.body }}
        />
      )}
      {a.chart && <RChart title={a.chart.title} bars={a.chart.bars} />}
      {a.comparisons && (
        <RComp title={a.comparisons.title} rows={a.comparisons.rows} />
      )}
      {a.posts && (
        <div className="my-4">
          <div className="text-[13px] font-normal text-foreground mb-2.5">
            Top Performing Content
          </div>
          <div className="flex gap-2.5 overflow-x-auto pb-1.5">
            {a.posts.map((p) => (
              <RSocialEmbed key={p.id} post={p} />
            ))}
          </div>
        </div>
      )}
      {a.creators && <RCreators creators={a.creators} />}
      {a.table && (
        <div className="bg-card border border-border rounded-md shadow-sm overflow-hidden mt-4">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {a.table.columns.map((c, i) => (
                  <th
                    key={i}
                    className={cn(
                      'px-3.5 py-2 text-[10px] font-normal text-muted-foreground/60 uppercase tracking-wide border-b border-border',
                      i > 0 ? 'text-right' : 'text-left'
                    )}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {a.table.rows.map((r, ri) => (
                <tr
                  key={ri}
                  className={cn(
                    ri < a.table!.rows.length - 1 && 'border-b border-border'
                  )}
                >
                  {r.cells.map((v, ci) => {
                    const isHigh = v.includes('%') && parseFloat(v) > 7;
                    return (
                      <td
                        key={ci}
                        className={cn(
                          'px-3.5 py-2 text-[13px]',
                          ci > 0 ? 'text-right font-mono' : 'text-left',
                          ci === 0 ? 'font-medium text-foreground' : 'font-normal',
                          isHigh
                            ? 'text-emerald-500'
                            : ci === 0
                              ? 'text-foreground'
                              : v.startsWith('+')
                                ? 'text-emerald-500'
                                : v.startsWith('-')
                                  ? 'text-red-500'
                                  : 'text-muted-foreground'
                        )}
                      >
                        {v}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {a.actions && (
        <div className="mt-5 pt-4 border-t border-border">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground/60 mb-2">
            Next Steps
          </div>
          <RActions actions={a.actions} onAsk={onAsk} />
        </div>
      )}
    </div>
  );
}

export { RStats, RChart, RComp, RSocialEmbed, RCreators, REmail, RActions };
