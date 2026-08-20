import { Fragment } from 'react'

/**
 * The body of an essay, set from blocks rather than markup.
 *
 * The pieces here were written elsewhere: a Word file, a PDF, a note app. What
 * survives that trip is the text and its shape, so that is all a block carries.
 * Deciding what a paragraph or a pull quote looks like stays in one place, and
 * no essay can quietly bring its own styling with it.
 *
 * Two things can happen inside a sentence, because two things happen inside
 * these sentences: a bolded run and a link. Both are parsed into real elements,
 * so nothing is ever handed to dangerouslySetInnerHTML.
 *
 * Entirely server-rendered. There is nothing to operate on an essay.
 */

export type Block =
  | { k: 'p'; text: string }
  | { k: 'h'; text: string }
  | { k: 'quote'; text: string; cite?: string }

/** `**bold**` and `[label](url)`, and nothing else. */
const INLINE = /\*\*(.+?)\*\*|\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g

function inline(text: string, keyed: string) {
  const out: React.ReactNode[] = []
  let last = 0
  let match: RegExpExecArray | null
  INLINE.lastIndex = 0

  while ((match = INLINE.exec(text)) !== null) {
    if (match.index > last) out.push(text.slice(last, match.index))
    const key = `${keyed}-${match.index}`
    if (match[1] !== undefined) {
      out.push(
        <strong key={key} className="font-medium text-foreground">
          {match[1]}
        </strong>
      )
    } else {
      out.push(
        <a
          key={key}
          href={match[3]}
          target="_blank"
          rel="noopener noreferrer"
          className="aka-ink-link"
        >
          {match[2]}
        </a>
      )
    }
    last = match.index + match[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

const paragraph = 'aka-ink-body text-[15px] font-light leading-[1.85]'

export function Prose({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, i) => {
        const key = `${block.k}-${i}`

        if (block.k === 'h') {
          return (
            <h2
              key={key}
              className="mt-8 text-[15px] font-normal tracking-tight text-foreground first:mt-0"
            >
              {inline(block.text, key)}
            </h2>
          )
        }

        if (block.k === 'quote') {
          return (
            <figure key={key} className="my-2 border-l border-border pl-5">
              <blockquote className="flex flex-col gap-4">
                {block.text.split('\n\n').map((part, p) => (
                  <p key={p} className="aka-ink-quiet text-[14px] font-light leading-[1.8]">
                    {inline(part, `${key}-${p}`)}
                  </p>
                ))}
              </blockquote>
              {block.cite && (
                <figcaption className="mt-3 text-[12px] font-light text-muted-foreground/60">
                  {block.cite}
                </figcaption>
              )}
            </figure>
          )
        }

        return (
          <p key={key} className={paragraph}>
            <Fragment>{inline(block.text, key)}</Fragment>
          </p>
        )
      })}
    </div>
  )
}
