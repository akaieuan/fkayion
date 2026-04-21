'use client';

import {
  ArrowLeft,
  BookOpen,
  Check,
  ClipboardList,
  FileText,
  Moon,
  LayoutPanelLeft,
  PanelLeft,
  PanelRight,
  PenLine,
  Search,
  Sun,
  UserRound,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { RIGHT_PANEL_TABS } from './types';
import type { RightTab } from './types';

const TAB_ICONS: Record<RightTab, typeof UserRound> = {
  human: UserRound,
  library: BookOpen,
  search: Search,
  read: FileText,
  write: PenLine,
  notes: ClipboardList,
};

export interface RightPanelMenuConfig {
  visible: boolean;
  activeTab: RightTab;
  onSelectTab: (tab: RightTab) => void;
  onHide: () => void;
  humanCount?: number;
}

interface MacTitleBarProps {
  showBackToHome?: boolean;
  onBack?: () => void;
  /** Sidebar collapse lives here (Claude-style), not in the rail header */
  sidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
  showSidebarToggle?: boolean;
  rightPanelMenu?: RightPanelMenuConfig;
  children?: React.ReactNode;
  className?: string;
}

export function MacTitleBar({
  showBackToHome,
  onBack,
  sidebarCollapsed,
  onToggleSidebar,
  showSidebarToggle,
  rightPanelMenu,
  children,
  className,
}: MacTitleBarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e: MouseEvent) => {
      if (menuWrapRef.current && !menuWrapRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const isDark = mounted && theme === 'dark';
  const toggleTheme = () => setTheme(isDark ? 'light' : 'dark');

  const pickTab = (tab: RightTab) => {
    rightPanelMenu?.onSelectTab(tab);
    setMenuOpen(false);
  };

  const hidePanel = () => {
    rightPanelMenu?.onHide();
    setMenuOpen(false);
  };

  return (
    <div
      className={cn(
        'grid h-[38px] shrink-0 grid-cols-[1fr_auto_1fr] items-center border-b border-border bg-background px-2 sm:px-3',
        className,
      )}
    >
      {/* Left: sidebar toggle */}
      <div className="flex min-w-0 items-center justify-self-start gap-1">
        {showSidebarToggle && onToggleSidebar ? (
          <button
            type="button"
            onClick={onToggleSidebar}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? (
              <PanelRight className="h-3.5 w-3.5" />
            ) : (
              <PanelLeft className="h-3.5 w-3.5" />
            )}
          </button>
        ) : (
          <span className="w-0" aria-hidden />
        )}
      </div>

      {/* Center: Projects + Home */}
      <div className="flex items-center justify-center gap-1 sm:gap-2">
        <Link
          href="/demo"
          className="flex h-7 items-center gap-1.5 rounded-md px-2 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5 shrink-0" />
          <span className="hidden sm:inline">Projects</span>
        </Link>
        {showBackToHome && (
          <button
            type="button"
            onClick={onBack}
            className="flex h-7 items-center gap-1 rounded-md px-2 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 shrink-0" />
            Home
          </button>
        )}
      </div>

      {/* Right: theme + side panel menu */}
      <div className="flex items-center justify-self-end gap-1">
        {children}

        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          {!mounted ? (
            <Moon className="h-3.5 w-3.5 opacity-0" />
          ) : isDark ? (
            <Sun className="h-3.5 w-3.5" />
          ) : (
            <Moon className="h-3.5 w-3.5" />
          )}
        </button>

        {rightPanelMenu !== undefined && (
          <div className="relative" ref={menuWrapRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-haspopup="menu"
              className={cn(
                'flex h-7 w-7 items-center justify-center rounded-md transition-colors',
                menuOpen || rightPanelMenu.visible
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
              title="Side panel views"
            >
              <LayoutPanelLeft className="h-3.5 w-3.5" />
            </button>

            {menuOpen && (
              <div
                role="menu"
                className="absolute right-0 top-[calc(100%+6px)] z-[60] w-[min(calc(100vw-1.5rem),15rem)] rounded-xl border border-border bg-popover py-1.5 text-popover-foreground shadow-lg"
              >
                <p className="px-3 pb-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  Open panel
                </p>
                {RIGHT_PANEL_TABS.map(({ id, label }) => {
                  const Icon = TAB_ICONS[id];
                  const active = rightPanelMenu.activeTab === id;
                  const count = id === 'human' ? rightPanelMenu.humanCount : undefined;
                  return (
                    <button
                      key={id}
                      type="button"
                      role="menuitem"
                      onClick={() => pickTab(id)}
                      className={cn(
                        'flex w-full items-center gap-2.5 px-3 py-2 text-left text-xs transition-colors',
                        active
                          ? 'bg-muted/80 text-foreground'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                      )}
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0 opacity-80" />
                      <span className="flex-1 truncate">{label}</span>
                      {count != null && count > 0 && (
                        <span className="flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-muted px-1 text-[9px] font-medium text-foreground">
                          {count}
                        </span>
                      )}
                      {active && rightPanelMenu.visible ? (
                        <Check className="h-3.5 w-3.5 shrink-0 text-foreground" />
                      ) : null}
                    </button>
                  );
                })}

                {rightPanelMenu.visible && (
                  <>
                    <div className="my-1.5 border-t border-border" />
                    <button
                      type="button"
                      role="menuitem"
                      onClick={hidePanel}
                      className="w-full px-3 py-2 text-left text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      Hide side panel
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
