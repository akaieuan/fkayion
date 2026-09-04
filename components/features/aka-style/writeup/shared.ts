/*
 * The write-up's shared chrome: the class strings its sections compose from.
 *
 * This is the /demo/aka-style write-up's own set, not the specimen pages'.
 * The kicker here is the /80 variant, a deliberate step from the specimen
 * chrome's /70, so the two files stay separate on purpose.
 */
export const kicker = 'text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/80'
export const sectionH = 'mt-2 text-xl font-light tracking-tight text-foreground/90'
/*
 * The house surfaces, by name. `.aka-card` is the raised material and
 * `.aka-card-well` the recessed one; both are defined once in globals.css,
 * so this page is showing the reader the same two classes the rest of the
 * site is built from rather than a copy of them.
 */
export const card = 'aka-card'
export const well = 'aka-card-well'
export const tile = 'group block aka-card aka-card-lift px-4 py-3.5'
