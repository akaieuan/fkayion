import { code } from '@/components/features/demo/hologram/shared'

/** What this is. Moved verbatim from app/demo/hologram/page.tsx. */
export function WhatThisIsSection() {
  return (
          <section className="space-y-3">
            <h2 className="text-sm font-medium tracking-wide text-foreground">What this is</h2>
            <p>
              Hologram watches a glTF asset pipeline and streams what&apos;s happening to a local
              dashboard in real time — including the tool calls your AI coding agent is making right
              now. It also exposes the pipeline to agents through a small MCP server, so Claude (or
              any MCP client) can enumerate, introspect, render, and health-check your exported{' '}
              <code className={code}>.glb</code> assets. The Claude Code plugin wraps all of it in
              guided skills (<code className={code}>/hologram:start</code>, inspect, check, status,
              create-skill) so you can drive the pipeline in plain language.
            </p>
            <p>
              It stays deliberately{' '}
              <strong className="font-medium text-foreground/90">read-only and non-destructive</strong>
              : it observes, introspects, validates, and previews your pipeline — but it never
              modifies your assets, and the MCP server imports none of your project code. No
              framework, no build step, no database — a stdlib HTTP server, a JSONL event log, and
              pure-Python glTF parsing.
            </p>
          </section>
  )
}
