import Link from 'next/link'
import { WRITING, writingHref } from '@/lib/writing'
import { UBIK_ARCHIVE_TYPE } from '@/components/features/demo/ubik/shared'

/** From the archive: Ubik's own writing, rebuilt here in full. */
export function ArchiveSection() {
  const writeUps = WRITING.filter((entry) => entry.slug && entry.type === UBIK_ARCHIVE_TYPE)

  return (
    <section className="space-y-3">
      <h2 className="aka-lead">From the archive</h2>
      <p>
        Ubik wrote about itself while it was alive: a newsletter, a blog, internal design documents.
        The pieces that survive are rebuilt here in full, in their own words, as artifacts of what
        the company believed while it was believing it.
      </p>
      <ul className="list-none space-y-2.5 p-0">
        {writeUps.map((entry) => (
          <li key={entry.title}>
            <Link href={writingHref(entry)} className="group block aka-card-well px-4 py-3">
              <p className="text-[13.5px] font-medium text-foreground/90 transition-colors group-hover:text-foreground">
                {entry.title}
              </p>
              <p className="mt-1 text-[12.5px] font-light leading-relaxed text-muted-foreground">
                {entry.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
