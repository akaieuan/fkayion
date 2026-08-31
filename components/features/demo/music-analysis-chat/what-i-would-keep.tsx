import { h2 } from '@/components/features/demo/music-analysis-chat/shared'

/** What I would keep. Moved verbatim from app/demo/music-analysis-chat/page.tsx. */
export function WhatIWouldKeepSection() {
  return (
          <section className="space-y-3">
            <h2 className={h2}>What I would keep</h2>
            <p>
              The closed block set, and the rule that prose captions an artifact rather than
              carrying the answer. Both survived into how I build agent surfaces now: name the
              answer types first, build a component per type, and let the model choose among them
              instead of formatting freehand.
            </p>
          </section>
  )
}
