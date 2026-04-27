import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

/** Sage green from landing product section (`labelAccent` / hue ~152 oklch) */
const tagAccent =
  'text-[12px] font-medium leading-snug text-[oklch(0.38_0.055_152.2)] transition-colors dark:text-[oklch(0.62_0.09_152)] group-hover:text-[oklch(0.32_0.085_152)] dark:group-hover:text-[oklch(0.78_0.1_152)]'

const profileLinks = [
  { label: 'GitHub', href: 'https://github.com/akaieuan' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ieuan-king/' },
  { label: 'Reddit', href: 'https://www.reddit.com/user/akaieuan/' },
  { label: 'akawrite', href: 'https://kraa.io/akaieuan' },
] as const

const projects = [
  {
    title: 'Ubik Studio',
    type: 'Product',
    description:
      'Co-founded and led product design at Ubik Studio, a desktop-native AI research platform for human-in-the-loop workflows.',
    href: 'https://ubik.studio',
  },
  {
    title: 'HITL Kit',
    type: 'Open source · Write-up',
    description:
      'Design system, eleven HITL primitives, shadcn registry, and personal research paper.',
    href: '/demo/hitl-kit',
  },
  {
    title: 'EVAL Kit',
    type: 'Open source · Write-up',
    description:
      'Agent eval framework: human scoring, YAML suites, local dashboard, CLI; five dimensions LLM judges miss.',
    href: '/demo/eval-kit',
  },
  {
    title: 'How I Work',
    type: 'Narrative · Demos',
    description:
      'Product design, validation, and how the Kit, Research OS, and team test log connect.',
    href: '/demo/hitl-practice',
  },
  {
    title: 'User feedback + design log',
    type: 'HITL-AI · External',
    description: 'HITL-AI team test log on Kraa.',
    href: 'https://kraa.io/team-test-log042',
  },
  {
    title: 'Inertial - Content Moderation Tool',
    type: 'Open source · Write-up',
    description:
      'HITL AI content moderation for federated and centralized platforms. Inertials emit signals, the Runciter dispatches them, humans decide. Hash-chained audit, per-instance YAML policy, four composable tiers. Pre-alpha.',
    href: '/demo/inertial',
  },
  {
    title: 'Null Browser',
    type: 'Open source · Write-up',
    description:
      'Privacy-first Tauri browser: zero telemetry, local-first AI, six invariants, every connection visible. Pre-v0.1.',
    href: '/demo/null-browser',
  },
  {
    title: 'Procedural Asset Pipeline Engineering',
    type: 'Write-up',
    description:
      'Private WIP: procedural Blender→glTF→Godot pipeline, programmatic animation, browser previews.',
    href: '/demo/brooklyn-dead',
  },
  {
    title: 'Wordle remake: Wrdef (Wordle + definition)',
    type: 'Write-up',
    description:
      'A five-letter guessing game powered by definitions, bonus rounds, and a locally saved dictionary.',
    href: '/demo/wrdef',
  },
  {
    title: 'Research OS',
    type: 'Interactive demo',
    description:
      'Multi-panel workspace with agentic search, chat, and human-in-the-loop approval flows.',
    href: '/demo/research-os',
  },
  {
    title: 'Music Analysis Chat',
    type: 'Interactive demo',
    description:
      'Music analytics assistant with roster dashboards, creator discovery, and rich chat blocks.',
    href: '/demo/music-analysis-chat',
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
  title: 'Projects | akaBuild',
  description: 'Interactive product demos and component showcases.',
}

export default function DemoIndexPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-9 sm:pt-28 sm:pb-11">
      <div className="max-w-site mx-auto site-inset">
        <div className="mx-auto md:mx-0 w-full max-w-lg">
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

        <footer className="mt-10 border-t border-border/60 pt-6">
          <a
            href="/2026-ieuan-king.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[12px] font-light text-muted-foreground/90 transition-colors hover:text-foreground"
          >
            CV (PDF, 2026)
            <ArrowUpRight className="h-3 w-3 opacity-70" aria-hidden />
          </a>
          <nav aria-label="Profiles" className="mt-4 flex flex-col gap-2">
            {profileLinks.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-1.5 text-[12px] font-light text-muted-foreground/90 transition-colors hover:text-foreground"
              >
                {label}
                <ArrowUpRight className="h-3 w-3 opacity-70" aria-hidden />
              </a>
            ))}
          </nav>
        </footer>
        </div>
      </div>
    </div>
  )
}
