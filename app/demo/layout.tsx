/**
 * Wraps /demo and everything under it.
 *
 * This used to mount `DemoRail`, a fixed left-margin table of contents that
 * tracked which section you were reading. It is gone. The write-ups are one
 * column of prose you scroll top to bottom, and a section map beside them was
 * answering a question nobody asks of a page that short: the rail was the only
 * furniture on those pages that had to be operated rather than read, and it
 * cost a client component with a scroll listener on every route under /demo to
 * do it.
 *
 * The component still exists for anything that genuinely needs one later. It
 * simply is not mounted here, so every page below this layout is now pure
 * server output plus whatever that page itself asks for.
 */
export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
