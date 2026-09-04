/*
 * The write-up's shared chrome: the surfaces its sections compose from.
 *
 * This is the /demo/aka-style write-up's own set, not the specimen pages'
 * (those live in components/features/aka-style/shared.ts).
 * The kicker and the section title used to be here too; they are house
 * vocabulary rather than this page's chrome, so they are `.aka-kicker` and
 * `.aka-section-title` in globals.css, written at each use site.
 */
/*
 * The house surfaces, by name. `.aka-card` is the raised material and
 * `.aka-card-well` the recessed one; both are defined once in globals.css,
 * so this page is showing the reader the same two classes the rest of the
 * site is built from rather than a copy of them.
 */
export const card = 'aka-card'
export const well = 'aka-card-well'
export const tile = 'group block aka-card aka-card-lift px-4 py-3.5'
