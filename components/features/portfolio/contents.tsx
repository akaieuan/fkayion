import { CONTACT } from '@/components/features/portfolio/cover'

export type ContentsEntry = {
  section: string
  /** The first page of the section, as the running heads count it. */
  page: number
  /** One line under the section name, so the list reads as an argument rather than an index. */
  line: string
}

/**
 * The contents page. The page numbers arrive from the route, which knows the
 * order of the sheets, so this page can only ever agree with the running heads.
 */
export function Contents({ entries }: { entries: ContentsEntry[] }) {
  return (
    <div className="grid h-full grid-cols-[1fr_420px] gap-x-24">
      <div>
        <p className="aka-kicker">Contents</p>
        <ol className="mt-6 list-none p-0">
          {entries.map((e, i) => (
            <li
              key={e.section}
              className="grid grid-cols-[56px_1fr_72px] items-baseline gap-4 border-b border-border/40 py-4"
            >
              <span className="font-mono text-12 text-muted-foreground/60">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>
                <span className="text-17 font-light text-foreground/90">{e.section}</span>
                <span className="mt-1 block text-13 font-light text-muted-foreground">{e.line}</span>
              </span>
              <span className="text-right font-mono text-13 text-muted-foreground">
                {String(e.page).padStart(2, '0')}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-col justify-end">
        <div className="aka-card-well px-6 py-5">
          <p className="text-14 font-light leading-relaxed text-foreground/85">
            Everything on this site is the same habit at different sizes: go and find the problem,
            build something you can actually operate, and keep the person using it in charge of
            what happens next.
          </p>
          <p className="aka-card-rule mt-4 border-t pt-3.5 text-12 font-light leading-relaxed text-muted-foreground">
            Every page of this document is rendered by the same components, tokens and data as
            akabuild.dev, and printed from it. The write-ups it condenses are at the site, in full.
          </p>
        </div>
        <p className="mt-6 flex gap-8 font-mono text-12 text-muted-foreground/70">
          {CONTACT.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </p>
      </div>
    </div>
  )
}
