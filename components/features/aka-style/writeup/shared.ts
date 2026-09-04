/*
 * The write-up's shared chrome: the surfaces its sections compose from.
 *
 * This is the /demo/aka-style write-up's own set, not the specimen pages'.
 * It used to carry a kicker and a section title as well. The kicker was kept
 * as a deliberate /80 step from the specimen chrome's /70, and the step never
 * rendered: the theme colours are bare var() with no alpha slot, so both
 * compiled to the same inherited ink. They were one class all along, so they
 * are `.aka-kicker` and `.aka-section-title` in globals.css now, written at
 * each use site.
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
