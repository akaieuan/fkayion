/** How it's delivered. Moved verbatim from app/demo/hologram/page.tsx. */
export function DeliveredSection() {
  return (
          <section className="space-y-4">
            <h2 className="aka-lead">How it&apos;s delivered</h2>
            <p>
              Four pieces, each install-free. The plugin bundles a stdlib-only activity hook (logging
              sessions, shell commands, edits, and MCP calls), the five MCP tools, and the five guided
              skills — wired in one step. The dashboard is the one piece you launch yourself, by
              design: a Claude Code plugin contributes hooks, commands, and MCP servers, not
              long-running web servers.
            </p>
            <pre className="overflow-x-auto aka-card-well rounded-lg p-4 text-[11.5px] leading-relaxed text-foreground/80">
{`# the dashboard — point it at any project with exported GLBs
uvx --from hologram-gltf hologram dashboard

# the Claude Code plugin — live feed + MCP tools + skills
/plugin marketplace add akaieuan/Hologram
/plugin install hologram`}
            </pre>
            <p>
              <code className="aka-code">uvx</code> downloads the code (and a matching Python 3.10+) the
              first time and caches it, so there&apos;s no release to download and no environment to
              maintain. Prefer a classic install?{' '}
              <code className="aka-code">pip install hologram-gltf</code> (or, from a clone,{' '}
              <code className="aka-code">pip install -e .</code>) still gives you a plain{' '}
              <code className="aka-code">hologram</code> command.
            </p>
          </section>
  )
}
