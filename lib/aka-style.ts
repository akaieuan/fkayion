/**
 * The parts of akaSTYLE that are data rather than markup.
 *
 * Two pages render this: the live specimen at /aka-style, which shows each
 * piece next to the thing it governs, and the write-up at /demo/aka-style,
 * which shows the same pieces as the argument for having them. A system whose
 * own two pages disagreed about what its rules are would be making the exact
 * mistake it exists to prevent, so the rules live here and both import them.
 */

/** The design language, stated as constraints — the portable part. */
export const LAWS = [
  {
    n: '01',
    rule: 'Mono for structure, sans for prose.',
    body: 'Uppercase mono kickers at 11px/0.18em tracking label every section. Body copy is font-light sans with generous leading. The contrast between the two carries the hierarchy, so headings rarely need to be big.',
  },
  {
    n: '02',
    rule: 'One accent, used sparingly.',
    body: 'Everything is greyscale on a near-black (or near-white) ground except a single quiet green. If two things on screen are competing for the accent, neither gets it.',
  },
  {
    n: '03',
    rule: 'Borders over shadows.',
    body: 'Depth comes from a 1px border and a translucent card fill, never a drop shadow. Rounded to 0.75rem for cards, 0.5rem for controls.',
  },
  {
    n: '04',
    rule: 'Motion moves space, never brightness.',
    body: 'Animation translates, scales, and displaces. It does not flash, strobe, or pulse opacity. This started as an accessibility rule for the audio-reactive work and became the house style.',
  },
  {
    n: '05',
    rule: 'Loops pause when unwatched.',
    body: 'Every canvas engine gates its RAF loop on an IntersectionObserver plus visibilitychange, and renders one still frame under prefers-reduced-motion. Ambient animation should cost nothing when nobody is looking.',
  },
  {
    n: '06',
    rule: 'Layout never jumps.',
    body: 'Tabbed regions are floored to the tallest tab at each breakpoint. Images ship with intrinsic dimensions and blur placeholders. Switching views should never move the content under a reader.',
  },
  {
    n: '07',
    rule: 'Server by default.',
    body: 'Components stay server-rendered unless they need state, an event, or a canvas. The client boundary is drawn as deep in the tree as possible — a card is a server component even when its page is interactive.',
  },
] as const

/** The surface tokens. Every one of these resolves from a CSS variable. */
export const SWATCHES = [
  { name: 'background', varName: '--background', cls: 'bg-background' },
  { name: 'foreground', varName: '--foreground', cls: 'bg-foreground' },
  { name: 'card', varName: '--card', cls: 'bg-card' },
  { name: 'muted', varName: '--muted', cls: 'bg-muted' },
  { name: 'border', varName: '--border', cls: 'bg-border' },
  { name: 'primary', varName: '--primary', cls: 'bg-primary' },
] as const

/** The accent set the canvas engines roll through. */
export const ACCENTS = [
  { name: 'accent-green', v: 'var(--accent-green)' },
  { name: 'accent-blue', v: 'var(--accent-blue)' },
  { name: 'accent-amber', v: 'var(--accent-amber)' },
  { name: 'accent-rose', v: 'var(--accent-rose)' },
  { name: 'accent-violet', v: 'var(--accent-violet)' },
] as const

/**
 * Where the language actually runs.
 *
 * Typed rather than `as const`: with a literal union, `internal` only exists on
 * the members that set it, and every consumer has to narrow before it can ask
 * whether a row is a `Link` or an `<a>`.
 */
export type UsageRow = {
  name: string
  what: string
  href: string
  /** Same-origin, so it routes rather than opening a tab. */
  internal?: boolean
}

export const USAGE: UsageRow[] = [
  {
    name: 'akabuild.dev',
    what: 'This site. The faces hero, pixel aka wordmark, the project-card vocabulary, every write-up page.',
    href: '/',
    internal: true,
  },
  {
    name: 'akaoss.dev',
    what: 'The open-source studio site: same type scale and card system, with the sparkle mark as its brand variant.',
    href: 'https://www.akaoss.dev',
  },
  {
    name: 'HITL Kit',
    what: 'Nineteen human-in-the-loop React primitives, installable via the shadcn CLI. The interaction half of this language.',
    href: '/demo/hitl-kit',
    internal: true,
  },
  {
    name: 'Trickle UI Kit',
    what: '47 pure-CSS text-animation primitives: the motion rules above, packaged as zero-runtime components.',
    href: '/demo/trickle-ui-kit',
    internal: true,
  },
  {
    name: 'boxpopuli.live · akacovart.com',
    what: 'Client and studio work that borrows the dark ground, bordered cards, and mono labelling wholesale.',
    href: '/demo/box-populi',
    internal: true,
  },
]

/** The brand engine's family: one canvas, one subtraction per brand. */
export const MARK_FAMILY = [
  { icon: 'disc-aka', name: 'akaBuild', note: 'wordmark void' },
  { icon: 'spark', name: 'akaOSS', note: 'sparkle void' },
  { icon: 'gamepad', name: 'Games', note: 'work line' },
] as const
