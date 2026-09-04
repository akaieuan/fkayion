/** The human-in-the-loop architecture. Moved verbatim from app/demo/ubik/page.tsx. */
export function ArchitectureSection() {
  return (
          <section className="space-y-3">
            <h2 className="aka-lead">
              The human-in-the-loop architecture
            </h2>
            <p>
              The part of Ubik I&apos;m proudest of is that human control wasn&apos;t a confirmation
              dialog bolted on at the end — it was load-bearing architecture. Agent actions were
              approved in batches, not rubber-stamped one toast at a time. Every review decision was
              recorded in an auditable trail you could revisit after the fact. Agents could stop
              mid-document and ask for human judgment exactly where it belonged, at a depth you could
              dial from rough scaffold to polished draft. And the rule I still think about most: if
              there was no evidence to cite, the agent didn&apos;t get to write the claim.
            </p>
          </section>
  )
}
