'use client';

import {
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
  /** Optional ref to the underlying textarea (e.g. focus after programmatic updates) */
  textareaRef?: RefObject<HTMLTextAreaElement | null>;
}

export function AutoGrowTextarea({
  className,
  minRows = 1,
  maxRows = 12,
  value,
  defaultValue,
  onChange,
  textareaRef,
  ...props
}: AutoGrowTextareaProps) {
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const lineHeight = 24; // px, matches leading-6

  const resize = () => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    const min = minRows * lineHeight;
    const max = maxRows * lineHeight;
    el.style.height = `${Math.min(Math.max(el.scrollHeight, min), max)}px`;
    el.style.overflowY = el.scrollHeight > max ? 'auto' : 'hidden';
  };

  useEffect(() => {
    resize();
  }, [value]);

  useEffect(() => {
    resize();
  }, []);

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
        'w-full resize-none bg-transparent leading-6 outline-none',
        className,
      )}
      style={{ minHeight: minRows * lineHeight }}
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
