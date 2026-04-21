'use client'

import dynamic from 'next/dynamic'

const HomeSection = dynamic(() => import('./sections/home-section').then(m => ({ default: m.HomeSection })), {
  ssr: false,
  loading: () => <section id="section-0" className="min-h-screen w-full bg-background" />,
})

const LinksSection = dynamic(() => import('./sections/links-section').then(m => ({ default: m.LinksSection })), {
  loading: () => <section id="section-1" className="w-full py-24 bg-background" />,
})

const ProductSection = dynamic(() => import('./sections/product-section').then(m => ({ default: m.ProductSection })), {
  loading: () => <section id="section-2" className="w-full py-24 bg-background" />,
})

const FourUHSection = dynamic(() => import('./sections/four-uh-section').then(m => ({ default: m.FourUHSection })), {
  loading: () => <section id="section-4" className="w-full py-24 bg-background" />,
})

export function UnifiedClient() {
  return (
    <main className="relative min-h-0 w-full min-w-0 overflow-x-clip bg-background">
      <HomeSection />
      <LinksSection />
      <ProductSection />
      <FourUHSection />
    </main>
  )
}
