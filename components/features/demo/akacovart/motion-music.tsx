/** Motion & music. Moved verbatim from app/demo/akacovart/page.tsx. */
export function MotionMusicSection() {
  return (
          <section className="space-y-3">
            <h2 className="aka-lead">Motion &amp; music</h2>
            <p>
              Two modes. <span className="text-foreground/85">Still</span> is a single frame.{' '}
              <span className="text-foreground/85">Animate</span> makes the cover move to a beat you set
              by hand — BPM, pump, kick, plus motion tuned per engine — or, with the{' '}
              <span className="text-foreground/85">Track</span> source, drop in an MP3 or WAV, trim a
              clip, and the art reacts to the track’s energy and beats, exporting a real MP4 with the
              audio muxed in.
            </p>
            <p>
              There’s one rule the motion never breaks: energy only ever moves{' '}
              <em>space</em> — scale, position, displacement — never brightness, opacity, or hue. No
              strobe, no flash, no flicker. Beats read as physical movement, which is easy to watch on
              loop and safe for photosensitive viewers.
            </p>
          </section>
  )
}
