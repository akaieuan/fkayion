/** How I describe the skill set. Moved verbatim from app/demo/eval-kit/page.tsx. */
export function SkillSetSection() {
  return (
          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">How I describe the skill set</h2>
            <p>
              This project is the load-bearing example for how I work in TypeScript and AI
              infrastructure right now.
            </p>
            <ul className="list-disc space-y-2.5 pl-5 marker:text-muted-foreground/50">
              <li>
                <strong className="font-medium text-foreground/85">Schema-first design.</strong> Zod schemas
                in <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">packages/core/src/schema.ts</code> are the source of truth for every persisted shape. TS
                types are inferred via <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">z.infer</code>. <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">parseX</code> helpers are the
                only validation entry points. New shapes can&apos;t enter the system without going through
                the schema.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">Workspace monorepo discipline.</strong> pnpm
                workspaces, ESM-only with explicit <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">.js</code> extensions, <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">noUncheckedIndexedAccess</code> on, tsup builds, vitest
                tests. Each package has its own <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">package.json</code>, <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">tsconfig</code>, and CI step.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">Anthropic SDK at production-shape.</strong> Real
                tool-use loop with prompt caching on system + tool blocks, max-iteration guards, and a
                structured pre-fill helper that returns a typed <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">StepScore</code> draft for human review.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">OSS-grade release engineering.</strong> GitHub
                Actions matrix CI on Ubuntu and macOS across Node 20 and 22. Trusted Publishing (OIDC)
                with provenance attestations; the failure mode where it didn&apos;t match per-package
                permissions got documented in the CHANGELOG, not hidden.
              </li>
              <li>
                <strong className="font-medium text-foreground/85">Design that pushes back.</strong> I keep a
                §13 &quot;Philosophical guardrails&quot; section in the brief that names the rules a
                feature request can&apos;t violate. When I caught myself drifting toward an LLM-judge
                auto-approval flow during v0.5 design, the rule said no. The project loses its reason
                to exist if I crossed it. I rejected my own suggestion.
              </li>
            </ul>
          </section>
  )
}
