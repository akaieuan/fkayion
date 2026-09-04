import { label } from '@/components/features/demo/bodylog/shared'

/** The rules that settle design arguments, straight from the design doc. */
const rules = [
  {
    h: 'Activity, never severity.',
    t: 'Every visualisation is keyed to how much you logged. Colouring anything by rating would turn the app into a diagram of how bad you are.',
  },
  {
    h: 'Colour tells things apart; it never ranks them.',
    t: 'A hue means “this is the psoriasis one”. Depth means “more logged here”. Neither ever means “worse”.',
  },
  {
    h: 'Gaps read as gaps.',
    t: 'Days you didn’t log are drawn empty — including in the logo. A mark with no gaps would quietly claim a perfect streak.',
  },
  {
    h: 'On device, full stop.',
    t: 'No network layer exists in the app at all. Not disabled — absent. Adding one would require an explicit written privacy decision first.',
  },
  {
    h: 'Everything is optional.',
    t: 'Save is never disabled. An entry with nothing but a date is a perfectly good entry.',
  },
]

/** What decides arguments. Moved verbatim from app/demo/bodylog/page.tsx. */
export function RulesSection() {
  return (
          <section className="space-y-4">
            <h2 className="aka-lead">
              What decides arguments
            </h2>
            <p>
              Not style preferences. When a design question comes up, these settle it — and a
              component is wrong, even if it looks right, when it breaks one.
            </p>
            <div className="space-y-3">
              {rules.map((r) => (
                <div key={r.h} className="border-l-2 border-border pl-4">
                  <p className="text-14 text-foreground/85">{r.h}</p>
                  <p className="mt-1 text-13 font-light leading-relaxed text-muted-foreground">
                    {r.t}
                  </p>
                </div>
              ))}
            </div>
            <div className="aka-card-well px-5 py-4">
              <p className={label}>Product voice</p>
              <p className="mt-2 text-14 leading-relaxed text-foreground/85">
                Lowercase headings, short sentences, no exclamation, no streak shaming, no medical
                authority. The one rating vocabulary is{' '}
                <span className="font-mono text-12">flaring · irritated · okay · good · clear</span>{' '}
                — five is the good end on purpose, so the scale reads as progress toward clear rather
                than a severity score.
              </p>
            </div>
          </section>
  )
}
