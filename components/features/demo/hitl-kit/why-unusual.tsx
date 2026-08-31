/** Why it's unusual. Moved verbatim from app/demo/hitl-kit/page.tsx. */
export function WhyUnusualSection() {
  return (
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Why it&apos;s unusual</h2>
            <p>
              Most open-source AI UI kits are commodities: chat bubbles, tool-call cards, maybe a
              markdown renderer. HITL Kit couples a{' '}
              <strong className="font-medium text-foreground/90">
                research argument with an installable implementation
              </strong>
              . I wrote the paper that says enterprise AI fails because it measures the wrong thing, then
              built the component library that makes the alternative buildable, then set up the shadcn
              registry so other teams can drop those components into their own agentic products.
              Positioning, authorship, engineering, and distribution are all one piece of work. The
              measurement critique is not separate from the UI library. The UI library is the critique
              made useful.
            </p>
          </section>
  )
}
