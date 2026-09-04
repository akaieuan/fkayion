import Link from 'next/link'
import { ProjectGrid } from '@/components/ui/project-grid'
import { childProjects } from '@/lib/projects'

type Project = {
  name: string
  href: string
  external?: boolean
  blurb: string
  status: string
}

/** Which track a toolkit belongs to, keyed by its title in the project list. */
const MEASUREMENT = new Set(['HITL Kit', 'EVAL Kit'])

/** tag-kit has no write-up on this site, so it stays a row that links out. */
const tagKit: Project = {
  name: 'tag-kit',
  href: 'https://www.akaoss.dev/projects/tag-kit',
  external: true,
  blurb:
    'Structured tagging primitives for annotation workflows. Most tagging in HITL tools is unstructured strings you can never aggregate or score across; tag-kit gives them per-modality scoping, scope-aware agreement scoring, and headless React. Zero runtime deps.',
  status: 'stable',
}

function ProjectRow({ p }: { p: Project }) {
  const inner = (
    <>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[14px] text-foreground/90 group-hover:text-foreground">{p.name}</span>
        <span className="shrink-0 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground/60">
          {p.status}
        </span>
      </div>
      <p className="mt-1 text-[13px] font-light leading-relaxed text-muted-foreground">{p.blurb}</p>
    </>
  )
  const cls =
    'group block aka-card aka-card-lift px-4 py-3.5'
  return p.external ? (
    <a href={p.href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={p.href} className={cls}>
      {inner}
    </Link>
  )
}

/** The projects section. Moved verbatim from app/demo/akaoss/page.tsx. */
export function ProjectsSection() {
  return (
          <section className="space-y-4">
            <h2 className="aka-lead">The projects</h2>
            <p>
              Five projects across two tracks. Each lives in its own repo; four of them have a
              write-up here.
            </p>

            <div>
              <p className="mb-3 aka-kicker">
                Human-in-the-loop measurement
              </p>
              <ProjectGrid
                items={childProjects('akaOSS').filter((p) => MEASUREMENT.has(p.title))}
                flush
                columns={2}
              />
            </div>

            <div className="pt-2">
              <p className="mb-3 aka-kicker">
                Developer tooling
              </p>
              <ProjectGrid
                items={childProjects('akaOSS').filter((p) => !MEASUREMENT.has(p.title))}
                flush
                columns={2}
              />
            </div>

            <div className="pt-2">
              <p className="mb-2 aka-kicker">
                Also in the registry
              </p>
              <ProjectRow p={tagKit} />
            </div>
          </section>
  )
}
