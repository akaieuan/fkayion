import { LoopVideo } from '@/components/ui/loop-video'
import { label } from '@/components/features/demo/blockpad/shared'

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

function KeyTable({ rows }: { rows: [string, string][] }) {
  return (
    <div className="!mt-4 overflow-hidden rounded-xl border border-border/80">
      {rows.map(([k, v]) => (
        <div
          key={k}
          className="grid gap-x-4 border-b border-border/60 px-4 py-2.5 last:border-b-0 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)]"
        >
          <span className="font-mono text-12 text-foreground/80">{k}</span>
          <span className="text-13 text-muted-foreground">{v}</span>
        </div>
      ))}
    </div>
  )
}

/** Using it: hotkeys, tools and canvas tables. Moved verbatim from app/demo/blockpad/page.tsx. */
export function UsingItSection() {
  return (
          <section className="space-y-3">
            <h2 className="aka-lead">Using it</h2>
            <p>
              It runs as a menu bar item with no dock icon. You open it with{' '}
              <code className="aka-code">Ctrl+Opt+Space</code>: press it and the canvas comes up over
              whatever you are in, press it again and the canvas hides.{' '}
              <code className="aka-code">Ctrl+Opt+B</code> does the same, as a second toggle.
            </p>
            <p className="aka-card-well p-4 text-14">
              <span className="text-foreground/85">
                If <code className="aka-code">Ctrl+Opt+Space</code> does nothing on your machine.
              </span>{' '}
              macOS ships that chord bound to &ldquo;Select next source in Input menu&rdquo;, and a
              system binding beats an app&apos;s. Clear it in System Settings, Keyboard, Keyboard
              Shortcuts, Input Sources, or use <code className="aka-code">Ctrl+Opt+B</code>, which
              nothing else claims.
            </p>

            <figure className="!mt-5">
              <div className="aka-card-well aka-card-media overflow-hidden">
                <LoopVideo
                  src="/blockpad/walkthrough"
                  poster="/blockpad/walkthrough-poster.webp"
                  width={1280}
                  height={932}
                  label="A walkthrough of the app: the colour picker with channel sliders and a hex field, the inspector rail, the arrow and freehand tools, and a component blockout placed on the canvas"
                />
              </div>
              <figcaption className="mt-2 text-11 font-light text-muted-foreground/75">
                A minute and three quarters in the app: the colour picker and its channel sliders,
                the inspector rail, arrow and freehand, and a blockout dropped from the drawer.
              </figcaption>
            </figure>

            <p className={`${label} !mt-6`}>Tools</p>
            <KeyTable rows={tools} />
            <p className="!mt-3 text-13">
              Shapes and connectors each collapse into one dock slot holding whichever member you
              used last, with the rest on a flyout.
            </p>

            <p className={`${label} !mt-6`}>Canvas</p>
            <KeyTable rows={canvas} />
          </section>
  )
}
