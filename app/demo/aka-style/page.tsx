import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { PixelHead } from '@/components/features/brand/pixel-head'
import { KickerTags } from '@/components/ui/tag-row'
import { demoMetadata, demoSchema } from '@/lib/demo-seo'
import { JsonLd } from '@/components/seo/json-ld'
import { PlainSummary } from '@/components/ui/plain-summary'
import { MEASURE, well } from '@/components/features/aka-style/writeup/shared'
import { Laws } from '@/components/features/aka-style/writeup/laws'
import { Color } from '@/components/features/aka-style/writeup/color'
import { Surfaces } from '@/components/features/aka-style/writeup/surfaces'
import { TypeScale } from '@/components/features/aka-style/writeup/type-scale'
import { Marks } from '@/components/features/aka-style/writeup/marks'
import { Practice } from '@/components/features/aka-style/writeup/practice'
import { WhereItRuns } from '@/components/features/aka-style/writeup/where-it-runs'
import { Deeper } from '@/components/features/aka-style/writeup/deeper'
import { Closing } from '@/components/features/aka-style/writeup/closing'

const PATH = '/demo/aka-style'

export const metadata = demoMetadata(PATH, {
  title: 'akaSTYLE: a design language written as constraints',
  description:
    'The design system behind every project on this site: seven constraints instead of preferences, OKLCH tokens, one type scale, one canvas engine for every brand mark, and server-rendered primitives. Built at Ubik, and now the thing that lets an agent build in my language.',
})

/*
 * This page uses the site's own container rather than a write-up's reading
 * column.
 *
 * It was a max-w-2xl article whose every specimen was a link to another page,
 * which meant the page about the design system was the one place on the site
 * that showed you none of it. The system is wide material — six swatches, a
 * type scale, a family of marks — and the landing and /demo already have the
 * grammar for laying wide material out. Prose keeps a reading measure inside
 * that container; only the specimens use the full width.
 */
const SHELL = 'max-w-site mx-auto site-inset'

export default function AkaStyleWriteUpPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-background pb-20 pt-16">
      <JsonLd
        data={demoSchema(PATH, {
          title: metadata.title as string,
          description: metadata.description as string,
          crumb: 'akaSTYLE',
        })}
      />

      <div className={SHELL}>
        <Link
          href="/demo"
          className="mb-8 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground lg:hidden"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Projects
        </Link>

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <header className="grid gap-8 md:grid-cols-[1fr_auto] md:items-start">
          <div className={MEASURE}>
            <KickerTags>Design system · Live specimen</KickerTags>
            <h1 className="mt-2 text-[clamp(1.85rem,5.5vw,2.85rem)] font-extralight leading-none tracking-tight text-foreground/90">
              aka<span className="font-mono font-normal text-primary">STYLE</span>
            </h1>
            <p className="mt-4 text-[16px] font-light leading-relaxed text-foreground/85">
              The vocabulary every project on this site is built from: the tokens, the one type
              scale, the primitives, and the canvas engine that draws every brand mark. It exists as
              rules rather than as taste, and as something that renders itself rather than a
              document about itself.
            </p>
          </div>
          {/*
            The house mark, drawn by the engine this page is documenting. It is
            a disc of pixel cells with the aka wordmark subtracted from it —
            the same call the site header makes, at a size where you can see
            the cells.
          */}
          <figure className="justify-self-start md:justify-self-end">
            <div className={`${well} aka-card-media flex items-center justify-center px-8 py-8`}>
              <PixelHead size={150} grid={30} icon="disc-aka" still />
            </div>
            <figcaption className="mt-2 max-w-[220px] text-[11px] font-light leading-relaxed text-muted-foreground/70">
              Not a logo file. A disc of cells with the wordmark subtracted, drawn at render time by
              the same engine every other mark in the family uses.
            </figcaption>
          </figure>
        </header>

        {/* Full width under the header, not inside the header's left column. */}
        <div className={MEASURE}>
        </div>

        {/* ── The rules ──────────────────────────────────────────────────── */}
        <PlainSummary path={PATH} />

        <Laws />

        {/* ── Color ──────────────────────────────────────────────────────── */}
        <Color />

        {/* ── Surfaces ───────────────────────────────────────────────────── */}
        <Surfaces />

        {/* ── Type ───────────────────────────────────────────────────────── */}
        <TypeScale />

        {/* ── Marks ──────────────────────────────────────────────────────── */}
        <Marks />

        {/* ── The practice ───────────────────────────────────────────────── */}
        <Practice />

        {/* ── Where it runs ──────────────────────────────────────────────── */}
        <WhereItRuns />

        {/* ── Deeper ─────────────────────────────────────────────────────── */}
        <Deeper />

        <Closing />
      </div>
    </div>
  )
}
