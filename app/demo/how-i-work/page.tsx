import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { DemoImage } from '@/components/ui/demo-image'
import { PixelRoundabout } from '@/components/features/brand/pixel-roundabout'
import { demoMetadata, demoSchema } from '@/lib/demo-seo'
import { JsonLd } from '@/components/seo/json-ld'

const PATH = '/demo/how-i-work'

export const metadata = demoMetadata(PATH, {
  title: 'How I work: product design engineering and anthropology',
  description:
    'A product design engineer trained as an anthropologist. Three and a half years of human-in-the-loop AI at Ubik Studio, design through interaction rather than review, and the small software I use every day because I built it.',
})

const link =
  'text-[oklch(0.4_0.08_152.2)] underline decoration-border underline-offset-[3px] transition-colors hover:text-[oklch(0.32_0.085_152)] dark:text-[oklch(0.707_0.108_152.216)] dark:hover:text-[oklch(0.78_0.1_152)]'
const linkMuted =
  'text-muted-foreground underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground'

const h2 = 'text-sm font-medium tracking-wide text-foreground'

/**
 * The software I use daily because the thing I wanted did not exist.
 *
 * These sit inside the article rather than in a row beside it. Three across
 * put each screenshot at about 380px, which is narrower than the plugin's own
 * window: the synth became a grey smear and the Blockpad canvas stopped being
 * legible. At the article's measure each is shown near the size it is used at,
 * and the prose that explains it is the paragraph directly above rather than a
 * caption squeezed under a thumbnail.
 *
 * `NAME_LINK` is where the tool's name goes in the lead, so the name is a link
 * inside a sentence rather than a label stapled to the end of one.
 */
const TOOLS = [
  {
    href: '/demo/null-browser',
    name: 'Null',
    src: '/null/overview.webp',
    w: 1600,
    h: 1000,
    alt: 'Null browser, showing a workspace of tabs beside its notes pane',
    lead: 'I browse in something I wrote. NAME_LINK started as a browser with an AI layer in it and became a better one when I took the layer back out. What survived is six invariants about what the app is never allowed to do behind you, a network inspector, and notes that live with the tab instead of in another app.',
    caption: 'A workspace in Null. Notes belong to the tab, so closing the window does not strand them.',
  },
  {
    href: '/demo/akavsts',
    name: 'akaVST',
    src: '/akableep-synth.webp',
    w: 1163,
    h: 556,
    alt: 'akaBleep, a synthesizer plugin with oscillators, envelopes and a ladder filter',
    lead: 'I play instruments I wrote, too. NAME_LINK is JUCE plugins for Ableton: oscillators, a ladder filter, a sequencer with per-step parameter locks. Building them is the clearest case I have of what this page is about, because a knob in the wrong place does not read worse, it makes you play something else.',
    caption: 'akaBleep, the acid voice. Every knob on this panel is reachable per step from the sequencer.',
  },
  {
    href: '/demo/blockpad',
    name: 'Blockpad',
    src: '/blockpad-hero.webp',
    w: 1600,
    h: 1003,
    alt: 'Blockpad: a two-panel wireframe on the canvas, with the canvas controls, the drawing toolbar and the Copy control',
    lead: 'And I wireframe in NAME_LINK, which exists because of how I work now. It copies a layout out as both the drawing and a compact text payload, so a screen can go straight into a chat. That costs far fewer tokens than describing it, and the model reads the structure instead of my description of the structure.',
    caption: 'A two-panel layout on the Blockpad canvas. Copy, top right, hands back the drawing and the payload together.',
  },
] as const

function Tool({ t }: { t: (typeof TOOLS)[number] }) {
  const [before, after] = t.lead.split('NAME_LINK')
  return (
    <div className="space-y-4 pt-6 first:pt-2">
      <p>
        {before}
        <Link href={t.href} className={link}>
          {t.name}
        </Link>
        {after}
      </p>
      <figure className="-mx-6 sm:mx-0">
        <Link href={t.href} className="group block">
          {/*
           * The frame carries the aspect ratio, so the row it will occupy is
           * reserved before the bytes arrive and nothing below it moves when
           * they do. The image fills that frame rather than setting its own
           * height, which keeps three screenshots of three different shapes
           * reading as one sequence instead of three interruptions.
           */}
          <div
            className="overflow-hidden rounded-xl border border-border/80 bg-muted/10"
            style={{ aspectRatio: `${t.w} / ${t.h}` }}
          >
            <DemoImage
              src={t.src}
              alt={t.alt}
              width={t.w}
              height={t.h}
              /*
               * The exact measure at every breakpoint. Left at the default,
               * next/image assumes the image is as wide as the viewport and
               * ships a frame several times larger than the column it lands
               * in; overstated the other way and a retina screen gets a soft
               * one.
               */
              sizes="(min-width: 704px) 672px, calc(100vw - 3rem)"
              className="block h-full w-full object-cover transition-opacity group-hover:opacity-95"
            />
          </div>
        </Link>
        <figcaption className="mt-2.5 px-6 text-[11px] font-light leading-relaxed text-muted-foreground/70 sm:px-0">
          {t.caption}
        </figcaption>
      </figure>
    </div>
  )
}

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

        <div
          className="-mx-6 overflow-hidden rounded-xl border border-border/80 bg-muted/10 sm:mx-0"
          style={{ aspectRatio: '2400 / 900' }}
        >
          <DemoImage
            src="/how-i-work.webp"
            alt="A painted mountain range under low cloud over an open field, broken into a shifted grid of tiles"
            width={2400}
            height={900}
            sizes="(min-width: 704px) 672px, calc(100vw - 3rem)"
            className="block h-full w-full object-cover"
            priority
          />
        </div>

        <p className="mt-10 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/80">
          About · Brooklyn, NY
        </p>
        {/*
          The heading names the person and the seat and gets out of the way.
          It used to be a line about the practice, which put a slogan directly
          above the paragraph that states the same thing properly: the reader
          got the claim twice, weaker first.
        */}
        <h1 className="mt-2 text-2xl font-light tracking-tight text-foreground md:text-[26px]">
          Ieuan King, product design engineer
        </h1>

        <div className="mt-6 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
          <p className="text-[16px] text-foreground/85">
            I&apos;m a product design engineer trained as an anthropologist, which is mostly a way
            of saying I go and find the problem before I design for it. Most of that has gone into
            human-in-the-loop AI for expert users: sitting with the people doing the work, watching
            where the task actually breaks, and deciding what an agent should and should not be
            trusted with.
          </p>

          <section className="space-y-3">
            <h2 className={h2}>Three and a half years of it at Ubik</h2>
            <p>
              I co-founded{' '}
              <Link href="/demo/ubik" className={link}>
                Ubik Studio
              </Link>{' '}
              and led product design end to end. It was a desktop research environment where agents
              did the gathering, the reading and the drafting, and the person stayed in the loop at
              every point of judgment. A researcher opened a folder and it became a workspace:
              sources indexed locally, agents searching the literature and reading PDFs in
              parallel, drafts where every claim traced back to a real quote on a real page.
            </p>
            <p>
              The part I am proudest of is that human control was not a confirmation dialog bolted
              on at the end. It was load-bearing architecture. Actions were approved in batches
              rather than rubber-stamped one toast at a time, every review decision was recorded in
              a trail you could revisit afterwards, and an agent could stop mid-task and say it
              needed a person. We had a grammar for that, Human Needed, and it appeared in the
              product because it appeared in the agents: the thesis was written into the system
              prompts themselves, years before human-in-the-loop was an industry phrase.
            </p>
            <p>
              What I owned there is most of what I do now. The workspace model, the review
              surfaces, the evidence and citation UX, and the copy and interaction conventions
              across every surface. Front-end throughout. The research cycles: interviews,
              behavioral observation, session replays. On the agent side, the system prompts, the
              skills, the custom datasets, and the evaluation framework and ARC eval suite we used
              to train, tune and regression-test both the agents and the orchestration that
              coordinated them.
            </p>
            <p>
              It was a large multi-package system by the end: a desktop app, a web gateway, cloud
              agent deployments and a browser extension over a local-first storage model. 1,038
              commits between September 2023 and May 2026, with the design and research that came
              before the first one. It is a closed chapter now, the builds retired, and I am at
              peace with that. It was three and a half years spent asking one question in earnest:
              what does it take to make an AI research tool a person can actually trust?
            </p>
            <p>
              Two things from it stuck hardest. The first is that Ubik never had a design team or
              time to keep a spec in sync with itself, so what it had instead was Excalidraw boards
              nobody ever closed: landing explorations, user story wireframes, screenshots of the
              running app with corrections drawn straight over them, and the decision written
              beside the sketch. The second is when to stop drawing. Once my engineer teammate had
              a framework standing, developing the flow directly in code was faster than a
              wireframe that could only approximate the constraints that already existed. That is
              the shift that turned me into a design engineer.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={h2}>Designing through interaction</h2>
            <p>
              What replaced the wireframe is parameterized: versions of a design with the decisions
              left exposed as things you can move, so the question stops being whether a change
              reads better on a board and becomes what the change feels like under your hand.
              Density, timing, how much the system says before it acts. Those are not opinions you
              can settle in review. They are settings, and you find the right one by sitting inside
              a few of them.
            </p>
            <p>
              This is the same instinct as playing an instrument, and I do not think that is a
              coincidence. I am a self-taught musician and I perform regularly, in front of
              hundreds and sometimes thousands, on hardware synths and drum machines or DJing. On a
              synth you do not describe the sound you want. You turn something and listen, and you
              keep turning until the room agrees with you. Software has the same property and most
              design process throws it away.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={h2}>Field work, applied to product</h2>
            <p>
              The anthropology is the other half, and I use it on the job rather than beside it.
              Getting close to the problem means users, product research and session replays, and
              those come before a design change or a feature addition rather than after one as
              validation.
            </p>
            <p>
              The training is useful here for a specific reason. It teaches you that what people
              say they do and what they do are different data, that both are worth collecting, and
              that the gap between them is usually where the product is wrong. Watching someone
              work around your software is worth more than any number of them rating it.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={h2}>Brooklyn, and a large sheet of paper</h2>
            {/*
              Bartel-Pritchard Square, running. It floats beside the paragraph
              rather than sitting above it, because it is an aside about where
              this started, not the subject of the section.
            */}
            <div className="float-right ml-5 mb-2 w-[150px] sm:w-[200px]">
              <PixelRoundabout size={200} label={false} />
            </div>
            <p>
              I grew up here: in the park, on video games, and ideating products with my best
              friend. What that looked like at the time was large sheets of paper with every screen
              drawn by hand, one after another, until the whole thing existed on a table. We were
              designing flows before either of us knew the word for it. The circle beside this is
              Bartel-Pritchard Square, where Park Slope meets Windsor Terrace, drawn from the real
              one and running live.
            </p>
            <p>
              Right after college that turned into a company, and the paper turned into the boards.
              Ubik is where the practice became repeatable, and where, as AI arrived, I stopped
              handing the work off and started taking it into production myself.
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
              wanted something into a surface with the fingerprints wiped off.
            </p>
            <p>
              I am also an artist and a perfectionist, which mostly manifests as having a problem
              with nearly every app I use. That used to be a complaint. AI changed my habits
              completely and now it is a to-do list. I live in the science-fiction future I was
              raised to glorify, and the interesting part of it is not that a model can write code.
              It is that the distance between wanting a tool and having one collapsed. The longer
              version of that argument is{' '}
              <Link href="/writing/digital-gentrification" className={link}>
                Digital Gentrification
              </Link>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={h2}>Small software</h2>
            <p>
              I believe in small software: a tool built for one person doing one thing, which is
              allowed to be opinionated precisely because it does not have to be for everyone. The
              three below are the ones I open every day, and I open them because I made them.
            </p>
            {TOOLS.map((t) => (
              <Tool key={t.href} t={t} />
            ))}
          </section>

          <section className="space-y-3">
            <h2 className={h2}>Where that lands now</h2>
            <p>
              I take implementation when the work needs it rather than when the org chart allows
              it, which in practice means research and the build stay in the same week: what a
              session replay showed on Tuesday can be a working surface by Thursday, and the
              surface is what gets tested next rather than a deck about it.
            </p>
            <p>
              The current version of the Ubik argument is{' '}
              <Link href="/demo/hitl-kit" className={link}>
                HITL Kit
              </Link>
              , nineteen installable primitives for keeping a person in authority over an agent,
              and{' '}
              <Link href="/demo/eval-kit" className={link}>
                eval-kit
              </Link>
              , an evaluation framework where humans do the scoring. Both exist because benchmarks
              ask whether a model can finish a task alone and deployment asks whether it respected
              the person it was working with. Those are different questions and only one of them is
              the product.
            </p>
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
              arc rather than the conclusions. The full argument is my paper,{' '}
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
              Everything on this site is the same habit at different sizes: go and find the
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
