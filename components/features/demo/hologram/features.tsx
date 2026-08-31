import { code } from '@/components/features/demo/hologram/shared'

/** Features. Moved verbatim from app/demo/hologram/page.tsx. */
export function FeaturesSection() {
  return (
          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Features</h2>
            <ul className="list-disc space-y-2 pl-5 marker:text-muted-foreground/50">
              <li>
                <span className="text-foreground/85">Live activity feed.</span> A Server-Sent-Events
                dashboard that tails an append-only event log. Sessions, shell commands, file edits,
                MCP calls, and slash-command invocations stream in as they happen — failures and
                in-flight work included.
              </li>
              <li>
                <span className="text-foreground/85">Asset visualizer.</span> Browse exported GLBs
                grouped by category, click any one to introspect its glTF structure, and see an
                in-browser preview of the model.
              </li>
              <li>
                <span className="text-foreground/85">Agent vision.</span>{' '}
                <code className={code}>render_asset</code> renders a GLB to an image through your live
                Blender, so the agent can see an export — not just count its nodes. Non-destructive (a
                throwaway scene, your scene restored) and degrades to a clear error when Blender
                isn&apos;t running.
              </li>
              <li>
                <span className="text-foreground/85">Read-only checks + regression diffing.</span>{' '}
                <code className={code}>hologram check</code> runs assertions you author in{' '}
                <code className={code}>.hologram/checks.py</code> over each asset (naming, root count,
                whatever you like) and fingerprints every asset, so the dashboard can answer
                &ldquo;what changed since the last check.&rdquo; Checks can&apos;t modify anything and
                never run inside the MCP server.
              </li>
              <li>
                <span className="text-foreground/85">Guided skills.</span> The plugin bundles five
                Claude Code skills as a natural-language front door:{' '}
                <code className={code}>/hologram:start</code>, inspect, check, status, and
                create-skill.
              </li>
              <li>
                <span className="text-foreground/85">Pure-Python glTF introspection.</span> Nodes,
                hierarchy, animations, materials, skins, and meshes, parsed with pygltflib. No Blender
                required.
              </li>
              <li>
                <span className="text-foreground/85">Generic by config.</span> A single{' '}
                <code className={code}>hologram.toml</code> describes your paths and an optional
                category taxonomy. Flat projects need no categories at all.
              </li>
            </ul>
          </section>
  )
}
