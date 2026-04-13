'use client';

import type { EmailData } from '../types';
import { cn } from '@/lib/utils';

function Field({ label, value, bold = false }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[11px] text-muted-foreground/60 w-[50px]">{label}</span>
      <span className={cn('text-xs text-foreground', bold && 'font-medium')}>{value}</span>
    </div>
  );
}

export function REmail({ email }: { email: EmailData }) {
  return (
    <div className="bg-card border border-border rounded-md shadow-sm my-3 overflow-hidden">
      <div className="px-4 py-3 border-b border-border flex flex-col gap-1.5">
        <Field label="From" value={email.sender} />
        <Field label="To" value={email.to} />
        <Field label="Subject" value={email.subject} bold />
      </div>
      <div className="p-4 text-[13px] leading-relaxed text-muted-foreground whitespace-pre-wrap">
        {email.body}
      </div>
    </div>
  );
}
