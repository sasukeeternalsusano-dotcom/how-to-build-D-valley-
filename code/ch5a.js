/* ===== Chapter 5: The Door (engine) ===== */
(function(){
var TS=32,W=10,H=12;
/* ---- SONG SLOTS: replace any value with a TRK key once you send the song ---- */
var SONG={op:"magi",title:"rumble",calm:"poke",fight1:"megax3",scout:"poke",workshop:"poke",fight3:"p4",road:"xzero",rally:"kuroko",spirit:"before",mini:"beerus",boss1:"rose",boss2:"reverse",boss3:"emofight",goodbye:"goodbye",hang:"dawn",ed:"oppiece",over:"over"};
try{TRK.lost="audio/lost.mp3";TRK.metaphor="audio/metaphor.mp3";TRK.dungeon="audio/dungeon.mp3";TRK.before="audio/before.mp3";TRK.omega="audio/omega.mp3";TRK.kh="audio/kh.mp3";TRK.mm3="audio/mm3.mp3";TRK.xzero="audio/xzero.mp3";TRK.winners="audio/winners_fast.mp3";TRK.over="audio/over.mp3";TRK.last="audio/last.mp3";TRK.boom="audio/boom.mp3";TRK.magi="audio/magi.mp3";TRK.rumble="audio/rumble.mp3";TRK.poke="audio/poke.mp3";TRK.megax3="audio/megax3.mp3";TRK.zelda="audio/zelda.mp3";TRK.p4="audio/p4.mp3";TRK.kuroko="audio/kuroko.mp3";TRK.beerus="audio/beerus.mp3";TRK.rose="audio/rose.mp3";TRK.reverse="audio/reverse.mp3";TRK.emofight="audio/emofight.mp3";TRK.goodbye="audio/goodbye.mp3";TRK.dawn="audio/dawn.mp3";TRK.oppiece="audio/oppiece.mp3"}catch(e){}
wantKey=function(){return null};
var C5K=null;
function m5(key,loop){if(window.__nosong)return;try{if(!key){C5K=null;stopSong(false,true);return}if(key===C5K&&songOn&&songEl&&!songEl.ended)return;C5K=key;playSong(key,loop!==false)}catch(e){}}
function toneS(f,t0,d,ty,v){try{tone(f,t0,d,ty,v)}catch(e){}}
function sfx5(k){try{
  if(k==="hit")toneS(190,0,.08,"sawtooth",.1);else if(k==="swing")toneS(420,0,.07,"triangle",.08);else if(k==="shoot")toneS(900,0,.06,"square",.05);
  else if(k==="pulse"){toneS(660,0,.18,"sine",.12);toneS(880,.06,.3,"sine",.1)}else if(k==="hurt"){toneS(140,0,.2,"square",.12);toneS(100,.08,.2,"square",.1)}
  else if(k==="boom"){toneS(90,0,.35,"sawtooth",.15);toneS(60,.05,.4,"square",.12)}else if(k==="key"){toneS(660,0,.1,"triangle",.1);toneS(990,.1,.2,"triangle",.1)}
  else if(k==="open"){toneS(220,0,.2,"triangle",.1);toneS(330,.15,.2,"triangle",.1);toneS(494,.3,.3,"triangle",.1)}
  else if(k==="swap")toneS(520,0,.08,"triangle",.07);else if(k==="heal"){toneS(523,0,.12,"sine",.1);toneS(784,.1,.2,"sine",.1)}
  else if(k==="place")toneS(300,0,.1,"square",.07);else if(k==="beacon"){toneS(440,0,.15,"triangle",.1);toneS(660,.12,.2,"triangle",.1);toneS(880,.24,.35,"triangle",.1)}
  else sfxPlay(k)}catch(e){}}
function sleep(ms){return new Promise(function(r){setTimeout(r,rm?Math.min(ms,80):ms)})}
function dist(a,b,c,d){return Math.hypot(a-c,b-d)}
function hsh(x,y,s){var n=Math.sin(x*127.1+y*311.7+s*74.7)*43758.5453;return n-Math.floor(n)}
function glowC(x,y,r,col,al){var g=cx.createRadialGradient(x,y,1,x,y,r);g.addColorStop(0,col);g.addColorStop(1,"rgba(255,255,255,0)");cx.globalAlpha=al;cx.fillStyle=g;cx.beginPath();cx.arc(x,y,r,0,7);cx.fill();cx.globalAlpha=1}
/* ---- state ---- */
var G={on:false,mode:"idle",a:0,hs:[],lead:0,en:[],pj:[],tr:[],fx:[],hp:20,mx:20,fade:0,shake:0,flash:0,party:[],obj:[],wave:0,waveT:0,spawnQ:[],post:null,cine:null,bossHud:null,ber:0,theme:"night",beacons:[],engine:null,msg:"",msgT:0};
window.__dun5=G;
var F5={act:0,seen:0};
function save5(){try{if(window.__cutprev)return;localStorage.setItem("dv5",JSON.stringify({act:F5.act}))}catch(e){}}
/* ---- maps: '.' ground ',' path '#' tree/wall 'v' void 'H' house 'S' stone ---- */
var MAPS={
sq:["##########","#........#","#.HH..HH.#","#.HH..HH.#","#........#","..,,,,,,,,.","..,,,,,,,,.","#........#","#.HH.....#","#.HH.....#","#........#","##########"],
hill:["##########","#..SSSS..#","#..SSSS..#","#..SSSS..#","#........#","#........#","#........#","#.#....#.#","#........#","#........#","#........#","##########"],
yard:["##########","#........#","#.HHHH...#","#.HHHH...#","#........#","#........#","#........#","#.#....#.#","#........#","#........#","#........#","##########"],
realm1:["vvvvvvvvvv","v........v","v.#....#.v","v........v","vv......vv","vv......vv","v........v","v.#....#.v","v........v","v........v","vv......vv","vvvvvvvvvv"],
realm2:["vvvvvvvvvv","v........v","v..#..#..v","v........v","v........v","v.#....#.v","v........v","v........v","v..#..#..v","v........v","v........v","vvvvvvvvvv"],
arena:["vvvvvvvvvv","v........v","v........v","v........v","v........v","v........v","v........v","v........v","v........v","v........v","v........v","vvvvvvvvvv"],
dawn:["##########","#........#","#.......w#","#......ww#","#.......w#","#........#","#........#","#.#......#","#........#","#........#","#........#","##########"]};
var THEME={night:{g:["#27406a","#243a60"],tr:"#14301f",tr2:"#1b4028",ptc:"#3a3a56",tint:"rgba(10,10,50,.16)"},spirit:{g:["#3a2a5a","#352752"],tr:"#2a1f45",tr2:"#3a2a5a",ptc:"#4a3a6a",tint:"rgba(40,0,70,.12)"},dawn:{g:["#7cb86a","#74b062"],tr:"#2f6e36",tr2:"#3d8a44",ptc:"#e0c898",tint:"rgba(255,200,140,.08)"}};
var BGC={};
function buildBg(key,th){var id=key+th;if(BGC[id])return BGC[id];var c=document.createElement("canvas");c.width=320;c.height=384;var g=c.getContext("2d"),m=MAPS[key],T=THEME[th];
  for(var y=0;y<H;y++)for(var x=0;x<W;x++){var ch=m[y][x],px=x*TS,py=y*TS;
    if(ch==="v"){g.fillStyle="#07040f";g.fillRect(px,py,TS,TS);if(hsh(x,y,3)<.5){g.fillStyle="rgba(180,150,255,.5)";g.fillRect(px+hsh(x,y,1)*28,py+hsh(x,y,2)*28,2,2)}continue}
    g.fillStyle=T.g[(x+y)&1];g.fillRect(px,py,TS,TS);for(var i=0;i<3;i++)if(hsh(x,y,i)<.45){g.fillStyle="rgba(255,255,255,.07)";g.fillRect(px+hsh(x,y,i+9)*28,py+hsh(x,y,i+5)*28,2,2)}
    if(ch===","){g.fillStyle=T.ptc;g.fillRect(px,py,TS,TS);g.fillStyle="rgba(255,255,255,.08)";g.fillRect(px+4,py+6,3,2);g.fillRect(px+20,py+19,3,2)}
    else if(ch==="w"){g.fillStyle="#2f7fb8";g.fillRect(px,py,TS,TS);g.fillStyle="#58a8d8";g.fillRect(px+4,py+8,10,2)}
    else if(ch==="#"){g.fillStyle="#00000030";g.beginPath();g.ellipse(px+16,py+28,12,4,0,0,7);g.fill();g.fillStyle="#3a2a1a";g.fillRect(px+13,py+16,6,14);g.fillStyle=T.tr;g.beginPath();g.arc(px+16,py+12,15,0,7);g.fill();g.fillStyle=T.tr2;g.beginPath();g.arc(px+11,py+9,8,0,7);g.fill()}
    else if(ch==="H"){var top=y>0&&m[y-1][x]==="H";if(!top){g.fillStyle=th==="night"?"#6a2a32":"#b3402f";g.fillRect(px,py+2,TS,TS-2)}else{g.fillStyle=th==="night"?"#8a7660":"#d7b58a";g.fillRect(px,py,TS,TS);g.fillStyle="#ffd98a";g.fillRect(px+9,py+9,14,10)}}
    else if(ch==="S"){}}
  (function(){var x0=99,y0=99,x1=-1,y1=-1;for(var yy=0;yy<m.length;yy++)for(var xx=0;xx<m[yy].length;xx++)if(m[yy][xx]==="S"){x0=Math.min(x0,xx);y0=Math.min(y0,yy);x1=Math.max(x1,xx);y1=Math.max(y1,yy)}if(x1>=0){var w=(x1-x0+1)*TS;drawShrine(g,x0*TS,y0*TS,w,(y1-y0+1)*TS,x0*TS+w/2-16,.6,{sign:false,small:1})}})();
  BGC[id]=c;return c}
function solidT(tx,ty){if(tx<0||ty<0||tx>=W||ty>=H)return false;return "#vHS".indexOf(MAPS[G.map][ty][tx])>=0}
window.__blk5=function(){return blockedP.apply(null,arguments)};
function blockedP(x,y,hw,hh){if(x<hw||y<hh||x>320-hw||y>384-hh)return true;
  return solidT(Math.floor((x-hw)/TS),Math.floor((y-hh)/TS))||solidT(Math.floor((x+hw)/TS),Math.floor((y-hh)/TS))||solidT(Math.floor((x-hw)/TS),Math.floor((y+hh)/TS))||solidT(Math.floor((x+hw)/TS),Math.floor((y+hh)/TS))}
function moveE(e,dx,dy,sp,dt,hw,hh){var m=false;hw=hw||6;hh=hh||4;if(dx){var nx=e.x+dx*sp*dt;if(!blockedP(nx,e.y,hw,hh)){e.x=nx;m=true}}if(dy){var ny=e.y+dy*sp*dt;if(!blockedP(e.x,ny,hw,hh)){e.y=ny;m=true}}return m}
/* ---- heroes ---- */
var KIT={
 doodi:{n:"Doodi",sp:84,a:{cd:.35,dmg:2,r:30},s:{cd:3,n:"Dash"},hum:true},
 danoya:{n:"Danoya",sp:82,a:{cd:.9,dmg:1,r:58},s:{cd:8,n:"Song"},hum:true},
 judy:{n:"Judy",sp:90,a:{cd:.45,dmg:2.5,r:34},s:{cd:5,n:"Slam"},spec:"judy"},
 dan:{n:"Dan",sp:92,a:{cd:.3,dmg:1.5,r:0},s:{cd:5,n:"Volley"},spec:"dan"},
 rocket:{n:"Mr. Rocket",sp:78,a:{cd:1.1,dmg:0,r:0},s:{cd:6,n:"Rocket"},spec:"rocket"}};
function mkH(id,x,y){return {id:id,x:x,y:y,d:2,mv:0,cd:0,cs:0,inv:0,sw:0,ai:true}}
function lead(){return G.hs[G.lead]}
function setParty(ids,pos){G.hs=ids.map(function(id,i){var p=pos&&pos[i]||[160+i*18,300];return mkH(id,p[0],p[1])});G.lead=0;G.hs.forEach(function(h,i){h.ai=i!==0;var n=0;while(n++<80&&blockedP(h.x,h.y,6,4)){var vx=160-h.x,vy=200-h.y,d=Math.sqrt(vx*vx+vy*vy)||1;h.x+=vx/d*3;h.y+=vy/d*3}})}
function nearestEn(x,y,maxd){var b=null,bd=maxd||999;G.en.forEach(function(e){if(e.dead||e.ghost)return;var d=dist(x,y,e.x,e.y);if(d<bd){bd=d;b=e}});return b}
function hurtHero(n,sx,sy){var done=false;
  var l=lead();if(l&&l.inv>0)return;G.hs.forEach(function(h){h.inv=Math.max(h.inv,.9)});
  G.hp=Math.max(0,G.hp-n);G.flash=.3;G.shake=.2;sfx5("hurt");}
function dmgE(e,n,kx,ky){if(e.dead||e.ghost)return;e.hp-=n;if(G.hs&&G.hs.length>=3&&!G.cine)G.um=Math.min(100,(G.um||0)+Math.min(n,6)*1.5);e.fl=.12;sfx5("hit");if(kx!==undefined&&!e.boss&&e.k!=="brute"){e.x+=kx*6;e.y+=ky*6}
  if(e.hp<=0&&!e.boss){e.dead=1;puff(e.x,e.y,"#b78bff");if(Math.random()<.18)G.fx.push({k:"heart",x:e.x,y:e.y,t:8});if(e.onDie)e.onDie(e)}else if(e.boss&&e.onHit)e.onHit(e)}
function puff(x,y,c){for(var i=0;i<9;i++)G.fx.push({k:"p",x:x,y:y,vx:(Math.random()-.5)*120,vy:(Math.random()-.5)*120,t:.5,c:c})}
function aoe(x,y,r,n,kb){G.en.forEach(function(e){if(!e.dead&&!e.ghost&&dist(x,y,e.x,e.y)<r+(e.big?12:0)){var d=dist(x,y,e.x,e.y)||1;dmgE(e,n,kb?(e.x-x)/d*2:0,kb?(e.y-y)/d*2:0)}})}
function shoot(h,ang,dmg,sp,life){G.pj.push({x:h.x,y:h.y-14,vx:Math.cos(ang)*sp,vy:Math.sin(ang)*sp,t:life||1,dmg:dmg,own:"h",c:"#fff2a8"})}
function fa(h){return [-1.5708,0,1.5708,3.1416][h.d]}
function tgtAng(h){var e=nearestEn(h.x,h.y,200);return e&&h.ai?Math.atan2(e.y-14-h.y,e.x-h.x):fa(h)}
function doAttack(h){if(!h)return;var k=KIT[h.id];if(h.cd>0||G.cine)return;h.cd=k.a.cd;var a=tgtAng(h);if(h.ai){var e=nearestEn(h.x,h.y,200);if(e)h.d=Math.abs(e.x-h.x)>Math.abs(e.y-h.y)?(e.x>h.x?1:3):(e.y>h.y?2:0)}
  var dx=[0,1,0,-1][h.d],dy=[-1,0,1,0][h.d];
  if(h.id==="doodi"||h.id==="judy"){h.sw=.2;sfx5("swing");aoe(h.x+dx*20,h.y-10+dy*16,k.a.r*.75,k.a.dmg,true)}
  else if(h.id==="danoya"){h.sw=.25;sfx5("pulse");G.fx.push({k:"ring",x:h.x,y:h.y-10,r:6,mx:k.a.r,t:.3});aoe(h.x,h.y-10,k.a.r,k.a.dmg,true);G.en.forEach(function(e){if(!e.dead&&!e.boss&&dist(h.x,h.y,e.x,e.y)<k.a.r)e.stun=.8})}
  else if(h.id==="dan"){sfx5("shoot");shoot(h,a,k.a.dmg,270,.9)}
  else if(h.id==="rocket"){if(G.tr.length>=3&&!h.ai){G.tr.shift()}if(G.tr.length<3){sfx5("place");G.tr.push({x:h.x+dx*18,y:h.y+dy*10,cd:0,hp:6,t:22})}}}
function doSkill(h){var k=KIT[h.id];if(h.cs>0||G.cine)return;h.cs=k.s.cd;var dx=[0,1,0,-1][h.d],dy=[-1,0,1,0][h.d];
  if(h.id==="doodi"){sfx5("swing");h.inv=Math.max(h.inv,.35);for(var i=0;i<6;i++){moveE(h,dx,dy,520,.016);aoe(h.x,h.y-8,24,3,true)}puff(h.x,h.y,"#fff")}
  else if(h.id==="danoya"){sfx5("heal");G.hp=Math.min(G.mx,G.hp+4);G.fx.push({k:"ring",x:h.x,y:h.y-10,r:6,mx:90,t:.5,c:"#8ff7b8"});if(G.post)G.post.hp=Math.min(G.post.mx,G.post.hp+6)}
  else if(h.id==="judy"){sfx5("boom");G.shake=.3;G.fx.push({k:"ring",x:h.x,y:h.y-6,r:6,mx:64,t:.35,c:"#ffb35a"});aoe(h.x,h.y-6,64,4,true)}
  else if(h.id==="dan"){sfx5("shoot");var a=tgtAng(h);for(var j=-2;j<=2;j++)shoot(h,a+j*.2,2,260,.9)}
  else if(h.id==="rocket"){sfx5("boom");var e=nearestEn(h.x,h.y,260);var tx=e?e.x:h.x+dx*80,ty=e?e.y:h.y+dy*80;G.pj.push({x:h.x,y:h.y-20,vx:(tx-h.x)*2.2,vy:(ty-h.y+20)*2.2,t:.45,dmg:0,own:"r",c:"#ff7a3d",tx:tx,ty:ty})}}
var UC={doodi:"#ff7a7a",danoya:"#8ff7b8",judy:"#ffb35a",dan:"#7ad0ff",rocket:"#ff7a3d"};
function rb(k){return "hsl("+Math.round((k*360)%360)+",100%,72%)"}
async function doUlt(){if(!G.on||G.mode!=="combat"||G.cine||talking||ui||(G.um||0)<100||G.hs.length<3)return;
  G.um=0;G.cine={ult:1};var U={dark:0,dT:.38,cap:"",bolts:[],beam:0,glow:0,sl:[],fl:0,t:0,rain:0};
  var dd=G.hs.filter(function(h){return h.id==="doodi"})[0],dn=G.hs.filter(function(h){return h.id==="danoya"})[0],fin=!!(dd&&dn);
  var pos0=G.hs.map(function(h){return [h.x,h.y]});
  G.ultV=function(){if(!G.ultV)return;
    cx.fillStyle="rgba(6,4,30,"+U.dark+")";cx.fillRect(0,0,320,384);
    if(U.glow>.02&&dn){var hy=dn.y-16,gr=cx.createRadialGradient(dn.x,hy,2,dn.x,hy,28+U.glow*110);gr.addColorStop(0,U.rain?rb(U.t*.6):"rgba(255,248,200,.9)");gr.addColorStop(1,"rgba(255,255,255,0)");cx.globalAlpha=Math.min(.9,.3+U.glow*.6);cx.fillStyle=gr;cx.fillRect(0,0,320,384);cx.globalAlpha=1;
      cx.lineWidth=3;for(var q=0;q<12;q++){var an=q*.5236+U.t*.8,l1=26,l2=44+Math.sin(U.t*9+q)*8;cx.strokeStyle=rb(U.t*.5+q/12);cx.globalAlpha=.7;cx.beginPath();cx.moveTo(dn.x+Math.cos(an)*l1,hy+Math.sin(an)*l1);cx.lineTo(dn.x+Math.cos(an)*l2,hy+Math.sin(an)*l2);cx.stroke()}cx.globalAlpha=1;cx.lineWidth=1}
    U.bolts.forEach(function(b){if(b.t>0){cx.globalAlpha=Math.min(1,b.t*4);cx.strokeStyle=b.c;cx.lineWidth=5*Math.min(1,b.t*4);cx.lineCap="round";cx.beginPath();cx.moveTo(b.x1,b.y1);cx.lineTo(b.x2,b.y2);cx.stroke();cx.strokeStyle="#fff";cx.lineWidth=1.5;cx.stroke();cx.lineCap="butt";cx.lineWidth=1;cx.globalAlpha=1}});
    if(U.beam>.03&&dn&&dd){var sx=dd.x+8,sy=dd.y-40,g2=cx.createLinearGradient(dn.x,dn.y-16,sx,sy);for(var z=0;z<=4;z++)g2.addColorStop(z/4,rb(U.t*.7+z/5));cx.strokeStyle=g2;cx.lineWidth=3+U.beam*9;cx.globalAlpha=.9*U.beam;cx.beginPath();cx.moveTo(dn.x,dn.y-16);cx.lineTo(sx,sy);cx.stroke();cx.strokeStyle="#fff";cx.lineWidth=2;cx.stroke();cx.globalAlpha=1;cx.lineWidth=1;
      var sg=cx.createRadialGradient(sx,sy-8,2,sx,sy-8,34);sg.addColorStop(0,rb(U.t));sg.addColorStop(1,"rgba(255,255,255,0)");cx.globalAlpha=U.beam;cx.fillStyle=sg;cx.fillRect(sx-40,sy-48,80,80);cx.globalAlpha=1;
      cx.strokeStyle="#fff";cx.lineWidth=5;cx.lineCap="round";cx.beginPath();cx.moveTo(sx,sy+14);cx.lineTo(sx,sy-28);cx.stroke();cx.strokeStyle=rb(U.t*1.3);cx.lineWidth=2;cx.stroke();cx.lineCap="butt";cx.lineWidth=1}
    U.sl.forEach(function(sl){if(sl.t>0){var L=80,al=Math.min(1,sl.t*4);cx.lineCap="round";cx.strokeStyle="rgba(255,255,255,"+al+")";cx.lineWidth=7*al;cx.beginPath();cx.moveTo(sl.x-Math.cos(sl.a)*L,sl.y-Math.sin(sl.a)*L);cx.lineTo(sl.x+Math.cos(sl.a)*L,sl.y+Math.sin(sl.a)*L);cx.stroke();cx.strokeStyle=rb(sl.h);cx.lineWidth=3;cx.stroke();cx.lineCap="butt";cx.lineWidth=1}});
    if(U.fl>0){cx.fillStyle="rgba(255,255,255,"+Math.min(.85,U.fl)+")";cx.fillRect(0,0,320,384)}
    if(U.cap){cx.font="bold 15px sans-serif";cx.textAlign="center";cx.textBaseline="top";var w3=cx.measureText(U.cap).width+22;cx.fillStyle="#000c";cx.fillRect(160-w3/2,70,w3,28);cx.fillStyle=U.cap==="SUNBREAKER!"?rb(U.t*1.5):"#fff";cx.fillText(U.cap,160,76);cx.textAlign="left"}};
  function frames(ms){return new Promise(function(r){var n=Math.round(ms/16),i=0;(function f(){if(i++>=n)return r();U.t+=.016;U.dark+=(U.dT-U.dark)*.15;U.bolts.forEach(function(b){b.t-=.016});U.sl.forEach(function(b){b.t-=.016});if(U.fl>0)U.fl-=.03;try{stepFx(.016)}catch(e){}setTimeout(f,16)})()})}
  function tween(o,k,to,ms){return new Promise(function(r){var n=Math.round(ms/16),i=0,f0=o[k];(function f(){i++;o[k]=f0+(to-f0)*Math.min(1,i/n);U.t+=.016;U.dark+=(U.dT-U.dark)*.15;U.bolts.forEach(function(b){b.t-=.016});U.sl.forEach(function(b){b.t-=.016});if(U.fl>0)U.fl-=.03;try{stepFx(.016)}catch(e){}if(i>=n)return r();setTimeout(f,16)})()})}
  try{
  sfx5("swap");U.cap="TOGETHER!";await frames(700);
  var atk=G.hs.filter(function(h){return !fin||(h.id!=="doodi"&&h.id!=="danoya")});
  var LN={judy:"Judy: HOLD THE LINE!",dan:"Dan: VOLLEY!",rocket:"Rocket: FIRE IN THE HOLE!",doodi:"Doodi: HAAH!",danoya:"Danoya: LIGHT!"};
  for(var i=0;i<atk.length;i++){var h=atk[i],tg=null,bd=1e9;G.en.forEach(function(e){if(!e.dead&&!e.ghost){var d=dist(h.x,h.y,e.x,e.y);if(d<bd){bd=d;tg=e}}});
    U.cap=LN[h.id]||"";var tx=tg?tg.x:h.x,ty=tg?tg.y-10:h.y-80;
    U.bolts.push({x1:h.x,y1:h.y-14,x2:tx,y2:ty,t:.4,c:UC[h.id]||"#fff"});sfx5(h.id==="rocket"?"boom":h.id==="dan"?"shoot":"swing");G.shake=Math.max(G.shake,.3);
    G.fx.push({k:"ring",x:tx,y:ty,r:6,mx:60,t:.35,c:UC[h.id]||"#fff"});
    G.en.forEach(function(e){if(!e.dead&&!e.ghost&&(e===tg||dist(tx,ty,e.x,e.y)<60)){dmgE(e,10,0,0);e.stun=Math.max(e.stun||0,1)}});
    await frames(520)}
  if(fin){
    U.cap="Danoya: Doodi. Take my light!";sfx5("pulse");U.glow=1;U.rain=1;await tween(dn,"y",dn.y-34,600);await frames(300);
    U.cap="Doodi: All of it. Always.";U.beam=1;sfx5("pulse");await frames(1000);
    var tg2=null,bh=-1;G.en.forEach(function(e){if(!e.dead&&!e.ghost&&e.hp>bh){bh=e.hp;tg2=e}});var bx=tg2?tg2.x:160,by=tg2?tg2.y:120;
    U.cap="SUNBREAKER!";G.shake=.7;sfx5("boom");var ox=dd.x,oy=dd.y;
    var ty2=Math.max(60,Math.min(300,by+40)),tx2=Math.max(48,Math.min(272,bx));
    await Promise.all([tween(dd,"x",tx2,320),tween(dd,"y",ty2,320)]);U.beam=0;
    for(var k=0;k<7;k++){U.sl.push({x:bx,y:by,a:-1+k*.4+(k%2?.5:0),t:.35,h:k/7+U.t});sfx5("hit");G.shake=.55;U.fl=.25;G.fx.push({k:"ring",x:bx+(Math.random()-.5)*40,y:by+(Math.random()-.5)*40,r:4,mx:50,t:.3,c:rb(k/7)});await frames(150)}
    sfx5("boom");U.fl=.9;G.shake=1.1;
    for(var r=0;r<5;r++)G.fx.push({k:"ring",x:bx,y:by,r:8,mx:120+r*55,t:.55+r*.1,c:rb(r/5)});
    G.en.forEach(function(e){if(!e.dead&&!e.ghost){dmgE(e,40,0,0);e.stun=Math.max(e.stun||0,e.boss?.8:1.6)}});
    U.glow=0;U.rain=0;await Promise.all([tween(dn,"y",pos0[G.hs.indexOf(dn)][1],400),frames(500)]);
    if(blockedP(dd.x,dd.y,6,4)){dd.x=ox;dd.y=oy}
  }else{sfx5("boom");U.fl=.8;G.shake=1;G.en.forEach(function(e){if(!e.dead&&!e.ghost){dmgE(e,20,0,0);e.stun=Math.max(e.stun||0,1.2)}});await frames(500)}
  }catch(e){}
  G.pj=G.pj.filter(function(p){return p.own!=="e"});G.hp=Math.min(G.mx,G.hp+6);G.hs.forEach(function(h){h.inv=Math.max(h.inv||0,2.4)});
  U.dT=0;await frames(400);G.ultV=null;G.cine=null}
window.__dunUlt5=doUlt;
/* ---- enemies ---- */
function mkEn(k,x,y){var T={shade:{hp:3,sp:38,r:8,dmg:1},wisp:{hp:2,sp:30,r:8,dmg:1},brute:{hp:11,sp:26,r:13,dmg:2,big:1},guest:{hp:45,sp:42,r:14,dmg:2,big:1,boss:1}}[k];
  return {k:k,x:x,y:y,hp:T.hp,mx:T.hp,sp:T.sp,r:T.r,dmg:T.dmg,big:T.big,boss:T.boss,cd:1+Math.random(),fl:0,d:0,stun:0,t:Math.random()*6}}
function spawn(k,x,y){var e=mkEn(k,x,y);G.en.push(e);return e}
function stepEn(dt){G.en.forEach(function(e){if(e.dead)return;e.t+=dt;if(e.fl>0)e.fl-=dt;if(e.stun>0){e.stun-=dt;return}
  var tg=null,td=999;G.hs.forEach(function(h){var d=dist(e.x,e.y,h.x,h.y);if(d<td){td=d;tg=h}});if(G.post&&(!tg||dist(e.x,e.y,G.post.x,G.post.y)<td-20)){tg=G.post;td=dist(e.x,e.y,G.post.x,G.post.y)}
  if(!tg)return;var ux=(tg.x-e.x)/(td||1),uy=(tg.y-e.y)/(td||1);e.d=Math.abs(ux)>Math.abs(uy)?(ux>0?1:3):(uy>0?2:0);
  if(e.k==="wisp"){var want=td>90?1:td<60?-1:0;moveE(e,ux*want,uy*want,e.sp,dt,6,4);e.cd-=dt;if(e.cd<=0&&td<190){e.cd=2.2;G.pj.push({x:e.x,y:e.y-8,vx:ux*86,vy:uy*86,t:3,dmg:1,own:"e",c:"#c79bff"})}}
  else if(e.k==="guest"){e.cd-=dt;if(td>46)moveE(e,ux,uy,e.sp,dt,10,6);if(e.cd<=0){e.cd=2.4;var a0=Math.atan2(uy,ux);for(var i=-3;i<=3;i++)G.pj.push({x:e.x,y:e.y-14,vx:Math.cos(a0+i*.22)*92,vy:Math.sin(a0+i*.22)*92,t:3,dmg:1,own:"e",c:"#fffbe8"});sfx5("shoot");if(e.hp<e.mx/2)spawn("shade",e.x+20,e.y)}if(td<30)contact(e,tg)}
  else{moveE(e,ux,uy,e.sp,dt,e.big?10:6,e.big?6:4);if(td<(e.big?30:20))contact(e,tg)}})}
function contact(e,tg){if(e.cd>0&&e.k!=="shade"&&e.k!=="brute"){}e.hc=(e.hc||0);if(e.hc>0)return;if(tg===G.post){e.hc=.9;G.post.hp-=e.dmg;G.post.fl=.2;sfx5("hit")}else{var L0=lead();if(L0&&dist(e.x,e.y,L0.x,L0.y)<(e.big||e.k==="guest"?32:22)){e.hc=.9;hurtHero(e.dmg)}else e.hc=.25}}
/* ---- projectiles, turrets, fx ---- */
function stepPj(dt){G.pj=G.pj.filter(function(p){p.t-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;if(p.own==="r"){if(p.t<=0){aoe(p.tx,p.ty,52,6,true);sfx5("boom");G.shake=.3;G.fx.push({k:"ring",x:p.tx,y:p.ty,r:6,mx:52,t:.3,c:"#ff9a3d"});puff(p.tx,p.ty,"#ff9a3d")}return p.t>0}
  if(p.t<=0||p.x<-10||p.y<-10||p.x>330||p.y>394)return false;
  if(p.own==="h"){for(var i=0;i<G.en.length;i++){var e=G.en[i];if(!e.dead&&!e.ghost&&dist(p.x,p.y,e.x,e.y-6)<e.r+4){dmgE(e,p.dmg,p.vx>0?1:-1,0);return false}}}
  else{var ok=true;var L1=lead();if(L1&&dist(p.x,p.y,L1.x,L1.y-12)<9&&L1.inv<=0){hurtHero(p.dmg);ok=false}return ok}
  return true})}
function stepTr(dt){G.tr=G.tr.filter(function(t){t.t-=dt;t.cd-=dt;if(t.cd<=0){var e=nearestEn(t.x,t.y,140);if(e){t.cd=.7;var a=Math.atan2(e.y-8-t.y+10,e.x-t.x);G.pj.push({x:t.x,y:t.y-10,vx:Math.cos(a)*240,vy:Math.sin(a)*240,t:.7,dmg:1,own:"h",c:"#ffb35a"});sfx5("shoot")}}return t.t>0})}
function stepFx(dt){G.fx=G.fx.filter(function(f){f.t-=dt;if(f.k==="p"){f.x+=f.vx*dt;f.y+=f.vy*dt}else if(f.k==="ring"){f.r+=(f.mx-6)/Math.max(.01,f.t+dt)*dt}else if(f.k==="heart"){G.hs.forEach(function(h){if(f.t>0&&dist(h.x,h.y,f.x,f.y)<18){f.t=0;G.hp=Math.min(G.mx,G.hp+2);sfx5("heal")}})}return f.t>0})}
/* ---- AI allies ---- */
function easy5(){try{return localStorage.getItem("dv_easy5")==="1"}catch(e){return false}}
function aiStep(h,vx,vy,dt){var d=Math.sqrt(vx*vx+vy*vy)||1,sp=KIT[h.id].sp*.9;var ok=moveE(h,vx/d,vy/d,sp,dt);
  if(!ok){h.stk=(h.stk||0)+dt;if(h.stk>.2){var sg=(h.id.charCodeAt(0)%2)?1:-1;ok=moveE(h,-vy/d*sg,vx/d*sg,sp,dt)||moveE(h,vy/d*sg,-vx/d*sg,sp,dt);vx=ok?-vy*sg:vx;vy=ok?vx*0+vy:vy}}else h.stk=0;
  if(ok){h.mv=1;h.d=Math.abs(vx)>Math.abs(vy)?(vx>0?1:3):(vy>0?2:0)}}
function stepAI(h,dt){var k=KIT[h.id];h.mv=0;var l=lead();var E=easy5();
  var sx=0,sy=0;G.hs.forEach(function(o){if(o===h)return;var q=dist(h.x,h.y,o.x,o.y);if(q<34){var m=(34-q)/34;if(q<1){sx+=Math.random()-.5;sy+=Math.random()-.5}else{sx+=(h.x-o.x)/q*m;sy+=(h.y-o.y)/q*m}}});
  var e=nearestEn(h.x,h.y,E?150:(k.a.r?Math.min(k.a.r,100):46));
  if(e){var d=dist(h.x,h.y,e.x,e.y);h.d=Math.abs(e.x-h.x)>Math.abs(e.y-h.y)?(e.x>h.x?1:3):(e.y>h.y?2:0);
    if(E){if(h.id!=="rocket"){var want=k.a.r?k.a.r*.7:90;if(d>want)aiStep(h,e.x-h.x,e.y-h.y,dt);else if(k.a.r===0&&d<50)aiStep(h,h.x-e.x,h.y-e.y,dt)}
      if(d<(k.a.r||190)+4)doAttack(h);
      var near=0;G.en.forEach(function(q){if(!q.dead&&dist(q.x,q.y,h.x,h.y)<70)near++});if(h.id==="rocket"||(h.id==="danoya"?G.hp<=10:near>=2||e.boss))doSkill(h)}
    else{if(d<(k.a.r||46)+4)doAttack(h);if(h.id==="danoya"&&G.hp<=6)doSkill(h)}}
  /* follow loosely, keep spread out */
  var idx=0,n=0;G.hs.forEach(function(o,i){if(i===G.lead)return;if(o===h)idx=n;n++});
  var ang=idx*(6.283/Math.max(2,n+1))+1.2,tx=Math.max(48,Math.min(272,l.x+Math.cos(ang)*78)),ty=Math.max(48,Math.min(326,l.y+Math.sin(ang)*66+10)),td=dist(h.x,h.y,tx,ty),ld=dist(h.x,h.y,l.x,l.y);
  var vx=sx*2.2,vy=sy*2.2;
  if(!e||!E){if(ld>120||(h.far&&td>26)){h.far=1;vx+=(tx-h.x)/(td||1);vy+=(ty-h.y)/(td||1)}else h.far=0}
  if(Math.abs(vx)+Math.abs(vy)>.08)aiStep(h,vx,vy,dt)}
function stepHeroes(dt){var l=lead();
  var dx=(held[1]?1:0)-(held[3]?1:0),dy=(held[2]?1:0)-(held[0]?1:0);if(dx&&dy){dx*=.72;dy*=.72}var JY=window.__joy;if(JY&&JY.on){dx=JY.x;dy=JY.y}
  l.mv=0;if(dx||dy){l.mv=moveE(l,dx,dy,KIT[l.id].sp,dt)?1:.001;l.d=Math.abs(dx)>Math.abs(dy)?(dx>0?1:3):(dy>0?2:0)}
  G.hs.forEach(function(h,i){h.cd-=dt;h.cs-=dt;if(h.inv>0)h.inv-=dt;if(h.sw>0)h.sw-=dt;if(i!==G.lead&&G.hs.length>1)stepAI(h,dt)});
  G.en.forEach(function(e){if(e.hc>0)e.hc-=dt})}
/* ---- controls ---- */
window.__dunA=function(){if(!G.on||talking||ui||G.cine||G.trans)return;if(G.onA&&G.onA())return;doAttack(lead())};
window.__dunSwap=function(){if(!G.on||talking||ui||G.cine||G.hs.length<2)return;G.hs[G.lead].ai=true;G.lead=(G.lead+1)%G.hs.length;G.hs[G.lead].ai=false;sfx5("swap");toast("Now playing: "+KIT[lead().id].n)};
function skillBtn(){if(!G.on||talking||ui||G.cine)return;doSkill(lead())}
window.addEventListener("keydown",function(e){if(!G.on)return;if(e.key==="f"||e.key==="F"){e.preventDefault();skillBtn()}if(e.key==="r"||e.key==="R"){e.preventDefault();doUlt()}},true);
function ensureBtn(){var ctl=document.querySelector(".ab");if(ctl&&!document.getElementById("bs")){var s=document.createElement("button");s.id="bs";s.type="button";s.className="b";s.textContent="Skill";s.addEventListener("pointerdown",function(e){e.preventDefault();skillBtn()});ctl.insertBefore(s,ctl.firstChild)}
  if(!document.getElementById("ab5")){var st=document.createElement("style");st.id="ab5";st.textContent=".ab{display:grid!important;grid-template-columns:auto auto auto;grid-template-rows:auto;gap:8px 12px;align-items:center;justify-items:center}#bs{grid-column:1;grid-row:1}#bb{grid-column:2;grid-row:1}#ba{grid-column:3;grid-row:1}";document.head.appendChild(st)}
  if(ctl&&!document.getElementById("bu")){var u=document.createElement("button");u.id="bu";u.type="button";u.className="b";u.style.cssText="grid-column:1/4;grid-row:2;display:none;width:100%;height:36px;border-radius:99px;font-size:.85rem;letter-spacing:.5px";u.addEventListener("pointerdown",function(e){e.preventDefault();doUlt()});ctl.appendChild(u)}
  var bb=document.getElementById("bb");if(bb)bb.textContent="Swap";
  if(!window.__cdTimer){window.__cdTimer=setInterval(function(){try{var s=document.getElementById("bs");if(!s)return;var h=G.on&&G.hs&&G.hs.length?lead():null;if(!h||!KIT[h.id]){s.style.backgroundImage="";s.textContent="Skill";return}var k=KIT[h.id].s,cs=Math.max(0,h.cs||0);if(cs>0.02){var deg=Math.round(360*cs/k.cd);s.style.backgroundImage="conic-gradient(rgba(0,0,0,.62) "+deg+"deg, transparent 0)";s.style.opacity=".85";s.textContent=cs.toFixed(cs<10?1:0)+"s"}else{s.style.backgroundImage="";s.style.opacity="1";s.textContent=k.n}var u=document.getElementById("bu");if(u){var show=G.on&&G.mode==="combat"&&G.hs&&G.hs.length>=3;u.style.display=show?"block":"none";if(show){var m=Math.floor(G.um||0);if(m>=100){u.style.backgroundImage="linear-gradient(90deg,#ffd34d,#ff7ab0)";u.style.color="#3a1020";u.textContent="★ TEAM ULTIMATE · READY (R) ★";u.style.boxShadow="0 0 14px #ffd34d"}else{u.style.backgroundImage="linear-gradient(90deg,#ffb35a "+m+"%,transparent "+m+"%)";u.style.color="";u.style.boxShadow="";u.textContent="Team ultimate "+m+"%"}}}}catch(e){}},70)}
  var mini=document.querySelector(".mini[style*='center']");if(mini)mini.textContent="Arrows/WASD move · Space = attack / use · F = skill · Q = swap hero · R = team ultimate"}
