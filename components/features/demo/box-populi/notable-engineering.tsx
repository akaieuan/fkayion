/** Notable engineering. Moved verbatim from app/demo/box-populi/page.tsx. */
export function NotableEngineeringSection() {
  return (
          <section className="space-y-4">
            <h2 className="aka-lead">Notable engineering</h2>
            <ul className="aka-list space-y-2">
              <li>
                <span className="text-foreground/85">One-at-a-time audio coordination.</span> Several
                players can be on screen at once: a persistent header player that keeps playing
                across navigation, the Listen playlist, and per-artist related tracks. A small
                module-level registry (no React context) lets every player join a shared bus, and
                whoever starts playing pauses the rest. Because it is a module singleton, the
                coordination survives client-side navigation. The header keeps playing as you move
                between pages, but starting a track elsewhere still pauses it.
              </li>
              <li>
                <span className="text-foreground/85">Custom players over the SoundCloud Widget.</span>{' '}
                The players are fully custom and on-brand (dark glass cards, a bespoke transport and
                tracklist) but driven by the official SoundCloud Widget API behind a hidden iframe.
                A single module centralizes embed-URL building and one-time script loading, so
                SoundCloud stays the sanctioned host while the interface stays on theme.
              </li>
              <li>
                <span className="text-foreground/85">The iOS first-tap reality, handled honestly.</span>{' '}
                iOS Safari only starts audio inside a synchronous user gesture. A custom button
                calling <code className="aka-code">play()</code>{' '}
                across a cross-origin iframe via postMessage is asynchronous, so the gesture is lost
                and iOS needs a second tap. Rather than hide this, the site shows a one-time
                &ldquo;Double Tap&rdquo; hint on touch devices that flips to the track name once
                playback starts. An overlay workaround was prototyped and rejected after on-device
                testing. An unofficial-API approach was rejected on terms-of-service and reliability
                grounds. Both calls are documented in the commit history.
              </li>
              <li>
                <span className="text-foreground/85">No device sniffing.</span> All responsive and
                capability behavior is CSS: width breakpoints for layout, input-capability queries
                (<code className="aka-code">pointer-coarse</code>,{' '}
                <code className="aka-code">hover</code>) for
                touch-specific UI. No{' '}
                <code className="aka-code">isMobile</code>,
                no user-agent checks. A narrow desktop window never sees the touch hint.
              </li>
              <li>
                <span className="text-foreground/85">A CMS decision made by a constraint.</span> The
                first plan was git-backed: content as files, GitHub login, a rebuild per save, and a
                branch ready to merge. Then the client said no to GitHub. That one constraint
                reordered everything. Git-based tools hidden behind hosted logins still meant a
                rebuild wait and photos committed into the repo, so the site moved to Sanity, the one
                CMS with a native Vercel integration, on a plan where the client&apos;s admin seat
                costs nothing. The old branch was deleted rather than parked.
              </li>
              <li>
                <span className="text-foreground/85">A migration with a zero-diff proof.</span>{' '}
                Twenty-five artists, the shows, the roles, every page&apos;s copy, twenty images and
                the hero loop were pushed into the CMS by a one-shot script with deterministic ids,
                and a guard that refuses to run again without an explicit flag so it can never
                quietly overwrite the client&apos;s edits. The rendered text of every page was
                snapshotted before the switch and diffed after it. Zero differences, except one show
                whose date had passed and correctly left the upcoming list.
              </li>
              <li>
                <span className="text-foreground/85">Seconds to live, verified twice.</span> The
                refresh path was tested locally with a hand-signed webhook request, then in
                production by publishing a change to one page&apos;s meta description and polling
                the live page until it changed. Four seconds. Reverting took another four. The same
                test surfaced that the canonical host is www and the apex redirects, which webhook
                senders do not follow, so the hook now targets www. Vercel preview builds only see
                variables ticked for Preview, and a Studio icons package one major version ahead
                passes type-checking and fails the bundle. Each is written down so nobody meets it
                twice.
              </li>
            </ul>
          </section>
  )
}
