'use client';

import { ArrowLeft, PanelRight, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

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
      {/* Left side nav */}
      <div className="flex items-center gap-1">
        <Link
          href="/demo"
          className="flex h-7 items-center gap-1.5 rounded-md px-2 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Projects</span>
        </Link>

        {showBackToHome && (
          <button
            onClick={onBack}
            className="flex h-7 items-center gap-1 rounded-md px-2 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
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
