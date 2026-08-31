import { code } from '@/components/features/demo/collapse/shared'

/** Ingestors. Moved verbatim from app/demo/collapse/page.tsx. */
export function IngestorsSection() {
  return (
          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Ingestors</h2>
            <ul className="list-disc space-y-2 pl-5 marker:text-muted-foreground/50">
              <li>
                <span className="text-foreground/85">MDX lessons.</span> Annotated code fences with{' '}
                <code className={code}>{'{lines#id}'}</code> metadata linked to sibling{' '}
                <code className={code}>&lt;Note&gt;</code> blocks, scoped per-stack via{' '}
                <code className={code}>&lt;LangTab&gt;</code>, frontmatter-validated.
              </li>
              <li>
                <span className="text-foreground/85">Jupyter + MyST import.</span> Paste{' '}
                <code className={code}>.ipynb</code> JSON, upload a file, or drop MyST{' '}
                <code className={code}>.md</code>; it infers kernel language and auto-prefills
                annotations from MyST admonitions (note / warning / tip).
              </li>
              <li>
                <span className="text-foreground/85">Pluggable model.</span> Any source format ships in
                ~4 files following the <code className={code}>lib/notebook/</code> template — there’s a
                worked example in the docs.
              </li>
            </ul>
          </section>
  )
}
