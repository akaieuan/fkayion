import { PixelHead } from '@/components/features/brand/pixel-head'
import { WRITING, writingHref } from '@/lib/writing'
import { CONTACT } from '@/components/features/portfolio/cover'

/*
 * The last sheet: the writing on the left, the way back on the right.
 *
 * The five pieces rebuilt on this site are the entries that carry a slug; the
 * index also lists three that live elsewhere, and the document points at the
 * ones it can stand behind as pages. Right: the mark, the sentence the site
 * closes on, and the three lines the cover opened with.
 *
 * Budget, of 844: the list is a kicker and five rows of about 96 (a text-15
 * title, the type, a one-line description, the rule): about 540. The right
 * column spreads its three blocks to the sheet's height.
 */
const REBUILT = WRITING.filter((e) => e.slug !== undefined)

/** The destination, as an address: this site's paths under its own name. */
function address(href: string) {
  return href.startsWith('/') ? `akabuild.dev${href}` : href.replace(/^https?:\/\//, '')
}

export function Closing() {
  return (
    <div className="grid h-full grid-cols-[1fr_440px] gap-x-20">
      <div>
        <p className="aka-kicker">Writing</p>
        <ul className="mt-4 list-none p-0">
          {REBUILT.map((e) => (
            <li key={e.title} className="border-b border-border/40 py-4">
              <div className="flex items-baseline justify-between gap-6">
                <p className="text-15 font-light text-foreground/90">{e.title}</p>
                <p className="shrink-0 font-mono text-10 text-muted-foreground/60">
                  {address(writingHref(e))}
                </p>
              </div>
              <p className="mt-1 aka-kicker">{e.type}</p>
              <p className="mt-1.5 text-12 font-light leading-relaxed text-muted-foreground">
                {e.description}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex h-full flex-col justify-between">
        <PixelHead size={140} grid={24} icon="disc-aka" still />

        <div className="aka-card-well px-6 py-5">
          <p className="text-14 font-light leading-relaxed text-foreground/85">
            Everything on this site is the same habit at different sizes: go and find the problem,
            build something you can actually operate, and keep the person using it in charge of what
            happens next.
          </p>
        </div>

        <div>
          <p className="aka-kicker">Reach me</p>
          <ul className="mt-3 list-none space-y-1.5 p-0">
            {CONTACT.map((c) => (
              <li key={c} className="font-mono text-15 text-foreground/85">
                {c}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-13 font-light text-muted-foreground">
            The full index is at akabuild.dev/demo.
          </p>
        </div>
      </div>
    </div>
  )
}
