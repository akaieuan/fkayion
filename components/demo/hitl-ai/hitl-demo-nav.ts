/**
 * Single source of truth for cross-links inside the HITL-AI demo.
 * Avoids `/demo` index so users are not routed toward other demos (e.g. Research OS).
 */

export const HITL_DEMO_NAV_KEYS = ['site', 'shell', 'sheet', 'widgets'] as const;

export type HitlDemoNavKey = (typeof HITL_DEMO_NAV_KEYS)[number];

export const HITL_DEMO_NAV: Record<
  HitlDemoNavKey,
  { href: string; label: string }
> = {
  site: { href: '/', label: 'Site' },
  shell: { href: '/demo/hitl-ai', label: 'Demo' },
  sheet: { href: '/demo/hitl-ai/sheet', label: 'Sheet' },
  widgets: { href: '/demo/hitl-ai/components', label: 'Widget showcase' },
};

/** Title bar / horizontal strip */
export const hitlDemoTitleNavLinkClassName =
  'flex h-7 items-center gap-1.5 rounded-md px-2 text-xs text-muted-foreground/80 hover:bg-muted/60 hover:text-foreground transition-colors duration-200';

/** Sheet sidebar stacked links */
export const hitlDemoSheetStackLinkClassName =
  'flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground/80 hover:bg-muted/60 hover:text-foreground transition-colors duration-200';
