/**
 * The BKZ lab log: findings from the Brooklyn Dead asset pipeline.
 *
 * Entries are written as blocks rather than markup, the same way the essays
 * under /writing are. What a paragraph, a pull quote or a figure looks like is
 * decided once in `prose.tsx`, and an entry cannot bring its own styling with
 * it. Data only, no JSX, so a server page can read the index without pulling a
 * renderer in behind it.
 */

import { ELEVEN_MERGES, MOB_SHEET } from './entries-round'

export type Cell = string | { v: string; tone: 'bad' | 'good' }

/** A render, with its real pixel dimensions so nothing reflows on load. */
export type Img = {
  src: string
  w: number
  h: number
  alt: string
  /** A line under this one render, when a shared caption cannot say which is which. */
  note?: string
}

/** How a ledger entry ended. Drives the chip's colour and nothing else. */
export type Status = 'landed' | 'landed red' | 'falsified' | 'corrected' | 'refused'

export type LedgerEntry = {
  /** Two digits. The order is the order the work happened in. */
  n: string
  status: Status
  title: string
  paras: string[]
  /** The measurement that settles it. Set in mono, against a rule. */
  meas: string
  fig?:
    | { kind: 'pair'; before: Img; after: Img; labels: [string, string]; caption: string }
    | { kind: 'shot'; img: Img; caption: string }
}

export type Block =
  /** Body copy. `**bold**`, `_italic_` and `` `code` `` are parsed. */
  | { k: 'p'; text: string }
  /** A section heading. Picked up by the demo rail as an `h2`. */
  | { k: 'h'; text: string }
  /** The one line the entry would be quoted on. */
  | { k: 'pull'; text: string }
  /** A drawn diagram from `figures.tsx`, keyed by name. */
  | { k: 'figure'; art: FigureName; caption: string }
  /** Two renders of the same thing, before and after. */
  | {
      k: 'pair'
      before: string
      after: string
      alt: string
      caption: string
      /** Defaults to the 420px square the ellipsoid renders came in. */
      w?: number
      h?: number
      /** Defaults to before/after. */
      labels?: [string, string]
    }
  /** One render, full measure. */
  | { k: 'shot'; img: Img; caption: string }
  /** A group of renders under one caption, with an optional register line. */
  | {
      k: 'plates'
      label?: string
      items: Img[]
      caption: string
      /** `stack` gives each render the full measure; the default puts two up. */
      layout?: 'row' | 'stack'
    }
  /** A contact sheet. */
  | { k: 'gallery'; items: { src: string; name: string; note: string }[]; caption: string }
  | { k: 'table'; head: string[]; rows: Cell[][] }
  /** What moved this round, and what it was before. */
  | { k: 'deltas'; items: { k: string; v: string; was?: string; hold?: boolean }[]; note?: string }
  /** The round itself, one numbered row per pass. */
  | { k: 'ledger'; entries: LedgerEntry[] }
  /** A question the round did not close. */
  | { k: 'open'; title: string; text: string }
  /** The roster: one card per mob, with its dials and its share of the budget. */
  | { k: 'roster'; sheet: string; cards: RosterCard[]; key: { label: string; tone: RosterTone }[] }
  /** The colophon: what it was built with, and how big the change was. */
  | { k: 'colophon'; lines: string[] }

export type RosterTone = 'body' | 'grow' | 'hair'

export type RosterCard = {
  name: string
  role: string
  /** Which quarter of the four-up head sheet this card shows. */
  tile: 0 | 1 | 2 | 3
  dials: [string, string][]
  tris: string
  share: string
  /** Share of the 40,000-triangle budget, as percentages. */
  bars: { body: number; grow: number; hair: number }
}

export type FigureName = 'surfaces' | 'occiput'

export type LabEntry = {
  slug: string
  /** The entry's own title, which is a sentence rather than a label. */
  title: string
  /** Three words for what kind of finding this is. */
  kicker: string
  /** The one-paragraph version, used on the index and as the meta description. */
  standfirst: string
  /** Written as an absolute date; a lab log is a record and records are dated. */
  published: string
  /** The same date as an ISO day, for `datePublished` and `<time>`. */
  date: string
  /** The image a link preview and the structured data should use. */
  hero: string
  /** The byline the entry was filed under: commit, gate score, budget. */
  meta?: string
  body: Block[]
}

const ELLIPSOID: LabEntry = {
  slug: 'the-ellipsoid-problem',
  title: '141 of 141, and the scalp was showing',
  kicker: 'Rendering · Tooling · Correctness',
  standfirst:
    'A coverage test told me the hair was perfect. The render disagreed. The bug was not in the geometry or in the test — it was that both of them were wrong about the same thing, in the same direction, and so agreed.',
  published: 'August 2026',
  date: '2026-08-25',
  hero: '/bkz/buzz-front-after.webp',
  body: [
    { k: 'h', text: 'The setup' },
    {
      k: 'p',
      text: 'Characters in _Brooklyn Dead_ get their hair from swappable shells — eleven styles, each a low-poly mass fitted to the head. Nobody models them by hand. A Python file describes each one and Blender builds it, which means they can regress silently, which means they need gating.',
    },
    {
      k: 'p',
      text: 'One of those gates is crown coverage. It fires 141 rays out of the scalp — one at the pole, then seven rings of twenty — and asks whether a hair polygon is in the way of each. A miss is a clear line of sight from skin to sky: a bald patch. It is a good test. It has caught real bugs. And for ten of the eleven styles it had been returning a perfect 141 of 141 for months.',
    },
    {
      k: 'p',
      text: 'Then I looked at the back of a head in a render, and there was a pale patch the size of a palm.',
    },

    { k: 'h', text: 'Two surfaces that were never the same' },
    {
      k: 'p',
      text: 'Every hair shell in the codebase is carved onto a mathematical stand-in for the skull, which the code calls the cranium ellipsoid. It was never meant to be the head. It is a hair _envelope_ — a smooth, convenient shape defined by four constants, easy to place geometry against.',
    },
    {
      k: 'p',
      text: 'The head is built somewhere else entirely, by a different module, from a different parameter set, and it has a brow ridge and an occiput and a jaw. So the two disagree. I measured by how much, by firing rays from the envelope at the built head.',
    },
    {
      k: 'figure',
      art: 'surfaces',
      caption:
        '**The two surfaces, in cross-section.** They are not concentric and the error changes sign around the head: the envelope stands well in front of the forehead, and the skull stands outside the envelope at the back. Anything measured against the envelope inherits that error, whichever way it happens to point.',
    },
    {
      k: 'p',
      text: 'That would be a harmless simplification if the envelope were only used for _building_. Geometry has to be carved against something, and a smooth approximation is a perfectly reasonable thing to carve against.',
    },
    { k: 'p', text: 'The problem is that the _test_ used it too.' },

    { k: 'h', text: 'Why nothing could see it' },
    {
      k: 'p',
      text: 'The coverage test started every ray on the envelope. At the back of the head that is a surface 19 mm under the skin. So the ray began inside the skull, travelled outward, and the first thing it met was the hair shell — which had itself been carved onto the envelope, and was therefore also buried inside the head. Hit found. Counted as covered. Meanwhile the real scalp, 19 mm further out, had nothing over it at all.',
    },
    {
      k: 'figure',
      art: 'occiput',
      caption:
        '**The failure, at the occiput.** The shell was carved on the envelope, so at the back of the head it sits under the skin — measured at 15 to 39 vertices per style, up to 18.6 mm deep. The ray finds it there and stops. Both the geometry and the test are wrong by the same amount, in the same direction, so they agree.',
    },
    {
      k: 'pull',
      text: 'The test and the thing it was testing shared a reference frame, and the error lived in the frame. Two wrongs, in perfect agreement, reporting success.',
    },

    { k: 'h', text: 'It failed the other way as well' },
    {
      k: 'p',
      text: 'At the brow the envelope is 42 mm _proud_ of the forehead, so rays there started in mid-air in front of the face. Hair that sat correctly on the head was below the ray’s own starting point and never got hit at all. It scored as bald. Hair pushed out to meet the envelope scored perfectly.',
    },
    {
      k: 'p',
      text: 'So the test was not merely blind. It had a preference. It rewarded hair standing 42 mm off the forehead and penalised hair that fitted the head — and we had been calling the result _the helmet_ in review notes for weeks without ever connecting it to a validator.',
    },

    { k: 'h', text: 'What the numbers said' },
    {
      k: 'p',
      text: 'Re-basing the measurement on the built head, without changing a single piece of geometry:',
    },
    {
      k: 'table',
      head: ['style', 'old gate', 'honest gate', 'bare', 'verts inside skull', 'deepest'],
      rows: [
        ['topknot', '141/141', '117/141', { v: '24', tone: 'bad' }, '29', '−13.2 mm'],
        ['twin_tails', '141/141', '126/141', { v: '15', tone: 'bad' }, '39', '−15.9 mm'],
        ['braid', '141/141', '130/141', { v: '11', tone: 'bad' }, '33', '−16.9 mm'],
        ['fringe_curtain', '141/141', '131/141', { v: '10', tone: 'bad' }, '22', '−14.4 mm'],
        ['ponytail', '141/141', '132/141', { v: '9', tone: 'bad' }, '36', '−18.6 mm'],
        ['long_loose', '141/141', '134/141', { v: '7', tone: 'bad' }, '18', '−12.5 mm'],
        ['buzz', '141/141', '135/141', { v: '6', tone: 'bad' }, '81', '−15.0 mm'],
        ['shaggy', '141/141', '135/141', { v: '6', tone: 'bad' }, '15', '−12.6 mm'],
        ['half_up', '141/141', '137/141', { v: '4', tone: 'bad' }, '29', '−12.4 mm'],
        ['swept_back', '141/141', '139/141', { v: '2', tone: 'bad' }, '24', '−14.0 mm'],
        ['short_crop', '126/141', '141/141', { v: '0', tone: 'good' }, '27', '−6.5 mm'],
      ],
    },
    {
      k: 'p',
      text: 'All ten failed, for 94 bare samples in total, and **every single miss was at the back of the head** — which is the signature of the mechanism rather than of ten unrelated modelling mistakes.',
    },
    {
      k: 'p',
      text: 'The last row is the control. `short_crop` had already been moved onto a corrected surface in an earlier pass, and it is the only style that reads _worse_ on the old gate than the new one: 126 of 141 against 141 of 141. Same defect with its sign flipped. Because it fits the head closely at the brow, the old test’s mid-air ray starts sailed straight over it and scored a correct haircut as balding.',
    },

    { k: 'h', text: 'The fix, and the thing I checked first' },
    {
      k: 'p',
      text: 'The repair is to stop measuring against the stand-in: build the actual head, put it in a bounding-volume hierarchy, and raycast that.',
    },
    {
      k: 'p',
      text: 'An earlier pass had cached this correction as a baked 72×40 grid, on the entirely reasonable assumption that building a head was too expensive to do inside a gate. I measured that assumption before inheriting it. Building the head and its BVH costs **7 milliseconds**. The cache was buying nothing, and it carried a real liability: it could go stale against a module it did not own. So the correction is computed live, and the grid is now only a record of what the field was fitted against.',
    },
    {
      k: 'p',
      text: 'One wrinkle earned its own paragraph. Hair is authored _once_ and shared, while the character has _two_ head shapes. So the correction cannot be “the head” — it has to be the outer envelope of both. That is not a theoretical nicety: the second frame stands up to 9.6 mm proud of the first at the temple, so a correction fitted to one head sinks hair into the other.',
    },
    {
      k: 'p',
      text: 'And the part I care most about: nothing was loosened. Both close-fit ceilings stayed exactly where they were, at 30 mm and 50 mm. The “buried in the skull” check got roughly three times _stricter_ — it used to fire at about 47 mm, expressed as a fraction of an ellipse radius, and now fires at 15 mm measured against the real head. When a gate has been lying to you, the fix is never to move the bar.',
    },

    { k: 'h', text: 'What it actually looked like' },
    {
      k: 'p',
      text: 'Numbers are not the deliverable here; a face is. Same style, same camera, same lighting — only the surface the shell was carved onto has changed.',
    },
    {
      k: 'pair',
      before: '/bkz/topknot-before.webp',
      after: '/bkz/topknot-after.webp',
      alt: 'The topknot style rendered from behind',
      caption:
        '**topknot, from behind.** The worst of the set at 24 bare samples, and the one that sent me looking. The gate had been calling this fully covered.',
    },
    {
      k: 'pair',
      before: '/bkz/fringe-curtain-before.webp',
      after: '/bkz/fringe-curtain-after.webp',
      alt: 'The fringe_curtain style rendered from behind',
      caption:
        '**fringe_curtain, from behind.** Ten samples — the same patch, in the same place, on a completely unrelated style. That is what a shared-cause bug looks like from the outside, and it is why ten separate modelling mistakes was never a plausible explanation.',
    },
    {
      k: 'p',
      text: 'The one I did not expect was `buzz`, from the front. It has the least hair of any style in the set, so it had the least to hide behind — and it turns out to be where the old test’s preference shows up most plainly.',
    },
    {
      k: 'pair',
      before: '/bkz/buzz-front-before.webp',
      after: '/bkz/buzz-front-after.webp',
      alt: 'The buzz style rendered from the front',
      caption:
        '**buzz, from the front.** The helmet was the ellipsoid. On the left, a smooth dome that swallows the head and hides the forehead completely — geometry pushed out to meet a surface 42 mm off the brow, which is precisely what the old gate rewarded. On the right, the same script with the shell seated on the real skull: a close crop, hairline on the actual forehead, temples visible. No art direction changed between these two images. Only the surface the shell was carved onto.',
    },

    { k: 'h', text: 'The ten, as shipped' },
    {
      k: 'gallery',
      items: [
        { src: '/bkz/topknot-before.webp', name: 'topknot', note: '24 bare' },
        { src: '/bkz/g-twin-tails.webp', name: 'twin_tails', note: '15 bare' },
        { src: '/bkz/g-braid.webp', name: 'braid', note: '11 bare' },
        { src: '/bkz/fringe-curtain-before.webp', name: 'fringe_curtain', note: '10 bare' },
        { src: '/bkz/g-ponytail.webp', name: 'ponytail', note: '9 bare' },
        { src: '/bkz/g-long-loose.webp', name: 'long_loose', note: '7 bare' },
        { src: '/bkz/g-buzz.webp', name: 'buzz', note: '6 bare' },
        { src: '/bkz/g-shaggy.webp', name: 'shaggy', note: '6 bare' },
        { src: '/bkz/g-half-up.webp', name: 'half_up', note: '4 bare' },
        { src: '/bkz/g-swept-back.webp', name: 'swept_back', note: '2 bare' },
      ],
      caption:
        'Every pale patch above is scalp that the coverage gate was reporting as covered, on the same run in which it printed 141 of 141.',
    },

    { k: 'h', text: 'What I deliberately left alone' },
    {
      k: 'p',
      text: 'The shells ride the real skull now. The _locks_ — the individual carved chunks that stand proud of the shell and carry the silhouette — still ride the envelope, which means at the brow they are up to 42 mm from the surface they are supposed to be lying against.',
    },
    {
      k: 'p',
      text: 'That is not an oversight and it is not a second bug to quietly fold in. Moving the locks changes how every style _looks_ rather than whether it is _correct_, and the change is not small: it would pull the front of the silhouette in by somewhere between 23 and 42 mm. `buzz` is the preview, because on that style the shell _is_ the silhouette and it has already moved. A change of that size deserves a decision and a set of renders, not a paragraph at the end of a bug fix.',
    },

    { k: 'h', text: 'The general version' },
    {
      k: 'p',
      text: 'If you write a validator, ask what frame it measures in, and whether the thing it validates was built in that same frame. If the answer is yes, it cannot see errors in the frame itself — and worse, it will quietly select for whatever geometry satisfies the error, because that geometry is what scores well. A test like that does not just fail to catch the bug. It applies pressure in favour of it.',
    },
    {
      k: 'p',
      text: 'The tell had been in the build log the whole time. **A test that has never failed is not necessarily a test that is passing.**',
    },
    {
      k: 'colophon',
      lines: [
        'Blender 5.2 · Python · glTF → Godot 4 · renders in Cycles at 40 samples',
        'The change: 247 insertions, 115 deletions, one file. Triangle counts identical across all eleven styles — the correction moves vertices, not topology.',
      ],
    },
  ],
}

/** Newest first. The index and `generateStaticParams` both read this. */
export const LAB_ENTRIES: LabEntry[] = [MOB_SHEET, ELEVEN_MERGES, ELLIPSOID]

export function findEntry(slug: string) {
  return LAB_ENTRIES.find((e) => e.slug === slug)
}
