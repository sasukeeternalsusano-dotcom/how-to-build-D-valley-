/* shared exit for cutscene previews: remembers where to return (4 channels) and goes back to that chapter's cutscene selector */
(function(){
function chn(){var m=(location.pathname||"").match(/chapter(\d)/)||(location.href||"").match(/chapter(\d)/);return m?m[1]:(window.__CHN||"")}
function mark(n){
 try{localStorage.setItem("dv_back",n)}catch(e){}
 try{sessionStorage.setItem("dv_back",n)}catch(e){}
 try{window.name="dvback:"+n}catch(e){}
 try{document.cookie="dv_back="+n+";path=/;max-age=600;SameSite=Lax"}catch(e){}
}
window.cutExit=function(auto){
 var n=chn();
 try{if(window.__cutId&&typeof albumAdd==="function")albumAdd("c"+n+"_"+window.__cutId)}catch(e){}
 if(window.__noexit){window.__exited=n;return Promise.resolve()}
 if(window.__cutLeaving)return Promise.resolve();
 window.__cutLeaving=1;mark(n);
 try{window.__cutNoBgm=1;stopSong(false,true);bgmSync()}catch(e){}
 try{var d=document.getElementById("dlg");if(d)d.style.pointerEvents="none"}catch(e){}
 var blk=document.createElement("div");blk.style.cssText="position:fixed;inset:0;z-index:100000;background:#000;opacity:"+(auto?0:1)+";transition:opacity .9s ease;touch-action:none";document.body.appendChild(blk);
 try{var f=document.getElementById("fade");if(f)f.style.opacity=1}catch(e){}
 return new Promise(function(res){
  setTimeout(function(){blk.style.opacity=1},30);
  setTimeout(function(){
   var u="index.html#cuts-"+n;
   try{location.href=u}catch(e){}
   setTimeout(function(){try{location.replace(u)}catch(e){}},1500);
   setTimeout(res,2500);
  },auto?1000:0);
 });
};
})();
