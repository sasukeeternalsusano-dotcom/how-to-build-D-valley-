(function(){
"use strict";
var T=32,VW=10,VH=12,OW=64,MW=(window.__DVMW||64),MH=(window.__DVMH||100),DX=[0,1,0,-1],DY=[-1,0,1,0];
function $(i){return document.getElementById(i)}
var cv=$("cv"),cx=cv.getContext("2d");var SC=(window.devicePixelRatio||1)>=2?3:2;cv.width=10*32*SC;cv.height=12*32*SC;cx.setTransform(SC,0,0,SC,0,0);cx.imageSmoothingEnabled=false;
var SAVEKEY="danoya-valley-v1",SHIRT="#1f2a4a",CH2=false,OTHER="Danoya",ROLE={p:"doodi",n:"danoya"};
var rm=false;try{rm=matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){}
function ls(k,v){try{if(v===undefined)return localStorage.getItem(k);if(v===null)localStorage.removeItem(k);else localStorage.setItem(k,v)}catch(e){return null}}
function R(x,y,w,h,c){cx.fillStyle=c;cx.fillRect(Math.round(x),Math.round(y),w,h)}
function mul(s){return function(){s|=0;s=s+0x6D2B79F5|0;var t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
var rnd=mul(20260211);
/* ---------- world ---------- */
var GR=0,PA=1,WA=2,SA=3,FO=4,SO=5,WO=6,DW=7;
var ground=new Uint8Array(MW*MH),solid=new Uint8Array(MW*MH),inter={},props=[],plots={};
function ix(x,y){return y*MW+x}
function inb(x,y){return x>=0&&y>=0&&x<MW&&y<MH}
function setG(x,y,g){if(inb(x,y))ground[ix(x,y)]=g}
function rect(x0,y0,x1,y1,g){for(var y=y0;y<=y1;y++)for(var x=x0;x<=x1;x++)setG(x,y,g)}
function path(a){for(var i=0;i<a.length-1;i++){var x0=a[i][0],y0=a[i][1],x1=a[i+1][0],y1=a[i+1][1];
  var x=x0,y=y0;while(x!==x1||y!==y1){for(var dx=0;dx<2;dx++)for(var dy=0;dy<2;dy++){var g=ground[ix(Math.min(MW-1,x+dx),Math.min(MH-1,y+dy))];if(g===GR||g===FO||g===SA)setG(x+dx,y+dy,PA)}
    if(x!==x1)x+=x<x1?1:-1;else y+=y<y1?1:-1}}}
var BUILD={farm:{x:7,y:29,w:5,h:4,door:9,roof:"#c24b3b",wall:"#b9824f",name:"Our cabin"},
 shop:{x:28,y:18,w:5,h:4,door:30,roof:"#3a7bd5",wall:"#d9b98a",name:"Shop"},
 cot:{x:38,y:18,w:5,h:4,door:40,roof:"#8a4fb0",wall:"#e8cfae",name:"Danoya's cottage",sign:"DANOYA'S COTTAGE"}};
var homeBuilt=false,HOME={x:2,y:36,w:6,h:5,door:4};
var zone={forest:[1,1,23,22],meadow:[28,2,62,15],lake:[54,30],beach:[26,41,63,43]};
function buildWorld(){
  ground.fill(GR);solid.fill(0);props=[];inter={};
  for(var y=0;y<MH;y++)for(var x=0;x<OW;x++)if(x>=1&&x<=23&&y>=1&&y<=22&&rnd()<.7)ground[ix(x,y)]=FO;
  rect(0,44,MW-1,47,DW);rect(0,42,25,43,GR);rect(26,41,63,43,SA);rect(0,41,25,41,GR);
  rect(26,40,63,40,SA);
  for(var y=0;y<MH;y++)for(var x=0;x<OW;x++){var dx=(x-54)/8.6,dy=(y-31)/7.6,d=dx*dx+dy*dy;if(d<1)ground[ix(x,y)]=WA;else if(d<1.45&&ground[ix(x,y)]!==DW)ground[ix(x,y)]=SA}
  /* dock */
  for(var x=45;x<=52;x++){setG(x,31,WO);setG(x,32,WO)}
  /* paths */
  path([[9,34],[9,36],[20,36],[20,26],[27,26],[36,26]]);
  path([[36,26],[36,22]]);path([[30,23],[30,26]]);path([[40,23],[40,26]]);
  path([[36,26],[36,12],[46,12]]);path([[36,26],[36,39]]);path([[36,29],[44,29],[44,31]]);
  path([[20,26],[20,21],[12,21],[12,10],[12,6]]);path([[12,10],[8,6]]);
  path([[4,41],[4,37],[9,36]]);path([[46,12],[46,9]]);path([[9,36],[6,35]]);
  /* soil plots */
  rect(13,34,18,37,SO);
  /* buildings */
  [BUILD.farm,BUILD.shop,BUILD.cot].forEach(function(b){
    for(var y=b.y;y<b.y+b.h;y++)for(var x=b.x;x<b.x+b.w;x++){solid[ix(x,y)]=1;if(ground[ix(x,y)]===FO)ground[ix(x,y)]=GR}
    setG(b.door,b.y+b.h,PA);setG(b.door-1,b.y+b.h,PA);setG(b.door+1,b.y+b.h,PA)});
  inter[ix(9,32)]={k:"door",b:"farm"};inter[ix(30,21)]={k:"door",b:"shop"};inter[ix(40,21)]={k:"door",b:"cot"};
  /* the spot below doors is where you stand; make the door tile itself interactable from south */
  /* fence around plots */
  for(var x=12;x<=19;x++){addProp("fence",x,33);addProp("fence",x,38)}
  for(var y=34;y<=37;y++){addProp("fence",12,y);addProp("fence",19,y)}
  solid[ix(12,35)]=0;props=props.filter(function(p){return !(p.k==="fence"&&p.x===12&&p.y===35)});
  /* props */
  addProp("stove",14,31,1);addProp("mail",6,34,1);addProp("board",33,25,1,{k:"board"});addProp("fountain",34,27);
  addProp("sign",11,36,1,{k:"sign",t:"🌱 Flower plots. Press A on soil to plant."});
  addProp("sign",3,43,1,{k:"sign",t:"🏡 The future home of Doodi & Danoya. (Ask Mr. Rocket at the notice board.)"});
  [[36,25],[39,29],[28,26],[45,30],[10,36],[46,10],[12,21],[8,6]].forEach(function(l){addProp("lamp",l[0],l[1],0)});
  [[46,25],[38,27],[10,6],[41,39]].forEach(function(b){addProp("bench",b[0],b[1],1)});
  addProp("sign",36,17,1,{k:"sign",t:"⬆ Meadow & festival ground · ⬇ Beach · ➡ Lake · ⬅ Farm & forest"});
  addProp("sign",24,22,1,{k:"sign",t:"🌲 Whispering Forest. Wild flowers grow in the clearing."});
  /* trees */
  var rr=mul(77);
  for(var y=0;y<MH;y++)for(var x=0;x<OW;x++){
    var edge=x===0||y===0||x===OW-1;
    var inF=x>=1&&x<=23&&y>=1&&y<=22;
    var near=false;for(var dy=-1;dy<=1&&!near;dy++)for(var dx=-1;dx<=1;dx++){if(inb(x+dx,y+dy)&&ground[ix(x+dx,y+dy)]===PA){near=true;break}}
    var clear=Math.hypot(x-12,y-13)<4.5||Math.hypot(x-10,y-5)<3.2;
    if(solid[ix(x,y)]||ground[ix(x,y)]===WA||ground[ix(x,y)]===DW||ground[ix(x,y)]===WO||ground[ix(x,y)]===SO||ground[ix(x,y)]===PA)continue;
    var tree=edge&&y<44||(inF&&!near&&!clear&&rr()<.42)||(!inF&&y<40&&!near&&rr()<.035&&!(x>=26&&x<=44&&y>=17&&y<=30)&&!(x>=2&&x<=21&&y>=27&&y<=44)&&!(x>=28&&y>=5&&y<=15));
    if(tree&&!propAt(x,y)){props.push({k:"tree",x:x,y:y,v:Math.floor(rr()*3)});solid[ix(x,y)]=1}
    else if(!propAt(x,y)&&rr()<.025&&ground[ix(x,y)]!==SA&&!near){props.push({k:"rock",x:x,y:y});solid[ix(x,y)]=1}
  }
  for(var i=0;i<props.length;i++){}
  for(var y=0;y<MH;y++)for(var x=0;x<MW;x++)if(ground[ix(x,y)]===WA||ground[ix(x,y)]===DW)solid[ix(x,y)]=1;
  for(var x=45;x<=52;x++){solid[ix(x,31)]=0;solid[ix(x,32)]=0}
  if(typeof buildVillage==="function")buildVillage();
  if(MW>OW&&typeof buildExpansion==="function")buildExpansion();
}
function propAt(x,y){for(var i=0;i<props.length;i++)if(props[i].x===x&&props[i].y===y)return props[i];return null}
function addProp(k,x,y,sol,it){props.push({k:k,x:x,y:y});if(sol!==0&&k!=="lamp"&&k!=="fence")solid[ix(x,y)]=1;else if(k==="fence")solid[ix(x,y)]=1;else if(k==="lamp")solid[ix(x,y)]=1;
  if(k==="fountain"){solid[ix(x+1,y)]=1;solid[ix(x,y+1)]=1;solid[ix(x+1,y+1)]=1}
  if(k==="board"){solid[ix(x+1,y)]=1}
  if(it)inter[ix(x,y)]=it;if(k==="board")inter[ix(x+1,y)]=it;
  if(k==="stove")inter[ix(x,y)]={k:"stove"};if(k==="mail")inter[ix(x,y)]={k:"mail"};if(k==="bench")inter[ix(x,y)]={k:"bench"}}
/* ---------- tiles atlas ---------- */
var atlas={};
function mk(name,fn,n){n=n||1;atlas[name]=[];for(var i=0;i<n;i++){var c=document.createElement("canvas");c.width=T;c.height=T;var g=c.getContext("2d");g.imageSmoothingEnabled=false;var old=cx;cx=g;fn(i);cx=old;atlas[name].push(c)}}
mk("grass",function(i){R(0,0,T,T,"#6fbf5a");R(0,0,T,T,i%2?"#6dbc58":"#72c35d");[[6,8],[20,20],[24,6],[10,24]].forEach(function(q,j){if((i+j)%2===0){R(q[0],q[1],2,4,"#4e9a44");R(q[0]+3,q[1]+2,2,3,"#58a84c")}});if(i===3){R(14,12,3,3,"#ffffffcc");R(15,13,1,1,"#ffd34f")}if(i===2){R(22,16,3,3,"#ffb3d1");R(23,17,1,1,"#ffd34f")}},4);
mk("forest",function(i){R(0,0,T,T,"#4a9a47");R(0,0,T,T,i%2?"#459543":"#4d9f4a");[[5,6],[18,14],[24,24],[9,22]].forEach(function(q,j){if((i+j)%2===0){R(q[0],q[1],2,4,"#357a37");R(q[0]+3,q[1]+2,2,3,"#3d8b3d")}});if(i===1)R(20,6,3,2,"#7a5a3a")},3);
mk("path",function(i){R(0,0,T,T,"#d9b98a");R(0,0,T,T,i%2?"#d6b585":"#dcbd90");[[4,6],[16,12],[24,22],[8,24]].forEach(function(q){R(q[0],q[1],3,2,"#c4a276")});R(0,0,T,1,"#00000008")},2);
mk("sand",function(i){R(0,0,T,T,"#f2e0b0");[[4,6],[18,12],[22,24],[8,20]].forEach(function(q,j){if((i+j)%2===0)R(q[0],q[1],2,2,"#e0cb98")});if(i===1){R(12,26,5,3,"#ffd0c4");R(13,26,3,1,"#fff")}},2);
mk("soil",function(i){R(0,0,T,T,"#8a5b36");R(1,1,T-2,T-2,i?"#82552f":"#8a5b36");R(4,8,T-8,2,"#00000022");R(4,18,T-8,2,"#00000022");R(4,26,T-8,2,"#00000022")},2);
mk("wood",function(i){R(0,0,T,T,"#b98a54");R(0,15,T,2,"#8f6736");R(0,0,T,1,"#d1a56c");R(i?10:20,3,2,2,"#8f6736")},2);
function water(t,deep){var a=deep?["#2e7fbf","#3d90d0","#ffffff40"]:["#4aa3e8","#5fb6f2","#ffffff66"];return a}
/* ---------- sprites ---------- */
var DRESS=false;
var VSPEC={
 judy:{skin:"#8a5a3c",hair:"#1a1410",hs:"bun",top:"#17171c",bot:"#222230",glasses:1,lash:1,neck:"#d9a066",puff:1},
 rocket:{skin:"#c98e5a",hair:"#e8e8e8",hs:"short",brow:"#e8e8e8",brow2:1,top:"#7a4a22",bot:"#3a3a44",goggles:1,stache:"#ff9f1c",scarf:"#ffffff"},
 wren:{skin:"#a9724a",hair:"#f2f2f6",hs:"curly",top:"#6fae5a",bot:"#5a4a3a",blush:1,wrink:1,brow:"#d8d8e0",wide:1,apron:"#fff4e0",hat:"#e8c35a"},
 ferris:{skin:"#b9835a",hair:"#8a8a90",hs:"cap",wrink:1,wide:1,top:"#f2c230",bot:"#3a4a5a",beard:"#8a8a90",cap:"#f2c230"}
};
function villager(px,py,d,f,sp,sit){
  var b=f?1:0;py+=b;if(sit)py+=6;var sk=sp.skin,hr=sp.hair;
  R(px+9,py+30,14,3,"#00000030");
  var leg=f&&!sit?(f%2?1:-1):0;
  if(sit){R(px+7,py+26,18,5,sp.bot);R(px+4,py+27,6,4,sp.bot);R(px+22,py+27,6,4,sp.bot);R(px+2,py+28,4,4,"#2a2a2a");R(px+26,py+28,4,4,"#2a2a2a")}
  else{R(px+10,py+24,5,7+(leg>0?1:0),sp.bot);R(px+17,py+24,5,7+(leg<0?1:0),sp.bot);R(px+9,py+30,6,3,"#2a2a2a");R(px+17,py+30,6,3,"#2a2a2a")}
  R(px+8,py+13,16,12,sp.top);if(sp.wide){R(px+6,py+14,2,10,sp.top);R(px+24,py+14,2,10,sp.top)}R(px+5,py+14,4,9,sp.top);R(px+23,py+14,4,9,sp.top);
  if(sp.puff){R(px+3,py+13,6,7,sp.top);R(px+23,py+13,6,7,sp.top)}
  R(px+5,py+22,4,3,sk);R(px+23,py+22,4,3,sk);
  if(sp.apron&&d!==0){R(px+9,py+17,14,9,sp.apron);R(px+11,py+19,3,3,"#f08ca8");R(px+17,py+21,3,3,"#f2c230")}
  if(sp.scarf){R(px+9,py+11,14,4,sp.scarf)}
  if(sp.neck&&d!==0){R(px+15,py+14,2,2,sp.neck);R(px+13,py+13,1,1,sp.neck);R(px+18,py+13,1,1,sp.neck)}
  R(px+10,py+2,12,11,sk);
  if(sp.hs==="bun"){R(px+8,py-3,16,8,hr);R(px+7,py+1,3,11,hr);R(px+22,py+1,3,13,hr);R(px+12,py-7,8,5,hr);R(px+6,py+8,2,3,hr);R(px+24,py+10,2,3,hr);if(d!==0)R(px+10,py+1,12,2,hr);else R(px+10,py+2,12,10,hr)}
  else if(sp.hs==="short"){R(px+9,py-1,14,5,hr);if(d===0)R(px+10,py+2,12,10,hr)}
  else if(sp.hs==="bunG"){R(px+8,py-1,16,6,hr);R(px+12,py-5,8,5,hr);R(px+8,py+3,3,7,hr);R(px+21,py+3,3,7,hr);if(d===0)R(px+10,py+2,12,10,hr)}
  else if(sp.hs==="long"){R(px+8,py-1,16,6,hr);R(px+7,py+2,4,15,hr);R(px+21,py+2,4,15,hr);if(d===0)R(px+8,py+1,16,17,hr);else R(px+10,py+1,12,2,hr);if(sp.rib){R(px+7,py+6,4,2,sp.rib);R(px+21,py+6,4,2,sp.rib)}}
  else if(sp.hs==="ponytail"){R(px+9,py-1,14,5,hr);R(px+9,py+2,2,5,hr);R(px+21,py+2,2,5,hr);if(d===0){R(px+10,py+2,12,9,hr);R(px+14,py+10,4,11,hr);if(sp.rib)R(px+13,py+9,6,2,sp.rib)}else{var tx=d===3?px+4:px+24;R(tx,py+3,3,3,hr);R(tx+(d===3?0:1),py+6,3,9,hr);if(sp.rib)R(tx,py+4,4,2,sp.rib)}}
  else if(sp.hs==="curly"){R(px+7,py-2,18,7,hr);R(px+5,py+1,5,6,hr);R(px+22,py+1,5,6,hr);R(px+9,py-4,5,3,hr);R(px+17,py-4,6,3,hr);R(px+6,py+6,3,4,hr);R(px+23,py+6,3,4,hr);if(d===0)R(px+8,py+2,16,10,hr)}
  else if(sp.hs==="bald"){R(px+9,py+2,2,7,hr);R(px+21,py+2,2,7,hr);if(d===0){R(px+10,py+5,12,7,hr)}}
  else if(sp.hs==="spiky"){R(px+9,py-1,14,5,hr);R(px+10,py-4,3,4,hr);R(px+15,py-6,3,6,hr);R(px+20,py-4,3,4,hr);if(d===0)R(px+10,py+2,12,10,hr)}
  else if(sp.hs==="side"){R(px+9,py-2,14,6,hr);R(px+9,py+2,7,4,hr);R(px+21,py+1,3,5,hr);if(d===0)R(px+10,py+2,12,10,hr)}
  else if(sp.hs==="sidepart"){R(px+9,py-1,14,4,hr);R(px+9,py+3,2,4,hr);R(px+21,py+3,2,4,hr);R(px+12,py-2,10,1,hr);if(d===0)R(px+10,py+2,12,10,hr)}
  else if(sp.hs==="cap"){R(px+9,py-1,14,4,sp.cap);if(d!==2)R(px+8,py+1,16,2,sp.cap);if(d===2)R(px+9,py+2,14,2,sp.cap);if(d===0)R(px+10,py+3,12,9,hr)}
  if(sp.hat){R(px+4,py-1,24,3,sp.hat);R(px+9,py-6,14,6,sp.hat);R(px+9,py-2,14,2,"#c0392b")}
  if(sp.goggles){R(px+9,py-1,14,3,"#4a4a52");R(px+10,py-1,5,3,"#8fd6ff");R(px+17,py-1,5,3,"#8fd6ff")}
  if(d!==0){var ex=d===1?2:d===3?-2:0;
    if(sp.glasses){var gx=px+ex;R(gx+10,py+5,6,1,"#3a2a1a");R(gx+10,py+8,6,1,"#3a2a1a");R(gx+10,py+5,1,4,"#3a2a1a");R(gx+15,py+5,1,4,"#3a2a1a");R(gx+17,py+5,6,1,"#3a2a1a");R(gx+17,py+8,6,1,"#3a2a1a");R(gx+17,py+5,1,4,"#3a2a1a");R(gx+22,py+5,1,4,"#3a2a1a");R(gx+16,py+6,1,1,"#3a2a1a")}
    R(px+12+ex,py+6,2,2,"#111");R(px+18+ex,py+6,2,2,"#111");
    if(sp.brow){R(px+11+ex,py+4,4,1,sp.brow);R(px+17+ex,py+4,4,1,sp.brow);if(sp.brow2){R(px+11+ex,py+3,4,1,sp.brow);R(px+17+ex,py+3,4,1,sp.brow)}}
    if(sp.lash){R(px+11+ex,py+5,1,1,"#111");R(px+20+ex,py+5,1,1,"#111")}
    if(sp.blush){R(px+10+ex,py+8,3,2,"#ee7a7a88");R(px+19+ex,py+8,3,2,"#ee7a7a88")}

    if(sp.wrink){R(px+10+ex,py+4,2,1,"#00000033");R(px+20+ex,py+4,2,1,"#00000033");R(px+11+ex,py+10,1,2,"#00000033");R(px+20+ex,py+10,1,2,"#00000033")}
    if(sp.mole)R(px+19+ex,py+9,1,1,"#3a2418");
    if(sp.stub){R(px+10+ex,py+10,12,3,sp.stub)}R(px+14+ex,py+10,4,1,"#00000044");
    if(sp.stache){R(px+11+ex,py+9,10,3,sp.stache);R(px+9+ex,py+10,3,2,sp.stache);R(px+20+ex,py+10,3,2,sp.stache)}
    if(sp.beard){R(px+10+ex,py+10,12,5,sp.beard);R(px+12+ex,py+9,8,1,sp.beard)}}
}
var ARMOR=false;
var OUTFITS=[
 {n:"Valley Blues",e:"💙",scarf:"#d9b08c",sh:"#c99f7a",top:"#1f5f78",mid:"#15151a",bot:"#15151a",shoe:"#4a1f2a"},
 {n:"Garden Blossom",e:"🌸",scarf:"#f4f1e6",sh:"#dcd6c4",top:"#d8a7b1",mid:"#d8a7b1",bot:"#c996a3",shoe:"#d9c9b5",belt:"#c58a98"},
 {n:"Maroon & Daisies",e:"🍷",scarf:"#241b24",sh:"#17111a",top:"#8a2f45",mid:"#8a2f45",bot:"#1a1a20",shoe:"#2a2a2a",dots:"#efe0d4"},
 {n:"Paris Jeans",e:"🗼",scarf:"#1d1c24",sh:"#121118",top:"#5a2230",mid:"#5a2230",bot:"#2f4f8a",shoe:"#3a3a3a"},
 {n:"Hilltop White",e:"⛰",scarf:"#c9a27a",sh:"#b08a62",top:"#f4f1ea",mid:"#f4f1ea",bot:"#f4f1ea",shoe:"#6a4a30",bag:"#4a3426"},
 {n:"Navy & Cream",e:"💫",scarf:"#e6d3c8",sh:"#cdb6a8",top:"#233f7c",mid:"#2a4a92",bot:"#233f7c",shoe:"#2a2a2a",ear:"#5a8be0"},
 {n:"Clinic Shift",e:"🩺",scarf:"#8a7f73",sh:"#6f655a",top:"#17171c",mid:"#17171c",bot:"#17171c",shoe:"#2a2a2a",lan:"#2a5fb8"},
 {n:"Olive Evening",e:"🌿",scarf:"#e4cfb8",sh:"#cdb59a",top:"#3a4128",mid:"#3a4128",bot:"#333a24",shoe:"#8a5a3c",bag:"#d9c09a",dots:"#6f7a48"},
 {n:"Rose Gala",e:"✨",scarf:"#e7bfb8",sh:"#d3a49c",top:"#d4b5c8",mid:"#e9c9cf",bot:"#d4b5c8",shoe:"#c9a64a",gold:"#e0b53a",spark:1},
 {n:"Cozy Cocoa",e:"☕",scarf:"#d8c79a",sh:"#bfae82",top:"#6a4034",mid:"#6a4034",bot:"#15151a",shoe:"#1a1a1a"}
];
var ARMOR_D={n:"Sunlit Armour",e:"🛡",scarf:"#e6d3c8",sh:"#cdb6a8",top:"#6f8aa3",mid:"#a9c0d4",bot:"#2f3d4f",shoe:"#3a3f4a",armor:1};
function curOutfit(){if(ARMOR)return ARMOR_D;var i=0;try{if(typeof S!=="undefined"&&S&&S.day>0)i=(S.day-1)%OUTFITS.length}catch(e){}return OUTFITS[i]}
function outfitToast(){try{var o=curOutfit();toast(o.e+" Today's fit: "+o.n)}catch(e){}}
var POSEU=0;
function person(px,py,d,who,f,sit){
  var pz=typeof time!=="undefined"&&time<POSEU&&!sit&&!(who==="danoya"&&!CH2&&!OPN_ON&&typeof hearts==="function"&&S&&hearts()<6);if(pz){d=2;f=0;py-=Math.abs(Math.sin((POSEU-time)*9))*4}
  var b=f?1:0;py+=b;if(sit)py+=6;
  R(px+9,py+30,14,3,"#00000030");
  if(who==="doodi"){
    var leg=f&&!sit?(f%2?1:-1):0;
    if(sit){R(px+7,py+26,18,5,"#8c8c86");R(px+4,py+27,6,4,"#8c8c86");R(px+22,py+27,6,4,"#8c8c86");R(px+2,py+28,4,4,"#2a2a2a");R(px+26,py+28,4,4,"#2a2a2a")}else{    R(px+10,py+24,5,7+(leg>0?1:0),"#8c8c86");R(px+17,py+24,5,7+(leg<0?1:0),"#8c8c86");R(px+9,py+30,6,3,"#2a2a2a");R(px+17,py+30,6,3,"#2a2a2a");}
    R(px+8,py+13,16,12,SHIRT);R(px+5,py+14,4,9,SHIRT);R(px+23,py+14,4,9,SHIRT);R(px+5,py+22,4,3,"#8a5a3c");R(px+23,py+22,4,3,"#8a5a3c");
    R(px+10,py+2,12,11,"#8a5a3c");R(px+9,py-2,14,6,"#1a1a1a");R(px+10,py+9,12,5,"#2a1c14");
    if(ARMOR){R(px+8,py+13,16,12,"#9fb0c2");R(px+8,py+13,16,2,"#d5e1ec");if(d!==0){R(px+14,py+16,4,5,"#ff3d57");R(px+15,py+17,2,3,"#ffb3bd")}R(px+8,py+23,16,2,"#5a3a22");if(d!==0)R(px+15,py+23,2,2,"#ffd34d");R(px+3,py+12,8,5,"#c9d6e2");R(px+21,py+12,8,5,"#c9d6e2");R(px+3,py+16,8,1,"#8aa0b4");R(px+21,py+16,8,1,"#8aa0b4");R(px+5,py+17,4,6,"#7a8ea3");R(px+23,py+17,4,6,"#7a8ea3");R(px+9,py-3,14,5,"#9fb0c2");R(px+9,py-3,14,1,"#d5e1ec");R(px+14,py-8,4,6,"#ff3d57");R(px+10,py+24,5,7,"#6a707c");R(px+17,py+24,5,7,"#6a707c");R(px+9,py+30,6,3,"#3a3f4a");R(px+17,py+30,6,3,"#3a3f4a");if(d!==0){var exa=d===1?2:d===3?-2:0;R(px+12+exa,py+6,2,2,"#111");R(px+18+exa,py+6,2,2,"#111")}}
    if(d!==0){var ex=d===1?2:d===3?-2:0;R(px+12+ex,py+6,2,2,"#111");R(px+18+ex,py+6,2,2,"#111")}else{R(px+10,py+2,12,10,"#1a1a1a");R(px+10,py+9,12,4,"#2a1c14")}
  }else if(DRESS){
    var tw=(Math.sin((typeof time!=="undefined"?time:0)*5)+1)/2;
    R(px+2,py+20,28,12,"#cdb8ec");R(px+4,py+18,24,6,"#d9c9ee");R(px+9,py+30,6,3,"#8a6a3a");R(px+17,py+30,6,3,"#8a6a3a");
    R(px+8,py+13,16,10,"#d9c9ee");R(px+3,py+13,6,10,"#cdb8ec");R(px+23,py+13,6,10,"#cdb8ec");R(px+2,py+20,8,3,"#b9a2de");R(px+22,py+20,8,3,"#b9a2de");
    R(px+5,py+22,3,3,"#a8683f");R(px+24,py+22,3,3,"#a8683f");
    R(px+6,py+24,4,3,"#8fb0e8");R(px+14,py+26,5,3,"#8fb0e8");R(px+22,py+23,4,3,"#8fb0e8");R(px+10,py+29,4,2,"#8fb0e8");R(px+19,py+29,4,2,"#8fb0e8");R(px+12,py+16,4,3,"#8fb0e8");R(px+19,py+17,3,3,"#8fb0e8");
    cx.globalAlpha=.5+.5*tw;R(px+8,py+27,2,2,"#fff");R(px+24,py+27,2,2,"#fff");R(px+16,py+21,2,2,"#fff");cx.globalAlpha=1-.5*tw+.2;R(px+4,py+30,2,2,"#fff");R(px+27,py+24,2,2,"#fff");cx.globalAlpha=1;
    if(d!==0){R(px+14,py+13,4,2,"#e0b53a");R(px+15,py+15,2,2,"#e0b53a")}
    R(px+7,py-3,18,16,"#d9b08c");R(px+6,py+9,20,8,"#cdb8ec");R(px+8,py+14,16,3,"#e8dcf5");
    R(px+10,py+2,12,9,"#a8683f");R(px+6,py-4,20,5,"#cdb8ec");R(px+5,py-2,4,16,"#cdb8ec");R(px+23,py-2,4,16,"#cdb8ec");R(px+4,py+10,5,10,"#d9c9ee");R(px+23,py+10,5,10,"#d9c9ee");
    if(d!==0){var ex3=d===1?2:d===3?-2:0;R(px+9,py,14,2,"#cdb8ec");R(px+12+ex3,py+5,2,2,"#111");R(px+18+ex3,py+5,2,2,"#111");R(px+11+ex3,py+4,4,1,"#111");R(px+17+ex3,py+4,4,1,"#111");R(px+8,py+8,2,2,"#e0b53a")}
    else{R(px+8,py-1,16,2,"#cdb8ec")}
  }else{
    var O=curOutfit();
    var lg=f&&!sit?(f%2?1:-1):0;R(px+8,py+22,16,10,O.bot);R(px+7,py+26,18,5,O.bot);R(px+9,py+30-(lg>0?2:0),6,3,O.shoe);R(px+17,py+30-(lg<0?2:0),6,3,O.shoe);
    R(px+8,py+13,16,11,d===0?O.top:O.mid);R(px+8,py+13,5,11,O.top);R(px+19,py+13,5,11,O.top);R(px+5,py+14+(lg>0?1:0),4,9,O.top);R(px+23,py+14+(lg<0?1:0),4,9,O.top);R(px+5,py+22+(lg>0?1:0),4,3,O.armor?"#c9d6e2":"#a8683f");R(px+23,py+22+(lg<0?1:0),4,3,O.armor?"#c9d6e2":"#a8683f");
    if(O.belt)R(px+8,py+22,16,2,O.belt);if(O.bag){R(px+20,py+24,7,6,O.bag);R(px+9,py+14,1,10,O.bag)}if(O.dots){R(px+10,py+16,2,2,O.dots);R(px+15,py+19,2,2,O.dots);R(px+20,py+15,2,2,O.dots);R(px+12,py+23,2,2,O.dots)}
    if(O.lan&&d!==0){R(px+14,py+13,2,9,O.lan);R(px+13,py+21,4,3,"#f2d34a")}if(O.gold&&d!==0){R(px+12,py+14,8,1,O.gold);R(px+14,py+15,4,1,O.gold)}
    if(O.spark){var sp0=Math.floor((typeof time!=="undefined"?time:0)*4)%3;R(px+10+sp0*4,py+17,1,1,"#fff");R(px+21-sp0*3,py+20,1,1,"#fff");R(px+13+sp0*2,py+26,1,1,"#fff")}
    if(O.armor){R(px+4,py+12,7,4,"#c9d6e2");R(px+21,py+12,7,4,"#c9d6e2");R(px+4,py+15,7,1,"#8aa0b4");R(px+21,py+15,7,1,"#8aa0b4");R(px+9,py+14,14,9,"#b9cde0");R(px+9,py+14,14,1,"#e8f2fa");if(d!==0){R(px+14,py+17,4,4,"#ffd34d");R(px+15,py+18,2,2,"#fff3b0")}R(px+8,py+22,16,2,"#7a4a2a");R(px+15,py+22,2,2,"#ffd34d");R(px+8,py+29,6,1,"#c9d6e2");R(px+18,py+29,6,1,"#c9d6e2");R(px+5,py+19,4,4,"#8aa0b4");R(px+23,py+19,4,4,"#8aa0b4")}
    R(px+7,py-3,18,16,O.scarf);R(px+6,py+9,20,8,O.scarf);if(d!==0)R(px+8,py+14,8,6,O.sh);if(O.dots&&!O.armor&&O.scarf.charAt(1)<"4"){R(px+8,py-1,2,2,O.dots);R(px+22,py+3,2,2,O.dots);R(px+10,py+11,2,2,O.dots);R(px+20,py+12,2,2,O.dots)}if(O.armor){R(px+7,py+10,18,2,"#8aa0b4");R(px+8,py+12,16,1,"#c9d6e2")}
    if(d!==0){var ex2=d===1?2:d===3?-2:0;R(px+10,py+2,12,9,"#a8683f");R(px+9,py,14,2,"#1d1d26");R(px+12+ex2,py+5,2,2,"#111");R(px+18+ex2,py+5,2,2,"#111");R(px+11+ex2,py+4,4,1,"#111");R(px+17+ex2,py+4,4,1,"#111");if(O.ear){R(px+8,py+8,2,3,O.ear);R(px+22,py+8,2,3,O.ear)}}
    else{R(px+8,py-1,16,2,"#1d1d26");R(px+7,py-3,18,16,O.scarf);R(px+10,py+2,12,2,"#00000018");R(px+13,py+6,6,5,"#0000001a");R(px+9,py+11,14,2,"#00000014")}
  }
  if(pz){
    if(who==="doodi"){R(px+22,py+14,5,6,SHIRT);R(px+17,py+4,16,16,"#8a5a3c");R(px+17,py+4,16,3,"#b07a4a");R(px+17,py+17,16,3,"#6b3f24");R(px+21,py+8,1,8,"#6b3f24");R(px+25,py+8,1,8,"#6b3f24");R(px+29,py+8,1,8,"#6b3f24");R(px+16,py+8,2,8,"#8a5a3c");R(px+19,py+5,3,2,"#c48a56");R(px+23,py+5,3,2,"#c48a56");R(px+27,py+5,3,2,"#c48a56")}
    else{R(px+23,py+6,5,10,curOutfit().top);R(px+19,py-4,13,12,"#a8683f");R(px+19,py-4,13,2,"#c98a5c");R(px+18,py-18,5,16,"#a8683f");R(px+28,py-18,5,16,"#a8683f");R(px+18,py-18,5,3,"#c98a5c");R(px+28,py-18,5,3,"#c98a5c");R(px+19,py+4,4,3,"#7a4a28");R(px+21,py-1,9,1,"#7a4a28")}
  }
}
function tree(px,py,v){
  R(px+2,py+26,28,6,"#00000026");R(px+13,py+14,6,18,"#6b4426");R(px+12,py+16,2,16,"#8a5b36");
  var c=["#2f8f3c","#3a9e45","#2a7f45"][v||0];
  R(px+2,py-14,28,28,c);R(px,py-8,32,18,c);R(px+6,py-22,20,12,"#3da64a");R(px+8,py-18,6,5,"#58c05a");R(px+18,py-4,6,5,"#256d33");R(px+4,py+2,6,4,"#256d33");
}
function rock(px,py){R(px+3,py+10,26,18,"#00000022");R(px+4,py+8,24,18,"#8d8d95");R(px+8,py+4,16,8,"#a5a5ad");R(px+8,py+14,6,4,"#757580")}
function flowerArt(px,py,t,sz){
  var o=sz||0;
  if(t===0){R(px+9,py+3,14,12,"#ffc83d");R(px+11,py+1,10,16,"#ffd34f");R(px+12,py+5,8,8,"#6b3d1e");R(px+14,py+7,2,2,"#3a1f0e")}
  else if(t===1){R(px+10,py+3,12,12,"#fff07a");R(px+13,py+1,6,16,"#fff07a");R(px+13,py+5,6,7,"#ff9f1c");R(px+14,py+6,4,5,"#ffb84d")}
  else if(t===2){R(px+8,py+7,16,6,"#ffffff");R(px+13,py+2,6,16,"#ffffff");R(px+10,py+4,3,4,"#ffe3ef");R(px+19,py+4,3,4,"#ffe3ef");R(px+14,py+7,4,4,"#ff7aa8");R(px+11,py+9,1,1,"#e5457f");R(px+20,py+10,1,1,"#e5457f")}
  else{R(px+10,py+6,12,11,"#e63950");R(px+10,py+3,4,5,"#e63950");R(px+18,py+3,4,5,"#e63950");R(px+14,py+2,4,6,"#ff5b73");R(px+12,py+9,2,6,"#ff8296")}
}
function plant(px,py,c,x){
  if(c.a===0){R(px+15,py+18,2,6,"#3f8f3c");R(px+13,py+16,3,3,"#58b04f");R(px+16,py+16,3,3,"#58b04f")}
  else if(c.a===1){R(px+15,py+10,2,14,"#3f8f3c");R(px+9,py+14,6,3,"#58b04f");R(px+17,py+17,6,3,"#58b04f")}
  else if(c.a===2){R(px+15,py+8,2,16,"#3f8f3c");R(px+9,py+14,6,3,"#58b04f");R(px+17,py+17,6,3,"#58b04f");R(px+13,py+4,6,5,"#9ad47c")}
  else{R(px+15,py+10,2,16,"#3f8f3c");R(px+9,py+18,6,3,"#58b04f");R(px+17,py+20,6,3,"#58b04f");var sw=Math.sin(Date.now()/400+x)*1.2;flowerArt(px+sw,py,c.t)}
}
/* the shrine on the north hill: same stone-and-red-roof look as Chapters 4 and 5 */
function shrineBld(b){var k=(Math.sin(Date.now()/700)+1)/2;drawShrine(cx,b.x*T,b.y*T,b.w*T,b.h*T,b.x*T+(b.door-b.x)*T,k,{sign:b.sign||"SHRINE"})}
function building(b,home){
  if(b.id==="shrine"){shrineBld(b);return}
  var px=b.x*T,py=b.y*T,w=b.w*T,h=b.h*T;
  R(px,py+h-6,w,8,"#00000024");
  R(px+4,py+30,w-8,h-30,b.wall||"#b9824f");R(px+4,py+30,w-8,4,"#00000022");
  R(px-4,py+2,w+8,36,b.roof);R(px,py-8,w,14,b.roof);R(px+8,py-14,w-16,8,b.roof);
  for(var i=0;i<w;i+=16)R(px+i,py+6,2,30,"#00000018");R(px-4,py+34,w+8,4,"#00000030");
  var dx=px+(b.door-b.x)*T;R(dx-2,py+h-52,T+4,52,"#5b3a22");R(dx+22,py+h-26,3,3,"#ffd34f");R(dx+3,py+h-48,T-6,8,"#00000020");
  R(px+14,py+h-50,34,34,"#bfe3ff");R(px+30,py+h-50,2,34,"#8a5b36");R(px+14,py+h-34,34,2,"#8a5b36");R(px+w-48,py+h-50,34,34,"#bfe3ff");R(px+w-32,py+h-50,2,34,"#8a5b36");R(px+w-48,py+h-34,34,2,"#8a5b36");
  var sgn=b.sign||(b.name==="Shop"?"SHOP":home?"HOME":b.name==="Our cabin"?"CABIN":"COTTAGE");cx.font="bold 8px sans-serif";var sgw=Math.max(T-8,Math.ceil(cx.measureText(sgn).width)+8);R(dx+16-sgw/2,py+h-62,sgw,8,"#fff8e8");cx.fillStyle="#3a2616";cx.textAlign="center";cx.fillText(sgn,dx+16,py+h-55);
  if(home){R(px+w/2-12,py-24,24,10,"#fff8e8");cx.fillStyle="#c2412e";cx.fillText("D & D",px+w/2,py-16);cx.fillText("♥",px+w/2,py-6)}
}
function drawProp(p){
  var px=p.x*T,py=p.y*T;if(p.k.charAt(0)==="x"&&p.k.charAt(1)==="_"&&typeof drawXProp==="function"){drawXProp(p,px,py);return}
  switch(p.k){
   case"tree":tree(px,py,p.v);break;case"rock":rock(px,py);break;
   case"fence":R(px,py+10,T,4,"#d9b98a");R(px,py+20,T,3,"#d9b98a");R(px+2,py+4,5,24,"#b98a54");R(px+25,py+4,5,24,"#b98a54");break;
   case"stove":{var fl=Math.sin(Date.now()/150)*1.5;
    R(px+3,py+29,26,3,"#00000040");
    R(px+14,py-12,5,10,"#4a4a52");R(px+13,py-14,7,3,"#34343b");
    for(var sm=0;sm<3;sm++){var ph=((Date.now()/700)+sm/3)%1;cx.globalAlpha=.5*(1-ph);R(px+14+Math.sin(ph*6+sm)*3,py-16-ph*16,4,4,"#e8e8ee");cx.globalAlpha=1}
    R(px+3,py+8,26,22,"#e9e4d8");R(px+3,py+8,26,2,"#fff");R(px+3,py+28,26,2,"#b9b2a2");
    R(px+2,py+6,28,5,"#2d2d34");R(px+2,py+6,28,1,"#55555e");
    R(px+6,py+4,8,3,"#17171c");R(px+18,py+4,8,3,"#17171c");
    R(px+7,py+2+fl,6,3,"#ff7a2e");R(px+8,py+1+fl,4,2,"#ffd34d");R(px+19,py+2-fl,6,3,"#ff7a2e");R(px+20,py+1-fl,4,2,"#ffd34d");
    R(px+5,py+0,10,4,"#9aa0ab");R(px+4,py-1,12,2,"#c6ccd6");R(px+16,py+1,3,2,"#9aa0ab");
    R(px+6,py+14,20,13,"#3b3b44");R(px+7,py+15,18,11,"#1f2430");R(px+9,py+17,14,6,"#ff9a3c55");R(px+7,py+13,18,2,"#c6ccd6");
    R(px+5,py+9,3,3,"#d94a3a");R(px+14,py+9,3,3,"#d94a3a");R(px+23,py+9,3,3,"#d94a3a");
    cx.font="bold 9px sans-serif";cx.textAlign="center";cx.lineWidth=3;cx.strokeStyle="#000a";cx.strokeText("🍳 STOVE",px+16,py-20);cx.fillStyle="#fff";cx.fillText("🍳 STOVE",px+16,py-20);
    break}
   case"mail":R(px+14,py+14,4,18,"#6b4426");R(px+6,py+6,20,12,"#c24b3b");R(px+8,py+8,16,3,"#e86a5a");break;
   case"board":R(px+4,py+24,5,8,"#6b4426");R(px+55,py+24,5,8,"#6b4426");R(px+2,py+2,60,26,"#b98a54");R(px+5,py+5,54,20,"#e8cfae");R(px+9,py+8,12,9,"#fff");R(px+25,py+8,12,11,"#ffe3a8");R(px+41,py+8,14,8,"#ffc9d6");cx.fillStyle="#3a2616";cx.font="bold 7px sans-serif";cx.textAlign="center";cx.fillText("BOARD",px+32,py+23);break;
   case"fountain":R(px,py+10,64,54,"#00000020");R(px+2,py+8,60,52,"#9a9aa5");R(px+8,py+14,48,40,"#5fb6f2");R(px+26,py+6,12,32,"#bdbdc6");var o=Date.now()/200%1;R(px+30,py-2+o*6,4,8,"#cdeaff");R(px+20,py+22+Math.sin(Date.now()/300)*2,6,2,"#ffffff88");R(px+40,py+34,6,2,"#ffffff88");break;
   case"sign":R(px+14,py+12,4,20,"#6b4426");R(px+4,py+4,24,14,"#e8cfae");R(px+4,py+4,24,2,"#b98a54");R(px+8,py+8,16,2,"#8a5b36");R(px+8,py+12,10,2,"#8a5b36");break;
   case"lamp":R(px+14,py+10,4,22,"#3a3a42");R(px+9,py+2,14,10,"#ffe9a8");R(px+11,py+4,10,6,"#fff7d0");break;
   case"bench":R(px+2,py+10,28,6,"#b98a54");R(px+2,py+8,28,2,"#8f6736");R(px+4,py+16,4,12,"#6b4426");R(px+24,py+16,4,12,"#6b4426");R(px+2,py+16,28,4,"#8f6736");break;
  }
}
