import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SITE_NAME, SITE_URL, AUTHOR } from '@/lib/site'
import { SiteHeader } from '@/components/ui/site-header'
import { ConditionalFooter } from '@/components/ui/conditional-footer'
import { SiteFooter } from '@/components/ui/site-footer'
import { ThemeProvider } from '@/components/ui/theme-provider'

const inter = Inter({ subsets: ['latin'] })

const DESCRIPTION =
  'akaBuild is the working portfolio of Ieuan King: front-end engineering, design systems, procedural tooling, and the write-ups behind them.'

/**
 * The site's metadata floor.
 *
 * `metadataBase` is what turns every relative Open Graph and canonical path on
 * a page into an absolute URL, so each route declares `/demo/thing` and gets a
 * real one. The title template means a page sets its own name and inherits the
 * suffix; `title.default` is what the landing and anything without a title use.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | akaieuan`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: AUTHOR }],
  creator: AUTHOR,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_GB',
    url: '/',
    title: `${SITE_NAME} | akaieuan`,
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | akaieuan`,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
         * The reveal-on-scroll starting state is hidden, and it is JavaScript
         * that undoes it. If the script never runs — an old browser, a blocked
         * bundle, a crawler that does not execute it — this puts everything
         * back. One rule covers every `data-reveal` on the site.
         */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
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
