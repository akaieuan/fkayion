'use client';

import { useState } from 'react';
import {
  PanelLeft,
  Plus,
  Search,
  BarChart3,
  Users,
  LayoutGrid,
  Layers,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Project } from './types';
import { RECENT } from './data/constants';

type View = 'chat' | 'analytics' | 'artists' | 'artifacts' | 'projects';

interface SidebarProps {
  view: View;
  sExp: boolean;
  projects: Project[];
  activeProjectId: string | null;
  onToggleSidebar: () => void;
  onSetView: (v: View) => void;
  onNewChat: () => void;
  onOpenProject: (id: string) => void;
}

const NAV_ITEMS: { icon: typeof BarChart3; label: string; view: View }[] = [
  { icon: BarChart3, label: 'Analytics', view: 'analytics' },
  { icon: Users, label: 'Artists', view: 'artists' },
  { icon: LayoutGrid, label: 'Artifacts', view: 'artifacts' },
  { icon: Layers, label: 'Projects', view: 'projects' },
];

export function Sidebar({
  view,
  sExp,
  projects,
  activeProjectId,
  onToggleSidebar,
  onSetView,
  onNewChat,
  onOpenProject,
}: SidebarProps) {
  const [recOpen, setRecOpen] = useState(true);
  const [projOpen, setProjOpen] = useState(true);

  const navBtn = (
    Icon: typeof PanelLeft,
    label: string,
    action: () => void,
    isAct = false,
  ) => (
    <button
      key={label}
      onClick={action}
      className={cn(
        'flex items-center w-full gap-2.5 rounded-md text-[13px] cursor-pointer border-none',
        sExp ? 'justify-start px-3 py-[7px]' : 'justify-center py-[7px] px-0',
        isAct
          ? 'bg-card text-foreground font-medium'
          : 'bg-transparent text-muted-foreground hover:text-foreground',
      )}
    >
      <Icon
        size={18}
        className={cn(
          'shrink-0',
          isAct ? 'text-primary' : 'text-muted-foreground',
        )}
      />
      {sExp && <span>{label}</span>}
    </button>
  );

  const sectionHeader = (
    label: string,
    isOpen: boolean,
    toggle: () => void,
  ) => (
    <div
      className="flex items-center justify-between px-3 py-1.5 cursor-pointer select-none"
      onClick={toggle}
    >
      <span className="text-[11px] font-normal text-muted-foreground/60 uppercase tracking-wide">
        {label}
      </span>
      {isOpen ? (
        <ChevronDown size={14} className="text-muted-foreground/60" />
      ) : (
        <ChevronRight size={14} className="text-muted-foreground/60" />
      )}
    </div>
  );

  return (
    <div
      className={cn(
        'shrink-0 bg-background border-r border-border flex flex-col overflow-hidden transition-[width] duration-200 ease-in-out',
        sExp ? 'w-60' : 'w-[52px]',
      )}
    >
      {/* Top actions */}
      <div
        className={cn(
          'flex flex-col gap-px pt-3 pb-0.5',
          sExp ? 'px-3' : 'px-2',
        )}
      >
        {navBtn(PanelLeft, 'Collapse', onToggleSidebar)}
        {navBtn(Plus, 'New chat', onNewChat)}
        {navBtn(Search, 'Search', () => {})}
      </div>

      <div className={cn('border-t border-border my-1.5', sExp ? 'mx-3' : 'mx-2')} />

      {/* Navigation */}
      <div
        className={cn(
          'flex flex-col gap-px',
          sExp ? 'px-3' : 'px-2',
        )}
      >
        {NAV_ITEMS.map((n) =>
          navBtn(n.icon, n.label, () => onSetView(n.view), view === n.view),
        )}
      </div>

      <div className={cn('border-t border-border my-1.5', sExp ? 'mx-3' : 'mx-2')} />

      {/* Scrollable sections (expanded only) */}
      {sExp && (
        <div className="flex-1 overflow-auto px-2">
          {sectionHeader('Recent', recOpen, () => setRecOpen((o) => !o))}
          {recOpen &&
            RECENT.map((r) => (
              <button
                key={r.id}
                onClick={() => onSetView('chat')}
                className="flex items-center gap-2 w-full px-3 py-1.5 bg-transparent border-none rounded-md cursor-pointer text-muted-foreground text-[13px] text-left hover:text-foreground"
              >
                <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                  {r.title}
                </span>
                <span className="shrink-0 text-[11px] text-muted-foreground/60 font-mono">
                  {r.time}
                </span>
              </button>
            ))}

          {sectionHeader('Projects', projOpen, () => setProjOpen((o) => !o))}
          {projOpen && (
            <>
              {projects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => onOpenProject(p.id)}
                  className={cn(
                    'flex items-center gap-2 w-full px-3 py-1.5 border-none rounded-md cursor-pointer text-[13px] text-left',
                    activeProjectId === p.id
                      ? 'bg-card text-foreground'
                      : 'bg-transparent text-muted-foreground hover:text-foreground',
                  )}
                >
                  <div
                    className="w-2 h-2 rounded-sm shrink-0"
                    style={{ background: p.color }}
                  />
                  <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                    {p.name}
                  </span>
                </button>
              ))}
              {projects.length === 0 && (
                <div className="px-3 py-2 text-xs text-muted-foreground/60">
                  No projects yet
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Footer */}
      <div
        className={cn(
          'border-t border-border flex items-center',
          sExp ? 'flex-row gap-2.5 px-3 py-2.5' : 'flex-col gap-1.5 py-2.5',
        )}
      >
        {sExp && (
          <div className="flex-1">
            <div className="text-[13px] font-medium text-foreground">
              Agatha
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
