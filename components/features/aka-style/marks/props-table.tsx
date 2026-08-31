import { kicker, label } from '@/components/features/aka-style/chrome'

/** Reference: the full PixelHead prop table. Moved verbatim from app/aka-style/marks/page.tsx. */
export function PropsSection() {
  return (
        <section className="mt-16">
          <p className={kicker}>Reference</p>
          <h2 className="mt-2 text-xl font-light tracking-tight text-foreground/90">Props</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left">
              <thead>
                <tr className="border-b border-border">
                  {['prop', 'type', 'what it does'].map((h) => (
                    <th key={h} className={`${label} pb-2 pr-4 font-medium`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-[12px] font-light text-muted-foreground">
                {[
                  ['size', 'number', 'Canvas CSS px. Required.'],
                  ['grid', 'number', 'Cells across. 14 for chrome, 22–32 for display.'],
                  ['icon', 'disc-aka | head | spark | bubble | gamepad | aka | nyz | pogo', 'What is subtracted, or which wordmark is drawn.'],
                  ['variant', 'negative | figure', 'Disc-with-void, or drawn shape in a ring.'],
                  ['mode', 'ash | explode | scatter | glitch', 'Dissolve order.'],
                  ['gap', 'number', 'Gutter as a fraction of a cell.'],
                  ['faces', 'boolean', 'Cycle expressions inside the void while assembled.'],
                  ['face', 'wink | thinking', 'Hold one expression — persona marks.'],
                  ['faceIndex', 'number', 'Hold expression n. Gallery use; face is the stable API.'],
                  ['startAssembled', 'boolean', 'With faces: open on the first expression rather than assembling into it.'],
                  ['still', 'boolean', 'One assembled frame, never animates. Logo use.'],
                  ['once', 'boolean', 'Assemble on first view, then hold.'],
                  ['shimmer', 'boolean', 'With once: a quiet ~3Hz twinkle on ~4% of cells.'],
                  ['fluid', 'boolean', 'Scale down with the container, capped at size.'],
                  ['color', 'string', 'Override the pixel colour. Defaults to --foreground.'],
                  ['speed', 'number', 'Loop rate multiplier.'],
                ].map(([p, t, d]) => (
                  <tr key={p} className="border-b border-border/40">
                    <td className="py-2 pr-4 align-top font-mono text-[11px] text-foreground/85">{p}</td>
                    <td className="py-2 pr-4 align-top font-mono text-[10.5px] text-muted-foreground/70">{t}</td>
                    <td className="py-2 align-top">{d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
  )
}
