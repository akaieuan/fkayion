import { h2 } from '@/components/features/demo/music-analysis-chat/shared'

/** The rule the fixture enforces. Moved verbatim from app/demo/music-analysis-chat/page.tsx. */
export function FixtureRuleSection() {
  return (
          <section className="space-y-3">
            <h2 className={h2}>The rule the fixture enforces</h2>
            <p>
              Every reply is a short piece of text plus an ordered list of blocks, and the block
              types are a closed set. A question about conversion returns stats and a chart. A
              question about social returns stats, embeds, and a next-step row. A question about
              creators returns a roster with engagement and price on every card.
            </p>
            <p>
              Because the set is closed, the surface can be built once and trusted. Nothing has to
              parse markdown at render time and guess whether a table was meant; the agent picked a
              type, and the type has a component.
            </p>
          </section>
  )
}
