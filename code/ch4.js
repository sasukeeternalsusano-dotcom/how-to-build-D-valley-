/* ===== Chapter 4: The Thin Place (spirits, quests, the Warden) ===== */
(function(){
var TS=32,W=10,H=12;
try{TRK.lost="audio/lost.mp3";TRK.metaphor="audio/metaphor.mp3";TRK.dungeon="audio/dungeon.mp3";TRK.before="audio/before.mp3";TRK.omega="audio/omega.mp3";TRK.kh="audio/kh.mp3";TRK.mm3="audio/mm3.mp3";TRK.xzero="audio/xzero.mp3";TRK.haunted="audio/haunted.mp3";TRK.bossroom="audio/bossroom.mp3";TRK.angel="audio/angel.mp3";TRK.ff7title="audio/ff7title.mp3"}catch(e){}
wantKey=function(){return null};
var C4K=null;
function m4(key,loop){if(window.__nosong)return;try{if(!key){C4K=null;stopSong(false,true);return}if(key===C4K&&songOn&&songEl&&!songEl.ended)return;C4K=key;playSong(key,loop!==false)}catch(e){}}
function toneS(f,t0,d,ty,v){try{tone(f,t0,d,ty,v)}catch(e){}}
function sfx4(k){try{
  if(k==="pick"){toneS(880,0,.08,"triangle",.1);toneS(1320,.07,.14,"triangle",.1)}
  else if(k==="swap")toneS(520,0,.08,"triangle",.07);
  else if(k==="seal"){toneS(330,0,.25,"sine",.12);toneS(494,.18,.25,"sine",.12);toneS(660,.36,.25,"sine",.12);toneS(990,.54,.5,"sine",.12)}
  else if(k==="bad")toneS(180,0,.2,"square",.08);
  else if(k==="cut"){toneS(300,0,.08,"sawtooth",.08);toneS(200,.06,.1,"sawtooth",.08)}
  else sfxPlay(k)}catch(e){}}
/* ---------- maps ---------- */
var AR=[
{n:"Town Square",song:"haunted",ex:{l:[1,8.3,5.5],r:[3,1.7,5.5],u:[2,4.5,10.3],d:[4,4.5,1.9]},m:[
"####uu####","#........#","#.HH..HH.#","#.HH..HH.#","#........#","l,,,,,,,,r","l,,,,,,,,r","#........#","#.HH.....#","#.HH.....#","#........#","####dd####"]},
{n:"Lantern Orchard",song:"haunted",ex:{r:[0,1.7,5.5],u:[7,4.5,10.3]},m:[
"####uu####","#..#...#.#","#........#","#.#..#...#","#........#","#........r","#........r","#.#...#..#","#........#","#..#..##.#","#......#.#","##########"]},
{n:"Shrine Hill",song:"haunted",ex:{d:[0,4.5,1.9],l:[6,8.3,5.5]},m:[
"##########","#..SSSS..#","#..SSSS..#","#..SSSS..#","#........#","l.,,,,,..#","l........#","#.#....#.#","#........#","#........#","#........#","####dd####"]},
{n:"Riverside",song:"haunted",ex:{l:[0,8.3,5.5],d:[5,4.5,1.9]},m:[
"#####www##","#....www.#","#........#","#.HH.....#","#.HH.....#","l........#","l........#","#........#","#....ww..#","#....ww..#","#........#","####dd####"]},
{n:"Market Row",song:"haunted",ex:{u:[0,4.5,10.3]},m:["####uu####","#........#","#.HH..HH.#","#.HH..HH.#","#........#","#,,,,,,,,#","#,,,,,,,,#","#........#","#........#","#........#","#........#","##########"]},
{n:"Old Mill",song:"bossroom",ex:{u:[3,4.5,10.3]},m:["####uu####","#ww......#","#ww..HH..#","#ww..HH..#","#ww......#","#ww......#","#ww......#","#........#","#........#","#..#..#..#","#........#","##########"]},
{n:"Quiet Garden",song:"bossroom",ex:{r:[2,1.7,5.5]},m:["##########","#.#......#","#........#","#..#..#..#","#........#","#........r","#........r","#..#..#..#","#........#","#.#......#","#........#","##########"]},
{n:"Beekeeper's Hill",song:"bossroom",ex:{d:[1,4.5,1.9]},m:["##########","#.#......#","#........#","#........#","#........#","#..#..#..#","#........#","#........#","#.#....#.#","#........#","#........#","####dd####"]}];
var F,D={on:false,h:[{x:0,y:0,d:2,mv:0},{x:0,y:0,d:2,mv:0}],act:0,a:0,E:[],fade:0,cine:null,trans:false};
window.__dun4=D;window.__dlgActors=function(){var sc=($("stage").clientHeight||400)/384,o=[];if(!D.on)return o;D.h.forEach(function(h){o.push(h.y*sc,(h.y-28)*sc)});(D.E||[]).forEach(function(e){if(e.y!=null){o.push(e.y*sc,(e.y-28)*sc)}});return o};
function newF(){return {q1:0,q2:0,q3:0,q4:0,sealed:0,mt:[0,0,0,0,0],br:0,cP:0,cE:0,jh:0,jf:[0,0,0],fin:0,done:0,intro:0,sn:0,sb:0,sd:0,sc:0,kd:0,gv:[0,0,0,0,0,0]}}
F=newF();
function save(){try{if(!window.__cutprev)localStorage.setItem("dv4",JSON.stringify({F:F,a:D.a}))}catch(e){}}
var VS={pim:{skin:"#e0b090",hair:"#fff",hs:"cap",cap:"#ffffff",top:"#fff4e0",bot:"#6a5a4a",apron:"#e8c35a"},nell:{skin:"#e0b090",hair:"#6a3a1a",hs:"bun",top:"#f08ca8",bot:"#4a4a6a"},oru:{skin:"#8a5a3c",hair:"#1a1410",hs:"cap",cap:"#2a5a8a",top:"#3a7ab0",bot:"#2a3a4a",beard:"#1a1410"},garo:{skin:"#c98e5a",hair:"#d8d0c0",hs:"short",top:"#8a6a4a",bot:"#4a3a2a",stache:"#d8d0c0"},ines:{skin:"#b9835a",hair:"#2a1a10",hs:"bunG",top:"#4aa08a",bot:"#3a4a5a",hat:"#e8c35a"},bram:{skin:"#d9b898",hair:"#8a8a90",hs:"short",top:"#2a2a38",bot:"#1a1a24",glasses:1},lio:{skin:"#d9a578",hair:"#c8a040",hs:"cap",cap:"#f2e8d0",top:"#f2e8d0",bot:"#6a5a3a"},tobi:{skin:"#d9a578",hair:"#2a1a10",hs:"short",top:"#4a7ac8",bot:"#3a3a4a"},elder:{skin:"#c9a07a",hair:"#e8e8ea",hs:"bunG",top:"#6a4a8a",bot:"#3a3248",glasses:1}};
/* ---------- entities ---------- */
function T(tx,ty){return {x:tx*TS+TS/2,y:ty*TS+TS/2+8}}
function mkE(){
  var a=D.a,E=[],p;
  if(a===0){
    E.push({id:"table",x:4*TS+TS,y:8*TS+26,k:"o",sol:1,sw:34,sh:9});
    if(F.q1<3){p=T(3,8);E.push({id:"echo",x:p.x,y:p.y,k:"s",nm:"Grandmother Mira"})}
    if(F.q1===2||F.q1===3){p=T(6,8);E.push({id:"tobi",x:p.x,y:p.y,k:"v",sp:VS.tobi,d:3,sol:1,sw:8,sh:5,nm:"Tobi"})}
    p=T(7,4);E.push({id:"judy",x:p.x,y:p.y,k:"v",sp:VSPEC.judy,d:3,sol:1,sw:8,sh:5,nm:"Judy"});
  }else if(a===1){
    if(F.q1===1){p=T(3,4);E.push({id:"tobi",x:p.x,y:p.y,k:"v",sp:VS.tobi,d:1,sol:1,sw:8,sh:5,nm:"Tobi"})}
    if(F.q2<2){p=T(5,2);E.push({id:"queen",x:p.x,y:p.y,k:"s",nm:"Moth Queen"})}
    if(F.q2===1){var P=[[2,2],[7,3],[3,8],[6,5],[8,10]];P.forEach(function(q,i){if(!F.mt[i]&&!(i===4&&!F.br)){var pp=T(q[0],q[1]);E.push({id:"mote"+i,i:i,x:pp.x,y:pp.y,k:"m"})}})}
    if(!F.br){p=T(8,8);E.push({id:"bramble",x:p.x,y:p.y,k:"o",sol:1,sw:15,sh:11})}
  }else if(a===2){
    if(F.q3<3){p=T(3,6);E.push({id:"fox",x:p.x,y:p.y,k:"s",nm:"Shrine Fox"})}
    p=T(6,4);E.push({id:"plaque",x:p.x,y:p.y,k:"o",sol:1,sw:10,sh:7});
    p=T(7,6);E.push({id:"elder",x:p.x,y:p.y,k:"v",sp:VS.elder,d:3,sol:1,sw:8,sh:5,nm:"Elder Hesper"});
  }else if(a===3){
    p=T(4,4);E.push({id:"wren",x:p.x,y:p.y,k:"v",sp:VSPEC.wren,d:1,sol:1,sw:8,sh:5,nm:"Wren"});
    [[6,3],[7,6],[3,8]].forEach(function(q,i){if(!F.jf[i]){var pp=T(q[0],q[1]);E.push({id:"jar"+i,i:i,x:pp.x,y:pp.y,k:"j",sol:1,sw:7,sh:6})}});
  }
  else if(a===4){
    E.push({id:"stall1",x:3*TS+TS,y:7*TS+26,k:"o",sol:1,sw:34,sh:9,c:"#c0392b"});E.push({id:"stall2",x:7*TS,y:7*TS+26,k:"o",sol:1,sw:34,sh:9,c:"#2a6aa8"});
    p=T(3,8);E.push({id:"pim",x:p.x,y:p.y,k:"v",sp:VS.pim,d:0,sol:1,sw:8,sh:5,nm:"Baker Tom"});
    p=T(7,8);E.push({id:"oru",x:p.x,y:p.y,k:"v",sp:VS.oru,d:0,sol:1,sw:8,sh:5,nm:"Oru"});
    p=T(5,9);E.push({id:"nell",x:p.x,y:p.y,k:"v",sp:VS.nell,d:2,sol:1,sw:8,sh:5,nm:"Robin"});
    if(!F.sd){p=T(2,9);E.push({id:"biscuit",x:p.x,y:p.y,k:"s",nm:"Biscuit"})}
  }else if(a===5){
    E.push({id:"wheel",x:3*TS-6,y:4*TS+8,k:"o"});
    p=T(4,5);E.push({id:"garo",x:p.x,y:p.y,k:"v",sp:VS.garo,d:2,sol:1,sw:8,sh:5,nm:"Miller Garo"});
    p=T(3,8);E.push({id:"ines",x:p.x,y:p.y,k:"v",sp:VS.ines,d:3,sol:1,sw:8,sh:5,nm:"Ines"});
    if(!F.sw){p=T(5,6);E.push({id:"millwright",x:p.x,y:p.y,k:"s",nm:"Old Millwright"})}
  }else if(a===6){
    [[3,2],[5,2],[7,2],[2,8],[5,8],[7,8]].forEach(function(q,i){var pp=T(q[0],q[1]);E.push({id:"grave"+i,i:i,x:pp.x,y:pp.y,k:"o",sol:1,sw:9,sh:6})});
    p=T(6,4);E.push({id:"bram",x:p.x,y:p.y,k:"v",sp:VS.bram,d:3,sol:1,sw:8,sh:5,nm:"Sexton Ralph"});
    if(!F.sc){p=T(3,5);E.push({id:"child",x:p.x,y:p.y,k:"s",nm:"Pale Child"})}
  }else if(a===7){
    [[2,3],[5,3],[7,3]].forEach(function(q,i){var pp=T(q[0],q[1]);E.push({id:"hive"+i,i:i,x:pp.x,y:pp.y,k:"o",sol:1,sw:9,sh:6})});
    p=T(5,6);E.push({id:"lio",x:p.x,y:p.y,k:"v",sp:VS.lio,d:2,sol:1,sw:8,sh:5,nm:"Beekeeper Lio"});
  }
  D.E=E}
function ent(id){for(var i=0;i<D.E.length;i++)if(D.E[i].id===id)return D.E[i];return null}
/* ---------- bg ---------- */
var BG=[];
function hsh(x,y,s){var n=Math.sin(x*127.1+y*311.7+s*74.7)*43758.5453;return n-Math.floor(n)}
function buildBg(a){
  var c=document.createElement("canvas");c.width=320;c.height=384;var g=c.getContext("2d"),m=AR[a].m,gr=a===2?["#4a6f5e","#436a58"]:a===6?["#3f5f4e","#3a5a49"]:a===7?["#5fa04f","#579a4a"]:["#4f8f4a","#478644"];
  for(var y=0;y<H;y++)for(var x=0;x<W;x++){var ch=m[y][x],px=x*TS,py=y*TS;
    g.fillStyle=gr[(x+y)&1];g.fillRect(px,py,TS,TS);
    for(var i=0;i<4;i++){if(hsh(x,y,i)<.5){g.fillStyle="rgba(255,255,255,.07)";g.fillRect(px+hsh(x,y,i+9)*28,py+hsh(x,y,i+5)*28,2,2)}}
    if(ch===","||"udlr".indexOf(ch)>=0){g.fillStyle="#cdb083";g.fillRect(px,py,TS,TS);g.fillStyle="#b9996d";g.fillRect(px+4,py+6,3,2);g.fillRect(px+20,py+19,3,2);g.fillRect(px+12,py+26,2,2)}
    else if(ch==="w"){g.fillStyle="#2f7fb8";g.fillRect(px,py,TS,TS);g.fillStyle="#58a8d8";g.fillRect(px+4,py+8,10,2);g.fillRect(px+16,py+20,10,2)}
    else if(ch==="#"){g.fillStyle="#00000030";g.beginPath();g.ellipse(px+16,py+28,12,4,0,0,7);g.fill();g.fillStyle="#5a3a22";g.fillRect(px+13,py+16,6,14);g.fillStyle=a===1?"#2a8a5a":"#2f6e36";g.beginPath();g.arc(px+16,py+12,15,0,7);g.fill();g.fillStyle=a===1?"#3aa56d":"#3d8a44";g.beginPath();g.arc(px+11,py+9,8,0,7);g.fill();
      if(a===1){g.fillStyle="#ffd98a";g.fillRect(px+8,py+14,3,3);g.fillRect(px+19,py+7,3,3);g.fillRect(px+22,py+16,3,3)}}
    else if(ch==="H"){var top=y>0&&m[y-1][x]==="H";
      if(!top){g.fillStyle="#b3402f";g.fillRect(px,py+2,TS,TS-2);g.fillStyle="#8e2f22";g.fillRect(px,py+TS-6,TS,6)}
      else{g.fillStyle="#d7b58a";g.fillRect(px,py,TS,TS);g.fillStyle="#a98558";g.fillRect(px,py,TS,3);g.fillStyle="#7bb7e0";g.fillRect(px+9,py+9,14,10);g.fillStyle="#ffffff55";g.fillRect(px+9,py+9,14,3)}}
    else if(ch==="S"){var topS=y>0&&m[y-1][x]==="S";
      /* drawn whole by drawShrine below */}
  }
  (function(){var x0=99,y0=99,x1=-1,y1=-1;for(var yy=0;yy<m.length;yy++)for(var xx=0;xx<m[yy].length;xx++)if(m[yy][xx]==="S"){x0=Math.min(x0,xx);y0=Math.min(y0,yy);x1=Math.max(x1,xx);y1=Math.max(y1,yy)}if(x1>=0){var w=(x1-x0+1)*TS;drawShrine(g,x0*TS,y0*TS,w,(y1-y0+1)*TS,x0*TS+w/2-16,.6,{sign:false,small:1})}})();
  BG[a]=c}
/* ---------- drawing ---------- */
function glowC(x,y,r,col,al){var g=cx.createRadialGradient(x,y,1,x,y,r);g.addColorStop(0,col);g.addColorStop(1,"rgba(255,255,255,0)");cx.globalAlpha=al;cx.fillStyle=g;cx.beginPath();cx.arc(x,y,r,0,7);cx.fill();cx.globalAlpha=1}
function vis(){return D.act===1?1:.2}
function drawSpirit(e){var t=time,v=vis(),x=e.x,y=e.y+Math.sin(t*2+x)*3-10;
  glowC(x,y-8,e.id==="queen"?34:26,"rgba(190,230,255,.9)",.45*v);cx.globalAlpha=.85*v;
  if(e.id==="echo"){cx.fillStyle="#fff1c4";cx.beginPath();cx.ellipse(x,y+2,10,16,0,0,7);cx.fill();cx.fillStyle="#ffe9a8";cx.beginPath();cx.arc(x,y-17,7,0,7);cx.fill();cx.beginPath();cx.arc(x,y-24,4,0,7);cx.fill();cx.fillStyle="#6a5a40";cx.fillRect(x-3,y-18,2,2);cx.fillRect(x+2,y-18,2,2)}
  else if(e.id==="queen"){var w=Math.sin(t*6)*5;cx.fillStyle="#d8f4ff";cx.beginPath();cx.ellipse(x-14,y-8,13,18+w,-.5,0,7);cx.fill();cx.beginPath();cx.ellipse(x+14,y-8,13,18-w,.5,0,7);cx.fill();cx.fillStyle="#fff7d0";cx.beginPath();cx.ellipse(x,y-4,5,13,0,0,7);cx.fill();cx.fillStyle="#7a6aa0";cx.fillRect(x-3,y-14,2,2);cx.fillRect(x+2,y-14,2,2);cx.strokeStyle="#fff7d0";cx.beginPath();cx.moveTo(x-2,y-17);cx.lineTo(x-7,y-26);cx.moveTo(x+2,y-17);cx.lineTo(x+7,y-26);cx.stroke()}
  else if(e.id==="fox"){cx.fillStyle="#cfe6ff";cx.beginPath();cx.ellipse(x,y,14,9,0,0,7);cx.fill();cx.beginPath();cx.moveTo(x+10,y-4);cx.lineTo(x+22,y-12);cx.lineTo(x+18,y+2);cx.fill();cx.beginPath();cx.moveTo(x+14,y-8);cx.lineTo(x+16,y-18);cx.lineTo(x+20,y-10);cx.fill();for(var i=0;i<3;i++){cx.beginPath();cx.ellipse(x-18-i*2,y-4+i*4+Math.sin(t*3+i)*3,12,4,-.3+i*.3,0,7);cx.fill()}cx.fillStyle="#4a6aa0";cx.fillRect(x+16,y-6,2,2)}
  else if(e.id==="biscuit"){cx.fillStyle="#fff1c4";cx.beginPath();cx.ellipse(x,y,11,7,0,0,7);cx.fill();cx.beginPath();cx.arc(x+10,y-5,6,0,7);cx.fill();cx.beginPath();cx.moveTo(x+6,y-9);cx.lineTo(x+4,y-16);cx.lineTo(x+11,y-11);cx.fill();var wg=Math.sin(t*14)*5;cx.beginPath();cx.moveTo(x-10,y-2);cx.lineTo(x-18,y-8+wg);cx.lineTo(x-10,y-5);cx.fill();cx.fillStyle="#6a5a40";cx.fillRect(x+12,y-7,2,2)}
  else if(e.id==="child"){cx.fillStyle="#e8f0ff";cx.beginPath();cx.ellipse(x,y+4,8,12,0,0,7);cx.fill();cx.beginPath();cx.arc(x,y-11,6,0,7);cx.fill();cx.fillStyle="#6a7aa0";cx.fillRect(x-3,y-12,2,2);cx.fillRect(x+2,y-12,2,2)}
  cx.globalAlpha=1}
function drawVill(e){var f=0;villager(e.x-16,e.y-30,e.d||2,f,e.sp,false)}
function drawMote(e){var t=time,x=e.x,y=e.y-8+Math.sin(t*3+e.i)*4,v=vis();glowC(x,y,14,"rgba(255,235,150,1)",.8*v);cx.globalAlpha=v;cx.fillStyle="#fff7c4";cx.beginPath();cx.arc(x,y,3,0,7);cx.fill();cx.globalAlpha=1}
function drawJar(e){var v=vis(),x=e.x,y=e.y;cx.fillStyle="#9fd8ff88";cx.fillRect(x-7,y-16,14,16);cx.fillStyle="#6a4a2a";cx.fillRect(x-8,y-19,16,4);glowC(x,y-8,15,"rgba(150,210,255,1)",.55);cx.globalAlpha=.4+.5*v;cx.fillStyle="#e8f6ff";cx.beginPath();cx.arc(x+Math.sin(time*3+e.i)*2,y-8,3.5,0,7);cx.fill();cx.globalAlpha=1}
function drawObj(e){var x=e.x,y=e.y;
  if(e.id==="table"){cx.fillStyle="#00000030";cx.fillRect(x-30,y-4,60,8);cx.fillStyle="#8a5b36";cx.fillRect(x-30,y-16,60,14);cx.fillStyle="#a8713f";cx.fillRect(x-30,y-16,60,4);cx.fillStyle="#fff";cx.beginPath();cx.ellipse(x-18,y-12,6,3,0,0,7);cx.ellipse(x,y-12,6,3,0,0,7);cx.ellipse(x+18,y-12,6,3,0,0,7);cx.fill();if(F.q1>=3){cx.fillStyle="rgba(255,255,255,.5)";for(var i=0;i<3;i++){cx.fillRect(x-18+i*18+Math.sin(time*2+i)*2,y-26-((time*14+i*9)%12),2,6)}}}
  else if(e.id==="bramble"){cx.fillStyle="#3a2a1a";for(var i=0;i<6;i++){cx.fillRect(x-14+i*5,y-10+((i*7)%9),3,12)}cx.strokeStyle="#5a3a22";cx.lineWidth=2;cx.beginPath();cx.moveTo(x-14,y);cx.lineTo(x+14,y-8);cx.moveTo(x-12,y-9);cx.lineTo(x+12,y+2);cx.stroke();cx.lineWidth=1;cx.fillStyle="#c23a4a";cx.fillRect(x-6,y-6,3,3);cx.fillRect(x+7,y-2,3,3)}
  else if(e.id.indexOf("stall")===0){cx.fillStyle="#00000030";cx.fillRect(x-30,y-4,60,6);cx.fillStyle="#8a5b36";cx.fillRect(x-28,y-16,56,14);for(var i=0;i<7;i++){cx.fillStyle=i%2?"#fff":e.c;cx.fillRect(x-28+i*8,y-30,8,12)}cx.fillStyle="#f2c230";cx.fillRect(x-20,y-12,8,5);cx.fillStyle="#b9735a";cx.fillRect(x+4,y-12,10,5)}
  else if(e.id==="wheel"){cx.strokeStyle="#6a4a2a";cx.lineWidth=4;cx.beginPath();cx.arc(x,y,22,0,7);cx.stroke();cx.lineWidth=3;for(var i=0;i<6;i++){var an=time*.7+i*1.047;cx.beginPath();cx.moveTo(x,y);cx.lineTo(x+Math.cos(an)*22,y+Math.sin(an)*22);cx.stroke()}cx.lineWidth=1}
  else if(e.id.indexOf("grave")===0){cx.fillStyle="#00000030";cx.fillRect(x-10,y-2,20,5);cx.fillStyle="#9ca0aa";cx.fillRect(x-8,y-22,16,22);cx.beginPath();cx.arc(x,y-22,8,3.14,0);cx.fill();cx.fillStyle="#6a6e78";cx.fillRect(x-1,y-18,2,9);cx.fillRect(x-5,y-14,10,2)}
  else if(e.id.indexOf("hive")===0){cx.fillStyle="#00000030";cx.fillRect(x-10,y-2,20,5);cx.fillStyle="#e8b840";cx.fillRect(x-9,y-18,18,16);cx.fillStyle="#c8982a";cx.fillRect(x-9,y-14,18,2);cx.fillRect(x-9,y-8,18,2);cx.fillStyle="#2a1a0a";cx.fillRect(x-2,y-6,4,4);for(var i=0;i<3;i++){var bx=x+Math.sin(time*3+i*2+e.i)*14,by=y-24+Math.cos(time*4+i)*6;cx.fillStyle="#2a1a0a";cx.fillRect(bx,by,3,2);cx.fillStyle="#fff8";cx.fillRect(bx,by-2,3,1)}}
  else if(e.id==="plaque"){cx.fillStyle="#6a6e78";cx.fillRect(x-9,y-22,18,22);cx.fillStyle="#8a8e98";cx.fillRect(x-9,y-22,18,4);cx.fillStyle="#2a2e38";cx.font="bold 8px monospace";cx.textAlign="center";cx.fillText("M_SU",x,y-8);cx.textAlign="start"}}
function drawHero(h,who){var f=h.mv>0?(1+(Math.floor(time*8)%2)):0;
  if(D.act===(who==="doodi"?0:1)){cx.fillStyle="#ffe27a";cx.beginPath();cx.moveTo(h.x,h.y-36);cx.lineTo(h.x-4,h.y-42);cx.lineTo(h.x+4,h.y-42);cx.fill()}
  if(who==="danoya")glowC(h.x,h.y-14,34,"rgba(255,230,160,1)",.22);
  person(h.x-16,h.y-28,h.d,who,f,false);
  if(who==="danoya"&&F&&F.nr&&h.d!==0)mothBadge(h.x+5,h.y-8+(f?1:0))}
/* the Name-Moth keepsake: a little stained-glass moth pinned to Danoya's top, softly glowing */
function mothBadge(x,y){window.mothBadgeDraw(cx,x,y,time)}
function drawCrack(x,y,r){var p=.6+.4*Math.sin(time*2.5);glowC(x,y,r*1.6,"rgba(190,150,255,1)",.35*p);cx.strokeStyle="rgba(235,215,255,"+p+")";cx.lineWidth=2;cx.beginPath();cx.moveTo(x-r*.4,y-r);cx.lineTo(x+r*.1,y-r*.4);cx.lineTo(x-r*.2,y);cx.lineTo(x+r*.3,y+r*.5);cx.lineTo(x,y+r);cx.stroke();cx.lineWidth=1}
function drawArea(){
  var a=D.a;if(!BG[a])buildBg(a);cx.save();cx.drawImage(BG[a],0,0);
  if(a===0&&F.q1<3)drawCrack(3*TS+10,9*TS+4,16);
  if(a===1&&F.q2<2)drawCrack(5*TS+16,3*TS+8,18);
  if(a===2){if(F.q3<3)drawCrack(2*TS+16,7*TS+6,16);if(F.fin>=1){var p=.6+.4*Math.sin(time*3);glowC(160,90,70,"rgba(170,90,255,1)",.5*p);cx.strokeStyle="rgba(230,200,255,"+p+")";cx.lineWidth=3;cx.beginPath();cx.moveTo(150,68);cx.lineTo(162,80);cx.lineTo(154,92);cx.lineTo(168,104);cx.lineTo(160,112);cx.stroke();cx.lineWidth=1}}
  if(a===3&&F.q4<3)drawCrack(7*TS+10,2*TS+22,14);
  if(a===3){cx.fillStyle="#6a4a2a";cx.fillRect(2*TS+4,5*TS-4,TS*2-8,8);cx.fillStyle="#f2c230";cx.fillRect(2*TS+4,5*TS-4,TS*2-8,3)}
  var L=D.E.slice();L.push({id:"d0",k:"H",y:D.h[0].y,h:D.h[0],w:"doodi"});L.push({id:"d1",k:"H",y:D.h[1].y,h:D.h[1],w:"danoya"});
  L.sort(function(p,q){return p.y-q.y});
  L.forEach(function(e){if(e.k==="H")drawHero(e.h,e.w);else if(e.k==="s")drawSpirit(e);else if(e.k==="v")drawVill(e);else if(e.k==="m")drawMote(e);else if(e.k==="j")drawJar(e);else drawObj(e)});
  var dk=F.sealed*.05+(F.fin?.12:0);if(dk>0){cx.fillStyle="rgba(50,10,90,"+dk+")";cx.fillRect(0,0,320,384)}
  if(D.act===1){var gl=cx.createRadialGradient(D.h[1].x,D.h[1].y-14,10,D.h[1].x,D.h[1].y-14,150);gl.addColorStop(0,"rgba(255,240,200,0)");gl.addColorStop(1,"rgba(60,40,120,.18)");cx.fillStyle=gl;cx.fillRect(0,0,320,384)}
  if(D.cine)drawCine();
  if(D.fade>0){cx.fillStyle="rgba(0,0,0,"+Math.min(1,D.fade*2.5)+")";cx.fillRect(0,0,320,384)}
  cx.restore()}
function drawCine(){var c=D.cine,t=c.t;
  if(c.k==="guest"){var al=Math.min(1,t*.5),x=5*TS,y=6*TS;cx.fillStyle="rgba(255,235,200,"+(al*.25)+")";cx.fillRect(0,0,320,384);glowC(x,y-30,90,"rgba(255,250,230,1)",al*.7);cx.globalAlpha=al;cx.fillStyle="#fffaf0";cx.beginPath();cx.moveTo(x-16,y+20);cx.lineTo(x-8,y-44);cx.lineTo(x+8,y-44);cx.lineTo(x+16,y+20);cx.fill();cx.beginPath();cx.arc(x,y-54,9,0,7);cx.fill();cx.strokeStyle="#fffaf0";cx.lineWidth=3;cx.beginPath();cx.moveTo(x-6,y-60);cx.lineTo(x-14,y-80);cx.moveTo(x+6,y-60);cx.lineTo(x+14,y-80);cx.stroke();cx.lineWidth=1;cx.fillStyle="#8a7a60";cx.fillRect(x-4,y-56,2,3);cx.fillRect(x+3,y-56,2,3);cx.globalAlpha=1}
  else if(c.k==="warden"){var dk=Math.min(.78,t*.4);cx.fillStyle="rgba(8,0,20,"+dk+")";cx.fillRect(0,0,320,384);var r=Math.min(1,c.r||0),x=160,y=150;glowC(x,y+40,120+r*30,"rgba(160,80,255,1)",.55*Math.min(1,t*.6));
    cx.strokeStyle="rgba(235,210,255,"+Math.min(1,t*.8)+")";cx.lineWidth=3;cx.beginPath();cx.moveTo(x-40,y+46);cx.lineTo(x-12,y+60);cx.lineTo(x,y+44);cx.lineTo(x+14,y+62);cx.lineTo(x+42,y+46);cx.stroke();cx.lineWidth=1;
    if(r>0){var hy=y+50-r*92;cx.save();cx.beginPath();cx.rect(0,0,320,y+54);cx.clip();cx.fillStyle="#07040f";cx.beginPath();cx.moveTo(x-30,hy+130);cx.lineTo(x-14,hy+28);cx.lineTo(x+14,hy+28);cx.lineTo(x+30,hy+130);cx.fill();for(var i=0;i<5;i++){cx.beginPath();cx.moveTo(x-30+i*15,hy+130);cx.lineTo(x-26+i*15+Math.sin(time*2+i)*4,hy+150);cx.lineTo(x-20+i*15,hy+130);cx.fill()}
      cx.fillStyle="#e8e4d8";cx.beginPath();cx.ellipse(x,hy+16,12,15,0,0,7);cx.fill();cx.fillStyle="#07040f";cx.fillRect(x-7,hy+10,5,7);cx.fillRect(x+3,hy+10,5,7);cx.fillStyle="#7af0ff";cx.fillRect(x-6,hy+12,3,3);cx.fillRect(x+4,hy+12,3,3);
      cx.strokeStyle="#cfc8b8";cx.lineWidth=3;cx.beginPath();cx.moveTo(x-7,hy+4);cx.lineTo(x-18,hy-14);cx.lineTo(x-30,hy-18);cx.moveTo(x-18,hy-14);cx.lineTo(x-20,hy-30);cx.moveTo(x+7,hy+4);cx.lineTo(x+18,hy-14);cx.lineTo(x+30,hy-18);cx.moveTo(x+18,hy-14);cx.lineTo(x+20,hy-30);cx.stroke();cx.lineWidth=1;
      cx.fillStyle="#2a2438";cx.fillRect(x+24,hy+70,6,12);cx.fillStyle="#07040f";cx.fillRect(x+22,hy+64,10,8);cx.restore()}
    if(c.fl>0){cx.fillStyle="rgba(255,255,255,"+Math.min(1,c.fl)+")";cx.fillRect(0,0,320,384)}}}
/* ---------- movement ---------- */
function solidT(tx,ty){if(tx<0||ty<0||tx>=W||ty>=H)return true;return "#wHS".indexOf(AR[D.a].m[ty][tx])>=0}
function blocked(x,y,self){var hw=6,hh=4;
  if(solidT(Math.floor((x-hw)/TS),Math.floor((y-hh)/TS))||solidT(Math.floor((x+hw)/TS),Math.floor((y-hh)/TS))||solidT(Math.floor((x-hw)/TS),Math.floor((y+hh)/TS))||solidT(Math.floor((x+hw)/TS),Math.floor((y+hh)/TS)))return true;
  for(var i=0;i<D.E.length;i++){var e=D.E[i];if(e.sol&&Math.abs(x-e.x)<e.sw+hw&&Math.abs(y-e.y)<e.sh+hh)return true}
  return false}
function moveH(h,dx,dy,sp,dt){var mv=false;
  if(dx){var nx=h.x+dx*sp*dt;if(!blocked(nx,h.y)){h.x=nx;mv=true}}
  if(dy){var ny=h.y+dy*sp*dt;if(!blocked(h.x,ny)){h.y=ny;mv=true}}
  if(dx||dy)h.d=Math.abs(dx)>Math.abs(dy)?(dx>0?1:3):(dy>0?2:0);
  return mv}
function stepHeroes(dt){
  var a=D.h[D.act],b=D.h[1-D.act];
  var dx=(held[1]?1:0)-(held[3]?1:0),dy=(held[2]?1:0)-(held[0]?1:0);if(dx&&dy){dx*=.72;dy*=.72}
  a.mv=0;if(dx||dy){a.mv=moveH(a,dx,dy,76,dt)?1:.001}
  var bd=Math.hypot(a.x-b.x,a.y-b.y);b.mv=0;
  if(bd>30){var ux=(a.x-b.x)/bd,uy=(a.y-b.y)/bd;b.mv=moveH(b,ux,uy,74,dt)?1:0;if(!b.mv){var m1=moveH(b,ux,0,74,dt),m2=moveH(b,0,uy,74,dt);b.mv=(m1||m2)?1:0}}
  if(bd>200){b.x=a.x+(D.act===0?14:-14);b.y=a.y+6}
  var tx=Math.floor(a.x/TS),ty=Math.floor(a.y/TS);if(tx>=0&&tx<W&&ty>=0&&ty<H){var ch=AR[D.a].m[ty][tx];if("udlr".indexOf(ch)>=0&&AR[D.a].ex[ch])goArea(ch)}}
async function goArea(ch){if(D.trans)return;D.trans=true;talking=true;var ex=AR[D.a].ex[ch];D.fade=.4;await sleep(380);
  D.a=ex[0];var a=D.h[D.act],b=D.h[1-D.act];a.x=ex[1]*TS;a.y=ex[2]*TS;b.x=a.x;b.y=a.y+4;D.act===0?0:0;mkE();m4(AR[D.a].song);D.fade=.35;save();
  if(D.a===0&&F.sealed>=4&&!F.fin){await finaleA()}
  else if(D.a===2&&F.fin===1&&!F.done){await finaleB()}
  talking=false;D.trans=false}
function sleep(ms){return new Promise(function(r){setTimeout(r,rm?Math.min(ms,80):ms)})}
/* ---------- interaction ---------- */
function near(){var a=D.h[D.act],best=null,bd=40;D.E.forEach(function(e){if(e.id==="table"||e.id==="wheel"||e.id.indexOf("stall")===0)return;var d=Math.hypot(a.x-e.x,a.y-e.y);if(d<bd){bd=d;best=e}});return best}
window.__dunA=function(){if(!D.on||talking||ui||D.trans)return;var e=near();if(!e){return}talking=true;talk(e).catch(function(err){try{console.log(err)}catch(x){}}).then(function(){return namesReward()}).catch(function(){}).then(function(){talking=false;save()})};
window.__dunSwap=function(){if(!D.on||talking||ui||D.trans)return;D.act=1-D.act;sfx4("swap");toast("Now playing: "+(D.act===0?"Doodi":"Danoya (can see spirits)"))};
function needD(){toast("Swap to Danoya to see and hear spirits (Swap / Q).");sfx4("bad")}
function seal(msg){F.sealed++;sfx4("seal");toast("✦ A thin place is sealed ("+F.sealed+"/4)");D.fade=.5;mkE();save()}
/* ---------- small games, one per spirit. No fail states: a miss only asks again. Auto-completed in selector previews. ---------- */
function mgAuto(){if(window.__cutprev&&!window.__forceMini){try{toast("🎮 Minigame auto-completed for this preview")}catch(e){}return true}return false}
var MGH='<h3 style="margin:0 0 6px">',MGM='<p class="mini" id="mgm" style="min-height:2.6em;margin:8px 0 0"></p>';
function mgOrder(title,hint,items,order,wrong){
  if(mgAuto())return wait(900);
  return new Promise(function(res){
    showOv(MGH+title+'</h3><p class="mini">'+hint+'</p><div id="mgo" style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin:12px 0"></div>'+MGM);
    var box=$("mgo"),msg=$("mgm"),k=0,fin=false;
    items.forEach(function(it,i){var b=document.createElement("button");b.type="button";b.style.cssText="font-size:1.6rem;width:60px;height:60px;border-radius:14px;border:3px solid #6b4426;background:#fff8e8;cursor:pointer;padding:0";b.textContent=it[0];b.title=it[1];b.setAttribute("aria-label",it[1]);
      b.onclick=function(){if(fin||b.disabled)return;
        if(order[k]===i){b.disabled=true;b.style.background="#d6f5c9";b.style.borderColor="#2f9d5a";k++;sfx4("pick");msg.textContent=it[1]+".";if(k>=order.length){fin=true;setTimeout(function(){hideOv();res()},800)}}
        else{sfx4("bad");msg.textContent=wrong;k=0;[].forEach.call(box.children,function(x){x.disabled=false;x.style.background="#fff8e8";x.style.borderColor="#6b4426"})}};
      box.appendChild(b)})})}
function mgSimon(title,hint,labels){
  if(mgAuto())return wait(900);
  return new Promise(function(res){
    showOv(MGH+title+'</h3><p class="mini">'+hint+'</p><div id="mgo" style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:12px 0"></div>'+MGM);
    var box=$("mgo"),msg=$("mgm"),ord=labels.map(function(_,i){return i}),k=0,lock=true;
    for(var s=ord.length-1;s>0;s--){var j=Math.floor(Math.random()*(s+1)),tm=ord[s];ord[s]=ord[j];ord[j]=tm}
    function lit(i,ms){var b=bs[i];b.style.background="#ffe27a";b.style.boxShadow="0 0 16px #ffd34d";setTimeout(function(){b.style.background="#fff8e8";b.style.boxShadow=""},ms)}
    function show(){if(!$("mgo"))return;lock=true;k=0;msg.textContent="Watch them wake…";ord.forEach(function(i,n){setTimeout(function(){if($("mgo"))lit(i,430)},600+n*650)});setTimeout(function(){if($("mgm")){lock=false;msg.textContent="Now say them, in that order."}},600+ord.length*650)}
    var bs=labels.map(function(l,i){var b=document.createElement("button");b.type="button";b.textContent=l;b.style.cssText="font:800 .9rem sans-serif;color:#3a2616;padding:10px 12px;border-radius:12px;border:3px solid #6b4426;background:#fff8e8;cursor:pointer;transition:background .15s,box-shadow .15s";
      b.onclick=function(){if(lock)return;lit(i,220);
        if(ord[k]===i){k++;sfx4("pick");msg.textContent=l+".";if(k>=ord.length){lock=true;msg.textContent="All five, said aloud.";setTimeout(function(){hideOv();res()},900)}}
        else{sfx4("bad");lock=true;msg.textContent="Not that one yet. Watch again.";setTimeout(show,1000)}};
      box.appendChild(b);return b});
    show()})}
/* a mark slides along a bar; o = {rounds, zone:function(round)->[a,b] or null for "any", speed, btn, ok:[...], bad} */
function mgTime(title,hint,o){
  if(mgAuto())return wait(900);
  return new Promise(function(res){
    showOv(MGH+title+'</h3><p class="mini">'+hint+'</p><div style="position:relative;height:26px;margin:14px 6px;border:3px solid #6b4426;border-radius:14px;background:#f3e2c0;overflow:hidden"><div id="mgz" style="position:absolute;top:0;bottom:0;background:#8fd97a"></div><div id="mgk" style="position:absolute;top:0;width:8px;height:26px;background:#c2412e;border-radius:4px"></div></div><button class="big" id="mgb" type="button">'+o.btn+'</button>'+MGM);
    var z=$("mgz"),kn=$("mgk"),msg=$("mgm"),btn=$("mgb"),r=0,t0=performance.now(),live=true,pos=0,zn=null,last=0;
    function setZone(){zn=o.zone?o.zone(r):null;if(zn){z.style.left=(zn[0]*100)+"%";z.style.width=((zn[1]-zn[0])*100)+"%"}else z.style.width="0"}
    var frz=0;function frame(){if(!$("mgk"))return;if(!frz){var t=(performance.now()-t0)/1000*(o.speed+r*(o.ramp||.18));pos=.5-.5*Math.cos(t*Math.PI);kn.style.left="calc("+(pos*100).toFixed(1)+"% - 4px)"}requestAnimationFrame(frame)}
    function freeze(ms,col){var s0=performance.now();frz=1;kn.style.background=col;kn.style.boxShadow="0 0 0 2px #fff";setTimeout(function(){if(!$("mgk"))return;t0+=performance.now()-s0;frz=0;kn.style.background="#c2412e";kn.style.boxShadow=""},ms)}
    function done(){live=false;document.removeEventListener("keydown",key,true);btn.disabled=true;setTimeout(function(){hideOv();res()},1500)}
    function hit(){var now=performance.now();if(!live||frz||now-last<260)return;last=now;
      var tol=4/Math.max(100,kn.parentNode.clientWidth);if(!zn||(pos>=zn[0]-tol&&pos<=zn[1]+tol)){if(zn)freeze(1400,"#2f9d5a");sfx4("pick");msg.textContent=o.ok[Math.min(r,o.ok.length-1)];r++;if(r>=o.rounds){done();return}live=false;setTimeout(function(){live=true;setZone()},700)}
      else{freeze(650,"#7a1f12");sfx4("bad");msg.textContent=o.bad}}
    function key(e){if(e.key===" "||e.key==="Enter"){e.preventDefault();e.stopPropagation();hit()}}
    btn.addEventListener("pointerdown",function(e){e.preventDefault();hit()});btn.onclick=function(e){if(e.detail===0)hit()};document.addEventListener("keydown",key,true);setZone();requestAnimationFrame(frame)})}
function mgFetch(){
  if(mgAuto())return wait(900);
  return new Promise(function(res){
    showOv(MGH+'🐕 One more throw</h3><p class="mini">Throw the stick for him, then wait and see what he brings back.</p><div id="mgf" style="position:relative;height:90px;margin:12px 4px;border:3px solid #6b4426;border-radius:14px;background:linear-gradient(#cfe9ff 0 45%,#a7d98a 45%);overflow:hidden"><span id="mgs" style="position:absolute;left:58px;top:40px;font-size:1.3rem;transition:left .7s cubic-bezier(.2,.7,.4,1),top .7s;opacity:1">🪵</span><span id="mgd" style="position:absolute;left:14px;top:40px;font-size:2rem;line-height:1;transition:left .9s ease-in-out;display:inline-block">🐕</span><span id="mgc" style="position:absolute;left:46px;top:30px;font-size:1.2rem;opacity:0;transition:opacity .3s"></span></div><button class="big" id="mgb" type="button">Throw</button>'+MGM);
    var f=$("mgf"),st=$("mgs"),dg=$("mgd"),ca=$("mgc"),btn=$("mgb"),msg=$("mgm"),r=0,busy=false;
    var BACK=[["👢","He comes back with a boot. He is very proud of the boot."],["🥖","He comes back with one of Tom's rolls. Slightly chewed."],["🪵","The stick. THE STICK. Tail going like a flag. Thirteen years, and he finally brought it back."]];
    function face(right){dg.style.transform=right?"scaleX(-1)":"none"}
    face(true);
    function go(){if(busy)return;busy=true;btn.style.visibility="hidden";msg.textContent="";sfx4("pick");
      var W=f.clientWidth;ca.style.opacity=0;st.style.opacity=1;st.style.left=(W-40)+"px";st.style.top="18px";
      setTimeout(function(){if(!$("mgf"))return;st.style.top="44px";dg.style.left=(W-58)+"px";msg.textContent="Off he goes…"},250);
      setTimeout(function(){if(!$("mgf"))return;st.style.opacity=0;face(false);msg.textContent="Sniffing about. Sniffing about.";},1250);
      setTimeout(function(){if(!$("mgf"))return;ca.textContent=BACK[r][0];ca.style.transition="none";ca.style.left=(W-70)+"px";ca.style.opacity=1;void ca.offsetWidth;ca.style.transition="left .9s ease-in-out,opacity .3s";dg.style.left="14px";ca.style.left="2px"},1900);
      setTimeout(function(){if(!$("mgf"))return;msg.textContent=BACK[r][1];r++;face(true);
        if(r>=BACK.length){setTimeout(function(){hideOv();res()},2400);return}
        st.style.transition="none";st.style.left="58px";st.style.top="40px";void st.offsetWidth;st.style.transition="left .7s cubic-bezier(.2,.7,.4,1),top .7s";
        setTimeout(function(){if(!$("mgf"))return;st.style.opacity=1;btn.textContent="Throw again";btn.style.visibility="visible";busy=false},1100)},2900)}
    btn.addEventListener("pointerdown",function(e){e.preventDefault();go()});btn.onclick=function(e){if(e.detail===0)go()};
    function key(e){if(!$("mgf")){document.removeEventListener("keydown",key,true);return}if(e.key===" "||e.key==="Enter"){e.preventDefault();e.stopPropagation();go()}}
    document.addEventListener("keydown",key,true)})}
function jarOpts(i){var W=[.28,.21,.15];return {rounds:3,zone:function(r){var w=W[r],c=.18+(((i*37)+(r*29))%55)/100;if(c+w>.92)c=.92-w;return [c,c+w]},speed:.65+i*.05,ramp:.2,btn:"Turn",ok:["A quarter turn. The glass hums.","Another. Something inside goes very still, listening.","The lid gives. Something small sighs."],bad:"Too hard. The glass shivers. Gently."}}
function mgWheel(){
  if(mgAuto())return wait(900);
  return new Promise(function(res){
    var sp="";for(var q=0;q<4;q++)sp+='<i style="position:absolute;left:64px;top:6px;width:6px;height:61px;transform-origin:50% 100%;transform:rotate('+(q*90)+'deg);border-radius:3px;background:'+(q?"#6b4426":"#ffb300")+(q?"":";box-shadow:0 0 10px #ffb300")+'"></i>';
    showOv(MGH+'⚙ The old wheel</h3><p class="mini">It is turning backwards. Push when the bright spoke comes to the top. Three good pushes.</p><div style="position:relative;width:150px;height:150px;margin:16px auto 10px"><div style="position:absolute;left:68px;top:-13px;width:0;height:0;border-left:7px solid transparent;border-right:7px solid transparent;border-top:12px solid #c2412e"></div><div id="mgw" style="position:absolute;left:0;top:0;box-sizing:content-box;width:134px;height:134px;border:8px solid #6b4426;border-radius:50%;background:#f3e2c0">'+sp+'</div></div><button class="big" id="mgb" type="button">Push</button>'+MGM);
    var w=$("mgw"),msg=$("mgm"),btn=$("mgb"),V=[-170,-100,90,180],n=0,a=140,lt=performance.now(),live=true,last=0;
    function frame(){if(!$("mgw"))return;var now=performance.now(),dt=Math.min(.05,(now-lt)/1000);lt=now;a=((a+V[n]*dt)%360+360)%360;w.style.transform="rotate("+a.toFixed(1)+"deg)";requestAnimationFrame(frame)}
    function hit(){var now=performance.now();if(!live||now-last<260)return;last=now;var d=Math.min(a,360-a);
      if(d<=34){n++;sfx4("pick");msg.textContent=n===1?"It slows.":n===2?"It stops, thinks about it, and starts the other way.":"It turns the right way.";if(n>=3){live=false;document.removeEventListener("keydown",key,true);btn.disabled=true;setTimeout(function(){hideOv();res()},1700)}}
      else{sfx4("bad");msg.textContent="It slips past. Wait for the bright spoke."}}
    function key(e){if(e.key===" "||e.key==="Enter"){e.preventDefault();e.stopPropagation();hit()}}
    btn.addEventListener("pointerdown",function(e){e.preventDefault();hit()});btn.onclick=function(e){if(e.detail===0)hit()};document.addEventListener("keydown",key,true);requestAnimationFrame(frame)})}
function mgSeek(){
  if(mgAuto())return wait(900);
  return new Promise(function(res){
    showOv(MGH+'🌿 Ready or not</h3><p class="mini">Somebody is giggling. Watch which bush shakes, then look there. Three times.</p><div id="mgo" style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:230px;margin:10px auto"></div>'+MGM);
    var box=$("mgo"),msg=$("mgm"),r=0,at=-1,lock=true,bs=[];
    function shake(i,n){var b=bs[i],c=0;(function s(){if(!$("mgo"))return;b.style.transform=c%2?"rotate(7deg)":"rotate(-7deg)";if(++c<n)setTimeout(s,90);else b.style.transform=""})()}
    function hide(){if(!$("mgo"))return;bs.forEach(function(b){b.textContent="🌳"});var p=at;do{at=Math.floor(Math.random()*6)}while(at===p);lock=true;setTimeout(function(){shake(at,6-r);setTimeout(function(){lock=false},500)},500)}
    for(var i=0;i<6;i++)(function(i){var b=document.createElement("button");b.type="button";b.textContent="🌳";b.setAttribute("aria-label","Bush "+(i+1));b.style.cssText="font-size:1.8rem;height:58px;border-radius:14px;border:3px solid #2f6b3a;background:#d6f5c9;cursor:pointer;padding:0;transition:transform .09s";
      b.onclick=function(){if(lock)return;
        if(i===at){lock=true;b.textContent="🧒";sfx4("pick");r++;msg.textContent=r===1?"Found you! Again!":r===2?"Found you! One more!":"You found me. You FOUND me.";if(r>=3)setTimeout(function(){hideOv();res()},1300);else setTimeout(hide,1000)}
        else{sfx4("bad");msg.textContent="Not there. A giggle, from somewhere else.";lock=true;setTimeout(function(){shake(at,6);setTimeout(function(){lock=false},500)},400)}};
      box.appendChild(b);bs.push(b)})(i);
    hide()})}
/* all fifteen names said aloud: a keepsake, and fifteen extra lanterns at the Chapter 5 festival */
async function namesReward(){
  if(F.nr||window.__cutprev)return;var L=namesList();if(L.some(function(q){return !q[1]}))return;
  F.nr=1;try{localStorage.setItem("dv_names","1")}catch(e){}
  sfx4("seal");
  await seq([["","Fifteen names, and every one of them said aloud. For one breath, every lantern in the valley leans toward Danoya. Not toward the hill. Toward her."],["","Something light settles on her shoulder: a moth, small as a thumbnail, with wings like stained glass. It folds itself flat, like a pressed flower, and stays."],["Danoya","...I think that's a thank-you."],["Doodi","Fifteen names. You said every one like you knew them."],["Danoya","Somebody did. That's enough to go on."]]);
  toast("✦ Keepsake: the Name-Moth. It remembers all fifteen.");try{albumAdd("c4_names")}catch(e){}save()}
var NAMES=["Alder","Pell","Odile","Fen","Marguerite"];
async function talk(e){
  var id=e.id;if(id!=="echo"&&e.k&&(e.id.indexOf("stall")<0)&&(["pim","oru","nell","biscuit","garo","ines","bram","child","lio","millwright"].indexOf(id)>=0||id.indexOf("grave")===0||id.indexOf("hive")===0)){await talk2(e);return}
  if(id==="echo"){
    if(D.act!==1){await seq([["Doodi","There's a table laid for three... and a draught that smells of cinnamon and too much salt. Someone's here, isn't she? Swap to Danoya."]]);return}
    if(F.q1===0){await seq([["","An old woman made of lamplight is smoothing a tablecloth that isn't there. Three plates. Two of them cold."],["Danoya","Mira? Mira from the soup stall?"],["Mira","Danoya, love. Yes. I'm told I've gone a bit see-through. Sit. I made soup. I always make too much soup. It's not a recipe, it's a condition."],["Danoya","Who are the other plates for?"],["Mira","Tobi. Always Tobi. He hasn't come since I... since. And I have to tell him something, love. I have the most important thing in the world to tell him and I keep setting the table like that will help."],["Danoya","What is it?"],["Mira","That's the trouble. I've forgotten the words. I only remember the soup."],["Doodi","We'll find Tobi. He'll be somewhere with a good view of the square and no plan to cross it."]]);F.q1=1;mkE();toast("New quest: The Table for One")}
    else if(F.q1===1){await say("Mira","Six o'clock. He eats at six. He says he isn't hungry. Children never are, the little liars.")}
    else if(F.q1===2){await seq([["","Tobi stands at the edge of the square with his hands up his sleeves. He hasn't sat down."],["Mira","Lay his place for me, love. My hands go through things now. Bowl first. Then the spoon. Then the bread. And the salt last. Always the salt last."]]);await mgOrder("\ud83c\udf72 Lay his place","Bowl, spoon, bread, and the salt last.",[["\ud83e\uddc2","Salt"],["\ud83e\udd63","Bowl"],["\ud83c\udf5e","Bread"],["\ud83e\udd44","Spoon"]],[1,3,2,0],"Not yet, love. Bowl, spoon, bread. Salt last.");await seq([["","Tobi sits. The empty plate fills with steam that isn't there."],["Mira","There you are. Bones. All bones."],["Tobi","It's too salty, Gran. It's always too salty."],["Mira","I know. I couldn't taste anything the last two years. I kept adding salt and hoping. I didn't tell you. I didn't want you to be the kind of boy who watches a woman cook and counts."],["Tobi","I wasn't hungry. That's what I said. The last day. I thought if I ate less there'd be more for you. I thought you'd stop looking so tired."],["Mira","I knew. I knew, love. You were never not hungry. You were being kind. That's what I wanted to tell you. That's the whole thing. I knew."],["Tobi","...I was so hungry, Gran. I was always so hungry."],["","He eats. He cries into the soup, which makes it saltier, and they both laugh until the laughing hurts."],["Mira","It's perfect. Isn't it. After all that. It's finally perfect."],["","Her light goes soft, and then it goes. The crack by the table stitches itself shut like a closing eye."],["Danoya","She wasn't stuck here. She was waiting to be forgiven for being sick."],["","Later, on the South Green, Tobi takes the pen to the plain lantern his gran left blank, and writes one word: PERFECT."]]);F.q1=3;seal()}
    return}
  if(id==="tobi"){
    if(F.q1===1){
      await seq([["Tobi","...You're the ones with the lantern. Please don't tell me you saw her too."],["Doodi","A table in the square. Soup. Too much salt."],["Tobi","That's her. That's... I can't walk past the square. If I see her, it's real. If I don't, she's just in the next room."],["Tobi","The last thing I said to her was a lie, you know. 'I'm not hungry.' I said it every night so she'd have more. And then there was no more of her."]]);
      var c=0;do{c=await ask("Doodi","What do I say?",["\"She's still setting your plate. That's not a ghost being cruel. That's a woman who needs to tell you something.\"","\"She's gone. Get over it.\"","\"I'll walk you there. Danoya will be with us.\""]);
        if(c===1){await say("Tobi","...Right. Sure.");sfx4("bad")}}while(c===1);
      await seq([["Tobi","Okay. One plate. If it's bad, you have to promise to stay."],["Doodi","I promise."],["","He wipes his face with his sleeve and heads for the square."]]);F.q1=2;mkE();toast("Tobi is going to the square")}
    else{await say("Tobi",F.q1>=3?"I eat at six now. Everything. Even the vegetables. She'd be insufferable about it.":"One plate. Just one.")}
    return}
  if(id==="judy"){
    var jl=F.sealed>=4?"Something's coming tonight. The lanterns keep flickering toward the hill.":F.sealed>=2?"You two are the talk of the town. Half of them want to hug you, half want to hide. I told them you're both just very tired.":F.sealed>=1?"Good. One crack closed. There are three more. I counted: the orchard, the hill, the river.":"Cracks at dusk, little lights stepping out. Danoya, you've always seen what the rest of us walk past. Be kind to them. Doodi, be useful.";
    await say("Judy",jl);return}
  if(id==="queen"){
    if(D.act!==1){await say("Doodi","A swirl of glowing moths, going round and round one spot. They're sad, I think. Hard to say. Swap to Danoya.");return}
    if(F.q2===0){await seq([["","A moth the size of a cat, wings like stained glass, hovers over a crack in the air."],["Moth Queen","Every lantern you float at the festival, little light, we carry. Each one is a name. When a lantern is lit, the name is light. When it's forgotten, the name gets heavy."],["Moth Queen","Five names fell out of us in your orchard, the night the crack opened. We cannot go home carrying nothing. They are somewhere in the grass."],["Danoya","How do we find them?"],["Moth Queen","Say them when you find them. A name said aloud is a lantern lit."],["Doodi","I'll clear the way. You find the names."]]);F.q2=1;mkE();toast("New quest: Lantern Moths");}
    else if(F.q2===1){var n=F.mt.reduce(function(s,v){return s+v},0);if(n<5)await say("Moth Queen","Names still missing: "+n+" of 5 returned. Look low in the grass, and behind what hurts.");else{await seq([["Moth Queen","All five. Now say them, little light, in the order they wake. A name said out of turn only gets heavier."]]);await mgSimon("\ud83e\udd8b Five names","Watch the order they wake in, then say them back.",NAMES);await seq([["","Danoya cups five small lights. Alder. Pell. Odile. Fen. Marguerite. They wake in her hands like sparks off a fire."],["Moth Queen","Alder. He planted sunflowers in the wrong row for forty years. His wife never forgave him. She never stopped telling the story, either."],["Danoya","Wren's husband?"],["Moth Queen","Say it where she can hear."],["","The swarm lifts, spirals once around the orchard, and pours back through the crack. It closes with a sound like a page turning."]]);F.q2=2;seal()}}
    return}
  if(id.indexOf("mote")===0){
    if(D.act!==1){await say("Doodi","(Faint glimmer. Danoya might see it better.)");return}
    F.mt[e.i]=1;sfx4("pick");var n=F.mt.reduce(function(s,v){return s+v},0);toast("A name returns: "+NAMES[e.i]+" ("+n+"/5)");mkE();return}
  if(id==="bramble"){
    if(D.act!==0){toast("Brambles. Swap to Doodi and chop.");sfx4("bad");return}
    sfx4("cut");F.br=1;mkE();toast("Doodi hacked the bramble away!");return}
  if(id==="plaque"){F.cP=1;await seq([["","The shrine's stone is worn by a hundred winters. A name was carved here once. You can make out only: M _ S U."],["Doodi","M, something, S, U. It's a name. Short."],["","Beneath it, in letters that have been recut a few times by people who didn't know why: \"The first lantern in this valley was lit on this hill, for a man who could not sleep.\""],["Danoya","The plaque at the shrine gate. I read the line under it once, and never looked at the name above it."]]);return}
  if(id==="elder"){
    if(F.q3===2){await seq([["Danoya","Elder Hesper. Say her name."],["Elder Hesper","...I don't say that name."],["Danoya","I know. She told me why. She says she sang that night, as loud as she's ever sung. A boy followed a light down to the harbour and never came home, and it was nobody's fault. I think she's been waiting all this time for someone to tell you so."],["Elder Hesper","...Corin always followed the wrong light. He was sixteen. The night of the Great Storm there was a lamp burning at the bottom of the harbour, and he wanted to see it. I told him to go. I told him to go, and I blamed the fox so I wouldn't have to blame my mouth."],["Elder Hesper","Misu."],["","The air by the shrine shimmers. A white fox with too many tails turns her head, slowly, the way you turn toward someone calling you home."],["Shrine Fox","I sang. I did sing."],["Elder Hesper","I know. I know you did. I'm sorry I stopped saying it."],["Shrine Fox","Say it once more. Then I can go."],["Elder Hesper","Misu. Misu. Misu."],["","She laughs like bells in a drain pipe, steps into the air, and the crack folds shut behind her."]]);F.q3=3;seal();return}
    F.cE=1;await seq([["Elder Hesper","The shrine fox, hm? A long time ago. Not so long that I've forgotten. She came with the mist and left with the mist. A voice like a window opening."],["Elder Hesper","The name was short. Short like a breath. People stopped saying it, and a name nobody says..."],["Doodi","...goes quiet."],["Elder Hesper","Exactly. I don't say it either. Not for any good reason."]]);return}
  if(id==="fox"){
    if(D.act!==1){await say("Doodi","The grass is flattened in a ring where something sits. Swap to Danoya.");return}
    if(F.q3===0){await seq([["","A fox the colour of moonlight sits by the shrine. It has too many tails to count and none of them are quite still."],["Shrine Fox","I know I'm somebody. I know what I was for. I sang the fog thin so the boats could find home. I don't know what I'm called."],["Danoya","We'll help. There's a plaque and an old woman, Elder Hesper, who remembers the old days."]]);F.q3=1;toast("New quest: The Fox Without a Name");}
    else if(F.q3===2){await say("Shrine Fox","Tell her I sang. I need someone to tell her that.")}
    else if(!(F.cP&&F.cE)){await say("Shrine Fox","Somebody wrote it down. Somebody remembers. Please look.")}
    else{var c=await ask("Danoya","The plaque said M _ S U. Elder Hesper said short, like a breath, and she came with the mist. What's her name?",["Moro","Misu","Mesu"]);
      if(c===1){await seq([["Shrine Fox","...Misu. Misu. MISU."],["","Every one of her tails stops at once."],["Shrine Fox","I know why I'm still here. There was a night I sang, and a boy didn't come home, and the girl who loved him stopped saying my name. I sang. I sang as loud as I could. Will you tell her?"],["Danoya","The elder. Hesper."],["Shrine Fox","Hesper. Yes. Hesper. She was the little one who held the lantern."]]);F.q3=2;toast("Tell Elder Hesper")}
      else{sfx4("bad");await say("Shrine Fox","...No. That wasn't it. But close. It's like a word on the tip of my tongue.")}}
    return}
  if(id==="wren"){
    if(F.q4===0){await seq([["Wren","Step up, step up! Speak with your lost ones! A silver a minute, tea's extra."],["Doodi","Wren. Those are jars. With things in them."],["Wren","Guests. Very comfortable jars. People are lonely, Doodi, and I'm helping. That's a service."],["Wren","...Also one of them sounds exactly like my husband. Alder. He used to say 'sunflower, you're late for dinner'. I just wanted to hear it once more. Then twice. Then I started charging so I could afford the tea."]]);F.q4=1;toast("New quest: Wren's Jars")}
    else if(F.q4===1&&!F.jh){await say("Wren","Go on. Take a look at my guests. You'll see.")}
    else if(F.q4===1){
      await seq([["Doodi","Danoya says they're not the people anyone lost. They're lonely things that copy whoever sits down."],["Wren","...I know. I know that. But it says 'sunflower, you're late' in the right voice, Doodi. You've no idea what that does."]]);
      var c=await ask("Doodi","How do I get her to let them go?",["Threaten to tell the whole town","\"Alder wouldn't want you to be a jailer. Open a tea stall instead, where the lonely ones can visit if they want to.\"","Pay for a chat with one"]);
      if(c===1){await seq([["Wren","A tea stall. Where they stay if they want to. And if they don't, they go home."],["Wren","Alder planted the sunflowers in the wrong row for forty years. I spent forty years telling him. If I let him go I'll have nobody to tell."],["Doodi","Tell everyone else. They'll want the story. Hesper writes down the good ones."],["Wren","...Fine. Open the jars. I hate that I'm relieved."]]);F.q4=2;toast("Wren agreed. Danoya can open the jars.")}
      else if(c===0){sfx4("bad");await say("Wren","Do that and I'll sell your names to the next ghost I find. Try something kinder.")}
      else{sfx4("bad");await seq([["","You pay a silver. The jar pulses, and a voice that sounds almost exactly like your mother says: I'm so proud of you."],["Doodi","...Okay. That's very good. That's the problem."]])}}
    else if(F.q4===2){await say("Wren","Go on. Open them. Gently.")}
    else{await say("Wren",F.q2>=2?"Tea's on the house for spirits. And for you two. Hot, sweet, no lies. Alder came by last night. I said his name, and the sunflowers faced the lake.":"Tea's on the house for spirits. And for you two. Hot, sweet, no lies.")}
    return}
  if(id.indexOf("jar")===0){
    if(D.act!==1){await say("Doodi","A jar glowing blue. Something inside is tapping the glass.");return}
    if(F.q4<2){F.jh=1;var L=["\"Are you the lantern-girl? She sits with us when nobody comes. I say what she wants. I don't know who I am.\"","\"Sunflower, you're late for dinner. ...I don't know why I say that. It works.\"","\"Please. It's so loud in here when nobody's talking.\""];await seq([["Jar spirit",L[e.i]],["Danoya","They're not the people anyone lost. They're lonely. Doodi, talk to Wren."]]);if(F.q4===1)toast("Talk to Wren (Doodi)");return}
    await mgTime("\ud83e\uded9 The lid","Wren said gently. Three careful turns: stop the mark in the green each time.",jarOpts(e.i));
    F.jf[e.i]=1;sfx4("pick");mkE();var n=F.jf.reduce(function(s,v){return s+v},0);
    if(n<3)toast("Jar opened ("+n+"/3)");
    else{await seq([["","The third jar opens. Three small spirits rise together, grateful and unsure, and drift toward the crack by the water."],["Jar spirit","Thank you. We'll come back for tea. When we want to."],["","Behind Wren's stall, a lamp comes on by itself."]]);F.q4=3;seal()}
    return}
}
var EPI=["Ottilie Fenn. \"She'd have liked this weather.\"","Hob the cooper. \"Barrels, bees, and a bad knee.\"","Two names, one stone. \"Together on the ferry, together after.\"","A small stone with a carved fox. Just one word: \"Stay.\"","Marguerite Lo. \"Ask me about the pie. Don't ask me about the recipe.\"","No name. Just: \"For the one who kept the door.\""];
function pick(a){return a[Math.min(a.length-1,F.sealed)]}
async function talk2(e){var id=e.id;
  if(id==="pim"){await say("Baker Tom",pick(["The dough's rising by itself this week. I'm not complaining. I'm also not looking at it.","The bread's warm again, and I swear it's humming. Take a roll, you two.","If the sky goes strange tonight, eat first. Heroes need carbs.","Whatever's happening on the hill, I made enough rolls for the whole town. Just in case."]));return}
  if(id==="oru"){await say("Oru",pick(["The fish swim upstream to the hill, in a line. Politely. I don't love it.","Fish are confused but calmer. Thank whoever sealed the crack at the table.","The river's gone quiet. Quiet is worse.","Everyone on the river is standing very still, looking at the shrine."]));return}
  if(id==="nell"){
    if(F.sd){await say("Robin","Biscuit's gone, but the porch doesn't creak anymore. It feels like he finished his walk.");return}
    if(!F.sn){await seq([["Robin","Biscuit died three weeks ago. Thirteen years. Orange, loud, terrible at fetch."],["Robin","Lately the porch creaks at six like he's pacing. I'm either haunted or very tired."]]);F.sn=1;toast("Side quest: Biscuit");return}
    if(F.sn&&!F.sb){await say("Robin","If there IS something on the porch... tell him it's okay. He was a good boy.");return}
    if(D.act===1){await seq([["Danoya","Robin. He's right behind you. He's wagging. He wants you to know he's been guarding the porch the whole time."],["Robin","...Biscuit?"],["","Robin kneels, hand out, and for one second a tiny orange shimmer leans into it. Then he trots out of the world, tail high."],["Robin","Oh, you good boy. Go on. Go."]]);F.sd=1;F.kd++;mkE();toast("✦ A kind deed: Biscuit rests");sfx4("seal")}
    else{await say("Robin","I'd tell you what I feel, but Danoya should be the one to tell me what he says.")}
    return}
  if(id==="biscuit"){if(D.act!==1){await say("Doodi","Something small and warm brushed my ankle. I think it's a dog? Swap to Danoya.");return}
    if(!F.sn){await say("Danoya","A dog made of lamplight, tail going. He wants someone. Maybe I should ask around the market.");return}
    await seq([["Biscuit","*bark* (I was a good boy. Tell her. Tell her I was good. I guarded the porch.)"],["Danoya","I'll tell her."],["","He drops a stick made of lamplight at her feet. He looks at the stick. He looks at her. He looks at the stick."]]);await mgFetch();await seq([["Danoya","Good boy. Best boy. I'll tell her that too."]]);F.sb=1;toast("Tell Robin");return}
  if(id==="millwright"){
    if(D.act!==1){await say("Doodi","The wheel is turning backwards, and there's a man-shaped warmth beside it. Swap to Danoya.");return}
    await seq([["Old Millwright","Don't mind the wheel, miss. It's me. Forty years I've been gone, and since the night the lanterns first leaned south I could hear my wheel again. I turn it backwards. It's the only way I can hear it come home."],["Danoya","You must be one of Garo's family."],["Old Millwright","Am I? Is he tall? He checks the wheel every morning. I can see him do it. I want to shout: it's fine, lad, it's fine, stop checking."],["Danoya","He checks it because it's yours. It's the only way he knows to say good morning."],["Old Millwright","(a long quiet) That's a better answer than I deserved. I'll tell you something for your trouble. The first lantern in this valley wasn't lit by a farmer. It was lit by a woman called Sael, for a man who couldn't sleep. The oil in my lamp still smells of her."],["Danoya","Sael."],["Old Millwright","Tell the lad the wheel's fine. And that whatever he's afraid of, the wheel will keep turning. It's a very patient machine."],["Old Millwright","One favour, miss. My hands go through it now. Turn it the right way for me. Just the once."]]);await mgWheel();await seq([["","The old man lays his hand beside hers on the wheel. It turns, once more, the right way, and he is gone."]]);F.sw=1;F.kd++;mkE();toast("✦ A kind deed: the old millwright");sfx4("seal");return}
  if(id==="garo"&&F.sw){await say("Miller Garo","I heard it last night. 'It's fine, lad, stop checking.' I don't know whose voice that was. I stopped checking. The wheel turned right anyway.");return}
  if(id==="garo"){await say("Miller Garo",pick(["The wheel hasn't turned the wrong way in forty years. Today it did. Twice.","My grandfather said the shrine's Door was the first thing built in this valley, before the village, before the river. Nobody believes him. I'm starting to.","Wheel's turning right again. Don't ask me what that means.","Whatever's coming, I'll keep the mill lit. Folks need a light that doesn't flicker."]));return}
  if(id==="ines"){await say("Ines",pick(["Fish aren't biting. They're leaving, like a queue. I'm just here for the quiet.","Something sang from the water this morning. A tune I almost knew.","I caught a fish that looked at me like I owed it money.","I'm not fishing tonight. Moonlight on the river looks wrong."]));return}
  if(id==="bram"){
    if(F.sealed<3){await say("Sexton Ralph",pick(["Nobody's disturbed a grave. They just keep... visiting. They stand at their stones and look at the hill.","Folks leave flowers. The flowers are turned toward the shrine by morning.","Quiet is part of the job, you know."]));return}
    await seq([["Sexton Ralph","I've kept this garden thirty years. Last night, a tall figure in white stood at the gate and asked me what the dead were afraid of."],["Sexton Ralph","I said, 'Being forgotten.' It smiled like I'd given it a key."],["Doodi","...We should hurry."]]);return}
  if(id==="child"){
    if(D.act!==1){await say("Doodi","The grass is pressed in little footprints, running in circles. Swap to Danoya.");return}
    await seq([["Pale Child","Are you counting? You have to count. I've been hiding forever, and nobody's ever found me."],["Danoya","Okay. I'll count. Eyes closed. One... two... three..."],["","Danoya counts to ten. When she opens her eyes the garden is empty, and one of the bushes is trying very hard not to laugh."]]);await mgSeek();await seq([["","The third time, the child is standing right in front of her, grinning."],["Pale Child","You found me! You FOUND me!"],["","The child runs in a bright circle, laughing, and is gone. The grass keeps the shape of a small, happy path."]]);F.sc=1;F.kd++;mkE();toast("✦ A kind deed: the hiding child");sfx4("seal");return}
  if(id.indexOf("grave")===0){if(!F.gv)F.gv=[0,0,0,0,0,0];if(!F.gv[e.i]){F.gv[e.i]=1;var _nn=namesList(),_c=_nn.filter(function(q){return q[1]}).length;toast("\ud83d\udcdc A name said aloud ("+_c+"/"+_nn.length+")")}await say("",EPI[e.i]);return}
  if(id==="lio"){await say("Beekeeper Lio",pick(["The bees stopped flying when the cracks opened. They hover in a ring, facing the hill.","Two cracks closed and the bees came back to the hive. They hum your names. Probably.","The hives are warm tonight. Too warm. They know something.","Hive's humming a low note. The same note the shrine bell makes."]));return}
  if(id.indexOf("hive")===0){await say("",["The hive hums. It sounds like a very polite crowd.","Warm to the touch. A low buzz, almost a song.","Honey, thick and golden, glowing a little. Just a little."][e.i]);return}
}
/* ---------- finale ---------- */
async function finaleA(){
  m4("bossroom");D.cine={k:"guest",t:0};
  await seq([["","The bell in the square rings once, though nobody pulled it. Every window glows. Lamplight pours from all four cracks you closed, and gathers in the middle of the square."],["Danoya","Doodi... the cracks closed. That should be the end of it."],["","A tall figure steps out of the light. White as an unwritten page. Antlers of frost. It kneels to the villagers, and one by one they come out of their doors, smiling and crying."],["Gentle Guest","I only want to carry what you have lost. A grandmother's soup. A river's song. A name. I can bring them back. Gladly. Gladly."],["Danoya","Doodi... it isn't lying. And that scares me more than if it were."],["Doodi","Where does it keep coming from?"],["Danoya","The hill. Every crack points to the shrine. We closed the doors, and it was never about the doors."],["Doodi","The shrine. The one that has been barred longer than anyone can remember."],["Danoya","Then somebody is about to."],["Doodi","Then let's go see who's pulling the strings."]]);
  D.cine=null;F.fin=1;mkE();save();toast("Go to Shrine Hill")}
async function finaleB(){try{albumAdd("c4_finaleB")}catch(x){}
  m4("angel");D.cine={k:"warden",t:0,r:0,fl:0};
  await seq([["","The shrine's great doors, barred from the inside since before anyone's grandmother, swing open on their own. Dust pours off the threshold. Nobody has ever seen what is behind them, and now nobody can look away."],["","The shrine groans. Beneath it, the earth opens like a held breath let go. The fox's cracks, the moths' cracks, the table's crack... all of them were stitches in the same wound."]]);
  var c=D.cine;for(var i=0;i<60;i++){c.r=i/60;await sleep(35)}
  await seq([["The Warden","You close the cracks, one at a time. How careful. How kind. And how slow."],["Danoya","You sent them. The gentle ones. So the town would trust you."],["The Warden","I sent mercy. Four people sat with their dead tonight and wept with joy. Is that cruelty?"],["Doodi","It isn't mercy if there's a price on it."],["The Warden","Every soul loses someone, Doodi. I only offer to give them back. All I need is for the Door to open from this side."],["Danoya","Who are you?"],["The Warden","I kept this Door for four hundred years. I kept it shut. Once, someone I loved asked me to open it. I said no. I have regretted that word every night since."],["The Warden","And the light you carried home from the dark? The Sunheart? It was the last lamp on the Keepers' road. You lit the road again, every step of it, all the way to my door. It woke the Door. Thank you. I could never have done it myself."],["Doodi","...Oh no."],["The Warden","Every door you close, I will open from the other side."]]);
  sfx4("seal");for(var j=0;j<20;j++){c.fl=1-j/20;await sleep(40)}
  D.cine=null;F.done=1;save();
  try{celebrate("Chapter 4 complete!")}catch(e){}
  await sleep(1400);
  await seq([["","The shaking stops. Down in the valley, one by one, the lanterns turn to face the hill."],["Doodi","...He thanked us. He actually thanked us."],["Danoya","He wasn't being cruel. That's the worst part. He meant it."],["Doodi","Then we find out what he's afraid of, and we get there first."]]);
  showOv('<h3>Chapter 4 · Complete 🕯️</h3><p>Four thin places sealed. One Door cracked.</p><p class="mini">Kind deeds done: '+F.kd+'/3</p><p class="mini">The Warden is out. Something is waking in the valley and it is not finished with you.</p><p class="mini">Chapter 5 is next.</p><button class="big" id="c4x" type="button">Back to the valley menu</button><button class="mbtn" id="c4r" type="button" style="margin-top:8px">Stay in the valley</button>');
  $("c4x").onclick=function(){location.href="index.html"};$("c4r").onclick=function(){hideOv()}}
/* ---------- start / loop ---------- */
function goal(){
  try{if(!window.__cutId){if(F.q1>=3)albumAdd("c4_mira");if(F.q3>=3)albumAdd("c4_fox")}}catch(x){}
  if(F.done)return"The shrine doors stand open. Chapter 5 awaits.";if(F.fin===1)return"Go to Shrine Hill (north of the square).";if(F.sealed>=4)return"";
  var o=[];if(F.q1<3)o.push(F.q1===0?"Someone is waiting in the square":F.q1===1?"Tobi, maybe the orchard":"Bring Tobi to the table");
  if(F.q2<2)o.push(F.q2===0?"Something glows in the orchard":F.q2===1?"Gather the moth lights ("+F.mt.reduce(function(s,v){return s+v},0)+"/5)":"");
  if(F.q3<3)o.push(F.q3===0?"Something on the shrine hill":F.q3===1?"The fox is trying to remember":"Tell Elder Hesper she sang");
  if(F.q4<3)o.push(F.q4===0?"Something by the river":F.q4===1?"Wren's jars":F.q4===2?"Wren's jars are shut":"");
  return o.filter(Boolean).slice(0,2).join(" · ")}
window.__dunStep=function(dt){
  if(!D.on)return;time=time||0;
  if(D.fade>0)D.fade-=dt;if(D.cine){D.cine.t+=dt}
  if(!talking&&!ui&&!D.trans&&!D.cine)stepHeroes(dt);
  if(D.act===1&&!talking&&!ui&&!D.trans){var pa=D.h[1];D.E.forEach(function(e){if(e.k==='m'&&Math.hypot(pa.x-e.x,pa.y-e.y)<20){F.mt[e.i]=1;sfx4('pick');var n=F.mt.reduce(function(s,v){return s+v},0);toast('Moth light '+n+'/5');mkE();save()}})}
  drawArea();
  var hh=$("hhr");if(hh)hh.innerHTML='<span style="color:#d6b3ff">✦</span> '+F.sealed+'/4 sealed · <small>'+(D.act===0?"Doodi":"Danoya")+'</small>';
  var hd=$("hday");if(hd)hd.textContent="Ch 4";var ht=$("htime");if(ht)ht.textContent=AR[D.a].n;
  var gh=JSON.stringify([F.q1,F.q2,F.q3,F.q4,F.sealed,F.fin,F.mt,D.a]);if(gh!==D.gh){D.gh=gh;D.gt=0}else if(!talking&&!ui)D.gt=(D.gt||0)+dt;var gl=$("goal");if(gl){var g=talking||ui?"":goal();if(gl.textContent!==g)gl.textContent=g}}

var MAPN=[["Garden",0,0,6],["Shrine Hill",1,0,2],["Beekeeper's Hill",0,2,7],["Orchard",0,1,1],["Town Square",1,1,0],["Riverside",2,1,3],["Market Row",1,2,4],["Old Mill",2,2,5]];
var MAPE=[[6,2],[2,0],[7,1],[1,0],[0,3],[3,5],[0,4]];
/* ---- names said aloud: the lost the valley has put a name to this chapter ---- */
function namesList(){
  var gv=F.gv||[];
  return [
    ["Mira",F.q1>=3,"Someone is waiting in the square."],
    ["Alder",!!F.mt[0],"A moth light, low in the orchard."],["Pell",!!F.mt[1],"A moth light, low in the orchard."],["Odile",!!F.mt[2],"A moth light, low in the orchard."],["Fen",!!F.mt[3],"A moth light, low in the orchard."],["Marguerite",!!F.mt[4],"A moth light, behind what hurts."],
    ["Biscuit",!!F.sd,"A good boy on a porch."],
    ["Misu",F.q3>=2,"The fox on the shrine hill. The plaque says M _ S U."],
    ["The child who wanted to be found",!!F.sc,"Someone hiding, somewhere quiet."],
    ["Ottilie Fenn",!!gv[0],"A gravestone in the thin place."],["Hob the cooper",!!gv[1],"A gravestone in the thin place."],["Two on the ferry",!!gv[2],"A gravestone in the thin place."],["The one who stays",!!gv[3],"A small stone with a carved animal."],["Marguerite Lo",!!gv[4],"A gravestone in the thin place."],["The one who kept the door",!!gv[5],"A stone with no name."]
  ]}
function namesHtml(){
  var L=namesList(),n=L.filter(function(q){return q[1]}).length;
  var h='<h4 style="margin:12px 0 4px;font-size:1rem">\ud83d\udcdc Names said aloud ('+n+'/'+L.length+')</h4><div style="text-align:left;font-size:.82rem;line-height:1.35">';
  L.forEach(function(q){h+='<div style="padding:3px 0;border-top:1px solid #ffffff22;'+(q[1]?'':'opacity:.55')+'">'+(q[1]?'\u2728 <b>'+q[0]+'</b>':'\u2753 ???  <i>'+q[2]+'</i>')+'</div>'});
  h+='</div>';if(n===L.length)h+='<p style="margin:8px 0 0;font-size:.82rem"><i>Every name said aloud. The Name-Moth is keeping them for you.</i></p>';
  return h}
function mapHtml(){
  var P={};MAPN.forEach(function(n){P[n[3]]=[34+n[1]*96,34+n[2]*80]});
  var sv='<svg viewBox="0 0 260 220" width="100%" style="max-width:300px;display:block;margin:0 auto">';
  MAPE.forEach(function(e){var p=P[e[0]],q=P[e[1]];sv+='<line x1="'+p[0]+'" y1="'+p[1]+'" x2="'+q[0]+'" y2="'+q[1]+'" stroke="#b58cff" stroke-width="4" stroke-linecap="round" opacity=".55"/>'});
  MAPN.forEach(function(n){var p=P[n[3]],cur=n[3]===D.a;
    sv+='<g>'+(cur?'<circle cx="'+p[0]+'" cy="'+p[1]+'" r="26" fill="#ffe27a" opacity=".25"><animate attributeName="r" values="22;30;22" dur="1.6s" repeatCount="indefinite"/></circle>':'')+'<rect x="'+(p[0]-30)+'" y="'+(p[1]-16)+'" width="60" height="32" rx="8" fill="'+(cur?"#ffe27a":"#0a3b3e")+'" stroke="'+(cur?"#fff":"#2fe0c8")+'" stroke-width="2.5"/><text x="'+p[0]+'" y="'+(p[1]+3.5)+'" text-anchor="middle" font-family="Figtree,system-ui,sans-serif" font-weight="800" font-size="9.5" fill="'+(cur?"#3a2a00":"#fff6ee")+'">'+n[0].replace("Beekeeper's Hill","Bee Hill")+'</text></g>'});
  sv+='</svg>';
  return '<div style="text-align:center"><h3 class="tt" style="font-size:1.3rem;margin:0 0 6px">Map &amp; Names</h3><p style="margin:0 0 8px;font-size:.9rem">You are in <b>'+AR[D.a].n+'</b></p>'+sv+'<p style="margin:8px 0 12px;font-size:.8rem;opacity:.8">Paths between areas are shown as lines.</p>'+namesHtml()+'<button class="big" id="mapx" style="margin-top:10px" type="button">Close</button></div>'}
var mapOn=false;
function toggleMap(){
  if(!D.on)return;
  if(mapOn){mapOn=false;hideOv();return}
  if(talking||ui||D.trans)return;
  mapOn=true;showOv(mapHtml());var x=document.getElementById("mapx");if(x)x.onclick=function(){if(mapOn){mapOn=false;hideOv()}};sfx4("pick")}
window.__map4=toggleMap;window.__dbg4={F:function(){return F},D:function(){return D},ent:function(i){return ent(i)}};window.__nr4=function(){F.q1=3;F.mt=[1,1,1,1,1];F.sd=1;F.q3=3;F.sc=1;F.gv=[1,1,1,1,1,1];talking=true;return namesReward().then(function(){talking=false})};window.__mg4={seek:mgSeek,wheel:mgWheel,fetch:mgFetch,jar:function(i){return mgTime("lid","test",jarOpts(i))}};window.__go4=function(a,act){D.a=a;D.act=act||0;mkE()};window.__names4=function(){return mapHtml()};
function mkMapBtn(){
  if(document.getElementById("bm"))return;
  var ab=document.querySelector(".ab"),bb=document.getElementById("bb");if(!ab||!bb)return;
  var m=document.createElement("button");m.id="bm";m.type="button";m.className="b";m.textContent="Map";
  m.addEventListener("pointerdown",function(e){e.preventDefault();try{ac()}catch(x){}toggleMap()});
  ab.insertBefore(m,bb.nextSibling);
  document.addEventListener("keydown",function(e){if(!D.on)return;if(e.key==="m"||e.key==="M"){e.preventDefault();toggleMap()}else if(e.key==="Escape"&&mapOn){e.stopPropagation();e.preventDefault();mapOn=false;hideOv()}},true)}
window.__d4start=async function(load){
  try{if(!S)S=fresh()}catch(e){S=fresh()}S.sfx=true;if(!S.day)S.day=1;ARMOR=false;
  D.on=true;window.__dunOn=true;F=newF();D.a=0;D.act=0;
  var sv=null;try{sv=JSON.parse(localStorage.getItem("dv4")||"null")}catch(e){}
  if(load&&sv&&sv.F){F=sv.F;D.a=sv.a||0;if(!F.mt)F.mt=[0,0,0,0,0];if(!F.jf)F.jf=[0,0,0];if(!F.gv)F.gv=[0,0,0,0,0,0]}
  var bb=document.getElementById("bb");if(bb)bb.textContent="Swap";try{mkMapBtn()}catch(e){}
  var mini=document.querySelector(".mini[style*='center']");if(mini)mini.textContent="Arrows/WASD walk · Space = talk / use · Q = swap hero · M = map";
  mkE();D.h[0].x=4.5*TS;D.h[0].y=10*TS;D.h[1].x=5.5*TS;D.h[1].y=10*TS+6;if(D.a!==0){D.h[0].x=4.5*TS;D.h[0].y=6*TS;D.h[1].x=5.5*TS;D.h[1].y=6*TS+6}
  m4(AR[D.a].song);
  if(window.__skipIntro)F.intro=1;
  if(!F.intro){F.intro=1;talking=true;
    await seq([["","Chapter 4 · The Thin Place"],["","A month since the Sunheart came home. The lamps burn again, all the way down the south road, and the valley glows at night. But Mira's stall is still shut, Biscuit has been gone three weeks, and the glow has a quiet in it. At dusk, the lantern light does something new: it parts, like a curtain."],["","Cracks no wider than a hand are opening in the air, in the square, in the orchard, on the hill. Things are stepping out of them."],["Doodi","Danoya. There's a table in the middle of the square laid for three, and a draught that smells of cinnamon, and nobody there."],["Danoya","There's someone there, Doodi. I can see her. I think I can see all of them."],["Doodi","Why now? The lamps are back. The crystal is home."],["Danoya","Hesper said the Keepers lit a lantern for every step of the road to the Door under the north hill. We relit the whole road, every step, all the way from the crystal. I think something at the far end noticed."],["Doodi","Noticed what?"],["Danoya","I don't know yet. But it keeps knocking, and I think it's waiting to be let in."],["Doodi","Okay. You handle the ghosts, I handle the practical stuff."],["Danoya","Let's be kind to them. They're not here to scare anyone. They're lost."]]);talking=false;save()}}
function takeCut(){var id=null;try{id=localStorage.getItem("dv_cut");localStorage.removeItem("dv_cut")}catch(e){}if(!id){var h=(location.hash||"").replace("#","");if(h.indexOf("cut-")===0)id=h.slice(4)}return id}
function cutBack(){if(document.getElementById("cutback"))return;var a=document.createElement("button");a.id="cutback";a.type="button";a.textContent="\u25c0 All cutscenes";a.style.cssText="position:fixed;left:50%;transform:translateX(-50%);bottom:calc(8px + env(safe-area-inset-bottom,0px));z-index:99999;background:#fff;color:#7a2a40;font:800 13px system-ui,sans-serif;padding:6px 14px;border-radius:99px;border:0;box-shadow:0 2px 8px #0004";a.onclick=function(){cutExit(false)};document.body.appendChild(a)}
function cutGate(f){showOv('<div id="title"><h3 class="tt">Danoya<br>Valley</h3><p class="hand" style="font-size:1.4rem">Cutscene</p><br><button class="big" id="cg" type="button">Play \u25b6</button></div>');document.getElementById("cg").onclick=function(){ac();hideOv();f()}}
title=function(){
  var cid=takeCut();if(cid&&window.__cut4){cutBack();cutGate(function(){window.__cut4(cid)});return}
  if(window.__nosong||window.__tgate){return title4()}
  window.__tgate=1;
  showOv('<div id="title"><h3 class="tt">Danoya<br>Valley</h3><p class="hand" style="font-size:1.6rem">Chapter 4 · The Thin Place</p><br><button class="big" id="tg" type="button">Start ▶</button></div>');
  $("tg").onclick=function(){ac();hideOv();m4("ff7title");title4()}};
function title4(){
  var sv=null;try{sv=JSON.parse(localStorage.getItem("dv4")||"null")}catch(e){}
  var has=sv&&sv.F&&sv.F.intro;
  showOv('<div id="title"><h3 class="tt">Danoya<br>Valley</h3><p class="hand" style="font-size:1.6rem">Chapter 4 · The Thin Place</p><p class="mini">The evenings feel strange.</p>'+(has?'<button class="big" id="tc" type="button">Continue</button><br><br><button class="mbtn" id="tn" type="button">New game</button>':'<button class="big" id="tn" type="button">Begin</button>')+'<p class="mini" style="margin-top:10px">Arrows/WASD walk · Space = talk / use · Q = swap hero</p></div>');
  var tc=$("tc");if(tc)tc.onclick=function(){ac();hideOv();window.__d4start(true)};
  $("tn").onclick=function(){ac();hideOv();try{localStorage.removeItem("dv4")}catch(e){}window.__d4start(false)}}
window.__d4=function(){return {F:function(){return F},D:D,talk:talk,mkE:mkE,finaleA:finaleA,finaleB:finaleB,seal:seal,setA:function(a){D.a=a;mkE()}}};
window.__cut4=async function(id){
  window.__cutprev=1;try{if(!S)S=fresh()}catch(e){S=fresh()}
  if(id==="intro"){await window.__d4start(false);return}
  window.__skipIntro=1;await window.__d4start(false);window.__skipIntro=0;
  async function step(ar,who){D.a=ar;D.act=1;mkE();D.h[0].x=4.5*TS;D.h[0].y=10*TS;D.h[1].x=5.5*TS;D.h[1].y=10*TS+6;try{m4(AR[ar].song)}catch(e){}var e=ent(who);if(e){talking=true;try{await talk(e)}finally{talking=false}}}
  if(id==="mira"){F.q1=0;await step(0,"echo");await step(1,"tobi");await step(0,"echo");return}
  if(id==="queen"){F.q2=0;await step(1,"queen");F.mt=[1,1,1,1,1];F.br=1;mkE();await step(1,"queen");return}
  if(id==="fox"||id==="hesper"){F.q3=0;await step(2,"fox");F.cP=1;await step(2,"plaque");await step(2,"elder");var tries=0;while(F.q3<2&&tries++<6)await step(2,"fox");await step(2,"elder");return}
  if(id==="biscuit"){F.sn=0;F.sb=0;F.sd=0;await step(4,"nell");await step(4,"biscuit");await step(4,"nell");return}
  if(id==="millwright"){await step(5,"millwright");return}
  if(id==="wren"){F.q4=0;F.jf=[0,0,0];F.jh=0;await step(3,"wren");await step(3,"jar0");var t2=0;while(F.q4<2&&t2++<6)await step(3,"wren");for(var jj=0;jj<3;jj++)await step(3,"jar"+jj);return}
  if(id==="finaleA"){F.q1=3;F.q2=2;F.q3=3;F.q4=3;F.sealed=4;D.a=0;D.act=1;mkE();talking=true;await finaleA();talking=false}
  else if(id==="finaleB"){F.q1=3;F.q2=2;F.q3=3;F.q4=3;F.sealed=4;F.fin=1;D.a=2;D.act=1;mkE();talking=true;await finaleB();talking=false}};
(function(){var f=window.__cut4;window.__cut4=async function(id){window.__cutId=id;try{await f(id)}catch(e){try{console.error(e)}catch(x){}}await cutExit(true)}})();
})();
