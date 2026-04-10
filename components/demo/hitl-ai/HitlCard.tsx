'use client';

import { useState } from 'react';
import {
  ChevronDown, ChevronRight, Search, AlertCircle, PenLine,
  Check, X, ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { RightTab } from './types';

export interface HitlCardConfig {
  id: string;
  kind: 'search' | 'review' | 'write';
  title: string;
  subtitle: string;
  steps: { label: string; done: boolean }[];
  runLabel: string;
  openTab: RightTab;
  editPlaceholder?: string;
}

const KIND_META = {
  search: {
    icon: Search,
    color: 'text-violet-500',
    border: 'border-violet-200 dark:border-violet-900',
    bg: 'bg-violet-50 dark:bg-violet-950/30',
    badge: 'bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300',
  },
  review: {
    icon: AlertCircle,
    color: 'text-amber-500',
    border: 'border-amber-200 dark:border-amber-900',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    badge: 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300',
  },
  write: {
    icon: PenLine,
    color: 'text-blue-500',
    border: 'border-blue-200 dark:border-blue-900',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    badge: 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300',
  },
};

interface HitlCardProps {
  config: HitlCardConfig;
  onOpenTab?: (tab: RightTab) => void;
}

export function HitlCard({ config, onOpenTab }: HitlCardProps) {
  const [state, setState] = useState<'idle' | 'expanded' | 'confirmed' | 'dismissed'>('idle');
  const [note, setNote] = useState('');

  const meta = KIND_META[config.kind];
  const Icon = meta.icon;

  if (state === 'dismissed') {
    return (
      <div className="my-1 rounded-lg border border-dashed border-border px-3 py-2 text-xs italic text-muted-foreground">
        Dismissed — {config.title}
      </div>
    );
  }

  if (state === 'confirmed') {
    return (
      <div className={cn('my-1 flex items-center gap-2 rounded-lg border px-3 py-2 text-xs', meta.border, meta.bg)}>
        <Check className={cn('h-3.5 w-3.5', meta.color)} />
        <span className={cn('font-medium', meta.color)}>{config.runLabel}</span>
        <span className="text-muted-foreground">· confirmed</span>
      </div>
    );
  }

  return (
    <div className={cn('my-1 rounded-lg border text-xs', meta.border, meta.bg)}>
      {/* Header row */}
      <button
        onClick={() => setState((s) => (s === 'expanded' ? 'idle' : 'expanded'))}
        className="flex w-full items-center gap-2 px-3 py-2.5"
      >
        <Icon className={cn('h-3.5 w-3.5 shrink-0', meta.color)} />
        <div className="flex-1 min-w-0 text-left">
          <span className="font-medium text-foreground">{config.title}</span>
          <span className="ml-2 text-muted-foreground">{config.subtitle}</span>
        </div>
        {state === 'expanded' ? (
          <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        ) : (
          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        )}
      </button>

      {state === 'expanded' && (
        <div className="border-t border-inherit px-3 pb-3 pt-2">
          {/* Steps */}
          <div className="mb-3 space-y-1.5">
            {config.steps.map((step, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={cn(
                  'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[9px]',
                  step.done
                    ? cn('border-transparent', meta.badge)
                    : 'border-border text-muted-foreground',
                )}>
                  {step.done ? <Check className="h-2.5 w-2.5" /> : i + 1}
                </div>
                <span className={step.done ? 'text-muted-foreground line-through' : 'text-foreground'}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          {/* Editable note */}
          {config.editPlaceholder && (
            <textarea
              className="mb-3 w-full resize-none rounded-md border border-border bg-background px-2.5 py-2 text-xs outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-ring"
              rows={2}
              placeholder={config.editPlaceholder}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          )}

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setState('confirmed')}
              className={cn(
                'flex items-center gap-1.5 rounded-md px-3 py-1.5 font-medium transition-opacity hover:opacity-80',
                meta.badge,
              )}
            >
              <Check className="h-3 w-3" />
              {config.runLabel}
            </button>

            {onOpenTab && (
              <button
                onClick={() => onOpenTab(config.openTab)}
                className="flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <ExternalLink className="h-3 w-3" />
                Open
              </button>
            )}

            <button
              onClick={() => setState('dismissed')}
              className="ml-auto flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export const DEMO_HITL_CARDS: HitlCardConfig[] = [
  {
    id: 'h1',
    kind: 'search',
    title: '177 results found',
    subtitle: '"climate adaptation strategies"',
    steps: [
      { label: 'Search complete', done: true },
      { label: 'Refine query', done: false },
      { label: 'Update panel', done: false },
    ],
    runLabel: 'Run refined search',
    openTab: 'search',
    editPlaceholder: 'Add query notes or constraints…',
  },
  {
    id: 'h2',
    kind: 'review',
    title: 'Citation needs verification',
    subtitle: 'Table 3 · IPCC 2023 p. 12',
    steps: [
      { label: 'Flagged by agent', done: true },
      { label: 'Add note', done: false },
      { label: 'Resume writing', done: false },
    ],
    runLabel: 'Confirm & continue',
    openTab: 'human',
    editPlaceholder: 'Add verification note…',
  },
  {
    id: 'h3',
    kind: 'write',
    title: 'Section 2 updated',
    subtitle: '2 new citations added',
    steps: [
      { label: 'Citation 1 inserted', done: true },
      { label: 'Citation 2 inserted', done: true },
      { label: 'Confirm to lock', done: false },
    ],
    runLabel: 'Lock & continue',
    openTab: 'write',
  },
];
