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
 * The plate is landscape and the mark inside it is square, because every mark
 * is: the shipped logos are square app icons, and the drawn ones are glyphs and
 * grids. The inset is sized off the plate's height for that reason. Taking it
 * off the width, as it was, would grow the mark by a third the moment the plate
 * stopped being square.
 *
 * Every logo gets the same inset frame, so a grid reads as one set rather than
 * as icons of six different sizes. Art that carries its own ground fills that
 * frame; a bare glyph shows the plate's tint through it. A project with no mark
 * at all, only a screenshot, is the one exception and takes the whole plate.
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
  '(min-width: 1024px) 380px, (min-width: 768px) 490px, (min-width: 640px) 305px, 48vw'

/*
 * An inset mark is a fraction of the plate, not the plate.
 *
 * Both slots used to be told the plate's width, so a logo filling less than
 * half of one downloaded a frame about twice as wide as it could ever paint.
 */
const MARK_SIZES =
  '(min-width: 1024px) 175px, (min-width: 768px) 225px, (min-width: 640px) 140px, 22vw'

export function ProjectPlate({
  item,
  priority = false,
}: {
  item: ProjectItem
  /** Preload the mark. True for the first plate in a grid, which is the LCP. */
  priority?: boolean
}) {
  const category = item.tags?.[0]
  const external = /^https?:\/\//.test(item.href)
  const full = fillsPlate(item)

  // `relative` on the frame the image is actually inside, not just on its
  // grandparent: a screenshot renders through next/image with `fill`, which
  // positions against the nearest positioned ancestor and warns about anything
  // else directly above it.
  /*
   * Every kind of art is scaled to the frame here, including the canvas.
   *
   * The pixel engine draws at a fixed pixel size rather than a fluid one, so
   * its canvas arrived at 160px whatever the frame was. Above about 640px the
   * frame is larger than that and nothing showed; below it the canvas ran past
   * the frame and `overflow-hidden` cut the mark off at the edges. Two plates
   * on /demo and the same two on the landing lost their glyph on a phone, which
   * is the only place most people saw them.
   *
   * The selector list is per-tag because each kind needs a different rule:
   * a bitmap covers, a canvas and an SVG scale, and none of them may exceed the
   * frame. `max-h-full max-w-full` is the backstop for anything added later.
   */
  const mark = (
    <span className="relative block h-full w-full [&>*]:h-full [&>*]:w-full [&_canvas]:h-full [&_canvas]:w-full [&_canvas]:max-h-full [&_canvas]:max-w-full [&_img]:h-full [&_img]:w-full [&_img]:object-cover [&_svg]:h-full [&_svg]:w-full [&_svg]:max-h-full [&_svg]:max-w-full">
      <ProjectMark
        item={item}
        size={160}
        sizes={full ? PLATE_SIZES : MARK_SIZES}
        priority={priority}
      />
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
          mark
        ) : (
          <span
            className={`relative block aspect-square h-[62%] overflow-hidden rounded-[16%] ${
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
