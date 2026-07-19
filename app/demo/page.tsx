import { ArrowUpRight } from 'lucide-react'
import { ProjectCard, type ProjectCardItem } from '@/components/ui/project-card'

// Card media — static imports for build-time blur placeholders.
import circleheadsMark from '@/public/circleheads.webp'
import akaossMark from '@/public/akaoss.webp'
import covartSplash from '@/public/covart-splash.webp'
import akableepSynth from '@/public/akableep-synth.webp'
import collapseHome from '@/public/collapse-home.webp'
import boxPopuliHero from '@/public/box-populi-hero.webp'
import hitlKitHero from '@/public/hitl-kit-hero.png'
import inertialDashboard from '@/public/inertial-dashboard.png'
import nullBrowserPoster from '@/public/null-browser-hero-poster.jpg'
import wrdefPoster from '@/public/wrdef-hero-poster.jpg'
import visualizerPoster from '@/public/visualizer-eden-preview-poster.jpg'

const profileLinks = [
  { label: 'GitHub', href: 'https://github.com/akaieuan' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ieuan-king/' },
  { label: 'Reddit', href: 'https://www.reddit.com/user/akaieuan/' },
  { label: 'akawrite', href: 'https://kraa.io/akaieuan' },
] as const

const projects: ProjectCardItem[] = [
  {
    title: 'Circleheads',
    tags: ['Studio', 'Applied AI'],
    description:
      'The two-person Brooklyn applied-AI studio I co-run — agents in production, a short senior consulting bench, and original games. Taking a few projects a year.',
    href: '/demo/circleheads',
    img: circleheadsMark,
  },
  {
    title: 'akaOSS',
    tags: ['Studio', 'Open source'],
    description:
      'The open-source studio for human-in-the-loop AI — five projects (HITL Kit, EVAL Kit, tag-kit, Collapse, Hologram), the Assist-Not-Complete thesis, and a reproducible research feed.',
    href: '/demo/akaoss',
    img: akaossMark,
  },
  {
    title: 'Ubik Studio',
    tags: ['Product'],
    description:
      'Co-founded and led product design at Ubik Studio, a desktop-native AI research platform for human-in-the-loop workflows.',
    href: 'https://www.reddit.com/user/akaieuan/',
  },
  {
    title: 'Box Populi',
    tags: ['Client project', 'Live site'],
    description:
      'On-brand site for a NYC live-techno collective. Custom audio players over the SoundCloud Widget, multiple live streams coordinated so they never overlap, an iOS quirk handled honestly.',
    href: '/demo/box-populi',
    img: boxPopuliHero,
  },
  {
    title: 'Hologram',
    tags: ['Open source', 'Dev tool', 'Write-up'],
    description:
      'Live observability and a read-only MCP surface for Blender → glTF pipelines — watch your AI agent work on your game assets in real time.',
    href: '/demo/hologram',
  },
  {
    title: 'akaVSTs',
    tags: ['Instruments', 'VST3 / AU', 'Live'],
    description:
      'Three Ableton-ready instrument plugins I play live and use in my own music — an acid synth + P-lock sequencer, a 4-layer lo-fi synth, and a sculpting sampler. JUCE 8 · C++17 · VST3 / AU / Standalone.',
    href: '/demo/akavsts',
    img: akableepSynth,
  },
  {
    title: 'Collapse',
    tags: ['Open source', 'Dev tool', 'Write-up'],
    description:
      'Pattern → SKILL.md compiler for Claude Code. Three pluggable ingestors (MDX, Jupyter, custom) feed a typed pipeline with local atomic writes to ~/.claude/skills/. Next.js 16 + TypeScript.',
    href: '/demo/collapse',
    img: collapseHome,
  },
  {
    title: 'akaCOVART',
    tags: ['Open source', 'Generative studio'],
    description:
      'A generative album-art engine — shape it, sync the motion to your track, and export the cover. Every cover is reproducible: engine + seed + a few parameters.',
    href: '/demo/akacovart',
    img: covartSplash,
  },
  {
    title: 'HITL Kit',
    tags: ['Open source', 'Write-up'],
    description:
      'Design system, eleven HITL primitives, shadcn registry, and personal research paper.',
    href: '/demo/hitl-kit',
    img: hitlKitHero,
  },
  {
    title: 'EVAL Kit',
    tags: ['Open source', 'Write-up'],
    description:
      'Agent eval framework: human scoring, YAML suites, local dashboard, CLI; five dimensions LLM judges miss.',
    href: '/demo/eval-kit',
  },
  {
    title: 'Trickle UI Kit',
    tags: ['Open source', 'Write-up'],
    description:
      '47 pure-CSS text-animation primitives for React. Zero runtime, SSR-safe, copy-paste install via the shadcn registry.',
    href: '/demo/trickle-ui-kit',
  },
  {
    title: 'How I Work',
    tags: ['Narrative', 'Demos'],
    description:
      'Product design, validation, and how the Kit, Research OS, and team test log connect.',
    href: '/demo/hitl-practice',
  },
  {
    title: 'User feedback + design log',
    tags: ['HITL-AI', 'External'],
    description: 'HITL-AI team test log on Kraa.',
    href: 'https://kraa.io/team-test-log042',
  },
  {
    title: 'Inertial - Content Moderation Tool',
    tags: ['Open source', 'Write-up'],
    description:
      'Reference architecture for auditable AI content review: typed signals, YAML policy, hash-chained audit log, reviewer dashboard, eval harness.',
    href: '/demo/inertial',
    img: inertialDashboard,
  },
  {
    title: 'Null Browser',
    tags: ['Open source', 'Write-up'],
    description:
      'Privacy-first Tauri browser: zero telemetry, local-first AI, six invariants, every connection visible. Pre-v0.1.',
    href: '/demo/null-browser',
    img: nullBrowserPoster,
  },
  {
    title: 'Procedural Asset Pipeline Engineering',
    tags: ['Write-up'],
    description:
      'Private WIP: procedural Blender→glTF→Godot pipeline, programmatic animation, browser previews.',
    href: '/demo/brooklyn-dead',
  },
  {
    title: 'Wordle remake: Wrdef (Wordle + definition)',
    tags: ['Write-up'],
    description:
      'A five-letter guessing game powered by definitions, bonus rounds, and a locally saved dictionary.',
    href: '/demo/wrdef',
    img: wrdefPoster,
  },
  {
    title: 'Research OS',
    tags: ['Interactive demo'],
    description:
      'Multi-panel workspace with agentic search, chat, and human-in-the-loop approval flows.',
    href: '/demo/research-os',
  },
  {
    title: 'Music Analysis Chat',
    tags: ['Interactive demo'],
    description:
      'Music analytics assistant with roster dashboards, creator discovery, and rich chat blocks.',
    href: '/demo/music-analysis-chat',
  },
  {
    title: 'Visualizer Eden',
    tags: ['Audio tool'],
    description:
      'Browser-based 3D audio visualizer with reactive mesh deformation, custom GLSL shaders, and material presets.',
    href: '/demo/visualizer-eden',
    img: visualizerPoster,
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
          <h1 className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70">Projects</h1>
          <p className="mt-1 text-[13px] font-light leading-snug text-muted-foreground/70">
            Prototypes, tools, side-quests, and write-ups.
          </p>
        </header>

        <ul className="mt-5 grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-3 list-none p-0">
          {projects.map((project) => (
            <li key={project.href}>
              <ProjectCard
                item={{ ...project, tags: project.tags ?? [] }}
              />
            </li>
          ))}
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
