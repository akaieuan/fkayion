'use client'

import dynamic from 'next/dynamic'

/**
 * The hero mark, loaded after the page.
 *
 * The hero itself is server-rendered now, so the title, the line under it and
 * the links are in the HTML. The mark is a canvas engine with a fourteen-
 * kilobyte shape library behind it and nothing to paint until a browser runs
 * it, so there is no reason for it to sit in the bundle the page is waiting on.
 *
 * `ssr: false` is honest here rather than a workaround: the server would emit
 * an empty canvas, which is exactly what the placeholder below already is,
 * without the cost of shipping the engine early. The placeholder reserves the
 * mark's square so the hero does not reflow when it arrives.
 *
 * This wrapper exists because `dynamic(..., { ssr: false })` is a client-only
 * API and the section that renders it is a server component.
 */
const Mark = dynamic(
  () => import('./aka-mark').then((m) => ({ default: m.AkaMark })),
  {
    ssr: false,
    loading: () => <span className="block aspect-square w-[200px] max-w-full" aria-hidden />,
  }
)

export function AkaMarkLazy(props: { size: number; grid?: number; fluid?: boolean }) {
  return <Mark {...props} />
}
