/** Design rubric. Moved verbatim from app/demo/trickle-ui-kit/page.tsx. */
export function DesignRubricSection() {
  return (
          <section className="space-y-4">
            <h2 className="aka-lead">Design rubric</h2>
            <p>Every animation is judged against three axes before it ships.</p>
            <div className="space-y-3">
              <h3 className="text-[13px] font-medium text-foreground/90">Distinct motion signature</h3>
              <p>
                Could you name the component from the visual alone? If two animations look like the
                same gesture in different colors, one of them shouldn&apos;t exist. v0.1 cut four
                duplicates from the original draft (Drip, CurtainReveal, VerticalSlide, PaperFold) for
                failing this test.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-[13px] font-medium text-foreground/90">Per-character expression where it matters</h3>
              <p>
                Generic entrance animations are easy mode. The interesting components express the
                concept of the animation through the character itself: Shatter breaks chars into{' '}
                <code className="aka-code">clip-path</code>{' '}
                shards, Pixelate resolves through a sub-character pixel grid, CarouselFlip positions
                chars on a rotating 3D ring, Wireframe draws stroke outlines per char before filling.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-[13px] font-medium text-foreground/90">Fluidity</h3>
              <p>
                <code className="aka-code">mask-image</code>{' '}
                switching between gradient types mid-animation snaps discretely (browsers can&apos;t
                interpolate). All masked components keep{' '}
                <code className="aka-code">mask-image</code>{' '}
                constant on the class and animate only{' '}
                <code className="aka-code">mask-size</code>{' '}
                and{' '}
                <code className="aka-code">mask-position</code>. Same rule for{' '}
                <code className="aka-code">clip-path</code>{' '}
                polygons.
              </p>
            </div>
          </section>
  )
}
