import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Section, Card } from '@/components/features/demo/hitl-ai/sheet/shared';

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

export function MiniTraceSection() {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const toggle = (i: number) =>
    setExpanded((p) => {
      const n = new Set(p);
      if (n.has(i)) n.delete(i);
      else n.add(i);
      return n;
    });

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
