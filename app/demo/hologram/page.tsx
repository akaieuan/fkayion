import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

const code = 'rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]'

export const metadata = {
  title: 'Hologram — Live Observability for Blender → glTF Pipelines | akaBuild',
  description:
    'Live observability and a read-only MCP surface for Blender → glTF pipelines. Watch your AI agent work on your game assets in real time, and hand the same pipeline back to the agent as read-only MCP tools.',
}

export default function HologramProjectPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <article className="mx-auto max-w-2xl">
        <Link
          href="/demo"
          className="mb-8 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Projects
        </Link>

        <header className="mb-6">
          <p
            className="text-[clamp(1.85rem,5.5vw,2.85rem)] font-extralight leading-none tracking-tight text-balance"
            aria-label="Hologram"
          >
            <span className="text-foreground/90">◇ Hologram</span>
          </p>
        </header>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href="https://github.com/akaieuan/Hologram"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            GitHub — akaieuan/Hologram
            <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
          </a>
        </div>
        <p className="mt-2 text-[12px] font-light text-muted-foreground/80">
          Open source, MIT. No release to download — <code className={code}>uvx</code> fetches and runs
          it on demand. Part of the{' '}
          <Link href="/demo/akaoss" className="underline decoration-border underline-offset-[3px] transition-colors hover:text-foreground hover:decoration-foreground/50">akaOSS</Link>{' '}
          studio.
        </p>

        <p className="mt-10 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/80">
          Open source · MCP + Blender · MIT
        </p>
        <h1 className="mt-2 text-2xl font-light tracking-tight text-foreground md:text-[26px]">
          Hologram
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Live observability and a read-only MCP surface for Blender → glTF pipelines. Watch your AI
          agent work on your game assets in real time.{' '}
          <a
            href="https://github.com/akaieuan/Hologram"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-border hover:decoration-foreground/60 underline-offset-[3px] transition-colors"
          >
            github.com/akaieuan/Hologram
          </a>
        </p>

        <div className="mt-10 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">What this is</h2>
            <p>
              Hologram watches a glTF asset pipeline and streams what&apos;s happening to a local
              dashboard in real time — including the tool calls your AI coding agent is making right
              now. It also exposes the pipeline to agents through a small MCP server, so Claude (or
              any MCP client) can enumerate, introspect, render, and health-check your exported{' '}
              <code className={code}>.glb</code> assets. The Claude Code plugin wraps all of it in
              guided skills (<code className={code}>/hologram:start</code>, inspect, check, status,
              create-skill) so you can drive the pipeline in plain language.
            </p>
            <p>
              It stays deliberately{' '}
              <strong className="font-medium text-foreground/90">read-only and non-destructive</strong>
              : it observes, introspects, validates, and previews your pipeline — but it never
              modifies your assets, and the MCP server imports none of your project code. No
              framework, no build step, no database — a stdlib HTTP server, a JSONL event log, and
              pure-Python glTF parsing.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Why I built it</h2>
            <p>
              I build games with my friend, and the bulk of my asset work runs through Blender into
              glTF — characters, props, weapons, the lot. At some point my AI coding agent became a
              real part of that pipeline: it writes the Blender scripts, runs the exports, and
              rearranges the <code className={code}>.glb</code> files I ship. That was a huge speed-up,
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

          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">The MCP surface</h2>
            <p>
              The server imports no project code — it only reads files and your config. An agent gets
              five tools — four read-only, plus a non-destructive render:
            </p>
            <ul className="list-disc space-y-2 pl-5 marker:text-muted-foreground/50">
              <li>
                <code className={code}>list_assets</code> — enumerate exported GLBs, grouped by
                category.
              </li>
              <li>
                <code className={code}>inspect_asset</code> — parse one GLB into the flat Asset struct
                (nodes, animations, materials, skins…).
              </li>
              <li>
                <code className={code}>render_asset</code> — render a GLB to a PNG via the live
                Blender. Non-destructive; returns a clear <code className={code}>{'{error, hint}'}</code>{' '}
                if Blender isn&apos;t reachable.
              </li>
              <li>
                <code className={code}>tail_events</code> — read recent pipeline activity from the
                shared event log.
              </li>
              <li>
                <code className={code}>pipeline_status</code> — &ldquo;what&apos;s wrong right
                now&rdquo;: recent failures, the last check summary, and recent asset diffs, from one
                read of the log.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">How it works</h2>
            <p>
              No framework, no build step, no database — a stdlib{' '}
              <code className={code}>ThreadingHTTPServer</code> with SSE and vanilla JS, an
              append-only JSONL log the dashboard tails by watching byte size, and a bpy-free Asset
              API parsed with pygltflib. Blender is driven over a socket, never imported, so import
              purity holds.
            </p>
            <pre className="overflow-x-auto rounded-lg border border-border/80 bg-muted/30 p-4 text-[11.5px] leading-relaxed text-foreground/80">
{`your pipeline ──┐
Claude Code  ───┼──> .hologram/events.jsonl ──> dashboard (SSE live tail)
MCP server   ──┘                                    │
                                                    └─> /api/inspect ─> pygltflib
live Blender ──(socket :9876)── render_asset ─> PNG`}
            </pre>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">How it&apos;s delivered</h2>
            <p>
              Four pieces, each install-free. The plugin bundles a stdlib-only activity hook (logging
              sessions, shell commands, edits, and MCP calls), the five MCP tools, and the five guided
              skills — wired in one step. The dashboard is the one piece you launch yourself, by
              design: a Claude Code plugin contributes hooks, commands, and MCP servers, not
              long-running web servers.
            </p>
            <pre className="overflow-x-auto rounded-lg border border-border/80 bg-muted/30 p-4 text-[11.5px] leading-relaxed text-foreground/80">
{`# the dashboard — point it at any project with exported GLBs
uvx --from hologram-gltf hologram dashboard

# the Claude Code plugin — live feed + MCP tools + skills
/plugin marketplace add akaieuan/Hologram
/plugin install hologram`}
            </pre>
            <p>
              <code className={code}>uvx</code> downloads the code (and a matching Python 3.10+) the
              first time and caches it, so there&apos;s no release to download and no environment to
              maintain. Prefer a classic install?{' '}
              <code className={code}>pip install hologram-gltf</code> (or, from a clone,{' '}
              <code className={code}>pip install -e .</code>) still gives you a plain{' '}
              <code className={code}>hologram</code> command.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Status &amp; roadmap</h2>
            <p>
              Shipped so far: the live dashboard + MCP surface (v0.1), failures + GLB previews +{' '}
              <code className={code}>hologram watch</code> (v0.2), the read-only checks engine + asset
              visualizer (v0.3), agent vision + regression diffing + pipeline_status (v0.4), and
              guided skills as the plugin&apos;s front door (v0.5). The current release on PyPI is
              v0.6.0. Still on the table, built on the stable Asset API: an offline/headless render path (no running Blender), render
              thumbnails on disk, asset/scene templates, and export orchestration. MIT licensed.
            </p>
          </section>

          <section className="rounded-xl border border-border/80 bg-muted/15 px-5 py-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Why it&apos;s different</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-foreground/85">
              Plenty of tools inspect a <code className={code}>.glb</code>. Hologram is the only one
              that puts a live feed of your agent&apos;s pipeline activity next to the assets it&apos;s
              producing, and hands that same pipeline to the agent as MCP tools — now including a
              render, so the agent can see an export, not just count its nodes.
            </p>
          </section>
        </div>
      </article>
    </div>
  )
}
