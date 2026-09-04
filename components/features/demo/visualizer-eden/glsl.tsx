/** GLSL: what the vertex shader actually does. Moved verbatim from app/demo/visualizer-eden/page.tsx. */
export function GlslSection() {
  return (
          <section className="space-y-4">
            <h2 className="aka-lead">
              GLSL: what the vertex shader actually does
            </h2>
            <p>
              The vertex stage builds an{' '}
              <code className="rounded bg-muted/50 px-1 py-0.5 text-[13px] text-foreground/85">
                audioIntensity
              </code>{' '}
              term from volume plus weighted bass, mid, and high. That scalar modulates how hard
              procedural motion runs: multi-octave value noise (fbm), sine wave stacks for “liquid”
              motion, surface-tension ripples, elasticity-style bounce, optional puddle flattening,
              goopiness and liquidity channels, split and tentacle modes, and a base fbm layer scaled by
              user noise parameters. When audio is playing, an extra normal-aligned displacement term
              scales with{' '}
              <code className="rounded bg-muted/50 px-1 py-0.5 text-[13px] text-foreground/85">
                audioReactivity
              </code>{' '}
              and per-band weights so kicks read differently from hiss.
            </p>
            <p>
              Fragment-side, the shader handles multi-color blending, metallic and contrast controls, and
              the surface look that sells each preset (glass vs goo vs pearl is mostly uniform math, not
              separate scenes). The point is not photoreal PBR: it is a controllable, expressive surface
              that stays within a predictable cost because you wrote the math.
            </p>
          </section>
  )
}
