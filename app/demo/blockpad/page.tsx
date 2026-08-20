import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { DemoImage } from '@/components/ui/demo-image'
import { BlockpadMark } from '@/components/ui/blockpad-mark'

const kicker = 'text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70'
const label = 'text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground/50'
const code = 'rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]'

export const metadata = {
  title: 'Blockpad — Sketch a Layout, Hand an Agent the Structure | akaBuild',
  description:
    'A macOS sketchpad that opens over your editor on a hotkey. You draw where the boxes go, press copy, and paste. The agent gets the layout as an exact scene tree rather than a paragraph or a screenshot: about 117 tokens against 2,000. Swift, SwiftUI, AppKit, MIT.',
}

/** The design rules, stated as decisions rather than features. */
const rules = [
  {
    h: 'It persists, it does not dismiss.',
    t: 'UI iteration is iterative. You send a sketch, the agent builds it, it is 70% right, you nudge two blocks and send again. A launcher that cleared on send would make you redraw every round. So the hotkey toggles rather than summons, contents survive restart, Esc hides without discarding, and clearing is explicit.',
  },
  {
    h: 'The tree is the default, not the image.',
    t: 'The opposite of what every screenshot tool does, and the position the whole project rests on.',
  },
  {
    h: 'Never press Return.',
    t: 'Blockpad pastes and stops. The agent might be mid-plan or waiting on a permission gate, and a stray prompt at the wrong moment costs more than the keystroke saves.',
  },
  {
    h: 'No model inside it.',
    t: 'No inference, no account, no cloud, nothing agent-initiated. It is an input device.',
  },
  {
    h: 'If a control is not in the bar, it does not exist.',
    t: 'Which is only honest if the bar stays short: hence seven dock slots, with shapes and connectors collapsed into flyouts.',
  },
]

/** Measured on the scene above, not estimated from a similar one. */
const payload = [
  { mode: 'Tree only', cost: '~117 tokens', use: 'Default. Structural changes, layout specs.', lead: true },
  { mode: 'Tree + image', cost: '~2,100 tokens', use: 'When proportion or feel matters.' },
  { mode: 'Image only', cost: '~1,981 tokens', use: 'Annotated screenshots, where the tree is meaningless.' },
]

const done = [
  'Floating panel, global hotkey toggle, persistent resizable canvas',
  'Frame, rectangle, ellipse, diamond, arrow, line, freehand, text, eraser, pan',
  'Stroke and fill colour, fill style, corner style, opacity, layer order',
  'Canvas themes, crisp/sketch renderer, component library of eight presets',
  'Alignment guides, grid snap, marquee select, undo/redo',
  'Tree serialiser with run-collapsing, three payload modes, clipboard copy',
  'App icon generated from the palette, MIT licensed',
]

const next = [
  'Screenshot-backed mode with redaction',
  'Project detection, writing sketches into .blockpad/ beside the code they made',
  'Sparkle, notarisation, DMG',
]

const questions = [
  {
    h: 'Is tree-only actually good enough as the default?',
    t: 'Ten sketches, tree-only against tree plus image, into a real agent, compare the diffs. Two hours of work that decides the default send mode.',
  },
  {
    h: 'Terminal paste.',
    t: 'Bracketed paste differs across Ghostty, iTerm2, Warp, Kitty and Terminal.app, and multi-line trees may mangle. Highest-risk unknown.',
  },
  {
    h: 'Activation timing.',
    t: 'A fixed sleep before pasting is a magic number that will be flaky under load.',
  },
]

const TREE = `Frame 1440x900  "Desktop"
  Box 480x900  @right-full-height  [slate]
    Box 136x40  @left-top  "All"
    Box 136x40  @top  "Active"
    Box 136x40  @top  "Archived"
    Box 424x64  ×6  @left
      Box 24x24  @left  [sage]
    Box 200x56  @left-bottom  "Reset"  [slate]
    Box 200x56  @bottom  "Apply"  [dusty red]
  Text  @left-top  "main content unchanged"  [slate]
  Text  @left  "panel becomes bottom drawer under 768"  [amber]`

export default function BlockpadPage() {
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
          <BlockpadMark size={84} title="" className="shrink-0" />
          <div>
            <p className={kicker}>Personal tool · macOS · MIT</p>
            <h1 className="mt-1 text-[clamp(1.7rem,5vw,2.5rem)] font-extralight leading-none tracking-tight text-foreground/90">
              Blockpad
            </h1>
          </div>
        </header>

        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
          A sketchpad for macOS that opens over your editor on a hotkey. You draw where the boxes
          go, press copy, and paste. Your coding agent gets the layout as exact structure, not a
          paragraph and not a screenshot.
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href="https://github.com/akaieuan/blockpad"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            GitHub — akaieuan/blockpad
            <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
          </a>
          <span className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground">
            M0 shipped · delivery in progress
          </span>
        </div>
        <p className="mt-2 text-[12px] font-light text-muted-foreground/80">
          Free and MIT licensed. Swift, SwiftUI, AppKit, macOS 14+, one dependency. Built for
          myself, open because there is no reason for it not to be.
        </p>

        <figure className="-mx-6 mt-10 overflow-hidden rounded-xl border border-border/80 bg-muted/10 sm:mx-0">
          <DemoImage
            src="/blockpad-hero.webp"
            alt="The Blockpad window: a floating canvas with a filter panel sketched on it, a collapsible inspector rail on the left, and a tool dock along the bottom"
            width={1600}
            height={1003}
            className="block h-auto w-full"
            priority
          />
        </figure>
        <p className="mt-2 text-[11px] font-light text-muted-foreground/60">
          One window, one canvas, one Copy button. The dock sits along the bottom so the top edge of
          the drawing stays clear.
        </p>

        <div className="mt-12 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
          {/* --------------------------------------------------- why */}
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Why it exists</h2>
            <p>
              Figma and Excalidraw are good tools. They are also another tab, another context, a lot
              of clicks, and an account you have to keep, and the genuinely useful tiers cost money.
              None of that is wrong for design work. It is all wrong for the ninety seconds where you
              just need to say where the boxes go.
            </p>
            <p>
              Because that is usually the whole problem. You are in a repo, working with an agent, and
              you need to say{' '}
              <em className="not-italic text-foreground/80">
                &ldquo;filters go in a right-side panel, tabs across the top, reset and apply in the
                footer.&rdquo;
              </em>{' '}
              You type it. The agent builds something reasonable and wrong. You correct it. Closer,
              still wrong. Three rounds later you have spent real tokens, real minutes, and real
              attention reading implementations you are about to throw away.
            </p>
            <p className="text-foreground/85">The cost is not the message. It is the rounds.</p>
          </section>

          {/* ------------------------------------------- where it came from */}
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              Where this came from
            </h2>
            <p>
              I ran design at a startup, and spent most of that stretch building with agentic tools,
              writing code to produce design rather than the other way round.
            </p>
            <p>
              What I kept noticing was my own workaround. Any time I needed an agent to actually
              understand a layout, I would sketch a rough wireframe and screenshot it. Not because
              the screenshot was good. Because it carried my intent in a way a paragraph never did.
              It was the fastest way to point at what I meant, so I did it constantly, in whatever
              tool happened to be open.
            </p>
            <p>
              The screenshot was always the wrong artifact, though. It hands over a{' '}
              <em className="not-italic text-foreground/80">picture</em> of a structure and asks the
              model to work backwards into the structure again, which it sometimes gets right and
              sometimes doesn&apos;t, and either way you pay for the guess. What was in my head was
              never pixels. It was &ldquo;panel on the right, six rows, two buttons in the
              footer.&rdquo;
            </p>
            <p className="text-foreground/85">Blockpad is that workaround turned into a tool.</p>
          </section>

          {/* ------------------------------------------------ the payload */}
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              What actually gets sent
            </h2>
            <p>
              Blocks are typed, so the scene graph serialises to text locally. No inference, no
              model, no API call. This sketch:
            </p>

            <figure className="!mt-5 overflow-hidden rounded-xl border border-border/80 bg-muted/10">
              <DemoImage
                src="/blockpad-payload.webp"
                alt="The sketch: a right-hand filter panel with three tabs, six rows each carrying a small checkbox, and Reset and Apply in the footer"
                width={1600}
                height={1051}
                className="block h-auto w-full"
              />
            </figure>

            <p className="!mt-5">becomes exactly this, character for character:</p>
            <pre className="!mt-3 overflow-x-auto rounded-xl border border-border/80 bg-muted/20 p-4 font-mono text-[11.5px] leading-relaxed text-foreground/80">
              {TREE}
            </pre>

            <div className="!mt-6 overflow-hidden rounded-xl border border-border/80">
              <div className="grid grid-cols-[minmax(0,7rem)_minmax(0,7rem)_minmax(0,1fr)] gap-x-4 border-b border-border/80 bg-muted/20 px-4 py-2.5">
                <span className={label}>Mode</span>
                <span className={label}>Cost</span>
                <span className={label}>Use</span>
              </div>
              {payload.map((row) => (
                <div
                  key={row.mode}
                  className="grid grid-cols-[minmax(0,7rem)_minmax(0,7rem)_minmax(0,1fr)] gap-x-4 border-b border-border/60 px-4 py-3 text-[13px] last:border-b-0"
                >
                  <span className={row.lead ? 'font-medium text-foreground' : 'text-foreground/75'}>
                    {row.mode}
                  </span>
                  <span
                    className={`font-mono tabular-nums ${
                      row.lead ? 'font-medium text-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    {row.cost}
                  </span>
                  <span className="text-muted-foreground">{row.use}</span>
                </div>
              ))}
            </div>

            <p className="!mt-5">
              Roughly <span className="text-foreground/85">17 times cheaper</span>, and structurally{' '}
              <em className="not-italic text-foreground/85">more</em> precise: six identical rows
              collapse to <code className={code}>×6</code> with an exact count, rather than a model
              counting rectangles in a JPEG and getting five.
            </p>
            <p className="text-[13px] text-muted-foreground/70">
              Worth stating plainly: the image figure uses Anthropic&apos;s{' '}
              <code className={code}>(width × height) / 750</code>, and the text figure is a
              character-based estimate. The claim is the order of magnitude, not the third digit.
            </p>
          </section>

          {/* --------------------------------------------------- the rules */}
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              What decides arguments
            </h2>
            <ul className="!mt-4 list-none space-y-4 p-0">
              {rules.map((rule) => (
                <li key={rule.h} className="border-l border-border pl-4">
                  <p className="text-[14px] text-foreground/85">{rule.h}</p>
                  <p className="mt-1 text-[14px]">{rule.t}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* ------------------------------------------------ the redesign */}
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              The look changed twice, on purpose
            </h2>
            <p>
              <span className="text-foreground/85">Hand-drawn to crisp.</span> The original plan
              specified Excalidraw-style rough strokes, arguing roughness signals{' '}
              <em className="not-italic text-foreground/80">provisional</em> and stops a model
              reading proportions as exact. That risk turned out to be covered elsewhere: the tree
              states coordinates and counts outright, so precision never depends on the picture. The
              default is now clean geometry. The rough renderer survives behind a Crisp/Sketch
              toggle rather than being deleted.
            </p>
            <p>
              <span className="text-foreground/85">Top bar to bottom dock.</span> The first chrome
              was a top-centre island of equal icons, which is unmistakably somebody else&apos;s
              signature. Moving tools to a dock along the bottom keeps the top edge of the drawing
              clear, which is where you actually look, and gives the window a silhouette of its own.
              The inspector became a collapsible rail of rows: leading glyph, quiet label, control on
              the trailing edge, hairline between.
            </p>
          </section>

          {/* ---------------------------------------------------- the mark */}
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              The mark is the operation
            </h2>
            <div className="!mt-4 flex flex-wrap items-end gap-6">
              {[128, 64, 32, 18].map((size) => (
                <span key={size} className="flex flex-col items-center gap-2">
                  <BlockpadMark size={size} title={size === 128 ? 'The Blockpad mark' : undefined} />
                  <span className={label}>{size}px</span>
                </span>
              ))}
            </div>
            <p className="!mt-5">
              A white squircle on Apple&apos;s icon geometry, 22.37% continuous corner radius, inset
              in its canvas, holding three blocks from the app&apos;s own palette: slate as the main
              column, dusty red and amber stacked beside it. It is a blockout of a layout, which is
              literally what the app does.
            </p>
            <p>
              Three blocks, not four, because four turns to mush at 16pt. The drop shadow is dropped
              below 64pt where it only muddies the silhouette, and the hairline border appears only
              at 128pt and up, where it stops a white card dissolving into a white page.
            </p>
            <p>
              It is generated in Core Graphics from the palette rather than stored as a binary asset,
              so changing a swatch changes the icon. The SVG is emitted from the same ratios, so
              vector and raster cannot drift.
            </p>
          </section>

          {/* ------------------------------------------------- the guides */}
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Alignment guides</h2>
            <p>
              Grid snapping gives tidy coordinates but not tidy layouts: two boxes can both sit on
              the grid and still look a step out. Dragging solves the three interesting lines per
              axis, both edges and the centre, against every other block, pulls to the nearest match,
              and draws a guide across the objects that share it. Multi-selection moves as a rigid
              body, so its internal spacing cannot drift.
            </p>
          </section>

          {/* -------------------------------------------------- why native */}
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              Why native, not a web app
            </h2>
            <p>
              A web app cannot register a global hotkey, cannot read which application was frontmost,
              and cannot post a synthetic paste event, which is the entire delivery mechanism rather
              than a detail of it. Tauri could do all three, but would spend a webview against a
              200ms budget.
            </p>
            <p>
              The canvas is an <code className={code}>NSView</code> drawing through Core Graphics,
              hosted in SwiftUI. AppKit because hit testing, drag handles and marquee select get
              miserable in pure SwiftUI past forty blocks, and{' '}
              <code className={code}>UndoManager</code> comes free.
            </p>
            <p className="text-foreground/85">
              200ms from keypress to first stroke. That is the product.
            </p>
          </section>

          {/* --------------------------------------------------- the stack */}
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Tech stack</h2>
            <p className="font-mono text-[13px] text-foreground/80">
              Swift 6 · SwiftUI · AppKit · Core Graphics · macOS 14+ · one dependency
            </p>
            <p>No backend, no account, no inference, nothing leaves the machine.</p>
            <p>
              Not App Store: the sandbox blocks synthetic events and cross-app activation, so it
              ships as a signed, notarised DMG.
            </p>
            <p className="rounded-xl border border-border/80 bg-muted/20 p-4 text-[13.5px]">
              The hotkey is <code className={code}>Ctrl+Opt+B</code>. macOS holds{' '}
              <code className={code}>Ctrl+Opt+Space</code> for Input Sources by default, so Space is
              offered as an alternative only once you have freed it in Keyboard settings.
            </p>
          </section>

          {/* -------------------------------------------------- the status */}
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Status</h2>

            <p className={`${label} !mt-4`}>Done</p>
            <ul className="!mt-2 list-none space-y-1.5 p-0 text-[14px]">
              {done.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span aria-hidden className="mt-[0.55em] h-px w-2.5 shrink-0 bg-border" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className={`${label} !mt-6`}>Next</p>
            <p className="!mt-2 rounded-xl border border-border/80 bg-muted/20 p-4 text-[13.5px]">
              <span className="text-foreground/85">Delivery (M1).</span> Capture the frontmost app
              before the panel takes focus, then paste straight into it: text everywhere, images
              into editors, and a written-to-disk path for terminals, which is what makes CLI agents
              work at all. Riskiest milestone, and the one the whole idea rests on.
            </p>
            <ul className="!mt-3 list-none space-y-1.5 p-0 text-[14px]">
              {next.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span aria-hidden className="mt-[0.55em] h-px w-2.5 shrink-0 bg-border" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* ------------------------------------------------- open things */}
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              Open questions worth naming
            </h2>
            <ol className="!mt-4 list-none space-y-4 p-0">
              {questions.map((q, i) => (
                <li key={q.h} className="flex gap-3.5">
                  <span className="mt-[0.15em] font-mono text-[12px] tabular-nums text-muted-foreground/50">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block text-[14px] text-foreground/85">{q.h}</span>
                    <span className="mt-1 block text-[14px]">{q.t}</span>
                  </span>
                </li>
              ))}
            </ol>
          </section>

          {/* ---------------------------------------------------- who / why */}
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Who built it</h2>
            <p>
              Ieuan King, design and build. MIT licensed, so anyone can fork it, ship it, or take the
              tree format and do something better with it.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              Why this one matters to me
            </h2>
            <p>
              Design tools assume you are doing design. Most of the time I am not. I am trying to be
              understood by something that will write the code, and the gap between what I can see in
              my head and what I can type is where the time goes.
            </p>
            <p>
              This does not make anything prettier. It makes intent cheap to transmit, so anyone who
              can drag a rectangle can specify an interface well enough to have it built. For
              internal tools, the ones nobody staffs a designer on, that is the whole thing.
            </p>
          </section>
        </div>
      </article>
    </div>
  )
}
