/** What I actually built. Moved verbatim from app/demo/trickle-ui-kit/page.tsx. */
export function WhatIBuiltSection() {
  return (
          <section className="space-y-4">
            <h2 className="aka-lead">What I actually built</h2>
            <ul className="aka-list space-y-2.5">
              <li>
                <span className="text-foreground/85">A 47-component catalog organised by mechanism.</span>{' '}
                Reveal animations (TextReveal, Typewriter, Shatter, Pixelate, Wireframe, Stamp,
                Compress, Tear, Mosaic, Halftone, Grain, Bounce, SpinIn, ScaleSlam, Shutter, others).
                Continuous loops (GradientShift, AuroraText, WordRotate, Wave, Wobble3D, Float,
                RainbowRoll, Flutter, PulseText, Spotlight, Magnetize, Plasma, MarqueeRibbon, Phase,
                NeonFlicker, CarouselFlip). Special-purpose effects (DecryptScramble, InkBleed,
                ConfettiText, GlitchSplit, UnderlineDraw, Echo, Reflect, Stretch, Scanline,
                StaticText).
              </li>
              <li>
                <span className="text-foreground/85">A shadcn-compatible registry I authored from scratch.</span>{' '}
                <code className="aka-code">registry.json</code>{' '}
                feeds <code className="aka-code">shadcn build</code>, which generates a JSON manifest per component at{' '}
                <code className="aka-code">public/r/&lt;name&gt;.json</code>. Every endpoint resolves transitive dependencies (the{' '}
                <code className="aka-code">TextRoot</code> shell, the per-component CSS-variable tokens, the keyframes block, the
                reduced-motion override) so that one CLI command installs a working component into any
                consuming repo.
              </li>
              <li>
                <span className="text-foreground/85">A{' '}
                <code className="aka-code">TextRoot</code> orchestration shell.</span>{' '}
                Components that need lifecycle awareness (mount-trigger, view-trigger,
                reduced-motion) compose a{' '}
                <code className="aka-code">useTextRoot</code> hook. Pure-CSS components don&apos;t import it at all — they remain plain RSCs.
                The server renders with{' '}
                <code className="aka-code">ready=false</code>{' '}
                so the static fallback is visible without JS; the client hydrates and flips on the
                animation. No flash, no hydration mismatch.
              </li>
              <li>
                <span className="text-foreground/85">
                  Sub-character techniques without a JS runtime.
                </span>{' '}
                Shatter breaks each letter into four{' '}
                <code className="aka-code">clip-path</code>{' '}
                shards that converge from random offsets. Pixelate resolves through a 6-step
                crossed-gradient mask that reads as a true 8-bit pixel grid. Wireframe drops in as a
                stroke outline, refines, and fills. CarouselFlip positions characters on an invisible
                3D ring, spins three full revolutions, then unwraps and snaps into the spelled word.
                None of this uses{' '}
                <code className="aka-code">requestAnimationFrame</code>; it&apos;s all keyframes and{' '}
                <code className="aka-code">@property</code>-typed CSS variables.
              </li>
              <li>
                <span className="text-foreground/85">A docs site that is the spec.</span> Next.js 15
                App Router, Tailwind v4, dark-mode-first. The catalog is interactive — every strip has
                a tweak panel (per-component CSS-variable controls) and a replay button. There&apos;s
                an{' '}
                <code className="aka-code">/audit</code>{' '}
                route for single-strip QA renders, and an install-reference page with copy buttons for
                every shadcn command.
              </li>
              <li>
                <span className="text-foreground/85">Reduced-motion as a first-class concern.</span>{' '}
                Every keyframe ships with a{' '}
                <code className="aka-code">@media (prefers-reduced-motion: reduce)</code>{' '}
                override that skips to the final visible state. The five JS-orchestrated components
                also expose{' '}
                <code className="aka-code">prefersReducedMotion</code>{' '}
                from{' '}
                <code className="aka-code">useTextRoot</code>{' '}
                so they can short-circuit too.
              </li>
              <li>
                <span className="text-foreground/85">Build-and-validate tooling.</span>{' '}
                <code className="aka-code">pnpm new &lt;name&gt;</code>{' '}
                scaffolds a component plus a registry entry from a template.{' '}
                <code className="aka-code">pnpm registry:build</code>{' '}
                regenerates the public manifests.{' '}
                <code className="aka-code">pnpm registry:validate</code>{' '}
                Zod-checks every JSON in CI so a malformed entry can&apos;t reach the registry.
              </li>
            </ul>
          </section>
  )
}
