/**
 * Shared chrome for the akaSTYLE specimen pages.
 *
 * Each of these class strings used to be five identical copies, one per page.
 * Only strings that are byte-identical across the pages that use them live
 * here; a variant that differs stays local to its page. Foundations used to
 * keep its own code chip a half point smaller, until the type scale closed
 * and the two landed on the same step.
 *
 * The section kicker is not here any more. It is house vocabulary rather than
 * specimen chrome, so it is `.aka-kicker` in globals.css and written at each
 * use site, the same way the site's own pages write it.
 */

/** Small uppercase label. Was an identical copy in all five specimen pages. */
export const label = 'text-10 font-medium uppercase tracking-[0.14em] text-muted-foreground/50'

/** Inline code chip at 11px. Was `code` on the overview, `codeCls` on faces and, at 10.5px, on foundations. */
export const codeChip = 'rounded bg-muted/60 px-1 py-0.5 font-mono text-11'

/** The default card surface. Was `cardCls` on the overview and foundations, `cell` on marks and faces. */
export const card = 'aka-card p-5'

/** Quiet mono caption. Was an identical copy on marks and faces. */
export const mono = 'font-mono text-11 text-muted-foreground/60'
