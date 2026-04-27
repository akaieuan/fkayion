import React from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import { SiteHeader } from '@/components/ui/site-header'
import { ConditionalFooter } from '@/components/ui/conditional-footer'
import { ThemeProvider } from '@/components/ui/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'akaBuild | akaieuan',
  description: 'akaieuan is a front-end developer, designer, and artist',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <SiteHeader />
          {children}
          <ConditionalFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}
