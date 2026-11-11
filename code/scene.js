/* ---------- cutscene staging: blankets, chairs, sitting, particles ---------- */
var SCENE=null;
function sceneKind(id){return CH2?{e1:"dock",e2:"porch2",e3:"cook",e4:"dance",e5:"hill",sx:"tree"}[id]:{e1:"picnic",e2:"porch1",e3:"stars",e4:"dance",e5:"home",sx:"cove"}[id]}
function sceneMid(){return [(P.px+N.px)/2+16,(P.py+N.py)/2+16]}
function blanket(cxm,cym,w,h,c1,c2){R(cxm-w/2+2,cym-h/2+3,w,h,"#00000030");for(var yy=0;yy<h;yy+=8)for(var xx=0;xx<w;xx+=8)R(cxm-w/2+xx,cym-h/2+yy,8,8,((xx+yy)/8)%2?c2:c1);R(cxm-w/2,cym-h/2,w,2,"#ffffff66");R(cxm-w/2,cym+h/2-2,w,2,"#00000022")}
function floatHearts(mx,my,n){cx.font="15px serif";cx.textAlign="center";for(var i=0;i<n;i++){var ph=(time*.45+i/n)%1;cx.globalAlpha=Math.max(0,1-ph*ph);cx.fillText(i%2?"💗":"💛",mx+Math.sin(i*5+time*1.3)*18,my-14-ph*60)}cx.globalAlpha=1}
function fireflies(mx,my,n,r){for(var i=0;i<n;i++){var x=mx+Math.cos(time*.6+i*2.3)*r*(.5+(i%3)*.3),y=my-8+Math.sin(time*.8+i*1.7)*r*.55,a=.35+.65*Math.abs(Math.sin(time*2+i));cx.globalAlpha=a*.35;R(x-3,y-3,6,6,"#fff3a0");cx.globalAlpha=a;R(x-1,y-1,2,2,"#fffbd0")}cx.globalAlpha=1}
function wishBoats(mx,my){for(var i=0;i<6;i++){var ph=(time*.025+i/6)%1,x=mx-150+ph*300+Math.sin(time*.8+i*2)*4,y=my-62-(i%3)*14+Math.sin(time*1.1+i)*2,a=Math.min(1,ph*6)*Math.min(1,(1-ph)*6);cx.globalAlpha=a*.5;var g=cx.createRadialGradient(x,y,1,x,y,18);g.addColorStop(0,"rgba(255,214,120,.7)");g.addColorStop(1,"rgba(255,214,120,0)");cx.fillStyle=g;cx.fillRect(x-18,y-18,36,36);cx.globalAlpha=a;R(x-5,y,10,3,"#f4e9cf");R(x-3,y-3,6,3,"#fff3c4");R(x-1,y-7,2,4,"#ffb04a");cx.globalAlpha=a*.25;R(x-5,y+4,10,2,"#ffd98a")}cx.globalAlpha=1}
function wishStars(mx,my){for(var i=0;i<5;i++){var ph=(time*.09+i*.21)%1,x=mx-120+i*60+Math.sin(time+i)*5,y=my-30-ph*170;cx.globalAlpha=Math.sin(ph*3.14)*.9;R(x-1,y-1,3,3,"#fffbd0");R(x-3,y,7,1,"#ffe9a0");R(x,y-3,1,7,"#ffe9a0")}cx.globalAlpha=1}
function lanterns(mx,my,n){for(var i=0;i<n;i++){var ph=(time*.07+i/n)%1,x=mx+(i-n/2)*20+Math.sin(time*.9+i)*6,y=my+30-ph*190,a=Math.min(1,ph*8)*(1-Math.max(0,ph-.8)*5);cx.globalAlpha=a;var g=cx.createRadialGradient(x,y,1,x,y,22);g.addColorStop(0,"rgba(255,190,90,.55)");g.addColorStop(1,"rgba(255,190,90,0)");cx.fillStyle=g;cx.fillRect(x-22,y-22,44,44);R(x-4,y-6,8,10,"#ff9d3c");R(x-3,y-5,6,7,"#ffd27a");R(x-5,y-7,10,2,"#7a3b14");R(x-5,y+3,10,2,"#7a3b14")}cx.globalAlpha=1}
function steam(x,y,n){for(var i=0;i<n;i++){var ph=(time*.5+i/n)%1;cx.globalAlpha=.5*(1-ph);var r=3+ph*7;cx.fillStyle="#fff";cx.beginPath();cx.arc(x+Math.sin(i*3+time*2)*5,y-ph*34,r,0,7);cx.fill()}cx.globalAlpha=1}
function shooting(){var vw=VW*T,vh=VH*T;for(var i=0;i<2;i++){var ph=((time*.35+i*.5)%1);if(ph>.35)continue;var k=ph/.35,sx=cam.x+vw*(.9-i*.35)-k*vw*.5,sy=cam.y+20+i*40+k*vh*.35;var g=cx.createLinearGradient(sx,sy,sx+46,sy-22);g.addColorStop(0,"rgba(255,255,255,"+(1-k)+")");g.addColorStop(1,"rgba(255,255,255,0)");cx.strokeStyle=g;cx.lineWidth=2;cx.beginPath();cx.moveTo(sx,sy);cx.lineTo(sx+46,sy-22);cx.stroke()}}
function stringLights(x0,x1,y,n){for(var i=0;i<=n;i++){var x=x0+(x1-x0)*i/n,yy=y+Math.sin(i/n*Math.PI)*10;R(x,yy,2,2,"#6b4426");var c=["#ff6f9c","#ffd34d","#6fe0ff","#8fff9a"][i%4],a=.7+.3*Math.sin(time*3+i);cx.globalAlpha=.3*a;R(x-3,yy,8,8,c);cx.globalAlpha=1;R(x,yy+2,3,4,c)}}
function setupScene(id,force){
  var k=force||sceneKind(id);if(!k)return;
  P.ox=P.oy=N.ox=N.oy=0;SCENE={k:k};
  var s=SCENE;
  if(k==="camp"||k==="picnic"||k==="cove"||k==="tree"||k==="stars"||k==="cook"||k==="hill"||k==="dock"||k==="home"){P.sit=N.sit=true}
  if(k==="porch1"){N.sit=true;P.sit=true}
  if(k==="porch2"){N.x=N.tx=P.x;N.y=N.ty=P.y;N.px=P.px;N.py=P.py;N.sit=P.sit=true;P.ox=-2;P.oy=-9;P.d=N.d=2}
  if(k==="dock"){P.d=N.d=2}
  s.under=function(dr){
    var m=sceneMid(),mx=m[0],my=m[1];
    if(k==="dance"){DRESS=true;var sw=Math.sin(time*3);P.ox=sw*3;N.ox=-sw*3;P.oy=-Math.abs(sw)*3;N.oy=-Math.abs(Math.cos(time*3))*3;P.d=P.px<N.px?1:3;N.d=P.px<N.px?3:1}
    if(k==="camp"){var ring=["ralph","ferris","garo","mira","tobi","hesper","wren","rocket","tom","lio","ines","oru"];var ids={tom:"pim"};var cyc=my-58;
      for(var ci=0;ci<ring.length;ci++){(function(i){var th=Math.PI+.3+i*(Math.PI-.6)/(ring.length-1),ex=mx+Math.cos(th)*118,ey=cyc+Math.sin(th)*66,id=ids[ring[i]]||ring[i],dd=ex<mx-30?1:ex>mx+30?3:2;if(!VSPEC[id])return;dr.push({y:ey+10,f:function(){villager(ex-16,ey-30,dd,0,VSPEC[id],true)}})})(ci)}
      dr.push({y:cyc+66,f:function(){villager(mx-122,cyc+34,1,0,VSPEC.nell,true);drawDog(mx-100,cyc+60,true)}});dr.push({y:cyc+66,f:function(){villager(mx+84,cyc+34,3,0,VSPEC.judy,true)}});
      dr.push({y:cyc,f:function(){var fl=Math.sin(time*14)*2,fl2=Math.cos(time*11)*2;cx.globalAlpha=.28;cx.fillStyle="#ffb35a";cx.beginPath();cx.arc(mx,cyc,64+fl,0,7);cx.fill();cx.globalAlpha=.4;cx.beginPath();cx.arc(mx,cyc,34,0,7);cx.fill();cx.globalAlpha=1;
        for(var s2=0;s2<8;s2++){var a=s2/8*6.283;R(mx+Math.cos(a)*17-4,cyc+Math.sin(a)*9+2,8,6,"#6b6b72")}
        R(mx-14,cyc+2,28,5,"#4a2e18");R(mx-12,cyc-1,24,4,"#6b4426");R(mx-10,cyc-14-fl,20,14,"#ff7a2e");R(mx-6,cyc-22-fl2,12,12,"#ffb04a");R(mx-3,cyc-28+fl,6,10,"#ffd34d");R(mx-1,cyc-10,3,8,"#fff3a0");
        for(var sp=0;sp<7;sp++){var ph=(time*.7+sp/7)%1;cx.globalAlpha=1-ph;R(mx-10+Math.sin(sp*3+time*2)*14,cyc-24-ph*60,2,2,"#ffd34d")}cx.globalAlpha=1}})}
    if(k==="picnic")dr.push({y:my-60,f:function(){blanket(mx,my+6,112,50,"#d9423a","#fff4e0");R(mx-9,my-6,18,12,"#8a5a32");R(mx-8,my-8,16,3,"#a8703e");R(mx-5,my-12,4,5,"#e8c27a");R(mx+1,my-14,3,7,"#7ec3ee");R(mx-12,my+10,8,5,"#fff");R(mx+6,my+10,8,5,"#fff")}});
    if(k==="cove")dr.push({y:my-60,f:function(){blanket(mx,my+8,104,44,"#2f9d8f","#f1e7c7");R(mx-5,my-10,10,12,"#5a3a22");var fl2=Math.sin(time*16)*2;R(mx-4,my-16-fl2,8,8,"#ff7a2e");R(mx-2,my-19-fl2,4,6,"#ffd34d");cx.globalAlpha=.25;cx.fillStyle="#ffb35a";cx.beginPath();cx.arc(mx,my-8,34,0,7);cx.fill();cx.globalAlpha=1}});
    if(k==="tree")dr.push({y:my-60,f:function(){blanket(mx,my+8,112,46,"#8a4fd0","#f6e8ff");R(mx+36,my-34,4,40,"#6b4426");R(mx+30,my-40,16,6,"#c9a227");cx.save();cx.translate(mx+36,my-36);cx.rotate(-.6);R(0,-3,30,6,"#c9a227");R(24,-4,8,8,"#e7d38a");cx.restore();R(mx-34,my-4,12,14,"#cfe9ff");R(mx-35,my-6,14,3,"#8a8a95");var g2=Math.abs(Math.sin(time*3));cx.globalAlpha=.35+.4*g2;R(mx-31,my,6,8,"#ffe27a");cx.globalAlpha=1}});
    if(k==="stars"||k==="hill")dr.push({y:my-60,f:function(){blanket(mx,my+8,k==="hill"?96:100,44,k==="hill"?"#2f6fd0":"#7b4fc4",k==="hill"?"#7fb2ff":"#c3a8f2")}});
    if(k==="cook")dr.push({y:my-60,f:function(){blanket(mx,my+8,120,50,"#ff8f3d","#fff1c9");R(mx-14,my-2,28,6,"#00000033");R(mx-12,my-14,24,14,"#3a3a44");R(mx-14,my-16,28,4,"#555560");R(mx-16,my-12,4,3,"#555560");R(mx+12,my-12,4,3,"#555560");var fl=Math.sin(time*18)*2;R(mx-8,my-1,16,4,"#ff7a2e");R(mx-4,my-4-fl,8,4,"#ffd34d");R(mx-26,my+10,10,5,"#fff");R(mx+16,my+10,10,5,"#fff")}});
    if(k==="porch1"||k==="porch2")dr.push({y:N.py+T-3,f:function(){var cxp=N.px,cyp=N.py;R(cxp+3,cyp+27,26,5,"#00000030");R(cxp+5,cyp+4,22,24,"#a8703e");R(cxp+7,cyp+6,18,6,"#c9915a");R(cxp+5,cyp+18,22,10,"#8a5a32");R(cxp+3,cyp+8,3,22,"#6b4426");R(cxp+26,cyp+8,3,22,"#6b4426")}});
    if(k==="porch1")dr.push({y:P.py-20,f:function(){blanket(P.px+16,P.py+26,46,22,"#2f9d8f","#f1e7c7")}});
    if(k==="dock")dr.push({y:P.py+T+2,f:function(){[P,N].forEach(function(o,i){var hx=o.px+(i?22:20),hy=o.py+14,bx=o.px+(i?42:36),by=o.py+T*3+12+Math.sin(time*2.5+i*2)*1.5;cx.strokeStyle="#6b4426";cx.lineWidth=2;cx.beginPath();cx.moveTo(hx,hy);cx.lineTo(hx+10,hy+8);cx.stroke();cx.strokeStyle="#ffffffaa";cx.lineWidth=1;cx.beginPath();cx.moveTo(hx+10,hy+8);cx.lineTo(bx,by);cx.stroke();R(bx-3,by-3,6,6,"#ff5b5b");R(bx-3,by-3,6,3,"#fff");var r=(time*14+i*9)%18;cx.globalAlpha=Math.max(0,1-r/18);cx.strokeStyle="#fff";cx.beginPath();cx.ellipse(bx,by+3,r,r*.4,0,0,7);cx.stroke();cx.globalAlpha=1});var ph=(time*.4)%1;if(ph<.18){var fx=mx+60-ph*300,fy=my+T*2.2-Math.sin(ph/.18*Math.PI)*22;R(fx-4,fy-2,8,4,"#e8873a");R(fx+4,fy-3,3,6,"#e8873a");R(fx-4,fy-1,2,2,"#fff")}}});
    if(k==="dance"||k==="porch1"||k==="porch2"||k==="home"||k==="hill")dr.push({y:my-90,f:function(){}});
  };
  s.over=function(){
    var m=sceneMid(),mx=m[0],my=m[1];
    if(k==="dance"){stringLights(mx-110,mx+110,my-86,14);lanterns(mx,my,7);floatHearts(mx,my,5)}
    else if(k==="camp"){fireflies(mx,my-60,10,130)}
    else if(k==="picnic"){floatHearts(mx,my-6,5);for(var i=0;i<3;i++){var bx=mx+Math.sin(time*.7+i*2)*70,by=my-30+Math.cos(time*.9+i*3)*20;R(bx,by,3,3,i%2?"#ff9d3c":"#7ec3ee");R(bx+3,by-1,3,3,i%2?"#ffd27a":"#bfe3ff")}}
    else if(k==="cove"){stringLights(mx-100,mx+100,my-84,12);wishBoats(mx,my);wishStars(mx,my);fireflies(mx,my,8,90);floatHearts(mx,my,5);shooting()}
    else if(k==="tree"){stringLights(mx-100,mx+100,my-84,12);fireflies(mx,my,14,95);floatHearts(mx,my,5)}
    else if(k==="stars"){shooting();fireflies(mx,my,8,90);floatHearts(mx,my,3)}
    else if(k==="cook"){steam(mx,my-16,5);floatHearts(mx,my-4,4)}
    else if(k==="dock"){floatHearts(mx,my-8,4)}
    else if(k==="porch1"||k==="porch2"){stringLights(mx-70,mx+70,my-80,10);fireflies(mx,my,6,70);floatHearts(mx,my-8,k==="porch2"?5:3);var g=cx.createRadialGradient(mx+46,my-10,2,mx+46,my-10,48);g.addColorStop(0,"rgba(255,200,110,.28)");g.addColorStop(1,"rgba(255,200,110,0)");cx.fillStyle=g;cx.fillRect(mx-4,my-60,100,100)}
    else if(k==="home"){lanterns(mx,my,6);fireflies(mx,my,8,80);floatHearts(mx,my,5)}
    else if(k==="hill"){shooting();lanterns(mx,my,5);fireflies(mx,my,8,90);floatHearts(mx,my,5)}
  };
}
function endScene(){DRESS=false;P.sit=N.sit=false;P.ox=P.oy=N.ox=N.oy=0;SCENE=null}
/* ---------- goal celebration ---------- */
(function(){var st=document.createElement("style");st.textContent="#celeb{position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:30}#celeb i{position:absolute;top:-24px;font-style:normal;animation:cfall linear forwards}@keyframes cfall{to{transform:translateY(130vh) rotate(540deg);opacity:.9}}#celeb b{position:absolute;left:50%;top:34%;transform:translate(-50%,-50%) scale(.2);background:var(--gold,#ffd34d);color:#2a1a00;border-radius:18px;padding:12px 20px;font-size:1.15rem;font-weight:800;box-shadow:0 6px 0 #0003,0 0 40px #ffd34d99;animation:cpop 2.6s ease forwards;white-space:nowrap}@keyframes cpop{0%{transform:translate(-50%,-50%) scale(.2) rotate(-8deg);opacity:0}15%{transform:translate(-50%,-50%) scale(1.15) rotate(3deg);opacity:1}25%{transform:translate(-50%,-50%) scale(1) rotate(0)}85%{opacity:1}100%{transform:translate(-50%,-70%) scale(1);opacity:0}}";document.head.appendChild(st)})();
var celebEl=null;
function celebrate(msg){
  try{
    POSEU=time+2.6;var s=document.getElementById("stage");if(!s)return;
    if(celebEl&&celebEl.parentNode)celebEl.parentNode.removeChild(celebEl);
    var c=document.createElement("div");c.id="celeb";celebEl=c;
    var em=["🎉","✨","⭐","💖","🎊","💛","🌸"],h="";
    for(var i=0;i<34;i++){h+='<i style="left:'+(Math.random()*96)+'%;font-size:'+(14+Math.random()*16)+'px;animation-duration:'+(1.8+Math.random()*1.6)+'s;animation-delay:'+(Math.random()*.7)+'s">'+em[i%em.length]+'</i>'}
    h+='<b>🏆 '+(msg||"Goal complete!")+'</b>';c.innerHTML=h;s.appendChild(c);
    setTimeout(function(){if(c.parentNode)c.parentNode.removeChild(c)},4200);
    if(musicOn()){var a=new Audio(VICT);a.volume=Math.min(1,.5*VOL.m);var p=a.play();if(p&&p.catch)p.catch(function(){});
      var duck=[bgmEl,songEl].filter(Boolean);duck.forEach(function(b){b.__v=b.volume;try{b.volume=b.volume*.25}catch(e){}});
      setTimeout(function(){duck.forEach(function(b){try{fadeTo(b,b.__v,600)}catch(e){}})},5600)}
  }catch(e){}
}
var goalSig=null;
function goalCheck(){
  if(typeof secretNotify==="function"&&S&&S.claimed)secretNotify();
  var sg=[!!S.intro,!!S.meet,S.planted>=1,S.caught>=1,!!S.talked&&S.talked===S.day];
  if(goalSig){var ms=[null,"Found Doodi!","Planted a flower!","Caught a fish!","Said hello!"];
    for(var i=1;i<5;i++){if(!goalSig[i]&&sg[i]){if(i===1&&!CH2)continue;celebrate(ms[i]);break}}}
  goalSig=sg;
}
/* ---------- legendary catch showcase ---------- */
function bigFish(x,y,id,t){
  var w=Math.sin(t*6)*3,gold=id==="dfish";
  cx.save();cx.translate(x,y);cx.rotate(Math.sin(t*4)*.12);
  var g=cx.createRadialGradient(0,0,4,0,0,46);g.addColorStop(0,gold?"rgba(255,230,120,.7)":"rgba(190,230,255,.7)");g.addColorStop(1,"rgba(255,255,255,0)");cx.fillStyle=g;cx.fillRect(-50,-50,100,100);
  cx.fillStyle=gold?"#ffcf3d":"#eaf3ff";cx.beginPath();cx.ellipse(0,0,22,10,0,0,7);cx.fill();
  cx.fillStyle=gold?"#ff9f1c":"#ff7a3d";cx.beginPath();cx.ellipse(-5,-3,7,4,0,0,7);cx.fill();cx.beginPath();cx.ellipse(8,3,5,3,0,0,7);cx.fill();
  cx.fillStyle=gold?"#ffb703":"#cfe3ff";cx.beginPath();cx.moveTo(-20,0);cx.lineTo(-33,-9+w);cx.lineTo(-33,9+w);cx.closePath();cx.fill();
  cx.beginPath();cx.moveTo(-4,-9);cx.lineTo(4,-17);cx.lineTo(10,-8);cx.closePath();cx.fill();
  cx.fillStyle="#222";cx.beginPath();cx.arc(15,-2,2,0,7);cx.fill();cx.fillStyle="#fff";cx.fillRect(15,-3,1,1);
  if(gold){cx.font="10px serif";cx.textAlign="center";cx.fillText("💛",-2,4)}
  cx.restore();
}
function koiShow(id){
  return new Promise(function(res){
    try{
      var s=document.getElementById("stage");if(!s){res();return}
      var gold=id==="dfish",W=320,H=380,cv2=document.createElement("canvas");cv2.width=W*2;cv2.height=H*2;
      cv2.style.cssText="position:absolute;left:50%;top:50%;width:min(92%,340px);aspect-ratio:"+W+"/"+H+";transform:translate(-50%,-50%) scale(.3);opacity:0;transition:transform .5s cubic-bezier(.2,1.4,.4,1),opacity .4s;z-index:60;border-radius:20px;border:4px solid #fff8;box-shadow:0 0 60px "+(gold?"#ffd34d":"#8fd0ff")+"cc;image-rendering:pixelated";
      s.appendChild(cv2);requestAnimationFrame(function(){cv2.style.opacity=1;cv2.style.transform="translate(-50%,-50%) scale(1)"});
      var c2=cv2.getContext("2d"),t0=Date.now(),old=cx,stars=[];for(var i=0;i<40;i++)stars.push([Math.random()*W,Math.random()*H,Math.random()*6]);
      var title=gold?"THE DANOYA-FISH!":"MOON KOI!",sub=gold?"A legend of the rainy lake":"A silver legend of the night lake";
      function done(){cv2.style.opacity=0;cv2.style.transform="translate(-50%,-50%) scale(1.15)";setTimeout(function(){if(cv2.parentNode)cv2.parentNode.removeChild(cv2);res()},450)}
      function fr(){
        var t=(Date.now()-t0)/1000;if(t>4.6){done();return}
        c2.setTransform(2,0,0,2,0,0);
        var g=c2.createLinearGradient(0,0,0,H);g.addColorStop(0,gold?"#3b2a6b":"#0e1d4a");g.addColorStop(1,gold?"#7a4a8f":"#1d5a8a");c2.fillStyle=g;c2.fillRect(0,0,W,H);
        c2.save();c2.translate(W/2,170);for(var r=0;r<14;r++){c2.rotate(Math.PI/7+t*.05);c2.fillStyle="rgba(255,255,255,"+(r%2?.07:.0)+")";c2.beginPath();c2.moveTo(0,0);c2.lineTo(-30,-260);c2.lineTo(30,-260);c2.closePath();c2.fill()}c2.restore();
        stars.forEach(function(p,i){var a=.4+.6*Math.abs(Math.sin(t*2+p[2]));c2.globalAlpha=a;c2.fillStyle="#fff";c2.fillRect(p[0],(p[1]+t*8*(i%3))%H,2,2)});c2.globalAlpha=1;
        c2.fillStyle="#2a6aa8";c2.fillRect(0,290,W,H-290);c2.fillStyle="rgba(255,255,255,.18)";for(var k=0;k<6;k++){c2.fillRect((k*70+t*20)%W,300+k*12,40,2)}
        cx=c2;c2.setTransform(2*3,0,0,2*3,0,0);
        var px=(W/2)/3-16,py=232/3;POSEU=time+9;
        c2.save();c2.globalAlpha=1;person(px,py,2,ROLE.p,0,false);bigFish(W/2/3-2,(py-22)+Math.sin(t*5)*1.5,id,t);c2.restore();
        cx=old;
        c2.setTransform(2,0,0,2,0,0);
        for(var j=0;j<12;j++){var a2=t*2+j*.52,rr=50+((t*40+j*17)%90);c2.globalAlpha=Math.max(0,1-rr/140);c2.font="16px serif";c2.textAlign="center";c2.fillText(["✨","⭐","💫"][j%3],W/2+Math.cos(a2)*rr,115+Math.sin(a2)*rr*.8)}c2.globalAlpha=1;
        c2.font="800 26px Figtree,system-ui,sans-serif";c2.textAlign="center";c2.lineWidth=6;c2.strokeStyle="rgba(10,10,40,.85)";c2.strokeText(title,W/2,40+Math.sin(t*4)*2);c2.fillStyle=gold?"#ffe27a":"#e7f6ff";c2.fillText(title,W/2,40+Math.sin(t*4)*2);
        c2.font="700 14px Figtree,system-ui,sans-serif";c2.fillStyle="#fff";c2.fillText(sub,W/2,350);
        requestAnimationFrame(fr)}
      fr();
    }catch(e){res()}
  });
}
window.__koi=koiShow;
