/** Every image is data. Moved verbatim from app/demo/akacovart/page.tsx. */
export function EveryImageIsDataSection() {
  return (
          <section className="space-y-3">
            <h2 className="aka-lead">Every image is data</h2>
            <p>
              At its core is one decision:{' '}
              <strong className="font-medium text-foreground/90">every image is data.</strong> A cover
              is fully described by an engine, a seed, and a small set of parameters — nothing else.
              Feed the same seed and the same settings back in and you get the exact same artwork, on
              any machine, every time. A look you love isn’t a lucky export you can’t reproduce; it’s a
              tiny, shareable recipe. That determinism is the spine of the whole tool.
            </p>
            <pre className="overflow-x-auto aka-card-well rounded-lg p-4 text-[11px] leading-relaxed text-foreground/80">
{`{ engine, seed, palette, composition, film, type }
        │
        ▼  deterministic render (seeded RNG)
  3000×3000 PNG  +  synced video loop`}
            </pre>
          </section>
  )
}
