import Link from 'next/link'
import { MEASURE, well } from '@/components/features/aka-style/writeup/chrome'

const linkMuted =
  'text-muted-foreground underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground'

/** The closing well: the test of a design system, and the way back to the work. */
export function Closing() {
  return (
        <section className={`mt-14 ${well} px-5 py-4 ${MEASURE}`}>
          <p className="text-[14px] font-light leading-relaxed text-foreground/85">
            The test of a design system is not whether it is documented. It is whether someone who
            has not read the documentation, which now includes a model, produces something that
            belongs. Rules pass that test and preferences do not. The rest of the work is on the{' '}
            <Link href="/demo" className={linkMuted}>
              projects page
            </Link>
            .
          </p>
        </section>
  )
}
