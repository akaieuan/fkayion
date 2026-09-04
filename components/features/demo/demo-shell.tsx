import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

/**
 * The shell every page under /demo stands in.
 *
 * Before this existed, all twenty-two write-ups carried a copied class string
 * for the same frame, and one of them drifted: the akaSTYLE page tuned its
 * own padding and printed the fixed Projects link over its own headline,
 * because the rule "a full-width page must clear the link's band" lived in no
 * file. Now the frame is one definition and every page stands in it instead
 * of pasting what the last page had.
 *
 * One kind, taken from the Ubik page, which is the page this site is most
 * judged by: the reading column. `px-6 py-16`, one centred `max-w-2xl`
 * article, `overflow-x-clip` so full-bleed figures can overhang without
 * growing the page. The left margin stays empty at `lg`, which is what the
 * fixed Projects link stands in. A section that needs the site's width takes
 * it from inside the column with `.aka-breakout` rather than asking for a
 * wider shell.
 *
 * The small back link is the under-`lg` way home, where the fixed link does
 * not exist; it was copied into every page and is now written once here. The
 * full-bleed demo screens (hitl-ai) and the /demo index are not shells at all
 * and do not use this.
 */
export function DemoShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-clip bg-background px-6 py-16">
      <article className="mx-auto max-w-2xl">
        <BackToProjects />
        {children}
      </article>
    </div>
  )
}

function BackToProjects() {
  return (
    <Link
      href="/demo"
      className="mb-8 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground lg:hidden"
    >
      <ArrowLeft className="h-3.5 w-3.5" />
      Projects
    </Link>
  )
}
