import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { LAB_ENTRIES, findEntry } from '@/components/demo/bkz-lab-log/entries'
import { LabProse } from '@/components/demo/bkz-lab-log/prose'

type Params = { params: { slug: string } }

/** Every entry is known at build time, so every entry is a static page. */
export function generateStaticParams() {
  return LAB_ENTRIES.map((entry) => ({ slug: entry.slug }))
}

export function generateMetadata({ params }: Params) {
  const entry = findEntry(params.slug)
  if (!entry) return { title: 'BKZ lab log | akaBuild' }
  return {
    title: `${entry.title} | BKZ lab log`,
    description: entry.standfirst,
  }
}

export default function LabEntryPage({ params }: Params) {
  const entry = findEntry(params.slug)
  if (!entry) notFound()

  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <article className="mx-auto max-w-2xl">
        <Link
          href="/demo/blenderpipeline/bkz-lab-log"
          className="mb-10 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          BKZ lab log
        </Link>

        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/80">
          {entry.kicker}
        </p>
        <h1 className="mt-2 text-2xl font-light leading-snug tracking-tight text-foreground md:text-[26px]">
          {entry.title}
        </h1>
        <p className="mt-4 text-[15px] font-light leading-relaxed text-foreground/85">
          {entry.standfirst}
        </p>
        <p className="mt-4 font-mono text-[11px] text-muted-foreground/60">
          {entry.published} · Brooklyn Dead asset pipeline
        </p>

        <LabProse blocks={entry.body} />

        <Link
          href="/demo/blenderpipeline"
          className="mt-14 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to the pipeline
        </Link>
      </article>
    </div>
  )
}
