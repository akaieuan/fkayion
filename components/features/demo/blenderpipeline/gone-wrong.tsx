import { RenderPair } from '@/components/product-replicas/bkz-lab-log/prose'

/** What that looks like when it goes wrong. Moved verbatim from app/demo/blenderpipeline/page.tsx. */
export function GoneWrongSection() {
  return (
          <section className="space-y-3">
            <h2 className="aka-lead">
              What that looks like when it goes wrong
            </h2>
            <p>
              The clearest example I have: a coverage gate that had returned a perfect score for
              months while the render disagreed with it. Both images below come from the same
              script, the same camera and the same lights. The only thing that changed is the
              surface the hair was built against.
            </p>
            <RenderPair
              before="/bkz/buzz-front-before.webp"
              after="/bkz/buzz-front-after.webp"
              alt="The buzz hair style rendered from the front"
              caption="**buzz, from the front.** On the left, a dome that swallows the forehead. On the right, the same generator seated on the real skull. No art direction changed between them."
            />
          </section>
  )
}
