/* ---------- secret chapter (unlocks after every goal and log is complete) ---------- */
(function(){var st=document.createElement("style");st.textContent=".mem{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:10px 0}.mem button{aspect-ratio:1;font-size:1.9rem;border-radius:12px;border:3px solid #6b4426;background:#f3d9a6;cursor:pointer;transition:transform .25s;padding:0}.mem button.up{background:#fff8e8;transform:rotateY(0)}.mem button.ok{background:#d6f5c9;border-color:#2f9d5a}.ff{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:10px auto;max-width:240px}.ff button{aspect-ratio:1.3;border-radius:16px;border:4px solid #0004;cursor:pointer;font-size:1.6rem;opacity:.55;transition:opacity .1s,transform .1s,box-shadow .1s}.ff button.lit{opacity:1;transform:scale(1.06);box-shadow:0 0 28px 8px #fff9}";document.head.appendChild(st)})();
function SECRET(){return CH2?{id:"sx",place:[24,8],where:"Doodi's hidden treehouse",title:"The Secret Treehouse"}:{id:"sx",place:[50,42],where:"the Wishing Cove",title:"The Wishing Cove"}}
function allLogged(){
  var fl=["carp","sunfish","perch","eel","lcarp","koi","dfish","sardine","crab","tuna","squid","puffer"];
  if(Object.keys(S.flowerLog).length<4)return false;
  for(var i=0;i<fl.length;i++)if(!S.fishLog[fl[i]])return false;
  for(var j=0;j<RECIPES.length;j++)if(!S.dishLog[RECIPES[j].id])return false;
  return true}
function secretReady(){if(S.seen.sx)return false;for(var i=0;i<QUESTS.length;i++)if(!S.claimed[QUESTS[i].id])return false;return allLogged()}
function secretActive(){if(!secretReady()||S.min<19*60||S.min>=24*60)return null;return SECRET()}
function secretNotify(){if(secretReady()&&!S.secNote){S.secNote=1;celebrate("Secret unlocked!");setTimeout(function(){toast("⭐ A secret place has appeared on the Map! Visit after 7 pm.")},1200)}}
function secretMapMark(g,K,lab){
  if(!secretReady())return;var e=SECRET(),ex=e.place[0]*K+K/2,ey=e.place[1]*K+K/2;
  g.fillStyle="#8a5cf6";g.beginPath();g.arc(ex,ey,15,0,7);g.fill();g.lineWidth=3;g.strokeStyle="#fff";g.stroke();lab("⭐",ex,ey,20);lab("Secret: "+(S.min>=19*60?"open now":"after 7 pm"),ex,ey-26,18,"#e6d9ff")}
var _tq=tabQuests;
tabQuests=function(mb){_tq(mb);h4(mb,"⭐ Secret chapter");
  var s=SECRET(),done=!!S.seen.sx,ready=secretReady();
  mb.appendChild(mrow(done?"✅":ready?"⭐":"🔒",s.title,done?"Completed.":ready?"Unlocked! Find it on the Map and visit after 7 pm.":"Claim every goal and finish the whole Log (flowers, fish and dishes).",null,null,!ready&&!done,done))};
function memGame(){
  return new Promise(function(res){
    var base=["🧺","🌠","🏮","🏡","🎏","🌻"],deck=base.concat(base),moves=0,open=[],lock=false,found=0;
    for(var i=deck.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=deck[i];deck[i]=deck[j];deck[j]=t}
    showOv('<h3>Memory of Us 🐚</h3><p>Flip two cards. Match every memory.</p><div class="mem" id="mem"></div><p id="mmv">Moves: 0</p>');
    var box=$("mem");
    deck.forEach(function(e,idx){var b=document.createElement("button");b.type="button";b.textContent="❔";b.dataset.e=e;b.onclick=function(){flip(b)};box.appendChild(b)});
    function flip(b){if(lock||b.classList.contains("up")||b.classList.contains("ok"))return;b.textContent=b.dataset.e;b.classList.add("up");sfxPlay("tap");open.push(b);
      if(open.length===2){moves++;$("mmv").textContent="Moves: "+moves;lock=true;var a=open[0],c=open[1];
        if(a.dataset.e===c.dataset.e){setTimeout(function(){a.className="ok";c.className="ok";open=[];lock=false;found++;sfxPlay("chime");if(found>=6){setTimeout(function(){window.__mem=null;hideOv();res(moves)},700)}},350)}
        else setTimeout(function(){a.textContent="❔";c.textContent="❔";a.classList.remove("up");c.classList.remove("up");open=[];lock=false;sfxPlay("bad")},800)}}
    window.__mem=function(){var bs=[].slice.call(box.children).filter(function(b){return !b.classList.contains("ok")&&!b.classList.contains("up")});if(open.length||!bs.length)return;var e=bs[0].dataset.e,m=bs.filter(function(b){return b.dataset.e===e});flip(m[0]);flip(m[1])}})}
function fireflyGame(){
  return new Promise(function(res){
    var cols=["#ff6f9c","#ffd34d","#6fe0ff","#8fff9a"],em=["💗","💛","💙","💚"],fq=[392,494,587,784],seqf=[],round=0,lives=3,pos=0,accept=false,N0=6;
    showOv('<h3>Firefly Jar 🫙</h3><p id="ffm">Watch the fireflies glow, then repeat them.</p><div class="ff" id="ff"></div><p id="ffl">Lives: ❤️❤️❤️ · Round 1 / '+N0+'</p>');
    var box=$("ff");cols.forEach(function(c,i){var b=document.createElement("button");b.type="button";b.style.background=c;b.textContent=em[i];b.onpointerdown=function(e){e.preventDefault();tap(i)};box.appendChild(b)});
    function lit(i,ms){var b=box.children[i];b.classList.add("lit");tone(fq[i],0,.28,"triangle",.12);setTimeout(function(){b.classList.remove("lit")},ms||380)}
    function lifeTxt(){$("ffl").textContent="Lives: "+"❤️".repeat(lives)+(lives<3?"🖤".repeat(3-lives):"")+" · Round "+Math.min(round+1,N0)+" / "+N0}
    function play(){accept=false;pos=0;lifeTxt();$("ffm").textContent="Watch…";var k=0;function nx(){if(k>=seqf.length){setTimeout(function(){accept=true;$("ffm").textContent="Your turn!"},300);return}lit(seqf[k],420);k++;setTimeout(nx,650)}setTimeout(nx,700)}
    function nextRound(){if(round>=N0){window.__ffseq=null;hideOv();res(lives);return}seqf.push(Math.floor(Math.random()*4));window.__ffseq=seqf;play()}
    function tap(i){if(!accept)return;lit(i,200);
      if(i===seqf[pos]){pos++;if(pos>=seqf.length){accept=false;round++;sfxPlay("chime");$("ffm").textContent=round>=N0?"The jar is glowing!":"Nice!";setTimeout(nextRound,800)}}
      else{lives--;sfxPlay("bad");accept=false;if(lives<=0){$("ffm").textContent="So close… the fireflies settle. Try the jar once more!";lives=3;round=0;seqf=[];setTimeout(nextRound,1600)}else{$("ffm").textContent="Oops. Watch again.";setTimeout(play,1200)}}}
    nextRound()})}
async function secretCh1(){
  await seq([["","Behind the rocks, a curve of beach the tide keeps to itself. Paper boats drift across the water, each carrying a small flame. Danoya is sitting at the edge, a boat in her hands."],
   ["Danoya","You found it. Every flower, every fish, every dish. You really can't leave a list unfinished."],
   ["Doodi","It's a condition."],
   ["Danoya","This is the Wishing Cove. Granny Wren says a wish spoken here goes out with the tide, and the tide is a good listener."],
   ["Danoya","I came here my first month. I missed home so much I couldn't breathe. I made a wish, and I didn't tell anyone what it was."],
   ["Danoya","Before we make ours, help me find the memories I folded into these. I lose track of which is which."]]);
  var mv=await memGame();
  await seq([["Danoya",mv<=9?"Not one wasted. You remember everything.":mv<=14?"Almost perfect. You kept the ones that matter.":"You took your time. I liked watching you remember."],
   ["","She opens a small glass jar. A pressed daffodil. A paper star. A tiny lantern. A folded note."],
   ["Danoya","The daffodil is our first week. The star, the night we caught them together. The lantern, the dance."],
   ["Doodi","And the note?"],
   ["Danoya","'Thank you for being the best thing that ever happened to this valley.' It took me four drafts."],
   ["","She sets the note inside the last paper boat and holds it out to you, together with a pencil stub."],
   ["Danoya","Your turn. Say it quietly. The tide doesn't need it loud."]]);
  var o=await ask("Doodi","You hold the boat over the water. What do you wish for?",["Her smile, always","One more adventure","That none of this ends"]);
  await seq([["Doodi",["Her smile. Always.","One more adventure. Then one after that.","That none of this ever ends."][o]],
   ["","You set the boat down. The water takes it gently, turning it toward the open sea. The little flame holds."],
   ["Danoya","Mine went out a few minutes ago. While you were matching memories."],
   ["Doodi","What did you wish?"],
   ["Danoya","The same one I made my first month. That someone would find this place with me."],
   ["Danoya","It took a while. But it came true."],
   ["","You sit side by side until the last boat reaches the dark. The cove keeps what was said."]])}
async function secretCh2(){
  await seq([["","Past the old pines, a rope ladder hangs from a huge oak. High above, a little treehouse glows with string lights. Doodi is waiting at the top."],
   ["Doodi","You finished everything. Every goal, every log. I was hoping you would. Come up."],
   ["Danoya","Doodi... did you build this?"],
   ["Doodi","Plank by plank, on all the afternoons you thought I was fishing. I was not that good at fishing anyway."],
   ["","Inside: a quilt, cushions, a shelf of tiny wooden fish, and a brass telescope pointing at the sky."],
   ["Doodi","The jar on the shelf is empty. I need your help to fill it with fireflies."]]);
  var lv=await fireflyGame();
  await seq([["Doodi",lv>=3?"Perfect. Not one wrong. You glow brighter than the jar.":lv>=2?"Beautiful. The jar is bright, and so are you.":"The jar is glowing, and I think it is because of you."],
   ["","The jar fills the treehouse with warm light. Doodi lifts the telescope toward the sky."],
   ["Doodi","Look through it. Third star from the left. That is the one I named."],
   ["Danoya","Which name?"],
   ["Doodi","Yours. It is up there, and it is on every map I draw. Even if I forget a date, the sky will not."],
   ["Danoya","I... you gave me a star."],
   ["Doodi","I would give you a sky if I could."]]);
  var o=await ask("Doodi","He kneels beside the quilt. What do you say?",["Tell him he is your whole sky","Tease him","Just hug him and say nothing"]);
  await seq([["Danoya",["You are my whole sky. All of it. Even the bits with clouds.",CH2?"Only if I get the best seat. And the first fireflies. And if I take the seat in your lap, wrap my arms around your neck and whisper in your ear, what are you going to do about it?":"Only if I get the best seat. And the first fireflies.","(You do not need words. You hug him.)"][o]],
   ["Doodi",["I will keep every one of those clouds.",CH2?"Done. The best seat is yours. It always was. ...Okay. You are going to be the death of me, you know that? Come here, trouble. Closer. I want you right here, nothing between me and you but the starlight.":"Done. The best seat is yours. It always was.","(He holds on, and the lights blink in time with your heartbeat.)"][o]],
   ["","The telescope turns slowly toward the star with your name. The treehouse hums with fireflies."]])}
async function startSecret(){
  var e=SECRET();if(talking||S.seen.sx)return;talking=true;setDate(true);
  await fadeOut();
  var sx=e.place[0],sy=e.place[1],fr=freeNear(sx,sy);sx=fr[0];sy=fr[1];P.x=P.tx=sx;P.y=P.ty=sy;P.px=sx*T;P.py=sy*T;P.mv=0;
  var f2=freeNear(sx+1,sy,[sx,sy]),nx=f2[0],ny=f2[1];
  N.x=N.tx=nx;N.y=N.ty=ny;N.px=nx*T;N.py=ny*T;N.mv=0;N.path=[];N.d=nx>sx?3:1;P.d=nx>sx?1:3;N.away=false;N.hold=true;setupScene("sx");
  await fadeIn();
  await (CH2?secretCh2():secretCh1());
  S.seen.sx=1;try{albumAdd("c"+(CH2?2:1)+"_sx")}catch(x){}S.coins+=500;S.totalCoins+=500;S.fp=Math.min(1000,S.fp+100);
  await lovelyOv("⭐ "+e.title,CH2?"You found Doodi's secret treehouse and a star with your name.<br><br><b>+🪙500 · +💗</b>":"You found the Wishing Cove, and sent a wish out with the tide.<br><br><b>+🪙500 · +💗</b>","Back to the valley");
  stopSong(true,true);setDate(false);
  await fadeOut();endScene();N.hold=false;N.goal=null;N.path=[];N.emote=null;S.min=Math.min(Math.max(1439,S.min),S.min+60);paintHud();await fadeIn();
  toast("⭐ Secret chapter complete!");celebrate("Secret complete!");sfxPlay("chime");talking=false;save()}
window.__secret={ready:secretReady,start:startSecret};
