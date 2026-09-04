/** Styling. Moved verbatim from app/demo/blockpad/page.tsx. */
export function StylingSection() {
  return (
          <section className="space-y-3">
            <h2 className="aka-lead">Styling</h2>
            <p>
              Colour is arbitrary hex, not a fixed palette. Four presets stay inline in each row for
              the common case. The swatch opens RGB channel sliders with live gradient tracks, a hex
              field, the colours you reached for recently, the full preset set, and the system
              picker. Stroke width and corner radius are real numbers you can step, type, or drag to
              scrub. All of it lands in the tree as values the receiving agent can act on.
            </p>
          </section>
  )
}
