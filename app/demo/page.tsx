import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

const projects = [
  {
    title: 'Research OS',
    type: 'Interactive demo',
    description: 'Multi-panel workspace with agentic search, chat, and human-in-the-loop approval flows.',
    href: '/demo/research-os',
    accent: 'bg-violet-400',
  },
  {
    title: 'Brooklyn Dead',
    type: 'Write-up',
    description:
      'Private Godot 4 game: procedural Blender→glTF pipeline, code-driven meshes and animation, Three.js previews, cross-tool attachment contracts.',
    href: '/demo/brooklyn-dead',
    accent: 'bg-rose-500/90',
  },
  {
    title: 'HITL-AI',
    type: 'Component sheet',
    description: 'Interactive reference documenting human-in-the-loop design patterns, approval states, and agent UI primitives.',
    href: '/demo/hitl-ai/sheet',
    accent: 'bg-amber-400',
  },
  {
    title: 'Music Analysis Chat',
    type: 'Interactive demo',
    description: 'AI-powered music analytics assistant with roster dashboards, creator discovery, social audits, and campaign management — mock API, full chat with rich blocks.',
    href: '/demo/music-analysis-chat',
    accent: 'bg-blue-400',
  },
  {
    title: 'Visualizer Eden',
    type: 'Audio tool',
    description: 'Browser-based 3D audio visualizer with reactive mesh deformation, custom GLSL shaders, and material presets.',
    href: '/Visualizer-Eden',
    accent: 'bg-emerald-400',
  },
]

export const metadata = {
  title: 'Projects | aka4uh',
  description: 'Interactive product demos and component showcases.',
}

export default function DemoIndexPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-xl">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          aka4uh
        </Link>

        <h1 className="text-lg font-light tracking-tight text-foreground">
          Projects
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Interactive demos, tools, and component showcases.
        </p>

        <div className="mt-8 space-y-3">
          {projects.map((project) => (
            <Link
              key={project.href}
              href={project.href}
              className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-foreground/20 hover:bg-card/80"
            >
              <div className={`mt-1 h-8 w-1 shrink-0 rounded-full ${project.accent} transition-all group-hover:h-10`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-medium text-foreground">
                    {project.title}
                  </h2>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                    {project.type}
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
              </div>
              <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground/40 transition-all group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
