import { DemoImage } from '@/components/ui/demo-image'
import { label, code } from '@/components/features/demo/blockpad/chrome'

/**
 * Straight from the README's table, measured on the scene shown above it.
 *
 * The tree is quoted in characters rather than tokens on purpose: character
 * heuristics and OpenAI tokenizers both misjudge Claude, and they misjudge it
 * worst on exactly this kind of text.
 */
const payload = [
  { mode: 'Tree only', cost: '617 characters', use: 'Default. Structural changes, layout specs.', lead: true },
  { mode: 'Image only', cost: '2,153 tokens', use: 'When proportion or feel matters.' },
  { mode: 'Tree + image', cost: 'both', use: 'Annotated screenshots, where the tree alone is thin.' },
]

/** Verbatim from the README, which emits it from the sketch below. */
const TREE = `Frame 1440x900  @0,0  "Desktop"
  Box 480x900  @960,0  @right-full-height  stroke #55677A  fill #E5E3DF
    Box 136x40  @24,32  @left-top  "All"  fill #DAE5EF
    Box 136x40  @168,32  @top  "Active"
    Box 136x40  @312,32  @top  "Archived"
    Box 424x64  ×6  @24,112  step 0,88  @left
      Box 24x24  @16,20  @left  stroke #6E8B6A
    Box 200x56  @24,800  @left-bottom  "Reset"  stroke #55677A
    Box 200x56  @248,800  @bottom  "Apply"  stroke #B4534A  fill #F6DAD5
  Text  @40,40  @left-top  "main content unchanged"  stroke #55677A
  Text  @40,76  @left  "panel becomes bottom drawer under 768"  stroke #C08A2E`

/** What actually gets sent. Moved verbatim from app/demo/blockpad/page.tsx. */
export function PayloadSection() {
  return (
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              What actually gets sent
            </h2>
            <p>
              Blocks are typed, so the scene graph serialises to text locally. No inference, no
              model, no API call. This sketch:
            </p>

            <figure className="!mt-5 aka-card-well aka-card-media overflow-hidden">
              <DemoImage
                src="/blockpad/blockpad-payload.webp"
                alt="The sketch: a right-hand filter panel with three tabs, six rows each carrying a small checkbox, and Reset and Apply in the footer"
                width={1600}
                height={1051}
                className="block h-auto w-full"
              />
            </figure>

            <p className="!mt-5">becomes exactly this:</p>
            <pre className="!mt-3 overflow-x-auto aka-card-well p-4 font-mono text-[11.5px] leading-relaxed text-foreground/80">
              {TREE}
            </pre>

            <p className="!mt-5">
              Every block carries an offset from its parent, so the layout reconstructs exactly
              rather than approximately. Colours are hex, not names:{' '}
              <code className={code}>#55677A</code> is a value the receiving agent can paste into
              CSS, where <code className={code}>[slate]</code> would have been a lookup it could not
              perform. Repeats collapse to a count plus the step between them, so{' '}
              <code className={code}>×6</code> stays cheap without discarding where the other five
              are.
            </p>

            <p className="!mt-5">On that exact scene:</p>
            <div className="!mt-3 overflow-hidden rounded-xl border border-border/80">
              <div className="grid grid-cols-[minmax(0,7rem)_minmax(0,7rem)_minmax(0,1fr)] gap-x-4 border-b border-border/80 bg-muted/20 px-4 py-2.5">
                <span className={label}>Mode</span>
                <span className={label}>Cost</span>
                <span className={label}>Use</span>
              </div>
              {payload.map((row) => (
                <div
                  key={row.mode}
                  className="grid grid-cols-[minmax(0,7rem)_minmax(0,7rem)_minmax(0,1fr)] gap-x-4 border-b border-border/60 px-4 py-3 text-[13px] last:border-b-0"
                >
                  <span className={row.lead ? 'font-medium text-foreground' : 'text-foreground/75'}>
                    {row.mode}
                  </span>
                  <span
                    className={`font-mono tabular-nums ${
                      row.lead ? 'font-medium text-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    {row.cost}
                  </span>
                  <span className="text-muted-foreground">{row.use}</span>
                </div>
              ))}
            </div>

            <p className="!mt-5">
              The image figure is arithmetic and exact. Anthropic resizes anything over 1568px on the
              long edge, then charges <code className={code}>(width × height) / 750</code>. The
              sample renders at 3008×1976, which becomes 1568×1030, which is 2,153 tokens.
            </p>
            <p>
              The tree figure is given in characters, deliberately, because{' '}
              <span className="text-foreground/85">
                tokens are the thing you cannot estimate honestly.
              </span>{' '}
              Character heuristics and OpenAI tokenizers both misjudge Claude, and they misjudge it
              worst on exactly this kind of text: <code className={code}>@960,0</code>,{' '}
              <code className={code}>#55677A</code> and <code className={code}>×6</code> tokenize far
              less kindly than prose. 617 characters is somewhere in the low hundreds of tokens, and
              pinning it down takes a measurement rather than a ratio. The repo ships a script that
              runs the tree through Anthropic&apos;s{' '}
              <code className={code}>count_tokens</code> endpoint and prints the table.
            </p>
            <p>
              What survives without any measurement is the shape of the gap: a screenshot of this
              sketch costs over two thousand tokens, and the tree is 617 characters of plain text.
              That is roughly an order of magnitude, and it holds across any plausible tokenization.
              It is also structurally <em className="not-italic text-foreground/85">more</em>{' '}
              precise: six identical rows collapse to <code className={code}>×6</code> with an exact
              count and an exact step, rather than a model counting rectangles in a JPEG and getting
              five.
            </p>
            <p className="aka-card-well p-4 text-[13.5px]">
              <span className="text-foreground/85">
                An image is not automatically the expensive choice.
              </span>{' '}
              One 2,000-token picture that lands the layout first time beats four rounds of prose
              plus four implementations you have to read and reject. The tree is the default because
              it is cheap and precise, but the mode switcher is right next to the copy button for the
              times feel matters more than structure.
            </p>
          </section>
  )
}
