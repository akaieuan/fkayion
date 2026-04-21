'use client';

import type { RightTab } from './types';
import { RIGHT_PANEL_TABS } from './types';
import { HumanPanel } from './HumanPanel';
import { LibraryPanel, SearchPanel, PdfViewerPanel, WritingPanel, NotesPanel } from './Panels';

interface RightPanelProps {
  activeTab: RightTab;
  onTabChange: (tab: RightTab) => void;
  humanCount?: number;
  onLibrarySendToChat?: (items: { id: string; name: string }[]) => void;
}

export function RightPanel({
  activeTab,
  onTabChange,
  humanCount = 3,
  onLibrarySendToChat,
}: RightPanelProps) {
  const label = RIGHT_PANEL_TABS.find((t) => t.id === activeTab)?.label ?? 'Panel';

  return (
    <div className="flex h-full min-h-0 flex-col border-border bg-card text-card-foreground lg:border-l">
      {/* Single active view — switch panels from the title bar menu only */}
      <div className="flex h-8 shrink-0 items-center gap-2 border-b border-border/80 bg-muted/15 px-3 dark:bg-muted/10">
        <span className="truncate text-xs font-medium text-foreground">{label}</span>
        {activeTab === 'human' && humanCount > 0 && (
          <span className="shrink-0 rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium tabular-nums text-foreground">
            {humanCount}
          </span>
        )}
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">
        {activeTab === 'human' && <HumanPanel />}
        {activeTab === 'library' && (
          <LibraryPanel
            onOpenInReader={() => onTabChange('read')}
            onSendToChat={onLibrarySendToChat}
          />
        )}
        {activeTab === 'search' && <SearchPanel />}
        {activeTab === 'read' && <PdfViewerPanel />}
        {activeTab === 'write' && <WritingPanel />}
        {activeTab === 'notes' && <NotesPanel />}
      </div>
    </div>
  );
}
