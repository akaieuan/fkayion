import Image from 'next/image'

type DemoImageProps = {
  src: string
  alt: string
  width: number
  height: number
  sizes?: string
  priority?: boolean
  className?: string
}

/**
 * Thin wrapper over next/image with sane defaults for the demo write-up pages.
 * No opacity gating — gating on onLoad can leave already-cached images stuck
 * invisible, so we just render the image and let next/image lazy-load it.
 */
export function DemoImage({ src, alt, width, height, sizes, priority, className }: DemoImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      quality={72}
      className={className}
    />
  )
}
