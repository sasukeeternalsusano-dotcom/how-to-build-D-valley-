/* fixed analog joystick for the fighting chapters (3 and 5). Replaces the arrow pad on touch layouts.
   Feeds window.__joy {x,y} (magnitude 0..1) to stepHeroes, and keeps held[] in sync for anything that reads directions. */
(function(){
var dp=document.querySelector("#ctl .dp");if(!dp)return;
var st=document.createElement("style");
st.textContent="#ctl .dp.joy{display:block;grid-template-columns:none;grid-template-rows:none;width:162px;height:162px;position:relative;touch-action:none}"+
"#ctl .dp.joy>*{display:none!important}"+
"#ctl .dp.joy>.jb{display:block!important;position:absolute;inset:6px;border-radius:50%;background:radial-gradient(circle,var(--panel2) 0 55%,rgba(0,0,0,.18) 56% 100%);border:3px solid var(--line);box-sizing:border-box}"+
"#ctl .dp.joy>.jb:before,#ctl .dp.joy>.jb:after{content:'';position:absolute;left:50%;top:50%;width:62%;height:62%;transform:translate(-50%,-50%);border-radius:50%;border:2px dashed var(--line);opacity:.45}"+
"#ctl .dp.joy>.jb:after{width:0;height:0;border:0}"+
"#ctl .dp.joy>.jk{display:block!important;position:absolute;left:50%;top:50%;width:62px;height:62px;margin:-31px 0 0 -31px;border-radius:50%;background:var(--coral);border:3px solid var(--ink);box-shadow:0 3px 0 rgba(0,0,0,.35);pointer-events:none;transition:transform .12s ease-out}"+
"#ctl .dp.joy.on>.jk{transition:none}"+
"#ctl .dp.joy>.jt{display:block!important;position:absolute;inset:-26px;border-radius:50%}"+
"@media (max-width:380px){#ctl .dp.joy{width:146px;height:146px}#ctl .dp.joy>.jk{width:56px;height:56px;margin:-28px 0 0 -28px}}";
document.head.appendChild(st);
dp.classList.add("joy");
var jt=document.createElement("div");jt.className="jt";jt.setAttribute("aria-label","Joystick");
var jb=document.createElement("div");jb.className="jb";
var jk=document.createElement("div");jk.className="jk";
dp.appendChild(jt);dp.appendChild(jb);dp.appendChild(jk);
var J=window.__joy={x:0,y:0,on:false},pid=null;
function setHeld(x,y){try{if(typeof held==="undefined")return;var m=Math.hypot(x,y);
  if(m<.001){held[0]=held[1]=held[2]=held[3]=false;return}
  held[0]=y<-.38*m;held[2]=y>.38*m;held[1]=x>.38*m;held[3]=x<-.38*m}catch(e){}}
function upd(e){var r=dp.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2,R=r.width*.27;
  var dx=e.clientX-cx,dy=e.clientY-cy,d=Math.hypot(dx,dy);
  if(d>R){dx=dx*R/d;dy=dy*R/d;d=R}
  jk.style.transform="translate("+dx.toFixed(1)+"px,"+dy.toFixed(1)+"px)";
  var m=d/R;if(m<.2){J.x=J.y=0;setHeld(0,0);return}
  var mm=Math.min(1,(m-.2)/.65),ux=dx/d,uy=dy/d;
  /* snap gently to straight lines so pushing blocks and walking corridors stays clean */
  if(Math.abs(ux)<.26){ux=0;uy=uy>0?1:-1}else if(Math.abs(uy)<.26){uy=0;ux=ux>0?1:-1}
  J.x=ux*mm;J.y=uy*mm;setHeld(J.x,J.y)}
function end(e){if(pid===null||(e&&e.pointerId!==pid))return;pid=null;J.on=false;J.x=J.y=0;setHeld(0,0);dp.classList.remove("on");jk.style.transform=""}
dp.addEventListener("pointerdown",function(e){e.preventDefault();try{if(typeof ac==="function")ac()}catch(x){}pid=e.pointerId;J.on=true;dp.classList.add("on");try{dp.setPointerCapture(pid)}catch(x){}upd(e)});
dp.addEventListener("pointermove",function(e){if(e.pointerId!==pid)return;e.preventDefault();upd(e)});
["pointerup","pointercancel","lostpointercapture"].forEach(function(n){dp.addEventListener(n,end)});
window.addEventListener("blur",function(){end({pointerId:pid})});
document.addEventListener("visibilitychange",function(){if(document.hidden)end({pointerId:pid})});
})();
