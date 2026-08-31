/** The engineering. Moved verbatim from app/demo/ubik/page.tsx. */
export function EngineeringSection() {
  return (
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">The engineering</h2>
            <p>
              A large multi-package system: a desktop app, a web gateway, cloud agent deployments,
              and a browser extension, with a local-first storage model underneath it all. 1,038
              commits from September 2023 to May 2026 — with the design and research that preceded
              the first commit, about three and a half years of my life.
            </p>
            <p className="text-[12px] text-muted-foreground/70">
              Electron · Next.js · TypeScript · Python · local-first
            </p>
          </section>
  )
}
