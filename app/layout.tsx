import React from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import { SiteHeader } from '@/components/ui/site-header'
import { ConditionalFooter } from '@/components/ui/conditional-footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'aka4uh | akaieuan',
  description: 'akaieuan is a front-end developer, designer, and artist',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} bg-black text-white h-full antialiased`}>
        <div className="max-w-[1440px] mx-auto relative h-full">
          <SiteHeader />
          {children}
          <ConditionalFooter />
        </div>
      </body>
    </html>
  )
}
