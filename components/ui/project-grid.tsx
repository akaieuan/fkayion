import { ProjectPlate } from '@/components/ui/project-plate'
import { Reveal } from '@/components/ui/reveal'
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
 * Server-rendered by default. `reveal` opts a page into the appear-on-scroll
 * treatment, which is /demo and only /demo: that page is a long wall of plates
 * you scroll through, so a row arriving as you reach it reads as the page
 * keeping up with you. The landing shows six above the fold in a page that is
 * about the hero, and animating them there would be motion for its own sake.
 *
 * When it is on, `Reveal` is the one client component in here and it only ever
 * wraps a div: the plates are passed to it as children, which React renders on
 * the server, so nothing about a plate ships to the browser. When it is off,
 * the grid has no client component in it at all.
 */
export function ProjectGrid({
  items,
  reveal = false,
}: {
  items: ProjectItem[]
  /** Fade and lift each plate in as it is scrolled to. Off unless asked for. */
  reveal?: boolean
}) {
  return (
    <ul className="-mx-3 grid list-none grid-cols-2 gap-x-5 gap-y-9 p-0 sm:-mx-4 sm:gap-x-6 md:-mx-7 lg:-mx-12 lg:grid-cols-3">
      {items.map((item, i) => (
        <li key={item.href}>
          {/*
           * The first row is above the fold on both pages that show this, and
           * the row is three wide at the widest breakpoint. Preloading only the
           * first plate left the other two in that row to arrive late, which is
           * the pop-in the reveal is covering for; better to not have it.
           */}
          {reveal ? (
            <Reveal>
              <ProjectPlate item={item} priority={i < 3} />
            </Reveal>
          ) : (
            <ProjectPlate item={item} priority={i < 3} />
          )}
        </li>
      ))}
    </ul>
  )
}
