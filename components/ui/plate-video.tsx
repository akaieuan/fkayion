/**
 * A project's clip, playing inside its plate.
 *
 * ── Why a separate component from the page's figures ────────────────────────
 *
 * A plate is small and there are twenty-two of them, so the clip has to be
 * sized for the cell rather than for the page. Every clip that reaches this
 * component is cut for the job: a short loop of the thing actually working,
 * scaled to roughly what a feature cell is wide, rather than the full-length
 * walkthrough the write-up page shows.
 *
 * That is where the bytes are. Wrdef's source is a 195-second, 1280px VP9
 * capture at 1.28 MB; the seven seconds of gameplay that make a card, at
 * 900px and 24fps, is **25 KB**. Trimming beat every codec choice by two
 * orders of magnitude, which is the usual answer when a video is heavy.
 *
 * ── No hooks ────────────────────────────────────────────────────────────────
 *
 * `autoplay` + `muted` + `playsinline` is the whole implementation, so this is
 * a server component and a wall of plates ships no JavaScript for its video.
 * The reduced-motion swap is the `.ssr-loop` pair in globals.css, decided by a
 * media query rather than by `matchMedia`, so no client code has to pick.
 */

export function PlateVideo({
  src,
  poster,
  label,
  width,
  height,
}: {
  src: string
  poster: string
  label: string
  width: number
  height: number
}) {
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
        className="ssr-loop block h-full w-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt={label}
        width={width}
        height={height}
        className="ssr-loop-still h-full w-full object-cover"
      />
    </>
  )
}
