/** What Ubik was. Moved verbatim from app/demo/ubik/page.tsx. */
export function WhatUbikWasSection() {
  return (
          <section className="space-y-3">
            <h2 className="aka-lead">What Ubik was</h2>
            <p>
              Ubik Studio was a desktop research environment where AI agents did the gathering,
              reading, and drafting — and the human stayed in the loop at every point of judgment. A
              researcher opened a folder, and it became a workspace: sources indexed into a local
              context engine, agents searching the literature and reading PDFs in parallel, documents
              drafted with citations that traced back to real pages — and a review queue standing
              between every consequential agent action and the workspace it wanted to touch.
            </p>
            <p>
              The thesis was written directly into the agents themselves. From the writing agent&apos;s
              system prompt:
            </p>
            <blockquote className="border-l-2 border-border pl-4 text-[14px] italic text-foreground/80">
              &ldquo;Your job is not to replace human thinking — it is to amplify it. Optimize for the
              loop: you draft, the human refines, you incorporate, the human approves. Intelligence is
              maximized not when either side works alone, but when the handoff between AI and human is
              so seamless it feels like one mind thinking.&rdquo;
            </blockquote>
            <p>
              That sentence was written years before &ldquo;human-in-the-loop&rdquo; became an
              industry talking point. Ubik spent three and a half years trying to actually earn it.
            </p>
          </section>
  )
}
