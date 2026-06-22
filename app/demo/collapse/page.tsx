import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { DemoImage } from '@/components/ui/demo-image'

const code = 'rounded bg-muted/60 px-1 py-0.5 font-mono text-[12px]'
const microLabel =
  'text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70'

type Shot = { src: string; w: number; h: number; label: string }

const hero: Shot = { src: '/collapse-home.webp', w: 1600, h: 1000, label: 'Concepts index' }
const gallery: Shot[] = [
  { src: '/collapse-lesson.webp', w: 1600, h: 1000, label: 'Annotated lesson — hover a token to reveal the note' },
  { src: '/collapse-grid.webp', w: 1600, h: 1000, label: 'Cross-stack grid — quantum audio encoding' },
  { src: '/collapse-grid-vue.webp', w: 1600, h: 1000, label: 'Cross-stack grid — Next.js vs Vue reactivity' },
  { src: '/collapse-import.webp', w: 1600, h: 1000, label: 'Notebook import — admonition prefill' },
  { src: '/collapse-skills.webp', w: 1600, h: 1000, label: '~/.claude/skills/ directory viewer' },
]

export const metadata = {
  title: 'Collapse — Pattern → SKILL.md Compiler for Claude Code | akaBuild',
  description:
    'A Claude Code skill-building framework: three pluggable ingestors (MDX lessons, Jupyter notebooks, custom) feed a typed pipeline that compiles each pattern into a SKILL.md and atomically writes it to ~/.claude/skills/. Next.js 16 + TypeScript.',
}

export default function CollapseProjectPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <article className="mx-auto max-w-2xl">
        <Link
          href="/demo"
          className="mb-8 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Projects
        </Link>

        <header className="mb-6">
          <p
            className="text-[clamp(1.85rem,5.5vw,2.85rem)] font-extralight leading-none tracking-tight"
            aria-label="Collapse"
          >
            <span className="text-foreground/90">Collapse</span>
          </p>
        </header>

        <figure className="-mx-6 overflow-hidden rounded-xl border border-border/80 bg-muted/10 sm:mx-0">
          <a href={hero.src} target="_blank" rel="noopener noreferrer" className="group block">
            <DemoImage
              src={hero.src}
              alt={hero.label}
              width={hero.w}
              height={hero.h}
              sizes="(min-width: 672px) 640px, 100vw"
              className="block h-auto w-full transition-opacity group-hover:opacity-95"
              priority
            />
          </a>
        </figure>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href="https://github.com/akaieuan/collapse"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            GitHub — akaieuan/collapse
            <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden />
          </a>
        </div>
        <p className="mt-2 text-[12px] font-light text-muted-foreground/80">
          Open source, public repo. Clone, <code className={code}>pnpm dev</code>, and collapse a lesson
          into a skill.
        </p>

        <p className="mt-10 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/80">
          Open source · Developer tool · Claude Code
        </p>
        <h1 className="mt-2 text-2xl font-light tracking-tight text-foreground md:text-[26px]">
          Collapse
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          A Claude Code skill-building framework — a pattern → SKILL.md compiler.{' '}
          <a
            href="https://github.com/akaieuan/collapse"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-border hover:decoration-foreground/60 underline-offset-[3px] transition-colors"
          >
            github.com/akaieuan/collapse
          </a>
        </p>

        <div className="mt-10 space-y-10 text-[15px] font-light leading-relaxed text-muted-foreground">
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">What this is</h2>
            <p>
              Collapse exists because Claude’s default knowledge is stack-agnostic, but most developers
              live inside one stack at a time. The same idea — reactive state, lifecycle, error
              boundaries, circuit composition — lands differently in React, Vue, Nuxt, and Qiskit, and
              a “generic” answer costs round-trips. Collapsed skills carry your cross-stack vocabulary
              so Claude reaches for the right idiom on the first try, with trigger phrases derived from
              your annotations. The repo ships with 17 cross-stack reference lessons and a sample
              notebook that exercises the import flow end to end.
            </p>
          </section>

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
            <pre className="overflow-x-auto rounded-lg border border-border/80 bg-muted/30 p-4 text-[11px] leading-relaxed text-foreground/80">
{`ingestor  ───▶  template engine  ───▶  persistence
(on-ramps)      lib/skill-template      /api/skills

MDX · .ipynb    generateSkillDraft()    ~/.claude/skills/{name}/SKILL.md
MyST · custom   renderSkillFile()       (roadmap: MCP server scaffold)`}
            </pre>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Ingestors</h2>
            <ul className="list-disc space-y-2 pl-5 marker:text-muted-foreground/50">
              <li>
                <span className="text-foreground/85">MDX lessons.</span> Annotated code fences with{' '}
                <code className={code}>{'{lines#id}'}</code> metadata linked to sibling{' '}
                <code className={code}>&lt;Note&gt;</code> blocks, scoped per-stack via{' '}
                <code className={code}>&lt;LangTab&gt;</code>, frontmatter-validated.
              </li>
              <li>
                <span className="text-foreground/85">Jupyter + MyST import.</span> Paste{' '}
                <code className={code}>.ipynb</code> JSON, upload a file, or drop MyST{' '}
                <code className={code}>.md</code>; it infers kernel language and auto-prefills
                annotations from MyST admonitions (note / warning / tip).
              </li>
              <li>
                <span className="text-foreground/85">Pluggable model.</span> Any source format ships in
                ~4 files following the <code className={code}>lib/notebook/</code> template — there’s a
                worked example in the docs.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Engine &amp; persistence</h2>
            <ul className="list-disc space-y-2 pl-5 marker:text-muted-foreground/50">
              <li>
                <span className="text-foreground/85">Template engine.</span> One annotation → one
                skill, or a whole lesson → one skill; auto-derives up to five Claude trigger phrases
                from your annotation tips and titles.
              </li>
              <li>
                <span className="text-foreground/85">Cross-language equivalents.</span> Pulled
                automatically from sibling <code className={code}>&lt;LangTab&gt;</code> blocks, so the
                generated SKILL.md carries the translation inline.
              </li>
              <li>
                <span className="text-foreground/85">Quality linter.</span> clean / info / warn
                verdicts on description length, trigger-phrase ambiguity, kebab-case naming, and body
                size — shown as colored dots in the skills viewer.
              </li>
              <li>
                <span className="text-foreground/85">Local atomic writes.</span> Zod-validated POST,{' '}
                <code className={code}>.tmp</code> + rename, path-traversal rejected, 409 on collision.
                No telemetry, no cloud, no database — the filesystem is the storage layer.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Why collapse across stacks</h2>
            <p>
              The leverage isn’t “I have skills” — it’s skills that move with you when you switch
              stacks. Writing the Vue version after the React version forces you to see exactly where
              they diverge, and the lesson captures it. The generated SKILL.md carries that
              translation, so asking “how do I do reactive state in Nuxt” in a Vue project answers
              correctly first try. The library compounds — skills cite each other and inherit trigger
              phrases — and a SKILL.md is just a kebab-case markdown file, so polyglot teams ship them
              via dotfiles or a gist. Switching cost approaches zero: you’re learning where stacks
              diverge, not relearning from scratch.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Status &amp; roadmap</h2>
            <p>
              Active development. Shipped: the MDX ingestor (<code className={code}>&lt;LangTab&gt;</code>{' '}
              / <code className={code}>&lt;Note&gt;</code> model, 17 reference lessons), the notebook
              ingestor (.ipynb + MyST with admonition prefill), the template engine with
              cross-language equivalents, the atomic persistence layer with 409 handling, the
              three-tier quality linter, the lesson + import + skills-directory UIs, and a green Vitest
              suite (39/39). On the roadmap: MCP server scaffold output as a second persistence target
              sharing the template engine, multi-cell notebook composition, and a MyST chapter URL
              fetcher.
            </p>
            <p className="text-[12px] text-muted-foreground/70">
              TypeScript 5 · Next.js 16 (App Router, RSC, Turbopack) · Tailwind v4 · shadcn/ui · Shiki
              · Zod 4 · Vitest · Node 20+ · local filesystem
            </p>
          </section>

          <div>
            <p className={microLabel}>More views</p>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {gallery.map((shot) => (
                <figure key={shot.src}>
                  <a href={shot.src} target="_blank" rel="noopener noreferrer" className="group block">
                    <div className="overflow-hidden rounded-lg border border-border/80 bg-muted/10">
                      <DemoImage
                        src={shot.src}
                        alt={shot.label}
                        width={shot.w}
                        height={shot.h}
                        sizes="(min-width: 640px) 320px, 100vw"
                        className="block h-auto w-full transition-opacity group-hover:opacity-95"
                      />
                    </div>
                  </a>
                  <figcaption className="mt-1.5 text-[11px] font-light text-muted-foreground/70">
                    {shot.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <section className="rounded-xl border border-border/80 bg-muted/15 px-5 py-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Why it&apos;s different</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-foreground/85">
              Most skill tooling leaves you with a pile of files. Collapse makes the skills directory a
              vocabulary: one pattern lives across React / Vue / Nuxt / Qiskit tabs, the generated
              SKILL.md carries the translation inline, and switching stacks becomes learning where they
              diverge — not relearning from scratch.
            </p>
          </section>
        </div>
      </article>
    </div>
  )
}
