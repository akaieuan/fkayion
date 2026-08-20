import Link from 'next/link'
import { ProjectMark, marksBleed, type ProjectItem } from '@/components/ui/project-mark'

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
 * Two kinds of art, handled differently and for a reason. A shipped icon
 * already carries its own ground and corners, so it fills the plate and *is*
 * the plate. A drawn mark is a bare shape, so it sits centred on a whisper of
 * the project's accent. That split is the same one the small stamp already
 * makes; this only scales it.
 *
 * The category is the project's first tag rather than a new field, so it cannot
 * drift from what /demo says about the same project.
 *
 * Server-rendered, hover is CSS.
 */
export function ProjectPlate({ item }: { item: ProjectItem }) {
  const bleed = marksBleed(item)
  const category = item.tags?.[0]
  const external = /^https?:\/\//.test(item.href)

  const body = (
    <>
      <span
        className={`aka-plate${bleed ? ' aka-plate-bleed' : ''}`}
        style={bleed ? undefined : { ['--plate-tint' as string]: item.accent ?? 'var(--foreground)' }}
      >
        {bleed ? (
          <ProjectMark item={item} size={160} sizes="(min-width: 1024px) 340px, 45vw" />
        ) : (
          /*
           * Drawn at a large intrinsic size and scaled by width, so the mark
           * stays a constant fraction of the plate at every breakpoint. Passing
           * a pixel size straight through would make it correct on a desktop
           * grid and enormous on a phone.
           */
          <span className="block w-[44%] [&_img]:h-auto [&_img]:w-full [&_svg]:h-auto [&_svg]:w-full">
            <ProjectMark item={item} size={160} sizes="(min-width: 1024px) 150px, 20vw" />
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
