'use client'

import { useId, useMemo, useState } from 'react'

/**
 * The one piece of client state on the page.
 *
 * The cards it filters are server components. Each arrives here already
 * rendered, as a node on `items`, and this file never looks inside one: it
 * knows an id, a list of lenses, and something opaque to place in the grid.
 * No project copy, logo, image or card markup crosses into the client bundle.
 *
 * Passing rendered nodes rather than a pre-built panel per lens matters. A panel
 * per lens is less code here and renders the same project once for every lens it
 * belongs to; this renders each card exactly once and lets the filter choose
 * which of them to mount.
 */

export type Lens = { id: string; label: string }
export type WorkItem = { id: string; lenses: string[]; node: React.ReactNode }

export function WorkLens({ lenses, items }: { lenses: Lens[]; items: WorkItem[] }) {
  const [active, setActive] = useState(lenses[0]?.id ?? 'all')
  const gridId = useId()

  const all = lenses[0]?.id
  // The first lens is the unfiltered one, so it never has to test anything.
  const shown = useMemo(
    () => (active === all ? items : items.filter((i) => i.lenses.includes(active))),
    [active, all, items]
  )

  // Counted from the work rather than written down, so a project added to
  // lib/projects.ts can never leave a number on this page wrong.
  const counts = useMemo(
    () =>
      new Map(
        lenses.map((lens) => [
          lens.id,
          lens.id === all ? items.length : items.filter((i) => i.lenses.includes(lens.id)).length,
        ])
      ),
    [all, items, lenses]
  )

  return (
    <div>
      <div role="tablist" aria-label="Filter work" className="flex flex-wrap gap-1.5">
        {lenses.map((lens) => {
          const selected = lens.id === active
          return (
            <button
              key={lens.id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={gridId}
              onClick={() => setActive(lens.id)}
              className={`rounded-md border px-3 py-1.5 text-[12px] font-light tracking-wide transition-colors ${
                selected
                  ? 'border-[var(--select)]/50 bg-[var(--select)]/10 text-[var(--select)]'
                  : 'border-border/70 text-muted-foreground/70 hover:border-foreground/30 hover:text-foreground'
              }`}
            >
              {lens.label}
              <span className={`ml-1.5 tabular-nums ${selected ? 'opacity-60' : 'opacity-45'}`}>
                {counts.get(lens.id)}
              </span>
            </button>
          )
        })}
      </div>

      <ul
        id={gridId}
        className="mt-5 grid list-none auto-rows-fr grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3"
      >
        {shown.map((item) => (
          // Keyed by project, so a card that survives a filter change is moved
          // rather than torn down and rebuilt.
          <li key={item.id} className="h-full">
            {item.node}
          </li>
        ))}
      </ul>
    </div>
  )
}
