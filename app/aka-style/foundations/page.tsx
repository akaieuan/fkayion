import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const kicker = 'text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70'
const label = 'text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground/50'
const cardCls = 'aka-card p-5'
const codeCls = 'rounded bg-muted/60 px-1 py-0.5 font-mono text-[10.5px]'

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
          <h2 className="mt-2 text-xl font-light tracking-tight text-foreground/90">Ground and ink</h2>
          <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
            Two tokens carry almost everything: a ground and an ink. OKLCH throughout, so a
            dark-mode flip is a lightness change rather than a re-pick, and the values below are the
            ones actually in <code className={codeCls}>globals.css</code>, light then dark.
          </p>
          <div className={`${cardCls} mt-6`}>
            <Table>
              <Row name="--background" value="0.97 0.002 106 / 0.09 0 0">
                <span className="block h-6 w-full max-w-[160px] rounded border border-border bg-background" />
              </Row>
              <Row name="--foreground" value="0.122 0.001 0 / 0.985 0 0">
                <span className="block h-6 w-full max-w-[160px] rounded border border-border bg-foreground" />
              </Row>
              <Row name="--muted-foreground" value="0.46 0.001 0 / 0.708 0 0">
                <span className="block h-6 w-full max-w-[160px] rounded border border-border bg-muted-foreground" />
              </Row>
              <Row name="--border" value="0.88 0.003 106 / white 10%">
                <span className="block h-6 w-full max-w-[160px] rounded border border-border bg-border" />
              </Row>
              <Row name="--select" value="0.58 0.13 250 / 0.707 0.108 152">
                <span
                  className="block h-6 w-full max-w-[160px] rounded border border-border"
                  style={{ background: 'var(--select)' }}
                />
              </Row>
            </Table>
            <p className="mt-4 text-[11.5px] font-light leading-relaxed text-muted-foreground/70">
              <span className="text-foreground/80">One accent, and it is not --primary.</span>{' '}
              <code className={codeCls}>--select</code> is what a selected tab, selected text and a
              focus ring take, and it is the only place a hue is allowed to lead. It changes hue
              across themes rather than lightness, because the blue that reads as &ldquo;chosen&rdquo;
              on paper goes muddy on the dark ground.{' '}
              <code className={codeCls}>--primary</code> is near-black ink in light and the green in
              dark; it is a shadcn token the primitives inherited, not the system&apos;s accent.
            </p>
          </div>

          <div className={`${cardCls} mt-3`}>
            <p className={label}>The opacity ladder, and why it is not classes</p>
            <p className="mt-2 text-[12.5px] font-light leading-relaxed text-muted-foreground">
              Ink steps down in six, and that is the whole hierarchy. It is written by hand rather
              than with <code className={codeCls}>/nn</code> utilities, because on Tailwind v3 the
              colours above are bare <code className={codeCls}>var()</code> values with no{' '}
              <code className={codeCls}>&lt;alpha-value&gt;</code> slot. Tailwind cannot compute an
              alpha for them, so <code className={codeCls}>text-foreground/85</code> compiles to
              nothing at all: there is not one token slash-alpha utility in the built stylesheet,
              only the literal <code className={codeCls}>white/</code> and{' '}
              <code className={codeCls}>black/</code> ones.
            </p>
            <p className="mt-2 text-[12.5px] font-light leading-relaxed text-muted-foreground">
              So the two steps that carry long-form reading are mixed by hand, in sRGB, because the
              tokens are achromatic with an explicit hue of 0 and an OKLCH mix would interpolate it.
            </p>
            <pre className="mt-3 overflow-x-auto aka-card-well rounded-lg px-3 py-2 font-mono text-[10.5px] leading-relaxed text-muted-foreground/75">
              {`.aka-ink-body  { color: color-mix(in srgb, var(--foreground) 82%, transparent) }
.aka-ink-quiet { color: color-mix(in srgb, var(--foreground) 62%, transparent) }`}
            </pre>
            <p className="mt-3 text-[11.5px] font-light leading-relaxed text-muted-foreground/70">
              Everything on the site still written as{' '}
              <code className={codeCls}>text-foreground/85</code> is therefore full ink today. Giving
              the tokens an alpha slot would fix it in one line and change the colour of a great deal
              of text at once, so it is a design decision waiting to be made, not a bug to sneak in.
            </p>
          </div>
        </section>

        {/* SURFACES */}
        <section className="mt-16">
          <p className={kicker}>Surfaces</p>
          <h2 className="mt-2 text-xl font-light tracking-tight text-foreground/90">
            The ground under a mark
          </h2>
          <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
            A project plate is one colour: the plate ground with a percentage of the project&apos;s
            own hue mixed into it. Both halves are tokens, and both differ per theme for reasons that
            are not symmetry.
          </p>
          <div className={`${cardCls} mt-6`}>
            <Table>
              <Row name="--stamp-ground" value="0.935 0 0 / 0.2 0 0">
                <span
                  className="block h-6 w-full max-w-[160px] rounded border border-border"
                  style={{ background: 'var(--stamp-ground)' }}
                />
              </Row>
              <Row name="--plate-mix" value="10% / 7%">
                <span className="text-[11px] font-light text-muted-foreground/60">
                  How much of the project&apos;s hue reaches the plate
                </span>
              </Row>
              <Row name="--surface" value="0.945 0.004 106 / 0.145 0 0">
                <span
                  className="block h-6 w-full max-w-[160px] rounded border border-border"
                  style={{ background: 'var(--surface)' }}
                />
              </Row>
            </Table>
            <p className="mt-4 text-[11.5px] font-light leading-relaxed text-muted-foreground/70">
              <span className="text-foreground/80">Dark is the reference.</span> Light is not the
              same number: a hue over a light ground shows up more readily than the same hue over a
              dark one, so light takes more mix to read as the same character. And{' '}
              <code className={codeCls}>--stamp-ground</code> steps <em>down</em> from the page in
              light while it steps up in dark. It used to sit lighter than the background, which made
              every plate in light mode effectively invisible.
            </p>
            <p className="mt-2 text-[11.5px] font-light leading-relaxed text-muted-foreground/70">
              <span className="text-foreground/80">The mix is sRGB, not OKLCH.</span> The ground is
              achromatic but carries an explicit hue, and an OKLCH mix interpolates that channel: a
              green, a blue and a violet all came out pink. It is also why the plate ground is
              neutral rather than warm.
            </p>
          </div>

          <div className={`${cardCls} mt-3`}>
            <p className={label}>Palettes that belong to one drawing</p>
            <p className="mt-2 text-[12.5px] font-light leading-relaxed text-muted-foreground">
              When artwork has a value per theme, the palette goes in custom properties and the
              browser picks. Reading the theme in JavaScript would make a static drawing a client
              component, which is the whole cost being avoided. Two live examples:{' '}
              <code className={codeCls}>--bp-*</code>, which carries Blockpad&apos;s dark and light
              icon masters, and <code className={codeCls}>--pixel-face-*</code>, which re-homes the
              five face accents the circleheads handoff supplies as literal hex.
            </p>
            <p className="mt-2 text-[12.5px] font-light leading-relaxed text-muted-foreground">
              The rule that keeps this honest: the source value stays written down where the design
              put it, and the token is where it is <em>read</em> from. So dark restates the
              handoff&apos;s hex exactly and only light diverges.
            </p>
          </div>

          <div className={`${cardCls} mt-3`}>
            <p className={label}>The one exception to Tailwind</p>
            <p className="mt-2 text-[12.5px] font-light leading-relaxed text-muted-foreground">
              An artefact ported in from elsewhere keeps its own stylesheet, scoped to a class, the
              way <code className={codeCls}>app/trickle.css</code> keeps the kit&apos;s keyframes and{' '}
              <code className={codeCls}>bodylog-v1/v1.css</code> keeps the circleheads token set
              under <code className={codeCls}>.bl1</code>. Rewriting a hundred and fifty custom
              properties as utilities is a redesign, not a port, and the point of keeping an artefact
              is that it is the version something was decided from.
            </p>
            <p className="mt-2 text-[12.5px] font-light leading-relaxed text-muted-foreground">
              Scoped, always, so none of it reaches the site. And a ported theme hangs off its own
              attribute rather than the site&apos;s <code className={codeCls}>.dark</code>, because
              the artefact&apos;s theme and the page&apos;s are not the same state.
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
            weight everywhere: 1px at token colour. Depth comes from surface lightness, not from a
            glow. Nothing the system itself draws carries a shadow, and the ones you will find in
            the repo are inside product mockups drawing someone else&apos;s interface.
          </p>
          <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
            Three steps are derived from <code className={codeCls}>--radius: 0.625rem</code> in the
            Tailwind config, so moving one number moves the set. Only{' '}
            <code className={codeCls}>xl</code> and the default are Tailwind&apos;s own.
          </p>
          <div className={`${cardCls} mt-6`}>
            <div className="flex flex-wrap items-end gap-6">
              {[
                ['rounded', '4px', 'code chips', 'rounded'],
                ['rounded-sm', '6px', 'tags, sm buttons', 'rounded-sm'],
                ['rounded-md', '8px', 'inputs', 'rounded-md'],
                ['rounded-lg', '10px', 'buttons, media', 'rounded-lg'],
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
                ['max-w-site', '1180px', 'Landing, project index'],
                ['site-inset', 'px-5 → px-16', 'The universal gutter, widening by breakpoint'],
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
            Two files, because this is Tailwind v3 and the mapping from token to utility lives in a
            config. It used to be printed here as v4 (<code className={codeCls}>@import
            &quot;tailwindcss&quot;</code>, <code className={codeCls}>@theme inline</code>, no config
            file), which does not parse on v3 and is exactly the mistake a generator makes when it
            guesses the version.
          </p>
          <pre className="mt-6 overflow-x-auto aka-card-well p-5 font-mono text-[10.5px] leading-relaxed text-foreground/80">
            {`/* globals.css */
:root {
  --background:       oklch(0.97  0.002 106);
  --foreground:       oklch(0.122 0.001 0);
  --muted-foreground: oklch(0.46  0.001 0);
  --border:           oklch(0.88  0.003 106);
  --select:           oklch(0.58  0.13  250);  /* the one accent */
  --radius:           0.625rem;
}

.dark {
  --background:       oklch(0.09  0 0);
  --foreground:       oklch(0.985 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --border:           oklch(1 0 0 / 10%);
  --select:           oklch(0.707 0.108 152.216);
}

@layer components {
  .max-w-site { max-width: 1180px; }
  .site-inset { @apply px-5 sm:px-6 md:px-12 lg:px-16; }
  /* the ink steps, because /nn utilities do not compile on bare var() tokens */
  .aka-ink-body  { color: color-mix(in srgb, var(--foreground) 82%, transparent); }
  .aka-ink-quiet { color: color-mix(in srgb, var(--foreground) 62%, transparent); }
}`}
          </pre>
          <pre className="mt-3 overflow-x-auto aka-card-well p-5 font-mono text-[10.5px] leading-relaxed text-foreground/80">
            {`// tailwind.config.cjs
module.exports = {
  darkMode: ['class'],
  // every hover: compiles inside @media (hover: hover), so a tap on a
  // touch screen cannot latch a hover state that never releases
  future: { hoverOnlyWhenSupported: true },
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      maxWidth: { site: '1180px' },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        border:     'var(--border)',
        muted: { DEFAULT: 'var(--muted)', foreground: 'var(--muted-foreground)' },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}`}
          </pre>
        </section>

        <section className="mt-14 aka-card-well px-5 py-4">
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
