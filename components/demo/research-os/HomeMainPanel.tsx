'use client';

import { useRef, useState } from 'react';
import { Plus, ArrowUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { APP_NAME } from './data';
import { AutoGrowTextarea } from './AutoGrowTextarea';
import { LibraryPanel } from './Panels';

interface HomeMainPanelProps {
  libraryOpen: boolean;
  onLibraryOpenChange: (open: boolean) => void;
  /** Jump to workspace PDF reader (library file double-click) */
  onOpenInReader?: () => void;
}

export function HomeMainPanel({ libraryOpen, onLibraryOpenChange, onOpenInReader }: HomeMainPanelProps) {
  const [input, setInput] = useState('');
  const composerRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="flex h-full flex-col items-center justify-center overflow-y-auto bg-background px-6">
      <div className="w-full max-w-2xl">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-semibold tracking-tight text-foreground">
            Welcome to {APP_NAME}
          </h1>
          <p className="text-sm text-muted-foreground">
            Human-in-the-loop research — cite with confidence, verify every step.
          </p>
        </div>

        {/* Input box */}
        <div className="rounded-xl border border-border bg-muted/30 px-4 py-3 shadow-sm">
          <AutoGrowTextarea
            placeholder="Ask anything about your research…"
            className="text-sm text-foreground placeholder:text-muted-foreground"
            minRows={2}
            maxRows={10}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            textareaRef={composerRef}
          />

          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onLibraryOpenChange(!libraryOpen)}
                className={cn(
                  'flex h-7 w-7 items-center justify-center rounded-md transition-colors',
                  libraryOpen
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
                aria-pressed={libraryOpen}
                aria-label={libraryOpen ? 'Hide library' : 'Open library'}
              >
                <Plus className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-muted-foreground hover:bg-muted cursor-pointer transition-colors">
                Agent
                <ChevronDown className="h-3 w-3" />
              </div>

              <span className="text-xs text-muted-foreground">Claude Sonnet</span>
            </div>

            <button
              type="button"
              disabled={!input.trim()}
              className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground disabled:opacity-30 transition-opacity"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>

        {libraryOpen && (
          <div className="mt-2">
            <LibraryPanel
              variant="embedded"
              onOpenInReader={onOpenInReader}
              onSendToChat={(items) => {
                const tags = items.map((i) => `[Library: ${i.name}]`).join(' ');
                setInput((prev) => {
                  const base = prev.trim() ? `${prev.trim()}\n\n` : '';
                  return `${base}${tags}\n\n`;
                });
                requestAnimationFrame(() => {
                  requestAnimationFrame(() => composerRef.current?.focus());
                });
              }}
            />
          </div>
        )}

        {/* Quick suggestions */}
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {[
            'Summarize IPCC AR6',
            'Carbon pricing mechanisms',
            'Net zero verification',
            'EU ETS reform 2024',
          ].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setInput(s)}
              className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:border-foreground/30 hover:text-foreground transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
