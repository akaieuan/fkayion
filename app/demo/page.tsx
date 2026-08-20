import { ProjectGrid } from '@/components/ui/project-grid'
import { PROJECTS } from '@/lib/projects'

export const metadata = {
  title: 'Projects | akaBuild',
  description: 'Interactive product demos and component showcases.',
}

/**
 * Every project, as plates.
 *
 * The landing shows six of these and this page shows all of them, so they are
 * the same plate at the same size in the same three columns: scrolling from one
 * to the other should feel like the list got longer, not like the site changed.
 * The only thing this page adds is the sentence an index needs.
 *
 * Fully server-rendered. Nothing here is interactive, and the hover is CSS.
 */
export default function DemoIndexPage() {
  return (
    <div className="min-h-screen bg-background pb-16 pt-24 sm:pt-28">
      <div className="max-w-site mx-auto site-inset">
        <header className="mb-10">
          <h1 className="text-[15px] font-normal tracking-tight text-foreground">Projects</h1>
          <p className="mt-1 text-[13px] font-light leading-snug text-muted-foreground">
            Prototypes, tools, side-quests, and write-ups.
          </p>
        </header>

        <ProjectGrid items={PROJECTS} detail />

      </div>
    </div>
  )
}
