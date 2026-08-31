import { useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Section, Card } from '@/components/features/demo/hitl-ai/sheet/chrome';

// ─── Context Items ─────────────────────────────────────────────────────────────

const CONTEXT_SEEDS = [
  { id: 'c1', color: 'bg-violet-400', label: 'AR6 temperature finding' },
  { id: 'c2', color: 'bg-blue-400',   label: 'IPCC AR6 Synthesis.pdf' },
  { id: 'c3', color: 'bg-emerald-400',label: 'eu-ets.europa.eu' },
  { id: 'c4', color: 'bg-amber-400',  label: 'Price corridor note' },
  { id: 'c5', color: 'bg-blue-400',   label: 'Carbon Markets 2024.pdf' },
];

export function ContextItemsSection() {
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
