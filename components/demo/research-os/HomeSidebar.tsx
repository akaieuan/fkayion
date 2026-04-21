'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Plus, BookOpen, Globe, GraduationCap, PenLine, Highlighter,
  ChevronDown, ChevronRight, Upload, FolderOpen, FileText, Clock, Folder,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { APP_NAME, WORKSPACES, RECENT_CHATS } from './data';
import type { RightTab, ViewMode } from './types';

interface HomeSidebarProps {
  onNavigate: (view: ViewMode) => void;
  libraryPanelOpen: boolean;
  onOpenLibrary: () => void;
  onOpenWorkspaceTool: (tab: RightTab) => void;
}

export function HomeSidebar({
  onNavigate,
  libraryPanelOpen,
  onOpenLibrary,
  onOpenWorkspaceTool,
}: HomeSidebarProps) {
  const [importMenuOpen, setImportMenuOpen] = useState(false);
  const [workspacesOpen, setWorkspacesOpen] = useState(true);
  const [recentOpen, setRecentOpen] = useState(true);
  const importMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!importMenuOpen) return;
    const close = (e: MouseEvent) => {
      if (importMenuRef.current && !importMenuRef.current.contains(e.target as Node)) {
        setImportMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [importMenuOpen]);

  const navItems: {
    icon: typeof BookOpen;
    label: string;
    isActive?: boolean;
    onClick: () => void;
  }[] = [
    {
      icon: BookOpen,
      label: 'Library',
      isActive: libraryPanelOpen,
      onClick: onOpenLibrary,
    },
    {
      icon: Globe,
      label: 'Web Search',
      onClick: () => onOpenWorkspaceTool('search'),
    },
    {
      icon: GraduationCap,
      label: 'Deep Research',
      onClick: () => onOpenWorkspaceTool('search'),
    },
    {
      icon: PenLine,
      label: 'Write Doc',
      onClick: () => onOpenWorkspaceTool('write'),
    },
    {
      icon: Highlighter,
      label: 'Annotate',
      onClick: () => onNavigate('annotate'),
    },
  ];

  return (
    <div className="flex h-full w-44 shrink-0 flex-col border-r border-border/50 bg-muted/55 text-sm sm:w-52 dark:border-white/[0.12] dark:bg-muted">
      {/* Header — collapse is in the title bar only */}
      <div className="flex h-11 items-center border-b border-border/30 px-2.5 dark:border-white/[0.06] sm:px-3">
        <span className="font-semibold tracking-tight text-foreground">{APP_NAME}</span>
      </div>

      {/* New button */}
      <div className="px-2 py-2">
        <div className="relative" ref={importMenuRef}>
          <button
            type="button"
            onClick={() => setImportMenuOpen((o) => !o)}
            className="flex w-full items-center gap-2 rounded-lg border border-dashed border-border/60 bg-background/40 px-2.5 py-1.5 text-xs text-muted-foreground hover:border-foreground/25 hover:bg-muted/30 hover:text-foreground transition-colors sm:px-3"
          >
            <Plus className="h-3.5 w-3.5" />
            New
          </button>

          {importMenuOpen && (
            <div className="absolute left-0 top-full z-50 mt-1 w-44 rounded-lg border border-border bg-popover p-2 shadow-lg">
              <p className="mb-1 px-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Import</p>
              {[
                { icon: Upload, label: 'Upload Files' },
                { icon: FolderOpen, label: 'Upload Folder' },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setImportMenuOpen(false)}
                  className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-xs hover:bg-muted/35"
                >
                  <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                  {label}
                </button>
              ))}
              <div className="my-1.5 border-t border-border" />
              <p className="mb-1 px-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Create</p>
              <button
                type="button"
                onClick={() => setImportMenuOpen(false)}
                className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-xs hover:bg-muted/35"
              >
                <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                Document
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Nav items */}
      <nav className="px-2 pb-1">
        {navItems.map(({ icon: Icon, label, isActive, onClick }) => (
          <button
            key={label}
            type="button"
            onClick={onClick}
            className={cn(
              'flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-xs transition-colors',
              isActive
                ? 'bg-muted/50 text-foreground'
                : 'text-muted-foreground hover:bg-muted/40 hover:text-foreground',
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        ))}
      </nav>

      <div className="mx-2 my-1 border-t border-border" />

      {/* Workspaces */}
      <div className="flex-1 overflow-y-auto px-2 pb-2">
        <button
          onClick={() => setWorkspacesOpen((o) => !o)}
          className="flex w-full items-center gap-1 px-2 py-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
        >
          {workspacesOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
          Workspaces
        </button>
        {workspacesOpen && (
          <div className="mb-1">
            {WORKSPACES.map((ws) => (
              <button
                key={ws.id}
                onClick={() => onNavigate('workspace')}
                className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-muted/35 hover:text-foreground transition-colors"
              >
                <Folder className="h-3.5 w-3.5" style={{ color: ws.color }} />
                <span className="truncate">{ws.name}</span>
                <span className="ml-auto text-[10px] text-muted-foreground/60">{ws.files}</span>
              </button>
            ))}
          </div>
        )}

        <button
          onClick={() => setRecentOpen((o) => !o)}
          className="flex w-full items-center gap-1 px-2 py-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
        >
          {recentOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
          Recent
        </button>
        {recentOpen && (
          <div>
            {RECENT_CHATS.slice(0, 5).map((chat, i) => (
              <div key={i} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-muted/35 transition-colors">
                <Clock className="h-3 w-3 shrink-0" />
                <span className="truncate">{chat.title}</span>
                <span className="ml-auto text-[10px] text-muted-foreground/50">{chat.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* User footer */}
      <UserFooter />
    </div>
  );
}

function UserFooter() {
  return (
    <div className="flex items-center gap-2 border-t border-border/40 bg-muted/40 px-2.5 py-2 dark:border-white/[0.08] dark:bg-muted/80 sm:px-3">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[10px] font-semibold uppercase text-foreground">
        A
      </div>
      <div className="flex-1 overflow-hidden">
        <p className="truncate text-xs font-medium text-foreground">alex</p>
      </div>
      <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
        Pro
      </span>
    </div>
  );
}
