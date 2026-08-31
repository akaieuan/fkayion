/** Where this came from. Moved verbatim from app/demo/blockpad/page.tsx. */
export function WhereItCameFromSection() {
  return (
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              Where this came from
            </h2>
            <p>
              I ran design at a startup, and spent most of that stretch building with agentic tools,
              writing code to produce design rather than the other way round.
            </p>
            <p>
              What I kept noticing was my own workaround. Any time I needed an agent to actually
              understand a layout, I would sketch a rough wireframe and screenshot it. Not because
              the screenshot was good. Because it carried my intent in a way a paragraph never did.
              It was the fastest way to point at what I meant, so I did it constantly, in whatever
              tool happened to be open.
            </p>
            <p>
              The screenshot was always the wrong artifact, though. It hands over a{' '}
              <em className="not-italic text-foreground/80">picture</em> of a structure and asks the
              model to work backwards into the structure again, which it sometimes gets right and
              sometimes doesn&apos;t, and either way you pay for the guess. What was in my head was
              never pixels. It was &ldquo;panel on the right, six rows, two buttons in the
              footer.&rdquo;
            </p>
            <p className="text-foreground/85">
              Blockpad is that workaround turned into a tool. Same rough wireframe, same ninety
              seconds, except it hands over the structure directly instead of a photograph of it.
            </p>
          </section>
  )
}
