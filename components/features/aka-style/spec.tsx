// Moved verbatim from app/aka-style/primitives/page.tsx.

/**
 * A spec block: the live primitive on the left, the exact class string under it.
 * The string is the deliverable: this page exists to be copied from.
 */
export function Spec({
  name,
  note,
  cls,
  children,
}: {
  name: string
  note?: string
  cls?: string
  children: React.ReactNode
}) {
  return (
    <div className="aka-card p-5">
      <div className="flex items-baseline justify-between gap-4">
        <p className="aka-label">{name}</p>
        {note && <p className="text-11 font-light text-muted-foreground/50">{note}</p>}
      </div>
      <div className="mt-3.5 flex flex-wrap items-center gap-3">{children}</div>
      {cls && (
        <pre className="mt-4 overflow-x-auto aka-card-well rounded-lg px-3 py-2 font-mono text-11 leading-relaxed text-muted-foreground/75">
          {cls}
        </pre>
      )}
    </div>
  )
}
