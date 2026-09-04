/** What's stubbed (deliberately). Moved verbatim from app/demo/inertial/page.tsx. */
export function WhatsStubbedSection() {
  return (
          <section className="space-y-4">
            <h2 className="aka-lead">What&apos;s stubbed (deliberately)</h2>
            <ul className="aka-list space-y-2.5">
              <li>
                Every source connector — Mastodon (ActivityPub), Bluesky (AT Protocol), Lemmy, Discord, Slack, and the
                generic webhook package (<code className="aka-code">sdk-webhook</code>). All four connector packages are
                interface stubs with no real ingestion. Without these, no real platform&apos;s events ever reach the
                runciter; the system can only process events posted directly to{' '}
                <code className="aka-code">POST /v1/events</code> by a script. This is the single biggest gap between
                this project and a moderation tool.
              </li>
              <li>
                The action dispatcher that pushes decisions back to source platforms. A moderation system that
                can&apos;t act on its decisions is a logging system.
              </li>
              <li>
                <code className="aka-code">@inertial/agents-audio</code> and{' '}
                <code className="aka-code">@inertial/agents-identity</code> — each is a single stub class whose{' '}
                <code className="aka-code">analyze</code> returns <code className="aka-code">[]</code>. Image still flows
                through <code className="aka-code">image-classify@anthropic</code>; video is local ffmpeg keyframe extract
                → that classifier. Package-level <code className="aka-code">vision-*</code> inertials are empty stubs in
                the README capability table.
              </li>
              <li>
                Gateway <strong className="font-medium text-foreground/85">media download + perceptual hashing</strong>{' '}
                — not implemented (README architecture diagram: media download + phash TODO). Honest framing:
                &quot;multimodal&quot; is text + image + frame-grabbed video; audio has no transcription or classifier
                path yet.
              </li>
              <li>
                Auth and observability layers. Anyone who can reach{' '}
                <code className="aka-code">localhost:4001</code> can register skills, kick off eval runs, or delete
                review items. Don&apos;t run this in front of any real instance.
              </li>
            </ul>
            <p>
              The architecture diagram in the README documents the target shape. What runs today is a verification
              substrate with a reference UI on top.
            </p>
          </section>
  )
}
