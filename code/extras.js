/* shared extras: memory album unlocks, the lantern drawing used in Ch2 (maker) and Ch5 (festival) */
(function(){
/* the "new memory" pop-up waits until the scene is over: no dialogue box and no overlay for a couple of seconds */
var pend=0,quiet=0;
setInterval(function(){
  if(!pend)return;
  try{var d=document.getElementById("dlg"),o=document.getElementById("ov"),busy=(d&&!d.hidden)||(o&&!o.hidden);
    if(busy){quiet=0;return}
    if(++quiet<3)return;
    quiet=0;pend=0;if(typeof window.__toast==="function")window.__toast("📸 A new memory is in the album")}catch(e){pend=0}
},700);
window.albumAdd=function(id){
  try{
    var a=[];try{a=JSON.parse(localStorage.getItem("dv_album")||"[]")}catch(e){a=[]}
    if(!Array.isArray(a))a=[];
    if(a.indexOf(id)>=0)return;
    a.push(id);localStorage.setItem("dv_album",JSON.stringify(a));
    if(!window.__cutId)pend++;
  }catch(e){}
};

/* the shrine on the north hill, one design for every chapter. g = 2d context; (px,py) top-left of its footprint, w x h px; dx = left edge of the 32px door tile; k = rune glow 0..1 */
window.drawShrine=function(g,px,py,w,h,dx,k,o){o=o||{};var T=32,s=w/160;
  function R(x,y,ww,hh,c){g.fillStyle=c;g.fillRect(Math.round(x),Math.round(y),Math.round(ww),Math.round(hh))}
  R(px-6,py+h-6,w+12,9,"#00000028");
  R(px-4,py+h-14,w+8,14,"#7e828d");R(px-4,py+h-14,w+8,2,"#a9adb6");
  R(dx-10,py+h-6,T+20,6,"#8f939c");R(dx-6,py+h-10,T+12,4,"#a3a7b0");
  R(px+2,py+30,w-4,h-44,"#9ca0aa");
  for(var yy=py+40;yy<py+h-14;yy+=12)R(px+2,yy,w-4,1,"#8a8e98");
  for(var row=0,y2=py+30;y2<py+h-14;y2+=12,row++)for(var xx=px+2+(row%2?14:0);xx<px+w-4;xx+=28)R(xx,y2,1,Math.min(12,py+h-14-y2),"#8a8e98");
  R(px+2,py+h-19,w-4,5,"#7e828d");
  [Math.round(10*s),Math.round(34*s),w-Math.round(38*s),w-Math.round(14*s)].forEach(function(q){R(px+q,py+38,5,h-58,"#6a6e78");R(px+q+1,py+38,1,h-58,"#7e828d")});
  R(px-12,py+16,w+24,16,"#7a2530");R(px-12,py+28,w+24,4,"#5a1820");
  R(px-18,py+12,10,6,"#7a2530");R(px+w+8,py+12,10,6,"#7a2530");R(px-20,py+8,5,6,"#9a3040");R(px+w+15,py+8,5,6,"#9a3040");
  R(px+4,py-4,w-8,22,"#9a3040");for(var t=px+8;t<px+w-8;t+=8)R(t,py-4,1,22,"#7a2530");
  R(px+4,py-4,w-8,3,"#b84050");
  R(px+16,py-12,w-32,9,"#7a2530");R(px+16,py-12,w-32,2,"#9a3040");
  R(px+w/2-4,py-18,8,7,"#d9a441");R(px+w/2-2,py-21,4,3,"#ffd34d");
  var dh=Math.min(50,h-46),dt=py+h-14-dh;
  R(dx-8,dt-2,T+16,dh+2,"#3a2418");R(dx-6,dt,T+12,dh,"#5b3a22");R(dx+15,dt,2,dh,"#3a2418");
  for(var bo=0;bo<3;bo++){R(dx-2,dt+6+bo*Math.floor(dh/3.4),4,4,"#2a1a10");R(dx+T-2,dt+6+bo*Math.floor(dh/3.4),4,4,"#2a1a10")}
  var by=dt+Math.round(dh*.42);R(dx-8,by,T+16,6,"#2a1a10");R(dx-6,by+1,3,3,"#d9a441");R(dx+T+3,by+1,3,3,"#d9a441");
  R(dx-8,dt-8,T+16,6,"#7e828d");
  g.globalAlpha=.35+.45*(k==null?.5:k);["#b79cff","#ffd34d","#b79cff"].forEach(function(c,i){R(dx-2+i*14,dt-7,4,4,c)});g.globalAlpha=1;
  var ld=o.small?18:26;[dx-ld,dx+T+ld-8].forEach(function(lx){R(lx,py+h-22,8,10,"#8f939c");R(lx-2,py+h-30,12,8,"#a3a7b0");R(lx+2,py+h-28,4,4,"#ffd34d");R(lx-3,py+h-33,14,3,"#7e828d")});
  if(o.sign!==false){var sg=o.sign||"SHRINE";g.font="bold 8px sans-serif";var sw=Math.ceil(g.measureText(sg).width)+8;R(dx+16-sw/2,dt-18,sw,9,"#fff8e8");R(dx+16-sw/2,dt-18,sw,1,"#d9a441");g.fillStyle="#3a2616";g.textAlign="center";g.fillText(sg,dx+16,dt-11)}};
/* the Name-Moth keepsake pinned to Danoya's top (Chapter 4 reward, carried into Chapter 5) */
window.mothBadgeDraw=function(cx,x,y,time){var p=.5+.5*Math.sin(time*2.4),q=.5+.5*Math.sin(time*2.4+2.1);
  var O="#2a1840",A="rgb(255,"+Math.round(140+70*p)+",200)",B="rgb(110,"+Math.round(200+45*q)+",255)",C="#fff3c4";
  function px(dx,dy,c){cx.fillStyle=c;cx.fillRect(x+dx,y+dy,1,1)}
  [[-4,-3],[-3,-3],[-2,-3],[2,-3],[3,-3],[4,-3],[-4,-2],[4,-2],[-4,-1],[4,-1],[-3,0],[3,0],[-2,1],[2,1],[-1,2],[1,2],[0,3],[-1,-2],[1,-2],[0,-3]].forEach(function(o){px(o[0],o[1],O)});
  [[-3,-2],[-2,-2],[-3,-1],[-2,-1],[-1,-1],[-2,0],[-1,0],[-1,1]].forEach(function(o){px(o[0],o[1],A)});
  [[2,-2],[3,-2],[1,-1],[2,-1],[3,-1],[1,0],[2,0],[1,1]].forEach(function(o){px(o[0],o[1],B)});
  [[0,-2],[0,-1],[0,0],[0,1],[0,2]].forEach(function(o){px(o[0],o[1],C)});
  if(p>.9){px(5,-4,"rgba(255,255,255,.95)")}};
window.LCOL=[["Amber","#ffb35a"],["Rose","#ff8aa8"],["Sea","#6fd3c9"],["Lilac","#b79cff"],["Gold","#ffd34d"],["Plain paper","#f3e7c8"]];
window.LMARK=[["name","His name"],["notes","Three falling notes"],["sun","A small sun"],["star","A star"],["boat","A little boat"],["blank","Leave it blank"]];
window.lanternWords=function(d){
  if(!d)return "";
  var col=(LCOL[d.c]||LCOL[0])[0].toLowerCase(),mk={name:"his name",notes:"three small falling notes",sun:"a small sun",star:"a star",boat:"a little boat",blank:"nothing at all, held open"}[d.m]||"nothing at all";
  return col+" paper with "+mk;
};
/* draw a lantern with its top centre at (x,y). s = scale. g = a 2d context */
window.lanternDraw=function(g,x,y,s,d,glow){
  d=d||{c:0,m:"notes",t:""};var col=(LCOL[d.c]||LCOL[0])[1];
  g.save();g.translate(x,y);g.scale(s,s);
  if(glow){var r=g.createRadialGradient(0,52,4,0,52,70);r.addColorStop(0,"rgba(255,200,120,.55)");r.addColorStop(1,"rgba(255,200,120,0)");g.fillStyle=r;g.fillRect(-80,-20,160,150)}
  g.strokeStyle="#6b5a48";g.lineWidth=2;g.beginPath();g.moveTo(0,-24);g.lineTo(0,0);g.stroke();
  g.fillStyle="#3a2a1a";g.fillRect(-28,0,56,7);g.fillRect(-28,92,56,7);
  g.fillStyle=col;g.fillRect(-24,7,48,85);
  g.fillStyle="rgba(255,255,255,.22)";g.fillRect(-24,7,10,85);
  g.fillStyle="rgba(60,30,10,.18)";g.fillRect(14,7,10,85);
  g.strokeStyle="rgba(60,30,10,.35)";g.lineWidth=1;g.beginPath();g.moveTo(-8,7);g.lineTo(-8,92);g.moveTo(8,7);g.lineTo(8,92);g.stroke();
  g.strokeStyle="#4a2e18";g.fillStyle="#4a2e18";g.lineWidth=3;g.lineCap="round";
  var m=d.m;
  if(m==="notes"){[[-12,34,-5,43],[-3,46,4,55],[7,58,14,67]].forEach(function(q){g.beginPath();g.moveTo(q[0],q[1]);g.lineTo(q[2],q[3]);g.stroke()})}
  else if(m==="name"){g.font="bold 11px sans-serif";g.textAlign="center";g.fillText("DOODI",0,50);g.beginPath();g.arc(0,66,4.5,0,6.3);g.fill();for(var i=0;i<8;i++){var a=i/8*6.283;g.beginPath();g.moveTo(Math.cos(a)*7,66+Math.sin(a)*7);g.lineTo(Math.cos(a)*10,66+Math.sin(a)*10);g.lineWidth=1.5;g.stroke()}}
  else if(m==="sun"){g.beginPath();g.arc(0,50,8,0,6.3);g.fill();g.lineWidth=2;for(var j=0;j<10;j++){var b=j/10*6.283;g.beginPath();g.moveTo(Math.cos(b)*12,50+Math.sin(b)*12);g.lineTo(Math.cos(b)*18,50+Math.sin(b)*18);g.stroke()}}
  else if(m==="star"){g.beginPath();for(var k=0;k<10;k++){var rr=k%2?6:15,an=-1.5708+k*.62832;g.lineTo(Math.cos(an)*rr,50+Math.sin(an)*rr)}g.closePath();g.fill()}
  else if(m==="boat"){g.beginPath();g.moveTo(-14,58);g.lineTo(14,58);g.lineTo(8,66);g.lineTo(-8,66);g.closePath();g.fill();g.beginPath();g.moveTo(0,28);g.lineTo(0,57);g.lineTo(12,57);g.closePath();g.fill();g.lineWidth=2;g.beginPath();g.moveTo(0,28);g.lineTo(0,58);g.stroke()}
  g.restore();
};
})();
