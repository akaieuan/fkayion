import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

/** Sage green from landing product section (`labelAccent` / hue ~152 oklch) */
const tagAccent =
  'text-[12px] font-medium leading-snug text-[oklch(0.38_0.055_152.2)] transition-colors dark:text-[oklch(0.62_0.09_152)] group-hover:text-[oklch(0.32_0.085_152)] dark:group-hover:text-[oklch(0.78_0.1_152)]'

const projects = [
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
      'Private Godot 4 game: procedural Blender→glTF pipeline, code-driven meshes and animation, Three.js previews, cross-tool attachment contracts.',
    href: '/demo/brooklyn-dead',
  },
  {
    title: 'HITL-AI',
    type: 'Component sheet',
    description:
      'Interactive reference documenting human-in-the-loop design patterns, approval states, and agent UI primitives.',
    href: '/demo/hitl-ai/sheet',
  },
  {
    title: 'Music Analysis Chat',
    type: 'Interactive demo',
    description:
      'AI-powered music analytics assistant with roster dashboards, creator discovery, social audits, and campaign management, mock API, full chat with rich blocks.',
    href: '/demo/music-analysis-chat',
  },
  {
    title: 'Worlde remake: Wrdef (Wordle + definition)',
    type: 'Game',
    description:
      'A five-letter guessing game powered by definitions, bonus rounds, and a local leaderboard.',
    href: 'https://www.wrdef.com/',
  },
  {
    title: 'Visualizer Eden',
    type: 'Audio tool',
    description:
      'Browser-based 3D audio visualizer with reactive mesh deformation, custom GLSL shaders, and material presets.',
    href: '/Visualizer-Eden',
  },
]

export const metadata = {
  title: 'Projects | aka4uh',
  description: 'Interactive product demos and component showcases.',
}

export default function DemoIndexPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-12 sm:py-14">
      <div className="mx-auto w-full max-w-lg">
        <Link
          href="/"
          className="mb-7 inline-flex items-center gap-1.5 text-[11px] text-muted-foreground/90 transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          aka4uh
        </Link>

        <header>
          
          <p className="mt-1.5 text-[13px] font-light leading-snug text-muted-foreground">
            Demos, tools, and write-ups. Each opens in place; nothing here is production infrastructure.
          </p>
        </header>

        <ul className="mt-7 flex list-none flex-col gap-2 p-0">
          {projects.map((project) => {
            const isExternal = /^https?:\/\//.test(project.href)
            const linkClass =
              'group block rounded-md px-2 py-2 -mx-2 transition-colors hover:bg-muted/30'
            const body = (
              <>
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-[15px] font-light leading-snug tracking-[-0.02em] text-foreground pr-2">
                    {project.title}
                  </h2>
                  <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/35 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[oklch(0.4_0.08_152.2)] dark:group-hover:text-[oklch(0.707_0.108_152.216)]" />
                </div>
                <p className={`mt-0.5 ${tagAccent}`}>{project.type}</p>
                <p className="mt-1 text-[13px] font-light leading-[1.55] text-muted-foreground">
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
