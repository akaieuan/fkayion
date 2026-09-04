/** How I describe the skill set. Moved verbatim from app/demo/trickle-ui-kit/page.tsx. */
export function SkillSetSection() {
  return (
          <section className="space-y-4">
            <h2 className="aka-lead">How I describe the skill set</h2>
            <p>
              Modern CSS animation engineering (keyframes, the{' '}
              <code className="aka-code">@property</code>{' '}
              rule for typed custom properties,{' '}
              <code className="aka-code">mask-composite</code>,{' '}
              <code className="aka-code">clip-path</code>{' '}
              polygons, conic and radial gradients,{' '}
              <code className="aka-code">backdrop-filter</code>); SSR-safe React patterns and the discipline to keep 42 of 47 components as
              pure RSCs; shadcn registry CLI authoring (manifest schema,{' '}
              <code className="aka-code">cssVars</code>{' '}
              merge,{' '}
              <code className="aka-code">registryDependencies</code>, transitive resolution); Tailwind v4{' '}
              <code className="aka-code">@theme</code>{' '}
              tokens; Next.js 15 App Router; TypeScript strict; design rubric authorship; accessibility
              (reduced-motion as a first-class build axis); and the willingness to delete four
              components from a draft because they failed the motion-signature test.
            </p>
          </section>
  )
}
