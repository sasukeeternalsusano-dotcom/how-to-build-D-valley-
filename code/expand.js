/* ---------- the valley grows east (Chapter 2 and 3 world) ---------- */
var EXB=[];
/* ---------- the village grows: homes and shops for the villagers (all chapters) ---------- */
var VIL=[];
var VILD=[
 {id:"shrine",w:5,h:4,x:42,y:2,door:44,roof:"#5b3a46",wall:"#b9b4aa",name:"The Shrine",sign:"SHRINE",lbl:"Shrine",t:"The shrine.",tf:function(){return CH2?"🏯 The shrine, still shut. The great doors are barred from the inside. You press an ear to the wood and wait. Nothing. Then, very low, three soft knocks from the far side, and a pause, polite, as if someone is waiting to be told they may come in. The plaque by the gate is unchanged: THE FIRST LANTERN WAS LIT FOR A MAN WHO COULD NOT SLEEP.":"🏯 The shrine at the top of the valley, older than the village. The great doors are barred from the inside, and the dust on the threshold has not been disturbed in anyone's lifetime. Elder Hesper says the old Door is somewhere underneath. A plaque by the gate reads: THE FIRST LANTERN WAS LIT FOR A MAN WHO COULD NOT SLEEP."}},
 {id:"mira",w:5,h:4,x:8,y:66,door:10,roof:"#b0556a",wall:"#e8cfae",name:"Mira & Tobi's house",sign:"MIRA & TOBI",lbl:"Mira & Tobi",t:"🏠 Mira and Tobi's house. Something is always simmering inside. It smells like too much soup."},
 {id:"robin",w:5,h:4,x:12,y:80,door:14,roof:"#3f8f6a",wall:"#d9b98a",name:"Robin's house",sign:"ROBIN'S",lbl:"Robin",t:"🏠 Robin's house. A basket by the door, a fence half-mended, and a dog bed with a dent in it."},
 {id:"lio",w:5,h:4,x:50,y:66,door:52,roof:"#e8c35a",wall:"#f2e8d0",name:"Lio's house",sign:"LIO'S HIVES",lbl:"Lio",t:"🏠 Lio's house. A hum comes from behind it. A handwritten note says: the bees have opinions."},
 {id:"bakery",w:5,h:4,x:30,y:52,door:32,roof:"#e4572e",wall:"#f1dfb8",name:"Bakery",sign:"TOM'S BAKERY",lbl:"Bakery",t:"🥖 Tom's Bakery. Warm bread, open before dawn. A pigeon is waiting on the sill, as if it had an appointment."},
 {id:"fish",w:5,h:4,x:44,y:52,door:46,roof:"#2a7ab0",wall:"#d9e4e8",name:"Fish Market",sign:"FISH MARKET",lbl:"Fish Market",t:"🐟 Oru's Fish Market. Everything on the ice came out of the sea this morning. The sardines are the honest ones."},
 {id:"ines",w:5,h:4,x:53,y:52,door:55,roof:"#4aa08a",wall:"#e8cfae",name:"Ines's boathouse",sign:"INES' PLACE",lbl:"Ines",t:"🏠 Ines's house. Oars on the wall, eleven jars of honey on the shelf, and no doorbell. She likes it quiet."},
 {id:"garo",w:5,h:4,x:24,y:80,door:26,roof:"#8a6a4a",wall:"#c9a77a",name:"Garo's mill house",sign:"GARO'S MILL",lbl:"Garo",t:"🏠 Garo's mill house. A sack of flour sits by the door with a note: PAID FOR. (Not by Rocket.)"},
 {id:"hesper",w:5,h:4,x:50,y:80,door:52,roof:"#6a4a8a",wall:"#e8cfae",name:"Elder Hesper's house",sign:"ELDER HESPER",lbl:"Hesper",t:"🏠 Elder Hesper's house. Every window has a candle, and every candle is lit for someone."},
 {id:"library",w:5,h:4,x:40,y:80,door:42,roof:"#7a3f2e",wall:"#e3d3b0",name:"The Little Library",sign:"LIBRARY",lbl:"Library",t:"📚 The Little Library."},
 {id:"ferris",w:5,h:4,x:50,y:17,door:52,roof:"#f2c230",wall:"#e8cfae",name:"Ferris's lookout",sign:"CAPTAIN'S HOUSE",lbl:"Ferris",t:"🏠 Captain Ferris's house. A brass telescope in the window, pointing south, always."},
 {id:"ralph",w:5,h:4,x:2,y:23,door:4,roof:"#4a4a5a",wall:"#b9b9b0",name:"Ralph's house",sign:"RALPH'S",lbl:"Ralph",t:"🏠 Ralph's house. Quiet, tidy, and set a little apart from everyone else. He likes it that way."},
 {id:"wren",w:5,h:4,x:26,y:66,door:28,roof:"#6fae5a",wall:"#f1dfb8",name:"Wren's cottage",sign:"WREN'S COTTAGE",lbl:"Wren",t:"🏠 Granny Wren's cottage. Jars of seeds in every window, labelled in handwriting that leans."}];

/* ---------- the bakery and the fish market work ---------- */
var STALLS={
 bakery:{who:"Baker Tom",npc:"pim",open:6,close:15,title:"Tom's Bakery",stock:[["bread",16],["bun",30],["dough",10],["cheese",14],["tomato",8]],buy:function(id){return IT[id].k==="dish"?1.25:0},line:"Tom pays a quarter more for anything cooked, and gets quietly emotional about dough."},
 fish:{who:"Oru",npc:"oru",open:9,close:18,title:"Oru's Fish Market",stock:[["smoked",44]],buy:function(id){return IT[id].k==="fish"?1.35:0},line:"Oru pays well for fish. He doesn't say anything about it. He just counts the coins twice."}};

/* ---------- Elder Hesper's Little Library: foreshadowed lore, readable in chapters 1 and 2 ---------- */
var BOOKS=[
 {id:"road",e:"🕯",t:"The Road of Lanterns",p:["The old Keepers kept a road. Not of stone: of light. One lantern for every step between the cliffs in the south and the hill in the north, so that nobody walking to the Door should ever walk in the dark.","Each lantern was lit from the one before it, and the first was lit from a single flame kept below the south cliffs. If one went out, the next could not catch. The road was only ever as strong as its dimmest step.","<i>Pencil, in the margin: Rocket's lamp-posts are spaced exactly the same distance apart. He says it is a coincidence. He says it every time I ask.</i>"]},
 {id:"knock",e:"🚪",t:"Why We Knock",p:["Every household custom in the valley comes down to one rule from the Keepers' own manual: <b>a door is a conversation with something that may answer.</b> Knock first. Always. Even on your own door.","The manual lists the old courtesies: a light left on the porch, a cup poured for the chair nobody sits in, a knock before you open, a word before you leave. It does not say what they are for. It says only that they are polite, and that the Door appreciates politeness.","<i>Pencil: I have asked six grandmothers what the cup is for. Six have said 'you only pour.' It is the most consistent thing in this valley.</i>"]},
 {id:"keeper",e:"📖",t:"The Last Keeper (pages missing)",p:["...of all the Keepers, only the last is remembered, and badly. He did not sleep. Whether the sleeplessness came with the office or the office came with the sleeplessness, the chroniclers cannot agree.","He had a wife who made lanterns. She signed her work with a single letter. She lit the first lantern anyone ever lit for a living man, and wrote on it that he might sleep.","His name has been scratched from every page of this book, neatly, with a steady hand. The wife's name has been scratched out of the margin beside it, rather more gently. Three pages are gone altogether.","<i>Pencil: I think I know whose hand. I will not write it down. Some things should be asked at the right door.</i>"]},
 {id:"storm",e:"⛈",t:"Storm Year: the Harbour Log",p:["The sea went flat at noon. A flat sea is only polite before it is rude. At dusk a lamp was seen burning three fathoms down in the harbour, steady, as if someone were holding it up.","By morning the sky had come down in one breath. The south cliffs lay across the harbour mouth, and the Southern Gate was buried in the rock. Eleven boats were lost. Every hull was taken; every crew was handed back, save one boy, who had gone down to the water after the light and did not come home.","<i>Pencil: Captain Ferris was nine and has told this story differently every year since. This is the version with the fewest goats. I have never corrected the part about the boy.</i>"]},
 {id:"fox",e:"🦊",t:"The Fox Who Sang the Fog Thin",p:["A fox with more tails than she could count lived at the shrine and sang the fog thin when the boats were out. The fishermen called her by a short name, a breath of a name, and she came when they did.","On the night of the Storm she sang until morning. After that, nobody said her name aloud. The year after, most had forgotten it. The fog came back thicker than before, and the boats went out more slowly.","The last page has one sentence: <i>A name nobody says goes quiet.</i>"]},
 {id:"sun",e:"🔮",t:"On the Lamps of the South Road",p:["The lamps of the south road were never lit one by one. They draw from a single stone: a crystal the Keepers called the <b>Sunheart</b>, set in the dark under the cliffs, which gave light to every lantern in the valley and asked for nothing.","Dim the Sunheart and the lamps dim with it. Darken it and the road goes dark from the south end, one step at a time.","<i>Pencil: It went below with the Southern Gate. My grandmother said it was only resting. My grandmother said many things were only resting.</i>"]},
 {id:"hinge",e:"🔩",t:"Sayings of the Keepers",p:["<b>A door is kept by everyone who walks through it.</b>","<b>One hinge holds a door shut or lets it fall. Many hinges let it swing and still close.</b>","<b>The one who keeps a door must not be the only one who knows how to open it.</b>","<i>Pencil: These are quoted as proverbs. Nobody can say whether they were advice or a warning.</i>"]},
 {id:"runes",e:"🔣",t:"A Primer of the Gate Runes",c2:1,p:["The runes cut around the Southern Gate and the old lantern frames are the same hand. They wake to light. Any flame will stir them; a few are said to answer to a particular kind of light, and the primer is careful not to say which.","One line is underlined three times, by someone who pressed hard: <b>a light with a song in it.</b>","<i>Pencil: I do not know who underlined it. I would very much like to meet them.</i>"]},
 {id:"lull",e:"🎵",t:"Lullabies of the Old Valley",c2:1,p:["Most are rhymes about boats and bread. One is not. It is given no words and no title, only a line of three small marks falling down the page, and the note: <i>sung to someone who cannot sleep, by someone who cannot be with them.</i>","It was never written as music. It was only ever hummed. The people who know it cannot say where they learned it.","<i>Pencil: Danoya hums it. She has never once been able to tell me where she learned it. I have told myself it is a coincidence. I am not a woman who believes in coincidence. I am a woman who runs a library.</i>"]}
];
async function library(){
  var h=S.min/60;
  if(h<9||h>=18){await say("","📚 The Little Library is shut. A card in the window: 'Open nine to six. Return everything. Knock softly.'");return}
  var first=!S.seen.lib;S.seen.lib=1;
  if(first)await say("Elder Hesper","Come in, come in. Mind the dust; mind the footnotes. Everything in here is true, mostly, and half of it is in my handwriting. Read what you like. Return everything.");
  else await say("Elder Hesper",["Back again. Good. Sit anywhere that is not a pile.","Take your time. The books are patient. I am less so, but I hide it well."][S.day%2]);
  showOv("");var oc=$("ovc");
  function list(){
    oc.innerHTML='<h3>📚 The Little Library</h3><p class="mini">Elder Hesper\'s shelves. Pencil notes in the margins are hers.</p>';
    var box=document.createElement("div");box.style.textAlign="left";
    BOOKS.forEach(function(b){if(b.c2&&!(CH2&&S.seen.camp))return;var rd=!!S.seen["bk_"+b.id];box.appendChild(mrow(b.e,b.t,rd?"Read":"New","Read",function(){open(b)},false,rd))});
    oc.appendChild(box);
    var x=document.createElement("button");x.className="big";x.type="button";x.textContent="Leave";x.style.marginTop="8px";x.onclick=function(){hideOv()};oc.appendChild(x)}
  function open(b){
    S.seen["bk_"+b.id]=1;
    oc.innerHTML='<h3>'+b.e+' '+b.t+'</h3>'+b.p.map(function(q){return '<p style="text-align:left">'+q+'</p>'}).join("");
    var x=document.createElement("button");x.className="big";x.type="button";x.textContent="Close the book";x.onclick=list;oc.appendChild(x)}
  list()}
async function stall(id){
  var c=STALLS[id],h=S.min/60;
  if(h<c.open||h>=c.close){await say(c.who,"Closed. Come back between "+c.open+" and "+(c.close>12?c.close-12+" pm":c.close+" am")+".");return}
  showOv("");var oc=$("ovc"),tab="buy";
  function r(){oc.innerHTML='<h3>'+c.title+'</h3><p class="mini">🪙 '+S.coins+' · '+c.line+'</p>';
    var tabs=document.createElement("div");tabs.style.cssText="display:flex;gap:6px;margin:6px 0";["buy","sell"].forEach(function(t){var b=document.createElement("button");b.className="mbtn";b.textContent=t==="buy"?"Buy":"Sell";b.style.flex="1";if(tab===t)b.style.background="#ffe3a8";b.onclick=function(){tab=t;r()};tabs.appendChild(b)});oc.appendChild(tabs);
    var list=document.createElement("div");list.style.textAlign="left";
    if(tab==="buy"){c.stock.forEach(function(s){list.appendChild(mrow(IT[s[0]].e,IT[s[0]].n,"🪙"+s[1],"Buy",function(){if(S.coins<s[1]){sfxPlay("bad");toast("Not enough coins");return}S.coins-=s[1];give(s[0]);sfxPlay("coin");paintHud();r()},S.coins<s[1]))})}
    else{var l=Object.keys(S.inv).filter(function(i){return IT[i]&&c.buy(i)>0});if(!l.length)list.innerHTML="<p>Nothing here they want yet.</p>";l.forEach(function(i){var pr=Math.round(IT[i].p*c.buy(i));list.appendChild(mrow(IT[i].e,IT[i].n+" ×"+S.inv[i],"🪙"+pr+" each","Sell",function(){take(i);S.coins+=pr;S.totalCoins+=pr;S.sold++;sfxPlay("coin");paintHud();r()}))})}
    oc.appendChild(list);var b=document.createElement("button");b.className="mbtn";b.style.marginTop="8px";b.textContent="Leave";b.onclick=hideOv;oc.appendChild(b)}
  r()}
var _vt1=vnTalkTo;
vnTalkTo=function(v){var st=v.id==="pim"?"bakery":v.id==="oru"?"fish":null;
  if(!st)return _vt1(v);
  return (async function(){await _vt1(v);var o=await ask(v.name,"Want to look at the stall?",["Take a look","Not now"]);if(o===0)await stall(st)})()};
function buildVillage(){
  VIL=[];var rv=mul(9191);
  function clr(x0,y0,x1,y1){props=props.filter(function(p){return !(p.x>=x0&&p.x<=x1&&p.y>=y0&&p.y<=y1)});for(var y=y0;y<=y1;y++)for(var x=x0;x<=x1;x++){if(!inb(x,y))continue;var g=ground[ix(x,y)];if(g===WA||g===DW)continue;solid[ix(x,y)]=0;delete inter[ix(x,y)]}}
  function put(k,x,y,sol,extra){if(!inb(x,y)||ground[ix(x,y)]===WA||ground[ix(x,y)]===DW||propAt(x,y))return;var p={k:k,x:x,y:y};if(extra)for(var q in extra)p[q]=extra[q];props.push(p);if(sol)solid[ix(x,y)]=1;if(k==="bench")inter[ix(x,y)]={k:"bench"};if(k==="x_hive")inter[ix(x,y)]={k:"hive"}}
  function house(b){
    clr(b.x-1,b.y,b.x+5,b.y+5);
    for(var y=b.y;y<=b.y+3;y++)for(var x=b.x;x<=b.x+4;x++){var g=ground[ix(x,y)];if(g===FO||g===SA)ground[ix(x,y)]=GR;solid[ix(x,y)]=1}
    for(var d=-1;d<=1;d++)setG(b.door+d,b.y+4,PA);
    inter[ix(b.door,b.y+3)]=(b.id==="bakery"||b.id==="fish")?{k:"stall",s:b.id}:b.id==="library"?{k:"lib"}:{k:"sign",t:b.t,tf:b.tf};
    VIL.push(b)}
  window.__villageHouse=house;
  /* ---- the South: a long way past the channel ---- */
  if(MH>=96){
    rect(0,48,OW-1,MH-1,GR);
    /* bridge across the channel */
    for(var y=44;y<=47;y++){for(var x=35;x<=37;x++){setG(x,y,WO);solid[ix(x,y)]=0}}
    for(var y=44;y<=47;y++){put("fence",34,y,1);put("fence",38,y,1)}
    /* far shore: sand, sea, east coast in later chapters */
    rect(0,95,OW-1,97,SA);rect(0,98,MW-1,MH-1,DW);
    if(MW>OW){rect(OW,48,MW-1,MH-1,DW);rect(60,48,OW-1,97,SA)}
    /* mill pond */
    for(var y=85;y<=93;y++)for(var x=18;x<=38;x++){var dx=(x-28)/9,dy=(y-89)/3.6;if(dx*dx+dy*dy<1)setG(x,y,WA)}
    /* roads */
    path([[36,39],[36,93]]);path([[8,56],[57,56]]);path([[8,70],[58,70]]);path([[8,84],[58,84]]);
    /* houses */
    VILD.forEach(function(b){if(b.y>=48)house(b)});
    /* the villagers' doors join the roads (pads sit on them) */
    /* West farm fields */
    clr(3,59,23,66);rect(5,60,21,64,GR);
    for(var y=60;y<=64;y+=2){for(var x=5;x<=21;x++){setG(x,y,SO);put("x_wheat",x,y,1,{v:(x+y)%3})}}
    for(var x=4;x<=22;x++){if(x!==13){put("fence",x,59,1);put("fence",x,65,1)}}for(var y=60;y<=64;y++){put("fence",4,y,1);put("fence",22,y,1)}
    addProp("sign",14,66,1,{k:"sign",t:"🌾 Mira's wheat. Tobi says he is not responsible for the scarecrow."});
    /* Robin's yard */
    clr(5,72,22,78);for(var x=5;x<=22;x++){if(x!==13){put("fence",x,72,1);put("fence",x,78,1)}}for(var y=73;y<=77;y++){put("fence",5,y,1);put("fence",22,y,1)}
    [[8,75],[11,77],[16,74],[19,77],[14,76]].forEach(function(q){put("x_hay",q[0],q[1],1)});
    /* East orchard */
    clr(40,58,59,66);
    for(var y=58;y<=66;y+=3)for(var x=41;x<=58;x+=3)put("tree",x+(rv()<.3?1:0),y,1,{v:Math.floor(rv()*3)});
    /* Lio's meadow and hives */
    clr(42,72,60,80);[[51,77],[53,79],[55,75],[57,78],[59,76]].forEach(function(q){put("x_hive",q[0],q[1],1)});
    for(var i=0;i<26;i++){var fx=42+Math.floor(rv()*18),fy=72+Math.floor(rv()*9);if(!solid[ix(fx,fy)]&&ground[ix(fx,fy)]===GR)put("x_sunfield",fx,fy,0)}
    /* Wren's garden */
    for(var i=0;i<14;i++){var gx=22+Math.floor(rv()*12),gy=60+Math.floor(rv()*8);if(!solid[ix(gx,gy)]&&ground[ix(gx,gy)]===GR&&gy<66)put("x_sunfield",gx,gy,0)}
    /* South Green: crossroads */
    clr(31,66,42,74);[[32,68],[41,68],[32,73],[41,73]].forEach(function(q){put("lamp",q[0],q[1],1)});put("bench",34,67,1);put("bench",39,67,1);put("bench",34,74,1);put("bench",39,74,1);
    addProp("sign",38,71,1,{k:"sign",t:"⬆ Channel & old village · ⬅ Mira's farm · ➡ Orchard, Lio's hives · ⬇ Mill pond & the south shore"});
    put("x_fire",CAMPX,CAMPY,1);inter[ix(CAMPX,CAMPY)]={k:"camp"};inter[ix(CAMPX+1,CAMPY)]={k:"camp"};
    /* bridge and crossing signs */
    addProp("sign",39,49,1,{k:"sign",t:"🌉 The South Bridge. Beyond it: the bakery, the fish market, and the villagers' homes."});
    addProp("sign",34,57,1,{k:"sign",t:"🥖 Bakery ⬅ · ➡ 🐟 Fish Market"});
    [[35,52],[38,52],[35,58]].forEach(function(q){put("lamp",q[0],q[1],1)});
    /* Hesper's grove and the south shore */
    [[48,85],[55,85]].forEach(function(q){put("lamp",q[0],q[1],1)});
    for(var i=0;i<30;i++){var tx=44+Math.floor(rv()*16),ty=86+Math.floor(rv()*8);if(!solid[ix(tx,ty)]&&ground[ix(tx,ty)]===GR)put("tree",tx,ty,1,{v:Math.floor(rv()*3)})}
    addProp("sign",42,94,1,{k:"sign",t:"🏖 The South Shore. Nobody lives down here. The tide has the place to itself."});
    put("bench",30,94,1);put("bench",44,94,1);
    /* boundary trees and scattered woods */
    for(var y=48;y<=94;y++){put("tree",0,y,1,{v:y%3});if(MW<=OW)put("tree",OW-1,y,1,{v:(y+1)%3})}
    for(var i=0;i<260;i++){var tx=1+Math.floor(rv()*62),ty=49+Math.floor(rv()*45);var g=ground[ix(tx,ty)];if(g!==GR||solid[ix(tx,ty)])continue;var nr=false;for(var dy=-1;dy<=1&&!nr;dy++)for(var dx=-1;dx<=1;dx++)if(inb(tx+dx,ty+dy)&&ground[ix(tx+dx,ty+dy)]===PA){nr=true;break}if(nr||(tx>=3&&tx<=23&&ty>=56&&ty<=79)||(tx>=40&&tx<=60&&ty>=57&&ty<=82)||(tx>=29&&tx<=44&&ty>=64&&ty<=76))continue;if(rv()<.5)put("tree",tx,ty,1,{v:Math.floor(rv()*3)});else if(rv()<.3)put("rock",tx,ty,1)}
    /* keep every road and doorstep clear */
    props=props.filter(function(p){if(p.y<48)return true;var g=ground[ix(p.x,p.y)];if((g===PA)&&(p.k==="tree"||p.k==="rock")){solid[ix(p.x,p.y)]=0;return false}return true});
    for(var y=48;y<MH;y++)for(var x=0;x<MW;x++){var g=ground[ix(x,y)];if(g===WA||g===DW){if(!(x>=35&&x<=37&&y>=44&&y<=47))solid[ix(x,y)]=1}}
    for(var y=44;y<=47;y++){for(var x=35;x<=37;x++)solid[ix(x,y)]=0}
  }
  /* ---- old village: Ralph and Ferris keep to their own corners ---- */
  VILD.forEach(function(b){if(b.y<48)house(b)});
  path([[44,6],[44,10],[46,11]]);
  path([[4,27],[6,28],[9,35]]);path([[52,21],[46,21],[44,23]]);
  if(typeof S!=="undefined"&&S&&S.wild)villageClean()}
function villageClean(){if(!S||!S.wild)return;S.wild=S.wild.filter(function(w){return !solid[ix(w.x,w.y)]&&!propAt(w.x,w.y)})}

var XZ=[
 {id:"fields",name:"Wren's Sunflower Fields",r:[65,2,83,11],e:"🌻",lore:"Granny Wren's fields. After the festival, seeds from Doodi's farm drifted east on the wind and a whole hillside of sunflowers sprang up. The windmill grinds their seeds into flour for Rocket Square."},
 {id:"square",name:"Rocket Square",r:[76,14,92,23],e:"🚀",lore:"Mr. Rocket's building fund did more than build one home. Villagers kept donating, and a whole market square grew, with a little monument to the rocket that once crashed into the lake."},
 {id:"obs",name:"The Old Observatory",r:[91,2,102,12],e:"🔭",lore:"Rocket's first launch pad, long before the shop. After the rocket crash he turned it into an observatory. The brass telescope still works, and on clear nights some people say they can see two time zones at once."},
 {id:"bamboo",name:"Bamboo Grove & Hot Spring",r:[93,14,102,26],e:"♨️",lore:"A quiet corner where the valley's springs rise warm. The villagers say a quarrel does not survive five minutes beside the water."},
 {id:"harbor",name:"Sunset Harbour",r:[78,33,102,46],e:"⚓",lore:"Once the busiest harbour south of the valley, run by Captain Ferris's family. The Sunset Ferry used to leave from this pier, until the Great Storm brought the cliffs down across the harbour mouth and the boats stopped."},
 {id:"gate",name:"The Southern Gate",r:[91,27,101,33],e:"🗝",lore:"A great stone door in the cliff, sealed since the Great Storm. Faint blue runes pulse on it at night, and the ground hums. Ferris swears something underground is waking up."}];
function buildExpansion(){
  var rr=mul(4242),cl=new Uint8Array(MW*MH);
  function claim(x0,y0,x1,y1){for(var y=y0;y<=y1;y++)for(var x=x0;x<=x1;x++)if(inb(x,y))cl[ix(x,y)]=1}
  function clearAt(x,y){props=props.filter(function(p){return !(p.x===x&&p.y===y)});if(inb(x,y)){solid[ix(x,y)]=0;delete inter[ix(x,y)]}}
  /* a gap in the old east wall of trees */
  for(var y=10;y<=14;y++){clearAt(63,y);clearAt(62,y)}
  /* beach and sea across the new width */
  rect(64,41,MW-1,43,SA);rect(64,40,MW-1,40,SA);
  /* main roads */
  path([[46,12],[63,12],[84,12]]);path([[84,12],[84,26]]);path([[84,26],[84,36],[90,40]]);path([[84,27],[95,27],[95,29]]);path([[84,12],[96,12],[96,8]]);path([[88,19],[96,19]]);path([[70,12],[70,6]]);
  /* sunflower fields */
  claim(65,2,83,11);
  for(var y=3;y<=10;y++)for(var x=66;x<=82;x++){if(Math.abs(x-70)<=1&&y>=6&&y<=12)continue;if(x>=73&&x<=75&&y>=3&&y<=7)continue;if(rr()<.55){props.push({k:"x_sunfield",x:x,y:y,v:Math.floor(rr()*3)})}}
  props.push({k:"x_windmill",x:73,y:3});for(var y=5;y<=7;y++)for(var x=73;x<=74;x++)solid[ix(x,y)]=1;
  addProp("sign",72,8,1,{k:"sign",t:"🌻 Wren's Sunflower Fields. The windmill grinds the seeds into flour for Rocket Square."});
  /* Rocket Square */
  claim(76,14,92,23);rect(78,15,90,22,PA);
  [[79,15,0],[82,15,1],[85,15,2],[88,15,3]].forEach(function(s){props.push({k:"x_stall",x:s[0],y:s[1],c:s[2]});solid[ix(s[0],s[1])]=1;solid[ix(s[0]+1,s[1])]=1});
  props.push({k:"x_rocket",x:84,y:19});solid[ix(84,19)]=1;solid[ix(84,20)]=1;
  addProp("sign",83,22,1,{k:"sign",t:"🚀 Rocket Square. Built from the donations to Mr. Rocket's building fund. The monument remembers the day his rocket landed in the lake."});
  [[79,18],[89,18],[79,21],[89,21]].forEach(function(l){addProp("lamp",l[0],l[1],0)});
  addProp("bench",81,21,1);addProp("bench",87,21,1);
  EXB.push({x:77,y:24,w:5,h:3,door:79,roof:"#e4572e",wall:"#e8cfae",name:"Bakery",sign:"TOM'S 2ND OVEN"});
  EXB.push({x:86,y:24,w:5,h:3,door:88,roof:"#2f9d8f",wall:"#d9b98a",name:"Rocket Hall",get sign(){return (typeof CH2!=="undefined"&&CH2)?"ROCKET HALL":"DAN'S COTTAGE"}});
  claim(77,24,81,26);claim(86,24,90,26);
  [[77,24,5,3],[86,24,5,3]].forEach(function(b){for(var y=b[1];y<b[1]+b[3];y++)for(var x=b[0];x<b[0]+b[2];x++)solid[ix(x,y)]=1});
  /* observatory ruins */
  claim(91,2,102,12);rect(93,3,100,11,PA);
  [[93,3],[100,3],[93,8],[100,8],[96,2]].forEach(function(q){props.push({k:"x_ruin",x:q[0],y:q[1]});solid[ix(q[0],q[1])]=1});
  props.push({k:"x_scope",x:96,y:6});solid[ix(96,6)]=1;inter[ix(96,6)]={k:"scope"};
  addProp("sign",98,10,1,{k:"sign",t:"🔭 The Old Observatory. Rocket's first launch pad. The telescope still works, but only at night."});
  /* bamboo grove and hot spring */
  claim(93,14,102,26);rect(97,19,100,22,WA);
  for(var y=15;y<=25;y++)for(var x=94;x<=101;x++){if(ground[ix(x,y)]===WA||ground[ix(x,y)]===PA)continue;if(y>=18&&y<=23&&x>=96&&x<=101)continue;if(rr()<.4){props.push({k:"x_bamboo",x:x,y:y,v:Math.floor(rr()*3)});solid[ix(x,y)]=1}}
  props.push({k:"x_steam",x:98,y:20});
  addProp("bench",96,21,1);
  addProp("sign",95,18,1,{k:"sign",t:"♨️ The hot spring. Quarrels do not last five minutes here."});
  /* sunset harbour */
  claim(78,33,102,46);rect(78,34,101,43,SA);rect(90,40,91,46,WO);
  EXB.push({x:81,y:35,w:5,h:3,door:83,roof:"#c24b3b",wall:"#e8cfae",name:"Harbour Inn",get sign(){return (typeof CH2!=="undefined"&&CH2)?"HARBOUR INN":"JUDY'S COTTAGE"}});claim(81,35,85,37);
  for(var y=35;y<=37;y++)for(var x=81;x<=85;x++)solid[ix(x,y)]=1;
  props.push({k:"x_lighthouse",x:97,y:34});for(var y=38;y<=39;y++)for(var x=97;x<=98;x++)solid[ix(x,y)]=1;
  props.push({k:"x_boat",x:93,y:44,c:0});props.push({k:"x_boat",x:87,y:45,c:1});
  addProp("sign",88,39,1,{k:"sign",t:"⚓ Sunset Harbour. The Sunset Ferry has not sailed since the Great Storm brought the cliffs down across the harbour mouth."});
  addProp("bench",92,38,1);
  /* the sealed gate */
  claim(91,27,101,33);rect(92,28,100,33,FO);rect(94,28,96,29,PA);
  props.push({k:"x_gate",x:94,y:29});for(var y=30;y<=32;y++)for(var x=94;x<=96;x++)solid[ix(x,y)]=1;
  inter[ix(95,32)]={k:"sign",t:"🗝 The Southern Gate. Sealed since the Great Storm. The runes glow faintly, and the ground hums beneath your feet. Something below is waking up."};
  addProp("sign",94,27,1,{k:"sign",t:"⚠ The Southern Gate. Do not go near after dark. (Ferris)"});
  /* trees around the new land */
  for(var y=0;y<44;y++)for(var x=64;x<MW;x++){var g=ground[ix(x,y)];if(g!==GR&&g!==FO)continue;if(solid[ix(x,y)]||cl[ix(x,y)])continue;
    var edge=x===MW-1||y===0;var near=false;for(var dy=-1;dy<=1&&!near;dy++)for(var dx=-1;dx<=1;dx++)if(inb(x+dx,y+dy)&&ground[ix(x+dx,y+dy)]===PA){near=true;break}
    if(edge||(!near&&rr()<.06)){if(!propAt(x,y)){props.push({k:"tree",x:x,y:y,v:Math.floor(rr()*3)});solid[ix(x,y)]=1}}}
  for(var y=0;y<MH;y++)for(var x=64;x<MW;x++)if(ground[ix(x,y)]===WA||ground[ix(x,y)]===DW)solid[ix(x,y)]=1;
  for(var y=40;y<=47;y++)for(var x=90;x<=91;x++)solid[ix(x,y)]=0;
}
function drawXProp(p,px,py){
  var t=typeof time!=="undefined"?time:0;
  switch(p.k){
  case"x_sunfield":{var sw=Math.sin(t*1.6+p.x*.7)*1.5;R(px+15+sw,py+12,2,18,"#3f8f3c");R(px+9,py+20,6,3,"#58b04f");R(px+17,py+17,6,3,"#58b04f");flowerArt(px+sw+2,py-4,0);R(px+6,py+20,2,8,"#3f8f3c");R(px+24,py+18,2,10,"#3f8f3c");R(px+3+sw,py+10,8,8,"#ffd34f");R(px+5+sw,py+12,4,4,"#6b3d1e");R(px+21+sw,py+8,8,8,"#ffc83d");R(px+23+sw,py+10,4,4,"#6b3d1e");break}
  case"x_fire":{if(typeof SCENE!=="undefined"&&SCENE&&SCENE.k==="camp")break;R(px+2,py+26,28,4,"#00000030");for(var i=0;i<6;i++){var a=i/6*6.283;R(px+16+Math.cos(a)*13-3,py+22+Math.sin(a)*5,6,5,"#6b6b72")}R(px+5,py+22,22,5,"#4a2e18");R(px+7,py+20,18,4,"#6b4426");
    if(typeof campLit==="function"&&campLit()&&!(S&&S.seen&&S.seen.camp&&false)){var fl=Math.sin(t*14)*2;cx.globalAlpha=.25;cx.fillStyle="#ffb35a";cx.beginPath();cx.arc(px+16,py+14,34,0,7);cx.fill();cx.globalAlpha=1;R(px+9,py+8-fl,14,13,"#ff7a2e");R(px+12,py+2+fl,8,10,"#ffb04a");R(px+14,py-2,4,8,"#ffd34d")}
    else{R(px+10,py+16,12,5,"#3a2a1a")}break}
  case"x_wheat":{var sw3=Math.sin(t*1.3+p.x*.6+p.y)*1.4;for(var i=0;i<5;i++){var bx=px+3+i*6+sw3;R(bx,py+8,2,22,"#cfae4a");R(bx-1,py+3,4,8,"#e8c34a");R(bx,py+1,2,3,"#f2d86a")}break}
  case"x_hay":{R(px+2,py+28,28,3,"#00000028");R(px+3,py+8,26,22,"#e0b84a");R(px+3,py+8,26,3,"#f0cd68");R(px+3,py+16,26,2,"#b88a2e");R(px+3,py+24,26,2,"#b88a2e");R(px+14,py+8,3,22,"#c99a38");break}
  case"x_hive":{R(px+6,py+28,20,3,"#00000028");R(px+8,py+24,3,6,"#6b4426");R(px+21,py+24,3,6,"#6b4426");R(px+7,py+10,18,15,"#e8c35a");R(px+7,py+16,18,2,"#b88a2e");R(px+7,py+21,18,2,"#b88a2e");R(px+5,py+7,22,5,"#8a5a32");R(px+13,py+18,6,5,"#3a2616");for(var i=0;i<3;i++){var ph=t*3+i*2;R(px+8+Math.cos(ph)*10+8,py+2+Math.sin(ph*1.3)*6,2,2,"#2a1a10")}break}
  case"x_windmill":{R(px+2,py+90,92,6,"#00000022");R(px+10,py+30,76,66,"#e8d6b0");R(px+10,py+30,76,4,"#fff4dc");R(px+30,py+62,28,34,"#8a5a32");R(px+36,py+70,5,5,"#e4c16a");R(px+4,py+18,88,18,"#c24b3b");R(px+20,py+6,56,16,"#c24b3b");R(px+30,py+46,10,12,"#7fb8e8");R(px+54,py+46,10,12,"#7fb8e8");
    var a=t*.8;cx.save();cx.translate(px+48,py+22);cx.rotate(a);for(var i=0;i<4;i++){cx.rotate(Math.PI/2);R(-3,-52,6,52,"#8a5a32");R(2,-50,18,24,"#f6ecd2");R(2,-50,18,2,"#d6c49a")}cx.restore();R(px+44,py+18,8,8,"#5a3a22");break}
  case"x_stall":{var cs=[["#e4572e","#fff4e0"],["#2f6fd0","#fff4e0"],["#2f9d8f","#fff4e0"],["#c24b9e","#fff4e0"]][p.c%4];R(px+2,py+30,60,4,"#00000022");R(px+4,py+10,4,22,"#7a4a26");R(px+56,py+10,4,22,"#7a4a26");for(var i=0;i<6;i++)R(px+4+i*9,py+4,9,12,i%2?cs[1]:cs[0]);R(px+4,py+14,56,3,"#00000033");R(px+6,py+22,52,10,"#b98a54");R(px+6,py+22,52,2,"#d1a56c");var gd=[["🍞","🥐","🥖"],["🐟","🦀","🦑"],["🌻","🌷","🪷"],["🍓","🍯","🫖"]][p.c%4];cx.font="14px serif";cx.textAlign="center";gd.forEach(function(g,i){cx.fillText(g,px+14+i*18,py+22)});break}
  case"x_rocket":{R(px+6,py+60,20,6,"#00000033");R(px+10,py+54,12,10,"#8a8a96");R(px+9,py+8,14,48,"#f4f4f8");R(px+9,py+8,14,3,"#fff");R(px+11,py-6,10,16,"#e4572e");R(px+13,py-12,6,8,"#e4572e");R(px+4,py+38,6,18,"#e4572e");R(px+22,py+38,6,18,"#e4572e");R(px+12,py+20,8,8,"#8fd6ff");R(px+13,py+21,6,3,"#fff");R(px+10,py+40,12,3,"#c4c4cc");break}
  case"x_ruin":{R(px+3,py+26,26,6,"#00000024");R(px+6,py-18,20,48,"#b8b4a8");R(px+4,py-22,24,8,"#cfcabc");R(px+6,py-18,4,48,"#a09c90");R(px+16,py+4,8,3,"#8a867a");R(px+10,py+14,6,3,"#8a867a");if(p.x%2){R(px+20,py-8,5,5,"#6fae5a");R(px+8,py+0,4,4,"#6fae5a")}break}
  case"x_scope":{R(px+4,py+30,24,4,"#00000030");R(px+14,py+10,4,22,"#7a4a26");R(px+8,py+30,16,3,"#7a4a26");cx.save();cx.translate(px+16,py+10);cx.rotate(-.9);R(-4,-4,34,8,"#c9a227");R(24,-5,10,10,"#e7d38a");R(-8,-3,6,6,"#8a6a2a");cx.restore();R(px+12,py+6,8,6,"#b9902a");break}
  case"x_bamboo":{var sw2=Math.sin(t*1.2+p.x)*1;for(var i=0;i<3;i++){var bx=px+5+i*10+sw2;R(bx,py-18,4,50,"#6fae5a");for(var j=0;j<4;j++)R(bx-1,py-12+j*12,6,2,"#4f8a44");R(bx+3,py-8+i*6,10,3,"#58b04f")}break}
  case"x_steam":{for(var i=0;i<6;i++){var ph=((t*.4)+i/6)%1;cx.globalAlpha=.55*(1-ph);cx.fillStyle="#fff";cx.beginPath();cx.arc(px+Math.sin(i*2+t)*20+8,py-ph*70+20,6+ph*10,0,7);cx.fill()}cx.globalAlpha=1;break}
  case"x_lighthouse":{R(px+4,py+158,60,6,"#00000024");for(var i=0;i<5;i++)R(px+10,py+i*32,44,32,i%2?"#f4f4f8":"#e4572e");R(px+8,py-12,48,14,"#3a3a44");R(px+14,py-26,36,16,"#ffe9a0");R(px+10,py-34,44,10,"#c24b3b");R(px+28,py-44,8,10,"#3a3a44");R(px+26,py+120,12,40,"#6b4426");
    var h=S?S.min/60:12,night=h>=18||h<6;if(night){var a=t*1.2;cx.save();cx.translate(px+32,py-18);cx.globalCompositeOperation="lighter";var g=cx.createLinearGradient(0,0,Math.cos(a)*220,Math.sin(a)*40);g.addColorStop(0,"rgba(255,240,170,.55)");g.addColorStop(1,"rgba(255,240,170,0)");cx.fillStyle=g;cx.beginPath();cx.moveTo(0,0);cx.lineTo(Math.cos(a)*220,Math.sin(a)*40-14);cx.lineTo(Math.cos(a)*220,Math.sin(a)*40+14);cx.closePath();cx.fill();cx.restore()}break}
  case"x_boat":{var bob=Math.sin(t*1.6+p.x)*2;R(px,py+14+bob,56,6,"#6b4426");R(px+4,py+20+bob,48,6,"#8a5a32");R(px+26,py-12+bob,3,28,"#5a3a22");R(px+29,py-10+bob,22,18,p.c?"#f4f4f8":"#ffd34d");R(px+8,py+12+bob,6,3,"#fff");break}
  case"x_gate":{R(px-6,py+88,108,8,"#00000033");R(px-4,py-6,104,94,"#8e8a80");R(px,py,96,88,"#6b6a72");R(px+8,py+8,80,76,"#3a3a44");
    var pl=.5+.5*Math.sin(t*2);R(px+44,py+8,8,76,"#2a2a32");for(var i=0;i<5;i++){var ry=py+14+i*14;cx.globalAlpha=.4+.6*pl;R(px+16,ry,14,4,"#6fd0ff");R(px+66,ry+5,14,4,"#6fd0ff");R(px+22,ry+4,4,8,"#6fd0ff");cx.globalAlpha=1}
    cx.globalAlpha=.25+.3*pl;cx.fillStyle="#6fd0ff";cx.fillRect(px+8,py+8,80,76);cx.globalAlpha=1;R(px+40,py+34,16,16,"#c9a227");R(px+44,py+38,8,8,"#2a2a32");break}}
}
/* discovery of new places + lore list */
function discCheck(){
  if(!S||talking)return;S.disc=S.disc||{};
  for(var i=0;i<XZ.length;i++){var z=XZ[i];if(S.disc[z.id])continue;var r=z.r;if(P.x>=r[0]&&P.x<=r[2]&&P.y>=r[1]&&P.y<=r[3]){S.disc[z.id]=1;toast("📍 Discovered: "+z.e+" "+z.name);sfxPlay("chime");S.discN=Object.keys(S.disc).length;break}}}
function mapExtra(g,K,lab){
  if(MW<=OW)return;var SH={fields:"Sunflower Fields",square:"Rocket Square",obs:"Observatory",bamboo:"Hot Spring",harbor:"Harbour",gate:"Southern Gate"};
  var used=(g.__lr||[]).slice(),sz=26;g.font="800 "+sz+"px Figtree,system-ui,sans-serif";
  XZ.forEach(function(z){var d=S.disc&&S.disc[z.id],t=d?z.e+" "+(SH[z.id]||z.name):"❔";
    var w=g.measureText(t).width+10,h=sz+8,cx=(z.r[0]+z.r[2])/2*K,cy=(z.r[1]+z.r[3])/2*K,best=null;
    var offs=[0,-1,1,-2,2,-3,3,-4,4];
    for(var i=0;i<offs.length&&!best;i++){var y=Math.max(h/2+2,Math.min(MH*K-h/2-2,cy+offs[i]*h)),x=Math.max(w/2+2,Math.min(MW*K-w/2-2,cx));
      var r={x0:x-w/2,x1:x+w/2,y0:y-h/2,y1:y+h/2},hit=used.some(function(u){return r.x0<u.x1&&r.x1>u.x0&&r.y0<u.y1&&r.y1>u.y0});
      if(!hit)best={r:r,x:x,y:y}}
    if(!best){var y2=cy,x2=cx;best={r:{x0:x2-w/2,x1:x2+w/2,y0:y2-h/2,y1:y2+h/2},x:x2,y:y2}}
    used.push(best.r);if(g.__lr)g.__lr.push(best.r);
    g.font="800 "+sz+"px Figtree,system-ui,sans-serif";g.textAlign="center";g.textBaseline="middle";g.lineJoin="round";g.lineWidth=6;g.strokeStyle="rgba(20,30,40,.9)";g.strokeText(t,best.x,best.y);g.fillStyle=d?"#ffe9a8":"#cfd8e8";g.fillText(t,best.x,best.y)})}
var _tl=tabLog;
tabLog=function(mb){_tl(mb);if(MW<=OW)return;S.disc=S.disc||{};h4(mb,"Places & Lore ("+Object.keys(S.disc).length+"/"+XZ.length+")");
  XZ.forEach(function(z){var d=S.disc[z.id];mb.appendChild(mrow(d?z.e:"❔",d?z.name:"???",d?z.lore:"Not discovered yet. Explore the east side of the valley.",null,null,0,!!d))})};
/* ---------- backup code (copy / restore progress) ---------- */
var _tmB=tabMore;
tabMore=function(mb){_tmB(mb);mb.appendChild(mrow("📦","Backup code","Copy a code that keeps your progress safe. Paste one later to restore it.","Open",openBackup))};
function openBackup(){
  try{save()}catch(e){}
  var raw=ls(SAVEKEY)||"",code="";try{code=btoa(unescape(encodeURIComponent(raw)))}catch(e){}
  showOv('<div style="text-align:center"><h3 style="margin:0 0 6px">📦 Backup code</h3><p style="font-size:.9rem;margin:0 0 8px">Copy this code and keep it somewhere safe. To restore, paste a code here and press Restore.</p><textarea id="bk" style="width:100%;height:130px;font:12px monospace;border-radius:8px;padding:6px;box-sizing:border-box">'+code+'</textarea><div style="display:flex;gap:8px;justify-content:center;margin-top:10px;flex-wrap:wrap"><button class="mbtn" id="bkc" type="button">Copy</button><button class="mbtn" id="bkl" type="button">Restore</button><button class="mbtn" id="bkx" type="button">Close</button></div><p id="bkm" style="font-size:.85rem;margin:8px 0 0"></p></div>');
  var ta=$("bk"),m=$("bkm");["keydown","keyup","keypress"].forEach(function(ev){ta.addEventListener(ev,function(e){e.stopPropagation()})});
  $("bkc").onclick=function(){ta.select();var ok=false;try{navigator.clipboard.writeText(ta.value).then(function(){m.textContent="Copied!"},function(){m.textContent="Select the code and copy it."});ok=true}catch(e){}if(!ok)m.textContent="Select the code and copy it."};
  $("bkl").onclick=function(){try{var j=decodeURIComponent(escape(atob(ta.value.trim())));var o=JSON.parse(j);if(!o||o.v!==1)throw 1;ls(SAVEKEY,j);m.textContent="Restored! Reloading…";setTimeout(function(){location.reload()},600)}catch(e){m.textContent="That code doesn't look right."}};
  $("bkx").onclick=function(){hideOv()}}
