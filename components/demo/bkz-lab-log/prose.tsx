/**
 * A lab entry, rendered.
 *
 * One place decides what a paragraph, a figure, a before/after pair and a table
 * look like, so an entry file is only ever content. The measure and the type
 * ramp are the demo pages' own, not the artefact's: a finding from the pipeline
 * should read like the rest of the site, not like a page that wandered in.
 *
 * Entirely server-rendered. Nothing on a lab entry is interactive.
 */
import Image from 'next/image'
import { FIGURES } from './figures'
import type { Block, Cell } from './entries'

/** `**bold**`, `_italic_` and `` `code` ``. Parsed into elements, never HTML. */
const INLINE = /\*\*(.+?)\*\*|_(.+?)_|`(.+?)`/g

const CODE = 'rounded bg-muted/60 px-1 py-0.5 font-mono text-[0.86em]'

export function inline(text: string, keyed: string) {
  const out: React.ReactNode[] = []
  let last = 0
  let m: RegExpExecArray | null
  INLINE.lastIndex = 0

  while ((m = INLINE.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index))
    const key = `${keyed}-${m.index}`
    if (m[1] !== undefined) {
      out.push(
        <strong key={key} className="font-medium text-foreground">
          {m[1]}
        </strong>
      )
    } else if (m[2] !== undefined) {
      out.push(
        <em key={key} className="italic text-foreground/85">
          {m[2]}
        </em>
      )
    } else {
      out.push(
        <code key={key} className={CODE}>
          {m[3]}
        </code>
      )
    }
    last = m.index + m[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

const caption = 'mt-3 text-[12px] font-light leading-relaxed text-muted-foreground/70'
const frame = 'overflow-hidden rounded-xl border border-border/80 bg-muted/10'

function Caption({ text, id }: { text: string; id: string }) {
  return <figcaption className={caption}>{inline(text, id)}</figcaption>
}

/**
 * Two renders of the same asset. Exported because the project page shows one
 * pair as evidence before sending the reader to the entry it came from.
 */
export function RenderPair({
  before,
  after,
  alt,
  caption: text,
}: {
  before: string
  after: string
  alt: string
  caption: string
}) {
  return (
    <figure className="bkz-log !mt-8">
      <div className="grid gap-3 sm:grid-cols-2">
        <Shot src={before} alt={`${alt}, before the fix`} label="before" tone="before" />
        <Shot src={after} alt={`${alt}, after the fix`} label="after" tone="after" />
      </div>
      <Caption text={text} id={before} />
    </figure>
  )
}

/** 420px square renders. Two up on a wide screen, stacked on a narrow one. */
function Shot({ src, alt, label, tone }: { src: string; alt: string; label: string; tone: 'before' | 'after' }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Image
        src={src}
        alt={alt}
        width={420}
        height={420}
        sizes="(min-width: 640px) 320px, 90vw"
        className="block h-auto w-full rounded-lg border border-border/80"
      />
      <span
        className={`rounded py-1 text-center font-mono text-[10px] uppercase tracking-[0.16em] ${
          tone === 'before' ? 'bkz-lbl-before' : 'bkz-lbl-after'
        }`}
      >
        {label}
      </span>
    </div>
  )
}

function Table({ head, rows, id }: { head: string[]; rows: Cell[][]; id: string }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border/80">
      <table className="w-full min-w-[520px] border-collapse text-right font-mono text-[12px] tabular-nums">
        <thead>
          <tr className="border-b border-border/80 bg-muted/20">
            {head.map((h, i) => (
              <th
                key={h}
                className={`px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.11em] text-muted-foreground/60 ${
                  i === 0 ? 'text-left' : ''
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={`${id}-${r}`} className="border-b border-border/40 last:border-b-0">
              {row.map((cell, c) => {
                const value = typeof cell === 'string' ? cell : cell.v
                const tone = typeof cell === 'string' ? undefined : cell.tone
                return (
                  <td
                    key={c}
                    className={`px-4 py-2 ${c === 0 ? 'text-left text-foreground/85' : 'text-muted-foreground'} ${
                      tone === 'bad' ? 'bkz-bad font-medium' : ''
                    } ${tone === 'good' ? 'bkz-good font-medium' : ''}`}
                  >
                    {value}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function LabProse({ blocks }: { blocks: Block[] }) {
  return (
    <div className="bkz-log mt-12 space-y-6 text-[15px] font-light leading-relaxed text-muted-foreground">
      {blocks.map((block, i) => {
        const key = `${block.k}-${i}`

        if (block.k === 'h') {
          return (
            <h2 key={key} className="!mt-12 text-sm font-medium tracking-wide text-foreground">
              {block.text}
            </h2>
          )
        }

        if (block.k === 'pull') {
          return (
            <p key={key} className="!my-8 border-l-2 border-[var(--bkz-wrong)] py-0.5 pl-5 text-[17px] italic leading-relaxed text-foreground/85">
              {inline(block.text, key)}
            </p>
          )
        }

        if (block.k === 'figure') {
          const Art = FIGURES[block.art]
          return (
            <figure key={key} className="!mt-8">
              <div className={`${frame} p-3`}>
                <Art />
              </div>
              <Caption text={block.caption} id={key} />
            </figure>
          )
        }

        if (block.k === 'pair') {
          return (
            <RenderPair
              key={key}
              before={block.before}
              after={block.after}
              alt={block.alt}
              caption={block.caption}
            />
          )
        }

        if (block.k === 'gallery') {
          return (
            <figure key={key} className="!mt-8">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {block.items.map((item) => (
                  <div key={item.name} className="flex flex-col gap-1.5">
                    <Image
                      src={item.src}
                      alt={`${item.name}, showing the bare patch the gate was reporting as covered`}
                      width={420}
                      height={420}
                      sizes="(min-width: 1024px) 130px, (min-width: 640px) 180px, 44vw"
                      className="block h-auto w-full rounded-lg border border-border/80"
                    />
                    <span className="flex justify-between gap-1.5 font-mono text-[10px] text-muted-foreground/70">
                      {item.name}
                      <span className="bkz-bad">{item.note}</span>
                    </span>
                  </div>
                ))}
              </div>
              <Caption text={block.caption} id={key} />
            </figure>
          )
        }

        if (block.k === 'table') {
          return (
            <div key={key} className="!mt-6">
              <Table head={block.head} rows={block.rows} id={key} />
            </div>
          )
        }

        if (block.k === 'colophon') {
          return (
            <div key={key} className="!mt-14 border-t border-border pt-6">
              {block.lines.map((line, l) => (
                <p key={l} className="font-mono text-[11.5px] leading-relaxed text-muted-foreground/60">
                  {line}
                </p>
              ))}
            </div>
          )
        }

        return (
          <p key={key} className="text-[15px] leading-relaxed">
            {inline(block.text, key)}
          </p>
        )
      })}
    </div>
  )
}
