import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Section, Card } from '@/components/features/demo/hitl-ai/sheet/chrome';

// ─── AI Generation Scale ──────────────────────────────────────────────────────

export function AiScaleSection() {
  const labels = ['Human', 'Mostly Human', 'Collaborative', 'Mostly AI', 'AI'];
  const colors  = ['bg-emerald-400', 'bg-teal-400', 'bg-yellow-400', 'bg-orange-400', 'bg-red-400'];
  const [values, setValues] = useState([0, 2, 4]);

  return (
    <Section
      id="ai-scale"
      label="AI Generation Scale"
      description="5-segment ordinal scale indicating AI involvement in a piece of work. Interactive — click any segment to select. Shows multiple configurations."
      cols={1}
    >
      <Card label="Three configurations" hint="Click segments to adjust">
        <div className="space-y-5">
          {values.map((v, idx) => (
            <div key={idx}>
              <div className="mb-1.5 flex gap-1">
                {labels.map((l, i) => (
                  <button
                    key={i}
                    onClick={() => setValues(vals => vals.map((x, j) => j === idx ? i : x))}
                    className={cn(
                      'flex-1 rounded-md border-2 py-1.5 text-center text-[10px] font-semibold transition-all',
                      v === i ? `${colors[i]} border-transparent text-white` : 'border-border text-muted-foreground hover:border-foreground/30',
                    )}
                  >
                    {l}
                  </button>
                ))}
              </div>
              <p className="text-center text-[10px] text-muted-foreground">Current: {labels[v]}</p>
            </div>
          ))}
        </div>
      </Card>
    </Section>
  );
}
