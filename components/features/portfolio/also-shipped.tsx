import { PROJECTS } from '@/lib/projects'
import { ProjectPlate } from '@/components/ui/project-plate'
import type { ProjectItem } from '@/components/ui/project-mark'

/** The twelve, in the order the document shows them. */
const ORDER = [
  '/demo/eval-kit',
  '/demo/trickle-ui-kit',
  '/demo/collapse',
  '/demo/hologram',
  '/demo/akavsts',
  '/demo/akacovart',
  '/demo/three-examples',
  '/demo/null-browser',
  '/demo/visualizer-eden',
  '/demo/inertial',
  '/demo/wrdef',
  '/demo/music-analysis-chat',
]

const ITEMS = ORDER.map((href) => PROJECTS.find((p) => p.href === href)).filter(
  (p): p is ProjectItem => p !== undefined,
)

/*
 * Height budget, of 844: the kicker, the line and the mt-6 (72), then two rows
 * of plates. A cell is 226 wide, so the 4:3 plate is 170, its name and
 * category 57, and the description at text-11 in that measure runs to six
 * lines for the longest (107) under an 8px gap: 341 for the tallest cell in
 * the first row, about 330 in the second, where two titles wrap but the
 * descriptions are shorter. Two rows and the 32px gap: about 700, the page
 * about 775.
 */
export function AlsoShipped() {
  return (
    <div className="h-full">
      <p className="aka-kicker">Also shipped</p>
      <p className="mt-2 text-15 font-light leading-relaxed text-muted-foreground">
        Twelve more, each with its own write-up at akabuild.dev/demo.
      </p>

      <ul className="mt-6 grid list-none grid-cols-6 gap-x-5 gap-y-8 p-0">
        {ITEMS.map((p) => (
          <li key={p.href}>
            <ProjectPlate item={p} priority />
            <p className="mt-2 text-11 font-light leading-relaxed text-muted-foreground">{p.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
