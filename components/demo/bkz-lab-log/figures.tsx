/**
 * The lab log's diagrams.
 *
 * Hand-drawn SVG rather than a chart library, because neither of these is a
 * plot: they are cross-sections of two surfaces that disagree, and the whole
 * point is the sign of the gap at each end of the head. A library would need
 * more coaxing than the twenty coordinates below.
 *
 * Server components. The palette comes from `.bkz-fig` in globals.css so the
 * drawing follows the theme without reading it, which is the same move the
 * Blockpad mark makes. `currentColor` carries the neutral ink, inherited from
 * whatever the figure is sitting in.
 *
 * Both were authored against the artefact these entries came from; the geometry
 * is transcribed, only the colours are re-homed onto the site's tokens.
 */

const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace'

/** Two ellipses that are not concentric, and the two gaps that follow. */
export function SurfacesFigure() {
  return (
    <svg
      viewBox="0 0 760 430"
      className="bkz-fig block h-auto w-full"
      role="img"
      aria-label="Cross-section showing the cranium ellipsoid and the built head as two different surfaces: the envelope sits 42 mm in front of the forehead, the skull sits 19 mm outside the envelope at the back of the head, and they are about 4 mm apart at the crown."
    >
      <defs>
        <marker id="bkz-a1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,1 L9,5 L0,9 z" fill="currentColor" />
        </marker>
      </defs>

      <ellipse cx="380" cy="215" rx="165" ry="152" fill="none" stroke="var(--bkz-wrong)" strokeWidth="2" strokeDasharray="7 5" />
      <ellipse cx="407" cy="215" rx="154" ry="148" fill="none" stroke="var(--bkz-true)" strokeWidth="2.5" />

      <line x1="215" y1="215" x2="253" y2="215" stroke="currentColor" strokeWidth="1.4" markerStart="url(#bkz-a1)" markerEnd="url(#bkz-a1)" />
      <line x1="561" y1="215" x2="545" y2="215" stroke="currentColor" strokeWidth="1.4" markerStart="url(#bkz-a1)" markerEnd="url(#bkz-a1)" />
      <line x1="150" y1="215" x2="205" y2="215" stroke="currentColor" strokeWidth="1" opacity=".35" />
      <line x1="571" y1="215" x2="628" y2="215" stroke="currentColor" strokeWidth="1" opacity=".35" />

      <text x="146" y="204" textAnchor="end" fontFamily={MONO} fontSize="13" fontWeight="600" fill="var(--bkz-wrong)">42 mm</text>
      <text x="146" y="222" textAnchor="end" fontFamily={MONO} fontSize="11.5" fill="currentColor" opacity=".72">envelope floats</text>
      <text x="146" y="237" textAnchor="end" fontFamily={MONO} fontSize="11.5" fill="currentColor" opacity=".72">off the forehead</text>

      <text x="634" y="204" fontFamily={MONO} fontSize="13" fontWeight="600" fill="var(--bkz-true)">19 mm</text>
      <text x="634" y="222" fontFamily={MONO} fontSize="11.5" fill="currentColor" opacity=".72">skull outside</text>
      <text x="634" y="237" fontFamily={MONO} fontSize="11.5" fill="currentColor" opacity=".72">the envelope</text>

      <line x1="396" y1="63" x2="396" y2="67" stroke="currentColor" strokeWidth="1.4" />
      <line x1="396" y1="55" x2="470" y2="34" stroke="currentColor" strokeWidth="1" opacity=".35" />
      <text x="476" y="32" fontFamily={MONO} fontSize="11.5" fill="currentColor" opacity=".72">≈ 4 mm at the crown pole</text>

      <text x="230" y="398" textAnchor="middle" fontFamily={MONO} fontSize="11" letterSpacing="1.5" fill="currentColor" opacity=".55">FRONT · BROW</text>
      <text x="548" y="398" textAnchor="middle" fontFamily={MONO} fontSize="11" letterSpacing="1.5" fill="currentColor" opacity=".55">BACK · OCCIPUT</text>

      <line x1="612" y1="86" x2="648" y2="86" stroke="var(--bkz-wrong)" strokeWidth="2" strokeDasharray="7 5" />
      <text x="656" y="90" fontFamily={MONO} fontSize="11.5" fill="currentColor" opacity=".8">envelope</text>
      <line x1="612" y1="108" x2="648" y2="108" stroke="var(--bkz-true)" strokeWidth="2.5" />
      <text x="656" y="112" fontFamily={MONO} fontSize="11.5" fill="currentColor" opacity=".8">built head</text>
    </svg>
  )
}

/** The same failure at one point: a ray that starts under the skin. */
export function OcciputFigure() {
  return (
    <svg
      viewBox="0 0 760 360"
      className="bkz-fig block h-auto w-full"
      role="img"
      aria-label="Detail at the back of the head: the ray starts on the envelope 19 mm inside the skull, immediately hits the buried hair shell and is scored as covered, while the real scalp further out has nothing above it."
    >
      <defs>
        <marker id="bkz-a2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,1 L9,5 L0,9 z" fill="currentColor" />
        </marker>
        <marker id="bkz-a3" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M0,1 L9,5 L0,9 z" fill="currentColor" />
        </marker>
      </defs>

      <path d="M70,168 Q380,142 690,168 L690,360 L70,360 Z" fill="var(--bkz-true-soft)" opacity=".5" />
      <path d="M70,168 Q380,142 690,168" fill="none" stroke="var(--bkz-true)" strokeWidth="2.5" />

      <path d="M70,240 Q380,214 690,240 L690,252 Q380,226 70,252 Z" fill="var(--bkz-wrong)" opacity=".32" />
      <path d="M70,240 Q380,214 690,240" fill="none" stroke="var(--bkz-wrong)" strokeWidth="1.8" />
      <path d="M70,252 Q380,226 690,252" fill="none" stroke="var(--bkz-wrong)" strokeWidth="1.8" />
      <path d="M70,272 Q380,246 690,272" fill="none" stroke="var(--bkz-wrong)" strokeWidth="2" strokeDasharray="7 5" />

      <line x1="380" y1="259" x2="380" y2="62" stroke="currentColor" strokeWidth="2" markerEnd="url(#bkz-a2)" />
      <circle cx="380" cy="259" r="4.5" fill="currentColor" />
      <circle cx="380" cy="239" r="5" fill="var(--bkz-wrong)" />

      <line x1="690" y1="170" x2="690" y2="270" stroke="currentColor" strokeWidth="1.2" markerStart="url(#bkz-a3)" markerEnd="url(#bkz-a3)" />
      <text x="702" y="216" fontFamily={MONO} fontSize="12" fontWeight="600" fill="currentColor">19</text>
      <text x="702" y="231" fontFamily={MONO} fontSize="12" fontWeight="600" fill="currentColor">mm</text>

      <text x="88" y="44" fontFamily={MONO} fontSize="11" letterSpacing="1.4" fill="currentColor" opacity=".5">OUTSIDE THE HEAD</text>

      <line x1="252" y1="104" x2="366" y2="236" stroke="currentColor" strokeWidth="1" opacity=".32" />
      <text x="96" y="96" fontFamily={MONO} fontSize="12" fontWeight="600" fill="var(--bkz-wrong)">first hit: the shell</text>
      <text x="96" y="112" fontFamily={MONO} fontSize="12" fill="currentColor" opacity=".78">→ scored COVERED</text>

      <line x1="448" y1="104" x2="392" y2="150" stroke="currentColor" strokeWidth="1" opacity=".32" />
      <text x="456" y="96" fontFamily={MONO} fontSize="12" fontWeight="600" fill="var(--bkz-true)">the real scalp</text>
      <text x="456" y="112" fontFamily={MONO} fontSize="12" fill="currentColor" opacity=".78">nothing above it — bare</text>

      <line x1="234" y1="200" x2="298" y2="232" stroke="currentColor" strokeWidth="1" opacity=".32" />
      <text x="96" y="196" fontFamily={MONO} fontSize="12" fill="currentColor" opacity=".78">the shell, carved</text>
      <text x="96" y="212" fontFamily={MONO} fontSize="12" fill="currentColor" opacity=".78">onto the envelope</text>

      <line x1="372" y1="302" x2="380" y2="264" stroke="currentColor" strokeWidth="1" opacity=".32" />
      <text x="300" y="316" fontFamily={MONO} fontSize="12" fill="currentColor" opacity=".78">ray starts on the envelope —</text>
      <text x="300" y="332" fontFamily={MONO} fontSize="12" fill="currentColor" opacity=".78">19 mm inside the skull</text>

      <text x="88" y="332" fontFamily={MONO} fontSize="11" letterSpacing="1.4" fill="currentColor" opacity=".5">INSIDE THE SKULL</text>
    </svg>
  )
}

export const FIGURES = {
  surfaces: SurfacesFigure,
  occiput: OcciputFigure,
} as const
