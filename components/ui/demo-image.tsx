'use client'

import Image from 'next/image'
import { useState } from 'react'

type DemoImageProps = {
  src: string
  alt: string
  width: number
  height: number
  sizes?: string
  priority?: boolean
  className?: string
}

export function DemoImage({
  src,
  alt,
  width,
  height,
  sizes,
  priority,
  className,
}: DemoImageProps) {
  // Priority images are eager — show them immediately, no fade needed.
  const [loaded, setLoaded] = useState(Boolean(priority))

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      quality={74}
      onLoad={() => setLoaded(true)}
      className={`transition-opacity duration-500 ${
        loaded ? 'opacity-100' : 'opacity-0'
      } ${className ?? ''}`}
    />
  )
}
