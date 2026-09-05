import '@/components/product-replicas/bodylog/bodylog.css'
import { BodyLogMark } from '@/components/product-replicas/bodylog/bodylog-mark'
import { PhoneFrame } from '@/components/product-replicas/bodylog/phone'
import { KickerTags } from '@/components/ui/tag-row'
import { PlainSummary } from '@/components/ui/plain-summary'

/*
 * BodyLog, the opener.
 *
 * The phone is the write-up's own replica, standing in the app's token scope
 * the way the showcase wraps it, without the theme toggle: paper has one
 * theme. The frame is 330 by 690, so with the scope's padding the right
 * column comes to about 770 and nothing is cropped.
 *
 * Height budget, of 844: the left column is the chips (22), the mark row
 * (84), the description at two lines (49), the summary card, four paragraphs
 * in an 832px measure (about 435), and the byline (54), around 690 with the
 * gaps. The right column is the kicker (28) and the scope (740), about 770.
 */
export function BodyLogTitle() {
  return (
    <div className="grid h-full grid-cols-[1fr_560px] gap-x-16">
      <div>
        <KickerTags>Product · iOS · SwiftUI</KickerTags>
        <div className="mt-4 flex items-center gap-6">
          <BodyLogMark size={84} title="" />
          <h1 className="text-display font-extralight leading-none tracking-tight text-foreground/90">
            BodyLog
          </h1>
        </div>
        <p className="mt-4 text-15 font-light leading-relaxed text-muted-foreground">
          A skin-tracking app for iPhone. You photograph a place on your body, say what it&apos;s
          about, and the app keeps the record. It never reads your skin, scores it, or tells you
          what to do — and nothing leaves the phone.
        </p>
        <PlainSummary path="/demo/bodylog" />
        <p className="mt-4 text-12 font-light leading-relaxed text-muted-foreground/70">
          $3/month or $25/year at launch. Native SwiftUI + SwiftData, iOS 17+, zero external
          dependencies — no image assets; every glyph, badge and figure is a character grid drawn
          at runtime.
        </p>
      </div>

      <div>
        <p className="aka-kicker">The app, rendered live</p>
        <div
          className="bl-scope mt-3"
          data-bl-theme="dark"
          style={{ background: 'var(--ground)', borderRadius: 18, border: '1px solid var(--rule)', padding: 24 }}
        >
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <PhoneFrame />
          </div>
        </div>
      </div>
    </div>
  )
}
