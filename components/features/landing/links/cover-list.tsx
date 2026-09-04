import Image from 'next/image'
import { BLUR } from '@/lib/blur-map.generated'
import { HoverBlurb } from './hover-blurb'

/**
 * A list whose rows show their artwork under the cursor.
 *
 * The artwork used to open in a fixed lane off to the right, which put a
 * picture of a record several hundred pixels from the name you were pointing
 * at. It follows the pointer instead, so the art arrives where you are already
 * looking.
 *
 * A server component, like the writing list: the covers are rendered here and
 * handed to the same island as nodes, so next/image's markup is decided on the
 * server and the only client code involved is the one that tracks the pointer.
 */

export type CoverRow = {
  title: string
  meta: string
  href: string
  /** Artwork. Optional: a row without one simply shows nothing. */
  cover?: string
}

const SIZE = 232

export function CoverList({ items }: { items: CoverRow[] }) {
  const covers = items.map((row) =>
    row.cover ? (
      <Image
        key={row.href}
        src={row.cover}
        alt=""
        width={SIZE * 2}
        height={SIZE * 2}
        quality={82}
        {...(BLUR[row.cover] ? { placeholder: 'blur' as const, blurDataURL: BLUR[row.cover] } : {})}
        sizes={`${SIZE}px`}
        className="h-full w-full object-cover"
      />
    ) : null
  )

  return (
    <HoverBlurb
      blurbs={covers}
      panelClassName="aka-overlay overflow-hidden rounded-xl"
      panelStyle={{ width: SIZE, height: SIZE }}
    >
      <ul className="list-none p-0">
        {items.map((row, i) => (
          <li key={row.href}>
            <a
              href={row.href}
              target="_blank"
              rel="noopener noreferrer"
              data-blurb={i}
              className="group block py-2.5"
            >
              <span className="text-14 font-light tracking-tight text-foreground/85 underline decoration-transparent underline-offset-[5px] transition-colors duration-200 group-hover:text-foreground group-hover:decoration-foreground/30">
                {row.title}
              </span>
              <span className="mt-0.5 block text-13 font-light leading-relaxed text-muted-foreground/55 transition-colors duration-200 group-hover:text-muted-foreground/80">
                {row.meta}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </HoverBlurb>
  )
}
