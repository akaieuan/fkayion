import { DemoImage } from '@/components/ui/demo-image'

/**
 * The gallery reaches past the article's measure, the way the product cards on
 * /demo/ubik do. A component sheet is the one thing on this page that is worse
 * for being squeezed into a 640px column: these are two-up card layouts with
 * nine-point registry ids in the corner, and at article width the ids stop
 * being readable, which is the whole point of showing them. See `.aka-breakout`.
 */

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

/** The primitives gallery: eleven captures from the shipped library. Moved verbatim from app/demo/hitl-kit/page.tsx. */
export function PrimitivesSection() {
  return (
        <div className="aka-breakout mt-12">
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
                <div className="overflow-hidden aka-card">
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
  )
}
