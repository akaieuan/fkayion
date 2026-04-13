'use client';

import { useRef, useCallback, useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { renderArtifact } from './blocks';
import type { ArtifactData } from './types';

interface Props {
  active: ArtifactData;
  width: number;
  onClose: () => void;
  onAskChat: (prompt: string) => void;
  onResize: (w: number) => void;
}

export function ArtifactPanel({ active, width, onClose, onAskChat, onResize }: Props) {
  const dragging = useRef(false);
  const startX = useRef(0);
  const startW = useRef(width);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      dragging.current = true;
      startX.current = e.clientX;
      startW.current = width;
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    },
    [width],
  );

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const delta = startX.current - e.clientX;
      const next = Math.max(320, Math.min(startW.current + delta, 900));
      onResize(next);
    };
    const onUp = () => {
      if (!dragging.current) return;
      dragging.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [onResize]);

  return (
    <div
      style={{ width }}
      className="shrink-0 border-l border-border flex flex-col bg-card relative animate-in slide-in-from-right-2 duration-150"
    >
      {/* Resize handle */}
      <div
        onMouseDown={onMouseDown}
        className="absolute -left-[3px] top-0 bottom-0 w-1.5 cursor-col-resize z-10 group"
      >
        <div className="w-0.5 h-full mx-auto bg-primary rounded-sm opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
      </div>

      {/* Header */}
      <div className="h-12 shrink-0 border-b border-border flex items-center px-[18px] gap-2.5">
        <span className="flex-1 font-medium text-sm text-foreground truncate">
          {active.title}
        </span>
        <button
          onClick={onClose}
          className="bg-transparent border-none cursor-pointer p-1 flex text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {renderArtifact(active, onAskChat)}
      </div>
    </div>
  );
}
