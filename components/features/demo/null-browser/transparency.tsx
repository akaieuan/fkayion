/** Radical transparency, as a surface. Moved verbatim from app/demo/null-browser/page.tsx. */
export function TransparencySection() {
  return (
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              Radical transparency, as a surface
            </h2>
            <p>
              The Network Inspector is a first-class panel rather than something buried in devtools.
              It streams every outbound request the browser makes, grouped by origin, and a shield
              next to any origin cancels its future requests at the webview layer. Subresources to a
              blocked origin still log, marked blocked, so you can see what was refused rather than
              only what got through. The buffer is capped and never persisted; the blocklist is the
              only part that survives a restart.
            </p>
          </section>
  )
}
