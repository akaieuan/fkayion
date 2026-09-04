import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { WordCascade } from '@/components/trickle/word-cascade'
import { CharStagger } from '@/components/trickle/char-stagger'
import { TextReveal } from '@/components/trickle/text-reveal'
import { WRITING, writingHref } from '@/lib/writing'
import { UBIK_ARCHIVE_TYPE, UBIK_ELSEWHERE } from '@/components/features/demo/ubik/shared'

const item = 'block rounded-md px-3 py-2 text-13 transition-colors hover:bg-muted/40'
const group =
  'px-3 pb-1 pt-2 text-10 font-medium uppercase tracking-[0.14em] text-muted-foreground/50'

/*
 * Three reveals from the kit, one per write-up, cycled by position rather than
 * stored on the essay: what a piece is about has nothing to do with how its
 * sentence arrives, and a fourth archive post should not have to pick an
 * animation. The landing list uses the same three at the same settings, so the
 * two places a description appears agree about how it appears.
 *
 * All three are server components: this file stays off the client bundle.
 */
const REVEALS: ((text: string) => React.ReactNode)[] = [
  (text) => <WordCascade text={text} stagger={16} />,
  (text) => <CharStagger text={text} mode="slide" stagger={7} />,
  (text) => <TextReveal mode="blur" split="word" stagger={18}>{text}</TextReveal>,
]

/**
 * What is inside the archive menu: three rebuilt write-ups, and the two places
 * Ubik still exists in public.
 *
 * A server component, passed to `ArchiveMenu` as children. The menu owns
 * whether it is open; this owns what is in it, and neither has to know the
 * other's business. Nothing here reaches the client bundle.
 *
 * Each write-up carries its own sentence. A title alone says which archive post
 * this is only to somebody who already read it, and the menu is for the people
 * who have not.
 */
export function ArchiveMenuItems() {
  const writeUps = WRITING.filter((entry) => entry.slug && entry.type === UBIK_ARCHIVE_TYPE)

  return (
    <>
      <p className={group}>Rebuilt here</p>
      <ul className="list-none p-0">
        {writeUps.map((entry, i) => (
          <li key={entry.title}>
            <Link href={writingHref(entry)} className={item}>
              <span className="block text-foreground/85">{entry.title}</span>
              <span className="mt-0.5 block text-12 font-light leading-relaxed text-muted-foreground">
                {REVEALS[i % REVEALS.length](entry.description)}
              </span>
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
