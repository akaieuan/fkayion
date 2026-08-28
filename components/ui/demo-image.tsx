import Image, { type StaticImageData } from 'next/image'
import { BLUR } from '@/lib/blur-map.generated'

type DemoImageProps = {
  /** A path under /public, or a static import (which brings its own blur). */
  src: string | StaticImageData
  alt: string
  /** Required for a path; a static import already knows its own. */
  width?: number
  height?: number
  sizes?: string
  priority?: boolean
  className?: string
}

/**
 * A screenshot on a demo write-up.
 *
 * These are pictures of interfaces, not photographs: nine-point labels, hairline
 * panel borders, one-pixel grid cells. That is the worst case for a lossy codec,
 * and the sources are already compressed WebP, so the optimiser is re-encoding
 * something lossy a second time. At the old quality of 72 the result was
 * blocking along every dark panel edge and mush in the small caps.
 *
 * Quality 90 costs almost nothing here, because the sources are small to begin
 * with: a full-width frame lands within a few kilobytes of the original file
 * while the 640px variant a phone gets stays around twenty. The bytes saved at
 * 72 were being spent on making the work look worse than it is.
 *
 * The default `sizes` is the article's own measure. Left unset, next/image
 * assumes the image is as wide as the viewport and ships a frame several times
 * larger than the 640px column it lands in.
 *
 * Server-rendered. There is no load gating: gating on onLoad leaves an
 * already-cached image stuck invisible.
 */
export function DemoImage({
  src,
  alt,
  width,
  height,
  sizes = '(min-width: 672px) 640px, 100vw',
  priority,
  className,
}: DemoImageProps) {
  const imported = typeof src !== 'string'

  /*
   * A placeholder for path-referenced images too.
   *
   * A static import gets a blur from next/image for free, because the file is
   * in the module graph. A string path does not, so every screenshot on a
   * write-up was lazily loading into an empty frame and snapping in — which is
   * what "the images load poorly" looks like even though the markup was
   * server-rendered the whole time.
   *
   * `BLUR` is a build-time map of 16px WebP thumbnails. This component is a
   * server component, so the lookup happens during render and the HTML carries
   * only the one string it needs; the client never receives the map.
   */
  const blur = imported ? undefined : BLUR[src as string]

  return (
    <Image
      src={src}
      alt={alt}
      // A static import carries its own dimensions and a build-time blur, so
      // passing them again would only be a chance to disagree with the file.
      {...(imported ? {} : { width, height })}
      {...(imported ? { placeholder: 'blur' as const } : {})}
      {...(blur ? { placeholder: 'blur' as const, blurDataURL: blur } : {})}
      sizes={sizes}
      priority={priority}
      quality={90}
      className={className}
    />
  )
}
