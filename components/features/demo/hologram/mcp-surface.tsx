/** The MCP surface. Moved verbatim from app/demo/hologram/page.tsx. */
export function McpSurfaceSection() {
  return (
          <section className="space-y-4">
            <h2 className="aka-lead">The MCP surface</h2>
            <p>
              The server imports no project code — it only reads files and your config. An agent gets
              five tools — four read-only, plus a non-destructive render:
            </p>
            <ul className="aka-list space-y-2">
              <li>
                <code className="aka-code">list_assets</code> — enumerate exported GLBs, grouped by
                category.
              </li>
              <li>
                <code className="aka-code">inspect_asset</code> — parse one GLB into the flat Asset struct
                (nodes, animations, materials, skins…).
              </li>
              <li>
                <code className="aka-code">render_asset</code> — render a GLB to a PNG via the live
                Blender. Non-destructive; returns a clear <code className="aka-code">{'{error, hint}'}</code>{' '}
                if Blender isn&apos;t reachable.
              </li>
              <li>
                <code className="aka-code">tail_events</code> — read recent pipeline activity from the
                shared event log.
              </li>
              <li>
                <code className="aka-code">pipeline_status</code> — &ldquo;what&apos;s wrong right
                now&rdquo;: recent failures, the last check summary, and recent asset diffs, from one
                read of the log.
              </li>
            </ul>
          </section>
  )
}
