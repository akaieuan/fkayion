'use client';

import { useState } from 'react';
import { TrendingUp, BarChart3, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RStats } from './blocks/RStats';
import { RComp } from './blocks/RComp';
import { ART } from './data/artists';
import { MO, PLATS } from './data/constants';

export function AnalyticsView({ onAskChat }: { onAskChat: (prompt: string) => void }) {
  const [hovBar, setHovBar] = useState<number | null>(null);
  const streamTot = MO.map((_, i) => ART.reduce((a, x) => a + x.mo[i], 0));
  const sMax = Math.max(...streamTot);

  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="max-w-[1080px] mx-auto px-7 pt-5 pb-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-foreground flex items-center gap-2">
              <BarChart3 size={18} className="text-primary" />
              Analytics
            </h2>
            <p className="text-[11px] text-muted-foreground/60 mt-0.5">Q1 2026 — All Artists</p>
          </div>
          <button
            onClick={() => onAskChat('Full Q1 analysis with save rates, social performance, and creator recommendations')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-medium cursor-pointer border-none hover:opacity-90 transition-opacity"
          >
            <Sparkles size={12} />
            Analyze in chat
          </button>
        </div>

        {/* KPI Stats */}
        <RStats
          stats={[
            { label: 'Total Streams', value: '21.4M', delta: '+14%', up: true },
            { label: 'Total Saves', value: '1.77M', delta: '+22%', up: true },
            { label: 'Save Rate', value: '7.2%', delta: '+0.8pp', up: true },
            { label: 'Social Impressions', value: '12.8M', delta: '+34%', up: true },
          ]}
          compact
        />

        {/* Charts row */}
        <div className="flex gap-2 mb-2.5">
          {/* Monthly bar chart */}
          <div className="flex-[2] bg-card border border-border rounded-md shadow-sm px-3.5 py-3">
            <div className="text-[11px] font-normal text-foreground mb-2">Monthly Streams (K)</div>
            <div className="flex items-end gap-[3px]" style={{ height: 90 }}>
              {streamTot.map((v, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setHovBar(i)}
                  onMouseLeave={() => setHovBar(null)}
                  onClick={() => onAskChat(`${MO[i]} performance breakdown`)}
                  className="flex-1 flex flex-col items-center gap-0.5 cursor-pointer relative"
                >
                  {hovBar === i && (
                    <div className="absolute -top-[18px] bg-card border border-border rounded-[5px] px-1.5 py-px text-[10px] text-foreground font-mono z-10 whitespace-nowrap">
                      {v}K
                    </div>
                  )}
                  <div
                    className={cn(
                      'w-full max-w-8 rounded-[3px] transition-all duration-150',
                      hovBar === i ? 'bg-primary' : 'bg-border',
                    )}
                    style={{ height: `${(v / sMax) * 76}px` }}
                  />
                  <span
                    className={cn(
                      'text-[8px]',
                      hovBar === i ? 'text-foreground' : 'text-muted-foreground/60',
                    )}
                  >
                    {MO[i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Platform split */}
          <RComp
            title="Platform Split"
            rows={PLATS.map((p) => ({
              label: p.name,
              value: p.pct,
              max: 50,
              meta: `${(21.4 * p.pct / 100).toFixed(1)}M`,
            }))}
            compact
          />
        </div>

        {/* Per-Artist table */}
        <div className="mt-1">
          <div className="text-xs font-normal text-foreground mb-2 flex items-center gap-1.5">
            <TrendingUp size={12} className="text-muted-foreground" />
            Per-Artist Breakdown
          </div>
          <div className="bg-card border border-border rounded-md shadow-sm overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {['Artist', 'Genre', 'Streams', 'Listeners', 'Saves', 'Save Rate', 'Playlists', 'QoQ'].map(
                    (h, i) => (
                      <th
                        key={i}
                        className={cn(
                          'px-2.5 py-1.5 text-[9px] font-normal text-muted-foreground/60 uppercase tracking-wider border-b border-border',
                          i > 1 ? 'text-right' : 'text-left',
                        )}
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {ART.map((a, ri) => (
                  <tr
                    key={a.id}
                    onClick={() => onAskChat(`Show ${a.name}'s saves and social presence`)}
                    className={cn(
                      'cursor-pointer hover:bg-muted/30 transition-colors',
                      ri < ART.length - 1 && 'border-b border-border',
                    )}
                  >
                    <td className="px-2.5 py-[5px] text-xs font-normal text-foreground">{a.name}</td>
                    <td className="px-2.5 py-[5px] text-[11px] text-muted-foreground">{a.genre}</td>
                    <td className="px-2.5 py-[5px] text-right text-[11px] font-mono text-muted-foreground/80">{a.streams}</td>
                    <td className="px-2.5 py-[5px] text-right text-[11px] font-mono text-muted-foreground/80">{a.listeners}</td>
                    <td className="px-2.5 py-[5px] text-right text-[11px] font-mono text-muted-foreground/80">{a.saves}</td>
                    <td
                      className={cn(
                        'px-2.5 py-[5px] text-right text-[11px] font-mono font-normal',
                        parseFloat(a.sr) > 7 ? 'text-emerald-500' : 'text-foreground',
                      )}
                    >
                      {a.sr}
                    </td>
                    <td className="px-2.5 py-[5px] text-right text-[11px] font-mono text-muted-foreground/80">
                      {a.pl.toLocaleString()}
                    </td>
                    <td
                      className={cn(
                        'px-2.5 py-[5px] text-right text-[11px] font-mono',
                        a.up ? 'text-emerald-500' : 'text-red-500',
                      )}
                    >
                      {a.delta}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
