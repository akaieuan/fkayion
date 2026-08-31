import { useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Section, Card } from '@/components/features/demo/hitl-ai/sheet/shared';

// ─── QA Flow ──────────────────────────────────────────────────────────────────

export function QASection() {
  const [choice, setChoice] = useState('');
  const [multi, setMulti]   = useState<Set<string>>(new Set());
  const [other, setOther]   = useState('');
  const [done, setDone]     = useState(false);
  const toggle = (o: string) =>
    setMulti((p) => {
      const n = new Set(p);
      if (n.has(o)) n.delete(o);
      else n.add(o);
      return n;
    });
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
