import { card as cardCls } from '@/components/features/aka-style/shared'

// Foundations sets its inline code chip a half point smaller than the shared
// codeChip, so the string stays local to this page rather than moving to chrome.ts.
const codeCls = 'rounded bg-muted/60 px-1 py-0.5 font-mono text-[10.5px]'

/** Shape: radius and rule. Moved verbatim from app/aka-style/foundations/page.tsx. */
export function RadiusSection() {
  return (
        <section className="mt-16">
          <p className="aka-kicker">Shape</p>
          <h2 className="mt-2 aka-section-title">
            Radius &amp; rule
          </h2>
          <p className="aka-standfirst">
            Radius scales with the surface: the bigger the box, the softer the corner. One border
            weight everywhere: 1px at token colour. Depth comes from surface lightness, not from a
            glow. Nothing the system itself draws carries a shadow, and the ones you will find in
            the repo are inside product mockups drawing someone else&apos;s interface.
          </p>
          <p className="aka-standfirst">
            Three steps are derived from <code className={codeCls}>--radius: 0.625rem</code> in the
            Tailwind config, so moving one number moves the set. Only{' '}
            <code className={codeCls}>xl</code> and the default are Tailwind&apos;s own.
          </p>
          <div className={`${cardCls} mt-6`}>
            <div className="flex flex-wrap items-end gap-6">
              {[
                ['rounded', '4px', 'code chips', 'rounded'],
                ['rounded-sm', '6px', 'tags, sm buttons', 'rounded-sm'],
                ['rounded-md', '8px', 'inputs', 'rounded-md'],
                ['rounded-lg', '10px', 'buttons, media', 'rounded-lg'],
                ['rounded-xl', '12px', 'cards, panels', 'rounded-xl'],
                ['rounded-full', '∞', 'dots, toggles, avatars', 'rounded-full'],
              ].map(([n, v, use, cls]) => (
                <div key={n as string} className="flex flex-col items-center gap-2">
                  <span
                    className={`block h-14 w-14 border border-border bg-muted/40 ${cls as string}`}
                  />
                  <span className="font-mono text-[10px] text-foreground/80">{n}</span>
                  <span className="text-[10px] text-muted-foreground/50">{v}</span>
                  <span className="text-[9.5px] text-muted-foreground/40">{use}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
  )
}
