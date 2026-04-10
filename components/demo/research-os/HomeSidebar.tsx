'use client';

import { useState } from 'react';
import {
  PanelLeft, Plus, BookOpen, Globe, GraduationCap, PenLine, Highlighter,
  ChevronDown, ChevronRight, Upload, FolderOpen, FileText, Clock, Folder,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { APP_NAME, WORKSPACES, RECENT_CHATS } from './data';
import type { RightTab, ViewMode } from './types';

interface HomeSidebarProps {
  onCollapse: () => void;
  onNavigate: (view: ViewMode) => void;
  libraryPanelOpen: boolean;
  onOpenLibrary: () => void;
  onOpenWorkspaceTool: (tab: RightTab) => void;
}

export function HomeSidebar({
  onCollapse,
  onNavigate,
  libraryPanelOpen,
  onOpenLibrary,
  onOpenWorkspaceTool,
}: HomeSidebarProps) {
  const [importMenuOpen, setImportMenuOpen] = useState(false);
  const [workspacesOpen, setWorkspacesOpen] = useState(true);
  const [recentOpen, setRecentOpen] = useState(true);

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
    <div className="flex h-full w-52 shrink-0 flex-col border-r border-border bg-background text-sm">
      {/* Header */}
      <div className="flex h-[44px] items-center justify-between px-3 border-b border-border">
        <span className="font-semibold tracking-tight text-foreground">{APP_NAME}</span>
        <button
          onClick={onCollapse}
          className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <PanelLeft className="h-4 w-4" />
        </button>
      </div>

      {/* New button */}
      <div className="px-2 py-2">
        <div className="relative">
          <button
            onClick={() => setImportMenuOpen((o) => !o)}
            className="flex w-full items-center gap-2 rounded-md border border-dashed border-border px-3 py-1.5 text-xs text-muted-foreground hover:border-foreground/30 hover:text-foreground transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            New
          </button>

          {importMenuOpen && (
            <div className="absolute left-0 top-full z-50 mt-1 w-44 rounded-lg border border-border bg-background p-2 shadow-lg">
              <p className="mb-1 px-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Import</p>
              {[
                { icon: Upload, label: 'Upload Files' },
                { icon: FolderOpen, label: 'Upload Folder' },
              ].map(({ icon: Icon, label }) => (
                <button key={label} className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-xs hover:bg-muted">
                  <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                  {label}
                </button>
              ))}
              <div className="my-1.5 border-t border-border" />
              <p className="mb-1 px-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Create</p>
              <button className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-xs hover:bg-muted">
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
                ? 'bg-muted text-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
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
                className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
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
              <div key={i} className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-muted cursor-pointer transition-colors">
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
    <div className="flex items-center gap-2 border-t border-border px-3 py-2">
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
