import { ProjectGrid } from '@/components/ui/project-grid'
import type { ProjectCardItem } from '@/components/ui/project-card'

// Static imports → Next reads dimensions at build time and inlines a blur
// placeholder, so marks paint instantly instead of holding blank.
import boxPopuliLogo from '@/components/ui/logos/box-populi.webp'
import ubikLogo from '@/components/ui/logos/ubik.webp'

/**
 * The six current flagships, as plates.
 *
 * Only the first tag is shown on the landing, but all four stay here because
 * this is the same shape /demo uses and a project should read the same in both
 * places. The descriptions likewise: the plate does not print one, and the card
 * on /demo does.
 */
const FEATURED: ProjectCardItem[] = [
  {
    title: 'Ubik Studio',
    href: '/demo/ubik',
    logoImg: ubikLogo,
    accent: '#d9a441',
    description: 'Three and a half years co-founding a desktop-native AI research platform.',
    tags: ['Product', 'Desktop', 'Agents', '2023–2026'],
  },
  {
    title: 'akaOSS',
    href: '/demo/akaoss',
    logo: 'akaoss-mark',
    accent: '#69b57f',
    description: 'Open-source studio for human-in-the-loop AI. Five projects, one thesis, a live research feed.',
    tags: ['Studio', 'Open source', 'HITL AI', 'Research'],
  },
  {
    title: 'BodyLog',
    href: '/demo/bodylog',
    logo: 'bodylog',
    accent: '#5d98f4',
    description: 'Track a skin or body condition between doctor visits. On device, never diagnosed.',
    tags: ['Product', 'iOS', 'SwiftUI', 'Circleheads'],
  },
  {
    title: 'akaCOVART',
    href: '/demo/akacovart',
    logo: 'akacovart',
    bleed: true,
    accent: '#4fc0a6',
    description: 'A generative album-art engine. Shape it, sync motion to your track, export the cover.',
    tags: ['Open source', 'Generative', 'Album art', 'Canvas'],
  },
  {
    title: 'akaVST',
    href: '/demo/akavsts',
    // akavst-mark is drawn in currentColor, so it takes the page's ink and
    // needs no ground of its own. The pixel variant it replaced was baked in
    // near-white and only ever worked on a dark one.
    logo: 'akavst-mark',
    accent: '#9b7cf0',
    description: 'Three JUCE instruments for macOS: acid voice, lo-fi layers, sculpting sampler.',
    tags: ['Instruments', 'VST3 / AU', 'JUCE', 'macOS'],
  },
  {
    title: 'Box Populi',
    href: '/demo/box-populi',
    logoImg: boxPopuliLogo,
    onDark: true,
    accent: '#cf6fb0',
    description: 'On-brand site for a NYC live-techno collective.',
    tags: ['Client project', 'Live site', 'Next.js', 'Audio'],
  },
]

export function FeaturedGrid() {
  return <ProjectGrid items={FEATURED} />
}
