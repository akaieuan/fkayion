import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '4UH.NYC | aka4uh',
  description: '4UH.NYC - releases, music, and projects by aka4uh'
}

export default function FourUHLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

