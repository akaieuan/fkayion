import { HitlCard, DEMO_HITL_CARDS } from '@/components/replicas/hitl-ai/HitlCard';
import { Section, Card } from '@/components/features/demo/hitl-ai/sheet/chrome';

// ─── HITL Card variants ───────────────────────────────────────────────────────

export function HitlSection() {
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
