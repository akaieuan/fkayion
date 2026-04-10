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

const TABS: { id: RightTab; label: string; color: string; indicator: string }[] = [
  { id: 'human', label: 'Human', color: 'text-amber-500', indicator: 'bg-amber-400' },
  { id: 'library', label: 'Library', color: 'text-emerald-500', indicator: 'bg-emerald-400' },
  { id: 'search', label: 'Search', color: 'text-violet-500', indicator: 'bg-violet-400' },
  { id: 'read', label: 'Read', color: 'text-yellow-500', indicator: 'bg-yellow-400' },
  { id: 'write', label: 'Write', color: 'text-blue-500', indicator: 'bg-blue-400' },
  { id: 'notes', label: 'All Notes', color: 'text-foreground', indicator: 'bg-foreground' },
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
              'relative flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium transition-colors',
              activeTab === tab.id ? tab.color : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {tab.label}
            {tab.id === 'human' && humanCount > 0 && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[9px] font-bold text-white">
                {humanCount}
              </span>
            )}
            {activeTab === tab.id && (
              <span className={cn('absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full', tab.indicator)} />
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
