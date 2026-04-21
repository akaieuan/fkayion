'use client';

import { useState } from 'react';
import {
  Search,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  FileText,
  BookOpen,
  File,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { LIBRARY_ITEMS, SEARCH_RESULTS } from './data';
import { NOTES_GROUPS } from './notes-shared';
import type { ApprovalStatus } from './types';

// ─── LibraryPanel ─────────────────────────────────────────────────────

interface LibraryPanelProps {
  variant?: 'embedded' | 'page';
  onOpenInReader?: () => void;
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
                ? 'bg-muted text-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            <File className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{f.name}</span>
            {selected.has(f.id) && (
              <span className="ml-auto text-[10px] text-muted-foreground">✓</span>
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
            className="w-full rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background hover:opacity-90 transition-opacity"
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
          <p className="text-sm font-medium text-foreground">Library</p>
        </div>
        {inner}
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-transparent text-sm">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <BookOpen className="h-4 w-4 text-muted-foreground" />
        <p className="text-sm font-medium text-foreground">Library</p>
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
    <div className="flex h-full flex-col bg-transparent text-sm">
      <div className="border-b border-border p-3">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-3 py-2">
          <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          <input
            className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search papers…"
          />
          <button
            type="button"
            className="rounded-md bg-primary px-2.5 py-1 text-[10px] font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Search
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                'rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors duration-200',
                filter === f
                  ? 'bg-primary/15 text-primary ring-1 ring-primary/25 dark:bg-primary/20 dark:text-primary'
                  : 'text-muted-foreground hover:bg-muted/60',
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {filtered.map((r) => (
          <div key={r.id} className="rounded-lg border border-border p-3 hover:border-foreground/15 transition-colors duration-200">
            <div className="flex items-start gap-2 mb-1.5">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-muted text-[9px] font-medium text-foreground">
                {r.rank}
              </div>
              <p className="text-xs font-medium text-foreground leading-snug">{r.title}</p>
            </div>
            <p className="text-[10px] text-muted-foreground mb-1">{r.venue}, {r.year} · {r.authors}</p>
            <p className="text-[11px] leading-relaxed text-muted-foreground mb-2">{r.snippet}</p>
            <div className="flex items-center gap-2">
              <div className="h-1 flex-1 rounded-full bg-foreground/10 overflow-hidden">
                <div className="h-full rounded-full bg-foreground/40" style={{ width: `${r.relevance * 100}%` }} />
              </div>
              <span className="text-[10px] text-muted-foreground">{Math.round(r.relevance * 100)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Read tab: margin notes (same chrome as `NotesPanel` list items) ──

/** Matches expanded note rows in `NotesPanel` — border, title row, blockquote + summary */
function ReadMarginNoteCard({
  title,
  pages,
  quote,
  summary,
  approval,
}: {
  title: string;
  pages: string;
  quote?: string;
  summary: string;
  approval: ApprovalStatus;
}) {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <div className="flex w-full items-center gap-2 px-3 py-2">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-foreground truncate">{title}</p>
          <p className="text-[10px] text-muted-foreground">{pages}</p>
        </div>
        <span className="shrink-0 text-[10px] capitalize text-muted-foreground">{approval}</span>
      </div>
      <div className="border-t border-border px-3 py-2">
        {quote ? (
          <>
            <blockquote className="mb-1.5 border-l-2 border-border pl-2 text-[11px] italic text-muted-foreground">
              {quote}
            </blockquote>
            <p className="text-[11px] text-muted-foreground">{summary}</p>
          </>
        ) : (
          <p className="text-[11px] text-muted-foreground">{summary}</p>
        )}
      </div>
    </div>
  );
}

// ─── PdfViewerPanel ──────────────────────────────────────────────────

const ZOOM_LEVELS = [75, 100, 125, 150] as const;

export function PdfViewerPanel() {
  const [page, setPage] = useState(12);
  const [zoomIdx, setZoomIdx] = useState(1);

  const zoomOut = () => setZoomIdx((i) => Math.max(0, i - 1));
  const zoomIn = () => setZoomIdx((i) => Math.min(ZOOM_LEVELS.length - 1, i + 1));
  const zoomPct = ZOOM_LEVELS[zoomIdx];
  /** Avoid CSS `transform: scale` (shrinks layout / hides content); zoom text instead */
  const em = (zoomPct / 100) * 0.6875;

  return (
    <div className="flex h-full min-h-0 flex-col bg-muted/35 text-sm dark:bg-muted/20">
      <div className="flex shrink-0 flex-wrap items-center gap-x-3 gap-y-2 border-b border-border bg-card/95 px-3 py-2.5 backdrop-blur-sm">
        <div className="flex min-w-0 items-start gap-2">
          <FileText className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-foreground">IPCC AR6 Synthesis — Summary for Policymakers</p>
            <p className="text-[10px] text-muted-foreground">Preview · page {page} of 48 · mock PDF</p>
          </div>
        </div>

        <div className="ml-auto flex flex-wrap items-center justify-end gap-2">
          <div className="flex items-center gap-0.5 rounded-lg border border-sky-500/25 bg-sky-500/10 px-1 py-0.5 dark:border-sky-500/30 dark:bg-sky-500/12">
            <button
              type="button"
              onClick={zoomOut}
              disabled={zoomIdx === 0}
              className="flex h-7 w-7 items-center justify-center rounded-md text-sky-700 hover:bg-sky-500/15 disabled:opacity-40 dark:text-sky-300 dark:hover:bg-sky-500/20"
            >
              <ZoomOut className="h-3.5 w-3.5" />
            </button>
            <span className="min-w-[2.75rem] text-center text-[11px] font-medium tabular-nums text-sky-900 dark:text-sky-100">
              {zoomPct}%
            </span>
            <button
              type="button"
              onClick={zoomIn}
              disabled={zoomIdx === ZOOM_LEVELS.length - 1}
              className="flex h-7 w-7 items-center justify-center rounded-md text-sky-700 hover:bg-sky-500/15 disabled:opacity-40 dark:text-sky-300 dark:hover:bg-sky-500/20"
            >
              <ZoomIn className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-0.5 rounded-lg border border-violet-500/25 bg-violet-500/10 px-1 py-0.5 dark:border-violet-500/30 dark:bg-violet-500/12">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="flex h-7 w-7 items-center justify-center rounded-md text-violet-700 hover:bg-violet-500/15 dark:text-violet-300 dark:hover:bg-violet-500/20"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <span className="min-w-[4rem] text-center text-[11px] tabular-nums text-violet-800/90 dark:text-violet-200/90">p. {page}</span>
            <button
              type="button"
              onClick={() => setPage((p) => p + 1)}
              className="flex h-7 w-7 items-center justify-center rounded-md text-violet-700 hover:bg-violet-500/15 dark:text-violet-300 dark:hover:bg-violet-500/20"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <span className="rounded-md border border-emerald-500/35 bg-emerald-500/12 px-2 py-1 text-[10px] font-medium text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-500/15 dark:text-emerald-100">
            Read-only
          </span>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-2 py-3 sm:px-4 sm:py-5">
        <div className="mx-auto flex w-full max-w-[min(100%,58rem)] flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">
          <article
            className="relative min-w-0 flex-1 rounded-sm border border-stone-200/90 bg-[#f7f4ed] px-[6%] py-8 shadow-[0_2px_0_0_rgba(15,15,15,0.06),0_24px_60px_-20px_rgba(0,0,0,0.35)] dark:border-white/[0.08] dark:bg-[#1e1d1b] dark:shadow-[0_2px_0_0_rgba(255,255,255,0.04),0_24px_60px_-20px_rgba(0,0,0,0.75)] sm:px-[8%] sm:py-10 lg:max-w-[min(100%,36rem)] xl:max-w-[min(100%,40rem)]"
            style={{ fontSize: `${em}rem`, lineHeight: 1.58 }}
          >
            <header className="mb-6 border-b border-stone-300/70 pb-5 dark:border-white/10">
              <p className="text-[0.85em] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Section 3</p>
              <h1 className="mt-2 text-[1.35em] font-semibold leading-snug tracking-tight text-foreground">
                Long-term climate futures
              </h1>
            </header>

            <p className="relative mb-4 border-l-[3px] border-violet-500/70 pl-3 text-foreground/95 dark:border-violet-400/60">
              Without immediate systemic action, global average temperatures are likely to exceed{' '}
              <mark className="rounded-sm bg-amber-200/90 px-1 py-0.5 text-foreground dark:bg-amber-900/55 dark:text-amber-50">
                1.5°C above pre-industrial levels
              </mark>{' '}
              by the early 2030s, with potentially irreversible consequences for low-lying coastal regions and
              critical ecosystems.
            </p>

            <p className="mb-4 text-foreground/90">
              Coordinated carbon pricing, aligned with just-transition safeguards, remains one of the most
              effective levers for aligning near-term investment with long-term mitigation pathways — particularly
              when paired with transparent monitoring and periodic review.
            </p>

            <div
              id="read-note-table3"
              className="my-6 rounded-md border-2 border-amber-400/70 bg-amber-50/90 px-4 py-3 text-[0.95em] leading-relaxed text-foreground/90 ring-2 ring-amber-400/25 dark:border-amber-500/50 dark:bg-amber-950/30 dark:ring-amber-500/20"
            >
              …Table 3 summarizes emissions pathways consistent with limiting warming to 1.5°C with no or limited
              overshoot; verification of pagination and figure references is required before citation in policy
              briefs…
            </div>

            <p className="mb-4 text-foreground/90">
              The window for limiting warming to this threshold is narrowing rapidly. Policy instruments that
              combine price signals with innovation support show the strongest evidence of durable decarbonization
              across hard-to-abate sectors.
            </p>

            <footer className="mt-8 border-t border-stone-300/60 pt-4 text-[0.8em] text-muted-foreground dark:border-white/10">
              Table 3 · p. {page} · IPCC AR6 Synthesis Report (demo excerpt)
            </footer>

            {/* Narrow screens: compact note chips that mirror margin cards */}
            <div className="mt-6 space-y-2 border-t border-stone-300/50 pt-4 lg:hidden dark:border-white/10">
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Page notes</p>
              <ReadMarginNoteCard
                title="Citation check"
                pages="Table 3 · p. 12"
                quote="…verification of pagination and figure references is required before citation in policy briefs…"
                summary="Verify Table 3 pagination and figure IDs before citing in policy briefs."
                approval="pending"
              />
              <ReadMarginNoteCard
                title="Demo scope"
                pages="Preview"
                summary="Static preview — highlights sync to Human queue in a full build."
                approval="approved"
              />
            </div>
          </article>

          {/* Desktop margin note overlays (Claude / PDF-style) */}
          <aside
            className="hidden w-full shrink-0 flex-col gap-2 lg:flex lg:w-[13rem] xl:w-[14rem]"
            aria-label="Margin notes"
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Margin notes</p>
            <div className="lg:sticky lg:top-3 lg:space-y-3">
              <ReadMarginNoteCard
                title="Citation check"
                pages="Table 3 · p. 12"
                quote="…verification of pagination and figure references is required before citation in policy briefs…"
                summary="Verify Table 3 pagination and figure IDs before citing in policy briefs."
                approval="pending"
              />
              <ReadMarginNoteCard
                title="Demo scope"
                pages="Preview"
                summary="Static preview — highlights sync to Human queue in a full build."
                approval="approved"
              />
            </div>
          </aside>
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
    <div className="flex h-full flex-col bg-transparent text-sm">
      <div className="flex items-center gap-1 overflow-x-auto border-b border-border bg-muted/20 px-3 py-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {(
          [
            ['Page Format', 'sky'],
            ['11pt', 'violet'],
            ['Heading', 'amber'],
            ['List', 'rose'],
          ] as const
        ).map(([t, hue]) => (
          <button
            key={t}
            type="button"
            className={cn(
              'shrink-0 rounded px-2 py-1 text-[11px] transition-colors',
              hue === 'sky' && 'text-sky-700 hover:bg-sky-500/15 dark:text-sky-300',
              hue === 'violet' && 'text-violet-700 hover:bg-violet-500/15 dark:text-violet-300',
              hue === 'amber' && 'text-amber-800 hover:bg-amber-500/15 dark:text-amber-300',
              hue === 'rose' && 'text-rose-700 hover:bg-rose-500/15 dark:text-rose-300',
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <textarea
          className="w-full min-h-full resize-none bg-transparent text-xs leading-relaxed text-foreground outline-none font-mono"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

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

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-transparent text-sm">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <FileText className="h-4 w-4 text-muted-foreground" />
        <p className="text-sm font-medium text-foreground">Notes</p>
      </div>
      <div className="p-3 space-y-2">
        {NOTES_GROUPS.map((group) => (
          <div key={group.title}>
            <button
              onClick={() => toggleGroup(group.title)}
              className="flex w-full items-center justify-between px-1 py-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              {group.title}
              <span className="text-[9px] text-muted-foreground/60">{group.notes.length}</span>
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
                      <span className="shrink-0 text-[10px] capitalize text-muted-foreground">
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
