'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Plus, ArrowUp, Bot } from 'lucide-react';
import { AutoGrowTextarea } from './AutoGrowTextarea';
import { HitlCard, DEMO_HITL_CARDS } from './HitlCard';
import type { RightTab } from './types';

interface Message {
  role: 'user' | 'agent';
  content: string;
  hitlId?: string;
}

const INITIAL_MESSAGES: Message[] = [
  { role: 'user', content: 'Can you find me papers about carbon pricing mechanisms and their effectiveness?' },
  {
    role: 'agent',
    content: `I found **177 results** across your workspace and connected databases.\n\n**Top sources:**\n• Carbon Pricing Mechanisms and Emissions Outcomes — Nature Climate Change, 2023\n• EU ETS Reform Price Dynamics — Energy Economics, 2024\n• Just Transition Frameworks — arXiv, 2024\n\nWould you like me to narrow the search or start downloading the highest-relevance papers?`,
    hitlId: 'h1',
  },
  { role: 'user', content: 'Yes, please verify the IPCC citation before we continue.' },
  {
    role: 'agent',
    content: `I've flagged a citation that needs your review before I continue writing. The reference to Table 3 in IPCC AR6 (p. 12) requires manual confirmation — please check the page number and table label.`,
    hitlId: 'h2',
  },
  { role: 'user', content: 'Looks good. Go ahead and update Section 2 with the new citations.' },
  {
    role: 'agent',
    content: `Section 2 has been updated with 2 new citations. I've held before locking the changes — please confirm the insertions look correct and I'll finalize the document.`,
    hitlId: 'h3',
  },
];

interface ChatPanelProps {
  onOpenTab?: (tab: RightTab) => void;
  /** One-shot append from Library (and similar); `id` bumps when a new payload is queued */
  composerInject?: { id: number; text: string } | null;
  onComposerInjectConsumed?: () => void;
  /** Override the default seeded thread (component is keyed externally to reset) */
  initialMessages?: Message[];
}

export function ChatPanel({
  onOpenTab,
  composerInject,
  onComposerInjectConsumed,
  initialMessages,
}: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages ?? INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const composerRef = useRef<HTMLTextAreaElement>(null);
  const lastComposerInjectId = useRef<number | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!composerInject) {
      lastComposerInjectId.current = null;
      return;
    }
    if (lastComposerInjectId.current === composerInject.id) return;
    lastComposerInjectId.current = composerInject.id;

    setInput((prev) => {
      const p = prev.trim();
      const prefix = p ? `${p}\n\n` : '';
      return `${prefix}${composerInject.text}`;
    });
    onComposerInjectConsumed?.();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => composerRef.current?.focus());
    });
  }, [composerInject, onComposerInjectConsumed]);

  const send = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { role: 'user', content: input }]);
    setInput('');
    // Fake agent reply
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          role: 'agent',
          content: 'Understood. I\'ll process that and update the workspace.',
        },
      ]);
    }, 600);
  };

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <div className="flex h-[44px] shrink-0 items-center gap-2 border-b border-border px-4">
        <span className="text-sm font-medium text-foreground">Chat</span>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className="animate-in fade-in-0 slide-in-from-bottom-1 duration-300" style={{ animationDelay: `${Math.min(i * 60, 300)}ms`, animationFillMode: 'backwards' }}>
            {msg.role === 'user' ? (
              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-primary px-3.5 py-2.5 text-xs leading-relaxed text-primary-foreground">
                  {msg.content}
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 mt-0.5">
                  <Bot className="h-3.5 w-3.5 text-primary/70" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="rounded-2xl rounded-tl-sm border border-border bg-muted/30 px-3.5 py-2.5 text-xs leading-relaxed text-foreground whitespace-pre-wrap">
                    {msg.content}
                  </div>
                  {msg.hitlId && (
                    <HitlCard
                      config={DEMO_HITL_CARDS.find((c) => c.id === msg.hitlId)!}
                      onOpenTab={onOpenTab}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="shrink-0 border-t border-border px-3 py-2">
        <div className="flex items-end gap-2">
          <button
            type="button"
            onClick={() => onOpenTab?.('library')}
            className="mb-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="Open library"
          >
            <Plus className="h-4 w-4" />
          </button>

          <div className="flex-1 rounded-xl border border-border bg-muted/30 px-3 py-2">
            <AutoGrowTextarea
              placeholder="Continue the conversation…"
              className="text-xs text-foreground placeholder:text-muted-foreground"
              minRows={1}
              maxRows={6}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              textareaRef={composerRef}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
            />
          </div>

          <button
            onClick={send}
            disabled={!input.trim()}
            className="mb-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground disabled:opacity-30 transition-opacity"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
