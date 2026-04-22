'use client';

import { cn } from '@/lib/utils';
import type { RightTab } from './types';
import { HumanPanel } from './HumanPanel';
import { SearchPanel, PdfViewerPanel, WritingPanel, NotesPanel } from './Panels';

interface RightPanelProps {
  activeTab: RightTab;
  onTabChange: (tab: RightTab) => void;
  humanCount?: number;
}

const TABS: { id: RightTab; label: string; color: string; indicator: string }[] = [
  { id: 'human', label: 'Human', color: 'text-amber-500', indicator: 'bg-amber-400' },
  { id: 'search', label: 'Search', color: 'text-violet-500', indicator: 'bg-violet-400' },
  { id: 'read', label: 'Read', color: 'text-yellow-500', indicator: 'bg-yellow-400' },
  { id: 'write', label: 'Write', color: 'text-blue-500', indicator: 'bg-blue-400' },
  { id: 'notes', label: 'All Notes', color: 'text-foreground', indicator: 'bg-foreground' },
];

export function RightPanel({ activeTab, onTabChange, humanCount = 3 }: RightPanelProps) {
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
                ? cn('font-medium', tab.color)
                : 'text-muted-foreground/70 hover:text-muted-foreground',
            )}
          >
            {tab.label}
            {tab.id === 'human' && humanCount > 0 && (
              <span className="flex h-3.5 min-w-[14px] items-center justify-center rounded-full bg-orange-500/90 px-1 text-[8px] font-bold text-white">
                {humanCount}
              </span>
            )}
            {activeTab === tab.id && (
              <span className={cn('absolute bottom-0 left-1 right-1 h-[1.5px] rounded-t-full', tab.indicator)} />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 overflow-hidden">
        {activeTab === 'human' && <HumanPanel />}
        {activeTab === 'search' && <SearchPanel />}
        {activeTab === 'read' && <PdfViewerPanel />}
        {activeTab === 'write' && <WritingPanel />}
        {activeTab === 'notes' && <NotesPanel />}
      </div>
    </div>
  );
}
