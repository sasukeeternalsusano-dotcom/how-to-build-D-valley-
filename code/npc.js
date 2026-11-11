/* ---------- villagers and side quests ---------- */
var VN=[
 {id:"rocket",name:"Mr. Rocket",at:[32,22],d:2,from:8,to:20},
 {id:"judy",name:"Judy",sched:[[9,17,36,28,3],[17,22,46,28,3]],day:2},
 {id:"wren",name:"Granny Wren",at:[28,71],d:2,from:7,to:17},
 {id:"ferris",name:"Captain Ferris",at:[48,31],d:3,from:6,to:20}
];
var vnPrev=[],vnCache={};
function vnPos(v,x,y){var k=v.id+x+","+y;if(!vnCache[k]){var f=freeNear(x,y);vnCache[k]=[f[0],f[1]]}return vnCache[k]}
function vnHere(v){
  if(!S||!S.min)return null;var h=S.min/60;if(v.day&&S.day<v.day)return null;
  if(v.sched){for(var i=0;i<v.sched.length;i++){var s=v.sched[i];if(h>=s[0]&&h<s[1]){var p=vnPos(v,s[2],s[3]);return {x:p[0],y:p[1],d:s[4]}}}return null}
  if(h<v.from||h>=v.to)return null;var q=vnPos(v,v.at[0],v.at[1]);return {x:q[0],y:q[1],d:v.d}}
function vnList(){var o=[];VN.forEach(function(v){var h=vnHere(v);if(h){h.v=v;if(v.face!==undefined&&v.faceUntil>time)h.d=v.face;o.push(h)}});return o}
function vnpcAt(x,y){var l=vnList();for(var i=0;i<l.length;i++)if(l[i].x===x&&l[i].y===y)return l[i].v;return null}
function vnSync(){if(!window.__vc&&typeof S!=="undefined"&&S&&S.wild&&typeof villageClean==="function"){window.__vc=1;villageClean()}vnPrev.forEach(function(k){solid[k]=0});vnPrev=[];vnList().forEach(function(h){var k=ix(h.x,h.y);if(!solid[k]){solid[k]=1;vnPrev.push(k)}})}
function vnpcPush(dr){
  if(typeof OPNX!=="undefined"&&OPNX){OPNX.forEach(function(h){dr.push({y:(h.y+1)*T,f:function(){villager(h.x*T,h.y*T,h.d,h.f||0,VSPEC[h.id],!!h.sit)}})});return}
  vnList().forEach(function(h){var sp=VSPEC[h.v.id];dr.push({y:(h.y+1)*T,f:function(){
    villager(h.x*T,h.y*T+(h.v.id==="judy"?0:0),h.d,0,sp,false);
    var dx=Math.abs(P.x-h.x),dy=Math.abs(P.y-h.y);if(dx+dy<=4&&!ui){cx.font="bold 9px sans-serif";cx.textAlign="center";cx.lineWidth=3;cx.strokeStyle="#000a";cx.strokeText(h.v.name,h.x*T+16,h.y*T-10);cx.fillStyle="#ffe9a8";cx.fillText(h.v.name,h.x*T+16,h.y*T-10)}
  }})})}
function vnTalkTo(v){
  v.face=(P.d+2)%4;v.faceUntil=time+8;
  return ({rocket:talkRocket,judy:talkJudy,wren:talkWren,ferris:talkFerris})[v.id](v)}
function sq(id,val){S.sq=S.sq||{};if(val!==undefined)S.sq[id]=val;return S.sq[id]||0}
var FISHIDS=["carp","sunfish","perch","eel","lcarp","koi","dfish","sardine","crab","tuna","squid","puffer"];
function fishHave(){var c=0;FISHIDS.forEach(function(f){c+=has(f)});return c}
function fishTake(n){FISHIDS.forEach(function(f){while(has(f)&&n>0){take(f);n--}})}
function flowerHave(){var c=0;for(var i=0;i<4;i++)c+=has("fl"+i);return c}
function flowerTake(n){for(var i=0;i<4&&n>0;i++)while(has("fl"+i)&&n>0){take("fl"+i);n--}}
function reward(coins,fp){S.coins+=coins;S.totalCoins+=coins;if(fp)addFP(fp);paintHud();celebrate("Side quest done!")}
var CH2LINES={
 rocket:["Doodi stood right there last week and bought three Reese's. For 'research'. I asked what kind of research. He left very quickly.","Ah, Danoya! The lake dock was my launch pad once. Now it is where your boyfriend loses at fishing.","Everything in the shop is half-price if you promise to tell me how the story ends."],
 judy:["Alright, you. Doodi said I could vet the fish named after you. It is a very cute fish.","Do not tell him I said this, but he is the first one I did not threaten. He just kept saying 'yes, ma'am'.","If he ever gets too cocky, I know where he hides his snacks."],
 wren:["That boy planted a daffodil every day this week. For you. I have never seen a tulip so nervous.","Flowers listen, you know. Mine have heard your name so often they bloom facing the lake.","Tell Doodi his plot is crooked. He will be delighted to be corrected by you."],
 ferris:["The lake is quiet tonight, but the moon koi is out there. Try after eight.","Grew up on the Sunset Ferry, south across the sea. Then the Great Storm brought the cliffs down across the harbour, and buried the Southern Gate with them. Some say it hums at night.","Your Doodi once fished here for six hours and caught a boot. He named it. I will not repeat the name."]};
async function chat2(v){var l=CH2LINES[v.id];S.chat2=S.chat2||{};var n=(S.chat2[v.id]||0)%l.length;S.chat2[v.id]=n+1;await say(v.name,l[n])}
async function talkRocket(v){
  if(CH2){await chat2(v);if(await ask("Mr. Rocket","Need anything from the shop?",["Open the shop","Not now"])===0)openShop();return}
  var st=sq("rocket");
  if(st===0){
    await seq([["Mr. Rocket","Name is Rocket. Yes, really. I used to build rockets. Small ones, for a very small space programme."],["Mr. Rocket","Then one landed in the lake with me inside it. I looked around, tasted the snacks, and decided the valley beat space."],["Mr. Rocket","Now I run the shop, the notice board, and most of this village's problems. Speaking of which."],["Mr. Rocket","The Lantern Festival needs a finale. I have the fireworks tubes but no fuel or colour. Three fish (the smell lights the powder, do not ask) and two flowers (for colour)."]]);
    var o=await ask("Mr. Rocket","Help me light up the festival?",["Count me in","Maybe later"]);
    if(o===0){sq("rocket",1);await say("Mr. Rocket","Excellent. Bring them straight to me. Prepare for glory.");toast("Side quest: Blast-Off Snacks")}return}
  if(st===1){
    if(fishHave()>=3&&flowerHave()>=2){
      var o2=await ask("Mr. Rocket","You have 3 fish and 2 flowers. Hand them over?",["Hand them over","Wait"]);
      if(o2===0){fishTake(3);flowerTake(2);sq("rocket",2);S.fireworks=1;
        await seq([["Mr. Rocket","Magnificent. The tubes are loaded. When your heart and hers are at the Lantern Festival, look up."],["Mr. Rocket","Take this for the trouble. And never tell anyone the fish was an ingredient."]]);
        reward(150,0)}return}
    await say("Mr. Rocket","Still need 3 fish and 2 flowers. You have "+fishHave()+" fish and "+flowerHave()+" flowers.");
    if(await ask("Mr. Rocket","Meanwhile?",["Open the shop","Never mind"])===0)openShop();return}
  var L=["Fireworks are loaded. Do not stand directly under the finale. Stand beside her.","Need snacks? The shop is open until eight.","I once dated a comet. Long distance. Did not work out."];
  S.rl=(S.rl||0)+1;await say("Mr. Rocket",L[S.rl%L.length]);
  if(await ask("Mr. Rocket","Anything else?",["Open the shop","Never mind"])===0)openShop()}
async function talkJudy(v){
  if(CH2){await chat2(v);return}
  var st=sq("judy");
  if(st===0){
    await seq([["Judy","Alright, Romeo. Hold it right there."],["Doodi","...Hello?"],["Judy","Judy. Danoya's best friend, all the way from Manila. I flew in to visit. I am also inspecting you."],["Judy","She is my person. If you are going to be a good thing in her life, I need to know you are paying attention."],["Judy","Three questions. Get them right, and I might even be nice to you."]]);
    var o=await ask("Judy","Ready for the Wingman Test?",["Bring it on","Give me a moment"]);if(o!==0)return;sq("judy",1);st=1}
  if(st===1){
    if(S.judyTry===S.day){await say("Judy","One attempt a day, Romeo. Come back tomorrow with better answers.");return}
    S.judyTry=S.day;var good=0;
    var Q=[["What is Danoya's favourite flower?",["Tulips","Daffodils","A cactus"],1],["Where does Danoya live outside this valley?",["Middlesbrough","The moon","Dubai"],0],["What was named after her?",["A tomato","A mountain","A fish"],2]];
    for(var i=0;i<Q.length;i++){var a=await ask("Judy","Question "+(i+1)+": "+Q[i][0],Q[i][1]);if(a===Q[i][2]){good++;await say("Judy",["Correct. Annoyingly.","Ooh. Not bad.","Right again. Hm."][i])}else await say("Judy","Wrong. Do better.")}
    if(good>=2){sq("judy",2);
      await seq([["Judy",good===3?"Three out of three. Fine. You are allowed.":"Two out of three. Barely. But the answers you got right were the important ones."],["Judy","Listen. She lights up when you remember little things. Keep remembering them. That is the whole secret."],["Judy","Also, she will deny it, but she loves Reese's cups. Do with that what you will."]]);
      reward(100,60)}
    else await say("Judy","Hm. "+good+" out of 3. Study her, Romeo. Come back tomorrow.");return}
  var L=["I am not watching you two. I am simply nearby, with snacks.","If she laughs at your jokes, it is love. If she laughs at you, it is also love.","The lake bench at dusk is nice. Just saying. I know nothing.","I told her you were 'fine, I suppose'. She smiled for ten minutes."];
  S.jl=(S.jl||0)+1;await say("Judy",L[S.jl%L.length])}
async function talkWren(v){
  if(CH2){await chat2(v);return}
  var st=sq("wren");
  if(st===0){
    await seq([["Granny Wren","Ah, the farm boy. I planted the first sunflower in this valley, before the lake even had a dock."],["Granny Wren","Then a rocket skipped off the lake and landed on my petunias. That Rocket fellow still owes me a flowerbed."],["Granny Wren","If you bring me one of every flower the valley grows, a sunflower, a daffodil, a lily and a tulip, I will make you something special."]]);
    var o=await ask("Granny Wren","Will you gather them for an old gardener?",["Of course","Not yet"]);if(o===0){sq("wren",1);toast("Side quest: The Four Blooms")}return}
  if(st===1){
    var ok=true;for(var i=0;i<4;i++)if(!has("fl"+i))ok=false;
    if(ok){var o2=await ask("Granny Wren","You have one of each! Give them to me?",["Give them","Wait"]);
      if(o2===0){for(var j=0;j<4;j++)take("fl"+j);sq("wren",2);
        await seq([["Granny Wren","Oh my. They are perfect. Here, take my wishing seeds. They grow into whatever the one you love needs most."],["Granny Wren","And remember: tulips for apologies, sunflowers for hello, lilies for the quiet days, daffodils for new starts."]]);
        give("sd0",3);give("sd1",3);give("sd2",3);give("sd3",3);reward(120,0)}return}
    var miss=[];["Sunflower","Daffodil","Lily","Tulip"].forEach(function(n,i){if(!has("fl"+i))miss.push(n)});
    await say("Granny Wren","Still missing: "+miss.join(", ")+".");return}
  var L=["Flowers do not need much. Water, sun, and someone who talks to them.","The bees are my best employees. They do not ask for holidays.","That farm plot of yours has potential. And a very crooked row."];
  S.wl=(S.wl||0)+1;await say("Granny Wren",L[S.wl%L.length])}
async function talkFerris(v){
  if(CH2){await chat2(v);return}
  var st=sq("ferris");
  if(st===0){
    await seq([["Captain Ferris","Evening, young farmer. Ferris. My family ran the Sunset Ferry, south across the sea to the harbour towns. I grew up on her deck."],["Captain Ferris","Then the Great Storm brought the south cliffs down across the harbour mouth, and the ferry has been resting ever since."],["Captain Ferris","These days I fish. Tell you what: show me you can fish. Four different kinds, and I will tell you something about the south."]]);
    var o=await ask("Captain Ferris","Four different kinds of fish?",["Challenge accepted","Maybe later"]);if(o===0){sq("ferris",1);toast("Side quest: The Fisher's Test")}return}
  if(st===1){
    var n=0;FISHIDS.forEach(function(f){if(S.fishLog[f])n++});
    if(n>=4){sq("ferris",2);
      await seq([["Captain Ferris","Four kinds already. You can fish, no doubt."],["Captain Ferris","Here is the thing. At night, past the old Southern Gate, the sea hums. Not waves. A low sound, like a bell far underground."],["Captain Ferris","Some say there is a door beneath the cliffs that the Storm covered. Some say it is the wind. I say it is pipes, loudly, so nobody asks what I really think. One day a pair of brave souls will go and see."]]);
      reward(120,0)}
    else await say("Captain Ferris","You have caught "+n+" kinds so far. I want four.");return}
  var L=["Try the lake after dark. The moon koi likes to show off.","The sea hums at night. Faint, but I know what I heard.","A good fisherman waits. A great one waits next to someone he likes."];
  S.fl2=(S.fl2||0)+1;await say("Captain Ferris",L[S.fl2%L.length])}
var _tq2=tabQuests;
tabQuests=function(mb){_tq2(mb);if(CH2)return;h4(mb,"Side quests");
  [["rocket","Blast-Off Snacks","Mr. Rocket needs 3 fish and 2 flowers for the festival fireworks."],["judy","The Wingman Test","Pass Judy's questions about Danoya (she appears from day 2)."],["wren","The Four Blooms","Bring Granny Wren one of each flower."],["ferris","The Fisher's Test","Catch 4 different fish for Captain Ferris."]].forEach(function(q){
    var st=sq(q[0]);mb.appendChild(mrow(st===2?"✅":st===1?"📌":"❔",q[1],st===0?"Talk to the villager to start.":q[2],null,null,0,st===2))})};
