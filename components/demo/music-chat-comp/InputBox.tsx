'use client';

import { useState, useRef } from 'react';
import { Plus, ArrowUp, X, AtSign, Paperclip, Image, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Artist } from './types';
import { ART } from './data/artists';

interface InputBoxProps {
  landing?: boolean;
  input: string;
  loading: boolean;
  contextArtists: string[];
  atMenu: boolean;
  filteredArtists: Artist[];
  atIndex: number;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
  onRemoveContext: (name: string) => void;
  onSelectArtist: (name: string) => void;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
}

const UPLOAD_ITEMS = [
  { icon: FileText, label: 'Upload file', sub: 'PDF, CSV, TXT' },
  { icon: Image, label: 'Image', sub: 'PNG, JPG, GIF' },
  { icon: Paperclip, label: 'Audio', sub: 'MP3, WAV, FLAC' },
  { icon: AtSign, label: 'URL', sub: 'Paste a link' },
];

function MenuRow({
  Icon,
  label,
  sub,
  right,
  onClick,
}: {
  Icon?: typeof FileText;
  label: string;
  sub?: string;
  right?: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2.5 w-full px-3 py-2 bg-transparent border-none cursor-pointer text-foreground text-xs text-left hover:bg-card transition-colors"
    >
      {Icon && (
        <div className="w-7 h-7 shrink-0 rounded-md border border-border bg-card flex items-center justify-center">
          <Icon size={14} className="text-muted-foreground" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="font-medium text-foreground">{label}</div>
        {sub && <div className="text-[10px] text-muted-foreground/60">{sub}</div>}
      </div>
      {right}
    </button>
  );
}

export function InputBox({
  landing = false,
  input,
  loading,
  contextArtists,
  atMenu,
  filteredArtists,
  atIndex,
  onInputChange,
  onKeyDown,
  onSend,
  onRemoveContext,
  onSelectArtist,
  inputRef,
}: InputBoxProps) {
  const [plusOpen, setPlusOpen] = useState(false);
  const plusRef = useRef<HTMLButtonElement>(null);

  const mentionableArtists = ART.filter((a) => !contextArtists.includes(a.name));

  return (
    <div className={cn('w-full mx-auto relative', landing ? 'max-w-[720px]' : 'max-w-[800px]')}>
      <div
        className={cn(
          'bg-card border border-border overflow-visible relative',
          landing ? 'rounded-2xl' : 'rounded-lg',
        )}
      >
        {/* Context artist chips */}
        {contextArtists.length > 0 && (
          <div className="flex gap-1 px-3.5 pt-2 flex-wrap">
            {contextArtists.map((name) => (
              <span
                key={name}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 rounded-lg text-[11px] text-primary font-medium"
              >
                <AtSign size={10} className="text-primary" />
                {name}
                <button
                  onClick={() => onRemoveContext(name)}
                  className="bg-transparent border-none cursor-pointer p-0 flex ml-0.5"
                >
                  <X size={9} className="text-primary" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* @ autocomplete menu */}
        {atMenu && filteredArtists.length > 0 && (
          <div className="absolute bottom-full left-3.5 right-3.5 mb-1 bg-card border border-border rounded-md shadow-lg z-[100] overflow-hidden">
            <div className="px-2.5 py-1.5 border-b border-border">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-normal">
                Artists
              </span>
            </div>
            {filteredArtists.slice(0, 6).map((a, i) => (
              <MenuRow
                key={a.id}
                label={a.name}
                sub={`${a.genre} - ${a.streams} streams`}
                Icon={AtSign}
                onClick={() => onSelectArtist(a.name)}
              />
            ))}
          </div>
        )}

        {/* Textarea */}
        <div
          className={cn(
            'flex items-end gap-2',
            landing ? 'px-[18px] py-3.5' : 'px-3.5 py-2.5',
          )}
        >
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={input}
            onChange={onInputChange}
            onKeyDown={onKeyDown}
            placeholder={
              landing
                ? 'How can I help you today?'
                : 'Ask about streaming, social, saves, creators... Type @ to mention an artist'
            }
            rows={1}
            className={cn(
              'flex-1 resize-none bg-transparent border-none outline-none text-foreground leading-relaxed placeholder:text-muted-foreground/50',
              landing ? 'text-[15px]' : 'text-sm',
            )}
          />
        </div>

        {/* Bottom toolbar */}
        <div className="flex items-center px-[18px] py-1.5 border-t border-border">
          {/* Plus button */}
          <div className="relative">
            <button
              ref={plusRef}
              onClick={() => setPlusOpen((o) => !o)}
              className={cn(
                'w-[26px] h-[26px] rounded-[7px] border-none cursor-pointer flex items-center justify-center shrink-0 transition-colors',
                plusOpen ? 'bg-border' : 'bg-transparent',
              )}
            >
              <Plus size={16} className={plusOpen ? 'text-foreground' : 'text-muted-foreground'} />
            </button>

            {/* Popover */}
            {plusOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setPlusOpen(false)} />
                <div className="absolute bottom-full left-0 mb-2 w-[260px] bg-card border border-border rounded-lg shadow-xl z-50 overflow-hidden">
                  <div className="px-2.5 pt-2 pb-1">
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-normal">
                      Attach
                    </span>
                  </div>
                  {UPLOAD_ITEMS.map((item, i) => (
                    <MenuRow
                      key={i}
                      Icon={item.icon}
                      label={item.label}
                      sub={item.sub}
                      onClick={() => setPlusOpen(false)}
                    />
                  ))}
                  <div className="mx-3 border-t border-border" />
                  <div className="px-2.5 pt-1.5 pb-1">
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-normal">
                      Mention Artist
                    </span>
                  </div>
                  <div className="max-h-[200px] overflow-y-auto">
                    {mentionableArtists.map((a) => (
                      <MenuRow
                        key={a.id}
                        Icon={AtSign}
                        label={a.name}
                        sub={`${a.genre} · ${a.streams} streams`}
                        right={<AtSign size={12} className="text-muted-foreground/60" />}
                        onClick={() => {
                          onSelectArtist(a.name);
                          setPlusOpen(false);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-muted-foreground/60 font-mono">Agatha v1</span>
            <button
              onClick={onSend}
              disabled={!input.trim() || loading}
              className={cn(
                'w-7 h-7 rounded-[7px] border-none shrink-0 flex items-center justify-center transition-colors',
                input.trim()
                  ? 'bg-primary cursor-pointer'
                  : 'bg-border cursor-default',
              )}
            >
              <ArrowUp
                size={14}
                className={input.trim() ? 'text-primary-foreground' : 'text-muted-foreground'}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
