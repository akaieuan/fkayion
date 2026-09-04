/** A dictionary you earn. Moved verbatim from app/demo/wrdef/page.tsx. */
export function DictionaryYouEarnSection() {
  return (
          <section className="space-y-3">
            <h2 className="aka-lead">A dictionary you earn</h2>
            <p>
              Every solve is saved to <code className="rounded bg-muted/50 px-1 py-0.5 text-13 text-foreground/85">localStorage</code> with its definition, difficulty, solve time, score, and whether you
              cleared the bonus. A separate <code className="rounded bg-muted/50 px-1 py-0.5 text-13 text-foreground/85">/urdefs</code> page builds a personal stats view off that log: win rate,
              current/best streak, fastest solve, per-difficulty breakdown, last-12 strip. No sign-in, no
              server. The idea is that the definitions shouldn&apos;t be disposable; you&apos;re slowly
              building a dictionary of words you actually earned.
            </p>
          </section>
  )
}
