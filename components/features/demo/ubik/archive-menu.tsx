'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

/**
 * The button that opens the Ubik archive, and nothing else.
 *
 * ── Why it takes children ───────────────────────────────────────────────────
 *
 * This file is the only part of the menu that has to be client code: it owns
 * one boolean and the three listeners that close it. What is *in* the menu —
 * five links, their labels, their hrefs — is content, and content has no
 * business crossing the client boundary just because the box around it opens
 * and shuts.
 *
 * So the items arrive as `children`, rendered on the server by the page. React
 * sends them through as already-rendered elements: this component never
 * imports them, never reads lib/writing, and the client bundle carries a
 * button and a state hook rather than the archive.
 *
 * ── Why the panel is always rendered ────────────────────────────────────────
 *
 * Mounting on open would mean the links do not exist until someone clicks, and
 * a crawler clicks nothing. They are in the markup from the first byte and the
 * panel is hidden with `invisible`, which also takes them out of the tab order
 * and the accessibility tree, so a closed menu is closed for everybody rather
 * than only for people who can see it.
 *
 * ── Why nothing moves ───────────────────────────────────────────────────────
 *
 * The panel is absolutely positioned against a `relative` host, so opening it
 * cannot reflow a single line of the page underneath. It is drawn on
 * `.aka-overlay`: the page's own ground, translucent, over a blur.
 */
export function ArchiveMenu({
  label,
  children,
}: {
  label: string
  /** The menu's items, rendered on the server. See above. */
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const hostRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelId = useId()

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      // Escape returns you to the control you opened, or focus is left
      // nowhere and the next Tab starts from the top of the document.
      buttonRef.current?.focus()
    }
    /*
     * pointerdown rather than click: a click listener fires after the browser
     * has already followed a link inside the panel, and on a touch screen it
     * arrives late enough to feel like the menu is sticking.
     */
    const onPointerDown = (event: PointerEvent) => {
      if (!hostRef.current?.contains(event.target as Node)) setOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  return (
    <div ref={hostRef} className="relative w-fit">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((was) => !was)}
        className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-border bg-foreground px-3.5 py-2 text-[13px] font-medium text-background transition-opacity hover:opacity-90"
      >
        {label}
        {/*
          The chevron turns rather than swapping glyph, so the control reads as
          one thing in two positions. Transform only: law 04.
        */}
        <ChevronDown
          className={`h-4 w-4 opacity-80 transition-transform duration-200 motion-reduce:transition-none ${
            open ? 'rotate-180' : ''
          }`}
          aria-hidden
        />
      </button>

      <div
        id={panelId}
        // Closing on any click inside the panel, by delegation. Every item is a
        // link, so this component never has to know what the items are.
        onClick={() => setOpen(false)}
        className={`aka-overlay absolute left-0 top-[calc(100%+8px)] z-50 w-[min(22rem,calc(100vw-3rem))] rounded-lg p-1.5 transition duration-150 motion-reduce:transition-none ${
          open
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-1 opacity-0 motion-reduce:translate-y-0'
        }`}
      >
        {children}
      </div>
    </div>
  )
}
