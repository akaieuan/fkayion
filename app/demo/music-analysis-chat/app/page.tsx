'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { ArrowLeft, Sun, Moon, PanelRight } from 'lucide-react';
import type { Message, ArtifactData, Block, Project } from '@/components/product-replicas/music-chat-comp/types';
import { uid } from '@/components/product-replicas/music-chat-comp/uid';
import { ART } from '@/components/product-replicas/music-chat-comp/data/artists';
import { SEED_PROJECTS } from '@/components/product-replicas/music-chat-comp/data/projects';
import { api } from '@/components/product-replicas/music-chat-comp/mock-api';
import { Sidebar } from '@/components/product-replicas/music-chat-comp/Sidebar';
import { ChatView } from '@/components/product-replicas/music-chat-comp/ChatView';
import { AnalyticsView } from '@/components/product-replicas/music-chat-comp/AnalyticsView';
import { ArtistsView } from '@/components/product-replicas/music-chat-comp/ArtistsView';
import { ArtifactsGallery } from '@/components/product-replicas/music-chat-comp/ArtifactsGallery';
import { ArtifactPanel } from '@/components/product-replicas/music-chat-comp/ArtifactPanel';
import { ProjectsListView } from '@/components/product-replicas/music-chat-comp/ProjectsListView';
import { ProjectDashboard } from '@/components/product-replicas/music-chat-comp/ProjectDashboard';

type View = 'chat' | 'analytics' | 'artists' | 'artifacts' | 'projects';

export default function MusicAnalysisChatPage() {
  const { theme, setTheme } = useTheme();
  /*
   * next-themes reads the stored preference in an effect, so `theme` is
   * undefined during the server render and resolved by the time the client
   * hydrates. Choosing the icon from it directly makes the two passes
   * disagree, which React reports as a hydration failure and recovers from
   * by throwing the whole tree away and re-rendering on the client. Holding
   * the slot until mount is what the site header does for the same reason.
   */
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const [view, setView] = useState<View>('chat');
  const [msgs, setMsgs] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState<ArtifactData | null>(null);
  const [sExp, setSExp] = useState(true);
  const [atMenu, setAtMenu] = useState(false);
  const [atFilter, setAtFilter] = useState('');
  const [contextArtists, setContextArtists] = useState<string[]>([]);
  const [atIndex, setAtIndex] = useState(0);
  const [projects, setProjects] = useState<Project[]>(SEED_PROJECTS);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [panelW, setPanelW] = useState(520);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const filteredArtists = ART.filter(
    (a) => a.name.toLowerCase().includes(atFilter.toLowerCase()) && !contextArtists.includes(a.name),
  );
  const panel = active !== null && view === 'chat';
  const activeProject = activeProjectId ? projects.find((p) => p.id === activeProjectId) || null : null;

  const send = useCallback(async () => {
    const txt = input.trim();
    if (!txt || loading) return;
    setInput('');
    setAtMenu(false);
    setAtFilter('');
    if (inputRef.current) inputRef.current.style.height = 'auto';
    setView('chat');
    const u: Message = {
      id: uid(),
      role: 'user',
      text: txt,
      ts: Date.now(),
      contextArtists: contextArtists.length > 0 ? [...contextArtists] : undefined,
    };
    setMsgs((m) => [...m, u]);
    setContextArtists([]);
    setLoading(true);
    try {
      const fullQuery = contextArtists.length > 0 ? `${contextArtists.join(', ')}: ${txt}` : txt;
      const r = await api(fullQuery);
      setMsgs((m) => [
        ...m,
        {
          id: uid(),
          role: 'assistant',
          text: r.text,
          blocks: r.blocks as Block[],
          artifacts: (r as { artifacts?: ArtifactData[] }).artifacts,
          ts: Date.now(),
        },
      ]);
    } catch {
      setMsgs((m) => [...m, { id: uid(), role: 'assistant', text: 'Something went wrong.', ts: Date.now() }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, contextArtists]);

  const askChat = (prompt: string) => {
    setInput(prompt);
    setView('chat');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInput(val);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 140) + 'px';
    const lastAt = val.lastIndexOf('@');
    if (lastAt !== -1 && !val.slice(lastAt + 1).includes(' ')) {
      setAtMenu(true);
      setAtFilter(val.slice(lastAt + 1));
      setAtIndex(0);
      return;
    }
    setAtMenu(false);
    setAtFilter('');
  };

  const selectArtist = (name: string) => {
    setInput(input.slice(0, input.lastIndexOf('@')));
    setContextArtists((prev) => [...prev, name]);
    setAtMenu(false);
    setAtFilter('');
    inputRef.current?.focus();
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (atMenu && filteredArtists.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setAtIndex((i) => Math.min(i + 1, filteredArtists.length - 1));
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setAtIndex((i) => Math.max(i - 1, 0));
        return;
      }
      if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        selectArtist(filteredArtists[atIndex].name);
        return;
      }
      if (e.key === 'Escape') {
        setAtMenu(false);
        return;
      }
    }
    if (e.key === 'Enter' && !e.shiftKey && !atMenu) {
      e.preventDefault();
      send();
    }
  };

  const openProject = (id: string) => {
    setActiveProjectId(id);
    setView('projects');
    setActive(null);
  };

  const handleStartProjectChat = (_projectId: string, title?: string) => {
    setActiveProjectId(null);
    setMsgs([]);
    setActive(null);
    setView('chat');
    if (title) setInput(title);
  };

  const showProjectDashboard = view === 'projects' && activeProject !== null;
  const showProjectsList = view === 'projects' && activeProject === null;

  return (
    <div className="flex h-full flex-col bg-background text-foreground">
      <style>{`*::-webkit-scrollbar{width:4px}*::-webkit-scrollbar-thumb{background:hsl(var(--border));border-radius:2px}*::-webkit-scrollbar-track{background:transparent}`}</style>

      {/* Mac-style title bar */}
      <header className="flex h-11 shrink-0 items-center justify-between border-b border-border bg-background/80 px-3 backdrop-blur">
        <Link
          href="/demo/music-analysis-chat"
          className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Write-up</span>
        </Link>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            {!mounted ? (
              <span className="block h-4 w-4" />
            ) : theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          {view === 'chat' && active && (
            <button
              onClick={() => setActive(null)}
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <PanelRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar
          view={view}
          sExp={sExp}
          projects={projects}
          activeProjectId={activeProjectId}
          onToggleSidebar={() => setSExp((o) => !o)}
          onSetView={(v: View) => {
            setView(v);
            setActive(null);
            if (v !== 'projects') setActiveProjectId(null);
          }}
          onNewChat={() => {
            setView('chat');
            setMsgs([]);
            setActive(null);
            setActiveProjectId(null);
          }}
          onOpenProject={openProject}
        />

        {view === 'analytics' && <AnalyticsView onAskChat={askChat} />}
        {view === 'artists' && <ArtistsView onAskChat={askChat} />}
        {view === 'artifacts' && <ArtifactsGallery />}

        {showProjectsList && (
          <ProjectsListView
            projects={projects}
            onOpenProject={openProject}
            onCreateProject={(p: Project) => setProjects((prev) => [p, ...prev])}
          />
        )}

        {showProjectDashboard && activeProject && (
          <ProjectDashboard
            project={activeProject}
            onBack={() => setActiveProjectId(null)}
            onStartChat={handleStartProjectChat}
          />
        )}

        {view === 'chat' && (
          <ChatView
            msgs={msgs}
            input={input}
            loading={loading}
            active={active}
            contextArtists={contextArtists}
            atMenu={atMenu}
            filteredArtists={filteredArtists}
            atIndex={atIndex}
            onInputChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            onSend={send}
            onRemoveContext={(name: string) => setContextArtists((prev) => prev.filter((n) => n !== name))}
            onSelectArtist={selectArtist}
            onSetInput={setInput}
            onSetActive={setActive}
            onAskChat={askChat}
            inputRef={inputRef}
          />
        )}

        {panel && active && (
          <ArtifactPanel active={active} width={panelW} onClose={() => setActive(null)} onAskChat={askChat} onResize={setPanelW} />
        )}
      </div>
    </div>
  );
}
