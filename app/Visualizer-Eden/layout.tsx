import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '3D Audio Visualizer',
  description: 'Goopy liquid audio visualization with Three.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} bg-black text-white h-full overflow-hidden`}>
        {children}
      </body>
    </html>
  )
} 