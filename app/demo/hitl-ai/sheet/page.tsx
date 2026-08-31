'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { HitlSection } from '@/components/features/demo/hitl-ai/sheet/hitl-cards';
import { AgentStatusSection } from '@/components/features/demo/hitl-ai/sheet/agent-status';
import { MiniTraceSection } from '@/components/features/demo/hitl-ai/sheet/mini-trace';
import { AiScaleSection } from '@/components/features/demo/hitl-ai/sheet/ai-scale';
import { ContextItemsSection } from '@/components/features/demo/hitl-ai/sheet/context-items';
import { QASection } from '@/components/features/demo/hitl-ai/sheet/qa-flow';
import { SearchCardsSection } from '@/components/features/demo/hitl-ai/sheet/search-cards';
import { ApprovalSection } from '@/components/features/demo/hitl-ai/sheet/approval';
import { BatchSection } from '@/components/features/demo/hitl-ai/sheet/batch';
import { TokensSection } from '@/components/features/demo/hitl-ai/sheet/tokens';

// ─── TOC ─────────────────────────────────────────────────────────────────────

const TOC = [
  { id: 'hitl',         label: 'HITL Interrupt Cards' },
  { id: 'agent-status', label: 'Subagent Status' },
  { id: 'trace',        label: 'MiniTrace' },
  { id: 'ai-scale',     label: 'AI Generation Scale' },
  { id: 'context',      label: 'Context Items' },
  { id: 'qa',           label: 'QA Flow' },
  { id: 'search-cards', label: 'Search Result Cards' },
  { id: 'approval',     label: 'Approve / Reject' },
  { id: 'batch',        label: 'Batch Queue' },
  { id: 'tokens',       label: 'Design Tokens' },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SheetPage() {
  const [active, setActive] = useState('hitl');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    TOC.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex min-h-[100dvh] bg-background text-foreground">
      {/* Fixed left TOC */}
      <aside className="hidden lg:flex min-h-[100dvh] w-52 shrink-0 flex-col border-r border-border overflow-y-auto lg:sticky lg:top-0 lg:self-start">
        <div className="border-b border-border px-4 py-3">
          <p className="text-xs font-medium text-foreground">Component Sheet</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">HITL-AI system · Agatha</p>
        </div>

        <div className="border-b border-border px-3 py-2">
          <Link
            href="/demo"
            className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-colors duration-200"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Projects
          </Link>
        </div>

        <nav className="flex-1 p-2">
          {TOC.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setActive(id)}
              className={cn(
                'block rounded-md px-2 py-1.5 text-xs transition-colors duration-200',
                active === id
                  ? 'bg-muted text-foreground font-medium'
                  : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
              )}
            >
              {label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Scrollable content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border/60 bg-background/70 px-6 py-3 backdrop-blur-lg backdrop-saturate-150">
          <div>
            <h1 className="text-sm font-medium text-foreground">HITL-AI Component Sheet</h1>
            <p className="text-[10px] text-muted-foreground">Interactive reference — all components live</p>
          </div>
          <Link
            href="/demo"
            className="flex h-7 items-center gap-1.5 rounded-md px-2 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200 lg:hidden"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Projects
          </Link>
        </div>

        <div className="mx-auto max-w-4xl px-6 pb-24">
          <HitlSection />
          <AgentStatusSection />
          <MiniTraceSection />
          <AiScaleSection />
          <ContextItemsSection />
          <QASection />
          <SearchCardsSection />
          <ApprovalSection />
          <BatchSection />
          <TokensSection />
        </div>
      </main>
    </div>
  );
}
