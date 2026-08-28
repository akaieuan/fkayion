import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { DemoImage } from '@/components/ui/demo-image'
import { PixelRoundabout } from '@/components/features/brand/pixel-roundabout'
import { demoMetadata, demoSchema } from '@/lib/demo-seo'
import { JsonLd } from '@/components/seo/json-ld'

const PATH = '/demo/how-i-work'

export const metadata = demoMetadata(PATH, {
  title: 'How I work: product design and technical anthropology',
  description:
    'Brooklyn-raised product designer and anthropologist. Field-work training applied to product decisions, parameterized prototypes built to be felt rather than reviewed, and the small software I use every day because I built it: Null, akaVST, Blockpad.',
})

const link =
  'text-[oklch(0.4_0.08_152.2)] underline decoration-border underline-offset-[3px] transition-colors hover:text-[oklch(0.32_0.085_152)] dark:text-[oklch(0.707_0.108_152.216)] dark:hover:text-[oklch(0.78_0.1_152)]'
const linkMuted =
  'text-muted-foreground underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground'

const h2 = 'text-sm font-medium tracking-wide text-foreground'

/**
 * The tools row reaches past the article's measure, the way the cards on
 * /demo/ubik do. Three pieces of software side by side is the argument the
 * section is making; stacked in a 640px column it reads as three asides.
 */
const ROW_W = 'min(100vw - 3rem, 1180px)'
const CARD_ROW: React.CSSProperties = {
  width: ROW_W,
  marginInline: `calc((100% - ${ROW_W}) / 2)`,
}

/** The software I use daily because the thing I wanted did not exist. */
const TOOLS = [
  {
    href: '/demo/null-browser',
    name: 'Null',
    role: 'The browser I use',
    src: '/null/overview.webp',
    w: 1600,
    h: 1000,
    alt: 'Null browser, showing a workspace of tabs beside its notes pane',
    note: 'A browser with the AI layer taken back out. Six invariants, a network inspector, and notes that live with the tab rather than in another app.',
  },
  {
    href: '/demo/akavsts',
    name: 'akaVST',
    role: 'The instruments I play',
    src: '/akableep-synth.webp',
    w: 1163,
    h: 556,
    alt: 'akaBleep, a synthesizer plugin with oscillators, envelopes and a ladder filter',
    note: 'Audio plugins for Ableton. Oscillators, a ladder filter, a sequencer with per-step parameter locks. Built because a knob in the wrong place changes what you play.',
  },
  {
    href: '/demo/blockpad',
    name: 'Blockpad',
    role: 'How I wireframe',
    src: '/blockpad-payload.webp',
    w: 1600,
    h: 1000,
    alt: 'Blockpad, showing a wireframe beside the compact text payload it copies out',
    note: 'A wireframing tool that copies out as both the drawing and the code, so a layout can go straight into a chat. Fewer tokens, and the model sees the structure instead of a description of it.',
  },
] as const

export default function HowIWorkPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-background px-6 py-16">
      <JsonLd
        data={demoSchema(PATH, {
          title: metadata.title as string,
          description: metadata.description as string,
          crumb: 'How I work',
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
            aria-label="How I work"
          >
            How I work
          </p>
        </header>

        {/*
          Bartel-Pritchard Square, running. It is the traffic circle on the
          southwest corner of Prospect Park, and it is here because the page
          starts with where I am from rather than with a list of methods.
        */}
        <figure className="-mx-6 flex justify-center overflow-hidden rounded-xl border border-border/80 bg-muted/10 px-6 py-8 sm:mx-0">
          <PixelRoundabout size={420} />
        </figure>
        <p className="mt-3 text-[12px] font-light leading-relaxed text-muted-foreground/70">
          Bartel-Pritchard Square, where Park Slope meets Windsor Terrace, drawn from the real
          circle and running live. This is the corner of Prospect Park I grew up on.
        </p>

        <p className="mt-10 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/80">
          Product design · Technical anthropology
        </p>
        <h1 className="mt-2 text-2xl font-light tracking-tight text-foreground md:text-[26px]">
          I design by building the thing and then living in it
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          A drawing cannot be operated. Most of what I need to know about a design only shows up
          once there is something to turn.
        </p>

        <div className="mt-10 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
          <section className="space-y-3">
            <h2 className={h2}>Designing through interaction</h2>
            <p>
              I build parameterized experiences: versions of a design with the decisions left
              exposed as things you can move, so the question stops being whether a change reads
              better on a board and becomes what the change feels like under your hand. Density,
              timing, how much the system says before it acts. Those are not opinions you can
              settle in review. They are settings, and you find the right one by sitting inside a
              few of them.
            </p>
            <p>
              This is the same instinct as playing an instrument, and I do not think that is a
              coincidence. I am a self-taught musician and I perform regularly, in front of
              hundreds and sometimes thousands, on hardware synths and drum machines or DJing. On
              a synth you do not describe the sound you want. You turn something and listen, and
              you keep turning until the room agrees with you. Software has the same property and
              most design process throws it away.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={h2}>Field work, applied to product</h2>
            <p>
              I am a product designer and an anthropologist, and I use the second training on the
              first job. That means getting as close to the problem as the problem allows: users,
              product research, session replays. Those always come before a design change or a
              feature addition, not after one as validation.
            </p>
            <p>
              Anthropology is useful here for a specific reason. It teaches you that what people
              say they do and what they do are different data, that both are worth collecting, and
              that the gap between them is usually where the product is wrong. Watching someone
              work around your software is worth more than any number of them rating it.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={h2}>Brooklyn, and a large sheet of paper</h2>
            <p>
              I grew up here: in the park, on video games, and ideating products with my best
              friend. What that looked like at the time was large sheets of paper with every
              screen drawn by hand, one after another, until the whole thing existed on a table.
              We were designing flows before either of us knew the word for it.
            </p>
            <p>
              Right after college that turned into a company.{' '}
              <Link href="/demo/ubik" className={link}>
                Ubik
              </Link>{' '}
              is where I refined the practice into something repeatable, and where, as AI
              arrived, I stopped handing the work off and started taking it into production
              myself.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={h2}>A 2000 baby, raised on the future</h2>
            <p>
              My dad is a programmer and a gamer, and the thing he has always told me is that to
              achieve the impossible you have to attempt the improbable. He got me a computer when
              I was young, and the internet has been a second home since. Being born in 2000 feels
              specific in a way I have never fully shaken: I got to watch technology change from
              cyberpunk to sterile, from something that looked like it was made by people who
              wanted something to a surface with the fingerprints wiped off.
            </p>
            <p>
              I am also an artist and a perfectionist, which mostly manifests as having a problem
              with nearly every app I use. That used to be a complaint. AI changed my habits
              completely, and now it is a to-do list. I live in the science-fiction future I was
              raised to glorify, and the interesting part of it is not that a model can write
              code. It is that the distance between wanting a tool and having one collapsed.
            </p>
            <p>
              I have written the longer version of this argument as{' '}
              <Link href="/writing/digital-gentrification" className={link}>
                Digital Gentrification
              </Link>
              .
            </p>
          </section>
        </div>

        <div style={CARD_ROW} className="mt-12">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/80">
            Small software
          </p>
          <p className="mt-2 max-w-xl text-[12px] font-light leading-relaxed text-muted-foreground/70">
            I believe in small software: a tool built for one person doing one thing, which is
            allowed to be opinionated because it does not have to be for everyone. These are the
            three I use every day, and I use them because I built them.
          </p>

          <div className="mt-6 grid items-start gap-5 lg:grid-cols-3">
            {TOOLS.map((t) => (
              <figure key={t.href}>
                <Link
                  href={t.href}
                  className="group block overflow-hidden rounded-xl border border-border/70 bg-muted/10"
                >
                  <DemoImage
                    src={t.src}
                    alt={t.alt}
                    width={t.w}
                    height={t.h}
                    sizes="(min-width: 1024px) 380px, calc(100vw - 3rem)"
                    className="block h-auto w-full transition-opacity group-hover:opacity-90"
                  />
                </Link>
                <figcaption className="mt-2.5">
                  <Link
                    href={t.href}
                    className="inline-flex items-baseline gap-2 text-[13px] font-medium text-foreground/90 transition-colors hover:text-foreground"
                  >
                    {t.name}
                    <span className="text-[11px] font-light text-muted-foreground/60">
                      {t.role}
                    </span>
                  </Link>
                  <p className="mt-1 text-[12px] font-light leading-relaxed text-muted-foreground/70">
                    {t.note}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-12 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
          <section className="space-y-3">
            <h2 className={h2}>Where that lands professionally</h2>
            <p>
              I have moved from pure design into the design engineering seat, and I take
              implementation when the work needs it rather than when the org chart allows it. In
              practice that means research and the build stay in the same week: what a session
              replay showed on Tuesday can be a working surface by Thursday, and the surface is
              what gets tested next, not a deck about it.
            </p>
            <p>
              The AI-specific version of that is{' '}
              <Link href="/demo/hitl-kit" className={link}>
                HITL Kit
              </Link>
              , nineteen installable primitives for keeping a person in authority over an agent,
              and{' '}
              <Link href="/demo/eval-kit" className={link}>
                eval-kit
              </Link>
              , an evaluation framework where humans do the scoring. Both exist because
              benchmarks ask whether a model can finish a task alone and deployment asks whether
              it respected the person it was working with. Those are different questions and only
              one of them is the product.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={h2}>Watching the work, in public</h2>
            <p>
              One window into the loop is the{' '}
              <a
                href="https://kraa.io/team-test-log042"
                target="_blank"
                rel="noopener noreferrer"
                className={link}
              >
                team test log
                <ArrowUpRight
                  className="ml-0.5 inline h-3.5 w-3.5 align-[-0.1em] opacity-70"
                  aria-hidden
                />
              </a>
              : real observation turned into concrete changes, kept in the open so you can read the
              arc rather than the conclusions. The longer argument behind all of it is my paper,{' '}
              <a
                href="https://kraa.io/abmpinai1"
                target="_blank"
                rel="noopener noreferrer"
                className={link}
              >
                An AI Measurement Problem
                <ArrowUpRight
                  className="ml-0.5 inline h-3.5 w-3.5 align-[-0.1em] opacity-70"
                  aria-hidden
                />
              </a>
              .
            </p>
          </section>

          <section className="rounded-xl border border-border/80 bg-muted/15 px-5 py-4">
            <p className="text-[14px] leading-relaxed text-foreground/85">
              Everything on this site is the same habit at different sizes: get close to the
              problem, build something you can actually operate, and keep the person using it in
              charge of what happens next. The full index is on the{' '}
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
