'use client'

/**
 * The seven read-and-browse screens. Capture and the sprite builder are the two
 * screens that own a draft, so they live in `capture.tsx`.
 *
 * Each screen takes the whole state plus a patch function. That is the shape
 * the original had, and it is honest here: the screens genuinely read across
 * the state (the body map cares about the selected spot, the theme and the
 * silhouette at once), so narrowing the props would only move the fan-out.
 */
import type { CSSProperties } from 'react'
import { BADGES, ENTRIES, PROJECTS, SPOTS, badgeArt, rnd, type Project } from './data'
import { ACTIVITY, CARD, DOT, LEGEND, STATS, chip, micro, type State } from './model'
import { BodyFigure, Glyph, Px, Sprite, inkOf, mosaic, tileStyle } from './pixel'

export type ScreenProps = {
  st: State
  set: (patch: Partial<State>) => void
  toast: (title: string, sub: string) => void
}

const byId = (id: string): Project => PROJECTS.find((p) => p.id === id) as Project

const SCREEN: CSSProperties = {
  padding: '4px 18px 28px',
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
}

const H1: CSSProperties = {
  font: '200 22px/1.15 var(--font-sans)',
  letterSpacing: '-.02em',
  color: 'var(--text-1)',
}

const STAND: CSSProperties = {
  font: '300 12.5px/1.5 var(--font-sans)',
  color: 'var(--text-3)',
  marginTop: '-8px',
}

const SECTION_LABEL: CSSProperties = { ...micro('var(--text-4)') }

/** The dashed affordance the system uses for "there is more, but not yet". */
const DASHED: CSSProperties = {
  border: '1px dashed var(--border)',
  background: 'transparent',
  borderRadius: '18px',
  padding: '13px',
  cursor: 'pointer',
  font: '300 12.5px var(--font-sans)',
  color: 'var(--text-4)',
}

/* ---------- today ---------- */

export function TodayScreen({ st, set, toast }: ScreenProps) {
  return (
    <div data-screen-label="Today" style={SCREEN}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '2px 2px 4px' }}>
        <button
          onClick={() => set({ view: 'sprite', back: 'you' })}
          aria-label="edit your sprite"
          style={{ border: 0, background: 'transparent', padding: 0, flex: 'none', display: 'block' }}
        >
          <Sprite size={58} sprite={st.sprite} theme={st.theme} />
        </button>
        <div style={{ minWidth: 0, flex: 1, display: 'flex', flexDirection: 'column', gap: '7px' }}>
          <div style={{ font: '200 21px/1.15 var(--font-sans)', letterSpacing: '-.02em', color: 'var(--text-1)' }}>
            good evening, sam
          </div>
          <div style={{ font: '300 12.5px/1.45 var(--font-sans)', color: 'var(--text-3)' }}>
            {ACTIVITY.streak} days running. one photo left on today’s list.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginTop: '1px' }}>
            <span style={micro('var(--text-4)')}>lv 7</span>
            <div style={{ flex: 1, height: '3px', borderRadius: '2px', background: 'var(--surface-inset)', overflow: 'hidden' }}>
              <div style={{ width: '68%', height: '100%', background: 'var(--foreground)' }} />
            </div>
            <span style={{ font: '500 9.5px var(--font-mono)', letterSpacing: '.06em', color: 'var(--text-5)' }}>360 xp</span>
          </div>
        </div>
      </div>

      <div style={{ ...CARD, padding: '16px 14px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', padding: '0 2px' }}>
          <div>
            <div style={{ font: '300 14px var(--font-sans)', color: 'var(--text-1)' }}>logging history</div>
            <div style={{ font: '300 11.5px/1.4 var(--font-sans)', color: 'var(--text-4)', marginTop: '3px' }}>
              one cell per day. darker = more photos.
            </div>
          </div>
          <div style={{ textAlign: 'right', flex: 'none' }}>
            <div style={micro()}>streak</div>
            <div style={{ font: '200 22px/1 var(--font-sans)', letterSpacing: '-.02em', color: 'var(--text-1)', marginTop: '3px' }}>
              {ACTIVITY.streak} days
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'grid',
            gridAutoFlow: 'column',
            gridTemplateRows: 'repeat(7,8px)',
            gap: '3px',
            margin: '14px 0 0',
            overflow: 'hidden',
          }}
        >
          {ACTIVITY.cells26.map((c, i) => (
            <div key={i} title={c.t} style={c.s} />
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px', padding: '0 2px' }}>
          <span style={micro(undefined, 9.5, '.14em')}>last 26 weeks</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ font: '500 9.5px var(--font-mono)', color: 'var(--text-6)' }}>less</span>
            {LEGEND.map((s, i) => (
              <div key={i} style={s} />
            ))}
            <span style={{ font: '500 9.5px var(--font-mono)', color: 'var(--text-6)' }}>more</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {STATS.map((s) => (
          <div key={s.k} style={{ ...CARD, padding: '13px 14px' }}>
            <div style={micro()}>{s.k}</div>
            <div style={{ font: '200 24px/1 var(--font-sans)', letterSpacing: '-.02em', color: 'var(--text-1)', marginTop: '8px' }}>
              {s.v}
            </div>
            <div style={{ font: '300 11px var(--font-sans)', color: 'var(--text-4)', marginTop: '6px' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: '6px', padding: '0 2px' }}>
        <span style={SECTION_LABEL}>what you track</span>
        <NewProjectButton toast={toast} />
      </div>

      {PROJECTS.map((p) => (
        <ProjectRow key={p.id} p={p} spark onClick={() => set({ view: 'project', pid: p.id, back: 'today' })} />
      ))}

      <button onClick={() => set({ view: 'photos' })} style={{ ...DASHED, marginTop: '2px' }}>
        see everything in one timeline
      </button>
    </div>
  )
}

function NewProjectButton({ toast }: { toast: ScreenProps['toast'] }) {
  return (
    <button
      onClick={() => toast('new project', 'name it, pick a colour, start shooting.')}
      style={{ border: 0, background: 'transparent', padding: 0, font: '300 12px var(--font-sans)', color: 'var(--text-3)' }}
    >
      + new
    </button>
  )
}

function ProjectRow({ p, spark, onClick }: { p: Project; spark?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="ch-lift"
      style={{
        ...CARD,
        textAlign: 'left',
        width: '100%',
        padding: '14px',
        cursor: 'pointer',
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        color: 'inherit',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <div style={tileStyle(p.hue, p.hue, { width: '48px', height: '48px', borderRadius: '12px', flex: 'none' })} />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
          <i style={DOT(p.tone)} />
          <span style={{ font: '300 14px var(--font-sans)', color: 'var(--text-1)' }}>{p.name}</span>
        </div>
        <div
          style={{
            font: '300 11.5px var(--font-sans)',
            color: 'var(--text-4)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {p.area}
        </div>
        <div style={{ ...micro(), letterSpacing: '.1em', marginTop: '2px' }}>
          {p.n} entries · since {p.since}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px', flex: 'none' }}>
        {spark ? (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '24px' }}>
            {Array.from({ length: 9 }, (_, i) => (
              <div
                key={i}
                style={{
                  width: '3px',
                  borderRadius: '2px',
                  background: i === 8 ? p.tone : `color-mix(in oklch, ${p.tone} 32%, transparent)`,
                  height: `${(7 + rnd(p.hue + i) * 15).toFixed(0)}px`,
                }}
              />
            ))}
          </div>
        ) : null}
        <span style={{ font: '300 10.5px var(--font-sans)', color: 'var(--text-5)' }}>{p.last}</span>
      </div>
    </button>
  )
}

/* ---------- project detail ---------- */

export function ProjectScreen({ st, set, toast }: ScreenProps) {
  const p = byId(st.pid)
  const own = ENTRIES.filter((e) => e.pid === p.id)
  const entries = own.length ? own : ENTRIES.slice(0, 3)

  return (
    <div data-screen-label="Project detail" style={SCREEN}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <i style={DOT(p.tone)} />
        <span style={SECTION_LABEL}>project · {p.n} entries</span>
      </div>
      <div style={{ font: '200 24px/1.15 var(--font-sans)', letterSpacing: '-.02em', color: 'var(--text-1)' }}>{p.name}</div>
      <div style={{ ...STAND, marginTop: '-6px' }}>
        {p.area} · tracking since {p.since}
      </div>

      <div style={{ ...CARD, padding: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ font: '300 13.5px var(--font-sans)', color: 'var(--text-1)' }}>then / now</span>
          <span style={micro(undefined, 9.5, '.14em')}>6 months</span>
        </div>
        <div
          style={{
            position: 'relative',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid var(--rule-soft)',
            aspectRatio: '4/3',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: mosaic(p.hue + 3, p.hue),
              backgroundSize: 'cover',
              imageRendering: 'pixelated',
            }}
          />
          <div style={{ position: 'absolute', inset: 0, width: `${st.cmp}%`, overflow: 'hidden' }}>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                // The inner plate is sized so the image stays put while the
                // window over it narrows: a wipe, not a squeeze.
                width: `${(100 / Math.max(st.cmp, 1)) * 100}%`,
                backgroundImage: mosaic(p.hue + 41, p.hue),
                backgroundSize: 'cover',
                imageRendering: 'pixelated',
              }}
            />
          </div>
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${st.cmp}%`, width: '2px', background: '#fafaf8', opacity: 0.8 }} />
          <Stamp side="left">feb 04</Stamp>
          <Stamp side="right">aug 03</Stamp>
        </div>
        <input
          className="dp"
          type="range"
          min={0}
          max={100}
          value={st.cmp}
          aria-label="wipe between the first and most recent photo"
          onChange={(e) => set({ cmp: +e.target.value })}
          style={{ width: '100%', margin: '12px 0 0', background: 'var(--surface-inset)' }}
        />
        <div style={{ font: '300 11px/1.5 var(--font-sans)', color: 'var(--text-4)', marginTop: '6px' }}>
          drag to wipe between the first and most recent photo. same distance, same light — the capture screen keeps them comparable.
        </div>
      </div>

      <div style={{ ...CARD, padding: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <span style={{ font: '300 13.5px var(--font-sans)', color: 'var(--text-1)' }}>how you rated it</span>
          <span style={micro(undefined, 9.5, '.14em')}>your scale, 0–5</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '64px', marginTop: '14px' }}>
          {Array.from({ length: 26 }, (_, i) => {
            const v = 1 + Math.round(rnd(p.hue + i * 5) * 4)
            return (
              <div
                key={i}
                title={`sev ${v}/5`}
                style={{
                  flex: 1,
                  borderRadius: '2px 2px 0 0',
                  height: `${((v / 5) * 100).toFixed(0)}%`,
                  background: i > 22 ? p.tone : `color-mix(in oklch, ${p.tone} 34%, transparent)`,
                }}
              />
            )
          })}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
          <span style={{ font: '500 9.5px var(--font-mono)', color: 'var(--text-6)' }}>feb</span>
          <span style={{ font: '500 9.5px var(--font-mono)', color: 'var(--text-6)' }}>now</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: '4px', padding: '0 2px' }}>
        <span style={SECTION_LABEL}>entries</span>
        <span style={{ font: '300 11.5px var(--font-sans)', color: 'var(--text-5)' }}>{p.n} total</span>
      </div>
      {entries.map((e) => (
        <div key={e.d + e.pid} style={{ ...CARD, padding: '12px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <div style={tileStyle(p.hue + e.d.length * 3, p.hue, { width: '54px', height: '54px', borderRadius: '10px', flex: 'none' })} />
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ font: '500 10px var(--font-mono)', letterSpacing: '.08em', color: 'var(--text-3)' }}>{e.d}</span>
              <span style={{ font: '300 10.5px var(--font-sans)', color: 'var(--text-5)' }}>sev {e.sev}/5</span>
            </div>
            <div style={{ font: '300 12px/1.5 var(--font-sans)', color: 'var(--text-2)', textWrap: 'pretty' } as CSSProperties}>
              {e.note}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '2px' }}>
              {e.tags.map((t) => (
                <span key={t} className="ch-tag ch-tag--bare">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
      <button onClick={() => toast('pdf built', 'photos, dates, your notes. nothing else.')} style={DASHED}>
        build a pdf for your next appointment
      </button>
    </div>
  )
}

function Stamp({ side, children }: { side: 'left' | 'right'; children: React.ReactNode }) {
  return (
    <div
      style={{
        position: 'absolute',
        [side]: '8px',
        top: '8px',
        padding: '3px 7px',
        borderRadius: '5px',
        background: 'rgba(10,10,9,.62)',
        font: '500 9.5px var(--font-mono)',
        letterSpacing: '.1em',
        color: '#ededea',
      }}
    >
      {children}
    </div>
  )
}

/* ---------- body map ---------- */

const PILL_GROUP: CSSProperties = {
  display: 'flex',
  gap: '2px',
  padding: '3px',
  borderRadius: '999px',
  border: '1px solid var(--rule-soft)',
  background: 'var(--surface-card)',
}

export function BodyScreen({ st, set }: ScreenProps) {
  const b = st.body
  const bmi = b.w / Math.pow(b.h / 100, 2)
  const hots = SPOTS.filter((s) => s.side === b.side)
  const chosen = st.spot ? SPOTS.find((x) => x.id === st.spot) : null

  return (
    <div data-screen-label="Body map" style={SCREEN}>
      <div style={H1}>body map</div>
      <div style={STAND}>every photo is pinned to a place. tap a dot to see what&apos;s there.</div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <div style={PILL_GROUP}>
          {(['front', 'back'] as const).map((v) => (
            <button
              key={v}
              onClick={() => set({ body: { ...b, side: v }, spot: null })}
              style={chip(b.side === v, { padding: '4px 14px', fontSize: '11.5px' })}
            >
              {v}
            </button>
          ))}
        </div>
        <div style={PILL_GROUP}>
          {([['fem', 'type a'], ['masc', 'type b']] as const).map(([v, l]) => (
            <button
              key={v}
              onClick={() => set({ body: { ...b, sex: v } })}
              style={chip(b.sex === v, { padding: '4px 14px', fontSize: '11.5px' })}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div style={{ ...CARD, padding: '8px 14px 14px' }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '100/220', maxWidth: '230px', margin: '0 auto' }}>
          <BodyFigure body={b} theme={st.theme} />
          {hots.map((s) => {
            const p = byId(s.pid)
            const sel = st.spot === s.id
            return (
              <button
                key={s.id}
                onClick={() => set({ spot: s.id })}
                title={`${s.title} · ${s.n} photos`}
                aria-label={`${s.title}, ${s.n} photos`}
                style={{
                  position: 'absolute',
                  left: `calc(${s.x}% - 9px)`,
                  top: `calc(${(s.y / 220) * 100}% - 9px)`,
                  width: '18px',
                  height: '18px',
                  borderRadius: '999px',
                  padding: 0,
                  background: p.tone,
                  border: `${sel ? 3 : 2}px solid var(--background)`,
                  boxShadow: sel ? `0 0 0 3px ${p.tone}` : 'none',
                  transition: 'box-shadow .15s',
                }}
              />
            )
          })}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginTop: '6px' }}>
          {PROJECTS.map((p) => (
            <span
              key={p.id}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', font: '300 11px var(--font-sans)', color: 'var(--text-4)' }}
            >
              <i style={DOT(p.tone)} />
              {p.name}
            </span>
          ))}
        </div>
      </div>

      <div style={{ ...CARD, padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <span style={{ font: '300 13.5px var(--font-sans)', color: 'var(--text-1)' }}>build the silhouette</span>
          <span style={micro(undefined, 9.5, '.14em')}>bmi {bmi.toFixed(1)}</span>
        </div>
        <Slider
          label="height"
          value={`${b.h} cm`}
          min={140}
          max={205}
          v={b.h}
          onChange={(n) => set({ body: { ...b, h: n } })}
        />
        <Slider
          label="weight"
          value={`${b.w} kg`}
          min={40}
          max={160}
          v={b.w}
          onChange={(n) => set({ body: { ...b, w: n } })}
        />
        <div style={{ font: '300 11px/1.5 var(--font-sans)', color: 'var(--text-5)', textWrap: 'pretty' } as CSSProperties}>
          this only shapes the drawing so your pins land where they actually are. it is never shown as a health number and never
          leaves the phone.
        </div>
      </div>

      {chosen ? (
        <div
          style={{
            ...CARD,
            background: 'var(--surface-card-solid)',
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i style={DOT(byId(chosen.pid).tone)} />
            <span style={{ font: '300 14px var(--font-sans)', color: 'var(--text-1)' }}>{chosen.title}</span>
          </div>
          <div style={{ font: '300 11.5px var(--font-sans)', color: 'var(--text-4)' }}>
            {byId(chosen.pid).name} · {chosen.n} photos · last 2 days ago
          </div>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' }} className="ph-scroll">
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                style={tileStyle(chosen.x + i * 11, byId(chosen.pid).hue, {
                  width: '64px',
                  height: '64px',
                  borderRadius: '10px',
                  flex: 'none',
                })}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

function Slider({
  label,
  value,
  min,
  max,
  v,
  onChange,
}: {
  label: string
  value: string
  min: number
  max: number
  v: number
  onChange: (n: number) => void
}) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <span style={micro(undefined, 9.5, '.14em')}>{label}</span>
        <span style={{ font: '300 11.5px var(--font-sans)', color: 'var(--text-3)' }}>{value}</span>
      </div>
      <input
        className="dp"
        type="range"
        min={min}
        max={max}
        value={v}
        aria-label={label}
        onChange={(e) => onChange(+e.target.value)}
        style={{ width: '100%', background: 'var(--surface-inset)' }}
      />
    </div>
  )
}

/* ---------- photos ---------- */

export function PhotosScreen({ st, set }: ScreenProps) {
  const cols = [5, 3, 2, 1][st.zoom]
  const gap = [4, 6, 8, 10][st.zoom]
  const groups = [
    { label: 'august 2026', n: st.zoom > 1 ? 6 : 9, base: 0 },
    { label: 'july 2026', n: st.zoom > 1 ? 8 : 14, base: 1 },
    { label: 'june 2026', n: st.zoom > 1 ? 7 : 12, base: 2 },
  ]

  return (
    <div data-screen-label="Photos" style={SCREEN}>
      <div>
        <div style={H1}>progression</div>
        <div style={{ font: '300 12.5px/1.5 var(--font-sans)', color: 'var(--text-3)', marginTop: '4px' }}>312 photos, oldest first.</div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          border: '1px solid var(--rule-soft)',
          background: 'var(--surface-card)',
          borderRadius: '999px',
          padding: '8px 14px',
        }}
      >
        <span style={micro(undefined, 9.5, '.14em')}>zoom</span>
        <input
          className="dp"
          type="range"
          min={0}
          max={3}
          step={1}
          value={st.zoom}
          aria-label="zoom"
          onChange={(e) => set({ zoom: +e.target.value })}
          style={{ flex: 1, background: 'var(--surface-inset)' }}
        />
        <span style={{ font: '500 9.5px var(--font-mono)', letterSpacing: '.1em', color: 'var(--text-4)', minWidth: '52px', textAlign: 'right' }}>
          {['contact', 'grid', 'pairs', 'single'][st.zoom]}
        </span>
      </div>

      <FilterRow
        current={st.photoFilter}
        onPick={(id) => set({ photoFilter: id })}
        all="everything"
      />

      {groups.map((g) => (
        <div key={g.label} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '0 2px' }}>
            <span style={SECTION_LABEL}>{g.label}</span>
            <span style={{ font: '300 11px var(--font-sans)', color: 'var(--text-5)' }}>{g.n} photos</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols},1fr)`, gap: `${gap}px` }}>
            {Array.from({ length: g.n }, (_, i) => {
              const p = PROJECTS[(g.base + i) % 3]
              return (
                <button
                  key={i}
                  onClick={() => set({ view: 'project', pid: p.id, back: 'photos' })}
                  aria-label={`${p.name} photo`}
                  style={{
                    position: 'relative',
                    aspectRatio: '1',
                    borderRadius: `${cols > 3 ? 5 : 9}px`,
                    padding: 0,
                    overflow: 'hidden',
                    ...tileStyle(g.base * 13 + i * 7, p.hue),
                    boxShadow: `inset 0 0 0 2px color-mix(in oklch, ${p.tone} 55%, transparent)`,
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: '4px',
                      bottom: '3px',
                      font: '500 8.5px var(--font-mono)',
                      color: '#fafaf8',
                      textShadow: '0 1px 2px rgba(0,0,0,.55)',
                      display: cols > 3 ? 'none' : 'block',
                    }}
                  >
                    {String((i % 28) + 1).padStart(2, '0')}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

function FilterRow({ current, onPick, all }: { current: string; onPick: (id: string) => void; all: string }) {
  const opts = [{ id: 'all', l: all }, ...PROJECTS.map((p) => ({ id: p.id, l: p.name }))]
  return (
    <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '2px' }} className="ph-scroll">
      {opts.map((f) => (
        <button key={f.id} onClick={() => onPick(f.id)} style={chip(current === f.id, { fontSize: '11.5px' })}>
          {f.l}
        </button>
      ))}
    </div>
  )
}

/* ---------- notes ---------- */

export function NotesScreen({ st, set }: ScreenProps) {
  const notes = ENTRIES.filter((e) => st.noteFilter === 'all' || e.pid === st.noteFilter)
  const ink = inkOf(st.theme)

  return (
    <div data-screen-label="Notes" style={SCREEN}>
      <div style={H1}>notes</div>
      <div style={STAND}>what you wrote, in your words, in order.</div>

      <div className="ch-search" style={{ borderRadius: '999px' }}>
        <span style={{ color: 'var(--text-6)', display: 'flex' }}>
          <Glyph rows={['.####...', '#....#..', '#....#..', '#....#..', '.####...', '....##..', '.....##.', '........']} scale={1.7} color={ink} />
        </span>
        <input placeholder="search notes, tags, treatments" aria-label="search notes" />
      </div>

      <FilterRow current={st.noteFilter} onPick={(id) => set({ noteFilter: id })} all="all notes" />

      {notes.map((n) => {
        const p = byId(n.pid)
        return (
          <div key={n.d + n.pid} style={{ ...CARD, padding: '14px', display: 'flex', flexDirection: 'column', gap: '9px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i style={DOT(p.tone)} />
              <span style={{ font: '500 10px var(--font-mono)', letterSpacing: '.08em', color: 'var(--text-3)' }}>{n.d}</span>
              <span style={{ font: '300 11px var(--font-sans)', color: 'var(--text-5)' }}>{p.name}</span>
              <span style={{ marginLeft: 'auto', font: '300 10.5px var(--font-sans)', color: 'var(--text-5)' }}>sev {n.sev}/5</span>
            </div>
            <div style={{ font: '300 13px/1.6 var(--font-sans)', color: 'var(--text-2)', textWrap: 'pretty' } as CSSProperties}>{n.note}</div>
            {n.tx ? (
              <div style={{ font: '300 11.5px/1.5 var(--font-sans)', color: 'var(--text-4)' }}>applied — {n.tx}</div>
            ) : null}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {n.tags.map((t) => (
                <span key={t} className="ch-tag ch-tag--bare">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ---------- you ---------- */

export function YouScreen({ st, set, toast }: ScreenProps) {
  const ink = inkOf(st.theme)
  let got = 0
  let all = 0
  BADGES.forEach((g) =>
    g.items.forEach((i) => {
      all++
      if (i.got) got++
    })
  )

  return (
    <div data-screen-label="You" style={SCREEN}>
      <div style={{ ...CARD, padding: '16px', display: 'flex', gap: '14px', alignItems: 'center' }}>
        <button
          onClick={() => set({ view: 'sprite', back: 'you' })}
          aria-label="edit your sprite"
          style={{ border: 0, background: 'transparent', padding: 0, flex: 'none', display: 'block' }}
        >
          <Sprite size={84} sprite={st.sprite} theme={st.theme} />
        </button>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '7px' }}>
          <div style={{ font: '300 17px var(--font-sans)', color: 'var(--text-1)' }}>{st.sprite.name}</div>
          <div style={{ font: '300 11.5px/1.4 var(--font-sans)', color: 'var(--text-4)' }}>level 7 · 360 xp to next</div>
          <div style={{ height: '3px', borderRadius: '2px', background: 'var(--surface-inset)', overflow: 'hidden' }}>
            <div style={{ width: '68%', height: '100%', background: 'var(--foreground)' }} />
          </div>
          <button
            onClick={() => set({ view: 'sprite', back: 'you' })}
            className="ch-btn ch-btn--outline ch-btn--xs"
            style={{ alignSelf: 'flex-start', marginTop: '4px' }}
          >
            edit sprite
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
        {[
          { k: 'photos', v: String(ACTIVITY.total) },
          { k: 'streak', v: String(ACTIVITY.streak) },
          { k: 'badges', v: `${got}/${all}` },
        ].map((s) => (
          <div key={s.k} style={{ ...CARD, padding: '12px 10px', textAlign: 'center' }}>
            <div style={{ font: '200 21px/1 var(--font-sans)', letterSpacing: '-.02em', color: 'var(--text-1)' }}>{s.v}</div>
            <div style={{ ...micro(undefined, 9, '.16em'), marginTop: '7px' }}>{s.k}</div>
          </div>
        ))}
      </div>

      <div style={{ ...CARD, padding: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <span style={{ font: '300 13.5px var(--font-sans)', color: 'var(--text-1)' }}>streak</span>
          <span style={micro(undefined, 9.5, '.14em')}>{ACTIVITY.streak} days</span>
        </div>
        <div style={{ display: 'flex', gap: '5px', marginTop: '12px' }}>
          {['m', 't', 'w', 't', 'f', 's', 's'].map((l, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <div
                style={{
                  width: '100%',
                  height: '26px',
                  borderRadius: '6px',
                  background:
                    i < 5
                      ? 'var(--accent-blue)'
                      : i === 5
                        ? 'color-mix(in oklch, var(--accent-blue) 40%, var(--background))'
                        : 'var(--surface-inset)',
                  border: i > 5 ? '1px solid var(--rule-soft)' : 'none',
                  boxSizing: 'border-box',
                }}
              />
              <span style={{ font: '500 9px var(--font-mono)', color: 'var(--text-6)' }}>{l}</span>
            </div>
          ))}
        </div>
        <div style={{ font: '300 11px/1.5 var(--font-sans)', color: 'var(--text-5)', marginTop: '10px' }}>
          a missed day resets it. that&apos;s all it does — nothing else in the app changes.
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: '4px', padding: '0 2px' }}>
        <span style={SECTION_LABEL}>your projects</span>
        <NewProjectButton toast={toast} />
      </div>
      {PROJECTS.map((p) => (
        <ProjectRow key={p.id} p={p} onClick={() => set({ view: 'project', pid: p.id, back: 'you' })} />
      ))}

      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: '8px', padding: '0 2px' }}>
        <span style={SECTION_LABEL}>badges</span>
        <span style={{ font: '300 11.5px var(--font-sans)', color: 'var(--text-5)' }}>
          {got} of {all}
        </span>
      </div>
      {BADGES.map((g) => (
        <div key={g.g} style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
          <div style={{ font: '300 12.5px var(--font-sans)', color: 'var(--text-3)', padding: '0 2px' }}>{g.g}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '9px' }}>
            {g.items.map((bd) => (
              <button
                key={bd.id}
                onClick={() => set({ view: 'badge', back: 'you', badge: bd.id })}
                style={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                  textAlign: 'left',
                  padding: '11px',
                  borderRadius: '18px',
                  fontFamily: 'var(--font-sans)',
                  border: '1px solid var(--rule-soft)',
                  background: bd.got ? 'var(--surface-card)' : 'transparent',
                  opacity: bd.got ? 1 : 0.72,
                }}
              >
                <div style={{ flex: 'none' }}>
                  <Px
                    rows={badgeArt(bd.id)}
                    pal={{
                      '#': bd.got ? ink : st.theme === 'dark' ? 'rgba(237,237,234,.2)' : 'rgba(20,20,19,.16)',
                      a: bd.got ? '#ebbb63' : 'transparent',
                    }}
                    scale={2.6}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                  <div style={{ font: '300 12px var(--font-sans)', color: bd.got ? 'var(--text-1)' : 'var(--text-5)' }}>{bd.n}</div>
                  <div style={{ font: '300 10px/1.35 var(--font-sans)', color: 'var(--text-5)', marginTop: '3px' }}>{bd.h}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}

      <div style={{ ...CARD, padding: '6px 14px', marginTop: '6px' }}>
        {[
          { label: 'hide thumbnails by default', hint: 'photos stay covered until you tap', v: st.blur, on: () => set({ blur: !st.blur }) },
          { label: 'blur faces in exports', hint: 'applies to the clinic pdf only', v: st.lock, on: () => set({ lock: !st.lock }) },
          { label: 'evening reminder', hint: '21:00, silent', v: st.remind, on: () => set({ remind: !st.remind }) },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              padding: '13px 0',
              borderBottom: '1px solid var(--rule-soft)',
            }}
          >
            <div style={{ minWidth: 0 }}>
              <div style={{ font: '300 13px var(--font-sans)', color: 'var(--text-2)' }}>{s.label}</div>
              <div style={{ font: '300 10.5px/1.4 var(--font-sans)', color: 'var(--text-5)', marginTop: '3px' }}>{s.hint}</div>
            </div>
            <button
              onClick={s.on}
              role="switch"
              aria-checked={s.v}
              aria-label={s.label}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                width: '36px',
                height: '20px',
                flex: 'none',
                padding: '2px',
                boxSizing: 'border-box',
                borderRadius: '999px',
                border: '1px solid var(--border)',
                background: s.v ? 'var(--foreground)' : 'color-mix(in oklch, var(--muted) 40%, transparent)',
              }}
            >
              <i
                style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '999px',
                  background: s.v ? 'var(--background)' : 'var(--muted-foreground)',
                  transform: s.v ? 'translateX(16px)' : 'none',
                  transition: 'transform .2s',
                }}
              />
            </button>
          </div>
        ))}
        <button
          onClick={() => set({ onboard: true, obStep: 0 })}
          style={{
            width: '100%',
            textAlign: 'left',
            border: 0,
            background: 'transparent',
            padding: '13px 0',
            font: '300 13px var(--font-sans)',
            color: 'var(--text-3)',
          }}
        >
          replay the intro
        </button>
      </div>
    </div>
  )
}

/* ---------- badge detail ---------- */

export function BadgeScreen({ st }: ScreenProps) {
  const bd = BADGES.flatMap((g) => g.items).find((x) => x.id === st.badge)
  if (!bd) return null
  const ink = inkOf(st.theme)

  return (
    <div
      data-screen-label="Badge"
      style={{ padding: '20px 18px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}
    >
      <div
        style={{
          width: '104px',
          height: '104px',
          borderRadius: '26px',
          border: '1px solid var(--rule-soft)',
          background: 'var(--surface-card)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Px rows={badgeArt(bd.id)} pal={{ '#': bd.got ? ink : 'rgba(140,140,135,.45)', a: '#ebbb63' }} scale={9} />
      </div>
      <div style={{ font: '200 24px/1.15 var(--font-sans)', letterSpacing: '-.02em', color: 'var(--text-1)' }}>{bd.n}</div>
      <div style={{ font: '300 13px/1.6 var(--font-sans)', color: 'var(--text-3)', maxWidth: '260px', textWrap: 'pretty' } as CSSProperties}>
        {bd.h}
      </div>
      <span className="ch-tag">{bd.got ? 'earned' : 'not yet'}</span>
      <div style={{ ...CARD, width: '100%', padding: '14px', marginTop: '6px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={micro(undefined, 9.5, '.16em')}>progress</span>
          <span style={{ font: '300 11.5px var(--font-sans)', color: 'var(--text-3)' }}>
            {bd.p} / {bd.of}
          </span>
        </div>
        <div style={{ height: '3px', borderRadius: '2px', background: 'var(--surface-inset)', overflow: 'hidden' }}>
          <div
            style={{
              width: `${Math.round((bd.p / bd.of) * 100)}%`,
              height: '100%',
              background: bd.got ? 'var(--accent-green)' : 'var(--foreground)',
            }}
          />
        </div>
      </div>
    </div>
  )
}
