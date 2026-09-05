import { DemoImage } from '@/components/ui/demo-image'
import { BlockpadMark } from '@/components/ui/blockpad-mark'
import { KickerTags } from '@/components/ui/tag-row'
import { PlainSummary } from '@/components/ui/plain-summary'

/*
 * Blockpad, the opener.
 *
 * Height budget, of 844: the left column is the chips (22), the mark row
 * (84), the description at three lines in a 632px measure (73) and the
 * summary card, three paragraphs, one of them long (about 450), around 680
 * with the gaps. The right column is the hero at 760 wide (478), the caption
 * (46), the byline (46) and the address (29), about 600.
 */
export function BlockpadTitle() {
  return (
    <div className="grid h-full grid-cols-[1fr_760px] gap-x-16">
      <div>
        <KickerTags>Personal tool · macOS · MIT</KickerTags>
        <div className="mt-4 flex items-center gap-6">
          <BlockpadMark size={84} title="" />
          <h1 className="text-display font-extralight leading-none tracking-tight text-foreground/90">
            Blockpad
          </h1>
        </div>
        <p className="mt-4 text-15 font-light leading-relaxed text-muted-foreground">
          A macOS sketchpad that opens on a hotkey and hands drawings to whatever coding agent
          you&apos;re in. You draw where the boxes go, press copy, and paste. The agent gets the
          layout as exact structure, not a paragraph and not a screenshot.
        </p>
        <PlainSummary path="/demo/blockpad" />
      </div>

      <div>
        <div className="aka-card-well aka-card-media overflow-hidden rounded-xl">
          <DemoImage
            src="/blockpad/blockpad-hero.webp"
            alt="The Blockpad window: a floating canvas with a filter panel sketched on it, a collapsible inspector rail, and a tool dock along the bottom"
            width={1600}
            height={1003}
            sizes="760px"
            priority
            className="block h-auto w-full"
          />
        </div>
        <p className="mt-3 text-11 font-light leading-relaxed text-muted-foreground/70">
          One window, one canvas, one Copy button. It opens over whatever you are already in, and
          the dock sits along the bottom so the top edge of the drawing stays clear.
        </p>
        <p className="mt-2 text-12 font-light leading-relaxed text-muted-foreground/70">
          Free and MIT licensed. Swift 6, SwiftUI, AppKit, macOS 14+, one dependency. Built for
          myself, open because there is no reason for it not to be.
        </p>
        <p className="mt-3 font-mono text-11 text-muted-foreground/70">github.com/akaieuan/blockpad</p>
      </div>
    </div>
  )
}
