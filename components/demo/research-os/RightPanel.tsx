'use client';

import { cn } from '@/lib/utils';
import type { RightTab } from './types';
import { HumanPanel } from './HumanPanel';
import { LibraryPanel, SearchPanel, PdfViewerPanel, WritingPanel, NotesPanel } from './Panels';

interface RightPanelProps {
  activeTab: RightTab;
  onTabChange: (tab: RightTab) => void;
  humanCount?: number;
  onLibrarySendToChat?: (items: { id: string; name: string }[]) => void;
}

const TABS: { id: RightTab; label: string }[] = [
  { id: 'human', label: 'Human' },
  { id: 'library', label: 'Library' },
  { id: 'search', label: 'Search' },
  { id: 'read', label: 'Read' },
  { id: 'write', label: 'Write' },
  { id: 'notes', label: 'All Notes' },
];

export function RightPanel({
  activeTab,
  onTabChange,
  humanCount = 3,
  onLibrarySendToChat,
}: RightPanelProps) {
  return (
    <div className="flex h-full flex-col bg-background">
      {/* Tab bar */}
      <div className="flex shrink-0 items-center border-b border-border">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'relative flex items-center gap-1.5 px-3 py-2.5 text-xs transition-colors duration-200',
              activeTab === tab.id
                ? 'text-foreground font-medium'
                : 'text-muted-foreground/70 hover:text-muted-foreground',
            )}
          >
            {tab.label}
            {tab.id === 'human' && humanCount > 0 && (
              <span className="flex h-3.5 min-w-[14px] items-center justify-center rounded-full bg-muted px-1 text-[8px] font-medium text-foreground">
                {humanCount}
              </span>
            )}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-1 right-1 h-[1.5px] rounded-t-full bg-foreground" />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 overflow-hidden">
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
