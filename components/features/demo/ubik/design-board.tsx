import { UbikCanvasViewer } from '@/components/product-replicas/ubik/canvas-viewer'
import { WAYPOINTS } from '@/lib/ubik-canvas'

/** The design board. Moved verbatim from app/demo/ubik/page.tsx. */
export function DesignBoardSection() {
  return (
          <section className="space-y-3">
            <h2 className="aka-lead">The design board</h2>
            <p>
              Ubik never had a design team, a seat of anything for everybody, or the time to keep a
              spec in sync with itself. What it had was Excalidraw files that nobody ever closed.
              This is one of them, running from 2024 into 2025, left exactly as it was.
            </p>
            <p>
              It is a snapshot rather than the archive. Plenty of boards came before it, and the 2023
              and 2024 ones from the Fiig years and the ed-tech work sprawl further than this. I
              picked this one because it is a fair picture of how I actually think while a product is
              still being decided.
            </p>
            <p>
              It worked because it refused to be one thing. The same board carried landing page
              explorations, user story wireframes, screenshots of the running app with corrections
              drawn straight over them, and plain notes to whoever opened it next. A sketch on the
              left, the decision written beside it, and underneath that the file path it applied to.
              That middle layer, looser than a spec and more durable than a conversation, is where
              most of this product actually got decided.
            </p>
            <p>
              It is messy in places and I have left it messy. Areas trail off, copy is labelled not
              solid, and one region is simply the words ICONS NEEDED above a list of what still
              needed drawing. That is what a working document looks like while it is still working.
              Excalidraw being free is not a small detail either: in a team with scrappy limits it
              meant everyone could open it, and no part of how we thought sat behind a licence we
              were deciding whether to renew.
            </p>
            <div className="not-prose pt-1">
              <UbikCanvasViewer waypoints={WAYPOINTS} />
            </div>
            <p>
              What the board eventually taught me was when to stop drawing. Once my engineer
              teammate had a framework standing, it was faster to develop the flow directly in code:
              build the primitives, get the real UI working inside the constraints that already
              existed, and skip a wireframe that could only ever approximate them. That shift made me
              pick up a lot of new skills on the way and it changed how I design. I still open a
              board when a problem is genuinely unresolved, but much of what used to become a sketch
              now goes straight into components.
            </p>
          </section>
  )
}
