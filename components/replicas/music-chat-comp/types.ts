export interface Song { name: string; str: number; sav: number; rate: number; pl: number }
export interface Artist { id: string; name: string; genre: string; streams: string; listeners: string; saves: string; sr: string; pl: number; delta: string; up: boolean; mo: number[]; songs: Song[] }
export interface TrackedSong { id: string; title: string; artist: string; artistId: string; releaseDate: string; tiktokCreates: number; tiktok24h: number; tiktok24hPct: number; igCreates: number; ig24h: number; ig24hPct: number }
export interface SocialPost { id: string; platform: string; handle: string; avatar: string; desc: string; views: string; likes: string; comments: string; saves?: string; date: string; audio?: string; audioUses?: string; thumb: string }
export interface Creator { id: string; name: string; handle: string; platform: string; avatar: string; followers: string; engagement: string; tags: string[]; price: string; location: string; topView: string }
export interface ProjectFile { id: string; name: string; type: string; size: string }
export interface ProjectChat { id: string; title: string; time: string; msgCount: number }
export interface Project {
  id: string; name: string; color: string; description: string;
  type: "release" | "ep" | "album" | "campaign" | "analysis" | "general";
  artists: string[];
  files: ProjectFile[];
  chats: ProjectChat[];
  artifactIds: string[];
  createdAt: string;
  updatedAt: string;
}
export interface StatItem { label: string; value: string; delta?: string; up?: boolean; sub?: string }
export interface CompRow { label: string; sub?: string; value: number; max: number; accent?: boolean; meta?: string }
export interface EmailData { sender: string; to: string; subject: string; body: string }
export interface Action { label: string; prompt?: string }
export interface ArtifactData {
  id: string; title: string; subtitle?: string;
  stats?: StatItem[]; body?: string;
  chart?: { title: string; bars: { label: string; value: number }[] };
  comparisons?: { title: string; rows: CompRow[] };
  posts?: SocialPost[]; creators?: Creator[];
  table?: { columns: string[]; rows: { cells: string[]; highlight?: boolean }[] };
  actions?: Action[];
}
export interface TrendingSound { id: string; title: string; artist: string; platform: "tiktok" | "instagram"; creates: string; growth: string; topCreator: string; topViews: string }
export interface UpcomingRelease { id: string; artistId: string; artist: string; title: string; type: "single" | "EP" | "album"; date: string; status: "scheduled" | "in_progress" | "mastering" | "submitted"; platforms: string[] }
export interface CampaignItem { id: string; artistId: string; artist: string; title: string; status: "active" | "draft" | "completed" | "paused"; type: "creator" | "playlist" | "social" | "email"; reach: string; budget: string; startDate: string }
export interface ContentItem { id: string; artistId: string; artist: string; platform: string; caption: string; scheduledDate: string; status: "published" | "scheduled" | "draft"; engagement?: string }
export interface Block { type: string; stats?: StatItem[]; chart?: { title: string; bars: { label: string; value: number }[] }; comparisons?: { title: string; rows: CompRow[] }; posts?: SocialPost[]; creators?: Creator[]; email?: EmailData; actions?: Action[]; text?: string }
export interface Message { id: string; role: "user" | "assistant"; text: string; blocks?: Block[]; artifacts?: ArtifactData[]; ts: number; contextArtists?: string[] }
