import Link from 'next/link'
import { ProjectMark, type ProjectItem } from '@/components/ui/project-mark'

/**
 * A project at landing size: its mark on a plate, its name, and one word.
 *
 * This is the stamp from the card, scaled up until it is the thing you see. The
 * card surrounds a 26px mark with a border, a description, four tags and an
 * arrow, which makes the cleanest element on it also the smallest. Here the
 * chrome goes and the mark takes the space instead. The full description and
 * the rest of the tags still live on /demo, where an index wants them.
 *
 * The plate is square because every mark is: the shipped logos are square app
 * icons, and the drawn ones are glyphs and grids. A landscape plate would mean
 * insetting the icons inside it, which is how they ended up looking shrunken
 * and off-centre.
 *
 * Every mark gets the same inset frame, so the grid reads as one set rather
 * than as icons of six different sizes. Art that carries its own ground fills
 * that frame; a bare glyph shows the plate's tint through it.
 *
 * The category is the project's first tag rather than a new field, so it cannot
 * drift from what /demo says about the same project.
 *
 * Server-rendered, hover is CSS.
 */
export function ProjectPlate({ item }: { item: ProjectItem }) {
  const category = item.tags?.[0]
  const external = /^https?:\/\//.test(item.href)

  const body = (
    <>
      <span
        className="aka-plate"
        style={{ ['--plate-tint' as string]: item.accent ?? 'var(--foreground)' }}
      >
        {/*
         * Every mark sits in the same inset square, whatever it is made of.
         * Letting art that carries its own ground run to the plate edge made
         * Ubik a full-bleed black tile beside five inset ones, and forcing the
         * whole plate dark for the light-on-nothing marks put two black squares
         * in an otherwise light grid. The ground belongs to the mark, so it
         * lives on the mark's frame and the plate stays with the theme.
         */}
        <span
          className={`block aspect-square w-[52%] overflow-hidden rounded-[16%] ${
            item.onDark ? 'aka-mark-ground' : ''
          }`}
        >
          <span className="block h-full w-full [&>*]:h-full [&>*]:w-full [&_img]:h-full [&_img]:w-full [&_img]:object-cover [&_svg]:h-full [&_svg]:w-full">
            <ProjectMark item={item} size={160} sizes="(min-width: 1024px) 200px, 26vw" />
          </span>
        </span>
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
