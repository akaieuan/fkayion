'use client'

/**
 * The alternates the turn put next to the app: two other dashboards and three
 * other ways to draw the logging history. They are the part of the artefact
 * that makes it a design document rather than a demo, so they are ported with
 * it, and they share the phone's theme toggle the way they originally did.
 */
import type { CSSProperties } from 'react'
import { PROJECTS, rnd } from './data'
import { ACTIVITY, CARD, DOT, STATS, micro } from './model'
import { Sprite, type SpriteState, type Theme } from './pixel'

type Props = { theme: Theme; sprite: SpriteState }

/** The alternates are shown as bare slabs, not inside a device. */
const SLAB: CSSProperties = {
  borderRadius: '30px',
  overflow: 'hidden',
  border: '1px solid rgba(0,0,0,.14)',
  background: 'var(--background)',
  color: 'var(--foreground)',
  display: 'flex',
  flexDirection: 'column',
}

const CARD_TITLE: CSSProperties = { font: '300 14px var(--font-sans)', color: 'var(--text-1)' }
const CARD_STAND: CSSProperties = { font: '300 11.5px/1.4 var(--font-sans)', color: 'var(--text-4)', marginTop: '3px' }

const MINI = PROJECTS.map((p) => ({
  ...p,
  cells: Array.from({ length: 56 }, (_, i) => rnd(p.hue * 2 + i * 3.1)),
  weeks: Array.from({ length: 26 }, (_, w) => rnd(p.hue + w * 2.3)),
}))

/** Same grid, hue instead of depth: which file got the attention, not how much. */
const CELLS_HUE: CSSProperties[] = ACTIVITY.cells26.map((c, i) => {
  const on = c.t !== 'nothing logged'
  const n = 1 + Math.floor(rnd(i * 5.1) * 3)
  const p = PROJECTS[Math.floor(rnd(i * 9.3) * 3)]
  return {
    width: '9px',
    height: '9px',
    borderRadius: '999px',
    boxSizing: 'border-box',
    background: on ? `color-mix(in oklch, ${p.tone} ${26 + n * 24}%, var(--background))` : 'transparent',
    border: on ? 'none' : '1px solid var(--rule-soft)',
  }
})

export function DashboardB({ theme, sprite }: Props) {
  return (
    <div data-bl-theme={theme} style={{ ...SLAB, width: '374px', height: '640px', padding: '20px 18px', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
        <div>
          <div style={micro()}>days running</div>
          <div style={{ font: '200 68px/.9 var(--font-sans)', letterSpacing: '-.04em', color: 'var(--text-1)', marginTop: '10px' }}>
            {ACTIVITY.streak}
          </div>
          <div style={{ font: '300 12.5px/1.5 var(--font-sans)', color: 'var(--text-3)', marginTop: '10px' }}>
            longest yet. one photo left today.
          </div>
        </div>
        <div style={{ flex: 'none' }}>
          <Sprite size={58} sprite={sprite} theme={theme} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '3px', flexWrap: 'wrap', alignContent: 'flex-start' }}>
        {ACTIVITY.cells26.map((c, i) => (
          <div key={i} style={c.s} />
        ))}
      </div>

      <div style={{ display: 'flex', gap: '18px', padding: '14px 0', borderTop: '1px solid var(--rule-soft)', borderBottom: '1px solid var(--rule-soft)' }}>
        {STATS.map((s) => (
          <div key={s.k} style={{ flex: 1, minWidth: 0 }}>
            <div style={{ font: '200 20px/1 var(--font-sans)', letterSpacing: '-.02em', color: 'var(--text-1)' }}>{s.v}</div>
            <div style={{ ...micro(undefined, 8.5, '.14em'), marginTop: '6px' }}>{s.k}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {MINI.map((p) => (
          <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '13px 0', borderBottom: '1px solid var(--rule-soft)' }}>
            <i style={DOT(p.tone)} />
            <span
              style={{
                flex: 1,
                minWidth: 0,
                font: '300 13.5px var(--font-sans)',
                color: 'var(--text-1)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {p.name}
            </span>
            <span style={{ font: '500 9.5px var(--font-mono)', letterSpacing: '.1em', color: 'var(--text-5)' }}>{p.n} entries</span>
            <span style={{ font: '300 11px var(--font-sans)', color: 'var(--text-5)', width: '58px', textAlign: 'right' }}>{p.last}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function DashboardC({ theme }: Props) {
  return (
    <div data-bl-theme={theme} style={{ ...SLAB, width: '374px', height: '640px', padding: '20px 18px', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={micro('var(--text-4)')}>three files open</span>
        <span style={{ font: '300 11.5px var(--font-sans)', color: 'var(--text-5)' }}>{ACTIVITY.streak} days</span>
      </div>

      {MINI.map((p) => (
        <div key={p.id} style={{ ...CARD, padding: '12px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ width: '88px', flex: 'none', display: 'grid', gridTemplateColumns: 'repeat(8,1fr)', gap: '2px' }}>
            {p.cells.map((v, i) => (
              <div
                key={i}
                style={{
                  width: '100%',
                  aspectRatio: '1',
                  borderRadius: '2px',
                  background: v > 0.45 ? `color-mix(in oklch, ${p.tone} ${(28 + v * 72).toFixed(0)}%, var(--background))` : 'var(--surface-inset)',
                }}
              />
            ))}
          </div>
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <i style={DOT(p.tone)} />
              <span style={{ font: '300 13.5px var(--font-sans)', color: 'var(--text-1)' }}>{p.name}</span>
            </div>
            <div
              style={{
                font: '300 11px var(--font-sans)',
                color: 'var(--text-4)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {p.area}
            </div>
            <div style={{ ...micro(), letterSpacing: '.1em' }}>
              {p.n} entries · {p.last}
            </div>
          </div>
        </div>
      ))}

      <div
        style={{
          border: '1px dashed var(--border)',
          borderRadius: '18px',
          padding: '12px',
          font: '300 12px var(--font-sans)',
          color: 'var(--text-5)',
          textAlign: 'center',
        }}
      >
        + start a new file
      </div>

      <div style={{ marginTop: 'auto', borderTop: '1px solid var(--rule-soft)', paddingTop: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={micro('var(--text-4)')}>everything</span>
          <span style={{ font: '300 11px var(--font-sans)', color: 'var(--text-5)' }}>{ACTIVITY.total} photos</span>
        </div>
        <div style={{ display: 'grid', gridAutoFlow: 'column', gridTemplateRows: 'repeat(7,8px)', gap: '2px' }}>
          {ACTIVITY.cells26.map((c, i) => (
            <div key={i} style={c.s} />
          ))}
        </div>
      </div>
    </div>
  )
}

function GridSlab({ theme, title, stand, children }: { theme: Theme; title: string; stand: string; children: React.ReactNode }) {
  return (
    <div data-bl-theme={theme} style={{ ...SLAB, width: '340px', borderRadius: '22px', padding: '18px 16px' }}>
      <div style={CARD_TITLE}>{title}</div>
      <div style={CARD_STAND}>{stand}</div>
      {children}
    </div>
  )
}

export function GridRamp({ theme }: Props) {
  return (
    <GridSlab theme={theme} title="logging history" stand="intensity only. the colour never means severity.">
      <div style={{ display: 'grid', gridAutoFlow: 'column', gridTemplateRows: 'repeat(7,8px)', gap: '3px', marginTop: '14px', overflow: 'hidden' }}>
        {ACTIVITY.cells26.map((c, i) => (
          <div key={i} style={c.s} />
        ))}
      </div>
    </GridSlab>
  )
}

export function GridHue({ theme }: Props) {
  return (
    <GridSlab theme={theme} title="logging history" stand="you can see at a glance which file got attention.">
      <div style={{ display: 'grid', gridAutoFlow: 'column', gridTemplateRows: 'repeat(7,9px)', gap: '2.5px', marginTop: '14px', overflow: 'hidden' }}>
        {CELLS_HUE.map((s, i) => (
          <div key={i} style={s} />
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '12px' }}>
        {PROJECTS.map((p) => (
          <span key={p.id} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', font: '300 10.5px var(--font-sans)', color: 'var(--text-4)' }}>
            <i style={DOT(p.tone)} />
            {p.name}
          </span>
        ))}
      </div>
    </GridSlab>
  )
}

export function GridRibbon({ theme }: Props) {
  return (
    <GridSlab theme={theme} title="logging history" stand="one week per bar. gaps read as gaps.">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px' }}>
        {MINI.map((p) => (
          <div key={p.id}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '7px' }}>
              <i style={DOT(p.tone)} />
              <span style={micro(undefined, 9, '.16em')}>{p.name}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1.5px', height: '18px' }}>
              {p.weeks.map((v, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: v > 0.22 ? `${(4 + v * 14).toFixed(0)}px` : '3px',
                    borderRadius: '1.5px',
                    background: v > 0.22 ? `color-mix(in oklch, ${p.tone} ${(34 + v * 66).toFixed(0)}%, var(--background))` : 'var(--surface-inset)',
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
        {['feb', 'mar', 'apr', 'may', 'jun', 'jul'].map((m) => (
          <span key={m} style={{ font: '500 9px var(--font-mono)', color: 'var(--text-6)' }}>
            {m}
          </span>
        ))}
      </div>
    </GridSlab>
  )
}
