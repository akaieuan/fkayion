import { DemoImage } from '@/components/ui/demo-image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { demoMetadata, demoSchema } from '@/lib/demo-seo'
import { JsonLd } from '@/components/seo/json-ld'
import { PlainSummary } from '@/components/ui/plain-summary'

const PATH = '/demo/hitl-kit'

/**
 * The gallery reaches past the article's measure, the way the product cards on
 * /demo/ubik do. A component sheet is the one thing on this page that is worse
 * for being squeezed into a 640px column: these are two-up card layouts with
 * nine-point registry ids in the corner, and at article width the ids stop
 * being readable, which is the whole point of showing them.
 */
const ROW_W = 'min(100vw - 3rem, 1180px)'
const CARD_ROW: React.CSSProperties = {
  width: ROW_W,
  marginInline: `calc((100% - ${ROW_W}) / 2)`,
}

/**
 * Eleven primitives, captured from the shipped library rather than redrawn.
 *
 * They are stills, not embeds. The components are React and live in another
 * app; running them here would mean vendoring nineteen components and their
 * state, and the copy on this page would then be describing a fork rather than
 * the thing anyone actually installs. A picture of the real kit is the honest
 * artifact, and it costs the page no JavaScript at all.
 *
 * Ordered roughly as the library is: the decision surfaces first, then what the
 * agent is doing, then what it found, then the composed screens built out of
 * the rest. Heights vary a lot, so the grid is CSS columns rather than a row
 * grid: a two-up row grid leaves a tall gap under every short card.
 */
const PRIMITIVES = [
  { id: 'hitl-card', name: 'Interrupt Cards', src: '/hitl-kit/interrupt-cards.webp', w: 1440, h: 724,
    alt: 'Three human-in-the-loop interrupt cards: search, review and write variants, each collapsed with a chevron' },
  { id: 'tool-call-preview', name: 'Tool Call Preview', src: '/hitl-kit/tool-call-preview.webp', w: 1440, h: 966,
    alt: 'A pending send_email tool call showing its rationale, four collapsed arguments, confidence, cost and scope chips, and approve or hold controls' },
  { id: 'ai-generation-*', name: 'AI Generation Scale', src: '/hitl-kit/ai-generation-scale.webp', w: 1440, h: 1982,
    alt: 'The five-point AI generation ordinal in four densities: slider, meter, badge and segmented scale' },
  { id: 'shared-primitives', name: 'Shared Primitives', src: '/hitl-kit/shared-primitives.webp', w: 1440, h: 1104,
    alt: 'The shared palette: five accent swatches, three approval badge variants, and an approve or reject row on three items' },
  { id: 'context-chips', name: 'Context Chips', src: '/hitl-kit/context-chips.webp', w: 1440, h: 708,
    alt: 'Removable pill chips for the notes, files and URLs attached to an agent run' },
  { id: 'mini-trace', name: 'MiniTrace', src: '/hitl-kit/minitrace.webp', w: 1440, h: 764,
    alt: 'A compact reasoning trace listing the steps an agent took' },
  { id: 'diff-result', name: 'Diff Result', src: '/hitl-kit/diff-result.webp', w: 1440, h: 992,
    alt: 'A proposed markdown rewrite shown as a before and after hunk with apply and keep-original controls' },
  { id: 'citation-result', name: 'Citation Result', src: '/hitl-kit/citation-result.webp', w: 1440, h: 882,
    alt: 'A citation card showing the claim, the source it came from, and the supporting passage' },
  { id: 'writing-agent', name: 'Writing Agent', src: '/hitl-kit/writing-agent.webp', w: 1440, h: 1090,
    alt: 'A writing agent card with title, target section, word range, evidence notes and six status chips' },
  { id: 'research-agent', name: 'Research Agent', src: '/hitl-kit/research-agent.webp', w: 1440, h: 828,
    alt: 'A research agent card listing its query, sources and current status' },
  { id: 'qa-flow', name: 'QA Flow', src: '/hitl-kit/qa-flow.webp', w: 1440, h: 1438,
    alt: 'A multi-step question and answer flow the agent walks a human through before continuing' },
] as const

export const metadata = demoMetadata(PATH, {
  title: 'HITL Kit — Human-in-the-Loop AI, Measured Properly',
  description:
    'An open-source design system, component library, and perspective paper on human-in-the-loop AI. Nineteen primitives, six @hitl-kit/* npm packages, a shadcn registry, and a research argument connecting them.',
})

export default function HitlKitProjectPage() {
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
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/80">

          Open source · v0.6
          </p>
          <h1
            className="mt-2 text-[clamp(1.85rem,5.5vw,2.85rem)] font-extralight leading-none tracking-tight text-balance text-foreground/90"
            aria-label="HITLKit"
          >
            HITLKit
          </h1>
          <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground">
          A design system, component library, and perspective paper on human-in-the-loop AI.{' '}
          <a
            href="https://www.hitlkit.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-border hover:decoration-foreground/60 underline-offset-[3px] transition-colors"
          >
            hitlkit.dev
          </a>
          </p>
        </header>

        <div className="-mx-6 overflow-hidden rounded-xl border border-border/80 bg-muted/10 sm:mx-0">
          <DemoImage
            src="/hitl-kit-hero.png"
            alt="HITL Kit — landing preview with headline and navigation"
            width={1024}
            height={535}
            className="block h-auto w-full"
            priority
          />
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href="https://www.hitlkit.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-border bg-foreground px-3.5 py-2 text-[13px] font-medium text-background transition-opacity hover:opacity-90"
          >
            Visit hitlkit.dev
            <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
          </a>
          <a
            href="https://github.com/akaieuan/HITL-KIT"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 py-2 text-[13px] font-medium text-foreground transition-colors hover:bg-muted/40"
          >
            GitHub · akaieuan/HITL-KIT
            <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden />
          </a>
          <Link
            href="/demo/hitl-ai"
            className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 py-2 text-[13px] font-medium text-foreground transition-colors hover:bg-muted/40"
          >
            See components
          </Link>
        </div>
        <p className="mt-2 text-[12px] font-light text-muted-foreground/80">
          Live site, paper, registry, and component showcase — the canonical home for the project.
        </p>

        <div style={CARD_ROW} className="mt-12">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/80">
            The primitives
          </p>
          <p className="mt-2 max-w-xl text-[12px] font-light leading-relaxed text-muted-foreground/70">
            Eleven of the nineteen, as they render in the shipped library. Each one carries its
            registry id in the corner, so the picture and the install command name the same thing.
          </p>
          <div className="mt-6 columns-1 gap-5 lg:columns-2">
            {PRIMITIVES.map((c) => (
              <figure key={c.src} className="mb-5 break-inside-avoid">
                <div className="overflow-hidden rounded-xl border border-border/70 bg-muted/10">
                  <DemoImage
                    src={c.src}
                    alt={c.alt}
                    width={c.w}
                    height={c.h}
                    sizes="(min-width: 1024px) 580px, calc(100vw - 3rem)"
                    className="block h-auto w-full"
                  />
                </div>
                <figcaption className="mt-2 flex items-baseline justify-between gap-3 text-[11px] font-light text-muted-foreground/70">
                  <span className="text-foreground/80">{c.name}</span>
                  <code className="font-mono text-[10px] text-muted-foreground/60">{c.id}</code>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-1 text-[11px] font-light text-muted-foreground/60">
            Install any of them with{' '}
            <code className="font-mono text-[10px]">npx shadcn@latest add https://www.hitlkit.dev/r/&lt;id&gt;.json</code>.
          </p>
        </div>

        <p className="mt-6 text-[12px] leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground/85">Earlier reference on this site:</span>{' '}
          <Link
            href="/demo/hitl-ai"
            className="underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground/50"
          >
            widget showcase
          </Link>
          {' · '}
          <Link
            href="/demo/hitl-ai/sheet"
            className="underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground/50"
          >
            component sheet
          </Link>
          . The shipped kit at hitlkit.dev supersedes this in-repo mock, but these are still
          useful for comparison.
        </p>
        <PlainSummary path={PATH} />

        <div className="mt-10 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">What this is</h2>
            <p>
              HITL Kit is three artifacts shipped as one project: a{' '}
              <strong className="font-medium text-foreground/90">perspective paper</strong> arguing that
              95% of enterprise AI pilots fail because we evaluate systems for autonomous completion when
              deployment demands human-AI collaboration; a{' '}
              <strong className="font-medium text-foreground/90">component library</strong> of nineteen HITL
              primitives that installs into any shadcn/ui project via one CLI command, plus six{' '}
              <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">@hitl-kit/*</code> npm
              packages; and a{' '}
              <strong className="font-medium text-foreground/90">shadcn-compatible registry</strong> I
              built, now served from the akaOSS site (the hitlkit.dev registry URLs keep resolving). The
              argument, the implementation, and the distribution, in one place.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">What I actually built</h2>
            <ul className="list-disc space-y-2 pl-5 marker:text-muted-foreground/50">
              <li>
                <span className="text-foreground/85">An AI Measurement Problem (paper).</span> A
                perspective piece synthesizing benchmark saturation, cognitive neuroscience, uncertainty
                quantification, and enterprise deployment data into the Assist-Not-Complete paradigm.
                Rendered live on the site from a single markdown source, with a sticky table of contents
                and editorial typography.
              </li>
              <li>
                <span className="text-foreground/85">Nineteen HITL primitives.</span> Among them: Interrupt
                Card, Subagent Status, MiniTrace, AI Generation Scale, Context Chips, QA Flow, Writing
                Agent, Research Agent, Batch Queue, Search Result Card, Approve/Reject Row. Each one is the
                physical embodiment of a specific claim from the paper.
              </li>
              <li>
                <span className="text-foreground/85">Shadcn registry with nineteen endpoints.</span>{' '}
                registry.json, a build pipeline (pnpm registry:build), and nineteen JSON manifests served
                at hitlkit.dev/r/*.json. Transitive dependencies resolve correctly. End-to-end tested:
                anyone on the open internet can run{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">
                  npx shadcn@latest add https://www.hitlkit.dev/r/hitl-card.json
                </code>{' '}
                and get a working install.
              </li>
              <li>
                <span className="text-foreground/85">The site itself.</span> Next.js 16, Tailwind CSS v4,
                TypeScript, React 19. Dark-mode-first with Geist and JetBrains Mono. Four routes: a
                landing that frames the thesis, a live component showcase, a markdown paper renderer, and
                a registry-install reference page with copy-button commands for every primitive.
              </li>
              <li>
                <span className="text-foreground/85">A taxonomy, not a grab-bag.</span> Every primitive
                traces to a named research claim: MiniTrace instantiates the supporting-facts requirement
                from HotpotQA (Yang 2018), the AI Generation Scale operationalises the scaffolding
                principle from Dhillon 2024, the Interrupt Card is the agency-preservation boundary from
                §3.1. The library is the paper, made clickable.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Why it&apos;s unusual</h2>
            <p>
              Most open-source AI UI kits are commodities: chat bubbles, tool-call cards, maybe a
              markdown renderer. HITL Kit couples a{' '}
              <strong className="font-medium text-foreground/90">
                research argument with an installable implementation
              </strong>
              . I wrote the paper that says enterprise AI fails because it measures the wrong thing, then
              built the component library that makes the alternative buildable, then set up the shadcn
              registry so other teams can drop those components into their own agentic products.
              Positioning, authorship, engineering, and distribution are all one piece of work. The
              measurement critique is not separate from the UI library. The UI library is the critique
              made useful.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">How I describe the skill set</h2>
            <p className="text-[14px] leading-relaxed">
              Technical writing and research synthesis, design systems, component library engineering,
              shadcn CLI and registry authoring, Next.js App Router, Tailwind CSS v4, TypeScript, React
              19, open-source product positioning, agentic UI pattern design, human-AI collaboration
              research, and the ability to connect all of those into one shippable artifact.
            </p>
          </section>

          <section className="rounded-xl border border-border/80 bg-muted/15 px-5 py-4">
            <p className="text-[14px] leading-relaxed text-foreground/85">
              Most AI UI kits are commodities. HITL Kit couples a research argument with a buildable
              thing. I wrote the paper that justifies the library, built the library, hosted the
              registry, and made every primitive trace back to a specific claim. The paper is not
              marketing for the components; the components are the paper, made installable.
            </p>
          </section>
        </div>
      </article>
    </div>
  )
}
