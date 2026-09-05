import { DemoImage } from '@/components/ui/demo-image'
import { PRIMITIVES } from '@/components/features/demo/hitl-kit/primitives'

/*
 * The primitives, from the write-up's own list, six on one sheet and five on
 * the next. Each capture sits whole in a frame of one fixed height, on the
 * card's own fill, so a row is a row whatever the source aspect was and no
 * capture loses its title or its id to a crop.
 *
 * Height budget, of 844: the kicker, the standfirst at three lines in its
 * 36rem measure and the mt-6 (about 110), then two rows of a 300px frame, an
 * 8px gap and a 17px caption (325 each) with the 20px row gap: about 780.
 */
export function HitlKitPrimitives({ from, to }: { from: number; to: number }) {
  return (
    <div className="h-full">
      <p className="aka-kicker">The primitives</p>
      <p className="aka-standfirst">
        Six of the nineteen, as they render in the shipped library. Each one carries its
        registry id in the corner, so the picture and the install command name the same thing.
      </p>

      <div className="mt-6 grid grid-cols-3 gap-x-5 gap-y-5">
        {PRIMITIVES.slice(from, to).map((c) => (
          <figure key={c.src} className="m-0">
            <div className="aka-card h-[300px] overflow-hidden">
              <DemoImage
                src={c.src}
                alt={c.alt}
                width={c.w}
                height={c.h}
                sizes="460px"
                priority
                className="block h-full w-full object-contain object-top"
              />
            </div>
            <figcaption className="mt-2 flex items-baseline justify-between gap-3 text-11 font-light text-muted-foreground/70">
              <span className="text-foreground/80">{c.name}</span>
              <code className="font-mono text-10 text-muted-foreground/60">{c.id}</code>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
