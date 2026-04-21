'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Plus,
  Bot,
  CornerDownLeft,
  FileText,
  GitBranch,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { AutoGrowTextarea } from './AutoGrowTextarea';
import { HitlCard, DEMO_HITL_CARDS } from './HitlCard';
import type { RightTab } from './types';

/** One compact line to start; grows until max rows × line height */
const COMPOSER_LINE_PX = 22;
const COMPOSER_MAX_ROWS = 8;

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
  composerInject?: { id: number; text: string } | null;
  onComposerInjectConsumed?: () => void;
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
    <div className="flex h-full min-h-0 flex-col bg-background">
      <div className="flex h-10 shrink-0 items-center border-b border-border/50 px-4">
        <span className="text-[13px] font-medium tracking-tight text-foreground/90">Chat</span>
      </div>

      <div
        ref={scrollRef}
        className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-muted/15 px-3 py-4 dark:bg-muted/5 sm:px-5"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className="animate-in fade-in-0 slide-in-from-bottom-1 duration-300"
            style={{ animationDelay: `${Math.min(i * 60, 300)}ms`, animationFillMode: 'backwards' }}
          >
            {msg.role === 'user' ? (
              <div className="flex justify-end">
                <div className="max-w-[min(100%,26rem)] rounded-2xl rounded-tr-md bg-primary px-3.5 py-2.5 text-[13px] leading-relaxed text-primary-foreground">
                  {msg.content}
                </div>
              </div>
            ) : (
              <div className="flex gap-2.5">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/12">
                  <Bot className="h-3.5 w-3.5 text-primary/75" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="rounded-2xl rounded-tl-md border border-border/50 bg-muted/25 px-3.5 py-2.5 text-[13px] leading-relaxed text-foreground whitespace-pre-wrap dark:bg-muted/15">
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

      {/* Composer: short default height, grows with text up to maxRows */}
      <TooltipProvider delayDuration={200}>
        <div className="shrink-0 px-3 pb-3 pt-1 sm:px-5 sm:pb-3">
          <div className="rounded-xl border border-border/55 bg-muted/25 dark:border-border dark:bg-muted/20">
            <div className="relative px-2.5 py-1.5 sm:px-3 sm:py-2">
              <AutoGrowTextarea
                placeholder="Type / for commands…"
                className="text-[13px] text-foreground placeholder:text-muted-foreground/70 pr-9"
                lineHeightPx={COMPOSER_LINE_PX}
                minRows={1}
                maxRows={COMPOSER_MAX_ROWS}
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
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={send}
                    disabled={!input.trim()}
                    className="absolute bottom-1 right-1 flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground disabled:pointer-events-none disabled:opacity-25 dark:hover:bg-muted/50"
                    aria-label="Send message"
                  >
                    <CornerDownLeft className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="border border-border bg-popover text-popover-foreground">
                  Send (Enter)
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between gap-3 px-0.5">
            <div className="flex min-w-0 flex-1 items-center gap-1 text-[11px] text-muted-foreground sm:gap-1.5">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => onOpenTab?.('human')}
                    className="hidden max-w-[7rem] truncate rounded-md px-1.5 py-1 text-left hover:bg-muted/70 hover:text-foreground dark:hover:bg-white/5 sm:inline-block"
                  >
                    Review queue
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="max-w-[16rem] border border-border bg-popover text-left text-popover-foreground"
                >
                  <span className="font-medium text-foreground">Human review queue</span>
                  <span className="mt-0.5 block text-muted-foreground">
                    3 items need approval. Opens the Human tab.
                  </span>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => onOpenTab?.('library')}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md hover:bg-muted/80 hover:text-foreground dark:hover:bg-white/5"
                    aria-label="Library"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="border border-border bg-popover text-popover-foreground">
                  Add from library — attach sources to the message
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => onOpenTab?.('read')}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md hover:bg-muted/80 hover:text-foreground dark:hover:bg-white/5"
                    aria-label="Read"
                  >
                    <FileText className="h-3.5 w-3.5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="border border-border bg-popover text-popover-foreground">
                  Open reader — PDF and citations (demo)
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => onOpenTab?.('human')}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md hover:bg-muted/80 hover:text-foreground dark:hover:bg-white/5"
                    aria-label="Human review"
                  >
                    <GitBranch className="h-3.5 w-3.5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="border border-border bg-popover text-popover-foreground">
                  Branch to Human — approvals and HITL cards
                </TooltipContent>
              </Tooltip>
            </div>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="flex shrink-0 items-center gap-2 rounded-md px-1 py-0.5 text-[11px] text-muted-foreground hover:bg-muted/50 hover:text-foreground dark:hover:bg-white/5"
                >
                  <span className="hidden sm:inline">Claude Sonnet</span>
                  <span className="sm:hidden">Sonnet</span>
                  <span
                    className="h-3.5 w-3.5 rounded-full border-2 border-primary/60 border-t-transparent"
                    aria-hidden
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="max-w-[14rem] border border-border bg-popover text-left text-popover-foreground"
              >
                <span className="font-medium text-foreground">Model (demo)</span>
                <span className="mt-0.5 block text-muted-foreground">
                  Static label for this mock — not a live model selector.
                </span>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
}
