import { JsonLd } from '@/components/seo/json-ld'
import { demoSchema } from '@/lib/demo-seo'
import { label, code, PATH, metadata } from '@/components/features/demo/blockpad/shared'

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

/** Using it: hotkeys, tools and canvas tables. Moved verbatim from app/demo/blockpad/page.tsx. */
export function UsingItSection() {
  return (
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Using it</h2>
            <p>
              It runs as a menu bar item with no dock icon. Two hotkeys toggle the canvas:{' '}
              <code className={code}>Ctrl+Opt+B</code> and{' '}
              <code className={code}>Ctrl+Opt+Space</code>.
            </p>
            <p className="aka-card-well p-4 text-[13.5px]">
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
  )
}
