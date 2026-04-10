'use client';

import {
  PanelRight, BookOpen, Globe, GraduationCap, PenLine,
  Highlighter, UserRound, Folder,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { RightTab, ViewMode } from './types';

type HomeRailAction = 'library' | 'web' | 'research' | 'write' | 'annotate';

interface SidebarCollapsedRailProps {
  view: ViewMode;
  onExpand: () => void;
  humanCount?: number;
  libraryPanelOpen?: boolean;
  onHomeAction?: (action: HomeRailAction) => void;
  onWorkspaceTab?: (tab: RightTab) => void;
}

export function SidebarCollapsedRail({
  view,
  onExpand,
  humanCount = 3,
  libraryPanelOpen = false,
  onHomeAction,
  onWorkspaceTab,
}: SidebarCollapsedRailProps) {
  const homeIcons = [
    { Icon: BookOpen, action: 'library' as const },
    { Icon: Globe, action: 'web' as const },
    { Icon: GraduationCap, action: 'research' as const },
    { Icon: PenLine, action: 'write' as const },
    { Icon: Highlighter, action: 'annotate' as const },
  ];

  const workspaceIcons = [
    { Icon: BookOpen, tab: 'library' as RightTab },
    { Icon: Globe, tab: 'search' as RightTab },
    { Icon: GraduationCap, tab: 'search' as RightTab },
    { Icon: PenLine, tab: 'write' as RightTab },
    { Icon: UserRound, tab: 'human' as RightTab },
  ];

  return (
    <div className="flex h-full w-[44px] shrink-0 flex-col items-center border-r border-border bg-background py-2 gap-1">
      <button
        type="button"
        onClick={onExpand}
        className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        aria-label="Expand sidebar"
      >
        <PanelRight className="h-4 w-4" />
      </button>

      <div className="my-1 w-6 border-t border-border" />

      {view === 'home' &&
        homeIcons.map(({ Icon, action }, i) => (
          <div key={i} className="relative">
            <button
              type="button"
              onClick={() => onHomeAction?.(action)}
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-md transition-colors',
                action === 'library' && libraryPanelOpen
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
              aria-label={action}
            >
              <Icon className="h-4 w-4" />
            </button>
          </div>
        ))}

      {view === 'workspace' &&
        workspaceIcons.map(({ Icon, tab }, i) => (
          <div key={i} className="relative">
            <button
              type="button"
              onClick={() => onWorkspaceTab?.(tab)}
              className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label={tab}
            >
              <Icon className="h-4 w-4" />
            </button>
            {tab === 'human' && humanCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-orange-500 text-[8px] font-bold text-white">
                {humanCount}
              </span>
            )}
          </div>
        ))}

      {view === 'workspace' && (
        <>
          <div className="my-1 w-6 border-t border-border" />
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="Workspace files"
          >
            <Folder className="h-4 w-4 text-[#2d6a4f]" />
          </button>
        </>
      )}
    </div>
  );
}
