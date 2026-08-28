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
  flush = false,
  columns = 3,
}: {
  items: ProjectItem[]
  /** Fade and lift each plate in as it is scrolled to. Off unless asked for. */
  reveal?: boolean
  /**
   * Drop the overhang. It is measured against the page gutter on /demo and the
   * landing; inside a `max-w-2xl` article the overhang is wider than the
   * padding around it, so the first column is cut off at the edge of the
   * screen. A grid embedded in prose sits flush with the prose.
   */
  flush?: boolean
  /**
   * Widest-breakpoint column count. Three is the wall. A short group inside an
   * article is better at two: three columns for two plates leaves a hole where
   * the third would be.
   */
  columns?: 2 | 3
}) {
  return (
    <ul
      className={`grid list-none grid-cols-2 gap-x-5 gap-y-9 p-0 sm:gap-x-6 ${
        columns === 3 ? 'lg:grid-cols-3' : ''
      } ${flush ? '' : '-mx-3 sm:-mx-4 md:-mx-7 lg:-mx-12'}`}
    >
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
