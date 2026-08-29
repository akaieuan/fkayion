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
    rule: 'Light falls, nothing casts.',
    body: 'Depth is a 1px edge and a graded fill, never a drop shadow. A raised card grades light-to-dark downward and lifts its top edge; a recessed well inverts both. Fine grain over the fill keeps a gradient this shallow from banding. Rounded to 0.75rem for cards, 0.5rem for controls.',
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

/**
 * The surfaces, as named materials rather than copied class strings.
 *
 * This is the vocabulary law 03 produces once you take it literally. If depth
 * cannot be cast, it has to be inside the panel, which means a fill that
 * grades and an edge that is brighter where the light lands. Two materials
 * come out of that: one lit from above, and the same one with the light
 * reversed, which is what a cut into the page looks like.
 *
 * They live in globals.css as classes, so the specimen below and every page
 * that uses them are the same definition. The strings these replaced were
 * copied by hand into two dozen files and had already drifted into four
 * variants of themselves.
 */
export type Surface = {
  cls: string
  name: string
  what: string
  /*
   * What to render the specimen tile itself in.
   *
   * A specimen for a material that is drawn in a different material is a
   * picture of the thing rather than the thing, which is the failure this
   * whole page exists to avoid. So the well's tile is a well, and the lift's
   * tile actually lifts when you hover it.
   */
  render: string
  /** How the material is built, in the order the layers stack. */
  layers: string[]
}

export const SURFACES: Surface[] = [
  {
    cls: 'aka-card',
    render: 'aka-card',
    name: 'Card',
    what: 'Raised. Sits on the page. Content, specimens, and anything that is also a control.',
    layers: [
      'fill grades from --card-fill-top down to --card-fill-bottom',
      'edge at --card-edge, top edge lifted to --card-edge-top',
      'grain over the fill, blended soft-light',
    ],
  },
  {
    cls: 'aka-card-well',
    render: 'aka-card-well',
    name: 'Well',
    what: 'Recessed. Cut into the page. Callouts, closing notes, code, and media.',
    layers: [
      'fill grades from --card-well-top up to --card-well-bottom',
      'edge at --card-well-edge, top edge darkened to the lip of the cut',
      '.aka-card-media flattens it to the ground: no grain, no grade, behind artwork',
    ],
  },
  {
    cls: 'aka-card-head',
    render: 'aka-card',
    name: 'Head',
    what: 'The band across the top of a card, for a label row. A step toward the mid-tone in either theme, so it darkens in light and lightens in dark from one definition.',
    layers: ['--card-head fill', 'a --card-rule hairline underneath'],
  },
  {
    cls: 'aka-card-lift',
    render: 'aka-card aka-card-lift',
    name: 'Lift',
    what: 'A card that is also a control. Hover moves it 2px and sharpens the edge; it never brightens, per law 04.',
    layers: ['translateY(-2px) over 320ms', 'edge to --card-edge-hover', 'no transform under prefers-reduced-motion'],
  },
]

/** The brand engine's family: one canvas, one subtraction per brand. */
export const MARK_FAMILY = [
  { icon: 'disc-aka', name: 'akaBuild', note: 'wordmark void' },
  { icon: 'spark', name: 'akaOSS', note: 'sparkle void' },
  { icon: 'gamepad', name: 'Games', note: 'work line' },
] as const
