import Link from 'next/link'
import { WordCascade } from '@/components/trickle/word-cascade'
import { CharStagger } from '@/components/trickle/char-stagger'
import { TextReveal } from '@/components/trickle/text-reveal'
import { InkBleed } from '@/components/trickle/ink-bleed'
import { Shutter } from '@/components/trickle/shutter'
import { LANDING_WRITING, writingHref, type WritingEntry } from '@/lib/writing'
import { HoverBlurb } from './hover-blurb'

/**
 * The writing list: a title and what kind of thing it is, with the sentence
 * about it arriving when you point at one.
 *
 * Printing every description under every title made the list a wall of small
 * grey type, which is the opposite of what a list of five things should look
 * like. The sentence is still the useful part, so it comes to the cursor
 * instead of sitting on the page waiting.
 *
 * A server component. The rows are plain markup carrying a row number, and the
 * five blurbs are rendered here and handed to the island as nodes, so trickle
 * itself never enters the client bundle.
 *
 * Each row gets a different reveal, cycled by position rather than stored on
 * the essay: what a piece is about has nothing to do with how its sentence
 * arrives, and a new essay should not have to pick an animation. Position also
 * makes it stable, so the same row always reveals the same way.
 */

/*
 * Five reveals from the kit, one per row.
 *
 * Timings are pulled in from the kit's defaults, which are tuned for a heading.
 * A blurb is a dozen words of twelve-point text arriving under a moving cursor,
 * so the per-step delays are shorter here. WordCascade and TextReveal split on
 * whitespace and keep the gaps as entries, which makes every visible word two
 * steps along; the numbers below account for that.
 */
const REVEALS: ((text: string) => React.ReactNode)[] = [
  (text) => <WordCascade text={text} stagger={16} />,
  (text) => <CharStagger text={text} mode="slide" stagger={7} />,
  (text) => <TextReveal mode="blur" split="word" stagger={18}>{text}</TextReveal>,
  (text) => <InkBleed>{text}</InkBleed>,
  (text) => <Shutter>{text}</Shutter>,
]

export function WritingList({ items = LANDING_WRITING }: { items?: WritingEntry[] }) {
  const blurbs = items.map((row, i) => REVEALS[i % REVEALS.length](row.description))

  return (
    <HoverBlurb blurbs={blurbs}>
      <ul className="list-none p-0">
        {items.map((row, i) => {
          const href = writingHref(row)
          const external = /^https?:\/\//.test(href)
          const body = (
            <>
              <span className="flex flex-wrap items-baseline gap-x-3">
                <span className="text-14 font-light tracking-tight text-foreground/85 underline decoration-transparent underline-offset-[5px] transition-colors duration-200 group-hover:text-foreground group-hover:decoration-foreground/30">
                  {row.title}
                </span>
                <span className="text-11 font-light text-muted-foreground/40">{row.type}</span>
              </span>
              {/* The same sentence, for the screens that get no panel.
                  Server-rendered; the panel is the conditional half. */}
              <span className="mt-0.5 block text-13 font-light leading-relaxed text-muted-foreground/55 md:hidden">
                {row.description}
              </span>
            </>
          )

          const cls = 'group block py-2.5'
          return (
            <li key={href}>
              {external ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-blurb={i}
                  className={cls}
                >
                  {body}
                </a>
              ) : (
                <Link href={href} data-blurb={i} className={cls}>
                  {body}
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </HoverBlurb>
  )
}
