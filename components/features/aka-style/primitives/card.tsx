import Link from 'next/link'
import { Spec } from '@/components/features/aka-style/spec'

/** Card: the project plate, reading ink, and the reveal. Moved verbatim from app/aka-style/primitives/page.tsx. */
export function CardSection() {
  return (
        <section className="mt-14 space-y-3">
          <p className="aka-kicker">Card</p>

          <Spec
            name="Project plate"
            note="the mark at the size where it is the thing you see"
            cls={`.aka-plate  grid aspect-[4/3] w-full place-items-center overflow-hidden rounded-xl
            background-color: color-mix(in srgb, var(--plate-tint) var(--plate-mix), var(--stamp-ground))
mark        relative block aspect-square h-[62%] overflow-hidden rounded-[16%]
.aka-mark-ground   a dark ground for art drawn light on nothing
hover       .group:hover .aka-plate { transform: translateY(-3px) }

This replaced a card that surrounded a 26px mark with a border, a description,
four tags and an arrow, which made the cleanest element on it also the smallest.
The chrome went and the mark took the space.

The plate is landscape and the mark inside it is square, because every mark is.
The inset is sized off the plate's height for that reason: taking it off the
width would grow the mark by a third the moment the plate stopped being square.

Art that carries its own ground fills the inset frame; a bare glyph shows the
tint through it; a screenshot is the one exception and takes the whole plate,
because cropping a picture of the work into a small square in the middle of a
large plate reads as a thumbnail of a thumbnail.`}
          >
            <p className="text-[12px] font-light text-muted-foreground/70">
              Live on{' '}
              <Link href="/demo" className="text-foreground underline underline-offset-2">
                /demo
              </Link>{' '}
              and the landing grid. Server-rendered; the hover is CSS.
            </p>
          </Spec>

          <Spec
            name="Reading ink"
            note="the two steps that carry long-form text"
            cls={`.aka-ink-body   color-mix(in srgb, var(--foreground) 82%, transparent)
.aka-ink-quiet  color-mix(in srgb, var(--foreground) 62%, transparent)

Classes, not utilities, because /nn does not compile against a bare var() token
on Tailwind v3. See foundations.`}
          >
            <div className="w-full space-y-1.5">
              <p className="aka-ink-body text-[13px] font-light leading-relaxed">
                Body ink. What an essay is set in.
              </p>
              <p className="aka-ink-quiet text-[13px] font-light leading-relaxed">
                Quiet ink. A caption, a date, an aside.
              </p>
            </div>
          </Spec>

          <Spec
            name="Reveal"
            note="scroll-driven, no JavaScript"
            cls={`.aka-rise   animation-timeline: view(); animation-range: …; animation-duration: auto

Longhands only. The \`animation\` shorthand resets animation-timeline to auto and
the reveal silently becomes a one-shot on load.

This replaced an IntersectionObserver that existed to fade in one paragraph and
forced the whole landing section — every plate, every link — to be a client
component in order to hold its one boolean.`}
          >
            <p className="text-[12px] font-light text-muted-foreground/70">
              Live on the landing&apos;s writing and music lists.
            </p>
          </Spec>
        </section>
  )
}
