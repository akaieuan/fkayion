/** Why I built it. Moved verbatim from app/demo/visualizer-eden/page.tsx. */
export function WhyIBuiltItSection() {
  return (
          <section className="space-y-3">
            <h2 className="aka-lead">Why I built it</h2>
            <p>
              I wanted mixes to show up as motion, not only as a waveform strip. The same FFT that powers
              meters in a DAW is enough to steer a 3D look if you compress it into a few stable scalars
              and keep the CPU work off the hot path.
            </p>
          </section>
  )
}
