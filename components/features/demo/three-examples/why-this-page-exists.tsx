import Link from 'next/link'
import { inlineLink } from '@/components/features/demo/three-examples/shared'

/** Why this page exists: where Three.js is allowed to live, and why. */
export function WhyThisPageExistsSection() {
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-medium tracking-wide text-foreground">Why this page exists</h2>
      <p>
        The orb above used to open this site: for a while it was the landing hero. When the landing
        page calmed down, a real-time WebGL scene stopped earning its place there, but the work
        behind it was worth keeping. The rule now is placement rather than abstinence: Three.js
        lives here and inside{' '}
        <Link href="/demo/visualizer-eden" className={inlineLink}>
          Visualizer Eden
        </Link>
        , and nowhere else on the site. The pages you pass through stay light; the pages you choose
        to visit can spend.
      </p>
    </section>
  )
}
