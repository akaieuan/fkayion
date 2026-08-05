'use client'

import { useState } from 'react'
import './bodylog.css'
import { PhoneFrame } from './phone'
import { ActivityGrid } from './activity-grid'
import { BodyLogMark } from './bodylog-mark'
import { Chip, EntryTile, PixelGlyph, conditionColor } from './primitives'

/**
 * Everything on this page that behaves, wrapped in BodyLog's own token scope.
 *
 * The app's tokens are deliberately not the site's — this is a different
 * product with a different system, and showing it in its own skin is more
 * honest than restyling it to match the portfolio.
 */

const SPECIMEN_CONDITIONS = ['psoriasis', 'jaw acne', 'hand eczema', 'scalp', 'keloid']

export function BodyLogShowcase() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  return (
    <div className="bl-scope" data-bl-theme={theme} style={{ background: 'var(--ground)', borderRadius: 18, border: '1px solid var(--rule)', padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div className="bl-micro">the app — tap around</div>
        <div style={{ display: 'flex', gap: 6 }}>
          <Chip label="dark" active={theme === 'dark'} onClick={() => setTheme('dark')} />
          <Chip label="paper" active={theme === 'light'} onClick={() => setTheme('light')} />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
        <PhoneFrame />
      </div>

      <p style={{ color: 'var(--ink5)', fontSize: 11.5, textAlign: 'center', marginTop: 16, fontWeight: 300, lineHeight: 1.6 }}>
        Every tab switches, the + opens capture, the body map picks regions, and the history grid
        re-colours. Rendered live from the app&apos;s own values — not screenshots.
      </p>
    </div>
  )
}

/** The specimens strip: mark sizes, the grid toggle, tiles, badges. */
export function BodyLogSpecimens() {
  const [theme] = useState<'dark' | 'light'>('dark')
  return (
    <div className="bl-scope" data-bl-theme={theme} style={{ background: 'var(--ground)', borderRadius: 18, border: '1px solid var(--rule)', padding: 24, display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div>
        <div className="bl-micro" style={{ marginBottom: 12 }}>the mark · 96 / 44 / 18</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20 }}>
          <BodyLogMark size={96} theme={theme} title="" />
          <BodyLogMark size={44} theme={theme} title="" />
          <BodyLogMark size={18} theme={theme} title="" />
        </div>
      </div>

      <div>
        <div className="bl-micro" style={{ marginBottom: 12 }}>logging history — tap to change reading</div>
        <ActivityGrid weeks={13} cell={13} />
      </div>

      <div>
        <div className="bl-micro" style={{ marginBottom: 12 }}>entry tiles — one per hue</div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {SPECIMEN_CONDITIONS.map((c) => (
            <div key={c} style={{ textAlign: 'center' }}>
              <EntryTile seed={c} accent={conditionColor(c)} size={54} />
              <div className="bl-micro" style={{ marginTop: 6, fontSize: 8.5 }}>{c}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="bl-micro" style={{ marginBottom: 12 }}>the 8×8 ui set</div>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {['today', 'body', 'photos', 'notes', 'you', 'lock', 'camera', 'search'].map((n) => (
            <div key={n} style={{ textAlign: 'center' }}>
              <PixelGlyph name={n} size={20} color="var(--ink2)" />
              <div className="bl-micro" style={{ marginTop: 6, fontSize: 8 }}>{n}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
