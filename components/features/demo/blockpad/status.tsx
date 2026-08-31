import { label } from '@/components/features/demo/blockpad/shared'

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

/** State of play. Moved verbatim from app/demo/blockpad/page.tsx. */
export function StatusSection() {
  return (
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
            <p className="!mt-2 aka-card-well p-4 text-[13.5px]">
              <span className="text-foreground/85">M1, delivery.</span> Today Blockpad copies and you
              paste. M1 captures the frontmost app before the panel takes focus and pastes into it
              directly: text everywhere, images into editors, and a written-to-disk path for
              terminals, which is what makes CLI agents work at all. The pure-logic half is built and
              tested; the paste itself is not yet wired. Riskiest milestone, and the one the whole
              idea rests on.
            </p>
          </section>
  )
}
