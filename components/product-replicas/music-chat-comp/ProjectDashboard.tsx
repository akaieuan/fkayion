'use client';

import { cn } from '@/lib/utils';
import {
  ArrowLeft,
  Layers,
  MessageCircle,
  Plus,
  ArrowUp,
  Sparkles,
} from 'lucide-react';
import type { Project } from './types';

const TYPE_LABELS: Record<string, string> = {
  release: 'Single Release',
  ep: 'EP',
  album: 'Album',
  campaign: 'Campaign',
  analysis: 'Analysis',
  general: 'General',
};

const FILE_COLORS: Record<string, string> = {
  audio: '#FF453A',
  image: '#30D158',
  pdf: '#FF9F0A',
  csv: '#0A84FF',
  doc: '#BF5AF2',
  archive: '#64D2FF',
};

const QUICK_START: Record<string, { l: string; p: string }[]> = {
  release: [
    { l: 'Pre-save strategy', p: 'Plan a pre-save campaign strategy' },
    { l: 'Playlist pitch', p: 'Draft a playlist pitch brief' },
    { l: 'Creator brief', p: 'Draft creator outreach for this release' },
  ],
  ep: [
    { l: 'Rollout timeline', p: 'Plan EP rollout timeline' },
    { l: 'Single sequence', p: 'Decide single drop order' },
    { l: 'Content calendar', p: 'Build social content calendar' },
  ],
  album: [
    { l: 'Release strategy', p: 'Plan album release strategy' },
    { l: 'Press outreach', p: 'Draft press kit and media pitch' },
    { l: 'Pre-order campaign', p: 'Set up pre-order campaign' },
  ],
  campaign: [
    { l: 'Find creators', p: 'Find creators for this campaign' },
    { l: 'Draft outreach', p: 'Draft outreach emails' },
    { l: 'Analyze results', p: 'Analyze campaign performance' },
  ],
  analysis: [
    { l: 'Save rate analysis', p: 'Deep dive on save rates' },
    { l: 'Social vs streaming', p: 'Correlate social and streaming data' },
    { l: 'Audience overlap', p: 'Analyze audience overlap between artists' },
  ],
  general: [
    { l: 'Brainstorm', p: 'Brainstorm ideas' },
    { l: 'Research', p: 'Research a topic' },
  ],
};

interface Props {
  project: Project;
  onBack: () => void;
  onStartChat: (projectId: string, title?: string) => void;
}

export function ProjectDashboard({ project: p, onBack, onStartChat }: Props) {
  const suggestions = QUICK_START[p.type] || QUICK_START.general;

  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="flex min-h-full">
        {/* Main content */}
        <div className="flex-1 px-7 py-5 pb-8 min-w-0">
          {/* Back link */}
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 mb-3.5 text-xs text-muted-foreground hover:text-foreground bg-transparent border-none cursor-pointer p-0 transition-colors"
          >
            <ArrowLeft size={14} />
            All projects
          </button>

          {/* Header */}
          <div className="flex items-start gap-3 mb-1.5">
            <div
              className="w-3 h-3 rounded mt-1.5 shrink-0"
              style={{ background: p.color }}
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-[22px] font-medium text-foreground tracking-tight m-0">
                  {p.name}
                </h1>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-border text-muted-foreground/60">
                  {TYPE_LABELS[p.type]}
                </span>
              </div>
              {p.description && (
                <p className="text-xs text-muted-foreground leading-relaxed mt-1.5 whitespace-pre-wrap break-words">
                  {p.description}
                </p>
              )}
            </div>
          </div>

          {/* Artist badges */}
          <div className="flex gap-1 flex-wrap mb-5 pl-6">
            {p.artists.map((a) => (
              <span
                key={a}
                className="text-[10px] px-2 py-0.5 rounded-full"
                style={{ background: p.color + '18', color: p.color }}
              >
                {a}
              </span>
            ))}
          </div>

          {/* Start chat card */}
          <button
            onClick={() => onStartChat(p.id)}
            className="w-full bg-card border border-border rounded-lg shadow-sm overflow-hidden mb-5 cursor-pointer text-left"
          >
            <div className="flex items-center w-full px-[18px] py-3.5 gap-2">
              <span className="flex-1 text-[13px] text-muted-foreground/60">
                Start a new chat in this project...
              </span>
              <div className="w-[26px] h-[26px] rounded-lg bg-border flex items-center justify-center">
                <ArrowUp size={13} className="text-muted-foreground/60" />
              </div>
            </div>
          </button>

          {/* Chats */}
          {p.chats.length > 0 && (
            <div className="mb-5">
              <div className="text-xs font-medium text-foreground mb-2">Chats</div>
              <div className="flex flex-col gap-1">
                {p.chats.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => onStartChat(p.id, c.title)}
                    className="flex items-center gap-2.5 px-3.5 py-2.5 bg-card border border-border rounded-lg shadow-sm cursor-pointer hover:bg-card/80 transition-colors text-left w-full"
                  >
                    <MessageCircle size={14} className="text-muted-foreground/60" />
                    <div className="flex-1">
                      <div className="text-xs font-medium text-foreground">{c.title}</div>
                    </div>
                    <span className="text-[10px] text-muted-foreground/60 font-mono">
                      {c.msgCount} msgs
                    </span>
                    <span className="text-[10px] text-muted-foreground/60 font-mono">
                      {c.time}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick start */}
          <div className="bg-card border border-border rounded-lg shadow-sm px-[18px] py-3.5">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground/60 mb-2">
              Quick Start
            </div>
            <div className="text-xs text-muted-foreground leading-relaxed mb-2.5">
              Start a chat to keep conversations organized and re-use project knowledge.
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {suggestions.map((s) => (
                <button
                  key={s.l}
                  onClick={() => onStartChat(p.id, s.l)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs bg-card border border-border text-foreground cursor-pointer hover:bg-card/80 transition-colors"
                >
                  <Sparkles size={11} className="text-primary" />
                  {s.l}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="w-[300px] shrink-0 border-l border-border p-5 overflow-auto">
          {/* Project Context */}
          <div className="bg-card border border-border rounded-lg shadow-sm px-4 py-3.5 mb-4">
            <div className="flex items-center gap-1.5 mb-2">
              <Layers size={14} className="text-primary" />
              <span className="text-xs font-medium text-foreground">Project Context</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed mb-2">
              Files and data added here are available to Agatha in every chat within this project.
            </p>
            <div className="text-[10px] text-muted-foreground/60 leading-relaxed">
              {p.files.length > 0
                ? `${p.files.length} files loaded as context.`
                : 'Add files to give Agatha context.'}
            </div>
          </div>

          {/* Memory */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-foreground">Memory</span>
              <span className="text-[10px] text-muted-foreground/60">Only you</span>
            </div>
            <div className="text-[11px] text-muted-foreground/60 leading-relaxed">
              Project memory will build up as you chat. Agatha will remember key decisions and
              context.
            </div>
          </div>

          {/* Files */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-foreground">Files</span>
              <button className="bg-transparent border-none cursor-pointer p-0 flex">
                <Plus size={13} className="text-muted-foreground/60" />
              </button>
            </div>
            {p.files.length === 0 ? (
              <div className="p-3 border border-dashed border-border rounded-lg text-center">
                <div className="text-[11px] text-muted-foreground/60">No files yet</div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-1.5">
                {p.files.map((f) => {
                  const fColor = FILE_COLORS[f.type] || 'hsl(var(--muted-foreground))';
                  return (
                    <div
                      key={f.id}
                      className="bg-card rounded-lg border border-border px-3 py-2.5 flex flex-col gap-1"
                    >
                      <div className="text-[11px] font-medium text-foreground truncate">
                        {f.name}
                      </div>
                      <div className="text-[10px] text-muted-foreground/60">{f.size}</div>
                      <span
                        className="text-[8px] uppercase px-1.5 py-0.5 rounded-full self-start"
                        style={{ background: fColor + '18', color: fColor }}
                      >
                        {f.type}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Artifacts */}
          {p.artifactIds.length > 0 && (
            <div>
              <div className="text-xs font-medium text-foreground mb-2">Artifacts</div>
              <div className="flex flex-col gap-1">
                {p.artifactIds.map((aid, i) => (
                  <div
                    key={aid}
                    className="flex items-center gap-2 px-2.5 py-2 bg-card rounded-lg border border-border"
                  >
                    <Layers size={12} className="text-primary" />
                    <span className="text-[11px] text-foreground font-medium">
                      Artifact {i + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dates */}
          <div className="mt-4 pt-3 border-t border-border text-[10px] text-muted-foreground/60 flex flex-col gap-1">
            <div>Created: {p.createdAt}</div>
            <div>Last updated: {p.updatedAt}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
