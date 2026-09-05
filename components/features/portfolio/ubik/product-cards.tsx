import type { ReactNode } from 'react'
import { DemoImage } from '@/components/ui/demo-image'
import { UbikCardArt } from '@/components/product-replicas/ubik/card-art'
import { demos, DEMO_H } from '@/components/features/demo/ubik/product-cards'
import type { CardArt } from '@/components/product-replicas/ubik/card-art'
import type { Demo } from '@/components/features/demo/ubik/shared'

/**
 * The painted ground, the wash and the edge of a product card, with nothing
 * on it yet. The write-up's card puts the copy over a playing loop; a printed
 * sheet has no loop, so the three Ubik pages that show these lay their own
 * content on this ground and put the recording's poster where the video was.
 */
export function DemoCardFrame({
  art,
  className = '',
  children,
}: {
  art: CardArt
  className?: string
  children: ReactNode
}) {
  return (
    <figure className={`relative overflow-hidden rounded-2xl border border-border/60 ${className}`}>
      <UbikCardArt art={art} className="absolute inset-0 h-full w-full" />
      {/* The wash between the paint and the type, as on the write-up. */}
      <div className="absolute inset-0 bg-gradient-to-b from-wash-on-art/45 via-wash-on-art/25 to-wash-on-art/55" />
      {children}
    </figure>
  )
}

/**
 * One capability as a card: title, summary and length on the left, the poster
 * on the right. Sized by the grid cell it lands in, so the row it belongs to
 * sets its height and the poster, at 346 wide inside the 300-and-rest split,
 * is at most 285 tall and sits centred.
 */
export function UbikDemoCard({ demo }: { demo: Demo }) {
  return (
    <DemoCardFrame art={demo.art}>
      <div className="relative grid h-full grid-cols-[300px_1fr] items-center gap-6 p-6">
        <figcaption>
          <h3 className="text-17 font-medium tracking-tight text-on-art">{demo.title}</h3>
          <p className="mt-2 text-12 font-light leading-relaxed text-on-art/75">{demo.summary}</p>
          <p className="mt-3 font-mono text-10 uppercase tracking-[0.14em] text-on-art/45">
            {demo.length}
          </p>
        </figcaption>
        <div className="overflow-hidden rounded-lg ring-1 ring-on-art/10">
          <DemoImage
            src={`${demo.src}-poster.webp`}
            alt={demo.title}
            width={1280}
            height={DEMO_H[demo.src]}
            sizes="380px"
            priority
            className="block h-auto w-full"
          />
        </div>
      </div>
    </DemoCardFrame>
  )
}

/*
 * The product, in motion: the first four of the seven recordings.
 *
 * Budget: kicker and a two-line standfirst about 64, a gap of 24, and the
 * grid fixed at 720, which is two rows of 350 and a 20 gap. About 808 of the
 * 844. Inside a card the copy column is at most about 230 tall and the poster
 * at most 265, in the 302 the card's padding leaves.
 */
export function UbikProductCards() {
  return (
    <div className="h-full">
      <p className="aka-kicker">The product, in motion</p>
      <p className="aka-standfirst">Seven silent recordings of the last build, March 2026.</p>

      <div className="mt-6 grid h-[720px] grid-cols-2 grid-rows-2 gap-5">
        {demos.slice(0, 4).map((demo) => (
          <UbikDemoCard key={demo.src} demo={demo} />
        ))}
      </div>
    </div>
  )
}
