"use client"

import { Links } from "@/components/Links"
import { MusicRolodex } from "@/components/fun-stuff/MusicRolodex"
import { FogBackground } from "@/components/ui/fog-bg"
import { Header } from "@/components/Header"

export default function PortfolioPage() {
  return (
    <div className="min-h-screen">
      <FogBackground />
      <div className="relative z-10">
        <Header />
        <main className="flex flex-col items-center">
          <MusicRolodex />
          <Links />
        </main>
      </div>
    </div>
  )
} 