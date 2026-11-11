try{var _nb=function(e){e.preventDefault()};["selectstart","contextmenu","gesturestart","gesturechange","dragstart"].forEach(function(n){document.addEventListener(n,_nb,{passive:false})});
var _ct=document.getElementById("ctl"),_cv=document.getElementById("cv");[_ct].forEach(function(el){if(!el)return;["touchstart","touchmove","touchend"].forEach(function(n){el.addEventListener(n,function(e){if(e.cancelable)e.preventDefault()},{passive:false})})});
var _st=document.createElement("style");_st.textContent="#ctl,#ctl *,#cv{-webkit-user-select:none!important;user-select:none!important;-webkit-touch-callout:none!important;touch-action:none!important;-webkit-tap-highlight-color:transparent}#ctl button{-webkit-appearance:none;appearance:none}";document.head.appendChild(_st)}catch(e){}
requestAnimationFrame(frame);
title();
})();
