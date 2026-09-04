import { DemoShell } from '@/components/features/demo/demo-shell'
import { WriteUpHeader } from '@/components/features/demo/write-up-header'
import { PixelHead } from '@/components/features/brand/pixel-head'
import { demoMetadata, demoSchema } from '@/lib/demo-seo'
import { JsonLd } from '@/components/seo/json-ld'
import { PlainSummary } from '@/components/ui/plain-summary'
import { Laws } from '@/components/features/demo/aka-style/laws'
import { Color } from '@/components/features/demo/aka-style/color'
import { Surfaces } from '@/components/features/demo/aka-style/surfaces'
import { TypeScale } from '@/components/features/demo/aka-style/type-scale'
import { Marks } from '@/components/features/demo/aka-style/marks'
import { Practice } from '@/components/features/demo/aka-style/practice'
import { WhereItRuns } from '@/components/features/demo/aka-style/where-it-runs'
import { Deeper } from '@/components/features/demo/aka-style/deeper'
import { Closing } from '@/components/features/demo/aka-style/closing'

const PATH = '/demo/aka-style'

export const metadata = demoMetadata(PATH, {
  title: 'akaSTYLE: a design language written as constraints',
  description:
    'The design system behind every project on this site: eight constraints instead of preferences, OKLCH tokens, one type scale, one canvas engine for every brand mark, and server-rendered primitives. Built at Ubik, and now the thing that lets an agent build in my language.',
})

export default function AkaStyleWriteUpPage() {
  return (
    <DemoShell>
      <JsonLd
        data={demoSchema(PATH, {
          title: metadata.title as string,
          description: metadata.description as string,
          crumb: 'akaSTYLE',
        })}
      />

      {/*
        The hero is the house mark, drawn by the engine this page is
        documenting: a disc of pixel cells with the aka wordmark subtracted
        from it, the same call the site header makes, at a size where you can
        see the cells.
      */}
      <WriteUpHeader
        kicker="Design system · Live specimen"
        title={
          <>
            aka<span className="font-mono font-normal text-primary">STYLE</span>
          </>
        }
        description={
          <>
            The vocabulary every project on this site is built from: the tokens, the one type
            scale, the primitives, and the canvas engine that draws every brand mark. It exists as
            rules rather than as taste, and as something that renders itself rather than a
            document about itself.
          </>
        }
        hero={
          <div className="flex items-center justify-center px-8 py-8">
            <PixelHead size={220} grid={30} icon="disc-aka" still />
          </div>
        }
        caption={
          <>
            Not a logo file. A disc of cells with the wordmark subtracted, drawn at render time by
            the same engine every other mark in the family uses.
          </>
        }
      />

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
    </DemoShell>
  )
}
