/**
 * A screen recording on a demo write-up.
 *
 * The counterpart to DemoImage, and it exists for the same reason: the pages
 * were inlining a `<video>` with its own set of attributes each time, and the
 * ones that matter are easy to leave off. Decided once, here.
 *
 * **H.264 only, and that was measured.** The received wisdom is that VP9 in
 * WebM beats H.264 by about a third on screen content, so both were encoded and
 * compared. VP9 lost on all seven captures, by between 25% and 100%: `notes`
 * came out at 8.54 MB against the mp4's 4.31 MB. These recordings are mostly
 * long-lived static frames with occasional scrolling, which x264 handles better
 * than the VP9 settings that fit in the encoding budget. Shipping both would
 * have meant every browser picking the first source it understands, which is
 * the larger one, so the second format was dropped rather than kept out of
 * habit. H.264 in mp4 plays everywhere, which is the other half of the case.
 *
 * **`preload="none"`.** Six recordings on one page at `metadata` would each open
 * a connection and pull the container header before the reader has decided to
 * watch anything. The poster is a still they can see for free; the video is
 * fetched when it is played.
 *
 * **The frame holds its own shape.** `aspect-ratio` from the real dimensions
 * means the box is the right size before any of the media arrives, so nothing
 * below it moves when the poster decodes. That is the entire reason width and
 * height are required arguments rather than optional ones.
 *
 * **Silent by design.** These are screen captures with no audio track at all.
 * `muted` is still set, because without it a browser will offer volume controls
 * for silence.
 *
 * Server-rendered. There is no player state, no autoplay observer, and no
 * client component: a `<video controls>` is already an interactive element that
 * the platform knows how to run.
 */

type DemoVideoProps = {
  /** Base path under /public, without extension. The extension is appended. */
  src: string
  /**
   * Container to serve. Defaults to mp4, which is what everything encoded since
   * the comparison above uses; the 2025 recordings predate it and are webm.
   */
  format?: 'mp4' | 'webm'
  /** Poster still. Shown until play, and the only thing fetched on load. */
  poster: string
  /** Intrinsic pixel size, so the frame can reserve its space. */
  width: number
  height: number
  /** Describes the recording for anyone who cannot watch it. */
  label: string
  className?: string
}

export function DemoVideo({
  src,
  poster,
  width,
  height,
  label,
  format = 'mp4',
  className,
}: DemoVideoProps) {
  return (
    <video
      controls
      muted
      playsInline
      preload="none"
      poster={poster}
      aria-label={label}
      style={{ aspectRatio: `${width} / ${height}` }}
      className={className ?? 'block h-auto w-full'}
    >
      <source src={`${src}.${format}`} type={`video/${format}`} />
      {label}
    </video>
  )
}
