import Link from 'next/link'
import { ProjectCover } from '@/components/ui/project-cover'
import type { ProjectItem } from '@/components/ui/project-mark'
import { captionFor } from '@/lib/plain-summaries'

/** The deck's covers: the semantic half of /demo's CoverFlow, rendered on the server. */
export function DeckCovers({ items }: { items: ProjectItem[] }) {
  return (
            /*
             * The semantic layer, and it does not change with the view: an
             * ordered list of eighteen links in source order. Whatever the
             * transforms do to them, a crawler and a screen reader get the same
             * list they would get from the grid.
             */
            <ol className="contents list-none p-0">
              {items.map((item, i) => {
                const external = /^https?:\/\//.test(item.href)
                const inner = (
                  <>
                    <ProjectCover item={item} priority={i === 0} />
                    <span className="sr-only">
                      {item.title}. {captionFor(item.href, item.description)}
                    </span>
                  </>
                )
                return (
                  <li
                    key={item.href}
                    data-flow-card={i}
                    className="aka-flow-card"
                    style={{ ['--i' as string]: i }}
                  >
                    {external ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer">
                        {inner}
                      </a>
                    ) : (
                      <Link href={item.href}>{inner}</Link>
                    )}
                  </li>
                )
              })}
            </ol>
  )
}
