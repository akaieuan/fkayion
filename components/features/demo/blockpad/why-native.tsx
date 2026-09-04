/** Why native, not a web app. Moved verbatim from app/demo/blockpad/page.tsx. */
export function WhyNativeSection() {
  return (
          <section className="space-y-3">
            <h2 className="aka-lead">
              Why native, not a web app
            </h2>
            <p>
              A web app cannot register a global hotkey, cannot read which application was frontmost,
              and cannot post a synthetic paste event, which is the entire delivery mechanism rather
              than a detail of it. Tauri could do all three, but would spend a webview against a
              six-second loop.
            </p>
            <p>
              The canvas is an <code className="aka-code">NSView</code> drawing through Core Graphics,
              hosted in SwiftUI. AppKit because hit testing, drag handles and marquee select get
              miserable in pure SwiftUI past forty blocks, and{' '}
              <code className="aka-code">UndoManager</code> comes free.
            </p>
          </section>
  )
}
