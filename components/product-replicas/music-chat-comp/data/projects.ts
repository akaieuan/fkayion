import type { Project } from '../types';

export const SEED_PROJECTS: Project[] = [
  {
    id: "proj1", name: "Everything U Need — Single", color: "#007AFF",
    description: "Single release campaign for Overmono's new track. Coordinating pre-save, creator push, and playlist pitching across Spotify, Apple Music, YouTube, and Tidal.",
    type: "release", artists: ["Overmono"],
    files: [
      { id:"f1", name:"Everything U Need - Master.wav", type:"audio", size:"42MB" },
      { id:"f2", name:"Artwork_Final.png", type:"image", size:"3.2MB" },
      { id:"f3", name:"Press Release Draft.pdf", type:"pdf", size:"184KB" },
      { id:"f4", name:"Playlist Targets.csv", type:"csv", size:"12KB" },
    ],
    chats: [
      { id:"pc1", title:"Pre-save strategy", time:"2h", msgCount:14 },
      { id:"pc2", title:"Creator brief draft", time:"1d", msgCount:8 },
      { id:"pc3", title:"Playlist pitch analysis", time:"3d", msgCount:22 },
    ],
    artifactIds: ["art1","art2"],
    createdAt: "Mar 15, 2026", updatedAt: "2h ago",
  },
  {
    id: "proj2", name: "HAZE EP", color: "#AF52DE",
    description: "Full EP rollout for Yaeji — 5 tracks, staggered single drops, social content calendar, and cross-platform pre-save campaign.",
    type: "ep", artists: ["Yaeji"],
    files: [
      { id:"f5", name:"HAZE EP - Stems.zip", type:"archive", size:"890MB" },
      { id:"f6", name:"Track Sequence Notes.md", type:"doc", size:"4KB" },
      { id:"f7", name:"HAZE Mood Board.png", type:"image", size:"8.1MB" },
    ],
    chats: [
      { id:"pc4", title:"Rollout timeline", time:"4h", msgCount:18 },
      { id:"pc5", title:"Sound strategy for TikTok", time:"2d", msgCount:11 },
    ],
    artifactIds: ["art3"],
    createdAt: "Mar 22, 2026", updatedAt: "4h ago",
  },
  {
    id: "proj3", name: "ISS012 Album Campaign", color: "#34C759",
    description: "Album release for Skee Mask. Niche electronic audience — focus on Bandcamp pre-orders, editorial playlist placement, and newsletter outreach.",
    type: "album", artists: ["Skee Mask"],
    files: [
      { id:"f8", name:"ISS012 Tracklist.md", type:"doc", size:"2KB" },
      { id:"f9", name:"Bandcamp Strategy.pdf", type:"pdf", size:"320KB" },
    ],
    chats: [
      { id:"pc6", title:"Editorial pitch angles", time:"1d", msgCount:9 },
    ],
    artifactIds: [],
    createdAt: "Apr 1, 2026", updatedAt: "1d ago",
  },
  {
    id: "proj4", name: "Q1 Cross-Artist Analysis", color: "#FF9500",
    description: "Deep dive into Q1 2026 performance across all roster artists. Save rate trends, social growth, playlist adds, and audience overlap analysis.",
    type: "analysis", artists: ["Overmono","Yaeji","Skee Mask","SHERELLE","Four Tet","Caribou","DJ Python","Floating Points"],
    files: [
      { id:"f10", name:"Q1 Streaming Export.csv", type:"csv", size:"1.4MB" },
      { id:"f11", name:"Social Metrics Dashboard.pdf", type:"pdf", size:"2.8MB" },
    ],
    chats: [
      { id:"pc7", title:"Save rate deep dive", time:"3h", msgCount:26 },
      { id:"pc8", title:"Social vs streaming correlation", time:"1d", msgCount:15 },
      { id:"pc9", title:"DJ Python rescue plan", time:"2d", msgCount:12 },
    ],
    artifactIds: ["art4","art5","art6"],
    createdAt: "Feb 28, 2026", updatedAt: "3h ago",
  },
  {
    id: "proj5", name: "UK Bass Creator Network", color: "#FF3B30",
    description: "Building and managing creator relationships for UK Bass content. Tracking engagement, outreach history, and campaign results across micro and mid-tier creators.",
    type: "campaign", artists: ["Overmono","SHERELLE"],
    files: [
      { id:"f12", name:"Creator Database.csv", type:"csv", size:"56KB" },
      { id:"f13", name:"Outreach Templates.md", type:"doc", size:"8KB" },
      { id:"f14", name:"Campaign Results Q1.pdf", type:"pdf", size:"1.1MB" },
    ],
    chats: [
      { id:"pc10", title:"Creator discovery", time:"5h", msgCount:19 },
      { id:"pc11", title:"Outreach draft review", time:"2d", msgCount:7 },
    ],
    artifactIds: ["art7"],
    createdAt: "Mar 5, 2026", updatedAt: "5h ago",
  },
];
