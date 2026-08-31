import { ProjectMark, fillsPlate, type ProjectItem } from '@/components/ui/project-mark'

/**
 * A project's plate, at deck size, with nothing under it.
 *
 * This is `ProjectPlate` without the name and the category: in the deck those
 * live in the caption below the centred cover, where they belong to whichever
 * cover is centred rather than to all eighteen at once.
 *
 * The art logic is not repeated. Which of six kinds of mark a project carries,
 * whether it fills its frame, whether it brings its own dark ground: all of
 * that is `ProjectMark`'s problem and is solved once, in
 * components/ui/project-mark.tsx. This chooses a size and a frame.
 *
 * Server-rendered, like the plate. It is handed to the deck controller as
 * children, so none of it reaches the browser as client code.
 */

/*
 * A cover is never wider than --flow-cover, which tops out at 400px. The grid's
 * hint tops out at 490px, and reusing it would have every bitmap in the deck
 * download a frame it cannot paint.
 */
const COVER_SIZES = '(min-width: 1024px) 400px, (min-width: 640px) 320px, 62vw'
const COVER_MARK_SIZES = '(min-width: 1024px) 190px, (min-width: 640px) 150px, 30vw'

export function ProjectCover({
  item,
  priority = false,
}: {
  item: ProjectItem
  /** The centred cover at rest, which is this page's LCP. First card only. */
  priority?: boolean
}) {
  const full = fillsPlate(item)

  const mark = (
    <span className="relative block h-full w-full [&>*]:h-full [&>*]:w-full [&_canvas]:h-full [&_canvas]:w-full [&_canvas]:max-h-full [&_canvas]:max-w-full [&_img]:h-full [&_img]:w-full [&_img]:object-cover [&_svg]:h-full [&_svg]:w-full [&_svg]:max-h-full [&_svg]:max-w-full">
      <ProjectMark
        item={item}
        size={190}
        sizes={full ? COVER_SIZES : COVER_MARK_SIZES}
        priority={priority}
      />
    </span>
  )

  return (
    <span
      className="aka-plate"
      style={{ ['--plate-tint' as string]: item.accent ?? 'var(--foreground)' }}
    >
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
  )
}
