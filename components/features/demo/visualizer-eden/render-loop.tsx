/** React Three Fiber and the render loop. Moved verbatim from app/demo/visualizer-eden/page.tsx. */
export function RenderLoopSection() {
  return (
          <section className="space-y-4">
            <h2 className="aka-lead">
              React Three Fiber and the render loop
            </h2>
            <p>
              The scene is a{' '}
              <code className="rounded bg-muted/50 px-1 py-0.5 text-[13px] text-foreground/85">
                @react-three/fiber
              </code>{' '}
              <code className="rounded bg-muted/50 px-1 py-0.5 text-[13px] text-foreground/85">
                Canvas
              </code>
              . The blob is a Three.js mesh with a{' '}
              <code className="rounded bg-muted/50 px-1 py-0.5 text-[13px] text-foreground/85">
                ShaderMaterial
              </code>
              , not a stack of built-in materials: everything interesting happens in strings you own.
              Each animation tick,{' '}
              <code className="rounded bg-muted/50 px-1 py-0.5 text-[13px] text-foreground/85">
                useFrame
              </code>{' '}
              copies fresh audio scalars and UI control values into material uniforms (time, play state,
              band levels, reactivity gain, palette colors, and dozens of “physics” and mode toggles).
              That keeps a single source of truth: the React tree for controls, the GPU for look.
            </p>
          </section>
  )
}
