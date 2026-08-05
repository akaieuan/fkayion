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
    accent: '#c2c2bc',
    description: 'Applied-AI software studio. Agents in production, a short consulting bench, and games.',
    tags: ['Studio', 'Applied AI'],
    motion: 'scatter',
  },
  {
    title: 'akaOSS',
    href: '/demo/akaoss',
    logo: 'akaoss-mark',
    accent: '#69b57f',
    description: 'Open-source studio for human-in-the-loop AI. Five projects, one thesis, a live research feed.',
    tags: ['Open source', 'HITL AI'],
    motion: 'drift',
    grain: 46,
  },
  {
    title: 'BodyLog',
    href: '/demo/bodylog',
    logo: 'bodylog',
    accent: '#5d98f4',
    description: 'Track a skin or body condition between doctor visits. On device, never diagnosed.',
    tags: ['iOS', 'Circleheads'],
    motion: 'drift',
  },
  {
    title: 'akaCOVART',
    href: '/demo/akacovart',
    logoImg: covartLogo,
    accent: '#4fc0a6',
    description: 'A generative album-art engine. Shape it, sync motion to your track, export the cover.',
    tags: ['Generative', 'Album art'],
    motion: 'jitter',
    grain: 46,
  },
  {
    title: 'akaVST',
    href: '/demo/akavsts',
    logo: 'akavst-pixel',
    accent: '#9b7cf0',
    description: 'Three JUCE instruments for macOS: acid voice, lo-fi layers, sculpting sampler.',
    tags: ['VST3 / AU', 'Live'],
    motion: 'sweep',
  },
  {
    title: 'Box Populi',
    href: '/demo/box-populi',
    logoImg: boxPopuliLogo,
    accent: '#cf6fb0',
    description: 'On-brand site for a NYC live-techno collective.',
    tags: ['Client', 'Live site'],
    motion: 'jitter',
  },
]

export function FeaturedGrid() {
  return (
    <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-in fade-in duration-200">
      {FEATURED.map((item) => (
        <ProjectCard key={item.href} item={item} />
      ))}
    </div>
  )
}
