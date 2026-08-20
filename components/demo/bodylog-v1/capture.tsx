'use client'

/**
 * The two screens that own a draft: capture (three steps) and the sprite
 * builder. They are split out from `screens.tsx` because they are the only
 * places the prototype writes anything, and because both hide the tab bar —
 * they are modes, not destinations.
 */
import type { CSSProperties } from 'react'
import {
  ACCCS,
  ACCS,
  CH_FACES,
  DISCS,
  EXPRS,
  HAIRCS,
  HAIRS,
  ICONS,
  OUTFITCS,
  OUTFITS,
  PROJECTS,
  SEVWORDS,
  SKINS,
  SPOTS,
  SYMPTOMS,
  TRIGGERS,
  type Project,
} from './data'
import { CARD, DOT, chip, micro, type State } from './model'
import { BodyFigure, Glyph, Sprite, inkOf, mosaic, tileStyle, type SpriteState } from './pixel'
import type { ScreenProps } from './screens'

const byId = (id: string): Project => PROJECTS.find((p) => p.id === id) as Project

const SCREEN: CSSProperties = {
  padding: '4px 18px 28px',
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
}

const PANEL: CSSProperties = { ...CARD, padding: '14px', display: 'flex', flexDirection: 'column', gap: '11px' }
const PANEL_TITLE: CSSProperties = { font: '300 13.5px var(--font-sans)', color: 'var(--text-1)' }

/** The dark plates that sit over the viewfinder, readable on any photo. */
const OVERLAY_BADGE: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  flex: 'none',
  whiteSpace: 'nowrap',
  padding: '4px 8px',
  borderRadius: '6px',
  background: 'rgba(10,10,9,.6)',
  font: '500 9.5px var(--font-mono)',
  letterSpacing: '.12em',
  textTransform: 'uppercase',
  color: '#ededea',
}

export function CaptureScreen({ st, set, toast }: ScreenProps) {
  const p = byId(st.capPid)
  const d = st.draft
  const ink = inkOf(st.theme)
  const patchDraft = (partial: Partial<State['draft']>) => set({ draft: { ...d, ...partial } })
  const toggle = (list: string[], v: string) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v])

  return (
    <div data-screen-label="Capture" style={SCREEN}>
      <div style={{ display: 'flex', gap: '5px' }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: '3px',
              borderRadius: '2px',
              background: i <= st.capStep ? 'var(--foreground)' : 'var(--surface-inset)',
            }}
          />
        ))}
      </div>

      {st.capStep === 0 ? (
        <>
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '2px' }} className="ph-scroll">
            {PROJECTS.map((x) => (
              <button key={x.id} onClick={() => set({ capPid: x.id })} style={chip(st.capPid === x.id, { fontSize: '11.5px' })}>
                <i style={DOT(x.tone)} />
                {x.name}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', borderRadius: '18px', overflow: 'hidden', border: '1px solid var(--rule-soft)', aspectRatio: '3/4' }}>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: mosaic(p.hue + 9, p.hue),
                backgroundSize: 'cover',
                imageRendering: 'pixelated',
              }}
            />
            {/* The previous shot, held under the live frame at luminosity so you
                can line the new one up against it. */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: mosaic(p.hue + 44, p.hue),
                backgroundSize: 'cover',
                imageRendering: 'pixelated',
                opacity: st.ghost ? 0.34 : 0,
                mixBlendMode: 'luminosity',
                transition: 'opacity .2s',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage:
                  'linear-gradient(to right,rgba(237,237,234,.14) 1px,transparent 1px),linear-gradient(to bottom,rgba(237,237,234,.14) 1px,transparent 1px)',
                backgroundSize: '33.33% 33.33%',
              }}
            />
            <div style={{ position: 'absolute', left: '10px', top: '10px', right: '10px', display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
              <span style={OVERLAY_BADGE}>ghosted</span>
              <span style={{ ...OVERLAY_BADGE, color: '#8fd9a6' }}>light matches</span>
            </div>
            <div style={{ position: 'absolute', left: '10px', bottom: '10px', right: '10px', display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
              <span style={OVERLAY_BADGE}>3 of 3 marks</span>
              <span style={OVERLAY_BADGE}>18 cm · no flash</span>
            </div>
          </div>

          <div style={{ font: '300 11.5px/1.55 var(--font-sans)', color: 'var(--text-4)', textAlign: 'center', textWrap: 'pretty' } as CSSProperties}>
            line the ghost up with what you see. matching distance and light is the whole trick to a timeline you can trust.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '26px', marginTop: '2px' }}>
            <button
              onClick={() => toast('camera roll', 'import a photo you already took.')}
              className="ch-btn ch-btn--ghost ch-btn--icon-lg"
              style={{ borderRadius: '999px' }}
              title="from library"
              aria-label="from library"
            >
              <Glyph rows={ICONS.lib} scale={1.8} color={ink} />
            </button>
            <button
              onClick={() => set({ capStep: 1 })}
              aria-label="take the photo"
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '999px',
                border: '2px solid var(--border)',
                background: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ width: '56px', height: '56px', borderRadius: '999px', background: 'var(--foreground)', display: 'block' }} />
            </button>
            <button
              onClick={() => set({ ghost: !st.ghost })}
              className="ch-btn ch-btn--ghost ch-btn--icon-lg"
              style={{ borderRadius: '999px' }}
              title="ghost overlay"
              aria-label="ghost overlay"
              aria-pressed={st.ghost}
            >
              <Glyph rows={ICONS.ghost} scale={1.8} color={st.ghost ? '#ebbb63' : st.theme === 'dark' ? 'rgba(237,237,234,.4)' : 'rgba(20,20,19,.35)'} />
            </button>
          </div>
        </>
      ) : null}

      {st.capStep === 1 ? (
        <>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={tileStyle(p.hue + 9, p.hue, { width: '54px', height: '54px', borderRadius: '12px', flex: 'none' })} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ font: '300 14px var(--font-sans)', color: 'var(--text-1)' }}>captured</div>
              <div style={{ font: '300 11.5px var(--font-sans)', color: 'var(--text-4)', marginTop: '3px' }}>03 aug, 21:04 · {p.name}</div>
            </div>
            <button onClick={() => set({ capStep: 0 })} className="ch-btn ch-btn--outline ch-btn--xs">
              retake
            </button>
          </div>

          <div style={PANEL}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <span style={PANEL_TITLE}>where is it</span>
              <span style={{ font: '300 11.5px var(--font-sans)', color: d.area ? 'var(--text-2)' : 'var(--text-5)' }}>
                {d.area ? SPOTS.find((s) => s.id === d.area)?.title : 'not set'}
              </span>
            </div>
            <div style={{ position: 'relative', width: '100%', maxWidth: '150px', aspectRatio: '100/220', margin: '0 auto' }}>
              <BodyFigure body={st.body} theme={st.theme} />
              {SPOTS.filter((s) => s.side === 'front').map((s) => {
                const sp = byId(s.pid)
                const sel = d.area === s.id
                return (
                  <button
                    key={s.id}
                    onClick={() => patchDraft({ area: s.id })}
                    title={s.title}
                    aria-label={s.title}
                    style={{
                      position: 'absolute',
                      left: `calc(${s.x}% - 7px)`,
                      top: `calc(${(s.y / 220) * 100}% - 7px)`,
                      width: '14px',
                      height: '14px',
                      borderRadius: '999px',
                      padding: 0,
                      background: sel ? sp.tone : `color-mix(in oklch, ${sp.tone} 30%, transparent)`,
                      border: '2px solid var(--background)',
                      boxShadow: sel ? `0 0 0 3px ${sp.tone}` : 'none',
                    }}
                  />
                )
              })}
            </div>
            <div style={{ font: '300 10.5px var(--font-sans)', color: 'var(--text-5)', textAlign: 'center' }}>
              tap the spot, or drop a new pin anywhere
            </div>
          </div>

          <div style={{ ...CARD, padding: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <span style={PANEL_TITLE}>how does it feel today</span>
              <span style={{ font: '300 12px var(--font-sans)', color: 'var(--text-2)' }}>{SEVWORDS[d.sev]}</span>
            </div>
            <input
              className="dp"
              type="range"
              min={0}
              max={5}
              step={1}
              value={d.sev}
              aria-label="severity"
              onChange={(e) => patchDraft({ sev: +e.target.value })}
              style={{ width: '100%', marginTop: '14px', background: 'var(--surface-inset)' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
              <span style={{ font: '500 9.5px var(--font-mono)', color: 'var(--text-6)' }}>clear</span>
              <span style={{ font: '500 9.5px var(--font-mono)', color: 'var(--text-6)' }}>worst it&apos;s been</span>
            </div>
            <div style={{ font: '300 10.5px/1.5 var(--font-sans)', color: 'var(--text-5)', marginTop: '9px' }}>
              your own scale. it isn&apos;t compared to anyone.
            </div>
          </div>

          <div style={PANEL}>
            <span style={PANEL_TITLE}>what you notice</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {SYMPTOMS.map((t) => (
                <button
                  key={t}
                  onClick={() => patchDraft({ tags: toggle(d.tags, t) })}
                  aria-pressed={d.tags.includes(t)}
                  style={chip(d.tags.includes(t), { fontSize: '11.5px', padding: '5px 11px' })}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div style={PANEL}>
            <span style={PANEL_TITLE}>note</span>
            <textarea
              className="ch-input ch-input--area"
              value={d.note}
              aria-label="note"
              onChange={(e) => patchDraft({ note: e.target.value })}
              placeholder="anything worth remembering — how it started, what you changed, how it felt"
            />
          </div>

          <div style={PANEL}>
            <span style={PANEL_TITLE}>applied today</span>
            <input
              className="ch-input"
              value={d.tx}
              aria-label="treatment applied today"
              onChange={(e) => patchDraft({ tx: e.target.value })}
              placeholder="treatment + dose, e.g. adapalene 0.1%, pea-size"
            />
          </div>

          <div style={PANEL}>
            <div>
              <span style={PANEL_TITLE}>anything else going on</span>
              <div style={{ font: '300 10.5px/1.5 var(--font-sans)', color: 'var(--text-5)', marginTop: '4px' }}>
                context you might want later. the app draws no conclusions from it.
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {TRIGGERS.map((t) => (
                <button
                  key={t}
                  onClick={() => patchDraft({ trig: toggle(d.trig, t) })}
                  aria-pressed={d.trig.includes(t)}
                  style={chip(d.trig.includes(t), { fontSize: '11.5px', padding: '5px 11px' })}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div style={PANEL}>
            <div>
              <span style={PANEL_TITLE}>shot conditions</span>
              <div style={{ font: '300 10.5px/1.5 var(--font-sans)', color: 'var(--text-5)', marginTop: '4px' }}>
                saved with the photo so future shots can match it.
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
              {(
                [
                  { label: 'light', key: 'light', opts: ['window', 'ring light', 'overhead', 'outdoors'] },
                  { label: 'distance', key: 'dist', opts: ['macro', 'close', 'arm’s length'] },
                ] as const
              ).map((r) => (
                <div key={r.key}>
                  <div style={{ ...micro(undefined, 9.5, '.16em'), marginBottom: '7px' }}>{r.label}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {r.opts.map((o) => (
                      <button
                        key={o}
                        onClick={() => patchDraft({ [r.key]: o } as Partial<State['draft']>)}
                        aria-pressed={d[r.key] === o}
                        style={chip(d[r.key] === o, { fontSize: '11.5px', padding: '5px 11px' })}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => set({ capStep: 2 })} className="ch-btn ch-btn--default ch-btn--lg" style={{ width: '100%', marginTop: '2px' }}>
            review
          </button>
        </>
      ) : null}

      {st.capStep === 2 ? (
        <>
          <div style={{ ...CARD, padding: '14px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ width: '100%', aspectRatio: '3/4', borderRadius: '12px', ...tileStyle(p.hue + 9, p.hue) }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                { k: 'project', v: p.name },
                { k: 'when', v: '03 aug 2026, 21:04' },
                { k: 'where', v: d.area ? (SPOTS.find((s) => s.id === d.area)?.title ?? 'not set') : 'not set' },
                { k: 'severity', v: `${d.sev}/5 — ${SEVWORDS[d.sev]}` },
                { k: 'notice', v: d.tags.length ? d.tags.join(', ') : 'nothing tagged' },
                { k: 'applied', v: d.tx || 'nothing logged' },
                { k: 'context', v: d.trig.length ? d.trig.join(', ') : 'none' },
                { k: 'conditions', v: `${d.light} · ${d.dist}` },
              ].map((r) => (
                <div key={r.k} style={{ display: 'flex', gap: '12px', alignItems: 'baseline', padding: '10px 0', borderBottom: '1px solid var(--rule-soft)' }}>
                  <span style={{ ...micro(undefined, 9.5, '.16em'), width: '88px', flex: 'none' }}>{r.k}</span>
                  <span style={{ font: '300 12.5px/1.5 var(--font-sans)', color: 'var(--text-2)', textWrap: 'pretty' } as CSSProperties}>{r.v}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ font: '300 11px/1.55 var(--font-sans)', color: 'var(--text-5)', textAlign: 'center', textWrap: 'pretty' } as CSSProperties}>
            stored on this phone. nothing is uploaded, nothing is analysed.
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => set({ capStep: 1 })} className="ch-btn ch-btn--outline ch-btn--lg" style={{ flex: 'none', width: '96px' }}>
              back
            </button>
            <button
              onClick={() => {
                set({ view: 'today', back: null, capStep: 0 })
                toast('added to history', 'streak held. “regimen” is 5 days away.')
              }}
              className="ch-btn ch-btn--default ch-btn--lg"
              style={{ flex: 1 }}
            >
              save to history
            </button>
          </div>
        </>
      ) : null}
    </div>
  )
}

/* ---------- sprite builder ---------- */

type Row = { label: string; opts: OptDef[] }
type OptDef = { key: string; title: string; on: () => void; style: CSSProperties; inner?: React.ReactNode }

export function SpriteScreen({ st, set, toast }: ScreenProps) {
  const sp = st.sprite
  const setSprite = (partial: Partial<SpriteState>) => set({ sprite: { ...sp, ...partial } })

  /** A colour swatch: the selection is a heavier ink border, never a tick. */
  const swatch = (key: string, bg: string, on: boolean, title: string, onClick: () => void): OptDef => ({
    key,
    title,
    on: onClick,
    style: {
      width: '30px',
      height: '30px',
      borderRadius: '9px',
      padding: 0,
      background: bg,
      border: on ? '2px solid var(--foreground)' : '1px solid var(--rule-soft)',
    },
  })

  const pill = (key: string, label: string, on: boolean, onClick: () => void): OptDef => ({
    key,
    title: label,
    on: onClick,
    inner: label,
    style: {
      minWidth: '58px',
      height: '32px',
      padding: '0 12px',
      borderRadius: '999px',
      background: on ? 'var(--primary)' : 'transparent',
      color: on ? 'var(--primary-foreground)' : 'var(--text-3)',
      border: `1px solid ${on ? 'transparent' : 'var(--rule-soft)'}`,
      font: '300 11.5px var(--font-sans)',
    },
  })

  /** A live preview of the option applied to the current sprite. */
  const tile = (key: string, over: Partial<SpriteState>, on: boolean, title: string, onClick: () => void): OptDef => ({
    key,
    title,
    on: onClick,
    inner: <Sprite size={38} sprite={sp} theme={st.theme} over={{ scene: 0, ...over }} />,
    style: {
      width: '48px',
      height: '48px',
      borderRadius: '12px',
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: on ? 'var(--surface-card-solid)' : 'transparent',
      border: on ? '2px solid var(--foreground)' : '1px solid var(--rule-soft)',
    },
  })

  const rows: Row[] = (() => {
    const t = st.spriteTab
    if (t === 'shape') {
      const out: Row[] = [
        {
          label: 'what are you',
          opts: (['circlehead', 'badge', 'person'] as const).map((f) =>
            tile(f, { form: f }, sp.form === f, f, () => setSprite({ form: f }))
          ),
        },
      ]
      if (sp.form !== 'person')
        out.push({
          label: 'disc colour',
          opts: DISCS.map((c, i) =>
            swatch(`disc${i}`, c ?? 'var(--foreground)', sp.disc === i, c ? 'tint' : 'ink', () => setSprite({ disc: i }))
          ),
        })
      return out
    }
    if (t === 'face') {
      if (sp.form === 'person')
        return [
          {
            label: 'skin',
            opts: SKINS.map((c, i) => swatch(`skin${i}`, c, sp.skin === i, `tone ${i + 1}`, () => setSprite({ skin: i }))),
          },
          {
            label: 'expression',
            opts: EXPRS.map((e, i) => tile(`expr${i}`, { expr: i }, sp.expr === i, e.n, () => setSprite({ expr: i }))),
          },
        ]
      return [
        {
          label: 'expression — all 26 circleheads faces',
          opts: CH_FACES.map((e, i) => tile(`ch${i}`, { chExpr: i, acc: [] }, sp.chExpr === i, e.n, () => setSprite({ chExpr: i }))),
        },
      ]
    }
    if (t === 'extras')
      return [
        {
          label: 'wear (stack as many as you like)',
          opts: ACCS.map((a) =>
            tile(
              a.id,
              { acc: a.id === 'none' ? [] : [a.id] },
              a.id === 'none' ? !sp.acc.length : sp.acc.includes(a.id),
              a.n,
              () =>
                setSprite({
                  acc: a.id === 'none' ? [] : sp.acc.includes(a.id) ? sp.acc.filter((x) => x !== a.id) : [...sp.acc, a.id],
                })
            )
          ),
        },
        {
          label: 'extras colour',
          opts: ACCCS.map((c, i) => swatch(`acc${i}`, c, sp.accC === i, `colour ${i + 1}`, () => setSprite({ accC: i }))),
        },
      ]
    if (t === 'hair')
      return [
        { label: 'cut', opts: HAIRS.map((h, i) => pill(`hair${i}`, h.n, sp.hair === i, () => setSprite({ hair: i }))) },
        {
          label: 'colour',
          opts: HAIRCS.map((c, i) => swatch(`hc${i}`, c, sp.hairC === i, `colour ${i + 1}`, () => setSprite({ hairC: i }))),
        },
      ]
    if (t === 'fit')
      return [
        { label: 'garment', opts: OUTFITS.map((o, i) => pill(`fit${i}`, o.n, sp.outfit === i, () => setSprite({ outfit: i }))) },
        {
          label: 'colour',
          opts: OUTFITCS.map((c, i) => swatch(`oc${i}`, c, sp.outfitC === i, `colour ${i + 1}`, () => setSprite({ outfitC: i }))),
        },
      ]
    return []
  })()

  const tabs: [string, string][] = [
    ['shape', 'shape'],
    ['face', 'face'],
    ['extras', 'extras'],
    ...(sp.form === 'person' ? ([['hair', 'hair'], ['fit', 'outfit']] as [string, string][]) : []),
  ]

  const shuffle = () => {
    const r = (n: number) => Math.floor(Math.random() * n)
    const forms = ['circlehead', 'circlehead', 'badge', 'person'] as const
    setSprite({
      form: forms[r(4)],
      disc: r(DISCS.length),
      chExpr: r(CH_FACES.length),
      expr: r(EXPRS.length),
      skin: r(SKINS.length),
      hair: r(HAIRS.length),
      hairC: r(HAIRCS.length),
      outfit: r(OUTFITS.length),
      outfitC: r(OUTFITCS.length),
      accC: r(ACCCS.length),
      acc: Math.random() > 0.25 ? [ACCS[1 + r(ACCS.length - 1)].id] : [],
    })
  }

  return (
    <div data-screen-label="Sprite builder" style={SCREEN}>
      <div
        style={{
          border: '1px solid var(--rule-soft)',
          borderRadius: '18px',
          padding: '22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--surface-card)',
        }}
      >
        <Sprite size={176} sprite={sp} theme={st.theme} />
      </div>

      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <input
          value={sp.name}
          aria-label="sprite name"
          onChange={(e) => setSprite({ name: e.target.value })}
          className="ch-input"
          style={{ flex: 1, textAlign: 'center', fontSize: '15px', borderRadius: '999px' }}
          placeholder="name your sprite"
        />
        <button onClick={shuffle} className="ch-btn ch-btn--outline" style={{ flex: 'none', borderRadius: '999px', height: '41px' }}>
          shuffle
        </button>
      </div>

      <div style={{ display: 'flex', gap: '5px', overflowX: 'auto', paddingBottom: '2px' }} className="ph-scroll">
        {tabs.map(([v, l]) => (
          <button key={v} onClick={() => set({ spriteTab: v })} style={chip(st.spriteTab === v, { fontSize: '11.5px' })}>
            {l}
          </button>
        ))}
      </div>

      <div style={{ ...CARD, padding: '14px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {rows.map((r) => (
          <div key={r.label}>
            <div style={{ ...micro(), marginBottom: '10px' }}>{r.label}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {r.opts.map((o) => (
                <button key={o.key} onClick={o.on} title={o.title} aria-label={o.title} style={o.style}>
                  {o.inner}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ font: '300 11px/1.55 var(--font-sans)', color: 'var(--text-5)', textWrap: 'pretty' } as CSSProperties}>
        pieces unlock as you log. nothing here is generated — every part is hand-drawn pixel by pixel and picked by you.
      </div>

      <button
        onClick={() => {
          set({ view: 'you', back: null })
          toast('sprite saved', `${sp.name} will carry your badges.`)
        }}
        className="ch-btn ch-btn--default ch-btn--lg"
        style={{ width: '100%' }}
      >
        save sprite
      </button>
    </div>
  )
}
