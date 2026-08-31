/** How I describe the skill set. Moved verbatim from app/demo/trickle-ui-kit/page.tsx. */
export function SkillSetSection() {
  return (
          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">How I describe the skill set</h2>
            <p>
              Modern CSS animation engineering (keyframes, the{' '}
              <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">@property</code>{' '}
              rule for typed custom properties,{' '}
              <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">mask-composite</code>,{' '}
              <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">clip-path</code>{' '}
              polygons, conic and radial gradients,{' '}
              <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">backdrop-filter</code>); SSR-safe React patterns and the discipline to keep 42 of 47 components as
              pure RSCs; shadcn registry CLI authoring (manifest schema,{' '}
              <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">cssVars</code>{' '}
              merge,{' '}
              <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">registryDependencies</code>, transitive resolution); Tailwind v4{' '}
              <code className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]">@theme</code>{' '}
              tokens; Next.js 15 App Router; TypeScript strict; design rubric authorship; accessibility
              (reduced-motion as a first-class build axis); and the willingness to delete four
              components from a draft because they failed the motion-signature test.
            </p>
          </section>
  )
}
