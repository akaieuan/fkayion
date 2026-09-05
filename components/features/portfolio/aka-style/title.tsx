import { PixelHead } from '@/components/features/brand/pixel-head'
import { KickerTags } from '@/components/ui/tag-row'
import { PlainSummary } from '@/components/ui/plain-summary'
import { MARK_FAMILY, USAGE } from '@/lib/aka-style'

/*
 * akaSTYLE, the opener.
 *
 * Height budget, of 844: the left column is the chips (22), the title (46),
 * the description at three lines (73) and the summary card (about 270), around
 * 450 with the gaps. The right column is the kicker (28), three 130px tiles
 * with 12px gaps (414) and a two-line caption (46), around 490. Under both,
 * the five repos the language runs in, from the write-up's own list: a kicker
 * and one row of tiles, about 150. About 680 in all.
 */

/** An address the way the closing sheet writes them: this site's paths under its own name. */
function address(href: string) {
  return href.startsWith('/') ? `akabuild.dev${href === '/' ? '' : href}` : href.replace(/^https?:\/\//, '')
}
export function AkaStyleTitle() {
  return (
    <div className="h-full">
      <div className="grid grid-cols-[1fr_520px] gap-x-16">
      <div>
        <KickerTags>Design system · Live specimen</KickerTags>
        <h1 className="mt-4 text-display font-extralight leading-none tracking-tight text-foreground/90">
          aka<span className="font-mono font-normal text-primary">STYLE</span>
        </h1>
        <p className="mt-4 text-15 font-light leading-relaxed text-muted-foreground">
          The vocabulary every project on this site is built from: the tokens, the one type
          scale, the primitives, and the canvas engine that draws every brand mark. It exists as
          rules rather than as taste, and as something that renders itself rather than a
          document about itself.
        </p>
        <PlainSummary path="/demo/aka-style" />
      </div>

      <div>
        <p className="aka-kicker">The mark family</p>
        <ul className="mt-3 list-none space-y-3 p-0">
          {MARK_FAMILY.map((m) => (
            <li key={m.name} className="aka-card flex items-center gap-5 px-5 py-4">
              <PixelHead size={96} grid={24} icon={m.icon} still />
              <div>
                <p className="text-14 font-light text-foreground/90">{m.name}</p>
                <p className="font-mono text-11 text-muted-foreground/60">{m.note}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-11 font-light leading-relaxed text-muted-foreground/70">
          Not a logo file. A disc of cells with the wordmark subtracted, drawn at render time by
          the same engine every other mark in the family uses.
        </p>
      </div>
      </div>

      <div className="mt-10">
        <p className="aka-kicker">Where it runs</p>
        <ul className="mt-3 grid list-none grid-cols-5 gap-3 p-0">
          {USAGE.map((u) => (
            <li key={u.name} className="aka-card px-4 py-3">
              <p className="text-14 font-light text-foreground/90">{u.name}</p>
              <p className="mt-1 text-12 font-light leading-relaxed text-muted-foreground">{u.what}</p>
              <p className="mt-2 font-mono text-10 text-muted-foreground/60">{address(u.href)}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
