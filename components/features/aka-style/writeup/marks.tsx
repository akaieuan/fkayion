import { PixelHead } from '@/components/features/brand/pixel-head'
import { MARK_FAMILY } from '@/lib/aka-style'
import { card } from '@/components/features/aka-style/writeup/shared'

/** Marks: the family the one canvas engine draws, each rendered live. */
export function Marks() {
  return (
        <section className="mt-16">
          <p className="aka-kicker">Brand engine</p>
          <h2 className="mt-2 aka-section-title">One canvas, a family of marks</h2>
          <p className="mt-3 text-[15px] font-light leading-relaxed text-muted-foreground">
            Every mark in the family is the same disc of pixel cells with something different
            subtracted from it. Change what is subtracted and you change brands, not code. Colour
            follows the foreground token, so a mark is correct in either theme without a second
            asset existing.
          </p>

          <ul className="mt-6 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-3">
            {MARK_FAMILY.map((m) => (
              <li key={m.name} className={`${card} flex flex-col items-center gap-3 px-5 py-6`}>
                <PixelHead size={84} grid={24} icon={m.icon} still />
                <div className="text-center">
                  <p className="text-[13px] font-light text-foreground/90">{m.name}</p>
                  <p className="font-mono text-[10px] text-muted-foreground/60">{m.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
  )
}
