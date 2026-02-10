import { Suspense } from 'react'
import { FourUHClient } from '@/components/features/4uh'

export default function FourUHPage() {
  return (
    <div className="h-screen w-screen relative overflow-hidden bg-black">
      <Suspense fallback={
        <div className="h-full w-full flex items-center justify-center bg-black">
          <div className="text-white text-xl">Loading...</div>
        </div>
      }>
        <FourUHClient />
      </Suspense>
    </div>
  )
}
