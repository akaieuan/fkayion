import { cn } from '@/lib/utils';

// ─── Section wrapper ──────────────────────────────────────────────────────────

export function Section({
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

export function Card({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
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
