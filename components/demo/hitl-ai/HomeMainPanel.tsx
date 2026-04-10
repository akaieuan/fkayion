'use client';

import { useState, useRef } from 'react';
import { Plus, ArrowUp, ChevronDown, Search, File } from 'lucide-react';
import { cn } from '@/lib/utils';
import { APP_NAME, LIBRARY_ITEMS } from './data';
import { AutoGrowTextarea } from './AutoGrowTextarea';

export function HomeMainPanel() {
  const [input, setInput] = useState('');
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [librarySearch, setLibrarySearch] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());

  const filtered = LIBRARY_ITEMS.filter((f) =>
    f.name.toLowerCase().includes(librarySearch.toLowerCase()),
  );

  const toggleFile = (id: string) =>
    setSelectedFiles((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

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
          />

          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLibraryOpen((o) => !o)}
                className={cn(
                  'flex h-7 w-7 items-center justify-center rounded-md transition-colors',
                  libraryOpen
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
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
              disabled={!input.trim()}
              className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground disabled:opacity-30 transition-opacity"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Inline library panel */}
        {libraryOpen && (
          <div className="mt-2 rounded-xl border border-border bg-background shadow-lg">
            <div className="flex items-center gap-2 border-b border-border px-3 py-2">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <input
                autoFocus
                placeholder="Search library…"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                value={librarySearch}
                onChange={(e) => setLibrarySearch(e.target.value)}
              />
            </div>

            <div className="max-h-48 overflow-y-auto p-2">
              {filtered.map((f) => (
                <button
                  key={f.id}
                  onClick={() => toggleFile(f.id)}
                  className={cn(
                    'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs transition-colors',
                    selectedFiles.has(f.id)
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  )}
                >
                  <File className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{f.name}</span>
                  {selectedFiles.has(f.id) && (
                    <span className="ml-auto text-[10px] text-primary">✓</span>
                  )}
                </button>
              ))}
            </div>

            {selectedFiles.size > 0 && (
              <div className="border-t border-border p-2">
                <button className="w-full rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90 transition-opacity">
                  Send {selectedFiles.size} file{selectedFiles.size > 1 ? 's' : ''} to chat
                </button>
              </div>
            )}
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
