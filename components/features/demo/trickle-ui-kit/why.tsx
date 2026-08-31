/** Why it exists. Moved verbatim from app/demo/trickle-ui-kit/page.tsx. */
export function WhySection() {
  return (
          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Why it exists</h2>
            <p>
              Every popular React text-animation library makes you pay a tax to animate one word.
              Install <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">framer-motion</code>{' '}
              to fade in a heading and you&apos;ve added 30kb of runtime JS to your bundle and forced every
              parent into a <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">&apos;use client&apos;</code> boundary. The animation engine wants to live in your application&apos;s runtime, with
              refs into the live DOM, observing layout shifts, owning the render loop. For a library
              whose primary use case is &quot;text appears nicely on a marketing page,&quot; that is
              profoundly the wrong tool for the job.
            </p>
            <p>
              trickle is the argument that text animation should be CSS, and the components that prove
              it. The CSS Animations spec is twelve years old, GPU-accelerated, server-renderable, and
              declaratively complete for 80% of what marketing pages, dashboards, and hero sections
              actually need. The browser has been able to animate text natively since 2012 — the only
              reason we reach for animation libraries is because writing keyframes by hand is tedious,
              not because the platform is missing capability.
            </p>
          </section>
  )
}
