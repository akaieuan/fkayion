import { ProjectCard, type ProjectCardItem } from '@/components/ui/project-card'

// Static imports → Next reads dimensions at build time and inlines a blur
// placeholder, so cards paint instantly instead of holding blank.
import covartLogo from '@/components/ui/logos/akacovart.png'
import boxPopuliLogo from '@/components/ui/logos/box-populi.webp'

/** The six current flagships — a static grid, no carousel mechanics. */
const FEATURED: ProjectCardItem[] = [
  {
    title: 'Circleheads',
    href: '/demo/circleheads',
    logo: 'circleheads',
    accent: '#7fb896',
    motion: 'rise',
    description: 'Applied-AI software studio — agents in production, a short consulting bench, and games.',
    tags: ['Studio', 'Applied AI'],
  },
  {
    title: 'akaOSS',
    href: '/demo/akaoss',
    logo: 'akaoss-mark',
    accent: '#69b57f',
    motion: 'bloom',
    description: 'Open-source studio for human-in-the-loop AI — five projects, one thesis, a live research feed.',
    tags: ['Open source', 'HITL AI'],
  },
  {
    title: 'BodyLog',
    href: '/demo/bodylog',
    logo: 'bodylog',
    accent: '#5d98f4',
    motion: 'fill',
    description: 'Track a skin or body condition between doctor visits — on device, never diagnosed.',
    tags: ['iOS', 'Circleheads'],
  },
  {
    title: 'akaCOVART',
    href: '/demo/akacovart',
    logoImg: covartLogo,
    accent: '#7b9084',
    motion: 'bloom',
    description: 'A generative album-art engine — shape it, sync motion to your track, export the cover.',
    tags: ['Generative', 'Album art'],
  },
  {
    title: 'akaVST',
    href: '/demo/akavsts',
    logo: 'akavst-pixel',
    accent: '#9b7cf0',
    motion: 'pulse',
    description: 'Three JUCE instruments for macOS — acid voice, lo-fi layers, sculpting sampler.',
    tags: ['VST3 / AU', 'Live'],
  },
  {
    title: 'Collapse',
    href: '/demo/collapse',
    logo: 'collapse',
    accent: '#c9a227',
    motion: 'slide',
    description: 'Pattern → SKILL.md compiler — cross-stack skills that move with you.',
    tags: ['Dev tool', 'Claude Code'],
  },
  {
    title: 'Box Populi',
    href: '/demo/box-populi',
    logoImg: boxPopuliLogo,
    accent: '#b9b9b4',
    motion: 'slide',
    description: 'On-brand site for a NYC live-techno collective.',
    tags: ['Client', 'Live site'],
  },
]

export function FeaturedGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-in fade-in duration-200">
      {FEATURED.map((item) => (
        <ProjectCard key={item.href} item={item} />
      ))}
    </div>
  )
}
