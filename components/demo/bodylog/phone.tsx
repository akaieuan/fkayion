'use client'

import { useState } from 'react'
import { BodyLogMark } from './bodylog-mark'
import { ActivityGrid } from './activity-grid'
import { BodyFigure } from './body-figure'
import {
  CaptureGlyph,
  Chip,
  EntryTile,
  PixelGlyph,
  RatingDots,
  conditionColor,
} from './primitives'

/**
 * The live phone.
 *
 * One `useState` for the active screen; the tab bar sets it, the + sets
 * "capture". Each screen is its own component rendered into the viewport —
 * that single indirection is the entire interactivity model.
 */

type Screen = 'today' | 'body' | 'photos' | 'notes' | 'you' | 'capture'

const TABS: { id: Screen; label: string }[] = [
  { id: 'today', label: 'today' },
  { id: 'body', label: 'body' },
  { id: 'photos', label: 'photos' },
  { id: 'notes', label: 'notes' },
  { id: 'you', label: 'you' },
]

const ENTRIES = [
  { date: '2 AUG', condition: 'jaw acne', rating: 5, places: 'chin', note: "Best it's looked in a while." },
  { date: '1 AUG', condition: 'psoriasis', rating: 3, places: 'left inner elbow', note: 'Flared after the gym.' },
  { date: '30 JUL', condition: 'hand eczema', rating: 2, places: 'left hand', note: 'Cracked again on the knuckles.' },
]

const SYMPTOMS = ['itchy', 'painful', 'flaking', 'weeping', 'swollen', 'red', 'dry', 'scaly', 'bleeding', 'healing', 'spreading', 'stable']
const TRIGGERS = ['bad sleep', 'stress', 'heat', 'cold', 'dairy', 'alcohol', 'sweat', 'new product', 'period', 'travel']
const TRACKED = ['psoriasis', 'jaw acne', 'hand eczema']

/* --------------------------------------------------------------- fragments */

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 22 }}>
      <div className="bl-micro" style={{ marginBottom: 10 }}>{label}</div>
      {children}
    </div>
  )
}

function StatCard({ n, label }: { n: string; label: string }) {
  return (
    <div className="bl-card" style={{ padding: '14px 14px 12px' }}>
      <div className="bl-stat" style={{ fontSize: 26 }}>{n}</div>
      <div className="bl-micro" style={{ marginTop: 4 }}>{label}</div>
    </div>
  )
}

/** The sprite: a filled ink circle with features punched out in inverse. */
function Sprite({ size = 40 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        background: 'var(--ink1)',
        display: 'grid',
        placeItems: 'center',
        flexShrink: 0,
      }}
      aria-hidden
    >
      <PixelGlyph name="you" size={size * 0.5} color="var(--inverse)" />
    </div>
  )
}

/* ----------------------------------------------------------------- screens */

function Today() {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <BodyLogMark size={22} title="" />
          <span style={{ fontWeight: 200, fontSize: 17 }}>BodyLog</span>
        </div>
        <span
          className="bl-micro"
          style={{ border: '1px solid var(--rule-soft)', borderRadius: 999, padding: '4px 9px' }}
        >
          on device
        </span>
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 20 }}>
        <Sprite size={42} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 300, fontSize: 15 }}>good morning, pip</div>
          <div style={{ color: 'var(--ink4)', fontSize: 12, marginTop: 2 }}>
            33 days running. the record is yours.
          </div>
          <div style={{ height: 2, background: 'var(--inset)', borderRadius: 999, marginTop: 8 }}>
            <div style={{ width: '62%', height: '100%', background: 'var(--ink2)', borderRadius: 999 }} />
          </div>
        </div>
      </div>

      <Section label="logging history">
        <ActivityGrid weeks={13} cell={11} />
      </Section>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 20 }}>
        <StatCard n="79" label="entries" />
        <StatCard n="19" label="photos" />
        <StatCard n="9" label="sites pinned" />
        <StatCard n="14" label="notes" />
      </div>

      <Section label="recent">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {ENTRIES.map((e) => (
            <div key={e.date} className="bl-card" style={{ padding: 12, display: 'flex', gap: 12 }}>
              <EntryTile seed={`${e.date}${e.condition}`} accent={conditionColor(e.condition)} size={46} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span className="bl-micro">{e.date}</span>
                    <span
                      style={{ width: 6, height: 6, borderRadius: 999, background: conditionColor(e.condition) }}
                      aria-hidden
                    />
                    <span style={{ fontSize: 12.5, fontWeight: 300 }}>{e.condition}</span>
                  </span>
                  <RatingDots value={e.rating} />
                </div>
                <div style={{ color: 'var(--ink5)', fontSize: 11, marginTop: 4 }}>{e.places}</div>
                <div style={{ color: 'var(--ink3)', fontSize: 12, marginTop: 4, fontWeight: 300 }}>{e.note}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}

function Body() {
  const [view, setView] = useState('front')
  return (
    <>
      <h2 className="bl-h1" style={{ fontSize: 24 }}>body map</h2>
      <p style={{ color: 'var(--ink4)', fontSize: 12.5, marginTop: 6, fontWeight: 300 }}>
        every photo is pinned to a place. tap a spot to see what&apos;s there.
      </p>
      <div style={{ display: 'flex', gap: 6, marginTop: 14 }}>
        {['face', 'front', 'back'].map((v) => (
          <Chip key={v} label={v} active={view === v} onClick={() => setView(v)} />
        ))}
      </div>

      <div className="bl-card" style={{ padding: 16, marginTop: 14 }}>
        <BodyFigure mode="heat" width={200} />
      </div>

      <p style={{ color: 'var(--ink4)', fontSize: 11.5, marginTop: 12, fontWeight: 300, lineHeight: 1.5 }}>
        colour tells apart what you track — it never means how bad it is.
      </p>

      <Section label="what you track">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {TRACKED.map((c, i) => (
            <div key={c} className="bl-card" style={{ padding: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 7, height: 7, borderRadius: 999, background: conditionColor(c) }} aria-hidden />
                <span style={{ fontSize: 13, fontWeight: 300 }}>{c}</span>
              </div>
              <div style={{ marginTop: 10 }}>
                <ActivityGrid weeks={7} cell={9} showToggle={false} hue={conditionColor(c)} label={c} />
              </div>
              <div className="bl-micro" style={{ marginTop: 8 }}>
                {[212, 84, 31][i]} entries · {['yesterday', '2d ago', 'today'][i]}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}

function Capture({ onClose }: { onClose: () => void }) {
  const [where, setWhere] = useState<string | null>(null)
  const [what, setWhat] = useState('psoriasis')
  const [feel, setFeel] = useState(3)
  const [notice, setNotice] = useState<Set<string>>(new Set())
  const [ctx, setCtx] = useState<Set<string>>(new Set())

  const toggle = (set: Set<string>, fn: (s: Set<string>) => void) => (v: string) => {
    const next = new Set(set)
    if (next.has(v)) next.delete(v)
    else next.add(v)
    fn(next)
  }

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button type="button" onClick={onClose} className="bl-press" style={{ color: 'var(--ink3)', fontSize: 13, background: 'none', border: 'none', cursor: 'pointer' }}>
          Cancel
        </button>
        <span style={{ fontSize: 14, fontWeight: 300 }}>New Entry</span>
        {/* Save is never disabled — an entry with nothing but a date is a
            perfectly good entry. */}
        <button type="button" onClick={onClose} className="bl-press" style={{ background: 'var(--ink1)', color: 'var(--inverse)', border: 'none', borderRadius: 999, padding: '6px 14px', fontSize: 12.5, fontWeight: 500, cursor: 'pointer' }}>
          Save
        </button>
      </div>

      <div
        style={{
          marginTop: 18,
          width: 84,
          height: 84,
          borderRadius: 14,
          border: '1px dashed var(--rule)',
          display: 'grid',
          placeItems: 'center',
          color: 'var(--ink5)',
          fontSize: 11,
        }}
      >
        add photo
      </div>

      <Section label="where is it showing up?">
        <div className="bl-card" style={{ padding: 14 }}>
          <BodyFigure mode="picker" width={180} onSelect={setWhere} />
        </div>
        <div className="bl-micro" style={{ marginTop: 8 }}>{where ?? 'nothing selected — that is fine'}</div>
      </Section>

      <Section label="what are you tracking?">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {TRACKED.map((c) => (
            <Chip key={c} label={c} dot={conditionColor(c)} active={what === c} onClick={() => setWhat(c)} />
          ))}
          <Chip label="something else" dashed />
        </div>
      </Section>

      <Section label="how does it feel today">
        <input
          type="range"
          min={1}
          max={5}
          value={feel}
          onChange={(e) => setFeel(Number(e.target.value))}
          aria-label="how does it feel today"
          style={{ width: '100%', accentColor: 'var(--ink1)' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
          <span className="bl-micro">flaring</span>
          <span className="bl-micro">clear</span>
        </div>
      </Section>

      <Section label="what you notice">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {SYMPTOMS.map((s) => (
            <Chip key={s} label={s} active={notice.has(s)} onClick={() => toggle(notice, setNotice)(s)} />
          ))}
        </div>
      </Section>

      <Section label="anything else going on">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {TRIGGERS.map((t) => (
            <Chip key={t} label={t} active={ctx.has(t)} onClick={() => toggle(ctx, setCtx)(t)} />
          ))}
        </div>
        <p style={{ color: 'var(--ink5)', fontSize: 11, marginTop: 10, fontWeight: 300, lineHeight: 1.5 }}>
          context you might want later. the app draws no conclusions from it.
        </p>
      </Section>
    </>
  )
}

function Photos() {
  const [zoom, setZoom] = useState('month')
  const [filter, setFilter] = useState('everything')
  return (
    <>
      <h2 className="bl-h1" style={{ fontSize: 24 }}>progression</h2>
      <p style={{ color: 'var(--ink4)', fontSize: 12.5, marginTop: 6, fontWeight: 300 }}>
        312 photos, newest first.
      </p>
      <div style={{ display: 'flex', gap: 6, marginTop: 14, flexWrap: 'wrap' }}>
        {['week', 'month', 'all time'].map((z) => (
          <Chip key={z} label={z} active={zoom === z} onClick={() => setZoom(z)} />
        ))}
      </div>
      <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
        <Chip label="everything" active={filter === 'everything'} onClick={() => setFilter('everything')} />
        {TRACKED.map((c) => (
          <Chip key={c} label={c} dot={conditionColor(c)} active={filter === c} onClick={() => setFilter(c)} />
        ))}
      </div>

      <Section label="august 2026">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {Array.from({ length: 8 }, (_, i) => {
            const c = filter === 'everything' ? TRACKED[i % 3]! : filter
            return (
              <div key={i}>
                <EntryTile seed={`aug${i}${c}`} accent={conditionColor(c)} size={58} />
                <div className="bl-micro" style={{ marginTop: 4, fontSize: 9 }}>{28 - i} jul</div>
              </div>
            )
          })}
        </div>
      </Section>
    </>
  )
}

function Notes() {
  return (
    <>
      <h2 className="bl-h1" style={{ fontSize: 24 }}>notes</h2>
      <p style={{ color: 'var(--ink4)', fontSize: 12.5, marginTop: 6, fontWeight: 300 }}>
        what you wrote, in your words, in order.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 18 }}>
        {ENTRIES.map((e) => (
          <div key={e.date} className="bl-card" style={{ padding: 14 }}>
            <div className="bl-micro">{e.date}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: conditionColor(e.condition) }} aria-hidden />
              <span style={{ fontSize: 12.5, fontWeight: 300 }}>{e.condition}</span>
            </div>
            <p style={{ color: 'var(--ink2)', fontSize: 13, marginTop: 8, fontWeight: 300, lineHeight: 1.55 }}>{e.note}</p>
          </div>
        ))}
      </div>
    </>
  )
}

const BADGES = [
  { art: 'flame', name: 'first light', req: 'log one entry', earned: true },
  { art: 'flame', name: 'seven', req: 'seven days running', earned: true },
  { art: 'return', name: 'back again', req: 'log again after two weeks away', earned: true },
  { art: 'pin', name: 'pinned', req: 'tag a location', earned: true },
  { art: 'pair', name: 'left and right', req: 'both sides of one place', earned: true },
  { art: 'star', name: 'one year', req: '365 days tracked', earned: false },
]

function You() {
  return (
    <>
      <div className="bl-card" style={{ padding: 14, display: 'flex', gap: 12, alignItems: 'center' }}>
        <Sprite size={46} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 300 }}>pip</div>
          <div className="bl-micro" style={{ marginTop: 3 }}>level 4 · 380 xp to next</div>
          <div style={{ height: 2, background: 'var(--inset)', borderRadius: 999, marginTop: 8 }}>
            <div style={{ width: '48%', height: '100%', background: 'var(--ink2)', borderRadius: 999 }} />
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 12 }}>
        <StatCard n="79" label="entries" />
        <StatCard n="19" label="photos" />
        <StatCard n="7/15" label="badges" />
      </div>

      <Section label="badges">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {BADGES.map((b) => (
            <div
              key={b.name}
              className="bl-card"
              style={{
                padding: 10,
                display: 'flex',
                gap: 9,
                alignItems: 'center',
                borderStyle: b.earned ? 'solid' : 'dashed',
                opacity: b.earned ? 1 : 0.65,
              }}
            >
              <PixelGlyph
                name={b.art}
                set="badge"
                size={18}
                color={b.earned ? 'var(--ink1)' : 'var(--ink6)'}
                amber={b.earned ? 'var(--amber)' : 'transparent'}
              />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 11.5, fontWeight: 300, color: b.earned ? 'var(--ink1)' : 'var(--ink5)' }}>
                  {b.name}
                </div>
                <div style={{ fontSize: 9.5, color: 'var(--ink5)', marginTop: 1, lineHeight: 1.35 }}>{b.req}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section label="settings">
        <div className="bl-card" style={{ padding: '4px 14px' }}>
          {['hide thumbnails', 'accessible colours', 'history colours'].map((s, i) => (
            <div
              key={s}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 0',
                borderTop: i ? '1px solid var(--rule-soft)' : 'none',
                fontSize: 12.5,
                fontWeight: 300,
              }}
            >
              <span>{s}</span>
              <span className="bl-micro">{i === 2 ? 'shading' : 'off'}</span>
            </div>
          ))}
        </div>
        <p style={{ color: 'var(--ink5)', fontSize: 11, marginTop: 12, fontWeight: 300, lineHeight: 1.5 }}>
          nothing is uploaded and nothing is analysed.
        </p>
      </Section>
    </>
  )
}

/* ------------------------------------------------------------------- frame */

export function PhoneFrame() {
  const [screen, setScreen] = useState<Screen>('today')

  return (
    <div
      className="bl-card"
      style={{
        width: 330,
        height: 690,
        borderRadius: 44,
        background: 'var(--ground)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}
    >
      {/* status bar + notch */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 22px 4px', flexShrink: 0 }}>
        <span style={{ fontSize: 12, fontWeight: 500 }}>9:41</span>
        <div style={{ width: 78, height: 22, borderRadius: 999, background: 'var(--ink1)' }} aria-hidden />
        <span style={{ fontSize: 12, color: 'var(--ink4)' }}>▮▮▮</span>
      </div>

      {/* viewport */}
      <div className="bl-scroll" style={{ flex: 1, overflowY: 'auto', padding: '10px 20px 28px' }}>
        {screen === 'today' && <Today />}
        {screen === 'body' && <Body />}
        {screen === 'photos' && <Photos />}
        {screen === 'notes' && <Notes />}
        {screen === 'you' && <You />}
        {screen === 'capture' && <Capture onClose={() => setScreen('today')} />}
      </div>

      {/* the one filled control in the whole system */}
      <button
        type="button"
        aria-label="new entry"
        onClick={() => setScreen('capture')}
        className="bl-press"
        style={{
          position: 'absolute',
          right: 18,
          bottom: 74,
          width: 52,
          height: 52,
          borderRadius: 999,
          background: 'var(--ink1)',
          border: 'none',
          display: 'grid',
          placeItems: 'center',
          cursor: 'pointer',
          zIndex: 2,
        }}
      >
        <CaptureGlyph size={22} />
      </button>

      {/* hand-drawn tab bar — never a library tab component */}
      <div
        role="tablist"
        aria-label="BodyLog tabs"
        style={{
          display: 'flex',
          borderTop: '1px solid var(--rule)',
          padding: '10px 8px 16px',
          background: 'var(--ground)',
          flexShrink: 0,
        }}
      >
        {TABS.map((t) => {
          const active = screen === t.id
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setScreen(t.id)}
              className="bl-press"
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 5,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: active ? 'var(--ink1)' : 'var(--ink4)',
              }}
            >
              <PixelGlyph name={t.id} size={15} color="currentColor" />
              <span className="bl-micro" style={{ color: active ? 'var(--ink2)' : 'var(--ink5)', fontSize: 8.5 }}>
                {t.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
