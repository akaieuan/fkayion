import { code } from '@/components/features/demo/hologram/chrome'

/** The closing card: why it's different. Moved verbatim from app/demo/hologram/page.tsx. */
export function HologramClosing() {
  return (
          <section className="aka-card-well px-5 py-4">
            <h2 className="text-sm font-medium tracking-wide text-foreground">Why it&apos;s different</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-foreground/85">
              Plenty of tools inspect a <code className={code}>.glb</code>. Hologram is the only one
              that puts a live feed of your agent&apos;s pipeline activity next to the assets it&apos;s
              producing, and hands that same pipeline to the agent as MCP tools — now including a
              render, so the agent can see an export, not just count its nodes.
            </p>
          </section>
  )
}
