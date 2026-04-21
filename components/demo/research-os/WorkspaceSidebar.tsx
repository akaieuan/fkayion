'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Plus, BookOpen, Globe, GraduationCap, PenLine, UserRound,
  ChevronDown, ChevronRight, Upload, FolderOpen, FileText,
  Folder, File, Clock,
} from 'lucide-react';
import { WORKSPACE_NAME, FILE_TREE, RECENT_CHATS } from './data';
import type { RightTab } from './types';

interface WorkspaceSidebarProps {
  humanCount?: number;
  onOpenTab?: (tab: RightTab) => void;
  onOpenFile?: (fileId: string) => void;
}

export function WorkspaceSidebar({
  humanCount = 3,
  onOpenTab,
  onOpenFile,
}: WorkspaceSidebarProps) {
  const [importMenuOpen, setImportMenuOpen] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['f1']));
  const [historyOpen, setHistoryOpen] = useState(false);
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

  const toggleFolder = (id: string) =>
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const navItems = [
    { icon: BookOpen, label: 'Library', tab: 'library' as RightTab },
    { icon: Globe, label: 'Web Search', tab: 'search' as RightTab },
    { icon: GraduationCap, label: 'Deep Research', tab: 'search' as RightTab },
    { icon: PenLine, label: 'Write', tab: 'write' as RightTab },
    { icon: UserRound, label: 'Human', tab: 'human' as RightTab, badge: humanCount },
  ];

  return (
    <div className="flex h-full w-44 shrink-0 flex-col border-r border-border/50 bg-muted/55 text-sm sm:w-52 dark:border-white/[0.12] dark:bg-muted">
      {/* Header — collapse is in the title bar only */}
      <div className="flex h-11 items-center border-b border-border/30 px-2.5 dark:border-white/[0.06] sm:px-3">
        <div className="flex min-w-0 items-center gap-1.5">
          <Folder className="h-3.5 w-3.5 shrink-0 text-[#2d6a4f]" />
          <span className="truncate text-xs font-semibold text-foreground">/ {WORKSPACE_NAME}</span>
        </div>
      </div>

      {/* Import & Create */}
      <div className="px-2 py-2">
        <div className="relative" ref={importMenuRef}>
          <button
            type="button"
            onClick={() => setImportMenuOpen((o) => !o)}
            className="flex w-full items-center gap-2 rounded-lg border border-dashed border-border/80 bg-background/30 px-2.5 py-1.5 text-xs text-muted-foreground hover:border-foreground/30 hover:bg-background/40 hover:text-foreground transition-colors sm:px-3"
          >
            <Plus className="h-3.5 w-3.5" />
            Import & Create
          </button>

          {importMenuOpen && (
            <div className="absolute left-0 top-full z-50 mt-1 w-44 rounded-lg border border-border bg-popover p-2 shadow-lg">
              <p className="mb-1 px-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Import</p>
              {[{ icon: Upload, label: 'Upload Files' }, { icon: FolderOpen, label: 'Upload Folder' }].map(({ icon: Icon, label }) => (
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

      {/* Nav */}
      <nav className="px-2 pb-1">
        {navItems.map(({ icon: Icon, label, tab, badge }) => (
          <button
            key={label}
            type="button"
            onClick={() => onOpenTab?.(tab)}
            className="flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-xs text-muted-foreground hover:bg-muted/35 hover:text-foreground transition-colors"
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
            {badge ? (
              <span className="ml-auto flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[9px] font-bold text-white">
                {badge}
              </span>
            ) : null}
          </button>
        ))}
      </nav>

      <div className="mx-2 my-1 border-t border-border" />

      {/* File tree */}
      <div className="flex-1 overflow-y-auto px-2 pb-2">
        {FILE_TREE.map((node) => (
          <div key={node.id}>
            <button
              onClick={() => toggleFolder(node.id)}
              className="flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-muted/35 hover:text-foreground transition-colors"
            >
              {expandedFolders.has(node.id) ? (
                <ChevronDown className="h-3 w-3 shrink-0" />
              ) : (
                <ChevronRight className="h-3 w-3 shrink-0" />
              )}
              <Folder className="h-3.5 w-3.5 shrink-0 text-muted-foreground/60" />
              <span className="truncate">{node.name}</span>
            </button>
            {expandedFolders.has(node.id) && node.children?.map((child) => (
              <button
                key={child.id}
                type="button"
                onClick={() => {
                  onOpenFile?.(child.id);
                }}
                className="flex w-full items-center gap-1.5 rounded-md py-1.5 pl-7 pr-2 text-xs text-muted-foreground hover:bg-muted/35 hover:text-foreground transition-colors"
              >
                <File className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />
                <span className="truncate">{child.name}</span>
              </button>
            ))}
          </div>
        ))}

        <div className="mx-0 my-1 border-t border-border" />

        {/* Workspace History */}
        <button
          onClick={() => setHistoryOpen((o) => !o)}
          className="flex w-full items-center gap-1 px-2 py-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
        >
          {historyOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
          History
        </button>
        {historyOpen && (
          <div>
            {RECENT_CHATS.filter((c) => c.ws === 'climate-policy').map((chat, i) => (
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
      <div className="flex items-center gap-2 border-t border-border/40 bg-muted/40 px-2.5 py-2 dark:border-white/[0.08] dark:bg-muted/80 sm:px-3">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[10px] font-semibold uppercase text-foreground">
          A
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="truncate text-xs font-medium text-foreground">alex</p>
        </div>
        <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">Pro</span>
      </div>
    </div>
  );
}
