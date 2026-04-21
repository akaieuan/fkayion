'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { PanelImperativeHandle } from 'react-resizable-panels';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';
import { useMediaQuery } from '@/components/demo/research-os/use-media-query';

import { MacTitleBar } from '@/components/demo/research-os/MacTitleBar';
import { HomeSidebar } from '@/components/demo/research-os/HomeSidebar';
import { WorkspaceSidebar } from '@/components/demo/research-os/WorkspaceSidebar';
import { HomeMainPanel } from '@/components/demo/research-os/HomeMainPanel';
import { ChatPanel } from '@/components/demo/research-os/ChatPanel';
import { RightPanel } from '@/components/demo/research-os/RightPanel';
import { AnnotatePanel, WorkspaceStatusBar, WorkspaceCreateModal } from '@/components/demo/research-os/Misc';
import { TOPIC_THREADS, FALLBACK_THREAD } from '@/components/demo/research-os/data';
import type { TopicMessage } from '@/components/demo/research-os/data';
import type { ViewMode, RightTab } from '@/components/demo/research-os/types';

export default function ResearchOSPage() {
  const wideWorkspace = useMediaQuery('(min-width: 1024px)');
  const [view, setView] = useState<ViewMode>('home');
  const [activeTab, setActiveTab] = useState<RightTab>('human');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [rightPanelVisible, setRightPanelVisible] = useState(true);
  const [workspaceModalOpen, setWorkspaceModalOpen] = useState(false);
  const [libraryPanelOpen, setLibraryPanelOpen] = useState(false);
  const [chatComposerInject, setChatComposerInject] = useState<{ id: number; text: string } | null>(
    null,
  );
  const [chatKey, setChatKey] = useState(0);
  const [initialMessages, setInitialMessages] = useState<TopicMessage[] | null>(null);

  const chatPanelRef = useRef<PanelImperativeHandle | null>(null);
  const prevRightPanelVisible = useRef(rightPanelVisible);

  /** Only snap the split when the right stack is shown again — not on every tab switch (avoids jerky resizing). */
  useEffect(() => {
    const wasHidden = !prevRightPanelVisible.current;
    prevRightPanelVisible.current = rightPanelVisible;
    if (!rightPanelVisible || !wasHidden) return;
    const id = requestAnimationFrame(() => {
      chatPanelRef.current?.resize(30);
    });
    return () => cancelAnimationFrame(id);
  }, [rightPanelVisible]);

  const handleNavigate = (v: ViewMode) => setView(v);
  const handleOpenTab = (tab: RightTab) => {
    setActiveTab(tab);
    if (!rightPanelVisible) setRightPanelVisible(true);
  };

  const goWorkspace = (tab: RightTab) => {
    setView('workspace');
    handleOpenTab(tab);
  };

  const libraryTagsToComposerText = (items: { name: string }[]) =>
    `${items.map((i) => `[Library: ${i.name}]`).join(' ')}\n\n`;

  const sendLibrarySelectionToChat = (items: { id: string; name: string }[]) => {
    setChatComposerInject({
      id: Date.now(),
      text: libraryTagsToComposerText(items),
    });
  };

  const clearChatComposerInject = useCallback(() => setChatComposerInject(null), []);

  const handleHomeSend = useCallback((text: string) => {
    const thread = TOPIC_THREADS[text];
    if (thread) {
      setInitialMessages(thread);
    } else {
      setInitialMessages([
        { role: 'user', content: text },
        ...FALLBACK_THREAD,
      ]);
    }
    setChatKey((k) => k + 1);
    setView('workspace');
  }, []);

  return (
    <div className="flex h-full flex-col bg-background text-foreground">
      {/* Title bar */}
      <MacTitleBar
        showBackToHome={view !== 'home'}
        onBack={() => setView('home')}
        sidebarCollapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed((c) => !c)}
        showSidebarToggle={view === 'home' || view === 'workspace' || view === 'annotate'}
        rightPanelMenu={
          view === 'workspace'
            ? {
                visible: rightPanelVisible,
                activeTab,
                onSelectTab: (tab) => {
                  setActiveTab(tab);
                  setRightPanelVisible(true);
                },
                onHide: () => setRightPanelVisible(false),
                humanCount: 3,
              }
            : undefined
        }
      />

      {/* Body */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Sidebar */}
        {sidebarCollapsed ? null : view === 'home' ? (
          <HomeSidebar
            onNavigate={handleNavigate}
            libraryPanelOpen={libraryPanelOpen}
            onOpenLibrary={() => setLibraryPanelOpen((o) => !o)}
            onOpenWorkspaceTool={goWorkspace}
          />
        ) : (
          <WorkspaceSidebar
            humanCount={3}
            onOpenTab={handleOpenTab}
            onOpenFile={() => handleOpenTab('read')}
          />
        )}

        {/* Main content area */}
        <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
          {view === 'home' && (
            <HomeMainPanel
              libraryOpen={libraryPanelOpen}
              onLibraryOpenChange={setLibraryPanelOpen}
              onOpenInReader={() => goWorkspace('read')}
              onSend={handleHomeSend}
            />
          )}

          {view === 'annotate' && (
            <AnnotatePanel
              onComplete={() => setView('workspace')}
              onCreateWorkspace={() => setWorkspaceModalOpen(true)}
            />
          )}

          {view === 'workspace' && (
            <div className="flex flex-1 min-h-0 overflow-hidden">
              <ResizablePanelGroup
                direction={wideWorkspace ? 'horizontal' : 'vertical'}
                className="flex-1"
              >
                <ResizablePanel
                  panelRef={chatPanelRef}
                  defaultSize={rightPanelVisible ? 30 : 100}
                  minSize={wideWorkspace ? 22 : 18}
                >
                  <ChatPanel
                    key={chatKey}
                    onOpenTab={handleOpenTab}
                    composerInject={chatComposerInject}
                    onComposerInjectConsumed={clearChatComposerInject}
                    initialMessages={initialMessages ?? undefined}
                  />
                </ResizablePanel>

                {rightPanelVisible && (
                  <>
                    <ResizableHandle withHandle={wideWorkspace} />
                    <ResizablePanel
                      defaultSize={70}
                      minSize={wideWorkspace ? 28 : 22}
                    >
                      <RightPanel
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                        humanCount={3}
                        onLibrarySendToChat={sendLibrarySelectionToChat}
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
