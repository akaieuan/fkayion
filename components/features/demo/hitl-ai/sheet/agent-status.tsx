import { Check, Cpu, Loader2, SkipForward, AlertOctagon, Ban } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AgentStatus } from '@/components/replicas/hitl-ai/types';
import { Section, Card } from '@/components/features/demo/hitl-ai/sheet/chrome';

// ─── Subagent status ──────────────────────────────────────────────────────────

const STATUS_META: Record<AgentStatus, { icon: React.ElementType; color: string }> = {
  idle:      { icon: Cpu,          color: 'text-muted-foreground' },
  running:   { icon: Loader2,      color: 'text-blue-500' },
  completed: { icon: Check,        color: 'text-emerald-500' },
  error:     { icon: AlertOctagon, color: 'text-red-500' },
  skipped:   { icon: SkipForward,  color: 'text-amber-500' },
  cancelled: { icon: Ban,          color: 'text-muted-foreground' },
};

export function AgentStatusSection() {
  const statuses = Object.entries(STATUS_META) as [AgentStatus, typeof STATUS_META[AgentStatus]][];

  return (
    <Section
      id="agent-status"
      label="Subagent Status Cards"
      description="Six discrete agent execution states. The running state animates. Use in any card that wraps an in-progress agentic task."
      cols={2}
    >
      {statuses.map(([status, meta]) => {
        const Icon = meta.icon;
        return (
          <Card key={status} label={status.charAt(0).toUpperCase() + status.slice(1)} hint={`status="${status}"`}>
            <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 px-3 py-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted">
                <Icon className={cn('h-3.5 w-3.5', meta.color, status === 'running' && 'animate-spin')} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground">Research Agent</p>
                <p className="text-[10px] text-muted-foreground">Climate Policy workspace</p>
              </div>
              <span className={cn('text-[10px] font-medium capitalize', meta.color)}>{status}</span>
            </div>
          </Card>
        );
      })}
    </Section>
  );
}
