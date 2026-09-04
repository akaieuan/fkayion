/** How logging works. Moved verbatim from app/demo/bodylog/page.tsx. */
export function LoggingSection() {
  return (
          <section className="space-y-4">
            <h2 className="aka-lead">How logging works</h2>
            <ul className="aka-list space-y-2">
              <li>
                <span className="text-foreground/85">Entries like posts, not forms.</span> Optional
                photo slides with captions, tap-to-select regions on a face / front / back diagram, a
                1–5 feel slider, and a free note. Nothing is required — save is never blocked.
              </li>
              <li>
                <span className="text-foreground/85">The questions in the order a person thinks
                them.</span> Where is it showing up → what are you tracking → how does it feel today →
                what you notice → what you applied → anything else going on. That last one is
                captioned honestly: the app draws no conclusions from it.
              </li>
              <li>
                <span className="text-foreground/85">Shot conditions saved with the photo.</span>{' '}
                Light (window / ring light / overhead / outdoors) and distance (macro / close /
                arm&apos;s length), so future shots can match. Two pictures of the same spot under
                different light are not a comparison.
              </li>
              <li>
                <span className="text-foreground/85">Checkup nudges.</span> When a site you log
                regularly has gone quiet for three to fourteen days, the home screen offers a
                pre-filled &ldquo;quick checkup pic?&rdquo; card — an offer, never a scold.
              </li>
              <li>
                <span className="text-foreground/85">Zoom is time, not tile size.</span> Week / month
                / all-time changes how the photo timeline is bucketed. Filter to one tracked thing —
                two progressions interleaved is two stories and neither reads.
              </li>
            </ul>
          </section>
  )
}
