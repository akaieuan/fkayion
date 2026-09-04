/** What it is. Moved verbatim from app/demo/null-browser/page.tsx. */
export function WhatItIsSection() {
  return (
          <section className="space-y-3">
            <h2 className="aka-lead">What it is</h2>
            <p>
              The name is the thesis. <code className="aka-code">null</code> is what a function returns
              when there is nothing to return, and that is the correct default for a browser. Null is
              a macOS desktop browser built on Tauri 2 in Rust with a React and TypeScript interface,
              rendering through the system WebView, so pages look the way they would in Safari while
              the browser around them is written to different defaults.
            </p>
            <p>
              There is no account system, no sync service and no telemetry endpoint. It does not
              phone home on launch, does not check for updates unless asked, and ships no crash
              reports anywhere. Bookmarks, history, notes and settings live on the machine in SQLite,
              plain markdown and localStorage, readable with{' '}
              <code className="aka-code">sqlite3</code>, <code className="aka-code">grep</code> or any text
              editor.
            </p>
          </section>
  )
}
