// The token-table primitives the foundations sections render with. Moved
// verbatim from app/aka-style/foundations/page.tsx.

import { label } from '@/components/features/aka-style/shared'

/** A row in a token table: name, live swatch or bar, and the literal value. */
export function Row({
  name,
  value,
  children,
}: {
  name: string
  value: string
  children?: React.ReactNode
}) {
  return (
    <tr className="border-b border-border/40">
      <td className="py-2.5 pr-4 align-middle font-mono text-[11px] text-foreground/85">{name}</td>
      <td className="py-2.5 pr-4 align-middle">{children}</td>
      <td className="py-2.5 align-middle font-mono text-[10.5px] text-muted-foreground/70">{value}</td>
    </tr>
  )
}

export function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full min-w-[460px] border-collapse text-left">
        <thead>
          <tr className="border-b border-border">
            {['token', '', 'value'].map((h, i) => (
              <th key={i} className={`${label} pb-2 pr-4 font-medium`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}
