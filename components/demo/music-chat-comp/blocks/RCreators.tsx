import type { Creator } from '../types';
import { cn } from '@/lib/utils';

export function RCreators({ creators }: { creators: Creator[] }) {
  return (
    <div className="my-3 flex flex-col gap-1.5">
      {creators.map((c) => (
        <div
          key={c.id}
          className="bg-card border border-border rounded-md shadow-sm flex items-center gap-3 px-3.5 py-3"
        >
          {/* Avatar */}
          <div className="w-9 h-9 rounded-lg bg-border flex items-center justify-center text-lg flex-shrink-0">
            {c.avatar}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[13px] font-medium text-foreground">{c.name}</span>
              <span className="text-[11px] text-muted-foreground/60">{c.handle}</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-border text-muted-foreground/60">
                {c.platform}
              </span>
            </div>
            <div className="flex gap-2 mt-0.5">
              {c.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div className="flex gap-3 flex-shrink-0">
            <div className="text-center">
              <div className="text-[13px] font-mono font-normal text-foreground">
                {c.followers}
              </div>
              <div className="text-[9px] text-muted-foreground/60">followers</div>
            </div>
            <div className="text-center">
              <div
                className={cn(
                  'text-[13px] font-mono font-normal',
                  parseFloat(c.engagement) > 10 ? 'text-emerald-500' : 'text-foreground'
                )}
              >
                {c.engagement}
              </div>
              <div className="text-[9px] text-muted-foreground/60">eng rate</div>
            </div>
            <div className="text-center">
              <div className="text-[13px] font-mono text-muted-foreground">{c.price}</div>
              <div className="text-[9px] text-muted-foreground/60">est. cost</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
