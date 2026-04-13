'use client';

import { cn } from '@/lib/utils';
import {
  BarChart3,
  Layers,
  Globe,
  Users,
  Mail,
  LayoutGrid,
  FileText,
  TrendingUp,
  User,
  Music,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { POSTS, CREATORS } from './data/social';

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('bg-card border border-border rounded-lg shadow-sm', className)}>
      {children}
    </div>
  );
}

function Bar({ value, max, accent }: { value: number; max: number; accent?: boolean }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="flex-1 h-[3px] rounded-full bg-border overflow-hidden">
      <div
        className={cn('h-full rounded-full', accent ? 'bg-primary' : 'bg-muted-foreground/30')}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

interface ArtifactEntry {
  type: string;
  label: string;
  icon: LucideIcon;
  desc: string;
  element: React.ReactNode;
}

function getExampleArtifacts(): ArtifactEntry[] {
  return [
    {
      type: 'stats',
      label: 'Stats Cards',
      icon: BarChart3,
      desc: 'Key metrics with deltas and trends',
      element: (
        <div className="flex gap-1.5 flex-wrap">
          {[
            { l: 'Streams', v: '4.87M', d: '+18%' },
            { l: 'Saves', v: '312K', d: '+22%' },
            { l: 'Save Rate', v: '6.4%' },
          ].map((s, i) => (
            <Card key={i} className="flex-1 basis-[70px] px-2.5 py-2">
              <div className="text-[8px] text-muted-foreground/60 font-normal uppercase">
                {s.l}
              </div>
              <div className="text-sm font-normal text-foreground mt-px font-mono">{s.v}</div>
              {s.d && <div className="text-[9px] text-emerald-500 font-mono">{s.d}</div>}
            </Card>
          ))}
        </div>
      ),
    },
    {
      type: 'chart',
      label: 'Bar Charts',
      icon: BarChart3,
      desc: 'Visual data comparisons',
      element: (
        <Card className="p-2.5">
          <div className="flex items-end gap-1 h-[50px]">
            {[{ v: 142 }, { v: 68 }, { v: 58 }, { v: 44 }].map((b, j) => (
              <div key={j} className="flex-1 flex flex-col items-center gap-0.5">
                <div
                  className="w-full max-w-6 bg-primary rounded opacity-80"
                  style={{ height: `${(b.v / 142) * 40}px` }}
                />
              </div>
            ))}
          </div>
        </Card>
      ),
    },
    {
      type: 'comparison',
      label: 'Comparison Bars',
      icon: Layers,
      desc: 'Ranked metric comparisons',
      element: (
        <Card className="p-2.5">
          {[
            { l: 'Skee Mask', v: 83, a: true },
            { l: 'Four Tet', v: 79, a: true },
            { l: 'Overmono', v: 64, a: false },
          ].map((r, j) => (
            <div key={j} className="flex items-center gap-1 py-0.5">
              <div className={cn('w-14 text-[9px]', r.a ? 'text-foreground' : 'text-muted-foreground')}>
                {r.l}
              </div>
              <Bar value={r.v} max={100} accent={r.a} />
            </div>
          ))}
        </Card>
      ),
    },
    {
      type: 'social',
      label: 'Social Embeds',
      icon: Globe,
      desc: 'TikTok and Instagram content cards',
      element: (
        <div className="flex gap-1 overflow-hidden">
          {POSTS.slice(0, 2).map((p) => (
            <Card key={p.id} className="flex-shrink-0 w-[110px] overflow-hidden">
              <div className="h-[60px] bg-border flex items-center justify-center relative">
                <div className="text-sm opacity-30">{p.thumb}</div>
                <div className="absolute right-1 top-1 px-1 py-px bg-black/60 rounded text-[7px] text-white">
                  {p.platform === 'tiktok' ? 'TikTok' : 'Reel'}
                </div>
              </div>
              <div className="px-1.5 py-1">
                <div className="text-[8px] font-medium text-foreground">{p.handle}</div>
                <div className="flex gap-1.5 mt-0.5 text-[7px] text-muted-foreground/60">
                  <span>{p.views} views</span>
                  <span>{p.likes} likes</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ),
    },
    {
      type: 'creators',
      label: 'Creator Cards',
      icon: Users,
      desc: 'Influencer profiles with engagement data',
      element: (
        <div className="flex flex-col gap-1">
          {CREATORS.slice(0, 2).map((c) => (
            <Card key={c.id} className="flex items-center gap-1.5 px-2 py-1.5">
              <div className="w-[18px] h-[18px] rounded-[5px] bg-border flex items-center justify-center text-[9px]">
                {c.avatar}
              </div>
              <div className="flex-1">
                <div className="text-[9px] font-medium text-foreground">{c.name}</div>
              </div>
              <div
                className={cn(
                  'text-[9px] font-mono',
                  parseFloat(c.engagement) > 10 ? 'text-emerald-500' : 'text-foreground'
                )}
              >
                {c.engagement}
              </div>
            </Card>
          ))}
        </div>
      ),
    },
    {
      type: 'email',
      label: 'Email Templates',
      icon: Mail,
      desc: 'Outreach and campaign templates',
      element: (
        <Card className="overflow-hidden">
          <div className="px-2 py-1.5 border-b border-border">
            <div className="text-[8px] text-muted-foreground/60">To: 6 creators</div>
            <div className="text-[9px] font-medium text-foreground mt-px">
              New Release Promo Collab
            </div>
          </div>
          <div className="px-2 py-1.5 text-[8px] text-muted-foreground">
            Hi {'{{name}}'}, We&apos;d love to collaborate...
          </div>
        </Card>
      ),
    },
    {
      type: 'table',
      label: 'Data Tables',
      icon: LayoutGrid,
      desc: 'Structured data with sorting and highlights',
      element: (
        <Card className="overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {['Artist', 'Streams', 'Save %'].map((h, i) => (
                  <th
                    key={i}
                    className={cn(
                      'px-1.5 py-1 text-[7px] font-normal text-muted-foreground/60 border-b border-border',
                      i > 0 ? 'text-right' : 'text-left'
                    )}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Overmono', '4.87M', '6.4%'],
                ['Skee Mask', '2.38M', '8.3%'],
              ].map((r, ri) => (
                <tr key={ri}>
                  {r.map((v, ci) => (
                    <td
                      key={ci}
                      className={cn(
                        'px-1.5 py-1 text-[8px]',
                        ci > 0 ? 'text-right font-mono' : 'text-left',
                        ci === 0 ? 'text-foreground' : 'text-muted-foreground'
                      )}
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      ),
    },
    {
      type: 'release-timeline',
      label: 'Release Timeline',
      icon: FileText,
      desc: 'Upcoming releases with status pipeline',
      element: (
        <div className="flex flex-col gap-1">
          {[
            { t: 'Everything U Need', s: 'submitted', d: 'Apr 25' },
            { t: 'HAZE EP', s: 'mastering', d: 'May 9' },
            { t: 'ISS012', s: 'in progress', d: 'Jun 6' },
          ].map((r, i) => (
            <Card key={i} className="flex items-center gap-1.5 px-2 py-1.5">
              <div className="w-3.5 h-3.5 rounded bg-border flex items-center justify-center">
                <Music size={8} className="text-muted-foreground/60" />
              </div>
              <div className="flex-1">
                <div className="text-[9px] font-medium text-foreground">{r.t}</div>
                <div className="text-[7px] text-muted-foreground/60">{r.d}</div>
              </div>
              <div className="flex gap-0.5 items-center">
                {[0, 1, 2, 3].map((si) => (
                  <div
                    key={si}
                    className={cn(
                      'w-[5px] h-[5px] rounded-full',
                      si <= i ? 'bg-emerald-500' : 'bg-border'
                    )}
                  />
                ))}
              </div>
              <span
                className={cn(
                  'text-[7px] font-medium',
                  i === 0 ? 'text-emerald-500' : 'text-orange-400'
                )}
              >
                {r.s}
              </span>
            </Card>
          ))}
        </div>
      ),
    },
    {
      type: 'campaign-planner',
      label: 'Campaign Planner',
      icon: TrendingUp,
      desc: 'Active campaigns with status, reach, and budgets',
      element: (
        <div className="flex flex-col gap-1">
          {[
            { t: 'TikTok Sound Push', st: 'active', r: '2.4M', b: '$3.2K' },
            { t: 'Playlist Pitch', st: 'active', r: '890K', b: '$0' },
            { t: 'Pre-Save', st: 'draft', r: '—', b: '$1.5K' },
          ].map((c, i) => (
            <Card key={i} className="flex items-center gap-1.5 px-2 py-1.5">
              <div
                className={cn(
                  'w-1.5 h-1.5 rounded-full shrink-0',
                  c.st === 'active' ? 'bg-emerald-500' : 'bg-orange-400'
                )}
              />
              <div className="flex-1 text-[9px] font-medium text-foreground">{c.t}</div>
              <span className="text-[8px] font-mono text-muted-foreground">{c.r}</span>
              <span className="text-[8px] font-mono text-muted-foreground/60">{c.b}</span>
            </Card>
          ))}
        </div>
      ),
    },
    {
      type: 'content-calendar',
      label: 'Content Calendar',
      icon: LayoutGrid,
      desc: 'Scheduled posts across TikTok and Instagram',
      element: (
        <div className="flex flex-col gap-1">
          {[
            { p: 'TT', cap: 'Studio session teaser', d: 'Apr 11', s: 'scheduled' },
            { p: 'IG', cap: 'Fabric BTS', d: 'Apr 12', s: 'draft' },
            { p: 'TT', cap: 'HAZE snippet #1', d: 'Apr 14', s: 'scheduled' },
          ].map((c, i) => (
            <Card key={i} className="flex items-center gap-1.5 px-2 py-1">
              <div
                className="w-4 h-4 rounded flex items-center justify-center"
                style={{
                  background:
                    c.p === 'TT'
                      ? 'rgba(0,0,0,0.7)'
                      : 'linear-gradient(45deg,#f09433,#dc2743)',
                }}
              >
                <span className="text-[6px] text-white font-medium">{c.p}</span>
              </div>
              <div className="flex-1 text-[8px] text-foreground truncate">{c.cap}</div>
              <span className="text-[7px] text-muted-foreground/60 font-mono">{c.d}</span>
              <span
                className={cn(
                  'text-[7px] font-medium',
                  c.s === 'scheduled' ? 'text-purple-400' : 'text-orange-400'
                )}
              >
                {c.s}
              </span>
            </Card>
          ))}
        </div>
      ),
    },
    {
      type: 'audience-insights',
      label: 'Audience Insights',
      icon: User,
      desc: 'Demographics, geo, and listening behavior',
      element: (
        <Card className="px-2.5 py-2">
          <div className="text-[8px] font-normal text-muted-foreground/60 mb-1.5 uppercase">
            Top Markets
          </div>
          {[
            { c: 'UK', pct: 34 },
            { c: 'US', pct: 22 },
            { c: 'DE', pct: 11 },
          ].map((m, i) => (
            <div key={i} className="flex items-center gap-1 py-0.5">
              <span className="w-5 text-[8px] text-foreground">{m.c}</span>
              <Bar value={m.pct * 2} max={100} accent={i === 0} />
              <span
                className={cn(
                  'text-[8px] font-mono',
                  i === 0 ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {m.pct}%
              </span>
            </div>
          ))}
          <div className="flex gap-2 mt-1.5">
            {[
              { l: '18-24', v: '38%' },
              { l: '25-34', v: '31%' },
              { l: 'Peak', v: 'Fri 10pm' },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-[9px] font-mono font-medium text-foreground">{s.v}</div>
                <div className="text-[7px] text-muted-foreground/60">{s.l}</div>
              </div>
            ))}
          </div>
        </Card>
      ),
    },
    {
      type: 'playlist-pitch',
      label: 'Playlist Pitch',
      icon: Music,
      desc: 'Auto-generated playlist submission briefs',
      element: (
        <Card className="overflow-hidden">
          <div className="px-2 py-1.5 border-b border-border flex items-center gap-1">
            <div className="w-3.5 h-3.5 rounded bg-[#1DB954] flex items-center justify-center">
              <Music size={7} className="text-white" />
            </div>
            <span className="text-[9px] font-medium text-foreground">Playlist Pitch Brief</span>
          </div>
          <div className="px-2 py-1.5">
            <div className="text-[8px] text-muted-foreground mb-1">
              Target: <span className="text-foreground font-medium">Electronic Rising</span> (2.1M
              followers)
            </div>
            <div className="text-[8px] text-muted-foreground">
              Song: <span className="text-foreground font-medium">So U Kno</span> &middot; Save
              rate: <span className="text-emerald-500 font-medium">7.8%</span>
            </div>
            <div className="text-[7px] text-muted-foreground/60 mt-1">
              Fit score: 92% based on listener overlap
            </div>
          </div>
        </Card>
      ),
    },
    {
      type: 'ab-test',
      label: 'A/B Test Results',
      icon: Sparkles,
      desc: 'Campaign variant performance comparison',
      element: (
        <Card className="px-2.5 py-2">
          <div className="text-[8px] font-normal text-muted-foreground/60 mb-1.5 uppercase">
            Sound Push — 48h Results
          </div>
          {[
            { l: 'Variant A: Dance challenge', v: 8.4, w: true },
            { l: 'Variant B: Studio clip', v: 5.1, w: false },
          ].map((v, i) => (
            <div key={i} className="flex items-center gap-1.5 py-1">
              <div className="flex-1">
                <div
                  className={cn(
                    'text-[9px]',
                    v.w ? 'text-foreground font-medium' : 'text-muted-foreground font-normal'
                  )}
                >
                  {v.l}
                </div>
                <div className="mt-0.5 flex-1 h-[3px] rounded-full bg-border overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-full',
                      v.w ? 'bg-primary' : 'bg-muted-foreground/30'
                    )}
                    style={{ width: `${(v.v / 10) * 100}%` }}
                  />
                </div>
              </div>
              <span
                className={cn(
                  'text-[10px] font-mono font-medium',
                  v.w ? 'text-emerald-500' : 'text-muted-foreground'
                )}
              >
                {v.v}%
              </span>
              {v.w && <span className="text-[7px] text-emerald-500 font-medium">WINNER</span>}
            </div>
          ))}
        </Card>
      ),
    },
  ];
}

export function ArtifactsGallery() {
  const exampleArtifacts = getExampleArtifacts();

  return (
    <div className="flex-1 overflow-auto bg-background">
      <div className="max-w-[1080px] mx-auto px-8 py-7 pb-10">
        <div className="mb-6">
          <h1 className="text-2xl font-normal text-foreground tracking-tight mb-1">Artifacts</h1>
          <p className="text-[13px] text-muted-foreground/60">
            Output types generated by Agatha
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-3">
          {exampleArtifacts.map((ea) => (
            <Card key={ea.type} className="px-[18px] py-4 flex flex-col gap-2.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-border flex items-center justify-center">
                  <ea.icon size={14} className="text-primary" />
                </div>
                <div>
                  <div className="text-[13px] font-medium text-foreground">{ea.label}</div>
                  <div className="text-[10px] text-muted-foreground/60">{ea.desc}</div>
                </div>
              </div>
              <div className="pointer-events-none">{ea.element}</div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
