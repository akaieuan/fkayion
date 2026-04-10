'use client';

import { useState } from 'react';
import { Highlighter, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── AnnotatePanel ───────────────────────────────────────────────────

interface AnnotatePanelProps {
  onComplete?: () => void;
  onCreateWorkspace?: () => void;
}

export function AnnotatePanel({ onComplete, onCreateWorkspace }: AnnotatePanelProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 bg-background px-8">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
          <Highlighter className="h-6 w-6 text-muted-foreground" />
        </div>
        <h2 className="mb-1 text-lg font-semibold text-foreground">Annotate & Highlight</h2>
        <p className="text-sm text-muted-foreground max-w-sm">
          Open a PDF to start annotating. Highlights and notes will sync with your workspace and feed into the Human Review queue.
        </p>
      </div>

      {/* Fake annotated snippet */}
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-5 shadow-sm">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          IPCC AR6 Synthesis · p. 12
        </p>
        <div className="mb-3 text-xs leading-relaxed text-foreground">
          Without immediate systemic action, global average temperatures are likely to exceed{' '}
          <mark className="rounded-sm bg-yellow-200 dark:bg-yellow-800 px-0.5">1.5°C above pre-industrial levels</mark>{' '}
          by the early 2030s. The window for limiting warming to this threshold{' '}
          <mark className="rounded-sm bg-violet-100 dark:bg-violet-900/50 px-0.5">is narrowing rapidly</mark>.
        </div>
        <div className="flex gap-2">
          <div className="rounded-full bg-yellow-100 dark:bg-yellow-900/40 px-2 py-0.5 text-[10px] text-yellow-700 dark:text-yellow-300">
            Temperature threshold
          </div>
          <div className="rounded-full bg-violet-100 dark:bg-violet-900/40 px-2 py-0.5 text-[10px] text-violet-700 dark:text-violet-300">
            Urgency signal
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onComplete}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
        >
          <Check className="h-4 w-4" />
          Complete
        </button>
        <button
          onClick={onCreateWorkspace}
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          Create Workspace
        </button>
      </div>
    </div>
  );
}

// ─── WorkspaceStatusBar ───────────────────────────────────────────────

interface WorkspaceStatusBarProps {
  humanCount?: number;
  model?: string;
}

export function WorkspaceStatusBar({
  humanCount = 3,
  model = 'Claude Sonnet',
}: WorkspaceStatusBarProps) {
  return (
    <div className="flex h-7 shrink-0 items-center justify-between border-t border-border bg-background px-4">
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
        <span className="text-[10px] text-muted-foreground">
          {humanCount} item{humanCount !== 1 ? 's' : ''} in Human queue
        </span>
      </div>
      <span className="text-[10px] text-muted-foreground">{model}</span>
    </div>
  );
}

// ─── WorkspaceCreateModal ─────────────────────────────────────────────

interface WorkspaceCreateModalProps {
  open: boolean;
  onClose: () => void;
  onCreate?: (name: string, color: string) => void;
}

const COLOR_OPTIONS = [
  '#2d6a4f', '#1b4332', '#40916c', '#74c69d',
  '#1d4e89', '#0077b6', '#7b2d8b', '#9d4edd',
];

export function WorkspaceCreateModal({ open, onClose, onCreate }: WorkspaceCreateModalProps) {
  const [name, setName] = useState('New Workspace');
  const [color, setColor] = useState(COLOR_OPTIONS[0]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-80 rounded-2xl border border-border bg-background p-6 shadow-xl">
        <h2 className="mb-4 text-base font-semibold text-foreground">Create Workspace</h2>

        <label className="mb-1 block text-xs font-medium text-foreground">Name</label>
        <input
          className="mb-4 w-full rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-ring"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="mb-2 block text-xs font-medium text-foreground">Color</label>
        <div className="mb-5 flex flex-wrap gap-2">
          {COLOR_OPTIONS.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={cn(
                'h-6 w-6 rounded-full transition-transform hover:scale-110',
                color === c ? 'ring-2 ring-offset-2 ring-ring' : '',
              )}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-border py-2 text-sm text-muted-foreground hover:bg-muted transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => { onCreate?.(name, color); onClose(); }}
            className="flex-1 rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
