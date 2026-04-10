'use client';

import { useState } from 'react';
import { Search, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, FileText, BookOpen, File } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LIBRARY_ITEMS, SEARCH_RESULTS } from './data';
import { NOTES_GROUPS } from './notes-shared';

// ─── LibraryPanel ─────────────────────────────────────────────────────

interface LibraryPanelProps {
  /** Home view: compact card under the composer; workspace: fills the right pane */
  variant?: 'embedded' | 'page';
  /** Workspace: open the Read / PDF panel (e.g. double-click a file) */
  onOpenInReader?: () => void;
  /** Append tagged file names to the chat / home composer */
  onSendToChat?: (items: { id: string; name: string }[]) => void;
}

export function LibraryPanel({ variant = 'page', onOpenInReader, onSendToChat }: LibraryPanelProps) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = LIBRARY_ITEMS.filter((f) =>
    f.name.toLowerCase().includes(query.toLowerCase()),
  );

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const inner = (
    <>
      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
        <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        <input
          autoFocus={variant === 'page'}
          placeholder="Search library…"
          className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div
        className={cn(
          'overflow-y-auto p-2',
          variant === 'embedded' ? 'max-h-48' : 'min-h-0 flex-1',
        )}
      >
        {filtered.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => toggle(f.id)}
            onDoubleClick={(e) => {
              e.preventDefault();
              onOpenInReader?.();
            }}
            className={cn(
              'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors',
              selected.has(f.id)
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            <File className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{f.name}</span>
            {selected.has(f.id) && (
              <span className="ml-auto text-[10px] text-primary">✓</span>
            )}
          </button>
        ))}
      </div>

      {selected.size > 0 && (
        <div className="border-t border-border p-2">
          <button
            type="button"
            onClick={() => {
              const items = LIBRARY_ITEMS.filter((f) => selected.has(f.id)).map((f) => ({
                id: f.id,
                name: f.name,
              }));
              onSendToChat?.(items);
              setSelected(new Set());
            }}
            className="w-full rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Send {selected.size} file{selected.size > 1 ? 's' : ''} to chat
          </button>
        </div>
      )}
    </>
  );

  if (variant === 'embedded') {
    return (
      <div className="rounded-xl border border-border bg-background shadow-lg overflow-hidden">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <BookOpen className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm font-semibold text-foreground">Library</p>
        </div>
        {inner}
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-background text-sm">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <BookOpen className="h-4 w-4 text-muted-foreground" />
        <p className="text-sm font-semibold text-foreground">Library</p>
      </div>
      {inner}
    </div>
  );
}

// ─── SearchPanel ─────────────────────────────────────────────────────

export function SearchPanel() {
  const [query, setQuery] = useState('carbon pricing mechanisms');
  const [filter, setFilter] = useState('All');
  const filters = ['All', '2024', '2023', 'Review'];

  const filtered = filter === 'All'
    ? SEARCH_RESULTS
    : SEARCH_RESULTS.filter((r) => filter === 'Review' ? r.relevance > 0.9 : r.year.toString() === filter);

  return (
    <div className="flex h-full flex-col bg-background text-sm">
      {/* Search input */}
      <div className="border-b border-border p-3">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-3 py-2">
          <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          <input
            className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search papers…"
          />
          <button className="rounded-md bg-primary px-2.5 py-1 text-[10px] font-medium text-primary-foreground">
            Search
          </button>
        </div>
        <div className="mt-2 flex gap-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors',
                filter === f ? 'bg-foreground text-background' : 'text-muted-foreground hover:bg-muted',
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {filtered.map((r) => (
          <div key={r.id} className="rounded-lg border border-border p-3 hover:border-foreground/20 transition-colors">
            <div className="flex items-start gap-2 mb-1.5">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 to-violet-700 text-[9px] font-bold text-white">
                {r.rank}
              </div>
              <p className="text-xs font-medium text-foreground leading-snug">{r.title}</p>
            </div>
            <p className="text-[10px] text-muted-foreground mb-1">{r.venue}, {r.year} · {r.authors}</p>
            <p className="text-[11px] leading-relaxed text-muted-foreground mb-2">{r.snippet}</p>
            <div className="flex items-center gap-2">
              <div className="h-1 flex-1 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-violet-400" style={{ width: `${r.relevance * 100}%` }} />
              </div>
              <span className="text-[10px] text-muted-foreground">{Math.round(r.relevance * 100)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PdfViewerPanel ──────────────────────────────────────────────────

export function PdfViewerPanel() {
  const [page, setPage] = useState(12);

  return (
    <div className="flex h-full flex-col bg-background text-sm">
      {/* Toolbar */}
      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
        <button className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground hover:bg-muted">
          <ZoomOut className="h-3.5 w-3.5" />
        </button>
        <span className="text-xs text-muted-foreground">100%</span>
        <button className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground hover:bg-muted">
          <ZoomIn className="h-3.5 w-3.5" />
        </button>
        <div className="mx-2 h-4 w-px bg-border" />
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground hover:bg-muted"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>
        <span className="text-xs text-muted-foreground">p. {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground hover:bg-muted"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Tab strip */}
      <div className="flex items-center gap-3 border-b border-border px-3">
        {['Notes 4', 'Figures 3', 'Bibliography', 'More'].map((t) => (
          <button key={t} className="py-2 text-[11px] text-muted-foreground hover:text-foreground border-b-2 border-transparent hover:border-foreground/30 transition-colors">
            {t}
          </button>
        ))}
      </div>

      {/* Fake PDF content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mx-auto max-w-sm rounded-lg border border-border bg-card p-5 shadow-sm">
          <div className="mb-4 space-y-1.5">
            <div className="h-2 w-3/4 rounded bg-muted" />
            <div className="h-2 w-full rounded bg-muted" />
            <div className="h-2 w-5/6 rounded bg-muted" />
            <div className="h-2 w-full rounded bg-muted" />
            <div className="h-2 w-2/3 rounded bg-muted" />
          </div>

          {/* Highlighted passage */}
          <div className="mb-4 rounded-md bg-yellow-100 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 px-3 py-2 text-xs leading-relaxed text-yellow-900 dark:text-yellow-200">
            …without immediate systemic action, global average temperatures are likely to exceed 1.5°C above pre-industrial levels by the early 2030s, with potentially irreversible consequences for low-lying coastal regions…
          </div>

          <div className="space-y-1.5">
            <div className="h-2 w-full rounded bg-muted" />
            <div className="h-2 w-4/5 rounded bg-muted" />
            <div className="h-2 w-full rounded bg-muted" />
            <div className="h-2 w-3/4 rounded bg-muted" />
          </div>

          <div className="mt-3 text-[10px] text-muted-foreground">Table 3 · p. {page} · IPCC AR6 Synthesis Report</div>
        </div>
      </div>
    </div>
  );
}

// ─── WritingPanel ─────────────────────────────────────────────────────

export function WritingPanel() {
  const [content, setContent] = useState(
    `## Section 1: Introduction\n\nThe accelerating pace of climate change has placed unprecedented pressure on international policy frameworks. This report examines the efficacy of existing carbon pricing mechanisms across G20 nations, with particular attention to the European Union's Emissions Trading System (EU ETS) as a model for coordinated action.\n\n## Section 2: Policy Implications\n\nThe evidence suggests that carbon price corridors above $50/tCO₂ are necessary to drive meaningful coal phase-out in major economies (Stavins et al., 2023)¹. The Market Stability Reserve mechanism introduced into the EU ETS in 2019 has demonstrably reduced permit surplus and contributed to price stability.\n\nFurther analysis of just transition frameworks indicates that co-designed regional plans significantly improve re-employment outcomes in coal-dependent communities (Newell & Mulvaney, 2024)².`
  );

  return (
    <div className="flex h-full flex-col bg-background text-sm">
      {/* Toolbar */}
      <div className="flex items-center gap-1 border-b border-border px-3 py-1.5 overflow-x-auto">
        {['Page Format', '11pt', 'Heading', 'List'].map((t) => (
          <button key={t} className="shrink-0 rounded px-2 py-1 text-[11px] text-muted-foreground hover:bg-muted transition-colors">
            {t}
          </button>
        ))}
      </div>

      {/* Document */}
      <div className="flex-1 overflow-y-auto p-4">
        <textarea
          className="w-full min-h-full resize-none bg-transparent text-xs leading-relaxed text-foreground outline-none font-mono"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {/* Status */}
      <div className="flex items-center justify-between border-t border-border px-3 py-1.5">
        <span className="text-[10px] text-muted-foreground">
          {content.split(/\s+/).filter(Boolean).length} words
        </span>
        <span className="text-[10px] text-muted-foreground">2 citations</span>
      </div>
    </div>
  );
}

// ─── NotesPanel ───────────────────────────────────────────────────────

export function NotesPanel() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [openGroups, setOpenGroups] = useState<Set<string>>(
    new Set(NOTES_GROUPS.map((g) => g.title))
  );

  const toggleGroup = (title: string) =>
    setOpenGroups((prev) => {
      const n = new Set(prev);
      if (n.has(title)) n.delete(title);
      else n.add(title);
      return n;
    });

  const toggleNote = (id: string) =>
    setExpanded((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  const statusColor: Record<string, string> = {
    approved: 'text-emerald-600',
    rejected: 'text-red-500',
    pending: 'text-amber-500',
  };

  return (
    <div className="flex h-full flex-col bg-background text-sm overflow-y-auto">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <FileText className="h-4 w-4 text-muted-foreground" />
        <p className="text-sm font-semibold text-foreground">Notes</p>
      </div>
      <div className="p-3 space-y-2">
        {NOTES_GROUPS.map((group) => (
          <div key={group.title}>
            <button
              onClick={() => toggleGroup(group.title)}
              className="flex w-full items-center justify-between px-1 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              {group.title}
              <span className="rounded-full bg-muted px-1.5 py-0.5 text-[9px]">{group.notes.length}</span>
            </button>

            {openGroups.has(group.title) && (
              <div className="space-y-1.5">
                {group.notes.map((note) => (
                  <div key={note.id} className="rounded-lg border border-border overflow-hidden">
                    <button
                      onClick={() => toggleNote(note.id)}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground truncate">{note.title}</p>
                        <p className="text-[10px] text-muted-foreground">{note.pages}</p>
                      </div>
                      <span className={cn('shrink-0 text-[10px] capitalize', statusColor[note.approval])}>
                        {note.approval}
                      </span>
                    </button>

                    {expanded.has(note.id) && (
                      <div className="border-t border-border px-3 py-2">
                        <blockquote className="mb-1.5 border-l-2 border-border pl-2 text-[11px] italic text-muted-foreground">
                          {note.quote}
                        </blockquote>
                        <p className="text-[11px] text-muted-foreground">{note.summary}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
