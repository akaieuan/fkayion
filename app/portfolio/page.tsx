import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './print.css'
import { Sheet } from '@/components/features/portfolio/sheet'
import { Cover } from '@/components/features/portfolio/cover'
import { Contents, type ContentsEntry } from '@/components/features/portfolio/contents'
import { HowIWork } from '@/components/features/portfolio/how-i-work'
import { UbikTitle } from '@/components/features/portfolio/ubik/title'
import { UbikSimpleTerms } from '@/components/features/portfolio/ubik/simple-terms'
import { UbikAhead } from '@/components/features/portfolio/ubik/ahead'
import { UbikProductCards } from '@/components/features/portfolio/ubik/product-cards'
import { UbikHumanNeededAndRole } from '@/components/features/portfolio/ubik/human-needed-and-role'
import { AkaStyleTitle } from '@/components/features/portfolio/aka-style/title'
import { AkaStyleLaws } from '@/components/features/portfolio/aka-style/laws'
import { HitlKitTitle } from '@/components/features/portfolio/hitl-kit/title'
import { HitlKitPrimitives } from '@/components/features/portfolio/hitl-kit/primitives'
import { BodyLogTitle } from '@/components/features/portfolio/bodylog/title'
import { BlockpadTitle } from '@/components/features/portfolio/blockpad/title'
import { AlsoShipped } from '@/components/features/portfolio/also-shipped'
import { Closing } from '@/components/features/portfolio/closing'

/*
 * The portfolio, as a route.
 *
 * Sixteen 1600 by 1000 sheets, each composed from the same components,
 * classes and data as the rest of the site, and printed to
 * public/ieuan-king-portfolio-2026.pdf by tools/portfolio-pdf.mjs. The PDF is a
 * print of this page, so a summary edited in lib/plain-summaries.ts or a law
 * edited in lib/aka-style.ts reaches the document the next time it is printed
 * and never any other way.
 *
 * Not indexed: the write-ups are the pages that should rank, and this is the
 * same material condensed for a reader who was handed a file.
 */
export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'The portfolio of Ieuan King as one document: how I work, Ubik Studio, akaSTYLE, HITL Kit, BodyLog and Blockpad.',
  robots: { index: false, follow: false },
}

type SheetSpec = { section: string; line: string; body: ReactNode }

/*
 * The order of the document. Each entry is one sheet; the section name goes
 * to the running head, and the first sheet of each section gives the contents
 * page its number. Adding a sheet here is the whole act of adding a page.
 */
const SHEETS: SheetSpec[] = [
  { section: 'How I work', line: 'An anthropologist who became a product design engineer.', body: <HowIWork /> },
  { section: 'Ubik Studio', line: 'Three and a half years co-founding a desktop AI research platform.', body: <UbikTitle /> },
  { section: 'Ubik Studio', line: '', body: <UbikSimpleTerms /> },
  { section: 'Ubik Studio', line: '', body: <UbikAhead /> },
  { section: 'Ubik Studio', line: '', body: <UbikProductCards /> },
  { section: 'Ubik Studio', line: '', body: <UbikHumanNeededAndRole /> },
  { section: 'akaSTYLE', line: 'The design language every project is built from, as eight constraints.', body: <AkaStyleTitle /> },
  { section: 'akaSTYLE', line: '', body: <AkaStyleLaws /> },
  { section: 'HITL Kit', line: 'Nineteen installable primitives for keeping a person in charge of an agent.', body: <HitlKitTitle /> },
  { section: 'HITL Kit', line: '', body: <HitlKitPrimitives from={0} to={6} /> },
  { section: 'BodyLog', line: 'An iPhone app that keeps a record and never gives a verdict.', body: <BodyLogTitle /> },
  { section: 'Blockpad', line: 'A sketchpad that hands a coding agent the layout as structure.', body: <BlockpadTitle /> },
  { section: 'Also shipped', line: 'Twelve more, one line each.', body: <AlsoShipped /> },
  { section: 'Closing', line: 'Five essays, and how to reach me.', body: <Closing /> },
]

/** The cover is page one and the contents page two; the sections start at three. */
const FIRST_SECTION_PAGE = 3

const contents: ContentsEntry[] = SHEETS.reduce<ContentsEntry[]>((acc, sheet, i) => {
  if (acc.at(-1)?.section !== sheet.section) {
    acc.push({ section: sheet.section, page: FIRST_SECTION_PAGE + i, line: sheet.line })
  }
  return acc
}, [])

export default function PortfolioPage() {
  return (
    <main className="pf-stack">
      <Sheet section="Cover" bare>
        <Cover />
      </Sheet>
      <Sheet section="Contents">
        <Contents entries={contents} />
      </Sheet>
      {SHEETS.map((sheet, i) => (
        <Sheet key={i} section={sheet.section}>
          {sheet.body}
        </Sheet>
      ))}
    </main>
  )
}
