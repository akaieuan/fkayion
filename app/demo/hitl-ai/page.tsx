'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { WIDGET_REGISTRY, WIDGET_GROUPS } from '@/components/product-replicas/hitl-ai-widgets/registry';
import { MacTitleBar } from '@/components/product-replicas/hitl-ai/MacTitleBar';

type Size = 'xs' | 'sm' | 'md' | 'lg';

const SIZE_LABELS: Size[] = ['xs', 'sm', 'md', 'lg'];

/** HITL-AI widget showcase — registry-driven primitives (lives at `/demo/hitl-ai`). */
export default function HitlAiWidgetShowcasePage() {
  const [selectedId, setSelectedId] = useState(WIDGET_REGISTRY[0].id);
  const [activeSize, setActiveSize] = useState<Size>('md');
  const [showAllSizes, setShowAllSizes] = useState(false);
  const [showLiveData, setShowLiveData] = useState(false);

  const selected = WIDGET_REGISTRY.find((w) => w.id === selectedId)!;

  return (
    <div className="flex min-h-[100dvh] flex-col overflow-hidden bg-background text-foreground">
      <MacTitleBar />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="flex h-full w-52 shrink-0 flex-col border-r border-border overflow-y-auto">
          <div className="border-b border-border px-4 py-3">
            <p className="text-sm font-medium text-foreground">Widgets</p>
            <p className="text-[10px] text-muted-foreground">HITL-AI registry</p>
          </div>

          <div className="flex-1 p-2">
            {WIDGET_GROUPS.map((group) => {
              const widgets = WIDGET_REGISTRY.filter((w) => w.group === group);
              if (!widgets.length) return null;
              return (
                <div key={group} className="mb-3">
                  <p className="mb-1 px-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
                    {group}
                  </p>
                  {widgets.map((w) => (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => setSelectedId(w.id)}
                      className={cn(
                        'w-full rounded-md px-2 py-1.5 text-left text-xs transition-colors duration-200',
                        selectedId === w.id
                          ? 'bg-muted text-foreground font-medium'
                          : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
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
          <div className="flex shrink-0 items-center justify-between border-b border-border/60 bg-background/70 backdrop-blur-lg backdrop-saturate-150 px-5 py-3">
            <div className="flex items-center gap-3">
              <h1 className="text-sm font-medium text-foreground">{selected.label}</h1>
              <p className="hidden text-xs text-muted-foreground lg:block max-w-md truncate">
                {selected.description}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {selected.supportsLiveData && (
                <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
                  <div
                    onClick={() => setShowLiveData((v) => !v)}
                    className={cn(
                      'flex h-4 w-7 items-center rounded-full px-0.5 transition-colors duration-200',
                      showLiveData ? 'bg-primary' : 'bg-muted',
                    )}
                  >
                    <div
                      className={cn(
                        'h-3 w-3 rounded-full bg-white shadow-sm transition-transform duration-200',
                        showLiveData ? 'translate-x-3' : '',
                      )}
                    />
                  </div>
                  Live
                </label>
              )}

              <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
                <div
                  onClick={() => setShowAllSizes((v) => !v)}
                  className={cn(
                    'flex h-4 w-7 items-center rounded-full px-0.5 transition-colors duration-200',
                    showAllSizes ? 'bg-primary' : 'bg-muted',
                  )}
                >
                  <div
                    className={cn(
                      'h-3 w-3 rounded-full bg-white shadow-sm transition-transform duration-200',
                      showAllSizes ? 'translate-x-3' : '',
                    )}
                  />
                </div>
                All sizes
              </label>

              {!showAllSizes && (
                <div className="flex items-center gap-0.5 rounded-lg border border-border/60 p-0.5">
                  {SIZE_LABELS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setActiveSize(s)}
                      className={cn(
                        'rounded-md px-2 py-1 text-[11px] font-medium uppercase transition-colors duration-200',
                        activeSize === s
                          ? 'bg-muted text-foreground'
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

          <div className="flex-1 overflow-y-auto p-6">
            {showAllSizes ? (
              <div className="grid grid-cols-2 gap-6">
                {SIZE_LABELS.map((s) => (
                  <div key={s}>
                    <p className="mb-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
                      {s}
                    </p>
                    <div className="aka-card p-4">
                      <selected.Content size={s} liveData={showLiveData} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mx-auto max-w-lg">
                <div className="aka-card p-5">
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
