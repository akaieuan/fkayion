/** Who built it. Moved verbatim from app/demo/blockpad/page.tsx. */
export function WhoBuiltItSection() {
  return (
          <section className="space-y-3">
            <h2 className="aka-lead">Who built it</h2>
            <p>
              Ieuan King, design and build, out of{' '}
              <a
                href="https://ubik.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground/50"
              >
                Ubik Studio
              </a>
              . MIT licensed, so anyone can fork it, ship it, or take the tree format and do
              something better with it.
            </p>
          </section>
  )
}
