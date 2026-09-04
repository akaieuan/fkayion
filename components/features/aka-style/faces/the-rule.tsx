import Link from 'next/link'
import { label, card as cell } from '@/components/features/aka-style/shared'

/** The rule: when a mark is allowed to have a face. Moved verbatim from app/aka-style/faces/page.tsx. */
export function TheRuleSection() {
  return (
        <section className={`${cell}`}>
          <p className={label}>The rule</p>
          <p className="mt-2 text-14 font-light leading-relaxed text-foreground/85">
            A face needs room and it needs time. So it appears at hero scale and nowhere else: the
            header and footer marks are the same engine held still with no face at all, because an
            expression at 26px is noise, and a mark you look at for a second cannot say anything
            with a 2.9-second slot.
          </p>
          <p className="mt-3 text-14 font-light leading-relaxed text-foreground/85">
            The set comes from <span className="text-foreground">Circleheads</span>, a studio of
            people, and akaBuild runs the same head through the same twenty-six expressions. It
            used to cycle{' '}
            <Link href="/aka-style/marks" className="text-primary underline decoration-border underline-offset-[3px]">
              disciplines
            </Link>{' '}
            instead. Naming the work was the weaker version of the point: range reads better as one
            face changing than as a list.
          </p>
        </section>
  )
}
