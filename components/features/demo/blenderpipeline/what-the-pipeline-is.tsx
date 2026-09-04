/** What the pipeline is. Moved verbatim from app/demo/blenderpipeline/page.tsx. */
export function WhatThePipelineIsSection() {
  return (
          <section className="space-y-3">
            <h2 className="aka-lead">What the pipeline is</h2>
            <p>
              Four stages, each with a contract at its edge. Python generates geometry through
              Blender&apos;s API. Blender exports glTF 2.0. A browser preview layer built on
              Three.js renders the result for inspection without opening the engine. Godot imports
              the same file the preview did.
            </p>
            <p>
              Every asset is therefore a source file, not a binary. It diffs. It reviews. A palette
              change or a rule change rebuilds the whole set, and two people can work on the same
              character without either of them owning a .blend file nobody else can open. Preview
              tooling in the browser is the kind of thing you normally only see where a tools team
              exists; I built it for myself so iteration does not cost an engine round trip.
            </p>
          </section>
  )
}
