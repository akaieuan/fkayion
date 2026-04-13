import type { SocialPost, Creator, TrendingSound } from '../types';

export const POSTS: SocialPost[] = [
  {id:"s1",platform:"tiktok",handle:"@dj_overmono",avatar:"🎧",desc:"Unreleased clip from the studio — new one coming soon",views:"2.4M",likes:"182K",comments:"4.2K",saves:"31K",date:"2d ago",audio:"So U Kno — Overmono",audioUses:"12.4K",thumb:"🎬"},
  {id:"s2",platform:"instagram",handle:"@overmono_",avatar:"🎵",desc:"Live at Printworks. The bass was different that night.",views:"890K",likes:"94K",comments:"2.1K",saves:"12K",date:"4d ago",thumb:"📸"},
  {id:"s3",platform:"tiktok",handle:"@bassfanatic",avatar:"🔥",desc:"POV: Overmono drops So U Kno at 3am #UKBass #rave",views:"1.1M",likes:"156K",comments:"3.8K",saves:"28K",date:"1w ago",audio:"So U Kno — Overmono",audioUses:"12.4K",thumb:"🎬"},
  {id:"s4",platform:"instagram",handle:"@overmono_",avatar:"🎵",desc:"New merch drop. Link in bio.",views:"340K",likes:"42K",comments:"890",date:"1w ago",thumb:"🛍"},
  {id:"s5",platform:"tiktok",handle:"@raboraconteur",avatar:"🎶",desc:"This Overmono track is EVERYTHING rn",views:"680K",likes:"89K",comments:"2.4K",saves:"15K",date:"2w ago",audio:"Gunk — Overmono",audioUses:"3.2K",thumb:"🎬"},
];

export const CREATORS: Creator[] = [
  {id:"cr1",name:"Juana Skiles",handle:"@jskiles_x",platform:"tiktok",avatar:"👩🏽",followers:"214K",engagement:"8.2%",tags:["UK Bass","Rave","Dance"],price:"$280",location:"Toronto, CA",topView:"1.2M"},
  {id:"cr2",name:"Ramon Witting",handle:"@bratramon",platform:"tiktok",avatar:"👨🏻",followers:"95.5K",engagement:"6.8%",tags:["RaveTok","Local Scene"],price:"$150",location:"London, UK",topView:"890K"},
  {id:"cr3",name:"Gilbert Baumbach",handle:"@gillybb",platform:"instagram",avatar:"👨🏼",followers:"47.8K",engagement:"9.1%",tags:["House Fan","Club Culture"],price:"$120",location:"Bristol, UK",topView:"340K"},
  {id:"cr4",name:"Kristine Hansen",handle:"@k_hansen32",platform:"tiktok",avatar:"👩🏼",followers:"21.3K",engagement:"11.4%",tags:["Electronic","Dance"],price:"$80",location:"Amsterdam, NL",topView:"210K"},
  {id:"cr5",name:"Owen Auer-O'Reilly",handle:"@owen.o.jpg",platform:"tiktok",avatar:"👨🏽",followers:"12.6K",engagement:"13.2%",tags:["Quality UGC","Popup"],price:"$65",location:"New York, US",topView:"180K"},
  {id:"cr6",name:"Dorothy Hilpert",handle:"@dorohils",platform:"instagram",avatar:"👩🏻",followers:"8.2K",engagement:"15.1%",tags:["Micro","Authentic"],price:"$45",location:"Ottawa, CA",topView:"92K"},
];

export const TRENDING_SOUNDS: TrendingSound[] = [
  {id:"ts1",title:"So U Kno",artist:"Overmono",platform:"tiktok",creates:"12.4K",growth:"+120%",topCreator:"@bassfanatic",topViews:"1.1M"},
  {id:"ts2",title:"Gunk",artist:"Overmono",platform:"tiktok",creates:"3.2K",growth:"+45%",topCreator:"@raboraconteur",topViews:"680K"},
  {id:"ts3",title:"Ribbon",artist:"Four Tet",platform:"tiktok",creates:"8.9K",growth:"+62%",topCreator:"@ambienthead",topViews:"2.1M"},
  {id:"ts4",title:"Compro",artist:"Skee Mask",platform:"instagram",creates:"1.8K",growth:"+28%",topCreator:"@gillybb",topViews:"340K"},
  {id:"ts5",title:"Isoxo ID",artist:"Isoxo",platform:"tiktok",creates:"22.1K",growth:"+210%",topCreator:"@jskiles_x",topViews:"4.8M"},
  {id:"ts6",title:"Ecstasy",artist:"Disclosure",platform:"tiktok",creates:"6.3K",growth:"+38%",topCreator:"@k_hansen32",topViews:"920K"},
  {id:"ts7",title:"XTC",artist:"Fred again..",platform:"instagram",creates:"15.7K",growth:"+95%",topCreator:"@owen.o.jpg",topViews:"3.4M"},
  {id:"ts8",title:"Archangel",artist:"Burial",platform:"tiktok",creates:"2.1K",growth:"+18%",topCreator:"@bratramon",topViews:"410K"},
];

export const TRENDING_POSTS: SocialPost[] = [
  {id:"tp1",platform:"tiktok",handle:"@isoxo",avatar:"🎛",desc:"New unreleased clip going crazy in the comments",views:"4.8M",likes:"412K",comments:"8.9K",saves:"62K",date:"6h ago",audio:"Isoxo ID",audioUses:"22.1K",thumb:"🔊"},
  {id:"tp2",platform:"tiktok",handle:"@fredagainagain",avatar:"🎹",desc:"The moment this dropped at Warehouse Project",views:"3.4M",likes:"298K",comments:"5.2K",saves:"41K",date:"1d ago",audio:"XTC — Fred again..",audioUses:"15.7K",thumb:"🎬"},
  {id:"tp3",platform:"instagram",handle:"@fourtet",avatar:"🎵",desc:"New album visualiser — out everywhere Friday",views:"2.1M",likes:"186K",comments:"3.1K",saves:"29K",date:"2d ago",thumb:"🌀"},
  {id:"tp4",platform:"tiktok",handle:"@disclosuremusic",avatar:"🎧",desc:"POV: you finally hear Ecstasy on a proper system",views:"1.8M",likes:"142K",comments:"3.4K",saves:"22K",date:"3d ago",audio:"Ecstasy — Disclosure",audioUses:"6.3K",thumb:"🔈"},
  {id:"tp5",platform:"tiktok",handle:"@dj_overmono",avatar:"🎧",desc:"Studio session for the EP — this one is different",views:"1.2M",likes:"98K",comments:"2.8K",saves:"18K",date:"4d ago",audio:"So U Kno — Overmono",audioUses:"12.4K",thumb:"🎬"},
  {id:"tp6",platform:"instagram",handle:"@burial_music",avatar:"🌙",desc:"South London 2am. Always.",views:"890K",likes:"76K",comments:"1.9K",saves:"14K",date:"5d ago",thumb:"🌃"},
];
