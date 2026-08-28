import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { DemoImage } from '@/components/ui/demo-image'
import { demoMetadata, demoSchema } from '@/lib/demo-seo'
import { JsonLd } from '@/components/seo/json-ld'
import { ART } from '@/components/demo/music-chat-comp/data/artists'
import { POSTS, CREATORS } from '@/components/demo/music-chat-comp/data/social'
import { RStats } from '@/components/demo/music-chat-comp/blocks/RStats'
import { RChart } from '@/components/demo/music-chat-comp/blocks/RChart'
import { RComp } from '@/components/demo/music-chat-comp/blocks/RComp'
import { RCreators } from '@/components/demo/music-chat-comp/blocks/RCreators'
import { REmail } from '@/components/demo/music-chat-comp/blocks/REmail'
import { RSocialEmbed } from '@/components/demo/music-chat-comp/blocks/RSocialEmbed'

const PATH = '/demo/music-analysis-chat'

export const metadata = demoMetadata(PATH, {
  title: 'Music Analysis Chat — What an Answer Should Look Like',
  description:
    'A roster workspace built to answer one question: when an agent replies about music data, what should come back instead of a paragraph? Six artifact types, four surfaces, and a mock API that always returns the same shapes.',
})

/**
 * The write-up reaches past the article's measure for the specimens, the way
 * the product cards on /demo/ubik do. An artifact is a piece of interface with
 * six stat cells across it; squeezed into a 640px column it stops being a
 * specimen and becomes a picture of one.
 */
const ROW_W = 'min(100vw - 3rem, 1180px)'
const CARD_ROW: React.CSSProperties = {
  width: ROW_W,
  marginInline: `calc((100% - ${ROW_W}) / 2)`,
}

const kicker = 'text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/80'
const h2 = 'text-sm font-medium tracking-wide text-foreground'

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
      <div className="rounded-xl border border-border/70 bg-muted/10 px-4 pb-4 pt-3">
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

export default function MusicAnalysisChatPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-background px-6 py-16">
      <JsonLd
        data={demoSchema(PATH, {
          title: metadata.title as string,
          description: metadata.description as string,
        })}
      />
      <article className="mx-auto max-w-2xl">
        <Link
          href="/demo"
          className="mb-8 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground lg:hidden"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Projects
        </Link>

        <header className="mb-6">
          <p
            className="text-[clamp(1.85rem,5.5vw,2.85rem)] font-extralight leading-none tracking-tight text-balance text-foreground/90"
            aria-label="Music Analysis Chat"
          >
            Music Analysis Chat
          </p>
        </header>

        <div className="-mx-6 overflow-hidden rounded-xl border border-border/80 bg-muted/10 sm:mx-0">
          <DemoImage
            src="/music-chat/workspace.webp"
            alt="The workspace on open: a sidebar of recent threads and campaign projects, the chat column, and five suggested starting points"
            width={1440}
            height={760}
            className="block h-auto w-full"
            priority
          />
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Link
            href="/demo/music-analysis-chat/app"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Open the demo
            <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
          </Link>
        </div>
        <p className="mt-2 text-[12px] font-light text-muted-foreground/80">
          It runs in the browser with no key and no backend. Ask it about saves, social, creators or
          outreach and it answers from a fixture.
        </p>

        <p className={`mt-10 ${kicker}`}>Interactive demo · Mock API</p>
        <h1 className="mt-2 text-2xl font-light tracking-tight text-foreground md:text-[26px]">
          What an answer should look like
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          A roster workspace for a label, built to rehearse rich agent output in a domain I already
          know well.
        </p>

        <div className="mt-10 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
          <section className="space-y-3">
            <h2 className={h2}>Why it exists</h2>
            <p>
              I spent years around music data: save rates, playlist adds, which clip is driving
              which conversion. The questions people actually ask of it are narrow and repetitive.
              How did this release convert. Who is posting with the sound. Who should we send the
              brief to. None of those are answered well by a paragraph of prose, which is what a
              chat interface gives you by default.
            </p>
            <p>
              So this is not a chatbot with music trivia in it. It is an argument about response
              shape: for a question with a known answer type, the agent should return the artifact
              that answers it, and the prose should be the caption rather than the payload.
            </p>
          </section>

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
        </div>

        <div style={CARD_ROW} className="mt-12">
          <p className={kicker}>The artifacts</p>
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

        <div className="mt-10 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
          <section className="space-y-3">
            <h2 className={h2}>Four surfaces, one set of blocks</h2>
            <p>
              Chat is where a question gets asked, but it is a bad place to keep an answer. So the
              same blocks compose into three other surfaces: an analytics view over the whole
              roster, an artist view per act, and a projects view where a campaign collects the
              artifacts it produced. A long answer also opens in a side panel with its full body,
              its table, and its own follow-up row, so a deep dive stops competing with the thread
              it came out of.
            </p>
            <p>
              Artists can be pulled into a question with an <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">@</code>{' '}
              mention, which is the whole context model: the thing being asked about is named, not
              inferred.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={h2}>Why the API is a fixture</h2>
            <p>
              Nothing behind it is real. The API is one function that matches keywords in the
              question and returns a hand-written payload after a short delay. That is the point:
              the work here is the response contract and the surface that renders it, and a real
              model would only add a source of variance to a thing being judged on its shape.
            </p>
            <p>
              It also means the demo has no key, no backend and no rate limit, so it still runs
              exactly as built.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={h2}>What I would keep</h2>
            <p>
              The closed block set, and the rule that prose captions an artifact rather than
              carrying the answer. Both survived into how I build agent surfaces now: name the
              answer types first, build a component per type, and let the model choose among them
              instead of formatting freehand.
            </p>
          </section>

          <section className="rounded-xl border border-border/80 bg-muted/15 px-5 py-4">
            <p className="text-[14px] leading-relaxed text-foreground/85">
              The demo is still here and still runs. It is filed under the write-up rather than
              beside it because the interesting part is not that a chat window works: it is the
              list of things the agent is allowed to hand back.
            </p>
            <Link
              href="/demo/music-analysis-chat/app"
              className="mt-3 inline-flex w-fit items-center gap-2 text-[13px] font-medium text-foreground underline decoration-border underline-offset-[3px] transition-colors hover:decoration-foreground/50"
            >
              Open the demo
              <ArrowUpRight className="h-3.5 w-3.5 opacity-70" aria-hidden />
            </Link>
          </section>
        </div>
      </article>
    </div>
  )
}
