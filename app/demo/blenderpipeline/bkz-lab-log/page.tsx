import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { LAB_ENTRIES } from '@/components/demo/bkz-lab-log/entries'
import { JsonLd, breadcrumbSchema, collectionSchema } from '@/components/seo/json-ld'

const PATH = '/demo/blenderpipeline/bkz-lab-log'
const TITLE = 'BKZ lab log'
const DESCRIPTION =
  'Findings and methodology from the Brooklyn Dead asset pipeline: what broke, how it was measured, what the numbers said before and after, and what was priced and then refused.'
const HERO = '/bkz/mob-lab-night.webp'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    type: 'website',
    url: PATH,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: HERO, width: 1280, height: 720, alt: 'The mob lab at night' }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: [HERO] },
}

export default function LabLogIndexPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <JsonLd
        data={[
          collectionSchema({
            path: PATH,
            name: TITLE,
            description: DESCRIPTION,
            items: LAB_ENTRIES.map((e) => ({ name: e.title, path: `${PATH}/${e.slug}` })),
          }),
          breadcrumbSchema([
            { name: 'Projects', path: '/demo' },
            { name: 'Brooklyn Dead', path: '/demo/blenderpipeline' },
            { name: TITLE, path: PATH },
          ]),
        ]}
      />
      <article className="mx-auto max-w-2xl">
        <Link
          href="/demo/blenderpipeline"
          className="mb-10 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Brooklyn Dead
        </Link>

        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/80">
          BKZ lab log
        </p>
        <h1 className="mt-2 text-2xl font-light tracking-tight text-foreground md:text-[26px]">
          Findings from the pipeline
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Working notes from a codebase that builds its own art.
        </p>

        <div className="mt-10 space-y-6 text-[15px] font-light leading-relaxed text-muted-foreground">
          <p>
            When assets are generated rather than modelled, a bug is rarely in one asset. It is in a
            shared assumption, and it shows up across the whole set at once. That makes the
            investigation worth writing down: the fix takes an afternoon, but the reason it was
            invisible for months is the part that generalises.
          </p>
          <p>
            Entries come in two shapes. A finding is one bug followed all the way down: what the
            gate said, what the render said, how the gap between them was measured, and what was
            deliberately left alone. A sheet is the opposite, a snapshot of what the pipeline
            currently produces with no history in it at all.
          </p>
          <p>
            Numbers are given as measured, including the ones that make the old code look worse, and
            the work that was priced and then refused is written up alongside the work that landed.
          </p>
        </div>

        <ol className="mt-12 list-none space-y-4 p-0">
          {LAB_ENTRIES.map((entry) => (
            <li key={entry.slug}>
              <Link
                href={`/demo/blenderpipeline/bkz-lab-log/${entry.slug}`}
                className="group block rounded-xl border border-border/80 bg-muted/10 px-5 py-5 transition-colors hover:border-foreground/25"
              >
                <span className="flex items-baseline justify-between gap-4">
                  <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground/70">
                    {entry.kicker}
                  </span>
                  <span className="shrink-0 font-mono text-[10px] text-muted-foreground/60">
                    {entry.published}
                  </span>
                </span>
                <span className="mt-2.5 flex items-start justify-between gap-4">
                  <span className="text-[17px] font-light leading-snug text-foreground">
                    {entry.title}
                  </span>
                  <ArrowUpRight className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground/50 transition-colors group-hover:text-foreground" />
                </span>
                <span className="mt-2 block text-[14px] font-light leading-relaxed text-muted-foreground">
                  {entry.standfirst}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </article>
    </div>
  )
}
