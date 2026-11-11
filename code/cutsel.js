/* ---------- Chapter 1 cutscene selector (title screen). Launched from the cutscene selector on the chapter page. Plays on a throwaway save; your real save is never touched. ---------- */
(function(){
var _t=title;
var CUTS=[["open","🎬 Opening","The anime-style opening montage"],["intro","🏡 First morning","Arriving in the valley"],["e1","🧺 The First Picnic","Heart event · 2 hearts"],["e2","🎧 Two Time Zones, One Porch","Heart event · 4 hearts"],["e3","🌠 Catching Stars","Heart event · 6 hearts"],["e4","🏮 The Lantern Dance","Heart event · 8 hearts"],["e5","🏡 Come Home to Me","Heart event · 10 hearts · the ending"],["camp","🔥 The Fire on the South Green","Elder Hesper's story night"],["sx","🌙 The Secret Cove","The secret scene"]];
function takeCut(){var id=null;try{id=localStorage.getItem("dv_cut");localStorage.removeItem("dv_cut")}catch(e){}if(!id){var h=(location.hash||"").replace("#","");if(h.indexOf("cut-")===0)id=h.slice(4)}return id}
function cutGate(f){showOv('<div id="title"><h3 class="tt">Danoya<br>Valley</h3><p class="hand" style="font-size:1.4rem">Cutscene</p><br><button class="big" id="cg" type="button">Play \u25b6</button></div>');document.getElementById("cg").onclick=function(){ac();hideOv();f()}}
title=function(){var id=takeCut();if(id&&CUTS.some(function(c){return c[0]===id})){cutGate(function(){play(id)});return}_t()};
function auto(v){return function(){toast("🎮 Minigame auto-completed for this preview");return new Promise(function(r){setTimeout(function(){r(v)},900)})}}
function backBtn(){if(document.getElementById("cutback"))return;var a=document.createElement("button");a.id="cutback";a.type="button";a.textContent="◀ All cutscenes";a.style.cssText="position:fixed;left:50%;transform:translateX(-50%);bottom:calc(8px + env(safe-area-inset-bottom,0px));z-index:99999;background:#fff;color:#7a2a40;font:800 13px system-ui,sans-serif;padding:6px 14px;border-radius:99px;border:0;box-shadow:0 2px 8px #0004";a.onclick=function(){cutExit(false)};document.body.appendChild(a)}
async function play(id){
  window.__cutId=id;SAVEKEY="danoya-cutscene-preview";
  starGame=auto(6);danceGame=auto(7);memGame=auto(4);fireflyGame=auto(3);
  S=fresh();plots={};spawnWild();S.intro=true;S.fp=1000;S.homeBuilt=true;S.day=5;S.min=14*60;S.claimed={};
  var _ev=EVT.filter(function(e){return e.id===id})[0];if(_ev){S.min=_ev.t*60+2;S.homeBuilt=!!_ev.needHome;S.fp=Math.max(0,_ev.h*100-20)}if(id==="camp"){S.homeBuilt=false;S.fp=100}
  P.x=P.tx=40;P.y=P.ty=23;P.px=40*T;P.py=23*T;P.mv=0;P.d=2;N.x=N.tx=41;N.y=N.ty=23;N.px=41*T;N.py=23*T;N.mv=0;N.path=[];N.away=false;
  if(id==="intro"){S.homeBuilt=false;S.day=1;S.min=6*60+20;S.fp=0;P.x=P.tx=9;P.y=P.ty=35;P.px=9*T;P.py=35*T;P.d=2;N.away=true}
  try{var _g=document.getElementById("goal");if(_g)_g.style.display="none"}catch(e){}
  applyHome();started=true;paintHud();syncMuBtn();window.__cutNoBgm=(id==="intro")?0:1;bgmSync();talking=false;
  if(id==="open"){await playOpening();await cutExit(true);return}
  backBtn();
  if(id==="intro"){talking=true;await seq([["","A warm wind from the lake. Your cabin has a creaky door and a very good view."],["","Paper lanterns are strung between the rooftops, unlit, waiting for a festival. Nobody can say who hung the first one. Nobody has asked in a long time."],["","Somewhere in this valley is someone you've been thinking about all along. Danoya."],["Doodi","Let's see where the valley goes."]]);talking=false}
  else if(id==="camp"){S.day=2;S.min=20*60;S.seen={};paintHud();await startCamp()}
  else if(id==="sx"){await startSecret()}
  else{await startEvent(EVT.filter(function(e){return e.id===id})[0])}
  await cutExit(true)}
})();
