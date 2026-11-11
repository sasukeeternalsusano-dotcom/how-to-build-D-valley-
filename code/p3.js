/* ---------- UI helpers ---------- */
var dlg=$("dlg"),dnn=$("dn"),dtt=$("dt"),dcc=$("dc"),dstate=null,toastT=0;
function toast(t){var e=$("toast");e.textContent=t;e.classList.add("on");clearTimeout(toastT);toastT=setTimeout(function(){e.classList.remove("on")},2600)}
try{window.__toast=toast}catch(e){}
function fitDlg(text){
  try{var st=$("stage"),dd=$("dlg"),dt=$("dt");if(!st||!dd||!dt)return;
    dt.style.minHeight="0";dt.style.fontSize="";dt.textContent=text;
    var sh=st.clientHeight||400,mx=sh*.3,fs=1.08;
    dd.style.visibility="hidden";dd.style.top="auto";dd.style.bottom="8px";
    while(fs>.82&&dd.offsetHeight>mx){fs-=.04;dt.style.fontSize=fs.toFixed(2)+"rem"}
    var fits=dd.offsetHeight<=mx*1.12;
    dt.style.minHeight=dt.offsetHeight+"px";
    /* flip to top if a character would sit under the box */
    var bh=dd.offsetHeight,ys=[];try{if(typeof window.__dlgActors==="function")ys=window.__dlgActors()||[]}catch(e){}
    var topB=sh-8-bh,nb=ys.filter(function(y){return y>topB-24&&y<sh}).length,nt=ys.filter(function(y){return y>-10&&y<bh+30}).length;
    if(nb>0&&nt<nb){dd.style.bottom="auto";dd.style.top="8px"}
    dd.style.visibility="";dt.textContent="";return fits}catch(e){try{$("dlg").style.visibility=""}catch(x){}return true}}
function typeInto(text){
  fitDlg(text);dtt.textContent="";var i=0;dstate.typing=true;clearInterval(dstate.iv);
  if(rm){dtt.textContent=text;dstate.typing=false;return}
  var _ts=0;try{_ts=+localStorage.getItem("dv_tspeed")||0}catch(e){}
  if(_ts>=2){dtt.textContent=text;dstate.typing=false;return}
  var _st=_ts===1?5:2;dstate.iv=setInterval(function(){i+=_st;dtt.textContent=text.slice(0,i);if(i%6<_st)sfxPlay("talk");if(i>=text.length){clearInterval(dstate.iv);dstate.typing=false}},_ts===1?16:22)}
function splitTx(t){var ss=t.match(/[^.!?…]+[.!?…]+["'”’)]*\s*|[^.!?…]+$/g)||[t];if(ss.length<2){var m=Math.floor(t.length/2),i=t.indexOf(" ",m);return i>0?[t.slice(0,i),t.slice(i+1)]:[t]}var tot=t.length,a="",o=[];ss.forEach(function(x){if(a&&a.length+x.length>tot/2+20&&o.length===0){o.push(a.trim());a=x}else a+=x});o.push(a.trim());return o.filter(Boolean)}
function say(who,text){
  return new Promise(function(res){ui++;dlg.hidden=false;dnn.textContent=who||"";dcc.innerHTML="";$("dn2").hidden=false;
    if(text&&text.length>140&&!fitDlg(text)){var ps=splitTx(text);if(ps.length>1){dlg.hidden=true;ui--;(async function(){for(var i=0;i<ps.length;i++)await say(who,ps[i]);res()})();return}}
    dstate={res:res,full:text,typing:true,choice:false};typeInto(text)})}
function ask(who,text,opts){
  return new Promise(function(res){ui++;dlg.hidden=false;dnn.textContent=who||"";dcc.innerHTML="";$("dn2").hidden=true;dstate={res:null,full:text,typing:true,choice:true};typeInto(text);
    opts.forEach(function(o,i){var b=document.createElement("button");b.type="button";b.textContent=o;b.onclick=function(e){e.stopPropagation();clearInterval(dstate.iv);dlg.hidden=true;dcc.innerHTML="";ui--;sfxPlay("tap");res(i)};dcc.appendChild(b)})})}
function advance(){
  if(!dstate||dlg.hidden)return false;
  if(window.__dlgLock&&Date.now()<window.__dlgLock)return true;
  if(dstate.typing){clearInterval(dstate.iv);dtt.textContent=dstate.full;dstate.typing=false;return true}
  if(dstate.choice)return true;
  var r=dstate.res;dstate=null;dlg.hidden=true;ui--;r();return true}
dlg.addEventListener("click",advance);
async function seq(a){for(var i=0;i<a.length;i++)await say(a[i][0],a[i][1])}
function showOv(html){ui++;$("ovc").innerHTML=html;$("ov").hidden=false}
function hideOv(){$("ov").hidden=true;$("ovc").innerHTML="";ui--}
function wait(ms){return new Promise(function(r){setTimeout(r,rm?Math.min(ms,80):ms)})}
async function fadeOut(){ui++;var f=$("fade");f.style.opacity=1;await wait(650);ui--}
async function fadeIn(){var f=$("fade");f.style.opacity=0;await wait(650)}
/* ---------- bag / menu ---------- */
var menuTab="bag",menuOpen=false;
var TABS=[["bag","Bag"],["quests","Goals"],["log","Log"],["map","Map"],["home","Home"],["more","More"]];
function openMenu(){if(ui||menuOpen)return;menuOpen=true;ui++;$("menu").hidden=false;renderMenu()}
function closeMenu(){if(!menuOpen)return;menuOpen=false;ui--;$("menu").hidden=true;paintHud()}
function renderMenu(){
  var tb=$("tabs");tb.innerHTML="";
  TABS.forEach(function(t){var b=document.createElement("button");b.type="button";b.textContent=t[1];b.setAttribute("aria-selected",t[0]===menuTab?"true":"false");b.onclick=function(){menuTab=t[0];renderMenu()};tb.appendChild(b)});
  var mb=$("mb");mb.innerHTML="";
  var f={bag:tabBag,quests:tabQuests,log:tabLog,map:tabMap,home:tabHome,more:tabMore}[menuTab];f(mb);
  var c=document.createElement("button");c.className="mbtn";c.style.marginTop="10px";c.textContent="Close (Esc)";c.onclick=closeMenu;mb.appendChild(c)
}
function mrow(e,t,sub,btn,fn,dis,done){var r=document.createElement("div");r.className="row"+(done?" done":"");r.innerHTML='<div class="l"><span class="e"></span><div><div class="rtt"></div><small></small></div></div>';r.querySelector(".e").textContent=e;r.querySelector(".rtt").textContent=t;r.querySelector("small").textContent=sub||"";
  if(btn){var b=document.createElement("button");b.type="button";b.textContent=btn;b.disabled=!!dis;b.onclick=fn;r.appendChild(b)}return r}
function h4(mb,t){var h=document.createElement("div");h.className="h4";h.textContent=t;mb.appendChild(h)}
function tabBag(mb){
  var ids=Object.keys(S.inv);if(!ids.length){mb.innerHTML+='<p>Your bag is empty.</p>';return}
  var groups=[["tool","Tools"],["seed","Seeds"],["flower","Flowers"],["fish","Fish"],["ing","Ingredients"],["dish","Dishes"],["gift","Gifts & snacks"],["junk","Junk"]];
  groups.forEach(function(g){var l=ids.filter(function(id){return IT[id].k===g[0]});if(!l.length)return;h4(mb,g[1]);l.forEach(function(id){mb.appendChild(mrow(IT[id].e,IT[id].n+" ×"+S.inv[id],IT[id].p?"Sells for 🪙"+IT[id].p:"",null))})})}
var QUESTS=[
 {id:"q1",t:"Green thumb",d:"Plant 4 flowers in your plots.",n:4,p:function(){return S.planted},r:{coins:60}},
 {id:"q2",t:"Angler",d:"Catch 5 fish.",n:5,p:function(){return S.caught},r:{coins:70}},
 {id:"q3",t:"Chef Doodi",d:"Cook 3 dishes.",n:3,p:function(){return S.cooked},r:{coins:80,item:"reese"}},
 {id:"q4",t:"Every flower",d:"Pick or grow all 4 kinds of flowers.",n:4,p:function(){return Object.keys(S.flowerLog).length},r:{coins:100}},
 {id:"q5",t:"Her favourites",d:"Give Danoya 3 gifts she loves.",n:3,p:function(){return S.lovedGifts},r:{coins:90,fp:40}},
 {id:"q6",t:"Shopkeeper's friend",d:"Sell 12 things.",n:12,p:function(){return S.sold},r:{coins:70}},
 {id:"q7",t:"The moon koi",d:"Catch the Moon koi: fish the lake (not the sea) between 8 pm and 5 am.",n:1,p:function(){return S.fishLog.koi?1:0},r:{coins:150}},
 {id:"q9",t:"Story night",d:"Join Elder Hesper's fire on the South Green (day 2 onwards, after 7 pm).",n:1,p:function(){return S.seen.camp?1:0},r:{coins:90,fp:30}},
 {id:"q10",t:"Hesper's library",d:"Read every book in Elder Hesper's Little Library, by the south road (open 9 am to 6 pm).",n:7,p:function(){return typeof BOOKS==="undefined"?0:BOOKS.filter(function(b){return !b.c2&&S.seen["bk_"+b.id]}).length},r:{coins:80,fp:20}},
 {id:"q8",t:"Fisher of hearts",d:"Catch The Danoya-fish: fish the lake between 8 pm and 5 am while it is raining.",n:1,p:function(){return S.fishLog.dfish?1:0},r:{coins:300,fp:60}}
];
function nextGoal(){for(var i=0;i<QUESTS.length;i++){var q=QUESTS[i];if(S.claimed[q.id])continue;var p=Math.min(q.n,q.p());if(p>=q.n)return "Goal complete: "+q.t+". Claim it in Menu \u2192 Goals";return "Goal: "+q.d.replace(/\.$/,"")+(q.n>1?" ("+p+"/"+q.n+")":"")}return ""}
function tabQuests(mb){
  h4(mb,"Goals");QUESTS.forEach(function(q){var p=Math.min(q.n,q.p()),done=!!S.claimed[q.id],can=p>=q.n&&!done;
    mb.appendChild(mrow(done?"✅":"📌",q.t+" ("+p+"/"+q.n+")",q.d+" Reward: 🪙"+q.r.coins+(q.r.item?" + "+IT[q.r.item].n:"")+(q.r.fp?" + 💗":""),done?"":"Claim",function(){claimQ(q)},!can,done))});
  h4(mb,"Heart events");EVT.forEach(function(e){mb.appendChild(mrow(S.seen[e.id]?"💗":"🔒",S.seen[e.id]?e.title:"???",S.seen[e.id]?"Seen":"Reach "+e.h+" hearts"+(e.needHome?" and build your home":"")+(e.needCamp?" and finish Lantern Night":""),null,null,0,!!S.seen[e.id]))})}
function claimQ(q){S.claimed[q.id]=1;S.coins+=q.r.coins;S.totalCoins+=q.r.coins;if(q.r.item)give(q.r.item);if(q.r.fp)addFP(q.r.fp);sfxPlay("coin");toast("Goal complete! +🪙"+q.r.coins);celebrate(q.t);paintHud();renderMenu()}
function tabLog(mb){
  h4(mb,"Flowers ("+Object.keys(S.flowerLog).length+"/4)");FN.forEach(function(n,i){mb.appendChild(mrow(S.flowerLog[i]?FE[i]:"❔",S.flowerLog[i]?n[0].toUpperCase()+n.slice(1):"???","",null,null,0,!!S.flowerLog[i]))});
  var fl=["carp","sunfish","perch","eel","lcarp","koi","dfish","sardine","crab","tuna","squid","puffer"];
  h4(mb,"Fish ("+Object.keys(S.fishLog).filter(function(k){return fl.indexOf(k)>-1}).length+"/"+fl.length+")");fl.forEach(function(id){mb.appendChild(mrow(S.fishLog[id]?IT[id].e:"❔",S.fishLog[id]?IT[id].n+" ×"+S.fishLog[id]:"???",S.fishLog[id]?"":(id==="koi"?"At the lake, 8 pm to 5 am.":id==="dfish"?"At the lake, 8 pm to 5 am, only while it rains.":""),null,null,0,!!S.fishLog[id]))});
  h4(mb,"Dishes");RECIPES.forEach(function(r){mb.appendChild(mrow(S.dishLog[r.id]?r.e:"❔",S.dishLog[r.id]?r.n+" ×"+S.dishLog[r.id]:"???","",null,null,0,!!S.dishLog[r.id]))});
  if(typeof BOOKS!=="undefined"){var bk=BOOKS.filter(function(b){return !b.c2||CH2}),rd=bk.filter(function(b){return S.seen["bk_"+b.id]}).length;
    h4(mb,"Library ("+rd+"/"+bk.length+")");bk.forEach(function(b){var r=!!S.seen["bk_"+b.id],lock=b.c2&&!S.seen.camp;mb.appendChild(mrow(r?b.e:lock?"🔒":"❔",r?b.t:"???",r?"":lock?"Appears on the shelves after Lantern Night.":"Elder Hesper's Little Library, open 9 am to 6 pm.",null,null,0,r))})}}
function tabMap(mb){
  var K=12,c=document.createElement("canvas");c.id="mm";c.width=MW*K;c.height=MH*K;c.style.imageRendering="auto";var g=c.getContext("2d");
  var col={0:"#7cc766",1:"#e3c795",2:"#58b2f0",3:"#f5e6b8",4:"#3f9a46",5:"#9a6a40",6:"#c79a62",7:"#2f7fc4"};
  for(var y=0;y<MH;y++)for(var x=0;x<MW;x++){g.fillStyle=col[ground[ix(x,y)]];g.fillRect(x*K,y*K,K,K)}
  g.fillStyle="#2c7b36";props.forEach(function(p){if(p.k==="tree"){g.beginPath();g.arc(p.x*K+K/2,p.y*K+K/2,K*.42,0,7);g.fill()}});
  var bdone=[];function brect(b,roof){if(bdone.indexOf(b)>-1)return;bdone.push(b);g.fillStyle="#00000040";g.fillRect(b.x*K+3,b.y*K+3,b.w*K,b.h*K);g.fillStyle=roof;g.fillRect(b.x*K,b.y*K,b.w*K,b.h*K);g.lineWidth=3;g.strokeStyle="#fff";g.strokeRect(b.x*K,b.y*K,b.w*K,b.h*K)}
  var LG=[];function box(b,roof,name){brect(b,roof);LG.push(name);var bx=(b.x+b.w/2)*K,by=(b.y+b.h/2)*K;g.fillStyle="#fff";g.beginPath();g.arc(bx,by,13,0,7);g.fill();g.lineWidth=3;g.strokeStyle="#2a1a10";g.stroke();g.font="800 17px Figtree,system-ui,sans-serif";g.textAlign="center";g.textBaseline="middle";g.fillStyle="#2a1a10";g.fillText(String(LG.length),bx,by+1)}
  var LR=g.__lr=[];function lab(t,x,y,sz,col,ign,anc){sz=Math.round(sz*1.22);g.font="800 "+sz+"px Figtree,system-ui,sans-serif";var tw=g.measureText(t).width;
    function rc(px,py,w,h){return {x0:px-w/2-10,x1:px+w/2+10,y0:py-h/2-10,y1:py+h/2+10}}
    function ov(r){var a=0;for(var i=0;i<LR.length;i++){var q=LR[i];if(ign&&q.m===ign)continue;var w=Math.min(r.x1,q.x1)-Math.max(r.x0,q.x0),h=Math.min(r.y1,q.y1)-Math.max(r.y0,q.y0);if(w>0&&h>0)a+=w*h}return a}
    function fit(px,py,w,h){px=Math.max(w/2+4,Math.min(c.width-w/2-4,px));py=Math.max(h/2+4,Math.min(c.height-h/2-4,py));return [px,py]}
    var best=null,sc0=1;
    for(var tr=0;tr<3;tr++){
      var w2=tw*sc0,h2=sz*sc0,dd=h2*.9,dx=h2*.9,cand=[[0,0]];
      if(anc){var ax=(anc.x+anc.w/2)*K,ay0=anc.y*K,ay1=(anc.y+anc.h)*K,ax0=anc.x*K,ax1=(anc.x+anc.w)*K,am=(ay0+ay1)/2;cand=[[ax-x,ay0-h2/2-8-y],[ax-x,ay1+h2/2+8-y],[ax0-w2/2-8-x,am-y],[ax1+w2/2+8-x,am-y],[ax-x+w2*.35,ay0-h2/2-8-dd-y],[ax-x-w2*.35,ay1+h2/2+8+dd-y],[ax-x,ay0-h2/2-8-dd*1.6-y],[ax-x,ay1+h2/2+8+dd*1.6-y]]}
      if(!anc)for(var k=1;k<=5;k++){cand.push([0,-dd*k],[0,dd*k],[-(w2/2+dx)*(k>2?1:0)-dx*(k>2?0:0),-dd*(k>2?k-2:0)]);}
      if(!anc)cand.push([-w2*.5-dx,0],[w2*.5+dx,0],[-w2*.5-dx,-dd],[w2*.5+dx,-dd],[-w2*.5-dx,dd],[w2*.5+dx,dd],[-w2*.75,-dd*2],[w2*.75,-dd*2],[-w2*.75,dd*2],[w2*.75,dd*2],[-w2,0],[w2,0]);
      for(var ci=0;ci<cand.length;ci++){var f=fit(x+cand[ci][0],y+cand[ci][1],w2,h2),r=rc(f[0],f[1],w2,h2),a=ov(r)+Math.abs(cand[ci][0])*.02+Math.abs(cand[ci][1])*.02+tr*40;if(!best||a<best.a)best={a:a,x:f[0],y:f[1],sc:sc0};if(a<1&&tr===0)break}
      if(best.a<1)break;sc0*=.82}
    x=best.x;y=best.y;if(best.sc<1){sz=Math.round(sz*best.sc);g.font="800 "+sz+"px Figtree,system-ui,sans-serif";tw=g.measureText(t).width}
    LR.push({x0:x-tw/2-10,x1:x+tw/2+10,y0:y-sz/2-10,y1:y+sz/2+10});g.textAlign="center";g.textBaseline="middle";g.lineJoin="round";g.lineWidth=sz/3.2;g.strokeStyle="rgba(20,30,40,.9)";g.strokeText(t,x,y);g.fillStyle=col||"#fff";g.fillText(t,x,y)}
  if(!N.away)LR.push({x0:N.x*K+K/2-16,x1:N.x*K+K/2+16,y0:N.y*K+K/2-16,y1:N.y*K+K/2+16,m:"N"});LR.push({x0:P.x*K+K/2-16,x1:P.x*K+K/2+16,y0:P.y*K+K/2-16,y1:P.y*K+K/2+16,m:"P"});
  brect(BUILD.farm,BUILD.farm.roof);brect(BUILD.shop,BUILD.shop.roof);brect(BUILD.cot,BUILD.cot.roof);if(typeof VIL!=="undefined")VIL.forEach(function(b){brect(b,b.roof)});if(S.homeBuilt)brect(HOME,"#2f9d8f");
  [BUILD.farm,BUILD.shop,BUILD.cot].concat(typeof VIL!=="undefined"?VIL:[]).concat(S.homeBuilt?[HOME]:[]).forEach(function(b){LR.push({x0:b.x*K-2,x1:(b.x+b.w)*K+2,y0:b.y*K-2,y1:(b.y+b.h)*K+2,m:"b"})});
  if(!N.away)lab(MAPN.other,N.x*K+K/2,N.y*K+K/2-24,19,"#ffc9dd","N");lab("You",P.x*K+K/2,P.y*K+K/2-25,20,"#fff","P");
  box(BUILD.farm,BUILD.farm.roof,MAPN.farm);box(BUILD.shop,BUILD.shop.roof,"Shop");box(BUILD.cot,BUILD.cot.roof,MAPN.cot);if(typeof VIL!=="undefined")VIL.forEach(function(b){box(b,b.roof,b.lbl)});if(S.homeBuilt)box(HOME,"#2f9d8f","Our home");
  lab("🌲 Whispering Forest",12*K,11*K,24);lab("🌼 Flower Meadow",46*K,8*K,24);lab("⛲ Village",36*K,29*K,24);lab("🏖 Beach",40*K,42*K,24);lab("🌊 The Channel",20*K,45.8*K,22);lab("🎣 Lake",55*K,24.5*K,24);lab("🐟 Dock",48.5*K,30*K,17,"#ffe9a8");
  [[(typeof CH2!=="undefined"&&CH2?"🏮 Lantern Night":"🔥 Story Fire"),39.5,72.6],["🌉 South Bridge",36,46.2],["🥖 South Crossing",38,54.6],["🌾 Mira's Fields",14,60.5],["🍎 Orchard",50,62],["⛲ South Green",36.5,70.5],["🐝 Lio's Meadow",51,76.5],["🐑 Robin's Yard",13,74.5],["🦆 Mill Pond",28,89],["🌳 Hesper's Grove",51,89],["🏖 South Shore",30,96]].forEach(function(l){if(MH>=96)lab(l[0],l[1]*K,l[2]*K,19)});
  if(!S.homeBuilt)lab("🏡 Home plot",5*K,42.4*K,17,"#ffe9a8");
  lab("🌱 Plots",15.5*K,38.6*K,17,"#ffe9a8");lab("📋 Board",35*K,25*K,17,"#ffe9a8");
  var evLab=null;var ev=nextEvent();if(ev&&(hearts()<ev.h||(ev.needHome&&!S.homeBuilt)))ev=null;if(ev){var ex=ev.place[0]*K+K/2,ey=ev.place[1]*K+K/2;LR.push({x0:ex-18,x1:ex+18,y0:ey-18,y1:ey+18});evLab={ex:ex,ey:ey,t:S.min>=ev.t*60?(CH2?"He's waiting":"She's waiting"):"After "+hhmm(ev.t*60),x:ex,y:ey}}
  if(typeof secretMapMark==="function")secretMapMark(g,K,lab);
  if(typeof mapExtra==="function")mapExtra(g,K,lab);
  if(evLab){g.fillStyle="#ffc83d";g.beginPath();g.arc(evLab.ex,evLab.ey,15,0,7);g.fill();g.lineWidth=3;g.strokeStyle="#fff";g.stroke();lab("💌",evLab.ex,evLab.ey,20);var esz=14;g.font="800 "+esz+"px Figtree,system-ui,sans-serif";var ew=g.measureText(evLab.t).width+8,eh=esz+8,cands=[[0,-28],[0,30],[-ew/2-24,0],[ew/2+24,0],[0,-52],[0,54],[-ew/2-24,-26],[ew/2+24,-26],[-ew/2-24,26],[ew/2+24,26]],pick=null;
    function clash(r){return g.__lr.some(function(u){return r.x0<u.x1&&r.x1>u.x0&&r.y0<u.y1&&r.y1>u.y0})}
    for(var ci=0;ci<cands.length&&!pick;ci++){var cxp=Math.max(ew/2+2,Math.min(MW*K-ew/2-2,evLab.x+cands[ci][0])),cyp=Math.max(eh/2+2,Math.min(MH*K-eh/2-2,evLab.y+cands[ci][1])),rr={x0:cxp-ew/2,x1:cxp+ew/2,y0:cyp-eh/2,y1:cyp+eh/2};if(!clash(rr))pick={x:cxp,y:cyp,r:rr}}
    if(!pick)pick={x:evLab.x,y:evLab.y-28};
    g.textAlign="center";g.textBaseline="middle";g.lineJoin="round";g.lineWidth=5;g.strokeStyle="rgba(20,30,40,.92)";g.strokeText(evLab.t,pick.x,pick.y);g.fillStyle="#ffe9a8";g.fillText(evLab.t,pick.x,pick.y)}
  if(!N.away){var nx=N.x*K+K/2,ny=N.y*K+K/2;g.fillStyle="#ff6f9c";g.beginPath();g.arc(nx,ny,13,0,7);g.fill();g.lineWidth=3;g.strokeStyle="#fff";g.stroke()}
  var px=P.x*K+K/2,py=P.y*K+K/2;g.fillStyle="#1f2a4a";g.beginPath();g.arc(px,py,13,0,7);g.fill();g.lineWidth=4;g.strokeStyle="#fff";g.stroke();
  var wrap=document.createElement("div");wrap.style.cssText="overflow:visible;border:3px solid #6b4426;border-radius:10px;-webkit-overflow-scrolling:touch";c.style.cssText+="display:block;width:100%;border:0";wrap.appendChild(c);var zb=document.createElement("button");zb.className="mbtn";zb.style.cssText="margin:6px 0;font-size:1rem";var zoom=false;zb.textContent="🔍 Zoom in";zb.onclick=function(){zoom=!zoom;c.style.width=zoom?"230%":"100%";wrap.style.overflow=zoom?"auto":"visible";wrap.style.maxHeight=zoom?"62vh":"none";zb.textContent=zoom?"🔍 Zoom out":"🔍 Zoom in";if(zoom){setTimeout(function(){wrap.scrollLeft=Math.max(0,P.x/MW*c.clientWidth-wrap.clientWidth/2);wrap.scrollTop=Math.max(0,P.y/MH*c.clientHeight-wrap.clientHeight/2)},0)}};var jr=document.createElement("div");jr.style.cssText="display:flex;gap:6px;flex-wrap:wrap";zb.style.margin="6px 0";[["⬆ North","n"],["⬇ South valley","s"]].forEach(function(j){var jb=document.createElement("button");jb.className="mbtn";jb.style.cssText="margin:6px 0;font-size:1rem";jb.textContent=j[0];jb.onclick=function(){if(zoom){wrap.scrollTop=j[1]==="s"?c.clientHeight*.52:0}else{mb.scrollTop=j[1]==="s"?wrap.offsetTop+c.clientHeight*.5-20:0}};jr.appendChild(jb)});jr.insertBefore(zb,jr.firstChild);mb.appendChild(jr);mb.appendChild(wrap);var lg=document.createElement("div");lg.style.cssText="display:grid;grid-template-columns:1fr 1fr;gap:4px 10px;margin:8px 0;font-weight:800;font-size:.95rem";LG.forEach(function(n,i){var d=document.createElement("div");d.innerHTML='<span style="display:inline-block;min-width:22px;height:22px;line-height:22px;text-align:center;border-radius:50%;background:#fff;border:2px solid #2a1a10;margin-right:6px;font-size:.8rem">'+(i+1)+"</span>"+esc2(n);lg.appendChild(d)});mb.appendChild(lg);var p=document.createElement("p");p.style.fontWeight="700";p.textContent=MAPN.leg;mb.appendChild(p)}
function esc2(t){return String(t).replace(/[&<>]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;"}[c]})}
function tabHome(mb){
  h4(mb,"Our home");var pc=Math.min(100,Math.round(S.fund/5));
  mb.insertAdjacentHTML("beforeend",'<p>'+(S.homeBuilt?"Built! The nameplate says Doodi & Danoya.":S.homeDay?"Construction is done tomorrow morning.":"Donate to Mr. Rocket's building fund at the notice board in the village.")+'</p><div class="pb"><i style="width:'+pc+'%"></i></div><p class="mini">'+Math.min(500,S.fund)+' / 500 coins</p>')}
var HOWDAY='<div class="h4">How a day works</div><p>☀️ Each day runs from 6:00 am. Plant, fish, cook, talk to Danoya.</p><p>💗 <b>Heart events:</b> at 2, 4, 6, 8 and 10 hearts a special evening unlocks. When you reach those hearts, a 💌 appears on the <b>Map</b> (Menu → Map) where she is waiting. Go there after the time shown and press A. The goal bar at the top also tells you what is next.</p><p>🌙 Danoya heads home around 10 pm. At <b>midnight</b> you get a warning.</p><p>🛏 Be in bed by <b>1:00 am</b> (door of your cabin → Sleep). If you are not, you collapse, villagers carry you home, and you lose about 25% of your coins.</p><p>🎵 Music changes with the time of day, and plays something special on dates.</p>';
var MAPN={farm:"Our cabin",cot:"Danoya's cottage",other:"Danoya",leg:"🔵 You   🩷 Danoya   🟡 Where she's waiting for you"};
var armNew=0;
var armExit=0;
function tabMore(mb){
  mb.appendChild(mrow("⏳","Wait one hour","Pass time (up to midnight).","Wait",function(){S.min=Math.min(Math.max(1439,S.min),S.min+60);paintHud();toast("An hour passes…")}));
  mb.appendChild(mrow("🎵","Music",musicOn()?"On":"Off","Toggle",function(){setMusic(!musicOn());renderMenu()}));
  mb.appendChild(mrow("🔊","Sound effects",S.sfx?"On":"Off","Toggle",function(){S.sfx=!S.sfx;renderMenu()}));
  mb.appendChild(mrow("💾","Save","Saves automatically each morning.","Save",function(){save();toast("Saved")}));
  mb.appendChild(mrow("📷","Photo mode","Hides the buttons so you can take a screenshot. Tap or press Esc to leave.","Go",function(){if(window.photoMode)photoMode(true)}));
  mb.appendChild(mrow("🚪","Exit chapter","Saves, then returns to the start screen.",armExit?"Really?":"Exit",function(){if(!armExit){armExit=1;renderMenu();setTimeout(function(){armExit=0},3000)}else{save();if(/chapter[12]\.html$/.test(location.pathname))location.href="index.html";else location.reload()}}));
  mb.appendChild(mrow("🗑","New game","Erases your progress.",armNew?"Really?":"Reset",function(){if(!armNew){armNew=1;renderMenu();setTimeout(function(){armNew=0},3000)}else{ls(SAVEKEY,null);location.reload()}}));
  mb.insertAdjacentHTML("beforeend",HOWDAY+'<p class="mini">Controls: arrows / WASD to walk, Space or E for A, Esc or Q for the menu. On a phone, use the pad and the A button.</p>')}
/* ---------- gifts & talking ---------- */
var GIFTLINES={love:["Danoya: Oh. OH. This is exactly my kind of thing. How do you KNOW me like this?","Danoya: Stop it, I'm going to cry. In a good way. In a very good way.","Danoya: You remembered. You always remember. I'm keeping this forever."],
 like:["Danoya: Aww, that's thoughtful. Thank you!","Danoya: Ooh, nice. You're good at this.","Danoya: For me? You're sweet."],
 neutral:["Danoya: Oh! Thank you. I... will find a use for it.","Danoya: It's the thought that counts, right?"],
 hate:["Danoya: A boot. Wow. Romantic.","Danoya: I'm going to pretend you handed me something else."]};
var TALK=[
 ["Danoya: Morning. I'd say good morning, but my face is still loading.","Danoya: This valley has no Wi-Fi and somehow I'm calm. Suspicious.","Danoya: Are you farming or just standing there looking handsome?","Danoya: I saw a duck. I wanted you to know that."],
 ["Danoya: Tell me one thing you're proud of today.","Danoya: You get a smile from me. Don't spend it all in one place.","Danoya: Do the daffodils know they are my favourite?","Danoya: I dreamed we were in a very long queue and it was the best queue ever."],
 ["Danoya: I like it when you yap at me. Keep going. Tell me about the squash again.","Danoya: I keep humming the same three notes. I don't know where I learned them. It feels like they were waiting for me.","Danoya: Machu Picchu or Naples. Still can't decide. Maybe both, maybe soon.","Danoya: You're my favourite person to be quiet with.","Danoya: Come here a second. Okay, I just wanted you nearer."],
 ["Danoya: I'm yours, you know. Squash-wise and otherwise.","Danoya: Say my name again. I like how you say it.","Danoya: If this valley ever gets lonely, I'll just hold your hand and it won't.","Danoya: Come home to me, okay? Eventually. Soon. Whenever."]];
async function talkN(){
  var h=hearts();
  if(S.intro&&!S.meet){S.meet=1;await seq([["Danoya","Oh! You must be the new farmer. Doodi, right? The valley's been talking."],["Doodi","Guilty. I have a farm, a fishing rod and exactly one plan: say hello to you."],["Danoya","That's a good plan. Be careful, I'm very easy to impress and very hard to forget."],["Doodi","Noted. Both."]]);if(S.talked!==S.day){S.talked=S.day;addFP(40)}return}
  var o=await ask("Danoya","Hi, Doodi. 💛",["Chat","Give a gift","Hug"+(h<4?" (4 hearts)":""),"Never mind"]);
  if(o===0){await say("Danoya",TALK[Math.min(3,Math.floor(h/3))][Math.floor(Math.random()*4)].replace("Danoya: ",""));if(S.talked!==S.day){S.talked=S.day;addFP(25)}}
  else if(o===1)await giftMenu();
  else if(o===2){if(h<4){await say("Danoya","Danoya: Aww, ask me again when we're a bit closer. 💛".replace("Danoya: ",""))}else if(S.hugged===S.day){await say("Danoya","Still warm from the last one. Ask me tomorrow, squash king.")}else{S.hugged=S.day;N.emote="🤗";P.d=P.x<N.x?1:P.x>N.x?3:P.d;await say("Danoya","SQUASH! 🤗 ...okay that was a good one. Don't tell anyone I made that noise.");N.emote=null;addFP(30)}}
}
function giftable(){return Object.keys(S.inv).filter(function(id){var k=IT[id].k;return k==="flower"||k==="gift"||k==="dish"||k==="fish"||k==="junk"})}
async function giftMenu(){
  var l=giftable();if(!l.length){await say("Doodi","(I have nothing to give. Flowers grow on the farm, snacks are at the shop.)");return}
  if(S.gifted>=2){await say("Danoya","You've spoiled me twice today already. Come back tomorrow, generous one.");return}
  var o=await ask("Give what?","Pick a gift for Danoya:",l.map(function(id){return IT[id].e+" "+IT[id].n+" ×"+S.inv[id]}).concat(["Never mind"]));
  if(o>=l.length)return;var id=l[o];take(id);S.gifted++;var g=IT[id].g||"neutral";
  var lines=GIFTLINES[g];await say("Danoya",lines[Math.floor(Math.random()*lines.length)].replace("Danoya: ",""));
  if(g==="love"){S.lovedGifts++;N.emote="💖";addFP(80);if(id==="fl1"&&!CH2){await say("Danoya","A daffodil. You remembered. It is my favourite, and now I am blushing in front of a flower.");addFP(40)}if(id==="koi"||id==="dfish"){await say("Danoya","Is this... a fish named after me? You absolute weirdo. I love it.");addFP(40)}}else if(g==="like"){N.emote="😊";addFP(45)}else if(g==="hate"){N.emote="😒";addFP(-30)}else{addFP(20)}
  setTimeout(function(){N.emote=null},2200)}
/* ---------- farming ---------- */
async function plotAct(x,y){
  var k=ix(x,y),c=plots[k];
  if(!c){var seeds=Object.keys(S.inv).filter(function(id){return IT[id].k==="seed"});
    if(!seeds.length){toast("No seeds. Buy some at the shop.");return}
    var o=await ask("Plant","Plant which seed?",seeds.map(function(id){return IT[id].e+" "+IT[id].n+" ×"+S.inv[id]}).concat(["Cancel"]));if(o>=seeds.length)return;
    var id=seeds[o];take(id);plots[k]={t:IT[id].t,a:0,w:S.rain};S.planted++;sfxPlay("pick");toast("Planted "+FN[IT[id].t]+" seeds"+(S.rain?" (the rain waters them)":""));return}
  if(c.a>=3){delete plots[k];var f="fl"+c.t;give(f);S.flowerLog[c.t]=1;sfxPlay("pick");toast("Harvested a "+FN[c.t]+"! "+FE[c.t]);return}
  if(!c.w&&!S.rain){c.w=true;sfxPlay("splash");toast("Watered. It grows overnight.");return}
  toast("Growing... ("+c.a+"/3 days)")}
function pickWild(w){S.wild=S.wild.filter(function(q){return q!==w});give("fl"+w.t);S.flowerLog[w.t]=1;sfxPlay("pick");toast("Picked a "+FN[w.t]+" "+FE[w.t])}
/* ---------- shop ---------- */
var DECOR=[["dmap",80],["danim",70],["dstrk",90],["dappa",85],["dmoon",60],["dphoto",50],["dcandle",45],["dfairy",110]];
var SHOP=[["sd0",14],["sd1",14],["sd2",18],["sd3",16],["dough",10],["cheese",14],["tomato",8],["water",6],["z7up",12],["reese",26],["plush",95],["book",55]];
var shopTab="buy";
function openShop(){
  showOv("");var oc=$("ovc");
  function r(){oc.innerHTML='<h3>Rocket & Co. General</h3><p class="mini">🪙 '+S.coins+'</p>';
    var tabs=document.createElement("div");tabs.style.cssText="display:flex;gap:6px;margin:6px 0";["buy","sell"].forEach(function(t){var b=document.createElement("button");b.className="mbtn";b.textContent=t==="buy"?"Buy":"Sell";b.style.flex="1";if(shopTab===t)b.style.background="#ffe3a8";b.onclick=function(){shopTab=t;r()};tabs.appendChild(b)});oc.appendChild(tabs);
    var list=document.createElement("div");list.style.textAlign="left";
    if(shopTab==="buy"){SHOP.forEach(function(s){list.appendChild(mrow(IT[s[0]].e,IT[s[0]].n,"🪙"+s[1],"Buy",function(){if(S.coins<s[1]){sfxPlay("bad");toast("Not enough coins");return}S.coins-=s[1];give(s[0]);sfxPlay("coin");paintHud();r()},S.coins<s[1]))});
      h4(list,"🏡 Home decor (shows in your cabin and our home)");DECOR.forEach(function(s){var own=!!(S.decor&&S.decor[s[0]]);list.appendChild(mrow(IT[s[0]].e,IT[s[0]].n,own?"Owned":"🪙"+s[1],own?"":"Buy",function(){if(S.coins<s[1]){sfxPlay("bad");toast("Not enough coins");return}S.coins-=s[1];S.decor=S.decor||{};S.decor[s[0]]=1;sfxPlay("chime");toast("Placed in your house: "+IT[s[0]].n);paintHud();r()},own||S.coins<s[1],own))})}
    else{var l=Object.keys(S.inv).filter(function(id){return IT[id].p>0&&IT[id].k!=="tool"});if(!l.length)list.innerHTML="<p>Nothing to sell yet.</p>";l.forEach(function(id){list.appendChild(mrow(IT[id].e,IT[id].n+" ×"+S.inv[id],"🪙"+IT[id].p+" each","Sell",function(){take(id);S.coins+=IT[id].p;S.totalCoins+=IT[id].p;S.sold++;sfxPlay("coin");paintHud();r()}))})}
    oc.appendChild(list);var c=document.createElement("button");c.className="mbtn";c.style.marginTop="8px";c.textContent="Leave";c.onclick=hideOv;oc.appendChild(c)}
  r()}
/* ---------- board / fund ---------- */
async function board(){
  var o=await ask("Notice board","Mr. Rocket's board. What now?",["Goals","Home fund ("+Math.min(500,S.fund)+"/500)","Leave"]);
  if(o===0){openMenu();menuTab="quests";renderMenu();return}
  if(o===1){
    if(S.homeBuilt){await say("Mr. Rocket","The home is built! Prepare for blasting off into a cosy life together.");return}
    if(S.homeDay){await say("Mr. Rocket","The crew is working. Come see it tomorrow morning.");return}
    var a=await ask("Mr. Rocket","Team Rocket Construction accepts coins, flowers and compliments. Mostly coins. Donate how much?",["50","100","All I have","Not now"]);
    if(a===3)return;var amt=a===0?50:a===1?100:S.coins;amt=Math.min(amt,S.coins,500-S.fund);if(amt<=0){toast("Nothing to donate");return}
    S.coins-=amt;S.fund+=amt;sfxPlay("coin");paintHud();
    if(S.fund>=500){S.homeDay=S.day;await say("Mr. Rocket","Prepare for trouble, and make it a double! The home is funded. The crew starts tonight. Sleep, and it will be there.")}
    else await say("Mr. Rocket","Thanks! "+(500-S.fund)+" coins to go. Blasting off at the speed of savings.")}}
/* ---------- fishing ---------- */
function startCast(wx,wy){
  var ocean=ground[ix(wx,wy)]===DW,wait_=1.2+Math.random()*2.6;if(S.rain)wait_*=.6;
  fish={bx:wx,by:wy,t:0,wait:wait_,bite:false,bt:0,ocean:ocean};sfxPlay("splash");toast("Cast… wait for the !")}
function fishUpdate(dt){
  if(!fish||ui)return;
  fish.t+=dt;if(!fish.bite&&fish.t>fish.wait){fish.bite=true;fish.bt=0;sfxPlay("pick")}
  if(fish.bite){fish.bt+=dt;if(fish.bt>.85){fish=null;toast("It got away…");sfxPlay("bad")}}}
function pickFish(ocean){
  var night=S.min>=20*60||S.min<5*60;
  if(!ocean){if(night&&Math.random()<.07)return "koi";if(night&&S.rain&&Math.random()<.06)return "dfish"}
  var t=ocean?OCEANFISH:LAKEFISH,tot=0;t.forEach(function(f){tot+=f[1]});var r=Math.random()*tot;for(var i=0;i<t.length;i++){r-=t[i][1];if(r<=0)return t[i][0]}return t[0][0]}
function fishDiff(id){var all=LAKEFISH.concat(OCEANFISH);for(var i=0;i<all.length;i++)if(all[i][0]===id)return all[i][2];return id==="koi"?48:id==="dfish"?55:20}
function reel(id,ocean){
  return new Promise(function(res){
    var d=fishDiff(id),v=0,tl=7.5,iv,done=false;
    showOv('<h3>Reel it in!</h3><p>Tap <b>A</b> (or this button) fast to fill the meter.</p><div class="meter"><i id="rm"></i></div><p id="rt">…</p><button class="big" id="rb" type="button">Reel! 🎣</button>');
    function fin(ok){if(done)return;done=true;clearInterval(iv);window.__reel=null;hideOv();res(ok)}
    function hit(){if(done)return;v=Math.min(100,v+(id==="boot"?40:11));sfxPlay("tap");var m=$("rm");if(m)m.style.width=v+"%";if(v>=100)fin(true)}
    $("rb").addEventListener("pointerdown",function(e){e.preventDefault();hit()});
    window.__reel=hit;
    iv=setInterval(function(){if(done)return;var m=$("rm");if(!m){done=true;clearInterval(iv);window.__reel=null;res(false);return}tl-=.05;v=Math.max(0,v-(d||10)*.05);m.style.width=v+"%";$("rt").textContent=Math.max(0,tl).toFixed(1)+"s";
      if(v>=100)fin(true);else if(tl<=0)fin(false)},50)})}
async function biteAct(){
  var f=fish;fish=null;var id=pickFish(f.ocean);var ok=await reel(id,f.ocean);
  if(!ok){sfxPlay("bad");toast("It slipped off the hook.");return}
  give(id);S.fishLog[id]=(S.fishLog[id]||0)+1;if(id!=="boot"&&id!=="bottle")S.caught++;sfxPlay("chime");
  if(id==="koi"||id==="dfish"){sfxPlay("chime");celebrate(id==="koi"?"Moon koi!":"The Danoya-fish!");await koiShow(id)}
  if(id==="dfish")await say("","You caught… The Danoya-fish. 💛 It has a tiny hijab and the exact smile you were thinking of. Legend says it likes being given to its namesake.");
  else if(id==="koi")await say("","The Moon koi shimmers silver in your hands. 🎏 Lucky catch.");
  else if(id==="bottle")await say("","A message in a bottle: 'Whoever finds this: someone on this beach is thinking about you. Go tell her.'");
  else toast("Caught: "+IT[id].e+" "+IT[id].n+"!")}
/* ---------- cooking ---------- */
function canMake(r){var ok=true;for(var k in r.need){var n=r.need[k];if(k==="flower"){var c=0;for(var i=0;i<4;i++)c+=has("fl"+i);if(c<n)ok=false}else if(k==="fish"){var c2=0;["carp","sunfish","perch","eel","lcarp","koi","sardine","tuna","crab","puffer","squid"].forEach(function(f){c2+=has(f)});if(c2<n)ok=false}else if(has(k)<n)ok=false}return ok}
function consume(r){for(var k in r.need){var n=r.need[k];if(k==="flower"){for(var i=0;i<4&&n>0;i++)while(has("fl"+i)&&n>0){take("fl"+i);n--}}else if(k==="fish"){["carp","sunfish","perch","sardine","crab","eel","lcarp","tuna","squid","puffer","koi"].forEach(function(f){while(has(f)&&n>0){take(f);n--}})}else take(k,n)}}
async function stove(){
  var o=await ask("Camp kitchen","What shall Chef Doodi cook?",RECIPES.map(function(r){return r.e+" "+r.n+(canMake(r)?"":" (missing)")}).concat(["Never mind"]));
  if(o>=RECIPES.length)return;var r=RECIPES[o];if(!canMake(r)){await say("",r.note+" You need: "+Object.keys(r.need).map(function(k){return (r.need[k]>1?r.need[k]+" ":"")+(k==="flower"?"any flower":k==="fish"?"any fish":IT[k].n)}).join(", ")+".");return}
  var stars=await stir();consume(r);
  if(stars===0){await say("","Oh no. It's black. It's smoking. It is no longer food. (Ingredients lost.)");return}
  give(r.id);S.cooked++;S.dishLog[r.id]=(S.dishLog[r.id]||0)+1;sfxPlay("chime");toast("Cooked "+r.e+" "+r.n+" "+"★".repeat(stars))}
function stir(){
  return new Promise(function(res){
    var hits=0,round=0,pos=0,dir=1,iv,speed=1.25;
    showOv('<h3>Stir it!</h3><p>Press <b>A</b> when the 🥄 is in the green. 3 rounds.</p><div id="sb" style="position:relative;height:34px;background:#e8d5b0;border:2px solid #6b4426;border-radius:10px;margin:10px 0"><div id="sz" style="position:absolute;top:0;bottom:0;background:#3ddc97;border-radius:8px"></div><div id="sp" style="position:absolute;top:-4px;font-size:26px">🥄</div></div><p id="sr"></p><button class="big" id="sbtn" type="button">Stir!</button>');
    var zs=0.2+Math.random()*.5,zw=.24;
    function setz(){zs=0.1+Math.random()*.6;$("sz").style.left=zs*100+"%";$("sz").style.width=zw*100+"%";$("sr").textContent="Round "+(round+1)+" / 3 · hits "+hits}
    setz();
    function press(){if(!iv)return;var ok=pos>=zs&&pos<=zs+zw;if(ok){hits++;sfxPlay("pick")}else sfxPlay("bad");round++;if(round>=3){clearInterval(iv);iv=null;window.__stir=null;hideOv();res(hits)}else{speed+=.35;setz()}}
    window.__stir=press;$("sbtn").addEventListener("pointerdown",function(e){e.preventDefault();press()});
    iv=setInterval(function(){pos+=dir*speed*.05;if(pos>=1){pos=1;dir=-1}if(pos<=0){pos=0;dir=1}$("sp").style.left="calc("+pos*100+"% - 13px)"},50)})}
/* ---------- events ---------- */
function activeEvent(){
  if(ui&&!menuOpen)return null;var e=nextEvent();if(!e)return null;if(hearts()<e.h)return null;if(e.needHome&&!S.homeBuilt)return null;if(e.needCamp&&!S.seen.camp)return null;if(S.min<e.t*60)return null;return e}
function checkEventReady(){var e=nextEvent();if(e&&hearts()>=e.h&&!(e.needHome&&!S.homeBuilt)&&!(e.needCamp&&!S.seen.camp)&&S.evNote!==e.id){S.evNote=e.id;setTimeout(function(){toast("💌 Heart event unlocked! "+OTHER+" waits at "+e.where+" after "+hhmm(e.t*60)+". Check Menu → Map for the 💌")},900)}}
async function startEvent(e){
  if(talking||S.seen[e.id])return;talking=true;setDate(true);
  await fadeOut();
  var sx=e.place[0],sy=e.place[1];var fr=freeNear(sx,sy);sx=fr[0];sy=fr[1];P.x=P.tx=sx;P.y=P.ty=sy;P.px=sx*T;P.py=sy*T;P.mv=0;
  var f2=freeNear(sx+1,sy,[sx,sy]);var nx=f2[0],ny=f2[1];
  N.x=N.tx=nx;N.y=N.ty=ny;N.px=nx*T;N.py=ny*T;N.mv=0;N.path=[];N.d=nx>sx?3:1;P.d=nx>sx?1:3;N.away=false;N.hold=true;setupScene(e.id);
  await fadeIn();
  await EVENTS[e.id]();stopSong(true,true);setDate(false);
  S.seen[e.id]=1;try{albumAdd("c"+(CH2?2:1)+"_"+e.id)}catch(x){}S.fp=Math.max(S.fp,e.h*100+50);capFP();
  await fadeOut();endScene();N.hold=false;N.goal=null;N.path=[];N.emote=null;S.min=Math.min(Math.max(1439,S.min),Math.max(S.min,e.t*60)+60);paintHud();await fadeIn();
  toast("💗 Heart event complete: "+e.title);sfxPlay("chime");talking=false;S.evNote=null;save();checkEventReady()}
function lovelyOv(title,msg,btn){if(typeof SAVEKEY!=="undefined"&&/cutscene-preview/.test(SAVEKEY))return wait(1800);return new Promise(function(res){showOv('<h3>'+title+'</h3><p>'+msg+'</p><button class="big" id="okb" type="button">'+btn+'</button>');$("okb").onclick=function(){hideOv();res()}})}
var EVENTS={
 e1:async function(){
  await seq([["Danoya","You came! I brought nothing, which is how I know you'll feed me."],["Doodi","Picnic rules: sit, share, and no one's allowed to be productive."],["Danoya","Love those rules."]]);
  var opts=[],ids=[];[["pizza","Pizza 🍕"],["cookie","Reese's cookies 🍪"],["reese","Reese's cups 🍫"],["water","Cold water 💧"]].forEach(function(o){if(has(o[0])){opts.push(o[1]);ids.push(o[0])}});opts.push("Just us, no food");ids.push(null);
  var c=await ask("Doodi","What goes on the blanket?",opts);var id=ids[c];
  if(id){take(id);await say("Danoya",id==="pizza"?"Pizza by a lake. You're basically a poet.":id==="water"?"Cold water. You know me too well. It's a little frightening.":"Reese's. Okay, I'm getting married. To the snack. And maybe also to you.")}
  else await say("Danoya","Just us? That's the best course on the menu.");
  await seq([["Danoya","In Middlesbrough it's probably raining right now."],["Doodi","Here the lake is on my side of the world, so you get the sunshine."],["Danoya","Then I'll borrow your sunshine. And I'll give it back with interest. In squashes."],["","Danoya laughs, and the laugh floats up over the lake. For a second there are two moons."]]);
  if(!id)give("water");toast("Gift from Danoya: Cold water 💧")},
 e2:async function(){
  await seq([["Danoya","This porch has one chair and two people. Planning issue."],["Doodi","Not an issue. I'll sit on the floor and you'll steal my hoodie."],["Danoya","Say less."],["","Two phones, two time zones, one porch. It is 8 pm in Ras Al Khaimah and 5 pm in Middlesbrough, and somehow it's the same minute here."]]);
  var c=await ask("Danoya","Put a song on?",["JoJo part 7 opening","Phoebe Bridgers","The Strokes","Surprise me"]);var played=playSong(["jojo","phoebe","strokes","any"][c]);if(!played&&c===2)await say("","(The Strokes track isn't loaded yet, so the porch is quiet. Doodi hums it instead.)");
  await say("Danoya",["Oh, I see. We're doing the dramatic thing tonight. I respect it.","Phoebe. Okay, we're going to be soft and slightly sad and extremely comfy.","Strokes. You're asking me to dance on a porch with one chair. Fine.","Surprise you? Okay. ...I picked the one with your name in it. In my head. Don't check."][c]);
  await seq([["Danoya","Can I tell you something? Sometimes I'm scared I'm not enough."],["Doodi","You're enough for me, just as you are. Caring, loving, gentle, warm. All of it."],["Danoya","...Say that again slower. I want to keep it."],["Doodi","You are enough. You are enough. You are enough."],["","She leans her head on your shoulder. The valley goes very quiet, the way places do when they're listening."]]);stopSong(false,true)},
 e3:async function(){
  await seq([["Danoya","Okay, you can keep yapping, but do it while looking up. Watch the sky."],["Doodi","I'm watching. Also watching you watch the sky."],["Danoya","Doodi. Stars. Catch them. Make a wish. Go."]]);
  var got=await starGame();
  await seq([["Danoya",got>=5?"You caught them all. Show-off.":"You caught "+got+". It only takes one for the wish to count."],["Doodi","I made a wish on the brightest star tonight. It's a secret, but you're in it."],["Danoya","...Mine too. I think it was the same one."],["","The star you caught is warm in your hands. You put it in her pocket, which is the only safe place in the valley."]])},
 e4:async function(){
  try{playSong("date",true)}catch(e){}
  await seq([["","The Lantern Festival. The festival ground is strung end to end with lanterns, every one of them lit, and the whole valley has come. Danoya finds you before anyone else does."],["Baker Tom","(from the crowd, mouth full) I baked four hundred rolls for this! The pigeons have been informed!"],["Mira","(from a bench, ladle in hand) Eat first, dance after. Both can be done at once if you are careful."],["Tobi","(passing, very casual) I'm not following you two. I'm observing the lanterns. They are very observable."],["Captain Ferris","(pointing up) Mind the sky tonight, young farmer. Rocket has been loading tubes since dawn."],["Elder Hesper","Every lantern on this ground was bought, as they are every year. One day I would like them to be ours. But look at them anyway. A bought light is still a light."],["Danoya","There are lanterns. There's music. There are two feet, and I'd like to know what you'll do with yours."],["Doodi","Step on yours, mostly."],["Danoya","Perfect. Hit the beat anyway."]]);
  var s=await danceGame();
  await seq([["Danoya",s>=6?"Okay, who taught you? Be honest.":"We were both terrible and it was still the best dance of my life."],["Doodi","Squash?"],["Danoya","Squash. A long one. Under the lanterns. Nobody's watching."],["","The lanterns drift up like slow, warm stars. For one song, the distance between two countries is exactly zero."]])},
 e5:async function(){
  await seq([["Danoya","Doodi... what's this? There's a house where the empty plot was."],["Doodi","Read the nameplate."],["Danoya","'Doodi & Danoya.' ...You put my name next to yours on a door."],["Doodi","It's the only place I ever want it."]]);
  var c=await ask("Doodi","Come inside?",["Yes, come home 🏡","Squash first"]);
  if(c===1)await say("Danoya","Squash first. Always squash first.");
  await seq([["Danoya","There's a kettle. And a comfy chair. And a second chair. You made a second chair."],["Doodi","Come home to me, my queen. We can hang out, cuddle, and have the best of times."],["Danoya","I'm already home."],["","Doodi and Danoya close the door. Outside, the valley lights up one lantern at a time, like it knew."]]);
  S.endSeen=true;playSong("end");
  if(typeof SAVEKEY!=="undefined"&&/cutscene-preview/.test(SAVEKEY)){await wait(2500);return}
  await lovelyOv("DANOYA VALLEY · Chapter 1","You filled every heart, built a home, and made the whole valley glow.<br><br><b>Come to me whenever, my beautiful loving queen. 👑</b><br><br><i>Season 2 is only just beginning…</i><br><br><a href=\"chapter2.html\" target=\"_blank\" style=\"color:#d6336c;font-weight:800\">▶ Play Chapter 2 (you become Danoya)</a>","Keep playing");stopSong(false,true)}
};
function starGame(){
  return new Promise(function(res){
    var got=0,t=0,spawn,end,total=0;
    showOv('<h3>Catch the stars ✨</h3><p>Tap the falling stars. Catch 5!</p><div id="mgs"></div><p id="sc2">0 / 5</p>');
    var box=$("mgs");
    function sp(){if(total>=14){return}total++;var b=document.createElement("button");b.className="star";b.textContent="⭐";b.style.left=(8+Math.random()*80)+"%";b.style.animationDuration=(2.2+Math.random()*1.2)+"s";b.onpointerdown=function(e){e.preventDefault();got++;b.remove();sfxPlay("chime");$("sc2").textContent=got+" / 5"};box.appendChild(b);setTimeout(function(){b.remove()},3600)}
    window.__star=function(){var b=box.querySelector(".star");if(b){got++;b.remove();sfxPlay("chime");$("sc2").textContent=got+" / 5"}};
    spawn=setInterval(sp,900);sp();
    end=setInterval(function(){t++;if(t>=20||got>=5){clearInterval(spawn);clearInterval(end);window.__star=null;hideOv();res(got)}},1000)})}
function danceGame(){
  return new Promise(function(res){
    var seqd=[],i=0,hits=0,A=["▲","▶","▼","◀"],cur=0,to;
    for(var k=0;k<8;k++)seqd.push(Math.floor(Math.random()*4));
    showOv('<h3>Dance! 🏮</h3><p>Press the arrow shown, in time.</p><p id="da" style="font-size:3rem;margin:6px 0">?</p><div class="arrows" id="dar"></div><p id="ds">0 / 8</p>');
    var ar=$("dar");A.forEach(function(a,d){var b=document.createElement("button");b.type="button";b.textContent=a;b.onpointerdown=function(e){e.preventDefault();press(d)};ar.appendChild(b)});
    function show(){if(i>=8){window.__dance=null;hideOv();res(hits);return}cur=seqd[i];$("da").textContent=A[cur];to=setTimeout(function(){i++;show()},1100)}
    function press(d){if(i>=8)return;clearTimeout(to);var ok=d===cur;var b=ar.children[d];b.className=ok?"hit":"miss";setTimeout(function(){b.className=""},250);if(ok){hits++;sfxPlay("pick")}else sfxPlay("bad");$("ds").textContent=hits+" / 8";i++;setTimeout(show,320)}
    window.__dance=press;show()})}

function freeNear(x,y,not){for(var r=0;r<6;r++)for(var dy=-r;dy<=r;dy++)for(var dx=-r;dx<=r;dx++){if(Math.max(Math.abs(dx),Math.abs(dy))!==r)continue;var a=x+dx,b=y+dy;if(!inb(a,b)||solid[ix(a,b)]||ground[ix(a,b)]===WA||ground[ix(a,b)]===DW)continue;if(not&&not[0]===a&&not[1]===b)continue;return [a,b]}return [x,y]}

window.__dlgActors=function(){try{var sc=($("stage").clientHeight||400)/384,o=[];if(typeof P!=="undefined"&&typeof cam!=="undefined"){var y=(P.py-cam.y)*sc;o.push(y+30*sc,y-4*sc)}return o}catch(e){return []}};
window.__say=say;
window.__fit=fitDlg;
