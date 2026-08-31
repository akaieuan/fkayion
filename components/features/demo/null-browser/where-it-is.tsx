import { code } from '@/components/features/demo/null-browser/chrome'

/** Where it is. Moved verbatim from app/demo/null-browser/page.tsx. */
export function WhereItIsSection() {
  return (
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Where it is</h2>
            <p>
              M0 through M2, M6, M7 and M8 are done: browsing, bookmarks and history; the Network
              Inspector with subresource capture and per-origin blocking; shell hardening; the
              sidebar navigation rebuild; and the Zen-informed redesign that brought glass, split
              view, the Notes editor, pin folders, popups, downloads, per-tab zoom and find.
            </p>
            <p>
              Next is subresource blocking through WebKit&apos;s own{' '}
              <code className={code}>WKContentRuleList</code>, a command bar that searches notes,
              bookmarks and history together, and FTS5 search over what you have actually seen. A
              SearXNG provider already exists in the Rust backend with no interface in front of it,
              because the search view was part of the AI drawer that was removed. It gets a UI or it
              gets cut.
            </p>
            <p className="text-[12px] text-muted-foreground/70">
              Tauri 2 · Rust · React 19 · TypeScript · Tailwind v4 · SQLite · WebKit · MPL 2.0
            </p>
          </section>
  )
}
