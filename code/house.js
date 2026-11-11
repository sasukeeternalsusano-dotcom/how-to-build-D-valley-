/* ---------- inside the house ---------- */
var TV=[
 {e:"🌊",n:"Avatar: The Last Airbender",m:120,t:["You watch two episodes. Appa shows up and you think of someone who'd cry-laugh at exactly this part.","Aang takes a deep breath and you take one too. 'Everything will be alright', says the show. You believe it."]},
 {e:"🎮",n:"A Stardew Valley stream",m:90,t:["Someone on screen marries the first villager they meet. You scoff. You've been planning for much longer.","A streamer plants 400 parsnips. You are inspired to plant exactly one sunflower and talk about it for an hour."]},
 {e:"🎤",n:"Phoebe Bridgers live",m:90,t:["The crowd screams the bridge together. You sing along from the couch. Quietly. Mostly.","A sad song in a warm room is the best kind of sad."]},
 {e:"🍿",n:"A very cheesy rom-com",m:120,t:["Two strangers fall in love in a rainstorm. You roll your eyes and then, quietly, pause it to wipe them.","The big airport scene happens. You say 'I'd do it better'. (You would.)"]},
 {e:"🕵️",n:"A detective show",m:90,t:["You guess the culprit in the first ten minutes. You are wrong. You pretend you weren't guessing.","Everyone is a suspect except the person you should have suspected."]}];
var room_t=0;
function drawRoom(c,home){
  var g=c.getContext("2d"),W=c.width,H=c.height,h=S.min/60;g.imageSmoothingEnabled=false;
  function r(x,y,w,hh,col){g.fillStyle=col;g.fillRect(x,y,w,hh)}
  r(0,0,W,H,home?"#f0dcc0":"#d8b88a");r(0,0,W,62,home?"#f7ead2":"#e7cda0");r(0,60,W,4,"#8f6736");
  for(var x=0;x<W;x+=24)r(x,64,2,H,"#00000012");
  r(0,64,W,H-64,home?"#c9945a":"#b98a54");for(var y=76;y<H;y+=16)r(0,y,W,1,"#0000001f");
  /* window */
  var sky=h<6||h>=20?"#14204a":h<8||h>=18?"#f2a365":"#8fd0ff";r(150,12,56,40,"#7a5230");r(154,16,48,32,sky);if(h<6||h>=20){r(162,22,2,2,"#fff");r(184,28,2,2,"#fff");r(172,38,2,2,"#fff");r(192,20,3,3,"#ffe9a8")}else{r(166,24,16,6,"#ffffffcc")}r(177,16,2,32,"#7a5230");r(154,31,48,2,"#7a5230");
  /* bed */
  r(10,70,70,38,"#7a4a2a");r(14,74,62,30,home?"#ff9aa8":"#e86a6a");r(14,74,62,10,"#fff6e8");r(18,76,22,8,"#fff");r(44,76,22,8,"#fff");
  /* rug */
  r(86,112,90,34,home?"#2f9d8f":"#c24b3b");r(90,116,82,26,home?"#4dbfb0":"#e07a6a");
  /* tv */
  r(100,58,52,6,"#00000033");r(104,30,44,30,"#2a2a33");r(107,33,38,24,TVon?"#9fe0ff":"#17222b");if(TVon){r(112,38,10,8,"#ff6f9c");r(126,42,14,10,"#ffd34d")}r(120,60,12,4,"#2a2a33");
  /* plant + lamp */
  r(214,86,14,16,"#a0522d");r(210,66,22,22,"#3f8f3c");r(216,60,10,10,"#58b152");
  r(2,44,6,26,"#8f6736");r(0,38,10,8,h>=18||h<6?"#ffd34d":"#f2e5b0");
  if(home){r(180,100,44,30,"#4a7fb5");r(180,100,44,8,"#6aa0d8");r(184,92,36,10,"#4a7fb5")}
  drawDecor(g,room_t);if(h>=18||h<6){g.fillStyle="rgba(10,20,60,.28)";g.fillRect(0,0,W,H)}}

function drawDecor(g,t){
  var D=S.decor||{};function r(x,y,w,hh,col){g.fillStyle=col;g.fillRect(x,y,w,hh)}
  function frame(x,y,w,hh,bg){r(x-2,y-2,w+4,hh+4,"#5a3a20");r(x,y,w,hh,bg)}
  if(D.dmap){frame(12,8,34,26,"#7ec3ee");r(16,12,8,6,"#5cae5a");r(26,16,10,8,"#5cae5a");r(18,22,6,5,"#5cae5a");r(36,12,6,4,"#5cae5a");r(28,12,2,2,"#e85b5b");r(14,29,30,2,"#fff8")}
  if(D.danim){frame(52,8,24,30,"#ffe9b8");r(58,18,12,10,"#e8873a");r(56,14,4,6,"#e8873a");r(66,14,4,6,"#e8873a");r(60,22,8,6,"#fff");r(61,20,2,2,"#222");r(65,20,2,2,"#222");r(63,25,2,2,"#222")}
  if(D.dstrk){frame(82,6,18,28,"#15151a");r(86,10,10,10,"#f2f2f2");r(88,12,6,6,"#15151a");r(90,14,2,2,"#e8c24a");g.fillStyle="#fff";g.font="bold 5px sans-serif";g.textAlign="center";g.fillText("THE",91,26);g.fillText("STROKES",91,31)}
  if(D.dappa){frame(108,7,40,18,"#9fd8f5");r(114,14,18,8,"#fff");r(112,16,6,5,"#fff");r(128,12,6,6,"#f5f5f5");r(130,14,2,2,"#333");r(118,12,10,2,"#e8873a");r(136,10,8,8,"#c9a06a");r(138,12,4,4,"#e8873a")}
  if(D.dmoon){frame(214,8,22,28,"#1b2556");r(224,13,8,8,"#ffe9a8");r(227,13,5,8,"#1b2556");r(219,26,2,2,"#fff");r(230,28,2,2,"#fff");r(222,32,2,2,"#fff")}
  if(D.dphoto){frame(210,42,16,18,"#fff6e8");r(214,48,8,6,"#ff8fa8");r(216,46,4,3,"#ff8fa8")}
  if(D.dfairy){var cols=["#ff6f9c","#ffd34d","#6fe0ff","#8fff9a"];for(var x=0;x<240;x+=8){var y=3+Math.round(Math.sin(x/12)*3);r(x,y,8,1,"#6b4426");r(x+3,y+1,3,3,cols[(x/8+t)%4|0])}}
  if(D.dcandle){[[84,98,3],[212,104,2],[20,118,2]].forEach(function(c,i){var fl=(t+i)%2;for(var k=0;k<c[2];k++){var x=c[0]+k*7,y=c[1]-(k%2)*4;r(x,y,4,8,"#fff1d0");r(x+1,y-3-fl,2,3+fl,"#ffb02e");r(x+1,y-4-fl,2,1,"#fff1a8");g.fillStyle="rgba(255,190,80,.18)";g.fillRect(x-4,y-9,12,16)}})}
}
var TVon=false;
var HTITLE=["Our cabin","Doodi & Danoya's home"],HMSG=["Your cabin. A bed, a TV, and a window that faces the lake.","Home sweet home. The kettle is on."],CALLT="Her face lights up the screen. 'You look tired,' she says. 'You look beautiful,' you say. She tells you about the rain in Middlesbrough and you tell her about the lake. Neither of you wants to hang up.",TOGT="Danoya picks the show. You pick the blanket. She falls asleep before the ending and you pretend you didn't notice.";
function houseScene(home){
  return new Promise(function(done0){var done=function(){setDate(false);done0()};
    var msg=HMSG[home?1:0];
    function R2(){
      var h=S.min/60,late=h>=22||h<5;
      showOv('<h3>'+HTITLE[home?1:0]+'</h3><canvas id="room" width="240" height="150" style="width:72%;border:3px solid #6b4426;border-radius:12px;image-rendering:pixelated;display:block;margin:0 auto"></canvas><p class="mini">'+hhmm(S.min)+' · Day '+S.day+'</p><p id="hmsg" style="min-height:3.4em;font-weight:700;font-size:1rem;margin:4px 0">'+msg+'</p><div id="hb" style="display:grid;grid-template-columns:1fr 1fr;gap:6px"></div>');
      TVon=false;drawRoom($("room"),home);clearInterval(window.__rt);window.__rt=setInterval(function(){if(!$("room")){clearInterval(window.__rt);return}room_t++;drawRoom($("room"),home)},450);
      var hb=$("hb");function add(t,fn){var b=document.createElement("button");b.className="mbtn";b.style.fontSize="1rem";b.style.padding="10px 12px";b.textContent=t;b.onclick=fn;hb.appendChild(b)}
      add("📺 Watch TV",tvMenu);
      add("🛋 Rest an hour",function(){if(S.min>=1380){msg="You're too sleepy to rest. Go to bed!";hideOv();R2();return}S.min=Math.min(Math.max(1439,S.min),S.min+60);msg="You rest on the couch for an hour. Eyes closed, thoughts of her.";hideOv();R2()});
      if(home&&hearts()>=6&&!N.away)add("🤗 Cuddle with Danoya",cuddle);
      add("🛏 Sleep until morning"+(S.min<18*60?" (it's early)":""),function(){hideOv();done();sleepNow(false)});
      add("🚪 Leave",function(){hideOv();done()})}
    function cuddle(){hideOv();if(S.cuddled===S.day){msg="She's already half asleep on your shoulder. Let her rest. Tomorrow for more.";R2();return}S.cuddled=S.day;setDate(true);S.min=Math.min(Math.max(1439,S.min),S.min+60);msg="Danoya curls up next to you, warm and quiet. 'Come home to me every night,' she murmurs. Your heart does a backflip.";addFP(35);N.emote="💖";setTimeout(function(){N.emote=null},2500);R2()}
    function tvMenu(){
      hideOv();showOv('<h3>📺 What to watch?</h3><div id="hb" style="display:grid;grid-template-columns:1fr 1fr;gap:6px"></div>');var hb=$("hb");
      function add(t,fn){var b=document.createElement("button");b.className="mbtn";b.style.fontSize="1rem";b.style.padding="10px 12px";b.textContent=t;b.onclick=fn;hb.appendChild(b)}
      TV.forEach(function(s){add(s.e+" "+s.n+" ("+s.m/60+"h)",function(){watch(s,false)})});
      if(S.min>=17*60&&S.min<23*60&&S.intro&&S.meet&&S.vcall!==S.day)add("📞 Video call with "+OTHER+" (1h)",function(){watch({e:"📞",n:"Video call",m:60,t:[CALLT]},"call")});
      if((home||CH2)&&hearts()>=4&&!N.away&&S.tvTog!==S.day)add("💛 Watch together on the couch (2h)",function(){watch({e:"💛",n:"TV with "+OTHER,m:120,t:[TOGT]},"together")});
      add("Back",function(){hideOv();R2()})}
    function watch(s,kind){
      hideOv();if(S.min+s.m>=1500){msg="It's too late for a whole show, you'd miss your 1 am bedtime. Maybe tomorrow.";R2();return}
      S.min+=s.m;msg=s.e+" "+s.n+". "+s.t[Math.floor(Math.random()*s.t.length)];
      if(kind==="call"){S.vcall=S.day;addFP(20);setDate(true)}if(kind==="together"){S.tvTog=S.day;addFP(40);setDate(true)}
      R2();TVon=true;drawRoom($("room"),home);paintHud()}
    R2()})}
