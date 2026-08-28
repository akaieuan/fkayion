import type { SocialPost } from '../types';
import { cn } from '@/lib/utils';
import { Heart, MessageCircle, Bookmark, Share2, Play, Music } from 'lucide-react';

export function RSocialEmbed({
  post,
  compact = false,
}: {
  post: SocialPost;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        'flex-shrink-0 bg-card rounded-md border border-border overflow-hidden shadow-sm',
        compact ? 'w-40' : 'w-[200px]'
      )}
    >
      {/* Thumbnail area */}
      <div
        className={cn(
          'bg-gradient-to-br from-border to-border flex items-center justify-center relative',
          compact ? 'h-[100px]' : 'h-[140px]'
        )}
      >
        <div className={cn('opacity-15', compact ? 'text-[28px]' : 'text-4xl')}>
          {post.thumb}
        </div>
        {/* Platform badge */}
        <div
          className={cn(
            'absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full text-[9px] text-white font-medium',
            post.platform === 'tiktok' ? 'bg-black/60' : ''
          )}
          style={
            post.platform !== 'tiktok'
              ? { background: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)' }
              : undefined
          }
        >
          {post.platform === 'tiktok' ? 'TikTok' : 'Reel'}
        </div>
        {/* Play button */}
        <div className="absolute w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
          <Play size={14} className="text-white/80" />
        </div>
        {/* Audio pill */}
        {post.audio && (
          <div className="absolute left-1.5 bottom-1.5 flex items-center gap-0.5 px-1.5 py-0.5 bg-black/50 rounded-lg max-w-[80%]">
            <Music size={8} className="text-white flex-shrink-0" />
            <span className="text-[8px] text-white truncate">{post.audio}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-3 py-2.5">
        <div className="flex items-center gap-1.5 mb-1">
          <div className="w-[18px] h-[18px] rounded-[5px] bg-border flex items-center justify-center text-[10px] flex-shrink-0">
            {post.avatar}
          </div>
          <div className="text-[11px] font-medium text-foreground flex-1 truncate">
            {post.handle}
          </div>
        </div>
        <div className="text-[11px] text-muted-foreground leading-snug mb-2 line-clamp-2">
          {post.desc}
        </div>
        <div className="flex items-center gap-2.5 text-[10px] text-muted-foreground/60">
          <span className="flex items-center gap-0.5">
            <Heart size={10} />
            {post.likes}
          </span>
          <span className="flex items-center gap-0.5">
            <MessageCircle size={10} />
            {post.comments}
          </span>
          {post.saves && (
            <span className="flex items-center gap-0.5">
              <Bookmark size={10} />
              {post.saves}
            </span>
          )}
          <span className="flex items-center gap-0.5">
            <Share2 size={10} />
          </span>
        </div>
        <div className="mt-1.5 flex justify-between items-center">
          <span className="text-[10px] font-mono text-foreground font-normal">
            {post.views} views
          </span>
          <span className="text-[9px] text-muted-foreground/60">{post.date}</span>
        </div>
        {post.audioUses && (
          <div className="mt-1 text-[9px] text-purple-400 font-mono">
            ~ {post.audioUses} creates
          </div>
        )}
      </div>
    </div>
  );
}
