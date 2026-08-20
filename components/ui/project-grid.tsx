import { ProjectPlate } from '@/components/ui/project-plate'
import type { ProjectItem } from '@/components/ui/project-mark'

/**
 * A wall of project plates. One component, so the landing's six and /demo's
 * twenty-one are the same size in the same columns and scrolling from one page
 * to the other feels like the list got longer.
 *
 * It reaches slightly outside the page gutter. Everything else on the site
 * lines up to that gutter, and the plates are the one element that is better
 * for being a little wider than the column of text beside them: it lets the
 * grid read as the page's floor rather than as another paragraph. The overhang
 * stays smaller than the gutter at every breakpoint, so the row never touches
 * the edge of the screen or opens a horizontal scrollbar.
 *
 * Server-rendered.
 */
export function ProjectGrid({
  items,
  detail = false,
}: {
  items: ProjectItem[]
  /** Print each project's description, which is what an index needs. */
  detail?: boolean
}) {
  return (
    <ul className="-mx-2 grid list-none grid-cols-2 gap-x-5 gap-y-9 p-0 sm:-mx-3 sm:gap-x-6 md:-mx-6 lg:-mx-10 lg:grid-cols-3">
      {items.map((item, i) => (
        <li key={item.href}>
          {/* The first plate is above the fold on both pages that show this. */}
          <ProjectPlate item={item} detail={detail} priority={i === 0} />
        </li>
      ))}
    </ul>
  )
}
