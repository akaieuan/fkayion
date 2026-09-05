import { LAWS } from '@/lib/aka-style'

/*
 * The eight laws, four to a row, from the list both /aka-style and the
 * write-up read.
 *
 * Height budget, of 844: the header is 76 (kicker, title, the mt-6). A card is
 * a 41px head over its body at text-14 in a 323px measure; law 02 is the
 * longest at about eleven lines, so the tallest card is near 310, and a row
 * grid sets both rows to that. Two rows and the 12px gap come to about 630,
 * and the page to about 710.
 */
export function AkaStyleLaws() {
  return (
    <div className="h-full">
      <p className="aka-kicker">The rules</p>
      <h2 className="mt-2 aka-section-title">Eight constraints, not eight preferences</h2>

      <ol className="mt-6 grid list-none grid-cols-4 gap-3 p-0">
        {LAWS.map((l) => (
          <li key={l.n} className="aka-card overflow-hidden">
            <div className="aka-card-head flex items-baseline gap-2.5 px-4 py-2.5">
              <span className="font-mono text-11 text-primary">{l.n}</span>
              <span className="text-14 font-light text-foreground/90">{l.rule}</span>
            </div>
            <p className="px-4 py-4 text-14 font-light leading-relaxed text-muted-foreground">
              {l.body}
            </p>
          </li>
        ))}
      </ol>
    </div>
  )
}
