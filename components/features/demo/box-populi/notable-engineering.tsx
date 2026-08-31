/** Notable engineering. Moved verbatim from app/demo/box-populi/page.tsx. */
export function NotableEngineeringSection() {
  return (
          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Notable engineering</h2>
            <ul className="list-disc space-y-2 pl-5 marker:text-muted-foreground/50">
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
                calling <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">play()</code>{' '}
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
                (<code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">pointer-coarse</code>,{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">hover</code>) for
                touch-specific UI. No{' '}
                <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">isMobile</code>,
                no user-agent checks. A narrow desktop window never sees the touch hint.
              </li>
            </ul>
          </section>
  )
}
