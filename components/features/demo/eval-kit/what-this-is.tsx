/** What this is. Moved verbatim from app/demo/eval-kit/page.tsx. */
export function WhatThisIsSection() {
  return (
          <section className="space-y-3">
            <h2 className="aka-lead">What this is</h2>
            <p>
              eval-kit measures one thing: whether an AI agent actually helps a human do real work, as
              judged by the human. Not whether the agent can solve a synthetic puzzle alone. Not
              whether an LLM-judge says it did well. Whether a person, scoring step-by-step, finds it
              useful.
            </p>
            <p>
              Most eval frameworks (MMLU, SWE-bench, GAIA, AgentBench) measure autonomous task
              completion on synthetic prompts and let an LLM grade the output. eval-kit refuses both
              choices. The seed suite is ported from observed real workflows with real distractors:
              future-dated papers, unverifiable claims, jobs that don&apos;t exist yet. Scores come
              from a human reviewer using a <strong className="font-medium text-foreground/90">0-3 rubric</strong> across <strong className="font-medium text-foreground/90">five dimensions</strong> per
              step. LLM pre-fill is allowed as a draft the human accepts or overrides; it can never
              be the default scorer. If LLM-as-judge becomes the default, the project loses its reason
              to exist.
            </p>
            <p className="text-[14px] text-muted-foreground/95">
              The five dimensions: explainability, agency preservation, long-term capability,
              calibration, collaborative performance.
            </p>
          </section>
  )
}
