import type { Artist, TrackedSong } from '../types';

export const ART: Artist[] = [
  {id:"a1",name:"Overmono",genre:"UK Bass",streams:"4.87M",listeners:"2.4M",saves:"312K",sr:"6.4%",pl:847,delta:"+18%",up:true,mo:[32,35,38,41,39,45,48,52,55,58,61,68],songs:[{name:"So U Kno",str:1820,sav:142,rate:7.8,pl:312},{name:"Gunk",str:1140,sav:68,rate:5.9,pl:201},{name:"Blow Out",str:980,sav:58,rate:5.9,pl:178},{name:"Is U",str:910,sav:44,rate:4.8,pl:156}]},
  {id:"a2",name:"Yaeji",genre:"Electronic",streams:"4.93M",listeners:"1.8M",saves:"287K",sr:"5.8%",pl:623,delta:"+12%",up:true,mo:[28,30,33,36,38,40,42,44,47,50,52,55],songs:[{name:"Raingurl",str:2100,sav:168,rate:8.0,pl:289},{name:"One More",str:1400,sav:72,rate:5.1,pl:178}]},
  {id:"a3",name:"Skee Mask",genre:"Ambient",streams:"2.38M",listeners:"890K",saves:"198K",sr:"8.3%",pl:412,delta:"+24%",up:true,mo:[15,17,19,22,24,27,29,32,35,38,42,47],songs:[{name:"Session 7",str:680,sav:78,rate:11.5,pl:156},{name:"Flyby VFR",str:520,sav:52,rate:10.0,pl:112}]},
  {id:"a4",name:"SHERELLE",genre:"Jungle",streams:"1.34M",listeners:"420K",saves:"94K",sr:"7.0%",pl:289,delta:"+31%",up:true,mo:[8,10,12,14,16,19,22,24,27,30,33,38],songs:[{name:"160 Down the A",str:480,sav:41,rate:8.5,pl:98}]},
  {id:"a5",name:"Four Tet",genre:"Electronic",streams:"5.62M",listeners:"2.8M",saves:"445K",sr:"7.9%",pl:1240,delta:"+5%",up:true,mo:[50,51,52,53,54,55,56,57,58,59,60,62],songs:[]},
  {id:"a6",name:"Caribou",genre:"Electronic",streams:"3.21M",listeners:"1.1M",saves:"210K",sr:"6.5%",pl:580,delta:"+8%",up:true,mo:[25,26,28,29,31,32,34,35,37,38,40,42],songs:[]},
  {id:"a7",name:"DJ Python",genre:"Deep Reggaeton",streams:"1.05M",listeners:"310K",saves:"67K",sr:"6.4%",pl:178,delta:"-3%",up:false,mo:[12,11,12,11,10,11,10,10,11,10,10,10],songs:[]},
  {id:"a8",name:"Floating Points",genre:"Electronic",streams:"2.11M",listeners:"780K",saves:"156K",sr:"7.4%",pl:490,delta:"+14%",up:true,mo:[18,19,21,22,24,25,27,28,30,31,33,36],songs:[]},
];

export const TRACKED_SONGS: TrackedSong[] = [
  {id:"ts1",title:"So U Kno",artist:"Overmono",artistId:"a1",releaseDate:"Jul 21, 2023",tiktokCreates:46190,tiktok24h:9,tiktok24hPct:12,igCreates:37859,ig24h:6,ig24hPct:4},
  {id:"ts2",title:"Gunk",artist:"Overmono",artistId:"a1",releaseDate:"Aug 8, 2024",tiktokCreates:20670,tiktok24h:302,tiktok24hPct:2,igCreates:21132,ig24h:54,ig24hPct:3},
  {id:"ts3",title:"Raingurl",artist:"Yaeji",artistId:"a2",releaseDate:"Sep 15, 2023",tiktokCreates:13801,tiktok24h:8,tiktok24hPct:0,igCreates:9282,ig24h:7,ig24hPct:0},
  {id:"ts4",title:"Session 7",artist:"Skee Mask",artistId:"a3",releaseDate:"Jul 14, 2023",tiktokCreates:10272,tiktok24h:3,tiktok24hPct:0,igCreates:1215,ig24h:0,ig24hPct:0},
  {id:"ts5",title:"160 Down the A",artist:"SHERELLE",artistId:"a4",releaseDate:"Sep 22, 2016",tiktokCreates:4911,tiktok24h:8,tiktok24hPct:0,igCreates:541,ig24h:0,ig24hPct:0},
  {id:"ts6",title:"Blow Out",artist:"Overmono",artistId:"a1",releaseDate:"Jul 19, 2024",tiktokCreates:4140,tiktok24h:36,tiktok24hPct:4,igCreates:2701,ig24h:3,ig24hPct:0},
  {id:"ts7",title:"One More",artist:"Yaeji",artistId:"a2",releaseDate:"Apr 8, 2022",tiktokCreates:2344,tiktok24h:1,tiktok24hPct:2,igCreates:3213,ig24h:3,ig24hPct:0},
  {id:"ts8",title:"Flyby VFR",artist:"Skee Mask",artistId:"a3",releaseDate:"Mar 12, 2024",tiktokCreates:1890,tiktok24h:4,tiktok24hPct:0,igCreates:980,ig24h:1,ig24hPct:0},
  {id:"ts9",title:"Is U",artist:"Overmono",artistId:"a1",releaseDate:"Nov 3, 2023",tiktokCreates:1520,tiktok24h:2,tiktok24hPct:0,igCreates:670,ig24h:0,ig24hPct:0},
];
