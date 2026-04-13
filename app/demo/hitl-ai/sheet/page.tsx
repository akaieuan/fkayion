'use client';

import { useState, useEffect } from 'react';
import { Search, AlertCircle, PenLine, Check, X,
  ChevronRight, ChevronDown, Bot, UserRound, FileText, Globe,
  GraduationCap, ClipboardList, ListChecks, Cpu, Loader2,
  SkipForward, AlertOctagon, Ban, ZoomIn, ZoomOut,
  ChevronLeft, Plus, File,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { HitlCard, DEMO_HITL_CARDS } from '@/components/demo/hitl-ai/HitlCard';
import { SEARCH_RESULTS, DOWNLOAD_PAPERS, BIBLIOGRAPHY_ENTRIES } from '@/components/demo/hitl-ai/data';
import { NOTES_GROUPS } from '@/components/demo/hitl-ai/notes-shared';
import type { AgentStatus, RightTab } from '@/components/demo/hitl-ai/types';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({
  id, label, description, children, cols = 1,
}: {
  id: string;
  label: string;
  description: string;
  children: React.ReactNode;
  cols?: 1 | 2 | 3;
}) {
  return (
    <section id={id} className="scroll-mt-16 border-b border-border pb-12 pt-10">
      <div className="mb-6">
        <h2 className="text-base font-medium text-foreground">{label}</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
      </div>
      <div className={cn(
        'grid gap-4',
        cols === 2 && 'grid-cols-1 md:grid-cols-2',
        cols === 3 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      )}>
        {children}
      </div>
    </section>
  );
}

function Card({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border/80 bg-card overflow-hidden">
      <div className="border-b border-border/60 bg-muted/20 backdrop-blur-sm px-4 py-2.5">
        <p className="text-xs font-medium text-foreground">{label}</p>
        {hint && <p className="text-[10px] text-muted-foreground mt-0.5">{hint}</p>}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

// ─── HITL Card variants ───────────────────────────────────────────────────────

function HitlSection() {
  return (
    <Section
      id="hitl"
      label="HITL Interrupt Cards"
      description="Human-in-the-loop interrupt cards rendered inline in a chat thread. Three semantic variants — each has idle, expanded, confirmed, and dismissed states."
      cols={3}
    >
      {DEMO_HITL_CARDS.map((c) => (
        <Card
          key={c.id}
          label={c.kind.charAt(0).toUpperCase() + c.kind.slice(1)}
          hint={`kind="${c.kind}" — click to expand`}
        >
          <HitlCard config={c} />
        </Card>
      ))}
    </Section>
  );
}

// ─── Subagent status ──────────────────────────────────────────────────────────

const STATUS_META: Record<AgentStatus, { icon: React.ElementType; color: string }> = {
  idle:      { icon: Cpu,          color: 'text-muted-foreground' },
  running:   { icon: Loader2,      color: 'text-blue-500' },
  completed: { icon: Check,        color: 'text-emerald-500' },
  error:     { icon: AlertOctagon, color: 'text-red-500' },
  skipped:   { icon: SkipForward,  color: 'text-amber-500' },
  cancelled: { icon: Ban,          color: 'text-muted-foreground' },
};

function AgentStatusSection() {
  const statuses = Object.entries(STATUS_META) as [AgentStatus, typeof STATUS_META[AgentStatus]][];

  return (
    <Section
      id="agent-status"
      label="Subagent Status Cards"
      description="Six discrete agent execution states. The running state animates. Use in any card that wraps an in-progress agentic task."
      cols={2}
    >
      {statuses.map(([status, meta]) => {
        const Icon = meta.icon;
        return (
          <Card key={status} label={status.charAt(0).toUpperCase() + status.slice(1)} hint={`status="${status}"`}>
            <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 px-3 py-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted">
                <Icon className={cn('h-3.5 w-3.5', meta.color, status === 'running' && 'animate-spin')} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground">Research Agent</p>
                <p className="text-[10px] text-muted-foreground">Climate Policy workspace</p>
              </div>
              <span className={cn('text-[10px] font-medium capitalize', meta.color)}>{status}</span>
            </div>
          </Card>
        );
      })}
    </Section>
  );
}

// ─── MiniTrace ────────────────────────────────────────────────────────────────

const TRACE_STEPS = [
  { type: 'thought' as const, label: 'Determine search strategy', detail: 'Analyzing query intent and relevant databases' },
  { type: 'action'  as const, label: 'Execute semantic search',   detail: 'Query: "carbon pricing" → 177 results' },
  { type: 'result'  as const, label: 'Ranked results ready',      detail: 'Top 5 results surfaced with relevance scores' },
];

const TRACE_COLORS = {
  thought: { dot: 'bg-violet-400', border: 'border-violet-200 dark:border-violet-800', bg: 'bg-violet-50 dark:bg-violet-950/20' },
  action:  { dot: 'bg-blue-400',   border: 'border-blue-200 dark:border-blue-800',     bg: 'bg-blue-50 dark:bg-blue-950/20' },
  result:  { dot: 'bg-emerald-400',border: 'border-emerald-200 dark:border-emerald-800',bg: 'bg-emerald-50 dark:bg-emerald-950/20' },
};

function MiniTraceSection() {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const toggle = (i: number) => setExpanded(p => { const n = new Set(p); n.has(i) ? n.delete(i) : n.add(i); return n; });

  return (
    <Section
      id="trace"
      label="MiniTrace"
      description="Step-by-step thought → action → result trace renderer. Each step is collapsible to reveal detail. Used to make agent reasoning transparent."
    >
      <Card label="Search trace" hint="3 steps — click any row to expand">
        <div className="space-y-1.5">
          {TRACE_STEPS.map((step, i) => {
            const c = TRACE_COLORS[step.type];
            return (
              <div key={i} className={cn('rounded-lg border px-3 py-2 text-xs', c.border, c.bg)}>
                <button onClick={() => toggle(i)} className="flex w-full items-center gap-2 text-left">
                  <span className={cn('h-2 w-2 shrink-0 rounded-full', c.dot)} />
                  <span className="flex-1 font-medium text-foreground capitalize">{step.type}: {step.label}</span>
                  {expanded.has(i)
                    ? <ChevronDown className="h-3 w-3 shrink-0 text-muted-foreground" />
                    : <ChevronRight className="h-3 w-3 shrink-0 text-muted-foreground" />}
                </button>
                {expanded.has(i) && (
                  <p className="mt-1 pl-4 text-[11px] text-muted-foreground">{step.detail}</p>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </Section>
  );
}

// ─── AI Generation Scale ──────────────────────────────────────────────────────

function AiScaleSection() {
  const labels = ['Human', 'Mostly Human', 'Collaborative', 'Mostly AI', 'AI'];
  const colors  = ['bg-emerald-400', 'bg-teal-400', 'bg-yellow-400', 'bg-orange-400', 'bg-red-400'];
  const [values, setValues] = useState([0, 2, 4]);

  return (
    <Section
      id="ai-scale"
      label="AI Generation Scale"
      description="5-segment ordinal scale indicating AI involvement in a piece of work. Interactive — click any segment to select. Shows multiple configurations."
      cols={1}
    >
      <Card label="Three configurations" hint="Click segments to adjust">
        <div className="space-y-5">
          {values.map((v, idx) => (
            <div key={idx}>
              <div className="mb-1.5 flex gap-1">
                {labels.map((l, i) => (
                  <button
                    key={i}
                    onClick={() => setValues(vals => vals.map((x, j) => j === idx ? i : x))}
                    className={cn(
                      'flex-1 rounded-md border-2 py-1.5 text-center text-[10px] font-semibold transition-all',
                      v === i ? `${colors[i]} border-transparent text-white` : 'border-border text-muted-foreground hover:border-foreground/30',
                    )}
                  >
                    {l}
                  </button>
                ))}
              </div>
              <p className="text-center text-[10px] text-muted-foreground">Current: {labels[v]}</p>
            </div>
          ))}
        </div>
      </Card>
    </Section>
  );
}

// ─── Context Items ─────────────────────────────────────────────────────────────

const CONTEXT_SEEDS = [
  { id: 'c1', color: 'bg-violet-400', label: 'AR6 temperature finding' },
  { id: 'c2', color: 'bg-blue-400',   label: 'IPCC AR6 Synthesis.pdf' },
  { id: 'c3', color: 'bg-emerald-400',label: 'eu-ets.europa.eu' },
  { id: 'c4', color: 'bg-amber-400',  label: 'Price corridor note' },
  { id: 'c5', color: 'bg-blue-400',   label: 'Carbon Markets 2024.pdf' },
];

function ContextItemsSection() {
  const [items, setItems] = useState(CONTEXT_SEEDS);
  const remove = (id: string) => setItems(p => p.filter(x => x.id !== id));
  const reset  = () => setItems(CONTEXT_SEEDS);

  return (
    <Section
      id="context"
      label="Context Item Chips"
      description="Pill chips representing context attached to an agent run — notes, files, and URLs. Removable. Overflow truncation built in."
      cols={1}
    >
      <Card label="Context strip" hint="Click × to remove chips">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {items.map(item => (
              <div key={item.id} className="flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-2 py-0.5 text-xs text-foreground">
                <span className={cn('h-2 w-2 shrink-0 rounded-full', item.color)} />
                <span>{item.label}</span>
                <button onClick={() => remove(item.id)} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X className="h-2.5 w-2.5" />
                </button>
              </div>
            ))}
            {items.length === 0 && (
              <span className="text-xs text-muted-foreground italic">All removed —</span>
            )}
            <button onClick={reset} className="text-[10px] text-muted-foreground underline underline-offset-2 hover:text-foreground">
              reset
            </button>
          </div>
        </div>
      </Card>
    </Section>
  );
}

// ─── QA Flow ──────────────────────────────────────────────────────────────────

function QASection() {
  const [choice, setChoice] = useState('');
  const [multi, setMulti]   = useState<Set<string>>(new Set());
  const [other, setOther]   = useState('');
  const [done, setDone]     = useState(false);
  const toggle = (o: string) => setMulti(p => { const n = new Set(p); n.has(o) ? n.delete(o) : n.add(o); return n; });
  const single = ['Carbon pricing', 'Regulation', 'Voluntary markets', 'Technology mandates'];
  const multi_  = ['Stakeholder alignment', 'Monitoring & verification', 'Political feasibility', 'Cost-effectiveness'];

  return (
    <Section
      id="qa"
      label="QA Flow"
      description="Multi-question approval card: short answer, single-choice, multi-select, and a freeform other field. Submits to a confirmed state."
      cols={1}
    >
      <Card label="QA form" hint="Fill out and hit Continue">
        {done ? (
          <div className="flex items-center gap-2 rounded-lg border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/20 p-3 text-sm font-medium text-emerald-700 dark:text-emerald-300">
            <Check className="h-4 w-4" /> Responses submitted
            <button onClick={() => { setDone(false); setChoice(''); setMulti(new Set()); setOther(''); }} className="ml-auto text-[10px] underline underline-offset-2 opacity-60 hover:opacity-100">reset</button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="mb-1.5 text-xs font-medium text-foreground">Preferred mechanism?</p>
              <div className="space-y-1">
                {single.map(o => (
                  <button key={o} onClick={() => setChoice(o)} className={cn(
                    'flex w-full items-center gap-2 rounded-md border px-3 py-2 text-xs transition-colors',
                    choice === o ? 'border-primary bg-primary/5 text-foreground' : 'border-border text-muted-foreground hover:bg-muted',
                  )}>
                    <div className={cn('h-3 w-3 shrink-0 rounded-full border', choice === o ? 'border-primary bg-primary' : 'border-muted-foreground')} />
                    {o}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-1.5 text-xs font-medium text-foreground">Implementation challenges?</p>
              <div className="space-y-1">
                {multi_.map(o => (
                  <button key={o} onClick={() => toggle(o)} className={cn(
                    'flex w-full items-center gap-2 rounded-md border px-3 py-2 text-xs transition-colors',
                    multi.has(o) ? 'border-primary bg-primary/5 text-foreground' : 'border-border text-muted-foreground hover:bg-muted',
                  )}>
                    <div className={cn('flex h-3 w-3 shrink-0 items-center justify-center rounded', multi.has(o) ? 'bg-primary' : 'border border-muted-foreground')}>
                      {multi.has(o) && <Check className="h-2 w-2 text-primary-foreground" />}
                    </div>
                    {o}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-1 text-xs font-medium text-foreground">Other notes</p>
              <textarea className="w-full resize-none rounded-lg border border-border bg-muted/30 px-3 py-2 text-xs outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-ring" rows={2} placeholder="Any additional context…" value={other} onChange={e => setOther(e.target.value)} />
            </div>
            <button onClick={() => setDone(true)} className="w-full rounded-lg bg-primary py-2 text-xs font-medium text-primary-foreground hover:opacity-90 transition-opacity">Continue</button>
          </div>
        )}
      </Card>
    </Section>
  );
}

// ─── Search results ───────────────────────────────────────────────────────────

function SearchCardsSection() {
  return (
    <Section
      id="search-cards"
      label="Search Result Cards"
      description="Ranked result cards with gradient rank indicator, metadata, snippet, and relevance bar. Used in the Search right panel."
      cols={2}
    >
      {SEARCH_RESULTS.slice(0, 4).map(r => (
        <Card key={r.id} label={`Result #${r.rank}`} hint={`${r.venue}, ${r.year} · ${Math.round(r.relevance * 100)}% relevance`}>
          <div>
            <p className="mb-1 text-xs font-medium text-foreground leading-snug">{r.title}</p>
            <p className="mb-1 text-[10px] text-muted-foreground">{r.authors}</p>
            <p className="mb-2 text-[11px] leading-relaxed text-muted-foreground line-clamp-2">{r.snippet}</p>
            <div className="flex items-center gap-2">
              <div className="h-1 flex-1 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-violet-400 transition-all" style={{ width: `${r.relevance * 100}%` }} />
              </div>
              <span className="text-[10px] text-muted-foreground">{Math.round(r.relevance * 100)}%</span>
            </div>
          </div>
        </Card>
      ))}
    </Section>
  );
}

// ─── Approval states ──────────────────────────────────────────────────────────

function ApprovalSection() {
  type S = 'pending' | 'approved' | 'rejected';
  const [states, setStates] = useState<S[]>(['pending', 'pending', 'pending', 'pending']);
  const set = (i: number, s: S) => setStates(p => p.map((x, j) => j === i ? s : x));

  const items = [
    { label: 'Verify citation accuracy',      meta: 'IPCC 2023 · p. 12',     accent: 'bg-amber-400' },
    { label: 'Confirm highlighted quote',      meta: 'Policy Brief §3.1',      accent: 'bg-violet-400' },
    { label: 'Approve section for export',     meta: 'Writing · Section 2',    accent: 'bg-emerald-400' },
    { label: 'Download: Carbon Pricing paper', meta: 'Nature Climate, 2023',   accent: 'bg-blue-400' },
  ];

  return (
    <Section
      id="approval"
      label="Approve / Reject Pattern"
      description="The core binary decision row used across review, download, and notes panels. Three terminal states: pending, approved, rejected."
      cols={2}
    >
      {items.map((item, i) => (
        <Card key={i} label={item.label} hint={item.meta}>
          <div className="flex items-center gap-3">
            <div className={cn('w-1 self-stretch rounded-full shrink-0', item.accent)} />
            <div className="flex-1">
              {states[i] === 'pending' ? (
                <div className="flex gap-1.5">
                  <button onClick={() => set(i, 'approved')} className="flex items-center gap-1 rounded-md bg-emerald-500/10 px-2.5 py-1.5 text-xs font-medium text-emerald-600 hover:bg-emerald-500/20 transition-colors">
                    <Check className="h-3 w-3" /> Approve
                  </button>
                  <button onClick={() => set(i, 'rejected')} className="flex items-center gap-1 rounded-md bg-red-500/10 px-2.5 py-1.5 text-xs font-medium text-red-500 hover:bg-red-500/20 transition-colors">
                    <X className="h-3 w-3" /> Reject
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className={cn('text-xs font-medium capitalize', states[i] === 'approved' ? 'text-emerald-600' : 'text-red-500')}>
                    {states[i]}
                  </span>
                  <button onClick={() => set(i, 'pending')} className="text-[10px] text-muted-foreground underline underline-offset-2 hover:text-foreground">undo</button>
                </div>
              )}
            </div>
          </div>
        </Card>
      ))}
    </Section>
  );
}

// ─── Batch approval ───────────────────────────────────────────────────────────

const BATCH = [
  { type: 'search',   label: 'Search: carbon pricing 2024',   icon: Search },
  { type: 'write',    label: 'Write: Section 2 introduction',  icon: PenLine },
  { type: 'research', label: 'Research: IPCC AR6 findings',     icon: GraduationCap },
  { type: 'qa',       label: 'QA: Verify citation accuracy',    icon: ClipboardList },
  { type: 'web',      label: 'Read: eu-ets.europa.eu',          icon: Globe },
];

function BatchSection() {
  const [decisions, setDecisions] = useState<Record<string, 'approved' | 'rejected' | null>>(
    Object.fromEntries(BATCH.map(b => [b.type, null]))
  );
  const [current, setCurrent] = useState(0);
  const decide = (type: string, d: 'approved' | 'rejected') => {
    setDecisions(p => ({ ...p, [type]: d }));
    setCurrent(c => Math.min(c + 1, BATCH.length));
  };
  const reset = () => { setDecisions(Object.fromEntries(BATCH.map(b => [b.type, null]))); setCurrent(0); };
  const all = Object.values(decisions).every(d => d !== null);
  const approved = Object.values(decisions).filter(d => d === 'approved').length;

  return (
    <Section
      id="batch"
      label="Batch Approval Queue"
      description="Sequential approve/reject flow across mixed agent items. Auto-advances to the next item. Resolves to a summary state."
    >
      <Card label="Kitchen sink batch" hint="5 items — step through each decision">
        {all ? (
          <div className="space-y-3 text-center">
            <Check className="mx-auto h-8 w-8 text-emerald-500" />
            <div>
              <p className="text-sm font-semibold text-foreground">Batch complete</p>
              <p className="text-xs text-muted-foreground mt-0.5">{approved} approved · {BATCH.length - approved} rejected</p>
            </div>
            <button onClick={reset} className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground">Reset</button>
          </div>
        ) : (
          <div className="divide-y divide-border rounded-lg border border-border overflow-hidden">
            {BATCH.map((item, i) => {
              const Icon = item.icon;
              const d = decisions[item.type];
              const isActive = i === current;
              return (
                <div key={item.type} className={cn('flex items-center gap-3 px-3 py-2.5 text-xs transition-colors', isActive && 'bg-muted/50')}>
                  <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  <span className={cn('flex-1 text-foreground', d === 'rejected' && 'line-through text-muted-foreground')}>{item.label}</span>
                  {d === 'approved' && <Check className="h-4 w-4 text-emerald-500 shrink-0" />}
                  {d === 'rejected' && <X className="h-4 w-4 text-red-500 shrink-0" />}
                  {!d && isActive && (
                    <div className="flex gap-1.5 shrink-0">
                      <button onClick={() => decide(item.type, 'approved')} className="rounded-md bg-emerald-500/10 px-2 py-1 text-emerald-600 hover:bg-emerald-500/20 transition-colors">✓</button>
                      <button onClick={() => decide(item.type, 'rejected')} className="rounded-md bg-red-500/10 px-2 py-1 text-red-500 hover:bg-red-500/20 transition-colors">✗</button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </Section>
  );
}

// ─── Design tokens ─────────────────────────────────────────────────────────────

function TokensSection() {
  const accents = [
    { name: 'Search / Violet', dot: 'bg-violet-400', bg: 'bg-violet-50 dark:bg-violet-950/20', text: 'text-violet-700 dark:text-violet-300', border: 'border-violet-200 dark:border-violet-800' },
    { name: 'Review / Amber',  dot: 'bg-amber-400',  bg: 'bg-amber-50 dark:bg-amber-950/20',   text: 'text-amber-700 dark:text-amber-300',   border: 'border-amber-200 dark:border-amber-800' },
    { name: 'Write / Blue',    dot: 'bg-blue-400',   bg: 'bg-blue-50 dark:bg-blue-950/20',     text: 'text-blue-700 dark:text-blue-300',     border: 'border-blue-200 dark:border-blue-800' },
    { name: 'Approved',        dot: 'bg-emerald-400',bg: 'bg-emerald-50 dark:bg-emerald-950/20',text:'text-emerald-700 dark:text-emerald-300',border: 'border-emerald-200 dark:border-emerald-800' },
    { name: 'Rejected',        dot: 'bg-red-400',    bg: 'bg-red-50 dark:bg-red-950/20',       text: 'text-red-700 dark:text-red-300',       border: 'border-red-200 dark:border-red-800' },
  ];

  const tokens = [
    { token: 'bg-background',    desc: 'Page and panel backgrounds' },
    { token: 'bg-card',          desc: 'Elevated surfaces' },
    { token: 'bg-muted',         desc: 'Subtle fills, hover states' },
    { token: 'text-foreground',  desc: 'Primary text' },
    { token: 'text-muted-foreground', desc: 'Labels, secondary text' },
    { token: 'border-border',    desc: 'All dividers and outlines' },
    { token: 'bg-primary',       desc: 'CTAs, send buttons, active states' },
  ];

  return (
    <Section
      id="tokens"
      label="Design Tokens & Accent Colors"
      description="Semantic color system and accent mapping. All tokens are CSS variables from shadcn/ui, resolved automatically in dark mode."
      cols={2}
    >
      <Card label="Accent color map" hint="Kind → color → bg/border/text triplet">
        <div className="space-y-2">
          {accents.map(a => (
            <div key={a.name} className={cn('flex items-center gap-3 rounded-lg border px-3 py-2', a.border, a.bg)}>
              <span className={cn('h-3 w-3 rounded-full shrink-0', a.dot)} />
              <span className={cn('flex-1 text-xs font-medium', a.text)}>{a.name}</span>
              <span className={cn('text-[10px]', a.text)}>bg · border · text</span>
            </div>
          ))}
        </div>
      </Card>

      <Card label="CSS variable reference" hint="All tokens resolve via shadcn/ui globals.css">
        <div className="space-y-1.5">
          {tokens.map(t => (
            <div key={t.token} className="flex items-start gap-3">
              <code className="shrink-0 rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono text-foreground">{t.token}</code>
              <span className="text-[11px] text-muted-foreground">{t.desc}</span>
            </div>
          ))}
        </div>
      </Card>
    </Section>
  );
}

// ─── TOC ─────────────────────────────────────────────────────────────────────

const TOC = [
  { id: 'hitl',         label: 'HITL Interrupt Cards' },
  { id: 'agent-status', label: 'Subagent Status' },
  { id: 'trace',        label: 'MiniTrace' },
  { id: 'ai-scale',     label: 'AI Generation Scale' },
  { id: 'context',      label: 'Context Items' },
  { id: 'qa',           label: 'QA Flow' },
  { id: 'search-cards', label: 'Search Result Cards' },
  { id: 'approval',     label: 'Approve / Reject' },
  { id: 'batch',        label: 'Batch Queue' },
  { id: 'tokens',       label: 'Design Tokens' },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SheetPage() {
  const [active, setActive] = useState('hitl');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    TOC.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex h-full bg-background text-foreground">
      {/* Fixed left TOC */}
      <aside className="hidden lg:flex h-full w-52 shrink-0 flex-col border-r border-border overflow-y-auto sticky top-0">
        <div className="border-b border-border px-4 py-3">
          <p className="text-xs font-medium text-foreground">Component Sheet</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">HITL-AI system · Agatha</p>
        </div>

        <div className="border-b border-border px-3 py-2">
          <Link
            href="/demo"
            className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-colors duration-200"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Projects
          </Link>
        </div>

        <nav className="flex-1 p-2">
          {TOC.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setActive(id)}
              className={cn(
                'block rounded-md px-2 py-1.5 text-xs transition-colors duration-200',
                active === id
                  ? 'bg-muted text-foreground font-medium'
                  : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
              )}
            >
              {label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Scrollable content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border/60 bg-background/70 px-6 py-3 backdrop-blur-lg backdrop-saturate-150">
          <div>
            <h1 className="text-sm font-medium text-foreground">HITL-AI Component Sheet</h1>
            <p className="text-[10px] text-muted-foreground">Interactive reference — all components live</p>
          </div>
          <Link
            href="/demo"
            className="flex h-7 items-center gap-1.5 rounded-md px-2 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200 lg:hidden"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Projects
          </Link>
        </div>

        <div className="mx-auto max-w-4xl px-6 pb-24">
          <HitlSection />
          <AgentStatusSection />
          <MiniTraceSection />
          <AiScaleSection />
          <ContextItemsSection />
          <QASection />
          <SearchCardsSection />
          <ApprovalSection />
          <BatchSection />
          <TokensSection />
        </div>
      </main>
    </div>
  );
}
