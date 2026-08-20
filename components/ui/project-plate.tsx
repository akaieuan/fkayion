import Link from 'next/link'
import { ProjectMark, fillsPlate, type ProjectItem } from '@/components/ui/project-mark'

/**
 * A project at plate size: its mark on a square, its name, and one word.
 *
 * This is the stamp from the old card, scaled up until it is the thing you see.
 * The card surrounded a 26px mark with a border, a description, four tags and an
 * arrow, which made the cleanest element on it also the smallest. Here the
 * chrome goes and the mark takes the space instead.
 *
 * The plate is square because every mark is: the shipped logos are square app
 * icons, and the drawn ones are glyphs and grids. A landscape plate would mean
 * insetting the icons inside it, which is how they ended up looking shrunken
 * and off-centre.
 *
 * Every logo gets the same inset frame, so a grid reads as one set rather than
 * as icons of six different sizes. Art that carries its own ground fills that
 * frame; a bare glyph shows the plate's tint through it. A project with no mark
 * at all, only a screenshot, is the one exception and takes the whole plate.
 *
 * `detail` is what the /demo index adds: the same plate, plus the sentence an
 * index needs. The landing shows the flagships and can stay at a name.
 *
 * The category is the project's first tag rather than a new field, so it cannot
 * drift from what /demo says about the same project.
 *
 * Server-rendered, hover is CSS.
 */
/*
 * What a plate actually measures, so the browser stops guessing.
 *
 * The landing and /demo use the same container (max-w-site, site-inset) and the
 * same two-then-three column grid, so one string covers both. Widest is the
 * two-column case just under lg, where the gutters are still narrow: 452px.
 * Three columns at full width is smaller than that, not larger.
 */
const PLATE_SIZES =
  '(min-width: 1024px) 365px, (min-width: 768px) 480px, (min-width: 640px) 300px, 48vw'

export function ProjectPlate({
  item,
  detail = false,
  priority = false,
}: {
  item: ProjectItem
  /** Print the description under the name. */
  detail?: boolean
  /** Preload the mark. True for the first plate in a grid, which is the LCP. */
  priority?: boolean
}) {
  const category = item.tags?.[0]
  const external = /^https?:\/\//.test(item.href)
  const full = fillsPlate(item)

  const mark = (
    <span className="block h-full w-full [&>*]:h-full [&>*]:w-full [&_img]:h-full [&_img]:w-full [&_img]:object-cover [&_svg]:h-full [&_svg]:w-full">
      <ProjectMark item={item} size={160} sizes={PLATE_SIZES} priority={priority} />
    </span>
  )

  const body = (
    <>
      <span
        className="aka-plate"
        style={{ ['--plate-tint' as string]: item.accent ?? 'var(--foreground)' }}
      >
        {/*
         * Every logo sits in the same inset square, whatever it is made of.
         * Letting art that carries its own ground run to the plate edge made
         * Ubik a full-bleed black tile beside five inset ones, and forcing the
         * whole plate dark for the light-on-nothing marks put two black squares
         * in an otherwise light grid. The ground belongs to the mark, so it
         * lives on the mark's frame and the plate stays with the theme.
         *
         * `relative` is load-bearing: a screenshot renders through next/image
         * with `fill`, which positions against its nearest positioned ancestor.
         */}
        {full ? (
          <span className="relative block h-full w-full">{mark}</span>
        ) : (
          <span
            className={`relative block aspect-square w-[52%] overflow-hidden rounded-[16%] ${
              item.onDark ? 'aka-mark-ground' : ''
            }`}
          >
            {mark}
          </span>
        )}
      </span>

      <span className="mt-3.5 block text-[14.5px] font-light tracking-tight text-foreground/90">
        {item.title}
      </span>
      {category && (
        <span className="mt-0.5 block text-[12.5px] font-light text-muted-foreground/55">
          {category}
        </span>
      )}
      {detail && (
        <span className="mt-2 line-clamp-3 block text-[12.5px] font-light leading-relaxed text-muted-foreground/55 transition-colors duration-200 group-hover:text-muted-foreground/80">
          {item.description}
        </span>
      )}
    </>
  )

  const cls = 'group block'
  return external ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className={cls}>
      {body}
    </a>
  ) : (
    <Link href={item.href} className={cls}>
      {body}
    </Link>
  )
}
