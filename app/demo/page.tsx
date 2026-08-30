import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { CoverFlow } from '@/components/features/demo/cover-flow'
import { ProjectCover } from '@/components/ui/project-cover'
import { TagRow } from '@/components/ui/tag-row'
import { ProjectGrid } from '@/components/ui/project-grid'
import { ViewToggle } from '@/components/ui/view-toggle'
import { topLevelProjects } from '@/lib/projects'
import { SUMMARIES } from '@/lib/plain-summaries'

export const metadata = {
  title: 'Projects',
  description: 'Interactive product demos and component showcases.',
}

/**
 * Every project, twice: as a deck and as a wall.
 *
 * The wall is the honest index and a flat first impression, so the deck is what
 * you land on and the wall is one button away. Both are rendered here, on the
 * server, and the toggle flips an attribute between them: two views of one list
 * rather than two pages, and no project can appear in one and not the other.
 *
 * Nothing on this page is a client component except the deck's controller and
 * the toggle's two buttons. The eighteen covers, the eighteen captions and the
 * whole grid are passed to them as children, which React renders here and hands
 * over finished. Adding a project grows the HTML and not the bundle.
 */

/*
 * A caption is the project's own plain-language opening line.
 *
 * Not a new field. `In simple terms` already answers "what is this" in one
 * sentence on every write-up, and taking its first line means the deck and the
 * page it links to cannot say different things about the same project. The
 * three top-level entries with no write-up summary fall back to the description
 * they already carry in lib/projects.ts.
 */
function captionFor(href: string, description: string) {
  return SUMMARIES[href]?.what[0] ?? description
}

export default function DemoIndexPage() {
  const items = topLevelProjects()

  return (
    <div className="min-h-screen bg-background pb-16 pt-24 sm:pt-28">
      <div className="max-w-site mx-auto site-inset">
        {/*
          The heading is read, not seen. A page still needs one — for the
          document outline, for a screen reader arriving by heading, and for
          anything reading the page structurally — but the deck names every
          project as you reach it and the tab already says Projects, so a
          heading that repeats the tab was one more thing to look past. What is
          left is the choice of layout, which is the only thing here a reader
          actually has to make.
        */}
        <h1 className="sr-only">Projects</h1>
        {/*
          Sticky, because it is the only chrome left. The deck consumes several
          screens of scroll, and a switch that scrolled away at the top of it
          would mean scrolling all the way back to change your mind.
        */}
        <div className="sticky top-[76px] z-20 mb-6 flex justify-end">
          <ViewToggle target="projects" />
        </div>
      </div>

      {/*
        The attribute the toggle writes, and the only thing that distinguishes
        the two views. `deck` is what the server renders, so the page is correct
        before any script runs.
      */}
      <div id="projects" data-view="deck">
        <CoverFlow
          count={items.length}
          covers={
            /*
             * The semantic layer, and it does not change with the view: an
             * ordered list of eighteen links in source order. Whatever the
             * transforms do to them, a crawler and a screen reader get the same
             * list they would get from the grid.
             */
            <ol className="contents list-none p-0">
              {items.map((item, i) => {
                const external = /^https?:\/\//.test(item.href)
                const inner = (
                  <>
                    <ProjectCover item={item} priority={i === 0} />
                    <span className="sr-only">
                      {item.title}. {captionFor(item.href, item.description)}
                    </span>
                  </>
                )
                return (
                  <li
                    key={item.href}
                    data-flow-card={i}
                    className="aka-flow-card"
                    style={{ ['--i' as string]: i }}
                  >
                    {external ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer">
                        {inner}
                      </a>
                    ) : (
                      <Link href={item.href}>{inner}</Link>
                    )}
                  </li>
                )
              })}
            </ol>
          }
          caption={
            /*
             * Presentational, and deliberately so. Every line here is already
             * in the list above as the covers' accessible names, so announcing
             * it a second time would make the deck read as thirty-six items.
             * The strip steps to the centred cover; see .aka-flow-strip.
             */
            <div className="aka-flow-strip" aria-hidden>
              {items.map((item) => {
                const external = /^https?:\/\//.test(item.href)
                return (
                  <div key={item.href} className="aka-flow-slot flex flex-col items-center">
                    <p className="text-[17px] font-light tracking-tight text-foreground/90">
                      {item.title}
                    </p>

                    {/*
                     * What kind of thing it is, from the tags the project
                     * already carries. Three at most: the fourth is always the
                     * one nobody needed, and a wrapped second row would push
                     * the caption past its floor.
                     */}
                    {item.tags && (
                      <TagRow className="mt-2 justify-center" tags={item.tags.slice(0, 3)} />
                    )}

                    <p className="mt-2.5 line-clamp-4 text-[13.5px] font-light leading-relaxed text-muted-foreground">
                      {captionFor(item.href, item.description)}
                    </p>

                    {/*
                     * Styled as the house secondary button. It is a span rather
                     * than a link because the cover above it already is one:
                     * the caption forwards clicks to it, so this is the visible
                     * affordance for a mouse and never a second tab stop or a
                     * second announcement.
                     */}
                    <span className="mt-3.5 inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 py-2 text-[12.5px] font-medium text-foreground">
                      {external ? 'Open the site' : 'Learn more'}
                      {external ? (
                        <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      ) : (
                        <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      )}
                    </span>
                  </div>
                )
              })}
            </div>
          }
        />

        <div className="aka-flow-grid max-w-site mx-auto site-inset">
          <ProjectGrid items={items} reveal />
        </div>
      </div>
    </div>
  )
}
