import { SUMMARIES } from '@/lib/plain-summaries'

/*
 * Why this was ahead of its time, opened.
 *
 * The site keeps this behind a disclosure in the summary card; the sheet
 * shows it open, as five wells across, in the markup the card uses. The data
 * is imported, not copied, so an edit to lib/plain-summaries.ts reaches the
 * document the next time it is printed.
 *
 * Budget: header about 140 (kicker, section title, a two-line intro at the
 * 1024 measure); the strip about 360, which is the longest well at text-14;
 * the close about 60; the gaps. About 620 of the 844.
 */
export function UbikAhead() {
  const s = SUMMARIES['/demo/ubik']
  if (!s?.ahead?.length) return null

  return (
    <div className="h-full">
      <p className="aka-kicker">Ubik Studio</p>
      <h2 className="mt-2 aka-section-title">{s.aheadLabel ?? 'Why it mattered'}</h2>
      {s.aheadIntro && (
        <p className="mt-3 max-w-5xl text-15 font-light leading-relaxed text-muted-foreground">
          {s.aheadIntro}
        </p>
      )}

      <ul className="mt-6 grid list-none grid-cols-5 gap-4 p-0">
        {s.ahead.map((a) => (
          <li key={a.title} className="aka-card-well px-5 py-4">
            <p className="text-15 font-medium text-foreground/90">{a.title}</p>
            {a.norm && (
              <p className="mt-2 text-14 font-light leading-relaxed text-muted-foreground/75">
                <span className="text-13 font-medium text-foreground/60">Then</span> {a.norm}
              </p>
            )}
            <p className="mt-2 text-14 font-light leading-relaxed text-muted-foreground">
              {a.norm && (
                <span className="text-13 font-medium text-foreground/60">
                  {s.aheadSubject ?? 'It'}{' '}
                </span>
              )}
              {a.why}
            </p>
          </li>
        ))}
      </ul>

      {s.aheadClose && (
        <p className="mt-8 max-w-5xl text-15 font-light leading-relaxed text-foreground/85">
          {s.aheadClose}
        </p>
      )}
    </div>
  )
}
