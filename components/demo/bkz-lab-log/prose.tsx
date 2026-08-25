/**
 * A lab entry, rendered.
 *
 * One place decides what a paragraph, a figure, a before/after pair and a table
 * look like, so an entry file is only ever content. The measure and the type
 * ramp are the demo pages' own, not the artefact's: a finding from the pipeline
 * should read like the rest of the site, not like a page that wandered in.
 *
 * The block set grew past prose because the entries are not all essays. A
 * session log is a ledger of passes, a roster is four cards of dials, and both
 * of those want a shape the paragraph renderer cannot fake. Each new kind is
 * here rather than in the entry that needed it, so the second entry to want a
 * ledger gets the same one.
 *
 * Entirely server-rendered. Nothing on a lab entry is interactive.
 */
import Image from 'next/image'
import { FIGURES } from './figures'
import type { Block, Cell, Img, LedgerEntry, RosterCard, RosterTone, Status } from './entries'

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

/*
 * These renders arrive already compressed: they were JPEGs before they were
 * WebP, and next/image re-encodes a third time at its default quality of 75.
 * Three lossy passes on a 420px render of a low-poly head is exactly where the
 * mush comes from, so the optimiser is told to stay out of the way.
 */
const Q = 92

const caption = 'mt-3 text-[12px] font-light leading-relaxed text-muted-foreground/70'
const frame = 'overflow-hidden rounded-xl border border-border/80 bg-muted/10'
const plate = 'block h-auto w-full rounded-lg border border-border/80'
const label = 'font-mono text-[10px] uppercase tracking-[0.16em]'

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
  w = 420,
  h = 420,
  labels = ['before', 'after'],
}: {
  before: string
  after: string
  alt: string
  caption: string
  w?: number
  h?: number
  labels?: [string, string]
}) {
  return (
    <figure className="bkz-log !mt-8">
      <div className="grid gap-3 sm:grid-cols-2">
        <Shot
          img={{ src: before, w, h, alt: `${alt}, before the fix` }}
          label={labels[0]}
          tone="before"
        />
        <Shot img={{ src: after, w, h, alt: `${alt}, after the fix` }} label={labels[1]} tone="after" />
      </div>
      <Caption text={text} id={before} />
    </figure>
  )
}

/** Half-measure render with its verdict under it. Stacks on a narrow screen. */
function Shot({ img, label: text, tone }: { img: Img; label: string; tone: 'before' | 'after' }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Image
        src={img.src}
        alt={img.alt}
        width={img.w}
        height={img.h}
        sizes="(min-width: 640px) 340px, 90vw"
        quality={Q}
        className={plate}
      />
      <span
        className={`rounded py-1 text-center ${label} ${
          tone === 'before' ? 'bkz-lbl-before' : 'bkz-lbl-after'
        }`}
      >
        {text}
      </span>
    </div>
  )
}

/** One render at full measure, with its own line under it when it has one. */
function Plate({ img, priority, half }: { img: Img; priority?: boolean; half?: boolean }) {
  const el = (
    <Image
      src={img.src}
      alt={img.alt}
      width={img.w}
      height={img.h}
      sizes={half ? '(min-width: 640px) 340px, 92vw' : '(min-width: 768px) 672px, 92vw'}
      quality={Q}
      priority={priority}
      className={plate}
    />
  )
  if (!img.note) return el
  return (
    <div className="flex flex-col gap-1.5">
      {el}
      <span className={`${label} text-center text-muted-foreground/70`}>{img.note}</span>
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

/**
 * What moved this round. The old value is struck through rather than dropped,
 * because the size of the change is the finding.
 */
function Deltas({
  items,
  note,
}: {
  items: { k: string; v: string; was?: string; hold?: boolean }[]
  note?: string
}) {
  return (
    <div className="!mt-6">
      <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border/80 bg-border sm:grid-cols-2 lg:grid-cols-3">
        {items.map((d) => (
          <div key={d.k} className="bg-background px-4 py-3.5">
            <dt className="font-mono text-[9.5px] uppercase tracking-[0.13em] text-muted-foreground/60">
              {d.k}
            </dt>
            <dd
              className={`mt-1.5 font-mono text-[14px] font-medium tabular-nums ${
                d.hold ? 'text-foreground' : 'bkz-good'
              }`}
            >
              {d.v}
            </dd>
            {d.was && (
              <dd className="mt-0.5 font-mono text-[11px] text-muted-foreground line-through decoration-muted-foreground/50">
                {d.was}
              </dd>
            )}
          </div>
        ))}
      </dl>
      {note && (
        <p className="mt-3 font-mono text-[11px] leading-relaxed text-muted-foreground/70">{note}</p>
      )}
    </div>
  )
}

/** Chips are the only place a status is a colour. */
const STATUS_TONE: Record<Status, string> = {
  landed: 'bkz-chip-ok',
  'landed red': 'bkz-chip-op',
  falsified: 'bkz-chip-no',
  corrected: 'bkz-chip-op',
  refused: 'bkz-chip-op',
}

function Ledger({ entries, id }: { entries: LedgerEntry[]; id: string }) {
  return (
    <div className="!mt-6 border-t border-border">
      {entries.map((e) => (
        <article key={e.n} className="border-b border-border/50 py-6 sm:grid sm:grid-cols-[92px_1fr] sm:gap-6">
          <div className="flex items-center gap-2.5 sm:flex-col sm:items-start sm:gap-2">
            <span className="font-mono text-[11px] tabular-nums tracking-[0.1em] text-muted-foreground/60">
              {e.n}
            </span>
            <span
              className={`rounded px-1.5 py-0.5 font-mono text-[9.5px] font-medium uppercase tracking-[0.13em] ${
                STATUS_TONE[e.status]
              }`}
            >
              {e.status}
            </span>
          </div>

          <div className="mt-3 sm:mt-0">
            <h3 className="text-[15px] font-medium leading-snug text-foreground">{e.title}</h3>
            {e.paras.map((text, i) => (
              <p key={i} className="mt-2 text-[15px] leading-relaxed">
                {inline(text, `${id}-${e.n}-${i}`)}
              </p>
            ))}
            <p className="mt-3 border-l-2 border-border pl-3.5 font-mono text-[12px] leading-relaxed text-muted-foreground">
              {inline(e.meas, `${id}-${e.n}-meas`)}
            </p>

            {e.fig?.kind === 'pair' && (
              <figure className="mt-5">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Shot img={e.fig.before} label={e.fig.labels[0]} tone="before" />
                  <Shot img={e.fig.after} label={e.fig.labels[1]} tone="after" />
                </div>
                <Caption text={e.fig.caption} id={`${id}-${e.n}-fig`} />
              </figure>
            )}
            {e.fig?.kind === 'shot' && (
              <figure className="mt-5">
                <Plate img={e.fig.img} />
                <Caption text={e.fig.caption} id={`${id}-${e.n}-fig`} />
              </figure>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}

const BAR_TONE: Record<RosterTone, string> = {
  body: 'bkz-bar-body',
  grow: 'bkz-bar-grow',
  hair: 'bkz-bar-hair',
}

/**
 * One card per mob. The head comes from a single four-up sheet shifted into
 * place rather than four files, which is how the sheet was shot.
 */
function Roster({
  sheet,
  cards,
  keys,
}: {
  sheet: string
  cards: RosterCard[]
  keys: { label: string; tone: RosterTone }[]
}) {
  return (
    <div className="!mt-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {cards.map((c) => (
          <div
            key={c.name}
            className="flex flex-col overflow-hidden rounded-xl border border-border/80 bg-muted/10"
          >
            <div
              role="img"
              aria-label={`${c.name}, three-quarter view of the head`}
              className="aspect-square border-b border-border/80"
              style={{
                backgroundImage: `url(${sheet})`,
                backgroundSize: '400% auto',
                backgroundPositionX: `${(c.tile / 3) * 100}%`,
                backgroundPositionY: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
            <div className="flex items-baseline justify-between gap-2 px-4 pt-3.5">
              <span className="text-[16px] font-medium text-foreground">{c.name}</span>
              <span className="font-mono text-[9.5px] uppercase tracking-[0.13em] text-muted-foreground/60">
                {c.role}
              </span>
            </div>

            <dl className="flex flex-col gap-1.5 px-4 pb-1 pt-3 font-mono text-[11.5px] tabular-nums">
              {c.dials.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-2">
                  <dt className="text-muted-foreground/60">{k}</dt>
                  <dd className="text-right font-medium text-foreground">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-auto px-4 pb-4 pt-3">
              <p className="mb-1.5 flex flex-wrap justify-between gap-x-3 font-mono text-[9.5px] uppercase tracking-[0.12em] text-muted-foreground/60">
                <span className="text-foreground/80">{c.tris}</span>
                <span>{c.share}</span>
              </p>
              <div className="flex h-1.5 overflow-hidden rounded-full bg-muted">
                <i className="bkz-bar-body block h-full" style={{ width: `${c.bars.body}%` }} />
                <i className="bkz-bar-grow block h-full" style={{ width: `${c.bars.grow}%` }} />
                <i className="bkz-bar-hair block h-full" style={{ width: `${c.bars.hair}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-[11px] text-muted-foreground">
        {keys.map((k) => (
          <span key={k.label} className="inline-flex items-center gap-1.5">
            <i className={`${BAR_TONE[k.tone]} block h-2 w-2 rounded-[2px]`} />
            {k.label}
          </span>
        ))}
        <span className="text-muted-foreground/60">
          bar is share of the 40,000-triangle category budget
        </span>
      </p>
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
            <p
              key={key}
              className="!my-8 border-l-2 border-[var(--bkz-wrong)] py-0.5 pl-5 text-[17px] italic leading-relaxed text-foreground/85"
            >
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
              w={block.w}
              h={block.h}
              labels={block.labels}
            />
          )
        }

        if (block.k === 'shot') {
          return (
            <figure key={key} className="!mt-8">
              <Plate img={block.img} priority={i === 0} />
              <Caption text={block.caption} id={key} />
            </figure>
          )
        }

        if (block.k === 'plates') {
          const [first, ...rest] = block.items
          return (
            <figure key={key} className="!mt-8">
              {block.label && (
                <p
                  className={`mb-2.5 flex items-center gap-2.5 ${label} text-muted-foreground/60 after:h-px after:flex-1 after:bg-border after:content-['']`}
                >
                  {block.label}
                </p>
              )}
              {block.layout === 'stack' ? (
                <div className="flex flex-col gap-4">
                  {block.items.map((img) => (
                    <Plate key={img.src} img={img} />
                  ))}
                </div>
              ) : block.items.length === 3 ? (
                <div className="flex flex-col gap-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Plate img={first} half />
                    <Plate img={rest[0]} half />
                  </div>
                  <Plate img={rest[1]} />
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {block.items.map((img) => (
                    <Plate key={img.src} img={img} half />
                  ))}
                </div>
              )}
              <Caption text={block.caption} id={key} />
            </figure>
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
                      quality={Q}
                      className={plate}
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

        if (block.k === 'deltas') {
          return <Deltas key={key} items={block.items} note={block.note} />
        }

        if (block.k === 'ledger') {
          return <Ledger key={key} entries={block.entries} id={key} />
        }

        if (block.k === 'open') {
          return (
            <div
              key={key}
              className="!mt-4 rounded-lg border border-border/80 border-l-[3px] border-l-[var(--bkz-open)] bg-muted/10 px-5 py-4"
            >
              <h3 className="bkz-open-ink text-[14px] font-medium">{block.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed">{inline(block.text, key)}</p>
            </div>
          )
        }

        if (block.k === 'roster') {
          return <Roster key={key} sheet={block.sheet} cards={block.cards} keys={block.key} />
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
