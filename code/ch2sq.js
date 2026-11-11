/* ---------- Chapter 2 side quests: four neighbours who only chatted in Chapter 1 ---------- */
var SQ2=[
 ["tom2","The Morning Round","Baker Tom's loaves: one to Grandmother Mira (west farm), one to Elder Hesper (south shore). Then back to Tom."],
 ["robin2","Biscuit's Supper","Bring Robin smoked fish from Oru's market, or any fish grilled at a stove, for Biscuit."],
 ["lio2","The Humming Hives","Hum to Lio's hives after dark (7 pm onwards), then tell Lio how it went."],
 ["ines2","The Lantern Carp","Catch a lantern carp in the lake and show it to Ines."]];
function dlv2(){S.dlv2=S.dlv2||{};return S.dlv2}
async function sqTom(v){var st=sq("tom2");
  if(st===0){
    await seq([["Baker Tom","Danoya! You have legs, and I have a bakery that will not run itself. A trade."],["Baker Tom","Two loaves. One to Grandmother Mira, out on her farm in the west. One to Elder Hesper, down by the south shore. Mira will say it is too much. Hesper will say nothing and eat the heel first."]]);
    if(await ask("Baker Tom","Will you take them?",["I'll take them","Not today"])!==0){await say("Baker Tom","Tomorrow, then. The bread will be different bread. Still good.");return true}
    give("bread",2);sq("tom2",1);S.dlv2={};await say("Baker Tom","Warm side up. Go, go, before they stop being fresh and start being toast.");toast("Side quest: The Morning Round");return true}
  if(st===1){var d=dlv2(),left=(d.mira?0:1)+(d.hesper?0:1);
    if(!left){await seq([["Baker Tom","Both? Already? And Mira did not make you eat soup? ...She made you eat soup."],["Baker Tom","Here. For your legs. And a cinnamon bun, because you eat like a sparrow."]]);give("bun",1);sq("tom2",2);reward(90,10);return true}
    if(has("bread")<left){give("bread",left-has("bread"));await say("Baker Tom","You ate one. I can tell. I am not angry. Here, another.");return true}
    await say("Baker Tom","Mira first, or Hesper first. The bread does not mind. I mind a little.");return true}
  return false}
async function sqDeliver(id){if(sq("tom2")!==1)return false;var d=dlv2();if(d[id]||!has("bread"))return false;
  take("bread",1);d[id]=1;
  if(id==="mira")await seq([["Mira","From Tom? He sends too much. He always sends too much."],["Mira","...Sit. I am putting it with the soup. Then it is not too much. It is dinner."],["","She cuts the loaf in two and wraps one half in a cloth for Tobi, before you can ask who it's for."]]);
  else await seq([["Elder Hesper","Tom's bread. He has left me a loaf every week for thirty years and never once knocked. He leaves it on the step."],["Elder Hesper","Thank him for me. Tell him I said it the way he likes, which is not at all."],["","She breaks off the heel and eats it first."]]);
  if(d.mira&&d.hesper)toast("Both loaves delivered. Back to Baker Tom.");return true}
async function sqRobin(v){var st=sq("robin2");
  if(st===0){
    await seq([["Robin","Danoya. Biscuit's gone off his food. He's old, that's all. Thirteen years of being a terrible dog, and I'd not swap one of them."],["Robin","He'll eat fish, though. Smoked, from Oru's market, or grilled, if you cook. He's a snob about it."]]);
    if(await ask("Robin","Bring him something?",["I'll bring some","Not now"])!==0)return true;
    sq("robin2",1);toast("Side quest: Biscuit's Supper");return true}
  if(st===1){var f=has("smoked")?"smoked":has("grill")?"grill":null;
    if(!f){await say("Robin","Smoked fish from Oru's, or any fish grilled at a stove. He's waiting at the gate. He's always waiting at the gate.");return true}
    take(f,1);sq("robin2",2);
    await seq([["","Biscuit eats the whole thing, slowly, with enormous dignity, then lies down on your foot."],["Robin","Look at that. He likes you. He doesn't like anybody. He likes the gate."],["Robin","Thirteen years I've thrown him sticks. Never once brought one back. I keep throwing them. You never know."],["Danoya","One day."],["Robin","One day."]]);
    reward(80,15);return true}
  return false}
async function sqLio(v){var st=sq("lio2");
  if(st===0){
    await seq([["Lio","Danoya! Two jars, one for you, as usual. Also, a problem."],["Lio","The bees won't settle at night. They used to go quiet at dark. Now they buzz till dawn, low and uneven, like they're trying to remember a tune."],["Lio","My gran said bees settle if somebody hums to them. I can't hold a note. Would you try? After dark, by the hives. I'll be in bed. Bees exhaust me."]]);
    if(await ask("Lio","Hum to the hives tonight?",["I'll try tonight","Not now"])!==0)return true;
    sq("lio2",1);toast("Side quest: The Humming Hives");return true}
  if(st===1){
    if(!sq("lio2h")){await say("Lio","After dark, by the hives. Hum anything. They're not fussy. They're a little fussy.");return true}
    sq("lio2",2);
    await seq([["Lio","They slept! First time since spring. What did you hum?"],["Danoya","Just three notes. I don't even know where they're from."],["Lio","Huh. That's funny. They've been trying to buzz three notes for weeks. Never quite got there."],["Lio","Here. Both jars are yours this time. Don't tell the bees."]]);
    reward(100,15);return true}
  return false}
async function hiveTalk(){var nt=S.min>=19*60||S.min<5*60;
  if(CH2&&sq("lio2")===1&&!sq("lio2h")&&nt){sq("lio2h",1);
    await seq([["","The hives are restless: a low, uneven buzz, rising and falling and never landing."],["","You crouch by the nearest one and hum. You don't choose the tune. It's just the one that comes out: three small notes, falling."],["","The buzzing stops. Then, from all five hives at once, the bees hum it back. Three notes, falling. And then they're quiet."],["Danoya","...Okay. That was not nothing."]]);
    toast("Tell Lio in the morning.");return}
  await say("",nt?"The hive is restless. A low, uneven buzz, like a tune nobody can finish.":"The hive hums, busy and warm and a little cross. Best not to lean on it.")}
async function sqInes(v){var st=sq("ines2");
  if(st===0){
    await seq([["Ines","Danoya."],["","She points at the water. Far out, something glows for a moment under the surface, orange, like a lantern dropped in the lake. Then it's gone."],["Ines","Lantern carp. Haven't seen one in years. Catch one. I just want to look at it."]]);
    if(await ask("Ines","Catch her a lantern carp?",["I'll try","Maybe later"])!==0)return true;
    sq("ines2",1);toast("Side quest: The Lantern Carp");return true}
  if(st===1){
    if(!has("lcarp")){await say("Ines","They're rare. Patient people catch them. You're patient. I've watched you fish.");return true}
    take("lcarp",1);sq("ines2",2);
    await seq([["","Ines takes the lantern carp in both hands. It glows against her palms like a little paper lamp."],["Ines","My grandmother said they rise towards lanterns. Real ones. Ones somebody made with their own hands."],["Ines","...Maybe someone's making them again."],["","She lets it go. It swims down slowly, still glowing, until the lake is dark again."]]);
    reward(160,15);return true}
  return false}
var _vt2=vnTalkTo;
vnTalkTo=function(v){
  if(!CH2)return _vt2(v);
  var H={pim:sqTom,nell:sqRobin,lio:sqLio,ines:sqInes}[v.id],D=(v.id==="mira"||v.id==="hesper");
  if(!H&&!D)return _vt2(v);
  v.face=(P.d+2)%4;v.faceUntil=time+8;
  return (async function(){
    S.metN=S.metN||{};var justMet=!S.metN[v.id];
    if(justMet)await _vt2(v);
    if(D){if(await sqDeliver(v.id))return;if(!justMet)await _vt2(v);return}
    if(sq(v.id==="pim"?"tom2":v.id==="nell"?"robin2":v.id==="lio"?"lio2":"ines2")===2){if(!justMet)await _vt2(v);return}
    await H(v)})()};
var _tq3=tabQuests;
tabQuests=function(mb){_tq3(mb);if(!CH2)return;h4(mb,"Side quests");
  SQ2.forEach(function(q){var st=sq(q[0]);var extra="";if(q[0]==="tom2"&&st===1){var d=dlv2();extra=" ("+((d.mira?1:0)+(d.hesper?1:0))+"/2 delivered)"}if(q[0]==="lio2"&&st===1&&sq("lio2h"))extra=" (hummed: tell Lio)";
    mb.appendChild(mrow(st===2?"✅":st===1?"📌":"❔",q[1]+extra,st===0?"Talk to "+({tom2:"Baker Tom (bakery, 6 am to 3 pm)",robin2:"Robin (south-west, 8 am to 7 pm)",lio2:"Lio (by his hives, 7 am to 5 pm)",ines2:"Ines (by the lake, 6 am to 8 pm)"})[q[0]]+" to start.":q[2],null,null,0,st===2))})};
