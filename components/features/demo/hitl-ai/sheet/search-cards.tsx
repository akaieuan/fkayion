import { SEARCH_RESULTS } from '@/components/product-replicas/hitl-ai/data';
import { Section, Card } from '@/components/features/demo/hitl-ai/sheet/shared';

// ─── Search results ───────────────────────────────────────────────────────────

export function SearchCardsSection() {
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
