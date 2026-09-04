import Link from 'next/link'
import { tile } from '@/components/features/aka-style/writeup/shared'

/** The deeper rooms. Secondary now: the page shows the system before it links out. */
const ROOMS = [
  { href: '/aka-style', name: 'The full specimen', line: 'Every piece next to what it governs.' },
  { href: '/aka-style/foundations', name: 'Foundations', line: 'Every number, with the reasoning attached.' },
  { href: '/aka-style/primitives', name: 'Primitives', line: 'Controls and surfaces, class strings printed.' },
  { href: '/aka-style/marks', name: 'Marks', line: 'The engine, and the whole family it draws.' },
  { href: '/aka-style/faces', name: 'Faces', line: 'Twenty-six expressions on a 9×9 sub-grid.' },
]

/** Deeper: the links into the rest of the specimen. */
export function Deeper() {
  return (
        <section className="mt-16">
          <p className="aka-kicker">Deeper</p>
          <h2 className="mt-2 aka-section-title">The rest of the specimen</h2>
          <p className="mt-3 text-[15px] font-light leading-relaxed text-muted-foreground">
            Everything above is the system itself, on this page, rather than a description of it.
            These go further into each part: every number with its reasoning, every primitive with
            its class string, and the engine with the whole family it draws.
          </p>

          <ul className="mt-6 grid list-none gap-3 p-0 md:grid-cols-2">
            {ROOMS.map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  className={tile}
                >
                  <span className="text-[14px] font-light text-foreground/90 group-hover:text-foreground">
                    {r.name}
                  </span>
                  <span className="mt-1 block text-[12.5px] font-light leading-relaxed text-muted-foreground">
                    {r.line}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
  )
}
