/** My role. Moved verbatim from app/demo/ubik/page.tsx. */
export function RoleSection() {
  return (
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">My role</h2>
            <p>
              I co-founded Ubik and led product design end to end: the workspace model, the review
              surfaces, the evidence and citation UX, the Human Needed grammar, and the copy and
              interaction conventions across every surface. I built front-end throughout, and ran the
              user research cycles — interviews, behavioral observation, session replays, and the{' '}
              <a href="https://kraa.io/team-test-log042" target="_blank" rel="noopener noreferrer" className="underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground/50">team test log</a>{' '}
              that documented them in public.
            </p>
            <p>
              On the agent side I owned the system prompts, skills, and custom datasets — and I
              designed and built the <strong className="font-medium text-foreground/90">custom
              evaluation framework and ARC eval suite</strong> we used to train, tune, and regression-test
              our agents and the agent-orchestration systems that coordinated them. That evaluation
              work is what actually moved the product: measurable gains in output accuracy, answer
              quality, and real-world usability — not benchmark numbers in isolation, but whether a
              researcher could trust and use what came back. It&apos;s the part of Ubik least visible
              in a screenshot and the part that mattered most to the results.
            </p>
          </section>
  )
}
