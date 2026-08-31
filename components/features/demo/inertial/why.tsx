import { codeChip } from '@/components/features/demo/inertial/shared'

/** Why I built this. Moved verbatim from app/demo/inertial/page.tsx. */
export function WhySection() {
  return (
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Why I built this</h2>
            <p>
              Commercial moderation APIs claim accuracy without proof and ship verdicts without evidence. Federated
              mods distrust them because they can&apos;t audit them; centralized compliance teams need defensible
              records they can show regulators. Both want decomposed, evidence-rich decisions; neither has them.
            </p>
            <p>
              I wanted to know: what would a substrate for that look like — schemas, audit log, skill registry, eval
              harness, reviewer surface — wired together end-to-end with real code rather than a slide deck. So I built
              it. Four claims:
            </p>
            <ul className="list-disc space-y-2.5 pl-5 marker:text-muted-foreground/50">
              <li>
                <strong className="font-medium text-foreground/85">Inertials (sub-agents)</strong> emit typed structured
                signals, <em>not</em> verdicts. Probability + confidence + evidence pointers. The policy layer turns
                signals into routing; humans turn routing into actions.
              </li>
              <li>
                Per-instance YAML policy so federation is a first-class case, not an afterthought. The same code serves
                a wide-open community and a high-compliance enterprise because the operator brings their own rules.
              </li>
              <li>
                Per-skill privacy posture lives in the schema. A skill is either{' '}
                <code className={codeChip}>dataLeavesMachine: true</code> or <code className={codeChip}>false</code>.
                The audit chain records which model saw which event, so privacy claims become hash-chained artifacts.
              </li>
              <li>
                Reviewer decisions auto-promote into the eval gold set. Every commit grows the calibration corpus by
                one structured row, so the system improves at measuring itself.
              </li>
            </ul>
          </section>
  )
}
