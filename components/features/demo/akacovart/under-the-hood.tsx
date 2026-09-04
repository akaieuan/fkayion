/** Under the hood. Moved verbatim from app/demo/akacovart/page.tsx. */
export function UnderTheHoodSection() {
  return (
          <section className="space-y-3">
            <h2 className="aka-lead">Under the hood</h2>
            <p>
              The generative core is a pure, framework-agnostic Canvas-2D module with no UI
              dependencies — parameters go in, pixels come out — which is why the same code drives the
              live preview, the high-res export, and the gallery thumbnails without changes. Each engine
              is a small plugin behind a shared interface and a registry, so adding one is
              self-contained. Randomness comes from a seeded generator rather than the system’s, and
              that’s what guarantees the determinism. The studio around it is a thin React layer over a
              single flat state object whose keys are exactly what the engine reads — so “the artwork as
              data” is literally the app’s state minus its buttons. Because a cover is just data, you can
              hand a settings blob to a model and ask it to nudge the look.
            </p>
            <p className="text-[12px] text-muted-foreground/70">
              Next.js (static export) · React · TypeScript · Tailwind · Zustand · Canvas 2D · Web Audio
              API · WebCodecs (H.264/AAC) MP4 export
            </p>
          </section>
  )
}
