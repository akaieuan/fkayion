'use client'

import dynamic from 'next/dynamic'

const HomeSection = dynamic(() => import('./sections/home-section').then(m => ({ default: m.HomeSection })), {
  ssr: false,
  loading: () => <section id="section-0" className="min-h-screen w-full bg-background" />,
})

const LinksSection = dynamic(() => import('./sections/links-section').then(m => ({ default: m.LinksSection })), {
  ssr: false,
  loading: () => <section id="section-1" className="min-h-screen w-full bg-background" />,
})

const ProductSection = dynamic(() => import('./sections/product-section').then(m => ({ default: m.ProductSection })), {
  ssr: false,
  loading: () => <section id="section-2" className="w-full bg-background py-24" />,
})

const FourUHSection = dynamic(() => import('./sections/four-uh-section').then(m => ({ default: m.FourUHSection })), {
  ssr: false,
  loading: () => <section id="section-4" className="min-h-screen w-full bg-background" />,
})

export function UnifiedClient() {
  return (
    <main className="w-full bg-background">
      <HomeSection />
      <LinksSection />
      <ProductSection />
      <FourUHSection />
    </main>
  )
}
