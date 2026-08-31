'use client'

/**
 * The phone: chrome, state, and the router between screens.
 *
 * One `useState` holds the lot, the way the original's `this.state` did. It is
 * the right shape here — the prototype is a single artefact with maybe forty
 * knobs, and splitting them into forty hooks would buy nothing but ceremony.
 * Every setter goes through `set`, which merges, so a screen only ever names
 * the keys it actually changes.
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { BADGES, ICONS, OB, PROJECTS, badgeArt, type IconName } from './data'
import { INITIAL, micro, type State, type View } from './model'
import { Glyph, Mark, Px, inkOf } from './pixel'
import { BadgeScreen, BodyScreen, NotesScreen, PhotosScreen, ProjectScreen, TodayScreen, YouScreen } from './screens'
import { CaptureScreen, SpriteScreen } from './capture'
import { DashboardB, DashboardC, GridHue, GridRamp, GridRibbon } from './variants'

const TABS: [View, string][] = [
  ['today', 'today'],
  ['body', 'body'],
  ['photos', 'photos'],
  ['notes', 'notes'],
  ['you', 'you'],
]

export function Prototype() {
  const [st, setState] = useState<State>(INITIAL)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const set = useCallback((patch: Partial<State>) => setState((s) => ({ ...s, ...patch })), [])

  const toast = useCallback((title: string, sub: string) => {
    setState((s) => ({ ...s, toast: { title, sub } }))
    if (timer.current) clearTimeout(timer.current)
    // Matches the toast keyframes, which fade the card out on their own.
    timer.current = setTimeout(() => setState((s) => ({ ...s, toast: null })), 3200)
  }, [])

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current)
  }, [])

  const dark = st.theme === 'dark'
  const ink = inkOf(st.theme)
  const props = { st, set, toast }

  const badge = st.badge ? BADGES.flatMap((g) => g.items).find((x) => x.id === st.badge) : null
  const headTitle =
    st.view === 'project'
      ? PROJECTS.find((p) => p.id === st.pid)?.name
      : st.view === 'capture'
        ? ['new photo', 'add detail', 'review'][st.capStep]
        : st.view === 'sprite'
          ? 'sprite'
          : st.view === 'badge'
            ? (badge?.n ?? 'badge')
            : ''

  const showTabs = st.view !== 'capture' && st.view !== 'sprite'

  return (
    <div className="flex flex-wrap items-start gap-8">
      <Opt id="1a" label="the app — tap through it. 9 screens, both themes.">
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <Phone
            st={st}
            set={set}
            dark={dark}
            ink={ink}
            headTitle={headTitle}
            showTabs={showTabs}
            screen={
              <>
                {st.view === 'today' ? <TodayScreen {...props} /> : null}
                {st.view === 'project' ? <ProjectScreen {...props} /> : null}
                {st.view === 'body' ? <BodyScreen {...props} /> : null}
                {st.view === 'photos' ? <PhotosScreen {...props} /> : null}
                {st.view === 'notes' ? <NotesScreen {...props} /> : null}
                {st.view === 'you' ? <YouScreen {...props} /> : null}
                {st.view === 'sprite' ? <SpriteScreen {...props} /> : null}
                {st.view === 'capture' ? <CaptureScreen {...props} /> : null}
                {st.view === 'badge' ? <BadgeScreen {...props} /> : null}
              </>
            }
          />
          <JumpTo st={st} set={set} />
        </div>
      </Opt>

      <Opt id="1b" label="dashboard b — the number first">
        <DashboardB theme={st.theme} sprite={st.sprite} />
      </Opt>
      <Opt id="1c" label="dashboard c — projects first, grid demoted">
        <DashboardC theme={st.theme} sprite={st.sprite} />
      </Opt>
      <Opt id="1d" label="grid — one blue ramp (in 1a)">
        <GridRamp theme={st.theme} sprite={st.sprite} />
      </Opt>
      <Opt id="1e" label="grid — dots, hue = which project">
        <GridHue theme={st.theme} sprite={st.sprite} />
      </Opt>
      <Opt id="1f" label="grid — a ribbon per project, weekly">
        <GridRibbon theme={st.theme} sprite={st.sprite} />
      </Opt>
    </div>
  )
}

/** One labelled option in the turn, the way the design doc laid them out. */
function Opt({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div id={id} className="flex flex-none scroll-mt-4 flex-col gap-2.5">
      <div className="flex items-baseline gap-2 text-[11.5px] font-light leading-tight text-black/55">
        <span className="rounded-[5px] bg-black/[0.07] px-[7px] py-[3px] font-mono text-[10.5px] font-medium text-[#141413]">{id}</span>
        {label}
      </div>
      {children}
    </div>
  )
}

/* ---------- the device ---------- */

function Phone({
  st,
  set,
  dark,
  ink,
  headTitle,
  showTabs,
  screen,
}: {
  st: State
  set: (p: Partial<State>) => void
  dark: boolean
  ink: string
  headTitle: string | undefined
  showTabs: boolean
  screen: React.ReactNode
}) {
  return (
    <div
        style={{
          position: 'relative',
          width: '392px',
          height: '812px',
          borderRadius: '46px',
          padding: '9px',
          background: '#0a0a09',
          boxShadow: '0 0 0 1px rgba(0,0,0,.14)',
          flex: 'none',
        }}
      >
        <div
          data-bl-theme={st.theme}
          style={{
            position: 'relative',
            width: '374px',
            height: '794px',
            borderRadius: '38px',
            overflow: 'hidden',
            background: 'var(--background)',
            color: 'var(--foreground)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* status bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px 4px', flex: 'none' }}>
            <span style={{ font: '500 12px var(--font-mono)', letterSpacing: '.02em', color: 'var(--text-2)' }}>9:41</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              {(['cell', 'wifi', 'batt'] as IconName[]).map((n) => (
                <span key={n} style={{ display: 'flex' }}>
                  <Glyph rows={ICONS[n]} scale={1.5} color={ink} />
                </span>
              ))}
            </div>
          </div>

          {/* app bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', padding: '6px 18px 10px', flex: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
              {st.back ? (
                <>
                  <button
                    onClick={() => set({ view: st.back as View, back: null, capStep: 0 })}
                    className="ch-btn ch-btn--ghost ch-btn--icon-sm"
                    style={{ borderRadius: '999px', marginLeft: '-6px' }}
                    aria-label="back"
                  >
                    <Glyph rows={ICONS.arrowL} scale={1.7} color={ink} />
                  </button>
                  <span
                    style={{
                      font: '300 15px var(--font-sans)',
                      letterSpacing: '.01em',
                      color: 'var(--text-1)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {headTitle}
                  </span>
                </>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mark size={20} theme={st.theme} />
                  <span style={{ font: '300 15px var(--font-sans)', letterSpacing: '.06em', color: 'var(--text-1)' }}>dermp</span>
                </div>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 'none' }}>
              <button
                onClick={() => set({ lock: !st.lock })}
                aria-pressed={st.lock}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  height: '26px',
                  padding: '0 9px',
                  borderRadius: '999px',
                  border: '1px solid var(--rule-soft)',
                  background: 'transparent',
                  color: 'var(--text-4)',
                }}
              >
                <Glyph rows={ICONS.lock} scale={1.2} color={st.lock ? '#8fd9a6' : dark ? 'rgba(237,237,234,.4)' : 'rgba(20,20,19,.35)'} />
                <span style={{ font: '500 9.5px var(--font-mono)', letterSpacing: '.14em', textTransform: 'uppercase' }}>
                  {st.lock ? 'on device' : 'unlocked'}
                </span>
              </button>
              <button
                onClick={() => set({ theme: dark ? 'light' : 'dark' })}
                className="ch-btn ch-btn--ghost ch-btn--icon-sm"
                style={{ borderRadius: '999px' }}
                aria-label={dark ? 'switch to paper' : 'switch to dark'}
              >
                <Glyph rows={dark ? ICONS.sun : ICONS.moon} scale={1.7} color={ink} />
              </button>
            </div>
          </div>

          {/* the screen */}
          <div className="ph-scroll" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', position: 'relative' }}>
            {screen}
          </div>

          {/* tab bar */}
          {showTabs ? (
            <div
              style={{
                flex: 'none',
                borderTop: '1px solid var(--rule-soft)',
                background: 'var(--background)',
                padding: '8px 8px 20px',
                display: 'grid',
                gridTemplateColumns: 'repeat(5,1fr)',
                alignItems: 'end',
                position: 'relative',
              }}
            >
              {TABS.map(([id, label]) => {
                // Project detail is reached from Today, so Today stays lit.
                const on = st.view === id || (id === 'today' && st.view === 'project')
                return (
                  <button
                    key={id}
                    onClick={() => set({ view: id, back: null, spot: null })}
                    aria-current={on ? 'page' : undefined}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '7px 0 2px',
                      border: 0,
                      background: 'transparent',
                    }}
                  >
                    <Glyph rows={ICONS[id as IconName]} scale={2.2} color={on ? ink : dark ? 'rgba(237,237,234,.42)' : 'rgba(20,20,19,.38)'} />
                    <span style={{ ...micro(on ? 'var(--text-1)' : 'var(--text-5)', 8.5, '.14em') }}>{label}</span>
                  </button>
                )
              })}
              {/* the one filled control in the app */}
              <button
                onClick={() => set({ view: 'capture', back: 'today', capStep: 0 })}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '-68px',
                  width: '56px',
                  height: '56px',
                  borderRadius: '999px',
                  border: '1px solid var(--rule-soft)',
                  background: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title="capture"
                aria-label="capture"
              >
                <Glyph rows={ICONS.shutter} scale={2.2} color={dark ? '#141413' : '#fafaf8'} />
              </button>
            </div>
          ) : null}

          {st.toast ? (
            <div
              role="status"
              style={{
                position: 'absolute',
                left: '16px',
                right: '16px',
                bottom: '104px',
                borderRadius: '16px',
                border: '1px solid var(--rule-soft)',
                background: 'var(--popover)',
                padding: '13px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                animation: 'bl1-toast 3.2s var(--ease-standard) forwards',
              }}
            >
              <div style={{ flex: 'none' }}>
                <Px rows={badgeArt('first')} pal={{ '#': ink, a: '#ebbb63' }} scale={3} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ font: '300 13px var(--font-sans)', color: 'var(--text-1)' }}>{st.toast.title}</div>
                <div style={{ font: '300 11px/1.4 var(--font-sans)', color: 'var(--text-4)', marginTop: '2px' }}>{st.toast.sub}</div>
              </div>
            </div>
          ) : null}

          {st.onboard ? <Onboarding st={st} set={set} /> : null}
        </div>
    </div>
  )
}

/* ---------- onboarding ---------- */

function Onboarding({ st, set }: { st: State; set: (p: Partial<State>) => void }) {
  const ink = inkOf(st.theme)
  const step = OB[st.obStep]
  const art =
    st.obStep === 0 ? (
      <Mark size={96} theme={st.theme} />
    ) : st.obStep === 1 ? (
      <Px rows={badgeArt('proj3')} pal={{ '#': ink, a: '#ebbb63' }} scale={11} />
    ) : st.obStep === 2 ? (
      <Px rows={badgeArt('steady')} pal={{ '#': ink, a: '#ebbb63' }} scale={11} />
    ) : (
      <Px rows={badgeArt('export')} pal={{ '#': ink, a: '#8fd9a6' }} scale={11} />
    )

  return (
    <div
      data-screen-label="Onboarding"
      style={{
        position: 'absolute',
        inset: 0,
        background: 'var(--background)',
        display: 'flex',
        flexDirection: 'column',
        padding: '26px 24px',
        animation: 'bl1-up .28s var(--ease-out)',
      }}
    >
      <div style={{ flex: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '5px' }}>
          {OB.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === st.obStep ? '16px' : '6px',
                height: '6px',
                borderRadius: '999px',
                background: i <= st.obStep ? 'var(--foreground)' : 'var(--surface-inset)',
                transition: 'width .2s',
              }}
            />
          ))}
        </div>
        <button
          onClick={() => set({ onboard: false, obStep: 0 })}
          style={{ border: 0, background: 'transparent', font: '300 12px var(--font-sans)', color: 'var(--text-4)' }}
        >
          skip
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '26px', textAlign: 'center' }}>
        <div
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '38px',
            border: '1px solid var(--rule-soft)',
            background: 'var(--surface-card)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {art}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ font: '200 27px/1.15 var(--font-sans)', letterSpacing: '-.02em', color: 'var(--text-1)', textWrap: 'pretty' } as CSSProperties}>
            {step.t}
          </div>
          <div style={{ font: '300 14px/1.65 var(--font-sans)', color: 'var(--text-3)', maxWidth: '270px', textWrap: 'pretty' } as CSSProperties}>
            {step.b}
          </div>
        </div>
      </div>

      <button
        onClick={() => (st.obStep < 3 ? set({ obStep: st.obStep + 1 }) : set({ onboard: false, obStep: 0 }))}
        className="ch-btn ch-btn--default ch-btn--lg"
        style={{ width: '100%', flex: 'none' }}
      >
        {step.c}
      </button>
    </div>
  )
}

/* ---------- the design-doc sidebar ---------- */

const JUMPS: [View, string][] = [
  ['today', 'today'],
  ['project', 'project detail'],
  ['capture', 'capture flow'],
  ['body', 'body map'],
  ['photos', 'progression grid'],
  ['notes', 'notes'],
  ['you', 'rewards'],
  ['sprite', 'sprite builder'],
]

function jumpStyle(on: boolean): CSSProperties {
  return {
    border: `1px solid ${on ? 'rgba(0,0,0,.35)' : 'rgba(0,0,0,.12)'}`,
    background: on ? 'rgba(0,0,0,.05)' : 'transparent',
    color: 'rgba(0,0,0,.6)',
    borderRadius: '999px',
    padding: '5px 12px',
    font: '300 11.5px var(--font-sans)',
    whiteSpace: 'nowrap',
  }
}

function JumpTo({ st, set }: { st: State; set: (p: Partial<State>) => void }) {
  return (
    <div style={{ width: '210px', display: 'flex', flexDirection: 'column', gap: '14px', paddingTop: '8px' }}>
      <div style={{ ...micro('rgba(0,0,0,.4)') }}>jump to</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-start' }}>
        {JUMPS.map(([v, label]) => (
          <button
            key={v}
            onClick={() =>
              set({
                view: v,
                back: v === 'project' || v === 'capture' || v === 'sprite' ? 'today' : null,
                onboard: false,
                spot: null,
                capStep: 0,
              })
            }
            style={jumpStyle(st.view === v && !st.onboard)}
          >
            {label}
          </button>
        ))}
        <button onClick={() => set({ onboard: true, obStep: 0 })} style={jumpStyle(st.onboard)}>
          onboarding
        </button>
      </div>
      <div
        style={{
          font: '300 11px/1.6 var(--font-sans)',
          color: 'rgba(0,0,0,.45)',
          borderTop: '1px solid rgba(0,0,0,.09)',
          paddingTop: '12px',
          textWrap: 'pretty',
        } as CSSProperties}
      >
        Photos are pixel stand-ins — drop real images in later. The mark, tab icons, badges and sprite are all drawn by the same pixel
        engine, so they scale from 14px to 180px without an asset.
      </div>
    </div>
  )
}
