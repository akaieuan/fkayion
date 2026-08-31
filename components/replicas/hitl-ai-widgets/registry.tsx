'use client';

import { useState, useEffect } from 'react';
import {
  Search, AlertCircle, PenLine, Check, X, ChevronRight, ChevronDown,
  Bot, Cpu, SkipForward, AlertOctagon, Ban, Loader2,
  FileText, Globe, ClipboardList, Zap, ListChecks, GraduationCap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { HitlCard, DEMO_HITL_CARDS } from '@/components/replicas/hitl-ai/HitlCard';
import { NOTES_GROUPS } from '@/components/replicas/hitl-ai/notes-shared';
import { SEARCH_RESULTS } from '@/components/replicas/hitl-ai/data';
import type { AgentStatus } from '@/components/replicas/hitl-ai/types';

// ─── Types ─────────────────────────────────────────────────────────────────

type Size = 'xs' | 'sm' | 'md' | 'lg';
type WidgetGroup = 'Subagent' | 'QA' | 'Writing' | 'Research' | 'Batch' | 'Review' | 'Shared';

export interface WidgetDemoConfig {
  id: string;
  label: string;
  description: string;
  group: WidgetGroup;
  supportsLiveData?: boolean;
  Content: (props: { size: Size; liveData?: boolean }) => React.ReactNode;
}

// ─── Subagent Status Card ────────────────────────────────────────────────────

const STATUS_META: Record<AgentStatus, { icon: React.ElementType; color: string; label: string }> = {
  idle:      { icon: Cpu,         color: 'text-muted-foreground', label: 'Idle' },
  running:   { icon: Loader2,     color: 'text-blue-500',         label: 'Running' },
  completed: { icon: Check,       color: 'text-emerald-500',      label: 'Completed' },
  error:     { icon: AlertOctagon,color: 'text-red-500',          label: 'Error' },
  skipped:   { icon: SkipForward, color: 'text-amber-500',        label: 'Skipped' },
  cancelled: { icon: Ban,         color: 'text-muted-foreground', label: 'Cancelled' },
};

const AGENT_STATUS_CYCLE: AgentStatus[] = ['idle', 'running', 'completed', 'error', 'skipped', 'cancelled'];

function SubagentStatusCard({ status, label, detail, size }: {
  status: AgentStatus; label: string; detail?: string; size: Size
}) {
  const meta = STATUS_META[status];
  const Icon = meta.icon;
  const compact = size === 'xs' || size === 'sm';

  return (
    <div className={cn('flex items-center gap-3 rounded-lg border border-border bg-card px-3', compact ? 'py-2' : 'py-3')}>
      <div className={cn('flex shrink-0 items-center justify-center rounded-full bg-muted', compact ? 'h-6 w-6' : 'h-8 w-8')}>
        <Icon className={cn(meta.color, status === 'running' && 'animate-spin', compact ? 'h-3 w-3' : 'h-4 w-4')} />
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn('font-medium text-foreground', compact ? 'text-xs' : 'text-sm')}>{label}</p>
        {!compact && detail && <p className="text-xs text-muted-foreground truncate">{detail}</p>}
      </div>
      <span className={cn('shrink-0 rounded-full px-2 py-0.5 font-medium capitalize', meta.color,
        'bg-muted', compact ? 'text-[9px]' : 'text-[10px]')}>
        {meta.label}
      </span>
    </div>
  );
}

// ─── MiniTrace ───────────────────────────────────────────────────────────────

interface TraceStep {
  type: 'thought' | 'action' | 'result';
  label: string;
  detail?: string;
}

const TRACE_VARIANTS: Record<string, TraceStep[]> = {
  search: [
    { type: 'thought', label: 'Determine search strategy', detail: 'Analyzing query intent and relevant databases' },
    { type: 'action', label: 'Execute semantic search', detail: 'Query: "carbon pricing mechanisms" → 177 results' },
    { type: 'result', label: 'Ranked results ready', detail: 'Top 5 results surfaced with relevance scores' },
  ],
  write: [
    { type: 'thought', label: 'Outline section structure', detail: 'Planning Section 2 based on cited evidence' },
    { type: 'action', label: 'Insert citations', detail: 'Stavins (2023), Newell & Mulvaney (2024)' },
    { type: 'result', label: 'Draft complete — awaiting confirmation', detail: '2 citations inserted, ready for HITL review' },
  ],
  'web-read': [
    { type: 'thought', label: 'Identify key passages', detail: 'Scanning EU ETS reform documentation' },
    { type: 'action', label: 'Extract structured data', detail: 'Pulling Table 3, price corridor figures' },
    { type: 'result', label: 'Extraction complete', detail: '4 passages flagged for annotation' },
  ],
};

const TRACE_COLORS = {
  thought: { dot: 'bg-violet-400', border: 'border-violet-200 dark:border-violet-800', bg: 'bg-violet-50 dark:bg-violet-950/20' },
  action:  { dot: 'bg-blue-400',   border: 'border-blue-200 dark:border-blue-800',     bg: 'bg-blue-50 dark:bg-blue-950/20' },
  result:  { dot: 'bg-emerald-400',border: 'border-emerald-200 dark:border-emerald-800',bg: 'bg-emerald-50 dark:bg-emerald-950/20' },
};

function MiniTrace({ variant, size }: { variant: string; size: Size }) {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const steps = TRACE_VARIANTS[variant] || TRACE_VARIANTS.search;
  const compact = size === 'xs';

  const toggle = (i: number) =>
    setExpanded((p) => { const n = new Set(p); n.has(i) ? n.delete(i) : n.add(i); return n; });

  return (
    <div className="space-y-1.5">
      {steps.map((step, i) => {
        const colors = TRACE_COLORS[step.type];
        return (
          <div key={i} className={cn('rounded-lg border px-3 py-2 text-xs', colors.border, colors.bg)}>
            <button onClick={() => toggle(i)} className="flex w-full items-center gap-2 text-left">
              <span className={cn('h-2 w-2 shrink-0 rounded-full', colors.dot)} />
              <span className="flex-1 font-medium text-foreground capitalize">{step.type}: {step.label}</span>
              {step.detail && (
                expanded.has(i)
                  ? <ChevronDown className="h-3 w-3 shrink-0 text-muted-foreground" />
                  : <ChevronRight className="h-3 w-3 shrink-0 text-muted-foreground" />
              )}
            </button>
            {expanded.has(i) && step.detail && !compact && (
              <p className="mt-1 pl-4 text-[11px] text-muted-foreground">{step.detail}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── AI Generation Scale ─────────────────────────────────────────────────────

function AiScale({ value, size }: { value: number; size: Size }) {
  const [v, setV] = useState(value);
  const labels = ['Human', 'Mostly Human', 'Collaborative', 'Mostly AI', 'AI'];
  const colors = ['bg-emerald-400', 'bg-teal-400', 'bg-yellow-400', 'bg-orange-400', 'bg-red-400'];

  return (
    <div className="space-y-2">
      <div className="flex gap-1">
        {labels.map((l, i) => (
          <button
            key={i}
            onClick={() => setV(i)}
            className={cn(
              'flex-1 rounded-md border-2 py-1.5 text-center text-[9px] font-semibold transition-all',
              v === i
                ? `${colors[i]} border-transparent text-white`
                : 'border-border text-muted-foreground hover:border-foreground/30',
            )}
          >
            {size === 'xs' ? i + 1 : l}
          </button>
        ))}
      </div>
      {size !== 'xs' && (
        <p className="text-center text-xs text-muted-foreground">
          {labels[v]}
        </p>
      )}
    </div>
  );
}

// ─── QA Flow ─────────────────────────────────────────────────────────────────

function QAFlow({ size }: { size: Size }) {
  const [shortAnswer, setShortAnswer] = useState('');
  const [singleChoice, setSingleChoice] = useState('');
  const [multiChoice, setMultiChoice] = useState<Set<string>>(new Set());
  const [other, setOther] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const compact = size === 'xs' || size === 'sm';

  if (submitted) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/20 p-4 text-sm font-medium text-emerald-700 dark:text-emerald-300">
        <Check className="h-4 w-4" /> Responses submitted
      </div>
    );
  }

  const singleOpts = ['Carbon pricing', 'Regulation', 'Voluntary markets', 'Technology mandates'];
  const multiOpts = ['Stakeholder alignment', 'Monitoring & verification', 'Political feasibility', 'Cost-effectiveness'];
  const toggleMulti = (o: string) => setMultiChoice(p => { const n = new Set(p); n.has(o) ? n.delete(o) : n.add(o); return n; });

  return (
    <div className="space-y-4">
      {!compact && (
        <div>
          <p className="mb-1.5 text-xs font-medium text-foreground">What is the primary policy barrier in your context?</p>
          <textarea
            className="w-full resize-none rounded-lg border border-border bg-muted/30 px-3 py-2 text-xs outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-ring"
            rows={2}
            placeholder="Describe the main barrier…"
            value={shortAnswer}
            onChange={(e) => setShortAnswer(e.target.value)}
          />
        </div>
      )}

      <div>
        <p className="mb-1.5 text-xs font-medium text-foreground">Preferred mechanism?</p>
        <div className="space-y-1">
          {singleOpts.map((o) => (
            <button
              key={o}
              onClick={() => setSingleChoice(o)}
              className={cn(
                'flex w-full items-center gap-2 rounded-md border px-3 py-2 text-xs transition-colors',
                singleChoice === o
                  ? 'border-primary bg-primary/5 text-foreground'
                  : 'border-border text-muted-foreground hover:bg-muted',
              )}
            >
              <div className={cn('h-3 w-3 shrink-0 rounded-full border', singleChoice === o ? 'border-primary bg-primary' : 'border-muted-foreground')} />
              {o}
            </button>
          ))}
        </div>
      </div>

      {!compact && (
        <div>
          <p className="mb-1.5 text-xs font-medium text-foreground">Key implementation challenges? (select all that apply)</p>
          <div className="space-y-1">
            {multiOpts.map((o) => (
              <button
                key={o}
                onClick={() => toggleMulti(o)}
                className={cn(
                  'flex w-full items-center gap-2 rounded-md border px-3 py-2 text-xs transition-colors',
                  multiChoice.has(o)
                    ? 'border-primary bg-primary/5 text-foreground'
                    : 'border-border text-muted-foreground hover:bg-muted',
                )}
              >
                <div className={cn(
                  'flex h-3 w-3 shrink-0 items-center justify-center rounded',
                  multiChoice.has(o) ? 'bg-primary' : 'border border-muted-foreground',
                )}>
                  {multiChoice.has(o) && <Check className="h-2 w-2 text-primary-foreground" />}
                </div>
                {o}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="mb-1 text-xs font-medium text-foreground">Other notes</p>
        <textarea
          className="w-full resize-none rounded-lg border border-border bg-muted/30 px-3 py-2 text-xs outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-ring"
          rows={2}
          placeholder="Any additional context…"
          value={other}
          onChange={(e) => setOther(e.target.value)}
        />
      </div>

      <button
        onClick={() => setSubmitted(true)}
        className="w-full rounded-lg bg-primary py-2 text-xs font-medium text-primary-foreground hover:opacity-90 transition-opacity"
      >
        Continue
      </button>
    </div>
  );
}

// ─── Context Items ────────────────────────────────────────────────────────────

const CONTEXT_ITEMS = [
  { id: 'c1', type: 'note',  label: 'AR6 temperature finding', color: 'bg-violet-400' },
  { id: 'c2', type: 'file',  label: 'IPCC AR6 Synthesis.pdf',  color: 'bg-blue-400' },
  { id: 'c3', type: 'url',   label: 'eu-ets.europa.eu',        color: 'bg-emerald-400' },
  { id: 'c4', type: 'note',  label: 'Price corridor note',     color: 'bg-amber-400' },
  { id: 'c5', type: 'file',  label: 'Carbon Markets 2024.pdf', color: 'bg-blue-400' },
];

function ContextItems({ size }: { size: Size }) {
  const [items, setItems] = useState(CONTEXT_ITEMS);
  const maxVisible = size === 'xs' ? 2 : size === 'sm' ? 3 : 5;
  const visible = items.slice(0, maxVisible);
  const overflow = items.length - maxVisible;

  return (
    <div className="flex flex-wrap gap-1.5">
      {visible.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-2 py-0.5 text-xs text-foreground"
        >
          <span className={cn('h-2 w-2 shrink-0 rounded-full', item.color)} />
          <span className="max-w-[120px] truncate">{item.label}</span>
          <button
            onClick={() => setItems((i) => i.filter((x) => x.id !== item.id))}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-2.5 w-2.5" />
          </button>
        </div>
      ))}
      {overflow > 0 && (
        <div className="flex items-center rounded-full border border-dashed border-border px-2 py-0.5 text-[10px] text-muted-foreground">
          +{overflow} more
        </div>
      )}
    </div>
  );
}

// ─── Writing Agent ────────────────────────────────────────────────────────────

function WritingAgent({ size, liveData }: { size: Size; liveData?: boolean }) {
  const [status, setStatus] = useState<AgentStatus>('idle');

  useEffect(() => {
    if (!liveData) return;
    let i = 0;
    const t = setInterval(() => {
      i = (i + 1) % AGENT_STATUS_CYCLE.length;
      setStatus(AGENT_STATUS_CYCLE[i]);
    }, 1500);
    return () => clearInterval(t);
  }, [liveData]);

  const compact = size === 'xs' || size === 'sm';
  const meta = STATUS_META[status];
  const Icon = meta.icon;

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PenLine className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-semibold text-foreground">Write Doc Agent</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Icon className={cn('h-3.5 w-3.5', meta.color, status === 'running' && 'animate-spin')} />
          <span className={cn('text-xs capitalize', meta.color)}>{meta.label}</span>
        </div>
      </div>

      {!compact && (
        <>
          <div className="rounded-lg bg-muted/50 px-3 py-2 text-xs space-y-1">
            <div className="flex justify-between"><span className="text-muted-foreground">Title</span><span className="font-medium text-foreground">Climate Policy Analysis</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Target</span><span className="font-medium text-foreground">Section 2</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Word range</span><span className="font-medium text-foreground">400–600</span></div>
          </div>

          <div className="space-y-1.5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Evidence notes</p>
            {['AR6 temperature overshoot', 'Price corridor $50/tCO₂', 'EU ETS reform outcomes'].map((n) => (
              <div key={n} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                {n}
              </div>
            ))}
          </div>

          {status === 'completed' && (
            <button className="w-full rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20 py-2 text-xs font-medium text-blue-600 dark:text-blue-400 hover:opacity-80 transition-opacity">
              View Draft
            </button>
          )}
        </>
      )}

      {!liveData && (
        <div className="flex flex-wrap gap-1.5">
          {AGENT_STATUS_CYCLE.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={cn(
                'rounded-full px-2 py-0.5 text-[10px] font-medium capitalize transition-colors',
                status === s ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground hover:text-foreground',
              )}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Research Agent ───────────────────────────────────────────────────────────

function ResearchAgent({ size }: { size: Size }) {
  const [mode, setMode] = useState<'create' | 'followup' | 'readurl'>('create');
  const compact = size === 'xs' || size === 'sm';

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-4 w-4 text-violet-500" />
          <span className="text-sm font-semibold text-foreground">Research Agent</span>
        </div>
        <div className="flex gap-1">
          {(['create', 'followup', 'readurl'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={cn(
                'rounded-full px-2 py-0.5 text-[10px] font-medium capitalize transition-colors',
                mode === m ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground hover:text-foreground',
              )}
            >
              {m === 'readurl' ? 'Read URL' : m === 'followup' ? 'Follow-up' : 'Create'}
            </button>
          ))}
        </div>
      </div>

      {!compact && (
        <div className="rounded-lg bg-muted/50 px-3 py-2 text-xs space-y-1.5">
          {mode === 'create' && <>
            <div className="flex justify-between"><span className="text-muted-foreground">Profile</span><span className="font-medium text-foreground">Academic — Climate Policy</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Engine</span><span className="font-medium text-foreground">Semantic Scholar + Web</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Depth</span><span className="font-medium text-foreground">Deep (5 hops)</span></div>
          </>}
          {mode === 'followup' && <>
            <div className="flex justify-between"><span className="text-muted-foreground">Session</span><span className="font-mono text-foreground text-[10px]">sess_3a9f12</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Follow-up query</span><span className="font-medium text-foreground">EU ETS price volatility</span></div>
          </>}
          {mode === 'readurl' && <>
            <div className="flex justify-between"><span className="text-muted-foreground">URL</span><span className="font-mono text-foreground text-[10px] truncate max-w-[140px]">ec.europa.eu/clima/ets</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Extract</span><span className="font-medium text-foreground">Tables + Key passages</span></div>
          </>}
        </div>
      )}
    </div>
  );
}

// ─── Kitchen Sink Batch ───────────────────────────────────────────────────────

const BATCH_ITEMS = [
  { id: 'b1', type: 'search',   label: 'Search: carbon pricing 2024',     icon: Search },
  { id: 'b2', type: 'write',    label: 'Write: Section 2 introduction',   icon: PenLine },
  { id: 'b3', type: 'research', label: 'Research: IPCC AR6 findings',      icon: GraduationCap },
  { id: 'b4', type: 'qa',       label: 'QA: Verify citation accuracy',     icon: ClipboardList },
  { id: 'b5', type: 'web-read', label: 'Read: eu-ets.europa.eu',           icon: Globe },
];

function KitchenSinkBatch({ size }: { size: Size }) {
  const [decisions, setDecisions] = useState<Record<string, 'approved' | 'rejected' | null>>(
    Object.fromEntries(BATCH_ITEMS.map((i) => [i.id, null]))
  );
  const [current, setCurrent] = useState(0);

  const decide = (id: string, d: 'approved' | 'rejected') => {
    setDecisions((p) => ({ ...p, [id]: d }));
    setCurrent((c) => Math.min(c + 1, BATCH_ITEMS.length));
  };

  const all = Object.values(decisions).every((d) => d !== null);
  const approved = Object.values(decisions).filter((d) => d === 'approved').length;

  if (all) {
    return (
      <div className="rounded-xl border border-border bg-card p-4 text-center">
        <Check className="mx-auto mb-2 h-8 w-8 text-emerald-500" />
        <p className="text-sm font-semibold text-foreground">Batch complete</p>
        <p className="text-xs text-muted-foreground mt-1">{approved} approved · {BATCH_ITEMS.length - approved} rejected</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ListChecks className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-semibold text-foreground">Approval Batch</span>
        </div>
        <span className="text-xs text-muted-foreground">{current}/{BATCH_ITEMS.length}</span>
      </div>
      <div className="divide-y divide-border">
        {BATCH_ITEMS.map((item, i) => {
          const Icon = item.icon;
          const d = decisions[item.id];
          const isActive = i === current;

          return (
            <div key={item.id} className={cn('flex items-center gap-3 px-4 py-3 text-xs transition-colors', isActive ? 'bg-muted/50' : '')}>
              <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <span className={cn('flex-1 text-foreground', d === 'rejected' && 'line-through text-muted-foreground')}>{item.label}</span>
              {d === 'approved' && <Check className="h-4 w-4 text-emerald-500" />}
              {d === 'rejected' && <X className="h-4 w-4 text-red-500" />}
              {!d && isActive && (
                <div className="flex gap-1.5">
                  <button onClick={() => decide(item.id, 'approved')} className="rounded-md bg-emerald-500/10 px-2 py-1 text-emerald-600 hover:bg-emerald-500/20 transition-colors">✓</button>
                  <button onClick={() => decide(item.id, 'rejected')} className="rounded-md bg-red-500/10 px-2 py-1 text-red-500 hover:bg-red-500/20 transition-colors">✗</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Search Result Cards ──────────────────────────────────────────────────────

function SearchResultCards({ size }: { size: Size }) {
  const count = size === 'xs' ? 2 : size === 'sm' ? 3 : 5;
  return (
    <div className="space-y-2">
      {SEARCH_RESULTS.slice(0, count).map((r) => (
        <div key={r.id} className="rounded-lg border border-border p-3">
          <div className="mb-1 flex items-start gap-2">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 to-violet-700 text-[9px] font-bold text-white">{r.rank}</div>
            <p className="text-xs font-medium text-foreground leading-snug">{r.title}</p>
          </div>
          <p className="mb-1 text-[10px] text-muted-foreground">{r.venue}, {r.year}</p>
          {(size === 'md' || size === 'lg') && <p className="mb-2 text-[11px] leading-relaxed text-muted-foreground line-clamp-2">{r.snippet}</p>}
          <div className="flex items-center gap-2">
            <div className="h-1 flex-1 rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full bg-violet-400" style={{ width: `${r.relevance * 100}%` }} />
            </div>
            <span className="text-[10px] text-muted-foreground">{Math.round(r.relevance * 100)}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Shared Primitives Palette ────────────────────────────────────────────────

function SharedPrimitives({ size }: { size: Size }) {
  const [approvals, setApprovals] = useState<Record<string, 'pending' | 'approved' | 'rejected'>>({
    a: 'pending', b: 'pending', c: 'pending',
  });

  const ACCENT_SWATCHES = [
    { label: 'Violet', color: 'bg-violet-400' },
    { label: 'Amber',  color: 'bg-amber-400' },
    { label: 'Blue',   color: 'bg-blue-400' },
    { label: 'Emerald',color: 'bg-emerald-400' },
    { label: 'Red',    color: 'bg-red-400' },
  ];

  return (
    <div className="space-y-4">
      {/* Accent swatches */}
      <div>
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Accent Colors</p>
        <div className="flex flex-wrap gap-2">
          {ACCENT_SWATCHES.map((s) => (
            <div key={s.label} className="flex items-center gap-1.5">
              <span className={cn('h-3 w-3 rounded-full', s.color)} />
              <span className="text-[10px] text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Approval badges */}
      <div>
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Approval Badges</p>
        <div className="flex gap-2">
          {(['pending', 'approved', 'rejected'] as const).map((s) => (
            <span key={s} className={cn(
              'rounded-full px-2 py-0.5 text-[10px] font-medium capitalize',
              s === 'approved' ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600' :
              s === 'rejected' ? 'bg-red-100 dark:bg-red-900/40 text-red-500' :
              'bg-amber-100 dark:bg-amber-900/40 text-amber-600',
            )}>{s}</span>
          ))}
        </div>
      </div>

      {/* Approve/Reject row */}
      <div>
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Approve / Reject</p>
        <div className="space-y-1.5">
          {(['a', 'b', 'c'] as const).map((k) => (
            <div key={k} className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
              <span className="text-xs text-foreground">Item {k.toUpperCase()}</span>
              {approvals[k] === 'pending' ? (
                <div className="flex gap-1.5">
                  <button onClick={() => setApprovals(p => ({...p, [k]: 'approved'}))} className="rounded-md bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-600 hover:bg-emerald-500/20">Approve</button>
                  <button onClick={() => setApprovals(p => ({...p, [k]: 'rejected'}))} className="rounded-md bg-red-500/10 px-2 py-1 text-[10px] font-medium text-red-500 hover:bg-red-500/20">Reject</button>
                </div>
              ) : (
                <span className={cn('text-xs font-medium capitalize', approvals[k] === 'approved' ? 'text-emerald-600' : 'text-red-500')}>
                  {approvals[k]}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Widget Registry ──────────────────────────────────────────────────────────

export const WIDGET_REGISTRY: WidgetDemoConfig[] = [
  {
    id: 'hitl-cards',
    label: 'Chat HITL Cards',
    description: 'Human-in-the-loop interrupt cards rendered inline in chat. Three variants: search result approval, citation review, and writing confirmation.',
    group: 'Subagent',
    Content: ({ size }) => (
      <div className="space-y-1">
        {DEMO_HITL_CARDS.map((c) => <HitlCard key={c.id} config={c} />)}
      </div>
    ),
  },
  {
    id: 'agent-status',
    label: 'Subagent Card Status',
    description: 'A status card component with 6 discrete states: idle, running, completed, error, skipped, cancelled.',
    group: 'Subagent',
    supportsLiveData: true,
    Content: ({ size, liveData }) => {
      const [idx, setIdx] = useState(0);
      useEffect(() => {
        if (!liveData) return;
        const t = setInterval(() => setIdx((i) => (i + 1) % AGENT_STATUS_CYCLE.length), 1500);
        return () => clearInterval(t);
      }, [liveData]);
      const count = size === 'xs' ? 3 : 6;
      return (
        <div className="space-y-1.5">
          {AGENT_STATUS_CYCLE.slice(0, count).map((s) => (
            <SubagentStatusCard key={s} status={liveData ? AGENT_STATUS_CYCLE[idx] : s} label={`Agent: ${s}`} detail="Climate Policy workspace" size={size} />
          ))}
        </div>
      );
    },
  },
  {
    id: 'mini-trace',
    label: 'MiniTrace',
    description: 'Step-by-step trace renderer showing thought → action → result blocks. Three variants: search, write, web-read.',
    group: 'Subagent',
    Content: ({ size }) => (
      <div className="space-y-4">
        {['search', 'write', 'web-read'].map((v) => (
          <div key={v}>
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{v}</p>
            <MiniTrace variant={v} size={size} />
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'ai-scale',
    label: 'AI Generation Scale',
    description: 'An ordinal 5-segment scale from Human to AI indicating how much AI involvement was present.',
    group: 'Subagent',
    Content: ({ size }) => (
      <div className="space-y-4">
        <AiScale value={0} size={size} />
        <AiScale value={2} size={size} />
        <AiScale value={4} size={size} />
      </div>
    ),
  },
  {
    id: 'context-items',
    label: 'Context Items',
    description: 'Pill chips representing context attached to an agent run — notes, files, and URLs.',
    group: 'Subagent',
    Content: ({ size }) => <ContextItems size={size} />,
  },
  {
    id: 'qa-flow',
    label: 'QA Flow',
    description: 'Multi-question card with short answer, single choice, multi-select, and always-visible other field.',
    group: 'QA',
    Content: ({ size }) => <QAFlow size={size} />,
  },
  {
    id: 'writing-agent',
    label: 'Writing Agent',
    description: 'Compound widget for Create/Edit document agent states with 6 status states, args display, and evidence notes.',
    group: 'Writing',
    supportsLiveData: true,
    Content: ({ size, liveData }) => <WritingAgent size={size} liveData={liveData} />,
  },
  {
    id: 'research-agent',
    label: 'Research Agent',
    description: 'Three variants: Create (new session), Followup (continue), ReadUrl (single URL). All status states.',
    group: 'Research',
    Content: ({ size }) => <ResearchAgent size={size} />,
  },
  {
    id: 'batch',
    label: 'Kitchen Sink Batch',
    description: 'Approval batch card with mixed agent items. Step through approve/reject each with auto-advance.',
    group: 'Batch',
    Content: ({ size }) => <KitchenSinkBatch size={size} />,
  },
  {
    id: 'search-cards',
    label: 'Search Result Cards',
    description: 'Result cards with rank squircle, metadata, snippet, and relevance bar.',
    group: 'Review',
    Content: ({ size }) => <SearchResultCards size={size} />,
  },
  {
    id: 'shared-primitives',
    label: 'Shared Primitives',
    description: 'Palette of design tokens: accent swatches, approval badge variants, approve/reject rows.',
    group: 'Shared',
    Content: ({ size }) => <SharedPrimitives size={size} />,
  },
];

export const WIDGET_GROUPS: WidgetGroup[] = ['Subagent', 'QA', 'Writing', 'Research', 'Batch', 'Review', 'Shared'];
