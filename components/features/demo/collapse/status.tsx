/** Status & roadmap. Moved verbatim from app/demo/collapse/page.tsx. */
export function StatusSection() {
  return (
          <section className="space-y-3">
            <h2 className="aka-lead">Status &amp; roadmap</h2>
            <p>
              Active development. Shipped: the MDX ingestor (<code className="aka-code">&lt;LangTab&gt;</code>{' '}
              / <code className="aka-code">&lt;Note&gt;</code> model, 21 reference lessons), the notebook
              ingestor (.ipynb + MyST with admonition prefill), the template engine with
              cross-language equivalents, the atomic persistence layer with 409 handling, the
              three-tier quality linter, the lesson + import + skills-directory UIs, the MCP server
              scaffold output (v0.2) as a second output target sharing the template engine, and a
              green Vitest suite (99 tests). On the roadmap: multi-cell notebook composition and a
              MyST chapter URL fetcher.
            </p>
            <p className="text-[12px] text-muted-foreground/70">
              TypeScript 5 · Next.js 16 (App Router, RSC, Turbopack) · Tailwind v4 · shadcn/ui · Shiki
              · Zod 4 · Vitest · Node 20+ · local filesystem
            </p>
          </section>
  )
}
