'use client';

import { useState } from 'react';
import { UserRound, ChevronDown, Check, X, AlertTriangle, Quote, FileText, Edit2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NOTES_GROUPS } from './notes-shared';
import { DOWNLOAD_PAPERS, BIBLIOGRAPHY_ENTRIES } from './data';
import type { ApprovalStatus } from './types';

type Section = 'review' | 'download' | 'notes' | 'bibliography';

export function HumanPanel() {
  const [section, setSection] = useState<Section>('review');

  return (
    <div className="flex h-full flex-col bg-background text-sm">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <UserRound className="h-4 w-4 text-amber-500" />
        <div>
          <p className="text-sm font-semibold text-foreground">Human Review</p>
          <p className="text-xs text-muted-foreground">3 items need your attention</p>
        </div>
      </div>

      {/* Section pills */}
      <div className="flex gap-1 border-b border-border px-3 py-2">
        {(['review', 'download', 'notes', 'bibliography'] as Section[]).map((s) => (
          <button
            key={s}
            onClick={() => setSection(s)}
            className={cn(
              'rounded-full px-2.5 py-1 text-xs font-medium capitalize transition-colors',
              section === s
                ? 'bg-foreground text-background'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            {s === 'download' ? 'To Download' : s === 'bibliography' ? 'Bibliography' : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {section === 'review' && <ReviewSection />}
        {section === 'download' && <DownloadSection />}
        {section === 'notes' && <NotesSection />}
        {section === 'bibliography' && <BibSection />}
      </div>
    </div>
  );
}

function ApproveReject({ onApprove, onReject, state }: {
  onApprove: () => void;
  onReject: () => void;
  state: ApprovalStatus;
}) {
  if (state === 'approved')
    return <span className="flex items-center gap-1 text-xs text-emerald-600"><Check className="h-3 w-3" />Approved</span>;
  if (state === 'rejected')
    return <span className="flex items-center gap-1 text-xs text-red-500"><X className="h-3 w-3" />Rejected</span>;
  return (
    <div className="flex items-center gap-1.5">
      <button onClick={onApprove} className="flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-600 hover:bg-emerald-500/20 transition-colors">
        <Check className="h-3 w-3" /> Approve
      </button>
      <button onClick={onReject} className="flex items-center gap-1 rounded-md bg-red-500/10 px-2 py-1 text-xs font-medium text-red-500 hover:bg-red-500/20 transition-colors">
        <X className="h-3 w-3" /> Reject
      </button>
    </div>
  );
}

function ReviewSection() {
  const [states, setStates] = useState<ApprovalStatus[]>(['pending', 'pending', 'pending']);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const items = [
    { accent: 'bg-amber-400', kind: 'citation', title: 'Verify citation accuracy', meta: 'IPCC 2023 report p. 12', summary: 'The agent cited Table 3 from the IPCC AR6 Synthesis; confirm page and table reference before locking.' },
    { accent: 'bg-violet-400', kind: 'quote', title: 'Confirm highlighted quote', meta: 'Policy Brief §3.1', summary: 'A direct quote from the EU Climate Law Policy Brief was used verbatim. Confirm this is an accurate pull.' },
    { accent: 'bg-emerald-400', kind: 'section', title: 'Approve section for export', meta: 'Writing · Section 2', summary: 'Section 2 is ready for export. Review the final paragraph before confirming.' },
  ];

  const toggle = (i: number) =>
    setExpanded((prev) => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; });

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="rounded-lg border border-border overflow-hidden">
          <div className="flex items-start gap-3 p-3">
            <div className={cn('mt-0.5 w-1 self-stretch rounded-full shrink-0', item.accent)} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-medium text-foreground">{item.title}</span>
                <span className="shrink-0 rounded-full bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground capitalize">{item.kind}</span>
              </div>
              <p className="text-[10px] text-muted-foreground mb-2">{item.meta}</p>
              <button onClick={() => toggle(i)} className="text-[10px] text-muted-foreground underline underline-offset-2 hover:text-foreground">
                {expanded.has(i) ? 'Hide context' : 'Show context'}
              </button>
              {expanded.has(i) && (
                <blockquote className="mt-2 border-l-2 border-border pl-2 text-xs italic text-muted-foreground">
                  {item.summary}
                </blockquote>
              )}
              <div className="mt-2.5">
                <ApproveReject
                  state={states[i]}
                  onApprove={() => setStates((s) => s.map((x, j) => j === i ? 'approved' : x))}
                  onReject={() => setStates((s) => s.map((x, j) => j === i ? 'rejected' : x))}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function DownloadSection() {
  const [states, setStates] = useState<ApprovalStatus[]>(DOWNLOAD_PAPERS.map(() => 'pending'));

  return (
    <div className="space-y-2">
      {DOWNLOAD_PAPERS.map((p, i) => (
        <div key={p.id} className="rounded-lg border border-border p-3">
          <div className="mb-1.5 flex items-start gap-2">
            <div className="h-10 w-8 shrink-0 rounded bg-muted flex items-center justify-center">
              <FileText className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground leading-snug">{p.title}</p>
              <p className="text-[10px] text-muted-foreground">{p.venue}, {p.year} · {p.cites} cites</p>
            </div>
          </div>
          <p className="mb-2 text-[11px] leading-relaxed text-muted-foreground">{p.snippet}</p>
          <ApproveReject
            state={states[i]}
            onApprove={() => setStates((s) => s.map((x, j) => j === i ? 'approved' : x))}
            onReject={() => setStates((s) => s.map((x, j) => j === i ? 'rejected' : x))}
          />
        </div>
      ))}
    </div>
  );
}

function NotesSection() {
  const [states, setStates] = useState<Record<string, ApprovalStatus>>(
    Object.fromEntries(
      NOTES_GROUPS.flatMap((g) => g.notes.map((n) => [n.id, n.approval]))
    )
  );

  return (
    <div className="space-y-3">
      {NOTES_GROUPS.map((group) => (
        <div key={group.title}>
          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{group.title}</p>
          <div className="space-y-2">
            {group.notes.map((note) => (
              <div key={note.id} className="rounded-lg border border-border p-3">
                <p className="mb-1 text-xs font-medium text-foreground">{note.title}</p>
                <blockquote className="mb-1.5 border-l-2 border-border pl-2 text-[11px] italic text-muted-foreground">{note.quote}</blockquote>
                <p className="mb-2 text-[11px] text-muted-foreground">{note.summary}</p>
                <ApproveReject
                  state={states[note.id]}
                  onApprove={() => setStates((s) => ({ ...s, [note.id]: 'approved' }))}
                  onReject={() => setStates((s) => ({ ...s, [note.id]: 'rejected' }))}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function BibSection() {
  const [entries, setEntries] = useState(BIBLIOGRAPHY_ENTRIES);

  const remove = (id: string) => setEntries((e) => e.filter((x) => x.id !== id));

  return (
    <div className="space-y-2">
      {entries.map((entry) => (
        <div key={entry.id} className={cn('group rounded-lg border p-3', entry.incomplete ? 'border-amber-200 dark:border-amber-900' : 'border-border')}>
          {entry.incomplete && (
            <div className="mb-2 flex items-center gap-1.5 text-[10px] text-amber-600">
              <AlertTriangle className="h-3 w-3" />
              {entry.warning}
            </div>
          )}
          <p className="text-xs font-medium text-foreground">{entry.title}</p>
          <p className="text-[10px] text-muted-foreground">{entry.authors} · {entry.journal} · {entry.year}</p>
          {entry.doi && <p className="text-[10px] text-muted-foreground font-mono mt-0.5">{entry.doi}</p>}
          <button
            onClick={() => remove(entry.id)}
            className="mt-2 text-[10px] text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
