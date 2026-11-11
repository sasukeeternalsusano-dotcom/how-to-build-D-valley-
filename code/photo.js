/* photo mode: hides the buttons and the HUD so the valley can be screenshotted. P key, the camera button, or More > Photo mode. Tap / Esc to leave. */
(function(){
var st=document.createElement("style");
st.textContent=".pm #hud,.pm #goal,.pm #ctl,.pm #toast,.pm .dpanel,.pm #dlg,.pm #hmu,.pm #hpm,.pm #exitch,.pm #cutback{display:none!important}#pmhint{position:fixed;left:50%;bottom:calc(14px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);background:rgba(0,0,0,.68);color:#fff;font:700 13px system-ui,sans-serif;padding:7px 14px;border-radius:999px;z-index:99998;opacity:0;transition:opacity .5s;pointer-events:none;white-space:nowrap}#pmhint.on{opacity:1}";
document.head.appendChild(st);
var h=document.createElement("div");h.id="pmhint";h.textContent="📷 Photo mode · tap or press Esc to leave";document.body.appendChild(h);
var on=false,ht=0,arm=0;
function ex(e){if(!on)return;e.preventDefault();e.stopPropagation();photoMode(false)}
window.photoMode=function(v){
  if(v===undefined)v=!on;if(v===on)return;
  if(v){
    try{if(typeof menuOpen!=="undefined"&&menuOpen&&typeof closeMenu==="function")closeMenu()}catch(e){}
    on=true;document.documentElement.classList.add("pm");h.classList.add("on");clearTimeout(ht);ht=setTimeout(function(){h.classList.remove("on")},2800);
    clearTimeout(arm);arm=setTimeout(function(){document.addEventListener("pointerdown",ex,true)},350);
  }else{
    on=false;clearTimeout(arm);document.removeEventListener("pointerdown",ex,true);document.documentElement.classList.remove("pm");h.classList.remove("on");
  }
};
document.addEventListener("keydown",function(e){
  var t=(e.target&&e.target.tagName)||"";if(t==="INPUT"||t==="TEXTAREA")return;
  if(on&&(e.key==="Escape"||e.key==="p"||e.key==="P")){e.preventDefault();e.stopPropagation();photoMode(false);return}
  if(!on&&(e.key==="p"||e.key==="P")&&!e.ctrlKey&&!e.metaKey&&!e.altKey){
    try{if(typeof talking!=="undefined"&&talking)return}catch(x){}
    photoMode(true)}
},true);
try{var hb=document.createElement("button");hb.id="hpm";hb.type="button";hb.textContent="📷";hb.setAttribute("aria-label","Photo mode");hb.style.cssText="background:none;border:0;font-size:1.05rem;cursor:pointer;padding:0 2px";hb.onclick=function(){photoMode(true)};document.getElementById("hud").appendChild(hb)}catch(e){}
})();
