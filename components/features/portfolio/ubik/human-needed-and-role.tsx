import { DemoImage } from '@/components/ui/demo-image'
import { demos, DEMO_H } from '@/components/features/demo/ubik/product-cards'
import { DemoCardFrame } from '@/components/features/portfolio/ubik/product-cards'

/*
 * The fifth recording, Human Needed, standing on its own beside my role.
 *
 * Left, the card the write-up calls the part I am proudest of, tall rather
 * than wide so the review queue in the poster is readable: title and summary
 * (about 130), then the poster at 720 wide, which is 556 tall. About 740.
 * Right, the two paragraphs of the role and the engineering line at text-13
 * in a 560 measure: about 620. Both inside the 844.
 */
const P = 'text-13 font-light leading-relaxed text-muted-foreground'

const review = demos.find((d) => d.src === '/ubik/review')

export function UbikHumanNeededAndRole() {
  if (!review) return null

  return (
    <div className="grid h-full grid-cols-[1fr_560px] gap-x-14">
      <div>
        <p className="aka-kicker">The product, in motion</p>
        <DemoCardFrame art={review.art} className="mt-3">
          <div className="relative p-6">
            <figcaption>
              <h3 className="text-20 font-medium tracking-tight text-on-art">{review.title}</h3>
              <p className="mt-2 max-w-2xl text-13 font-light leading-relaxed text-on-art/75">
                {review.summary}
              </p>
            </figcaption>
            <div className="mt-5 overflow-hidden rounded-lg ring-1 ring-on-art/10">
              <DemoImage
                src={`${review.src}-poster.webp`}
                alt={review.title}
                width={1280}
                height={DEMO_H[review.src]}
                sizes="720px"
                priority
                className="block h-auto w-full"
              />
            </div>
            <p className="mt-2.5 text-right font-mono text-10 uppercase tracking-[0.14em] text-on-art/45">
              {review.length}
            </p>
          </div>
        </DemoCardFrame>
      </div>

      <div>
        <p className="aka-kicker">My role</p>
        <div className="mt-3 space-y-3">
          <p className={P}>
            I co-founded Ubik and led product design end to end: the workspace model, the review
            surfaces, the evidence and citation UX, the Human Needed grammar, and the copy and
            interaction conventions across every surface. I built front-end throughout, and ran the
            user research cycles — interviews, behavioral observation, session replays, and the team
            test log that documented them in public.
          </p>
          <p className={P}>
            On the agent side I owned the system prompts, skills, and custom datasets — and I
            designed and built the{' '}
            <strong className="font-medium text-foreground/90">
              custom evaluation framework and ARC eval suite
            </strong>{' '}
            we used to train, tune, and regression-test our agents and the agent-orchestration
            systems that coordinated them. That evaluation work is what actually moved the product:
            measurable gains in output accuracy, answer quality, and real-world usability — not
            benchmark numbers in isolation, but whether a researcher could trust and use what came
            back. It&apos;s the part of Ubik least visible in a screenshot and the part that mattered
            most to the results.
          </p>
        </div>

        <p className="mt-8 aka-kicker">The engineering</p>
        <p className={`mt-3 ${P}`}>
          A large multi-package system: a desktop app, a web gateway, cloud agent deployments, and
          a browser extension, with a local-first storage model underneath it all. 1,038 commits
          from September 2023 to May 2026 — with the design and research that preceded the first
          commit, about three and a half years of my life.
        </p>
        <p className="mt-3 font-mono text-11 text-muted-foreground/70">
          Electron · Next.js · TypeScript · Python · local-first
        </p>

        <div className="mt-8 aka-card-well px-5 py-4">
          <p className="aka-label">A closed chapter</p>
          <p className="mt-2 text-12 font-light leading-relaxed text-foreground/85">
            The public site and the builds are retired, and I&apos;m at peace with that — Ubik was a
            complete thing, and it stands on its own. Three and a half years of asking one question
            in earnest: what does it take to make an AI research tool a person can actually trust?
          </p>
        </div>
      </div>
    </div>
  )
}
