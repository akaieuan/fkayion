import Link from 'next/link'
import { link, h2 } from '@/components/features/demo/how-i-work/chrome'

/** Three and a half years of it at Ubik. Moved verbatim from app/demo/how-i-work/page.tsx. */
export function UbikSection() {
  return (
          <section className="space-y-3">
            <h2 className={h2}>Three and a half years of it at Ubik</h2>
            <p>
              I co-founded{' '}
              <Link href="/demo/ubik" className={link}>
                Ubik Studio
              </Link>{' '}
              and led product design end to end. It was a desktop research environment where agents
              did the gathering, the reading and the drafting, and the person stayed in the loop at
              every point of judgment. A researcher opened a folder and it became a workspace:
              sources indexed locally, agents searching the literature and reading PDFs in
              parallel, drafts where every claim traced back to a real quote on a real page.
            </p>
            <p>
              The part I am proudest of is that human control was not a confirmation dialog bolted
              on at the end. It was load-bearing architecture. Actions were approved in batches
              rather than rubber-stamped one toast at a time, every review decision was recorded in
              a trail you could revisit afterwards, and an agent could stop mid-task and say it
              needed a person. We had a grammar for that, Human Needed, and it appeared in the
              product because it appeared in the agents: the thesis was written into the system
              prompts themselves, years before human-in-the-loop was an industry phrase.
            </p>
            <p>
              What I owned there is most of what I do now. The workspace model, the review
              surfaces, the evidence and citation UX, and the copy and interaction conventions
              across every surface. Front-end throughout. The research cycles: interviews,
              behavioral observation, session replays. On the agent side, the system prompts, the
              skills, the custom datasets, and the evaluation framework and ARC eval suite we used
              to train, tune and regression-test both the agents and the orchestration that
              coordinated them.
            </p>
            <p>
              It was a large multi-package system by the end: a desktop app, a web gateway, cloud
              agent deployments and a browser extension over a local-first storage model. 1,038
              commits between September 2023 and May 2026, with the design and research that came
              before the first one. It is a closed chapter now, the builds retired, and I am at
              peace with that. It was three and a half years spent asking one question in earnest:
              what does it take to make an AI research tool a person can actually trust?
            </p>
            <p>
              Two things from it stuck hardest. The first is that Ubik never had a design team or
              time to keep a spec in sync with itself, so what it had instead was Excalidraw boards
              nobody ever closed: landing explorations, user story wireframes, screenshots of the
              running app with corrections drawn straight over them, and the decision written
              beside the sketch. The second is when to stop drawing. Once my engineer teammate had
              a framework standing, developing the flow directly in code was faster than a
              wireframe that could only approximate the constraints that already existed. That is
              the shift that turned me into a design engineer.
            </p>
          </section>
  )
}
