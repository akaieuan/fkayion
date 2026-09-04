/**
 * Shared chrome for the akaSTYLE specimen pages.
 *
 * Each of these class strings used to be five identical copies, one per page.
 * Only strings that are byte-identical across the pages that use them live
 * here; a variant that differs stays local to its page.
 *
 * The kicker, the card label and the code chip are not here any more. They
 * are house vocabulary rather than specimen chrome, so they are `.aka-kicker`,
 * `.aka-label` and `.aka-code` in globals.css, written at each use site the
 * same way the site's own pages write them.
 */

/** The default card surface. Was `cardCls` on the overview and foundations, `cell` on marks and faces. */
export const card = 'aka-card p-5'

/** Quiet mono caption. Was an identical copy on marks and faces. */
export const mono = 'font-mono text-11 text-muted-foreground/60'
