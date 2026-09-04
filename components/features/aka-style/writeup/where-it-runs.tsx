import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { USAGE } from '@/lib/aka-style'
import { kicker, sectionH, tile } from '@/components/features/aka-style/writeup/shared'

/** Where it runs: the repos carrying the same tokens, internal and out. */
export function WhereItRuns() {
  return (
        <section className="mt-16">
          <p className={kicker}>Where it runs</p>
          <h2 className={sectionH}>Same tokens, different repos</h2>

          <ul className="mt-6 grid list-none gap-3 p-0 md:grid-cols-2">
            {USAGE.map((u) => {
              const inner = (
                <>
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="text-[14px] font-light text-foreground/90 group-hover:text-foreground">
                      {u.name}
                    </span>
                    {!u.internal && (
                      <ArrowUpRight
                        className="h-3.5 w-3.5 shrink-0 opacity-40 transition-opacity group-hover:opacity-80"
                        aria-hidden
                      />
                    )}
                  </span>
                  <span className="mt-1 block text-[12.5px] font-light leading-relaxed text-muted-foreground">
                    {u.what}
                  </span>
                </>
              )
              const cls = tile
              return (
                <li key={u.name}>
                  {u.internal ? (
                    <Link href={u.href} className={cls}>
                      {inner}
                    </Link>
                  ) : (
                    <a href={u.href} target="_blank" rel="noopener noreferrer" className={cls}>
                      {inner}
                    </a>
                  )}
                </li>
              )
            })}
          </ul>
        </section>
  )
}
