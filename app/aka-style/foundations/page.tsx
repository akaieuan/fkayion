import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const kicker = 'text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70'
const label = 'text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground/50'
const cardCls = 'rounded-xl border border-border bg-card/40 p-5'

export const metadata = {
  title: 'Foundations — tokens, scale & motion | akaSTYLE',
  description:
    'The measurable half of the system: the four-token color model, spacing and radius scales, the type ramp, motion timings and easings, breakpoints, and the copy-paste globals.css block.',
}

/** A row in a token table: name, live swatch or bar, and the literal value. */
function Row({
  name,
  value,
  children,
}: {
  name: string
  value: string
  children?: React.ReactNode
}) {
  return (
    <tr className="border-b border-border/40">
      <td className="py-2.5 pr-4 align-middle font-mono text-[11px] text-foreground/85">{name}</td>
      <td className="py-2.5 pr-4 align-middle">{children}</td>
      <td className="py-2.5 align-middle font-mono text-[10.5px] text-muted-foreground/70">{value}</td>
    </tr>
  )
}

function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full min-w-[460px] border-collapse text-left">
        <thead>
          <tr className="border-b border-border">
            {['token', '', 'value'].map((h, i) => (
              <th key={i} className={`${label} pb-2 pr-4 font-medium`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

export default function FoundationsPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/aka-style"
          className="mb-8 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          akaSTYLE
        </Link>

        <header className="mb-10">
          <p className={kicker}>Library · Foundations</p>
          <h1 className="mt-2 text-[clamp(1.7rem,5vw,2.4rem)] font-extralight leading-none tracking-tight text-foreground/90">
            Tokens, scale &amp; motion
          </h1>
          <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-muted-foreground">
            The measurable half. Every number the system uses, in one place, with the reasoning
            attached — because a scale you can&apos;t justify is a scale you&apos;ll abandon. Drop the
            block at the bottom into a new repo and the{' '}
            <Link
              href="/aka-style/primitives"
              className="underline decoration-border underline-offset-[3px] hover:text-foreground"
            >
              primitives
            </Link>{' '}
            land correctly.
          </p>
        </header>

        {/* COLOR */}
        <section className="scroll-mt-24">
          <p className={kicker}>Color</p>
          <h2 className="mt-2 text-xl font-light tracking-tight text-foreground/90">Four tokens</h2>
          <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
            Ground, ink, rule, accent. Everything else is one of those four at reduced opacity —
            which is why the system reads as one surface instead of a palette. OKLCH throughout, so
            lightness is perceptual and a dark-mode flip is a lightness change, not a re-pick.
          </p>
          <div className={`${cardCls} mt-6`}>
            <Table>
              <Row name="--background" value="oklch(0.145 0.004 106)">
                <span className="block h-6 w-full max-w-[160px] rounded border border-border bg-background" />
              </Row>
              <Row name="--foreground" value="oklch(0.93 0.003 106)">
                <span className="block h-6 w-full max-w-[160px] rounded border border-border bg-foreground" />
              </Row>
              <Row name="--border" value="oklch(0.27 0.004 106)">
                <span className="block h-6 w-full max-w-[160px] rounded border border-border bg-border" />
              </Row>
              <Row name="--primary" value="oklch(0.71 0.11 152)">
                <span className="block h-6 w-full max-w-[160px] rounded border border-border bg-primary" />
              </Row>
              <Row name="--card" value="foreground @ 4%">
                <span className="block h-6 w-full max-w-[160px] rounded border border-border bg-card" />
              </Row>
              <Row name="--muted" value="foreground @ 8%">
                <span className="block h-6 w-full max-w-[160px] rounded border border-border bg-muted" />
              </Row>
            </Table>
            <p className="mt-4 text-[11.5px] font-light leading-relaxed text-muted-foreground/70">
              <span className="text-foreground/80">The opacity ladder.</span> Text steps down{' '}
              <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[10.5px]">
                foreground → /85 → muted-foreground → /70 → /50 → /40
              </code>
              . Six steps is the whole hierarchy; if something needs a seventh, the layout is wrong,
              not the palette.
            </p>
          </div>
        </section>

        {/* SPACING */}
        <section className="mt-16">
          <p className={kicker}>Space</p>
          <h2 className="mt-2 text-xl font-light tracking-tight text-foreground/90">
            The rhythm
          </h2>
          <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
            A 4px base, but only six steps are ever used. Sections breathe at 64, cards at 20, and
            related things sit 8–12 apart. Constraint is the point: fewer choices, faster decisions,
            consistent result.
          </p>
          <div className={`${cardCls} mt-6`}>
            <Table>
              {[
                ['gap-2', '8px', 'Icon to label, chip to chip', 8],
                ['gap-3', '12px', 'Buttons in a row, list items', 12],
                ['mt-4', '16px', 'Inside a card, between blocks', 16],
                ['p-5', '20px', 'Card padding — the default', 20],
                ['mt-10', '40px', 'Header to first section', 40],
                ['mt-16', '64px', 'Between sections', 64],
              ].map(([t, v, use, px]) => (
                <Row key={t as string} name={t as string} value={v as string}>
                  <div className="flex items-center gap-3">
                    <span
                      className="block h-2 rounded-sm bg-foreground/25"
                      style={{ width: `${px as number}px` }}
                    />
                    <span className="text-[11px] font-light text-muted-foreground/60">{use}</span>
                  </div>
                </Row>
              ))}
            </Table>
          </div>
        </section>

        {/* RADIUS */}
        <section className="mt-16">
          <p className={kicker}>Shape</p>
          <h2 className="mt-2 text-xl font-light tracking-tight text-foreground/90">
            Radius &amp; rule
          </h2>
          <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
            Radius scales with the surface: the bigger the box, the softer the corner. One border
            weight everywhere — 1px at token color. No shadows anywhere in the system; depth comes
            from surface lightness, not from a glow.
          </p>
          <div className={`${cardCls} mt-6`}>
            <div className="flex flex-wrap items-end gap-6">
              {[
                ['rounded', '4px', 'code chips', 'rounded'],
                ['rounded-md', '6px', 'tags, sm buttons', 'rounded-md'],
                ['rounded-lg', '8px', 'buttons, inputs, media', 'rounded-lg'],
                ['rounded-xl', '12px', 'cards, panels', 'rounded-xl'],
                ['rounded-full', '∞', 'dots, toggles, avatars', 'rounded-full'],
              ].map(([n, v, use, cls]) => (
                <div key={n as string} className="flex flex-col items-center gap-2">
                  <span
                    className={`block h-14 w-14 border border-border bg-muted/40 ${cls as string}`}
                  />
                  <span className="font-mono text-[10px] text-foreground/80">{n}</span>
                  <span className="text-[10px] text-muted-foreground/50">{v}</span>
                  <span className="text-[9.5px] text-muted-foreground/40">{use}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TYPE */}
        <section className="mt-16">
          <p className={kicker}>Type</p>
          <h2 className="mt-2 text-xl font-light tracking-tight text-foreground/90">The ramp</h2>
          <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
            One family, four weights, and a ramp that leans light. Display sizes get{' '}
            <span className="text-foreground/85">extralight</span> with negative tracking; small text
            gets <span className="text-foreground/85">medium</span> with positive tracking. The
            inversion is deliberate — it&apos;s what makes small type read as a label rather than
            shrunken body copy.
          </p>
          <div className={`${cardCls} mt-6 space-y-4`}>
            {[
              ['Display', 'text-[clamp(1.7rem,5vw,2.4rem)] font-extralight tracking-tight', 'Page title'],
              ['Title', 'text-xl font-light tracking-tight', 'Section title'],
              ['Body', 'text-[13px] font-light leading-relaxed', 'The default paragraph, set light for long-form comfort.'],
              ['Small', 'text-[12px] font-light', 'Captions, secondary detail.'],
              ['Kicker', 'text-[11px] font-medium uppercase tracking-[0.18em]', 'SECTION LABEL'],
              ['Mono', 'font-mono text-[11px]', 'const token = value'],
            ].map(([n, cls, sample]) => (
              <div key={n as string} className="flex flex-col gap-1 border-b border-border/40 pb-3 last:border-0 last:pb-0">
                <div className="flex items-baseline justify-between gap-4">
                  <span className={label}>{n}</span>
                  <span className="font-mono text-[10px] text-muted-foreground/50">{cls}</span>
                </div>
                <p className={`${cls as string} text-foreground/85`}>{sample}</p>
              </div>
            ))}
          </div>
        </section>

        {/* MOTION */}
        <section className="mt-16">
          <p className={kicker}>Motion</p>
          <h2 className="mt-2 text-xl font-light tracking-tight text-foreground/90">
            Timings &amp; the rule
          </h2>
          <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
            One rule governs everything, including the brand engines:{' '}
            <span className="text-foreground/85">energy moves space, never brightness</span> — scale,
            position, displacement. No strobe, no flash, no opacity pulsing. It keeps long loops
            watchable and the whole system safe for photosensitive viewers.
          </p>
          <div className={`${cardCls} mt-6`}>
            <Table>
              {[
                ['150ms', 'Hover, focus — color only', 'transition-colors'],
                ['200ms', 'Tab content swap', 'animate-in fade-in duration-200'],
                ['300ms', 'Image hover scale', 'transition-transform duration-300'],
                ['450ms', 'Scroll reveal', 'opacity + translateY(16px)'],
                ['700ms', 'Hero entrance', 'motion-safe:animate-in fade-in slide-in-from-bottom-2'],
                ['120ms', 'Stagger step', 'animationDelay: step * 120ms'],
              ].map(([t, use, cls]) => (
                <Row key={t as string} name={t as string} value={cls as string}>
                  <span className="text-[11px] font-light text-muted-foreground/60">{use}</span>
                </Row>
              ))}
            </Table>
            <p className="mt-4 text-[11.5px] font-light leading-relaxed text-muted-foreground/70">
              <span className="text-foreground/80">Always gated.</span> Entrances use{' '}
              <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[10.5px]">motion-safe:</code>{' '}
              and canvas loops check{' '}
              <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[10.5px]">
                prefers-reduced-motion
              </code>{' '}
              before starting — reduced motion renders one representative frame, never a frozen blank.
            </p>
          </div>
        </section>

        {/* LAYOUT */}
        <section className="mt-16">
          <p className={kicker}>Layout</p>
          <h2 className="mt-2 text-xl font-light tracking-tight text-foreground/90">
            Widths &amp; breakpoints
          </h2>
          <div className={`${cardCls} mt-6`}>
            <Table>
              {[
                ['max-w-2xl', '672px', 'Write-ups — one column of prose'],
                ['max-w-3xl', '768px', 'Reference pages, galleries'],
                ['max-w-site', '1200px', 'Landing, project index'],
                ['site-inset', 'px-6', 'The universal gutter'],
                ['sm:', '640px', 'One column → two'],
                ['md:', '768px', 'Stacked hero → side by side'],
                ['lg:', '1024px', 'Two columns → three'],
              ].map(([t, v, use]) => (
                <Row key={t as string} name={t as string} value={v as string}>
                  <span className="text-[11px] font-light text-muted-foreground/60">{use}</span>
                </Row>
              ))}
            </Table>
            <p className="mt-4 text-[11.5px] font-light leading-relaxed text-muted-foreground/70">
              <span className="text-foreground/80">No device sniffing.</span> Layout responds to
              width; touch-specific behavior responds to{' '}
              <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[10.5px]">
                pointer: coarse
              </code>{' '}
              and <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[10.5px]">hover</code>.
              There is no <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[10.5px]">isMobile</code>{' '}
              anywhere in any repo running this system.
            </p>
          </div>
        </section>

        {/* THE BLOCK */}
        <section className="mt-16">
          <p className={kicker}>Transfer</p>
          <h2 className="mt-2 text-xl font-light tracking-tight text-foreground/90">
            The whole system, in one block
          </h2>
          <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
            Paste into <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[11px]">globals.css</code>{' '}
            and every primitive on this site renders correctly in the new repo. Tailwind v4 reads the
            variables directly — no config file needed.
          </p>
          <pre className="mt-6 overflow-x-auto rounded-xl border border-border/80 bg-muted/30 p-5 font-mono text-[10.5px] leading-relaxed text-foreground/80">
            {`@import "tailwindcss";

:root {
  --background:  oklch(0.985 0.002 106);
  --foreground:  oklch(0.185 0.004 106);
  --border:      oklch(0.90  0.003 106);
  --primary:     oklch(0.42  0.08  152);   /* the one accent */
  --card:        oklch(0.185 0.004 106 / 0.03);
  --muted:       oklch(0.185 0.004 106 / 0.06);
  --radius:      0.75rem;
}

.dark {
  --background:  oklch(0.145 0.004 106);
  --foreground:  oklch(0.93  0.003 106);
  --border:      oklch(0.27  0.004 106);
  --primary:     oklch(0.71  0.11  152);
  --card:        oklch(0.93  0.003 106 / 0.04);
  --muted:       oklch(0.93  0.003 106 / 0.08);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-border:     var(--border);
  --color-primary:    var(--primary);
  --color-card:       var(--card);
  --color-muted:      var(--muted);
  --color-muted-foreground: color-mix(in oklch, var(--foreground) 62%, transparent);
}

/* the two layout helpers everything uses */
.max-w-site { max-width: 1200px; }
.site-inset { padding-inline: 1.5rem; }`}
          </pre>
        </section>

        <section className="mt-14 rounded-xl border border-border/80 bg-muted/15 px-5 py-4">
          <p className="text-[14px] font-light leading-relaxed text-foreground/85">
            With the block above plus{' '}
            <Link
              href="/aka-style/primitives"
              className="text-primary underline decoration-border underline-offset-[3px]"
            >
              primitives
            </Link>{' '}
            and the{' '}
            <Link
              href="/aka-style/marks"
              className="text-primary underline decoration-border underline-offset-[3px]"
            >
              brand engine
            </Link>
            , a new repo starts with the same design language on day one — which is the entire point
            of writing this down.
          </p>
        </section>
      </article>
    </div>
  )
}
