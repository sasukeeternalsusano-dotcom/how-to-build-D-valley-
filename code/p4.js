buildWorld();
for(var dk in inter){if(inter[dk].k==="door")solid[dk]=1}
/* ---------- interaction ---------- */
var LETTERS=["Doodi,\nI hope the valley's treating you well. The sunflowers say hi. I said it first. —D","To my favourite farmer,\nIf you find a four-leaf clover, keep it. If you find a squash, send it. —D","Dear Doodi,\nI looked at the moon and thought 'he's under this too'. Quite annoying how much I like that. —D","Hi, you.\nNo reason. Just hi. —D","Doodi,\nBring snacks. Bring Reese's. Bring yourself, in that order. (Kidding. Mostly.) —D"];
function applyHome(){if(S.homeBuilt){for(var y=HOME.y;y<HOME.y+HOME.h;y++)for(var x=HOME.x;x<HOME.x+HOME.w;x++)solid[ix(x,y)]=1;inter[ix(HOME.door,HOME.y+HOME.h-1)]={k:"door",b:"home"}}}
async function act(fn){if(talking)return;talking=true;try{await fn()}catch(e){console.error(e)}talking=false;paintHud()}
async function sleepNow(late){
  await fadeOut();var g=newDay();applyHome();paintHud();bgmSync();await fadeIn();
  toast("Day "+S.day+(S.rain?" · rainy":" · sunny"));
  if(S.homeBuilt&&S.homeDay===S.day-1)toast("🏡 The home is finished!");sfxPlay("chime");checkEventReady()}
function midnightAlert(){
  sfxPlay("bad");
  return new Promise(function(res){showOv('<h3>🌙 It\'s midnight!</h3><p><b>Go to bed before 1:00 am.</b></p><p>If you\'re still out at 1 am, you collapse. Some villagers find you and carry you home. 🪙 About a quarter of your coins goes missing on the way, and a new day starts.</p><p class="mini">Tip: open your cabin door (or home) and pick "Sleep until morning".</p><button class="big" id="okb" type="button">Got it</button>');$("okb").onclick=function(){hideOv();res()}})}
async function passOut(){
  var lost=Math.min(S.coins,Math.max(Math.round(S.coins*.25),Math.min(S.coins,20)));
  await fadeOut();S.coins-=lost;var g=newDay();applyHome();paintHud();bgmSync();await fadeIn();
  await say("","You stayed out too late and collapsed on the path. 😴 Some villagers found you and carried you home."+(lost?" Along the way, 🪙"+lost+" fell out of your pockets.":" (You had no coins to lose, lucky.)")+" It's a new day. Next time, be in bed before 1 am!");
  sfxPlay("chime");checkEventReady()}
var DOORS={farm:function(){return houseScene(false)},cot:function(){return say("","Danoya's cabin. Her curtains are patterned with tiny stars. You decide not to knock.")}};
function interact(){
  var fx=P.x+DX[P.d],fy=P.y+DY[P.d];if(!inb(fx,fy))return;
  if(!N.away&&((N.x===fx&&N.y===fy)||(N.tx===fx&&N.ty===fy)))return act(function(){N.d=(P.d+2)%4;return talkN()});
  var vn=(typeof vnpcAt==="function")?vnpcAt(fx,fy):null;if(vn)return act(function(){return vnTalkTo(vn)});
  var w=null;S.wild.forEach(function(q){if(q.x===fx&&q.y===fy)w=q});if(w)return pickWild(w);
  var it=inter[ix(fx,fy)];
  if(it){
    if(it.k==="sign")return act(function(){return say("",it.tf?it.tf():it.t)});
    if(it.k==="camp")return act(campFire);
    if(it.k==="stall")return act(function(){return stall(it.s)});if(it.k==="lib")return act(library);
    if(it.k==="board")return act(board);
    if(it.k==="stove")return act(stove);
    if(it.k==="door"){
      if(it.b==="farm")return act(function(){return DOORS.farm()});
      if(it.b==="shop")return act(async function(){var h=S.min/60;if(h<8||h>=20){await say("Mr. Rocket","Closed! Open 8am to 8pm. Prepare for trouble tomorrow.");return}openShop()});
      if(it.b==="cot")return act(function(){return DOORS.cot()});
      if(it.b==="home")return act(function(){return houseScene(true)})}
    if(it.k==="mail")return act(async function(){if(S.mailDay===S.day){await say("","No new mail. Only dust and hope.");return}S.mailDay=S.day;var l=S.day%3===0&&hearts()>=1?LETTERS[(S.day/3|0)%LETTERS.length]:null;if(l){await say("Letter from Danoya",l.replace(/\n/g," "));addFP(10)}else{S.coins+=10;S.totalCoins+=10;await say("","A little postcard from Mr. Rocket, with a 10 coin 'good luck' note stapled to it. 🪙+10")}});
    if(it.k==="hive"&&typeof hiveTalk==="function")return act(hiveTalk);
    if(it.k==="bench")return act(async function(){var nt=S.min>=19*60||S.min<5*60;S.min=Math.min(Math.max(1439,S.min),S.min+30);await say("",nt?"You sit on the bench and watch the stars come out. 30 minutes pass. It feels very nice.":"You sit on the bench and watch the clouds. 30 minutes pass. It feels very nice.")})}
  var g=ground[ix(fx,fy)];
  if(g===SO)return act(function(){return plotAct(fx,fy)});
  if(g===WA||g===DW){
    if(!has("rod")){toast("You need a fishing rod");return}
    if(solid[ix(P.x,P.y)]){return}
    startCast(fx,fy);return}
}
function pressA(){
  ac();
  if(advance())return;
  if(window.__dunOn){window.__dunA();return}
  if(window.__reel){window.__reel();return}
  if(window.__stir){window.__stir();return}
  if(window.__star){window.__star();return}
  if(ui||talking)return;
  if(fish){if(fish.bite)act(biteAct);else{fish=null;toast("You reel it back in.")}return}
  interact()}
/* ---------- input ---------- */
var KEYD={ArrowUp:0,ArrowRight:1,ArrowDown:2,ArrowLeft:3,w:0,d:1,s:2,a:3,W:0,D:1,S:2,A:3};
document.addEventListener("keydown",function(e){
  var tg=e.target&&e.target.tagName;if(tg==="INPUT"||tg==="TEXTAREA")return;
  if(e.metaKey||e.ctrlKey||e.altKey)return;
  if(e.key in KEYD){e.preventDefault();var d=KEYD[e.key];if(window.__dance&&e.key.indexOf("Arrow")===0){window.__dance(d);return}held[d]=true;return}
  if(e.key===" "||e.key==="Enter"||e.key==="e"||e.key==="E"){if(document.activeElement&&document.activeElement.tagName==="BUTTON"&&e.key!=="e"&&e.key!=="E")return;e.preventDefault();pressA();return}
  if(e.key==="Escape"||e.key==="q"||e.key==="Q"){e.preventDefault();toggleMenu()}});
document.addEventListener("keyup",function(e){var tg=e.target&&e.target.tagName;if(tg==="INPUT"||tg==="TEXTAREA")return;if(e.key in KEYD)held[KEYD[e.key]]=false});
window.addEventListener("blur",function(){held=[false,false,false,false]});
function toggleMenu(){if(window.__dunOn){window.__dunSwap();return}if(menuOpen)closeMenu();else openMenu()}
document.querySelectorAll(".dp button").forEach(function(b){var d=+b.dataset.d;
  b.addEventListener("pointerdown",function(e){e.preventDefault();try{ac()}catch(x){}held[d]=true;b.classList.add("on")});
  ["pointerup","pointerleave","pointercancel"].forEach(function(n){b.addEventListener(n,function(){held[d]=false;b.classList.remove("on")})})});
$("ba").addEventListener("pointerdown",function(e){e.preventDefault();pressA()});
$("bb").addEventListener("pointerdown",function(e){e.preventDefault();ac();toggleMenu()});
/* ---------- loop ---------- */
var last=0,acc=0,lastSave=0,lastMin=-1;
function frame(ts){
  var dt=Math.min(.05,(ts-last)/1000||0);last=ts;time+=dt;
  if(window.__dunOn){window.__dunStep(dt);requestAnimationFrame(frame);return}
  if(S&&started){
    if(!ui&&!talking){
      S.min+=dt*1.25;
      if(S.min>=1440&&S.warned!==S.day){S.warned=S.day;talking=true;midnightAlert().then(function(){talking=false})}
      else if(S.min>=1500){talking=true;passOut().then(function(){talking=false})}
      else if(S.min>=1470&&S.warn2!==S.day){S.warn2=S.day;toast("⏰ 12:30 am! Only 30 minutes left to get to bed!");sfxPlay("bad")}
      else if(S.min>=1320&&S.warn0!==S.day){S.warn0=S.day;toast("🌙 It's 10 pm. Danoya's asleep. Head home soon.")}
      var mm=Math.floor(S.min);if(mm!==lastMin&&mm%5===0){lastMin=mm;paintHud();bgmSync()}
      if(!P.mv&&!fish){for(var d=0;d<4;d++){var dd=[0,1,2,3][d];if(held[dd]){tryStep(P,dd,"p");break}}}
      else if(!P.mv&&fish&&(held[0]||held[1]||held[2]||held[3])){fish=null;toast("You pulled the line back.")}
      var ev=activeEvent();if(ev&&!talking&&!fish&&Math.max(Math.abs(P.x-ev.place[0]),Math.abs(P.y-ev.place[1]))<=1.5)startEvent(ev);
      if(typeof discCheck==="function")discCheck();
      var sc=secretActive();if(sc&&!ev&&!talking&&!fish&&Math.max(Math.abs(P.x-sc.place[0]),Math.abs(P.y-sc.place[1]))<=1.5)startSecret();
      fishUpdate(dt)}
    stepMover(P,dt,5.2);stepMover(N,dt,3.6);if(!ui&&!talking)npcThink();
    if(ts-lastSave>45000&&!ui){lastSave=ts;save()}
    draw()}
  requestAnimationFrame(frame)}
/* ---------- title & start ---------- */
var started=false;
function title(){
  var has_=false;try{has_=!!ls(SAVEKEY)}catch(e){}
  showOv('<div id="title"><h3 class="tt">Danoya<br>Valley</h3><p class="hand">a little world for my favourite person 💛</p><p class="mini">Chapter 1 · Heart events · Fishing · Flowers · Cooking</p>'+(has_?'<button class="big" id="tc" type="button">Continue</button><br><br><button class="mbtn" id="tn" type="button">New game</button>':'<button class="big" id="tn" type="button">Start</button>')+'</div>');
  var tc=$("tc");if(tc)tc.onclick=function(){ac();hideOv();openThen(function(){begin(true)})};
  $("tn").onclick=function(){ac();hideOv();openThen(function(){begin(false)})}}
async function begin(cont){
  if(cont&&load()){}else{S=fresh();plots={};spawnWild()}
  if(!S.wild||!S.wild.length)spawnWild();
  applyHome();started=true;paintHud();syncMuBtn();bgmSync();
  if(cont){P.x=P.tx=9;P.y=P.ty=35;P.px=9*T;P.py=35*T;toast("Welcome back, Doodi")}
  if(!S.intro){talking=true;
    await seq([["","A warm wind from the lake. Your cabin has a creaky door and a very good view."],["","Paper lanterns are strung between the rooftops, unlit, waiting for a festival. Nobody can say who hung the first one. Nobody has asked in a long time."],["","Somewhere in this valley is someone you've been thinking about all along. Danoya."],["Doodi","Let's see where the valley goes."],["","A talks and uses things. Everything else is the Menu."]]);
    S.intro=true;talking=false;save();paintHud()}
  checkEventReady()}
/* test hooks */
window.__dv={vnl:function(){return vnList().map(function(h){return [h.v.id,h.x,h.y]})},rig:function(c){var o=cx;cx=c;return o},person:person,setArmor:function(v){ARMOR=v},setDay:function(d){if(!S)S={};S.day=d},tp:function(x,y){P.x=P.tx=x;P.y=P.ty=y;P.px=x*T;P.py=y*T},sleep:function(){return sleepNow()},solid:function(x,y){return !inb(x,y)||!!solid[ix(x,y)]},bfs:function(a,b,c,d){return bfs(a,b,c,d)},mk:function(){return [bgmKey,songOn,dateOn]},house:function(h){houseScene(h)},evt:function(i){return EVT.filter(function(e){return e.id===i})[0]},g:function(x,y){return ground[ix(x,y)]},fishNow:function(){return fish},get S(){return S},vn:function(){return vnList().map(function(h){return [h.v.id,h.x,h.y]})},talkVN:function(id){return vnTalkTo(VN.filter(function(v){return v.id===id})[0])},QUESTS:QUESTS,RECIPES:RECIPES,sec:window.__secret,P:P,N:N,tryStep:tryStep,startEvent:startEvent,EVENTS:EVENTS,interact:interact,pressA:pressA,addFP:addFP,newDay:newDay,openMenu:openMenu,openShop:openShop,stove:stove,begin:begin,sleepNow:sleepNow,act:act,get ui(){return ui}};
