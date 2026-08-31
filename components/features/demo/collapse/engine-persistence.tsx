import { code } from '@/components/features/demo/collapse/chrome'

/** Engine & persistence. Moved verbatim from app/demo/collapse/page.tsx. */
export function EnginePersistenceSection() {
  return (
          <section className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Engine &amp; persistence</h2>
            <ul className="list-disc space-y-2 pl-5 marker:text-muted-foreground/50">
              <li>
                <span className="text-foreground/85">Template engine.</span> One annotation → one
                skill, or a whole lesson → one skill; auto-derives up to five Claude trigger phrases
                from your annotation tips and titles.
              </li>
              <li>
                <span className="text-foreground/85">Cross-language equivalents.</span> Pulled
                automatically from sibling <code className={code}>&lt;LangTab&gt;</code> blocks, so the
                generated SKILL.md carries the translation inline.
              </li>
              <li>
                <span className="text-foreground/85">Quality linter.</span> clean / info / warn
                verdicts on description length, trigger-phrase ambiguity, kebab-case naming, and body
                size — shown as colored dots in the skills viewer.
              </li>
              <li>
                <span className="text-foreground/85">Local atomic writes.</span> Zod-validated POST,{' '}
                <code className={code}>.tmp</code> + rename, path-traversal rejected, 409 on collision.
                No telemetry, no cloud, no database — the filesystem is the storage layer.
              </li>
            </ul>
          </section>
  )
}
