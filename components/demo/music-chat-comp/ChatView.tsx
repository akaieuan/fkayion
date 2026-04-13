'use client';

import { useRef, useEffect } from 'react';
import { Music, Layers, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Message, ArtifactData, Artist } from './types';
import { renderBlock } from './blocks';
import { InputBox } from './InputBox';
import { LandingPage } from './LandingPage';

interface ChatViewProps {
  msgs: Message[];
  input: string;
  loading: boolean;
  active: ArtifactData | null;
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
  onSetActive: (a: ArtifactData | null) => void;
  onAskChat: (prompt: string) => void;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
}

function parseBold(text: string): string {
  return text.replace(
    /\*\*(.*?)\*\*/g,
    '<strong class="text-foreground">$1</strong>',
  );
}

export function ChatView({
  msgs,
  input,
  loading,
  active,
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
  onSetActive,
  onAskChat,
  inputRef,
}: ChatViewProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isNewChat = msgs.length === 0 && !loading;

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [msgs, loading]);

  return (
    <div className="flex-1 flex flex-col min-w-[420px] transition-[flex] duration-200 ease-in-out">
      {isNewChat ? (
        <LandingPage
          input={input}
          contextArtists={contextArtists}
          atMenu={atMenu}
          filteredArtists={filteredArtists}
          atIndex={atIndex}
          onInputChange={onInputChange}
          onKeyDown={onKeyDown}
          onSend={onSend}
          onRemoveContext={onRemoveContext}
          onSelectArtist={onSelectArtist}
          onSetInput={onSetInput}
          inputRef={inputRef}
        />
      ) : (
        <>
          {/* Scrollable message thread */}
          <div ref={scrollRef} className="flex-1 overflow-auto">
            <div className="max-w-[800px] mx-auto px-7 pt-6 pb-4">
              {msgs.map((msg) => (
                <div key={msg.id} className="mb-5 animate-in fade-in duration-200">
                  {/* Message header */}
                  <div className="flex items-center gap-2 mb-1">
                    {msg.role === 'assistant' ? (
                      <div className="w-[22px] h-[22px] rounded-md bg-card border border-border flex items-center justify-center">
                        <Music size={12} className="text-primary" />
                      </div>
                    ) : (
                      <div className="w-[22px] h-[22px] rounded-md bg-card flex items-center justify-center text-[10px] font-medium text-muted-foreground">
                        J
                      </div>
                    )}
                    <span className="text-xs font-medium text-foreground">
                      {msg.role === 'user' ? 'You' : 'Agatha'}
                    </span>
                    {msg.contextArtists && msg.contextArtists.length > 0 && (
                      <div className="flex gap-1 ml-1">
                        {msg.contextArtists.map((name) => (
                          <span
                            key={name}
                            className="text-[10px] px-1.5 py-px bg-primary/10 rounded text-primary font-medium"
                          >
                            @{name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Message body */}
                  <div className="pl-[30px]">
                    <div
                      className="text-sm leading-[1.7] text-muted-foreground whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{ __html: parseBold(msg.text) }}
                    />
                    {msg.blocks?.map((b, i) => renderBlock(b, i, onAskChat))}
                    {msg.artifacts?.map((a) => (
                      <button
                        key={a.id}
                        onClick={() =>
                          onSetActive(active?.id === a.id ? null : a)
                        }
                        className={cn(
                          'flex items-center gap-2.5 px-3.5 py-2.5 mt-2 border rounded-lg text-foreground text-xs cursor-pointer w-full max-w-[340px] text-left transition-colors',
                          active?.id === a.id
                            ? 'bg-primary/5 border-primary/25'
                            : 'bg-card border-border hover:border-primary/25',
                        )}
                      >
                        <Layers
                          size={14}
                          className={cn(
                            active?.id === a.id
                              ? 'text-primary'
                              : 'text-muted-foreground/60',
                          )}
                        />
                        <div className="flex-1">
                          <div className="font-medium text-foreground">
                            {a.title}
                          </div>
                          {a.subtitle && (
                            <div className="text-[10px] text-muted-foreground/60 mt-px">
                              {a.subtitle}
                            </div>
                          )}
                        </div>
                        <ChevronRight
                          size={13}
                          className="text-muted-foreground/60"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {loading && (
                <div className="flex items-center gap-2 mb-5 animate-in fade-in duration-200">
                  <div className="w-[22px] h-[22px] rounded-md bg-card border border-border flex items-center justify-center">
                    <Music size={12} className="text-primary" />
                  </div>
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-[5px] h-[5px] rounded-full bg-primary animate-bounce"
                        style={{ animationDelay: `${i * 0.16}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input at bottom */}
          <div className="px-6 pt-2.5 pb-4">
            <InputBox
              input={input}
              loading={loading}
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
          </div>
        </>
      )}
    </div>
  );
}
