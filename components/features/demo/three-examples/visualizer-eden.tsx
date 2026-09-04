import Link from 'next/link'
import { code } from '@/components/features/demo/three-examples/shared'

/** Visualizer Eden: the same stack with an analyser in place of the clock. */
export function VisualizerEdenSection() {
  return (
    <section className="space-y-4">
      <h2 className="aka-lead">
        Visualizer Eden: the same stack, driven by sound
      </h2>
      <p>
        The larger piece of this body of work is{' '}
        <Link href="/demo/visualizer-eden" className="aka-quiet-link">
          Visualizer Eden
        </Link>
        , and it is the same three parts as the orb: an{' '}
        <code className={code}>@react-three/fiber</code> canvas, a high-poly mesh, and a{' '}
        <code className={code}>ShaderMaterial</code> whose vertex stage does all the interesting
        work. It adds one thing the orb does not have: a clock it did not write.
      </p>
      <p>
        A Web Audio <code className={code}>AnalyserNode</code> sits in-line with playback, and every
        frame the byte spectrum is reduced to four numbers, bass, mid, high and overall volume,
        which are written straight into the material&apos;s uniforms alongside the control values.
        So where the orb displaces itself against <code className={code}>time</code>, that mesh
        displaces itself against the music, and the shader is the only thing that knows the
        difference. It also takes <code className={code}>OrbitControls</code> from drei, which is
        the one place on this site where the camera is yours to move.
      </p>
      <p>
        The orb here is the etude. That one is the piece: the same instrument, played against a
        signal instead of a clock.
      </p>
    </section>
  )
}
