import { PixelHead } from '@/components/features/brand/pixel-head'
import { mono, codeChip as codeCls } from '@/components/features/aka-style/shared'

/** The full expression table lives in EXPR (pixel-head.tsx) — 26 slots. */
const FACE_COUNT = 26
const faces = Array.from({ length: FACE_COUNT }, (_, i) => i)

/** The set: all twenty-six expressions, held still. Moved verbatim from app/aka-style/faces/page.tsx. */
export function TheSetSection() {
  return (
        <section className="mt-16">
          <p className="aka-kicker">The set</p>
          <h2 className="mt-2 aka-section-title">
            Twenty-six expressions
          </h2>
          <p className="aka-standfirst">
            Every slot, held still via <code className={codeCls}>faceIndex</code>. The range runs
            from neutral through curious, skeptical, delighted, and asleep — enough personality to
            feel alive across a long hold, never so much that it reads as a cartoon.
          </p>

          <div className="mt-6 grid grid-cols-4 gap-2.5 sm:grid-cols-6 md:grid-cols-7">
            {faces.map((i) => (
              <div key={i} className="aka-card rounded-lg p-2 text-center">
                <div className="flex justify-center">
                  <PixelHead size={62} grid={20} faceIndex={i} still />
                </div>
                <p className={`${mono} mt-1.5`}>{i}</p>
              </div>
            ))}
          </div>
          <p className={`${mono} mt-4`}>{'<PixelHead faceIndex={7} size={62} grid={20} still />'}</p>
        </section>
  )
}
