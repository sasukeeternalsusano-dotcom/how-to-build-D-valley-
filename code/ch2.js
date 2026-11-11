/* ================= CHAPTER 2 : HER TURN ================= */
CH2=true;SONGKEYS=["jojo","jojo6","winners","backs"];OTHER="Doodi";SAVEKEY="danoya-valley-ch2-v1";ROLE={p:"danoya",n:"doodi"};
HTITLE=["Danoya's cottage","Our home"];HMSG=["Your cottage. Soft light, a comfy bed, a TV, and a window that faces the lake.","Home sweet home."];
CALLT="His face lights up the screen. 'You look tired,' he says. 'You look beautiful,' you say back, before he can. He tells you about the lake at sunset and you tell him about the rain in Middlesbrough. Neither of you wants to hang up.";
TOGT="Doodi picks a snack. You pick the blanket. He falls asleep before the ending and you pretend you didn't notice.";
function esc(t){return String(t==null?"":t).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
var LOVED=["pizza","reese","water"],HATED=[],PROF=null;
(function(){var st=document.createElement("style");st.textContent=".qgrid{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:8px 0}.qopt{font:800 1rem Figtree,sans-serif;background:#fff;color:#3a2616;border:2px solid #c79a62;border-radius:12px;padding:10px 6px;cursor:pointer;min-height:48px}.qopt.sel{background:#ffe3a8;border-color:#c2412e;box-shadow:0 0 0 2px #c2412e66}.qopt.sw{color:#fff;text-shadow:0 1px 2px #000a;border-color:#fff}.qtext{font-weight:800;font-size:1.1rem!important;margin:6px 0}.qin{width:100%;font:700 1rem Figtree,sans-serif;padding:10px;border:2px solid #c79a62;border-radius:10px;margin:6px 0;background:#fff;color:#3a2616}.qbuild{text-align:left;background:#fff;border:2px dashed #c79a62;border-radius:12px;padding:8px 10px;font-size:.9rem;max-height:92px;overflow:auto;margin:8px 0}.qbuild div{margin:2px 0}.qnar{background:#fff3d6;border-left:4px solid #c2412e;border-radius:8px;padding:8px 10px;text-align:left;font-size:.95rem;margin:6px 0}.qbar{height:10px;background:#e8d5b0;border-radius:6px;overflow:hidden;border:2px solid #6b4426;margin:4px 0}.qbar i{display:block;height:100%;background:linear-gradient(90deg,#ff8f6e,#ffc83d);transition:width .3s}";document.head.appendChild(st)})();
/* ---------- items for his tastes ---------- */
IT.burger={n:"Burger",e:"🍔",p:14,k:"dish"};IT.shawarma={n:"Shawarma",e:"🌯",p:13,k:"dish"};IT.pasta={n:"Pasta",e:"🍝",p:15,k:"dish"};IT.sushi={n:"Sushi",e:"🍣",p:20,k:"dish"};IT.chicken={n:"Fried chicken",e:"🍗",p:15,k:"dish"};IT.pizza.p=45;
IT.chips={n:"Chips",e:"🍟",p:6,k:"gift"};IT.icecream={n:"Ice cream",e:"🍦",p:9,k:"gift"};IT.gummy={n:"Gummy bears",e:"🐻",p:6,k:"gift"};IT.popcorn={n:"Popcorn",e:"🍿",p:6,k:"gift"};
IT.coffee={n:"Coffee",e:"☕",p:8,k:"gift"};IT.icetea={n:"Iced tea",e:"🧋",p:7,k:"gift"};IT.juice={n:"Orange juice",e:"🧃",p:7,k:"gift"};IT.energy={n:"Energy drink",e:"⚡",p:8,k:"gift"};
IT.hotsauce={n:"Hot sauce",e:"🌶",p:4,k:"gift"};IT.cheesespread={n:"Cheese spread",e:"🧀",p:3,k:"gift"};IT.kitkat={n:"KitKat",e:"🍫",p:7,k:"gift"};IT.broccoli={n:"Broccoli",e:"🥦",p:3,k:"gift"};
IT.cookie.p=40;
var QOPT={
 colour:[["Red","#d9423a"],["Orange","#f08a2e"],["Yellow","#f2c230"],["Green","#3f9a46"],["Teal","#1f9d93"],["Blue","#2f6fd0"],["Purple","#7b4fc4"],["Pink","#ec6fa0"],["Black","#25252b"],["White","#ececec"]],
 food:[["Pizza","🍕","pizza"],["Burgers","🍔","burger"],["Shawarma","🌯","shawarma"],["Pasta","🍝","pasta"],["Sushi","🍣","sushi"],["Fried chicken","🍗","chicken"]],
 snack:[["Reese's","🍫","reese"],["KitKat","🍫","kitkat"],["Chips","🍟","chips"],["Ice cream","🍦","icecream"],["Cookies","🍪","cookie"],["Gummy bears","🐻","gummy"],["Popcorn","🍿","popcorn"]],
 drink:[["Cold water","💧","water"],["7UP Zero","🥤","z7up"],["Coffee","☕","coffee"],["Iced tea","🧋","icetea"],["Orange juice","🧃","juice"],["Energy drink","⚡","energy"]],
 music:[["Phoebe Bridgers","🎤","phoebe"],["The Strokes","🎸","strokes"],["JoJo soundtracks","🕺","jojo"],["Kingdom Hearts","🗝","date"],["Pokémon","⚡","morn"],["Wreck-It Ralph","🍬","end"]],
 show:[["Stardew Valley","🌾"],["JoJo's Bizarre Adventure","🕺"],["Kingdom Hearts","🗝"],["Mega Man X4","🤖"],["Pokémon","⚡"],["Avatar","🌊"],["Wreck-It Ralph","🍬"]],
 hobby:[["Gaming","🎮","porch"],["Fishing","🎣","dock"],["Football","⚽","beach"],["Drawing & music","🎨","meadow"],["Working out","💪","forest"],["Cooking","🍳","stove"]],
 dislike:[["Spicy food","🌶","hotsauce"],["Cheese spreads","🧀","cheesespread"],["Broccoli","🥦","broccoli"],["Arrogant ignorance","🙄",null],["Loud chewing","😖",null],["Being late","⏰",null],["Cold weather","🥶",null]],
 lang:[["Kind words","💬"],["Quality time","🕰"],["Gifts","🎁"],["Hugs & touch","🤗"]]
};
var SPOTS={porch:[9,34,"his cabin porch"],dock:[48,32,"the dock"],beach:[40,41,"the beach"],meadow:[46,12,"the flower meadow"],forest:[12,12,"the forest clearing"],stove:[14,32,"the camp stove"]};
var QS=[
 {id:"colour",t:"Favourite colour",q:"What's Doodi's favourite colour?",type:"colour",how:function(a){return "🎨 His shirt, and the roof of his cabin, are now "+a.n.toLowerCase()+"."}},
 {id:"food",t:"Favourite food",q:"What's his favourite food?",type:"opt",set:"food",other:1,how:function(a){return "🍽 "+a.n+" is now his favourite dish. It will make him light up if you give it to him."+(a.id?"":" (I can't sell that one, but he'll love hearing you remember it.)")}},
 {id:"snack",t:"Favourite snack",q:"What's his favourite snack or sweet?",type:"opt",set:"snack",other:1,how:function(a){return "🍬 "+a.n+" goes on the shop shelf, and he'll love it."}},
 {id:"drink",t:"Favourite drink",q:"What does he drink the most?",type:"opt",set:"drink",other:1,how:function(a){return "🥤 "+a.n+" is stocked at the shop, and counts as a favourite gift."}},
 {id:"music",t:"Favourite music",q:"What music does he love most?",type:"opt",set:"music",other:1,how:function(a){return "🎵 On game night you'll get a '"+a.n+"' option to play for him."}},
 {id:"show",t:"Favourite game or show",q:"What's his favourite game or show?",type:"opt",set:"show",other:1,how:function(a){return "📺 He'll bring up "+a.n+" when you talk, and it's added to the TV list at your cottage."}},
 {id:"hobby",t:"What he does for fun",q:"What does Doodi love doing in his free time?",type:"opt",set:"hobby",how:function(a){return "📍 From 9 am to 1 pm, look for him at "+SPOTS[a.id][2]+". That's his "+a.n.toLowerCase()+" spot."}},
 {id:"dis",t:"What he can't stand",q:"What does he dislike? Pick up to 3.",type:"multi",set:"dislike",max:3,other:1,how:function(a){return a.length?"🚫 Careful with: "+a.map(function(x){return x.n.toLowerCase()}).join(", ")+". Gifts he hates will cost you hearts.":"🚫 Nothing he hates? Easy mode. 😄"}},
 {id:"lang",t:"How he feels loved",q:"What makes Doodi feel the most loved?",type:"opt",set:"lang",how:function(a){return ["💬 Kind words: chatting with him gives extra hearts.","🕰 Quality time: hanging out with him gives extra hearts.","🎁 Gifts: presents give extra hearts.","🤗 Hugs & touch: hugs give extra hearts."][a.i]}},
 {id:"nick",t:"What he calls you",q:"What does Doodi call you?",type:"text",ph:"e.g. my queen",def:"my queen",how:function(a){return "💬 He'll call you “"+a+"” in the game."}},
 {id:"love",t:"What you love most",q:"What do you love most about him? (A few words.)",type:"text",ph:"e.g. his laugh, how he listens",def:"how safe he makes everything feel",how:function(a){return "💌 I'll write that into the night he opens up to you."}},
 {id:"msg",t:"A message for the end",q:"Last one: write a little message for him. It'll be shown at the end of the game.",type:"text",ph:"Write anything…",def:"I'm already home with you. 💛",how:function(a){return "💛 Saved for the very last scene."}}
];
function drawPv(){var c=$("pv");if(!c)return;var oc=cx;cx=c.getContext("2d");cx.imageSmoothingEnabled=false;cx.fillStyle="#cfe9d5";cx.fillRect(0,0,32,40);person(0,3,2,"doodi",0,false);cx=oc}
function askProfile(){
  return new Promise(function(done){
    var step=-1,A={},log=[];showOv("");
    function box(h){$("ovc").innerHTML=h}
    function logHtml(){return '<div class="qbuild" id="qb">'+(log.length?log.map(function(l){return "<div>✔ "+esc(l)+"</div>"}).join(""):"<div>⏳ Waiting for your first answer…</div>")+'</div>'}
    function intro(){box('<h3>Chapter 2 · Her Turn</h3><div class="qnar">🛠 <b>The Valley Maker:</b> Hi Danoya. In Chapter 1 you waited while Doodi found you. This time <b>you</b> are the one walking the valley, and <b>he</b> is the one to find.</div><div class="qnar">I am going to ask you a few questions about him. As you answer, I build the game around what you tell me: his clothes, his cabin, his favourite food, where he hangs out, what he loves, what he cannot stand. Everything you see in the box below is being built live.</div>'+logHtml()+'<button class="big" id="qs" type="button">Let\'s build it</button>');$("qs").onclick=function(){next()}}
    function next(){step++;if(step>=QS.length)return finish();render()}
    function render(){
      var Q=QS[step],pc=Math.round(step/QS.length*100),sel=null,multi=[],oth="";
      var h='<p class="mini">Question '+(step+1)+' of '+QS.length+'</p><div class="qbar"><i style="width:'+pc+'%"></i></div><h3>'+esc(Q.t)+'</h3><p class="qtext">'+esc(Q.q)+'</p>';
      if(Q.type==="colour"){h+='<canvas id="pv" width="32" height="40" style="width:80px;height:100px;image-rendering:pixelated;border:3px solid #6b4426;border-radius:10px"></canvas><div class="qgrid" id="og"></div>'}
      else if(Q.type==="text"){h+='<input class="qin" id="qi" maxlength="70" placeholder="'+esc(Q.ph)+'" autocomplete="off">'}
      else{h+='<div class="qgrid" id="og"></div>'+(Q.other?'<input class="qin" id="qi" maxlength="40" placeholder="Something else? Type it here" autocomplete="off" hidden>':"")}
      h+=logHtml()+'<button class="big" id="qn" type="button">Next</button>';box(h);
      var og=$("og"),qn=$("qn"),qi=$("qi");
      function ready(){var ok=true;if(Q.type==="colour"||Q.type==="opt")ok=sel!==null&&(sel!==-1||(qi&&qi.value.trim()));qn.disabled=!ok}
      if(Q.type==="colour"){QOPT.colour.forEach(function(c,i){var b=document.createElement("button");b.type="button";b.className="qopt sw";b.style.background=c[1];b.textContent=c[0];if(c[0]==="White"||c[0]==="Yellow")b.style.color="#222",b.style.textShadow="none";b.onclick=function(){sel=i;SHIRT=c[1];[].forEach.call(og.children,function(x){x.classList.remove("sel")});b.classList.add("sel");drawPv();ready()};og.appendChild(b)});SHIRT="#1f2a4a";drawPv()}
      else if(Q.type==="opt"||Q.type==="multi"){var set=QOPT[Q.set];
        set.forEach(function(o,i){var b=document.createElement("button");b.type="button";b.className="qopt";b.textContent=(o[1]?o[1]+" ":"")+o[0];b.onclick=function(){
          if(Q.type==="opt"){sel=i;[].forEach.call(og.children,function(x){x.classList.remove("sel")});b.classList.add("sel");if(qi)qi.hidden=true}
          else{var k=multi.indexOf(i);if(k>-1){multi.splice(k,1);b.classList.remove("sel")}else if(multi.length<Q.max){multi.push(i);b.classList.add("sel")}}ready()};og.appendChild(b)});
        if(Q.other){var ob=document.createElement("button");ob.type="button";ob.className="qopt";ob.textContent="✏ Something else";ob.onclick=function(){qi.hidden=false;qi.focus();if(Q.type==="opt"){sel=-1;[].forEach.call(og.children,function(x){x.classList.remove("sel")})}ob.classList.add("sel");ready()};og.appendChild(ob)}
        if(qi)qi.oninput=ready}
      if(Q.type==="text"){qi.oninput=function(){};}
      ready();
      qn.onclick=function(){
        var ans;
        if(Q.type==="colour"){ans={n:QOPT.colour[sel][0],hex:QOPT.colour[sel][1]}}
        else if(Q.type==="text"){ans=qi.value.trim()||Q.def}
        else if(Q.type==="opt"){var o=QOPT[Q.set];ans=sel===-1?{n:qi.value.trim(),i:-1,e:"✨",id:null,other:true,key:null}:{n:o[sel][0],i:sel,e:o[sel][1],id:o[sel][2],spot:o[sel][2],key:o[sel][2]}}
        else{var o2=QOPT[Q.set];ans=multi.map(function(i){return {n:o2[i][0],e:o2[i][1],id:o2[i][2]}});if(qi&&qi.value.trim()&&!qi.hidden)ans.push({n:qi.value.trim(),e:"🚫",id:null})}
        A[Q.id]=ans;log.push(Q.how(ans));sfxPlay("pick");next()}}
    function finish(){
      var lines=["Painting the cabin and shirt…","Stocking the shop shelves…","Setting Doodi's daily routine…","Writing his dialogue…","Wiring up the five heart events…","Adding your message to the final scene…"],i=0;
      box('<h3>🛠 Building Doodi\'s valley…</h3><div class="qbar"><i id="qpb" style="width:0%"></i></div><div class="qbuild" id="qb" style="max-height:none"></div><div id="qend"></div>');
      var qb=$("qb");function tick(){if(i<lines.length){qb.insertAdjacentHTML("beforeend","<div>⏳ "+lines[i]+"</div>");i++;$("qpb").style.width=Math.round(i/(lines.length+1)*100)+"%";sfxPlay("tap");setTimeout(function(){qb.lastChild.innerHTML="✔ "+qb.lastChild.textContent.replace("⏳ ","");tick()},rm?60:520)}
        else{$("qpb").style.width="100%";var sum='<p class="mini">Here is how his world was built from your answers:</p><div class="qbuild" style="max-height:170px">'+log.map(function(l){return "<div>✔ "+esc(l)+"</div>"}).join("")+'</div><p class="qtext">This time <b>you</b> are Danoya, and he is the one in the valley. Find him, talk to him, fill his hearts. 💛</p><button class="big" id="qbg" type="button">Begin Chapter 2</button>';box('<h3>✔ Doodi\'s valley is ready</h3>'+sum);sfxPlay("chime");$("qbg").onclick=function(){hideOv();done(A)}}}
      tick()}
    intro()})}
/* ---------- apply the profile ---------- */
var BASE_SHOP=null;
function applyProf(A){
  PROF=A;if(A.colour){SHIRT=A.colour.hex;BUILD.farm.roof=A.colour.hex}
  LOVED=[];["food","snack","drink"].forEach(function(k){if(A[k]&&A[k].id&&LOVED.indexOf(A[k].id)<0)LOVED.push(A[k].id)});if(!LOVED.length)LOVED=["pizza","reese","water"];
  HATED=(A.dis||[]).map(function(x){return x.id}).filter(Boolean);
  var sp=SPOTS[A.hobby?A.hobby.id:"porch"]||SPOTS.porch;
  SCHED=[[6,[10,35]],[9,[sp[0],sp[1]]],[13,[35,29]],[16,[48,32]],[19,[44,27]],[22,[9,34]]];
  if(!BASE_SHOP)BASE_SHOP=SHOP.slice();
  var priceOf={macaroni:16,pizza:95,burger:30,shawarma:28,pasta:32,sushi:42,chicken:32,chips:14,icecream:20,gummy:14,popcorn:14,coffee:18,icetea:16,juice:16,energy:18,hotsauce:9,cheesespread:7,broccoli:7,kitkat:16};
  SHOP=BASE_SHOP.filter(function(s){return s[0]!=="plush"&&s[0]!=="book"||true}).concat(Object.keys(priceOf).map(function(k){return [k,priceOf[k]]}));
  if(!LAKEFISH.some(function(f){return f[0]==="lcarp"}))LAKEFISH.splice(LAKEFISH.length-1,0,["lcarp",5,38]);
  RECIPES=RECIPES.filter(function(r){return !r.ch2});
  RECIPES.push({id:"mac",ch2:1,n:"Mac & cheese",e:"🧀",need:{macaroni:1,cheese:1},note:"Danoya's comfort food from home. Macaroni and cheese from the shop."});
  var f=A.food&&A.food.id;if(f&&f!=="pizza"&&f!=="chicken"&&f!=="sushi"&&f!=="shawarma"&&!RECIPES.some(function(r){return r.id===f}))RECIPES.push({id:f,ch2:1,n:IT[f].n,e:IT[f].e,need:f==="burger"?{dough:1,cheese:1,tomato:1}:{dough:1,tomato:1},note:"His favourite!"});
  if(f==="shawarma")RECIPES.push({id:"shawarma",ch2:1,n:"Shawarma",e:"🌯",need:{dough:1,fish:1},note:"His favourite!"});
  if(f==="sushi")RECIPES.push({id:"sushi",ch2:1,n:"Sushi",e:"🍣",need:{fish:2},note:"His favourite!"});
  if(f==="chicken")RECIPES.push({id:"chicken",ch2:1,n:"Fried chicken",e:"🍗",need:{dough:1,cheese:1},note:"His favourite!"});
  TV=TV.filter(function(t){return !t.fav});
  if(A.show)TV.unshift({e:A.show.e||"📺",n:A.show.n+" (his favourite)",m:120,fav:1,t:["You put on "+A.show.n+" for him. You catch yourself loving it more than you expected.","Halfway through you realise you're quoting it like he does. Dangerous."]});
  QUESTS=[
   {id:"q1",t:"Green thumb",d:"Plant 4 flowers in the farm plots.",n:4,p:function(){return S.planted},r:{coins:60}},
   {id:"q2",t:"Angler",d:"Catch 5 fish.",n:5,p:function(){return S.caught},r:{coins:70}},
   {id:"q3",t:"Chef Danoya",d:"Cook 3 dishes.",n:3,p:function(){return S.cooked},r:{coins:80}},
   {id:"q4",t:"Every flower",d:"Pick or grow all 4 kinds of flowers.",n:4,p:function(){return Object.keys(S.flowerLog).length},r:{coins:100}},
   {id:"q5",t:"His favourites",d:"Give Doodi 3 gifts he loves.",n:3,p:function(){return S.lovedGifts},r:{coins:90,fp:40}},
   {id:"q6",t:"Shop regular",d:"Sell 12 things.",n:12,p:function(){return S.sold},r:{coins:70}},
   {id:"q7",t:"Read his mind",d:"Give him each of his favourite things: "+LOVED.map(function(x){return IT[x].n}).join(", ")+".",n:LOVED.length,p:function(){return Object.keys(S.loved||{}).length},r:{coins:200,fp:60}},
   {id:"q8",t:"The Moon koi",d:"Catch the Moon koi at night, for him.",n:1,p:function(){return S.fishLog.koi?1:0},r:{coins:150}},
   {id:"q9",t:"Lantern Night",d:"Join Elder Hesper on the South Green as the valley learns to make lanterns again (day 2 onwards, after 7 pm). Do this before the Southern Gate heart event, which needs it.",n:1,p:function(){return S.seen.camp?1:0},r:{coins:90,fp:30}},
   {id:"q10",t:"Hesper's library",d:"Read every book in Elder Hesper's Little Library, by the south road (open 9 am to 6 pm). Two more books appear after Lantern Night.",n:9,p:function(){return typeof BOOKS==="undefined"?0:BOOKS.filter(function(b){return S.seen["bk_"+b.id]}).length},r:{coins:80,fp:20}}
  ];
  TABS=[["bag","Bag"],["quests","Goals"],["log","Log"],["map","Map"],["home","Doodi"],["more","More"]];
  $("hhr").title="Doodi's hearts"}
function tasteOf(id){if(LOVED.indexOf(id)>-1)return "love";if(HATED.indexOf(id)>-1||id==="boot")return "hate";var k=IT[id].k;if(k==="flower"||k==="dish"||k==="fish"||k==="gift")return "like";return "neutral"}
function NICK(){return (S.prof&&S.prof.nick)||"my queen"}
function sub_(t){var p=S.prof||{};return t.replace(/\{nick\}/g,NICK()).replace(/\{show\}/g,p.show?p.show.n:"his favourite show").replace(/\{food\}/g,p.food?p.food.n:"pizza").replace(/\{hobby\}/g,p.hobby?p.hobby.n.toLowerCase():"gaming").replace(/\{music\}/g,p.music?p.music.n:"music").replace(/\{colour\}/g,p.colour?p.colour.n.toLowerCase():"blue")}
/* ---------- profile tab ---------- */
function tabHome(mb){
  var p=S.prof;if(!p){mb.innerHTML="<p>No profile yet.</p>";return}
  h4(mb,"Doodi, as you know him");
  [["🎨","Favourite colour",p.colour.n],["🍽","Favourite food",p.food.n],["🍬","Favourite snack",p.snack.n],["🥤","Favourite drink",p.drink.n],["🎵","Music",p.music.n],["📺","Game/show",p.show.n],["📍","Free time",p.hobby.n],["🚫","Can't stand",(p.dis&&p.dis.length?p.dis.map(function(x){return x.n}).join(", "):"nothing!")],["💞","Feels loved by",["Kind words","Quality time","Gifts","Hugs & touch"][p.lang.i]]].forEach(function(r){mb.appendChild(mrow(r[0],r[1],r[2],null))})}
/* ---------- talk, gifts ---------- */
function boost(kind,n){var l=S.prof&&S.prof.lang?S.prof.lang.i:-1;var m=(kind==="chat"&&l===0)||(kind==="hang"&&l===1)||(kind==="gift"&&l===2)||(kind==="hug"&&l===3)?1.7:1;return Math.round(n*m)}
var GL={love:["Doodi: Wait. WAIT. That's my favourite. You remembered. You actually remembered.","Doodi: Okay, I'm keeping this forever. And you. Mostly you.","Doodi: How do you know me this well? It's a little scary and mostly perfect."],
 like:["Doodi: Aww, thank you! That's really thoughtful.","Doodi: For me? You're spoiling me. Keep going.","Doodi: Nice! I'm going to pretend I didn't smile that hard."],
 neutral:["Doodi: Oh. Thanks! I'll... find a use for it.","Doodi: It's the thought that counts, right?"],
 hate:["Doodi: ...You know I can't stand that. (He smiles anyway, which is somehow worse.)","Doodi: I'm going to pretend you handed me something else. 😅"]};
var TD=[
 ["Doodi: Morning. I'd say good morning, but I'm busy being surprised you're here.","Doodi: I was just thinking about {show}. And then you walked up. Spooky.","Doodi: The valley's nicer when you're in it.","Doodi: I've been doing some {hobby}. Don't ask how it's going."],
 ["Doodi: Tell me one good thing from your day, {nick}.","Doodi: Do you ever think about how far Middlesbrough is from here? Same sky though.","Doodi: If you ever need me, I'm one wave and a long walk away.","Doodi: I made a playlist of {music} for you. It's all hype songs, the kind that make you feel unstoppable. No sad ones allowed."],
 ["Doodi: I like it when you yap at me. Keep going. I could listen to you describe a sandwich for an hour.","Doodi: Ferris says the gate hums at night. Sometimes I think I hear your three notes in it. Probably nothing.","Doodi: Machu Picchu or Naples. I'd go to either as long as you're there.","Doodi: You're my favourite person to be quiet with, {nick}.","Doodi: Come here a second. Okay, I just wanted you nearer."],
 ["Doodi: I'm yours, you know. Squash-wise and otherwise.","Doodi: Say my name again. I like how you say it.","Doodi: If this valley ever gets lonely, I'll just hold your hand and it won't.","Doodi: You are enough. I'll say it every day if I have to."]];
async function talkN(){
  var h=hearts(),pr=S.prof||{};
  if(!S.meet){S.meet=1;await seq([["Doodi","Oh! Danoya! Hi. I mean, hello. I mean... I was just standing here being a farmer."],["Danoya","You're not very good at it, are you?"],["Doodi","Terrible. But I have a fishing rod and a plan to say hello to you, so I'm calling it a good day."],["Danoya","Hello, then."],["Doodi","Hello, "+NICK()+"."]]);if(S.talked!==S.day){S.talked=S.day;addFP(boost("chat",40))}return}
  var o=await ask("Doodi","Hey, "+NICK()+". 💛",["Chat","Give a gift","Hang out (1 hour)","Hug"+(h<4?" (4 hearts)":""),"Never mind"]);
  if(o===0){var L=TD[Math.min(3,Math.floor(h/3))];var t=L[Math.floor(Math.random()*L.length)];
    if(Math.random()<.2&&pr.dis&&pr.dis.length){var d=pr.dis[Math.floor(Math.random()*pr.dis.length)];t="Doodi: Random thought: I really can't stand "+d.n.toLowerCase()+". Why do I tell you these things? Because you listen."}
    await say("Doodi",sub_(t).replace("Doodi: ",""));if(S.talked!==S.day){S.talked=S.day;addFP(boost("chat",25))}}
  else if(o===1)await giftMenu();
  else if(o===2){if(S.min>=1380){await say("Doodi","It's late. Let's get you to bed, "+NICK()+".");return}if(S.hang===S.day){await say("Doodi","We've had our hour today. Tomorrow? I'll save you a spot.");return}S.hang=S.day;S.min=Math.min(Math.max(1439,S.min),S.min+60);N.emote="😊";await say("","You spend an hour next to Doodi. You talk about nothing, and it's the best thing you did all day.");N.emote=null;addFP(boost("hang",30))}
  else if(o===3){if(h<4){await say("Doodi","Ask me again when we're a bit closer. I'm shy! 💛")}else if(S.hugged===S.day){await say("Doodi","Still warm from the last one. Ask me tomorrow, "+NICK()+".")}else{S.hugged=S.day;N.emote="🤗";await say("Doodi","Come here. 🤗 ...Okay, that was a good one.");N.emote=null;addFP(boost("hug",30))}}
}
async function giftMenu(){
  var l=giftable();if(!l.length){await say("Danoya","(I have nothing to give. Check the shop, the farm and the lake.)");return}
  if(S.gifted>=2){await say("Doodi","You've spoiled me twice today. Come back tomorrow, generous one.");return}
  var o=await ask("Give what?","Pick a gift for Doodi:",l.map(function(id){return IT[id].e+" "+IT[id].n+" ×"+S.inv[id]}).concat(["Never mind"]));
  if(o>=l.length)return;var id=l[o];take(id);S.gifted++;var g=tasteOf(id),ln=GL[g];
  await say("Doodi",ln[Math.floor(Math.random()*ln.length)].replace("Doodi: ",""));
  if(g==="love"){S.lovedGifts++;S.loved=S.loved||{};S.loved[id]=1;N.emote="💖";addFP(boost("gift",80))}else if(g==="like"){N.emote="😊";addFP(boost("gift",45))}else if(g==="hate"){N.emote="😖";addFP(-30)}else addFP(boost("gift",20));
  setTimeout(function(){N.emote=null},2200)}
async function board(){var o=await ask("Notice board","Mr. Rocket's board. What now?",["Goals","Leave"]);if(o===0){openMenu();menuTab="quests";renderMenu()}}
inter[ix(3,43)]={k:"sign",t:"🏡 An empty patch of land by the sea. Someday, maybe, a place for two."};
DOORS.farm=function(){return say("","Doodi's cabin. There's a note on the door: 'Gone out. Back soon. Help yourself to a smile. — D'")};
DOORS.cot=function(){return houseScene(false)};
/* ---------- events (his valley, her turn) ---------- */
EVT=[{id:"e1",h:2,t:15,place:[48,32],where:"the dock",title:"A Fishing Lesson"},
 {id:"e2",h:4,t:19,place:[9,34],where:"his cabin porch",title:"Game Night"},
 {id:"e3",h:6,t:17,place:[14,32],where:"the camp stove",title:"The Cook-Off"},
 {id:"e4",h:8,t:19,place:[46,9],where:"the festival ground",title:"The Lantern Dance"},
 {id:"e5",h:10,t:21,place:[8,5],where:"the hilltop",title:"The Hilltop"}];
EVENTS={
 e1:async function(){
  await seq([["Doodi","{nick}! You came. Fishing lesson number one: don't tell the fish you're nervous.".replace("{nick}",NICK())],["Doodi","Hold the rod like this. Gentle. Like holding the hand of someone you don't want to scare away."],["","The line goes out over the lake. A tug. A big one."]]);
  var ok=await reel("perch",false);
  if(ok)await seq([["Doodi","You did it! That's a proper fish! I'm so proud of you I might cry into the lake."],["Danoya","Beginner's luck."],["Doodi","Or you're just good at everything, which is the more annoying explanation."]]);
  else await seq([["Doodi","It got away. Honestly? Best fish story I've ever been part of."],["Danoya","I'll catch it next time."],["Doodi","Then I'll make sure there's a next time."]]);
  await seq([["Doodi","Confession: I don't actually care about the fish. I just wanted you next to me."],["","The water is calm. Two reflections, standing a little closer than before."]])},
 e2:async function(){
  var pr=S.prof||{};
  await seq([["Doodi","The porch has one chair, but your seat is always my lap and (face 🫣)"],["Danoya","...Reserved seating. Lap and face. I accept."],["Doodi","Good. Lap, face, blanket, snacks. Perfect."],["","Two time zones, one porch, one chair. Tonight it's "+(pr.show?pr.show.n:"his favourite show")+" on the little screen, and you're curled up in his lap with your head on his shoulder."]]);
  var mu=pr.music||{n:"his favourite",key:"any"};
  var c=await ask("Doodi","Put a song on?",["JoJo part 7 opening","JoJo part 6 opening","Be the Winners","Backs Against the Wall",(mu.e||"🎵")+" "+mu.n+" (his favourite)"]);
  var fk=mu.key==="phoebe"?"phoebe":mu.key==="strokes"?"strokes":mu.key==="jojo"?"jojo":"any";
  playSong(["jojo","jojo6","winners","backs",fk][c]);
  await say("Doodi",["Oh, we're doing the dramatic thing tonight. I respect it.","Part 6. A deep cut. I love how serious you are about this.","Be the Winners. We're going to be unstoppable on this porch.","Backs Against the Wall. Okay. Okay! I'm pumped. Why am I suddenly pumped?","You picked MY song. ...You really do know me."][c]);
  await seq([["Doodi","Can I tell you something? Sometimes the distance gets really loud."],["Danoya","I know. I miss your voice in the same room."],["Doodi","Tell me something true. Anything."]]);
  var love=(pr.love||"how safe he makes everything feel");
  await seq([["Danoya","The thing I love most about you? "+love+"."],["Doodi","...Say that again slower. I want to keep it."],["Danoya","You are enough, Doodi. You're so enough."],["","His arms close around you, his chin resting on your shoulder. The valley goes very quiet, the way places do when they're listening."]]);
  stopSong(false,true)},
 e3:async function(){
  var pr=S.prof||{};var fo=(pr.food&&pr.food.n)||"pizza";
  await seq([["Doodi","Okay. Cook-off. You versus me. Winner gets bragging rights and the last bite."],["Danoya","What are we making?"],["Doodi","Anything. As long as it's "+fo.toLowerCase()+"-adjacent. You know my weakness."]]);
  var c=await ask("Doodi","What are you cooking?",[(pr.food&&pr.food.e||"🍽")+" "+fo,"Something simple, with love","Chaos"]);
  var s=await stir();
  await say("Doodi",s>=3?"Perfect. Actually perfect. I'm not even mad that you won.":s>=2?"That's really good, "+NICK()+". Be proud.":"It's... an adventure. I'm eating all of it anyway.");
  await seq([["Doodi","Here. Try mine. ...Okay, I lied, yours is better."],["Danoya","I know."],["Doodi","Cheeky. I love it."],["","You share a plate on the grass by the stove. For one evening, the valley is exactly the size of this blanket."]])},
 e4:async function(){
  try{playSong("date",true)}catch(e){}
  await seq([["Doodi","There are lanterns. There's music. There are two feet, and I'd like to know what you'll do with yours."],["Danoya","Step on yours, mostly."],["Doodi","Perfect. Hit the beat anyway."]]);
  var s=await danceGame();
  await seq([["Doodi",s>=6?"Okay, who taught you? Be honest.":"We were both terrible and it was still the best dance of my life."],["Danoya","Squash?"],["Doodi","Squash. A long one. Under the lanterns. Nobody's watching."],["","The lanterns drift up like slow, warm stars. For one song, the distance between two countries is exactly zero."]])},
 e5:async function(){
  var pr=S.prof||{};
  await seq([["Doodi","Come up here. I want to show you the whole valley."],["Danoya","It's beautiful from up here."],["Doodi","I know. I made it so I'd have somewhere to find you."],["Danoya","You didn't need a valley. You just needed to say hello."],["Doodi","Hello, "+NICK()+"."]]);
  playSong("end");
  await seq([["Doodi","I can't promise the valley is perfect. But I can promise I'm all yours. Every season."],["Danoya","Then I'm yours too."],["","Doodi and Danoya sit on the hilltop. Below them the valley lights up one lantern at a time, like it knew."]]);
  S.endSeen=true;
  var m=esc(pr.msg||"I'm already home with you. 💛");
  await lovelyOv("DANOYA VALLEY · Chapter 2","You filled every heart and found him, this time from the other side.<br><br>A little message, from you:<br><b>“"+m+"”</b><br><br><i>The valley is yours now. Come back whenever you like.</i>","Keep playing");stopSong(false,true)}
};
/* ---------- state ---------- */
function fresh(){return{v:1,day:1,min:360,coins:60,inv:{rod:1,sd0:2,sd1:2,sd2:1,sd3:1,water:1},fp:0,seen:{},talked:0,hugged:0,gifted:0,planted:0,caught:0,cooked:0,sold:0,lovedGifts:0,fishLog:{},flowerLog:{},dishLog:{},claimed:{},fund:0,homeBuilt:false,homeDay:0,wild:[],rain:false,px:40,py:23,intro:false,sfx:true,notes:[],evNote:null,totalCoins:0,plots:{},moonSeen:0,endSeen:false,loved:{},prof:null}}
function goalText(){
  if(!S.intro)return "Walk with the arrows. Press A to talk and interact.";
  if(!S.meet)return "Goal: find Doodi. (Mornings: on his farm, south-west of the village.)";
  if(S.talked!==S.day)return "Goal: talk to Doodi and make him smile 💛";
  if(S.planted<1)return "Goal: plant a flower in the farm plots";
  if(S.caught<1)return "Goal: catch a fish at the lake dock 🎣";
  if(S.day>=2&&!S.seen.camp)return "Goal: Elder Hesper is teaching the valley to make lanterns on the South Green ("+(S.min<19*60?"after 7 pm":"tonight")+")";
  var ne=nextEvent();return "Goal: fill Doodi's hearts"+(ne&&ne.h>hearts()?" ("+ne.h+" 💗 unlocks a heart event 💌)":" 💗");}
function newDay(pass){
  S.day++;try{outfitToast()}catch(e){}S.min=6*60;S.talked=0;S.hugged=0;S.gifted=0;S.hang=0;
  var grew=0;for(var k in plots){var c=plots[k];if(c.w||S.rain){if(c.a<3){c.a++;grew++}}c.w=false}
  S.rain=Math.random()<.22&&S.day>2;spawnWild();
  P.x=40;P.y=23;P.tx=40;P.ty=23;P.px=40*T;P.py=23*T;P.mv=0;P.d=2;
  N.x=9;N.y=34;N.tx=9;N.ty=34;N.px=9*T;N.py=34*T;N.path=[];N.goal=null;N.away=false;
  save();paintHud();return grew}
/* ---------- title and start ---------- */
function title(){
  var has_=false;try{has_=!!ls(SAVEKEY)}catch(e){}
  showOv('<div id="title"><h3 class="tt">Danoya<br>Valley</h3><p class="hand" style="font-size:1.6rem">Chapter 2 · Her Turn</p><p class="mini">This time, you are the one walking the valley, and he is the one to find.</p>'+(has_?'<button class="big" id="tc" type="button">Continue</button><br><br><button class="mbtn" id="tn" type="button">New game (answer the questions)</button>':'<button class="big" id="tn" type="button">Start</button>')+'</div>');
  var tc=$("tc");if(tc)tc.onclick=function(){ac();hideOv();openThen(function(){begin(true)})};
  $("tn").onclick=function(){ac();hideOv();openThen(function(){begin(false)})}}
async function begin(cont){
  var ok=false;if(cont&&load()&&S.prof){ok=true;applyProf(S.prof)}
  if(!ok){S=fresh();plots={};spawnWild();talking=true;var A=await askProfile();talking=false;S.prof=A;applyProf(A)}
  if(!S.wild||!S.wild.length)spawnWild();
  S.homeBuilt=true;applyHome();
  P.x=P.tx=40;P.y=P.ty=23;P.px=40*T;P.py=23*T;P.mv=0;P.d=2;N.x=N.tx=9;N.y=N.ty=34;N.px=9*T;N.py=34*T;N.mv=0;N.path=[];N.goal=null;
  started=true;paintHud();syncMuBtn();bgmSync();
  if(!S.intro){talking=true;
    await seq([["","Chapter 2 · Her Turn. Morning in the valley. You wake in your cottage with the lake breeze in the curtains."],["Danoya","Last time he chased me through the whole valley. Today it's my turn."],["","Button A talks and uses things. Everything else is in the Menu."]]);
    S.intro=true;talking=false;save();paintHud()}
  checkEventReady()}

HOWDAY='<div class="h4">How a day works (Chapter 2)</div><p>☀️ You are Danoya. Each day starts at 6:00 am in your cottage. Doodi has a routine: his farm in the morning, his free-time spot (the one you told me) from 9 am to 1 pm, the village at lunch, the dock in the afternoon, the lake bench in the evening, and home at night.</p><p>💬 Find him, then talk, give gifts, hang out or hug him (4 hearts). Gifts he loves, and the way he likes to be loved, give the most hearts.</p><p>💗 <b>Heart events:</b> at 2, 4, 6, 8 and 10 hearts he invites you to a special evening. When you reach those hearts, a 💌 appears on the <b>Map</b> (Menu → Map) where he is waiting. Go there after the time shown and press A. The goal bar at the top also tells you what is next.</p><p>🌙 At <b>midnight</b> you get a warning. Be in bed by <b>1:00 am</b> (your cottage door, then Sleep). If not, you collapse, villagers carry you home, and about 25% of your coins is lost.</p><p>🎵 Music changes with the time of day, and something special plays on dates.</p>';
MAPN={farm:"Doodi's cabin",cot:"Your cottage",other:"Doodi",leg:"🔵 You (Danoya)   🩷 Doodi   🟡 Where he's waiting for you"};
