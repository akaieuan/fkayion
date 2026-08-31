import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { WRITING, writingHref } from '@/lib/writing'
import { UBIK_ARCHIVE_TYPE, UBIK_ELSEWHERE } from '@/components/features/demo/ubik/shared'

const item = 'block rounded-md px-3 py-2 text-[13px] transition-colors hover:bg-muted/40'
const group =
  'px-3 pb-1 pt-2 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground/50'

/**
 * What is inside the archive menu: three rebuilt write-ups, and the two places
 * Ubik still exists in public.
 *
 * A server component, passed to `ArchiveMenu` as children. The menu owns
 * whether it is open; this owns what is in it, and neither has to know the
 * other's business. Nothing here reaches the client bundle.
 */
export function ArchiveMenuItems() {
  const writeUps = WRITING.filter((entry) => entry.slug && entry.type === UBIK_ARCHIVE_TYPE)

  return (
    <>
      <p className={group}>Rebuilt here</p>
      <ul className="list-none p-0">
        {writeUps.map((entry) => (
          <li key={entry.title}>
            <Link href={writingHref(entry)} className={`${item} text-foreground/85`}>
              {entry.title}
            </Link>
          </li>
        ))}
      </ul>

      <p className={`${group} aka-card-rule mt-1 border-t pt-2.5`}>Still in the open</p>
      <ul className="list-none p-0">
        {UBIK_ELSEWHERE.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${item} flex items-center justify-between gap-3 text-muted-foreground`}
            >
              {link.label}
              <ArrowUpRight className="h-3.5 w-3.5 opacity-60" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </>
  )
}
