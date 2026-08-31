import { DemoVideo } from '@/components/ui/demo-video'
import type { Demo } from '@/components/features/demo/ubik/chrome'

/**
 * The 2025 build, at full length.
 *
 * Kept rather than replaced. The seven above each show one thing in under a
 * minute and a half; these are whole sessions, and a reader who wants to watch
 * the loop actually close needs one of them rather than seven clips of it. They
 * are a different register, not an older version of the same thing.
 *
 * They sit inside a `<details>`, closed. Ten video frames down one column is a
 * scroll rather than a page, and a disclosure is the one way to carry all of it
 * without spending the reader's attention by default — native, server-rendered,
 * no client component and no state.
 */
const longRuns: Omit<Demo, 'art'>[] = [
  {
    src: '/ubik-demo-walkthrough',
    title: 'Workspace walkthrough',
    length: '3:26',
    summary:
      'The full loop, end to end: ask the agent what’s working in a draft, and it reads the essay against the source PDFs, writes analytical notes, and queues every one for review — accepted or rejected claim by claim, with the evidence panel surfacing the supporting quotes as you go.',
  },
  {
    src: '/ubik-demo-synthesis',
    title: 'Cross-source synthesis',
    length: '2:33',
    summary:
      'Five papers @-mentioned into a single prompt — “find the commonalities” — while the Context Engine indexes the workspace live. The agent reads the peer-reviewed PDFs side by side and builds a synthesis grounded in all five sources, not a summary of one.',
  },
  {
    src: '/ubik-demo-files',
    title: 'The workspace library',
    length: '2:36',
    summary:
      'The file explorer as a research surface: PDFs, documents, saved searches, and folders in one indexed library. Then a multi-note agent run — grep across source bundles, evidence distributed in bulk, three notes finalized — with every artifact landing in the explorer as it’s produced.',
  },
]

/**
 * What the disclosure's tooltip cycles through.
 *
 * Three phrases rather than one, on the site's own trickle animation — the
 * stacked-grid swap the Trickle kit uses, which is pure CSS and needs no
 * JavaScript to run. Kept to a similar length because they share one grid cell,
 * so the pill sizes to the widest and would jump if one were much longer.
 *
 * They say what the summary line does not: how much is in there, and that it is
 * whole sessions rather than more of the same clips.
 */
const TIPS = ['More videos in here', 'Nine more minutes', 'The loop, end to end']

/** One third of the cycle each, matching the kit's own swap timing. */
const TIP_SWAP = 2.6

/** The older runs are webm, from before the encoding was measured. */
const LONG_H: Record<string, number> = {
  '/ubik-demo-walkthrough': 774,
  '/ubik-demo-synthesis': 934,
  '/ubik-demo-files': 802,
}

/** Three longer runs from the 2025 build, in a closed disclosure. Moved verbatim from app/demo/ubik/page.tsx. */
export function LongRunsSection() {
  return (
          <div>
            <details className="group mt-8 aka-card-well px-5 py-4">
              <summary className="cursor-pointer list-none text-[13px] font-medium text-foreground/85 marker:content-none">
                {/*
                  The label is the hover target, not the whole summary row: a
                  tooltip centred on a full-width bar would float somewhere off
                  in the margin. `group/tip` is named so it cannot be caught by
                  the `group-open` the caret already uses.
                */}
                <span className="group/tip relative inline-flex items-center gap-2">
                  <span className="font-mono text-[10px] text-muted-foreground/60 transition-transform group-open:rotate-90">
                    ▸
                  </span>
                  Three longer runs from the 2025 build
                  <span className="text-[11px] font-light text-muted-foreground/55">
                    2:33 – 3:26
                  </span>

                  {/*
                    Same pill as the header's theme control, so a tooltip means
                    one thing on this site. `aria-hidden` for the same reason it
                    is there: the disclosure already names itself, and a
                    rotating label read aloud mid-cycle is noise.
                  */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-1/2 top-full z-10 mt-2.5 grid -translate-x-1/2 justify-items-center whitespace-nowrap rounded-full bg-foreground px-2.5 py-1 text-[11px] font-medium tracking-wide text-background opacity-0 transition-opacity duration-200 group-hover/tip:opacity-100 group-focus-visible/tip:opacity-100"
                  >
                    {TIPS.map((tip, i) => (
                      <span
                        key={tip}
                        // One cell for all three, so the pill keeps its width
                        // whichever phrase is currently up.
                        className="aka-trickle-swap col-start-1 row-start-1 block"
                        style={{
                          animationDelay: `${i * TIP_SWAP}s`,
                          animationDuration: `${TIPS.length * TIP_SWAP}s`,
                        }}
                      >
                        {tip}
                      </span>
                    ))}
                  </span>
                </span>
              </summary>
              <p className="mt-2 pl-5 text-[12px] font-light leading-relaxed text-muted-foreground/70">
                Whole sessions rather than single capabilities. The interface is a year older and
                the loop is the same one.
              </p>
              <div className="mt-5 space-y-8">
                {longRuns.map((run) => (
                  <figure key={run.src}>
                    <div className="aka-card-well aka-card-media overflow-hidden rounded-lg">
                      <DemoVideo
                        src={run.src}
                        poster={`${run.src}-poster.webp`}
                        format="webm"
                        width={1280}
                        height={LONG_H[run.src]}
                        label={`${run.title} — ${run.summary}`}
                      />
                    </div>
                    <figcaption className="mt-2">
                      <span className="text-[13px] font-medium text-foreground/85">{run.title}</span>
                      <span className="ml-2 text-[11px] text-muted-foreground/50">{run.length}</span>
                      <p className="mt-1 text-[12px] font-light leading-relaxed text-muted-foreground/75">
                        {run.summary}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </details>
          </div>
  )
}
