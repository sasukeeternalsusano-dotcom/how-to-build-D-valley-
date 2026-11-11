/* ===== Chapter 2: all-new heart events, mini games and Dan (nothing repeated from Chapter 1) ===== */
if(CH2){
/* ---------- new people ---------- */
VSPEC.dan={skin:"#d9a066",hair:"#1f2430",hs:"short",stub:"#1f243033",brow:"#1f2430",top:"#2f9d8f",bot:"#2f3a5a",goggles:0};
VN.push({id:"dan",name:"Dan",sched:[[9,17,80,19,3],[17,22,36,29,1]],day:1});
CH2LINES.dan=["Danoya! Have you tried the pastries in the square yet? Rocket says he invented them. Tom says Rocket stole the recipe. I say I eat them either way.","I have known Doodi forever. He talks about you like you are the weather: constantly, and with great respect.","Do not tell him I said this, but he is the happiest I have ever seen him. Treat that like a state secret."];
CH2LINES.judy=["We met properly at the fire on the South Green, remember? I am still thinking about that pot of stew.","Alright, you. Doodi said I could vet the fish named after you. It is a very cute fish.","I may be the loud one, but I was the first to say he was good for you. Do not tell him. He will get insufferable.","I flew in from Manila and I am not leaving until I have seen the whole valley. Twice."];
CH2LINES.rocket.push("The square! You like it? The villagers kept donating after the festival. Now there is a bakery, a hall, and a statue of me looking heroic. I had it made slightly taller.");
CH2LINES.wren.push("The sunflower field east of here? Those are the seeds Doodi planted at the festival. The wind carried them. A very good sign.");
CH2LINES.rocket.push("Prepare for trouble! ...and make it double. No. Sorry. Reflex. I was a rocketeer once, you know. Welcome to the shop, Danoya.","Forty-one. That is the number of things I have built that fell down. I am not counting. Please do not tell Garo the number. He would have it embroidered.","The hum under the south cliffs. I have heard it. I have a theory. It is a very bad theory, so I have decided to keep it and sell snacks.");
CH2LINES.judy.push("You have hummed it since we were girls. Three notes, over and over. A man on a bus once asked me what the tune was. I said: forever. He seemed satisfied. You hum it in your sleep, too. I stopped asking.","Dan thinks I'm mean. I'm not mean. I'm accurate. There is a difference, and he is going to learn it the hard way.","If anything is down there, you tell me first. Then you tell Doodi. Then you tell Dan, who will panic usefully. In that order.");
CH2LINES.dan.push("I am the fastest runner in the valley. It is a lonely title. Nobody is ever chasing me.","Doodi once climbed a tree to impress you and got stuck for three hours. I fetched the ladder. I would like that on the record.","Fast isn't brave, Danoya. Remember that. Fast is just fast. Brave is when you are slow and you go anyway.");
CH2LINES.wren.push("Every jar on my shelf has a name on it in pencil. Some of them are pickles. Some of them are not. I will not be taking questions.","My Alder planted sunflowers in the wrong row for forty years. I told him every spring. They came up in the right places anyway. Funny, that.","The jars I can't open are his. Never mind, dear. Have a biscuit. They're from Tom. They're very nearly edible.");
CH2LINES.ferris.push("Pipes. The knocking under the cliffs. Old pipes. I've said it so often I've nearly started to believe me.","I once outsailed a storm with a goat aboard. It was a very quiet goat. It never complained, not once, not even at the end.","There was a lamp at the bottom of the harbour, the night of the Storm. Three fathoms. Lit. Ask me about it. No, don't.");
var DANPRE=["(He looks at you, then at the ground, then at the sky.) You're Danoya. I know. I'm not allowed to say anything else. Doodi wants to introduce us properly. At Market Day. He has been planning it for a week.","I only got to the valley a little after you did, so we keep missing each other. Doodi says: wait for Market Day, he will do the introductions. I am very bad at waiting. Go and make him happy so it comes sooner.","Nope. Not a word. Best friend's orders. Come find me at Market Day, and I will be a completely different, much better-introduced person."];
async function talkDan(v){if(!S.seen.e2){S.chat2=S.chat2||{};var n=(S.chat2.danpre||0)%DANPRE.length;S.chat2.danpre=n+1;await say("Dan",DANPRE[n]);return}await chat2(v)}
var _vtt=vnTalkTo;vnTalkTo=function(v){S.metV=S.metV||{};S.metV[v.id]=1;if(v.id==="dan"){v.face=(P.d+2)%4;v.faceUntil=time+8;return talkDan(v)}return _vtt(v)};
/* ---------- new mini games ---------- */
function mgShell(title,msg,body){showOv('<h3>'+title+'</h3><p>'+msg+'</p>'+body)}
function kiteGame(){return new Promise(function(res){
  mgShell("Kite over the sunflowers 🪁","Hold Pull to lift the kite. Keep it in the green band for 15 seconds!",'<div id="kg" style="position:relative;height:210px;border-radius:12px;overflow:hidden;background:linear-gradient(#7fd0ff,#fff3c4);border:2px solid var(--wood);margin:6px 0"><div style="position:absolute;left:0;right:0;top:70px;height:56px;background:#5de08a55;border-top:2px dashed #2f9d4a;border-bottom:2px dashed #2f9d4a"></div><div id="kk" style="position:absolute;left:46%;top:100px;font-size:2rem;transition:none">🪁</div><div style="position:absolute;left:0;right:0;bottom:0;height:22px;background:#e9b53a;font-size:1rem;text-align:center">🌻🌻🌻🌻🌻🌻🌻🌻</div></div><button class="big" id="kpull" type="button">Pull! 🪁</button><p id="kt">Time: 15s · In band: 0s</p>');
  var y=140,vy=0,held=false,tt=0,inb=0,k=$("kk"),pb=$("kpull"),iv;
  function pull(){vy-=90}
  pb.onpointerdown=function(e){e.preventDefault();held=true};pb.onpointerup=pb.onpointerleave=function(){held=false};
  window.__star=function(){pull()};
  iv=setInterval(function(){var dt=.033;tt+=dt;vy+=(150+Math.sin(tt*2.3)*60+Math.sin(tt*5.1)*30)*dt;if(held)vy-=300*dt;y+=vy*dt;if(y<8){y=8;vy=0}if(y>170){y=170;vy=Math.min(vy,0)}
    k.style.top=y+"px";k.style.transform="rotate("+(Math.sin(tt*4)*8)+"deg)";if(y+16>70&&y+16<126)inb+=dt;
    $("kt").textContent="Time: "+Math.max(0,Math.ceil(15-tt))+"s · In band: "+Math.floor(inb)+"s";
    if(tt>=15){clearInterval(iv);window.__star=null;hideOv();res(inb)}},33)})}
function ringGame(){return new Promise(function(res){
  mgShell("Ring toss 🎪","Tap Throw when the ring is over the glowing peg. 5 throws!",'<div id="rg" style="position:relative;height:90px;background:#2c3e7a;border-radius:12px;border:2px solid var(--wood);margin:8px 0;overflow:hidden"><div id="rpeg" style="position:absolute;top:8px;width:46px;height:74px;background:#ffd34d55;border:2px solid #ffd34d;border-radius:8px"></div><div id="rring" style="position:absolute;top:30px;font-size:1.8rem">⭕</div></div><button class="big" id="rthrow" type="button">Throw!</button><p id="rs">Hits: 0 / 5 · Throws left: 5</p>');
  var W=260,t=0,throws=5,hits=0,sp=2.4,peg=100,iv,locked=false;var ring=$("rring"),pegEl=$("rpeg");pegEl.style.left=peg+"px";
  iv=setInterval(function(){t+=.033;ring.style.left=(W/2-12+Math.sin(t*sp)*(W/2-18))+"px"},33);
  function thr(){if(locked||throws<=0)return;var rx=W/2-12+Math.sin(t*sp)*(W/2-18)+12;var hit=Math.abs(rx-(peg+23))<24;throws--;if(hit){hits++;sfxPlay("chime")}else sfxPlay("bad");
    $("rs").textContent="Hits: "+hits+" / 5 · Throws left: "+throws+(hit?"  ✔":"  ✖");sp+=.35;peg=24+Math.random()*(W-100);pegEl.style.left=peg+"px";
    if(throws<=0){locked=true;clearInterval(iv);window.__star=null;setTimeout(function(){hideOv();res(hits)},900)}}
  $("rthrow").onpointerdown=function(e){e.preventDefault();thr()};window.__star=thr})}
function starMap(){return new Promise(function(res){
  var P6=[[30,150],[70,80],[120,120],[160,50],[205,95],[225,30]];
  mgShell("Connect the stars ✨","Tap the stars in order, 1 to 6, to draw the constellation.",'<div id="cg" style="position:relative;height:190px;background:#0a1030;border-radius:12px;border:2px solid var(--wood);margin:8px 0;overflow:hidden"><svg id="cs" width="100%" height="190" style="position:absolute;inset:0"></svg></div><p id="cm">Find star 1</p>');
  var g=$("cg"),svg=$("cs"),next=0,err=0,done=[];
  for(var i=0;i<60;i++){var d=document.createElement("i");d.style.cssText="position:absolute;width:2px;height:2px;background:#fff8;left:"+(Math.random()*95)+"%;top:"+(Math.random()*95)+"%";g.appendChild(d)}
  P6.forEach(function(p,i){var b=document.createElement("button");b.type="button";b.textContent=i+1;b.style.cssText="position:absolute;left:"+p[0]+"px;top:"+p[1]+"px;width:34px;height:34px;border-radius:50%;border:2px solid #ffe27a;background:#ffe27a33;color:#fff;font-weight:800;box-shadow:0 0 12px #ffe27a88";
    b.onpointerdown=function(e){e.preventDefault();if(i!==next){err++;sfxPlay("bad");$("cm").textContent="Not that one. Look for star "+(next+1);return}
      sfxPlay("chime");b.style.background="#ffe27a";b.style.color="#222";if(next>0){var q=P6[next-1];var l=document.createElementNS("http://www.w3.org/2000/svg","line");l.setAttribute("x1",q[0]+17);l.setAttribute("y1",q[1]+17);l.setAttribute("x2",p[0]+17);l.setAttribute("y2",p[1]+17);l.setAttribute("stroke","#ffe27a");l.setAttribute("stroke-width","2");svg.appendChild(l)}
      next++;$("cm").textContent=next>=6?"A shape appears...":"Find star "+(next+1);if(next>=6)setTimeout(function(){hideOv();res(err)},1100)};g.appendChild(b)})})}
function ferryGame(){return new Promise(function(res){
  mgShell("The Last Ferry ⛵","Steer left and right (arrows or buttons). Collect lanterns 🏮 and dodge rocks 🪨!",'<div id="fg" style="position:relative;height:230px;background:linear-gradient(#ff9a5a,#ffcf8a 40%,#2f6fb0 41%,#1b3f7a);border-radius:12px;border:2px solid var(--wood);margin:6px 0;overflow:hidden"></div><div class="arrows"><button type="button" id="fl">◀</button><button type="button" id="fr">▶</button></div><p id="fs">Lanterns: 0 · Lives: ❤️❤️❤️</p>');
  var box=$("fg"),lane=1,items=[],tt=0,got=0,lives=3,iv,boat=document.createElement("div");boat.textContent="⛵";boat.style.cssText="position:absolute;bottom:6px;font-size:2rem;transition:left .12s";box.appendChild(boat);
  function setL(){boat.style.left=(lane*33+17)+"%"}setL();
  function mv(d){if(d===1&&lane<2)lane++;else if(d===3&&lane>0)lane--;setL()}
  $("fl").onpointerdown=function(e){e.preventDefault();mv(3)};$("fr").onpointerdown=function(e){e.preventDefault();mv(1)};window.__dance=mv;
  iv=setInterval(function(){var dt=.033;tt+=dt;
    if(tt<17&&Math.random()<.04+tt*.0015){var el=document.createElement("div"),lane2=Math.floor(Math.random()*3),good=Math.random()<.55;el.textContent=good?"🏮":"🪨";el.style.cssText="position:absolute;top:-30px;font-size:1.7rem;left:"+(lane2*33+17)+"%";box.appendChild(el);items.push({el:el,y:-30,l:lane2,g:good})}
    items=items.filter(function(it){it.y+=(110+tt*5)*dt;it.el.style.top=it.y+"px";if(it.y>170&&it.y<214&&it.l===lane){if(it.g){got++;sfxPlay("chime")}else{lives--;sfxPlay("bad")}it.el.remove();return false}if(it.y>240){it.el.remove();return false}return true});
    $("fs").textContent="Lanterns: "+got+" · Lives: "+"❤️".repeat(Math.max(0,lives))+"🖤".repeat(3-Math.max(0,lives));
    if(tt>=20||lives<=0){clearInterval(iv);window.__dance=null;setTimeout(function(){hideOv();res(got)},400)}},33)})}
function runeGame(){return new Promise(function(res){
  mgShell("The Southern Gate 🗝","Tap a rune. It toggles itself and its neighbours. Light all nine!",'<div id="rr" style="display:grid;grid-template-columns:repeat(3,64px);gap:8px;justify-content:center;margin:8px 0"></div><p id="rm">Moves: 0</p>');
  var st=[0,0,0,0,0,0,0,0,0],btn=[],mv=0;
  function tg(i,sil){var x=i%3,y=(i/3)|0;[[0,0],[1,0],[-1,0],[0,1],[0,-1]].forEach(function(d){var a=x+d[0],b=y+d[1];if(a>=0&&a<3&&b>=0&&b<3)st[b*3+a]^=1});if(!sil)paint()}
  for(var i=0;i<8;i++)tg(Math.floor(Math.random()*9),true);if(st.every(function(v){return v}))tg(4,true);
  var rr=$("rr");for(var i2=0;i2<9;i2++)(function(i){var b=document.createElement("button");b.type="button";b.style.cssText="height:64px;border-radius:12px;border:2px solid #7ad7ff;font-size:1.8rem";b.onpointerdown=function(e){e.preventDefault();tg(i);mv++;$("rm").textContent="Moves: "+mv;sfxPlay("tap");if(st.every(function(v){return v})){sfxPlay("chime");setTimeout(function(){hideOv();res(mv)},900)}};rr.appendChild(b);btn.push(b)})(i2);
  function paint(){btn.forEach(function(b,i){b.textContent=st[i]?"◈":"◇";b.style.background=st[i]?"#7ad7ff":"#1a2a4a";b.style.color=st[i]?"#fff":"#7ad7ff";b.style.boxShadow=st[i]?"0 0 14px #7ad7ff":"none"})}paint()})}

/* ---------- Chapter 2 goals: all different from Chapter 1 ---------- */
var _ap=applyProf;
applyProf=function(A){_ap(A);var old=QUESTS.filter(function(q){return q.id==="q7"})[0];
 var seaIds=["sardine","crab","tuna","squid","puffer"];
 QUESTS=[
  {id:"g1",t:"Cartographer",d:"Discover 6 new places on the east side of the valley.",n:6,p:function(){return Object.keys(S.disc||{}).length},r:{coins:90}},
  {id:"g2",t:"Catch up with the neighbours",d:"Catch up with Judy, Dan, Mr. Rocket, Granny Wren, Captain Ferris and Elder Hesper.",n:6,p:function(){return Object.keys(S.metV||{}).filter(function(k){return ["judy","dan","rocket","wren","ferris","hesper"].indexOf(k)>-1}).length},r:{coins:80}},
  {id:"g3",t:"Date-night regular",d:"See 3 heart events with Doodi.",n:3,p:function(){return Object.keys(S.seen||{}).filter(function(k){return S.seen[k]&&/^e\d$/.test(k)}).length},r:{coins:110,fp:30}},
  {id:"g4",t:"Deep-sea angler",d:"Catch 3 different kinds of sea fish (sardine, crab, tuna, squid, puffer).",n:3,p:function(){return seaIds.filter(function(i){return S.fishLog&&S.fishLog[i]}).length},r:{coins:120}},
  {id:"g5",t:"Menu planner",d:"Cook 4 different dishes.",n:4,p:function(){return Object.keys(S.dishLog||{}).length},r:{coins:110}},
  old?{id:"g6",t:old.t,d:old.d,n:old.n,p:old.p,r:old.r}:{id:"g6",t:"Read his mind",d:"Give Doodi his favourite things.",n:1,p:function(){return 0},r:{coins:200}},
  {id:"g7",t:"Valley tycoon",d:"Earn 1500 coins in total.",n:1500,p:function(){return S.totalCoins||0},r:{coins:150}},
  {id:"g8",t:"Heart of the valley",d:"Reach 10 hearts with Doodi.",n:10,p:function(){return hearts()},r:{coins:300,fp:20}}];
};


/* ---------- Sakura season: after 6 hearts, the next morning the valley fills with drifting petals ---------- */
var _nd=newDay;newDay=function(p){var r=_nd(p);if(CH2&&S&&hearts()>=6&&!S.sakura){S.sakura=S.day;S.sakuraNew=1;S.rain=false}return r};
var _sn=sleepNow;sleepNow=async function(late){await _sn(late);if(CH2&&S&&S.sakuraNew){S.sakuraNew=0;talking=true;
  await seq([["","You wake to a strange, soft light. Something pink is drifting past the window."],["Doodi","Open the door. Look up."],["","The whole valley is full of falling sakura petals. They drift on the morning wind, over the roofs, over the lake, over the sunflowers in the east."],["Doodi","Granny Wren says they bloom once in a lifetime. She also says they only bloom when two people mean it."],["Danoya","I believe her."]]);talking=false;toast("🌸 Sakura season has begun")}};
var _dr=draw;draw=function(){_dr.apply(this,arguments);if(CH2&&S&&S.sakura&&!S.rain&&started)sakuraFx()};
function sakuraFx(){var vw=VW*T,vh=VH*T,h=S.min/60;
  var a=h>=19.5||h<6?.55:1;
  cx.fillStyle="rgba(255,190,215,"+(.07*a)+")";cx.fillRect(0,0,vw,vh);
  for(var i=0;i<46;i++){var sp=14+(i*7)%22,ph=(i*0.6180339)%1;
    var x=((i*61+time*(sp+10)+Math.sin(time*.7+i)*26)%(vw+40))-20,y=((i*37+time*sp*1.35+ph*vh)%(vh+30))-15;
    var rot=time*(1.2+(i%5)*.3)+i,sz=2.2+(i%4)*.9;
    cx.save();cx.translate(x,y);cx.rotate(rot);cx.globalAlpha=(.55+.4*Math.abs(Math.sin(time+i)))*a;
    cx.fillStyle=["#ffc3d9","#ffb0cc","#ffd6e4","#ff9fbe"][i%4];cx.beginPath();cx.ellipse(0,0,sz,sz*.55,0,0,7);cx.fill();
    cx.fillStyle="#ffffff88";cx.fillRect(-sz*.4,-.5,sz*.6,1);cx.restore()}
  cx.globalAlpha=1}

/* ---------- new heart events (each one a new place and a new game) ---------- */
EVT=[{id:"e1",h:2,t:14,place:[71,6],where:"Wren's Sunflower Fields",title:"Kites over the Sunflowers"},
 {id:"e2",h:4,t:13,place:[85,18],where:"Rocket Square",title:"Market Day"},
 {id:"e3",h:6,t:21,place:[96,8],where:"the Old Observatory",title:"The Observatory"},
 {id:"e4",h:8,t:18,place:[88,40],where:"Sunset Harbour",title:"The Last Ferry"},
 {id:"e5",h:10,t:22,needCamp:true,place:[95,34],where:"the Southern Gate",title:"The Southern Gate"}];
var _sk=sceneKind;sceneKind=function(id){return CH2?({e1:"fields",e2:"market",e3:"scope",e4:"pier",e5:"gate",sx:"balcony"})[id]:_sk(id)};
var _ss=setupScene;
setupScene=function(id,force){_ss(id,force);var s=SCENE;if(!s)return;var k=s.k;if(["fields","market","scope","pier","gate","balcony"].indexOf(k)<0)return;
  P.sit=N.sit=false;P.ox=P.oy=N.ox=N.oy=0;if(k==="pier"){DRESS=true;P.x=P.tx=90;P.y=P.ty=43;N.x=N.tx=91;N.y=N.ty=43;P.px=90*T;P.py=43*T;N.px=91*T;N.py=43*T;P.d=1;N.d=3;P.mv=N.mv=0;N.path=[]}if(k==="balcony"){P.oy=N.oy=-26;P.d=N.d=2}
  s.under=function(dr){var m=sceneMid(),mx=m[0],my=m[1];
    if(k==="scope")dr.push({y:my+4,f:function(){R(mx+30,my+16,3,16,"#6b4426");R(mx+22,my+30,18,3,"#6b4426");cx.save();cx.translate(mx+31,my+8);cx.rotate(-.7);R(-4,-5,34,10,"#b08a3a");R(26,-6,8,12,"#e7d38a");R(-6,-6,4,12,"#6b4426");cx.restore()}});
    if(k==="market")dr.push({y:my-70,f:function(){R(mx-62,my-52,50,6,"#e4572e");R(mx-62,my-46,50,26,"#fff4e0");R(mx-62,my-52,50,4,"#fff");for(var i=0;i<5;i++)R(mx-62+i*10,my-52,5,6,"#fff");R(mx-56,my-34,12,10,"#ffd34d");R(mx-40,my-34,12,10,"#ff9ec8");R(mx+14,my-52,50,6,"#2f9d8f");R(mx+14,my-46,50,26,"#fff4e0");R(mx+22,my-34,10,10,"#8fd0ff");R(mx+40,my-34,12,10,"#b7e58a")}});
    if(k==="market"){dr.push({y:my+20,f:function(){var bb=Math.sin(time*3)>0?1:0;villager(mx-84,my-14+bb,1,0,VSPEC.judy,false)}});dr.push({y:my+20,f:function(){var bb=Math.sin(time*3+1.5)>0?1:0;villager(mx+52,my-14+bb,3,0,VSPEC.dan,false)}})}
    if(k==="pier")dr.push({y:my+6,f:function(){var wv=Math.sin(time*1.4)*2;R(mx+38,my+22,42,26,"#8a5a32");R(mx+34,my+18,50,8,"#e4572e");R(mx+56,my-20,3,38,"#6b4426");R(mx+59,my-18,24,16,"#fff4e0")}});
  };
  s.over=function(){var m=sceneMid(),mx=m[0],my=m[1];
    if(k==="fields"){for(var i=0;i<12;i++){var ph=(time*.18+i/12)%1,x=mx-110+ph*230,y=my-60+Math.sin(ph*9+i)*24;cx.fillStyle=i%2?"#ffd34d":"#ff9ec8";cx.fillRect(x,y,4,3)}
      var kx=mx+50+Math.sin(time*1.1)*20,ky=my-92+Math.sin(time*1.7)*10;cx.strokeStyle="#ffffffaa";cx.lineWidth=1;cx.beginPath();cx.moveTo(P.px+22,P.py+10);cx.lineTo(kx,ky);cx.stroke();cx.save();cx.translate(kx,ky);cx.rotate(Math.sin(time*1.3)*.2);cx.fillStyle="#e4572e";cx.beginPath();cx.moveTo(0,-14);cx.lineTo(10,0);cx.lineTo(0,14);cx.lineTo(-10,0);cx.closePath();cx.fill();cx.fillStyle="#ffd34d";cx.fillRect(-1,-14,2,28);for(var j=0;j<4;j++){cx.fillStyle=j%2?"#ff6f9c":"#7ec3ee";cx.fillRect(-2+Math.sin(time*3+j)*4,16+j*7,4,4)}cx.restore();floatHearts(mx,my,4)}
    else if(k==="market"){stringLights(mx-110,mx+110,my-92,14);for(var b=0;b<6;b++){var bx=mx-100+b*38;cx.fillStyle=["#ff3d57","#ff9a3c","#27d6c4","#7be06a","#ff7eb6","#ffd34d"][b];cx.beginPath();cx.moveTo(bx,my-86);cx.lineTo(bx+10,my-86);cx.lineTo(bx+5,my-72);cx.closePath();cx.fill()}floatHearts(mx,my,4)}
    else if(k==="scope"){shooting();for(var q=0;q<18;q++){cx.globalAlpha=.4+.6*Math.abs(Math.sin(time*1.5+q));cx.fillStyle="#fff";cx.fillRect(mx-130+(q*47)%260,my-110+(q*31)%60,2,2)}cx.globalAlpha=1;floatHearts(mx,my,3)}
    else if(k==="pier"){var g=cx.createLinearGradient(0,my-120,0,my+40);g.addColorStop(0,"rgba(255,120,60,.30)");g.addColorStop(1,"rgba(255,200,120,0)");cx.fillStyle=g;cx.fillRect(mx-160,my-120,320,160);for(var i2=0;i2<5;i2++){var ph2=(time*.12+i2/5)%1,x2=mx-90+i2*40,y2=my+40-ph2*14;lanternsOne(x2,y2)}lanterns(mx,my,4);floatHearts(mx,my,5)}
    else if(k==="balcony"){balconyBack(mx,my);person(P.px+P.ox,P.py+P.oy,2,ROLE.p,0,false);person(N.px+N.ox,N.py+N.oy,2,ROLE.n,0,false);cx.fillStyle="#6b4426";for(var r2=0;r2<7;r2++)cx.fillRect(mx-118+r2*39,my-8,5,34);cx.fillRect(mx-120,my-8,240,5);cx.fillRect(mx-120,my+8,240,4);stringLights(mx-116,mx+116,my-112,12);fireflies(mx,my,10,100);floatHearts(mx,my,5)}
    else if(k==="gate"){var pl=.5+.5*Math.sin(time*2);cx.globalAlpha=.25+.35*pl;var gg=cx.createRadialGradient(mx,my-50,6,mx,my-50,110);gg.addColorStop(0,"#7ad7ff");gg.addColorStop(1,"rgba(122,215,255,0)");cx.fillStyle=gg;cx.fillRect(mx-120,my-160,240,220);cx.globalAlpha=1;for(var r=0;r<6;r++){cx.fillStyle="#7ad7ff";cx.globalAlpha=.4+.6*Math.abs(Math.sin(time*2+r));cx.fillRect(mx-70+r*28,my-100+(r%2)*10,4,12)}cx.globalAlpha=1;fireflies(mx,my,6,80);floatHearts(mx,my,3)}
  }};

function balconyBack(mx,my){
      var g=cx.createLinearGradient(0,my-220,0,my+140);g.addColorStop(0,"#0a1038");g.addColorStop(.55,"#3d2a73");g.addColorStop(1,"#ff9d6a");cx.fillStyle=g;cx.fillRect(mx-200,my-230,400,380);
      for(var q=0;q<36;q++){cx.globalAlpha=.4+.6*Math.abs(Math.sin(time*1.3+q));cx.fillStyle="#fff";cx.fillRect(mx-190+(q*53)%380,my-220+(q*37)%110,2,2)}cx.globalAlpha=1;
      cx.fillStyle="#fff7d0";cx.beginPath();cx.arc(mx+104,my-170,17,0,7);cx.fill();cx.fillStyle="#3d2a73";cx.beginPath();cx.arc(mx+112,my-174,15,0,7);cx.fill();
      cx.fillStyle="#241648";cx.beginPath();cx.moveTo(mx-200,my+80);cx.quadraticCurveTo(mx-120,my+30,mx-40,my+70);cx.quadraticCurveTo(mx+60,my+20,mx+200,my+76);cx.lineTo(mx+200,my+150);cx.lineTo(mx-200,my+150);cx.fill();
      for(var v=0;v<14;v++){cx.fillStyle=v%3?"#ffd27a":"#ff9a3c";cx.fillRect(mx-180+v*27+(v%2)*6,my+92+(v%4)*7,3,3)}
      cx.fillStyle="#5a3a1e";cx.fillRect(mx-190,my-230,52,380);cx.fillStyle="#6c4a28";for(var b=0;b<9;b++)cx.fillRect(mx-186+(b%2)*6,my-220+b*40,16,4);cx.fillStyle="#4a2e16";cx.fillRect(mx+150,my-230,46,380);
      var cc=["#1f6b3a","#2a8446","#175a30"];for(var c=0;c<14;c++){cx.fillStyle=cc[c%3];cx.beginPath();cx.arc(mx-190+c*30,my-218+(c%3)*8,34,0,7);cx.fill()}
      cx.fillStyle="#7a4f2a";cx.fillRect(mx-92,my-120,184,108);cx.fillStyle="#8d6035";for(var p2=0;p2<10;p2++)cx.fillRect(mx-92+p2*18,my-120,2,108);
      cx.fillStyle="#b83a3a";cx.beginPath();cx.moveTo(mx-108,my-118);cx.lineTo(mx,my-176);cx.lineTo(mx+108,my-118);cx.closePath();cx.fill();cx.fillStyle="#8c2a2a";cx.fillRect(mx-108,my-122,216,6);
      var gl=.7+.3*Math.sin(time*2);cx.fillStyle="#ffd27a";cx.globalAlpha=gl;cx.fillRect(mx-80,my-98,34,34);cx.fillRect(mx+46,my-98,34,34);cx.globalAlpha=1;cx.fillStyle="#6b4426";cx.fillRect(mx-64,my-98,2,34);cx.fillRect(mx-80,my-82,34,2);cx.fillRect(mx+62,my-98,2,34);cx.fillRect(mx+46,my-82,34,2);
      cx.fillStyle="#9a6a3c";cx.fillRect(mx-120,my-12,240,18);cx.fillStyle="#b78250";for(var d=0;d<12;d++)cx.fillRect(mx-120+d*20,my-12,2,18);cx.fillStyle="#5a3a1e";cx.fillRect(mx-120,my+6,240,6);cx.fillRect(mx-100,my+12,6,40);cx.fillRect(mx+94,my+12,6,40)}
function lanternsOne(x,y){cx.fillStyle="#ff9d3c";cx.fillRect(x-4,y-6,8,10);cx.fillStyle="#ffd27a";cx.fillRect(x-3,y-5,6,7);cx.globalAlpha=.3;cx.fillStyle="#ffb35a";cx.fillRect(x-8,y-10,16,18);cx.globalAlpha=1}
EVENTS={
 e1:async function(){
  await seq([["Doodi","{n}, close your eyes. No peeking. Okay. Open them.".replace("{n}",NICK())],["","A whole hillside of sunflowers, taller than you, nodding in the wind. Beyond them a small windmill turns."],["Doodi","After the festival, the wind took the seeds I planted for you and spread them east. Granny Wren says the whole valley is still talking about it."],["Danoya","Doodi... there are hundreds."],["Doodi","One day I will plant one for every day you made me smile. Give me a few thousand years."]]);
  await seq([["Doodi","But look. Right in the middle, where the flowers part."],["","A small patch of daffodils, planted in a perfect heart. Yellow against the gold."],["Danoya","You remembered. Daffodils are my favourite."],["Doodi","Granny Wren says I asked about that nine times. Now, kite time. I made it myself. It is slightly lopsided."]]);
  var s=await kiteGame();
  await seq([["Doodi",s>=10?"You are a natural. The wind listens to you. So do I.":s>=5?"Not bad at all. The kite and I are both impressed.":"It flew for a second. A magnificent second."],["Danoya","Look at it up there. It looks like it is dancing."],["Doodi","It is just following you. Everything here does."],["","The kite floats above the sunflowers, a tiny red diamond against a very large sky."]])},
 e2:async function(){
  await seq([["Doodi","Welcome to Rocket Square. Mr. Rocket's building fund did not stop at one cabin. The whole valley kept chipping in."],["","Stalls, bunting, a bakery that smells like warm sugar. In the middle, a small statue of a rocket pointing at the sky."],["Judy","DANOYA! Over here! We did the big hug at the fire on the South Green, so this time I brought a pastry instead."],["Danoya","Judy! You already know I love you. Who is that next to you?"],["Doodi","Danoya, this is Dan. He came to the valley a little after you did, which is why you two keep missing each other. Dan, this is Danoya."],["Dan","I am Dan. Doodi's best friend. It is very nice to finally meet you properly. I have heard everything about you. Everything. He does not stop."],["Doodi","Dan. We agreed. No stories."],["Dan","I said nothing. Nothing yet."],["Judy","Loud and proud. Now go, you two. Ring toss. It is rigged. Beat it anyway."]]);
  var h=await ringGame();
  await seq([["Doodi",h>=4?"You cleaned the stall out. Mr. Rocket is crying into his goggles.":h>=2?"Good arm. The stall owner is nervous.":"The pegs were slippery. Clearly a conspiracy."],["Danoya","Which prize do I get?"],["Doodi","The best one, obviously. Hold out your hands."],["","He places a tiny plush koi in your palms. Orange and white, with a crooked little smile."],["Doodi","The real one is named after you. This one is just for the pocket."],["Judy","Aw. I cried a little. Dan, tell them I did not cry."],["Dan","She cried. Doodi, I am proud of you, man."]]);
  toast("Prize: a plush koi 🐟 for your pocket")},
 e3:async function(){
  await seq([["Doodi","Rocket built this place before the shop. A launch pad. Then the rocket crashed into Granny Wren's petunias. Now it is an observatory. Both of them are still not talking about it."],["","A round stone tower with a brass telescope on a tripod. The sky above is huge and quiet."],["Danoya","It is so clear tonight."],["Doodi","Ferris says there is a hum under the south cliffs, and sometimes, three soft knocks, then quiet. He thinks it's the pipes. Ferris also thinks the moon is a lighthouse. I wanted to look with you."]]);
  var e=await starMap();
  await seq([["Doodi",e===0?"Perfect. You drew it in one go.":"You got there in the end."],["Danoya","It looks like a fish. A koi."],["Doodi","Moon koi. The one from the lake. The stars copied it."],["Danoya","Doodi... the last star is pointing south."],["Doodi","Toward the Southern Gate. Stay close. We are going to find out what it is. But not tonight. Tonight is just you and the sky."],["","The telescope clicks. The koi constellation shines for two people on a tower, a very small bit of light holding a very big night."]])},
 e4:async function(){
  await seq([["","This one is not the festival. Doodi has been planning it for weeks. He asked Captain Ferris for one favour, and Ferris, whose family's ferry has not sailed since the Storm, dug her out for the two of them."],["Captain Ferris","The Great Storm closed this harbour. But for one night, the Sunset Ferry sails. Do not ask me how long I have been fixing her."],["Doodi","Ferris. You are a legend."],["Captain Ferris","I am a man with a boat. Now step aboard. The sunset waits for no one."],["","Danoya steps onto the old ferry in her lilac gown, the one from the nights she saves for something that matters. The harbour glows orange."],["Doodi","You look... I have no words. I have a lot of words usually. They have all left."]]);
  var l=await ferryGame();
  await seq([["Captain Ferris",l>=8?"You caught the whole harbour's wishes. The sea is yours.":l>=4?"A fine haul. The lanterns will light you home.":"A few made it. A few wishes are enough."],["Doodi","Look. They all drifted up. Every lantern is a wish for someone far away."],["Danoya","Mine are for two time zones. And one boy who finally lives in the same one as me."],["Doodi","I am not going anywhere."],["","The old ferry rocks gently. Behind it the harbour lights come on, one by one, like a sentence finally finished."]])},
 e5:async function(){
  var pr=S.prof||{};
  await seq([["Doodi","This is it. The Southern Gate. Ferris says the cliffs came down on it in the Storm, and nobody had seen it since. It only started showing again when the runes began glowing through the rock."],["Danoya","The lanterns on the Green all leaned this way. Every flame. Then the lamps along the path started to dim, one at a time, from the south end."],["Doodi","Ferris says the streetlamps have been losing a little light every night since the spring. I thought it was the oil."],["Danoya","I don't think it's the oil. It feels like something down there is drinking the light."],["","A great stone door set into the cliff. Pale blue runes pulse along its edge, slow and steady, like a heartbeat."],["Danoya","It is humming. It is the tune I hum, Doodi. The one I never learned."],["Doodi","Hesper said those runes answer to light. Ferris said it's pipes. I'm going with Hesper."],["Danoya","Then let us wake it."]]);
  var m=await runeGame();
  playSong("end");
  await seq([["","The last rune lights. The gate groans, and a slit of blue light opens along the seam. Cold air rises from below, smelling of old stone and something sleeping."],["Doodi","Stairs. Going down. Further than I can see."],["Danoya","Something is under the valley, Doodi. And it knows my song."],["","Far below, three notes rise out of the dark. Falling. Slow. Hers. Then a second voice answers, a great dull weight of a voice with no tune in it: <i>quiet. Quiet. Quiet.</i> And the gate's light flickers, as if it were afraid."],["Doodi","Hesper said the Keepers built their doors so people could go through without fear. Whatever is down there, I do not think it was ever meant to be shut away. Maybe the Storm only finished the sealing."],["Danoya","The crystal. Hesper's old lantern has these same runes, and one letter scratched underneath. S. She said the old lanterns were all lit from a crystal under the cliffs. Maybe whoever cut these made that too, and if it has gone dark, that would explain the lamps."],["Doodi","So maybe we wake it before it's too late. If we can light it, maybe the lamps come back. Maybe the hum stops. Maybe you stop humming it in your sleep."],["Danoya","And the gate opened for my light, Doodi. I don't think it would have for anyone else."],["Doodi","Then we come back with lanterns, swords, and every bit of courage we have. Together."],["Danoya","Together."],["","Doodi takes your hand. At the edge of the dark, the light from the gate wraps around you both, warm and very blue."]]);
  S.endSeen=true;
  var mg=esc(pr.msg||"I'm already home with you. 💛");
  await lovelyOv("DANOYA VALLEY · Chapter 2","You filled every heart and found him, this time from the other side. And the gate under the valley has opened.<br><br>A little message, from you:<br><b>“"+mg+"”</b><br><br><i>Chapter 3 · Below the Valley is waiting. Go together.</i><br><br><a href=\"chapter3.html\" target=\"_blank\" style=\"color:#2f6fd0;font-weight:800\">▶ Play Chapter 3</a>","Keep playing");stopSong(false,true)}
};
/* ---------- Chapter 2 cutscene launcher (from the cutscene selector). Throwaway save; your real save is never touched. ---------- */
(function(){
var _t=title;
var CUTS=["open","e1","e2","e3","e4","e5","camp","sx"];
function takeCut(){var id=null;try{id=localStorage.getItem("dv_cut");localStorage.removeItem("dv_cut")}catch(e){}if(!id){var h=(location.hash||"").replace("#","");if(h.indexOf("cut-")===0)id=h.slice(4)}return id}
function cutGate(f){showOv('<div id="title"><h3 class="tt">Danoya<br>Valley</h3><p class="hand" style="font-size:1.4rem">Cutscene</p><br><button class="big" id="cg" type="button">Play \u25b6</button></div>');document.getElementById("cg").onclick=function(){ac();hideOv();f()}}
title=function(){var id=takeCut();if(id&&CUTS.indexOf(id)>=0){cutGate(function(){play(id)});return}_t()};
function auto(v){return function(){toast("🎮 Minigame auto-completed for this preview");return new Promise(function(r){setTimeout(function(){r(v)},900)})}}
function backBtn(){if(document.getElementById("cutback"))return;var a=document.createElement("button");a.id="cutback";a.type="button";a.textContent="◀ All cutscenes";a.style.cssText="position:fixed;left:50%;transform:translateX(-50%);bottom:calc(8px + env(safe-area-inset-bottom,0px));z-index:99999;background:#fff;color:#7a2a40;font:800 13px system-ui,sans-serif;padding:6px 14px;border-radius:99px;border:0;box-shadow:0 2px 8px #0004";a.onclick=function(){cutExit(false)};document.body.appendChild(a)}
async function play(id){
  window.__cutId=id;SAVEKEY="danoya-cutscene-preview-2";
  kiteGame=auto(12);ringGame=auto(5);starMap=auto(0);ferryGame=auto(9);runeGame=auto(0);fireflyGame=auto(3);
  S=fresh();plots={};spawnWild();S.prof={};applyProf(S.prof);S.intro=true;S.fp=1000;S.homeBuilt=true;S.day=5;S.min=14*60;S.claimed={};
  var _ev=EVT.filter(function(e){return e.id===id})[0];if(_ev){S.min=_ev.t*60+2;S.fp=Math.max(0,_ev.h*100-20)}if(id==="camp")S.fp=100;
  try{var _g=document.getElementById("goal");if(_g)_g.style.display="none"}catch(e){}
  applyHome();P.x=P.tx=40;P.y=P.ty=23;P.px=40*T;P.py=23*T;P.mv=0;P.d=2;N.x=N.tx=41;N.y=N.ty=23;N.px=41*T;N.py=23*T;N.mv=0;N.path=[];N.away=false;
  started=true;paintHud();syncMuBtn();window.__cutNoBgm=1;bgmSync();talking=false;
  if(id==="open"){await playOpening();await cutExit(true);return}
  backBtn();
  if(id==="camp"){S.day=2;S.min=20*60;S.seen={};paintHud();await startCamp()}
  else if(id==="sx"){await startSecret()}
  else{await startEvent(EVT.filter(function(e){return e.id===id})[0])}
  await cutExit(true)}
})();

}

/* ---------- houses for Judy and Dan (Chapter 2) ---------- */
(function(){var _be=buildExpansion;
 function addDJ(){
  if(!window.__villageHouse)return;
  if(VIL.some(function(b){return b.id==="judy"}))return;
  window.__villageHouse({id:"judy",w:5,h:4,x:25,y:12,door:27,roof:"#d46aa0",wall:"#f1dfb8",name:"Judy's house",sign:"JUDY'S",lbl:"Judy",t:"🏠 Judy's house. The suitcase from Manila is still by the door, half unpacked. She says that's a hedge. A sign on the knocker: KNOCK. THEN WAIT. THEN KNOCK AGAIN."});
  path([[27,16],[35,16]]);
  window.__villageHouse({id:"dan",w:5,h:4,x:68,y:15,door:70,roof:"#5a8fd0",wall:"#d9e4e8",name:"Dan's house",sign:"DAN'S",lbl:"Dan",t:"🏠 Dan's house. Running shoes by the door, worn through at the toes. A note: GONE RUNNING. BACK SOON. (He is never back soon.)"});
  path([[70,19],[77,19]])}
buildExpansion=function(){_be();addDJ()};
if(typeof VIL!=="undefined"&&VIL.length)addDJ();
})();
