'use client';

import Link from 'next/link';
import { House, LayoutDashboard, ScrollText, LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  HITL_DEMO_NAV,
  HITL_DEMO_NAV_KEYS,
  hitlDemoTitleNavLinkClassName,
  hitlDemoSheetStackLinkClassName,
  type HitlDemoNavKey,
} from '@/components/demo/hitl-ai/hitl-demo-nav';

const HITL_DEMO_NAV_ICONS: Record<HitlDemoNavKey, typeof House> = {
  site: House,
  shell: LayoutDashboard,
  sheet: ScrollText,
  widgets: LayoutGrid,
};

/** Short labels for the top bar (full labels in sheet sidebar). */
const BAR_LABEL: Record<HitlDemoNavKey, string> = {
  site: HITL_DEMO_NAV.site.label,
  shell: HITL_DEMO_NAV.shell.label,
  sheet: HITL_DEMO_NAV.sheet.label,
  widgets: 'Widgets',
};

export function HitlDemoNavLinkRow({
  className,
  linkClassName,
}: {
  className?: string;
  /** Override link styles (e.g. sheet header buttons). */
  linkClassName?: string;
}) {
  const linkCn = linkClassName ?? hitlDemoTitleNavLinkClassName;

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {HITL_DEMO_NAV_KEYS.map((key) => {
        const { href } = HITL_DEMO_NAV[key];
        const Icon = HITL_DEMO_NAV_ICONS[key];
        return (
          <Link key={key} href={href} className={linkCn}>
            <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
            <span className="hidden sm:inline">{BAR_LABEL[key]}</span>
          </Link>
        );
      })}
    </div>
  );
}

/** Vertical list (e.g. component sheet sidebar). */
export function HitlDemoNavStack({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-1', className)}>
      {HITL_DEMO_NAV_KEYS.map((key) => {
        const { href, label } = HITL_DEMO_NAV[key];
        const Icon = HITL_DEMO_NAV_ICONS[key];
        return (
          <Link key={key} href={href} className={hitlDemoSheetStackLinkClassName}>
            <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
            {label}
          </Link>
        );
      })}
    </div>
  );
}
