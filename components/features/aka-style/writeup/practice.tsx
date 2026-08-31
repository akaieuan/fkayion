import Link from 'next/link'
import { kicker, sectionH } from '@/components/features/aka-style/writeup/chrome'

const link =
  'text-[oklch(0.4_0.08_152.2)] underline decoration-border underline-offset-[3px] transition-colors hover:text-[oklch(0.32_0.085_152)] dark:text-[oklch(0.707_0.108_152.216)] dark:hover:text-[oklch(0.78_0.1_152)]'

/** The practice: where the system came from at Ubik, and what it is worth now. */
export function Practice() {
  return (
        <section className="mt-16">
          <p className={kicker}>The practice</p>
          <h2 className={sectionH}>Where it came from, and what it does now</h2>

          <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4 text-[15px] font-light leading-relaxed text-muted-foreground">
              <h3 className="text-sm font-medium tracking-wide text-foreground">Built at Ubik</h3>
              <p>
                This started at{' '}
                <Link href="/demo/ubik" className={link}>
                  Ubik
                </Link>
                , and it started from a shortage rather than from ambition. There was no design team
                and no time to keep a spec in sync with itself, so anything that needed a meeting to
                settle got settled once and written down as a rule instead.
              </p>
              <p>
                What survived three and a half years of that is what is on this page: the decisions
                that kept being correct across a desktop app, a web gateway, a browser extension and
                the agent surfaces, which is a wide enough spread to have killed anything that was
                only a preference.
              </p>
              <p>
                The other half of the inheritance is the habit of the system being the running thing
                rather than a description of it. There the board was Excalidraw files nobody closed
                and the spec was the code; here the specimen imports the same components the site
                does. Neither can drift, because there is no second copy to drift from.
              </p>
            </div>

            <div className="space-y-4 text-[15px] font-light leading-relaxed text-muted-foreground">
              <h3 className="text-sm font-medium tracking-wide text-foreground">
                What it is worth now
              </h3>
              <p>
                The part I did not anticipate is how much a written constraint is worth once you
                build with agents. I work in Claude Code, and the tokens, the scale and the seven
                laws load into the design context for every repo I run, so the language is not
                something I re-explain per session or per project. A new surface arrives already
                speaking it.
              </p>
              <p>
                That is the difference between a style guide and this. A style guide is read by a
                person who then interprets it. These are narrow enough to be applied directly, which
                is why every project here looks like the same studio made it while none of them took
                the setup time that usually implies.
              </p>
              <p className="text-foreground/85">
                It is the reason I can go from a decision to a production surface in a day and have
                it land in the same language as everything around it.
              </p>
            </div>
          </div>
        </section>
  )
}
