import { PixelRoundabout } from '@/components/features/brand/pixel-roundabout'

/** Who we are. Moved verbatim from app/demo/circleheads/page.tsx. */
export function WhoWeAreSection() {
  return (
          <section className="space-y-3">
            <h2 className="aka-lead">Who we are</h2>
            {/* Bartel-Pritchard Square itself, in the brand's bit style — the live traffic
                sim from the circleheads engine, next to the story it illustrates. */}
            <div className="float-right ml-5 mb-2 w-[170px] sm:w-[210px]">
              <PixelRoundabout size={210} />
            </div>
            <p>
              Circleheads is a two-person studio born and based out of Brooklyn, NY. The name comes
              from the traffic circle we grew up around on the southwest corner of Prospect Park,
              Bartel-Pritchard Square, where Park Slope meets Windsor Terrace — our friend group got
              called the circleheads, and it stuck. It&apos;s{' '}
              <a href="https://akabuild.dev" target="_blank" rel="noopener noreferrer" className="aka-quiet-link">Ieuan</a>{' '}
              (product design + technical anthropology — the human side of applied AI — plus
              skill-building, agent testing, front-end, and procedural 3D) and{' '}
              <a href="https://blaiseab.com" target="_blank" rel="noopener noreferrer" className="aka-quiet-link">Blaise</a>{' '}
              (full-stack systems, agent tooling, and the verification and evaluation layers that keep
              outputs honest) — friends since we were ten.
            </p>
          </section>
  )
}
