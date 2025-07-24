import React from 'react'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Fkayion - Audio & Visual Experience',
  description: 'An immersive digital experience featuring audio visualization, music, and creative connections.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} bg-black text-white h-full antialiased`} style={{ overflow: 'visible' }}>
        {children}
      </body>
    </html>
  )
} 