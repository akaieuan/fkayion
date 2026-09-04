/** Status & roadmap. Moved verbatim from app/demo/hologram/page.tsx. */
export function StatusSection() {
  return (
          <section className="space-y-3">
            <h2 className="aka-lead">Status &amp; roadmap</h2>
            <p>
              Shipped so far: the live dashboard + MCP surface (v0.1), failures + GLB previews +{' '}
              <code className="aka-code">hologram watch</code> (v0.2), the read-only checks engine + asset
              visualizer (v0.3), agent vision + regression diffing + pipeline_status (v0.4), and
              guided skills as the plugin&apos;s front door (v0.5). The current release on PyPI is
              v0.6.0. Still on the table, built on the stable Asset API: an offline/headless render path (no running Blender), render
              thumbnails on disk, asset/scene templates, and export orchestration. MIT licensed.
            </p>
          </section>
  )
}
