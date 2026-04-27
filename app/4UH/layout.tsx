import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '4UH.NYC | akaBuild',
  description: '4UH.NYC - releases, music, and projects by akaBuild'
}

export default function FourUHLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

