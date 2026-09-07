import type { ReactNode } from 'react'

/**
 * One slide of a `Carousel`: a figure the width of the track, with its
 * caption under it.
 *
 * A server component on purpose, in its own file: everything the slide holds,
 * an image through next/image or a recording's poster, is rendered here and
 * handed to the client carousel as finished markup. Adding a slide does not
 * grow the client bundle by a byte.
 *
 * `index` and `total` are announced to a screen reader as "3 of 10"; the
 * sighted reader gets the same from the carousel's counter.
 */
export function CarouselSlide({
  index,
  total,
  caption,
  children,
}: {
  index: number
  total: number
  /** One or two lines under the figure, in the caption ink. */
  caption?: ReactNode
  children: ReactNode
}) {
  return (
    <figure
      data-slide
      role="group"
      aria-roledescription="slide"
      aria-label={`${index} of ${total}`}
      className="aka-carousel-slide"
    >
      {children}
      {caption && (
        <figcaption className="mt-2.5 text-11 font-light leading-relaxed text-muted-foreground/70">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
