import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { BodyLogMark } from '@/components/demo/bodylog/bodylog-mark'
import { BodyLogShowcase, BodyLogSpecimens } from '@/components/demo/bodylog/showcase'

const kicker = 'text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70'
const label = 'text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground/50'
const code = 'rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]'

export const metadata = {
  title: 'BodyLog — A Record, Not a Verdict | akaBuild',
  description:
    'An iOS app for tracking any visible body or skin condition between doctor visits — acne, psoriasis, eczema, cysts, bruising, PT progress. It never reads your skin, scores it, or tells you what to do, and nothing leaves the phone.',
}

/** What people track — deliberately broad; this is not a derm-only tool. */
const conditions = [
  'Acne', 'Psoriasis', 'Eczema', 'Cysts', 'Ingrown hairs', 'Alopecia',
  'Bruising', 'Scarring', 'Post-op healing', 'Posture / PT progress',
]

/** The rules that settle design arguments, straight from the design doc. */
const rules = [
  {
    h: 'Activity, never severity.',
    t: 'Every visualisation is keyed to how much you logged. Colouring anything by rating would turn the app into a diagram of how bad you are.',
  },
  {
    h: 'Colour tells things apart; it never ranks them.',
    t: 'A hue means “this is the psoriasis one”. Depth means “more logged here”. Neither ever means “worse”.',
  },
  {
    h: 'Gaps read as gaps.',
    t: 'Days you didn’t log are drawn empty — including in the logo. A mark with no gaps would quietly claim a perfect streak.',
  },
  {
    h: 'On device, full stop.',
    t: 'No network layer exists in the app at all. Not disabled — absent. Adding one would require an explicit written privacy decision first.',
  },
  {
    h: 'Everything is optional.',
    t: 'Save is never disabled. An entry with nothing but a date is a perfectly good entry.',
  },
]

export default function BodyLogPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <article className="mx-auto max-w-2xl">
        <Link
          href="/demo"
          className="mb-8 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground xl:hidden"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Projects
        </Link>

        {/* ---------------------------------------------------------- hero */}
        <header className="mb-6 flex items-center gap-5">
          <BodyLogMark size={84} title="" className="shrink-0" />
          <div>
            <p className={kicker}>Circleheads · iOS</p>
            <h1 className="mt-1 text-[clamp(1.7rem,5vw,2.5rem)] font-extralight leading-none tracking-tight text-foreground/90">
              BodyLog
            </h1>
          </div>
        </header>

        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
          A skin-tracking app for iPhone. You photograph a place on your body, say what it&apos;s
          about, and the app keeps the record. It never reads your skin, scores it, or tells you
          what to do — and nothing leaves the phone.
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-foreground px-4 py-2.5 text-sm font-medium text-background">
            Publishing soon · iOS
          </span>
          <a
            href="https://circleheads.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/40"
          >
            circleheads.com
            <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden />
          </a>
        </div>
        <p className="mt-2 text-[12px] font-light text-muted-foreground/80">
          $3/month or $25/year at launch. Native SwiftUI + SwiftData, iOS 17+, zero external
          dependencies — no image assets; every glyph, badge and figure is a character grid drawn
          at runtime.
        </p>

        {/* ------------------------------------------------------ the phone */}
        <div className="mt-12">
          <p className={label}>The app</p>
          <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
            Rebuilt here as live React from the shipping app&apos;s own values — the figure is
            rasterised from its vector anatomy, the logo is its frozen grid, and the colour, type
            and spacing are the real ones. It works: tap around.
          </p>
          <div className="mt-5">
            <BodyLogShowcase />
          </div>
        </div>

        <div className="mt-12 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
          {/* ----------------------------------------------------- why */}
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Why it exists</h2>
            <p>
              If you have a chronic skin or body condition, the most useful question your doctor
              asks is the hardest one to answer: <em>is it better or worse than last time?</em> Six
              weeks have passed, the flare that worried you has faded, and you are reconstructing it
              from memory in a ten-minute appointment.
            </p>
            <p>
              BodyLog is the record that answers it. You photograph the thing when you notice it,
              tag where on the body it is, say how it feels, and move on. The app&apos;s only job is
              to make that thirty-second habit sustainable, and to hand you the history when it
              matters.
            </p>
          </section>

          {/* ------------------------------------------------ what people track */}
          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">What people track</h2>
            <p>
              Deliberately not a dermatology-only tool. Anything visible on the outside of the body,
              changing slowly enough that memory fails you:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {conditions.map((c) => (
                <span
                  key={c}
                  className="rounded-md border border-border/60 px-2 py-0.5 text-[11px] font-light text-muted-foreground/80"
                >
                  {c}
                </span>
              ))}
            </div>
            <p className="text-[13px]">
              And what you call it is <span className="text-foreground/85">free text you coin</span> —
              &ldquo;psoriasis&rdquo;, &ldquo;jaw acne&rdquo;, &ldquo;hand eczema&rdquo; — not a fixed
              menu. Two people with the same diagnosis rarely describe it the same way, and a closed
              list would make the app argue with them about their own body.
            </p>
            <p className="text-[13px]">
              The two routes it is built around: <span className="text-foreground/85">face acne</span>,
              logged zone by zone on a face diagram, and{' '}
              <span className="text-foreground/85">fold-prone persistent spots</span> — psoriasis and
              eczema at the inner elbows, backs of knees, neck, scalp, waist — on front and back body
              diagrams.
            </p>
          </section>

          {/* -------------------------------------------------------- rules */}
          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              What decides arguments
            </h2>
            <p>
              Not style preferences. When a design question comes up, these settle it — and a
              component is wrong, even if it looks right, when it breaks one.
            </p>
            <div className="space-y-3">
              {rules.map((r) => (
                <div key={r.h} className="border-l-2 border-border pl-4">
                  <p className="text-[13.5px] text-foreground/85">{r.h}</p>
                  <p className="mt-1 text-[13px] font-light leading-relaxed text-muted-foreground">
                    {r.t}
                  </p>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-border/80 bg-muted/15 px-5 py-4">
              <p className={label}>Product voice</p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-foreground/85">
                Lowercase headings, short sentences, no exclamation, no streak shaming, no medical
                authority. The one rating vocabulary is{' '}
                <span className="font-mono text-[12px]">flaring · irritated · okay · good · clear</span>{' '}
                — five is the good end on purpose, so the scale reads as progress toward clear rather
                than a severity score.
              </p>
            </div>
          </section>

          {/* --------------------------------------------------------- mark */}
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">The mark is the data</h2>
            <p>
              The logo is five weeks of the logging grid. Hue says which thing was tracked, weight
              says how much, and the empty cells are days nothing was logged. It is the
              product&apos;s own data structure used as its signature —{' '}
              <span className="text-foreground/85">not a metaphor for the record, but a picture of
              one</span>.
            </p>
            <p className="text-[13px]">
              Five by five, gap 24% of a cell, five hues in fixed order, weight 0 as the empty token.
              A frozen constant rather than generated, so the header mark, the app icon and the
              splash are byte-identical. Seventeen of twenty-five cells are lit and all five accents
              appear — both facts are load-bearing. The system otherwise forbids multi-colour; the
              mark is exempt because there, colour is data rather than decoration.
            </p>
          </section>

          {/* --------------------------------------------------- specimens */}
          <div>
            <p className={label}>System specimens</p>
            <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
              The same components the phone is built from, on their own. The history grid&apos;s two
              readings are the clearest statement of the whole idea in one tap.
            </p>
            <div className="mt-5">
              <BodyLogSpecimens />
            </div>
          </div>

          {/* ------------------------------------------------------ logging */}
          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">How logging works</h2>
            <ul className="list-disc space-y-2 pl-5 marker:text-muted-foreground/50">
              <li>
                <span className="text-foreground/85">Entries like posts, not forms.</span> Optional
                photo slides with captions, tap-to-select regions on a face / front / back diagram, a
                1–5 feel slider, and a free note. Nothing is required — save is never blocked.
              </li>
              <li>
                <span className="text-foreground/85">The questions in the order a person thinks
                them.</span> Where is it showing up → what are you tracking → how does it feel today →
                what you notice → what you applied → anything else going on. That last one is
                captioned honestly: the app draws no conclusions from it.
              </li>
              <li>
                <span className="text-foreground/85">Shot conditions saved with the photo.</span>{' '}
                Light (window / ring light / overhead / outdoors) and distance (macro / close /
                arm&apos;s length), so future shots can match. Two pictures of the same spot under
                different light are not a comparison.
              </li>
              <li>
                <span className="text-foreground/85">Checkup nudges.</span> When a site you log
                regularly has gone quiet for three to fourteen days, the home screen offers a
                pre-filled &ldquo;quick checkup pic?&rdquo; card — an offer, never a scold.
              </li>
              <li>
                <span className="text-foreground/85">Zoom is time, not tile size.</span> Week / month
                / all-time changes how the photo timeline is bucketed. Filter to one tracked thing —
                two progressions interleaved is two stories and neither reads.
              </li>
            </ul>
          </section>

          {/* ------------------------------------------------------ rewards */}
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              Earned by tracking, never by improving
            </h2>
            <p>
              Twenty-six badges across five groups. Every one measures an act of recording — logging,
              pinning, photographing, describing, writing.{' '}
              <span className="text-foreground/85">None can be earned by a rating going down, and
              none is lost when a flare gets worse.</span> The app asks people to photograph something
              they may not enjoy looking at, every day, for months; this is the counterweight, and it
              only works if it stays honest about what it measures.
            </p>
            <p className="text-[13px]">
              The one I&apos;d point at: <span className="text-foreground/85">back again</span> — log
              again after two weeks away. Deliberately not a streak badge. Missing a fortnight and
              coming back is the moment most tracking apps make you feel worst; this one gives you
              something for it. XP is flat by design, so a bad day logged is worth exactly what a
              good one is.
            </p>
          </section>

          {/* -------------------------------------------------------- privacy */}
          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              Photos are health data
            </h2>
            <p>
              Skin photos are among the most sensitive images a person owns, so the storage model was
              a product decision before it was an engineering one:{' '}
              <span className="text-foreground/85">everything stays on the device.</span> No cloud,
              no analytics, no network calls.
            </p>
            <ul className="list-disc space-y-2 pl-5 marker:text-muted-foreground/50">
              <li>
                Every stored image is downscaled and{' '}
                <span className="text-foreground/85">EXIF/GPS-stripped</span> before it touches disk.
                Capture dates are read off the original bytes and discarded with them — a dated photo
                of your own body should not also carry your address.
              </li>
              <li>
                Bytes live in <code className={code}>SwiftData</code> external storage — files
                alongside the store rather than blobs inside it, so a long history stays fast.
              </li>
              <li>
                The schema has been{' '}
                <span className="text-foreground/85">versioned since V1</span> and no shipped version
                is ever edited in place. Four have shipped, each a lightweight migration: V2 added
                photo capture dates, V3 the tracked condition, V4 the remaining capture questions and
                shot conditions.
              </li>
              <li>
                Body-region identifiers are a stored contract — a shipped one is never renamed. An
                entry logged before sides existed still parses and still means what it meant;
                inventing a side for old data would be a lie in a health record.
              </li>
              <li>
                Lists show abstract tiles rather than photographs by default, so the app is safe to
                scroll in public without changing a setting.
              </li>
            </ul>
          </section>

          {/* ------------------------------------------- design → production */}
          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              From design exploration to a shipping app
            </h2>
            <p>
              It started as a design exploration — a working name, three dashboard variants, and nine
              screens argued out in the browser before any Swift existed. That stage was for settling
              questions cheaply: whether the history grid should be one hue or one per condition,
              whether streaks should exist at all, what a broken streak is allowed to say to you.
            </p>
            <p>
              That exploration is still the best way to read the user story in one go, so it is kept
              whole and playable rather than described. Every screen, in the order a person meets
              them.
            </p>
            <Link
              href="/demo/bodylog/v1"
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/40"
            >
              Open the v1 prototype
              <ArrowUpRight className="h-4 w-4 opacity-60" aria-hidden />
            </Link>
            <p>
              What survived became a written system — tokens, the rules above, the frozen mark — and
              then the real app. The production build is native SwiftUI with SwiftData underneath,
              and the values on this page are read out of it rather than reconstructed. A few things
              got better on the way: the figure went from an abstract diagram to real rasterised
              anatomy with independent left and right limbs, and heat became something clipped by the
              body&apos;s own silhouette so it spreads <em>along</em> a limb instead of stamping a
              rectangle on it.
            </p>
            <p className="text-[13px] text-muted-foreground/80">
              A few decisions are still open, and it&apos;s worth saying so rather than presenting
              them as settled: whether the app should force dark rather than follow the system, what
              a clinic export contains, and whether the multi-colour mark stays multi-colour given
              the system&apos;s own accent rule.
            </p>
          </section>

          {/* ------------------------------------------------------- credits */}
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Who built it</h2>
            <p>
              A two-person{' '}
              <Link href="/demo/circleheads" className="underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground/50">
                Circleheads
              </Link>{' '}
              build. I did the product: the user story, the whole front end, and the design language
              — the screen model, the body map, the capture flow, the tracking grid, the copy
              conventions, and the pixel brand art. The mark, tab icons, badges, figure and sprite are
              all drawn by one engine, which is why they hold from 14px to 512px with no assets.
            </p>
            <p>
              <a href="https://blaiseab.com" target="_blank" rel="noopener noreferrer" className="underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground/50">
                Blaise
              </a>{' '}
              built the back end — how photos are stored, processed and traced through the app: the
              image pipeline, the SwiftData schema and its migration plan, and the persistence layer
              underneath the log.
            </p>
            <p className="text-[12px] text-muted-foreground/70">
              Swift · SwiftUI · SwiftData · iOS 17+ · zero external dependencies
            </p>
          </section>

          {/* -------------------------------------------------------- status */}
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Status</h2>
            <p>
              Working build with a real persistent store: photo slides, body-map region picking, the
              tracking heatmap, checkup nudges, entry detail, spot history, compare, condition detail,
              the badge shelf and onboarding. Four schema versions shipped. Still to come before
              release: edit-entry, reminders, more home-metric presets, and the app icon artwork.
            </p>
          </section>

          <section className="rounded-xl border border-border/80 bg-muted/15 px-5 py-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              Why this one matters to me
            </h2>
            <p className="mt-2 text-[14px] leading-relaxed text-foreground/85">
              It is the same argument as the rest of my work, in a domain where the stakes are
              personal: the software does not tell you what is happening to your body. It keeps an
              honest record so that you, and the clinician you trust, can decide. Restraint is the
              feature — which is why the first onboarding card is called{' '}
              <em>a record, not a verdict</em>.
            </p>
          </section>
        </div>
      </article>
    </div>
  )
}
