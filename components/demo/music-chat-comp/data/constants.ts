import type { UpcomingRelease, CampaignItem, ContentItem } from '../types';

export const MO = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export const PROJECT_COLORS = ["#007AFF","#34C759","#AF52DE","#FF9500","#FF3B30","#5AC8FA","#FF2D55","#FFCC00"];

export const RECENT = [
  { id: "r1", title: "Q1 streaming performance", time: "2m" },
  { id: "r2", title: "Overmono social audit", time: "1h" },
  { id: "r3", title: "Save rate analysis", time: "3h" },
  { id: "r4", title: "Creator search: UK Bass", time: "1d" },
  { id: "r5", title: "Gunk campaign outreach", time: "2d" },
];

export const PLATS = [
  { name: "Spotify", pct: 42, c: "#1DB954" },
  { name: "Apple Music", pct: 24, c: "#FC3C44" },
  { name: "YouTube", pct: 22, c: "#FF0000" },
  { name: "Tidal", pct: 7, c: "#888" },
  { name: "Other", pct: 5, c: "#555" },
];

export const UPCOMING_RELEASES: UpcomingRelease[] = [
  {id:"ur1",artistId:"a1",artist:"Overmono",title:"Everything U Need",type:"single",date:"Apr 25, 2026",status:"submitted",platforms:["Spotify","Apple Music","YouTube","Tidal"]},
  {id:"ur2",artistId:"a2",artist:"Yaeji",title:"HAZE",type:"EP",date:"May 9, 2026",status:"mastering",platforms:["Spotify","Apple Music","YouTube"]},
  {id:"ur3",artistId:"a3",artist:"Skee Mask",title:"ISS012",type:"album",date:"Jun 6, 2026",status:"in_progress",platforms:["Spotify","Apple Music","Bandcamp"]},
  {id:"ur4",artistId:"a4",artist:"SHERELLE",title:"160 Refix",type:"single",date:"Apr 18, 2026",status:"scheduled",platforms:["Spotify","Apple Music","YouTube","SoundCloud"]},
  {id:"ur5",artistId:"a1",artist:"Overmono",title:"Pieces LP",type:"album",date:"Jul 11, 2026",status:"in_progress",platforms:["Spotify","Apple Music","YouTube","Tidal","Bandcamp"]},
];

export const CAMPAIGNS: CampaignItem[] = [
  {id:"ca1",artistId:"a1",artist:"Overmono",title:"So U Kno TikTok Push",status:"active",type:"creator",reach:"2.4M",budget:"$3,200",startDate:"Mar 28, 2026"},
  {id:"ca2",artistId:"a1",artist:"Overmono",title:"Gunk Playlist Pitch",status:"active",type:"playlist",reach:"890K",budget:"$0",startDate:"Apr 1, 2026"},
  {id:"ca3",artistId:"a2",artist:"Yaeji",title:"HAZE Pre-Save Campaign",status:"draft",type:"social",reach:"—",budget:"$1,500",startDate:"Apr 20, 2026"},
  {id:"ca4",artistId:"a3",artist:"Skee Mask",title:"Session 7 Newsletter",status:"completed",type:"email",reach:"45K",budget:"$0",startDate:"Feb 15, 2026"},
  {id:"ca5",artistId:"a4",artist:"SHERELLE",title:"160 Refix Launch",status:"draft",type:"creator",reach:"—",budget:"$2,100",startDate:"Apr 14, 2026"},
];

export const CONTENT_CALENDAR: ContentItem[] = [
  {id:"cc1",artistId:"a1",artist:"Overmono",platform:"tiktok",caption:"Studio session clip — new collab teaser",scheduledDate:"Apr 11, 2026",status:"scheduled"},
  {id:"cc2",artistId:"a1",artist:"Overmono",platform:"instagram",caption:"Behind the scenes at Fabric",scheduledDate:"Apr 12, 2026",status:"draft"},
  {id:"cc3",artistId:"a2",artist:"Yaeji",platform:"tiktok",caption:"HAZE snippet #1 — sound drop",scheduledDate:"Apr 14, 2026",status:"scheduled"},
  {id:"cc4",artistId:"a1",artist:"Overmono",platform:"instagram",caption:"Everything U Need — pre-save now",scheduledDate:"Apr 18, 2026",status:"draft"},
  {id:"cc5",artistId:"a3",artist:"Skee Mask",platform:"instagram",caption:"ISS012 artwork reveal",scheduledDate:"May 1, 2026",status:"draft"},
  {id:"cc6",artistId:"a4",artist:"SHERELLE",platform:"tiktok",caption:"160 Refix dance challenge launch",scheduledDate:"Apr 18, 2026",status:"scheduled"},
];
