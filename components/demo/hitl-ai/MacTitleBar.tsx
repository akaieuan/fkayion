'use client';

import { ArrowLeft, PanelRight, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { HitlDemoNavLinkRow } from '@/components/demo/hitl-ai/HitlDemoNavLinkRow';

interface MacTitleBarProps {
  showBackToHome?: boolean;
  onBack?: () => void;
  rightPanelVisible?: boolean;
  onToggleRightPanel?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export function MacTitleBar({
  showBackToHome,
  onBack,
  rightPanelVisible,
  onToggleRightPanel,
  children,
  className,
}: MacTitleBarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && theme === 'dark';
  const toggleTheme = () => setTheme(isDark ? 'light' : 'dark');

  return (
    <div
      className={cn(
        'flex h-[38px] shrink-0 items-center border-b border-border bg-background px-3',
        className,
      )}
    >
      {/* Left: shared demo routes (no /demo index — avoids other demos) */}
      <div className="flex min-w-0 items-center gap-1">
        <HitlDemoNavLinkRow className="min-w-0 shrink" />

        {showBackToHome && (
          <button
            type="button"
            onClick={onBack}
            className="flex h-7 shrink-0 items-center gap-1 rounded-md px-2 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Home
          </button>
        )}
      </div>

      <div className="flex-1" />

      {children}

      {/* Right side controls */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          {!mounted ? (
            <Moon className="h-3.5 w-3.5 opacity-0" />
          ) : isDark ? (
            <Sun className="h-3.5 w-3.5" />
          ) : (
            <Moon className="h-3.5 w-3.5" />
          )}
        </button>

        {onToggleRightPanel !== undefined && (
          <button
            onClick={onToggleRightPanel}
            className={cn(
              'flex h-7 w-7 items-center justify-center rounded-md transition-colors',
              rightPanelVisible
                ? 'bg-muted text-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            <PanelRight className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
