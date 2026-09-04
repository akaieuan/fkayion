/** How these get made. Moved verbatim from app/demo/akavsts/page.tsx. */
export function HowTheseGetMadeSection() {
  return (
        <section className="mt-14 border-t border-border/60 pt-10">
          <p className="aka-kicker">How these get made</p>
          <div className="mt-5 space-y-5">
            {[
              {
                n: '01',
                h: 'One window, not a rack',
                t: 'Each of these exists because the thing it does was possible already, and miserable. Wiring a synth to a sequencer to a fistful of utilities gets you an acid line; it does not get you something you can perform. The instrument is the part where the wiring disappears.',
              },
              {
                n: '02',
                h: 'Character over emulation',
                t: 'None of these model a specific circuit. Enzyme evokes the Protein’s lo-fi bite with bitcrush, sample-rate reduction, and waveshaping rather than reproducing a wavetable engine. The reference is a target, not a spec.',
              },
              {
                n: '03',
                h: 'Shipped states, honestly',
                t: 'These are at v0.1, v0.4, and v1.0, and the pages say so. What is finished is listed, what is queued is listed, and where a README overpromises against the build, the build wins.',
              },
            ].map((r) => (
              <div key={r.n} className="flex gap-4">
                <span className="mt-0.5 shrink-0 font-mono text-11 text-muted-foreground/40">
                  {r.n}
                </span>
                <div>
                  <p className="text-14 text-foreground/85">{r.h}</p>
                  <p className="mt-1 text-13 font-light leading-relaxed text-muted-foreground">
                    {r.t}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
  )
}
