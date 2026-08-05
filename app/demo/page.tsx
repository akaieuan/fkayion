import { ProjectCard, type ProjectCardItem } from '@/components/ui/project-card'

// Card media — static imports for build-time blur placeholders.
import covartSplash from '@/public/covart-splash.webp'
import boxPopuliHero from '@/public/box-populi-hero.webp'
import inertialDashboard from '@/public/inertial-dashboard.png'
import nullBrowserPoster from '@/public/null-browser-hero-poster.jpg'
import wrdefPoster from '@/public/wrdef-hero-poster.jpg'
import visualizerPoster from '@/public/visualizer-eden-preview-poster.jpg'
import researchOs from '@/public/research-os.webp'
import musicChat from '@/public/music-analysis-chat.webp'
import brooklynDead from '@/public/brooklyn-dead.webp'
import iconHowIWork from '@/public/icon-howiwork.webp'
import iconFeedback from '@/public/icon-feedback.webp'
import ubikWorkspace from '@/public/ubik-workspace.webp'

const projects: ProjectCardItem[] = [
  {
    title: 'Circleheads',
    tags: ['Studio', 'Applied AI'],
    description:
      'The two-person Brooklyn applied-AI studio I co-run — agents in production, a short senior consulting bench, and original games. Taking a few projects a year.',
    href: '/demo/circleheads',
    mark: 'head',
  },
  {
    title: 'akaOSS',
    tags: ['Studio', 'Open source'],
    description:
      'The open-source studio for human-in-the-loop AI — five projects (HITL Kit, EVAL Kit, tag-kit, Collapse, Hologram), the Assist-Not-Complete thesis, and a reproducible research feed.',
    href: '/demo/akaoss',
    mark: 'spark',
  },
  {
    title: 'BodyLog',
    tags: ['Product', 'iOS', 'Circleheads'],
    description:
      'An iOS app for tracking any visible body or skin condition between doctor visits — acne, psoriasis, eczema, bruising, PT progress. Photos stay on device; the app never diagnoses.',
    href: '/demo/bodylog',
    mark: 'bodylog',
  },
  {
    title: 'Ubik Studio',
    tags: ['Product', '2023–2026'],
    description:
      'Three and a half years co-founding a desktop-native AI research platform — agents that gather, read, and draft, with humans keeping the final say and evidence behind every claim.',
    href: '/demo/ubik',
    img: ubikWorkspace,
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
    mark: 'watch',
  },
  {
    title: 'akaVST',
    tags: ['Instruments', 'VST3 / AU', 'macOS'],
    description:
      'Three JUCE instruments built one at a time and documented as they go — an acid voice with a 64-step sequencer (v0.4.0), four lo-fi layers on one voice pool (v1.0.0), and a sampler that resamples itself (v0.1.0).',
    href: '/demo/akavsts',
    mark: 'knob',
  },
  {
    title: 'Collapse',
    tags: ['Open source', 'Dev tool', 'Write-up'],
    description:
      'Skills and MCP tools from your lessons. Three pluggable ingestors (MDX, Jupyter/MyST, and a one-file pattern for anything else) feed a typed pipeline with local atomic writes to ~/.claude/skills/. v0.2.',
    href: '/demo/collapse',
    mark: 'collapse',
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
      'Design system, nineteen HITL primitives, six @hitl-kit/* npm packages, shadcn registry, and personal research paper.',
    href: '/demo/hitl-kit',
    mark: 'gate',
  },
  {
    title: 'EVAL Kit',
    tags: ['Open source', 'Write-up'],
    description:
      'Agent eval framework: humans score, not LLMs — LLM-as-judge is only an opt-in pre-fill, flagged on every score. YAML suites, local dashboard, CLI, five dimensions LLM judges miss.',
    href: '/demo/eval-kit',
    mark: 'score',
  },
  {
    title: 'Trickle UI Kit',
    tags: ['Open source', 'Write-up'],
    description:
      '47 pure-CSS text-animation primitives for React. Zero runtime, SSR-safe, copy-paste install via the shadcn registry.',
    href: '/demo/trickle-ui-kit',
    mark: 'strata',
  },
  {
    title: 'How I Work',
    tags: ['Narrative', 'Demos'],
    description:
      'The method behind the site: watch the work first, prototype in code, measure what matters — and how the Kit, Research OS, and the public test log connect.',
    href: '/demo/hitl-practice',
    img: iconHowIWork,
  },
  {
    title: 'User feedback + design log',
    tags: ['HITL-AI', 'External'],
    description: 'HITL-AI team test log on Kraa.',
    href: 'https://kraa.io/team-test-log042',
    img: iconFeedback,
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
    img: brooklynDead,
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
    img: researchOs,
  },
  {
    title: 'Music Analysis Chat',
    tags: ['Interactive demo'],
    description:
      'Music analytics assistant with roster dashboards, creator discovery, and rich chat blocks.',
    href: '/demo/music-analysis-chat',
    img: musicChat,
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

      </div>
    </div>
  )
}
