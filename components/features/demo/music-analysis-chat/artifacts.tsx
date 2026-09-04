import { ART } from '@/components/product-replicas/music-chat-comp/data/artists'
import { POSTS, CREATORS } from '@/components/product-replicas/music-chat-comp/data/social'
import { RStats } from '@/components/product-replicas/music-chat-comp/blocks/RStats'
import { RChart } from '@/components/product-replicas/music-chat-comp/blocks/RChart'
import { RComp } from '@/components/product-replicas/music-chat-comp/blocks/RComp'
import { RCreators } from '@/components/product-replicas/music-chat-comp/blocks/RCreators'
import { REmail } from '@/components/product-replicas/music-chat-comp/blocks/REmail'
import { RSocialEmbed } from '@/components/product-replicas/music-chat-comp/blocks/RSocialEmbed'

/**
 * The write-up reaches past the article's measure for the specimens, the way
 * the product cards on /demo/ubik do. An artifact is a piece of interface with
 * six stat cells across it; squeezed into a 640px column it stops being a
 * specimen and becomes a picture of one. See `.aka-breakout`.
 */

/**
 * A specimen is the real component, not a screenshot of it.
 *
 * Every block below is the same module the demo renders, imported here and
 * given the same payload the mock API hands back for that question. Nothing is
 * redrawn for the write-up, so a specimen cannot drift from the thing it
 * documents: change the component and this page changes with it.
 *
 * They cost the page nothing. Six of the seven block types are pure — props in,
 * markup out, no state — so they render on the server and ship no JavaScript.
 * The seventh, the action row, is the one that has a click handler, and it is
 * the one deliberately left out here: a row of buttons that ask the agent a
 * follow-up has nothing to do on a page with no agent behind it.
 */
function Specimen({
  name,
  type,
  note,
  children,
}: {
  name: string
  type: string
  note: string
  children: React.ReactNode
}) {
  return (
    <figure className="mb-5 break-inside-avoid">
      <div className="aka-card px-4 pb-4 pt-3">
        <div className="mb-1 flex items-baseline justify-between gap-3">
          <span className="text-[11px] font-medium text-foreground/85">{name}</span>
          <code className="font-mono text-[10px] text-muted-foreground/60">{type}</code>
        </div>
        {children}
      </div>
      <figcaption className="mt-2 text-[11px] font-light leading-relaxed text-muted-foreground/70">
        {note}
      </figcaption>
    </figure>
  )
}

const OVERMONO = ART[0]

/** The artifacts row: six specimens rendered by the demo's own components. Moved verbatim from app/demo/music-analysis-chat/page.tsx. */
export function ArtifactsSection() {
  return (
        <div className="aka-breakout mt-12">
          <p className="aka-kicker">The artifacts</p>
          <p className="mt-2 max-w-xl text-[12px] font-light leading-relaxed text-muted-foreground/70">
            Six block types, rendered here by the same components the demo uses, holding the same
            payloads the fixture returns. These are the real thing, not pictures of it.
          </p>

          <div className="mt-6 columns-1 gap-5 lg:columns-2">
            <Specimen
              name="Headline numbers"
              type="stats"
              note="The first thing back on almost every question. Four to six cells, each with a value, an optional delta, and an optional benchmark underneath, because a number without its comparison is the thing people misread."
            >
              <RStats
                stats={[
                  { label: 'Total Saves', value: OVERMONO.saves, delta: OVERMONO.delta, up: OVERMONO.up },
                  { label: 'Save Rate', value: OVERMONO.sr, delta: '+0.6pp vs avg', up: true },
                  { label: 'Top Song', value: `${OVERMONO.songs[0]?.rate ?? 0}%`, sub: OVERMONO.songs[0]?.name },
                  { label: 'Playlists', value: OVERMONO.pl.toLocaleString() },
                ]}
              />
            </Specimen>

            <Specimen
              name="One series, one question"
              type="chart"
              note="Deliberately the least capable chart I could ship: labelled bars, one series, no axes to read. Anything richer invites the agent to answer a question nobody asked."
            >
              <RChart
                title="Saves by Song (K)"
                bars={OVERMONO.songs.map((s) => ({ label: s.name, value: s.sav }))}
              />
            </Specimen>

            <Specimen
              name="Ranked comparison"
              type="comparison"
              note="For anything that is really a ranking. Each row carries the label, the sub-label that says why it ranks there, and the raw figure, so the bar is a reading aid rather than the only evidence."
            >
              <RComp
                title="Save Rate by Artist"
                rows={ART.slice(0, 6)
                  .sort((a, b) => parseFloat(b.sr) - parseFloat(a.sr))
                  .map((a) => ({
                    label: a.name,
                    sub: a.genre,
                    value: parseFloat(a.sr),
                    max: 10,
                    accent: parseFloat(a.sr) > 7,
                    meta: `${a.saves} saves`,
                  }))}
              />
            </Specimen>

            <Specimen
              name="Creator roster"
              type="creators"
              note="The answer to who should we contact. Followers alone is the wrong sort key, so engagement, location and asking price sit on the card and the reply leads with the bracket that converts rather than the biggest account."
            >
              <RCreators creators={CREATORS.slice(0, 3)} />
            </Specimen>

            <Specimen
              name="Drafted outreach"
              type="email"
              note="A draft with its merge fields still showing. The agent is proposing a send, not performing one, and leaving the placeholders visible is how the draft says so."
            >
              <REmail
                email={{
                  sender: 'collab@yourlabel.com',
                  to: `${CREATORS.length} creators (bulk)`,
                  subject: `${OVERMONO.name} — New Release Promo Collab`,
                  body: `Hi {{creator_name}},\n\nWe've been following your content and think you'd be a great fit to help promote ${OVERMONO.name}'s upcoming release.\n\nHere's what we're looking for:\n- 1 TikTok using the sound "${OVERMONO.songs[0]?.name ?? 'new track'}"\n- Post within 7 days of release\n- Creative freedom on concept\n\nCompensation: {{rate}}\nBrief & assets: {{collab_link}}\n\nLet us know if you're interested!\n\nBest,\nTeam`,
                }}
              />
            </Specimen>

            <Specimen
              name="Source posts"
              type="social"
              note="Cited evidence, in the shape people already read it. A claim about a sound trending is worth very little without the three posts it came from, and the sound name on the card is what ties the clip back to the catalogue row."
            >
              <div className="flex gap-2 overflow-x-auto pb-1">
                {POSTS.slice(0, 3).map((p) => (
                  <RSocialEmbed key={p.id} post={p} compact />
                ))}
              </div>
            </Specimen>
          </div>
        </div>
  )
}
