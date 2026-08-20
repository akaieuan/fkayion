import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ProjectMark, marksBleed, type ProjectItem } from '@/components/ui/project-mark'

/**
 * The dense card, used by the /demo index and the link rows: the mark stamped
 * top-left, then title, description and tags stacked to its right.
 *
 * The landing uses the larger plate instead (see project-plate.tsx). Both draw
 * their mark through the same component, so a project that gains a logo gains
 * it in both places at once.
 *
 * Server-rendered; the hover is pure CSS, so no client JS either.
 */

export type ProjectCardItem = ProjectItem

export function ProjectCard({ item }: { item: ProjectCardItem }) {
  const isExternal = /^https?:\/\//.test(item.href)
  const accent = item.accent ?? 'var(--foreground)'

  const body = (
    <>
      <span
        className={`aka-stamp${marksBleed(item) ? ' aka-stamp-bleed' : ''}${item.onDark ? ' aka-mark-ground' : ''}`}
        style={marksBleed(item) ? undefined : { ['--stamp-tint' as string]: accent }}
      >
        <ProjectMark item={item} size={26} sizes="80px" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="flex items-start justify-between gap-3">
          <span className="text-[14px] font-light leading-snug tracking-[-0.01em] text-foreground">
            {item.title}
          </span>
          <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/35 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
        </span>
        <span className="mt-1 line-clamp-3 text-[12px] font-light leading-snug text-muted-foreground/75">
          {item.description}
        </span>
        {item.tags && item.tags.length > 0 && (
          <span className="mt-auto flex flex-wrap gap-1 pt-3">
            {item.tags.map((tag) => (
              <Badge key={tag} variant="tag">
                {tag}
              </Badge>
            ))}
          </span>
        )}
      </span>
    </>
  )

  const cls = 'aka-card group flex-row'
  return isExternal ? (
    <Card asChild className={cls}>
      <a href={item.href} target="_blank" rel="noopener noreferrer">
        {body}
      </a>
    </Card>
  ) : (
    <Card asChild className={cls}>
      <Link href={item.href}>{body}</Link>
    </Card>
  )
}
