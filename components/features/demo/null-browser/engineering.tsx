import { SECURITY } from '@/components/features/demo/null-browser/shared'

/** The engineering worth pointing at. Moved verbatim from app/demo/null-browser/page.tsx. */
export function EngineeringSection() {
  return (
          <section className="space-y-4">
            <h2 className="aka-lead">
              The engineering worth pointing at
            </h2>
            <ul className="aka-list space-y-2.5">
              <li>
                <strong className="font-medium text-foreground/85">Chrome height is a constant.</strong>{' '}
                Opening a second tab or saving a first bookmark used to change it, which physically
                reflowed the page you were reading. Tab creation and tab resizing now consume one
                function, <code className="aka-code">contentRect()</code>, so they cannot disagree about
                where the page goes.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">Shortcuts are native menu accelerators</strong>{' '}
                rather than listeners in the shell. Not cosmetic: the shell and each tab are separate
                native webviews, so a shell listener stops receiving keys the moment you click into a
                page, which is exactly when Reload and Back matter.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">The privileged webview is pinned to its own origin.</strong>{' '}
                A strict CSP on the shell, <code className="aka-code">http</code>/
                <code className="aka-code">https</code>-only tab navigation refused at the IPC boundary,
                and a navigation guard so a remote link surfaced inside the shell can only ever open
                in a tab. Written up in{' '}
                <a href={SECURITY} target="_blank" rel="noopener noreferrer" className="aka-quiet-link">
                  SECURITY.md
                </a>
                .
              </li>
              <li>
                <strong className="font-medium text-foreground/85">Favicons are captured, never fetched.</strong>{' '}
                Taken from pages as you visit them and validated in Rust, because fetching them would
                breach invariant 2. A hostname-derived letter mark stands in until the first visit.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">Extraction rides an image beacon.</strong>{' '}
                Readability and Turndown run in the tab and return through a custom{' '}
                <code className="aka-code">null-event://</code> scheme as chunked{' '}
                <code className="aka-code">Image.src</code> requests rather than{' '}
                <code className="aka-code">fetch</code>, because <code className="aka-code">img-src</code> is
                broad where <code className="aka-code">connect-src</code> is locked down on exactly the
                sites worth clipping.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">Split view and pin folders.</strong>{' '}
                Drag a tab or a pin out of the sidebar onto the page for a live drop target; drop one
                pin dead-centre on another to fold them, iOS-style. Deleting a folder re-roots its
                pins, so arrangement is never a place data can be lost.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">Session restore that costs nothing.</strong>{' '}
                Restored tabs come back dormant, as rows with no webview, and load when selected.
                Twenty restored tabs cost one page load.
              </li>
            </ul>
          </section>
  )
}
