import Link from 'next/link'
import { AkaMark } from '@/components/features/brand/aka-mark'
import { mono, card as cell } from '@/components/features/aka-style/shared'

/** Derived engine: AkaMark, the discipline cycler. Moved verbatim from app/aka-style/marks/page.tsx. */
export function DisciplineCyclerSection() {
  return (
        <section className="mt-16">
          <p className="aka-kicker">Derived engine</p>
          <h2 className="mt-2 aka-section-title">
            AkaMark, the discipline cycler
          </h2>
          <p className="aka-standfirst">
            Same disc grammar, but each reform reveals a discipline rather than a face: AI spark,
            code brackets, an eighth note, an isometric cube, a terminal prompt, a pen stroke. The
            dissolve <em>is</em> the discipline change.
          </p>
          <p className="aka-standfirst">
            It was the hero until the hero moved to{' '}
            <Link href="/aka-style/faces" className="text-primary underline decoration-border underline-offset-[3px]">
              faces
            </Link>
            . Kept, because the discipline set is still the clearest demonstration of what a
            knockout can carry, and because nothing else in the library swaps its subject on the
            dissolve.
          </p>
          <div className={`${cell} mt-6 flex flex-col items-center gap-4`}>
            <AkaMark size={190} grid={24} />
            <p className={mono}>{'<AkaMark size={400} grid={24} hold={3.4} fluid />'}</p>
          </div>
        </section>
  )
}
