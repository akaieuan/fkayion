import type { ReactNode } from 'react'

/**
 * One sheet of the portfolio.
 *
 * The frame is the same on every page: a running head with the author and the
 * year on the left, the section and the page number on the right, and a body
 * region the page fills however it likes. The number is a CSS counter, so a
 * page inserted anywhere renumbers everything after it without a hand touching
 * the contents page.
 *
 * The cover and the contents page use the frame too. A cover with no running
 * head would be the one page in the document built differently from the rest,
 * and the head is quiet enough to sit on it.
 */
export function Sheet({
  section,
  children,
  bare = false,
}: {
  /** The section this sheet belongs to, printed in the running head. */
  section: string
  children: ReactNode
  /** The cover: the frame without the running head. */
  bare?: boolean
}) {
  return (
    <div className="pf-slot">
      <section className="pf-page" aria-label={section}>
        {!bare && (
          <header className="pf-head">
            <p className="aka-kicker">Ieuan King · Portfolio 2026</p>
            <p className="aka-kicker">
              {section}
              <span className="text-muted-foreground/50"> · </span>
              <span className="pf-number font-mono" />
            </p>
          </header>
        )}
        <div className="pf-body">{children}</div>
      </section>
    </div>
  )
}

/**
 * The opening of a section: a kicker, a title on the display size, and a lead.
 * Every project section starts this way so the document has one rhythm.
 */
export function SheetTitle({
  kicker,
  title,
  lead,
  mark,
}: {
  kicker: string
  title: ReactNode
  lead?: ReactNode
  /** A mark drawn beside the title, the way the write-up header carries one. */
  mark?: ReactNode
}) {
  return (
    <div className="flex items-start gap-6">
      {mark && <div className="shrink-0">{mark}</div>}
      <div>
        <p className="aka-kicker">{kicker}</p>
        <h1 className="mt-2 text-display font-extralight leading-none tracking-tight text-foreground/90">
          {title}
        </h1>
        {lead && (
          <p className="mt-4 max-w-3xl text-15 font-light leading-relaxed text-muted-foreground">
            {lead}
          </p>
        )}
      </div>
    </div>
  )
}
