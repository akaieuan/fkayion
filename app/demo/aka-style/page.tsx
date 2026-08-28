import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { PixelHead } from '@/components/features/brand/pixel-head'
import { LAWS, SWATCHES, ACCENTS, USAGE, MARK_FAMILY } from '@/lib/aka-style'
import { demoMetadata, demoSchema } from '@/lib/demo-seo'
import { JsonLd } from '@/components/seo/json-ld'

const PATH = '/demo/aka-style'

export const metadata = demoMetadata(PATH, {
  title: 'akaSTYLE: a design language written as constraints',
  description:
    'The design system behind every project on this site: seven constraints instead of preferences, OKLCH tokens, one type scale, one canvas engine for every brand mark, and server-rendered primitives. Built at Ubik, and now the thing that lets an agent build in my language.',
})

/*
 * This page uses the site's own container rather than a write-up's reading
 * column.
 *
 * It was a max-w-2xl article whose every specimen was a link to another page,
 * which meant the page about the design system was the one place on the site
 * that showed you none of it. The system is wide material — six swatches, a
 * type scale, a family of marks — and the landing and /demo already have the
 * grammar for laying wide material out. Prose keeps a reading measure inside
 * that container; only the specimens use the full width.
 */
const SHELL = 'max-w-site mx-auto site-inset'
const MEASURE = 'max-w-2xl'

const kicker = 'text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/80'
const sectionH = 'mt-2 text-xl font-light tracking-tight text-foreground/90'
const card = 'rounded-xl border border-border/70 bg-muted/10'
const link =
  'text-[oklch(0.4_0.08_152.2)] underline decoration-border underline-offset-[3px] transition-colors hover:text-[oklch(0.32_0.085_152)] dark:text-[oklch(0.707_0.108_152.216)] dark:hover:text-[oklch(0.78_0.1_152)]'
const linkMuted =
  'text-muted-foreground underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground'

/** The type scale, shown at the sizes it actually ships at. */
const SCALE = [
  {
    label: 'Kicker · 11px / 0.18em / uppercase / medium',
    node: <p className={kicker}>Design system · Live specimen</p>,
  },
  {
    label: 'Display · clamp(1.7–2.4rem) / extralight / tight',
    node: (
      <p className="text-[clamp(1.7rem,5vw,2.4rem)] font-extralight leading-none tracking-tight text-foreground/90">
        A language written as constraints
      </p>
    ),
  },
  {
    label: 'Section head · 20px / light',
    node: <p className="text-xl font-light tracking-tight text-foreground/90">The rules</p>,
  },
  {
    label: 'Body · 15px / light / 1.6',
    node: (
      <p className="text-[15px] font-light leading-relaxed text-muted-foreground">
        A constraint can be checked in review, and it travels to a new codebase without me having
        to be in the room.
      </p>
    ),
  },
  {
    label: 'Caption · 11px / light / muted-70',
    node: (
      <p className="text-[11px] font-light text-muted-foreground/70">
        Rendered live, never screenshotted.
      </p>
    ),
  },
]

/** The deeper rooms. Secondary now: the page shows the system before it links out. */
const ROOMS = [
  { href: '/aka-style', name: 'The full specimen', line: 'Every piece next to what it governs.' },
  { href: '/aka-style/foundations', name: 'Foundations', line: 'Every number, with the reasoning attached.' },
  { href: '/aka-style/primitives', name: 'Primitives', line: 'Controls and surfaces, class strings printed.' },
  { href: '/aka-style/marks', name: 'Marks', line: 'The engine, and the whole family it draws.' },
  { href: '/aka-style/faces', name: 'Faces', line: 'Twenty-six expressions on a 9×9 sub-grid.' },
]

export default function AkaStyleWriteUpPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-background pb-20 pt-16">
      <JsonLd
        data={demoSchema(PATH, {
          title: metadata.title as string,
          description: metadata.description as string,
          crumb: 'akaSTYLE',
        })}
      />

      <div className={SHELL}>
        <Link
          href="/demo"
          className="mb-8 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Projects
        </Link>

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <header className="grid gap-8 md:grid-cols-[1fr_auto] md:items-start">
          <div className={MEASURE}>
            <p className={kicker}>Design system · Live specimen</p>
            <h1 className="mt-2 text-[clamp(1.85rem,5.5vw,2.85rem)] font-extralight leading-none tracking-tight text-foreground/90">
              aka<span className="font-mono font-normal text-primary">STYLE</span>
            </h1>
            <p className="mt-4 text-[16px] font-light leading-relaxed text-foreground/85">
              The vocabulary every project on this site is built from: the tokens, the one type
              scale, the primitives, and the canvas engine that draws every brand mark. It exists as
              rules rather than as taste, and as something that renders itself rather than a
              document about itself.
            </p>
          </div>
          {/*
            The house mark, drawn by the engine this page is documenting. It is
            a disc of pixel cells with the aka wordmark subtracted from it —
            the same call the site header makes, at a size where you can see
            the cells.
          */}
          <figure className="justify-self-start md:justify-self-end">
            <div className={`${card} flex items-center justify-center px-8 py-8`}>
              <PixelHead size={150} grid={30} icon="disc-aka" still />
            </div>
            <figcaption className="mt-2 max-w-[220px] text-[11px] font-light leading-relaxed text-muted-foreground/70">
              Not a logo file. A disc of cells with the wordmark subtracted, drawn at render time by
              the same engine every other mark in the family uses.
            </figcaption>
          </figure>
        </header>

        {/* ── The rules ──────────────────────────────────────────────────── */}
        <section className="mt-16">
          <p className={kicker}>The rules</p>
          <h2 className={sectionH}>Seven constraints, not seven preferences</h2>
          <p className={`mt-3 ${MEASURE} text-[15px] font-light leading-relaxed text-muted-foreground`}>
            A design system is usually sold as consistency, which is true and is not why I keep one.
            The reason is that a preference has to be re-argued every time and a constraint does
            not. &ldquo;This feels too heavy&rdquo; is a conversation. &ldquo;Depth is a border,
            never a shadow&rdquo; is a thing you can check in review, and it travels to a new
            codebase without me having to be in the room to defend it.
          </p>

          <ol className="mt-7 grid list-none gap-3 p-0 md:grid-cols-2 xl:grid-cols-3">
            {LAWS.map((l) => (
              <li key={l.n} className={`${card} flex gap-4 px-4 py-4`}>
                <span className="shrink-0 pt-0.5 font-mono text-[11px] text-primary">{l.n}</span>
                <div>
                  <p className="text-[14px] font-light text-foreground/90">{l.rule}</p>
                  <p className="mt-1 text-[12.5px] font-light leading-relaxed text-muted-foreground">
                    {l.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <p className={`mt-5 ${MEASURE} text-[15px] font-light leading-relaxed text-muted-foreground`}>
            Law 04 is the clearest case. It reads like a taste call and started as an accessibility
            requirement for the audio-reactive work, where anything pulsing brightness in time with
            sound is a genuine hazard. Once motion could only move space, every engine in the family
            inherited a safer default without anyone having to remember why.
          </p>
        </section>

        {/* ── Color ──────────────────────────────────────────────────────── */}
        <section className="mt-16">
          <p className={kicker}>Color</p>
          <h2 className={sectionH}>Tokens, in OKLCH</h2>
          <p className={`mt-3 ${MEASURE} text-[15px] font-light leading-relaxed text-muted-foreground`}>
            Every surface resolves from a CSS variable, so light and dark are one definition rather
            than two stylesheets. These swatches are the live tokens: switch the theme and this row
            repaints itself, because there is nothing here but the variables the rest of the site
            uses.
          </p>

          <ul className="mt-6 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3 lg:grid-cols-6">
            {SWATCHES.map((sw) => (
              <li key={sw.name} className={`${card} overflow-hidden`}>
                <div className={`h-16 w-full border-b border-border/60 ${sw.cls}`} />
                <div className="px-3 py-2">
                  <p className="text-[11px] text-foreground/85">{sw.name}</p>
                  <p className="font-mono text-[10px] text-muted-foreground/60">{sw.varName}</p>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground/70">
            Accent set, carried by the canvas engines
          </p>
          <ul className="mt-3 flex list-none flex-wrap gap-2 p-0">
            {ACCENTS.map((a) => (
              <li
                key={a.name}
                className={`${card} flex items-center gap-2 px-3 py-1.5 font-mono text-[11px] text-muted-foreground`}
              >
                <span
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{ background: a.v }}
                  aria-hidden
                />
                {a.name}
              </li>
            ))}
          </ul>
        </section>

        {/* ── Type ───────────────────────────────────────────────────────── */}
        <section className="mt-16">
          <p className={kicker}>Type</p>
          <h2 className={sectionH}>One scale, five roles</h2>
          <p className={`mt-3 ${MEASURE} text-[15px] font-light leading-relaxed text-muted-foreground`}>
            Hierarchy is carried by the contrast between uppercase mono and light sans, not by size,
            which is why the headings on this page are barely larger than the body under them. Each
            row below is set in the class the site actually ships.
          </p>

          <ul className="mt-6 grid list-none gap-3 p-0 lg:grid-cols-2">
            {SCALE.map((s) => (
              <li key={s.label} className={`${card} px-5 py-4`}>
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground/60">
                  {s.label}
                </p>
                <div className="mt-2">{s.node}</div>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Marks ──────────────────────────────────────────────────────── */}
        <section className="mt-16">
          <p className={kicker}>Brand engine</p>
          <h2 className={sectionH}>One canvas, a family of marks</h2>
          <p className={`mt-3 ${MEASURE} text-[15px] font-light leading-relaxed text-muted-foreground`}>
            Every mark in the family is the same disc of pixel cells with something different
            subtracted from it. Change what is subtracted and you change brands, not code. Colour
            follows the foreground token, so a mark is correct in either theme without a second
            asset existing.
          </p>

          <ul className="mt-6 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-3">
            {MARK_FAMILY.map((m) => (
              <li key={m.name} className={`${card} flex flex-col items-center gap-3 px-5 py-6`}>
                <PixelHead size={84} grid={24} icon={m.icon} still />
                <div className="text-center">
                  <p className="text-[13px] font-light text-foreground/90">{m.name}</p>
                  <p className="font-mono text-[10px] text-muted-foreground/60">{m.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ── The practice ───────────────────────────────────────────────── */}
        <section className="mt-16">
          <p className={kicker}>The practice</p>
          <h2 className={sectionH}>Where it came from, and what it does now</h2>

          <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4 text-[15px] font-light leading-relaxed text-muted-foreground">
              <h3 className="text-sm font-medium tracking-wide text-foreground">Built at Ubik</h3>
              <p>
                This started at{' '}
                <Link href="/demo/ubik" className={link}>
                  Ubik
                </Link>
                , and it started from a shortage rather than from ambition. There was no design team
                and no time to keep a spec in sync with itself, so anything that needed a meeting to
                settle got settled once and written down as a rule instead.
              </p>
              <p>
                What survived three and a half years of that is what is on this page: the decisions
                that kept being correct across a desktop app, a web gateway, a browser extension and
                the agent surfaces, which is a wide enough spread to have killed anything that was
                only a preference.
              </p>
              <p>
                The other half of the inheritance is the habit of the system being the running thing
                rather than a description of it. There the board was Excalidraw files nobody closed
                and the spec was the code; here the specimen imports the same components the site
                does. Neither can drift, because there is no second copy to drift from.
              </p>
            </div>

            <div className="space-y-4 text-[15px] font-light leading-relaxed text-muted-foreground">
              <h3 className="text-sm font-medium tracking-wide text-foreground">
                What it is worth now
              </h3>
              <p>
                The part I did not anticipate is how much a written constraint is worth once you
                build with agents. I work in Claude Code, and the tokens, the scale and the seven
                laws load into the design context for every repo I run, so the language is not
                something I re-explain per session or per project. A new surface arrives already
                speaking it.
              </p>
              <p>
                That is the difference between a style guide and this. A style guide is read by a
                person who then interprets it. These are narrow enough to be applied directly, which
                is why every project here looks like the same studio made it while none of them took
                the setup time that usually implies.
              </p>
              <p className="text-foreground/85">
                It is the reason I can go from a decision to a production surface in a day and have
                it land in the same language as everything around it.
              </p>
            </div>
          </div>
        </section>

        {/* ── Where it runs ──────────────────────────────────────────────── */}
        <section className="mt-16">
          <p className={kicker}>Where it runs</p>
          <h2 className={sectionH}>Same tokens, different repos</h2>

          <ul className="mt-6 grid list-none gap-3 p-0 md:grid-cols-2 xl:grid-cols-3">
            {USAGE.map((u) => {
              const inner = (
                <>
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="text-[14px] font-light text-foreground/90 group-hover:text-foreground">
                      {u.name}
                    </span>
                    {!u.internal && (
                      <ArrowUpRight
                        className="h-3.5 w-3.5 shrink-0 opacity-40 transition-opacity group-hover:opacity-80"
                        aria-hidden
                      />
                    )}
                  </span>
                  <span className="mt-1 block text-[12.5px] font-light leading-relaxed text-muted-foreground">
                    {u.what}
                  </span>
                </>
              )
              const cls = `group block ${card} px-4 py-3.5 transition-colors hover:bg-muted/25`
              return (
                <li key={u.name}>
                  {u.internal ? (
                    <Link href={u.href} className={cls}>
                      {inner}
                    </Link>
                  ) : (
                    <a href={u.href} target="_blank" rel="noopener noreferrer" className={cls}>
                      {inner}
                    </a>
                  )}
                </li>
              )
            })}
          </ul>
        </section>

        {/* ── Deeper ─────────────────────────────────────────────────────── */}
        <section className="mt-16">
          <p className={kicker}>Deeper</p>
          <h2 className={sectionH}>The rest of the specimen</h2>
          <p className={`mt-3 ${MEASURE} text-[15px] font-light leading-relaxed text-muted-foreground`}>
            Everything above is the system itself, on this page, rather than a description of it.
            These go further into each part: every number with its reasoning, every primitive with
            its class string, and the engine with the whole family it draws.
          </p>

          <ul className="mt-6 grid list-none gap-3 p-0 md:grid-cols-2 xl:grid-cols-3">
            {ROOMS.map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  className={`group block ${card} px-4 py-3.5 transition-colors hover:bg-muted/25`}
                >
                  <span className="text-[14px] font-light text-foreground/90 group-hover:text-foreground">
                    {r.name}
                  </span>
                  <span className="mt-1 block text-[12.5px] font-light leading-relaxed text-muted-foreground">
                    {r.line}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className={`mt-14 ${card} bg-muted/15 px-5 py-4 ${MEASURE}`}>
          <p className="text-[14px] font-light leading-relaxed text-foreground/85">
            The test of a design system is not whether it is documented. It is whether someone who
            has not read the documentation, which now includes a model, produces something that
            belongs. Rules pass that test and preferences do not. The rest of the work is on the{' '}
            <Link href="/demo" className={linkMuted}>
              projects page
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  )
}
