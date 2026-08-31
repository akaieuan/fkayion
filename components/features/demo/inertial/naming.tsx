import { codeChip } from '@/components/features/demo/inertial/chrome'

/** Naming. Moved verbatim from app/demo/inertial/page.tsx. */
export function NamingSection() {
  return (
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Naming</h2>
            <p>The vocabulary comes from Philip K. Dick&apos;s <em>Ubik</em> (1969).</p>
            <ul className="list-disc space-y-2.5 pl-5 marker:text-muted-foreground/50">
              <li>
                <strong className="font-medium text-foreground/85">inertial</strong> — in <em>Ubik</em>, &quot;inertials&quot;
                are anti-telepaths whose function is to neutralize harmful psychic intrusion on behalf of clients.
                The toolkit&apos;s sub-agents are <em>inertials</em> — each one neutralizes a class of harmful signal
                (toxicity, spam, NSFW, identity hate, brigading…) for the communities it serves.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">Runciter</strong> — Glen Runciter, the operator who
                runs the prudence organization that dispatches inertials. The orchestrator class in{' '}
                <code className={codeChip}>@inertial/core</code> is <code className={codeChip}>Runciter</code>; the
                host process is <code className={codeChip}>apps/runciter</code>. Code reads as{' '}
                <code className={codeChip}>runciter.dispatch(event) → inertials emit StructuredSignals</code>.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">structured signals</strong> — what inertials emit.
                Probability + confidence + evidence pointers. <em>Never verdicts.</em> Policy turns signals into
                routing; humans turn routing into actions.
              </li>
            </ul>
            <p className="text-foreground/80">
              One rule: inertials emit signals; the Runciter dispatches them; humans decide.
            </p>
          </section>
  )
}
