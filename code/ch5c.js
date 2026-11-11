/* ===== Chapter 5: The Door (story, acts, Warden) ===== */
function NP(id,x,y,d,lamp){return {id:id,x:x,y:y,d:d==null?2:d,sp:VSPEC[id],lamp:lamp}}
function cut(o){G.map=o.map;G.theme=o.theme||"night";G.en=[];G.pj=[];G.tr=[];G.fx=[];G.post=o.post||null;G.engine=null;G.beacons=[];G.waves=[];G.drawBack=o.back||null;G.drawFront=o.front||null;G.npcs=o.npcs||[];G.dark=o.dark||0;G.bossHud=null;G.cur=null;ZN=[];
  setParty(o.party||[],o.pos);G.hs.forEach(function(h){h.ai=true;h.inv=0});G.mode="cut";G.dead=false;G.onA=null;G.onStep=null;G.place=o.place||"";G.fade=.4;G.hp=G.mx;if(o.song!==undefined)m5(o.song)}
function HR(id){for(var i=0;i<G.hs.length;i++)if(G.hs[i].id===id)return G.hs[i]}
async function walk(o,x,y,ms){var n=14,x0=o.x,y0=o.y;o.d=Math.abs(x-x0)>Math.abs(y-y0)?(x>x0?1:3):(y>y0?2:0);for(var i=1;i<=n;i++){o.x=x0+(x-x0)*i/n;o.y=y0+(y-y0)*i/n;if("mv" in o)o.mv=1;await sleep(ms/n)}if("mv" in o)o.mv=0}
function face(o,d){o.d=d}
async function card(a,b,ms){showOv('<div id="title"><h3 class="tt" style="font-size:2.2rem">'+a+'</h3><p class="hand" style="font-size:1.4rem">'+(b||"")+'</p></div>');await sleep(ms||2800);hideOv()}
async function beat(ms){await sleep(ms||500)}
/* ---- hazards ---- */
var ZN=[];
function zone(z){z.t=0;ZN.push(z)}
function drawZones(){ZN.forEach(function(z){var pre=z.t<z.w,a=pre?.16+.3*(z.t/z.w):Math.max(0,.9-(z.t-z.w)*3.5);cx.globalAlpha=a;cx.fillStyle=pre?"#ff6fd0":"#fff6c4";if(z.r){cx.beginPath();cx.arc(z.x,z.y,z.r,0,7);cx.fill()}else cx.fillRect(z.x0,z.y0,z.x1-z.x0,z.y1-z.y0);cx.globalAlpha=1})}
function stepZones(dt){var l=G.hs.length?lead():null;ZN=ZN.filter(function(z){var was=z.t;z.t+=dt;if(was<z.w&&z.t>=z.w&&l){sfx5("boom");G.shake=.22;var py=l.y-6,inn=z.r?dist(l.x,py,z.x,z.y)<z.r:(l.x>z.x0&&l.x<z.x1&&py>z.y0&&py<z.y1);if(inn)hurtHero(2)}return z.t<z.w+.3})}
/* ---- scenery ---- */
function dDoor(x,y,s,open,al){cx.save();cx.globalAlpha=al==null?1:al;var k=Math.sin(time*3)*.5+.5;glowC(x,y-30*s,70*s,open?"rgba(255,240,180,1)":"rgba(190,140,255,1)",.35+.25*k);
  cx.fillStyle="#1a1226";cx.fillRect(x-18*s,y-64*s,36*s,64*s);cx.strokeStyle=open?"#fff1b0":"#b99bff";cx.lineWidth=3*s;cx.strokeRect(x-18*s,y-64*s,36*s,64*s);
  if(open){cx.fillStyle="rgba(255,244,190,.9)";cx.fillRect(x-14*s,y-60*s,28*s,60*s);glowC(x,y-30*s,50*s,"rgba(255,255,255,1)",.6)}
  else{cx.fillStyle="#2a1c3c";cx.fillRect(x-14*s,y-60*s,28*s,60*s);cx.fillStyle="#d8c6ff";cx.fillRect(x+7*s,y-30*s,3*s,3*s);cx.fillStyle="rgba(255,220,255,"+(.2+.6*Math.max(0,Math.sin(time*4)))+")";cx.fillRect(x-14*s,y-8*s,28*s,3*s)}
  cx.lineWidth=1;cx.restore()}
function drawWarden(e){var x=e.x,y=e.y,t=time,fl=e.fl>0,p=e.ph||1;glowC(x,y-30,70,p===2?"rgba(255,120,200,1)":"rgba(170,110,255,1)",.45);
  cx.fillStyle=fl?"#fff":"#120a1e";cx.beginPath();cx.moveTo(x-22,y+4);cx.lineTo(x-12,y-50);cx.lineTo(x+12,y-50);cx.lineTo(x+22,y+4);cx.lineTo(x+12,y-2+Math.sin(t*4)*2);cx.lineTo(x,y+4);cx.lineTo(x-12,y-2);cx.fill();
  cx.beginPath();cx.arc(x,y-58,10,0,7);cx.fill();cx.strokeStyle=p===2?"#ff7ad0":"#b99bff";cx.lineWidth=2;cx.strokeRect(x-26,y-84,52,86);cx.lineWidth=1;
  cx.fillStyle=e.stun>0?"#888":"#fff1b0";cx.fillRect(x-5,y-60,3,3);cx.fillRect(x+3,y-60,3,3);
  cx.fillStyle="#ffd34d";cx.fillRect(x+20,y-30,5,8);glowC(x+22,y-28,16,"rgba(255,220,120,1)",.5);
  for(var i=0;i<3;i++){cx.strokeStyle="rgba(255,160,230,.55)";cx.beginPath();cx.moveTo(x-10+i*10,y-48);cx.lineTo(x-14+i*12+Math.sin(t*3+i)*3,y-14);cx.stroke()}}
/* ---- act 0: opening ---- */
async function act0(){
  await card("Chapter 5","The Door",2600);
  if(window.G5OP&&!window.__nosong&&!window.__noOp){await G5OP()}
  cut({map:"sq",party:["judy"],pos:[[160,230]],post:{x:160,y:176,hp:2,mx:24,fl:0},place:"Town Square",song:SONG.calm});
  ARMOR=false;G.dark=.35;
  await seq([["","Chapter 5 · The Door"],["","A week ago the shrine doors swung open on their own, and a pale, antlered Warden stepped out of the dark and thanked the valley for lighting his road. Nobody else has gone up the hill since."],["","Doodi and Danoya have spent every day at the shrine with Elder Hesper, trying to learn what a Keeper who said no for four hundred years is afraid of. The rest of the valley has done what valleys do: kept a light on."],["","The hard frost comes early this year. It comes the way bad news does: quietly, and a little after it is needed."],["","At the hour the lanterns are lit, every lantern in Danoya Valley goes out together. No wind. No sound. As if someone, somewhere, had finally let go of a breath."]])}
/* ---- act 1: judy holds the square ---- */
async function act1(){
  F5.act=Math.max(F5.act,0);ARMOR=false;
  cut({map:"sq",party:["judy"],pos:[[160,236]],post:{x:160,y:176,hp:3,mx:24,fl:0},place:"Town Square",song:SONG.calm,dark:.3,
    npcs:[NP("pim",92,150,1,1),NP("nell",230,148,3,1),NP("hesper",200,246,3,1)]});
  await seq([["Judy","The post is the first thing the valley lights and the last thing it forgets. I hold the post. That's all the plan there is."],["Baker Tom","It isn't frost. I've baked through three frosts. Frost doesn't get inside a lantern with the door shut."],["Robin","The porch is cold, too. Not cold like winter. Cold like a room someone just left. I came out to see whether it was only my house."],["Judy","It isn't."]]);
  var tb=NP("tobi",160,320,0,0);G.npcs.push(tb);await walk(tb,160,262,700);
  await seq([["Tobi","Judy! Orchard Row. All of them. They didn't flicker. They just stopped."],["Judy","Go home. Bar the door."],["Tobi","Gran used to say a lock has never kept out anything that wanted in."],["Judy","Then sit by the one light you have and keep it with both hands. Go."]]);
  await walk(tb,160,330,600);G.npcs.pop();
  await seq([["Elder Hesper","Judy. The Warden has stopped waiting for us to open the Door for him."],["Judy","Open it for him? Why would he want it open?"],["Elder Hesper","That is the whole story, and I will tell it once, at the shrine, when there is time. Doodi and Danoya are up there now, learning what he is afraid of. They need an hour clear."],["Elder Hesper","Every lantern the old Keepers lit was a stitch in a seam older than this valley. The Warden is pulling them out one by one. The nearest first."],["Judy","How long do we have?"],["Elder Hesper","Until the post goes dark. Then the square. Then everything that has a name."],["Judy","Then the post doesn't go dark."],["Elder Hesper","Three jobs, then. You hold the post, the oldest light the square still has. Someone lights the old beacons on the hill, before the Door shows itself to everyone at once. And Rocket says he can build something at the mill to buy us the hour."],["Baker Tom","I'll stay behind you, with bread. Don't look at me like that. People hold lines better fed."]]);
  G.npcs=[];G.post=null;
  await seq([["How to play · Judy","Attack (A): a heavy swing in front of you. Skill: Slam (5s), a shockwave that hits everything around you. Keep the enemies off the post!"]]);
  var r=await playCombat({map:"sq",theme:"night",party:["judy"],pos:[[160,236]],post:{x:160,y:176,hp:30},song:SONG.fight1,lose:"The post went dark.",
    goal:function(){return "Hold the post"},
    waves:[{at:1,list:[["shade",40,60],["shade",280,60],["shade",30,190]],say:"Tom: \"Left side, Judy!\""},
      {at:13,list:[["wisp",50,50],["wisp",270,50],["shade",30,190],["shade",300,190],["shade",160,20]],say:"Robin: \"They're coming from the orchard!\""},
      {at:28,list:[["brute",160,30],["shade",30,190],["shade",300,190],["wisp",40,330],["wisp",280,330]],say:"Hesper: \"Hold. Hold. Hold.\""},
      {at:44,list:[["wisp",40,40],["wisp",280,40],["wisp",30,300],["wisp",290,300],["shade",160,20]],say:"Tom: \"More! There are MORE!\""},
      {at:58,list:[["brute",50,40],["brute",270,40],["shade",30,190],["shade",300,190],["shade",160,350]],say:"Judy: \"Not the post. Not tonight.\""},
      {at:74,list:[["brute",160,30],["wisp",50,60],["wisp",270,60],["shade",30,190],["shade",300,190],["shade",100,350],["shade",220,350]],say:"Hesper: \"Last of them. Hold!\""}]});
  F5.act=1;save5();
  cut({map:"sq",party:["judy"],pos:[[160,236]],post:{x:160,y:176,hp:12,mx:24,fl:0},place:"Town Square",song:SONG.calm,dark:.25,npcs:[NP("pim",92,150,1,1),NP("nell",230,148,3,1)]});
  var dn=HR("judy");var dan={id:"dan",x:20,y:210,d:1,sp:VSPEC.dan,mv:0};G.npcs.push(dan);await walk(dan,110,210,900);
  await seq([["Dan","Judy! Judy, the— (he stops, takes in the square) You held all this on your own?"],["Judy","Tom threw bread."],["Baker Tom","Good bread."],["Dan","Hesper sent me. The old beacons on the north hill need lighting, before the light up there shows itself to everyone. It's the wrong colour, she says. Somebody should see what it is."],["Judy","Somebody. You're the fastest runner in the valley."],["Dan","Fast isn't brave! That's a hill. It's a very tall hill. It's the tallest—"],["Judy","Dan. I came for a fortnight and never went home. Somebody had to watch over her, and I wasn't leaving it to strangers. I know what holding a thing costs. You have never once been asked to climb."],["Judy","Go and look. I'll hold the post."],["Dan","And if I fall?"],["Judy","Then I'll be extremely cross with you afterwards. Loudly. In public."],["Dan","That is the kindest thing anyone has ever said to me."]]);
  await walk(dan,20,210,700);G.npcs=[]}
/* ---- act 2: dan on the hill ---- */
async function act2(){
  ARMOR=false;
  cut({map:"hill",party:["dan"],pos:[[160,350]],place:"Shrine Hill",song:SONG.scout,dark:.2,npcs:[NP("lio",70,260,1,1),NP("ines",252,262,3,1)]});
  await seq([["Lio","The bees flew up here at dusk and wouldn't come down. Ines followed the lake, which has gone still and is pointing at the hill. We followed both."],["Lio","The bees went quiet, Dan. They never go quiet. Not in storms. Not in anything."],["Ines","The lake stopped moving. I didn't know water could do that."],["Dan","Wonderful. Love it. Favourite thing."],["Lio","There are three beacons on the hill. Old Keeper work. If nobody lights them, the Door shows itself to everyone at once."],["Dan","The what? Nobody said door."],["Ines","Hesper's been saying door since spring."],["Dan","Okay. Three beacons. If I look down I'll be sick, so my plan is not to look down."]]);
  G.npcs=[];
  var cnt=0;
  await seq([["How to play · Dan","Attack (A): fires a shot where you aim. Skill: Volley (5s), a fan of five shots. Walk to the three beacons to light them while you keep the wisps away."]]);
  await playCombat({map:"hill",theme:"night",party:["dan"],pos:[[160,350]],song:SONG.fight1,lose:"The hill went dark.",beacons:[[64,132],[256,132],[160,262]],
    goal:function(){var n=G.beacons.filter(function(b){return b.lit}).length;return "Light the beacons ("+n+"/3)"},
    step:function(dt){var n=G.beacons.filter(function(b){return b.lit}).length;if(n>cnt){cnt=n;say5(["","Dan: \"Don't look down. Don't look down.\"","Dan: \"Okay, that's... kind of pretty.\"","Dan: \"I looked down. I'm okay.\""][n],3)}},
    waves:[{at:1,list:[["shade",40,60],["shade",280,60]],say:"Shades on the ridge."},
      {at:10,list:[["wisp",50,40],["wisp",270,40],["shade",160,20]]},
      {at:22,list:[["shade",30,200],["shade",300,200],["wisp",160,30]]},
      {at:34,list:[["brute",160,30],["shade",50,50],["shade",270,50]]},
      {at:48,list:[["wisp",50,40],["wisp",270,40],["shade",30,200],["shade",300,200]]},
      {at:62,list:[["brute",60,40],["brute",260,40],["wisp",160,20]],say:"Dan: \"Why are there so many of you?!\""}]});
  F5.act=2;save5();
  cut({map:"hill",party:["dan"],pos:[[160,200]],place:"Shrine Hill",song:SONG.scout,back:function(){dDoor(160,114,1.0,false,Math.min(1,G.t0));G.t0=Math.min(1,(G.t0||0)+.01)}});G.t0=0;
  await beat(1200);
  await seq([["Dan","Judy? Judy, can you— no. Of course not. She can't hear me."],["Dan","There's a door. Over the shrine, hanging in nothing. A frame, a handle, a thin line of light underneath."],["Dan","It's knocking. Three times, and then it waits. I can't tell which side the knock is coming from."],["Dan","I looked down. I want that written somewhere. I looked down, and I didn't throw up."],["Lio","Noted."]])}
/* ---- act 3: rocket's engine ---- */
async function act3(){
  ARMOR=false;
  cut({map:"yard",party:["rocket"],pos:[[160,270]],place:"The Mill Yard",song:SONG.workshop,dark:.2,npcs:[NP("garo",250,150,3,0)]});
  await seq([["Mr. Rocket","Garo. I need your flour wheel."],["Miller Garo","No."],["Mr. Rocket","It's for the valley."],["Mr. Rocket","It turns every morning without being asked, even on the mornings it turns the wrong way. It is the most patient machine in the valley. I need that."],["Miller Garo","...Which part of the wheel?"],["Mr. Rocket","The turning."],["Miller Garo","I have never lent that wheel. Not to my brother. Not to my own grandfather, God rest him."],["Mr. Rocket","Then no one has asked you properly. Garo. Please."],["Miller Garo","(a long pause) Hm. Take it. If it catches fire, I keep the sign."],["Mr. Rocket","I've built forty-one things in my life that fell down. I never told anyone I was counting. Then the armour, which didn't. This is the forty-third, and it's going to stay up."],["Mr. Rocket","A lantern engine. It gathers every small flame in the valley, every candle, every hearth, and throws them at the Door as one beam. It buys an hour, if the engine holds."],["Miller Garo","And if it doesn't?"],["Mr. Rocket","Then it's a very expensive candle. Don't let them touch it."]]);
  G.npcs=[];
  await seq([["How to play · Mr. Rocket","Attack (A): sets up a little turret that shoots nearby enemies (up to 3). Skill: Rocket (6s), a blast at the nearest enemy. Protect the engine until it charges."]]);
  await playCombat({map:"yard",theme:"night",party:["rocket"],pos:[[160,280]],engine:{x:160,y:180,hp:44},chargeT:88,song:SONG.fight3,lose:"The engine broke.",
    goal:function(){return "Keep the engine alive ("+Math.floor(G.chg)+"%)"},
    waves:[{at:2,list:[["shade",30,60],["shade",290,60]],say:"Garo: \"Left, left, LEFT.\""},
      {at:11,list:[["wisp",40,40],["wisp",280,40],["shade",30,240],["shade",290,240]]},
      {at:21,list:[["brute",160,30],["shade",40,50],["shade",280,50]],say:"Garo: \"That one is a lot of one.\""},
      {at:33,list:[["shade",30,60],["shade",290,60],["wisp",160,20],["wisp",40,300],["wisp",280,300]]},
      {at:42,list:[["brute",50,40],["brute",270,40]],say:"Rocket: \"Nearly there!\""},
      {at:54,list:[["shade",30,60],["shade",290,60],["shade",30,240],["shade",290,240],["wisp",160,20]]},
      {at:66,list:[["brute",160,30],["wisp",40,40],["wisp",280,40],["wisp",40,300],["wisp",280,300]],say:"Garo: \"It's still standing. Don't look at it.\""},
      {at:78,list:[["brute",50,40],["brute",270,40],["shade",160,20],["shade",30,200],["shade",300,200]],say:"Rocket: \"Almost! Almost!\""}]});
  F5.act=3;save5();
  cut({map:"yard",party:["rocket"],pos:[[160,280]],place:"The Mill Yard",song:SONG.workshop,npcs:[NP("garo",250,150,3,0)],
    front:function(){var k=Math.min(1,(G.t1||0));G.t1=(G.t1||0)+.012;cx.globalAlpha=.55*k;var g=cx.createLinearGradient(0,0,0,170);g.addColorStop(0,"rgba(255,244,190,1)");g.addColorStop(1,"rgba(255,200,100,.2)");cx.fillStyle=g;cx.fillRect(150,0,20,168);cx.globalAlpha=1}});
  G.engine={x:160,y:180,hp:34,mx:34};G.chg=100;G.t1=0;sfx5("open");await beat(1400);
  await seq([["Mr. Rocket","It's standing. Garo. It's standing."],["Miller Garo","Hm. Don't touch it."],["Mr. Rocket","I'm not touching it. I'm admiring it from a respectful distance."],["Elder Hesper","An hour. Perhaps a little more. That is all anyone has ever bought the Door. Come to the shrine, all of you. There is something to say, and it should be said once, to everyone."]]);
  G.engine=null}
/* ---- act 4: the rally ---- */
async function act4(){try{albumAdd("c5_a4")}catch(x){}
  ARMOR=false;
  var lamps=[NP("pim",70,150,1,1),NP("nell",252,150,3,1),NP("tobi",110,220,0,1),NP("bram",212,225,2,1),NP("lio",70,260,1,1),NP("ines",252,262,3,1),NP("garo",84,296,0,1),NP("oru",236,296,2,1),NP("wren",50,200,1,1),NP("ferris",270,200,3,1),NP("hesper",160,170,2,1)];
  cut({map:"hill",party:["doodi","danoya","judy","dan","rocket"],pos:[[160,304],[140,310],[180,310],[120,316],[200,316]],place:"The Shrine",song:SONG.rally,dark:.15,npcs:lamps,
    back:function(){dDoor(160,114,1.1,false,1)}});
  G.hs.forEach(function(h){h.d=0});
  var hs=lead();
  await seq([["","Everyone came. Nobody was asked."],["Elder Hesper","Sit if you can. Stand if you can't. I'll tell it once, plainly. For sixty years I had the shape and none of the pieces. This week the shrine's walls gave me the pieces, and the old books in my library told me where they fit, and the last one was the thing my grandmother said once and never again. It fell into place, and I sat down on the floor. Knees and all. The Door has an hour and I have a bad knee."],["Elder Hesper","Before the valley, there was the Door. Not a gate, not a wall. A door, because doors are made by people, and the first thing the dead do on arriving is knock."],["Elder Hesper","The Keepers kept it. Veyr was the last. He had a wife named Sael, who made lanterns. When the sickness came for her, she asked him for the one thing a Keeper can never give. Open the Door. Not to leave. To go through."],["Elder Hesper","An open Door goes both ways, and he knew what pours in when a door goes both ways. So he said no. He sat with her in the room with the green curtains until the end, and he said no, and he has been saying no for four hundred years."],["Doodi","What pours in?"],["Elder Hesper","Everything that has been waiting on the dark side to be warm. The guests, the lonely copies in jars, all of it, wearing the faces you miss. And the Keeper who opens it has to go through with her, so there is nobody left to close it behind them. Open once, open forever. He was never afraid for one woman. He was afraid for every kitchen in the valley."],["Doodi","That's the villain? A man who said no to his wife?"],["Elder Hesper","He isn't a villain, Doodi. He's a Keeper who can't stop keeping. It is the saddest thing I know."],["Danoya","He's been pulling the lights down because he can't say yes. If the whole valley comes apart, the Door opens, and he never has to be the one who opened it."],["Elder Hesper","(quietly) Yes. That is exactly it."]]);
  var d=HR("danoya");
  await seq([["","Danoya begins to hum. Three notes, falling. The lanterns in the villagers' hands lean toward her."],["Elder Hesper","Where did you learn that?"],["Danoya","I don't know. I've always known it. I hum it when I'm happy. I hum it when I'm not. I thought it was only mine."],["Elder Hesper","It was hers. It's what Sael sang through the Door. Four hundred years, someone has been knocking, and nobody has answered."],["Ralph","The north hill. Those three soft knocks. That was her."],["Danoya","Then I'll answer."]]);
  var tb=lamps[2];await walk(tb,150,300,700);
  await seq([["Tobi","Doodi. Here."],["Doodi","Is that a roll?"],["Tobi","Tom helped. It's mostly Tom. But I stirred. Gran said you can't taste the difference if the stirring is honest."],["Doodi","(taking it, carefully) I'll eat half now and keep half for after."],["Tobi","...That's a good rule."]]);
  await walk(tb,110,220,600);
  await seq([["Doodi","Judy, someone has to hold the post. If the square falls—"],["Judy","No."],["Doodi","Judy—"],["Judy","I crossed the world to stand next to her. I'm not staying outside the one door that matters."],["Mr. Rocket","I built a thing that stands. I'd like to see what it's standing against."],["Dan","I climbed a hill. I'm basically a mountaineer now. Don't look at me. I'm shaking."],["Judy","(to Danoya, low) Best friend rules. Whatever's down there, I walk in front of you."],["Danoya","You always have."],["Judy","And I'll be rude about it the entire way."],["Doodi","(low, to Danoya) If this goes wrong—"],["Danoya","Don't."],["Doodi","I was going to say, if this goes wrong, I'm still going to be late to dinner."],["Danoya","Doodi."],["Doodi","I'm saying I'd like us to have dinner."],["Danoya","(taking his hand) We'll have dinner."]]);
  await fadeOut();F5.act=4;save5()}
/* ---- act 5: the realm and the guest ---- */
var ALL=["doodi","danoya","judy","dan","rocket"];
async function act5(){
  ARMOR=true;
  cut({map:"realm1",theme:"spirit",party:ALL,pos:[[160,330],[142,338],[178,338],[124,346],[196,346]],place:"Below the Door",song:SONG.spirit,dark:.1});
  await fadeIn();
  await seq([["","The Door doesn't open onto a place. It opens onto a road. A long road, lined with lanterns nobody has lit."],["Dan","No. No, no. I did the hill. The hill was my one."],["Judy","Look at the back of Rocket's head. It's very steady."],["Mr. Rocket","Thank you, Judy. It's a good head."],["Doodi","(quietly) It's so quiet."],["Danoya","It isn't. Listen. It's knocking. All of it. A thousand small knocks. They've been waiting a very long time."]]);
  await playCombat({map:"realm1",theme:"spirit",party:ALL,pos:[[160,330],[142,338],[178,338],[124,346],[196,346]],song:SONG.road,lose:"The road went dark.",
    goal:function(){return ""},
    waves:[{at:1,list:[["shade",50,60],["shade",270,60],["wisp",160,40]],say:"The first of the lost."},
      {at:12,list:[["shade",40,200],["shade",290,200],["wisp",60,40],["wisp",260,40]]},
      {at:24,list:[["brute",160,40],["shade",40,60],["shade",280,60]]},
      {at:38,list:[["wisp",60,40],["wisp",260,40],["wisp",160,20],["shade",40,200],["shade",290,200]]},
      {at:52,list:[["brute",50,40],["brute",270,40],["shade",160,20]]}]});
  cut({map:"realm1",theme:"spirit",party:ALL,pos:[[160,330],[142,338],[178,338],[124,346],[196,346]],place:"Below the Door",song:SONG.spirit});
  await seq([["Danoya","They didn't want to hurt us. They just didn't know where to go."],["Judy","They were very persuasive about it."],["Doodi","Further down."]]);
  await playCombat({map:"realm2",theme:"spirit",party:ALL,pos:[[160,330],[142,338],[178,338],[124,346],[196,346]],song:SONG.road,lose:"The road went dark.",
    goal:function(){return ""},
    waves:[{at:1,list:[["brute",60,60],["brute",260,60]],say:"Two brutes."},{at:10,list:[["wisp",160,30],["wisp",40,100],["wisp",280,100],["shade",100,40],["shade",220,40]]},{at:22,list:[["brute",160,40],["wisp",60,50],["wisp",260,50]]},
      {at:36,list:[["shade",40,60],["shade",280,60],["shade",30,200],["shade",300,200],["wisp",160,20]]},
      {at:50,list:[["brute",60,40],["brute",160,30],["brute",260,40]]}]});
  F5.act=5;save5();
  cut({map:"realm2",theme:"spirit",party:ALL,pos:[[160,330],[142,338],[178,338],[124,346],[196,346]],place:"The Last Table",song:null});
  var g=spawn("guest",160,120);g.ghost=true;g.boss=0;G.npcs=[];
  await seq([["","At the end of the road a long table has been laid. One chair drawn out. Cups poured. No one sitting."],["The Gentle Guest","You came all this way. I set a place for you."],["Doodi","We aren't here for supper."],["The Gentle Guest","No one ever is. And still the table is always so full."],["The Gentle Guest","The Warden doesn't hate you. He's only very tired, and you are very loud."],["Danoya","We didn't come to be loud. We came to answer the knocking."],["The Gentle Guest","Then you're the first. Forgive me. I have to try to stop you. It is what I am for."]]);
  G.en=[];
  var gu=null;
  var o={map:"realm2",theme:"spirit",party:ALL,pos:[[160,330],[142,338],[178,338],[124,346],[196,346]],song:SONG.mini,lose:"The Guest set a place for you.",goal:function(){return ""},
    extra:function(){return gu&&gu.done},
    step:function(dt){if(gu&&G.bossHud)G.bossHud.hp=gu.hp},
    bossRestart:function(){mkGuest()}};
  function mkGuest(){gu=spawn("guest",160,110);gu.hp=gu.mx=280;gu.said=0;gu.onHit=function(e){if(!e.said&&e.hp<e.mx/2){e.said=1;say5("Guest: \"Please. I only wanted someone to stay for dinner.\"",3.2)}if(e.hp<=0&&!e.done){e.done=1;e.ghost=true;G.en.forEach(function(q){if(q!==e)q.dead=1});puff(e.x,e.y-20,"#fffbe8")}};G.bossHud={n:"THE GENTLE GUEST",hp:280,mx:280,col:"#fffbe8"}}
  var pm=playCombat(o);mkGuest();await pm;
  cut({map:"realm2",theme:"spirit",party:ALL,pos:[[160,300],[142,308],[178,308],[124,316],[196,316]],place:"The Last Table",song:SONG.spirit});
  await seq([["The Gentle Guest","(fading) There. The first time anyone has refused the chair politely."],["The Gentle Guest","He'll tell you to turn back. Don't. And when you reach him, don't hold him. He has been held shut too hard already."],["Danoya","Thank you."],["The Gentle Guest","Eat something afterwards. All of you. Whatever happens. Promise me."],["Doodi","I've got half a roll."],["The Gentle Guest","(smiling, going) That will do."]]);
  await fadeOut()}
/* ---- act 6: the Warden ---- */
async function wardenPhase(ph,hp){
  var W=null,T=0,a=2,b=4,c=9,d=6,sp=0,spA=0;
  function ring(n,off){for(var i=0;i<n;i++){var an=off+i*6.2832/n;G.pj.push({x:W.x,y:W.y-16,vx:Math.cos(an)*72,vy:Math.sin(an)*72,t:5,dmg:1,own:"e",c:"#ff9ae6"})}sfx5("shoot")}
  function columns(n){var l=lead();for(var i=0;i<n;i++){var px=i===0?l.x:20+Math.random()*280,py=i===0?l.y:120+Math.random()*230;zone({x:px,y:py,r:22,w:1.0})}}
  function arms(){var gx=70+Math.random()*180,yy=170+Math.random()*130;zone({x0:0,x1:gx-34,y0:yy-14,y1:yy+14,w:1.3});zone({x0:gx+34,x1:320,y0:yy-14,y1:yy+14,w:1.3})}
  function mk(){ZN=[];T=0;a=2;b=4;c=9;d=6;sp=0;W=spawn("guest",160,110);W.k="warden";W.ph=ph;W.hp=W.mx=hp;W.sp=ph===1?9:12;W.r=16;W.big=1;W.draw=drawWarden;W.cd=99;
    W.onHit=function(e){if(e.hp<=0&&!e.done){e.done=1;e.ghost=true;G.en.forEach(function(q){if(q!==e)q.dead=1});ZN=[];G.pj=[];puff(e.x,e.y-20,"#b99bff");G.shake=.5;sfx5("boom")}};
    G.bossHud={n:"THE WARDEN · "+(ph===1?"KEEPER":"HINGE"),hp:hp,mx:hp,col:ph===1?"#b78bff":"#ff7ad0"}}
  var o={map:"arena",theme:"spirit",party:ALL,pos:[[160,326],[140,330],[180,330],[120,334],[200,334]],song:ph===1?SONG.boss1:SONG.boss2,lose:ph===1?"The Keeper kept the Door shut.":"The Door took a hinge.",
    goal:function(){return ""},
    extra:function(){return W&&W.done},
    step:function(dt){stepZones(dt);if(!W||W.done)return;G.bossHud.hp=W.hp;T+=dt;a-=dt;b-=dt;c-=dt;
      if(a<=0){a=ph===1?3.2:2.4;ring(ph===1?12:16,T)}
      if(b<=0){b=ph===1?4.6:3.6;columns(ph===1?3:4)}
      if(c<=0){c=ph===1?14:10;for(var i=0;i<3;i++)spawn(i===1&&ph===2?"wisp":"shade",40+Math.random()*240,40)}
      if(ph===2){d-=dt;if(d<=0){d=7;arms()}sp-=dt;if(sp<=0){sp=.14;spA+=.55;G.pj.push({x:W.x,y:W.y-16,vx:Math.cos(spA)*70,vy:Math.sin(spA)*70,t:5,dmg:1,own:"e",c:"#ffd0f0"})}}},
    front:drawZones,bossRestart:mk};
  var pm=playCombat(o);G.drawFront=drawZones;mk();await pm}
async function act6(){
  ARMOR=true;
  cut({map:"arena",theme:"spirit",party:ALL,pos:[[160,330],[142,338],[178,338],[124,346],[196,346]],place:"The Floor of the Door",song:null,back:function(){dDoor(160,50,1.6,false,1)}});
  await fadeIn();
  var W={x:160,y:130,k:"warden",ph:1,fl:0,stun:0,draw:drawWarden};G.en.push(W);
  await seq([["The Warden","I told you to stay in your houses."],["Doodi","We tried. We're bad at it."],["The Warden","Each of you carries a light. Do you know what a light is, to a door? A hinge. Each one of you is a hinge I must unscrew."],["Danoya","Keeper Veyr."],["The Warden","Don't use that name. It was a man's name. I buried him a long time ago."],["Danoya","She's been knocking."],["The Warden","...I know."],["The Warden","Then you know why I can't let you pass. If you reach the Door, I'll have to say the word. Or not say it. Either way, I will have chosen."],["The Warden","If I say yes, I walk through with her. And then nothing is left to shut the Door behind us. Every lonely thing in the dark gets a road into your houses, wearing the faces you miss, and it never closes again. A Keeper is one hinge, child. A door with one hinge can only be held shut, or fall open. I have held it four hundred years because I could not bear to be the one who let it fall."],["Doodi","So the choice was one wife, or the whole valley."],["The Warden","One wife, and every other grief in the world, let in at once. Yes. That was the choice. That is why I could not give her the word."],["Judy","Behind me, all of you. Whatever he does, I'm in front of it."]]);
  G.en=[];
  await wardenPhase(1,1300);
  F5.act=6;save5();
  cut({map:"arena",theme:"spirit",party:ALL,pos:[[160,330],[142,338],[178,338],[124,346],[196,346]],place:"The Floor of the Door",back:function(){dDoor(160,50,1.6,false,1)}});
  var W2={x:160,y:130,k:"warden",ph:2,fl:0,stun:0,draw:drawWarden};G.en.push(W2);G.shake=.3;
  await seq([["The Warden","She asked me once. In the room with the green curtains. One word. Please."],["The Warden","I have lived four hundred years inside the shape of the word I gave her."],["Doodi","Then say a different one."],["The Warden","I can't say yes. I can't. Then let it break. Let it break, and it won't have been me."],["Danoya","That isn't mercy. That's just not wanting to have done it."],["The Warden","(roaring, and beneath the roar, a man weeping) THEN STOP ME."]]);
  G.en=[];
  await wardenPhase(2,1600);
  F5.act=7;save5();
  /* hold scene */
  cut({map:"arena",theme:"spirit",party:ALL,pos:[[160,330],[142,338],[178,338],[124,346],[196,346]],place:"The Floor of the Door",back:function(){dDoor(160,50,1.6,false,1);var k=G.t2||0;G.t2=k+.02;ZN=[];cx.strokeStyle="rgba(255,150,220,.6)";cx.lineWidth=3;for(var i=0;i<4;i++){cx.beginPath();cx.moveTo(160+(i-1.5)*18,50);cx.lineTo(60+i*66,300);cx.stroke()}cx.lineWidth=1}});
  G.shake=.2;
  await seq([["The Warden","(on his knees, half-lifted) The Door is going. I can feel it opening. I can't hold it. I can't let go of it."],["Danoya","Then I'll come to you."],["Doodi","Danoya, no, look at him, it'll—"],["Danoya","It's pushing everyone back. It won't push me, if I'm humming. I think."],["Doodi","You think."],["Danoya","I'm very nearly sure."],["Doodi","...Go. I'll be right behind you. I can't carry you. But I can be the thing you walk away from."],["Dan","The arms. They're coming for her. I've got the left! I'm not looking down. I'm looking up. Which is worse."],["Mr. Rocket","Forty-three. Forty-three things I've built. This is the one that holds."],["Judy","I'm not staying behind. I'm staying here. There's a difference, and you all taught it to me."]]);
  /* phase 3: danoya alone */
  var spd=0,orbT=0,hits=0,spokenAt=0,l=null;
  var lines=[[0.1,"Warden: \"Go back. I can't hold it open.\""],[0.26,"Warden: \"I told her no. I told her no, and she kept knocking.\""],[0.42,"Warden: \"Every night. Four hundred years of one knock.\""],[0.58,"Warden: \"You hum like her. Don't. It makes me want to say it.\""],[0.74,"Warden: \"If I open it, I go through. Nothing shuts it behind us.\""],[0.9,"Warden: \"...Keep humming. Please. Keep humming.\""]];
  var pool;
  var o3={map:"arena",theme:"spirit",party:["danoya"],pos:[[160,334]],song:SONG.boss3,lose:"The Door pushed her back.",
    goal:function(){return "Reach him"},
    extra:function(){return l&&l.y<=160},
    onA:function(){var p=lead();if(p.cd>0)return true;p.cd=.3;sfx5("pulse");G.fx.push({k:"ring",x:p.x,y:p.y-10,r:6,mx:72,t:.35,c:"#fff6c4"});G.pj=G.pj.filter(function(q){return q.own!=="e"||dist(q.x,q.y,p.x,p.y)>72});p.y-=15;return true},
    step:function(dt){l=lead();if(!l)return;if(!o3.sd){o3.sd=1;say5("Danoya hums with A.",3.4)}stepZones(dt);var hpn=G.hp;if(o3.pv!=null&&hpn<o3.pv){l.y=Math.min(334,l.y+24)}o3.pv=hpn;if(l.y<334)l.y+=30*dt;orbT-=dt;if(orbT<=0){orbT=.42;G.pj.push({x:20+Math.random()*280,y:20,vx:(Math.random()-.5)*20,vy:78,t:6,dmg:1,own:"e",c:"#ff9ae6"})}
      var pr=Math.max(0,Math.min(1,(334-l.y)/(334-160)));for(var i=0;i<lines.length;i++)if(pr>=lines[i][0]&&spokenAt<=i){spokenAt=i+1;say5(lines[i][1],5)}if(spokenAt>0&&spokenAt<lines.length&&G.msgT>0){var ym=334-174*lines[spokenAt][0]+1;if(l.y<ym)l.y=ym}},
    front:function(){var wy=120+Math.sin(time*1.5)*3;drawWarden({x:160,y:wy,fl:0,stun:0,ph:2});drawZones()},
    back:function(){dDoor(160,50,1.6,false,1)}};
  await playCombat(o3);
  F5.act=8;save5();
  await act6end()}
async function act6end(){
  cut({map:"arena",theme:"spirit",party:["danoya"],pos:[[160,172]],place:"The Floor of the Door",song:SONG.goodbye,back:function(){dDoor(160,50,1.6,false,1)},front:function(){drawWarden({x:160,y:122,fl:0,stun:0,ph:1})}});
  HR("danoya").d=0;
  await seq([["","The pushing stops. The orbs stop. It is suddenly very quiet."],["The Warden","...Child. You walk very slowly."],["Danoya","So I've been told. Keeper Veyr."],["The Warden","I asked you not to—"],["Danoya","You haven't only been the Warden. Hesper told us about the room with the green curtains. I think you never really left it. I think you've been Veyr every night since, sitting in it, listening to her knock."],["The Warden","(very quietly) Every night."],["Danoya","She isn't asking you to break the world. She has only ever asked for one word. You don't need the valley to tear. You only have to say it."],["The Warden","And if I say it, and it opens, and everything I was keeping out comes in?"],["Danoya","Then it comes in, and we hold it. All of us. That's what a valley is."],["Danoya","You don't have to be the only one holding it anymore."]]);
  await beat(700);
  await seq([["","Danoya hums. Three notes, falling. And from the other side of the Door, someone hums back."],["The Warden","...Sael."],["The Warden","(his voice breaking) Yes."]]);
  G.shake=.5;sfx5("open");
  var op=0;G.drawBack=function(){op=Math.min(1,op+.02);dDoor(160,50,1.6,op>.3,1)};
  cut({map:"arena",theme:"spirit",party:ALL,pos:[[160,200],[142,208],[178,208],[124,216],[196,216]],place:"The Floor of the Door",song:SONG.goodbye,back:function(){op=Math.min(1,op+.02);dDoor(160,50,1.6,true,1);glowC(160,40,100,"rgba(255,244,190,1)",.4*op)},front:function(){var w={x:160,y:122,fl:0,stun:0,ph:1};drawWarden(w);cx.globalAlpha=.9;var sx=160+30,sy=118;glowC(sx,sy-22,40,"rgba(255,244,190,1)",.7);cx.fillStyle="#fff6dc";cx.beginPath();cx.moveTo(sx-9,sy+2);cx.lineTo(sx-6,sy-34);cx.lineTo(sx+6,sy-34);cx.lineTo(sx+9,sy+2);cx.fill();cx.beginPath();cx.arc(sx,sy-40,7,0,7);cx.fill();cx.globalAlpha=1}});
  await beat(900);
  try{albumAdd("c5_end")}catch(x){}await seq([["Sael","Veyr. You took so long."],["Veyr","I was keeping it shut."],["Sael","I know, love. You kept it so well."],["Veyr","I never could sleep. Not once, in four hundred years."],["Sael","I know. That's why I made you a lantern. It was never meant to keep anything shut. It was meant to be a light you could sleep beside."],["Danoya","\"For V., so he can sleep.\" We found it carved in a spring."],["Veyr","(softly) She always signed with the one letter."],["Veyr","I'm sorry. I thought if I said yes, I'd be the man who ended the world."],["Sael","And I thought if you said yes, you'd be the man who let me go home. You were never the first man. You were only ever afraid of him."],["Veyr","(a small, wet laugh) Four hundred years of fear, and you folded it away in one sentence."],["Sael","I've had four hundred years to practise it."],["Sael","But look behind you, love. You were never the only hinge. Every lantern in that valley is one. You thought hinges were how a door gets opened. They are how it gets closed again."],["Veyr","...A door with enough hinges can swing both ways, and still shut."],["Sael","A valley can hold what one man can't. It only had to be asked, and it only had to be lit."],["Sael","Danoya. Sing it to the valley. It's yours now. Whenever a door needs opening, hum it, and I'll hear."],["Danoya","I will."],["Sael","One night a year, at the lantern festival, the Door will stand open. Bring lights. Bring the ones you miss. And knock first. It's polite."],["Doodi","One night. Every year?"],["Veyr","It was always possible. I only had to wait for people I could trust with what comes after. Opening a door like this changes things on both sides of it, and I did not want to hand that to just anyone."],["Danoya","Why me? Why did I always know your song?"],["Sael","Songs that wait learn to travel. Mine crossed an ocean and two time zones to find someone who hums when she is happy and hums when she is not, and who would hum it to a stranger. That was the whole qualification."],["Doodi","And Umbra? The thing in the dark, with the crystal."],["Veyr","(quietly) Mine. Every night I could not sleep, I pushed the quiet down the road, away from the Door. It pooled where the lanterns had gone out. It swallowed the sun because it only ever wanted what I wanted: for the knocking to stop."],["Sael","He was not a monster, love. He was your tiredness, with nowhere to go."],["Danoya","He asked us to hum. Before he went."],["Veyr","Then he has finally rested. Thank you for that."],["Veyr","Be careful, child. Other doors in the world have lost their Keepers, and some have been knocking far longer than she did. Not all of them knock politely."],["Tobi","(a small voice, carried down from above) Is that my gran?"],["Sael","Not tonight, little one. Soon. Eat something."]]);
  await seq([["","Veyr and Sael walk into the light. They don't look back; there is nothing behind them to be afraid of. The Door closes softly."],["","Above, across the valley, every lantern catches at once. All of them. This time, nothing is pulling at the light."]]);
  await fadeOut()}
/* ---- epilogue: dawn ---- */
async function valleyMorning(){
  ARMOR=false;
  cut({map:"sq",theme:"dawn",party:["doodi","danoya"],pos:[[148,330],[172,330]],place:"Town Square, morning",song:SONG.hang,dark:0,
    npcs:[NP("hesper",200,250,3,1),NP("ferris",70,215,1,1),NP("bram",262,175,3,1),NP("pim",110,168,2,1),NP("oru",240,222,3,1),NP("lio",52,150,2,1),NP("ines",276,150,2,1),NP("garo",140,290,0,1),NP("wren",200,200,2,1),NP("tobi",160,255,0,1),NP("judy",206,336,3,1),NP("dan",224,300,3,1)]});
  HR("doodi").d=0;HR("danoya").d=0;
  await fadeIn();
  await seq([["","Morning. Nobody went home to sleep. The whole valley is standing about the square with something hot in a cup, the way you do after a long night that ended well."],
   ["Captain Ferris","The lamp. Three fathoms down, the night of the Storm. I rowed out at first light. It's out, and there's an S on the base."],
   ["Elder Hesper","Sael. She held that light up for eleven boats and every soul on them, from the wrong side of a door, because the one man who could open it for her wouldn't. That's who paid, Ferris. Four hundred years of paying."],["Elder Hesper","And my brother followed her lamp down to the water that night. I used to think it was the light that took him. I think, now, it was the only kind thing in the dark. He wasn't alone."],
   ["Captain Ferris","...It was never pipes, was it."],
   ["Elder Hesper","It was always pipes. Very polite ones."],["Elder Hesper","(quietly, half to herself) I wrote the names back into the Keeper's book this morning. In pencil, in the margin where someone scratched them out. Veyr. Sael. A library is only a place that remembers on purpose."],
   ["Ralph","The stones are all cold this morning. Every one. I think the old road is empty. I'll still put out a candle."],
   ["Baker Tom","Three in the morning was quiet, and it wasn't holding its breath. It was only quiet. I slept till six. Don't tell the pigeons."],
   ["Oru","The sea said a different word this morning. Not 'quiet.' I answered."],
   ["Lio","The bees all turned to face the hill, then the lake, then me, and hummed three notes. They've got the second one wrong."],
   ["Ines","The lake moved. I said 'finally.' Out loud. To a fish."],
   ["Miller Garo","I didn't check the wheel this morning. I want that noted somewhere official."],
   ["Mr. Rocket","The engine is still burning. Forty-three, and it's the first thing I ever built that stayed up. I used to think I was bad at building. I think I was only waiting for something worth holding up."],
   ["Miller Garo","I lent the wheel. Once. I'd like that noted too. Never again."],
   ["Mr. Rocket","Noted. Framed, actually. It's going over the shop door."],
   ["Dan","I climbed a hill last night. I'm going to say it again tomorrow, and the day after."],
   ["Judy","He looked down, and he kept going. I have never been prouder of anyone, and I will deny this in public."],
   ["Dan","She said she'd be loudly cross if I fell. I didn't fall. I'd still like the loudness."],
   ["Judy","(grinning) Fine. Loudly, then: WELL DONE, DAN."],
   ["Judy","Danoya. Back at the Gate, I asked you to tell me if you heard anything down there. Even if it sounded silly. I never got the whole answer."],
   ["Danoya","Three falling notes. A voice that only wanted quiet. And a woman on the wrong side of a door, humming my lullaby back to me."],
   ["Judy","...Okay. That's not silly. That's the least silly thing anyone has said all night. Thank you for telling me."],
   ["Danoya","You asked. Most people don't."],
   ["Granny Wren","I opened Alder's jars. Mostly pencil shavings and one very bad pickle. I kept the pencil."],
   ["Tobi","Gran's cup was empty this morning. Nobody drank it. That's how you know."],
   ["Baker Tom","Eat something, Tobi."],
   ["Tobi","...I'm hungry."],
   ["Elder Hesper","(quietly, to the empty chair someone has set out) There. That's what she wanted to hear."]]);
  await fadeOut()}
async function epilogue(){
  ARMOR=false;
  await valleyMorning();
  var bench=function(){cx.fillStyle="#8a5a2a";cx.fillRect(100,246,60,6);cx.fillRect(104,252,5,10);cx.fillRect(151,252,5,10);var ex=178,ey=112;var gg=cx.createRadialGradient(ex+14,ey-6,2,ex+14,ey-6,70);gg.addColorStop(0,"rgba(255,226,130,.55)");gg.addColorStop(1,"rgba(255,226,130,0)");cx.fillStyle=gg;cx.fillRect(ex-60,ey-80,150,150);cx.fillStyle="#3a3d47";cx.fillRect(ex-2,ey+16,32,4);cx.fillStyle="#7d828f";cx.fillRect(ex,ey,28,18);cx.fillStyle="#9aa0ae";cx.fillRect(ex,ey,28,3);cx.fillStyle="#2a2c34";cx.fillRect(ex+5,ey+5,18,9);cx.fillStyle="#ffd34d";cx.fillRect(ex+6,ey+6,16,7);cx.fillStyle="#fff6c4";cx.fillRect(ex+8,ey+7,5,3);cx.fillStyle="#5a5e6a";cx.fillRect(ex+12,ey-10,4,10);cx.fillStyle="#fff6c4";cx.fillRect(ex+9,ey-18,10,9);cx.fillStyle="#ffd34d";cx.fillRect(ex+11,ey-16,6,5);cx.fillStyle="#e87a3a";cx.fillRect(ex+2,ey+20,24,2)};
  cut({map:"dawn",theme:"dawn",party:["doodi","danoya"],pos:[[118,252],[142,252]],place:"By the Lake",song:SONG.hang,back:bench});
  HR("doodi").d=1;HR("danoya").d=3;
  await fadeIn();
  await seq([["","Morning. The valley is awake somewhere in the distance. Here it is only the two of them and the lake."],["Doodi","I've been trying to think of something good to say for about an hour."],["Danoya","You don't have to say something good."],["Doodi","I want to. I think small promises weigh more than big ones. I think the big ones are just small ones that lasted."]]);
  var p1=await ask("Doodi","I want to promise you something.",["I'll still be there in the morning.","I'll learn the lullaby. Properly.","I'll carry the bags. Always."]);
  await say("Doodi",["I'll still be there in the morning. Even when the morning's late. Even when it's a different time zone.","I'll learn it. I'll get it wrong for a year. You'll hum the right one next to me, and you'll be patient, and you'll pretend you aren't.","I'll carry the bags. Always. It's a promise with no glamour. That's why you can trust it."][p1]);
  await say("Danoya","(smiling) That's the most you.");
  var p2=await ask("Danoya","Okay. My turn.",["I'll always answer when you knock.","I'll tell you when I'm scared.","I'll make you dance at the festival."]);
  await say("Danoya",["I'll always answer. Even if I'm asleep. Even if I'm busy. Especially if I'm busy.","I'll tell you when I'm scared. Before it gets large. I'll let you carry it with me, instead of after.","I'll make you dance at the festival. You'll hate it and you'll be wonderful."][p2]);
  await say("Doodi",["That one I'm going to hold you to.","Good. Please. I'd rather have half a fear than all of a silence.","I would dance. Badly. In front of everyone. For you."][p2]);
  var p3=await ask("","One more. Together.",["Every year we come back here at dawn.","We write each other every night. Even in the same room.","We keep the extra rolls."]);
  await say("Danoya",["Every year. Right here. Before the festival. Before everyone else wakes up.","Every night. Even if it's only a line. I've been told lines add up.","We keep the extra rolls. You can't eat it all at once, and you can't give it all away, so you save a little for the next hard day."][p3]);
  await say("Danoya","And one that's only mine. Whatever door we ever find, I won't go through it without you.");
  await say("Doodi","Then I'll always be the one holding it open.");
  await say("Doodi","Then it's a promise.");
  await seq([["","Danoya hums the three falling notes. Doodi tries to join and gets the second one wrong. She laughs, corrects him, and he gets it wrong again on purpose."],["Danoya","(softly) You're hopeless."],["Doodi","I know. I'm yours."],["","Behind them, in the new light, the lantern engine keeps burning. It was never really meant to hold a door shut. It was meant to be something built to stand."],["","Far to the south, past the cliffs, past the road the Keepers built, something answers Danoya's hum. Not in three notes. In four."],["Danoya","(very quietly) ...Did you hear that?"],["Doodi","Hear what?"],["Danoya","(after a long moment) Nothing. Probably nothing. It sounded like it came from very far."]]);
  await fadeOut();
  await festivalNight();
  await fadeOut();
  await beyondSea();
  F5.act=9;save5();
  await fadeOut()}
function lanternLoad(){try{var r=localStorage.getItem("dv_lantern");if(!r)return null;var d=JSON.parse(r);return d&&typeof d==="object"?d:null}catch(e){return null}}
async function lanternBeat(){
  var d=lanternLoad();if(!d)return;
  var esc=function(t){return String(t).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})};
  var l="Among the thousand lanterns on the green, one is Danoya's. She made it herself on Lantern Night: "+lanternWords(d)+".";
  if(d.t)l+=" Beneath it, in careful letters: “"+esc(d.t)+"”.";
  await seq([["",l]])}
function knockGame(){
  if((window.__cutprev||window.__noexit)&&!window.__forceMini){try{toast("🎮 Minigame auto-completed for this preview")}catch(e){}return wait(900)}
  return new Promise(function(res){
    showOv('<h3>🚪 Knock</h3><p class="mini">Three knocks, falling. Tap when the ring meets the door. There is no wrong answer. The Door is polite.</p><div style="position:relative;width:190px;height:190px;margin:8px auto"><div style="position:absolute;left:55px;top:55px;width:72px;height:72px;border:4px solid #ffd34d;border-radius:50%;box-shadow:0 0 18px #ffd34d88"></div><div id="kgr" style="position:absolute;left:1px;top:1px;width:182px;height:182px;border:4px solid #c2412e;border-radius:50%;opacity:0"></div></div><button class="big" id="kgb" type="button">Knock</button><p class="mini" id="kgm" style="min-height:1.5em;margin-top:8px"></p>');
    var ring=document.getElementById("kgr"),msg=document.getElementById("kgm"),btn=document.getElementById("kgb");
    var n=0,good=0,t0=0,dur=1250,raf=0,live=false,FREQ=[392,349,294];
    function tone(f){try{var A=window.__kac||(window.__kac=new (window.AudioContext||window.webkitAudioContext)());var o=A.createOscillator(),g=A.createGain();o.type="sine";o.frequency.value=f;g.gain.setValueAtTime(.0001,A.currentTime);g.gain.exponentialRampToValueAtTime(.25,A.currentTime+.02);g.gain.exponentialRampToValueAtTime(.0001,A.currentTime+.6);o.connect(g);g.connect(A.destination);o.start();o.stop(A.currentTime+.65)}catch(e){}}
    function frame(){if(!live)return;var t=performance.now()-t0,k=Math.min(1.5,t/dur),sc=1-.6*Math.min(1,k);ring.style.opacity=k>1.3?String(Math.max(0,(1.5-k)*5)):"1";ring.style.transform="scale("+sc.toFixed(3)+")";if(t>dur*1.45){knock(true);return}raf=requestAnimationFrame(frame)}
    function next(){if(n>=3){finish();return}t0=performance.now();live=true;ring.style.transform="scale(1)";raf=requestAnimationFrame(frame)}
    function knock(auto){if(!live)return;live=false;cancelAnimationFrame(raf);var t=performance.now()-t0,err=Math.abs(t-dur)/dur,ok=!auto&&err<.3;if(ok)good++;tone(FREQ[n]);n++;msg.textContent=ok?"♪":auto?"…":"(a little early, a little late. It answers anyway.)";ring.style.opacity="0";setTimeout(next,650)}
    function finish(){document.removeEventListener("keydown",key,true);msg.textContent=good===3?"Three knocks, exactly in time.":good>0?"Close enough. The Door is patient.":"Not in time at all. The Door doesn't mind. It is polite.";btn.disabled=true;setTimeout(function(){hideOv();res(good)},1900)}
    function key(e){if(e.key===" "||e.key==="Enter"){e.preventDefault();e.stopPropagation();knock(false)}}
    btn.onclick=function(){knock(false)};document.addEventListener("keydown",key,true);
    setTimeout(next,700);
  })}
function names15(){try{if(localStorage.getItem("dv_names")!=="1")return []}catch(e){return []}
  return [["","And fifteen that nobody made. They hang a little higher than the rest, each with a name on it in a hand that leans: Alder. Pell. Odile. Fen. Marguerite. Ottilie. Hob. Misu. Biscuit. Mira. The moth on Danoya's shoulder opens its wings once, and she reads every one aloud. It takes a while. Nobody minds."]]}
async function festivalNight(){try{albumAdd("c5_fest")}catch(x){}
  var fest=function(){var t=G.pn=(G.pn||0)+.016,op=Math.min(1,t/3);
    var sk=cx.createLinearGradient(0,0,0,384);sk.addColorStop(0,"#0b0820");sk.addColorStop(.55,"#2a1a4a");sk.addColorStop(1,"#5a2a3a");cx.fillStyle=sk;cx.fillRect(0,0,320,384);
    cx.fillStyle="#fff";for(var i=0;i<40;i++){cx.globalAlpha=.25+.5*Math.abs(Math.sin(t+i));cx.fillRect((i*47)%320,(i*29)%170,1,1)}cx.globalAlpha=1;
    cx.fillStyle="#0a0614";cx.beginPath();cx.moveTo(0,384);cx.lineTo(0,250);cx.quadraticCurveTo(110,170,200,150);cx.quadraticCurveTo(270,140,320,200);cx.lineTo(320,384);cx.closePath();cx.fill();
    var gl=cx.createRadialGradient(205,185,4,205,185,90*op+10);gl.addColorStop(0,"rgba(255,240,190,"+(.95*op)+")");gl.addColorStop(1,"rgba(255,200,120,0)");cx.fillStyle=gl;cx.fillRect(100,90,210,190);
    cx.fillStyle="rgba(255,244,200,"+op+")";cx.beginPath();cx.moveTo(190,206);cx.lineTo(190,170);cx.quadraticCurveTo(205,150,220,170);cx.lineTo(220,206);cx.closePath();cx.fill();
    for(var k=0;k<22;k++){var u=k/21,px=200-u*170+Math.sin(k)*6,py=210+u*150;cx.globalAlpha=.55+.45*Math.sin(t*2+k);cx.fillStyle="#ffd34d";cx.fillRect(px,py,3,3)}cx.globalAlpha=1;
    cx.fillStyle="#05030c";for(var v=0;v<9;v++){var vx=30+v*30,vy=330+(v%3)*12;cx.fillRect(vx,vy,6,12);cx.beginPath();cx.arc(vx+3,vy-3,3.5,0,6.3);cx.fill()}
    cx.fillStyle="#fff";cx.font="bold 11px sans-serif";cx.textAlign="center";cx.globalAlpha=Math.min(1,Math.max(0,(t-1)/2));cx.fillText("One year later",160,40);cx.globalAlpha=1;try{var _dl=lanternLoad();if(_dl)lanternDraw(cx,58,64,.7,_dl,true)}catch(e){}cx.textAlign="left"};
  G.pn=0;
  cut({map:"dawn",theme:"night",party:[],pos:[],place:"The Lantern Festival",song:SONG.hang,back:fest});
  await fadeIn();
  await seq([["","One year later. The Lantern Festival. Every lantern in the valley is lit, and every one of them leans toward the north hill, politely, the way you lean toward a friend."]]);await lanternBeat();await seq([["Elder Hesper","Knock first. That is the whole rule. We do not walk through a door that is not ours."],["","Danoya steps up the old road, past Ralph's stones and their candles, and reaches the Door."]]);await knockGame();await seq([["","The hill answers with three falling notes. Then the Door opens. Not a crack: wide. Warm light spills down the road, and every candle beside every stone catches."],["Veyr","(from somewhere behind the light) Thank you for knocking."],["Sael","(laughing) He has been practising that sentence for a year."],["","On the green, Mira is already ladling, a little see-through and complaining there isn't enough. Tobi sits with a full bowl. Down at the harbour a white fox sings the fog thin, and a boy of sixteen walks up the steps beside her. Hesper holds her lantern up and says nothing at all. He nods, as if he never left."],["","A year is long enough for a valley to change in small ways. Tom's bakery now opens at six, and he sleeps until five. Ralph lit all thirty-three candles this year, one for each stone, and then set out one more. Garo has stopped checking the wheel and started checking the sky. Wren has stopped charging for tea. She tells anyone who sits down about Alder and the wrong row of sunflowers, and this year she planted one row crooked on purpose. Ines caught a fish and named it Finally. Lio's bees hum all three notes now, and mostly in order. Mr. Rocket has stopped counting. Robin's porch still creaks at six. She used to wonder whether she was haunted or only tired. Now she puts a bowl out and calls it company."],["","Every lantern on the green was made by the valley's own hands this year: lopsided, honest and lit. Hesper has asked everyone not to tell her she was right."]].concat(names15()).concat([["Dan","Judy. Judy, look. Look up. I am looking UP."],["Judy","I see it. I'm going to cry and then deny it."],["Doodi","(quietly) I got the second note right."],["Danoya","You did not."],["Tobi","He practised that note by the fence for a whole year. I wasn't observing. Okay, I was."],["Doodi","...I'd hoped nobody was."],["Danoya","(smiling) Second note. Flat."],["Doodi","Next year, Naples."],["Danoya","Next year, Naples. You're carrying the bags."],["","The Door stays open until the lanterns burn low. Then, with a little courtesy on both sides, it closes, and nobody is afraid."]]));
  await wait(1200)}
async function beyondSea(){
  var sea=function(){var z0=G.pn=(G.pn||0)+.016,k=Math.min(1,z0/9),e=1-Math.pow(1-k,3),z=1+2.6*(1-e),fx=236,fy=186;
    cx.save();cx.translate(fx,fy);cx.scale(z,z);cx.translate(-fx,-fy);
    var sk=cx.createLinearGradient(0,-200,0,200);sk.addColorStop(0,"#1a1238");sk.addColorStop(.6,"#6a3a6a");sk.addColorStop(1,"#ffb27a");cx.fillStyle=sk;cx.fillRect(-300,-300,920,500);
    cx.fillStyle="#fff";for(var i=0;i<26;i++){var sx=(i*61)%320,sy=(i*37)%150;cx.globalAlpha=.3+.4*((i*7)%3)/2;cx.fillRect(sx,sy-40,1,1)}cx.globalAlpha=1;
    var sw=cx.createLinearGradient(0,200,0,420);sw.addColorStop(0,"#3a5a9a");sw.addColorStop(1,"#0c1a3c");cx.fillStyle=sw;cx.fillRect(-300,200,920,400);
    cx.fillStyle="#ffffff22";for(var j=0;j<14;j++){cx.fillRect(((j*53)+z0*6)%360-20,206+j*11,28+j*2,1)}
    cx.fillStyle="#0f1a2e";cx.beginPath();cx.moveTo(170,201);cx.quadraticCurveTo(200,172,222,184);cx.quadraticCurveTo(236,162,254,180);cx.quadraticCurveTo(278,176,306,201);cx.closePath();cx.fill();
    cx.fillStyle="#0a1222";for(var t=0;t<7;t++){cx.fillRect(196+t*14,184+(t%2)*4,3,10)}
    var pu=.6+.4*Math.sin(z0*3),lg=cx.createRadialGradient(238,172,1,238,172,38);lg.addColorStop(0,"rgba(255,226,130,"+(.9*pu)+")");lg.addColorStop(1,"rgba(255,226,130,0)");cx.fillStyle=lg;cx.fillRect(190,124,96,96);
    cx.fillStyle="#fff6c4";cx.fillRect(236,168,4,5);cx.strokeStyle="#b78bff";cx.lineWidth=1.2;cx.strokeRect(232,160,12,16);
    cx.restore();
    var home=cx.createLinearGradient(0,0,0,1);cx.fillStyle="#05080f";cx.beginPath();cx.moveTo(-10,260);cx.lineTo(30,236);cx.lineTo(62,248);cx.lineTo(90,300);cx.lineTo(110,384);cx.lineTo(-10,384);cx.closePath();cx.fill();
    cx.fillStyle="#ffd34d";for(var h=0;h<9;h++){cx.globalAlpha=.5+.5*Math.sin(z0*2+h);cx.fillRect(10+h*8,300+((h*17)%60),2,2)}cx.globalAlpha=1;
    cx.fillStyle="#fff";cx.font="bold 11px sans-serif";cx.textAlign="center";cx.globalAlpha=Math.min(1,Math.max(0,(z0-6)/2));cx.fillText("somewhere far to the south...",200,60);cx.globalAlpha=1;cx.textAlign="left"};
  G.pn=0;
  cut({map:"dawn",theme:"night",party:[],pos:[],place:"Beyond the Cliffs",song:SONG.hang,back:sea});
  await fadeIn();
  await seq([["","The sound crosses open water. Beyond the valley's cliffs there is only sea, and in the sea, a long way off, an island nobody here has ever named."],["","Every island once had a Keeper. On this one, a lantern that has been dark for a very long time lights itself, and a Door, older and much less patient than Sael's, begins to knock."]]);
  await wait(1200)}
/* ---- credits and end ---- */
function memories5(){
  var pr={};try{var raw=localStorage.getItem("danoya-valley-ch2-v1");if(raw){var o=JSON.parse(raw);pr=(o&&(o.prof||(o.S&&o.S.prof)))||{}}}catch(e){}
  function e(t){return String(t).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
  var msg=e(pr.msg||"I'm already home with you. 💛"),love=pr.love?e(pr.love):"";
  hideOv();
  showOv('<h3>💛 Memories</h3><p class="mini" style="text-align:left;line-height:1.5">A fire on the South Green, and a tune nobody taught you.<br>A farmer who said hello the hard way, and a girl who said it back.<br>A dark staircase, a crystal, and a shadow who only wanted quiet.<br>A table for one, a fox who sang, and a dog who guarded the porch.<br>A Door that waited four hundred years for someone to knock back.</p>'+(love?'<p>What you love most about him:<br><b>“'+love+'”</b></p>':'')+'<p>Your message, from Chapter 2:<br><b>“'+msg+'”</b></p><p class="mini">Every cutscene is waiting in the selector whenever you want to see it again.</p><button class="big" id="c5mr" type="button">Replay cutscenes</button><button class="big" id="c5mb" type="button" style="margin-top:8px">Back</button>');
  var r=$("c5mr");if(r)r.onclick=function(){try{localStorage.setItem("dv_back","5");sessionStorage.setItem("dv_back","5");window.name="dvback:5"}catch(x){}location.href=location.href.replace(/chapter5\.html.*$/,"index.html")+"#cuts-5"};
  var b=$("c5mb");if(b)b.onclick=function(){hideOv();finale(true)}}
async function finale(noMont){
  ARMOR=true;
  if(!noMont){try{localStorage.setItem("dv_done","1")}catch(e){}}
  if(!noMont&&window.G5ED&&!window.__nosong){await G5ED()}
  showOv('<h3>The End 🌅</h3><p>Chapter 5 · The Door</p><p>Thank you for playing, Danoya.</p><p class="mini">Five chapters. One valley. A thousand small lights.<br>The Door opens once a year, if you remember to knock.</p><button class="big" id="c5r" type="button">Play the ending again</button><button class="big" id="c5m" type="button" style="margin-top:8px">💛 Memories</button><button class="big" id="c5x" type="button" style="margin-top:8px">Back to the valley menu</button>');
  var r=$("c5r");if(r)r.onclick=async function(){hideOv();if(window.G5ED)await G5ED();finale()};
  var mm=$("c5m");if(mm)mm.onclick=function(){memories5()};
  var x=$("c5x");if(x)x.onclick=function(){try{stopSong(true,true)}catch(e){}location.href=location.href.replace(/chapter5\.html.*$/,"index.html")}}
/* ---- driver ---- */
async function run5(load){
  G.on=true;window.__dunOn=true;ensureBtn();
  var sv=null;try{sv=JSON.parse(localStorage.getItem("dv5")||"null")}catch(e){}
  var from=load&&sv?sv.act:0;F5.act=from;
  try{if(!S)S=fresh()}catch(e){S=fresh()}S.sfx=true;if(!S.day)S.day=1;
  var mini=document.querySelector(".mini[style*='center']");if(mini)mini.textContent="Arrows/WASD move · Space = attack / use · F = skill · Q = swap hero";
  if(from<1){await act0();await act1()}
  if(F5.act<2)await act2();
  if(F5.act<3)await act3();
  if(F5.act<4)await act4();
  if(F5.act<5)await act5();
  if(F5.act<8)await act6();
  else if(F5.act<9){await act6end()}
  if(F5.act<9)await epilogue();
  await finale()}
window.__d5start=run5;
window.__d5=function(){return {G:G,F5:F5,act0:act0,act1:act1,act2:act2,act3:act3,act4:act4,act5:act5,act6:act6,epilogue:epilogue,finale:finale,wardenPhase:wardenPhase,cut:cut,run:run5}};
function title5(){
  var sv=null;try{sv=JSON.parse(localStorage.getItem("dv5")||"null")}catch(e){}
  var has=sv&&sv.act>0;
  showOv('<div id="title"><h3 class="tt">Danoya<br>Valley</h3><p class="hand" style="font-size:1.6rem">Chapter 5 · The Door</p><p class="mini">One last night in the valley.</p>'+(has?'<button class="big" id="tc" type="button">Continue (part '+(sv.act+1)+')</button><br><br><button class="mbtn" id="tn" type="button">New game</button>':'<button class="big" id="tn" type="button">Begin</button>')+'<p class="mini" style="margin-top:10px">Arrows/WASD move · Space = attack / use · F = skill · Q = swap hero</p></div>');
  var tc=$("tc");if(tc)tc.onclick=function(){ac();hideOv();run5(true)};
  $("tn").onclick=function(){ac();hideOv();try{localStorage.removeItem("dv5")}catch(e){}run5(false)}}
var _pc5=playCombat;playCombat=function(o){if(window.__skipFight){G.mode="cut";G.res=null;if(o&&(o.song===SONG.boss1||o.song===SONG.boss2||o.song===SONG.boss3)){m5(o.song);return wait(3000).then(function(){return true})}return Promise.resolve(true)}return _pc5(o)};
function takeCut(){var id=null;try{id=localStorage.getItem("dv_cut");localStorage.removeItem("dv_cut")}catch(e){}if(!id){var h=(location.hash||"").replace("#","");if(h.indexOf("cut-")===0)id=h.slice(4)}return id}
function cutBack(){if(document.getElementById("cutback"))return;var a=document.createElement("button");a.id="cutback";a.type="button";a.textContent="\u25c0 All cutscenes";a.style.cssText="position:fixed;left:50%;transform:translateX(-50%);bottom:calc(8px + env(safe-area-inset-bottom,0px));z-index:99999;background:#fff;color:#7a2a40;font:800 13px system-ui,sans-serif;padding:6px 14px;border-radius:99px;border:0;box-shadow:0 2px 8px #0004";a.onclick=function(){cutExit(false)};document.body.appendChild(a)}
window.__cut5=async function(id){
  window.__cutprev=1;window.__skipFight=1;G.on=true;window.__dunOn=true;ensureBtn();
  try{if(!S)S=fresh()}catch(e){S=fresh()}S.sfx=true;if(!S.day)S.day=1;F5.act=0;
  if(id==="open"){await card("Chapter 5","The Door",2600);if(window.G5OP)await G5OP();return}
  if(id==="a0"){window.__noOp=1;await act0();window.__noOp=0;return}
  if(id==="a1"){await act1();return}
  if(id==="a2"){await act2();return}
  if(id==="a3"){await act3();return}
  if(id==="a4"){await act4();return}
  if(id==="a5"){await act5();return}
  if(id==="warden"){ARMOR=true;await act6();return}
  if(id==="end"){await act6end();return}
  if(id==="epi"){await epilogue();return}
  if(id==="sea"){await beyondSea();await fadeOut();return}
  if(id==="fest"){await festivalNight();await fadeOut();return}
  if(id==="fin"){cut({map:"sq",theme:"dawn",party:["doodi","danoya"],pos:[[150,236],[170,236]],place:"Town Square, morning",song:SONG.ed});await finale(true);await wait(6000);return}
  if(id==="ed"){cut({map:"sq",party:["doodi","danoya"],pos:[[150,236],[170,236]],place:"Town Square"});await G5ED();return}};
function cutGate(f){showOv('<div id="title"><h3 class="tt">Danoya<br>Valley</h3><p class="hand" style="font-size:1.4rem">Cutscene</p><br><button class="big" id="cg" type="button">Play \u25b6</button></div>');document.getElementById("cg").onclick=function(){ac();hideOv();f()}}
title=function(){
  var cid=takeCut();if(cid&&window.__cut5){cutBack();cutGate(function(){window.__cut5(cid)});return}
  if(window.__nosong||window.__tgate){m5(SONG.title);return title5()}
  window.__tgate=1;
  showOv('<div id="title"><h3 class="tt">Danoya<br>Valley</h3><p class="hand" style="font-size:1.6rem">Chapter 5 · The Door</p><br><button class="big" id="tg" type="button">Start ▶</button></div>');
  $("tg").onclick=function(){ac();hideOv();m5(SONG.title);title5()}};
window.__dlgActors=function(){try{var sc=($("stage").clientHeight||400)/384,o=[];if(!G||!G.on)return o;(G.hs||[]).forEach(function(h){o.push(h.y*sc,(h.y-30)*sc)});(G.npcs||[]).forEach(function(n){o.push(n.y*sc,(n.y-30)*sc)});return o}catch(e){return []}};

(function(){var f=window.__cut5;window.__cut5=async function(id){window.__cutId=id;try{await f(id)}catch(e){try{console.error(e)}catch(x){}}await cutExit(true)}})();
