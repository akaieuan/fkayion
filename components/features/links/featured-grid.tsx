import { ProjectCard, type ProjectCardItem } from '@/components/ui/project-card'

// Static imports → Next reads dimensions at build time and inlines a blur
// placeholder, so cards paint instantly instead of holding blank.
import circleheadsMark from '@/public/circleheads.webp'
import akaossMark from '@/public/akaoss.webp'
import covartSplash from '@/public/covart-splash.webp'
import akableepSynth from '@/public/akableep-synth.webp'
import collapseHome from '@/public/collapse-home.webp'
import boxPopuliHero from '@/public/box-populi-hero.webp'

/** The six current flagships — a static grid, no carousel mechanics. */
const FEATURED: ProjectCardItem[] = [
  {
    title: 'Circleheads',
    href: '/demo/circleheads',
    img: circleheadsMark,
    description: 'Applied-AI software studio — agents in production, a short consulting bench, and games.',
    tags: ['Studio', 'Applied AI'],
  },
  {
    title: 'akaOSS',
    href: '/demo/akaoss',
    img: akaossMark,
    description: 'Open-source studio for human-in-the-loop AI — five projects, one thesis, a live research feed.',
    tags: ['Open source', 'HITL AI'],
  },
  {
    title: 'akaCOVART',
    href: '/demo/akacovart',
    img: covartSplash,
    description: 'A generative album-art engine — shape it, sync motion to your track, export the cover.',
    tags: ['Generative', 'Album art'],
  },
  {
    title: 'akaVSTs',
    href: '/demo/akavsts',
    img: akableepSynth,
    description: 'Three Ableton-ready instrument plugins, built to be played live.',
    tags: ['VST3 / AU', 'Live'],
  },
  {
    title: 'Collapse',
    href: '/demo/collapse',
    img: collapseHome,
    description: 'Pattern → SKILL.md compiler — cross-stack skills that move with you.',
    tags: ['Dev tool', 'Claude Code'],
  },
  {
    title: 'Box Populi',
    href: '/demo/box-populi',
    img: boxPopuliHero,
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
