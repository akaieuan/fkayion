/**
 * The v1 prototype's data tables.
 *
 * Everything the prototype shows is fixture data — no network, no persistence.
 * It lives in a plain module rather than inside the component so the tables are
 * shared constants that never re-allocate on render, and so the pixel helpers
 * can import them without dragging the client island along.
 */

export type Project = {
  id: string
  name: string
  area: string
  /** A CSS var reference, so the hue follows the theme. */
  tone: string
  /** The same accent as a raw hue angle, for the generated photo mosaics. */
  hue: number
  since: string
  n: number
  last: string
  sev: number
}

export const PROJECTS: Project[] = [
  { id: 'acne', name: 'general acne', area: 'face · cheeks, jaw', tone: 'var(--accent-blue)', hue: 235, since: 'jan 2026', n: 84, last: '2d ago', sev: 2 },
  { id: 'cystic', name: 'cystic acne', area: 'left thigh, upper', tone: 'var(--accent-violet)', hue: 292, since: 'mar 2026', n: 31, last: 'today', sev: 4 },
  { id: 'psoriasis', name: 'psoriasis', area: '4 sites · elbows, scalp, shin', tone: 'var(--accent-amber)', hue: 60, since: 'nov 2024', n: 212, last: 'yesterday', sev: 3 },
]

export type Spot = {
  id: string
  pid: string
  side: 'front' | 'back'
  x: number
  y: number
  title: string
  n: number
}

export const SPOTS: Spot[] = [
  { id: 'cheekL', pid: 'acne', side: 'front', x: 43, y: 19, title: 'left cheek', n: 41 },
  { id: 'cheekR', pid: 'acne', side: 'front', x: 57, y: 19, title: 'right cheek', n: 38 },
  { id: 'jaw', pid: 'acne', side: 'front', x: 50, y: 30, title: 'jawline', n: 5 },
  { id: 'thigh', pid: 'cystic', side: 'front', x: 41, y: 143, title: 'left thigh, upper', n: 31 },
  { id: 'elbowL', pid: 'psoriasis', side: 'back', x: 24, y: 100, title: 'left elbow', n: 88 },
  { id: 'elbowR', pid: 'psoriasis', side: 'back', x: 76, y: 100, title: 'right elbow', n: 74 },
  { id: 'scalp', pid: 'psoriasis', side: 'back', x: 50, y: 12, title: 'scalp, crown', n: 30 },
  { id: 'shin', pid: 'psoriasis', side: 'front', x: 44, y: 182, title: 'right shin', n: 20 },
]

export type Entry = {
  d: string
  pid: string
  sev: number
  note: string
  tags: string[]
  tx: string
}

export const ENTRIES: Entry[] = [
  { d: '03 aug', pid: 'cystic', sev: 4, note: 'new one came up overnight, deep and sore. hot compress twice. not touching it.', tags: ['painful', 'swollen'], tx: 'warm compress, 10 min' },
  { d: '02 aug', pid: 'psoriasis', sev: 2, note: 'left elbow is the flattest it has looked all summer. still pink but no scale.', tags: ['flaking'], tx: 'clobetasol 0.05%, thin' },
  { d: '01 aug', pid: 'acne', sev: 2, note: 'jaw calmed down after four days. cheeks unchanged.', tags: ['healing'], tx: 'adapalene 0.1%, pea-size' },
  { d: '30 jul', pid: 'psoriasis', sev: 3, note: 'scalp itchy again after the heat. shin patch spreading a little at the edge.', tags: ['itchy', 'spreading'], tx: '' },
  { d: '28 jul', pid: 'acne', sev: 3, note: 'stopped the new cleanser. three days of stinging was enough.', tags: ['irritated'], tx: '' },
  { d: '26 jul', pid: 'cystic', sev: 5, note: 'worst it has been. could not sit properly at work. photographed for the derm.', tags: ['painful', 'swollen', 'weeping'], tx: 'ibuprofen' },
  { d: '24 jul', pid: 'psoriasis', sev: 3, note: 'both elbows steady. taking the shin off the daily list, weekly is enough.', tags: ['stable'], tx: 'clobetasol 0.05%, thin' },
  { d: '21 jul', pid: 'acne', sev: 3, note: 'week of bad sleep, week of bad skin. noting it, not concluding anything.', tags: ['inflamed'], tx: 'adapalene 0.1%, pea-size' },
]

export type Badge = { id: string; n: string; h: string; got: 0 | 1; p: number; of: number }

export const BADGES: { g: string; items: Badge[] }[] = [
  {
    g: 'consistency',
    items: [
      { id: 'first', n: 'first light', h: 'log one photo', got: 1, p: 1, of: 1 },
      { id: 'w1', n: 'seven', h: 'seven days running', got: 1, p: 7, of: 7 },
      { id: 'w4', n: 'thirty', h: 'thirty days running', got: 1, p: 30, of: 30 },
      { id: 'w13', n: 'ninety', h: 'ninety days running', got: 0, p: 31, of: 90 },
      { id: 'y1', n: 'one year', h: '365 days tracked', got: 0, p: 214, of: 365 },
    ],
  },
  {
    g: 'coverage',
    items: [
      { id: 'pin1', n: 'pinned', h: 'tag a location', got: 1, p: 1, of: 1 },
      { id: 'atlas', n: 'atlas', h: 'ten distinct sites', got: 0, p: 8, of: 10 },
      { id: 'both', n: 'both sides', h: 'front and back', got: 1, p: 2, of: 2 },
      { id: 'proj3', n: 'three files', h: 'three projects open', got: 1, p: 3, of: 3 },
    ],
  },
  {
    g: 'craft',
    items: [
      { id: 'steady', n: 'steady hand', h: 'five shots, same distance', got: 1, p: 5, of: 5 },
      { id: 'light', n: 'same light', h: 'ten shots, same light', got: 1, p: 10, of: 10 },
      { id: 'macro', n: 'close up', h: 'first macro shot', got: 1, p: 1, of: 1 },
      { id: 'series', n: 'the long take', h: 'fifty in one site', got: 0, p: 41, of: 50 },
    ],
  },
  {
    g: 'record',
    items: [
      { id: 'noted', n: 'noted', h: 'write a note', got: 1, p: 1, of: 1 },
      { id: 'diarist', n: 'diarist', h: 'twenty-five notes', got: 1, p: 25, of: 25 },
      { id: 'regimen', n: 'regimen', h: 'log treatment 14 days', got: 0, p: 9, of: 14 },
      { id: 'export', n: 'handover', h: 'build one clinic pdf', got: 0, p: 0, of: 1 },
      { id: 'e100', n: 'one hundred', h: 'a hundred entries', got: 1, p: 100, of: 100 },
      { id: 'e500', n: 'five hundred', h: 'five hundred entries', got: 0, p: 327, of: 500 },
    ],
  },
  {
    g: 'the sprite',
    items: [
      { id: 'dress', n: 'dressed', h: 'change one piece', got: 1, p: 1, of: 1 },
      { id: 'kit', n: 'full kit', h: 'every slot customised', got: 0, p: 4, of: 6 },
    ],
  },
]

export const SKINS = ['#fae3d2', '#f4dbc8', '#eccdab', '#e8c19b', '#dcae86', '#d3a074', '#c08a5c', '#a9713f', '#8f5c2e', '#7a4a24', '#5f381a', '#4d2c14', '#3a2010', '#e0b9a0', '#cf9d84', '#b58468']
export const HAIRCS = ['#141210', '#241f1b', '#3d2f26', '#5b3a22', '#7c4a24', '#a9682f', '#c98d3f', '#dcbb72', '#efdcae', '#b5433a', '#e2735a', '#9a9a95', '#d8d5cd', '#8fd9a6', '#7fb0e3', '#b39de8', '#e88fae', '#5fc2c8']
export const OUTFITCS = ['#7fb0e3', '#4d7be3', '#8fd9a6', '#3f6446', '#ebbb63', '#d0453f', '#e88fae', '#b39de8', '#5fc2c8', '#d8d5cd', '#9a9a95', '#3a362e', '#a68a6e', '#f2c98f', '#e3524d', '#2e4a33']
export const ACCCS = ['#ebbb63', '#8fd9a6', '#7fb0e3', '#b39de8', '#e88fae', '#5fc2c8', '#e3524d', '#f2c98f', '#a68a6e', '#fafaf8', '#9a9a95', '#141413']
export const DISCS: (string | null)[] = [null, '#7fb0e3', '#8fd9a6', '#ebbb63', '#e88fae', '#b39de8']

export const SYMPTOMS = ['itchy', 'painful', 'flaking', 'weeping', 'swollen', 'red', 'dry', 'scaly', 'bleeding', 'healing', 'spreading', 'stable']
export const TRIGGERS = ['bad sleep', 'stress', 'heat', 'cold', 'dairy', 'alcohol', 'sweat', 'new product', 'period', 'travel']
export const SEVWORDS = ['clear', 'barely there', 'mild', 'noticeable', 'bad', 'worst it’s been']

export const OB = [
  { t: 'a record, not a verdict', b: 'dermp stores what you photograph and what you write. it does not read your skin, score it, or tell you what to do.', c: 'next' },
  { t: 'one file per problem', b: 'keep acne, psoriasis and anything else in separate files, each with its own colour, sites and history.', c: 'next' },
  { t: 'photo, then your words', b: 'every shot gets a place on the body, a severity you choose, and whatever notes matter to you.', c: 'next' },
  { t: 'it stays on this phone', b: 'nothing is uploaded and nothing is analysed. when you want to share, you export a pdf yourself.', c: 'start tracking' },
]

/* ---------- pixel glyph tables: 8x8 character grids, '#' = ink ---------- */

export const ICONS = {
  today: ['........', '.##..##.', '.##..##.', '........', '.##..##.', '.##..##.', '........', '........'],
  body: ['...##...', '...##...', '.######.', '.######.', '...##...', '..#..#..', '..#..#..', '..#..#..'],
  photos: ['........', '..#####.', '..#...#.', '..#...#.', '#####.#.', '#...#...', '#...#...', '#####...'],
  notes: ['........', '.######.', '........', '.######.', '........', '.####...', '........', '........'],
  you: ['..####..', '.######.', '.######.', '..####..', '........', '.######.', '#######.', '########'],
  lock: ['..###...', '.#...#..', '.#...#..', '#####...', '#####...', '#####...', '#####...', '........'],
  sun: ['...#....', '.#.#.#..', '..###...', '####.##.', '..###...', '.#.#.#..', '...#....', '........'],
  moon: ['..###...', '.##.....', '##......', '##......', '##......', '.##.....', '..###...', '........'],
  arrowL: ['........', '..#.....', '.##.....', '#######.', '.##.....', '..#.....', '........', '........'],
  shutter: ['..####..', '.#....#.', '#..##..#', '#.####.#', '#.####.#', '#..##..#', '.#....#.', '..####..'],
  search: ['.####...', '#....#..', '#....#..', '#....#..', '.####...', '....##..', '.....##.', '........'],
  lib: ['........', '######..', '#....#..', '#.##.#..', '######..', '..######', '..#....#', '..######'],
  ghost: ['..####..', '.######.', '##.##.##', '########', '########', '########', '#.#..#.#', '........'],
  wifi: ['..####..', '.#....#.', '#..##..#', '...##...', '..####..', '...##...', '........', '........'],
  batt: ['........', '#######.', '#.....##', '#.###..#', '#.###.##', '#######.', '........', '........'],
  cell: ['......##', '.....###', '...#####', '..######', '.#######', '########', '........', '........'],
} as const

export type IconName = keyof typeof ICONS

/** 'a' is the one accented cell each badge is allowed. */
export const BADGE_ART = {
  cross: ['..####..', '..####..', '######..', '########', '########', '..####..', '..####..', '........'],
  flame: ['...#....', '..##....', '.####...', '.#####..', '##a###..', '##aa##..', '.####...', '..##....'],
  pin: ['..###...', '.#####..', '.##a##..', '.#####..', '..###...', '...#....', '...#....', '........'],
  eye: ['........', '..####..', '.#....#.', '#..aa..#', '#..aa..#', '.#....#.', '..####..', '........'],
  pen: ['......##', '.....###', '....###.', '...###..', '..###...', '.###....', '##......', '#.......'],
  star: ['...#....', '...#....', '.#####..', '..###...', '.##.##..', '.#...#..', '........', '........'],
  grid: ['##.##.##', '##.##.##', '........', '##.##.##', '##.##.##', '........', '##.##.##', '##.##.##'],
  lockb: ['..###...', '.#...#..', '.#...#..', '#####...', '#.a.#...', '#####...', '........', '........'],
} as const

const BADGE_SHAPE: Record<string, keyof typeof BADGE_ART> = {
  first: 'flame', w1: 'flame', w4: 'flame', w13: 'flame', y1: 'star',
  pin1: 'pin', atlas: 'pin', both: 'pin', proj3: 'grid',
  steady: 'eye', light: 'eye', macro: 'eye', series: 'grid',
  noted: 'pen', diarist: 'pen', regimen: 'cross', export: 'lockb',
  e100: 'star', e500: 'star', dress: 'star', kit: 'star',
}

export function badgeArt(id: string): readonly string[] {
  return BADGE_ART[BADGE_SHAPE[id] ?? 'star']
}

/* ---------- sprite tables ---------- */

export const SPR_BASE = ['................', '.....SSSSSS.....', '....SSSSSSSS....', '...SSSSSSSSSS...', '...SSSSSSSSSS...', '...SSSSSSSSSS...', '...SSSSSSSSSS...', '...SSSSSSSSSS...', '...SSSSSSSSSS...', '....SSSSSSSS....', '.....SSSSSS.....', '......SSSS......', '................', '................', '................', '................']

/** `r` is a sparse list of [row index, row string] overlays on SPR_BASE. */
export type Overlay = [number, string]

export const HAIRS: { n: string; r: Overlay[] }[] = [
  { n: 'none', r: [] },
  { n: 'crop', r: [[1, '.....HHHHHH.....'], [2, '....HHHHHHHH....'], [3, '...HHHHHHHHHH...'], [4, '...HH......HH...']] },
  { n: 'long', r: [[1, '.....HHHHHH.....'], [2, '....HHHHHHHH....'], [3, '...HHHHHHHHHH...'], [4, '...HH......HH...'], [5, '...HH......HH...'], [6, '...H........H...'], [7, '...H........H...'], [8, '...H........H...'], [9, '....H......H....']] },
  { n: 'coils', r: [[0, '....HHHHHHHH....'], [1, '..HHHHHHHHHHHH..'], [2, '..HHHHHHHHHHHH..'], [3, '..HHHHHHHHHHHH..'], [4, '..HH........HH..']] },
  { n: 'buzz', r: [[1, '.....HHHHHH.....'], [2, '....HHHHHHHH....'], [3, '...H.H.H.H.H.H..']] },
  { n: 'bun', r: [[0, '.......HH.......'], [1, '.....HHHHHH.....'], [2, '....HHHHHHHH....'], [3, '...HHHHHHHHHH...'], [4, '...HH......HH...']] },
  { n: 'fringe', r: [[1, '.....HHHHHH.....'], [2, '....HHHHHHHH....'], [3, '...HHHHHHHHHH...'], [4, '...HHHHHHHHHH...'], [5, '...HH......HH...']] },
]

export const EXPRS = [
  { n: 'calm', e: '....EE....EE....', m: '.......EE.......' },
  { n: 'glad', e: '....EE....EE....', m: '......EEEE......' },
  { n: 'wink', e: '....EE....EEE...', m: '......EEEE......' },
  { n: 'tired', e: '...EEEE..EEEE...', m: '.......EE.......' },
  { n: 'set', e: '...EEE....EEE...', m: '......EEEE......' },
  { n: 'oh', e: '....EE....EE....', m: '.......OO.......' },
]

export const OUTFITS: { n: string; r: Overlay[] }[] = [
  { n: 'tee', r: [[12, '.....OOOOOO.....'], [13, '...OOOOOOOOOO...'], [14, '..OOOOOOOOOOOO..'], [15, '..OOOOOOOOOOOO..']] },
  { n: 'hoodie', r: [[12, '....OOOOOOOO....'], [13, '..OOOOOOOOOOOO..'], [14, '..OOOAAAAAAOOO..'], [15, '..OOOOOOOOOOOO..']] },
  { n: 'scrubs', r: [[12, '.....OOOOOO.....'], [13, '...OOOOAAOOOO...'], [14, '..OOOOOAAOOOOO..'], [15, '..OOOOOOOOOOOO..']] },
  { n: 'jacket', r: [[12, '....OO....OO....'], [13, '..OOOO.AA.OOOO..'], [14, '..OOOO.AA.OOOO..'], [15, '..OOOOOOOOOOOO..']] },
  { n: 'coat', r: [[12, '.....OOOOOO.....'], [13, '...OOOOOOOOOO...'], [14, '..OOOOO.A.OOOO..'], [15, '..OOOOO.A.OOOO..']] },
  { n: 'vest', r: [[12, '....OO....OO....'], [13, '..OOOO.AA.OOOO..'], [14, '..OO...AA...OO..'], [15, '..OOOOOOOOOOOO..']] },
]

/** The 26 circleheads expressions, 9x8, verbatim from PixelHead's EXPR table. */
export const CH_FACES: { n: string; a: string | null; px: string[] }[] = (
  [
    ['neutral', null, '.........|.........|..#...#..|.........|.........|.........|..#####..|.........'],
    ['beam', '#EBBB63', '.........|.#.#.#.#.|..#...#..|.........|.........|.#.....#.|..#####..|.........'],
    ['smile', null, '.........|.........|..#...#..|.........|.........|..#...#..|...###...|.........'],
    ['talk', null, '.........|.........|..#...#..|.........|.........|...###...|...###...|.........'],
    ['grin', null, '.........|.........|..#...#..|.........|.........|.#.....#.|.#######.|..#####..'],
    ['wink', '#8FD9A6', '.........|.........|.###..#..|.........|.........|..#...#..|...###...|.........'],
    ['smirk', null, '.........|.........|..#...#..|.........|.........|.....##..|..###....|.........'],
    ['sideeye', null, '.........|.........|...#...#.|.........|.........|.........|...##....|.........'],
    ['sleepy', null, '.........|.........|.###.###.|.........|.........|.........|...###...|.........'],
    ['surprised', '#EBBB63', '.........|.##...##.|.##...##.|.........|...###...|...#.#...|...###...|.........'],
    ['content', '#8FD9A6', '.........|.........|..#...#..|.#.#.#.#.|.........|..#...#..|...###...|.........'],
    ['curious', '#EBBB63', '.........|.....##..|..#...#..|.........|....#....|...#.#...|....#....|.........'],
    ['laugh', null, '.........|.........|..#...#..|.#.#.#.#.|.........|..#####..|..#####..|...###...'],
    ['meh', null, '.........|.........|..#...#..|.........|.........|.........|...####..|.........'],
    ['sad', '#7FB0E3', '.........|.........|..#...#..|.........|.........|...###...|..#...#..|.........'],
    ['cry', '#7FB0E3', '.........|.........|..#...#..|..#...#..|.........|...###...|..#...#..|.........'],
    ['angry', '#B39DE8', '.........|.#.....#.|..#...#..|..#...#..|.........|.........|...###...|.........'],
    ['shout', '#B39DE8', '.........|.#.....#.|..#...#..|.........|..#####..|..#...#..|..#####..|.........'],
    ['cool', '#7FB0E3', '.........|.........|.#######.|.#.#.#.#.|.........|..#...#..|...###...|.........'],
    ['skeptical', null, '.........|..####...|..#...#..|.........|.........|..####...|.........|.........'],
    ['excited', '#EBBB63', '.........|..#...#..|.###.###.|..#...#..|.........|..#...#..|...###...|.........'],
    ['love', '#E88FAE', '.........|.#.#.#.#.|.###.###.|..#...#..|.........|..#...#..|...###...|.........'],
    ['thinking', '#7FB0E3', '.........|.#...#...|.........|.........|.........|..#.#.#..|.........|.........'],
    ['dizzy', '#B39DE8', '.........|.#.#.#.#.|..#...#..|.#.#.#.#.|.........|.........|...##....|.........'],
    ['singing', '#E88FAE', '.........|.........|.##...##.|.........|.........|...###...|...#.#...|...###...'],
    ['determined', null, '.........|.##...##.|..#...#..|.........|.........|.........|..#####..|.........'],
  ] as const
).map((a) => ({ n: a[0], a: a[1], px: a[2].split('|') }))

/** Accessories as rect runs [x0, x1, y0, y1] in the 22-cell head space. */
export const ACCS: { id: string; n: string; r: [number, number, number, number][] }[] = [
  { id: 'none', n: 'nothing', r: [] },
  { id: 'glasses', n: 'glasses', r: [[8, 10, 4, 4], [8, 10, 6, 6], [8, 8, 5, 5], [10, 10, 5, 5], [12, 14, 4, 4], [12, 14, 6, 6], [12, 12, 5, 5], [14, 14, 5, 5], [11, 11, 5, 5], [6, 7, 5, 5], [15, 16, 5, 5]] },
  { id: 'shades', n: 'shades', r: [[8, 10, 4, 6], [12, 14, 4, 6], [11, 11, 5, 5], [6, 7, 4, 4], [15, 16, 4, 4]] },
  { id: 'cap', n: 'cap', r: [[8, 14, 2, 3], [9, 13, 1, 1], [4, 9, 4, 4]] },
  { id: 'beanie', n: 'beanie', r: [[8, 14, 1, 3], [7, 15, 3, 4], [10, 12, 0, 0]] },
  { id: 'cans', n: 'headphones', r: [[9, 13, 0, 1], [7, 8, 1, 2], [14, 15, 1, 2], [5, 6, 4, 8], [16, 17, 4, 8]] },
  { id: 'halo', n: 'halo', r: [[9, 13, 0, 0], [8, 8, 1, 1], [14, 14, 1, 1]] },
  { id: 'mask', n: 'face mask', r: [[8, 14, 7, 10], [6, 7, 7, 8], [15, 16, 7, 8]] },
  { id: 'patch', n: 'plaster', r: [[5, 7, 7, 7], [6, 8, 8, 8]] },
  { id: 'bolt', n: 'bolt', r: [[16, 17, 2, 2], [15, 16, 3, 3], [14, 17, 4, 4], [15, 16, 5, 5], [15, 15, 6, 6]] },
  { id: 'antenna', n: 'antenna', r: [[10, 11, 1, 3], [9, 12, 0, 0]] },
]

/** The same extras, hand-fitted to the 16-cell person bust. */
export const PERSON_ACCS: Record<string, Overlay[]> = {
  glasses: (['...AAAA..AAAA...', '...A..A..A..A...', '...AAAA..AAAA...'] as const).map((r, i) => [5 + i, r] as Overlay),
  shades: [[5, '...AAAA..AAAA...'], [6, '...AAAA..AAAA...']],
  cap: [[1, '....AAAAAAAA....'], [2, '...AAAAAAAAAA...'], [3, '.AAAAAAAAA......']],
  beanie: [[0, '....AAAAAAAA....'], [1, '...AAAAAAAAAA...'], [2, '...AAAAAAAAAA...'], [3, '..AAAAAAAAAAAA..']],
  cans: [[2, '....AAAAAAAA....'], [3, '..AA........AA..'], [4, '.AAA........AAA.'], [5, '.AAA........AAA.'], [6, '..AA........AA..']],
  halo: [[0, '....AAAAAAAA....'], [1, '....A......A....']],
  mask: [[7, '..A..........A..'], [8, '...AAAAAAAAAA...'], [9, '....AAAAAAAA....']],
  patch: [[5, '..AAA...........'], [6, '...AAA..........']],
  bolt: [[3, '............AA..'], [4, '...........AA...'], [5, '..........AAAA..'], [6, '............AA..']],
  antenna: [[0, '.......AA.......'], [1, '.......AA.......']],
}

/**
 * The prototype's one source of randomness.
 *
 * A hash, not a generator: the same index always yields the same value, which
 * is what lets the activity grid, the sparklines and the photo mosaics render
 * identically on the server and in the browser. Nothing here may use
 * Math.random or Date — that would hydrate differently than it rendered.
 */
export function rnd(n: number): number {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return s - Math.floor(s)
}
