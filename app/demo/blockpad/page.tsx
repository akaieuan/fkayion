import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { DemoImage } from '@/components/ui/demo-image'
import { BlockpadMark } from '@/components/ui/blockpad-mark'
import { demoMetadata, demoSchema } from '@/lib/demo-seo'
import { JsonLd } from '@/components/seo/json-ld'

const kicker = 'text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70'
const label = 'text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground/50'
const code = 'rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]'

const PATH = '/demo/blockpad'

export const metadata = demoMetadata(PATH, {
  title: 'Blockpad — Sketch a Layout, Hand an Agent the Structure',
  description:
    'A macOS sketchpad that opens over your editor on a hotkey. You draw where the boxes go, press copy, and paste. The agent gets the layout as an exact scene tree with coordinates and hex, not a paragraph and not a 2,000-token screenshot. Swift 6, SwiftUI, AppKit, MIT.',
})

/** The design rules, stated as decisions rather than features. */
const rules = [
  {
    h: 'It persists, it does not dismiss.',
    t: 'UI iteration is iterative. You send a sketch, the agent builds it, it is 70% right, you nudge two blocks and send again. A launcher that cleared on send would make you redraw every round. So the hotkey toggles rather than summons, contents survive hide, show and restart, the window remembers its size and position, Esc hides without discarding, and clearing is explicit.',
  },
  {
    h: 'The tree is the default, not the image.',
    t: 'The opposite of what every screenshot tool does, and the position the whole project rests on. The mode switcher sits next to the copy button for the times feel matters more than structure.',
  },
  {
    h: 'Never press Return.',
    t: 'Blockpad pastes and stops. The agent might be mid-plan or waiting on a permission gate, and a stray prompt at the wrong moment costs more than the keystroke saves.',
  },
  {
    h: 'No model inside it.',
    t: 'No inference, no account, no cloud, nothing agent-initiated, and nothing leaves the machine. It is an input device.',
  },
  {
    h: 'The tree is the only contract.',
    t: 'Everything the app can draw, including the thirty-two component blockouts, lands in the payload as plain blocks. Nothing gets a private representation the receiving agent would have to be taught.',
  },
]

/**
 * Straight from the README's table, measured on the scene shown above it.
 *
 * The tree is quoted in characters rather than tokens on purpose: character
 * heuristics and OpenAI tokenizers both misjudge Claude, and they misjudge it
 * worst on exactly this kind of text.
 */
const payload = [
  { mode: 'Tree only', cost: '617 characters', use: 'Default. Structural changes, layout specs.', lead: true },
  { mode: 'Image only', cost: '2,153 tokens', use: 'When proportion or feel matters.' },
  { mode: 'Tree + image', cost: 'both', use: 'Annotated screenshots, where the tree alone is thin.' },
]

const done = [
  'Menu bar item, no dock icon, two hotkey toggles, persistent resizable canvas',
  'Frame, rectangle, ellipse, diamond, arrow, line, freehand, text, eraser, pan',
  'Arbitrary hex on stroke and fill, numeric stroke width and corner radius, fill patterns, opacity, layer order',
  'Alignment guides, grid snap, marquee select, rigid-body multi-selection, undo/redo',
  'A component drawer of thirty-two blockouts across Layout, Controls, Data and Feedback',
  'Tree serialiser with run-collapsing, three payload modes, clipboard copy',
  'Crisp renderer by default, the sketch renderer one toggle away',
  'App icon generated in Core Graphics from the palette, MIT licensed',
]

/** Where the shipped app knowingly left the original plan. */
const departures = [
  {
    h: 'Crisp, not hand-drawn.',
    t: 'The plan argued that roughness signals provisional and stops a model reading proportions as exact. That risk turned out to be covered elsewhere: the tree states coordinates and counts outright, so precision never depends on the picture. The default is clean geometry and the sketch renderer survives behind a toggle.',
  },
  {
    h: 'A dock, not a top bar.',
    t: 'The top edge of a drawing is where you look, so tools moved to the bottom. The inspector became a collapsible rail of rows: leading glyph, quiet label, control on the trailing edge, hairline between.',
  },
  {
    h: 'Arbitrary colour.',
    t: 'The plan said five swatches and no picker, and listed a colour picker as a non-goal. Both reversed, and the payload got better for it: hex is a value the receiving agent can paste into CSS, where a palette name was a lookup it could not perform.',
  },
]

const tools: [string, string][] = [
  ['1 – 0', 'Tools, left to right along the dock'],
  ['V H F R O D A L P T E', 'Select, pan, frame, rect, ellipse, diamond, arrow, line, draw, text, eraser'],
  ['Padlock', 'Keeps a tool active. Off, it reverts to select after one shape'],
]

const canvas: [string, string][] = [
  ['Cmd+Return', 'Copy payload'],
  ['Cmd+Z / Shift+Cmd+Z', 'Undo, redo'],
  ['Cmd+D · Cmd+A', 'Duplicate, select all'],
  ['Cmd+[ / Cmd+]', 'Send backward, bring forward. Shift for all the way'],
  ['Cmd+0 / Cmd+9', 'Zoom to 100%, centre on the drawing'],
  ['Cmd+Backspace', 'Clear canvas'],
  ['Double-click', 'Edit text, or start a text block on empty canvas'],
  ['Space-drag, scroll', 'Pan. Ctrl- or Cmd-scroll or pinch zooms'],
  ['Viewfinder', 'Fits the drawing into the area the chrome is not covering'],
]

const nonGoals =
  'Not a design tool. No layers panel, no Figma export, no collaboration, no cloud, no account, no LLM inside the app, and no Windows until the Mac version is actually good.'

/** Verbatim from the README, which emits it from the sketch below. */
const TREE = `Frame 1440x900  @0,0  "Desktop"
  Box 480x900  @960,0  @right-full-height  stroke #55677A  fill #E5E3DF
    Box 136x40  @24,32  @left-top  "All"  fill #DAE5EF
    Box 136x40  @168,32  @top  "Active"
    Box 136x40  @312,32  @top  "Archived"
    Box 424x64  ×6  @24,112  step 0,88  @left
      Box 24x24  @16,20  @left  stroke #6E8B6A
    Box 200x56  @24,800  @left-bottom  "Reset"  stroke #55677A
    Box 200x56  @248,800  @bottom  "Apply"  stroke #B4534A  fill #F6DAD5
  Text  @40,40  @left-top  "main content unchanged"  stroke #55677A
  Text  @40,76  @left  "panel becomes bottom drawer under 768"  stroke #C08A2E`

function KeyTable({ rows }: { rows: [string, string][] }) {
  return (
    <div className="!mt-4 overflow-hidden rounded-xl border border-border/80">
      <JsonLd
        data={demoSchema(PATH, {
          title: metadata.title as string,
          description: metadata.description as string,
        })}
      />
      {rows.map(([k, v]) => (
        <div
          key={k}
          className="grid gap-x-4 border-b border-border/60 px-4 py-2.5 last:border-b-0 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)]"
        >
          <span className="font-mono text-[12px] text-foreground/80">{k}</span>
          <span className="text-[13px] text-muted-foreground">{v}</span>
        </div>
      ))}
    </div>
  )
}

export default function BlockpadPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <article className="mx-auto max-w-2xl">
        <Link
          href="/demo"
          className="mb-8 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground lg:hidden"
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
          A macOS sketchpad that opens on a hotkey and hands drawings to whatever coding agent
          you&apos;re in. You draw where the boxes go, press copy, and paste. The agent gets the
          layout as exact structure, not a paragraph and not a screenshot.
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
            M0 shipped · M1 delivery in progress
          </span>
        </div>
        <p className="mt-2 text-[12px] font-light text-muted-foreground/80">
          Free and MIT licensed. Swift 6, SwiftUI, AppKit, macOS 14+, one dependency. Built for
          myself, open because there is no reason for it not to be.
        </p>

        <figure className="-mx-6 mt-10 overflow-hidden rounded-xl border border-border/80 bg-muted/10 sm:mx-0">
          <DemoImage
            src="/blockpad-hero.webp"
            alt="The Blockpad window: a floating canvas with a filter panel sketched on it, a collapsible inspector rail, and a tool dock along the bottom"
            width={1600}
            height={1003}
            className="block h-auto w-full"
            priority
          />
        </figure>
        <p className="mt-2 text-[11px] font-light text-muted-foreground/60">
          One window, one canvas, one Copy button. It opens over whatever you are already in, and
          the dock sits along the bottom so the top edge of the drawing stays clear.
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
            <p>
              Blockpad is one hotkey and one canvas. <code className={code}>Ctrl+Opt+B</code>, drag
              four boxes, <code className={code}>Cmd+Return</code>, paste. No model inside it, no
              account, no subscription, nothing agent-initiated, and it never leaves your machine. It
              is a faster input device for one specific moment, and the constraint is the product.
            </p>
            <p className="rounded-xl border border-border/80 bg-muted/20 p-4 text-[13.5px]">
              <span className="text-foreground/85">Loop target: six seconds</span>, with no mouse
              travel outside the canvas.
            </p>
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
            <p className="text-foreground/85">
              Blockpad is that workaround turned into a tool. Same rough wireframe, same ninety
              seconds, except it hands over the structure directly instead of a photograph of it.
            </p>
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

            <p className="!mt-5">becomes exactly this:</p>
            <pre className="!mt-3 overflow-x-auto rounded-xl border border-border/80 bg-muted/20 p-4 font-mono text-[11.5px] leading-relaxed text-foreground/80">
              {TREE}
            </pre>

            <p className="!mt-5">
              Every block carries an offset from its parent, so the layout reconstructs exactly
              rather than approximately. Colours are hex, not names:{' '}
              <code className={code}>#55677A</code> is a value the receiving agent can paste into
              CSS, where <code className={code}>[slate]</code> would have been a lookup it could not
              perform. Repeats collapse to a count plus the step between them, so{' '}
              <code className={code}>×6</code> stays cheap without discarding where the other five
              are.
            </p>

            <p className="!mt-5">On that exact scene:</p>
            <div className="!mt-3 overflow-hidden rounded-xl border border-border/80">
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
              The image figure is arithmetic and exact. Anthropic resizes anything over 1568px on the
              long edge, then charges <code className={code}>(width × height) / 750</code>. The
              sample renders at 3008×1976, which becomes 1568×1030, which is 2,153 tokens.
            </p>
            <p>
              The tree figure is given in characters, deliberately, because{' '}
              <span className="text-foreground/85">
                tokens are the thing you cannot estimate honestly.
              </span>{' '}
              Character heuristics and OpenAI tokenizers both misjudge Claude, and they misjudge it
              worst on exactly this kind of text: <code className={code}>@960,0</code>,{' '}
              <code className={code}>#55677A</code> and <code className={code}>×6</code> tokenize far
              less kindly than prose. 617 characters is somewhere in the low hundreds of tokens, and
              pinning it down takes a measurement rather than a ratio. The repo ships a script that
              runs the tree through Anthropic&apos;s{' '}
              <code className={code}>count_tokens</code> endpoint and prints the table.
            </p>
            <p>
              What survives without any measurement is the shape of the gap: a screenshot of this
              sketch costs over two thousand tokens, and the tree is 617 characters of plain text.
              That is roughly an order of magnitude, and it holds across any plausible tokenization.
              It is also structurally <em className="not-italic text-foreground/85">more</em>{' '}
              precise: six identical rows collapse to <code className={code}>×6</code> with an exact
              count and an exact step, rather than a model counting rectangles in a JPEG and getting
              five.
            </p>
            <p className="rounded-xl border border-border/80 bg-muted/20 p-4 text-[13.5px]">
              <span className="text-foreground/85">
                An image is not automatically the expensive choice.
              </span>{' '}
              One 2,000-token picture that lands the layout first time beats four rounds of prose
              plus four implementations you have to read and reject. The tree is the default because
              it is cheap and precise, but the mode switcher is right next to the copy button for the
              times feel matters more than structure.
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

          {/* --------------------------------------------------- using it */}
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Using it</h2>
            <p>
              It runs as a menu bar item with no dock icon. Two hotkeys toggle the canvas:{' '}
              <code className={code}>Ctrl+Opt+B</code> and{' '}
              <code className={code}>Ctrl+Opt+Space</code>.
            </p>
            <p className="rounded-xl border border-border/80 bg-muted/20 p-4 text-[13.5px]">
              <span className="text-foreground/85">
                Heads up on <code className={code}>Ctrl+Opt+Space</code>.
              </span>{' '}
              macOS ships that chord bound to &ldquo;Select next source in Input menu&rdquo;, and a
              system binding beats an app&apos;s. On a clean machine it does nothing. Either use{' '}
              <code className={code}>Ctrl+Opt+B</code>, which nothing else claims, or clear the
              system one in System Settings, Keyboard, Keyboard Shortcuts, Input Sources.
            </p>

            <p className={`${label} !mt-6`}>Tools</p>
            <KeyTable rows={tools} />
            <p className="!mt-3 text-[13px]">
              Shapes and connectors each collapse into one dock slot holding whichever member you
              used last, with the rest on a flyout.
            </p>

            <p className={`${label} !mt-6`}>Canvas</p>
            <KeyTable rows={canvas} />
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

          {/* ------------------------------------------------------ colour */}
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Styling</h2>
            <p>
              Colour is arbitrary hex, not a fixed palette. Four presets stay inline in each row for
              the common case. The swatch opens RGB channel sliders with live gradient tracks, a hex
              field, the colours you reached for recently, the full preset set, and the system
              picker. Stroke width and corner radius are real numbers you can step, type, or drag to
              scrub. All of it lands in the tree as values the receiving agent can act on.
            </p>
          </section>

          {/* ------------------------------------------------ the redesign */}
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              The design left the plan three times, on purpose
            </h2>
            <ul className="!mt-4 list-none space-y-4 p-0">
              {departures.map((d) => (
                <li key={d.h} className="border-l border-border pl-4">
                  <p className="text-[14px] text-foreground/85">{d.h}</p>
                  <p className="mt-1 text-[14px]">{d.t}</p>
                </li>
              ))}
            </ul>
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
              A card on Apple&apos;s icon geometry, 22.37% corner radius, holding an isometric
              stack of three faces with three short rules radiating from where they meet. It is a blockout of a layout seen in three dimensions, which is close to
              literally what the app does. The top face is the only colour in it.
            </p>
            <p>
              There are two masters, dark and light, and they are not inversions of each other: the
              card runs near-black or near-white with a soft vertical gradient, the two side faces
              carry their own greys per theme, and only the orange stays put. On this page the
              palette swaps in CSS, so the drawing stays one server-rendered SVG rather than a
              component that has to read the theme.
            </p>
            <p>
              It is generated in Core Graphics from the palette rather than stored as a binary asset,
              so changing a swatch changes the icon, and{' '}
              <code className={code}>./Scripts/icon.sh</code> regenerates it from code. The SVG is
              emitted from the same ratios, so vector and raster cannot drift.
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
              six-second loop.
            </p>
            <p>
              The canvas is an <code className={code}>NSView</code> drawing through Core Graphics,
              hosted in SwiftUI. AppKit because hit testing, drag handles and marquee select get
              miserable in pure SwiftUI past forty blocks, and{' '}
              <code className={code}>UndoManager</code> comes free.
            </p>
          </section>

          {/* --------------------------------------------------- the stack */}
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Tech stack</h2>
            <p className="font-mono text-[13px] text-foreground/80">
              Swift 6 · SwiftUI · AppKit · Core Graphics · macOS 14+
            </p>
            <p>
              One dependency, <code className={code}>KeyboardShortcuts</code>, and nothing else yet.
              No backend, no account, no inference, nothing leaves the machine.
            </p>
            <p>
              Not App Store: the sandbox blocks synthetic events and cross-app activation, so it
              ships as a signed, notarised DMG.
            </p>
          </section>

          {/* -------------------------------------------------- the status */}
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">State of play</h2>
            <p>
              <span className="text-foreground/85">M0 is done</span>, and the app has moved a long
              way past it.
            </p>

            <p className={`${label} !mt-4`}>Shipped</p>
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
              <span className="text-foreground/85">M1, delivery.</span> Today Blockpad copies and you
              paste. M1 captures the frontmost app before the panel takes focus and pastes into it
              directly: text everywhere, images into editors, and a written-to-disk path for
              terminals, which is what makes CLI agents work at all. The pure-logic half is built and
              tested; the paste itself is not yet wired. Riskiest milestone, and the one the whole
              idea rests on.
            </p>
          </section>

          {/* ------------------------------------------------- non-goals */}
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Non-goals</h2>
            <p>{nonGoals}</p>
            <p className="text-[13px] text-muted-foreground/70">
              The colour picker used to be on this list. It is not any more.
            </p>
          </section>

          {/* ---------------------------------------------------- who / why */}
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Who built it</h2>
            <p>
              Ieuan King, design and build, out of{' '}
              <a
                href="https://ubik.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground/50"
              >
                Ubik Studio
              </a>
              . MIT licensed, so anyone can fork it, ship it, or take the tree format and do
              something better with it.
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
              internal tools, the ones nobody staffs a designer on, that is most of the value.
            </p>
          </section>
        </div>
      </article>
    </div>
  )
}
