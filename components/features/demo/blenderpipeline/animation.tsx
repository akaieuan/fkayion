/** Animation, in code. Moved verbatim from app/demo/blenderpipeline/page.tsx. */
export function AnimationSection() {
  return (
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              Animation, in code
            </h2>
            <p>
              Motion is authored the same way the meshes are. A helper layer wraps keyframing so a
              drawer, a door, a drop-front or a looping crafting cycle is described by its
              behaviour: Bezier easing, NLA assembly, staggered timing across parts that have to
              move together. Interaction metadata rides along with it, so hitboxes and facing
              empties arrive in the engine already named and placed.
            </p>
          </section>
  )
}
