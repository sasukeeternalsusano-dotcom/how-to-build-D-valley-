/* ---------- anime-style opening (song-synced montage built from the game itself) ---------- */
var CAMOV=null,ZM=1,OPNX=null,OPN_ON=false;
var _drawBase=draw;
draw=function(){cx.setTransform(SC*ZM,0,0,SC*ZM,0,0);_drawBase();cx.setTransform(SC,0,0,SC,0,0)};
(function(){var st=document.createElement("style");st.textContent="#opn{position:absolute;inset:0;z-index:90;overflow:hidden}#opc{position:absolute;inset:0;width:100%;height:100%}#opskip{position:absolute;right:10px;top:10px;z-index:95;background:#0009;color:#fff;border:2px solid #fff8;border-radius:99px;padding:6px 14px;font:800 .8rem Figtree,system-ui,sans-serif;cursor:pointer}";document.head.appendChild(st)})();
function openThen(cb){if(typeof OPN_SRC==="undefined"||typeof OPN_AN==="undefined"){cb();return}playOpening().then(cb)}
function ez(k){return k<0?0:k>1?1:k*k*(3-2*k)}
function lerp(a,b,k){return a+(b-a)*k}
var OPNSHOTS=function(){
  /* shot: {w weight, kind:"world"|"portrait"|"title", ...} ; coordinates are tiles */
  var P1=function(x,y,d){return [x,y,d===undefined?2:d]};
  if(!CH2)return [
   {w:3,kind:"title",big:"DANOYA VALLEY",sub:"a little world for two",bg:["#0e1d4a","#7a4a8f"]},
   {w:2,kind:"world",min:370,p:P1(9,33,2),cam:[9,31,1.2,9,33.5,2.0],cap:"DOODI",cpos:"bl"},
   {w:1.5,kind:"portrait",who:"doodi",bg:["#ffb35a","#e4572e"],cap:"DOODI",sub:"farmer. fisher. hopeless romantic"},
   {w:2,kind:"world",min:600,walk:{who:"n",from:[30,30],to:[37,30],d:1},p:P1(39,30,3),cam:[33,30,1.6,36.5,30,1.9],cap:"DANOYA",cpos:"br"},
   {w:1.5,kind:"portrait",who:"danoya",bg:["#ffd0e8","#b05cc0"],cap:"DANOYA",sub:"his favourite person"},
   {w:1.5,kind:"world",min:430,walk:{who:"p",from:[13,38],to:[19,38],d:1},cam:[16,38,1.7,18,38,1.9],cap:"SOW"},
   {w:1.5,kind:"world",min:460,scene:"dock",p:P1(46,30,2),n:P1(47,30,2),cam:[46.6,31.2,1.7,46.6,31.6,2.3],cap:"CAST"},
   {w:1.2,kind:"world",min:640,extras:[{id:"judy",x:37,y:30,d:3},{id:"rocket",x:32,y:22,d:2}],n:P1(35,30,1),p:P1(39,30,3),cam:[36.5,30,1.9,36.5,30,2.4],cap:"JUDY",cpos:"tl"},
   {w:1.2,kind:"portrait",who:"judy",bg:["#7fd8c8","#2f6f9d"],cap:"JUDY",sub:"Danoya's best friend"},
   {w:1,kind:"portrait",who:"rocket",bg:["#ffd34d","#e4572e"],cap:"MR. ROCKET",sub:"blast-off snacks"},
   {w:1,kind:"portrait",who:"wren",bg:["#b7e58a","#3f9a46"],cap:"GRANNY WREN",sub:"the four blooms"},
   {w:1,kind:"portrait",who:"ferris",bg:["#8fd0ff","#2f6fd0"],cap:"CAPT. FERRIS",sub:"the fisher's test"},
   {w:1,kind:"portrait",who:"mira",bg:["#ffd9a8","#c8603a"],cap:"MIRA",sub:"too much soup, always"},
   {w:1,kind:"portrait",who:"tobi",bg:["#bfe6ff","#3a8ad0"],cap:"TOBI",sub:"observing, not following"},
   {w:1,kind:"portrait",who:"pim",bg:["#fff0c8","#e0a040"],cap:"BAKER TOM",sub:"the only thing on time"},
   {w:1,kind:"portrait",who:"nell",bg:["#c8e8a0","#4a8a3a"],cap:"ROBIN",sub:"fences, carts, the occasional heart"},
   {w:2.5,kind:"world",min:1050,scene:"picnic",p:P1(43,27,1),n:P1(44,27,3),cam:[43.5,27.4,1.6,43.5,27.4,2.3],cap:"PICNIC",cpos:"bl"},
   {w:2.2,kind:"world",min:1000,walk:{who:"p",from:[20,38],to:[24,38],d:1},n:P1(26,38,3),cam:[23,38,1.4,25.5,38,1.8],cap:"WALK WITH ME",cpos:"tl"},
   {w:2.2,kind:"world",min:1190,rain:1,walk:{who:"p",from:[30,24],to:[35,24],d:1},n:P1(37,24,3),cam:[33.5,24,1.4,36,24,1.8],cap:"TWO TIME ZONES",cpos:"tl"},
   {w:3,kind:"world",min:1200,scene:"dance",p:P1(45,9,1),n:P1(46,9,3),cam:[45.5,9.4,1.8,45.5,9.4,2.6],cap:"LANTERN DANCE",cpos:"bl",pulse:1},
   {w:1.2,kind:"portrait",who:"dress",bg:["#e8dcf5","#8a5cf6"],cap:"THE DRESS",sub:"one night, one dance"},
   {w:2.2,kind:"koi",bg:["#06143a","#0a6a78"],cap:"THE MOON KOI",sub:"one in a thousand catches"},
   {w:1.5,kind:"world",min:1230,scene:"cook",p:P1(14,32,1),n:P1(15,32,3),cam:[14.6,32,1.8,14.6,32,2.4],cap:"COOK"},
   {w:2.5,kind:"world",min:380,scene:"home",p:P1(3,40,1),n:P1(4,40,3),cam:[3.6,39.5,1.4,3.6,40.5,2.2],cap:"COME HOME TO ME",cpos:"bl"},
   {w:2,kind:"world",min:1230,scene:"cove",p:P1(49,42,1),n:P1(50,42,3),cam:[49.6,42.4,1.6,49.6,42.4,2.4],cap:"THE WISHING COVE",cpos:"br"},
   {w:2.2,kind:"world",min:1260,scene:"cove",p:P1(49,42,1),n:P1(50,42,3),cam:[49.8,41.4,2.2,49.8,41.8,1.5],cap:"MAKE A WISH",cpos:"bl"},
   {w:4,kind:"title",big:"CHAPTER 1",sub:"Doodi, Danoya & a valley full of hearts",bg:["#ffb35a","#e4572e"],end:1}];
  return [
   {w:3,kind:"title",big:"CHAPTER 2",sub:"her turn",bg:["#0e1d4a","#1d5a8a"]},
   {w:2,kind:"world",min:370,p:P1(39,22,2),cam:[39.5,19.5,1.1,39.5,22.2,1.8],cap:"DANOYA",cpos:"bl"},
   {w:2,kind:"portrait",who:"danoya",bg:["#ffd0e8","#2f6fd0"],cap:"DANOYA",sub:"the girl who crossed the world"},
   {w:1.6,kind:"world",min:480,walk:{who:"p",from:[36,27],to:[43,27],d:1},cam:[38,27,1.6,42,27,1.8],cap:"FIND HIM"},
   {w:2,kind:"portrait",who:"doodi",bg:["#9be0ff","#2f6fd0"],cap:"DOODI",sub:"the boy in the story"},
   {w:2,kind:"portrait",who:"judy",bg:["#7fd8c8","#2f6f9d"],cap:"JUDY",sub:"her best friend"},
   {w:1.6,kind:"portrait",who:"dan",bg:["#ffb35a","#e4572e"],cap:"DAN",sub:"Doodi's best friend"},
   {w:2.5,kind:"world",min:900,scene:"fields",p:P1(71,6,1),n:P1(72,6,3),cam:[71.6,6.4,1.6,71.6,6.4,2.3],cap:"KITES & SUNFLOWERS",cpos:"tl"},
   {w:2.5,kind:"world",min:800,scene:"market",p:P1(85,18,1),n:P1(86,18,3),cam:[85.6,18.4,1.5,85.6,18.4,2.2],cap:"MARKET DAY",cpos:"br"},
   {w:2.5,kind:"world",min:1320,scene:"scope",p:P1(96,8,1),n:P1(97,8,3),cam:[96.6,8.4,1.6,96.6,8.4,2.3],cap:"THE OBSERVATORY",cpos:"bl"},
   {w:1.5,kind:"portrait",who:"rocket",bg:["#ffd34d","#e4572e"],cap:"MR. ROCKET",sub:"the shopkeeper"},
   {w:1.5,kind:"portrait",who:"ferris",bg:["#8fd0ff","#2f6fd0"],cap:"CAPT. FERRIS",sub:"the sea hums at night"},
   {w:1.2,kind:"portrait",who:"hesper",bg:["#e8dcf5","#6a4aa0"],cap:"ELDER HESPER",sub:"there's a door under the hill"},
   {w:1.2,kind:"portrait",who:"lio",bg:["#ffe27a","#e0a020"],cap:"LIO",sub:"bees with opinions"},
   {w:1.2,kind:"portrait",who:"ines",bg:["#9fd8ff","#2f7fb8"],cap:"INES",sub:"fishes for the quiet"},
   {w:1.2,kind:"portrait",who:"garo",bg:["#d7b58a","#8a5a2a"],cap:"MILLER GARO",sub:"the wheel turns the right way"},
   {w:3.5,kind:"world",min:1060,scene:"pier",p:P1(90,43,1),n:P1(91,43,3),cam:[91.2,42.6,1.35,90.9,42.3,1.9],cap:"THE LAST FERRY",cpos:"tl",pulse:1},
   {w:2,kind:"portrait",who:"dress",bg:["#e8dcf5","#8a5cf6"],cap:"THE DRESS",sub:"the most special night"},
   {w:3,kind:"world",min:1290,scene:"gate",p:P1(95,34,0),n:P1(96,34,0),cam:[95.6,33.6,1.5,95.6,32.8,2.2],cap:"THE SOUTHERN GATE",cpos:"br"},
   {w:3,kind:"world",min:1230,scene:"balcony",p:P1(23,9,2),n:P1(24,9,2),cam:[23.6,7.6,1.05,23.6,8.0,1.5],cap:"THE TREEHOUSE",cpos:"bl"},
   {w:2.4,kind:"world",min:900,walk:{who:"p",from:[80,10],to:[71,10],d:3},n:P1(69,10,1),cam:[77,10,1.5,70.5,10,1.8],cap:"RUN TO HIM",pulse:1},
   {w:5,kind:"title",big:"DANOYA VALLEY",sub:"Chapter 2 · her turn",bg:["#ffd0e8","#2f6fd0"],end:1}]};
function playOpening(){
  return new Promise(function(res){
    var D=OPN_AN.dur,strong=OPN_AN.strong,shots=OPNSHOTS(),W=0;shots.forEach(function(s){W+=s.w});
    var b=[0],acc=0;shots.forEach(function(s,i){acc+=s.w;var t=acc/W*D;if(i<shots.length-1){var best=t,bd=.34;strong.forEach(function(x){if(Math.abs(x-t)<bd){bd=Math.abs(x-t);best=x}});if(best-b[b.length-1]<1)best=Math.max(t,b[b.length-1]+1);t=best}else t=D+1;b.push(t)});
    var st=document.getElementById("stage");if(!st){res();return}
    var hud=document.getElementById("hud");if(hud)hud.style.visibility="hidden";
    var ov=document.createElement("div");ov.id="opn";ov.innerHTML='<canvas id="opc"></canvas><button id="opskip" type="button">Skip ▶▶</button>';st.appendChild(ov);
    var oc=ov.firstChild,ow=st.clientWidth||320,oh=st.clientHeight||384,dp=Math.min(2,window.devicePixelRatio||1);oc.width=ow*dp;oc.height=oh*dp;var oct=oc.getContext("2d");oct.imageSmoothingEnabled=false;
    var LW=320,LH=Math.round(320*oh/ow),gcx=cx;
    var S0=S,P0=JSON.parse(JSON.stringify(P)),N0=JSON.parse(JSON.stringify(N));OPN_ON=true;
    var S1=fresh();S1.homeBuilt=true;S1.fund=500;S1.wild=[];S1.min=360;S1.music=false;S=S1;started=false;
    var au=new Audio(OPN_SRC);au.volume=.65;var t0=null,clk0=performance.now(),finished=false,cur=-1,lastS=-1,flash=0,wipeT=-9,petals=[];
    for(var i=0;i<26;i++)petals.push([Math.random()*LW,Math.random()*LH,.4+Math.random()*1.2,Math.random()*6]);
    var pp=au.play();if(pp&&pp.catch)pp.catch(function(){});
    function tnow(){if(au.currentTime>0&&!au.paused)return au.currentTime;return (performance.now()-clk0)/1000}
    function place(m,x,y,d){m.x=m.tx=Math.round(x);m.y=m.ty=Math.round(y);m.px=x*T;m.py=y*T;m.mv=0;m.d=d}
    function stage(i){
      if(SCENE)endScene();OPNX=null;var s=shots[i];S.rain=!!s.rain;if(s.min)S.min=s.min;
      P.sit=N.sit=false;P.ox=P.oy=N.ox=N.oy=0;N.away=false;N.path=[];N.mv=0;P.mv=0;
      if(s.kind==="world"){
        if(s.p)place(P,s.p[0],s.p[1],s.p[2]);else place(P,-5,-5,2);
        if(s.n)place(N,s.n[0],s.n[1],s.n[2]);else place(N,-5,-6,2);
        if(s.walk&&s.walk.who==="p")place(P,s.walk.from[0],s.walk.from[1],s.walk.d);
        if(s.walk&&s.walk.who==="n")place(N,s.walk.from[0],s.walk.from[1],s.walk.d);
        OPNX=(s.extras||[]).map(function(e){return {id:e.id,x:e.x,y:e.y,d:e.d}});
        if(s.scene)setupScene(null,s.scene);
        wipeT=tnow()}
      else wipeT=tnow()}
    function camFor(s,k){var c=s.cam;if(!c)return;var z=lerp(c[2],c[5],k),fx=lerp(c[0],c[3],k),fy=lerp(c[1],c[4],k),vw=VW*T,vh=VH*T;
      ZM=z;var cxw=fx*T+16-vw/z/2,cyw=fy*T+16-vh/z/2;cxw=Math.max(0,Math.min(MW*T-vw/z,cxw));cyw=Math.max(0,Math.min(MH*T-vh/z,cyw));CAMOV={x:cxw,y:cyw}}
    function bigPerson(who,x,y,sc){
      oct.save();oct.translate(x,y);oct.scale(sc,sc);cx=oct;
      var bob=Math.sin(time*4)*.5;
      if(who==="doodi")person(0,bob,2,"doodi",0,false);
      else if(who==="danoya"||who==="dress"){DRESS=(who==="dress");person(0,bob,2,"danoya",0,false);DRESS=false}
      else villager(0,bob,2,0,VSPEC[who],false);
      cx=gcx;oct.restore()}
    function text(t,x,y,sz,col,al,rot,stroke){oct.save();oct.translate(x,y);if(rot)oct.rotate(rot);al=al||"center";
      var avail=(al==="center"?Math.min(LW-20,2*Math.min(Math.max(x,0),Math.max(LW-x,0))-6):LW-18-10);if(al==="center"&&avail<LW-60)avail=LW-20;
      var lines=[t];function fnt(z){oct.font="400 "+z+"px Bungee,Figtree,system-ui,sans-serif"}
      fnt(sz);var wd=oct.measureText(t).width;
      if(wd>avail){var z2=sz*avail/wd;if(z2>=Math.max(9,sz*.62)){sz=z2}else{var words=t.split(" ");if(words.length>1){var best=null,bw=1e9;for(var k=1;k<words.length;k++){var l1=words.slice(0,k).join(" "),l2=words.slice(k).join(" ");fnt(sz);var m=Math.max(oct.measureText(l1).width,oct.measureText(l2).width);if(m<bw){bw=m;best=[l1,l2]}}lines=best;if(bw>avail)sz=Math.max(8,sz*avail/bw)}else sz=Math.max(8,z2)}}
      fnt(sz);oct.textAlign=al;oct.textBaseline="middle";oct.lineJoin="round";oct.lineWidth=Math.max(3,sz/6);oct.strokeStyle=stroke||"rgba(20,10,40,.9)";oct.fillStyle=col||"#fff";
      lines.forEach(function(l,i){var yy=(i-(lines.length-1)/2)*sz*1.15;oct.strokeText(l,0,yy);oct.fillText(l,0,yy)});oct.restore()}
    function fin(){
      if(finished)return;finished=true;try{var v0=au.volume,n=0,iv=setInterval(function(){n++;au.volume=Math.max(0,v0*(1-n/10));if(n>=10){clearInterval(iv);au.pause()}},40)}catch(e){}
      ZM=1;CAMOV=null;OPNX=null;if(SCENE)endScene();OPN_ON=false;
      S=S0;Object.assign(P,P0);Object.assign(N,N0);
      ov.style.transition="opacity .5s";ov.style.opacity=0;setTimeout(function(){if(ov.parentNode)ov.parentNode.removeChild(ov);if(hud)hud.style.visibility=""},520);
      res()}
    document.getElementById("opskip").onclick=function(e){e.stopPropagation();fin()};
    function loop(){
      if(finished)return;var t=tnow();if(t>=D+.2){fin();return}
      var i=0;while(i<shots.length-1&&t>=b[i+1])i++;
      if(i!==cur){cur=i;stage(i)}
      var s=shots[i],k=(t-b[i])/Math.max(.2,(b[i+1]>D+.5?D:b[i+1])-b[i]);k=ez(k);
      /* beat pulse */
      var pulse=0;for(var j=0;j<strong.length;j++){var d0=t-strong[j];if(d0>=0&&d0<.22){pulse=Math.max(pulse,1-d0/.22)}if(strong[j]>t)break}
      if(pulse>.01&&strong.indexOf(lastS)<0){}
      if(s.kind==="world"){
        camFor(s,k);if(s.pulse||true)ZM+=pulse*.035;
        if(s.walk){var w=s.walk,m=w.who==="p"?P:N,kk=Math.min(1,(t-b[i])/Math.max(.5,(b[i+1]-b[i])));m.px=lerp(w.from[0],w.to[0],kk)*T;m.py=lerp(w.from[1],w.to[1],kk)*T;m.mv=.5;m.f=Math.floor(time*7)%2;m.d=w.d}
        else{P.mv=0;N.mv=0}
      }else{CAMOV=null;ZM=1}
      if(s.kind==="world")draw();
      oct.setTransform(oc.width/LW,0,0,oc.height/LH,0,0);oct.clearRect(0,0,LW,LH);
      if(s.kind==="portrait"||s.kind==="title"||s.kind==="koi"){
        var g=oct.createLinearGradient(0,0,LW,LH);g.addColorStop(0,s.bg[0]);g.addColorStop(1,s.bg[1]);oct.fillStyle=g;oct.fillRect(0,0,LW,LH);
        oct.save();oct.translate(LW/2,LH*.46);for(var r=0;r<18;r++){oct.rotate(Math.PI/9+time*.03);oct.fillStyle=r%2?"rgba(255,255,255,.14)":"rgba(255,255,255,.0)";oct.beginPath();oct.moveTo(0,0);oct.lineTo(-40,-LH);oct.lineTo(40,-LH);oct.closePath();oct.fill()}oct.restore();
        if(s.kind==="koi"){
          var kt=t-b[i];oct.save();oct.fillStyle="#ffffff22";for(var rr=0;rr<5;rr++){var rk=((kt*.6+rr*.2)%1);oct.globalAlpha=1-rk;oct.strokeStyle="#bff";oct.lineWidth=2;oct.beginPath();oct.ellipse(LW*.5,LH*.58,20+rk*140,8+rk*50,0,0,7);oct.stroke()}oct.globalAlpha=1;
          oct.fillStyle="#fff";oct.beginPath();oct.arc(LW*.78,LH*.14,22,0,7);oct.fill();oct.fillStyle="#0a2a5a";oct.beginPath();oct.arc(LW*.78+8,LH*.14-3,20,0,7);oct.fill();
          function koi_(x,y,sc,ph,col){oct.save();oct.translate(x,y);oct.scale(sc,sc);var w=Math.sin(ph)*6;oct.fillStyle=col;oct.beginPath();oct.ellipse(0,0,34,14,0,0,7);oct.fill();oct.beginPath();oct.moveTo(-30,0);oct.lineTo(-52,-12+w);oct.lineTo(-52,12+w);oct.closePath();oct.fill();oct.fillStyle="#fff";oct.beginPath();oct.ellipse(6,-3,12,6,0,0,7);oct.fill();oct.fillStyle="#ff6f6f";oct.beginPath();oct.ellipse(-8,4,9,5,0,0,7);oct.fill();oct.fillStyle="#000";oct.fillRect(24,-5,4,4);oct.restore()}
          var kx=LW*.5+Math.cos(kt*1.2)*70,ky=LH*.58+Math.sin(kt*1.2)*28;
          koi_(LW*.25+Math.cos(kt*.8+2)*30,LH*.72,.7,kt*8,"#e8b04a");koi_(LW*.78,LH*.5+Math.sin(kt)*14,.6,kt*7+1,"#e8f0ff");
          oct.shadowColor="#ffe27a";oct.shadowBlur=26;koi_(kx,ky,1.55,kt*9,"#ff9a3c");oct.shadowBlur=0;
          text(s.cap,LW/2,LH*.2,Math.min(34,300/Math.max(5,s.cap.length)*1.7),"#fff","center",-.04);text(s.sub,LW/2,LH*.88,14,"#ffe9a8","center",-.02);oct.restore()}
        else if(s.kind==="portrait"){
          var slide=1-ez((t-b[i])/.35),sc=11+Math.sin(time*2)*.2+pulse*.4;
          oct.save();oct.fillStyle="rgba(0,0,0,.18)";oct.beginPath();oct.moveTo(-20,LH*.6);oct.lineTo(LW+20,LH*.42);oct.lineTo(LW+20,LH+10);oct.lineTo(-20,LH+10);oct.closePath();oct.fill();oct.restore();
          text(s.cap,LW/2+slide*-200,LH*.17,Math.min(44,330/Math.max(5,s.cap.length)*1.9),"rgba(255,255,255,.35)","center",-.06,"rgba(0,0,0,.0)");
          bigPerson(s.who,LW/2-16*sc+slide*220,LH*.5-4*sc,sc);
          text(s.cap,LW/2,LH*.78,Math.min(34,300/Math.max(5,s.cap.length)*1.7),"#fff","center",-.04);
          text(s.sub,LW/2,LH*.85,15,"#ffe9a8","center",-.02,"rgba(20,10,40,.9)")}
        else{
          var sk=ez((t-b[i])/.8);for(var q=0;q<40;q++){var sa=.3+.7*Math.abs(Math.sin(time*2+q));oct.globalAlpha=sa;oct.fillStyle="#fff";oct.fillRect((q*53)%LW,(q*97+time*10*(q%3))%LH,2,2)}oct.globalAlpha=1;
          text(s.big,LW/2,LH*.42,Math.min(38,330/Math.max(6,s.big.length)*1.6)*(.7+.3*sk),"#fff","center",-.03);
          text(s.sub,LW/2,LH*.54,14,"#ffe9a8","center",0)}
      }else{
        if(s.cap){var ci=ez((t-b[i])/.28),pos=s.cpos||"bl",tx=pos[1]==="l"?18:LW-18,ty=pos[0]==="t"?LH*.17:LH*.82,al=pos[1]==="l"?"left":"right";
          oct.globalAlpha=ci;text(s.cap,tx+(pos[1]==="l"?-1:1)*(1-ci)*80,ty,Math.min(30,300/Math.max(5,s.cap.length)*1.5),"#fff",al,pos[1]==="l"?-.04:.04);oct.globalAlpha=1}
      }
      /* wipe */
      var wk=(t-wipeT)/.28;if(wk>=0&&wk<1){var wx=lerp(-60,LW+60,ez(wk));oct.fillStyle="#fff";oct.beginPath();oct.moveTo(wx-60,0);oct.lineTo(wx+30,0);oct.lineTo(wx-30,LH);oct.lineTo(wx-120,LH);oct.closePath();oct.fill();oct.fillStyle="rgba(255,111,156,.85)";oct.beginPath();oct.moveTo(wx-110,0);oct.lineTo(wx-60,0);oct.lineTo(wx-120,LH);oct.lineTo(wx-170,LH);oct.closePath();oct.fill()}
      /* beat flash */
      if(pulse>.55){oct.fillStyle="rgba(255,255,255,"+((pulse-.55)*.55)+")";oct.fillRect(0,0,LW,LH)}
      /* petals */
      petals.forEach(function(p){p[1]+=p[2]*.8;p[0]+=Math.sin(time*1.5+p[3])*.7;if(p[1]>LH+6){p[1]=-6;p[0]=Math.random()*LW}oct.fillStyle="rgba(255,190,215,.85)";oct.fillRect(p[0],p[1],4,3);oct.fillRect(p[0]+1,p[1]-1,3,2)});
      /* vignette + letterbox */
      var vg=oct.createRadialGradient(LW/2,LH/2,LH*.3,LW/2,LH/2,LH*.75);vg.addColorStop(0,"rgba(0,0,0,0)");vg.addColorStop(1,"rgba(0,0,0,.5)");oct.fillStyle=vg;oct.fillRect(0,0,LW,LH);
      var bar=18+Math.max(0,1-t/.8)*60;oct.fillStyle="#000";oct.fillRect(0,0,LW,bar);oct.fillRect(0,LH-bar,LW,bar);
      oct.fillStyle="#ff6f9c";oct.fillRect(0,LH-bar-2,LW*(t/D),2);
      /* intro fade in / outro fade */
      if(t<.6){oct.fillStyle="rgba(0,0,0,"+(1-t/.6)+")";oct.fillRect(0,0,LW,LH)}
      if(t>D-.7){oct.fillStyle="rgba(0,0,0,"+Math.min(1,(t-(D-.7))/.6)+")";oct.fillRect(0,0,LW,LH)}
      requestAnimationFrame(loop)}
    stage(0);cur=0;requestAnimationFrame(loop);
    window.__opn={skip:fin,shots:function(){return shots.length},at:function(){return cur},seek:function(s){clk0=performance.now()-s*1000;try{au.pause()}catch(e){}}}})}
