import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

/** The closing card pointing at the running demo. Moved verbatim from app/demo/music-analysis-chat/page.tsx. */
export function MusicChatClosing() {
  return (
          <section className="aka-card-well px-5 py-4">
            <p className="text-14 leading-relaxed text-foreground/85">
              The demo is still here and still runs. It is filed under the write-up rather than
              beside it because the interesting part is not that a chat window works: it is the
              list of things the agent is allowed to hand back.
            </p>
            <Link
              href="/demo/music-analysis-chat/app"
              className="mt-3 inline-flex w-fit items-center gap-2 text-13 font-medium text-foreground underline decoration-border underline-offset-[3px] transition-colors hover:decoration-foreground/50"
            >
              Open the demo
              <ArrowUpRight className="h-3.5 w-3.5 opacity-70" aria-hidden />
            </Link>
          </section>
  )
}
