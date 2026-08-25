/**
 * Two entries from the same round of work on the detail-tier mobs.
 *
 * They are a pair and they are deliberately different shapes. `eleven-merges`
 * is the round as it happened: eleven passes in the order they landed, each
 * with the measurement that settled it, including the three that were refused.
 * `the-mob-sheet` is what the round produced: four mobs as four rows of one
 * table, with no history in it at all.
 *
 * Split into their own file only because the ellipsoid entry is long and one
 * file holding all three would be a scroll rather than a document. `entries.ts`
 * still owns the types and the index.
 */
import type { LabEntry } from './entries'

const P = '/bkz'

const MOB_LAB = {
  src: `${P}/mob-lab-night.webp`,
  w: 1280,
  h: 720,
  alt: 'A night street in the mob lab, a group of zombies lit by a wall lamp',
}

const HEADS = {
  src: `${P}/mob-heads.webp`,
  w: 1500,
  h: 375,
  alt: 'Four mob heads in three-quarter view, each with different hair and facial hair',
}

export const ELEVEN_MERGES: LabEntry = {
  slug: 'eleven-merges',
  title: 'Eleven merges, and the hero never moved',
  kicker: 'Asset pipeline · Session log',
  standfirst:
    'A round on mob detail in Brooklyn Dead. Three mobs turned out to have a chest one tenth of a millimetre deep, two of my own rulings were falsified by the gates I asked for, and the most useful output of the day was three separate refusals.',
  published: 'August 2026',
  date: '2026-08-25',
  hero: '/bkz/mob-lab-night.webp',
  meta: 'brooklyn-dead @ af708d5 · detail gate 207/221',
  body: [
    {
      k: 'shot',
      img: MOB_LAB,
      caption:
        '**What the work is for.** The detail tier at playing distance, in the mob lab at night. Everything below is measured on a bench in Blender; this is the only place any of it is judged.',
    },

    { k: 'h', text: 'What moved' },
    {
      k: 'deltas',
      items: [
        { k: 'detail gate', v: '207 / 221', was: '115 / 128' },
        { k: 'chest depth, 3 mobs', v: '86 – 152 mm', was: '0.20 mm' },
        { k: 'neck escape', v: '1.2 – 17.0 mm', was: '83 – 110 mm' },
        { k: 'body contact pairs', v: '13', was: '86' },
        { k: 'tops on BasicZ1', v: '8 of 8', was: '0 of 8' },
        { k: 'SK_Hero', v: 'byte-identical', hold: true },
      ],
      note: 'Eleven passes, each on its own branch, merged and re-gated on trunk. Artefacts regenerated after every merge, never resolved by hand.',
    },

    { k: 'h', text: 'The round, in order' },
    {
      k: 'ledger',
      entries: [
        {
          n: '01',
          status: 'landed',
          title: 'The mobs stop walking like the player',
          paras: [
            'Four bodies with distinct silhouettes, corrupt mass and asymmetric heads all played `Walk_Loop` — the hero’s own clip. A gait is now a row in the profile table, three mechanisms deep.',
            'The brief was half wrong and the gate said so. A layer of pure constant offsets is _decoration_: the mob stands differently and moves identically.',
          ],
          meas: 'Offsets alone score **0.0215°** dynamic against a measured instrument floor of **0.0269°** — literally zero. Arm-into-body contact 37 → 0 on the Breaker.',
          fig: {
            kind: 'pair',
            before: {
              src: `${P}/gait-hero-before.webp`,
              w: 1500,
              h: 708,
              alt: 'The Breaker walking on the hero’s clip, arms buried in the torso',
            },
            after: {
              src: `${P}/gait-breaker-after.webp`,
              w: 1499,
              h: 697,
              alt: 'The Breaker walking on its own gait, arms swinging clear of the torso',
            },
            labels: ['hero’s walk', 'own gait'],
            caption:
              '**The Breaker, before and after.** In the front view the arms were buried in the torso; afterwards they swing clear. The closest pair of gaits separates at 124× the instrument floor.',
          },
        },
        {
          n: '02',
          status: 'falsified',
          title: 'The neck anchor was innocent',
          paras: [
            'I ruled that `build_neck` anchored to nothing and ordered the fix, bounded at 6 mm with a per-region falsifier. The falsifier earned its keep.',
            'Over budget _and_ ineffective. The mobs’ neck bases were already on the torso axis — there was nothing to re-anchor.',
          ],
          meas: 'The anchored neck moves the hero **+7.180 mm** — over its own 6 mm budget — and closes **0.038 mm** of BasicZ1’s 83.21 mm escape.',
        },
        {
          n: '03',
          status: 'landed',
          title: 'Every hair shell was fitted to the hero’s skull',
          paras: [
            'The mobs were bald against a 352 KB hair system. Hair is a row now, costing 2.8–4.9% of the tri budget and displacing zero growth triangles — the corruption cap was never binding.',
            'Underneath was one default: `_head_bvhs` lofted from `FRAME_PRESETS` unconditionally, so every clamp, cull, lift and sink query answered about the wrong head.',
          ],
          meas: 'Median error **−35.1 mm** on the Crier — hair floating off the head — to **+52.2 mm** on the Fused: skull straight through the hair.',
        },
        {
          n: '04',
          status: 'landed',
          title: 'The suit bay was touching the van',
          paras: [
            'Both complaints were real and both of my diagnoses were wrong. The 3.76 m I kept quoting is an _interact anchor_, and RIG-01’s anchor is its side door.',
            'And `SUBJECT_FRAME_FRAC` cancels for a standing subject — `standing_span` multiplies by it and `frame_width` divides. Tuning it would have moved nothing while looking like a fix.',
          ],
          meas: 'Measured against bodywork the rack sat **0.03 m** off the van. Framing 59–62% → **65–71%**, with the printer, vat and gunsmith bit-identical.',
          fig: {
            kind: 'pair',
            before: {
              src: `${P}/bay-before.webp`,
              w: 1280,
              h: 720,
              alt: 'The suit bay with the van filling the frame behind the rack',
            },
            after: {
              src: `${P}/bay-after.webp`,
              w: 1280,
              h: 720,
              alt: 'The suit bay with the van reduced to a sliver at the frame edge',
            },
            labels: ['0.03 m', '1.34 m'],
            caption:
              '**The bay, before and after.** The van is a sliver at the frame edge now, with real space between it and the rack. Against the mirror — the station that reads correctly — the bay went from ×1.663 of body height to ×1.470.',
          },
        },
        {
          n: '05',
          status: 'landed',
          title: 'Four clips refuse the phase lag, on their own evidence',
          paras: [
            'All 53 clips ship the gait on all four mobs. `Roll`, `Jump`, `Jump_Land` and `Vault` take the offsets and swing scale without the lag — measured at bake time, not branched.',
            'The lag breaks on _one-shots_, not on violent clips, which is not what I predicted when I flagged `Roll` as the risk.',
          ],
          meas: 'Loop seams run **0.00–0.649°** on 208 of 212 clip-instances, then **29.3 / 50.6 / 53.4 / 85.5**. A lag on `Vault` produced 99.2° of arm travel in one frame.',
        },
        {
          n: '06',
          status: 'landed',
          title: 'Three mobs had a ribbon where a ribcage should be',
          paras: [
            '`_no_undercut` measures overhang in world Y. On a leaning frame the spine carries the chest front forward faster than any depth can, so the clamp is unsatisfiable and returns its own floor — reporting success.',
            'The priced fix would have taken the hero’s chest _down_ 17.64 mm. Scoping it structurally — the datum is the running maximum of the spine curve — made it a no-op on the hero by construction.',
          ],
          meas: 'Minimum chest-ring depth **0.100 mm** on three of four mobs. Hero displacement after the fix: **0.0000 mm** in every region of both frames.',
          fig: {
            kind: 'pair',
            before: {
              src: `${P}/torso-before.webp`,
              w: 829,
              h: 900,
              alt: 'The Breaker’s torso with the arms removed, shoulder block joined to the pelvis by a one-pixel line',
            },
            after: {
              src: `${P}/torso-after.webp`,
              w: 829,
              h: 900,
              alt: 'The Breaker’s torso with the arms removed, a full ribcage between shoulder and pelvis',
            },
            labels: ['0.20 mm', '151.62 mm'],
            caption:
              '**The Breaker’s torso, arm chunks removed.** The shoulder block floats above the pelvis joined by a one-pixel line. Six passes of side renders never caught it because the hanging arm covers it.',
          },
        },
        {
          n: '07',
          status: 'landed',
          title: 'The motion gate graded a clip that does not ship',
          paras: [
            'The gait was baked into all four GLBs and proved from the bytes. `t9_motion` went on grading the unlayered source, so six of thirteen failures were measured on geometry the game does not contain.',
          ],
          meas: 'It reported the Breaker’s `pelvis × elbow_L` at **66.1 mm** where the gait pass measured **17.1**. Body-only contact 86 pairs → **13**.',
        },
        {
          n: '08',
          status: 'corrected',
          title: 'A ladder brackets a crossing; it does not measure one',
          paras: [
            '`S_ARM_OUT_DEG` exists so the constants cannot quietly stop being what their comments say. It caught exactly that — the arm clearance had been derived against mobs whose chests were 0.1 mm deep.',
            'I read the coarse ladder’s next rung as the answer and reported a 25% widening. Swept properly in degrees, the real move is **0.45%**.',
          ],
          meas: 'Zero arm pairs first at **22.1°**, not the 27.5° the six-point ladder implied. The residue at 22.0 was one pair at **0.239 mm**.',
        },
        {
          n: '09',
          status: 'refused',
          title: 'The material rename was measured, then declined',
          paras: [
            'Mob hair wearing `M_Hero_Hair` would put every zombie in the player’s runtime tint table. The concern was well-formed — the table _is_ name-keyed on `resource_name`.',
            'Nothing leaks. The tint walks the player’s own subtree, no mob source references the appearance layer, the write is on a duplicate under two regression tests, and the two GLBs are separate imports so equal names are unequal resources.',
          ],
          meas: 'A rename would move `MobRigCache`’s merged-surface count, which tests assert. It would cost something and buy nothing.',
        },
        {
          n: '10',
          status: 'landed',
          title: 'The gash was two bugs',
          paras: [
            'Facial hair rode `SKULL`/`FACE` from `FRAME_MASC` unscaled — the same defect as the hair one, in the half nobody had wired. Fixed first, wired second.',
            'Then `patch` dropped whole columns. Making the unit a cell exposed the second half: the hole _radius_ was derived from a width and applied in two dimensions.',
          ],
          meas: '21.7 mm against a 20 mm row pitch takes a column top to bottom — the same gash by another route, with every number green.',
          fig: {
            kind: 'shot',
            img: HEADS,
            caption:
              '**Four faces that read differently.** Matted full beard, cheek mange, clotted jaw, moustache. `cheek_mange` earned a style rather than a dial value: its footprint is one no dial reaches — 25 legal combinations and not one empties the philtrum while both cheeks carry hair.',
          },
        },
        {
          n: '11',
          status: 'landed red',
          title: 'The extents gate could not see head, hair or beard',
          paras: [
            'It was written when a mob was a body, and three subsystems landed on top of it. For hair the envelope is not _inside the head_ — hair extends past the skull. It is a bounded allowance around the surface it grows from, anchored on the same float that brakes `_lift_clear`.',
            'It went red on its first run, and reported rather than fixed: `Mob_Fused_Head` reaches 2.5 mm above the bind-pose crown. Not the hair — the skull.',
          ],
          meas: 'Positive control caught at **5.2×**: with the brake removed the crown reads **203.8 mm** against a 39.2 mm allowance.',
        },
      ],
    },

    { k: 'h', text: 'What is still open' },
    {
      k: 'open',
      title: 'The brute’s shoulders',
      text: 'The Fused and Breaker fail the axilla gate, and closing it costs `shoulder_width` 0.336 → 0.265 — 23.5% off the shoulder band, which inverts a slab into a pear. I refused it. The ribcage work changed the stakes: the Breaker now has a garment on the other side of that trade.',
    },
    {
      k: 'open',
      title: 'The Fused’s crown',
      text: '2.5 mm above `SK_Girl`’s bind envelope — the engine contract. Small, and a `fused` frame decision rather than a bug.',
    },

    { k: 'h', text: 'Two corrections' },
    {
      k: 'p',
      text: 'I quoted `check_gait.py` as 60/60 for three merges when it had been 57/60 — verified once, then repeated as current while the ground moved. One of the three failures was my own stale-baseline defect, the same pinned-commit pattern I had fixed in the neighbouring file an hour earlier.',
    },
    {
      k: 'p',
      text: 'And the arm anchor above. A ladder’s next rung is not a measurement, and reading it as one nearly bought a 25% wider arm swing on every mob to close a quarter of a millimetre.',
    },
    {
      k: 'pull',
      text: 'The most useful output of the day was three separate refusals: a fix that was over budget and ineffective, a widening that was a misread ladder, and a rename that would have cost something and bought nothing.',
    },

    {
      k: 'colophon',
      lines: [
        'Gates at close — build_detail_mobs 207/221 · check_gait 61/61 PASS · check_gait_export 47/48',
        'Frozen — SK_Hero.glb 4833793441261a55… · Wardrobe 0839880763b9aa78… · manifest d9e793d810418ed0…',
        'Deliberately failing — E6_Crier at 1.94×, an export-path decision left at the measurement rather than closed by widening a bound.',
      ],
    },
  ],
}

export const MOB_SHEET: LabEntry = {
  slug: 'the-mob-sheet',
  title: 'Four mobs, one table',
  kicker: 'Roster sheet · Detail tier',
  standfirst:
    'Every mob in the detail tier is a row. Posture, corruption, head asymmetry, gait, hair and beard each name a row of another table, and a new mob is a line of numbers rather than a branch. This is what the four currently resolve to.',
  published: 'August 2026',
  date: '2026-08-25',
  hero: '/bkz/mob-heads.webp',
  meta: 'brooklyn-dead @ af708d5 · gate 207/221 · budget 40,000 tris / 8 MB',
  body: [
    {
      k: 'shot',
      img: MOB_LAB,
      caption:
        '**Where they end up.** A street in the mob lab at night — the detail tier drawn at playing distance, under the lab’s own solar clock. Mob vision scales with darkness and the flashlight beam is what gives you away, so this is the range every figure below is ultimately for.',
    },

    { k: 'h', text: 'On the bench' },
    {
      k: 'p',
      text: 'Same four bodies, lit flat and shot from the same camera. Every dial below is anchored on something the geometry already states — never a number somebody picked — which is what keeps the table honest when a fifth mob is added.',
    },
    {
      k: 'shot',
      img: HEADS,
      caption:
        '**The four heads, same camera, same light.** Facial hair costs 0.21–0.38% of the tri budget and displaces zero growth triangles — the corruption cap was never binding. `cheek_mange` earned a style rather than a dial value: its footprint is one no dial reaches.',
    },
    {
      k: 'roster',
      sheet: `${P}/mob-heads.webp`,
      cards: [
        {
          name: 'BasicZ1',
          role: 'roamer',
          tile: 0,
          dials: [
            ['beard', 'matted · full_beard'],
            ['chest depth', '115.05 mm'],
            ['neck escape', '11.2 mm'],
            ['growth tris', '4,960'],
            ['hair tris', '1,642'],
          ],
          tris: '11,734 tris',
          share: '29.3% of 40k · 40.5% of 8 MB',
          bars: { body: 12.36, grow: 12.4, hair: 4.58 },
        },
        {
          name: 'Crier',
          role: 'screamer',
          tile: 1,
          dials: [
            ['beard', 'cheek_mange'],
            ['chest depth', '86.28 mm'],
            ['neck escape', '27.0 mm'],
            ['growth tris', '4,860'],
            ['hair tris', '1,137'],
          ],
          tris: '11,057 tris',
          share: '27.6% of 40k · 39.4% of 8 MB',
          bars: { body: 12.36, grow: 12.15, hair: 3.13 },
        },
        {
          name: 'Fused',
          role: 'brute',
          tile: 2,
          dials: [
            ['beard', 'jaw_mat'],
            ['chest depth', '163.29 mm'],
            ['neck escape', '16.1 mm'],
            ['growth tris', '11,336'],
            ['hair tris', '1,954'],
          ],
          tris: '18,426 tris',
          share: '46.1% of 40k · 52.1% of 8 MB',
          bars: { body: 12.36, grow: 28.34, hair: 5.37 },
        },
        {
          name: 'Breaker',
          role: 'boss',
          tile: 3,
          dials: [
            ['beard', 'tusked · moustache'],
            ['chest depth', '151.62 mm'],
            ['neck escape', '12.8 mm'],
            ['growth tris', '11,860'],
            ['hair tris', '1,696'],
          ],
          tris: '18,604 tris',
          share: '46.5% of 40k · 52.0% of 8 MB',
          bars: { body: 12.36, grow: 29.65, hair: 4.5 },
        },
      ],
      key: [
        { label: 'body + head', tone: 'body' },
        { label: 'corruption growths', tone: 'grow' },
        { label: 'hair + beard', tone: 'hair' },
      ],
    },

    { k: 'h', text: 'They move differently too' },
    {
      k: 'p',
      text: 'Until this round all four played `Walk_Loop` — the hero’s own clip — so four distinct silhouettes shared one gait, and gait is most of what reads as character in motion. Each now carries its own, baked into all 53 clips and shipped in the GLB.',
    },
    {
      k: 'plates',
      layout: 'stack',
      items: [
        {
          src: `${P}/gait-breaker-after.webp`,
          w: 1499,
          h: 697,
          alt: 'The Breaker’s walk cycle, shoulders forward',
          note: 'Breaker · lumbers, shoulders forward',
        },
        {
          src: `${P}/gait-crier.webp`,
          w: 1500,
          h: 704,
          alt: 'The Crier’s walk cycle, neck craned low and arms wide',
          note: 'Crier · cranes low, arms wide and loose',
        },
      ],
      caption:
        '**Two of the four gaits.** The closest pair separates at **124×** the measured instrument floor; before this they agreed _to_ the floor, because four rigs playing one action have one basis track. Arm-into-body contact is zero on all four.',
    },

    { k: 'h', text: 'The Breaker is not on this clip set' },
    {
      k: 'p',
      text: 'It comes out of the SDF generator rather than the Blender scripts — a signed distance field polygonised and auto-skinned to its own **21-bone** rig, sharing nothing with the 65-bone mob skeleton. Nothing in the mob code changed to accept it, because kits already treat clip names as data.',
    },
    {
      k: 'p',
      text: 'It is off by default, capped at one, and will not spawn below a population of ten. 420 health at 260 poise cannot be staggered by a rifle — interesting at one, an unwinnable wall at four. What keeps it fair is speed: 2.2 m/s against the player’s 6.5, so you can always walk away.',
    },
    {
      k: 'shot',
      img: {
        src: `${P}/breaker-daylight.webp`,
        w: 1280,
        h: 720,
        alt: 'The Breaker seen close up in daylight, burning in the sun',
      },
      caption:
        '**Caught in daylight.** Exposure is a physics ray toward the sun against building collision — roofs and walls shelter, render shadows are not gameplay state. The same wax-paper melt takes corpses about seven seconds slower, because they have stopped struggling.',
    },

    { k: 'h', text: 'The world they are measured in' },
    {
      k: 'p',
      text: 'One building specification generates the facade, the interior lining, the collision, the shelter geometry and the navigation source together. A layout that drifts between those is forbidden rather than discouraged — every mob figure on this page depends on the street being the same street the navmesh thinks it is.',
    },
    {
      k: 'plates',
      label: 'Street level · interior · aerial',
      items: [
        {
          src: `${P}/block-street.webp`,
          w: 1280,
          h: 720,
          alt: 'A facade corner at street level in the block city',
        },
        {
          src: `${P}/block-interior.webp`,
          w: 1280,
          h: 720,
          alt: 'The interior of a walk-in ground floor',
        },
        {
          src: `${P}/block-aerial.webp`,
          w: 1280,
          h: 720,
          alt: 'An aerial view of the block city',
        },
      ],
      caption:
        '**The block city.** Wide streets, through-alleys, corners, 0.15 m sidewalks and forty walk-in ground floors, each with one 1.2 × 2.6 m entry. Windows are visually open and collision-solid, matching the audited production minimum.',
    },

    { k: 'h', text: 'What every row shares' },
    {
      k: 'p',
      text: 'A dial is only ever anchored on something the geometry already states — never a number somebody picked. That rule is what keeps the table honest when a new mob is added:',
    },
    {
      k: 'table',
      head: ['dial', '1.0 means', 'anchored on'],
      rows: [
        ['arm_out', '22.1°', 'the binding row’s own contact crossing'],
        ['arm_curl', '21.9°', 'measured at 21.92, unchanged by the ribcage'],
        ['loss', 'full removal', 'the moustache’s own 0.40 half-span'],
        ['matt', 'fully matted', 'the stubble shell’s own 3.5 / 1.2 mm'],
        ['clump', 'welded', 'two locks joined at conserved width and tris'],
        ['hem', 'shallowest', 'stubble_block’s own bottom row'],
      ],
    },

    {
      k: 'colophon',
      lines: [
        'Two rows still fail their gate — the Fused and Breaker at the axilla, needing a shoulder trade that costs 23.5% of the band. Refused on measurement.',
        'Frozen throughout — SK_Hero.glb 4833793441261a55…, byte-identical across all eleven merges of this round.',
      ],
    },
  ],
}
