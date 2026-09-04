/** How it works. Moved verbatim from app/demo/hologram/page.tsx. */
export function HowItWorksSection() {
  return (
          <section className="space-y-4">
            <h2 className="aka-lead">How it works</h2>
            <p>
              No framework, no build step, no database — a stdlib{' '}
              <code className="aka-code">ThreadingHTTPServer</code> with SSE and vanilla JS, an
              append-only JSONL log the dashboard tails by watching byte size, and a bpy-free Asset
              API parsed with pygltflib. Blender is driven over a socket, never imported, so import
              purity holds.
            </p>
            <pre className="overflow-x-auto aka-card-well rounded-lg p-4 text-[11.5px] leading-relaxed text-foreground/80">
{`your pipeline ──┐
Claude Code  ───┼──> .hologram/events.jsonl ──> dashboard (SSE live tail)
MCP server   ──┘                                    │
                                                    └─> /api/inspect ─> pygltflib
live Blender ──(socket :9876)── render_asset ─> PNG`}
            </pre>
          </section>
  )
}
