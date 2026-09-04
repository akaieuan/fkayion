import Link from 'next/link'
import { well } from '@/components/features/demo/aka-style/shared'

/** The closing well: the test of a design system, and the way back to the work. */
export function Closing() {
  return (
        <section className={`mt-14 ${well} px-5 py-4`}>
          <p className="text-14 font-light leading-relaxed text-foreground/85">
            The test of a design system is not whether it is documented. It is whether someone who
            has not read the documentation, which now includes a model, produces something that
            belongs. Rules pass that test and preferences do not. The rest of the work is on the{' '}
            <Link href="/demo" className="aka-quiet-link">
              projects page
            </Link>
            .
          </p>
        </section>
  )
}
