import { LAWS } from '@/lib/aka-style'
import { MEASURE, kicker, sectionH, card } from '@/components/features/aka-style/writeup/chrome'

/** The rules: seven constraints, each a card, from the same list /aka-style reads. */
export function Laws() {
  return (
        <section className="mt-16">
          <p className={kicker}>The rules</p>
          <h2 className={sectionH}>Seven constraints, not seven preferences</h2>
          <p className={`mt-3 ${MEASURE} text-[15px] font-light leading-relaxed text-muted-foreground`}>
            A design system is usually sold as consistency, which is true and is not why I keep one.
            The reason is that a preference has to be re-argued every time and a constraint does
            not. &ldquo;This feels too heavy&rdquo; is a conversation. &ldquo;Depth is an edge and a
            fill, never a drop shadow&rdquo; is a thing you can check in review, and it travels to
            a new codebase without me having to be in the room to defend it.
          </p>

          <ol className="mt-7 grid list-none gap-3 p-0 md:grid-cols-2 xl:grid-cols-3">
            {LAWS.map((l) => (
              <li key={l.n} className={`${card} overflow-hidden`}>
                <div className="aka-card-head flex items-baseline gap-2.5 px-4 py-2.5">
                  <span className="font-mono text-[10.5px] text-primary">{l.n}</span>
                  <span className="text-[13.5px] font-light text-foreground/90">{l.rule}</span>
                </div>
                <p className="px-4 py-3.5 text-[12.5px] font-light leading-relaxed text-muted-foreground">
                  {l.body}
                </p>
              </li>
            ))}
          </ol>

          <p className={`mt-5 ${MEASURE} text-[15px] font-light leading-relaxed text-muted-foreground`}>
            Law 04 is the clearest case. It reads like a taste call and started as an accessibility
            requirement for the audio-reactive work, where anything pulsing brightness in time with
            sound is a genuine hazard. Once motion could only move space, every engine in the family
            inherited a safer default without anyone having to remember why.
          </p>
        </section>
  )
}
