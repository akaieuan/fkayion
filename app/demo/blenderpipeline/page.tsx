import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { RenderPair } from '@/components/demo/bkz-lab-log/prose'
import { LAB_ENTRIES } from '@/components/demo/bkz-lab-log/entries'

export const metadata = {
  title: 'Brooklyn Dead: procedural asset pipeline | akaBuild',
  description:
    'A private Godot 4 game whose 3D assets are written rather than modelled: Blender Python, glTF, programmatic animation, and validators that gate every rebuild.',
}

const skills = [
  'Procedural modelling',
  'Blender Python',
  'Technical art',
  'glTF 2.0',
  'Godot 4',
  'Three.js',
  'Keyframe / NLA animation',
  'PBR materials',
  'Pipeline engineering',
  'Test design',
]

export default function BlenderPipelinePage() {
  const entry = LAB_ENTRIES[0]

  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <article className="mx-auto max-w-2xl">
        <Link
          href="/demo"
          className="mb-10 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Projects
        </Link>

        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/80">
          Private work in progress
        </p>
        <h1 className="mt-2 text-2xl font-light tracking-tight text-foreground md:text-[26px]">
          Brooklyn Dead
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          A game whose art is written, not modelled. Blender Python → glTF → Godot 4.
        </p>

        <div className="mt-10 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">The game</h2>
            <p>
              Brooklyn Dead is a survival game I am building in private, in Godot 4. It has the
              shape you would expect from the genre: characters you outfit, mobs in tiers, weapons
              in a taxonomy, and crafting stations that get better as you do. The design work sits
              in spec documents. The part I can put on record here is everything underneath it,
              because the interesting problem in a game this size is not any one asset. It is that
              there are hundreds of them and one person making them.
            </p>
            <p>
              So none of them are modelled by hand. A Python file describes an asset and Blender
              builds it. Characters, weapons, mobs, furniture, vehicles and crafting stations all
              come out of code, along with their materials, their modifiers and their animations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">What the pipeline is</h2>
            <p>
              Four stages, each with a contract at its edge. Python generates geometry through
              Blender&apos;s API. Blender exports glTF 2.0. A browser preview layer built on
              Three.js renders the result for inspection without opening the engine. Godot imports
              the same file the preview did.
            </p>
            <p>
              Every asset is therefore a source file, not a binary. It diffs. It reviews. A palette
              change or a rule change rebuilds the whole set, and two people can work on the same
              character without either of them owning a .blend file nobody else can open. Preview
              tooling in the browser is the kind of thing you normally only see where a tools team
              exists; I built it for myself so iteration does not cost an engine round trip.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              Generated art needs gates
            </h2>
            <p>
              This is the part that makes it a pipeline rather than a folder of scripts. Assets that
              are built rather than saved can regress silently: someone changes a shared constant,
              every character rebuilds, and nothing tells you that eleven of them are now subtly
              wrong. Hand-modelled art fails loudly, in a viewport, in front of the person who made
              it. Generated art fails at three in the morning in a build log.
            </p>
            <p>
              So the generators are gated. Validators run on every rebuild and check the things a
              human would have noticed by eye: that hair covers the scalp, that geometry has not
              sunk inside the body it sits on, that triangle budgets hold, that attachment sockets
              still point the way the engine expects.
            </p>
            <p>
              Writing those tests turns out to be harder and more interesting than writing the
              generators. A test for generated geometry has to measure against something, and
              choosing what it measures against is the whole game.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              What that looks like when it goes wrong
            </h2>
            <p>
              The clearest example I have: a coverage gate that had returned a perfect score for
              months while the render disagreed with it. Both images below come from the same
              script, the same camera and the same lights. The only thing that changed is the
              surface the hair was built against.
            </p>
            <RenderPair
              before="/bkz/buzz-front-before.webp"
              after="/bkz/buzz-front-after.webp"
              alt="The buzz hair style rendered from the front"
              caption="**buzz, from the front.** On the left, a dome that swallows the forehead. On the right, the same generator seated on the real skull. No art direction changed between them."
            />
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">The lab log</h2>
            <p>
              Findings like that one get written up rather than fixed and forgotten. The lab log is
              where the methodology lives: what broke, how it was measured, what the numbers said
              before and after, and what I decided not to change. It is the record I would want if I
              came back to this codebase in a year.
            </p>

            <Link
              href="/demo/blenderpipeline/bkz-lab-log"
              className="group mt-2 block rounded-xl border border-border/80 bg-muted/15 px-5 py-4 transition-colors hover:border-foreground/25"
            >
              <span className="flex items-center justify-between gap-4">
                <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground/70">
                  BKZ lab log · {LAB_ENTRIES.length}{' '}
                  {LAB_ENTRIES.length === 1 ? 'entry' : 'entries'}
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/60 transition-colors group-hover:text-foreground" />
              </span>
              <span className="mt-2 block text-[15px] text-foreground">{entry.title}</span>
              <span className="mt-1 block text-[14px] leading-relaxed text-muted-foreground">
                {entry.standfirst}
              </span>
            </Link>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              Animation, in code
            </h2>
            <p>
              Motion is authored the same way the meshes are. A helper layer wraps keyframing so a
              drawer, a door, a drop-front or a looping crafting cycle is described by its
              behaviour: Bezier easing, NLA assembly, staggered timing across parts that have to
              move together. Interaction metadata rides along with it, so hitboxes and facing
              empties arrive in the engine already named and placed.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Cross-tool contracts</h2>
            <p>
              Three tools have to agree about which way is up, where a weapon attaches, and what a
              socket is called. None of that is left implied. Axes and attachment sockets are
              specified and named by convention, and the naming is enforced by the same gates that
              check the geometry, because a contract nothing verifies is a comment.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">
              How I describe the skill set
            </h2>
            <ul className="flex flex-wrap gap-1.5 pl-0">
              {skills.map((s) => (
                <li
                  key={s}
                  className="list-none rounded-md border border-border/70 px-2.5 py-1 text-[12px] text-muted-foreground"
                >
                  {s}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-border/80 bg-muted/15 px-5 py-4">
            <p className="text-[14px] leading-relaxed text-foreground/85">
              Most people either make art or write code. I write code that makes art, and then I
              write the tests that decide whether the art is right. The assets are the output. The
              pipeline is the thing I actually built.
            </p>
          </section>
        </div>
      </article>
    </div>
  )
}
