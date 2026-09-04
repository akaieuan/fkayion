import { mono } from '@/components/features/aka-style/shared'
import { Spec } from '@/components/features/aka-style/spec'
import { DemoImage } from '@/components/ui/demo-image'
import { DemoVideo } from '@/components/ui/demo-video'
import { PlateVideo } from '@/components/ui/plate-video'
import { PlainSummary } from '@/components/ui/plain-summary'
import { ProjectPlate } from '@/components/ui/project-plate'
import { ProjectMark, type ProjectItem } from '@/components/ui/project-mark'
import { ProjectGrid } from '@/components/ui/project-grid'
import { MarkGlyph } from '@/components/ui/mark-glyphs'
import { AkaOssLogo, AkaVstLogo, CircleheadsLogo } from '@/components/ui/brand-logos'
import { LOGO_NAMES, ProjectLogo } from '@/components/ui/project-logo'
import { TrickleSpecimen } from '@/components/ui/trickle-specimen'
import { KickerTags, TagRow } from '@/components/ui/tag-row'
import { PROJECTS } from '@/lib/projects'

/**
 * The components, rendered.
 *
 * The rest of this page is class strings, because a primitive is a string you
 * copy. These are the pieces one level up: a component takes data and decides
 * its own markup, so what is printed beside each one is the call rather than
 * a class. Every one of them is a server component, which keeps the header's
 * claim true: nothing in this section ships JavaScript to look right.
 *
 * The plates and the grid read from `PROJECTS`, so the plate shown here is the
 * plate on /demo and cannot drift from it. The entries are chosen for their
 * art path: a bitmap logo through next/image and an inlined SVG are server
 * work, where a drawn mark from the pixel engine would be a canvas, and a
 * client boundary, inside a section that promises none.
 */

/** One catalogue entry by its route. Loud if the entry goes, since the specimen would then be lying. */
function project(href: string): ProjectItem {
  const item = PROJECTS.find((p) => p.href === href)
  if (!item) throw new Error(`akaSTYLE specimen: no project at ${href} in lib/projects.ts`)
  return item
}

export function ComponentsSection() {
  const ubik = project('/demo/ubik')
  const boxPopuli = project('/demo/box-populi')
  const akaoss = project('/demo/akaoss')

  return (
    <section className="mt-14 space-y-3">
      <p className="aka-kicker">Components</p>

      <Spec
        name="Demo image"
        note="a screenshot on a write-up: intrinsic size, a build-time blur, quality 90"
        cls={`<DemoImage src="/blockpad/blockpad-hero.webp" alt="…" width={1600} height={1003} />`}
      >
        <div className="w-full max-w-sm overflow-hidden rounded-lg">
          <DemoImage
            src="/blockpad/blockpad-hero.webp"
            alt="The Blockpad window: a floating canvas with a filter panel sketched on it, a collapsible inspector rail, and a tool dock along the bottom"
            width={1600}
            height={1003}
          />
        </div>
      </Spec>

      <Spec
        name="Demo video"
        note="a screen recording: controls, the poster until play, nothing fetched before it"
        cls={`<DemoVideo src="/ubik/search" poster="/ubik/search-poster.webp" width={1280} height={952} label="…" />`}
      >
        <div className="w-full max-w-sm overflow-hidden rounded-lg">
          <DemoVideo
            src="/ubik/search"
            poster="/ubik/search-poster.webp"
            width={1280}
            height={952}
            label="Ubik's search, scoring its own results"
          />
        </div>
      </Spec>

      <Spec
        name="Plate video"
        note="a clip inside a plate: autoplay and muted, one still under reduced motion, no hooks"
        cls={`<PlateVideo src="/wrdef/wrdef-card.mp4" poster="/wrdef/wrdef-card-poster.webp" width={900} height={640} label="…" />`}
      >
        <div className="aspect-[900/640] w-full max-w-[240px] overflow-hidden rounded-lg">
          <PlateVideo
            src="/wrdef/wrdef-card.mp4"
            poster="/wrdef/wrdef-card-poster.webp"
            width={900}
            height={640}
            label="Wrdef, mid-game: a guess resolving to green and amber tiles"
          />
        </div>
      </Spec>

      <Spec
        name="Plain summary"
        note="the plain-language answer at the top of a write-up; the disclosure is a native details"
        cls={`<PlainSummary path="/demo/ubik" />`}
      >
        {/* The section carries its own page margin, which a card has no use for. */}
        <div className="w-full [&>section]:mt-0">
          <PlainSummary path="/demo/ubik" />
        </div>
      </Spec>

      <Spec
        name="Project plate"
        note="a project at plate size: its mark on a tinted square, its name, and one word"
        cls={`<ProjectPlate item={project} />`}
      >
        <div className="w-full max-w-[240px]">
          <ProjectPlate item={ubik} />
        </div>
      </Spec>

      <Spec
        name="Project mark"
        note="the same identity at any size; which art it is gets decided once, in the component"
        cls={`<ProjectMark item={project} size={96} />`}
      >
        <span className="relative block h-24 w-24 overflow-hidden rounded-[16%]">
          <ProjectMark item={ubik} size={96} />
        </span>
        <span className="relative grid h-24 w-24 place-items-center overflow-hidden rounded-[16%]">
          <ProjectMark item={akaoss} size={96} />
        </span>
      </Spec>

      <Spec
        name="Project grid"
        note="the wall on /demo and the landing's six, from one component; flush inside prose, two across for a short group"
        cls={`<ProjectGrid items={[a, b]} columns={2} flush />`}
      >
        <div className="w-full">
          <ProjectGrid items={[ubik, boxPopuli]} columns={2} flush />
        </div>
      </Spec>

      <Spec
        name="Mark glyph"
        note="a drawn mark for a project that never had a logo: a character grid with one accent cell"
        cls={`<MarkGlyph name="zero" />`}
      >
        <MarkGlyph name="zero" />
      </Spec>

      <Spec
        name="Brand logos"
        note="the product icons, inlined from each repo's own icon.svg and re-expressed in currentColor"
        cls={`<CircleheadsLogo size={40} />  <AkaOssLogo size={40} />  <AkaVstLogo size={40} />`}
      >
        <CircleheadsLogo size={40} />
        <AkaOssLogo size={40} />
        <AkaVstLogo size={40} />
      </Spec>

      <Spec
        name="Project logo"
        note="the logo kits' currentColor variants, by name; LOGO_NAMES is the whole set"
        cls={`{LOGO_NAMES.map((name) => <ProjectLogo key={name} name={name} size={36} />)}`}
      >
        {LOGO_NAMES.map((name) => (
          <span key={name} className="flex flex-col items-center gap-1.5">
            <ProjectLogo name={name} size={36} />
            <span className={mono}>{name}</span>
          </span>
        ))}
      </Spec>

      <Spec
        name="Trickle specimen"
        note="the kit's plate: fifteen of its text animations, running, and all of it CSS"
        cls={`<TrickleSpecimen />`}
      >
        <div className="h-40 w-full overflow-hidden">
          <TrickleSpecimen />
        </div>
      </Spec>

      <Spec
        name="Tags"
        note="what kind of thing this is, as chips; KickerTags splits a write-up's middle-dot kicker into the same row"
        cls={`<TagRow tags={['Product', 'Desktop', 'Agents']} />
<KickerTags>Product · Desktop · Agents</KickerTags>`}
      >
        <div className="w-full space-y-2">
          <TagRow tags={['Product', 'Desktop', 'Agents']} />
          <KickerTags>Product · Desktop · Agents</KickerTags>
        </div>
      </Spec>

      {/*
        What is not here, and why. Naming them keeps the page honest about
        being the whole of components/ui rather than the part that fits in a
        card, and it is what the style check reads to know the specimen has
        heard of a piece.
      */}
      <p className="mt-4 text-13 font-light leading-relaxed text-muted-foreground">
        Six pieces of <code className="aka-code">components/ui</code> are not rendered above, on
        purpose. <span className="text-foreground/85">LoopVideo</span> is a client component: it
        starts and stops on scroll through an observer, and a specimen of it would ship the
        JavaScript this page promises not to. <span className="text-foreground/85">DemoBack</span>{' '}
        is fixed to the viewport and reads the route, so it belongs to the write-ups it sits beside
        rather than inside a card. <span className="text-foreground/85">ConditionalFooter</span> and{' '}
        <span className="text-foreground/85">ThemeProvider</span> are infrastructure: they decide
        what renders and draw nothing of their own. <span className="text-foreground/85">SiteHeader</span>{' '}
        and <span className="text-foreground/85">SiteFooter</span> are whole-page fixtures, the
        head and foot of the site rather than pieces a page composes.
      </p>
    </section>
  )
}
