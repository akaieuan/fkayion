import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { kicker } from '@/components/features/aka-style/shared'
import { USAGE as usage } from '@/lib/aka-style'

/** Where it runs: the repos carrying the system. Moved verbatim from app/aka-style/page.tsx. */
export function UsageSection() {
  return (
        <section id="usage" className="mt-16 scroll-mt-24">
          <p className={kicker}>Where it runs</p>
          <h2 className="mt-2 text-xl font-light tracking-tight text-foreground/90">
            The same language, six places
          </h2>
          <p className="mt-2 max-w-xl text-[13px] font-light leading-relaxed text-muted-foreground">
            The point of writing the rules down is that a new project starts at hour six instead of
            hour zero. Each of these inherited the tokens, the type scale, and at least one engine.
          </p>

          <ul className="mt-6 space-y-2">
            {usage.map((u) => {
              const inner = (
                <>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-[14px] text-foreground/90">{u.name}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/35" aria-hidden />
                  </div>
                  <p className="mt-1 text-[12.5px] font-light leading-relaxed text-muted-foreground">
                    {u.what}
                  </p>
                </>
              )
              const cls =
                'block aka-card aka-card-lift px-4 py-3.5'
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
