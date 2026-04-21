'use client';

import {
  useCallback,
  useEffect,
  useRef,
  type MutableRefObject,
  type RefObject,
  type TextareaHTMLAttributes,
} from 'react';
import { cn } from '@/lib/utils';

interface AutoGrowTextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'rows'> {
  minRows?: number;
  maxRows?: number;
  /** Pixel line height for min/max height math (match your `leading-*` / font size) */
  lineHeightPx?: number;
  /** Optional ref to the underlying textarea (e.g. focus after programmatic updates) */
  textareaRef?: RefObject<HTMLTextAreaElement | null>;
}

export function AutoGrowTextarea({
  className,
  minRows = 1,
  maxRows = 12,
  lineHeightPx = 24,
  value,
  defaultValue,
  onChange,
  textareaRef,
  ...props
}: AutoGrowTextareaProps) {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  const resize = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    const min = minRows * lineHeightPx;
    const max = maxRows * lineHeightPx;
    /** Empty textareas often report an oversized scrollHeight; keep a single-line footprint until there is content. */
    const isEmpty = el.value.length === 0;
    const contentHeight = isEmpty ? min : Math.max(el.scrollHeight, min);
    el.style.height = `${Math.min(contentHeight, max)}px`;
    el.style.overflowY = !isEmpty && el.scrollHeight > max ? 'auto' : 'hidden';
  }, [lineHeightPx, minRows, maxRows]);

  useEffect(() => {
    resize();
  }, [value, resize]);

  const setRefs = (node: HTMLTextAreaElement | null) => {
    (ref as MutableRefObject<HTMLTextAreaElement | null>).current = node;
    if (textareaRef) {
      (textareaRef as MutableRefObject<HTMLTextAreaElement | null>).current = node;
    }
  };

  return (
    <textarea
      ref={setRefs}
      className={cn(
        'w-full resize-none bg-transparent outline-none',
        className,
      )}
      style={{ minHeight: minRows * lineHeightPx, lineHeight: `${lineHeightPx}px` }}
      value={value}
      defaultValue={defaultValue}
      onChange={(e) => {
        resize();
        onChange?.(e);
      }}
      {...props}
    />
  );
}
