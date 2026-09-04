/** Capture, not inference. Moved verbatim from app/demo/null-browser/page.tsx. */
export function CaptureSection() {
  return (
          <section className="space-y-3">
            <h2 className="aka-lead">
              Capture, not inference
            </h2>
            <p>
              Notes is where the browser earns its keep. A note opens beside the page rather than
              covering it, autosaves as you type, and carries the page&apos;s URL as its source line.
              Saving a page runs Mozilla Readability and Turndown to get the article as markdown;
              saving a selection converts whatever is highlighted. Both run inside the tab&apos;s own
              WebView with vendored copies, so no network call of any kind is involved.
            </p>
            <p>
              Every note is written twice: to SQLite, which is the index the list reads, and to{' '}
              <code className="aka-code">~/Documents/Null/</code> as a real markdown file with YAML front
              matter. The file is the copy that matters. It opens in Obsidian, it greps, and it is
              still readable long after you stop running Null. The sync goes both ways, and it
              refuses the dangerous cases: a file older than Null&apos;s own last write is treated as
              a stale mirror rather than an edit, and an empty file never erases a note, because
              editors save by truncate-then-write and reading mid-save must not eat the copy.
            </p>
          </section>
  )
}
