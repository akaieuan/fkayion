import { DemoRail } from '@/components/ui/demo-rail'

/**
 * Wraps /demo and everything under it. The rail decides for itself whether a
 * page has enough sections to be worth mapping, so the index gets nothing and
 * a long write-up gets its table of contents without either page opting in.
 */
export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DemoRail />
      {children}
    </>
  )
}
