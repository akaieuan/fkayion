import { code } from '@/components/features/demo/three-examples/shared'

/** The liquid orb: what the two shader stages actually do. */
export function TheLiquidOrbSection() {
  return (
    <section className="space-y-4">
      <h2 className="text-sm font-medium tracking-wide text-foreground">The liquid orb</h2>
      <p>
        The orb is one Three.js mesh carrying a <code className={code}>ShaderMaterial</code> with
        both stages written by hand. The vertex stage stacks three sine waves for the wave motion,
        adds a bulge term from multi-octave value noise (a six-octave fbm), and a viscous stretch
        along the vertical so the blob reads as liquid rather than as a wobbling sphere. When the
        cursor is over the canvas, vertices near it are pulled toward it, bulged, and rippled, so
        the surface answers you instead of just looping.
      </p>
      <p>
        The fragment stage does the material: a fresnel term that foams the rim, a fake subsurface
        scatter from above, cavity shadows in the crevices, film grain, and a saturation push at the
        end. The three small droplets orbiting the main body are the one part that is not custom
        GLSL: they are <code className={code}>meshPhysicalMaterial</code> spheres with clearcoat,
        because a stock material was already the right look there and a shader would have been
        vanity.
      </p>
      <p>
        The card this page has on the projects wall is the same object again, written a third way.
        A plate cannot import Three.js without handing the whole projects page a payload it has no
        use for, so the orb is restated there as a single raymarched fragment shader carrying the
        same displacement, the same palette and the same rotation. Three renderings of one shape,
        and the arithmetic is the part that travels.
      </p>
    </section>
  )
}
