import { PixelRoundabout } from '@/components/features/brand/pixel-roundabout'

/** Brooklyn, and a large sheet of paper. Moved verbatim from app/demo/how-i-work/page.tsx. */
export function BrooklynSection() {
  return (
          <section className="space-y-3">
            <h2 className="aka-lead">Brooklyn, and a large sheet of paper</h2>
            {/*
              Bartel-Pritchard Square, running. It floats beside the paragraph
              rather than sitting above it, because it is an aside about where
              this started, not the subject of the section.
            */}
            <div className="float-right ml-5 mb-2 w-[150px] sm:w-[200px]">
              <PixelRoundabout size={200} label={false} />
            </div>
            <p>
              I grew up here: in the park, on video games, and ideating products with my best
              friend. What that looked like at the time was large sheets of paper with every screen
              drawn by hand, one after another, until the whole thing existed on a table. We were
              designing flows before either of us knew the word for it. The circle beside this is
              Bartel-Pritchard Square, where Park Slope meets Windsor Terrace, drawn from the real
              one and running live.
            </p>
            <p>
              Right after college that turned into a company, and the paper turned into the boards.
              Ubik is where the practice became repeatable, and where, as AI arrived, I stopped
              handing the work off and started taking it into production myself.
            </p>
          </section>
  )
}
