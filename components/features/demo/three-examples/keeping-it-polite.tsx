import { code } from '@/components/features/demo/three-examples/shared'

/** Keeping it polite: the rules that let a render loop sit on a portfolio page. */
export function KeepingItPoliteSection() {
  return (
    <section className="space-y-4">
      <h2 className="text-sm font-medium tracking-wide text-foreground">Keeping it polite</h2>
      <p>
        A portfolio page has no business running a render loop you cannot see. An{' '}
        <code className={code}>IntersectionObserver</code> flips the canvas{' '}
        <code className={code}>frameloop</code> between running and stopped as the orb enters and
        leaves the viewport, and device pixel ratio is clamped to 1.5 so a retina laptop does not
        pay four times the fragment cost for sharpness nobody perceives on a moving surface.
      </p>
      <p>
        Pointer handling follows the house rule that scroll-linked and animated state never touches
        React: the wrapper writes cursor position into a ref, the frame loop reads it into a shader
        uniform, and no pointer move ever re-renders the tree. The canvas itself keeps{' '}
        <code className={code}>pointer-events: none</code> so it can never eat a scroll. On narrow
        viewports the orb drops its droplets, slows its motion, and softens the grain, because small
        GPUs and small pixels turn both into shimmer. And the whole Three.js payload is chunk-split
        behind a dynamic import, so no other route on the site downloads a byte of it.
      </p>
      <p>
        The one rule that took a bug to learn: draw one frame before any of that gating runs.
        Animation frames do not fire in a background tab, so a page opened into one and left there
        paints nothing at all until you look at it, and the first thing you see on arrival is an
        empty frame filling in. One unconditional frame at setup costs nothing and removes the whole
        class of problem.
      </p>
    </section>
  )
}
