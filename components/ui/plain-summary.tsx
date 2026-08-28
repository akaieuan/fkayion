import { SUMMARIES } from '@/lib/plain-summaries'

/**
 * The plain-language answer, at the top of a write-up.
 *
 * ── The problem ─────────────────────────────────────────────────────────────
 *
 * These pages were written for someone who already knows the domain. They lead
 * with architecture and name the parts correctly, and a reader who has to
 * decide in ninety seconds whether this person is worth an hour gets none of
 * what they came for: what the thing was, in words their whole panel would
 * understand, and why it mattered.
 *
 * That is not a writing problem further down the page. It is a problem with
 * what the first screen says, so the fix is a block above everything else.
 *
 * ── The shape ───────────────────────────────────────────────────────────────
 *
 * Two tiers, because the two readers want opposite things.
 *
 * The summary is open. It is three or four sentences of ordinary English with
 * no jargon in them, and it is not behind a control, because a reader who is
 * skimming will not click to find out whether clicking was worth it. Making
 * them press a button to reach the plain version would reproduce the original
 * problem with an extra step.
 *
 * The case for why it mattered is longer and reads as an argument, so it is
 * behind a disclosure. Anyone who wants it is already interested enough to
 * open it, and it does not stand between a skimmer and the rest of the page.
 *
 * ── Why <details> ───────────────────────────────────────────────────────────
 *
 * The disclosure is a native `<details>`: no state, no effect, no client
 * component, and it opens before hydration because the browser owns it. It is
 * keyboard-operable and announced as a disclosure without any ARIA from me,
 * and it prints and Ctrl-Fs open in browsers that implement that. A React
 * version of this would be strictly worse in every one of those ways.
 */
export function PlainSummary({ path }: { path: string }) {
  const s = SUMMARIES[path]
  if (!s) return null

  return (
    <section
      aria-label="Summary"
      className="mt-8 rounded-xl border border-border/80 bg-muted/15 px-5 py-4 sm:px-6 sm:py-5"
    >
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/80">
        In simple terms
      </p>

      <div className="mt-2.5 space-y-2.5 text-[15px] font-light leading-relaxed text-foreground/85">
        {s.what.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      {s.impact && (
        <p className="mt-4 border-t border-border/60 pt-3.5 text-[14px] font-light leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground/85">The impact.</span> {s.impact}
        </p>
      )}

      {s.ahead && s.ahead.length > 0 && (
        <details className="group mt-4 border-t border-border/60 pt-3.5">
          <summary className="flex cursor-pointer list-none items-center gap-2 text-[13px] font-medium text-foreground/85 transition-colors hover:text-foreground [&::-webkit-details-marker]:hidden">
            {/*
             * The chevron rotates rather than swapping glyph, so the control
             * reads as one thing in two positions. Transform only: the house
             * rule is that motion moves space and never brightness.
             */}
            <span
              aria-hidden
              className="inline-block text-muted-foreground/70 transition-transform duration-200 group-open:rotate-90"
            >
              ›
            </span>
            {s.aheadLabel ?? 'Why it mattered'}
          </summary>

          <div className="mt-3.5 space-y-3">
            {s.aheadIntro && (
              <p className="text-[14px] font-light leading-relaxed text-muted-foreground">
                {s.aheadIntro}
              </p>
            )}
            <ul className="list-none space-y-2.5 p-0">
              {s.ahead.map((a) => (
                <li key={a.title} className="rounded-lg border border-border/60 bg-background/40 px-4 py-3">
                  <p className="text-[13.5px] font-medium text-foreground/90">{a.title}</p>
                  {a.norm && (
                    <p className="mt-1 text-[12.5px] font-light leading-relaxed text-muted-foreground/75">
                      <span className="font-mono text-[11px] uppercase tracking-[0.1em]">
                        Then
                      </span>{' '}
                      {a.norm}
                    </p>
                  )}
                  <p className="mt-1 text-[12.5px] font-light leading-relaxed text-muted-foreground">
                    {a.norm && (
                      <span className="font-mono text-[11px] uppercase tracking-[0.1em]">Ubik </span>
                    )}
                    {a.why}
                  </p>
                </li>
              ))}
            </ul>
            {s.aheadClose && (
              <p className="text-[14px] font-light leading-relaxed text-foreground/85">
                {s.aheadClose}
              </p>
            )}
          </div>
        </details>
      )}
    </section>
  )
}
