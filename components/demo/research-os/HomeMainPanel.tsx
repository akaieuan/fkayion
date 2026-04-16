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
  /** Fires with the composer text when the user sends */
  onSend?: (text: string) => void;
}

export function HomeMainPanel({ libraryOpen, onLibraryOpenChange, onOpenInReader, onSend }: HomeMainPanelProps) {
  const [input, setInput] = useState('');
  const composerRef = useRef<HTMLTextAreaElement>(null);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    onSend?.(text);
  };

  return (
    <div className="flex h-full flex-col items-center justify-center overflow-y-auto bg-background px-6">
      <div className="w-full max-w-2xl">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-medium tracking-tight text-foreground">
            Welcome to {APP_NAME}
          </h1>
          <p className="text-[13px] text-muted-foreground/80">
            Human-in-the-loop research: cite with confidence, verify every step.
          </p>
        </div>

        {/* Input box */}
        <div className="rounded-2xl border border-border bg-muted/20 px-4 py-3 shadow-sm transition-shadow focus-within:shadow-md focus-within:border-foreground/15">
          <AutoGrowTextarea
            placeholder="Choose a topic below, or type anything…"
            className="text-sm text-foreground placeholder:text-muted-foreground"
            minRows={2}
            maxRows={10}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            textareaRef={composerRef}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
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
              onClick={send}
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
              onClick={() => onSend?.(s)}
              className="rounded-full border border-border/60 backdrop-blur-sm px-3 py-1.5 text-xs text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors duration-200"
            >
              {s}
            </button>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="mx-auto max-w-lg text-[13px] leading-relaxed text-muted-foreground">
            This is a demo: a simplified, static-friendly preview of how a research copilot can feel, not a
            live product. At{' '}
            <span className="text-foreground/80">Ubik</span>, work in this vein moved from rough prototypes
            to production, grounding answers in real sources, tightening retrieval and citations, and
            designing human review where automation is not enough. The point here is less the mock UI
            itself than the kind of end-to-end product work that turns exploratory AI into something
            teams can trust.
          </p>
        </div>
      </div>
    </div>
  );
}
