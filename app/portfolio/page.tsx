import { PixelHead } from '@/components/features/brand/pixel-head'
import { DemoImage } from '@/components/ui/demo-image'
import { ProjectCard } from '@/components/ui/project-card'
import { PROJECTS } from '@/lib/projects'
import { WorkLens, type Lens, type WorkItem } from '@/components/portfolio/work-lens'
import { Anchor, Craft, KICKER, RISE, FADE, SWEEP, Role, Section, Stat, enter } from '@/components/portfolio/parts'

/**
 * A visual reading of the CV, on one page.
 *
 * Everything here is a server component except the work filter, which owns a
 * single string. The cards it filters are rendered on the server and handed
 * over as opaque nodes, so no project data reaches the browser as JavaScript.
 * Reveals are Tailwind animations on a scroll timeline, which means the motion
 * costs no client code either. See components/portfolio/parts.tsx.
 *
 * Not linked from anywhere on the site and marked noindex: this page exists to
 * be sent to a person, not found.
 */

export const metadata = {
  title: 'Ieuan King — Design Engineer & Product Designer',
  description:
    'Design engineering and product design for human-in-the-loop AI. Co-founded Ubik Studio, now running akaOSS. Brooklyn, NY.',
  robots: { index: false, follow: false },
}

const EMAIL = 'ieuan@yionvisual.com'

/** The figures worth stating plainly, each of which the work below evidences. */
const STATS = [
  { value: '3.5 yrs', label: 'Co-founding Ubik Studio, design lead from system to signed desktop app' },
  { value: '6', label: 'Open-source projects shipped across HITL components, evaluation and dev tooling' },
  { value: '19', label: 'Human-in-the-loop React primitives across six npm packages' },
  { value: '4M+', label: 'Streams as a recording artist, every cover and site built by me' },
]

const ROLES = [
  {
    org: 'Independent',
    title: 'akaOSS · Open-source human-in-the-loop AI',
    dates: '2026 — Present',
    note: 'A one-person open-source studio: five projects on a single thesis, Assist-Not-Complete.',
    points: [
      'A human-in-the-loop measurement family (HITL Kit, eval-kit, tag-kit) and a pair of Claude Code developer tools: Collapse for skill creation, Hologram for MCP control of Blender.',
      'Design, front end, packaging and docs end to end, plus a findings feed of human-scored experiments published alongside the paper that sets the thesis.',
    ],
    links: [
      { label: 'akaOSS', href: '/demo/akaoss' },
      { label: 'The paper', href: 'https://www.akaoss.dev/paper' },
    ],
  },
  {
    org: 'Ubik Inc',
    title: 'Design Co-Founder',
    dates: '2023 — 2026',
    note: 'An AI research platform for professional researchers and knowledge workers, led on design from the system through shipped web and signed desktop applications.',
    points: [
      'Built the agentic surface: live agent status, streaming task states, batch review queues, evidence panels citing source pages, and Human Needed blocks where agents stop and hand the decision back.',
      'Worked in a small founding team and directly with design partners in academia, biotech and law, turning interviews, session replays and evaluation runs into shipped fixes and redesigns, often the same week.',
      'Built the brand alongside it: visual identity, product copy, voice and terminology guidelines, and the pitch narrative that won the Startera accelerator in Fall 2023.',
    ],
    links: [
      { label: 'Ubik Studio write-up', href: '/demo/ubik' },
      { label: 'Team test log', href: 'https://kraa.io/team-test-log042' },
    ],
  },
  {
    org: 'aka ieuan',
    title: 'Producer, Creative Director',
    dates: '2019 — Present',
    note: '4M+ streams and 400K+ unique listeners across 174 countries under the yion alias.',
    points: [
      'Now releasing as aka ieuan: 25 releases across four labels, performed internationally, and every cover, site and visual for all of it built by me.',
    ],
    links: [
      { label: 'akaVST instruments', href: '/demo/akavsts' },
      { label: 'akaCOVART', href: '/demo/akacovart' },
    ],
  },
]

const LENSES: Lens[] = [
  { id: 'all', label: 'Everything' },
  { id: 'product', label: 'Product' },
  { id: 'oss', label: 'Open source' },
  { id: 'interactive', label: 'Interactive' },
  { id: 'sound', label: 'Sound' },
]

/** The curated cut, keyed to /demo so a project is described in exactly one place. */
const SELECTED: Record<string, string[]> = {
  '/demo/ubik': ['product'],
  '/demo/bodylog': ['product'],
  '/demo/circleheads': ['product'],
  '/demo/box-populi': ['product', 'sound'],
  '/demo/akaoss': ['oss'],
  '/demo/hitl-kit': ['oss'],
  '/demo/eval-kit': ['oss'],
  '/demo/hologram': ['oss'],
  '/demo/collapse': ['oss'],
  '/demo/trickle-ui-kit': ['oss'],
  '/demo/inertial': ['oss'],
  '/demo/null-browser': ['oss'],
  '/demo/research-os': ['interactive'],
  '/demo/music-analysis-chat': ['interactive'],
  '/demo/visualizer-eden': ['interactive', 'sound'],
  '/demo/akavsts': ['sound'],
  '/demo/akacovart': ['sound'],
}

/** Screenshots of the running things, so the claims above have faces. */
const STILLS = [
  { src: '/ubik-workspace.webp', w: 1600, h: 962, href: '/demo/ubik', caption: 'Ubik Studio: agent chat, the source paper, and an evidence panel where every extracted claim is accepted or rejected by hand.' },
  { src: '/research-os.webp', w: 1600, h: 1000, href: '/demo/research-os', caption: 'Research OS: a multi-panel workspace with agentic search and approval flows. Runs in the browser.' },
  { src: '/hitl-kit-hero.png', w: 1024, h: 535, href: '/demo/hitl-kit', caption: 'HITL Kit: nineteen primitives for human-in-the-loop agentic UIs, distributed through the shadcn CLI.' },
  { src: '/eval-kit.webp', w: 1600, h: 1000, href: '/demo/eval-kit', caption: 'eval-kit: humans score, not LLMs. YAML suites, CI-gated regression checks, and five dimensions LLM judges miss.' },
  { src: '/hologram.webp', w: 1600, h: 641, href: '/demo/hologram', caption: 'Hologram: live observability and an MCP surface for Blender to glTF pipelines.' },
  { src: '/inertial-dashboard.png', w: 1024, h: 611, href: '/demo/inertial', caption: 'Inertial: auditable AI content review, with typed signals and a hash-chained audit log.' },
]

const CRAFT = [
  { heading: 'Design & research', items: ['Figma', 'Product design', 'Design systems', 'UX research', 'User interviews', 'Usability testing', 'Session-replay analysis', 'Evaluation design', 'UX writing'] },
  { heading: 'Frontend', items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'shadcn/ui', 'Electron', 'Three.js', 'Component architecture', 'CI / testing'] },
  { heading: 'AI & agents', items: ['Claude Code', 'Cursor', 'Agentic UI/UX', 'System prompt engineering', 'Agent evaluation', 'MCP', 'RAG', 'Tool-use patterns', 'Anthropic & OpenAI SDKs'] },
  { heading: 'Also', items: ['Blender', 'Godot 4', 'Ableton', 'PostHog'] },
]

const RESEARCH = [
  {
    title: 'An AI Measurement Problem',
    href: 'https://www.akaoss.dev/paper',
    body: 'The argument that drove how Ubik was evaluated and what shipped: the AI failure crisis is at root a measurement crisis. It makes the case for Assist-Not-Complete, evaluating AI on whether it assists a human without displacing them rather than on whether it finishes alone.',
  },
  {
    title: 'Lab log',
    href: 'https://www.akaoss.dev',
    body: 'Reproducible, human-scored experiments on eval-kit suites. The current study uses distractor tasks where passing requires pushing back on unverifiable claims and future-dated sources, scoring refusal rather than compliance.',
  },
]

export default function PortfolioPage() {
  // Cards are rendered here, on the server, and handed to the filter as nodes.
  const items: WorkItem[] = PROJECTS.filter((p) => SELECTED[p.href]).map((project) => ({
    id: project.href,
    lenses: SELECTED[project.href]!,
    node: <ProjectCard item={{ ...project, tags: project.tags ?? [] }} />,
  }))

  return (
    <main className="min-h-screen bg-background pb-24">
      <div className="max-w-site mx-auto site-inset">
        {/* ------------------------------------------------------------ hero */}
        <header className="pt-28 pb-16 sm:pt-36 sm:pb-24">
          <div className={`${FADE} flex items-center gap-4`}>
            <PixelHead size={44} grid={16} gap={0.12} icon="aka" still className="shrink-0" />
            <p className={KICKER}>Design engineering &middot; Product design &middot; Brooklyn, NY</p>
          </div>

          <h1 className={`${RISE} mt-8 max-w-3xl text-[clamp(2.2rem,7vw,4.25rem)] font-extralight leading-[1.04] tracking-tight text-foreground`}>
            I go and find the problem
            <span className="text-muted-foreground/45"> before I design for it.</span>
          </h1>

          <p className={`${RISE} mt-8 max-w-2xl text-[16px] font-light leading-relaxed text-muted-foreground`} style={enter(1)}>
            I&apos;m a design engineer trained as an anthropologist. Most of that has gone into
            human-in-the-loop AI for expert users: sitting with the people doing the work, watching
            where the task actually breaks, and deciding what an agent should and should not be
            trusted with. Most recently I co-founded Ubik Studio, where I owned the interfaces, the
            production front end and the design systems underneath, plus the brand and the pitch
            narrative.
          </p>

          <div className={`${RISE} mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center`} style={enter(2)}>
            <a
              href="/2026-ieuan-king.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Résumé, one page
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/40"
            >
              {EMAIL}
            </a>
          </div>

          <div className={`${RISE} mt-4 flex flex-wrap gap-x-5 gap-y-2`} style={enter(3)}>
            <Anchor href="https://github.com/akaieuan">github.com/akaieuan</Anchor>
            <Anchor href="https://www.linkedin.com/in/ieuan-king/">linkedin.com/in/ieuan-king</Anchor>
            <Anchor href="https://www.akaoss.dev">akaoss.dev</Anchor>
          </div>
        </header>

        {/* ------------------------------------------------------- at a glance */}
        <Section kicker="At a glance">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <Stat key={stat.value} value={stat.value} label={stat.label} i={i} />
            ))}
          </div>
        </Section>

        {/* --------------------------------------------------------- experience */}
        <Section
          kicker="Experience"
          title="Three things at once, for most of a decade."
          lead="A company, an open-source studio, and a record label's worth of music. The through line is that I ship the whole surface: research, design, front end, and the words."
        >
          <ol className="p-0">
            {ROLES.map((role, i) => (
              <Role key={role.org} {...role} i={i} />
            ))}
          </ol>
        </Section>

        {/* ------------------------------------------------------ selected work */}
        <Section
          kicker="Selected work"
          title="What I've shipped, and what each one is for."
          lead="Every card opens a write-up with the reasoning, the screens, and in several cases the running thing itself."
        >
          <WorkLens lenses={LENSES} items={items} />
        </Section>

        {/* -------------------------------------------------------- in practice */}
        <Section
          kicker="In practice"
          title="The work, running."
          lead="Not mockups. These are captures of shipped interfaces and live demos you can open from this page."
        >
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2">
            {STILLS.map((still, i) => (
              <figure key={still.src} className={RISE} style={enter(i % 2)}>
                <a href={still.href} className="group block overflow-hidden rounded-xl border border-border/70 bg-muted/10">
                  <DemoImage
                    src={still.src}
                    alt={still.caption}
                    width={still.w}
                    height={still.h}
                    sizes="(min-width: 640px) 560px, 100vw"
                    className="block h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                  />
                </a>
                <figcaption className="mt-3 text-[12px] font-light leading-relaxed text-muted-foreground/75">
                  {still.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>

        {/* --------------------------------------------------------------- craft */}
        <Section kicker="Craft" title="What I actually use.">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
            {CRAFT.map((group, i) => (
              <Craft key={group.heading} heading={group.heading} items={group.items} i={i} />
            ))}
          </div>
        </Section>

        {/* ------------------------------------------------------------ research */}
        <Section
          kicker="Research"
          title="Why measurement, not benchmarks."
          lead="The thesis that decided what Ubik shipped, and the experiments that keep testing it."
        >
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
            {RESEARCH.map((item, i) => (
              <div key={item.title} className={RISE} style={enter(i)}>
                <h3 className="text-[17px] font-light tracking-tight text-foreground">{item.title}</h3>
                <p className="mt-3 text-[14px] font-light leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
                <div className="mt-4">
                  <Anchor href={item.href}>Read it</Anchor>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ----------------------------------------------------------- education */}
        <Section kicker="Education">
          <div className={RISE}>
            <h3 className="text-[17px] font-light tracking-tight text-foreground">
              SUNY Purchase &middot; B.A., Anthropology &amp; Media Studies
            </h3>
            <p className="mt-1 font-mono text-[11px] tracking-[0.08em] text-muted-foreground/55">
              2018 — 2022 &middot; Purchase, NY
            </p>
            <p className="mt-3 max-w-xl text-[14px] font-light leading-relaxed text-muted-foreground">
              Focus: human-computer interaction, datafication, algorithmic systems, digital
              capitalism. It is where the habit of watching the work before automating it came from.
            </p>
          </div>
        </Section>

        {/* --------------------------------------------------------------- close */}
        <section className="border-t border-border/50 pt-16 sm:pt-24">
          <span aria-hidden className={`${SWEEP} mb-16 block h-px w-full bg-border/70`} />
          <h2 className={`${RISE} max-w-2xl text-[clamp(1.6rem,4.5vw,2.6rem)] font-extralight leading-[1.1] tracking-tight text-foreground`}>
            If any of this is the kind of problem you have, I&apos;d like to hear about it.
          </h2>
          <div className={`${RISE} mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center`} style={enter(1)}>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              {EMAIL}
            </a>
            <a
              href="/2026-ieuan-king.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/40"
            >
              Résumé, one page
            </a>
            <a
              href="/ieuan-king-portfolio-2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/40"
            >
              Portfolio PDF
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}
