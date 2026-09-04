/** Alignment guides. Moved verbatim from app/demo/blockpad/page.tsx. */
export function GuidesSection() {
  return (
          <section className="space-y-3">
            <h2 className="aka-lead">Alignment guides</h2>
            <p>
              Grid snapping gives tidy coordinates but not tidy layouts: two boxes can both sit on
              the grid and still look a step out. Dragging solves the three interesting lines per
              axis, both edges and the centre, against every other block, pulls to the nearest match,
              and draws a guide across the objects that share it. Multi-selection moves as a rigid
              body, so its internal spacing cannot drift.
            </p>
          </section>
  )
}
