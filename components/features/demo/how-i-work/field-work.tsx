import { h2 } from '@/components/features/demo/how-i-work/chrome'

/** Field work, applied to product. Moved verbatim from app/demo/how-i-work/page.tsx. */
export function FieldWorkSection() {
  return (
          <section className="space-y-3">
            <h2 className={h2}>Field work, applied to product</h2>
            <p>
              The anthropology is the other half, and I use it on the job rather than beside it.
              Getting close to the problem means users, product research and session replays, and
              those come before a design change or a feature addition rather than after one as
              validation.
            </p>
            <p>
              The training is useful here for a specific reason. It teaches you that what people
              say they do and what they do are different data, that both are worth collecting, and
              that the gap between them is usually where the product is wrong. Watching someone
              work around your software is worth more than any number of them rating it.
            </p>
          </section>
  )
}
