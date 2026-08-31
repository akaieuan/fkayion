import { cn } from '@/lib/utils';
import { Section, Card } from '@/components/features/demo/hitl-ai/sheet/shared';

// ─── Design tokens ─────────────────────────────────────────────────────────────

export function TokensSection() {
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
