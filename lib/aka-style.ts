/**
 * The parts of akaSTYLE that are data rather than markup.
 *
 * Two pages render this: the live specimen at /aka-style, which shows each
 * piece next to the thing it governs, and the write-up at /demo/aka-style,
 * which shows the same pieces as the argument for having them. A system whose
 * own two pages disagreed about what its rules are would be making the exact
 * mistake it exists to prevent, so the rules live here and both import them.
 */

/** The design language, stated as constraints: the portable part. */
export const LAWS = [
  {
    n: '01',
    rule: 'Mono for structure, sans for prose.',
    body: 'Uppercase mono kickers at 11px/0.18em tracking label every section. Body copy is font-light sans with generous leading. The contrast between the two carries the hierarchy, so headings rarely need to be big. Sizes come from one closed scale, eight pixel steps and a display size, and nothing off it.',
  },
  {
    n: '02',
    rule: 'One accent, used sparingly.',
    body: 'Everything is greyscale on a near-black (or near-white) ground except a single quiet green. If two things on screen are competing for the accent, neither gets it. The five-hue accent set belongs to the art layer, not the interface; the one place it reaches the chrome is where hue is the value rather than decoration on one, as in the deck\u2019s position pill.',
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
    body: 'Components stay server-rendered unless they need state, an event, or a canvas. The client boundary is drawn as deep in the tree as possible: a card is a server component even when its page is interactive.',
  },
  {
    n: '08',
    rule: 'Per-frame state lives in the DOM.',
    body: 'Anything changing at sixty frames a second is written straight to a CSS variable or a data attribute and React is never told; React state is for what changes at human speed. The projects deck scrolls eighteen covers for zero re-renders, because its position is one custom property the CSS reads and every cover derives its own pose from it.',
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
  /*
   * A surface that cannot be its own tile.
   *
   * The rule above holds for every material you can set type on. Glass cannot:
   * it is a saturated accent, and a card's label and body text on top of it are
   * unreadable. So that one renders as a card and carries a bar of the real
   * material inside it: still the material itself, just not underneath the
   * words describing it.
   */
  sample?: string
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
  {
    cls: 'aka-glass',
    render: 'aka-card',
    sample: 'aka-glass',
    name: 'Glass',
    what: 'The accent as a surface, and the only one that carries colour. Law 02 spends the accent once per screen, so the test is subject rather than count: the deck’s progress pill and the control that selects the deck are the same subject and may share it. A second, unrelated glass on a screen is the law being broken.',
    layers: [
      'a white specular along the top, blended soft-light',
      'a soft inner light at the leading edge, blended overlay',
      'the accent ramp beneath both at less than full strength, so the backdrop reads through: it resolves from --glass-a, --glass-b and --glass-c, which default to blue, violet and rose',
      'aka-glass-rose leads the same ramp from the rose end, for a second glass control sitting beside the first',
      'backdrop-filter: blur(14px) saturate(1.9)',
    ],
  },
]

/**
 * The scroll-linked deck, as the seven numbers that shape it.
 *
 * This is what law 08 buys in practice. The controller writes one value and
 * these decide what that value means, which is also why the phone deck is not
 * a second implementation: it is these numbers, smaller.
 */
export const FLOW: { name: string; what: string }[] = [
  { name: '--flow', what: 'The deck position, 0…n-1. The only thing JavaScript writes per frame.' },
  { name: '--flow-cover', what: "The centred cover's width. 62vw on a phone, 400px from lg. Everything else is derived from it." },
  { name: '--flow-near', what: 'How far the first off-centre cover sits, as a fraction of the cover, so the deck always overlaps by the same amount.' },
  { name: '--flow-far', what: 'The extra fan per card beyond the first, so each edge reads as a deck of many rather than a deck of one.' },
  { name: '--flow-depth', what: 'How far back an off-centre cover is pushed. preserve-3d sorts them by it, so nothing computes a z-index.' },
  { name: '--flow-turn', what: 'How far it rotates away. 36° on a phone, 48° from lg: the same deck, flattened.' },
  { name: '--flow-step', what: 'How much page scroll advances the deck by one cover. The first and last third of each step holds a cover landed, so stopping between two of them is something you have to aim for.' },
]

/** The brand engine's family: one canvas, one subtraction per brand. */
export const MARK_FAMILY = [
  { icon: 'disc-aka', name: 'akaBuild', note: 'wordmark void' },
  { icon: 'spark', name: 'akaOSS', note: 'sparkle void' },
  { icon: 'gamepad', name: 'Games', note: 'work line' },
] as const
