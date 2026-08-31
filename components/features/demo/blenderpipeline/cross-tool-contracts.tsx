/** Cross-tool contracts. Moved verbatim from app/demo/blenderpipeline/page.tsx. */
export function CrossToolContractsSection() {
  return (
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Cross-tool contracts</h2>
            <p>
              Three tools have to agree about which way is up, where a weapon attaches, and what a
              socket is called. None of that is left implied. Axes and attachment sockets are
              specified and named by convention, and the naming is enforced by the same gates that
              check the geometry, because a contract nothing verifies is a comment.
            </p>
          </section>
  )
}
