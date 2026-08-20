import { ProjectCard } from '@/components/ui/project-card'
import { PROJECTS } from '@/lib/projects'

export const metadata = {
  title: 'Projects | akaBuild',
  description: 'Interactive product demos and component showcases.',
}

export default function DemoIndexPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-9 sm:pt-28 sm:pb-11">
      <div className="max-w-site mx-auto site-inset">
        <header className="mb-6">
          <h1 className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70">Projects</h1>
          <p className="mt-1 text-[13px] font-light leading-snug text-muted-foreground/70">
            Prototypes, tools, side-quests, and write-ups.
          </p>
        </header>

        <ul className="mt-5 grid auto-rows-fr grid-cols-1 gap-4 list-none p-0 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <li key={project.href} className="h-full">
              <ProjectCard
                item={{ ...project, tags: project.tags ?? [] }}
              />
            </li>
          ))}
        </ul>

      </div>
    </div>
  )
}
