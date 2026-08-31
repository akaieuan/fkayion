/** What you make. Moved verbatim from app/demo/akacovart/page.tsx. */
export function WhatYouMakeSection() {
  return (
          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">What you make</h2>
            <p>
              Three focuses, seven engines. The <span className="text-foreground/85">Art</span> focus
              gives four abstract field engines:
            </p>
            <ul className="list-disc space-y-2 pl-5 marker:text-muted-foreground/50">
              <li>
                <span className="text-foreground/85">Blob.</span> Soft, painterly clouds of colour with
                diamond detail zones.
              </li>
              <li>
                <span className="text-foreground/85">Grid.</span> Organic cells arranged on a grid,
                from sparse to packed.
              </li>
              <li>
                <span className="text-foreground/85">Contours.</span> A 3D heightfield terrain drawn as
                receding ridgelines.
              </li>
              <li>
                <span className="text-foreground/85">Signal.</span> Overlapping wave gratings that add
                into shimmering moiré interference.
              </li>
            </ul>
            <p>
              The <span className="text-foreground/85">TxT</span> focus makes your display text the
              subject, styled by three type engines — Dither (pixelated + broken), Lines (round-cap
              hatching clipped to the glyphs), and Blur (gooey blur-to-threshold metaballs) — and{' '}
              <span className="text-foreground/85">Stack</span> composites a type layer over an Art
              background, as an on-top overlay or an art-filled knockout.
            </p>
            <p>
              On top of any engine: hand-tuned palettes (dark, cream, grey, or a seed-picked random), a
              colour picker that pushes the whole palette toward any hue, and a light-to-dark tone
              control. A film-finish pass layers in grain, dust, scratches, vignette, and bloom for a
              printed, physical feel, and a type layer handles title and artist with selectable fonts,
              case and glitch options, and drag-to-place positioning. A focus-aware grid of curated starting
              points (with live hover previews) gives one-click starts; export drops a 3000×3000 PNG
              sized independently of what’s on screen.
            </p>
          </section>
  )
}
