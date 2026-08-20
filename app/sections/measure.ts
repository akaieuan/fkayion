/**
 * The landing's reading measure.
 *
 * One string in one place because two sections depend on it agreeing: the hero
 * sits in this box, and Writing and Music start on the same line as the hero's
 * title. Change it here and both move together; change it in one file and the
 * page quietly goes crooked.
 *
 * The width is set by the hero, not by the prose. The hero is a title beside a
 * mark, and the box is sized so the pair fills it exactly — a box wider than
 * its contents is a pair that reads as pushed to the left, however centred the
 * box itself is.
 */
export const MEASURE = 'mx-auto w-full max-w-[38rem]'
