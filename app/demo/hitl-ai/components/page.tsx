'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { WIDGET_REGISTRY, WIDGET_GROUPS } from '@/components/demo/hitl-ai-widgets/registry';
import { MacTitleBar } from '@/components/demo/hitl-ai/MacTitleBar';

type Size = 'xs' | 'sm' | 'md' | 'lg';

const SIZE_LABELS: Size[] = ['xs', 'sm', 'md', 'lg'];

export default function WidgetShowcasePage() {
  const [selectedId, setSelectedId] = useState(WIDGET_REGISTRY[0].id);
  const [activeSize, setActiveSize] = useState<Size>('md');
  const [showAllSizes, setShowAllSizes] = useState(false);
  const [showLiveData, setShowLiveData] = useState(false);

  const selected = WIDGET_REGISTRY.find((w) => w.id === selectedId)!;

  return (
    <div className="flex h-full flex-col overflow-hidden bg-background text-foreground">
      <MacTitleBar />

      <div className="flex min-h-0 flex-1 overflow-hidden">
      {/* Sidebar */}
      <div className="flex h-full w-52 shrink-0 flex-col border-r border-border overflow-y-auto">
        <div className="border-b border-border px-4 py-3">
          <p className="text-sm font-semibold text-foreground">Components</p>
          <p className="text-[10px] text-muted-foreground">HITL-AI · Agatha widgets</p>
        </div>

        <div className="flex-1 p-2">
          {WIDGET_GROUPS.map((group) => {
            const widgets = WIDGET_REGISTRY.filter((w) => w.group === group);
            if (!widgets.length) return null;
            return (
              <div key={group} className="mb-3">
                <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {group}
                </p>
                {widgets.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => setSelectedId(w.id)}
                    className={cn(
                      'w-full rounded-md px-2 py-1.5 text-left text-xs transition-colors',
                      selectedId === w.id
                        ? 'bg-foreground text-background'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                    )}
                  >
                    {w.label}
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-border px-5 py-3">
          <div className="flex items-center gap-3">
            <h1 className="text-sm font-semibold text-foreground">{selected.label}</h1>
            <p className="hidden text-xs text-muted-foreground lg:block max-w-md truncate">
              {selected.description}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Live data toggle */}
            {selected.supportsLiveData && (
              <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
                <div
                  onClick={() => setShowLiveData((v) => !v)}
                  className={cn(
                    'flex h-4 w-7 items-center rounded-full px-0.5 transition-colors',
                    showLiveData ? 'bg-blue-500' : 'bg-muted',
                  )}
                >
                  <div className={cn('h-3 w-3 rounded-full bg-white shadow transition-transform', showLiveData ? 'translate-x-3' : '')} />
                </div>
                Live
              </label>
            )}

            {/* All sizes toggle */}
            <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
              <div
                onClick={() => setShowAllSizes((v) => !v)}
                className={cn(
                  'flex h-4 w-7 items-center rounded-full px-0.5 transition-colors',
                  showAllSizes ? 'bg-foreground' : 'bg-muted',
                )}
              >
                <div className={cn('h-3 w-3 rounded-full bg-white shadow transition-transform', showAllSizes ? 'translate-x-3' : '')} />
              </div>
              All sizes
            </label>

            {/* Size toggle */}
            {!showAllSizes && (
              <div className="flex items-center gap-0.5 rounded-lg border border-border p-0.5">
                {SIZE_LABELS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setActiveSize(s)}
                    className={cn(
                      'rounded-md px-2 py-1 text-[11px] font-medium uppercase transition-colors',
                      activeSize === s
                        ? 'bg-foreground text-background'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {showAllSizes ? (
            <div className="grid grid-cols-2 gap-6">
              {SIZE_LABELS.map((s) => (
                <div key={s}>
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{s}</p>
                  <div className="rounded-xl border border-border bg-card p-4">
                    <selected.Content size={s} liveData={showLiveData} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-lg">
              <div className="rounded-xl border border-border bg-card p-5">
                <selected.Content size={activeSize} liveData={showLiveData} />
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
