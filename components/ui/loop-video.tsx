/**
 * A silent recording that plays itself, and cannot be stopped.
 *
 * `autoplay` + `loop` + `muted` + `playsinline` is the whole implementation.
 * No controls, no play button, no observer: the recordings on a write-up are
 * the interface moving on its own, the way the marketing site showed them,
 * and a control bar over one turns a picture of the product into a media
 * player. Because nothing here needs an event, this is a server component and
 * a page of recordings ships no JavaScript for its video.
 *
 * The one thing a reader can ask for is stillness, and that is honoured by
 * the `.ssr-loop` pair in globals.css: under prefers-reduced-motion the video
 * is hidden and the poster stands in its place, decided by a media query so
 * no script has to pick. `PlateVideo` is the same pair sized for a plate.
 *
 * `preload="metadata"` fetches only the header until the video is reached;
 * the browser starts the download when it decides to play, which for an
 * autoplaying loop is when the element is on screen.
 */
type LoopVideoProps = {
  /** Base path under /public, without extension. */
  src: string
  poster: string
  /** Intrinsic size, so the frame holds its shape before anything loads. */
  width: number
  height: number
  label: string
  className?: string
}

export function LoopVideo({ src, poster, width, height, label, className }: LoopVideoProps) {
  const cls = className ?? 'block h-auto w-full'
  return (
    <>
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={label}
        style={{ aspectRatio: `${width} / ${height}` }}
        className={`ssr-loop ${cls}`}
      >
        <source src={`${src}.mp4`} type="video/mp4" />
        <track kind="captions" srcLang="en" src="/captions/silent.vtt" label="No dialogue" />
      </video>
      {/* eslint-disable-next-line @next/next/no-img-element -- the reduced-motion still, the poster itself */}
      <img src={poster} alt={label} width={width} height={height} className={`ssr-loop-still ${cls}`} />
    </>
  )
}
