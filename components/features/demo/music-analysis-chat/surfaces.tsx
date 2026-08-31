import { h2 } from '@/components/features/demo/music-analysis-chat/chrome'

/** Four surfaces, one set of blocks. Moved verbatim from app/demo/music-analysis-chat/page.tsx. */
export function SurfacesSection() {
  return (
          <section className="space-y-3">
            <h2 className={h2}>Four surfaces, one set of blocks</h2>
            <p>
              Chat is where a question gets asked, but it is a bad place to keep an answer. So the
              same blocks compose into three other surfaces: an analytics view over the whole
              roster, an artist view per act, and a projects view where a campaign collects the
              artifacts it produced. A long answer also opens in a side panel with its full body,
              its table, and its own follow-up row, so a deep dive stops competing with the thread
              it came out of.
            </p>
            <p>
              Artists can be pulled into a question with an <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">@</code>{' '}
              mention, which is the whole context model: the thing being asked about is named, not
              inferred.
            </p>
          </section>
  )
}
