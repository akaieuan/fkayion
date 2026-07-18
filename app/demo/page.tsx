import { ArrowUpRight } from 'lucide-react'
import { SpotlightCard } from '@/components/ui/spotlight-card'

const profileLinks = [
  { label: 'GitHub', href: 'https://github.com/akaieuan' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ieuan-king/' },
  { label: 'Reddit', href: 'https://www.reddit.com/user/akaieuan/' },
  { label: 'akawrite', href: 'https://kraa.io/akaieuan' },
] as const

const projects = [
  {
    title: 'Circleheads',
    type: 'Studio · Applied AI',
    description:
      'The two-person Brooklyn applied-AI studio I co-run — agents in production, a short senior consulting bench, and original games. Taking a few projects a year.',
    href: '/demo/circleheads',
  },
  {
    title: 'akaOSS',
    type: 'Studio · Open source',
    description:
      'The open-source studio for human-in-the-loop AI — five projects (HITL Kit, EVAL Kit, tag-kit, Collapse, Hologram), the Assist-Not-Complete thesis, and a reproducible research feed.',
    href: '/demo/akaoss',
  },
  {
    title: 'Ubik Studio',
    type: 'Product',
    description:
      'Co-founded and led product design at Ubik Studio, a desktop-native AI research platform for human-in-the-loop workflows.',
    href: 'https://www.reddit.com/user/akaieuan/',
  },
  {
    title: 'Box Populi',
    type: 'Client project · Live site',
    description:
      'On-brand site for a NYC live-techno collective. Custom audio players over the SoundCloud Widget, multiple live streams coordinated so they never overlap, an iOS quirk handled honestly.',
    href: '/demo/box-populi',
  },
  {
    title: 'Hologram',
    type: 'Open source · Dev tool · Write-up',
    description:
      'Live observability and a read-only MCP surface for Blender → glTF pipelines — watch your AI agent work on your game assets in real time.',
    href: '/demo/hologram',
  },
  {
    title: 'akaVSTs',
    type: 'Instruments · VST3 / AU · Live',
    description:
      'Three Ableton-ready instrument plugins I play live and use in my own music — an acid synth + P-lock sequencer, a 4-layer lo-fi synth, and a sculpting sampler. JUCE 8 · C++17 · VST3 / AU / Standalone.',
    href: '/demo/akavsts',
  },
  {
    title: 'Collapse',
    type: 'Open source · Dev tool · Write-up',
    description:
      'Pattern → SKILL.md compiler for Claude Code. Three pluggable ingestors (MDX, Jupyter, custom) feed a typed pipeline with local atomic writes to ~/.claude/skills/. Next.js 16 + TypeScript.',
    href: '/demo/collapse',
  },
  {
    title: 'akaCOVART',
    type: 'Open source · Generative studio',
    description:
      'A generative album-art engine — shape it, sync the motion to your track, and export the cover. Every cover is reproducible: engine + seed + a few parameters.',
    href: '/demo/akacovart',
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
    title: 'Trickle UI Kit',
    type: 'Open source · Write-up',
    description:
      '47 pure-CSS text-animation primitives for React. Zero runtime, SSR-safe, copy-paste install via the shadcn registry.',
    href: '/demo/trickle-ui-kit',
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
      'Reference architecture for auditable AI content review: typed signals, YAML policy, hash-chained audit log, reviewer dashboard, eval harness.',
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
        <header className="mb-6">
          <h1 className="text-xl font-light tracking-wide text-muted-foreground">projects</h1>
          <p className="mt-1 text-[13px] font-light leading-snug text-muted-foreground/70">
            Prototypes, tools, side-quests, and write-ups.
          </p>
        </header>

        <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 list-none p-0">
          {projects.map((project) => {
            const isExternal = /^https?:\/\//.test(project.href)
            const body = (
              <>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[14px] font-light leading-snug tracking-[-0.01em] text-foreground">
                    {project.title}
                  </h3>
                  <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/35 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                </div>
                {project.type && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {project.type.split('·').map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-border/60 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-[oklch(0.4_0.08_152.2)] dark:text-[oklch(0.62_0.09_152)]"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
                <p className="mt-2 line-clamp-4 text-[12px] font-light leading-snug text-muted-foreground/75">
                  {project.description}
                </p>
              </>
            )
            return (
              <li key={project.href}>
                <SpotlightCard href={project.href} external={isExternal}>
                  {body}
                </SpotlightCard>
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
  )
}
