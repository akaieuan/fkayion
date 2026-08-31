import { ProjectGrid } from '@/components/ui/project-grid'
import { PROJECTS } from '@/lib/projects'

/**
 * The six flagships on the landing, chosen from the same list /demo shows.
 *
 * This used to be a second copy of six projects: titles, hrefs, logos, accents,
 * descriptions and tags all written out again, with the landing's descriptions
 * already drifted shorter than /demo's. Nothing here needs its own data. A
 * project is defined once in lib/projects.ts and the landing picks six of them,
 * so a plate cannot say one thing on one page and another on the next.
 *
 * A title that no longer matches throws at build rather than quietly leaving a
 * gap in the grid.
 */
const FEATURED = [
  'Ubik Studio',
  'akaOSS',
  'BodyLog',
  'akaCOVART',
  'Trickle UI Kit',
  'Blockpad',
]

const featured = FEATURED.map((title) => {
  const project = PROJECTS.find((p) => p.title === title)
  if (!project) throw new Error(`Featured project not found in PROJECTS: ${title}`)
  return project
})

export function FeaturedGrid() {
  return <ProjectGrid items={featured} />
}
