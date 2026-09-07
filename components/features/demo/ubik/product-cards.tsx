import { LoopVideo } from '@/components/ui/loop-video'
import { UbikCardArt } from '@/components/product-replicas/ubik/card-art'
import type { Demo } from '@/components/features/demo/ubik/shared'

/** Every recording is 1280 wide after encoding; heights vary by capture. */
export const DEMO_H: Record<string, number> = {
  '/ubik/workspace': 978,
  '/ubik/agent': 950,
  '/ubik/search': 952,
  '/ubik/notes': 958,
  '/ubik/review': 988,
  '/ubik/models': 952,
  '/ubik/hopper': 1054,
}

export const demos: Demo[] = [
  {
    src: '/ubik/workspace',
    line: 'Files stay on machine so Ubik Agents work with context locally.',
    art: 'stone',
    title: 'A folder becomes a workspace',
    length: '1:25',
    summary:
      'No import step and no database: point Ubik at a directory of PDFs and it indexes them in place, into a local context engine that reports how stale it is in the status bar. The explorer is the file system, so the workspace is still just a folder when you close the app.',
  },
  {
    src: '/ubik/agent',
    line: 'Delegate busy work so you can focus on what matters.',
    art: 'forest',
    title: 'Twelve papers into one prompt',
    length: '1:15',
    summary:
      'Sources are @-mentioned rather than uploaded. A dozen papers named in a single sentence, and the agent reads them in parallel against the draft rather than summarising them one at a time. The model picker sits beside the send button because which model reads your sources is a decision worth leaving with the researcher.',
  },
  {
    src: '/ubik/search',
    line: 'Search academic databases and pull papers into your workspace with a click.',
    art: 'sage',
    title: 'Search that scores its own results',
    length: '0:53',
    summary:
      'Agentic literature search across 146 results and 8 searches, then the Result Explorer: every candidate scored on peer review, methodology, recency and relevance, with an agent analysis under each and a preview before anything is accepted into the workspace.',
  },
  {
    src: '/ubik/notes',
    line: 'Annotate files, build bibliographies, and work with cited output.',
    art: 'pine',
    title: 'A note is its evidence',
    length: '1:16',
    summary:
      'Notes are typed — highlight, key point, claim, evidence, definition, methodology, limitation — and opening one shows the supporting quotes with page numbers behind it. There is no note in Ubik that is only an assertion; if the quotes are not there, the note does not get written.',
  },
  {
    src: '/ubik/review',
    line: 'Stay confident with human-in-the-loop features that amplify intelligence.',
    art: 'olive',
    title: 'Human Needed, and the review queue',
    length: '0:30',
    summary:
      'The part I am proudest of. The agent stops mid-document, states the judgment it needs, and waits — skip or submit, counted in the status bar as blocking. Beside it the review queue holds every claim the run produced, each one accepted or rejected on its own, with a jump straight to where it would land.',
  },
  {
    src: '/ubik/models',
    line: 'Route to frontier models, experimental models, and local models. You decide what runs where.',
    art: 'violet',
    title: 'Model control, per subagent',
    length: '0:50',
    summary:
      'The PDF reader, the writer and the researcher are separate agents, and each one takes its own model and its own reasoning effort. Toolsets switch off individually. A researcher who wants a cheap model reading PDFs and an expensive one writing the draft can have exactly that.',
  },
  {
    src: '/ubik/hopper',
    line: 'A browser companion. Browse any paper or webpage and hop it straight into your workspace with full metadata.',
    art: 'rust',
    title: 'Hopper, the capture extension',
    length: '0:29',
    summary:
      'The companion browser extension. Hop a page and it lands in the workspace sources folder, verified and attributed, syncing to the desktop app when it is connected. The web half of a local-first tool: the browser is where sources are found, and the file system is where they live.',
  },
]

/**
 * One capability, as a product card, laid out the way the marketing site laid
 * out its features.
 *
 * The painted ground runs to the edges, the recording sits on it like a print
 * on a wall, and the words sit on the paint rather than under the card. That
 * is the site's own feature card, which is the reason the art was
 * commissioned in the first place: a screenshot on a plain background reads
 * as documentation, and the same screenshot on a painted one reads as a
 * product.
 *
 * The card stands in the reading column, the same width as every other
 * section, so it stacks: the title at the section-title size with the
 * recording's length at the end of its line, the one sentence the marketing
 * site set under the capability, then the recording at the full width of the
 * column, and the longer summary as its caption in the quiet ink. The display
 * size was tried for the title and broke every one into three or four lines;
 * a side-by-side column was tried and left the recording a third of the card.
 *
 * The whole card is server-rendered, the recording included: it is a plain
 * autoplaying loop with no controls. Nothing about the art, the copy or the
 * layout reaches the browser as JavaScript.
 */
function ProductCard({ demo }: { demo: Demo }) {
  return (
    <figure className="relative overflow-hidden rounded-2xl border border-border/60">
      <UbikCardArt art={demo.art} className="absolute inset-0 h-full w-full" />

      {/*
        A wash between the paint and the type. The paintings are mid-tone and
        the copy is white; without this the headings sit on whatever value the
        ridge happens to be at that point, which changes across the card.
      */}
      <div className="absolute inset-0 bg-gradient-to-b from-wash-on-art/45 via-wash-on-art/25 to-wash-on-art/55" />

      <div className="relative flex flex-col gap-5 p-5 sm:p-7">
        <figcaption className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-20 font-light leading-snug tracking-tight text-on-art">{demo.title}</h3>
            <p className="shrink-0 font-mono text-10 uppercase tracking-[0.14em] text-on-art/75">
              {demo.length}
            </p>
          </div>
          <p className="max-w-lg text-14 font-light leading-relaxed text-on-art/80">{demo.line}</p>
        </figcaption>

        <div>
          <div className="overflow-hidden rounded-lg ring-1 ring-on-art/10">
            <LoopVideo
              src={demo.src}
              poster={`${demo.src}-poster.webp`}
              width={1280}
              height={DEMO_H[demo.src]}
              label={`${demo.title} — ${demo.summary}`}
            />
          </div>
          <p className="mt-3 text-12 font-light leading-relaxed text-on-art/75">{demo.summary}</p>
        </div>
      </div>
    </figure>
  )
}

/** The product, in motion: the seven capability cards, in the reading column with the rest of the page. */
export function ProductCardsSection() {
  return (
    <div>
      <p className="aka-kicker">The product, in motion</p>
      <p className="mt-2 max-w-xl text-12 font-light leading-relaxed text-muted-foreground/75">
        Seven silent recordings of the last build, March 2026, each one looping on its own.
      </p>
      {/* Air between the cards, so each one is looked at on its own, the way the marketing site spaced its features. */}
      <div className="mt-6 space-y-12 lg:space-y-16">
        {demos.map((demo) => (
          <ProductCard key={demo.src} demo={demo} />
        ))}
      </div>
    </div>
  )
}
