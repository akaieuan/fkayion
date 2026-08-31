import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Section, Card } from '@/components/features/demo/hitl-ai/sheet/chrome';

// ─── Approval states ──────────────────────────────────────────────────────────

export function ApprovalSection() {
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
