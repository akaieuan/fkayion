import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { MarkGlyph } from '@/components/ui/mark-glyphs'
import { demoMetadata, demoSchema } from '@/lib/demo-seo'
import { JsonLd } from '@/components/seo/json-ld'

const PATH = '/demo/aka-style'

export const metadata = demoMetadata(PATH, {
  title: 'akaSTYLE: a design language written as constraints',
  description:
    'The design system behind every project on this site: seven constraints instead of preferences, OKLCH tokens, one type scale, server-rendered primitives, and a live specimen that cannot drift from what ships. Built at Ubik, and now the thing that lets an agent build in my language.',
})

const link =
  'text-[oklch(0.4_0.08_152.2)] underline decoration-border underline-offset-[3px] transition-colors hover:text-[oklch(0.32_0.085_152)] dark:text-[oklch(0.707_0.108_152.216)] dark:hover:text-[oklch(0.78_0.1_152)]'
const linkMuted =
  'text-muted-foreground underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground'

const h2 = 'text-sm font-medium tracking-wide text-foreground'
const kicker = 'text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/80'

/**
 * The seven, restated for a reader rather than for a specimen.
 *
 * The live page at /aka-style states each law next to the thing it governs,
 * which is the right place to check one. Here they are the argument: the point
 * is not what the rules are, it is that they are rules and not preferences.
 */
const LAWS = [
  ['Mono for structure, sans for prose.', 'The contrast between the two carries the hierarchy, so headings rarely need to be big.'],
  ['One accent, used sparingly.', 'If two things on screen are competing for the accent, neither gets it.'],
  ['Borders over shadows.', 'Depth is a 1px border and a translucent fill. Never a drop shadow.'],
  ['Motion moves space, never brightness.', 'It translates and displaces. It does not flash, strobe or pulse. This began as an accessibility rule for the audio-reactive work.'],
  ['Loops pause when unwatched.', 'Every canvas gates its frame loop on an observer and on tab visibility, and draws one still frame under reduced motion.'],
  ['Layout never jumps.', 'Tabbed regions are floored to the tallest tab. Images ship with dimensions and a placeholder.'],
  ['Server by default.', 'The client boundary is drawn as deep in the tree as possible. A card is a server component even when its page is interactive.'],
] as const

/** The live system, and the four rooms of it worth linking separately. */
const ROOMS = [
  {
    href: '/aka-style',
    name: 'The system',
    line: 'The whole language on one page: the seven laws next to what they govern, the tokens, the scale, and where it runs.',
  },
  {
    href: '/aka-style/foundations',
    name: 'Foundations',
    line: 'The measurable half. Every number the system uses, with the reasoning attached, and a block you can drop into a new repo.',
  },
  {
    href: '/aka-style/primitives',
    name: 'Primitives',
    line: 'Controls and surfaces with the class string printed beside each one. Nothing on that page needs client JavaScript to look right.',
  },
  {
    href: '/aka-style/marks',
    name: 'Marks',
    line: 'One canvas engine and the whole family of logos. A disc of cells with something subtracted: change what is subtracted and you change brands, not code.',
  },
] as const

export default function AkaStyleWriteUpPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-background px-6 py-16">
      <JsonLd
        data={demoSchema(PATH, {
          title: metadata.title as string,
          description: metadata.description as string,
          crumb: 'akaSTYLE',
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
            aria-label="akaSTYLE"
          >
            aka<span className="font-mono font-normal text-primary">STYLE</span>
          </p>
        </header>

        {/*
          The mark, at the size the plate shows it, on the plate's own ground.
          A design-system page that opened on a screenshot of itself would be
          making the exact mistake the system exists to prevent, so the hero is
          the live component.
        */}
        <div className="-mx-6 flex items-center justify-center rounded-xl border border-border/80 bg-muted/10 px-6 py-12 sm:mx-0">
          <span className="text-foreground/85">
            <MarkGlyph name="aka-style" size={132} accent="#7b83ea" />
          </span>
        </div>
        <p className="mt-3 text-[12px] font-light leading-relaxed text-muted-foreground/70">
          The mark is the type scale: display, section head, caption. The accent goes to the
          smallest block, because the rule is one accent and it belongs to the quietest thing on the
          plate rather than the loudest.
        </p>

        <p className={`mt-10 ${kicker}`}>Design system · Live specimen</p>
        <h1 className="mt-2 text-2xl font-light tracking-tight text-foreground md:text-[26px]">
          A design language written as constraints
        </h1>

        <div className="mt-6 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
          <p className="text-[16px] text-foreground/85">
            akaSTYLE is the vocabulary every project on this site is built from: the tokens, the one
            type scale, the primitives, and the brand engines that draw the marks. It exists as a
            page that renders itself live rather than as a document about itself, and it exists as
            rules rather than as taste.
          </p>

          <section className="space-y-3">
            <h2 className={h2}>Why it exists</h2>
            <p>
              A design system is usually sold as consistency, which is true and is not the reason I
              keep one. The reason is that a preference has to be re-argued every time and a
              constraint does not. &ldquo;This feels too heavy&rdquo; is a conversation. &ldquo;Depth
              is a border, never a shadow&rdquo; is a thing you can check in review, and it travels
              to a new codebase without me having to be in the room to defend it.
            </p>
            <p>
              So the language is stated as seven laws. They are deliberately narrow and deliberately
              testable, and a few of them are load-bearing in ways that look like style until you
              hit the case they were written for.
            </p>
            <ol className="mt-5 space-y-3">
              {LAWS.map(([rule, body], i) => (
                <li
                  key={rule}
                  className="flex gap-4 rounded-xl border border-border/70 bg-muted/10 px-4 py-3.5"
                >
                  <span className="shrink-0 pt-0.5 font-mono text-[11px] text-primary">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="text-[14px] text-foreground/90">{rule}</p>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="!mt-5">
              Law 04 is the clearest example. It reads like a taste call and started as an
              accessibility requirement for audio-reactive work, where anything that pulses
              brightness in time with sound is a genuine hazard. Once motion could only move space,
              every engine in the family inherited a safer default without anyone having to remember
              why.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={h2}>Where the practice came from</h2>
            <p>
              This started at{' '}
              <Link href="/demo/ubik" className={link}>
                Ubik
              </Link>
              , and it started from a shortage rather than from ambition. There was no design team
              and no time to keep a spec in sync with itself, so anything that needed a meeting to
              settle got settled once and written down as a rule instead. What survived three and a
              half years of that is what is on this page: the decisions that kept being correct
              across a desktop app, a web gateway, a browser extension and the agent surfaces, which
              is a wide enough spread to have killed anything that was only a preference.
            </p>
            <p>
              The other half of the inheritance is the habit of the system being the running thing
              rather than a description of it. At Ubik the board was Excalidraw files nobody closed
              and the spec was the code; here the specimen is a page that imports the same
              components the site does. Neither can drift, because there is no second copy to drift
              from.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={h2}>What it does for me now</h2>
            <p>
              The part I did not anticipate is how much a written constraint is worth once you build
              with agents. I work in Claude Code, and the tokens, the scale and the seven laws are
              loaded into the design context for every repo I run, so the language is not something I
              re-explain per session or per project. A new surface arrives already speaking it,
              because the rules are specific enough to be followed by something that has never seen
              the rest of the codebase.
            </p>
            <p>
              That is the difference between a style guide and this. A style guide is read by a
              person who then interprets it. These are narrow enough to be applied directly, which
              is why every project on this site looks like the same studio made it while none of
              them took the setup time that usually implies. The system is the reason I can go from a
              decision to a production surface in a day and have it land in the same language as
              everything around it.
            </p>
            <p>
              It runs across all of it: this site, the{' '}
              <Link href="/demo/akaoss" className={link}>
                akaOSS
              </Link>{' '}
              toolkits and their registry, the{' '}
              <Link href="/demo/akavsts" className={link}>
                plugin
              </Link>{' '}
              interfaces, and the client work. Same tokens, same scale, same rules about motion and
              about where the client boundary goes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className={h2}>The system itself</h2>
            <p>
              Everything below renders live rather than as captured screenshots, which is the whole
              point: a specimen that is a picture of the system is a specimen that is already out of
              date.
            </p>
            <ul className="mt-1 list-none space-y-2 p-0">
              {ROOMS.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className="group block rounded-xl border border-border/70 bg-muted/10 px-4 py-3.5 transition-colors hover:bg-muted/25"
                  >
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="text-[14px] text-foreground/90 group-hover:text-foreground">
                        {r.name}
                      </span>
                      <ArrowUpRight
                        className="h-3.5 w-3.5 shrink-0 opacity-40 transition-opacity group-hover:opacity-80"
                        aria-hidden
                      />
                    </span>
                    <span className="mt-1 block text-[13px] leading-relaxed text-muted-foreground">
                      {r.line}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-[13px]">
              There is a fifth room,{' '}
              <Link href="/aka-style/faces" className={link}>
                faces
              </Link>
              , which is the marks with an expression inside the knocked-out void: twenty-six of
              them on a 9&times;9 sub-grid, morphed on a timed slot so a face never cuts, it always
              travels.
            </p>
          </section>

          <section className="rounded-xl border border-border/80 bg-muted/15 px-5 py-4">
            <p className="text-[14px] leading-relaxed text-foreground/85">
              The test of a design system is not whether it is documented. It is whether someone who
              has not read the documentation, which now includes a model, produces something that
              belongs. Rules pass that test and preferences do not, which is why these are written
              as rules. The rest of the work is on the{' '}
              <Link href="/demo" className={linkMuted}>
                projects page
              </Link>
              .
            </p>
          </section>
        </div>
      </article>
    </div>
  )
}
