import type { ReactNode } from 'react'
import { KickerTags } from '@/components/ui/tag-row'

/**
 * The title block every write-up under /demo opens with.
 *
 * Before this existed each page built its own: four title sizes, three
 * orders, five pages still on the uppercase kicker the chips replaced, and
 * four pages carrying two titles. Read one after another they looked like
 * different sites. Now the block is one definition and a page supplies only
 * its facts.
 *
 * The order is fixed and the classes are the Ubik page's, which is the page
 * this site is most judged by: chips, title, one paragraph, the media in the
 * house well, its caption, a row of actions, a byline. Every slot renders on
 * its own, so a page with no hero still gets its actions under the paragraph
 * and a page with no actions still gets its byline under the media.
 *
 * `description` and `byline` are paragraphs: phrasing content only. A row of
 * chips or links belongs in `kicker` or `actions`, never inside a `<p>`.
 *
 * `mark` is a product's own icon beside the chips and title. It arrives
 * framed or bare as the product draws it; this adds the row and nothing else.
 *
 * `unframedHero` is for media that is the page's own artifact rather than a
 * picture of one (the live orb, images that carry their own frames). It keeps
 * the phone-width bleed and drops the well.
 *
 * Server component, no state. `PlainSummary` and the JSON-LD stay in the page.
 */
export function WriteUpHeader({
  kicker,
  title,
  name,
  description,
  mark,
  hero,
  unframedHero = false,
  caption,
  actions,
  byline,
}: {
  /** Middle-dot separated facts, rendered as chips. */
  kicker: string
  title: ReactNode
  /** The h1's accessible name when the visible title is stylised. */
  name?: string
  description: ReactNode
  mark?: ReactNode
  hero?: ReactNode
  unframedHero?: boolean
  caption?: ReactNode
  actions?: ReactNode
  byline?: ReactNode
}) {
  const heading = (
    <div>
      <KickerTags>{kicker}</KickerTags>
      <h1
        className="mt-2 text-display font-extralight leading-none tracking-tight text-balance text-foreground/90"
        aria-label={name}
      >
        {title}
      </h1>
    </div>
  )

  return (
    <header>
      {mark ? (
        <div className="flex items-center gap-4">
          {mark}
          {heading}
        </div>
      ) : (
        heading
      )}

      <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground">
        {description}
      </p>

      {hero &&
        (unframedHero ? (
          <div className="-mx-6 mt-6 sm:mx-0">{hero}</div>
        ) : (
          <figure className="-mx-6 mt-6 aka-card-well aka-card-media overflow-hidden sm:mx-0">
            {hero}
          </figure>
        ))}

      {caption && (
        <p className="mt-2 text-11 font-light text-muted-foreground/60">{caption}</p>
      )}

      {actions && (
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          {actions}
        </div>
      )}

      {byline && (
        <p className="mt-2 text-12 font-light text-muted-foreground/80">{byline}</p>
      )}
    </header>
  )
}
