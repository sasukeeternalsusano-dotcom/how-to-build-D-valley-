(function(){
function sidePanels(n,rows){
 var NAMES={"1":"The Courting","2":"Her Turn","3":"Below the Valley","4":"The Thin Place","5":"The Door"};
 var KEYS={"1":[["WASD / ↑←↓→","Walk"],["Space / E","A: talk, use"],["Esc / Q","Menu"]],"2":[["WASD / ↑←↓→","Walk"],["Space / E","A: talk, use"],["Esc / Q","Menu"]],"3":[["WASD / ↑←↓→","Walk"],["Space","Attack / lantern"],["Q","Swap hero"],["F","Stay / follow"],["X","Reset room"],["E","Ultimate (boss)"]],"4":[["WASD / ↑←↓→","Walk"],["Space","Talk, use"],["Q","Swap hero"],["M","Map"]],"5":[["WASD / ↑←↓→","Move"],["Space","Attack"],["F","Skill"],["Q","Swap hero"],["R","Team ultimate"]]};
 var TIPS={"1":"Talk to everyone, every day. Heart events unlock as hearts grow.","2":"Her turn: give gifts, visit, and say hello first.","3":"Stuck in a puzzle room? Press X to reset it.","4":"Danoya hears the spirits. Doodi can't. Swap often.","5":"Fill the team meter, then press R. The Sunbreaker is worth the wait."};
 var st=document.createElement("style");st.textContent='.dpanel{display:none;position:fixed;top:50%;transform:translateY(-50%);width:230px;box-sizing:border-box;padding:16px;border-radius:18px;border:3px solid var(--line,#2f827d);background:var(--panel,#173f43);color:var(--ink,#fff6e8);font:600 .9rem/1.4 system-ui,sans-serif;z-index:5;box-shadow:0 8px 24px rgba(0,0,0,.35)}html[data-lay="desktop"] .dpanel.on{display:block}.dpanel h4{margin:0 0 8px;font:900 1rem system-ui,sans-serif;color:var(--gold,#ffc83d)}.dpanel .kr{display:flex;align-items:center;justify-content:space-between;gap:8px;margin:7px 0}.dpanel kbd{background:var(--dark,#0b2a2d);color:var(--ink,#fff6e8);border:2px solid var(--line,#2f827d);border-bottom-width:4px;border-radius:8px;padding:2px 7px;font:800 .8rem system-ui,sans-serif;white-space:nowrap}.dpanel .kt{opacity:.9;text-align:right}.dpanel .sec{margin-top:12px;padding-top:10px;border-top:2px dashed var(--line,#2f827d)}.dpanel .sec b{display:block;color:var(--gold,#ffc83d);font:900 .78rem system-ui,sans-serif;letter-spacing:.06em;text-transform:uppercase;margin-bottom:4px}.dpanel .dbig{font:900 1.05rem system-ui,sans-serif}';
 document.head.appendChild(st);
 var L=document.createElement("aside");L.className="dpanel";L.id="dpl";var h='<h4>⌨ Controls</h4>';
 (KEYS[n]||[]).forEach(function(r){h+='<div class="kr"><kbd>'+r[0]+'</kbd><span class="kt">'+r[1]+'</span></div>'});
 h+='<div class="sec"><b>🎯 Current goal</b><div id="dpg">...</div></div>';
 h+='<div style="margin-top:10px;opacity:.7;font-size:.76rem">Want on-screen buttons? Settings → Layout → Phone.</div>';
 L.innerHTML=h;
 var R=document.createElement("aside");R.className="dpanel";R.id="dpr";
 R.innerHTML='<h4>Chapter '+n+'</h4><div class="dbig" style="margin-bottom:8px">'+NAMES[n]+'</div><div style="opacity:.92">'+TIPS[n]+'</div><div class="sec"><b>📍 Right now</b><div id="dpt">...</div></div><div class="sec" style="opacity:.8;font-size:.8rem">Esc / Q opens the Menu: goals, log, map and saves.</div>';
 document.body.appendChild(L);document.body.appendChild(R);
 function txt(id){var e=document.getElementById(id);return e?(e.innerText||e.textContent||"").replace(/\s+/g," ").trim():""}
 function pos(){var w=document.querySelector(".wrap");if(!w)return;var r=w.getBoundingClientRect();
  var room=Math.min(r.left,innerWidth-r.right)-20,pw=Math.min(260,room);
  var ok=document.documentElement.getAttribute("data-lay")==="desktop"&&pw>=150;
  L.classList.toggle("on",ok);R.classList.toggle("on",ok);if(!ok)return;
  L.style.width=R.style.width=pw+"px";L.style.left=Math.max(8,r.left-pw-12)+"px";R.style.left=(r.right+12)+"px";
  var g="";try{if(typeof goalText==="function"&&typeof S!=="undefined"&&S&&S.intro!==undefined)g=goalText()}catch(e){}if(!g)g=txt("goal");var gg=document.getElementById("dpg");if(gg)gg.textContent=(g||"Explore, talk to people, and see what happens.").replace(/^Goal:\s*/i,"");
  var t=document.getElementById("dpt");if(t){var hd=document.getElementById("hud"),parts=[];if(hd)Array.prototype.forEach.call(hd.children,function(c){var x=(c.innerText||c.textContent||"").replace(/\s+/g," ").trim();if(x&&!/^🎵|^🔇|^🔈/.test(x))parts.push(x)});t.textContent=parts.join("  ·  ")}}
 pos();window.addEventListener("resize",pos);setInterval(pos,700)}
try{
var m=location.pathname.match(/chapter(\d)\.html/);if(!m)return;var n=m[1];
if(/^#cut/.test(location.hash||""))return;var _skipCard=!!(window.__nosong&&window.__skipIntro);
var rows0=null;var key="dv_qs"+n;var seen=false;try{seen=localStorage.getItem(key)==="1"}catch(e){}
var T={
"1":["Walk","Arrows / WASD, or the on-screen pad"],"2":["Walk","Arrows / WASD, or the on-screen pad"],
"3":["Walk","Arrows / WASD, or the on-screen pad"],"4":["Walk","Arrows / WASD, or the on-screen pad"],"5":["Move","Arrows / WASD, or the on-screen pad"]};
var L={
"1":[["A  (Space / E)","Talk, use, pick up"],["Menu  (Esc / Q)","Map, log, shop, saves"],["Tip","Tap your lantern at night. Talk to everyone."]],
"2":[["A  (Space / E)","Talk, use, pick up"],["Menu  (Esc / Q)","Map, log, saves"],["Tip","This chapter is her turn: visit, give gifts, and say hello first."]],
"3":[["Space  /  A","Attack, or send Danoya's lantern pulse"],["Q  /  Swap","Switch hero"],["F  /  Stay","Partner stays put or follows"],["X","Reset a stuck puzzle room"],["E  /  Ult","SUNBREAKER, when the bond meter is full (boss)"]],
"4":[["Space  /  A","Talk, use"],["Q  /  Swap","Switch hero. Danoya sees spirits Doodi can't"],["M","Map"],["Goal","Do three kind deeds, then climb the hill"]],
"5":[["Space  /  A","Attack"],["F  /  Skill","Your hero's skill"],["Q  /  Swap","Switch hero"],["R  /  Team","Team ultimate when the meter is full"],["Top right","⌂ Chapters to leave and come back"]]};
var rows=(T[n]?[T[n]]:[]).concat(L[n]||[]);
try{sidePanels(n,rows)}catch(e){}
if(seen||_skipCard)return;
var d=document.createElement("div");d.id="qscard";
d.style.cssText="position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(0,0,0,.62);font-family:system-ui,sans-serif";
var h='<div style="max-width:360px;width:100%;background:var(--panel,#173f43);color:var(--ink,#fff6e8);border:3px solid var(--line,#2f827d);border-radius:18px;padding:18px 18px 16px;box-shadow:0 10px 30px rgba(0,0,0,.5)"><div style="font-weight:900;font-size:1.15rem;margin-bottom:10px">How to play · Chapter '+n+'</div>';
rows.forEach(function(r){h+='<div style="display:flex;gap:10px;margin:7px 0;font-size:.92rem;line-height:1.3"><b style="flex:0 0 118px;color:var(--gold,#ffc83d)">'+r[0]+'</b><span style="flex:1;min-width:0">'+r[1]+'</span></div>'});
h+='<button id="qsgo" type="button" style="margin-top:12px;width:100%;padding:12px;border-radius:14px;border:2px solid var(--line,#2f827d);background:var(--coral,#ff6f5e);color:#fff;font:900 1rem system-ui,sans-serif;cursor:pointer">Got it</button></div>';
d.innerHTML=h;document.body.appendChild(d);
var cardEl=d.firstChild;
function place(){if(!d.parentNode)return;var st=document.getElementById("stage")||document.querySelector(".wrap");if(!st||!cardEl)return;var r=st.getBoundingClientRect();if(r.height<50)return;
 var ch=cardEl.offsetHeight,vh=innerHeight,cy=r.top+r.height/2,top=Math.max(8,Math.min(vh-ch-8,cy-ch/2));
 d.style.alignItems="flex-start";d.style.paddingTop=top+"px"}
place();window.addEventListener("resize",place);var _pt=setInterval(function(){if(!d.parentNode){clearInterval(_pt);return}place()},300);
function close(){try{localStorage.setItem(key,"1")}catch(e){}d.remove()}
d.querySelector("#qsgo").onclick=close;
}catch(e){}})();
