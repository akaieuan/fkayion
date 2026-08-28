import Link from 'next/link'
import { ProjectGrid } from '@/components/ui/project-grid'
import { topLevelProjects } from '@/lib/projects'

export const metadata = {
  title: 'Projects',
  description: 'Interactive product demos and component showcases.',
}

/**
 * Every project, as plates.
 *
 * The landing shows six of these and this page shows all of them, and they are
 * otherwise identical: the same plate at the same size in the same columns, so
 * moving between the two pages should feel like the list got longer rather than
 * like the site changed. A name and one word is all a plate says in either
 * place; the full description belongs on the project's own page.
 *
 * Fully server-rendered apart from the reveal wrapper the grid puts around each
 * plate here: this is the long page, and the plates arriving as you reach them
 * is the difference between the grid keeping up with the scroll and the grid
 * assembling itself in front of you. The landing's six do not get it.
 */
export default function DemoIndexPage() {
  return (
    <div className="min-h-screen bg-background pb-16 pt-24 sm:pt-28">
      <div className="max-w-site mx-auto site-inset">
        <header className="mb-10">
          <h1 className="text-[15px] font-normal tracking-tight text-foreground">Projects</h1>
          <p className="mt-1 text-[13px] font-light leading-snug text-muted-foreground">
            Prototypes, tools, side-quests, and write-ups. The open-source toolkits live inside{' '}
            <Link
              href="/demo/akaoss"
              className="underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground/50"
            >
              akaOSS
            </Link>
            .
          </p>
        </header>

        <ProjectGrid items={topLevelProjects()} reveal />

      </div>
    </div>
  )
}
