(function(){try{var st=document.getElementById("stage");if(!st||document.getElementById("exitch"))return;
var b=document.createElement("button");b.id="exitch";b.type="button";b.textContent="⌂ Chapters";
b.style.cssText="position:absolute;top:4px;right:4px;z-index:60;font:800 10px system-ui,sans-serif;padding:4px 8px;border-radius:10px;border:2px solid var(--line);background:var(--panel);color:var(--ink);opacity:.82;cursor:pointer;touch-action:manipulation";
var armed=0,tm=0;
b.addEventListener("click",function(e){e.stopPropagation();if(!armed){armed=1;b.textContent="Tap again: leave";b.style.background="var(--abd)";clearTimeout(tm);tm=setTimeout(function(){armed=0;b.textContent="⌂ Chapters";b.style.background="var(--panel)"},3000);return}
try{if(typeof save==="function")save()}catch(x){}
try{if(typeof stopSong==="function")stopSong(true,true)}catch(x){}
location.href=location.href.replace(/chapter\d\.html.*$/,"index.html")+"#home"});
["pointerdown","touchstart","mousedown"].forEach(function(ev){b.addEventListener(ev,function(e){e.stopPropagation()},{passive:true})});
st.appendChild(b)}catch(e){}})();
