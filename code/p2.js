/* ---------- items ---------- */
var FN=["sunflower","daffodil","lily","tulip"],FE=["🌻","🌼","🪷","🌷"];
var IT={
 rod:{n:"Fishing rod",e:"🎣",p:0,k:"tool"},
 sd0:{n:"Sunflower seeds",e:"🌱",p:14,k:"seed",t:0},sd1:{n:"Daffodil seeds",e:"🌱",p:14,k:"seed",t:1},sd2:{n:"Lily seeds",e:"🌱",p:18,k:"seed",t:2},sd3:{n:"Tulip seeds",e:"🌱",p:16,k:"seed",t:3},
 fl0:{n:"Sunflower",e:"🌻",p:38,k:"flower",t:0,g:"love"},fl1:{n:"Daffodil",e:"🌼",p:36,k:"flower",t:1,g:"love"},fl2:{n:"Lily",e:"🪷",p:44,k:"flower",t:2,g:"love"},fl3:{n:"Tulip",e:"🌷",p:40,k:"flower",t:3,g:"love"},
 macaroni:{n:"Macaroni",e:"🍝",p:10,k:"ing"},mac:{n:"Mac & cheese",e:"🧀",p:95,k:"dish",g:"like"},lcarp:{n:"Lantern carp",e:"🏮",p:110,k:"fish",g:"love"},
 dough:{n:"Dough",e:"🫓",p:10,k:"ing"},cheese:{n:"Cheese",e:"🧀",p:14,k:"ing"},tomato:{n:"Tomato",e:"🍅",p:8,k:"ing"},
 reese:{n:"Reese's cups",e:"🍫",p:26,k:"gift",g:"love"},water:{n:"Cold water",e:"💧",p:6,k:"gift",g:"love"},z7up:{n:"7UP Zero",e:"🥤",p:12,k:"gift",g:"like"},
 plush:{n:"Appa plushie",e:"🧸",p:95,k:"gift",g:"love"},book:{n:"A cosy book",e:"📖",p:55,k:"gift",g:"like"},
 pizza:{n:"Pizza",e:"🍕",p:90,k:"dish",g:"love"},grill:{n:"Grilled fish",e:"🍤",p:70,k:"dish",g:"like"},tea:{n:"Flower tea",e:"🍵",p:60,k:"dish",g:"like"},cookie:{n:"Reese's cookies",e:"🍪",p:85,k:"dish",g:"love"},
 carp:{n:"Carp",e:"🐟",p:22,k:"fish",g:"like"},sunfish:{n:"Sunfish",e:"🐠",p:32,k:"fish",g:"like"},perch:{n:"Perch",e:"🐟",p:38,k:"fish",g:"like"},eel:{n:"River eel",e:"🐍",p:65,k:"fish"},koi:{n:"Moon koi",e:"🎏",p:300,k:"fish",g:"love"},dfish:{n:"The Danoya-fish",e:"💛",p:500,k:"fish",g:"love"},
 sardine:{n:"Sardine",e:"🐟",p:24,k:"fish"},tuna:{n:"Tuna",e:"🐟",p:70,k:"fish",g:"like"},crab:{n:"Crab",e:"🦀",p:48,k:"fish",g:"like"},puffer:{n:"Pufferfish",e:"🐡",p:80,k:"fish"},squid:{n:"Squid",e:"🦑",p:60,k:"fish"},
 bread:{n:"Fresh bread",e:"🍞",p:12,k:"gift",g:"like"},bun:{n:"Cinnamon bun",e:"🥐",p:22,k:"gift",g:"like"},smoked:{n:"Smoked fish",e:"🍢",p:34,k:"gift",g:"like"},
 boot:{n:"Old boot",e:"🥾",p:1,k:"junk",g:"hate"},bottle:{n:"Message in a bottle",e:"🍾",p:40,k:"gift",g:"like"}
};
var LAKEFISH=[["carp",30,18],["sunfish",24,24],["perch",18,28],["eel",8,42],["boot",10,0]],OCEANFISH=[["sardine",30,20],["crab",20,26],["tuna",14,38],["squid",12,36],["puffer",8,44],["bottle",6,0],["boot",6,0]];
var RECIPES=[
 {id:"pizza",n:"Pizza",e:"🍕",need:{dough:1,cheese:1,tomato:1},note:"Doodi's all-time favourite."},
 {id:"cookie",n:"Reese's cookies",e:"🍪",need:{dough:1,reese:1},note:"Danoya's sweet spot."},
 {id:"tea",n:"Flower tea",e:"🍵",need:{flower:1,water:1},note:"Any flower and cold water."},
 {id:"grill",n:"Grilled fish",e:"🍤",need:{fish:1},note:"Any fish, cooked."}
];
/* ---------- state ---------- */
var S;
function fresh(){return{v:1,day:1,min:360,coins:40,inv:{rod:1,sd0:2,sd1:2,sd2:1,sd3:1,water:2},fp:0,seen:{},talked:0,hugged:0,gifted:0,planted:0,caught:0,cooked:0,sold:0,lovedGifts:0,
 fishLog:{},flowerLog:{},dishLog:{},claimed:{},fund:0,homeBuilt:false,homeDay:0,wild:[],rain:false,px:9,py:35,intro:false,sfx:true,notes:[],evNote:null,totalCoins:0,plots:{},moonSeen:0,endSeen:false}}
function save(){try{S.plots=plots;S.mw=MW;ls(SAVEKEY,JSON.stringify(S))}catch(e){}}
function load(){try{var j=JSON.parse(ls(SAVEKEY)||"null");if(j&&j.v===1){S=j;plots=S.plots||{};var ow=j.mw||64;if(ow!==MW){var np={};for(var k in plots){var kx=k%ow,ky=(k/ow)|0;np[ky*MW+kx]=plots[k]}plots=np;S.plots=np}S.mw=MW;return true}}catch(e){}return false}
function has(id){return S.inv[id]||0}
function give(id,n){S.inv[id]=(S.inv[id]||0)+(n||1)}
function take(id,n){S.inv[id]=(S.inv[id]||0)-(n||1);if(S.inv[id]<=0)delete S.inv[id]}
function hearts(){return Math.min(10,Math.floor(S.fp/100))}
var EVT=[{id:"e1",h:2,t:17,place:[43,27],where:"the lake bench",title:"The First Picnic"},
 {id:"e2",h:4,t:19,place:[9,34],where:"our cabin porch",title:"Two Time Zones, One Porch"},
 {id:"e3",h:6,t:21,place:[8,5],where:"the hilltop in the forest",title:"Catching Stars"},
 {id:"e4",h:8,t:20,place:[46,9],where:"the festival ground",title:"The Lantern Dance"},
 {id:"e5",h:10,t:17,place:[4,40],where:"the new home",title:"Come Home to Me",needHome:true}];
function nextEvent(){for(var i=0;i<EVT.length;i++)if(!S.seen[EVT[i].id])return EVT[i];return null}
function capFP(){var e=nextEvent();if(e){var cap=e.h*100+99;if(S.fp>cap)S.fp=cap}if(S.fp>1000)S.fp=1000}
function addFP(n){var b=hearts();S.fp=Math.max(0,S.fp+n);capFP();var a=hearts();if(a>b){toast("💗 "+OTHER+": "+a+" hearts");sfxPlay("chime")}paintHud();checkEventReady()}
/* ---------- audio ---------- */
var actx=null;
function ac(){try{if(!actx){var C=window.AudioContext||window.webkitAudioContext;if(C){actx=new C();actx.onstatechange=function(){if(actx.state!=="running")try{actx.resume()}catch(e){}}}}if(actx&&actx.state!=="running")actx.resume()}catch(e){}return actx}
var __keep=null;function keepAlive(){try{if(__keep)return;__keep=new Audio("data:audio/wav;base64,UklGRkQDAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YSADAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgA==");__keep.loop=true;__keep.volume=.01;__keep.setAttribute("playsinline","");var p=__keep.play();if(p&&p.catch)p.catch(function(){__keep=null})}catch(e){__keep=null}}
(function(){function unlock(){keepAlive();var c=ac();if(!c)return;try{var b=c.createBuffer(1,1,22050),s=c.createBufferSource();s.buffer=b;s.connect(c.destination);s.start(0)}catch(e){}}["pointerdown","touchstart","touchend","keydown","click"].forEach(function(ev){document.addEventListener(ev,unlock,{capture:true,passive:true})})})();
function tone(f,t0,d,ty,v){var c=ac();if(!c||!S||!S.sfx)return;
  function play(){var n=c.currentTime+.005;var o=c.createOscillator(),g=c.createGain();o.type=ty||"square";o.frequency.value=f;g.gain.setValueAtTime(0,n+t0);g.gain.linearRampToValueAtTime(Math.min(.95,(v||.06)*4.2*(typeof VOL!=="undefined"?VOL.s:1)),n+t0+.01);g.gain.exponentialRampToValueAtTime(.0001,n+t0+d);o.connect(g);g.connect(c.destination);o.start(n+t0);o.stop(n+t0+d+.05)}
  if(c.state==="running")play();else{try{c.resume().then(play,function(){})}catch(e){}}}
function sfxPlay(k){
  if(k==="step")tone(120,0,.03,"square",.015);
  else if(k==="pick"){tone(660,0,.07,"square",.06);tone(990,.07,.09,"square",.06)}
  else if(k==="chime"){[523,659,784,1047].forEach(function(f,i){tone(f,i*.09,.3,"triangle",.1)})}
  else if(k==="coin"){tone(988,0,.07,"square",.05);tone(1319,.07,.2,"square",.05)}
  else if(k==="bad"){tone(160,0,.2,"sawtooth",.06)}
  else if(k==="splash"){tone(300,0,.12,"triangle",.08);tone(200,.08,.2,"triangle",.06)}
  else if(k==="tap")tone(520+Math.random()*120,0,.05,"square",.04);
  else if(k==="talk")tone(380+Math.random()*60,0,.04,"square",.025);
}
/* ---------- player / npc ---------- */
var P={x:9,y:35,px:9*T,py:35*T,d:2,mv:0,tx:9,ty:35,f:0,sit:false};
var N={x:40,y:23,px:40*T,py:23*T,d:2,mv:0,tx:40,ty:23,f:0,path:[],goal:null,sit:false,away:false};
var cam={x:0,y:0},ui=0,held=[false,false,false,false],lastAct=0,time=0,fish=null,wildHit=null;
function blockedTile(x,y,who){if(!inb(x,y)||solid[ix(x,y)])return true;if(who!=="n"&&N.x===x&&N.y===y&&!N.away)return true;if(who!=="p"&&P.x===x&&P.y===y)return true;if(who!=="n"&&N.mv>0&&N.tx===x&&N.ty===y&&!N.away)return true;return false}
function stepMover(m,dt,spd){
  if(m.mv>0){m.mv-=dt*spd;if(m.mv<=0){m.mv=0;m.x=m.tx;m.y=m.ty;m.px=m.x*T;m.py=m.y*T}else{var k=1-m.mv;m.px=(m.x+(m.tx-m.x)*k)*T;m.py=(m.y+(m.ty-m.y)*k)*T}}}
function tryStep(m,d,who){m.d=d;var nx=m.x+DX[d],ny=m.y+DY[d];if(blockedTile(nx,ny,who))return false;m.tx=nx;m.ty=ny;m.mv=1;m.f=(m.f+1)%2;return true}
/* BFS */
function bfs(sx,sy,gx,gy){
  if(sx===gx&&sy===gy)return [];var q=[ix(sx,sy)],prev={},seen={};seen[q[0]]=1;
  while(q.length){var c=q.shift(),cx_=c%MW,cy_=(c/MW)|0;
    for(var d=0;d<4;d++){var nx=cx_+DX[d],ny=cy_+DY[d];if(!inb(nx,ny))continue;var k=ix(nx,ny);if(seen[k])continue;if(solid[k]&&!(nx===gx&&ny===gy))continue;seen[k]=1;prev[k]=c;if(nx===gx&&ny===gy){var out=[],cur=k;while(cur!==ix(sx,sy)){out.unshift([cur%MW,(cur/MW)|0]);cur=prev[cur]}return out}q.push(k)}}
  return null}
var SCHED=[[6,[40,23]],[8,[35,29]],[11,[40,10]],[14,[44,27]],[17,[38,40]],[20,[37,28]],[22,[40,23]]];
function schedSpot(){var h=S.min/60,s=SCHED[0][1];for(var i=0;i<SCHED.length;i++)if(h>=SCHED[i][0])s=SCHED[i][1];return s}
function npcThink(){
  if(N.away||talking||N.hold)return;if(N.mv>0)return;
  if(N.path.length){var nx=N.path[0];if(!blockedTile(nx[0],nx[1],"n")){var d=nx[0]>N.x?1:nx[0]<N.x?3:nx[1]>N.y?2:0;N.d=d;N.tx=nx[0];N.ty=nx[1];N.mv=1;N.f=(N.f+1)%2;N.path.shift()}return}
  var g=schedSpot();var key=g[0]+","+g[1];
  if(N.goal!==key){N.goal=key;var gx=g[0],gy=g[1];var pth=bfs(N.x,N.y,gx,gy);if(pth)N.path=pth.slice(0,200)}
  else if(Math.random()<.004){var d2=Math.floor(Math.random()*4);if(!blockedTile(N.x+DX[d2],N.y+DY[d2],"n")&&Math.abs(N.x+DX[d2]-g[0])<4&&Math.abs(N.y+DY[d2]-g[1])<4){N.d=d2;N.tx=N.x+DX[d2];N.ty=N.y+DY[d2];N.mv=1;N.f=1-N.f}}
}
var talking=false;
/* ---------- day cycle ---------- */
function hhmm(m){var h=Math.floor(m/60)%24,mm=Math.floor(m%60);var ap=h>=12?"pm":"am";var h12=h%12||12;return h12+":"+(mm<10?"0":"")+mm+" "+ap}
function paintHud(){
  if(typeof vnSync==="function")vnSync();
  if(typeof goalCheck==="function")goalCheck();
  $("hday").textContent="Day "+S.day+(S.rain?" 🌧":"");$("htime").textContent=hhmm(S.min);$("hcoin").textContent="🪙 "+S.coins;
  var h=hearts(),hr=$("hhr"),pr=h>=10?100:S.fp%100;hr.innerHTML='<span class="hh">💗</span><b>'+h+'</b>/10<span class="hb"><u style="width:'+pr+'%"></u></span>';
  var e2=nextEvent(),g=$("goal");$("htime").style.color=S.min>=1440?"#ff5b5b":"";if(S.min>=1440){g.textContent="⚠ Past midnight! Go to bed before 1:00 am or you'll lose coins.";return}
  if(e2&&hearts()>=e2.h&&!(e2.needHome&&!S.homeBuilt))g.textContent="💌 Meet "+OTHER+" at "+e2.where+" after "+hhmm(e2.t*60);
  else if(e2&&hearts()>=e2.h&&e2.needHome)g.textContent="🏡 10 hearts! Build your home at the notice board to unlock the finale";
  else g.textContent=(typeof secretReady==="function"&&secretReady())?"⭐ Something new on the Map. After dark.":goalText();
}
function goalText(){
  if(!S.intro)return "Walk with the arrows. Press A to talk and interact.";
  if(S.planted<1)return "Goal: plant a flower in the farm plots (south of your cabin)";
  if(S.caught<1)return "Goal: catch a fish at the lake dock 🎣";
  if(!S.talked||S.talked!==S.day)return "Goal: find Danoya and say hello ("+hhmm(schedSpot()?S.min:0)+")";
  if(S.day>=2&&!S.seen.camp)return "Goal: Elder Hesper has lit a fire on the South Green. Everyone is invited ("+(S.min<19*60?"after 7 pm":"tonight")+")";
  var ne=nextEvent();return "Goal: fill Danoya's hearts"+(ne&&ne.h>hearts()?" ("+ne.h+" 💗 unlocks a heart event 💌)":", then build your home 🏡");
}
function newDay(pass){
  S.day++;try{outfitToast()}catch(e){}S.min=6*60;S.talked=0;S.hugged=0;S.gifted=0;
  /* grow */
  var grew=0;for(var k in plots){var c=plots[k];if(c.w||S.rain){if(c.a<3){c.a++;grew++}}c.w=false}
  S.rain=Math.random()<.22&&S.day>2;
  if(S.homeDay&&!S.homeBuilt&&S.day>S.homeDay){S.homeBuilt=true}
  spawnWild();
  P.x=9;P.y=35;P.tx=9;P.ty=35;P.px=9*T;P.py=35*T;P.mv=0;P.d=2;
  N.x=40;N.y=23;N.tx=40;N.ty=23;N.px=40*T;N.py=23*T;N.path=[];N.goal=null;N.away=false;
  save();paintHud();return grew;
}
function spawnWild(){
  S.wild=[];var tries=0;while(S.wild.length<16&&tries<400){tries++;
    var inMeadow=Math.random()<.6,x,y;
    if(inMeadow){x=29+Math.floor(Math.random()*33);y=3+Math.floor(Math.random()*12)}else{x=Math.round(12+(Math.random()-.5)*8);y=Math.round(13+(Math.random()-.5)*8)}
    if(!inb(x,y)||solid[ix(x,y)]||ground[ix(x,y)]===PA||ground[ix(x,y)]===WA||propAt(x,y))continue;
    if(S.wild.some(function(w){return w.x===x&&w.y===y}))continue;
    S.wild.push({x:x,y:y,t:Math.floor(Math.random()*4)})}
}
/* ---------- render ---------- */
function tileAt(x,y){
  var g=ground[ix(x,y)],px=x*T-cam.x,py=y*T-cam.y,h=(x*7+y*13)%4;
  var a;
  if(g===GR)a=atlas.grass[h];else if(g===FO)a=atlas.forest[(x+y)%3];else if(g===PA)a=atlas.path[(x+y)%2];else if(g===SA)a=atlas.sand[(x*3+y)%2];else if(g===SO)a=atlas.soil[(x+y)%2];else if(g===WO){R(px,py,T,T,"#4aa3e8");cx.drawImage(atlas.wood[(x)%2],px,py);return}
  if(a){cx.drawImage(a,Math.round(px),Math.round(py));return}
  var deep=g===DW,c=deep?"#2e7fbf":"#4aa3e8";R(px,py,T,T,c);R(px,py,T,T,((x+y)%2)?(deep?"#3589c9":"#55aeee"):c);
  var o=(time*20+x*9+y*5)%32;R(px+o%24,py+8+(x*5+y*3)%12,8,2,"#ffffff66");if(deep&&(x+y)%3===0)R(px+(o*1.5)%20,py+22,10,2,"#ffffff44");
  /* shore foam */
  if(!deep){var nb=function(dx,dy){return inb(x+dx,y+dy)&&ground[ix(x+dx,y+dy)]!==WA&&ground[ix(x+dx,y+dy)]!==WO&&ground[ix(x+dx,y+dy)]!==DW};
    if(nb(0,-1))R(px,py,T,3,"#ffffffaa");if(nb(0,1))R(px,py+T-3,T,3,"#ffffffaa");if(nb(-1,0))R(px,py,3,T,"#ffffffaa");if(nb(1,0))R(px+T-3,py,3,T,"#ffffffaa")}
  if(deep&&inb(x,y-1)&&ground[ix(x,y-1)]===SA)R(px,py,T,4,"#ffffffcc");
}
function draw(){
  var vw=VW*T,vh=VH*T;
  cam.x=Math.max(0,Math.min(MW*T-vw,P.px+T/2-vw/2));cam.y=Math.max(0,Math.min(MH*T-vh,P.py+T/2-vh/2));cam.x=Math.round(cam.x);cam.y=Math.round(cam.y);if(typeof CAMOV!=="undefined"&&CAMOV){cam.x=Math.round(CAMOV.x);cam.y=Math.round(CAMOV.y)}
  var x0=Math.floor(cam.x/T),y0=Math.floor(cam.y/T),x1=x0+VW+1,y1=y0+VH+1;
  for(var y=y0;y<=y1&&y<MH;y++)for(var x=x0;x<=x1&&x<MW;x++)tileAt(x,y);
  cx.save();cx.translate(-cam.x,-cam.y);
  var dr=[];
  props.forEach(function(p){if(p.x>=x0-2&&p.x<=x1+1&&p.y>=y0-1&&p.y<=y1+3)dr.push({y:(p.y+(p.k==="fountain"?2:1))*T,f:function(){drawProp(p)}})});
  [BUILD.farm,BUILD.shop,BUILD.cot].forEach(function(b){dr.push({y:(b.y+b.h)*T-2,f:function(){building(b)}})});
  if(typeof VIL!=="undefined")VIL.forEach(function(b){if(b.x>=x0-8&&b.x<=x1+4&&b.y>=y0-6&&b.y<=y1+2)dr.push({y:(b.y+b.h)*T-2,f:function(){building(b)}})});
  if(typeof EXB!=="undefined")EXB.forEach(function(b){if(b.x>=x0-6&&b.x<=x1+2&&b.y>=y0-6&&b.y<=y1+2)dr.push({y:(b.y+b.h)*T-2,f:function(){building(b)}})});
  if(S.homeBuilt)dr.push({y:(HOME.y+HOME.h)*T-2,f:function(){building({x:HOME.x,y:HOME.y,w:HOME.w,h:HOME.h,door:HOME.door,roof:"#2f9d8f",wall:"#f1dfb8",name:"Home"},true)}});
  else if(S.fund>0)dr.push({y:(HOME.y+HOME.h)*T-2,f:function(){var px=HOME.x*T,py=(HOME.y+1)*T;R(px,py+60,HOME.w*T,6,"#00000022");R(px+8,py+20,8,48,"#b98a54");R(px+HOME.w*T-16,py+20,8,48,"#b98a54");R(px+8,py+20,HOME.w*T-16,6,"#b98a54");R(px+30,py+40,50,22,"#8f6736");R(px+90,py+48,40,14,"#a67a4c");var pc=Math.min(1,S.fund/500);R(px+8,py+74,HOME.w*T-16,6,"#00000033");R(px+8,py+74,(HOME.w*T-16)*pc,6,"#ffc83d")}});
  for(var k in plots){var c=plots[k],pxx=(k%MW)*T,pyy=((k/MW)|0)*T;if(pxx>=cam.x-T&&pxx<=cam.x+vw&&pyy>=cam.y-T&&pyy<=cam.y+vh)(function(c,pxx,pyy,k){dr.push({y:pyy+T-1,f:function(){if(c.w||S.rain)R(pxx+1,pyy+1,T-2,T-2,"#5a3a24");plant(pxx,pyy,c,k%MW)}})})(c,pxx,pyy,+k)}
  S.wild.forEach(function(w){if(w.x>=x0-1&&w.x<=x1&&w.y>=y0-1&&w.y<=y1)dr.push({y:(w.y+1)*T-8,f:function(){var s=Math.sin(time*3+w.x)*1;R(w.x*T+13,w.y*T+16,2,12,"#3f8f3c");flowerArt(w.x*T+s,w.y*T+8,w.t)}})});
  dr.push({y:P.py+T,f:function(){person(P.px+(P.ox||0),P.py+(P.oy||0),P.d,ROLE.p,P.mv>0?P.f+1:0,P.sit)}});
  if(!N.away||N.show)dr.push({y:N.py+T,f:function(){person(N.px+(N.ox||0),N.py+(N.oy||0),N.d,ROLE.n,N.mv>0?N.f+1:0,N.sit);if(N.emote){cx.font="18px serif";cx.textAlign="center";cx.fillText(N.emote,N.px+16,N.py-10-Math.sin(time*5)*2)}}});
  if(fish&&fish.bx!==undefined)dr.push({y:fish.by*T+T,f:function(){var bx=fish.bx*T+16,by=fish.by*T+16+(fish.bite?Math.sin(time*40)*3:Math.sin(time*3)*1);R(bx-3,by-3,6,6,"#ff5b5b");R(bx-3,by-3,6,3,"#fff");cx.strokeStyle="#ffffffaa";cx.lineWidth=1;cx.beginPath();cx.moveTo(P.px+(P.d===3?4:P.d===1?28:16),P.py+10);cx.lineTo(bx,by);cx.stroke();if(fish.bite){cx.font="bold 24px sans-serif";cx.fillStyle="#ffdd33";cx.textAlign="center";cx.fillText("!",bx,by-14)}}});
  if(typeof vnpcPush==="function")vnpcPush(dr);
  if(SCENE&&SCENE.under)SCENE.under(dr);
  dr.sort(function(a,b){return a.y-b.y});dr.forEach(function(d){d.f()});
  /* event marker */
  var scx=secretActive();if(scx){var sxm=scx.place[0]*T+16,sym=scx.place[1]*T-6-Math.abs(Math.sin(time*4))*5;cx.font="bold 26px sans-serif";cx.textAlign="center";cx.fillStyle="#b48bff";cx.fillText("⭐",sxm,sym)}
  var ev=activeEvent();if(ev){var mx=ev.place[0]*T+16,my=ev.place[1]*T-6-Math.abs(Math.sin(time*4))*5;cx.font="bold 26px sans-serif";cx.textAlign="center";cx.fillStyle="#ff6f9c";cx.fillText("💌",mx,my)}
  /* facing marker */
  if(!ui&&!P.mv&&!fish&&!SCENE&&!talking){var fx=P.x+DX[P.d],fy=P.y+DY[P.d];if(inb(fx,fy)){cx.strokeStyle="#ffffffaa";cx.lineWidth=2;cx.strokeRect(fx*T+3,fy*T+3,T-6,T-6)}}
  if(SCENE&&SCENE.over)SCENE.over();
  cx.restore();
  /* tint */
  var h=S.min/60,tint=null;
  if(h<7)tint=[255,170,110,.20*(7-h)];else if(h>=17&&h<19.5)tint=[255,120,90,.22*((h-17)/2.5)];else if(h>=19.5&&h<22)tint=[20,30,90,.28+.12*((h-19.5)/2.5)];else if(h>=22)tint=[10,14,50,.46];
  if(S.rain)tint=tint?[tint[0]*.6+30,tint[1]*.6+40,tint[2]*.6+70,Math.min(.5,tint[3]+.16)]:[40,60,90,.2];
  if(tint){cx.fillStyle="rgba("+(tint[0]|0)+","+(tint[1]|0)+","+(tint[2]|0)+","+tint[3].toFixed(2)+")";cx.fillRect(0,0,vw,vh);
    if(tint[3]>.25){cx.globalCompositeOperation="lighter";props.forEach(function(p){if(p.k!=="lamp"&&!(p.k==="stove"))return;var sx=p.x*T-cam.x+16,sy=p.y*T-cam.y+8;if(sx<-60||sx>vw+60||sy<-60||sy>vh+60)return;var g=cx.createRadialGradient(sx,sy,2,sx,sy,70);g.addColorStop(0,"rgba(255,200,110,.45)");g.addColorStop(1,"rgba(255,200,110,0)");cx.fillStyle=g;cx.fillRect(sx-70,sy-70,140,140)});cx.globalCompositeOperation="source-over"}}
  if(S.rain&&!rm){cx.strokeStyle="rgba(200,225,255,.55)";cx.lineWidth=1;cx.beginPath();for(var i=0;i<60;i++){var rx=(i*53+time*260)%vw,ry=(i*97+time*520)%vh;cx.moveTo(rx,ry);cx.lineTo(rx-3,ry+9)}cx.stroke()}
}
