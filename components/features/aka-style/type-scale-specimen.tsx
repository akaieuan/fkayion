import { card as cardCls } from '@/components/features/aka-style/shared'

/**
 * The type scale, each size set at itself.
 *
 * Nine names and no others, as tailwind.config.cjs defines them: eight pixel
 * steps and a fluid display size. The foundations ramp and the overview both
 * render this one card, so the two pages cannot list different scales. The
 * one sentence repeats down the card so that size is the only thing changing
 * from row to row.
 */
const TYPE_SCALE = [
  ['text-10', '10px'],
  ['text-11', '11px'],
  ['text-12', '12px'],
  ['text-13', '13px'],
  ['text-14', '14px'],
  ['text-15', '15px'],
  ['text-17', '17px'],
  ['text-20', '20px'],
  ['text-display', 'fluid'],
] as const

export function TypeScaleSpecimen() {
  return (
    <>
      <div className={`${cardCls} mt-6 space-y-4`}>
        {TYPE_SCALE.map(([name, px]) => (
          <div
            key={name}
            className="flex flex-col gap-1 border-b border-border/40 pb-3 last:border-0 last:pb-0"
          >
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-mono text-11 text-foreground/85">{name}</span>
              <span className="font-mono text-10 text-muted-foreground/50">{px}</span>
            </div>
            <p
              className={`${name} ${
                name === 'text-display' ? 'font-extralight leading-none tracking-tight' : 'font-light'
              } text-foreground/85`}
            >
              Ship the smallest true thing.
            </p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-12 font-light leading-relaxed text-muted-foreground/70">
        <span className="text-foreground/80">The scale is closed.</span> These nine are the sizes
        the config names, and a size is one of them or it is not on the site: an arbitrary pixel
        size is a violation the check reports.
      </p>
    </>
  )
}
