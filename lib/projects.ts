import type { ProjectCardItem } from '@/components/ui/project-mark'

// Card media - static imports for build-time blur placeholders.
import inertialDashboard from '@/public/inertial-dashboard.png'
import visualizerPoster from '@/public/visualizer-eden-preview-poster.jpg'
import brooklynDead from '@/public/brooklyn-dead.webp'

// Bitmap logos the projects ship - drawn as app-icon tiles on the card plate.
import ubikLogo from '@/components/ui/logos/ubik.webp'
import boxPopuliLogo from '@/components/ui/logos/box-populi.webp'

/**
 * Every project the site shows, in one place.
 *
 * The /demo index renders all of them; the landing grid picks its flagships
 * from the same list. Keeping the descriptions, tags and accents here means a
 * project is written once and cannot drift between the pages that show it.
 */
/**
 * Plate tints.
 *
 * A named set rather than a hex per project, so "no two the same" is something
 * you can see in the file instead of something you have to compare by eye.
 *
 * No green. At ten percent over a light ground a green turns sage, and the six
 * projects that had one read as six variations of the same murky tint rather
 * than six different projects. The set runs warm to cool around the rest of the
 * wheel and skips the whole green sector.
 *
 * Every plate takes one. An untinted plate is not neutral so much as darker:
 * the tints are all lighter than the ground, so leaving one off drops that
 * plate half a step below the rest of the row.
 */
const TINT = {
  amber: '#d9a441',
  terracotta: '#d3805a',
  rose: '#d96a72',
  magenta: '#c86fae',
  orchid: '#a97ae0',
  indigo: '#7b83ea',
  blue: '#5d98f4',
  steel: '#8fa8c6',
} as const

export const PROJECTS: ProjectCardItem[] = [
  {
    title: 'Ubik Studio',
    tags: ['Product', 'Desktop', 'Agents', '2023–2026'],
    description:
      'Three and a half years co-founding a desktop-native AI research platform. Agents gather, read, and draft; humans keep the final say, with evidence behind every claim.',
    href: '/demo/ubik',
    logoImg: ubikLogo,
    accent: TINT.amber,
  },
  {
    title: 'akaOSS',
    tags: ['Studio', 'Open source', 'HITL AI', 'Research'],
    description:
      'The open-source studio for human-in-the-loop AI. Five projects (HITL Kit, EVAL Kit, tag-kit, Collapse, Hologram), the Assist-Not-Complete thesis, and a reproducible research feed.',
    href: '/demo/akaoss',
    logo: 'akaoss-mark',
    accent: TINT.magenta,
  },
  {
    title: 'BodyLog',
    tags: ['Product', 'iOS', 'SwiftUI', 'Circleheads'],
    description:
      'An iOS app for tracking any visible body or skin condition between doctor visits: acne, psoriasis, eczema, bruising, PT progress. Photos stay on device, and the app never diagnoses.',
    href: '/demo/bodylog',
    logo: 'bodylog',
    accent: TINT.blue,
  },
  {
    title: 'Box Populi',
    tags: ['Client project', 'Live site', 'Next.js', 'Audio'],
    description:
      'On-brand site for a NYC live-techno collective. Custom audio players over the SoundCloud Widget, multiple live streams coordinated so they never overlap, and an iOS quirk handled honestly.',
    href: '/demo/box-populi',
    logoImg: boxPopuliLogo,
    onDark: true,
    accent: TINT.steel,
  },
  {
    title: 'Trickle UI Kit',
    tags: ['Open source', 'React', 'Pure CSS', 'Write-up'],
    description:
      '47 pure-CSS text-animation primitives for React. Zero runtime, SSR-safe, copy-paste install via the shadcn registry.',
    href: '/demo/trickle-ui-kit',
    // Not the logo. The kit is text animation, so the plate runs four of its
    // own primitives instead of showing a picture of a mark.
    logo: 'trickle-live',
    fill: true,
    accent: TINT.terracotta,
  },
  {
    title: 'akaCOVART',
    tags: ['Open source', 'Generative', 'Album art', 'Canvas'],
    description:
      'A generative album-art engine. Shape it, sync the motion to your track, and export the cover. Every cover is reproducible from an engine, a seed, and a few parameters.',
    href: '/demo/akacovart',
    logo: 'akacovart',
    bleed: true,
    accent: TINT.orchid,
  },
  {
    title: 'akaVST',
    tags: ['Instruments', 'VST3 / AU', 'JUCE', 'macOS'],
    description:
      'Three JUCE instruments, built one at a time and documented as they go: an acid voice with a 64-step sequencer (v0.4.0), four lo-fi layers on one voice pool (v1.0.0), and a sampler that resamples itself (v0.1.0).',
    href: '/demo/akavsts',
    // akavst-mark is drawn in currentColor, so it takes the page's ink and
    // needs no ground of its own. The pixel variant it replaced was baked in
    // near-white and only ever worked on a dark one.
    logo: 'akavst-mark',
    accent: TINT.rose,
  },
  {
    title: 'Blockpad',
    tags: ['Open source', 'macOS', 'Swift', 'Agents'],
    description:
      'A macOS sketchpad that opens over your editor on a hotkey. Draw where the boxes go, press copy, paste: the agent gets an exact scene tree rather than a paragraph or a screenshot, at about a seventeenth of the tokens.',
    href: '/demo/blockpad',
    // Drawn from the app's own vector master, so it stays sharp from the 26px
    // stamp to the full plate. See components/ui/blockpad-mark.tsx.
    logo: 'blockpad',
    // Steel, because the mark's own main column is slate. Its neighbours in the
    // grid are rose, indigo, terracotta and orchid, so it collides with none.
    accent: TINT.steel,
  },
  {
    title: 'HITL Kit',
    tags: ['Open source', 'Design system', 'npm', 'Write-up'],
    description:
      'Design system, nineteen HITL primitives, six @hitl-kit/* npm packages, shadcn registry, and personal research paper.',
    href: '/demo/hitl-kit',
    logo: 'hitl-kit',
    accent: TINT.indigo,
  },
  {
    title: 'EVAL Kit',
    tags: ['Open source', 'Evals', 'CLI', 'Write-up'],
    description:
      'Agent eval framework where humans score, not LLMs. LLM-as-judge is only an opt-in pre-fill, flagged on every score. YAML suites, local dashboard, CLI, and five dimensions LLM judges miss.',
    href: '/demo/eval-kit',
    logo: 'eval-kit',
    accent: TINT.amber,
  },
  {
    title: 'Null Browser',
    tags: ['Open source', 'Tauri', 'Privacy', 'Write-up'],
    description:
      'Privacy-first Tauri browser: zero telemetry, local-first AI, six invariants, every connection visible. Pre-v0.1.',
    href: '/demo/null-browser',
    logo: 'zero',
    accent: TINT.orchid,
  },
  {
    title: 'How I Work',
    tags: ['Narrative', 'Method', 'HITL', 'Demos'],
    description:
      'The method behind the site: watch the work first, prototype in code, measure what matters. Plus how the Kit, Research OS, and the public test log connect.',
    href: '/demo/hitl-practice',
    mark: 'gear',
    accent: TINT.steel,
  },
  {
    title: 'User feedback + design log',
    tags: ['HITL-AI', 'Test log', 'Kraa', 'External'],
    description: 'HITL-AI team test log on Kraa.',
    href: 'https://kraa.io/team-test-log042',
    mark: 'bubble',
    accent: TINT.terracotta,
  },
  {
    title: 'Circleheads',
    tags: ['Studio', 'Applied AI', 'Agents', 'Brooklyn'],
    description:
      'The two-person Brooklyn applied-AI studio I co-run. Agents in production, a short senior consulting bench, and original games. Taking a few projects a year.',
    href: '/demo/circleheads',
    logo: 'circleheads',
    accent: TINT.magenta,
  },
  {
    title: 'Hologram',
    tags: ['Open source', 'Dev tool', 'Blender', 'MCP'],
    description:
      'Live observability and a read-only MCP surface for Blender to glTF pipelines. Watch your AI agent work on your game assets in real time.',
    href: '/demo/hologram',
    logo: 'hologram',
    accent: TINT.blue,
  },
  {
    title: 'Collapse',
    tags: ['Open source', 'Dev tool', 'Claude Code', 'Write-up'],
    description:
      'Skills and MCP tools from your lessons. Three pluggable ingestors (MDX, Jupyter/MyST, and a one-file pattern for anything else) feed a typed pipeline with local atomic writes to ~/.claude/skills/. v0.2.',
    href: '/demo/collapse',
    logo: 'collapse',
    accent: TINT.rose,
  },
  {
    title: 'Inertial - Content Moderation Tool',
    tags: ['Open source', 'Moderation', 'Audit log', 'Write-up'],
    description:
      'Reference architecture for auditable AI content review: typed signals, YAML policy, hash-chained audit log, reviewer dashboard, eval harness.',
    href: '/demo/inertial',
    img: inertialDashboard,
    accent: TINT.steel,
  },
  {
    title: 'Research OS',
    tags: ['Interactive demo', 'Agents', 'HITL', 'Workspace'],
    description:
      'Multi-panel workspace with agentic search, chat, and human-in-the-loop approval flows.',
    href: '/demo/research-os',
    logo: 'research-os',
    accent: TINT.indigo,
  },
  {
    title: 'Music Analysis Chat',
    tags: ['Interactive demo', 'Analytics', 'Chat', 'Roster'],
    description:
      'Music analytics assistant with roster dashboards, creator discovery, and rich chat blocks.',
    href: '/demo/music-analysis-chat',
    logo: 'music-chat',
    accent: TINT.magenta,
  },
  {
    title: 'Visualizer Eden',
    tags: ['Audio tool', 'WebGL', 'GLSL', 'Three.js'],
    description:
      'Browser-based 3D audio visualizer with reactive mesh deformation, custom GLSL shaders, and material presets.',
    href: '/demo/visualizer-eden',
    img: visualizerPoster,
    accent: TINT.orchid,
  },
  {
    title: 'Procedural Asset Pipeline Engineering',
    tags: ['Blender', 'Godot', 'Pipeline', 'Write-up'],
    description:
      'Private WIP: procedural Blender→glTF→Godot pipeline, programmatic animation, browser previews.',
    href: '/demo/brooklyn-dead',
    img: brooklynDead,
    accent: TINT.terracotta,
  },
  {
    title: 'Wordle remake: Wrdef (Wordle + definition)',
    tags: ['Game', 'Next.js', 'Dictionary', 'Write-up'],
    description:
      'A five-letter guessing game powered by definitions, bonus rounds, and a locally saved dictionary.',
    href: '/demo/wrdef',
    wordmark: 'Wrdef',
    accent: TINT.amber,
  },

]
