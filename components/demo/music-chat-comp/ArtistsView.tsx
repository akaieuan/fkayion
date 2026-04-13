'use client';

import { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Music,
  TrendingUp,
  FileText,
  Globe,
  User,
  Users,
  Mail,
  Layers,
  Plus,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ART, TRACKED_SONGS } from './data/artists';
import { UPCOMING_RELEASES, CAMPAIGNS, CONTENT_CALENDAR } from './data/constants';
import { TRENDING_SOUNDS, TRENDING_POSTS } from './data/social';
import { RSocialEmbed } from './blocks/RSocialEmbed';

type Tab = 'songs' | 'campaigns' | 'releases' | 'content';

const STATUS_COLOR = (s: string) => {
  if (s === 'active' || s === 'published' || s === 'submitted') return 'text-emerald-500';
  if (s === 'draft' || s === 'in_progress' || s === 'mastering') return 'text-orange-400';
  if (s === 'completed') return 'text-primary';
  if (s === 'paused' || s === 'scheduled') return 'text-purple-400';
  return 'text-muted-foreground';
};

const STATUS_BG = (s: string) => {
  if (s === 'active' || s === 'published' || s === 'submitted') return 'bg-emerald-500/10 text-emerald-500';
  if (s === 'draft' || s === 'in_progress' || s === 'mastering') return 'bg-orange-400/10 text-orange-400';
  if (s === 'completed') return 'bg-primary/10 text-primary';
  if (s === 'paused' || s === 'scheduled') return 'bg-purple-400/10 text-purple-400';
  return 'bg-muted text-muted-foreground';
};

const STATUS_DOT = (s: string) => {
  if (s === 'active' || s === 'published' || s === 'submitted') return 'bg-emerald-500';
  if (s === 'draft' || s === 'in_progress' || s === 'mastering') return 'bg-orange-400';
  if (s === 'completed') return 'bg-primary';
  if (s === 'paused' || s === 'scheduled') return 'bg-purple-400';
  return 'bg-muted-foreground';
};

const TYPE_ICON = (tp: string) => {
  if (tp === 'creator') return Users;
  if (tp === 'playlist') return Music;
  if (tp === 'social') return Globe;
  if (tp === 'email') return Mail;
  return Layers;
};

export function ArtistsView({ onAskChat }: { onAskChat: (prompt: string) => void }) {
  const [expanded, setExpanded] = useState<string | null>('a1');
  const [tab, setTab] = useState<Record<string, Tab>>({});

  const getTab = (id: string): Tab => tab[id] || 'songs';
  const setArtistTab = (id: string, tb: Tab) => setTab((prev) => ({ ...prev, [id]: tb }));

  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="max-w-[1100px] mx-auto px-7 pt-5 pb-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-3.5">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-foreground flex items-center gap-2">
              <Users size={18} className="text-primary" />
              Artists
            </h2>
            <p className="text-[11px] text-muted-foreground/60 m-0">
              {ART.length} artists &middot; {TRACKED_SONGS.length} tracked songs &middot;{' '}
              {CAMPAIGNS.filter((c) => c.status === 'active').length} active campaigns
            </p>
          </div>
          <button
            onClick={() => onAskChat('Show trending artists and performance')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-medium cursor-pointer border-none hover:opacity-90 transition-opacity"
          >
            <Sparkles size={12} />
            Ask Agatha
          </button>
        </div>

        {/* Artist accordion list */}
        <div className="flex flex-col gap-1.5">
          {ART.map((artist) => {
            const isOpen = expanded === artist.id;
            const songs = TRACKED_SONGS.filter((s) => s.artistId === artist.id);
            const releases = UPCOMING_RELEASES.filter((r) => r.artistId === artist.id);
            const campaigns = CAMPAIGNS.filter((c) => c.artistId === artist.id);
            const content = CONTENT_CALENDAR.filter((c) => c.artistId === artist.id);
            const activeTab = getTab(artist.id);
            const totalTiktok = songs.reduce((a, s) => a + s.tiktokCreates, 0);
            const totalIg = songs.reduce((a, s) => a + s.igCreates, 0);

            return (
              <div
                key={artist.id}
                className={cn(
                  'bg-card rounded-md border shadow-sm overflow-hidden transition-colors duration-150',
                  isOpen ? 'border-primary/25' : 'border-border',
                )}
              >
                {/* Artist header */}
                <div
                  onClick={() => setExpanded(isOpen ? null : artist.id)}
                  className="flex items-center gap-2.5 px-3.5 py-[9px] cursor-pointer select-none"
                >
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <User size={14} className="text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[13px] font-medium text-foreground">{artist.name}</span>
                      <span className="text-[9px] px-1.5 py-px rounded-full bg-muted text-muted-foreground">
                        {artist.genre}
                      </span>
                      {campaigns.some((c) => c.status === 'active') && (
                        <span className="text-[8px] px-1.5 py-px rounded-full bg-emerald-500/10 text-emerald-500">
                          Active
                        </span>
                      )}
                      {releases.length > 0 && (
                        <span className="text-[8px] px-1.5 py-px rounded-full bg-purple-400/10 text-purple-400">
                          {releases.length} upcoming
                        </span>
                      )}
                    </div>
                    <div className="flex gap-3 mt-0.5 text-[11px] text-muted-foreground/80">
                      <span>
                        <span className="font-mono font-normal text-foreground">{artist.streams}</span> streams
                      </span>
                      <span>
                        <span className="font-mono font-normal text-foreground">{artist.saves}</span> saves
                      </span>
                      <span className={cn('font-mono', artist.up ? 'text-emerald-500' : 'text-red-500')}>
                        {artist.delta}
                      </span>
                      <span>{songs.length} songs</span>
                    </div>
                  </div>
                  <div className="flex gap-3.5 items-center shrink-0">
                    <div className="text-center">
                      <div
                        className={cn(
                          'text-xs font-mono font-normal',
                          parseFloat(artist.sr) > 7 ? 'text-emerald-500' : 'text-foreground',
                        )}
                      >
                        {artist.sr}
                      </div>
                      <div className="text-[8px] text-muted-foreground/60">save rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-mono font-normal text-foreground">
                        {artist.pl.toLocaleString()}
                      </div>
                      <div className="text-[8px] text-muted-foreground/60">playlists</div>
                    </div>
                    {isOpen ? (
                      <ChevronDown size={14} className="text-muted-foreground/60" />
                    ) : (
                      <ChevronRight size={14} className="text-muted-foreground/60" />
                    )}
                  </div>
                </div>

                {/* Expanded panel */}
                {isOpen && (
                  <div className="border-t border-border">
                    {/* Tabs */}
                    <div className="flex gap-0 px-3.5 border-b border-border">
                      {(
                        [
                          { key: 'songs' as Tab, label: `Songs (${songs.length})`, Icon: Music },
                          { key: 'campaigns' as Tab, label: `Campaigns (${campaigns.length})`, Icon: TrendingUp },
                          { key: 'releases' as Tab, label: `Releases (${releases.length})`, Icon: FileText },
                          { key: 'content' as Tab, label: `Content (${content.length})`, Icon: Globe },
                        ] as const
                      ).map((tb) => (
                        <button
                          key={tb.key}
                          onClick={() => setArtistTab(artist.id, tb.key)}
                          className={cn(
                            'flex items-center gap-1 px-3 py-[7px] bg-transparent border-none border-b-2 cursor-pointer text-[11px] -mb-px transition-colors',
                            activeTab === tb.key
                              ? 'border-b-primary text-foreground font-medium'
                              : 'border-b-transparent text-muted-foreground font-normal hover:text-foreground',
                          )}
                        >
                          <tb.Icon
                            size={11}
                            className={activeTab === tb.key ? 'text-primary' : 'text-muted-foreground'}
                          />
                          {tb.label}
                        </button>
                      ))}
                      <div className="flex-1" />
                      <button
                        onClick={() => onAskChat(`Show ${artist.name}'s saves and social presence`)}
                        className="flex items-center gap-1 bg-transparent border-none cursor-pointer text-primary text-[10px] px-2.5 py-1.5 hover:opacity-80 transition-opacity"
                      >
                        <MessageSquare size={10} className="text-primary" />
                        Deep dive
                      </button>
                    </div>

                    {/* Songs tab */}
                    {activeTab === 'songs' && (
                      <div>
                        {songs.length === 0 ? (
                          <div className="px-3.5 py-4 text-center text-muted-foreground text-[11px]">
                            No tracked songs yet
                          </div>
                        ) : (
                          <table className="w-full border-collapse">
                            <thead>
                              <tr>
                                {['Song', 'Released', 'TikTok', '24h', 'IG', '24h'].map((h, i) => (
                                  <th
                                    key={i}
                                    className={cn(
                                      'py-1.5 text-[9px] font-normal text-muted-foreground/60 border-b border-border',
                                      i === 0 ? 'pl-3.5 pr-3 text-left' : 'px-3 text-left',
                                      i > 1 && 'text-right',
                                    )}
                                  >
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {songs.map((song, ri) => (
                                <tr
                                  key={song.id}
                                  className={cn(ri < songs.length - 1 && 'border-b border-border')}
                                >
                                  <td className="py-1.5 pl-3.5 pr-3">
                                    <div className="flex items-center gap-2">
                                      <div className="w-6 h-6 rounded-[5px] bg-muted flex items-center justify-center shrink-0">
                                        <Music size={10} className="text-muted-foreground" />
                                      </div>
                                      <div className="text-xs font-medium text-foreground">{song.title}</div>
                                    </div>
                                  </td>
                                  <td className="px-3 py-1.5 text-[11px] text-muted-foreground/80">
                                    {song.releaseDate}
                                  </td>
                                  <td className="px-3 py-1.5 text-right text-[11px] font-mono text-foreground">
                                    {song.tiktokCreates.toLocaleString()}
                                  </td>
                                  <td className="px-3 py-1.5 text-right">
                                    <span className="text-[11px] font-mono text-muted-foreground/80">
                                      {song.tiktok24h}
                                    </span>
                                    {song.tiktok24hPct > 0 && (
                                      <span className="text-[9px] text-emerald-500 font-mono ml-0.5">
                                        +{song.tiktok24hPct}%
                                      </span>
                                    )}
                                  </td>
                                  <td className="px-3 py-1.5 text-right text-[11px] font-mono text-foreground">
                                    {song.igCreates.toLocaleString()}
                                  </td>
                                  <td className="px-3 py-1.5 text-right">
                                    <span className="text-[11px] font-mono text-muted-foreground/80">
                                      {song.ig24h}
                                    </span>
                                    {song.ig24hPct > 0 && (
                                      <span className="text-[9px] text-emerald-500 font-mono ml-0.5">
                                        +{song.ig24hPct}%
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                        {songs.length > 0 && (
                          <div className="flex gap-2.5 px-3.5 py-[7px] border-t border-border bg-card">
                            <div className="text-[10px] text-muted-foreground/60">
                              Total TikTok:{' '}
                              <span className="font-mono text-foreground font-normal">
                                {totalTiktok.toLocaleString()}
                              </span>
                            </div>
                            <div className="text-[10px] text-muted-foreground/60">
                              Total IG:{' '}
                              <span className="font-mono text-foreground font-normal">
                                {totalIg.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Campaigns tab */}
                    {activeTab === 'campaigns' && (
                      <div className="p-2 px-3.5 flex flex-col gap-[5px]">
                        {campaigns.length === 0 ? (
                          <div className="py-2.5 text-center text-muted-foreground text-[11px]">No campaigns</div>
                        ) : (
                          campaigns.map((c) => {
                            const CIcon = TYPE_ICON(c.type);
                            return (
                              <div
                                key={c.id}
                                className="flex items-center gap-2.5 px-3 py-2 bg-card rounded-md border border-border"
                              >
                                <div
                                  className={cn(
                                    'w-[26px] h-[26px] rounded-md flex items-center justify-center shrink-0',
                                    STATUS_BG(c.status),
                                  )}
                                >
                                  <CIcon size={12} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-xs font-medium text-foreground">{c.title}</div>
                                  <div className="text-[10px] text-muted-foreground/60 mt-px">
                                    {c.type} &middot; {c.startDate}
                                  </div>
                                </div>
                                <div className="flex gap-2.5 items-center shrink-0">
                                  <div className="text-right">
                                    <div className="text-[11px] font-mono text-foreground">{c.reach}</div>
                                    <div className="text-[8px] text-muted-foreground/60">reach</div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-[11px] font-mono text-muted-foreground/80">{c.budget}</div>
                                    <div className="text-[8px] text-muted-foreground/60">budget</div>
                                  </div>
                                  <span
                                    className={cn(
                                      'text-[9px] px-1.5 py-px rounded-full',
                                      STATUS_BG(c.status),
                                    )}
                                  >
                                    {c.status}
                                  </span>
                                </div>
                              </div>
                            );
                          })
                        )}
                        <button
                          onClick={() =>
                            onAskChat(`Draft creator outreach for ${artist.name}'s latest release`)
                          }
                          className="flex items-center justify-center gap-1 w-full px-3 py-2 bg-transparent border border-border rounded-md cursor-pointer text-muted-foreground text-[11px] hover:text-foreground hover:border-foreground/20 transition-colors"
                        >
                          <Plus size={12} />
                          New campaign
                        </button>
                      </div>
                    )}

                    {/* Releases tab */}
                    {activeTab === 'releases' && (
                      <div className="p-2 px-3.5 flex flex-col gap-[5px]">
                        {releases.length === 0 ? (
                          <div className="py-2.5 text-center text-muted-foreground text-[11px]">
                            No upcoming releases
                          </div>
                        ) : (
                          releases.map((r) => (
                            <div
                              key={r.id}
                              className="flex items-center gap-2.5 px-3 py-2 bg-card rounded-md border border-border"
                            >
                              <div className="w-[30px] h-[30px] rounded-md bg-muted flex items-center justify-center shrink-0">
                                <Music size={13} className="text-muted-foreground" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-[5px]">
                                  <span className="text-xs font-medium text-foreground">{r.title}</span>
                                  <span className="text-[9px] px-1.5 py-px rounded-full bg-muted text-muted-foreground uppercase">
                                    {r.type}
                                  </span>
                                </div>
                                <div className="text-[10px] text-muted-foreground/60 mt-px">
                                  {r.date} &middot; {r.platforms.join(', ')}
                                </div>
                              </div>
                              <div className="flex items-center gap-[3px]">
                                {(['in_progress', 'mastering', 'submitted', 'scheduled'] as const).map(
                                  (step, si) => {
                                    const steps = ['in_progress', 'mastering', 'submitted', 'scheduled'];
                                    const currentIdx = steps.indexOf(r.status);
                                    const isComplete = si <= currentIdx;
                                    return (
                                      <div key={step} className="flex items-center gap-[3px]">
                                        <div
                                          className={cn(
                                            'w-1.5 h-1.5 rounded-full',
                                            isComplete ? 'bg-emerald-500' : 'bg-border',
                                          )}
                                        />
                                        {si < 3 && (
                                          <div
                                            className={cn(
                                              'w-2.5 h-[1.5px]',
                                              isComplete ? 'bg-emerald-500' : 'bg-border',
                                            )}
                                          />
                                        )}
                                      </div>
                                    );
                                  },
                                )}
                                <span
                                  className={cn(
                                    'text-[9px] px-1.5 py-px rounded-full ml-1.5',
                                    STATUS_BG(r.status),
                                  )}
                                >
                                  {r.status.replace('_', ' ')}
                                </span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    )}

                    {/* Content tab */}
                    {activeTab === 'content' && (
                      <div className="p-2 px-3.5 flex flex-col gap-[5px]">
                        {content.length === 0 ? (
                          <div className="py-2.5 text-center text-muted-foreground text-[11px]">
                            No scheduled content
                          </div>
                        ) : (
                          content.map((c) => (
                            <div
                              key={c.id}
                              className="flex items-center gap-2.5 px-3 py-[7px] bg-card rounded-md border border-border"
                            >
                              <div
                                className="w-[22px] h-[22px] rounded-[5px] flex items-center justify-center shrink-0"
                                style={{
                                  background:
                                    c.platform === 'tiktok'
                                      ? 'rgba(0,0,0,0.7)'
                                      : 'linear-gradient(45deg,#f09433,#dc2743,#bc1888)',
                                }}
                              >
                                <span className="text-[7px] text-white font-medium">
                                  {c.platform === 'tiktok' ? 'TT' : 'IG'}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-[11px] text-foreground truncate">{c.caption}</div>
                                <div className="text-[10px] text-muted-foreground/60">{c.scheduledDate}</div>
                              </div>
                              <span className={cn('text-[9px] px-1.5 py-px rounded-full', STATUS_BG(c.status))}>
                                {c.status}
                              </span>
                            </div>
                          ))
                        )}
                        <button
                          onClick={() =>
                            onAskChat(`Plan social content for ${artist.name}'s upcoming releases`)
                          }
                          className="flex items-center justify-center gap-1 w-full px-3 py-2 bg-transparent border border-border rounded-md cursor-pointer text-muted-foreground text-[11px] hover:text-foreground hover:border-foreground/20 transition-colors"
                        >
                          <Plus size={12} />
                          Schedule post
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Trending Section */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm font-medium text-foreground tracking-tight">Trending</div>
              <div className="text-[11px] text-muted-foreground/60 mt-px">
                Sounds, reels and content gaining momentum
              </div>
            </div>
            <button
              onClick={() => onAskChat('Show all trending sounds and content across platforms')}
              className="flex items-center gap-1 bg-transparent border-none cursor-pointer text-primary text-[11px] px-2.5 py-[5px] hover:opacity-80 transition-opacity"
            >
              <TrendingUp size={11} className="text-primary" />
              View all
            </button>
          </div>

          {/* Trending sounds grid */}
          <div className="mb-4">
            <div className="text-[11px] font-normal text-muted-foreground/60 uppercase tracking-wider mb-2">
              Trending Sounds
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-1.5">
              {TRENDING_SOUNDS.slice(0, 6).map((s) => (
                <div
                  key={s.id}
                  onClick={() => onAskChat(`Show analytics for "${s.title}" by ${s.artist}`)}
                  className="flex items-center gap-2.5 px-3 py-2.5 bg-card border border-border rounded-md shadow-sm cursor-pointer hover:border-foreground/20 transition-colors"
                >
                  <div
                    className="w-7 h-7 rounded-[7px] flex items-center justify-center shrink-0"
                    style={{
                      background:
                        s.platform === 'tiktok'
                          ? 'rgba(0,0,0,0.5)'
                          : 'linear-gradient(45deg,#f09433,#dc2743)',
                    }}
                  >
                    <Music size={12} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-[5px]">
                      <span className="text-xs font-medium text-foreground truncate">{s.title}</span>
                      <span className="text-[10px] text-muted-foreground/60">{s.artist}</span>
                    </div>
                    <div className="flex gap-2 mt-0.5 text-[10px] text-muted-foreground/80">
                      <span className="font-mono">{s.creates} creates</span>
                      <span className="font-mono text-emerald-500">{s.growth}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[11px] font-mono text-muted-foreground/80">{s.topViews}</div>
                    <div className="text-[9px] text-muted-foreground/60">top view</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending content */}
          <div>
            <div className="text-[11px] font-normal text-muted-foreground/60 uppercase tracking-wider mb-2">
              Trending Content
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {TRENDING_POSTS.map((p) => (
                <RSocialEmbed key={p.id} post={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
