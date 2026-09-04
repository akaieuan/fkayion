/** What this is NOT. Moved verbatim from app/demo/inertial/page.tsx. */
export function NotSection() {
  return (
          <section className="space-y-3">
            <h2 className="aka-lead">What this is NOT</h2>
            <ul className="aka-list space-y-2.5">
              <li>
                <strong className="font-medium text-foreground/85">Not a deployable moderation service.</strong> No
                connectors. No action dispatcher. No auth. Don&apos;t put it in front of any real instance.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">Not a model.</strong> Composes existing classifiers
                (toxic-bert, Claude, Voyage) under typed contracts. Trains nothing.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">Not statistically validated.</strong> The 31-event
                gold set demonstrates the calibration math is correct; per-channel sample sizes (1–15) are too small
                to make any actual claim about any skill&apos;s real-world accuracy.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">Not multimodal in the way that phrase usually
                  means.</strong> Audio is fully unimplemented. Video is keyframe extraction plus per-frame image
                classification — no temporal reasoning, no audio track, no scene-change detection.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">Not a complete moderation toolkit.</strong> The
                dashboard, audit log, eval harness, and skill registry are real. Two of the seven{' '}
                <code className="aka-code">@inertial/agents-*</code> packages (audio, identity) are pure stubs that
                return <code className="aka-code">[]</code>; the remaining five (text, vision, video, context, cloud)
                ship real composition logic. Connector packages are placeholders — none ingest from a real source
                platform.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">Not a maintained OSS project.</strong> No
                CONTRIBUTING.md, no issue templates, no triage commitment. If you want to use any of this, fork it.
              </li>
            </ul>
          </section>
  )
}
