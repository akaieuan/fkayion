import { DemoImage } from '@/components/ui/demo-image'
import { KickerTags } from '@/components/ui/tag-row'
import { PlainSummary } from '@/components/ui/plain-summary'

/*
 * HITL Kit, the opener.
 *
 * Height budget, of 844: the left column is the chips (22), the title (46),
 * the description at two lines (49) and the summary card, four paragraphs in
 * a 632px measure (about 480), around 630 with the gaps. The right column is
 * the hero at 760 wide (399), the byline (31) and the install well (100),
 * around 530.
 */
export function HitlKitTitle() {
  return (
    <div className="grid h-full grid-cols-[1fr_760px] gap-x-16">
      <div>
        <KickerTags>Open source · v0.6</KickerTags>
        <h1 className="mt-4 text-display font-extralight leading-none tracking-tight text-foreground/90">
          HITLKit
        </h1>
        <p className="mt-4 text-15 font-light leading-relaxed text-muted-foreground">
          A design system, component library, and perspective paper on human-in-the-loop AI.{' '}
          <span className="font-mono text-13 text-foreground/85">hitlkit.dev</span>
        </p>
        <PlainSummary path="/demo/hitl-kit" />
      </div>

      <div>
        <div className="aka-card-well aka-card-media overflow-hidden rounded-xl">
          <DemoImage
            src="/hitl-kit/hitl-kit-hero.png"
            alt="HITL Kit — landing preview with headline and navigation"
            width={1024}
            height={535}
            sizes="760px"
            priority
            className="block h-auto w-full"
          />
        </div>
        <p className="mt-3 text-12 font-light leading-relaxed text-muted-foreground/70">
          Live site, paper, registry, and component showcase — the canonical home for the project.
        </p>
        <div className="mt-4 aka-card-well px-4 py-3">
          <p className="aka-label">Install any primitive</p>
          <p className="mt-1.5 font-mono text-11 text-foreground/80">
            npx shadcn@latest add https://www.hitlkit.dev/r/&lt;id&gt;.json
          </p>
          <p className="mt-1 font-mono text-11 text-muted-foreground/70">github.com/akaieuan/HITL-KIT</p>
        </div>
      </div>
    </div>
  )
}
