import { code } from '@/components/features/demo/collapse/shared'

/** How it works. Moved verbatim from app/demo/collapse/page.tsx. */
export function HowItWorksSection() {
  return (
          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">How it works</h2>
            <p>
              A three-layer pipeline — each boundary is a TypeScript interface, and no layer reaches
              into another. Type-safe by construction (ingestors produce a typed input the engine
              consumes without knowing the source format), stateless (the skills directory{' '}
              <em>is</em> the state, read on every request), and atomic (writes go to{' '}
              <code className={code}>.tmp</code> then <code className={code}>rename()</code>, so an
              interrupted write never leaves a partial SKILL.md).
            </p>
            <pre className="overflow-x-auto aka-card-well rounded-lg p-4 text-[11px] leading-relaxed text-foreground/80">
{`ingestor  ───▶  template engine  ───▶  persistence
(on-ramps)      lib/skill-template      /api/skills

MDX · .ipynb    generateSkillDraft()    ~/.claude/skills/{name}/SKILL.md
MyST · custom   renderSkillFile()       (v0.2: MCP server scaffold)`}
            </pre>
          </section>
  )
}
