/** Generated art needs gates. Moved verbatim from app/demo/blenderpipeline/page.tsx. */
export function GatesSection() {
  return (
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              Generated art needs gates
            </h2>
            <p>
              This is the part that makes it a pipeline rather than a folder of scripts. Assets that
              are built rather than saved can regress silently: someone changes a shared constant,
              every character rebuilds, and nothing tells you that eleven of them are now subtly
              wrong. Hand-modelled art fails loudly, in a viewport, in front of the person who made
              it. Generated art fails at three in the morning in a build log.
            </p>
            <p>
              So the generators are gated. Validators run on every rebuild and check the things a
              human would have noticed by eye: that hair covers the scalp, that geometry has not
              sunk inside the body it sits on, that triangle budgets hold, that attachment sockets
              still point the way the engine expects.
            </p>
            <p>
              Writing those tests turns out to be harder and more interesting than writing the
              generators. A test for generated geometry has to measure against something, and
              choosing what it measures against is the whole game.
            </p>
          </section>
  )
}
