import type { ArtifactData, Block } from './types';
import { ART } from './data/artists';
import { POSTS, CREATORS } from './data/social';
import { uid } from './uid';

export async function api(msg: string): Promise<{ text: string; blocks: Block[]; artifacts?: ArtifactData[] }> {
  await new Promise(r => setTimeout(r, 600 + Math.random() * 400));
  const q = msg.toLowerCase();
  const artist = ART.find(a => q.includes(a.name.toLowerCase())) || ART[0];
  const allSongs = ART.flatMap(a => a.songs.map(s => ({ ...s, artist: a.name })));
  const sorted = [...allSongs].sort((a, b) => b.rate - a.rate);

  if (q.includes("social") || q.includes("tiktok") || q.includes("reel") || q.includes("presence") || q.includes("content")) {
    return {
      text: `**${artist.name}**'s social presence is strong — **5.3M impressions** in the last 30 days with an **8.2% engagement rate**, double the category average.\n\nThe sound **"${artist.songs[0]?.name || "—"}"** has been used in **12.4K creates** — trending upward.`,
      blocks: [
        { type:"stats", stats:[{label:"Impressions",value:"5.3M",delta:"+34%",up:true},{label:"UGC Creates",value:"847",delta:"+120%",up:true},{label:"Engagement",value:"8.2%",sub:"vs 4.1% avg"},{label:"Sound Uses",value:"2,341",delta:"+67%",up:true}] },
        { type:"social", posts:POSTS.slice(0,3) },
        { type:"actions", actions:[{label:"Find creators for this sound",prompt:`Find creators making content with ${artist.name}'s sounds`},{label:"Draft campaign brief",prompt:`Draft a creator campaign brief for ${artist.name}`},{label:"Export social report"}] },
      ],
      artifacts: [{
        id: uid(), title:`${artist.name} — Social Deep Dive`, subtitle:"Full content performance, audio usage, audience insights, and embedded social content",
        stats:[{label:"TikTok Views",value:"4.2M",delta:"+41%",up:true},{label:"IG Impressions",value:"1.1M",delta:"+18%",up:true},{label:"Avg Sentiment",value:"92% positive"},{label:"UGC Engagement",value:"8.5%",sub:"vs 3.2% benchmark"},{label:"Sound Creates",value:"12.4K",delta:"+120%",up:true},{label:"Avg Watch Time",value:"14.2s",sub:"vs 8.1s avg"}],
        body:`<h3 style="font-size:15px;font-weight:500;margin:0 0 10px">Content Strategy Analysis</h3><p style="font-size:13px;line-height:1.7;opacity:0.7;margin:0 0 16px">Studio previews generate the highest engagement (8.5%) but UGC fan content drives more total volume. The <strong style="opacity:1">"So U Kno"</strong> sound is in an active growth cycle — creates up 120% week-over-week. This is the window for a coordinated creator push.</p><h3 style="font-size:15px;font-weight:500;margin:0 0 10px">Platform Breakdown</h3><p style="font-size:13px;line-height:1.7;opacity:0.7;margin:0 0 16px"><strong style="opacity:1">TikTok</strong> accounts for 74% of total impressions. Fan-made content with the "So U Kno" sound averages 8.2% engagement vs 3.1% for official posts. <strong style="opacity:1">Instagram</strong> Reels perform best when cross-posted from TikTok within 24 hours — 2.3x more reach than native-first posts.</p><h3 style="font-size:15px;font-weight:500;margin:0 0 10px">Audience Demographics</h3><p style="font-size:13px;line-height:1.7;opacity:0.7;margin:0 0 16px">Core audience: 18-28, 62% male, concentrated in UK (34%), US (22%), and DE (11%). Peak engagement: Friday-Saturday 10pm-2am GMT. The audience over-indexes on electronic music, festival culture, and streetwear.</p><h3 style="font-size:15px;font-weight:500;margin:0 0 10px">Recommendation</h3><p style="font-size:13px;line-height:1.7;opacity:0.7;margin:0">Target 20-30 creators in the 10K-100K follower range using this sound. Estimated cost: $3,200. Expected incremental creates: 400-600. This bracket has 3x the engagement-to-cost ratio of larger creators. Ideal posting window: Thursday-Saturday evenings.</p>`,
        comparisons:{title:"Engagement by Content Type",rows:[{label:"Studio Previews",value:8.5,max:10,accent:true,meta:"2.4M avg views"},{label:"UGC / Fan Content",value:7.2,max:10,meta:"890K avg views"},{label:"Live Event Clips",value:6.8,max:10,meta:"680K avg views"},{label:"Behind the Scenes",value:4.1,max:10,meta:"340K avg views"},{label:"Merch / Promo",value:2.3,max:10,meta:"120K avg views"}]},
        posts: POSTS,
        actions:[{label:"Find creators for this sound",prompt:`Find creators making content with ${artist.name}'s sounds`},{label:"Draft campaign brief",prompt:`Draft a creator campaign brief for ${artist.name}`},{label:"Compare with Yaeji's social",prompt:`Compare ${artist.name} vs Yaeji social performance`},{label:"Export full report"}],
      }],
    };
  }

  if (q.includes("creator") || q.includes("find") || q.includes("who")) {
    return {
      text: `Found **${CREATORS.length} creators** matching your criteria. Micro-creators (10K-50K) are converting at **3x the rate** of larger accounts for UK Bass content.`,
      blocks: [
        { type:"stats", stats:[{label:"Matching Creators",value:`${CREATORS.length}`,sub:"based on criteria"},{label:"Combined Reach",value:"399K"},{label:"Avg Engagement",value:"10.6%",sub:"vs 4.1% benchmark"},{label:"Est. Total Cost",value:"$740",sub:"for all 6"}] },
        { type:"creators", creators:CREATORS.slice(0,3) },
        { type:"actions", actions:[{label:"Draft outreach to all",prompt:`Draft a bulk outreach email for ${artist.name} campaign targeting these creators`},{label:"Refine criteria",prompt:"Show me creators with 50K+ followers who post electronic music content"},{label:"Export creator list"}] },
      ],
      artifacts: [{
        id: uid(), title:"Creator Discovery — Full Results", subtitle:`${CREATORS.length} creators matching UK Bass / Electronic criteria with engagement analysis`,
        stats:[{label:"Avg Engagement",value:"10.6%",delta:"+157%",up:true,sub:"vs 4.1% benchmark"},{label:"Best ROI Bracket",value:"10K-50K",sub:"followers"},{label:"Top Engagement",value:"15.1%",sub:"@dorohils"},{label:"Est. CPM",value:"$2.40",sub:"vs $8.20 avg"},{label:"Predicted ROI",value:"4.2x",sub:"based on similar campaigns"},{label:"Avg Response Rate",value:"34%",sub:"for this bracket"}],
        body:`<h3 style="font-size:15px;font-weight:500;margin:0 0 10px">Creator Tier Analysis</h3><p style="font-size:13px;line-height:1.7;opacity:0.7;margin:0 0 16px">Micro-creators (10K-50K followers) deliver <strong style="opacity:1">3.2x the engagement-to-cost ratio</strong> compared to creators with 100K+ followers for UK Bass content. The sweet spot is creators with 15K-35K followers who post at least 3x/week and have existing electronic music content.</p><h3 style="font-size:15px;font-weight:500;margin:0 0 10px">Outreach Timing</h3><p style="font-size:13px;line-height:1.7;opacity:0.7;margin:0 0 16px">Based on response patterns, DMs sent Tuesday-Thursday between 10am-2pm local time have a <strong style="opacity:1">47% higher response rate</strong>. Include a specific reference to their recent content to increase acceptance by 2.1x.</p>`,
        creators: CREATORS,
        comparisons:{title:"Engagement vs Follower Count",rows:CREATORS.map(c=>({label:c.name,sub:`${c.handle} - ${c.location}`,value:parseFloat(c.engagement),max:16,accent:parseFloat(c.engagement)>10,meta:c.followers+" followers"}))},
        actions:[{label:"Draft outreach to all",prompt:`Draft a bulk outreach email for ${artist.name} campaign`},{label:"Filter by location",prompt:"Show UK-based creators only"},{label:"Compare creator ROI",prompt:"Show predicted ROI for each creator tier"},{label:"Export to CSV"}],
      }],
    };
  }

  if (q.includes("outreach") || q.includes("email") || q.includes("campaign") || q.includes("draft") || q.includes("brief")) {
    return {
      text: `Here's a campaign brief and outreach template for **${artist.name}**. I've pre-selected ${CREATORS.length} creators based on engagement fit.`,
      blocks: [
        { type:"stats", stats:[{label:"Target Creators",value:`${CREATORS.length}`},{label:"Est. Reach",value:"8.4M",sub:"combined"},{label:"Avg Engagement",value:"10.6%"},{label:"Est. Budget",value:"$740"}] },
        { type:"email", email:{sender:"collab@yourlabel.com",to:`${CREATORS.length} creators (bulk)`,subject:`${artist.name} — New Release Promo Collab`,body:`Hi {{creator_name}},\n\nWe've been following your content and think you'd be a great fit to help promote ${artist.name}'s upcoming release.\n\nHere's what we're looking for:\n- 1 TikTok using the sound "${artist.songs[0]?.name || "new track"}"\n- Post within 7 days of release\n- Creative freedom on concept\n\nCompensation: {{rate}}\nBrief & assets: {{collab_link}}\n\nLet us know if you're interested!\n\nBest,\nTeam`} },
        { type:"actions", actions:[{label:"Send to all creators"},{label:"Customize template",prompt:"Help me customize this outreach template"},{label:"Add follow-up email",prompt:"Draft a follow-up email for creators who haven't responded"}] },
      ],
    };
  }

  if (q.includes("save") || q.includes("conversion") || q.includes("a/b")) {
    return {
      text: `**${artist.name}** generated **${artist.saves}** saves at **${artist.sr}** conversion. Top track **${artist.songs[0]?.name || "—"}** converts at **${artist.songs[0]?.rate || 0}%** — ${(artist.songs[0]?.rate || 0) > 7 ? "above" : "near"} the 7.2% catalog average.`,
      blocks: [
        { type:"stats", stats:[{label:"Total Saves",value:artist.saves,delta:artist.delta,up:artist.up},{label:"Save Rate",value:artist.sr,delta:"+0.6pp vs avg",up:true},{label:"Top Song",value:`${artist.songs[0]?.rate || 0}%`,sub:artist.songs[0]?.name},{label:"Playlists",value:artist.pl.toLocaleString()}] },
        { type:"chart", chart:{title:"Saves by Song (K)",bars:artist.songs.map(s=>({label:s.name,value:s.sav}))} },
        { type:"actions", actions:[{label:"Pitch top converters",prompt:`Create playlist pitch for ${artist.name}'s best-converting songs`},{label:"Show social driving saves",prompt:`Show ${artist.name}'s social content driving save conversions`},{label:"Compare with Skee Mask",prompt:"Compare save rates for Overmono vs Skee Mask"}] },
      ],
    };
  }

  if (q.includes("artist") || q.includes("trending") || q.includes("perform")) {
    return {
      text: "Here's the full artist performance overview with save rates and conversion data.",
      blocks: [
        { type:"stats", stats:[{label:"Avg Save Rate",value:"7.2%",delta:"+0.8pp",up:true},{label:"Best Converter",value:"Skee Mask",sub:"8.3%"},{label:"Fastest Growing",value:"SHERELLE",sub:"+31% QoQ"}] },
        { type:"comparison", comparisons:{title:"Save Rate by Artist",rows:ART.slice(0,6).sort((a,b)=>parseFloat(b.sr)-parseFloat(a.sr)).map(a=>({label:a.name,sub:a.genre,value:parseFloat(a.sr),max:10,accent:parseFloat(a.sr)>7,meta:`${a.saves} saves`}))} },
        { type:"actions", actions:[{label:"Deep dive any artist",prompt:"Show me Skee Mask's saves and social presence"},{label:"Compare top 3",prompt:"Compare Skee Mask vs Four Tet vs SHERELLE"}] },
      ],
      artifacts: [{
        id: uid(), title:"Artist Performance — Q1 2026", subtitle:"Complete performance data with streaming, saves, social, and conversion metrics",
        stats:[{label:"Total Catalog Streams",value:"21.4M",delta:"+14%",up:true},{label:"Avg Save Rate",value:"7.2%",delta:"+0.8pp",up:true},{label:"Best Converter",value:"Skee Mask",sub:"8.3% save rate"},{label:"Fastest Growth",value:"SHERELLE",sub:"+31% QoQ"}],
        body:`<h3 style="font-size:15px;font-weight:500;margin:0 0 10px">Q1 2026 Overview</h3><p style="font-size:13px;line-height:1.7;opacity:0.7;margin:0 0 16px">Overall catalog performance is up 14% QoQ driven by <strong style="opacity:1">Overmono's</strong> consistent streaming growth and <strong style="opacity:1">SHERELLE's</strong> breakout quarter. Save rates are trending upward across the board, suggesting improved listener retention and playlist algorithm favorability.</p><h3 style="font-size:15px;font-weight:500;margin:0 0 10px">Key Insights</h3><p style="font-size:13px;line-height:1.7;opacity:0.7;margin:0 0 16px"><strong style="opacity:1">Skee Mask</strong> has the highest save rate (8.3%) despite lower total streams — indicating a highly engaged niche audience. <strong style="opacity:1">DJ Python</strong> is the only artist trending down (-3%) and may benefit from a social push or playlist repositioning.</p>`,
        table:{columns:["Artist","Genre","Streams","Listeners","Saves","Save Rate","QoQ"],rows:ART.map(a=>({cells:[a.name,a.genre,a.streams,a.listeners,a.saves,a.sr,a.delta],highlight:parseFloat(a.sr)>7}))},
        comparisons:{title:"Save Rate Ranking",rows:ART.sort((a,b)=>parseFloat(b.sr)-parseFloat(a.sr)).map(a=>({label:a.name,sub:a.genre,value:parseFloat(a.sr),max:10,accent:parseFloat(a.sr)>7,meta:`${a.saves} saves`}))},
        actions:[{label:"Deep dive Skee Mask",prompt:"Show me Skee Mask's saves and social presence"},{label:"Rescue DJ Python",prompt:"Show DJ Python's performance and suggest growth strategies"},{label:"Compare top 3",prompt:"Compare Skee Mask vs Four Tet vs SHERELLE"},{label:"Export Q1 report"}],
      }],
    };
  }

  return {
    text: "What can I help you with?",
    blocks: [{type:"actions",actions:[{label:"Streaming analytics",prompt:"How are Overmono's saves performing?"},{label:"Social audit",prompt:"Show Overmono's social presence and top content"},{label:"Find creators",prompt:"Find creators for UK Bass music promotion"},{label:"Campaign outreach",prompt:"Draft creator outreach for Overmono's latest release"}]}],
  };
}
