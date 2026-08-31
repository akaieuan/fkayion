import { useState } from 'react';
import { Search, PenLine, Check, X, Globe, GraduationCap, ClipboardList } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Section, Card } from '@/components/features/demo/hitl-ai/sheet/chrome';

// ─── Batch approval ───────────────────────────────────────────────────────────

const BATCH = [
  { type: 'search',   label: 'Search: carbon pricing 2024',   icon: Search },
  { type: 'write',    label: 'Write: Section 2 introduction',  icon: PenLine },
  { type: 'research', label: 'Research: IPCC AR6 findings',     icon: GraduationCap },
  { type: 'qa',       label: 'QA: Verify citation accuracy',    icon: ClipboardList },
  { type: 'web',      label: 'Read: eu-ets.europa.eu',          icon: Globe },
];

export function BatchSection() {
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
