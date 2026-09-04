import { Tag } from 'lucide-react'

/**
 * What kind of thing this is, as chips.
 *
 * This replaced the uppercase run that opened every write-up:
 *
 *   PRODUCT · DESKTOP AI RESEARCH PLATFORM · 2023–2026
 *
 * which is three separate facts set as one sentence, in the one typographic
 * treatment that is hardest to read at length. As chips they are three things
 * again, each one bounded, and the eye takes them in a glance instead of
 * parsing a line of capitals for the middle dots.
 *
 * One component for both places it appears. The deck on /demo and the write-up
 * it links to show the same row in the same style, and a change to how a tag
 * looks is one edit rather than two that drift.
 *
 * Server-rendered, no state, no interactivity: these label, they do not filter.
 */
export function TagRow({
  tags,
  className = '',
}: {
  tags: readonly string[]
  className?: string
}) {
  if (tags.length === 0) return null

  return (
    <p className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      <Tag className="h-3 w-3 shrink-0 text-muted-foreground/40" aria-hidden />
      {tags.map((t) => (
        <span
          key={t}
          className="rounded-md border border-border/60 px-1.5 py-0.5 text-10 font-medium uppercase tracking-[0.12em] text-muted-foreground/70"
        >
          {t}
        </span>
      ))}
    </p>
  )
}

/**
 * The same row, from a write-up's own kicker string.
 *
 * The kickers were already written as middle-dot lists, so the split is the
 * whole conversion and each page keeps the exact facts it chose to lead with.
 * Reading them off `PROJECTS` instead would have been tidier and would have
 * lost the version numbers and licences the write-ups carry and the index
 * does not.
 */
export function KickerTags({ children, className }: { children: string; className?: string }) {
  return (
    <TagRow
      className={className}
      tags={children
        .split('·')
        .map((s) => s.trim())
        .filter(Boolean)}
    />
  )
}
