/* ---- rendering ---- */
try{window.__moth5=localStorage.getItem("dv_names")==="1"}catch(e){}
function drawHeroSp(h){var k=KIT[h.id],f=h.mv>0?(1+(Math.floor(time*8)%2)):0;if(h.inv>0&&Math.floor(time*20)%2)return;
  cx.fillStyle="#0004";cx.beginPath();cx.ellipse(h.x,h.y+1,9,3.5,0,0,7);cx.fill();
  if(!h.ai&&G.hs.length>0){cx.fillStyle="#ffe27a";cx.beginPath();cx.moveTo(h.x,h.y-36);cx.lineTo(h.x-4,h.y-42);cx.lineTo(h.x+4,h.y-42);cx.fill()}
  if(h.id==="danoya")glowC(h.x,h.y-14,30,"rgba(255,230,160,1)",.2);
  if(h.id==="doodi"||h.id==="danoya")person(h.x-16,h.y-28,h.d,h.id,f,false);else villager(h.x-16,h.y-30,h.d,f,VSPEC[h.id],false);
  if(h.id==="danoya"&&h.d!==0&&window.__moth5)mothBadgeDraw(cx,h.x+5,h.y-8+(f?1:0),time);
  var dx=[0,1,0,-1][h.d],dy=[-1,0,1,0][h.d];
  if(h.sw>0&&(h.id==="doodi"||h.id==="judy")){var pg=Math.max(0,Math.min(1,1-h.sw/.2)),an=fa(h)-1.1+pg*2.2,hx=h.x+dx*5,hy=h.y-13+dy*4,ex=hx+Math.cos(an)*(h.id==="judy"?24:26),ey=hy+Math.sin(an)*(h.id==="judy"?24:26);
    cx.lineCap="round";if(h.id==="judy"){cx.strokeStyle="#7a5230";cx.lineWidth=3.5;cx.beginPath();cx.moveTo(hx,hy);cx.lineTo(ex,ey);cx.stroke();cx.strokeStyle="#a8743f";cx.lineWidth=1;cx.beginPath();cx.moveTo(hx,hy);cx.lineTo(ex,ey);cx.stroke();
  cx.save();cx.translate(ex,ey);cx.rotate(an);cx.fillStyle="#5a5e6a";cx.fillRect(-3,-8,10,16);cx.fillStyle="#9aa0ae";cx.fillRect(-3,-8,10,4);cx.fillStyle="#3a3d47";cx.fillRect(5,-8,2,16);cx.fillStyle="#d8dce8";cx.fillRect(-2,-7,2,6);cx.restore()}
  else{cx.strokeStyle="#dfe9f5";cx.lineWidth=4;cx.beginPath();cx.moveTo(hx,hy);cx.lineTo(ex,ey);cx.stroke()}cx.strokeStyle="rgba(255,255,255,.45)";cx.lineWidth=3;cx.beginPath();cx.arc(hx,hy,24,an-.9,an);cx.stroke();cx.lineCap="butt";cx.lineWidth=1}
  if(h.id==="rocket"){var gx=h.x+dx*10,gy=h.y-14;cx.fillStyle="#6a6e78";cx.fillRect(gx-3,gy-2,8,5);cx.fillStyle="#ff9a3d";cx.fillRect(gx+4,gy-1,3,3)}
  if(h.id==="dan"){cx.strokeStyle="#8a5a2a";cx.lineWidth=2;cx.beginPath();cx.arc(h.x+dx*9,h.y-16+dy*5,7,fa(h)-1.2,fa(h)+1.2);cx.stroke();cx.lineWidth=1}}
function drawEn(e){var x=e.x,y=e.y,t=time,fl=e.fl>0;if(e.draw){e.draw(e);return}cx.fillStyle="#0004";cx.beginPath();cx.ellipse(x,y+2,e.r+2,4,0,0,7);cx.fill();
  if(e.k==="shade"){cx.fillStyle=fl?"#fff":"#1a1030";cx.beginPath();cx.moveTo(x-9,y+2);cx.quadraticCurveTo(x-10,y-16,x,y-18);cx.quadraticCurveTo(x+10,y-16,x+9,y+2);cx.lineTo(x+5,y-1+Math.sin(t*8)*2);cx.lineTo(x,y+2);cx.lineTo(x-5,y-1);cx.fill();cx.fillStyle=e.stun>0?"#888":"#ff6fd0";cx.fillRect(x-5,y-12,3,4);cx.fillRect(x+2,y-12,3,4)}
  else if(e.k==="wisp"){var by=y-14+Math.sin(t*3+e.t)*3;glowC(x,by,16,"rgba(190,150,255,1)",.6);cx.fillStyle=fl?"#fff":"#d8c0ff";cx.beginPath();cx.arc(x,by,6,0,7);cx.fill();cx.fillStyle="#3a1a66";cx.fillRect(x-3,by-2,2,3);cx.fillRect(x+1,by-2,2,3)}
  else if(e.k==="brute"){cx.fillStyle=fl?"#fff":"#241442";cx.fillRect(x-14,y-26,28,28);cx.beginPath();cx.moveTo(x-14,y-26);cx.lineTo(x-20,y-38);cx.lineTo(x-8,y-26);cx.fill();cx.beginPath();cx.moveTo(x+14,y-26);cx.lineTo(x+20,y-38);cx.lineTo(x+8,y-26);cx.fill();cx.fillStyle=e.stun>0?"#888":"#ff6fd0";cx.fillRect(x-8,y-20,5,5);cx.fillRect(x+3,y-20,5,5)}
  else if(e.k==="guest"){glowC(x,y-24,48,"rgba(255,250,230,1)",.5);cx.globalAlpha=fl?1:.95;cx.fillStyle=fl?"#ffd0d0":"#fffaf0";cx.beginPath();cx.moveTo(x-14,y+2);cx.lineTo(x-8,y-42);cx.lineTo(x+8,y-42);cx.lineTo(x+14,y+2);cx.fill();cx.beginPath();cx.arc(x,y-50,9,0,7);cx.fill();cx.strokeStyle="#fffaf0";cx.lineWidth=3;cx.beginPath();cx.moveTo(x-6,y-56);cx.lineTo(x-14,y-74);cx.moveTo(x+6,y-56);cx.lineTo(x+14,y-74);cx.stroke();cx.lineWidth=1;cx.fillStyle="#8a7a60";cx.fillRect(x-4,y-52,2,3);cx.fillRect(x+3,y-52,2,3);cx.globalAlpha=1}
  if(e.hp<e.mx&&e.k!=="shade"){cx.fillStyle="#000a";cx.fillRect(x-14,y-(e.k==="guest"?82:e.big?44:26),28,3);cx.fillStyle="#ff4d6d";cx.fillRect(x-14,y-(e.k==="guest"?82:e.big?44:26),28*Math.max(0,e.hp/e.mx),3)}}
function drawPost(p){var x=p.x,y=p.y,t=time,fl=p.fl>0;glowC(x,y-24,60,"rgba(255,210,120,1)",.35*(p.hp/p.mx));cx.fillStyle="#3a2a1a";cx.fillRect(x-3,y-34,6,38);cx.fillStyle=fl?"#fff":"#ffd34d";cx.fillRect(x-8,y-48,16,16);cx.fillStyle="#fff6c4";cx.fillRect(x-5,y-45,10,10+Math.sin(t*10));cx.fillStyle="#000a";cx.fillRect(x-18,y+8,36,4);cx.fillStyle="#ffd34d";cx.fillRect(x-18,y+8,36*Math.max(0,p.hp/p.mx),4)}
function drawEngine(g){var x=g.x,y=g.y,k=G.chg||0,t=time;cx.fillStyle="#00000040";cx.fillRect(x-24,y-2,48,8);cx.fillStyle="#4a4e58";cx.fillRect(x-22,y-30,44,32);cx.fillStyle="#6a6e78";cx.fillRect(x-22,y-30,44,6);cx.fillStyle="#2a2e38";cx.fillRect(x-14,y-22,28,16);glowC(x,y-14,40,"rgba(255,200,100,1)",.2+.5*k/100);cx.fillStyle=k>=100?"#fff6c4":"#ffd34d";cx.fillRect(x-10,y-18,20*Math.min(1,k/100),8);if(k<100&&G.mode==="combat"){cx.strokeStyle="#9a9ea8";cx.lineWidth=3;cx.beginPath();cx.arc(x+30,y-12,10,t*3,t*3+4.5);cx.stroke();cx.lineWidth=1;cx.fillStyle="#000a";cx.fillRect(x-24,y+10,48,4);cx.fillStyle="#e87a3a";cx.fillRect(x-24,y+10,48*Math.max(0,g.hp/g.mx),4)}}
function drawBeacon(b){var x=b.x,y=b.y,t=time;cx.fillStyle="#3a2a1a";cx.fillRect(x-4,y-12,8,14);cx.fillStyle=b.lit?"#ffe27a":"#3a3a4a";cx.beginPath();cx.moveTo(x-9,y-12);cx.lineTo(x+9,y-12);cx.lineTo(x+5,y-24);cx.lineTo(x-5,y-24);cx.fill();if(b.lit){glowC(x,y-22,56,"rgba(255,230,150,1)",.55);cx.strokeStyle="rgba(255,240,180,.6)";cx.lineWidth=3;cx.beginPath();cx.moveTo(x,y-24);cx.lineTo(x,-10);cx.stroke();cx.lineWidth=1}
  else if(b.p>0){cx.fillStyle="#000a";cx.fillRect(x-16,y+8,32,4);cx.fillStyle="#ffd34d";cx.fillRect(x-16,y+8,32*b.p,4)}
  else{cx.globalAlpha=.5+.3*Math.sin(t*4);cx.strokeStyle="#ffe27a";cx.beginPath();cx.arc(x,y-6,16,0,7);cx.stroke();cx.globalAlpha=1}}
function drawWorld(){
  var bg=buildBg(G.map,G.theme);cx.save();if(G.shake>0)cx.translate((Math.random()-.5)*G.shake*8,(Math.random()-.5)*G.shake*8);cx.drawImage(bg,0,0);
  if(G.drawBack)G.drawBack();
  var L=[];G.hs.forEach(function(h){L.push({y:h.y,f:function(){drawHeroSp(h)}})});G.en.forEach(function(e){if(!e.dead)L.push({y:e.y,f:function(){drawEn(e)}})});
  G.tr.forEach(function(t){L.push({y:t.y,f:function(){cx.fillStyle="#6a6e78";cx.fillRect(t.x-6,t.y-12,12,12);cx.fillStyle="#ffb35a";cx.fillRect(t.x-2,t.y-16,4,6);cx.fillStyle="#000a";cx.fillRect(t.x-8,t.y+2,16,2);cx.fillStyle="#ffd34d";cx.fillRect(t.x-8,t.y+2,16*t.t/22,2)}})});
  (G.npcs||[]).forEach(function(n){L.push({y:n.y,f:function(){villager(n.x-16,n.y-30,n.d||2,0,n.sp,false);if(n.lamp){glowC(n.x+10,n.y-14,22,"rgba(255,220,140,1)",.5);cx.fillStyle="#ffd34d";cx.fillRect(n.x+8,n.y-18,5,7)}}})});
  if(G.post)L.push({y:G.post.y,f:function(){drawPost(G.post)}});if(G.engine)L.push({y:G.engine.y,f:function(){drawEngine(G.engine)}});G.beacons.forEach(function(b){L.push({y:b.y,f:function(){drawBeacon(b)}})});
  L.sort(function(a,b){return a.y-b.y});L.forEach(function(o){o.f()});
  G.pj.forEach(function(p){cx.fillStyle=p.c;cx.beginPath();cx.arc(p.x,p.y,p.own==="r"?4:3,0,7);cx.fill();glowC(p.x,p.y,8,p.c,.5)});
  G.fx.forEach(function(f){if(f.k==="p"){cx.globalAlpha=Math.max(0,f.t*2);cx.fillStyle=f.c;cx.fillRect(f.x-2,f.y-2,4,4);cx.globalAlpha=1}else if(f.k==="ring"){cx.globalAlpha=Math.max(0,f.t*2.5);cx.strokeStyle=f.c||"#fff6c4";cx.lineWidth=3;cx.beginPath();cx.arc(f.x,f.y,f.r,0,7);cx.stroke();cx.lineWidth=1;cx.globalAlpha=1}else if(f.k==="heart"){cx.fillStyle="#ff4d6d";cx.font="bold 14px sans-serif";cx.fillText("♥",f.x-5,f.y+Math.sin(time*5)*2)}});
  if(G.drawFront)G.drawFront();
  var T=THEME[G.theme];cx.fillStyle=T.tint;cx.fillRect(0,0,320,384);
  if(G.dark){cx.fillStyle="rgba(5,0,20,"+G.dark*.5+")";cx.fillRect(0,0,320,384)}
  if(G.ultV)G.ultV();
  if(G.flash>0){cx.fillStyle="rgba(255,60,90,"+Math.min(.35,G.flash)+")";cx.fillRect(0,0,320,384)}
  if(G.bossHud&&!G.cine){var b=G.bossHud;cx.fillStyle="#000a";cx.fillRect(40,364,240,10);cx.fillStyle=b.col||"#b78bff";cx.fillRect(42,366,236*Math.max(0,b.hp/b.mx),6);cx.fillStyle="#fff";cx.font="bold 9px sans-serif";cx.textAlign="center";cx.fillText(b.n,160,360);cx.textAlign="start"}
  if(G.msgT>0){cx.fillStyle="#000a";cx.fillRect(20,70,280,22);cx.fillStyle="#fff";cx.font="bold 11px sans-serif";cx.textAlign="center";cx.fillText(G.msg,160,85);cx.textAlign="start"}
  if(G.fade>0){cx.fillStyle="rgba(0,0,0,"+Math.min(1,G.fade*2.5)+")";cx.fillRect(0,0,320,384)}
  cx.restore()}
function say5(t,s){G.msg=t;G.msgT=s||2.6}
/* ---- combat runner ---- */
function startCombat(o){G.map=o.map;G.theme=o.theme||"night";G.en=[];G.pj=[];G.tr=[];G.fx=[];G.hp=G.mx;G.post=o.post?{x:o.post.x,y:o.post.y,hp:o.post.hp,mx:o.post.hp,fl:0}:null;G.engine=o.engine?{x:o.engine.x,y:o.engine.y,hp:o.engine.hp,mx:o.engine.hp}:null;G.um=0;G.chg=0;
  G.beacons=(o.beacons||[]).map(function(b){return {x:b[0],y:b[1],lit:0,p:0}});G.waves=(o.waves||[]).map(function(w){return {at:w.at,list:w.list,say:w.say,done:0}});G.waveT=0;G.drawBack=o.drawBack||null;G.drawFront=o.drawFront||null;G.npcs=o.npcs||[];G.dark=o.dark||0;G.bossHud=null;
  setParty(o.party,o.pos);G.cur=o;G.mode="combat";G.cine=null;G.dead=false;G.hs.forEach(function(h){h.inv=1.2});G.hs.forEach(function(h){h.cs=0});G.onA=o.onA||null;G.onStep=o.step||null;
  G.onA=function(){var l=lead();for(var i=0;i<G.beacons.length;i++){var b=G.beacons[i];if(!b.lit&&dist(l.x,l.y,b.x,b.y)<30&&!b.on){b.on=1;say5("Lighting the beacon. Stay close!");return true}}return o.onA?o.onA():false};
  if(o.song)m5(o.song);D5.fade=0;G.fade=.5}
var D5=G;
function waveTick(dt){G.waveT+=dt;G.waves.forEach(function(w){if(!w.done&&G.waveT>=w.at){w.done=1;if(w.say)say5(w.say);w.list.forEach(function(s){spawn(s[0],s[1],s[2])})}})}
function combatDone(){var o=G.cur;if(!o)return false;var allSpawned=G.waves.every(function(w){return w.done});var alive=G.en.some(function(e){return !e.dead&&!e.ghost});if(!allSpawned||alive)return false;
  if(G.beacons.length&&!G.beacons.every(function(b){return b.lit}))return false;if(G.engine&&G.chg<100)return false;if(o.extra&&!o.extra())return false;return true}
function stepCombat(dt){G.waveT=G.waveT;waveTick(dt);stepHeroes(dt);stepEn(dt);stepPj(dt);stepTr(dt);stepFx(dt);
  G.beacons.forEach(function(b){if(b.on&&!b.lit){var l=lead();if(dist(l.x,l.y,b.x,b.y)<34){b.p+=dt/1.6;if(b.p>=1){b.lit=1;b.on=0;sfx5("beacon");G.shake=.2;say5("Beacon lit! "+G.beacons.filter(function(q){return q.lit}).length+"/"+G.beacons.length)}}else{b.on=0;b.p=0}}});
  if(G.engine){var e0=G.engine;G.post=e0;if(e0.hp>0)G.chg=Math.min(100,G.chg+dt*(100/(G.cur.chargeT||55)))}
  if(G.onStep)G.onStep(dt);
  if(G.hp<=0||(G.post&&G.post.hp<=0&&!G.engine)||(G.engine&&G.engine.hp<=0)){gameOver();return}
  if(combatDone()){G.mode="won";var r=G.res;G.res=null;if(r)r(true)}}
function winFx(){return new Promise(function(done){if(G.dead||!G.hs||!G.hs.length)return done();var big=!!G.bossHud;G.cine={w:1};
  var bx=160,by=120;G.en.forEach(function(e){if(e.boss||e.k==="warden"){bx=e.x;by=e.y-14}});
  sfx5("boom");G.flash=big?.7:.3;G.shake=big?.7:.25;
  var cols=["#fff6c4","#ff9ae6","#b78bff"];
  for(var r=0;r<(big?4:2);r++)G.fx.push({k:"ring",x:bx,y:by,r:6,mx:70+r*55,t:.5+r*.18,c:cols[r%3]});
  for(var q=0;q<(big?36:14);q++){var a=q/(big?36:14)*6.283;G.fx.push({k:"p",x:bx,y:by,vx:Math.cos(a)*(50+q%5*18),vy:Math.sin(a)*(50+q%5*18),t:.9,c:cols[q%3]})}
  var n=big?75:28,i=0;(function f(){if(i++>=n){G.cine=null;window.__dlgLock=Date.now()+800;return done()}try{stepFx(.016)}catch(e){}if(big&&i===28){sfx5("boom");G.shake=.4}setTimeout(f,16)})()})}
window.__winFx5=winFx;
function playCombat(o){return new Promise(function(res){G.res=function(v){winFx().then(function(){res(v)})};startCombat(o)})}
function gameOver(){if(G.dead)return;G.dead=true;G.mode="over";m5("over");
  var st=document.getElementById("stage"),old=document.getElementById("go3");if(old)old.remove();
  if(!document.getElementById("go3css")){var cs=document.createElement("style");cs.id="go3css";cs.textContent="#go3{position:absolute;inset:0;z-index:40;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:16px;text-align:center;background:radial-gradient(ellipse at 50% 40%,#3a0612cc 0,#0a0108f2 75%);animation:go3in 1.2s ease both}@keyframes go3in{from{opacity:0}to{opacity:1}}#go3 .gl{display:flex;gap:2px;justify-content:center;flex-wrap:wrap}#go3 .gl i{font:400 clamp(2.4rem,13vw,3.6rem)/1 Bungee,Impact,sans-serif;font-style:normal;color:#ff3d57;text-shadow:0 0 18px #ff3d57aa,0 5px 0 #5a0a1c;display:inline-block;opacity:0;animation:go3d .7s cubic-bezier(.2,1.6,.4,1) forwards}@keyframes go3d{from{opacity:0;transform:translateY(-60px) scale(1.6) rotate(-8deg)}to{opacity:1;transform:none}}#go3 .gw{height:14px}#go3 p{margin:0;color:#ffd9e0;font-weight:700}#go3 .gh{font-size:1.5rem;letter-spacing:.3em;color:#7a2a3a}#go3 .gb{opacity:0;animation:go3in .8s 1.9s both;display:flex;flex-direction:column;gap:8px;align-items:center;margin-top:8px}#go3 .gr{font:400 1.15rem Bungee,sans-serif;background:#ff3d57;color:#fff;border:0;border-radius:14px;padding:12px 30px;box-shadow:0 4px 0 #8a1328;cursor:pointer}#go3 .gg{font:800 .95rem Figtree,sans-serif;background:none;color:#e8b8c4;border:2px solid #7a2a3a;border-radius:12px;padding:8px 20px;cursor:pointer}";document.head.appendChild(cs)}
  var d=document.createElement("div");d.id="go3";var L="GAME OVER",h="";for(var k=0;k<L.length;k++)h+=L[k]===" "?'<span class="gw" style="width:14px"></span>':'<i style="animation-delay:'+(.35+k*.1)+'s">'+L[k]+'</i>';
  d.innerHTML='<div class="gh">♡ ♡ ♡ ♡ ♡ ♡</div><div class="gl">'+h+'</div><p>'+(G.cur&&G.cur.lose||"The light went out.")+'</p><div class="gb"><button class="gr" id="go3r" type="button">Retry</button><button class="gg" id="go3g" type="button">Give up</button></div>';
  d.addEventListener("pointerdown",function(e){e.stopPropagation()});(st||document.body).appendChild(d);sfx5("hurt");
  $("go3r").onclick=function(){d.remove();var o=G.cur;startCombat(o);if(o.bossRestart)o.bossRestart()};
  $("go3g").onclick=function(){d.remove();try{stopSong(true,true)}catch(e){}location.reload()}}
/* ---- loop ---- */
window.__dunStep=function(dt){if(!G.on)return;
  if(G.fade>0)G.fade-=dt;if(G.flash>0)G.flash-=dt;if(G.shake>0)G.shake-=dt;if(G.msgT>0)G.msgT-=dt;
  if(G.mode==="combat"&&!talking&&!ui&&!G.cine)stepCombat(dt);
  else if(G.mode==="free"&&!talking&&!ui&&G.freeStep)G.freeStep(dt);
  if(G.mode==="op"||G.mode==="ed"){G.edStep(dt)}else if(G.map)drawWorld();
  var hh=$("hhr");if(hh){if(G.mode==="combat"||G.mode==="won"||G.mode==="over"){var s="";for(var i=0;i<10;i++){var hv=G.hp-i*2;s+='<span style="color:'+(hv>=2?"#ff4d6d":hv===1?"#ff9db0":"#8a7a86")+'">'+(hv>=1?"♥":"♡")+"</span>"}var l=lead();hh.innerHTML='<span style="font-size:.78rem;letter-spacing:-1px">'+s+'</span> <small style="font-size:.72rem">'+(l?KIT[l.id].n+(l.cs>0?" "+Math.ceil(l.cs)+"s":" ✓"):"")+'</small>'}else hh.innerHTML=""}
  var hc=$("hcoin");if(hc)hc.style.display="none";var hrr=$("hhr");if(hrr){hrr.style.minWidth="0";hrr.style.flexShrink="1"}var hd=$("hday");if(hd)hd.textContent="Ch 5";var ht=$("htime");if(ht)ht.textContent=G.place||"";
  var gl=$("goal");if(gl){var g=(talking||ui||G.mode!=="combat")?"":(G.cur&&G.cur.goal?G.cur.goal():"");if(gl.textContent!==g)gl.textContent=g}}
