'use client';

import {
  PanelRight, BookOpen, Globe, GraduationCap, PenLine,
  Highlighter, UserRound, Folder,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ViewMode } from './types';

interface SidebarCollapsedRailProps {
  view: ViewMode;
  onExpand: () => void;
  humanCount?: number;
}

export function SidebarCollapsedRail({ view, onExpand, humanCount = 3 }: SidebarCollapsedRailProps) {
  const homeIcons = [BookOpen, Globe, GraduationCap, PenLine, Highlighter];
  const workspaceIcons = [Globe, GraduationCap, PenLine, UserRound];
  const icons = view === 'home' ? homeIcons : workspaceIcons;

  return (
    <div className="flex h-full w-[44px] shrink-0 flex-col items-center border-r border-border bg-background py-2 gap-1">
      <button
        onClick={onExpand}
        className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
      >
        <PanelRight className="h-4 w-4" />
      </button>

      <div className="my-1 w-6 border-t border-border" />

      {icons.map((Icon, i) => (
        <div key={i} className="relative">
          <button className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <Icon className="h-4 w-4" />
          </button>
          {view === 'workspace' && Icon === UserRound && humanCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-orange-500 text-[8px] font-bold text-white">
              {humanCount}
            </span>
          )}
        </div>
      ))}

      {view === 'workspace' && (
        <>
          <div className="my-1 w-6 border-t border-border" />
          <button className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <Folder className="h-4 w-4 text-[#2d6a4f]" />
          </button>
        </>
      )}
    </div>
  );
}
