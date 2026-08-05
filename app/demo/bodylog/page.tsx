import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { PixelHead } from '@/components/features/brand/pixel-head'

const kicker = 'text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70'
const label = 'text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground/50'
const code = 'rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]'
const cardCls = 'rounded-xl border border-border bg-card/40 p-5'

export const metadata = {
  title: 'BodyLog — Track a Skin Condition Over Time | akaBuild',
  description:
    'An iOS app for tracking any visible body or skin condition between doctor visits — acne, psoriasis, eczema, cysts, ingrown hairs, alopecia, bruising, posture and physical-therapy progress. Photos stay on device. The app never diagnoses; every number on screen is one you typed.',
}

/** What people actually track — kept broad on purpose, this is not a derm-only tool. */
const conditions = [
  'Acne', 'Psoriasis', 'Eczema', 'Cysts', 'Ingrown hairs', 'Alopecia',
  'Bruising', 'Scarring', 'Post-op healing', 'Posture / PT progress',
]

/** The nine screens explored in v1 — placeholders until real captures land. */
const screens = [
  { name: 'Today', note: 'Greeting, streak line, what is still unlogged.' },
  { name: 'Project detail', note: 'One condition, its sites, its whole history.' },
  { name: 'Capture flow', note: 'Photo, region, feel slider, note — nothing required.' },
  { name: 'Body map', note: 'Tap a region on face, front or back to pin a site.' },
  { name: 'Progression grid', note: 'Twelve weeks of logging intensity, never severity.' },
  { name: 'Notes', note: 'Your words, searchable, attached to entries.' },
  { name: 'Rewards', note: 'Levels and XP for consistency, not for outcomes.' },
  { name: 'Sprite builder', note: 'The one piece of pure play in the app.' },
  { name: 'Onboarding', note: 'What it does, what it refuses to do, on device.' },
]

export default function BodyLogPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <article className="mx-auto max-w-2xl">
        <Link
          href="/demo"
          className="mb-8 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Projects
        </Link>

        <header className="mb-6 flex items-center gap-4">
          <figure className="shrink-0 rounded-xl border border-border/80 bg-black p-2">
            <PixelHead size={56} grid={22} icon="bodylog" still />
          </figure>
          <div>
            <p className={kicker}>Product · iOS · Circleheads</p>
            <h1 className="mt-1 text-[clamp(1.6rem,5vw,2.4rem)] font-extralight leading-none tracking-tight text-foreground/90">
              BodyLog
            </h1>
          </div>
        </header>

        <p className="mt-5 max-w-xl text-sm text-muted-foreground">
          Track any visible body or skin condition over time — so the change between doctor visits
          is something you can show, not something you have to remember.
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-foreground px-4 py-2.5 text-sm font-medium text-background">
            Publishing soon · iOS
          </span>
          <Link
            href="/demo/circleheads"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/40"
          >
            Circleheads
            <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden />
          </Link>
        </div>
        <p className="mt-2 text-[12px] font-light text-muted-foreground/80">
          $3/month or $25/year at launch. Swift + SwiftUI, iOS 17+, no external dependencies.
        </p>

        <div className="mt-10 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
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
              tag where on the body it is, say how it feels on a five-point scale, and move on. The
              app&apos;s only job is to make that thirty-second habit sustainable, and to hand you
              the history when it matters.
            </p>
          </section>

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
              The two routes the app is built around: <span className="text-foreground/85">face
              acne</span>, logged zone by zone on a face diagram, and{' '}
              <span className="text-foreground/85">fold-prone persistent spots</span> — psoriasis
              and eczema at the inner elbows, backs of knees, neck, scalp, waist — logged on front
              and back body diagrams.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              The rule the product is built on
            </h2>
            <div className="rounded-xl border border-border/80 bg-muted/15 px-5 py-4">
              <p className="text-[14px] leading-relaxed text-foreground/85">
                The app never interprets a photo, never scores a condition, and never suggests
                treatment. Every number on screen is one you typed. Severity is self-rated. The
                calendar counts logs, not health.
              </p>
            </div>
            <p>
              That constraint drove most of the design decisions. The tracking grid gets denser the
              more you log — it is coloured by <em>activity</em>, never by severity, so a bad month
              never looks like a red wall. Streaks break honestly, but the copy around a broken
              streak stays neutral: no scolding, no guilt mechanics on a medical record.
            </p>
            <p className="text-[13px]">
              It also decides what the app is not. There is no model in the loop, no &ldquo;your
              acne is improving 12%&rdquo;, no triage. Those claims need clinical validation nobody
              here has done, and inventing them would make the log less trustworthy, not more.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">How logging works</h2>
            <ul className="list-disc space-y-2 pl-5 marker:text-muted-foreground/50">
              <li>
                <span className="text-foreground/85">Entries like posts, not forms.</span> Optional
                photo slides with per-slide captions, tap-to-select regions on a face / front / back
                diagram, a 1–5 &ldquo;how does it feel&rdquo; slider from Flaring to Clear, and a
                free note. Nothing is required — save is never blocked.
              </li>
              <li>
                <span className="text-foreground/85">Projects, not one big pile.</span> A project is
                one condition at one set of sites — &ldquo;general acne, cheeks and jaw&rdquo;,
                &ldquo;psoriasis, four sites&rdquo; — each with its own accent colour carried from
                the project card to the body-map pin to the calendar cell.
              </li>
              <li>
                <span className="text-foreground/85">Checkup nudges.</span> When a site you log
                regularly has gone quiet for three to fourteen days, the home screen offers a
                pre-filled &ldquo;quick checkup pic?&rdquo; card. Gaps in a chronic record are the
                expensive kind of missing data.
              </li>
              <li>
                <span className="text-foreground/85">A twelve-week grid.</span> One cell per day,
                denser with more entries, with a streak line. Intensity of logging only — the colour
                never means severity.
              </li>
            </ul>
          </section>

          {/* Screens — placeholders until captures land; keeps the layout honest for now. */}
          <div>
            <p className={label}>The app · nine screens</p>
            <p className="mt-2 text-[13px] font-light">
              Screens from the v1 design exploration. Captures from the build go here.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {screens.map((s) => (
                <figure key={s.name} className="rounded-lg border border-border/70 bg-card/40 p-3">
                  <div className="flex aspect-[9/16] items-center justify-center rounded-md border border-border/60 bg-muted/20">
                    <span className="text-[10px] font-light text-muted-foreground/35">
                      {s.name}
                    </span>
                  </div>
                  <figcaption className="mt-2">
                    <p className="text-[11.5px] text-foreground/80">{s.name}</p>
                    <p className="mt-0.5 text-[10.5px] font-light leading-snug text-muted-foreground/60">
                      {s.note}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              Photos are health data
            </h2>
            <p>
              Skin photos are among the most sensitive images a person owns, so the storage model
              was a product decision before it was an engineering one:{' '}
              <span className="text-foreground/85">everything stays on the device.</span> No cloud,
              no analytics, no network calls.
            </p>
            <ul className="list-disc space-y-2 pl-5 marker:text-muted-foreground/50">
              <li>
                Photos are downscaled and <span className="text-foreground/85">EXIF/GPS-stripped</span>{' '}
                before they are ever written — a dated photo of your own body should not also carry
                your address.
              </li>
              <li>
                They live in <code className={code}>SwiftData</code> external storage — files
                alongside the store rather than blobs inside it, so a long history stays fast.
              </li>
              <li>
                The schema is <span className="text-foreground/85">versioned from day one</span>{' '}
                behind a migration plan. A tracking record you cannot open in two years is worse
                than no record.
              </li>
            </ul>
            <p className="text-[13px]">
              Any future sync would be a deliberate, privacy-first decision — not a default.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Who built it</h2>
            <p>
              A two-person <Link href="/demo/circleheads" className="underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground/50">Circleheads</Link>{' '}
              build. I did the product: the user story, the whole front end, and the design language
              — the screen model, the body map, the capture flow, the tracking grid, the copy
              conventions, and the pixel brand art (the mark, tab icons, badges, and the sprite are
              all drawn by the same engine, so they scale from 14px to 180px with no assets).
            </p>
            <p>
              <a href="https://blaiseab.com" target="_blank" rel="noopener noreferrer" className="underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground/50">Blaise</a>{' '}
              built the back end — how photos are stored, processed, and traced through the app:
              the image pipeline, the SwiftData schema and its migration plan, and the persistence
              layer underneath the log.
            </p>
            <p className="text-[12px] text-muted-foreground/70">
              Swift · SwiftUI · SwiftData · iOS 17+ · zero external dependencies
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Status</h2>
            <p>
              Working build: persistent store, photo slides, body-map region picking, the tracking
              heatmap, checkup nudges, and entry detail. Still to come before release: edit-entry,
              region history and photo compare, reminders, home-metric presets, and the app icon
              artwork. Publishing soon at $3/month or $25/year.
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
              feature.
            </p>
          </section>
        </div>
      </article>
    </div>
  )
}
