import { DemoImage } from '@/components/ui/demo-image'

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

            <figure className="!mt-5">
              <div className="aka-card-well aka-card-media overflow-hidden">
                <DemoImage
                  src="/blockpad/planes.webp"
                  alt="Four rounded rectangles drawn on a plane, sheared into an isometric view, with blue strokes and a light fill"
                  width={846}
                  height={826}
                  className="block h-auto w-full"
                />
              </div>
              <figcaption className="mt-2 text-11 font-light text-muted-foreground/75">
                Plane, rotate and skew are rows in the same rail as colour and radius. These are four
                ordinary rectangles with the plane set.
              </figcaption>
            </figure>
          </section>
  )
}
