/** Why I built it. Moved verbatim from app/demo/hologram/page.tsx. */
export function WhyIBuiltItSection() {
  return (
          <section className="space-y-3">
            <h2 className="aka-lead">Why I built it</h2>
            <p>
              I build games with my friend, and the bulk of my asset work runs through Blender into
              glTF — characters, props, weapons, the lot. At some point my AI coding agent became a
              real part of that pipeline: it writes the Blender scripts, runs the exports, and
              rearranges the <code className="aka-code">.glb</code> files I ship. That was a huge speed-up,
              right up until I realised I had no real idea what it was doing. Assets changed, exports
              appeared, and I&apos;d be scrolling back through a terminal trying to reconstruct which
              step touched which file.
            </p>
            <p>
              Hologram closes that gap. It tails a single event log and shows the agent&apos;s live
              activity — edits, shell commands, exports — right next to the assets those actions
              produce, in one local dashboard. Then it hands the agent that same pipeline back as a
              few read-only MCP tools, so we end up looking at the same picture instead of talking
              past each other. It started life as pipeline-specific glue buried inside one game&apos;s
              repo; this is the clean-room version — none of that project&apos;s code and none of its
              assumptions, just the pattern pulled out and made generic.
            </p>
          </section>
  )
}
