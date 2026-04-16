import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Procedural Asset Pipeline Engineering | aka4uh',
  description:
    'Code-driven 3D asset production for a private Godot 4 game: Blender Python, glTF, programmatic animation, and cross-tool pipelines.',
}

export default function BrooklynDeadProjectPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <article className="mx-auto max-w-2xl">
        <Link
          href="/demo"
          className="mb-10 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Projects
        </Link>

        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/80">
          Private work in progress
        </p>
        <h1 className="mt-2 text-2xl font-light tracking-tight text-foreground md:text-[26px]">
          Procedural game asset pipeline
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Procedural Asset Pipeline Engineering (Godot 4)
        </p>

        <div className="mt-10 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">What this is</h2>
            <p>
              I&apos;m building a game in private. The public part I can share here is the{' '}
              <strong className="font-medium text-foreground/90">technical and artistic pipeline</strong>
              : a codebase that generates game-ready 3D assets from Python instead of hand-modeling
              everything in Blender. The repo is not open source, but the approach is what I want on
              record: reproducible meshes, version-controlled parameters, and a toolchain I own end to
              end.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">What I actually built</h2>
            <ul className="list-disc space-y-2 pl-5 marker:text-muted-foreground/50">
              <li>
                <span className="text-foreground/85">Procedural asset pipeline.</span> A large set of
                Python scripts generate characters, weapons, mobs, furniture, vehicles, and crafting
                stations from geometric primitives: programmatic materials, modifiers, and animations.
                Technical art meets software engineering.
              </li>
              <li>
                <span className="text-foreground/85">Blender → glTF → Godot 4.</span> Meshes and
                animations are produced in Blender via the Python API, exported as glTF 2.0 (.glb), with
                a browser-based Three.js preview layer (many interactive viewers and shared tooling) for
                validation before or alongside engine import.
              </li>
              <li>
                <span className="text-foreground/85">Programmatic animation.</span> A custom helper layer
                for keyframed motion in code: drawers, doors, drop-fronts, looping crafting cycles, Bezier
                easing, NLA assembly, staggered multi-part timing, plus interaction metadata (hitboxes,
                facing empties) that the engine can bind to.
              </li>
              <li>
                <span className="text-foreground/85">Cross-tool contracts.</span> Explicit attachment
                sockets and naming conventions so Blender, Three.js, and Godot agree on axes and
                loadouts. The handoff is specified, not implied.
              </li>
              <li>
                <span className="text-foreground/85">Systems design.</span> On paper and in spec: mob tiers,
                crafting station tiers, weapon taxonomy, and implementation notes that match how the art
                pipeline feeds the game.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Why it&apos;s unusual</h2>
            <p>
              A lot of indie workflows lean on sculpted assets or store-bought packs. Big studios split
              &quot;artist&quot; and &quot;tools.&quot; This sits in between:{' '}
              <strong className="font-medium text-foreground/90">
                I write code that produces art
              </strong>
              , and I built the pipeline so assets stay parameterized, diffable in source, and rebuildable
              from a palette or rule change. Preview tooling in the browser is the kind of dev-experience
              investment you usually see when a dedicated tools team exists; I put it in place for myself
              so I can iterate without constantly round-tripping the full engine.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">How I describe the skill set</h2>
            <p className="text-[14px] leading-relaxed">
              Procedural modeling, Blender Python, technical art, glTF 2.0, Godot 4, Three.js, programmatic
              animation (keyframes / NLA), PBR materials, cross-tool coordinate and socket contracts, asset
              pipeline engineering, and game systems thinking on top of the content stack.
            </p>
          </section>

          <section className="rounded-xl border border-border/80 bg-muted/15 px-5 py-4">
            <p className="text-[14px] leading-relaxed text-foreground/85">
              Most people either make art or write code. I write code that makes art, and I built the
              toolchain so every asset is reproducible and parameterized. I don&apos;t only use tools: I
              build the tools that make the assets.
            </p>
          </section>
        </div>
      </article>
    </div>
  )
}
