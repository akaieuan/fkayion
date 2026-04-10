'use client';

import { useState } from 'react';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';

import { MacTitleBar } from '@/components/demo/hitl-ai/MacTitleBar';
import { HomeSidebar } from '@/components/demo/hitl-ai/HomeSidebar';
import { WorkspaceSidebar } from '@/components/demo/hitl-ai/WorkspaceSidebar';
import { SidebarCollapsedRail } from '@/components/demo/hitl-ai/SidebarCollapsedRail';
import { HomeMainPanel } from '@/components/demo/hitl-ai/HomeMainPanel';
import { ChatPanel } from '@/components/demo/hitl-ai/ChatPanel';
import { RightPanel } from '@/components/demo/hitl-ai/RightPanel';
import { AnnotatePanel, WorkspaceStatusBar, WorkspaceCreateModal } from '@/components/demo/hitl-ai/Misc';
import type { ViewMode, RightTab } from '@/components/demo/hitl-ai/types';

export default function HitlAiDemoPage() {
  const [view, setView] = useState<ViewMode>('home');
  const [activeTab, setActiveTab] = useState<RightTab>('human');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [rightPanelVisible, setRightPanelVisible] = useState(true);
  const [workspaceModalOpen, setWorkspaceModalOpen] = useState(false);

  const handleNavigate = (v: ViewMode) => setView(v);
  const handleOpenTab = (tab: RightTab) => {
    setActiveTab(tab);
    if (!rightPanelVisible) setRightPanelVisible(true);
  };

  return (
    <div className="flex h-full flex-col bg-background text-foreground">
      {/* Title bar */}
      <MacTitleBar
        showBackToHome={view !== 'home'}
        onBack={() => setView('home')}
        rightPanelVisible={rightPanelVisible}
        onToggleRightPanel={view === 'workspace' ? () => setRightPanelVisible((v) => !v) : undefined}
      />

      {/* Body */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Sidebar */}
        {sidebarCollapsed ? (
          <SidebarCollapsedRail
            view={view}
            onExpand={() => setSidebarCollapsed(false)}
          />
        ) : view === 'home' ? (
          <HomeSidebar
            onCollapse={() => setSidebarCollapsed(true)}
            onNavigate={handleNavigate}
            activeView={view}
          />
        ) : (
          <WorkspaceSidebar
            onCollapse={() => setSidebarCollapsed(true)}
            humanCount={3}
            onOpenTab={handleOpenTab}
          />
        )}

        {/* Main content area */}
        <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
          {view === 'home' && <HomeMainPanel />}

          {view === 'annotate' && (
            <AnnotatePanel
              onComplete={() => setView('workspace')}
              onCreateWorkspace={() => setWorkspaceModalOpen(true)}
            />
          )}

          {view === 'workspace' && (
            <div className="flex flex-1 min-h-0 overflow-hidden">
              <ResizablePanelGroup direction="horizontal" className="flex-1">
                {/* Chat panel */}
                <ResizablePanel defaultSize={rightPanelVisible ? 45 : 100} minSize={30}>
                  <ChatPanel onOpenTab={handleOpenTab} />
                </ResizablePanel>

                {/* Right panel */}
                {rightPanelVisible && (
                  <>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={55} minSize={30}>
                      <RightPanel
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                        humanCount={3}
                      />
                    </ResizablePanel>
                  </>
                )}
              </ResizablePanelGroup>
            </div>
          )}

          {/* Status bar (workspace only) */}
          {view === 'workspace' && (
            <WorkspaceStatusBar humanCount={3} />
          )}
        </div>
      </div>

      {/* Workspace create modal */}
      <WorkspaceCreateModal
        open={workspaceModalOpen}
        onClose={() => setWorkspaceModalOpen(false)}
        onCreate={(name, color) => {
          console.log('Created workspace:', name, color);
          setView('workspace');
        }}
      />
    </div>
  );
}
