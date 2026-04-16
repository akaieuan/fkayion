'use client';

import { BarChart3, Globe, Users, Mail, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Artist } from './types';
import { InputBox } from './InputBox';

interface LandingPageProps {
  input: string;
  contextArtists: string[];
  atMenu: boolean;
  filteredArtists: Artist[];
  atIndex: number;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
  onRemoveContext: (name: string) => void;
  onSelectArtist: (name: string) => void;
  onSetInput: (val: string) => void;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
}

const SUGGESTIONS = [
  { icon: BarChart3, label: 'Streaming', prompt: "How are Overmono's saves performing?" },
  { icon: Globe, label: 'Social', prompt: "Show Overmono's social presence and top content" },
  { icon: Users, label: 'Creators', prompt: 'Find creators for UK Bass music promotion' },
  { icon: Mail, label: 'Campaigns', prompt: "Draft creator outreach for Overmono's latest release" },
  { icon: TrendingUp, label: 'Trends', prompt: 'Show trending artists and performance' },
];

export function LandingPage({
  input,
  contextArtists,
  atMenu,
  filteredArtists,
  atIndex,
  onInputChange,
  onKeyDown,
  onSend,
  onRemoveContext,
  onSelectArtist,
  onSetInput,
  inputRef,
}: LandingPageProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 gap-5">
      <div className="text-[28px] font-light text-muted-foreground tracking-tight">
        Hi Joe, what can I help you with?
      </div>
      <InputBox
        landing
        input={input}
        loading={false}
        contextArtists={contextArtists}
        atMenu={atMenu}
        filteredArtists={filteredArtists}
        atIndex={atIndex}
        onInputChange={onInputChange}
        onKeyDown={onKeyDown}
        onSend={onSend}
        onRemoveContext={onRemoveContext}
        onSelectArtist={onSelectArtist}
        inputRef={inputRef}
      />
      <div className="flex gap-2 flex-wrap justify-center mt-1">
        {SUGGESTIONS.map((s) => (
          <button
            key={s.label}
            onClick={() => onSetInput(s.prompt)}
            className="flex items-center gap-1.5 rounded-full border border-border bg-transparent text-muted-foreground text-[13px] px-4 py-2 cursor-pointer hover:bg-card hover:text-foreground transition-colors"
          >
            <s.icon size={14} className="text-muted-foreground/60" />
            {s.label}
          </button>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="mx-auto max-w-lg text-[13px] leading-relaxed text-muted-foreground">
          This is a demo: a UI playground with mock roster and streaming data, not a live product. It&apos;s
          built to stress project-style surfaces: dashboards, chat blocks, and artifact panels, and to see
          how dense music-industry layouts read when rich responses stack together. The point is interface
          and composition, playing with chrome and artifacts, not real analytics.
        </p>
      </div>
    </div>
  );
}
