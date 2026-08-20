import React from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import { SiteHeader } from '@/components/ui/site-header'
import { ConditionalFooter } from '@/components/ui/conditional-footer'
import { SiteFooter } from '@/components/ui/site-footer'
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
        {/* disableTransitionOnChange: every `transition-colors` on the page
            animates when the theme class flips, so borders and surfaces flash
            through an intermediate colour on the way over. This suppresses
            transitions for the one frame the swap takes. */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SiteHeader />
          {children}
          <ConditionalFooter>
            <SiteFooter />
          </ConditionalFooter>
        </ThemeProvider>
      </body>
    </html>
  )
}
