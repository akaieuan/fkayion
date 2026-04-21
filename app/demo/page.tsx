import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

/** Sage green from landing product section (`labelAccent` / hue ~152 oklch) */
const tagAccent =
  'text-[12px] font-medium leading-snug text-[oklch(0.38_0.055_152.2)] transition-colors dark:text-[oklch(0.62_0.09_152)] group-hover:text-[oklch(0.32_0.085_152)] dark:group-hover:text-[oklch(0.78_0.1_152)]'

const projects = [
  {
    title: 'Ubik Studio',
    type: 'Product',
    description:
      'Co-founded and lead product design Ubik Studio, a desktop-native AI research platform for human-in-the-loop workflows.',
    href: 'https://ubik.studio',
  },
  {
    title: 'Research OS',
    type: 'Interactive demo',
    description:
      'Multi-panel workspace with agentic search, chat, and human-in-the-loop approval flows.',
    href: '/demo/research-os',
  },
  {
    title: 'Procedural Asset Pipeline Engineering',
    type: 'Write-up',
    description:
      'Private WIP: procedural Blender→glTF→Godot pipeline, programmatic animation, browser previews.',
    href: '/demo/brooklyn-dead',
  },
  {
    title: 'HITL-AI',
    type: 'Component sheet',
    description:
      'Reference sheet for approval states, agent UI primitives, and HITL design patterns.',
    href: '/demo/hitl-ai/sheet',
  },
  {
    title: 'Music Analysis Chat',
    type: 'Interactive demo',
    description:
      'Music analytics assistant with roster dashboards, creator discovery, and rich chat blocks.',
    href: '/demo/music-analysis-chat',
  },
  {
    title: 'Worlde remake: Wrdef (Wordle + definition)',
    type: 'Write-up',
    description:
      'A five-letter guessing game powered by definitions, bonus rounds, and a locally saved dictionary.',
    href: '/demo/wrdef',
  },
  {
    title: 'Visualizer Eden',
    type: 'Audio tool',
    description:
      'Browser-based 3D audio visualizer with reactive mesh deformation, custom GLSL shaders, and material presets.',
    href: '/demo/visualizer-eden',
  },
]

export const metadata = {
  title: 'Projects | aka4uh',
  description: 'Interactive product demos and component showcases.',
}

export default function DemoIndexPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-9 sm:py-11">
      <div className="mx-auto w-full max-w-lg">
        <Link
          href="/"
          className="mb-5 inline-flex items-center gap-1.5 text-[11px] text-muted-foreground/90 transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          home
        </Link>

        <header>
          
          <p className="mt-1 text-[13px] font-light leading-snug text-muted-foreground">
            Prototypes, tools, side-quests, and write-ups.
          </p>
        </header>

        <ul className="mt-5 flex list-none flex-col gap-0.5 p-0">
          {projects.map((project) => {
            const isExternal = /^https?:\/\//.test(project.href)
            const linkClass =
              'group block rounded-md px-2 py-1.5 -mx-2 transition-colors hover:bg-muted/30'
            const body = (
              <>
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-[15px] font-light leading-snug tracking-[-0.02em] text-foreground pr-2">
                    {project.title}
                  </h2>
                  <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/35 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[oklch(0.4_0.08_152.2)] dark:group-hover:text-[oklch(0.707_0.108_152.216)]" />
                </div>
                <p className={`mt-px ${tagAccent}`}>{project.type}</p>
                <p className="mt-0.5 text-[13px] font-light leading-snug text-muted-foreground">
                  {project.description}
                </p>
              </>
            )
            return (
              <li key={project.href}>
                {isExternal ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {body}
                  </a>
                ) : (
                  <Link href={project.href} className={linkClass}>
                    {body}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
