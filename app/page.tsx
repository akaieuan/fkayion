import React, { Suspense } from 'react'
import { UnifiedClient } from './unified-client'

// Server-side metadata
export const metadata = {
  title: 'aka4uh | akaieuan | aka4uh.com',
  description: 'akaieuan is a front-end developer, designer, and artist'
}

export default function HomePage() {
  return (
    <div className="h-screen w-full relative overflow-hidden bg-black">
      <Suspense fallback={
        <div className="h-full w-full flex items-center justify-center bg-black">
          <div className="text-white text-xl">Loading...</div>
        </div>
      }>
        <UnifiedClient />
      </Suspense>
    </div>
  )
}
