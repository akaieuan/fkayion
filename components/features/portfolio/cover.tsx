import { PixelHead } from '@/components/features/brand/pixel-head'

/** The contact lines: the site, the studio address, the code. No phone, no more. */
export const CONTACT = ['akabuild.dev', 'ieuan@ubik.studio', 'github.com/akaieuan'] as const

/**
 * The cover: the house mark, drawn by the engine the document later explains,
 * and the name. Quiet on purpose. The site's own rule is that hierarchy comes
 * from the contrast between mono and sans rather than from size, and a cover
 * that shouted would be the one page not built in the language it presents.
 */
export function Cover() {
  return (
    <div className="flex h-full flex-col justify-between">
      <PixelHead size={420} grid={32} icon="disc-aka" still />

      <div>
        <h1 className="text-display font-extralight leading-none tracking-tight text-foreground/90">
          Ieuan King
        </h1>
        <p className="mt-4 aka-kicker">
          Product design engineer · trained as an anthropologist · Brooklyn, NY
        </p>
        <p className="mt-10 text-15 font-light text-muted-foreground">Portfolio, 2026</p>
        <p className="mt-2 flex gap-8 font-mono text-12 text-muted-foreground/70">
          {CONTACT.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </p>
      </div>
    </div>
  )
}
