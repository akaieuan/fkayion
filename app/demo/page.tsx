import { CoverFlow } from '@/components/features/demo/cover-flow/cover-flow'
import { DeckCovers } from '@/components/features/demo/cover-flow/deck-covers'
import { DeckCaption } from '@/components/features/demo/cover-flow/deck-caption'
import { ProjectGrid } from '@/components/ui/project-grid'
import { ViewToggle } from '@/components/features/demo/cover-flow/view-toggle'
import { topLevelProjects } from '@/lib/projects'

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
          covers={<DeckCovers items={items} />}
          caption={<DeckCaption items={items} />}
        />

        <div className="aka-flow-grid max-w-site mx-auto site-inset">
          <ProjectGrid items={items} reveal />
        </div>
      </div>
    </div>
  )
}
