/* ---------- music ---------- */
var VOL={m:1,s:1};try{var _vv=JSON.parse(localStorage.getItem("dv_vol")||"null");if(_vv){var _a=+_vv.m,_b=+_vv.s;if(!isNaN(_a))VOL.m=Math.max(0,Math.min(2,_a));if(!isNaN(_b))VOL.s=Math.max(0,Math.min(2,_b))}}catch(e){}
var SONGKEYS=["jojo","phoebe","strokes"];
var bgmEl=null,bgmKey=null,songEl=null,songOn=false,dateOn=false;
function musicOn(){return !S||S.music!==false}
function mkAudio(src,loop){var a=new Audio();a.loop=loop;a.preload="auto";a.src=src;
  if(src.indexOf("data:")!==0){a.addEventListener("error",function(){if(a.__fb)return;a.__fb=1;try{fetch(src).then(function(r){return r.blob()}).then(function(b){var was=!a.paused;a.src=URL.createObjectURL(b);if(was||a.__want){var p=a.play();if(p&&p.catch)p.catch(function(){})}}).catch(function(){})}catch(e){}})}
  return a}
function fadeTo(a,v,ms,done){if(!a)return;clearInterval(a.__f);var from=a.volume,t0=Date.now();a.__f=setInterval(function(){var k=Math.min(1,(Date.now()-t0)/ms);try{a.volume=Math.max(0,Math.min(1,from+(v-from)*k))}catch(e){}if(k>=1){clearInterval(a.__f);if(done)done()}},40)}
function wantKey(){if(!S||!musicOn()||songOn||document.hidden)return null;if(dateOn)return "date";if(window.__cutNoBgm)return null;var h=S.min/60;return (h>=6&&h<17)?"morn":"eve"}
function bgmSync(){
  var k=wantKey();
  if(k===bgmKey){if(k&&bgmEl&&bgmEl.paused&&!bgmEl.__pend){var p0=bgmEl.play();if(p0&&p0.catch)p0.catch(function(){})}return}
  var old=bgmEl;bgmKey=k;if(old)fadeTo(old,0,300,function(){try{old.pause()}catch(e){}});
  if(k&&TRK[k]){var ne=mkAudio(TRK[k],true);ne.volume=0;ne.__pend=true;bgmEl=ne;
    setTimeout(function(){ne.__pend=false;if(bgmEl!==ne)return;var p=ne.play();if(p&&p.catch)p.catch(function(){});fadeTo(ne,(k==="date"?.07:.05)*VOL.m,1000)},old?380:0)}
  else bgmEl=null}
function setMusic(on){S.music=on;bgmSync();if(songEl){if(on){songEl.play().catch(function(){});fadeTo(songEl,.1*VOL.m,300)}else fadeTo(songEl,0,300,function(){songEl&&songEl.pause()})}syncMuBtn()}
function playSong(key,loop){
  stopSong(true);var list=SONGKEYS.filter(function(k){return TRK[k]});
  if(key==="any")key=list[Math.floor(Math.random()*list.length)];
  if(!key||!TRK[key])return false;
  songOn=true;bgmSync();songEl=mkAudio(TRK[key],!!loop);songEl.volume=0;
  if(musicOn()){var el0=songEl,p=el0.play();if(p&&p.catch)p.catch(function(){var h=function(){document.removeEventListener("pointerdown",h,true);document.removeEventListener("keydown",h,true);document.removeEventListener("touchend",h,true);if(songEl===el0){var q=el0.play();if(q&&q.catch)q.catch(function(){})}};document.addEventListener("pointerdown",h,true);document.addEventListener("keydown",h,true);document.addEventListener("touchend",h,true)});fadeTo(songEl,.1*VOL.m,700)}
  return true}
function stopSong(quick,noResume){
  var s=songEl;songEl=null;if(s){fadeTo(s,0,quick?60:1500,function(){try{s.pause()}catch(e){}})}
  songOn=false;if(!noResume)bgmSync()}
function setDate(on){dateOn=on;bgmSync()}
document.addEventListener("visibilitychange",function(){if(document.hidden){if(bgmEl)bgmEl.pause();if(songEl)songEl.pause()}else{bgmKey=bgmKey&&null;bgmSync();if(songEl&&songOn&&musicOn())songEl.play().catch(function(){})}});
function syncMuBtn(){var b=$("hmu");if(b){b.textContent=musicOn()?"🎵":"🔇";b.setAttribute("aria-label",musicOn()?"Mute music":"Unmute music")}}
(function(){var b=document.createElement("button");b.id="hmu";b.type="button";b.style.cssText="background:none;border:0;font-size:1.15rem;cursor:pointer;padding:0 2px";b.onclick=function(){if(S)setMusic(!musicOn())};$("hud").appendChild(b)})();
