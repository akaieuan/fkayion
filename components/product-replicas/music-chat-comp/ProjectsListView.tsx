'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Project } from './types';
import { PROJECT_COLORS } from './data/constants';
import { uid } from './uid';

const TYPE_LABELS: Record<string, string> = {
  release: 'Single Release',
  ep: 'EP',
  album: 'Album',
  campaign: 'Campaign',
  analysis: 'Analysis',
  general: 'General',
};

interface Props {
  projects: Project[];
  onOpenProject: (id: string) => void;
  onCreateProject: (p: Project) => void;
}

export function ProjectsListView({ projects, onOpenProject, onCreateProject }: Props) {
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [type, setType] = useState<Project['type']>('release');
  const [color, setColor] = useState(PROJECT_COLORS[0]);

  const handleCreate = () => {
    if (!name.trim()) return;
    onCreateProject({
      id: uid(),
      name: name.trim(),
      color,
      description: desc.trim(),
      type,
      artists: [],
      files: [],
      chats: [],
      artifactIds: [],
      createdAt: 'Just now',
      updatedAt: 'Just now',
    });
    setName('');
    setDesc('');
    setType('release');
    setColor(PROJECT_COLORS[0]);
    setCreating(false);
  };

  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="max-w-[1000px] mx-auto px-7 py-5 pb-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-normal text-foreground tracking-tight">Projects</h1>
            <p className="text-[11px] text-muted-foreground/60 mt-0">
              {projects.length} projects
            </p>
          </div>
          <button
            onClick={() => setCreating(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium cursor-pointer border-none"
          >
            <Plus size={13} />
            New project
          </button>
        </div>

        {/* Create flow */}
        {creating && (
          <div className="bg-card border border-primary/25 rounded-lg shadow-sm px-6 py-5 mb-4 animate-in fade-in duration-150">
            <div className="text-sm font-medium text-foreground mb-3.5">New Project</div>
            <div className="flex gap-4">
              <div className="flex-1 flex flex-col gap-2.5">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Project name..."
                  autoFocus
                  className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground text-[13px] outline-none"
                />
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Description (optional)..."
                  rows={2}
                  className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground text-xs outline-none resize-none"
                />
              </div>
              <div className="w-[200px] flex flex-col gap-2.5">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground/60 mb-1">
                    Type
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    {(
                      ['release', 'ep', 'album', 'campaign', 'analysis', 'general'] as const
                    ).map((tp) => (
                      <button
                        key={tp}
                        onClick={() => setType(tp)}
                        className={cn(
                          'px-2.5 py-1 text-[10px] rounded-full border cursor-pointer',
                          type === tp
                            ? 'font-medium bg-primary/10 border-primary/25 text-primary'
                            : 'font-normal bg-card border-border text-muted-foreground'
                        )}
                      >
                        {TYPE_LABELS[tp]}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground/60 mb-1">
                    Color
                  </div>
                  <div className="flex gap-1">
                    {PROJECT_COLORS.map((c) => (
                      <button
                        key={c}
                        onClick={() => setColor(c)}
                        className="w-[18px] h-[18px] rounded-[5px] cursor-pointer p-0"
                        style={{
                          background: c,
                          border:
                            color === c
                              ? '2px solid hsl(var(--foreground))'
                              : '2px solid transparent',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-3.5 justify-end">
              <button
                onClick={() => setCreating(false)}
                className="px-4 py-1.5 rounded-lg bg-card border border-border text-foreground text-sm cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!name.trim()}
                className={cn(
                  'px-5 py-1.5 rounded-lg text-sm border-none',
                  name.trim()
                    ? 'bg-primary text-primary-foreground cursor-pointer'
                    : 'bg-border text-muted-foreground/60 cursor-default'
                )}
              >
                Create
              </button>
            </div>
          </div>
        )}

        {/* Projects grid */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-2.5">
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => onOpenProject(p.id)}
              className="bg-card border border-border rounded-lg shadow-sm px-[18px] py-4 cursor-pointer text-left flex flex-col gap-2 hover:border-border/80 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded shrink-0"
                  style={{ background: p.color }}
                />
                <div className="flex-1 text-[13px] font-medium text-foreground truncate">
                  {p.name}
                </div>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-border text-muted-foreground/60 shrink-0">
                  {TYPE_LABELS[p.type]}
                </span>
              </div>
              {p.description && (
                <div className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
                  {p.description}
                </div>
              )}
              <div className="flex gap-1 flex-wrap">
                {p.artists.slice(0, 3).map((a) => (
                  <span
                    key={a}
                    className="text-[10px] px-1.5 py-0.5 rounded-full"
                    style={{
                      background: p.color + '18',
                      color: p.color,
                    }}
                  >
                    {a}
                  </span>
                ))}
                {p.artists.length > 3 && (
                  <span className="text-[9px] text-muted-foreground/60">
                    +{p.artists.length - 3}
                  </span>
                )}
              </div>
              <div className="flex gap-3 text-[10px] text-muted-foreground/60 border-t border-border pt-2">
                <span>{p.chats.length} chats</span>
                <span>{p.files.length} files</span>
                <span>{p.artifactIds.length} artifacts</span>
                <span className="ml-auto font-mono">{p.updatedAt}</span>
              </div>
            </button>
          ))}

          {!creating && (
            <button
              onClick={() => setCreating(true)}
              className="flex flex-col items-center justify-center gap-1.5 min-h-[140px] px-[18px] py-6 rounded-lg border border-dashed border-border bg-transparent cursor-pointer hover:border-border/80 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center">
                <Plus size={16} className="text-muted-foreground/60" />
              </div>
              <span className="text-xs text-muted-foreground/60">New project</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
