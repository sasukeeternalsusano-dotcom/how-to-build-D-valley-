/* ===== Chapter 3: Below the Valley (Zelda-style dungeon, two heroes) ===== */
function takeCut(){var id=null;try{id=localStorage.getItem("dv_cut");localStorage.removeItem("dv_cut")}catch(e){}if(!id){var h=(location.hash||"").replace("#","");if(h.indexOf("cut-")===0)id=h.slice(4)}return id}
function cutBack(){if(document.getElementById("cutback"))return;var a=document.createElement("button");a.id="cutback";a.type="button";a.textContent="\u25c0 All cutscenes";a.style.cssText="position:fixed;left:50%;transform:translateX(-50%);bottom:calc(8px + env(safe-area-inset-bottom,0px));z-index:99999;background:#fff;color:#7a2a40;font:800 13px system-ui,sans-serif;padding:6px 14px;border-radius:99px;border:0;box-shadow:0 2px 8px #0004";a.onclick=function(){cutExit(false)};document.body.appendChild(a)}
function cutGate(f){showOv('<div id="title"><h3 class="tt">Danoya<br>Valley</h3><p class="hand" style="font-size:1.4rem">Cutscene</p><br><button class="big" id="cg" type="button">Play \u25b6</button></div>');document.getElementById("cg").onclick=function(){ac();hideOv();f()}}
function title(){
  var cid=takeCut();if(cid&&window.__cut3){window.__titleGo=1;cutBack();cutGate(function(){window.__cut3(cid)});return}
  if(window.__nosong||window.__tgate){return title2()}
  window.__tgate=1;
  showOv('<div id="title"><h3 class="tt">Danoya<br>Valley</h3><p class="hand" style="font-size:1.6rem">Chapter 3 · Below the Valley</p><br><button class="big" id="tg" type="button">Start ▶</button></div>');
  $("tg").onclick=function(){ac();hideOv();try{m3("mm3")}catch(e){}title2()}}
function title2(){
  var sv=null;try{sv=JSON.parse(localStorage.getItem("dv3")||"null")}catch(e){}
  try{if(sv&&sv.v!==2&&sv.ri>13){var MG={14:16,15:17,16:19,17:20,18:22,19:23,20:25,21:26,22:27};sv.ri=MG[sv.ri]||sv.ri;localStorage.setItem("dv3",JSON.stringify({ri:sv.ri,v:2}))}}catch(e){}
  try{if(sv&&sv.v!==3){if(sv.ri>=17)sv.ri++;sv.v=3;localStorage.setItem("dv3",JSON.stringify({ri:sv.ri,v:3}))}}catch(e){}
  showOv('<div id="title"><h3 class="tt">Danoya<br>Valley</h3><p class="hand" style="font-size:1.6rem">Chapter 3 · Below the Valley</p><p class="mini">Together, this time. Something is humming beneath the hill.</p>'+(sv&&sv.ri>0?'<button class="big" id="tc" type="button">Continue (room '+(sv.ri+1)+')</button><br><br><button class="mbtn" id="tn" type="button">New adventure</button>':'<button class="big" id="tn" type="button">Begin</button>')+'<p class="mini" style="margin-top:10px">Arrows/WASD walk · Space = attack / lantern pulse · Q = swap hero · F = partner stays/follows</p></div>');
  var tc=$("tc");if(tc)tc.onclick=function(){ac();hideOv();window.__d3start(sv.ri)};
  $("tn").onclick=function(){ac();hideOv();window.__d3start(0,true)}}
(function(){
var TS=32,W=10,H=12;
try{TRK.alicia="audio/alicia.mp3";TRK.mm3="audio/mm3.mp3";TRK.lost="audio/lost.mp3";TRK.metaphor="audio/metaphor.mp3";TRK.dungeon="audio/dungeon.mp3";TRK.xzero="audio/xzero.mp3";TRK.winners="audio/winners_fast.mp3";TRK.before="audio/before.mp3";TRK.omega="audio/omega.mp3";TRK.boom="audio/boom.mp3";TRK.kh="audio/kh.mp3";TRK.over="audio/over.mp3";TRK.last="audio/last.mp3";TRK.goodbye="audio/goodbye.mp3";TRK.gustave="audio/gustave.mp3"}catch(e){}
wantKey=function(){return null};
var C3K=null;
function m3(key,loop){if(window.__nosong)return;try{if(!key){C3K=null;stopSong(false,true);return}if(key===C3K&&songOn&&songEl&&!songEl.ended)return;C3K=key;playSong(key,loop!==false)}catch(e){}}
function sfxClip(k){if(window.__nosong)return;try{if(!TRK[k])return;var a=mkAudio(TRK[k],false);a.volume=Math.min(1,VOL.s);var p=a.play();if(p&&p.catch)p.catch(function(){})}catch(e){}}
function isBR(R){return !!(R&&R.d&&(R.d.name==="The Stone Sentinel"||R.d.name==="The Hollow Throne"))}
function bossKey(){return D.R&&D.R.boss&&D.R.boss.stage===2?"omega":"winners"}
var titleGo=false;
function titleMusic(){if(titleGo||D.on||window.__titleGo)return;titleGo=true;m3("mm3")}
["pointerdown","touchend","keydown","click"].forEach(function(ev){document.addEventListener(ev,titleMusic,{capture:true,passive:true})});

var RM=[
 {name:"The Southern Gate",th:"surf",lock:"torch",song:"phoebe",map:[
  "####^^####","#........#","#T......T#","#........#","#..f..f..#","#........#","#........#","#.f......#","#........#","#........#","#....f...#","####vv####"],
  intro:[["Danoya","The gate we opened. The runes are still glowing, Doodi. Do you hear the hum? It is louder than it was the night we opened it."],["Doodi","I hear it. Whatever Ferris says it is, I don't think it's pipes. Something down there is awake, I think. Maybe it knows we're coming."],["Danoya","Then we go in prepared. Our cabin, the festival, the cove, the sunflower fields. We did all of that together. We can handle one dark staircase."],["Danoya","The old braziers by the gate only wake for light. Let me try."],["","Q swaps who you control. F sends your partner to stay or follow."]],hints:["Stand close to a brazier as Danoya and press A."]},
 {name:"The Hollow Gate",th:"cave",lock:"none",map:[
  "####^^####","#........#","#.S....S.#","#........#","#........#","#........#","####VV####","#........#","#........#","#........#","#........#","####vv####"],
  intro:[["Doodi","Vines across the path. Good thing I brought a sword. And a girlfriend with excellent taste in adventures."],["Danoya","Slimes first, romance later."]],hints:["Doodi's sword cuts vines."]},
 {name:"Mushroom Hall",th:"cave",lock:"torch",map:[
  "####^^####","#T......T#","#........#","#..####..#","#........#","#.S....S.#","#........#","#..####..#","#........#","#T.......#","#........#","####vv####"],
  intro:[["Danoya","Three cold torches. I think the door will remember us if they're lit."],["Doodi","Remember us? It's a door."],["Danoya","Look at how they're spaced. Exactly the same distance, room after room. Someone measured this road in lanterns, Doodi. One light for every step."]],hints:["Danoya's pulse reaches about three tiles. Get close."]},
 {name:"The Pushing Room",th:"cave",lock:"plate",pb:true,map:[
  "####^^####","#........#","#..b..b..#","#.B......#","#........#","#....###.#","#....#P#.#","#....#.#.#","#........#","#........#","#........#","####vv####"],
  intro:[["Doodi","A block, a plate, and a very suspicious nook."],["Danoya","I have a feeling we're meant to be slow about this."]],hints:["Blocks slide when you walk into them. X resets the room.","Down first, then across, then up into the nook."]},
 {name:"Crystal Pocket",th:"cave",lock:"key",map:[
  "####^^####","#......#K#","#......r.#","#......#.#","#......###","#........#","#..C.....#","#........#","#.b....b.#","#........#","#........#","####vv####"],
  intro:[["Danoya","A key behind a barrier, and a glowing crystal. What happens if you hit it?"],["Doodi","I hit things. It is basically my whole skill set."]]},
 {name:"Two Plates",th:"cave",lock:"plate",map:[
  "####^^####","#........#","#P......P#","#........#","###....###","#........#","#..S..S..#","#........#","###....###","#........#","#........#","####vv####"],
  intro:[["Doodi","Two plates. Far apart. I can only be in one place at a time."],["Danoya","Then we'll have to be clever about it."]],hints:["F sends your partner to stay, or follow. Try it on one plate, then swap."]},
 {name:"The Dim Gallery",th:"cave",lock:"kill",dark:true,map:[
  "####^^####","#........#","#.##..##.#","#........#","#..h..h..#","#T......T#","#........#","#.##..##.#","#....h...#","#........#","#.H....H.#","####vv####"],
  intro:[["Danoya","It is so dark. And those shapes, they are made of nothing."],["Danoya","Shades. I don't think a sword can find them on its own."]],hints:["Danoya's pulse makes shades solid for a moment. Then Doodi strikes."]},
 {name:"The Lantern Run",th:"cave",lock:"torch",rush:7,map:[
  "####^^####","#T......T#","#........#","#..b.....#","#........#","#.######.#","#........#","#.....b..#","#........#","#T......T#","#........#","####vv####"],
  intro:[["Doodi","Torches that go out again? That is just rude."],["Danoya","These flames don't last long."],["Doodi","So it is a race. Go."]],hints:["Light the near pair from the middle of the room, then run around the wall for the far pair."]},
 {name:"Twin Blocks",th:"cave",lock:"plate",pb:true,map:[
  "####^^####","#........#","#.P....P.#","#........#","#........#","#..B..B..#","#........#","#........#","#.S....S.#","#........#","#........#","####vv####"],
  intro:[["Danoya","Two blocks, two plates. We have done this, just with twice the pushing."]],hints:["Left block left, then up. Right block right, then up."]},
 {name:"The Locked Library",th:"cave",lock:"key",map:[
  "####^^####","#.....#K.#","#.....r..#","#.....#..#","#.....####","#.VVV....#","#.VCV.S..#","#.VVV....#","#........#","#...b..b.#","#........#","####vv####"],
  intro:[["Danoya","The key is behind a purple barrier. And that crystal over there is wrapped in vines."],["Doodi","So the crystal does something. Obviously."],["Danoya","Our first date had a kite and no monsters."],["Doodi","I will make it up to you. Eventually. With fewer bats."]],hints:["Cut the vines, strike the crystal, walk through the barrier."]},
 {name:"The Resting Spring",th:"cave",lock:"none",map:[
  "####^^####","#........#","#...F....#","#........#","#........#","#..H..H..#","#........#","#........#","#........#","#........#","#........#","####vv####"],
  intro:[["Danoya","A spring. Drink, Doodi. You have been bleeding very adorably for three rooms."],["Doodi","That is the nicest way anyone has ever told me I am hurt."],["Danoya","Do you hear it? The hum is not angry anymore. It sounds tired. Like someone humming to keep the dark away."],["Doodi","Whoever lives at the bottom of the world probably has nobody to hum with."],["Danoya","Then we will go be the somebody. After we hit him."],["","Carved into the lip of the spring, small and worn: \"For V., so he can sleep. — S.\""],["Danoya","Someone made a light for someone who couldn't sleep. Down here. A very long time ago."],["Doodi","V. and S. Remember those."]]},
 {name:"The Shade Corridor",th:"cave",lock:"kill",dark:true,map:[
  "####^^####","#T......T#","#........#","#........#","#...hh...#","#........#","#.h....h.#","#...S.S..#","#........#","#T......T#","#H......H#","####vv####"],
  intro:[["Danoya","The dark again. And now there are four shades."],["Doodi","I'd say I'm not afraid. But I'd be lying, and you'd know."]],hints:["Torches help Danoya see. Stay near her light."]},
 {name:"Plates and Planks",th:"cave",lock:"plate",map:[
  "####^^####","#P.......#","#...B...Q#","#........#","###....###","#........#","#..S..S..#","#........#","###....###","#........#","#........#","####vv####"],
  intro:[["Danoya","A plate over there, a block over here, and a second plate far away."],["Doodi","So one of us is furniture. I volunteer."]],hints:["F leaves your partner standing on a plate. Then swap and push the block."]},
 {name:"The Stone Sentinel",th:"cave",lock:"kill",map:[
  "####^^####","#........#","#....W...#","#.##..##.#","#........#","#........#","#.##..##.#","#........#","#H......H#","#........#","#........#","####vv####"],
  intro:[["Danoya","That is not a shade. That is a wall that learned to hate us."],["Doodi","A mini boss. A real one. I have been waiting my whole life."],["Danoya","Stone doesn't care about steel. Be careful."]],hints:["Light up its cracks first, then strike. Watch for the slams, the rock bursts and the charge."]},
 {name:"The Sporefield",th:"cave",lock:"torch",map:["####^^####","#T......T#","#..m..m..#","#........#","#.##..##.#","#........#","#m......m#","#........#","#.##..##.#","#T......T#","#........#","####vv####"],
  intro:[["Danoya","Mushrooms with grudges. They are spitting at us, Doodi."],["Doodi","Rude. Can you quiet them down?"],["Danoya","My pulse makes them flinch. Light all four torches, and keep moving."]],hints:["Danoya's pulse stuns Gloom Caps for a moment.","Strike them while they flinch."]},
 {name:"The Frozen Way",th:"cave",lock:"plate",pb:1,map:["####^^####","#P......P#","#I......I#","#I......I#","#I..##..I#","#........#","#...BB...#","#........#","#.S....S.#","#........#","#........#","####vv####"],
  intro:[["Doodi","Ice. Underground."],["Danoya","A block on ice slides until something stops it."],["Doodi","So I push, and physics does the rest. My favourite kind of work."]],hints:["Push a block onto the ice and it slides to the far end.","Both plates need a block. Standing on them will not do."]},
 {name:"Barrier and Block",th:"cave",lock:"plate",pb:true,map:[
  "####^^####","#........#","#.VVV#...#","#.VCV#...#","#.VVV#...#","#..B.r..P#","#....#...#","#....#...#","#........#","#...S.S..#","#........#","####vv####"],
  intro:[["Danoya","The plate is on the far side of a crystal barrier, and our block is stuck on this side."],["Doodi","And the crystal is wrapped in vines again."]],hints:["Free the crystal, open the barrier, then push the block through."]},
 {name:"The Written Wall",th:"cave",lock:"none",map:[
  "####^^####","#T......T#","#........#","#........#","#........#","#...HH...#","#........#","#........#","#........#","#T......T#","#........#","####vv####"],
  intro:[["","The torches here have burned out and relit themselves a hundred times. Every inch of the long wall is scratched: tiny lanterns, row after row, each with a letter under it. S. S. S."],["Danoya","The spring said 'For V., so he can sleep'. The plaque at the shrine said the first lantern was lit for a man who couldn't. And Hesper said the Keeper had a wife."],["Doodi","So V is the man who couldn't sleep. And S would be..."],["Danoya","Her, I think. I think she drew one for every night he lay awake. Doodi, there are thousands."],["Doodi","And here, at the end, bigger: 'V. If you find this: I am not angry. Sleep.'"],["Danoya","Then I was right. She wrote it for him, in case he came looking."],["Doodi","That's a lot of years, judging by the dust. And somebody still keeps this wall clean."],["","Along the far side the dark has gathered in a thick, slow drift, like something swept all the quiet to this corner and left it there."],["Danoya","The hum goes round it. Like it doesn't want to touch it."],["Doodi","I'd guess whatever's at the bottom is where that came from. Eat something, Danoya. We're close, I think."]],hints:["A quiet room. Take the hearts and rest."]},
 {name:"The Torch Cellar",th:"cave",lock:"torch",rush:9,dark:true,map:[
  "####^^####","#T......T#","#........#","#.h....h.#","#........#","#........#","#........#","#........#","#........#","#T......T#","#........#","####vv####"],
  intro:[["Danoya","Every bracket has a letter scratched underneath. The same one each time. S."],["Doodi","The same S as the spring."],["Danoya","The torches burn out here too. And now the lights are off."],["Doodi","Two shades, four torches and a clock."]],hints:["Light the near pair and use the glow to see. The shades are slow."]},
 {name:"The Beetle Pit",th:"cave",lock:"kill",map:["####^^####","#........#","#.#....#.#","#........#","#...c....#","#........#","#.#....#.#","#...c.c..#","#........#","#H......H#","#........#","####vv####"],
  intro:[["Doodi","Those beetles are looking at me. I don't like it."],["Danoya","They charge in a straight line. Step aside, then hit them while they are dizzy."]],hints:["A beetle that smacks into a wall is stunned for a moment.","Danoya's pulse stuns them too."]},
 {name:"The Long Dark",th:"cave",lock:"key",dark:true,map:[
  "####^^####","#KV.....T#","#V.......#","#........#","#...hh...#","#........#","#.##..##.#","#........#","#.h....h.#","#T.......#","#........#","####vv####"],
  intro:[["Danoya","There is a key in the far corner, behind vines. And shades between us and it."],["Doodi","I think I am finally getting the hang of this. Famous last words."]]},
 {name:"The Three Plates",th:"cave",lock:"plate",pb:true,map:[
  "####^^####","#........#","#.P..P..P#","#........#","#....V...#","#........#","#.B.B...B#","#........#","#..S..S..#","#........#","#........#","####vv####"],
  intro:[["Doodi","Three blocks, three plates, one very annoying vine."]],hints:["The middle block sits a little left of its plate. Slide it over, then cut the vine so it can go up."]},
 {name:"The Split Hall",th:"cave",lock:"kill",map:["####^^####","#........#","#.M....M.#","#........#","#...##...#","#...##...#","#........#","#.b....b.#","#........#","#H......H#","#........#","####vv####"],
  intro:[["Danoya","Those slimes are enormous. Doodi, do not just—"],["Doodi","Too late. I already like hitting things."],["Danoya","—they split in two when you hit them!"]],hints:["Big slimes burst into two small ones. Finish those too."]},
 {name:"The Roost",th:"cave",lock:"kill",map:[
  "####^^####","#........#","#.b....b.#","#..#..#..#","#........#","#.b....b.#","#..#..#..#","#........#","#...bb...#","#H......H#","#........#","####vv####"],
  intro:[["Danoya","Something is chittering up in the dark. Lots of somethings."],["Doodi","Bats. Good. I have been looking for something to hit that is not a vine."]]},
 {name:"Ember Hall",th:"cave",lock:"torch",rush:4,map:[
  "####^^####","#T......T#","#........#","#...b....#","#........#","#T......T#","#........#","#....b...#","#........#","#T......T#","#........#","####vv####"],
  intro:[["Danoya","Six torches and they burn out faster than ever."],["Doodi","I will keep the bats off you. Go!"]],hints:["Top pair, middle pair, bottom pair."]},
 {name:"The Frozen Vault",th:"cave",lock:"plate",pb:1,map:["####^^####","#.......P#","#.......I#","#..m....I#","#.......I#","#.##.c..I#","#.......I#","#........#","#.BIIIII.#","#........#","#........#","####vv####"],
  intro:[["Danoya","One block, one plate, and the plate is very far away."],["Doodi","Then the ice is going to do most of the walking."],["Danoya","Mind the spores, and the beetle."]],hints:["A block pushed across the ice row slides all the way to the end.","Then push it up the ice lane on the right."]},
 {name:"The Gauntlet",th:"cave",lock:"kill",map:[
  "####^^####","#T......T#","#.S....S.#","#........#","#..b..b..#","#...##...#","#...##...#","#.h....h.#","#........#","#H..SS..H#","#........#","####vv####"],
  intro:[["Danoya","Everything the dungeon has left, all in one room. Slimes, bats, shades."],["Doodi","The last room before the quiet. Let us make it loud."]]},
 {name:"Quiet Chamber",th:"cave",lock:"none",map:[
  "####^^####","#........#","#.F....F.#","#........#","#........#","#..H..H..#","#........#","#........#","#........#","#........#","#........#","####vv####"],
  intro:[["","A calm hall. Two fountains glow softly, and the hum is now so loud it feels like a heartbeat."],["Danoya","Doodi. Whatever is behind that door, we are doing it together. Promise?"],["Doodi","Promise. And I'll drink from the fountain, because you'd nag."]]},
 {name:"The Hollow Throne",th:"boss",lock:"boss",song:"jojo6",map:[
  "##########","#T......T#","#........#","#........#","#........#","#........#","#..#..#..#","#........#","#........#","#T......T#","#........#","####vv####"],
  intro:[["Umbra","Light. Warm, small, and so loud. I swallowed the sun to make the quiet. Why do you keep humming?"],["Danoya","Because someone has to. He's made of shadow, Doodi."],["Doodi","Light him up, cut him down. I like this plan."],["Danoya","Doodi. The carving behind the Sentinel. Two people, one light. This is the thing at the very bottom."],["Doodi","Sunbreaker. I have been saving it."],["Danoya","Every hit we land together fills our bond. When it's full, press E or tap Ult. I lift the light, you carry it."],["Doodi","Then let us fill it. Let us go!"]]}
];
var D={on:false,ri:0,max:0,st:[],R:null,h:[],act:0,stay:false,hp:12,keys:0,inv:0,tf:0,pc:null,pcd:0,sw:null,swcd:0,ax:0,msg:"",msgT:0,bg:null,ent:[],ors:[],itm:[],fade:0,dead:false,boss:null,flash:0,done:false,dk:null,shake:0,parts:[],hz:[],cine:null,bond:0};
window.__dun=D;window.__d3=function(){return {RM:RM,damage:damage,toStage2:toStage2,bossDie:bossDie,pulse:pulse}};
function ps(c,n){var a=[];for(var i=0;i<n;i++)a.push(c);return a}
RM.forEach(function(r,i){var n=r.name;r.song=n==="The Southern Gate"||n==="The Resting Spring"?"lost":n==="The Stone Sentinel"?"xzero":n==="Quiet Chamber"?"before":n==="The Hollow Throne"?"winners":(i>=1&&i<=5)?"metaphor":"dungeon"});
function mkRoom(i,solved){
  var d=RM[i],g=[],R={i:i,g:g,d:d,open:!!solved,tg:!!solved,lit:{},bl:[],ent:[],itm:[],pl:[],first:!solved,hit:{},keyT:0,pressed:{}};
  for(var y=0;y<H;y++){g[y]=d.map[y].split("");for(var x=0;x<W;x++){
    var c=g[y][x],cx_=x*TS+16,cy_=y*TS+16;
    if(c==="S"){g[y][x]=".";if(!solved)R.ent.push({t:"s",x:cx_,y:cy_,hp:2,mx:2,tm:Math.random(),vx:0,vy:0,fl:0,st:0})}
    else if(c==="m"){g[y][x]=".";if(!solved)R.ent.push({t:"m",x:cx_,y:cy_,hp:3,mx:3,tm:1.2+Math.random()*1.6,vx:0,vy:0,fl:0,st:0})}
    else if(c==="c"){g[y][x]=".";if(!solved)R.ent.push({t:"c",x:cx_,y:cy_,hp:3,mx:3,tm:0,vx:0,vy:0,fl:0,st:0,tl:0,dg:0,dx:0,dy:1,cdn:1.6+Math.random()})}
    else if(c==="M"){g[y][x]=".";if(!solved)R.ent.push({t:"s",sp:1,x:cx_,y:cy_,hp:4,mx:4,tm:Math.random(),vx:0,vy:0,fl:0,st:0})}
    else if(c==="b"){g[y][x]=".";if(!solved)R.ent.push({t:"b",x:cx_,y:cy_,hp:1,mx:1,tm:Math.random(),vx:0,vy:0,fl:0,st:0})}
    else if(c==="W"){g[y][x]=".";if(!solved)R.ent.push({t:"h",big:1,x:cx_,y:cy_,hp:36,mx:36,tm:1,vx:0,vy:0,fl:0,st:0,lt:0,sl:3.2,ob:2.4,ds:6,ph2:0})}
    else if(c==="h"){g[y][x]=".";if(!solved)R.ent.push({t:"h",x:cx_,y:cy_,hp:3,mx:3,tm:Math.random(),vx:0,vy:0,fl:0,st:0,lt:0})}
    else if(c==="B"){g[y][x]=".";if(!solved)R.bl.push({x:x,y:y,ax:x*TS,ay:y*TS})}
    else if(c==="f"){g[y][x]=".";R.itm.push({k:"fl",x:cx_,y:cy_})}
    else if(c==="H"){if(solved)g[y][x]=".";}
    else if(c==="K"){if(solved)g[y][x]="."}
    else if(c==="V"){if(solved)g[y][x]="."}
    else if(c==="T"){R.lit[x+","+y]=solved?1:0}
    else if(c==="P"){R.pl.push({x:x,y:y})}else if(c==="Q"){R.pl.push({x:x,y:y,b:1})}}}
  if(d.lock==="boss"&&!solved){R.boss={t:"boss",x:160,y:104,hp:33,mx:33,exp:0,sh:2.5,su:6,ph:1,dir:1,tm:0,fl:0,dead:0,stage:1,al:1,rg:6,ds:8,sl:5,tpT:6,col:5,sp:0,spT:0,tpv:0}}
  return R}
function tsolid(R,tx,ty){if(tx<0||ty<0||tx>=W||ty>=H)return true;var c=R.g[ty][tx];
  if(c==="#"||c==="T"||c==="C"||c==="F"||c==="V")return true;
  if(c==="r")return !R.tg;
  if(c==="^")return !R.open;
  if(c==="v")return R.i===0;
  return false}
function blockAt(R,tx,ty){for(var i=0;i<R.bl.length;i++)if(R.bl[i].x===tx&&R.bl[i].y===ty)return R.bl[i];return null}
function boxHit(R,x,y,w,h,ign){var x0=Math.floor((x-w/2)/TS),x1=Math.floor((x+w/2-.01)/TS),y0=Math.floor((y-h/2)/TS),y1=Math.floor((y+h/2-.01)/TS);
  for(var ty=y0;ty<=y1;ty++)for(var tx=x0;tx<=x1;tx++){
    if(tsolid(R,tx,ty)){
      if(R.g[ty]&&R.g[ty][tx]==="^"&&ign==="hero"&&R.open)continue;
      return {t:"tile",x:tx,y:ty}}
    var b=blockAt(R,tx,ty);if(b&&ign!=="block")return {t:"block",b:b,x:tx,y:ty}}
  return null}
function toneSafe(f,t0,d,ty,v){try{tone(f,t0,d,ty,v)}catch(e){}}
function sfx(k){try{
  if(k==="hit")toneSafe(180,0,.1,"sawtooth",.1);
  else if(k==="swing")toneSafe(420,0,.08,"triangle",.07);
  else if(k==="pulse"){toneSafe(660,0,.18,"sine",.12);toneSafe(880,.06,.3,"sine",.1)}
  else if(k==="hurt"){toneSafe(140,0,.2,"square",.12);toneSafe(100,.08,.2,"square",.1)}
  else if(k==="clink")toneSafe(1200,0,.07,"square",.06);
  else if(k==="key"){toneSafe(660,0,.1,"triangle",.1);toneSafe(990,.1,.2,"triangle",.1)}
  else if(k==="open"){toneSafe(220,0,.2,"triangle",.1);toneSafe(330,.15,.2,"triangle",.1);toneSafe(494,.3,.3,"triangle",.1)}
  else if(k==="swap")toneSafe(520,0,.08,"triangle",.07);
  else sfxPlay(k)}catch(e){}}
function say_(msg){D.msg=msg;D.msgT=3.2}
/* ---------- room entry ---------- */
async function enterRoom(i,from){
  D.ri=i;if(i>D.max){D.max=i;try{(window.__cutprev||localStorage.setItem("dv3",JSON.stringify({ri:i,v:3})))}catch(e){}}
  if(!D.st[i])D.st[i]=mkRoom(i,i<D.max&&!D.st[i]&&i<D.max);
  var R=D.R=D.st[i];D.ors=[];D.hz=[];D.pc=null;D.sw=null;buildBg(R);
  var sx=from==="down"?4.5*TS:4.5*TS,sy=from==="down"?1.5*TS+8:10*TS+8;
  if(R.i===0&&from==="start"){sx=4.5*TS;sy=9.5*TS}
  var a=D.h[D.act],b=D.h[1-D.act];a.x=sx;a.y=sy;b.x=sx+(b===D.h[0]?-14:14);b.y=sy+(from==="down"?-8:8);
  if(D.stay){D.stay=false;updBtns()}
  if(R.first&&R.d.intro){R.first=false;talking=true;fadeFlash();try{if(R.d.song&&!window.__nosong)m3(isBR(R)?null:R.d.song)}catch(e){}
    for(var k=0;k<R.d.intro.length;k++){await say(R.d.intro[k][0],R.d.intro[k][1])}talking=false;if(isBR(R)){try{if(!window.__nosong)m3(R.d.song)}catch(e){}}}
  else if(R.d.song&&!window.__nosong){try{m3(R.d.song)}catch(e){}}}
function fadeFlash(){D.fade=.35}
function buildBg(R){
  var c=document.createElement("canvas");c.width=320;c.height=384;var g=c.getContext("2d");g.imageSmoothingEnabled=false;
  var th=R.d.th,fl=th==="surf"?["#6fae55","#68a74e"]:th==="boss"?["#2c2140","#33274a"]:["#3d3c4d","#383747"];
  var rng=1+R.i*7;function rn(){rng=(rng*9301+49297)%233280;return rng/233280}
  for(var y=0;y<H;y++)for(var x=0;x<W;x++){
    var ch=R.d.map[y][x];var wall=ch==="#"&&true;
    g.fillStyle=fl[(x+y)%2];g.fillRect(x*TS,y*TS,TS,TS);
    for(var k=0;k<4;k++){g.fillStyle=th==="surf"?"#5b9a46":"#00000018";g.fillRect(x*TS+Math.floor(rn()*28),y*TS+Math.floor(rn()*28),2+Math.floor(rn()*3),2)}
    if(wall){
      if(th==="surf"){g.fillStyle="#2c6b34";g.fillRect(x*TS,y*TS,TS,TS);g.fillStyle="#3a8a42";g.beginPath();g.arc(x*TS+16,y*TS+13,14,0,7);g.fill();g.fillStyle="#2f7438";g.beginPath();g.arc(x*TS+10,y*TS+18,9,0,7);g.fill();g.beginPath();g.arc(x*TS+22,y*TS+18,9,0,7);g.fill();g.fillStyle="#5a3a1e";g.fillRect(x*TS+14,y*TS+24,4,8)}
      else{var a=th==="boss"?["#150f24","#1e1633"]:["#1e1d2a","#292839"];g.fillStyle=a[0];g.fillRect(x*TS,y*TS,TS,TS);g.fillStyle=a[1];g.fillRect(x*TS+1,y*TS+1,TS-2,TS/2-2);g.fillRect(x*TS+((y%2)?0:16)+1,y*TS+TS/2+1,TS/2-2,TS/2-2);g.fillRect(x*TS+((y%2)?16:0)+1,y*TS+TS/2+1,TS/2-2,TS/2-2)}}
    else if(ch==="P"||ch==="Q"){g.fillStyle="#00000030";g.fillRect(x*TS+4,y*TS+4,TS-8,TS-8)}}
  R.bgc=c}
/* ---------- drawing ---------- */
function drawHeart(x,y,full,half){cx.font="bold 15px sans-serif";cx.textBaseline="top";cx.fillStyle="#3a2a30";cx.fillText("♥",x,y);if(full){cx.fillStyle="#ff4d6d";cx.fillText("♥",x,y)}else if(half){cx.save();cx.beginPath();cx.rect(x,y,7,18);cx.clip();cx.fillStyle="#ff4d6d";cx.fillText("♥",x,y);cx.restore()}}
function dist(a,b,c,d){return Math.hypot(a-c,b-d)}
function lanternGlow(R,x,y,r,a){var g=cx.createRadialGradient(x,y,2,x,y,r);g.addColorStop(0,"rgba(255,230,150,"+a+")");g.addColorStop(1,"rgba(255,230,150,0)");cx.fillStyle=g;cx.fillRect(x-r,y-r,r*2,r*2)}
function drawRoom(){
  var R=D.R,t=time;cx.save();
  if(D.shake>0)cx.translate((Math.random()-.5)*D.shake*6,(Math.random()-.5)*D.shake*6);
  cx.drawImage(R.bgc,0,0,320,384);
  if(R.d.name==="The Stone Sentinel"&&(R.open||R.carveT))drawMural(R);
  // doors
  for(var y=0;y<H;y++)for(var x=0;x<W;x++){var c=R.g[y][x],px=x*TS,py=y*TS;
    if(c==="^"){
      if(R.open){cx.fillStyle="#0a0818";cx.fillRect(px,py,TS,TS);lanternGlow(R,px+16,py+16,34,.35)}
      else{cx.fillStyle="#17142a";cx.fillRect(px,py,TS,TS);cx.fillStyle="#a8a8c0";for(var q=0;q<4;q++)cx.fillRect(px+3+q*8,py+2,3,28);cx.fillStyle=R.d.lock==="key"?"#ffd34d":"#ff6f6f";cx.fillRect(px+13,py+11,6,8)}}
    else if(c==="v"){cx.fillStyle=R.i===0?"#43603a":"#0a0818";cx.fillRect(px,py,TS,TS);if(R.i>0)lanternGlow(R,px+16,py+16,30,.2)}
    else if(c==="V"){cx.fillStyle="#2f7a3a";cx.fillRect(px+2,py+2,28,28);cx.fillStyle="#46a354";for(var q=0;q<5;q++)cx.fillRect(px+3+q*5,py+2,3,28);cx.fillStyle="#23602c";cx.fillRect(px+4,py+10,24,3);cx.fillRect(px+4,py+20,24,3)}
    else if(c==="r"){if(!R.tg){cx.fillStyle="#7a3fd0";cx.fillRect(px+2,py+2,28,28);cx.fillStyle="#b78bff";cx.fillRect(px+6,py+6,20,20);cx.fillStyle="#7a3fd0";cx.fillRect(px+10,py+10,12,12)}else{cx.fillStyle="#7a3fd040";cx.fillRect(px+10,py+10,12,12)}}
    else if(c==="C"){cx.fillStyle="#2a2a44";cx.fillRect(px+6,py+22,20,8);var gl=.5+.5*Math.sin(t*3);cx.fillStyle=R.tg?"#6fe0ff":"#b78bff";cx.beginPath();cx.moveTo(px+16,py+2);cx.lineTo(px+25,py+14);cx.lineTo(px+16,py+24);cx.lineTo(px+7,py+14);cx.closePath();cx.fill();cx.fillStyle="#ffffff"+(gl>.5?"90":"50");cx.fillRect(px+13,py+8,3,7)}
    else if(c==="T"){var lit=R.lit[x+","+y];cx.fillStyle="#555569";cx.fillRect(px+10,py+14,12,16);cx.fillStyle="#3a3a4e";cx.fillRect(px+8,py+10,16,6);
      if(lit){var fl=Math.sin(t*14+x*3+y)*2;cx.fillStyle="#ff9a1f";cx.fillRect(px+11,py+1-fl/2,10,11+fl/2);cx.fillStyle="#ffe27a";cx.fillRect(px+14,py+4,4,7);lanternGlow(R,px+16,py+10,52,.35);if(R.d.rush&&!R.open&&R.lt2&&R.lt2[x+","+y]>0){var fr=R.lt2[x+","+y]/R.d.rush;cx.fillStyle="#000b";cx.fillRect(px+3,py+29,26,3);cx.fillStyle=fr<.3?"#ff4d4d":"#ffd34d";cx.fillRect(px+4,py+30,24*fr,1.5)}}}
    else if(c==="F"){cx.fillStyle="#6a6a86";cx.fillRect(px+3,py+12,26,16);cx.fillStyle="#6fe0ff";cx.fillRect(px+6,py+14,20,8);cx.fillStyle="#cffaff";cx.fillRect(px+13+Math.sin(t*4)*3,py+16,4,3)}
    else if(c==="P"||c==="Q"){var pr=R.pressed[x+","+y];cx.fillStyle=pr?"#ffd34d":"#6c6c88";cx.fillRect(px+5,py+5,22,22);cx.fillStyle=pr?"#fff3b0":"#8a8aa6";cx.fillRect(px+8,py+8,16,16)}
    else if(c==="K"){var bb=Math.sin(t*4)*2;cx.fillStyle="#ffd34d";cx.fillRect(px+10,py+8+bb,8,8);cx.fillRect(px+16,py+11+bb,10,3);cx.fillRect(px+22,py+11+bb,2,7);cx.fillStyle="#fff3b0";cx.fillRect(px+12,py+10+bb,3,3)}
    else if(c==="H"){drawPick(px+16,py+16,t)}
    else if(c==="I"){cx.fillStyle="#9fd8f0aa";cx.fillRect(px,py,TS,TS);cx.fillStyle="#e8f8ff88";cx.fillRect(px+3,py+4,10,2);cx.fillRect(px+16,py+18,12,2);cx.fillRect(px+6,py+24,6,2);cx.fillStyle="#ffffff55";cx.fillRect(px+20,py+7,3,3);cx.strokeStyle="#cfeeff99";cx.strokeRect(px+.5,py+.5,TS-1,TS-1)}}
  // flowers on surface
  R.itm.forEach(function(it){if(it.k==="fl"){cx.fillStyle="#ffe27a";cx.fillRect(it.x-1,it.y-1,3,3);cx.fillStyle="#ff9ec8";cx.fillRect(it.x-4,it.y,3,3);cx.fillRect(it.x+2,it.y,3,3)}else if(it.k==="h")drawPick(it.x,it.y,t);else if(it.k==="sun"){var sb=Math.sin(t*3)*3;lanternGlow(R,it.x,it.y+sb,70,.55);cx.fillStyle="#ffd34d";cx.beginPath();cx.moveTo(it.x,it.y-16+sb);cx.lineTo(it.x+11,it.y+sb);cx.lineTo(it.x,it.y+16+sb);cx.lineTo(it.x-11,it.y+sb);cx.closePath();cx.fill();cx.fillStyle="#fff7c4";cx.fillRect(it.x-2,it.y-8+sb,4,10)}});
  // blocks
  R.bl.forEach(function(b){var tx=b.x*TS,ty=b.y*TS;b.ax+=(tx-b.ax)*.45;b.ay+=(ty-b.ay)*.45;cx.fillStyle="#8a6a4a";cx.fillRect(b.ax+2,b.ay+2,28,28);cx.fillStyle="#a98563";cx.fillRect(b.ax+4,b.ay+4,24,24);cx.fillStyle="#6c4f36";cx.fillRect(b.ax+4,b.ay+14,24,3);cx.fillRect(b.ax+14,b.ay+4,3,24)});
  // entities, heroes sorted by y
  var all=[];R.ent.forEach(function(e){all.push(e)});if(R.boss)all.push(R.boss);D.h.forEach(function(h){all.push(h)});(D.gv||[]).forEach(function(g){all.push(g)});
  all.sort(function(a,b){return a.y-b.y});
  all.forEach(function(e){if(e.t==="s")drawSlime(e);else if(e.t==="b")drawBat(e);else if(e.t==="m")drawCap(e);else if(e.t==="c")drawBeetle(e);else if(e.t==="h")(e.big?drawWarden(e):drawShade(e));else if(e.t==="boss")drawBoss(e);else if(e.t==="gv")drawGv(e);else drawHero(e)});
  // orbs
  D.ors.forEach(function(o){cx.fillStyle="#3a1a66";cx.beginPath();cx.arc(o.x,o.y,8,0,7);cx.fill();cx.fillStyle="#b78bff";cx.beginPath();cx.arc(o.x,o.y,5,0,7);cx.fill();cx.fillStyle="#fff";cx.fillRect(o.x-1,o.y-1,2,2)});
  // sword slash
  if(D.sw){var s=D.sw,a=D.h[s.who];var dx=[0,1,0,-1][s.d],dy=[-1,0,1,0][s.d];var pg=1-s.t/.22;cx.strokeStyle="#fff";cx.lineWidth=3;cx.beginPath();var ang0=[-1.57,0,1.57,3.14][s.d]-1+pg*2;cx.arc(a.x+dx*8,a.y-8+dy*8,22,ang0-.5,ang0+.5);cx.stroke();cx.lineWidth=1}
  // pulse
  if(D.pc){var p=D.pc;cx.strokeStyle="rgba(255,236,160,"+(1-p.r/p.max)+")";cx.lineWidth=4;cx.beginPath();cx.arc(p.x,p.y-8,p.r,0,7);cx.stroke();cx.lineWidth=1;lanternGlow(R,p.x,p.y-8,p.r,.25)}
  drawHz();
  D.parts.forEach(function(p){cx.fillStyle=p.c;cx.globalAlpha=Math.max(0,p.l*2);cx.fillRect(p.x,p.y,3,3);cx.globalAlpha=1});
  // darkness
  if(R.d.dark){
    if(!D.dk){D.dk=document.createElement("canvas");D.dk.width=320;D.dk.height=384}
    var g=D.dk.getContext("2d");g.globalCompositeOperation="source-over";g.clearRect(0,0,320,384);g.fillStyle="rgba(4,4,16,.9)";g.fillRect(0,0,320,384);g.globalCompositeOperation="destination-out";
    function hole(x,y,r,a){var gr=g.createRadialGradient(x,y,4,x,y,r);gr.addColorStop(0,"rgba(0,0,0,"+a+")");gr.addColorStop(1,"rgba(0,0,0,0)");g.fillStyle=gr;g.fillRect(x-r,y-r,r*2,r*2)}
    D.h.forEach(function(h,i){hole(h.x,h.y-8,i===1?110:70,1)});
    for(var k in R.lit)if(R.lit[k]){var q=k.split(",");hole(+q[0]*TS+16,+q[1]*TS+16,100,1)}
    if(D.pc)hole(D.pc.x,D.pc.y,D.pc.r+30,1);
    g.globalCompositeOperation="source-over";cx.drawImage(D.dk,0,0)}
  // HUD lives in the page header (see hudSync)
  drawCine();
  var wd=R.ent.filter(function(q){return q.big})[0];if(wd){cx.fillStyle="#000a";cx.fillRect(60,368,200,10);cx.fillStyle="#9fb0c8";cx.fillRect(62,370,196*Math.max(0,wd.hp)/wd.mx,6);cx.font="bold 10px sans-serif";cx.textBaseline="top";cx.fillStyle="#fff";cx.fillText("Stone Sentinel",62,356)}
  if(R.boss&&R.boss.hp>0){var bd=D.bond,rd=bd>=100;cx.fillStyle="#000a";cx.fillRect(302,296,10,74);cx.fillStyle=rd?(Math.floor(time*6)%2?"#fff6c4":"#ffd34d"):"#ffb347";cx.fillRect(303,369-72*bd/100,8,72*bd/100);cx.font="bold 8px sans-serif";cx.textAlign="center";cx.textBaseline="top";cx.fillStyle="#fff";cx.fillText(rd?"E!":"ULT",307,285);cx.textAlign="left"}
  if(R.boss&&R.boss.hp>0&&!D.cine){var bs=R.boss;cx.fillStyle="#000a";cx.fillRect(60,368,200,10);cx.fillStyle=bs.stage===2?"#ff4d6d":"#b78bff";cx.fillRect(62,370,196*bs.hp/bs.mx,6);cx.font="bold 10px sans-serif";cx.textBaseline="top";cx.fillStyle="#fff";cx.fillText(bs.stage===2?"Umbra, the Eclipse":"Umbra",62,356)}
  if(D.msgT>0){cx.save();var fs=12;cx.font="bold "+fs+"px sans-serif";var tw=cx.measureText(D.msg).width;while(tw>296&&fs>7){fs--;cx.font="bold "+fs+"px sans-serif";tw=cx.measureText(D.msg).width}var w=tw+16;cx.fillStyle="#000c";cx.fillRect(160-w/2,330,w,22);cx.fillStyle="#fff";cx.textAlign="center";cx.textBaseline="middle";cx.fillText(D.msg,160,341);cx.restore()}
  if(D.fade>0){cx.fillStyle="rgba(255,255,255,"+Math.min(1,D.fade*2.5)+")";cx.fillRect(0,0,320,384)}
  if(D.flash>0){cx.fillStyle="rgba(255,60,80,"+D.flash*.5+")";cx.fillRect(0,0,320,384)}
  cx.restore()}
function drawPick(x,y,t){var b=Math.sin(t*4)*2;cx.fillStyle="#ff4d6d";cx.font="bold 18px sans-serif";cx.textAlign="center";cx.textBaseline="middle";cx.fillText("♥",x,y+b);cx.textAlign="left";cx.textBaseline="top"}
function drawGv(g){var f=g.mv>0?(1+(Math.floor(time*8)%2)):0;villager(g.x-16,g.y-30,g.d,f,g.sp,false);if(g.bundle){cx.fillStyle="#c0392b";cx.fillRect(g.x-9,g.y-16,18,11);cx.fillStyle="#f2c230";cx.fillRect(g.x-9,g.y-12,18,2);cx.fillRect(g.x-1,g.y-16,2,11)}}
function gwalk(g,tx,ty,sp){return new Promise(function(r){var iv=setInterval(function(){var dx=tx-g.x,dy=ty-g.y,d=Math.hypot(dx,dy);if(d<2){clearInterval(iv);g.mv=0;r();return}var st=Math.min(d,sp*.016);g.x+=dx/d*st;g.y+=dy/d*st;g.mv=1;g.d=Math.abs(dx)>Math.abs(dy)?(dx>0?1:3):(dy>0?2:0)},16)})}
function drawHero(h){var who=h===D.h[0]?"doodi":"danoya";var mv=h.mv>0;var f=mv?(1+(Math.floor(time*8)%2)):0;
  if(h.inv>0&&Math.floor(time*20)%2)return;
  if(who==="danoya"&&h.cd<=0.0){lanternGlow(D.R,h.x,h.y-8,30,.18)}
  if(D.act===(who==="doodi"?0:1)){cx.fillStyle="#ffe27a";cx.beginPath();cx.moveTo(h.x,h.y-36);cx.lineTo(h.x-4,h.y-42);cx.lineTo(h.x+4,h.y-42);cx.fill()}
  var fy=h.fy||0;if(fy>1){cx.fillStyle="#0004";cx.beginPath();cx.ellipse(h.x,h.y+2,10,4,0,0,7);cx.fill()}person(h.x-16,h.y-28-fy,h.d,who,f,false);
  var ddx=[0,1,0,-1][h.d],ddy=[-1,0,1,0][h.d];
  if(who==="doodi"&&D.sw&&D.sw.who===0){ // real sword swing
    var sw=D.sw,pg2=Math.max(0,Math.min(1,1-sw.t/.22)),base=[-1.5708,0,1.5708,3.1416][sw.d],an=base-1.1+pg2*2.2,hx=h.x+ddx*5,hy=h.y-13+ddy*4,ex=hx+Math.cos(an)*26,ey=hy+Math.sin(an)*26;
    cx.lineCap="round";cx.strokeStyle="#5b3a22";cx.lineWidth=4;cx.beginPath();cx.moveTo(hx-Math.cos(an)*5,hy-Math.sin(an)*5);cx.lineTo(hx,hy);cx.stroke();
    cx.strokeStyle="#ffd34d";cx.lineWidth=3;cx.beginPath();cx.moveTo(hx-Math.sin(an)*5,hy+Math.cos(an)*5);cx.lineTo(hx+Math.sin(an)*5,hy-Math.cos(an)*5);cx.stroke();
    cx.strokeStyle="#dfe9f5";cx.lineWidth=4;cx.beginPath();cx.moveTo(hx,hy);cx.lineTo(ex,ey);cx.stroke();
    cx.strokeStyle="#ffffff";cx.lineWidth=1.5;cx.beginPath();cx.moveTo(hx,hy);cx.lineTo(ex,ey);cx.stroke();
    cx.strokeStyle="rgba(255,255,255,.45)";cx.lineWidth=3;cx.beginPath();cx.arc(hx,hy,24,an-.9,an);cx.stroke();cx.lineCap="butt";cx.lineWidth=1}
  if(who==="danoya"&&D.pc){ // lantern held out for the pulse
    var lx=h.x+ddx*14,ly=h.y-18+ddy*8+(h.d===0?-4:0),fl=Math.sin(time*30)*1.2;
    cx.strokeStyle="#7a4a2a";cx.lineWidth=2;cx.beginPath();cx.moveTo(h.x+ddx*4,h.y-12);cx.lineTo(lx,ly-4);cx.stroke();cx.lineWidth=1;
    lanternGlow(D.R,lx,ly,34+fl*3,.4);
    cx.fillStyle="#3a2a1a";cx.fillRect(lx-5,ly-6,10,2);cx.fillRect(lx-5,ly+6,10,2);cx.fillStyle="#ffd34d";cx.fillRect(lx-4,ly-4,8,10);cx.fillStyle="#fff6c4";cx.fillRect(lx-2,ly-2,4,6+fl/2);cx.strokeStyle="#3a2a1a";cx.beginPath();cx.moveTo(lx-3,ly-6);cx.lineTo(lx,ly-10);cx.lineTo(lx+3,ly-6);cx.stroke()}}
function drawSlime(e){var sq=e.hop>0?1+Math.sin(time*18)*.15:1,x=e.x,y=e.y;if(e.sp){cx.save();cx.translate(x,y+9);cx.scale(1.5,1.5);cx.translate(-x,-y-9)}if(e.fl>0){cx.fillStyle="#fff"}else cx.fillStyle=e.st>0?"#9ad7a0":e.sp?"#38b8b4":"#4cc86a";
  cx.fillRect(x-10,y-4+(1-sq)*8,20,12*sq);cx.fillRect(x-8,y-8+(1-sq)*8,16,5);if(e.fl<=0){cx.fillStyle="#2a8a44";cx.fillRect(x-10,y+6,20,2);cx.fillStyle="#fff";cx.fillRect(x-5,y-3,3,4);cx.fillRect(x+2,y-3,3,4);cx.fillStyle="#123";cx.fillRect(x-4,y-2,2,3);cx.fillRect(x+3,y-2,2,3)}
  cx.fillStyle="#0003";cx.fillRect(x-9,y+9,18,3);if(e.sp)cx.restore()}
function drawCap(e){var x=e.x,y=e.y,w=e.tm<.6&&e.st<=0,f=e.fl>0;cx.fillStyle="#0003";cx.fillRect(x-10,y+11,20,4);R(x-4,y-1,8,12,f?"#fff":"#d9c9a8");R(x-13,y-11,26,13,f?"#fff":e.st>0?"#8a7fa0":w?"#d27dff":"#8a4fc0");R(x-11,y-13,22,4,f?"#fff":e.st>0?"#9a90b0":w?"#e8a8ff":"#a064d6");if(!f){R(x-8,y-8,4,4,"#e8d0ff");R(x+3,y-9,5,4,"#e8d0ff");R(x-1,y-4,3,3,"#e8d0ff");if(w){R(x-5,y,3,3,"#ffe27a");R(x+2,y,3,3,"#ffe27a")}else{R(x-5,y+2,2,2,"#2a1a3a");R(x+3,y+2,2,2,"#2a1a3a")}}}
function drawBeetle(e){var x=e.x,y=e.y,f=e.fl>0,st=e.st>0,tel=e.tl>0,dg=e.dg>0;if(tel){cx.strokeStyle="rgba(255,80,100,.8)";cx.lineWidth=3;cx.setLineDash([6,5]);cx.beginPath();cx.moveTo(x,y);cx.lineTo(x+e.dx*150,y+e.dy*150);cx.stroke();cx.setLineDash([]);cx.lineWidth=1}
  var j=tel?Math.sin(time*60)*1.5:0;x+=j;cx.fillStyle="#0003";cx.fillRect(x-13,y+8,26,4);
  var b=f?"#fff":st?"#9b8f78":dg?"#c9722f":"#7a5a3a",d=f?"#fff":st?"#7a705c":"#4e3722";
  var lg=Math.floor(time*(dg?30:10))%2;R(x-14,y+2+lg,4,7,d);R(x+10,y+2+(1-lg),4,7,d);R(x-14,y-6+(1-lg),4,6,d);R(x+10,y-6+lg,4,6,d);
  R(x-12,y-7,24,17,b);R(x-9,y-9,18,4,f?"#fff":"#9a7a52");R(x-1,y-7,2,17,d);
  var hx=e.dx>.3?8:e.dx<-.3?-8:0,hy=e.dy>.3?7:e.dy<-.3?-8:0;R(x-5+hx,y-4+hy,10,8,f?"#fff":"#5a4028");R(x-3+hx,y-9+hy,2,6,"#e8d9b0");R(x+1+hx,y-9+hy,2,6,"#e8d9b0");
  if(!f){R(x-4+hx,y-2+hy,2,2,st?"#fff":"#ffe27a");R(x+2+hx,y-2+hy,2,2,st?"#fff":"#ffe27a")}
  if(tel){cx.fillStyle="#ff4d6d";cx.font="bold 14px sans-serif";cx.textAlign="center";cx.fillText("!",x,y-18);cx.textAlign="left"}
  if(st){cx.fillStyle="#ffe27a";for(var q=0;q<3;q++)R(x-8+q*8+Math.sin(time*6+q)*3,y-16,3,3,"#ffe27a")}}
function drawBat(e){var w=Math.sin(time*26+e.tm*9)*6,x=e.x,y=e.y-6;cx.fillStyle=e.fl>0?"#fff":"#5a3f8f";cx.fillRect(x-4,y-3,8,8);cx.beginPath();cx.moveTo(x-4,y);cx.lineTo(x-16,y-6+w);cx.lineTo(x-12,y+5);cx.fill();cx.beginPath();cx.moveTo(x+4,y);cx.lineTo(x+16,y-6+w);cx.lineTo(x+12,y+5);cx.fill();cx.fillStyle="#ff6f6f";cx.fillRect(x-3,y-1,2,2);cx.fillRect(x+1,y-1,2,2);cx.fillStyle="#0003";cx.fillRect(x-6,y+14,12,3)}
function stepWarden(e,dt,tg,dd){var R=D.R,f=e.hp<=e.mx/2?.7:1;
  if(f<1&&!e.ph2){e.ph2=1;D.shake=.6;sfx("open");say_("The Sentinel's armour cracks! It is getting angry!");for(var sq3=0;sq3<2;sq3++)R.ent.push({t:"s",x:e.x+(sq3?-56:56),y:e.y+44,hp:2,mx:2,tm:Math.random(),vx:0,vy:0,fl:0,st:0})}
  if(e.dsh){if(e.dsh.t>0)e.dsh.t-=dt;else{var ax=e.dsh.x-e.x,ay=e.dsh.y-e.y,ad=Math.hypot(ax,ay)||1;e.dsh.go+=dt;moveEnt(e,ax/ad,ay/ad,230,dt,22,24);if(ad<14||e.dsh.go>.6){e.dsh=null;e.lt=Math.max(e.lt,1.4)}}return}
  moveEnt(e,(tg.x-e.x)/dd,(tg.y-e.y)/dd,e.lt>0?9:24,dt,22,24);
  e.rb=(e.rb==null?5:e.rb)-dt;if(e.rb<=0){e.rb=e.ph2?4.2:6.5;var nr=e.ph2?7:4;for(var q3=0;q3<nr;q3++)addHz({k:"c",x:50+Math.random()*220,y:70+Math.random()*230,r:28,t:1.15});D.h.forEach(function(h){addHz({k:"c",x:h.x+(Math.random()-.5)*16,y:h.y,r:26,t:1.45})});say_("Rubble rains down!")}
  if(e.ph2){e.xs=(e.xs==null?6:e.xs)-dt;if(e.xs<=0){e.xs=7.5;var th3=nearestHero(e);addHz({k:"col",x:th3.x,w:16,t:1.3});addHz({k:"row",y:th3.y,w:16,t:1.3});addHz({k:"col",x:Math.max(40,Math.min(280,th3.x+72)),w:12,t:1.8});addHz({k:"col",x:Math.max(40,Math.min(280,th3.x-72)),w:12,t:1.8});say_("Shockwave!")}}
  e.sl-=dt;if(e.sl<=0){e.sl=3.4*f;D.h.forEach(function(h){addHz({k:"c",x:h.x,y:h.y,r:34,t:1.05})})}
  e.ob-=dt;if(e.ob<=0){e.ob=2.8*f;var n=8+(e.ph2?4:0),off=Math.random()*6.28;for(var i=0;i<n;i++)fireOrb(e,off+i*6.2832/n,86)}
  e.ds-=dt;if(e.ds<=0){e.ds=6.2*f;var t2=nearestHero(e);e.dsh={t:.8,x:t2.x,y:t2.y,go:0}}}
function drawWarden(e){var x=e.x,y=e.y,lit=e.lt>0,fl=e.fl>0,bob=Math.sin(time*2)*1.5;
  if(e.dsh&&e.dsh.t>0){cx.strokeStyle="rgba(255,80,100,.75)";cx.lineWidth=3;cx.setLineDash([7,6]);cx.beginPath();cx.moveTo(x,y);cx.lineTo(e.dsh.x,e.dsh.y);cx.stroke();cx.setLineDash([]);cx.lineWidth=1}
  cx.fillStyle="#0004";cx.beginPath();cx.ellipse(x,y+24,24,6,0,0,7);cx.fill();
  var b=fl?"#fff":lit?"#cdbf8a":"#6b6f7e",d=fl?"#fff":lit?"#a8985e":"#4a4e5c",l=fl?"#fff":lit?"#efe2a8":"#8b90a2";
  cx.save();cx.translate(0,bob);R(x-22,y-4,44,28,d);R(x-18,y-22,36,26,b);R(x-30,y-16,12,18,d);R(x+18,y-16,12,18,d);R(x-32,y+2,12,14,b);R(x+20,y+2,12,14,b);R(x-14,y-30,28,12,l);R(x-18,y+22,14,6,d);R(x+4,y+22,14,6,d);
  R(x-12,y-24,24,2,l);R(x-8,y-10,16,2,d);
  var ec=lit?"#fff":e.ph2?"#ff4d6d":"#6be0ff";R(x-9,y-26,6,5,ec);R(x+3,y-26,6,5,ec);
  if(lit){cx.strokeStyle="#ffe27a";cx.lineWidth=2;cx.beginPath();cx.moveTo(x-10,y-6);cx.lineTo(x-4,y+4);cx.lineTo(x-9,y+12);cx.moveTo(x+8,y-12);cx.lineTo(x+3,y);cx.lineTo(x+10,y+9);cx.stroke();cx.lineWidth=1;cx.font="bold 9px sans-serif";cx.fillStyle="#fff";cx.textAlign="center";cx.fillText("STRIKE!",x,y-38);cx.textAlign="left"}
  else{R(x-3,y-2,6,6,"#2a2e3a")}cx.restore()}
function drawShade(e){var x=e.x,y=e.y,lit=e.lt>0;cx.globalAlpha=lit?1:.75;cx.fillStyle=e.fl>0?"#fff":lit?"#8a82c8":"#1b1530";
  cx.beginPath();cx.moveTo(x-12,y+10);cx.lineTo(x-11,y-8);cx.quadraticCurveTo(x,y-20+Math.sin(time*5)*2,x+11,y-8);cx.lineTo(x+12,y+10);cx.lineTo(x+6,y+5+Math.sin(time*6)*2);cx.lineTo(x,y+11);cx.lineTo(x-6,y+5);cx.closePath();cx.fill();
  cx.fillStyle=lit?"#fff":"#ffe27a";cx.fillRect(x-6,y-5,4,5);cx.fillRect(x+2,y-5,4,5);cx.globalAlpha=1}
function drawBoss(e){var x=e.x,y=e.y+Math.sin(time*2.2)*4,ex=e.exp>0,fl=e.fl>0,s2=e.stage===2,al=e.al===undefined?1:e.al,c=D.cine;
  if(c&&c.k==="p2")x+=Math.sin(time*60)*3;
  if(e.dead&&c){al*=Math.max(0,1-c.b/3.4);y-=c.b*9;x+=Math.sin(time*55)*Math.min(3,c.t*.6+c.b)}
  if(e.dsh&&e.dsh.t>0){cx.strokeStyle="rgba(255,80,100,.75)";cx.lineWidth=3;cx.setLineDash([7,6]);cx.beginPath();cx.moveTo(x,y);cx.lineTo(e.dsh.x,e.dsh.y);cx.stroke();cx.setLineDash([]);cx.beginPath();cx.arc(e.dsh.x,e.dsh.y,16,0,7);cx.stroke();cx.lineWidth=1}
  cx.save();cx.globalAlpha=Math.max(0,Math.min(1,al));
  if(s2){cx.translate(x,y);cx.scale(1.18,1.18);cx.translate(-x,-y);cx.lineWidth=3;for(var q=0;q<16;q++){var an=q*.3927+time*.4,r0=40,r1=50+Math.sin(time*3+q)*7;cx.strokeStyle="rgba(255,179,71,.65)";cx.beginPath();cx.moveTo(x+Math.cos(an)*r0,y-6+Math.sin(an)*r0);cx.lineTo(x+Math.cos(an)*r1,y-6+Math.sin(an)*r1);cx.stroke()}cx.lineWidth=1}
  var body=fl?"#fff":ex?"#8a82c8":s2?(e.ph===3?"#3a0820":"#240a30"):e.ph===3?"#2a0d3c":e.ph===2?"#201040":"#171030";
  cx.fillStyle="#0004";cx.beginPath();cx.ellipse(x,y+38,28,6,0,0,7);cx.fill();
  cx.fillStyle=body;cx.beginPath();cx.moveTo(x-30,y+34);cx.lineTo(x-26,y-10);cx.quadraticCurveTo(x,y-44,x+26,y-10);cx.lineTo(x+30,y+34);cx.lineTo(x+16,y+24+Math.sin(time*5)*3);cx.lineTo(x,y+36);cx.lineTo(x-16,y+24+Math.sin(time*5+1)*3);cx.closePath();cx.fill();
  cx.fillStyle=ex?"#ffe27a":s2?"#ff4d6d":"#b78bff";for(var i=-2;i<=2;i++){cx.beginPath();cx.moveTo(x+i*10-4,y-24);cx.lineTo(x+i*10,y-38+Math.abs(i)*4-(s2?5:0));cx.lineTo(x+i*10+4,y-24);cx.fill()}
  var er=ex?"#fff":(e.ph===3||s2)?"#ff4d6d":"#ffe27a";cx.fillStyle=er;cx.fillRect(x-14,y-8,9,8);cx.fillRect(x+5,y-8,9,8);cx.fillStyle="#000";cx.fillRect(x-11,y-6,3,5);cx.fillRect(x+8,y-6,3,5);
  if(ex){cx.strokeStyle="#ffe27a";cx.lineWidth=2;cx.beginPath();cx.arc(x,y,40+Math.sin(time*12)*3,0,7);cx.stroke();cx.lineWidth=1;cx.font="bold 10px sans-serif";cx.fillStyle="#fff";cx.textAlign="center";cx.fillText("STRIKE!",x,y-52);cx.textAlign="left"}
  cx.restore();cx.globalAlpha=1}
/* ---------- logic ---------- */
function mkHeroes(){D.h=[{x:0,y:0,d:0,mv:0,inv:0,cd:0},{x:0,y:0,d:0,mv:0,inv:0,cd:0}]}
function moveHero(h,dx,dy,sp,dt,isAct){
  var R=D.R,mvd=false;
  if(dx){var nx=h.x+dx*sp*dt,hit=boxHit(R,nx,h.y,14,12,"hero");if(!hit){h.x=nx;mvd=true}else{
      if(isAct&&hit.t==="block")pushBlock(hit.b,dx>0?1:3,dt);else if(hit.t==="tile"&&isAct)tileTouch(hit.x,hit.y)}}
  if(dy){var ny=h.y+dy*sp*dt,hit2=boxHit(R,h.x,ny,14,12,"hero");if(!hit2){h.y=ny;mvd=true}else{
      if(isAct&&hit2.t==="block")pushBlock(hit2.b,dy>0?2:0,dt);else if(hit2.t==="tile"&&isAct)tileTouch(hit2.x,hit2.y)}}
  if(dx||dy)h.d=Math.abs(dx)>Math.abs(dy)?(dx>0?1:3):(dy>0?2:0);
  return mvd}
function tileTouch(tx,ty){var R=D.R,c=R.g[ty][tx];
  if(c==="^"&&!R.open){
    if(R.d.lock==="key"){if(D.keys>0){D.keys--;R.open=true;sfx("open");say_("The key turns. The door opens!")}else say_("Locked. Find the key.")}
    else if(R.d.lock==="kill")say_("Sealed. Defeat every monster.");
    else if(R.d.lock==="torch")say_("Light all the torches (Danoya's pulse).");
    else if(R.d.lock==="plate")say_("Press every plate to open it.");
    else if(R.d.lock==="boss")say_("")}
  else if(c==="v"&&R.i===0)say_("Not yet. We are not leaving without answers.");
  else if(c==="T"&&!R.lit[tx+","+ty])say_("A cold torch. Danoya's light could wake it.");
  else if(c==="V")say_("Thick vines. Doodi's sword could cut them.");
  else if(c==="r"&&!R.tg)say_("A crystal barrier. Something nearby must control it.")}
var PUSH={k:null,t:0};
function pushBlock(b,d,dt){var key=b.x+","+b.y+","+d;if(PUSH.k!==key){PUSH.k=key;PUSH.t=0}PUSH.t+=dt;if(PUSH.t<.28)return;PUSH.t=0;
  var R=D.R,tx=b.x+[0,1,0,-1][d],ty=b.y+[-1,0,1,0][d];
  if(tsolid(R,tx,ty)||blockAt(R,tx,ty)||R.g[ty][tx]==="^"||R.g[ty][tx]==="v")return;
  for(var i=0;i<D.h.length;i++){var h=D.h[i];if(Math.floor(h.x/TS)===tx&&Math.floor(h.y/TS)===ty)return}
  b.x=tx;b.y=ty;sfx("tap");
  var dxs=[0,1,0,-1][d],dys=[-1,0,1,0][d],slid=0;
  while(R.g[b.y][b.x]==="I"){var nx2=b.x+dxs,ny2=b.y+dys;if(tsolid(R,nx2,ny2)||blockAt(R,nx2,ny2)||R.g[ny2][nx2]==="^"||R.g[ny2][nx2]==="v")break;var hb=false;for(var hi2=0;hi2<D.h.length;hi2++){var h2=D.h[hi2];if(Math.floor(h2.x/TS)===nx2&&Math.floor(h2.y/TS)===ny2)hb=true}if(hb)break;b.x=nx2;b.y=ny2;slid++}
  if(slid){sfx("clink")}}
function bodyBox(e){return e.big?{w:40,h:46}:e.t==="boss"?{w:50,h:60}:e.t==="m"?{w:18,h:20}:e.t==="c"?{w:26,h:18}:e.t==="s"?(e.sp?{w:30,h:24}:{w:20,h:16}):e.t==="b"?{w:18,h:16}:{w:20,h:26}}
function hurt(n,fx,fy){var any=false;
  for(var i=0;i<2;i++){if(i!==D.act)continue;var h=D.h[i];if(h.inv>0)continue;
    var d=dist(h.x,h.y,fx,fy);if(d<26){any=true;h.inv=1.1;var k=d||1;h.x+=(h.x-fx)/k*10;h.y+=(h.y-fy)/k*10;var b=boxHit(D.R,h.x,h.y,14,12,"hero");if(b){h.x-=(h.x-fx)/k*10;h.y-=(h.y-fy)/k*10}}}
  if(any){D.hp=Math.max(0,D.hp-n);D.flash=.35;D.shake=.25;sfx("hurt")}}
function bossHit(e,n,viaSword){var ph0=e.ph;e.hp-=n;e.fl=.15;sfx("hit");D.shake=.15;
  if(viaSword)D.bond=Math.min(100,D.bond+9);
  if(e.hp<=0){e.hp=0;if(e.stage===1)toStage2(e);else bossDie(e);return}
  var T=e.stage===1?[22,12]:[41,19],ph=e.hp<=T[1]?3:e.hp<=T[0]?2:1;
  if(ph!==ph0){e.ph=ph;e.exp=0;e.sh=1.4;e.dsh=null;D.ors=[];D.hz=[];say_(ph===2?"Umbra is furious. The attacks change!":"Umbra howls. Everything speeds up!");spawnShade(e);itemDrop(160,300);itemDrop(90,260)}}
function damage(e,n){
  if(e.iv>0)return;
  if(e.t==="boss"){if(e.dead||D.cine||e.al<.6)return;if(e.exp<=0){sfx("clink");say_("Its shadow body shrugs off steel. Light it up first (Danoya).");return}bossHit(e,n,true);return}
  if(e.t==="h"&&e.lt<=0){e.fl=.08;sfx("clink");say_(e.big?"Stone shrugs off steel. Light up its cracks first (Danoya).":"A shade: nothing for steel to hit. Light it first (Danoya).");return}
  e.hp-=n;e.fl=.15;sfx("hit");var o=D.h[D.act];var dd=dist(e.x,e.y,o.x,o.y)||1;e.kx=(e.x-o.x)/dd*140;e.ky=(e.y-o.y)/dd*140;
  if(e.hp<=0){if(e.big){D.shake=.9;sfx("open");say_("The Stone Sentinel crumbles!");itemDrop(e.x,e.y);itemDrop(e.x+24,e.y+10);for(var pz=0;pz<4;pz++)puff(e.x+(Math.random()-.5)*30,e.y+(Math.random()-.5)*30,"#9a9fb0")}puff(e.x,e.y,e.t==="h"?"#b9a8ff":e.sp?"#4cc8c4":"#6fe08a");var R=D.R;if(e.sp){for(var sq2=0;sq2<2;sq2++)R.ent.push({t:"s",x:e.x+(sq2?14:-14),y:e.y+2,hp:1,mx:1,tm:.4,vx:0,vy:0,fl:.1,iv:.6,st:.6,kx:(sq2?1:-1)*120,ky:30});sfx("tap");say_("It splits in two!")}R.ent.splice(R.ent.indexOf(e),1);if(Math.random()<.3||(e.t==="h"))itemDrop(e.x,e.y)}}
function itemDrop(x,y){if(D.R.itm.length<6)D.R.itm.push({k:"h",x:x,y:y})}
function puff(x,y,c){for(var i=0;i<10;i++)D.parts.push({x:x,y:y,vx:(Math.random()-.5)*120,vy:(Math.random()-.5)*120,l:.5,c:c})}
function spawnShade(b){var R=D.R;var n=R.ent.filter(function(e){return e.t==="h"}).length;if(n>=4)return;R.ent.push({t:"h",x:b.x+(Math.random()<.5?-40:40),y:b.y+30,hp:3,mx:3,tm:0,vx:0,vy:0,fl:0,st:0,lt:0})}
function sleep(ms){return new Promise(function(r){setTimeout(r,ms)})}
function setStage2(b){b.stage=2;b.hp=b.mx=62;b.ph=1;b.exp=0;b.sh=2;b.su=7;b.rg=5;b.sl=5;b.tpT=6;b.col=5;b.al=1;b.tpv=0;b.dsh=null;b.x=160;b.y=104;b.sp=0;b.spT=0;b.fl=0}
async function toStage2(e){var R=D.R;talking=true;e.exp=0;e.fl=0;D.ors=[];D.hz=[];R.ent=[];D.cine={k:"p2",t:0,b:0,wa:0,wt:0};D.shake=1.2;sfx("open");puff(e.x,e.y,"#b78bff");puff(e.x,e.y,"#ffe27a");
  m3(null);
  await sleep(1100);
  await seq([["Umbra","Stop. Stop humming. The quiet was perfect until you came."],["Danoya","He is still standing. Doodi, the shadow is not breaking. It is changing!"]]);
  D.cine.wt=1;D.shake=1;sfx("open");await sleep(900);setStage2(e);D.fade=.9;D.cine.wt=0;puff(e.x,e.y,"#ff4d6d");puff(e.x,e.y,"#fff");await sleep(500);
  await seq([["Umbra","I swallowed the sun, little light. Did you think I could not swallow you?"],["Doodi","Danoya, I am going to say something brave. Please do not let me die being brave."],["Danoya","Then we do this together. Every light, every strike. Ready?"],["Doodi","Always."]]);
  D.hp=Math.min(12,D.hp+6);D.bond=100;itemDrop(160,300);D.shake=.5;m3("omega");
  say_("UMBRA, THE ECLIPSE");D.cine=null;talking=false}
async function bossDie(e){var R=D.R;talking=true;e.dead=.001;e.hp=0;e.exp=0;e.dsh=null;D.ors=[];D.hz=[];R.ent=[];D.cine={k:"die",t:0,b:0,wa:0,wt:0};D.shake=1.4;
  m3(null);sfxClip("boom");
  sfx("open");puff(e.x,e.y,"#b78bff");puff(e.x,e.y,"#ffe27a");D.fade=.9;
  await sleep(1400);
  await seq([["Umbra","No. No, it hurts. Why does it hurt to be warm?"],["Danoya","Because you have been cold for so long. Warm hurts a little at first."],["Umbra","I only wanted it to be quiet. Everything hums. Everything is so loud."],["Doodi","Buddy. We were never trying to drown you out. We were trying to hum with you."],["Umbra","...Then hum for me. Once. Before I go."],["Danoya","Before you go where?"],["Umbra","Wherever the quiet goes. Someone else is listening, you know. Under the north hill. He has been listening a very long time. He will be so glad of the light."],["Doodi","...Who?"],["Umbra","Hum. Please."],["","Danoya hums. Three soft notes, the same three she hums in the cabin when she thinks nobody is listening. Doodi joins in, a little flat. The shadow stops shaking."]]);
  D.cine.b=.001;
  for(var i=0;i<7;i++){sfx(i%2?"chime":"key");D.shake=.45+i*.08;puff(e.x+(Math.random()-.5)*50,e.y+(Math.random()-.5)*50,"#ffe27a");await sleep(520)}
  D.cine.wt=1;sfx("open");sfxClip("boom");D.shake=1.3;await sleep(1700);
  R.boss=null;m3("kh");R.crystal=1;R.itm.push({k:"sun",x:160,y:200});D.shake=0;D.fade=.8;D.cine.wt=0;sfx("chime");await sleep(1600);
  D.cine=null;say_("The Sunheart Crystal rises from the shadow!");talking=false}
function hurtAt(fn){var any=false;D.h.forEach(function(h,i){if(i!==D.act)return;if(h.inv<=0&&fn(h)){any=true;h.inv=1.1}});if(any){D.hp=Math.max(0,D.hp-1);D.flash=.35;D.shake=.25;sfx("hurt")}}
function addHz(o){o.t0=o.t;D.hz.push(o)}
function inHz(z,h){return z.k==="c"?dist(h.x,h.y,z.x,z.y)<z.r:z.k==="col"?Math.abs(h.x-z.x)<z.w:Math.abs(h.y-z.y)<z.w}
function stepHz(dt){D.hz=D.hz.filter(function(z){z.t-=dt;if(z.t<=0&&!z.fired){z.fired=1;z.f=.3;D.shake=Math.max(D.shake,.22);sfx("hit");hurtAt(function(h){return inHz(z,h)})}
  if(z.fired){z.f-=dt;return z.f>0}return true})}
function drawHz(){D.hz.forEach(function(z){var w=z.fired?1:(1-z.t/z.t0),a=z.fired?.75:.12+.33*w;cx.fillStyle=z.fired?"rgba(255,245,230,"+a+")":"rgba(255,50,90,"+a+")";cx.strokeStyle="rgba(255,120,140,"+(z.fired?.9:.8)+")";cx.lineWidth=2;
  if(z.k==="c"){cx.beginPath();cx.arc(z.x,z.y,z.r*(z.fired?1.1:.35+.65*w),0,7);cx.fill();cx.beginPath();cx.arc(z.x,z.y,z.r,0,7);cx.stroke()}
  else if(z.k==="col"){cx.fillRect(z.x-z.w,0,z.w*2,384);cx.strokeRect(z.x-z.w,0,z.w*2,384)}
  else{cx.fillRect(0,z.y-z.w,320,z.w*2);cx.strokeRect(0,z.y-z.w,320,z.w*2)}cx.lineWidth=1})}
function drawCine(){var c=D.cine;if(!c)return;var b=D.R.boss,bx=b?b.x:160,by=b?b.y:104;
  if(c.k==="p2"){cx.fillStyle="rgba(25,0,40,"+Math.min(.55,c.t*.5)+")";cx.fillRect(0,0,320,384);for(var i=0;i<3;i++){var r=(c.t*120+i*50)%150;cx.strokeStyle="rgba(183,139,255,"+(1-r/150)*.8+")";cx.lineWidth=3;cx.beginPath();cx.arc(bx,by,r+10,0,7);cx.stroke()}cx.lineWidth=1}
  else if(c.k==="lift"){var d0=D.h[0],k=Math.min(1,c.t/1.6),lx=d0.x,ly=d0.y-26-36*k+Math.sin(c.t*3)*2;
    var gg=cx.createRadialGradient(lx,ly,2,lx,ly,90);gg.addColorStop(0,"rgba(255,226,122,.85)");gg.addColorStop(1,"rgba(255,226,122,0)");cx.fillStyle=gg;cx.fillRect(lx-90,ly-90,180,180);
    cx.save();cx.globalAlpha=.16*k;cx.fillStyle="#fff7c4";for(var ri=0;ri<8;ri++){var an=c.t*.5+ri*Math.PI/4;cx.beginPath();cx.moveTo(lx,ly);cx.lineTo(lx+Math.cos(an-.05)*90,ly+Math.sin(an-.05)*90);cx.lineTo(lx+Math.cos(an+.05)*90,ly+Math.sin(an+.05)*90);cx.fill()}cx.restore();
    cx.fillStyle="#ffd34d";cx.beginPath();cx.moveTo(lx,ly-16);cx.lineTo(lx+11,ly);cx.lineTo(lx,ly+16);cx.lineTo(lx-11,ly);cx.closePath();cx.fill();cx.fillStyle="#fff7c4";cx.fillRect(lx-2,ly-8,4,10)}
  else if(c.k==="ult"){var dd=D.h[0],dn=D.h[1],fyy=dn.fy||0;
    cx.fillStyle="rgba(4,4,24,"+c.dark+")";cx.fillRect(0,0,320,384);
    if(c.glow>.02||fyy>2){var hy=dn.y-fyy-14,gr2=cx.createRadialGradient(dn.x,hy,2,dn.x,hy,30+c.glow*120);gr2.addColorStop(0,"rgba(255,248,200,"+Math.min(.95,.5+c.glow*.5)+")");gr2.addColorStop(1,"rgba(255,220,120,0)");cx.fillStyle=gr2;cx.fillRect(0,0,320,384);
      cx.lineWidth=3;for(var q=0;q<12;q++){var an2=q*.5236+c.t*.8;cx.strokeStyle="rgba(255,240,170,.55)";cx.beginPath();cx.moveTo(dn.x+Math.cos(an2)*26,hy+Math.sin(an2)*26);cx.lineTo(dn.x+Math.cos(an2)*(46+Math.sin(c.t*9+q)*8),hy+Math.sin(an2)*(46+Math.sin(c.t*9+q)*8));cx.stroke()}cx.lineWidth=1}
    if(c.beam>.03){var sx=dd.x+8,sy=dd.y-50;cx.strokeStyle="rgba(255,236,150,"+c.beam*.85+")";cx.lineWidth=2+c.beam*8;cx.beginPath();cx.moveTo(dn.x,dn.y-fyy-14);cx.lineTo(sx,sy);cx.stroke();cx.strokeStyle="rgba(255,255,255,"+c.beam+")";cx.lineWidth=2;cx.stroke();cx.lineWidth=1;
      var sg=cx.createRadialGradient(sx,sy-10,2,sx,sy-10,36);sg.addColorStop(0,"rgba(255,250,210,"+c.beam+")");sg.addColorStop(1,"rgba(255,220,100,0)");cx.fillStyle=sg;cx.fillRect(sx-40,sy-50,80,80);
      cx.strokeStyle="#fff8c8";cx.lineWidth=5;cx.lineCap="round";cx.beginPath();cx.moveTo(sx,sy+16);cx.lineTo(sx,sy-30);cx.stroke();cx.strokeStyle="#ffd34d";cx.lineWidth=2;cx.beginPath();cx.moveTo(sx-6,sy+14);cx.lineTo(sx+6,sy+14);cx.stroke();cx.lineCap="butt";cx.lineWidth=1}
    c.sl.forEach(function(sl){if(sl.t>0){var L=70,al=Math.min(1,sl.t*4);cx.strokeStyle="rgba(255,255,255,"+al+")";cx.lineWidth=6*al;cx.lineCap="round";cx.beginPath();cx.moveTo(sl.x-Math.cos(sl.a)*L,sl.y-Math.sin(sl.a)*L);cx.lineTo(sl.x+Math.cos(sl.a)*L,sl.y+Math.sin(sl.a)*L);cx.stroke();cx.strokeStyle="rgba(255,226,120,"+al+")";cx.lineWidth=2.5;cx.stroke();cx.lineCap="butt";cx.lineWidth=1}});
    if(c.cap){cx.font="bold 15px sans-serif";cx.textAlign="center";cx.textBaseline="top";var w3=cx.measureText(c.cap).width+22;cx.fillStyle="#000c";cx.fillRect(160-w3/2,70,w3,28);cx.fillStyle=c.cap==="SUNBREAKER!"?"#ffe27a":"#fff";cx.fillText(c.cap,160,76);cx.textAlign="left"}}
  else{cx.fillStyle="rgba(0,0,0,"+Math.min(.4,c.t*.25)+")";cx.fillRect(0,0,320,384);
    var st=Math.min(1,c.t*.3)+c.b*.2,len=60+Math.min(c.t,6)*26+c.b*70;cx.lineWidth=7;for(var i2=0;i2<14;i2++){var an=i2*.4488+c.t*.22;cx.strokeStyle="rgba(255,226,122,"+Math.min(.5,.1+.18*st)+")";cx.beginPath();cx.moveTo(bx,by);cx.lineTo(bx+Math.cos(an)*len,by+Math.sin(an)*len);cx.stroke()}cx.lineWidth=1;
    if(c.b>0){for(var j=0;j<3;j++){var rr=(c.b*150+j*80)%250;cx.strokeStyle="rgba(255,250,225,"+(1-rr/250)+")";cx.lineWidth=4;cx.beginPath();cx.arc(bx,by,rr,0,7);cx.stroke()}cx.lineWidth=1;var gr=cx.createRadialGradient(bx,by,4,bx,by,40+c.b*90);gr.addColorStop(0,"rgba(255,250,220,"+Math.min(.95,c.b*.4)+")");gr.addColorStop(1,"rgba(255,226,122,0)");cx.fillStyle=gr;cx.fillRect(0,0,320,384)}}
  if(c.wa>.01){cx.fillStyle="rgba(255,250,235,"+Math.min(1,c.wa)+")";cx.fillRect(0,0,320,384)}}
function swing(who){var h=D.h[who];if(D.swcd>0)return;D.swcd=.38;D.sw={who:who,d:h.d,t:.22,done:{}};sfx("swing")}
function swordBox(){var s=D.sw,h=D.h[s.who],dx=[0,1,0,-1][s.d],dy=[-1,0,1,0][s.d];return {x:h.x+dx*20,y:h.y-4+dy*20,w:(dx?30:34),h:(dy?30:34)}}
function overlap(ax,ay,aw,ah,bx,by,bw,bh){return Math.abs(ax-bx)<(aw+bw)/2&&Math.abs(ay-by)<(ah+bh)/2}
function swordStep(){var s=D.sw;if(!s)return;var b=swordBox(),R=D.R;
  var list=R.ent.slice();if(R.boss&&!R.boss.dead)list.push(R.boss);
  list.forEach(function(e){if(s.done[e.uid||(e.uid=Math.random())])return;var bb=bodyBox(e);if(overlap(b.x,b.y,b.w,b.h,e.x,e.y,bb.w+6,bb.h+6)){s.done[e.uid]=1;damage(e,1)}});
  D.ors=D.ors.filter(function(o){if(overlap(b.x,b.y,b.w,b.h,o.x,o.y,14,14)){puff(o.x,o.y,"#b78bff");return false}return true});
  var tx0=Math.floor((b.x-b.w/2)/TS),tx1=Math.floor((b.x+b.w/2)/TS),ty0=Math.floor((b.y-b.h/2)/TS),ty1=Math.floor((b.y+b.h/2)/TS);
  for(var ty=ty0;ty<=ty1;ty++)for(var tx=tx0;tx<=tx1;tx++){if(tx<0||ty<0||tx>=W||ty>=H)continue;var c=R.g[ty][tx];
    if(c==="V"){R.g[ty][tx]=".";puff(tx*TS+16,ty*TS+16,"#46a354");sfx("hit");say_("Snip!")}
    else if(c==="C"&&!s.cr&&R.cd3<=0){s.cr=1;R.cd3=.5;R.tg=!R.tg;sfx("key");puff(tx*TS+16,ty*TS+14,R.tg?"#6fe0ff":"#b78bff");say_(R.tg?"The barrier hums and fades.":"The barrier snaps back.")}}}
function pulse(who){var h=D.h[who];if(h.cd>0)return;h.cd=1.2;D.pc={x:h.x,y:h.y,r:6,max:112};sfx("pulse");var R=D.R;
  for(var k in R.lit){var q=k.split(",");if(dist(h.x,h.y,+q[0]*TS+16,+q[1]*TS+16)<120){if(!R.lit[k]){R.lit[k]=1;sfx("key");puff(+q[0]*TS+16,+q[1]*TS+10,"#ffb84d")}if(R.d.rush&&!R.open){R.lt2=R.lt2||{};R.lt2[k]=R.d.rush}}}
  R.ent.forEach(function(e){if(dist(h.x,h.y,e.x,e.y)<116){if(e.t==="h"){e.lt=3.2}else{e.st=1.2}}});
  if(R.boss&&!R.boss.dead&&!D.cine&&R.boss.al>.6&&dist(h.x,h.y,R.boss.x,R.boss.y)<130){R.boss.exp=R.boss.stage===2?3.2:3.8;D.bond=Math.min(100,D.bond+4);R.boss.dsh=null;R.boss.tpv=0;sfx("key");say_("Umbra is exposed! Strike now!")}
  D.ors=D.ors.filter(function(o){if(dist(h.x,h.y,o.x,o.y)<100){puff(o.x,o.y,"#ffe27a");return false}return true})}
function action(){var R=D.R,a=D.h[D.act];
  if(D.act===0){
    // fountain?
    var fx=Math.floor((a.x+[0,12,0,-12][a.d])/TS),fy=Math.floor((a.y+[-12,0,12,0][a.d])/TS);
    if(R.g[fy]&&R.g[fy][fx]==="F"){if(R.fnt&&R.fnt[fx+","+fy]){say_("The fountain is dry now.");return}R.fnt=R.fnt||{};R.fnt[fx+","+fy]=1;D.hp=12;sfx("chime");say_("Fresh, glowing water. Hearts restored!");return}
    swing(0)}
  else{var fx2=Math.floor((a.x+[0,12,0,-12][a.d])/TS),fy2=Math.floor((a.y+[-12,0,12,0][a.d])/TS);
    if(R.g[fy2]&&R.g[fy2][fx2]==="F"){if(R.fnt&&R.fnt[fx2+","+fy2]){say_("The fountain is dry now.");return}R.fnt=R.fnt||{};R.fnt[fx2+","+fy2]=1;D.hp=12;sfx("chime");say_("Fresh, glowing water. Hearts restored!");return}
    pulse(1)}}
window.__dunA=function(){if(!D.on||talking||ui||D.dead)return;action()};
window.__dunSwap=function(){if(!D.on||talking||ui)return;D.act=1-D.act;sfx("swap");say_("Now playing: "+(D.act===0?"Doodi (sword)":"Danoya (lantern)"))};

/* ---------- the carving behind the Stone Sentinel: where the two of them learn Sunbreaker ---------- */
function drawMural(R){var k=R.carveT==null?1:Math.min(1,R.carveT),p=.6+.4*Math.sin(time*2.2);
  cx.save();cx.fillStyle="#1d1a24";cx.fillRect(36,3,88,27);cx.strokeStyle="#4a4458";cx.lineWidth=2;cx.strokeRect(36,3,88,27);
  cx.globalAlpha=k*(.55+.45*p);cx.strokeStyle="#ffd34d";cx.fillStyle="#ffd34d";cx.lineWidth=1.5;
  cx.beginPath();cx.arc(64,9,3,0,7);cx.fill();for(var i=0;i<8;i++){var a=i*.785;cx.beginPath();cx.moveTo(64+Math.cos(a)*5,9+Math.sin(a)*5);cx.lineTo(64+Math.cos(a)*7,9+Math.sin(a)*7);cx.stroke()}
  cx.beginPath();cx.arc(64,15,2,0,7);cx.stroke();cx.beginPath();cx.moveTo(64,17);cx.lineTo(64,22);cx.moveTo(61,13);cx.lineTo(64,18);cx.lineTo(67,13);cx.stroke();
  cx.beginPath();cx.arc(96,15,2,0,7);cx.stroke();cx.beginPath();cx.moveTo(96,17);cx.lineTo(96,25);cx.moveTo(96,25);cx.lineTo(93,29);cx.moveTo(96,25);cx.lineTo(99,29);cx.moveTo(96,19);cx.lineTo(101,13);cx.stroke();
  cx.lineWidth=2;cx.beginPath();cx.moveTo(101,13);cx.lineTo(106,5);cx.stroke();
  cx.globalAlpha=k*(.3+.3*p);cx.lineWidth=1;cx.beginPath();cx.moveTo(68,10);cx.lineTo(104,6);cx.stroke();
  cx.globalAlpha=k*.7;cx.fillStyle="#b79cff";for(var j=0;j<6;j++)cx.fillRect(44+j*13,26,6,2);
  cx.restore()}
function muralHtml(){return '<h3 style="margin:0 0 8px">🪨 The carving</h3><canvas id="mcv" width="260" height="150" style="width:100%;max-width:300px;display:block;margin:0 auto;border-radius:10px;background:#1d1a24"></canvas><p class="mini" style="margin:10px 0 4px">Beneath it, in the old runes, and scratched underneath in a plainer hand:</p><p style="font-weight:800;margin:4px 0 10px">“When two hearts beat as one, lift the light, and let the blade carry it.”</p><button class="big" id="mok" type="button">Keep looking</button>'}
function paintMural(){var c=$("mcv");if(!c)return;var g=c.getContext("2d"),t=performance.now()/1000,p=.6+.4*Math.sin(t*2.2);
  g.clearRect(0,0,260,150);g.fillStyle="#1d1a24";g.fillRect(0,0,260,150);g.strokeStyle="#3a3448";g.lineWidth=1;for(var y=10;y<150;y+=22){g.beginPath();g.moveTo(0,y);g.lineTo(260,y);g.stroke()}
  var r=g.createRadialGradient(80,40,4,80,40,70);r.addColorStop(0,"rgba(255,211,77,"+(.45*p)+")");r.addColorStop(1,"rgba(255,211,77,0)");g.fillStyle=r;g.fillRect(0,0,260,150);
  g.strokeStyle="#ffd34d";g.fillStyle="#ffd34d";g.lineWidth=3;g.lineCap="round";
  g.beginPath();g.arc(80,34,11,0,7);g.fill();for(var i=0;i<10;i++){var a=i*.628;g.beginPath();g.moveTo(80+Math.cos(a)*16,34+Math.sin(a)*16);g.lineTo(80+Math.cos(a)*23,34+Math.sin(a)*23);g.stroke()}
  g.beginPath();g.arc(80,66,7,0,7);g.stroke();g.beginPath();g.moveTo(80,73);g.lineTo(80,98);g.moveTo(68,56);g.lineTo(80,78);g.lineTo(92,56);g.moveTo(80,98);g.lineTo(74,108);g.moveTo(80,98);g.lineTo(86,108);g.stroke();
  g.beginPath();g.moveTo(78,108);g.lineTo(82,114);g.stroke();
  g.beginPath();g.arc(186,80,7,0,7);g.stroke();g.beginPath();g.moveTo(186,87);g.lineTo(186,116);g.moveTo(186,116);g.lineTo(178,136);g.moveTo(186,116);g.lineTo(194,136);g.moveTo(186,94);g.lineTo(200,78);g.moveTo(186,98);g.lineTo(174,108);g.stroke();
  g.lineWidth=5;g.beginPath();g.moveTo(200,78);g.lineTo(216,46);g.stroke();
  g.globalAlpha=.4+.5*p;g.lineWidth=2;g.setLineDash([4,5]);g.beginPath();g.moveTo(102,38);g.quadraticCurveTo(160,24,214,48);g.stroke();g.setLineDash([]);g.globalAlpha=1;
  g.fillStyle="#b79cff";for(var j=0;j<11;j++){g.fillRect(28+j*20,140,10,3);if(j%3===0)g.fillRect(31+j*20,135,4,4)}
  requestAnimationFrame(paintMural)}
async function carveScene(){
  talking=true;R0=D.R;R0.carveT=0;
  await sleep(900);
  var t0=performance.now(),iv=setInterval(function(){R0.carveT=Math.min(1,(performance.now()-t0)/1800);if(R0.carveT>=1)clearInterval(iv)},50);
  sfx("chime");D.shake=.15;
  await seq([["","As the Sentinel's last stone settles, the dust slides off the wall behind where it stood. Something is carved there, and the lines are filling with light, one by one."],
    ["Danoya","Doodi. Come and look at this."]]);
  await new Promise(function(res){showOv(muralHtml());paintMural();$("mok").onclick=function(){hideOv();res()}});
  await seq([["Doodi","Two people. One up in the air holding a sun. One underneath with a sword, catching it."],
    ["Danoya","That's not a picture of a fight. It's instructions."],
    ["Doodi","Instructions for what?"],
    ["Danoya","For us, maybe. When we've fought long enough side by side, I lift the light, and you carry every drop of it in your sword. All at once."],
    ["Doodi","That sounds like it would break something."],
    ["Danoya","Something big. Look, the carving only shows it once, against the thing at the very bottom. It's not for doorways and beetles."],
    ["Doodi","Then we save it. But I'm naming it now, so it's ready."],
    ["Doodi","SUNBREAKER."],
    ["Danoya","...Fine. That's a good name."]]);
  toast("☀ Learned: Sunbreaker. It wakes in the last fight, when your bond is full.");
  talking=false}
var R0=null;
async function ultimate(){
  if(!D.on||talking||ui||D.cine||D.dead||D.trans)return;var R=D.R,b=R.boss;
  if(!b||b.dead)return;if(b.al<.6)return;
  if(D.bond<100){say_("Bond "+Math.floor(D.bond)+"%. Land more hits!");return}
  D.bond=0;talking=true;var dd=D.h[0],dn=D.h[1];
  var c=D.cine={k:"ult",t:0,b:0,wa:0,wt:0,dnY:0,dnT:0,beam:0,bT:0,dark:0,dT:.65,cap:"",sl:[],dtx:null,dty:null,glow:0,gT:0};
  b.dsh=null;D.ors=[];D.hz=[];R.ent.forEach(function(e){puff(e.x,e.y,"#b9a8ff")});R.ent=[];
  sfx("pulse");c.cap="Danoya: Doodi. Take my light!";c.dnT=62;c.gT=1;await sleep(900);sfx("key");
  c.cap="Doodi: All of it. Always.";c.bT=1;sfx("pulse");await sleep(1100);
  c.cap="SUNBREAKER!";D.shake=.6;sfx("open");c.dtx=b.x;c.dty=b.y+44;await sleep(500);
  for(var i=0;i<6;i++){var an=-.9+i*.36+(i%2?.5:0);c.sl.push({x:b.x,y:b.y,a:an,t:.35});sfx("hit");D.shake=.5;b.fl=.12;puff(b.x+(Math.random()-.5)*30,b.y+(Math.random()-.5)*30,"#fff");await sleep(170)}
  c.wt=1;sfx("open");D.shake=1.4;await sleep(420);
  var ph0=b.ph;bossHit(b,10);
  c.dtx=null;c.dnT=0;c.bT=0;c.dT=0;c.wt=0;c.cap="";
  if(D.cine===c){if(b.hp>0&&b.ph===ph0)b.exp=Math.max(b.exp,3.2);dd.inv=dn.inv=1.6;await sleep(700);dn.fy=0;dd.x=Math.min(280,Math.max(40,dd.x));dd.y=Math.min(330,dd.y);dn.x=dd.x+16;dn.y=dd.y+4}
  if(D.cine===c){D.cine=null;dn.fy=0;talking=false}}
window.__dunUlt=ultimate;window.__dlgActors=function(){var sc=($("stage").clientHeight||400)/384,o=[];if(!D.h||!window.__dunOn)return o;D.h.forEach(function(h){o.push(h.y*sc,(h.y-28)*sc)});try{(D.R.ent||[]).forEach(function(e){o.push(e.y*sc)})}catch(x){}return o};window.__d3D=function(){return D};
var EASY=false;try{EASY=localStorage.getItem("dv_easy")==="1"}catch(e){}
function toggleStay(){if(!D.on)return;D.stay=!D.stay;updBtns();say_(D.stay?(D.act===0?"Danoya stays here.":"Doodi stays here."):"Your partner follows you.")}
window.__dunStay=toggleStay;
function updBtns(){var s=document.getElementById("bs");if(s)s.textContent=D.stay?"Follow":"Stay"}
window.addEventListener("keydown",function(e){if(!D.on)return;if(e.key==="f"||e.key==="F"){e.preventDefault();toggleStay()}else if(e.key==="x"||e.key==="X"){e.preventDefault();resetRoom()}else if(e.key==="e"||e.key==="E"){e.preventDefault();ultimate()}},true);
function resetRoom(){if(talking||ui||D.R.d.lock==="boss")return;D.st[D.ri]=null;enterRoom(D.ri,"up");say_("Room reset.")}
function fireOrb(b,aa,sp){D.ors.push({x:b.x,y:b.y+10,vx:Math.cos(aa)*sp,vy:Math.sin(aa)*sp})}
function aimed(b,n,gap,sp){var t=nearestHero(b),an=Math.atan2(t.y-b.y,t.x-b.x);for(var i=0;i<n;i++)fireOrb(b,an+(i-(n-1)/2)*gap,sp)}
function ring(b,n,sp){var off=Math.random()*6.283;for(var i=2;i<n;i++)fireOrb(b,off+i*6.2832/n,sp)}
function stepBoss(b,dt,R){
  if(b.fl>0)b.fl-=dt;
  var ph=b.ph,s2=b.stage===2;
  if(b.exp>0){b.exp-=dt;b.dsh=null;b.tpv=0;b.al=Math.min(1,b.al+dt*4)}
  else{
    if(b.tpv>0){b.al=Math.max(0,b.al-dt*3.5);b.tpv-=dt;if(b.tpv<=0){b.tpv=0;var tg=D.h[Math.random()<.5?0:1];b.x=Math.max(60,Math.min(260,tg.x+(Math.random()<.5?-66:66)));b.y=Math.max(70,Math.min(270,tg.y-66));addHz({k:"c",x:b.x,y:b.y+12,r:60,t:.9})}}
    else if(b.al<1)b.al=Math.min(1,b.al+dt*3);
    if(!b.tpv){
      if(!b.dsh){b.x+=b.dir*((s2?34:44)+ph*(s2?12:16))*dt;if(b.x>250)b.dir=-1;if(b.x<70)b.dir=1;b.y+=(104-b.y)*Math.min(1,dt*(s2?.6:1.6))}
      if(!s2&&ph>=2){b.ds-=dt;if(b.ds<=0&&!b.dsh){b.ds=ph===3?6:8.5;var t2=nearestHero(b);b.dsh={t:.8,x:t2.x,y:t2.y,go:0}}}
      if(b.dsh){if(b.dsh.t>0)b.dsh.t-=dt;else{var ddx=b.dsh.x-b.x,ddy=b.dsh.y-b.y,dd=Math.hypot(ddx,ddy)||1;b.dsh.go+=dt;b.x=Math.max(50,Math.min(270,b.x+ddx/dd*310*dt));b.y=Math.max(60,Math.min(290,b.y+ddy/dd*310*dt));if(dd<12||b.dsh.go>.7)b.dsh=null}}
      if(!b.dsh){
        b.sh-=dt;
        if(!s2){if(b.sh<=0){b.sh=[0,2.0,1.5,1.1][ph];aimed(b,[0,2,3,5][ph],.3,[0,100,112,126][ph])}}
        else{if(ph===1){if(b.sh<=0){b.sh=1.7;aimed(b,3,.34,112)}}
          else{if(b.sh<=0){b.sh=ph===2?2.3:2.0;aimed(b,ph===2?3:5,.3,ph===2?112:130)}
            b.spT-=dt;if(b.spT<=0){b.spT=ph===2?.36:.3;b.sp+=.56;fireOrb(b,b.sp,92);if(ph===3)fireOrb(b,b.sp+3.1416,92)}}}
        if((!s2&&ph>=2)||s2){b.rg-=dt;if(b.rg<=0){b.rg=s2?[0,7,6,5][ph]:[0,0,7,5.5][ph];ring(b,s2?14:10,s2?84:78)}}
        if((!s2&&ph===3)||(s2&&ph>=2)){b.sl-=dt;if(b.sl<=0){b.sl=s2?4.5:6.5;D.h.forEach(function(h){addHz({k:"c",x:h.x,y:h.y,r:36,t:1.1})})}}
        if(s2){b.tpT-=dt;if(b.tpT<=0&&b.al>=1){b.tpT=[0,8,6.5,5][ph];b.tpv=.4}
          if(ph>=2){b.col-=dt;if(b.col<=0){b.col=ph===3?4.2:5.5;D.h.forEach(function(h){addHz({k:"col",x:h.x,w:20,t:1.2})});if(ph===3){var th=nearestHero(b);addHz({k:"row",y:th.y,w:18,t:1.4})}}}}
        if(s2){b.rn=(b.rn==null?4:b.rn)-dt;if(b.rn<=0){b.rn=[0,9,7,5.5][ph];var nn=[0,3,6,9][ph];for(var q4=0;q4<nn;q4++)addHz({k:"c",x:50+Math.random()*220,y:70+Math.random()*230,r:26,t:1.1});if(ph>=2)say_("Eclipse rain!")}
          if(ph>=2){b.sw=(b.sw==null?8:b.sw)-dt;if(b.sw<=0){b.sw=ph===3?8:10.5;var th4=nearestHero(b);[-74,0,74].forEach(function(o,k){addHz({k:"row",y:Math.max(50,Math.min(330,th4.y+o)),w:13,t:1.0+k*.55})});say_("Darkness sweeps the hall!")}}
          if(ph===3){b.fan=(b.fan==null?6:b.fan)-dt;if(b.fan<=0){b.fan=9;aimed(b,7,.26,104)}}}
        b.su-=dt;if(b.su<=0){b.su=ph===3?7:10;spawnShade(b)}}}}
  if(b.al>.7&&!b.tpv)D.h.forEach(function(h){if(overlap(h.x,h.y,14,12,b.x,b.y,44,56)&&h.inv<=0)hurt(1,b.x,b.y)})}
/* enemy AI */
function nearestHero(e){var a=D.h[0],b=D.h[1];return dist(e.x,e.y,a.x,a.y)<dist(e.x,e.y,b.x,b.y)?a:b}
function moveEnt(e,dx,dy,sp,dt,w,h){var R=D.R,nx=e.x+dx*sp*dt,ny=e.y+dy*sp*dt,bx=false;
  if(!boxHit(R,nx,e.y,w,h,"block"))e.x=nx;else bx=true;
  if(!boxHit(R,e.x,ny,w,h,"block"))e.y=ny;else bx=true;return bx}
function stepEnts(dt){var R=D.R;
  R.ent.forEach(function(e){
    if(e.iv>0)e.iv-=dt;if(e.fl>0)e.fl-=dt;if(e.lt>0)e.lt-=dt;if(e.st>0)e.st-=dt;
    if(e.kx||e.ky){moveEnt(e,e.kx,e.ky,1,dt,16,14);e.kx*=.8;e.ky*=.8;if(Math.abs(e.kx)<8&&Math.abs(e.ky)<8){e.kx=0;e.ky=0}}
    if(e.st>0&&e.t!=="h"){}else{
      var tg=nearestHero(e),dd=dist(e.x,e.y,tg.x,tg.y)||1;e.tm-=dt;
      if(e.t==="s"){if(e.tm<=0){e.tm=.9+Math.random()*.6;e.hop=.4;var ch=Math.random()<.65;e.vx=ch?(tg.x-e.x)/dd:Math.cos(Math.random()*6.28);e.vy=ch?(tg.y-e.y)/dd:Math.sin(Math.random()*6.28)}
        if(e.hop>0){e.hop-=dt;moveEnt(e,e.vx,e.vy,60,dt,16,14)}}
      else if(e.t==="b"){if(e.tm<=0){e.tm=.35+Math.random()*.4;var a2=Math.atan2(tg.y-e.y,tg.x-e.x)+(Math.random()-.5)*2.2;e.vx=Math.cos(a2);e.vy=Math.sin(a2)}moveEnt(e,e.vx,e.vy,72,dt,14,12)}
      else if(e.t==="m"){if(e.tm<=0){e.tm=2.5+Math.random()*.9;fireOrb(e,Math.atan2(tg.y-e.y,tg.x-e.x),80);sfx("tap")}}
      else if(e.t==="c"){
        if(e.tl>0){e.tl-=dt;if(e.tl<=0){e.dg=.62;sfx("swing")}}
        else if(e.dg>0){e.dg-=dt;var bxx=moveEnt(e,e.dx,e.dy,240,dt,18,16);if(bxx){e.dg=0;e.st=1.5;e.cdn=1.6;D.shake=Math.max(D.shake,.3);sfx("hit");puff(e.x,e.y,"#b7a37c")}else if(e.dg<=0){e.cdn=1.2}}
        else{moveEnt(e,(tg.x-e.x)/dd,(tg.y-e.y)/dd,24,dt,18,16);e.cdn-=dt;if(e.cdn<=0&&dd<215){e.tl=.62;e.dx=(tg.x-e.x)/dd;e.dy=(tg.y-e.y)/dd;e.cdn=2.5}}}
      else if(e.t==="h"&&e.big){stepWarden(e,dt,tg,dd)}
      else if(e.t==="h"){moveEnt(e,(tg.x-e.x)/dd,(tg.y-e.y)/dd,e.lt>0?14:30,dt,16,18)}}
    // contact
    if(e.st<=0||e.t==="h"){var bb=bodyBox(e);D.h.forEach(function(h){if(overlap(h.x,h.y,14,12,e.x,e.y,bb.w-4,bb.h-4)&&h.inv<=0&&!(e.t==="h"&&false))hurt(1,e.x,e.y)})}});
  // boss
  var b=R.boss;if(b&&!b.dead&&!D.cine)stepBoss(b,dt,R);
  // orbs
  D.ors.forEach(function(o){o.x+=o.vx*dt;o.y+=o.vy*dt;D.h.forEach(function(h){if(!o.dead&&dist(o.x,o.y,h.x,h.y-6)<14&&h.inv<=0){o.dead=1;hurt(1,o.x,o.y)}});if(boxHit(R,o.x,o.y,8,8,"block"))o.dead=1});
  D.ors=D.ors.filter(function(o){return !o.dead&&o.x>-20&&o.x<340&&o.y>-20&&o.y<400})}
function stepRoom(dt){var R=D.R;R.cd3=Math.max(0,(R.cd3||0)-dt);
  // plates
  var all=true,any=R.pl.length>0;R.pressed={};
  R.pl.forEach(function(p){var on=false;if(!R.d.pb&&!p.b)D.h.forEach(function(h){if(Math.floor(h.x/TS)===p.x&&Math.floor(h.y/TS)===p.y)on=true});if(blockAt(R,p.x,p.y))on=true;R.pressed[p.x+","+p.y]=on;if(!on)all=false});
  if(R.d.rush&&!R.open&&R.lt2){for(var lk in R.lt2){if(R.lit[lk]&&R.lt2[lk]>0){R.lt2[lk]-=dt;if(R.lt2[lk]<=0){R.lit[lk]=0;sfx("clink")}}}}
  if(!R.open&&R.d.hints&&!talking&&!D.cine){R.sT=(R.sT||0)+dt;var hi=R.hs||0;if(hi<R.d.hints.length&&R.sT>(hi===0?100:200)){R.hs=hi+1;R.sT=hi===0?100:R.sT;say_(R.d.hints[hi]);D.msgT=6}}
  if(!R.open){var ok=false;
    if(R.d.lock==="plate"&&any&&all)ok=true;
    else if(R.d.lock==="kill"&&R.ent.length===0)ok=true;
    else if(R.d.lock==="torch"){ok=true;for(var k in R.lit)if(!R.lit[k])ok=false}
    else if(R.d.lock==="none")ok=true;
    if(ok){R.open=true;if(R.d.lock!=="none"){sfx("open");say_("The way forward opens!");D.shake=.2}if(R.d.name==="The Stone Sentinel"&&!R.carved){R.carved=1;carveScene()}}}
  // pickups on map
  D.h.forEach(function(h){var tx=Math.floor(h.x/TS),ty=Math.floor(h.y/TS),c=R.g[ty]&&R.g[ty][tx];
    if(c==="K"){R.g[ty][tx]=".";D.keys++;sfx("key");say_("Got a key!")}
    if(c==="H"){if(D.hp<12){R.g[ty][tx]=".";D.hp=Math.min(12,D.hp+4);sfx("chime");say_("+2 hearts")}}});
  for(var i=R.itm.length-1;i>=0;i--){var it=R.itm[i];if(it.k==="h"&&D.hp<12){D.h.forEach(function(h){if(it.gone)return;if(dist(h.x,h.y,it.x,it.y)<18){it.gone=1;D.hp=Math.min(12,D.hp+2);sfx("chime")}});if(it.gone)R.itm.splice(i,1)}
    else if(it.k==="sun"){D.h.forEach(function(h){if(!D.done&&dist(h.x,h.y,it.x,it.y)<22){D.done=true;finale()}})}}}
function stepHeroes(dt){
  var a=D.h[D.act],b=D.h[1-D.act];
  var dx=(held[1]?1:0)-(held[3]?1:0),dy=(held[2]?1:0)-(held[0]?1:0);if(dx&&dy){dx*=.72;dy*=.72}var JY=window.__joy;if(JY&&JY.on){dx=JY.x;dy=JY.y}
  a.mv=0;if(dx||dy){a.mv=moveHero(a,dx,dy,82,dt,true)?1:0;if(!a.mv)a.mv=.001}
  else PUSH.t=0;
  var bd=dist(a.x,a.y,b.x,b.y);b.mv=0;
  var chase=null;if(D.pat>0)D.pat-=dt;
  if(EASY&&!D.stay&&b===D.h[0]&&D.R){var cdm=130;D.R.ent.forEach(function(e){if(e.t==="h"&&e.lt<=0)return;var q=dist(b.x,b.y,e.x,e.y);if(q<cdm&&dist(a.x,a.y,e.x,e.y)<175){cdm=q;chase=e}});var bs0=D.R.boss;if(bs0&&!bs0.dead&&bs0.exp>0&&dist(b.x,b.y,bs0.x,bs0.y)<160)chase=bs0}
  if(chase&&dist(b.x,b.y,chase.x,chase.y)>26){var cdx=chase.x-b.x,cdy=chase.y-b.y,cl=Math.hypot(cdx,cdy)||1;var cm1=moveHero(b,cdx/cl,0,86,dt,false),cm2=moveHero(b,0,cdy/cl,86,dt,false);b.mv=(cm1||cm2)?1:0}
  else if(!D.stay&&bd>34){var ux=(a.x-b.x)/bd,uy=(a.y-b.y)/bd;b.mv=moveHero(b,ux,uy,78,dt,false)?1:0;
    if(!b.mv){var m1=moveHero(b,ux,0,78,dt,false),m2=moveHero(b,0,uy,78,dt,false);b.mv=(m1||m2)?1:0}}
  if(bd>240){b.x=a.x+(b===D.h[0]?-14:14);b.y=a.y+10}
  // partner assist
  var R=D.R;
  if(!D.stay||true){
    if(b===D.h[0]){ // Doodi partner auto-sword
      if(D.swcd<=0&&!D.sw&&(EASY||!(D.pat>0))){var tgt=null,bdist=EASY?40:24;R.ent.forEach(function(e){if(e.t==="h"&&e.lt<=0)return;var dd=dist(b.x,b.y,e.x,e.y);if(dd<bdist){bdist=dd;tgt=e}});
        if(R.boss&&!R.boss.dead&&R.boss.exp>0&&dist(b.x,b.y,R.boss.x,R.boss.y)<(EASY?56:30))tgt=R.boss;
        if(tgt){b.d=Math.abs(tgt.x-b.x)>Math.abs(tgt.y-b.y)?(tgt.x>b.x?1:3):(tgt.y>b.y?2:0);swing(0);if(!EASY)D.pat=1.6}}}
    else if(b.cd<=0&&(EASY||!(D.pat>0))){var need=false;R.ent.forEach(function(e){if(e.t==="h"&&e.lt<=0&&dist(b.x,b.y,e.x,e.y)<(EASY?80:42))need=true});if(R.boss&&!R.boss.dead&&R.boss.exp<=0&&dist(b.x,b.y,R.boss.x,R.boss.y)<110&&R.boss.fl<=0&&D.h[0].inv<=0&&false)need=true;if(need){pulse(1);if(!EASY)D.pat=2.2}}}
  D.h.forEach(function(h){if(h.inv>0)h.inv-=dt;if(h.cd>0)h.cd-=dt});
  // door transitions
  var ty=Math.floor(a.y/TS);
  if(R.open&&a.y<TS*.9&&R.d.map[0][Math.floor(a.x/TS)]==="^"){if(D.ri+1<RM.length){go(D.ri+1,"up")}}
  else if(a.y>TS*11.05&&R.i>0){go(D.ri-1,"down")}}
async function go(i,dir){if(D.dead||D.trans)return;D.trans=true;fadeFlash();var pa=D.h[D.act],pb=D.h[1-D.act];
  try{await enterRoomMove(i,dir)}finally{D.trans=false}}
async function enterRoomMove(i,dir){
  var up=dir==="up";D.ri=i;
  if(i>D.max){D.max=i;try{(window.__cutprev||localStorage.setItem("dv3",JSON.stringify({ri:i,v:3})))}catch(e){}}
  if(!D.st[i])D.st[i]=mkRoom(i,i<D.max&&i<D.maxStart);
  var R=D.R=D.st[i];D.ors=[];D.hz=[];D.pc=null;D.sw=null;if(!R.bgc)buildBg(R);
  var a=D.h[D.act],b=D.h[1-D.act],ax=a.x;
  a.x=Math.min(Math.max(ax,TS*4.3),TS*5.7);a.y=up?10.4*TS:1.45*TS+4;b.x=a.x+(b===D.h[0]?-16:16);b.y=a.y+(up?6:-6);
  if(i===RM.length-1&&up)D.stay=false;
  if(D.stay){D.stay=false;updBtns()}
  if(R.first&&R.d.intro){R.first=false;talking=true;try{if(R.d.song&&!window.__nosong)m3(isBR(R)?null:R.d.song)}catch(e){}
    for(var k=0;k<R.d.intro.length;k++)await say(R.d.intro[k][0],R.d.intro[k][1]);talking=false;if(isBR(R)){try{if(!window.__nosong)m3(R.d.song)}catch(e){}}}
  else if(R.d.song&&!window.__nosong){try{m3(R.d.song)}catch(e){}}}
async function die(){var s2=D.R.boss&&D.R.boss.stage===2;if(D.dead)return;D.dead=true;talking=true;m3("over",true);D.cine=null;D.ors=[];D.hz=[];
  var st=document.getElementById("stage"),old=document.getElementById("go3");if(old)old.remove();
  if(!document.getElementById("go3css")){var cs=document.createElement("style");cs.id="go3css";cs.textContent="#go3{position:absolute;inset:0;z-index:40;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:16px;text-align:center;background:radial-gradient(ellipse at 50% 40%,#3a0612cc 0,#0a0108f2 75%);animation:go3in 1.2s ease both}@keyframes go3in{from{opacity:0}to{opacity:1}}#go3 .gl{display:flex;gap:2px;justify-content:center;flex-wrap:wrap}#go3 .gl i{font:400 clamp(2.4rem,13vw,3.6rem)/1 Bungee,Impact,sans-serif;font-style:normal;color:#ff3d57;text-shadow:0 0 18px #ff3d57aa,0 5px 0 #5a0a1c;display:inline-block;opacity:0;animation:go3d .7s cubic-bezier(.2,1.6,.4,1) forwards}@keyframes go3d{from{opacity:0;transform:translateY(-60px) scale(1.6) rotate(-8deg)}to{opacity:1;transform:none}}#go3 .gw{height:14px}#go3 p{margin:0;color:#ffd9e0;font-weight:700}#go3 .gh{font-size:1.5rem;letter-spacing:.3em;color:#7a2a3a;animation:go3p 2s ease-in-out infinite}@keyframes go3p{50%{color:#ff4d6d}}#go3 .gb{opacity:0;animation:go3in .8s 1.9s both;display:flex;flex-direction:column;gap:8px;align-items:center;margin-top:8px}#go3 .gr{font:400 1.15rem Bungee,sans-serif;background:#ff3d57;color:#fff;border:0;border-radius:14px;padding:12px 30px;box-shadow:0 4px 0 #8a1328;cursor:pointer}#go3 .gg{font:800 .95rem Figtree,sans-serif;background:none;color:#e8b8c4;border:2px solid #7a2a3a;border-radius:12px;padding:8px 20px;cursor:pointer}";document.head.appendChild(cs)}
  var d=document.createElement("div");d.id="go3";var L="GAME OVER",h="";for(var k=0;k<L.length;k++)h+=L[k]===" "?'<span class="gw" style="width:14px"></span>':'<i style="animation-delay:'+(.35+k*.1)+'s">'+L[k]+'</i>';
  d.innerHTML='<div class="gh">♡ ♡ ♡ ♡ ♡ ♡</div><div class="gl">'+h+'</div><p>'+(s2?"Umbra's second form was too much.":D.R.boss?"Umbra stands over the dark.":"The shadows closed in.")+'</p><p style="font-size:.85rem;opacity:.75">'+(RM[D.ri]?RM[D.ri].name:"")+" · Room "+(D.ri+1)+'</p><div class="gb"><button class="gr" id="go3r" type="button">Retry</button><button class="gg" id="go3g" type="button">Give up</button></div>';
  d.addEventListener("pointerdown",function(e){e.stopPropagation()});(st||document.body).appendChild(d);
  try{sfx("hurt")}catch(e){}
  $("go3r").onclick=function(){d.remove();retry(s2)};
  $("go3g").onclick=function(){d.remove();try{stopSong(true,true)}catch(e){}location.reload()}}
function retry(s2){
  talking=false;D.hp=12;D.dead=false;var i=D.ri;D.st[i]=null;D.keys=0;
  D.st[i]=mkRoom(i,false);D.R=D.st[i];D.R.first=false;D.ors=[];D.hz=[];D.cine=null;D.bond=s2?100:0;if(s2&&D.R.boss)setStage2(D.R.boss);buildBg(D.R);var a=D.h[D.act],b=D.h[1-D.act];a.x=4.5*TS;a.y=10.4*TS;b.x=a.x+16;b.y=a.y+4;D.h[0].inv=D.h[1].inv=1.5;m3(RM[i].lock==="boss"?bossKey():RM[i].song)}
async function finale(){try{albumAdd("c3_finale")}catch(x){}
  talking=true;D.fade=.9;sfx("open");m3("kh");
  try{var Rr=D.R;Rr.itm=Rr.itm.filter(function(i){return i.k!=="sun"});var h0=D.h[0],h1=D.h[1];h0.x=150;h0.y=236;h1.x=178;h1.y=238;h0.mv=0;h1.mv=0;h0.d=0;h1.d=0;D.cine={k:"lift",t:0,b:0,wa:0,wt:0}}catch(e){}
  await seq([["","Doodi lifts the Sunheart Crystal. It is warm, like holding a small piece of morning. Scratched into its base, tiny: an S."],
   ["Danoya","Look. The hum has stopped. It is singing instead."],
   ["Doodi","It is only warm because you are holding the other half of it with me."],
   ["Danoya","That was a very bad line. Say another one."],
   ["Doodi","Okay. Every dungeon, every dark room, every shadow king, I would walk into all of them. As long as it is next to you."],
   ["Danoya","Better. Much better. Come on. The light is waiting to go home."],
   ["","Light pours up through the hill. Across the valley, every lantern wakes at once. Far away, two time zones apart and finally together, the sun comes up."]]);
  try{celebrate("Chapter 3 complete!")}catch(e){}
  await new Promise(function(r){setTimeout(r,1800)});
  showOv('<h3>Chapter 3 · Complete 🌅</h3><p>You carried the Sunheart home, together.</p><p class="mini">The valley has never been this bright. Far to the north, under the shrine hill, something heard the light come home. And answered.</p><button class="big" id="c3e" type="button">Watch the ending ▶</button><button class="big" id="c3x" type="button" style="margin-top:8px">Back to the valley menu</button>');
  $("c3e").onclick=function(){hideOv();startED()};$("c3x").onclick=function(){location.href="index.html"};talking=false}
window.__dunStep=function(dt){
  if(!D.on)return;
  D.parts=D.parts.filter(function(p){p.x+=p.vx*dt;p.y+=p.vy*dt;p.l-=dt;return p.l>0});
  if(!(D.cine&&D.cine.k==="ult")&&D.h[1]&&D.h[1].fy)D.h[1].fy=0;
  if(D.cine){var cn=D.cine;cn.t+=dt;if(cn.b>0){cn.b+=dt;var bb2=D.R&&D.R.boss;if(bb2)for(var pi=0;pi<3;pi++)D.parts.push({x:bb2.x+(Math.random()-.5)*50,y:bb2.y+(Math.random()-.5)*50,vx:(Math.random()-.5)*30,vy:-40-Math.random()*60,l:1.1,c:Math.random()<.5?"#ffe27a":"#fff"})}cn.wa+=(cn.wt-cn.wa)*Math.min(1,dt*2.4);if(cn.k==="ult"){cn.dnY+=(cn.dnT-cn.dnY)*Math.min(1,dt*5);D.h[1].fy=cn.dnY;cn.beam+=(cn.bT-cn.beam)*Math.min(1,dt*7);cn.dark+=(cn.dT-cn.dark)*Math.min(1,dt*5);cn.glow+=(cn.gT-cn.glow)*Math.min(1,dt*5);if(cn.dtx!=null){var d0=D.h[0];d0.x+=(cn.dtx-d0.x)*Math.min(1,dt*9);d0.y+=(cn.dty-d0.y)*Math.min(1,dt*9);d0.mv=1}cn.sl.forEach(function(q){q.t-=dt})}}
  if(D.fade>0)D.fade-=dt;if(D.flash>0)D.flash-=dt;if(D.shake>0)D.shake-=dt;if(D.msgT>0)D.msgT-=dt;
  if(!talking&&!ui&&!D.trans&&!D.dead&&D.R){
    D.swcd=Math.max(0,D.swcd-dt);
    if(D.sw){D.sw.t-=dt;swordStep();if(D.sw.t<=0)D.sw=null}
    if(D.pc){D.pc.r+=dt*260;if(D.pc.r>=D.pc.max)D.pc=null}
    stepHeroes(dt);stepEnts(dt);stepRoom(dt);stepHz(dt);
    if(D.hp<=0&&!D.dead)die()}
  if(D.fn){D.fn.t+=dt;drawFN()}else if(D.ed){D.ed.clock+=dt;var edt=D.ed.clock;try{if(songEl&&!songEl.paused&&songEl.currentTime>.2)edt=songEl.currentTime}catch(e){}if(edt>=236||(songEl&&songEl.ended))edEnd();drawED()}
  else if(D.R)drawRoom();
  var hh=$("hhr");if(hh){var hs="";for(var hi=0;hi<6;hi++){var hv=D.hp-hi*2;hs+='<span style="color:'+(hv>=2?"#ff4d6d":hv===1?"#ff9db0":"#8a7a86")+'">'+(hv>=1?"♥":"♡")+"</span>"}hh.innerHTML=hs+' <small>'+(D.act===0?"Doodi":"Danoya")+(D.stay?" · stays":"")+" · "+(D.h[1].cd>0?"☀…":"☀")+"</small>"}var gl=$("goal");if(gl&&gl.textContent)gl.textContent="";var ub=$("bu");if(ub){var bs0=D.R&&D.R.boss&&!D.R.boss.dead;ub.style.display=bs0?"":"none";var rdy=D.bond>=100;ub.textContent=rdy?"ULT!":"Ult";ub.style.filter=rdy?"drop-shadow(0 0 8px #ffd34d)":"grayscale(.7)";ub.style.color=rdy?"#ffe27a":""}var hd=$("hday");if(hd)hd.textContent="Ch 3";var ht=$("htime");if(ht)ht.textContent=D.R?D.R.d.name:"";var hc=$("hcoin");if(hc)hc.textContent="🗝 "+D.keys}
try{["mm3","lost","metaphor","dungeon","winners","xzero","omega","before"].forEach(function(k,i){setTimeout(function(){if(TRK[k])fetch(TRK[k]).catch(function(){})},i*1500)})}catch(e){}
window.__d3start=async function(ri,fresh_){
  try{if(!S)S=fresh()}catch(e){S=fresh()}S.sfx=true;
  D.on=true;window.__dunOn=true;m3(ri>0||window.__onlyFuneral?null:"lost");started=false;D.max=0;D.maxStart=ri||0;D.st=[];D.hp=12;D.keys=0;D.act=0;ARMOR=!(ri===0&&fresh_);D.stay=false;D.done=false;mkHeroes();
  var ctl=document.querySelector(".ab");if(ctl&&!document.getElementById("bs")){var s=document.createElement("button");s.id="bs";s.type="button";s.className="b";s.textContent="Stay";s.addEventListener("pointerdown",function(e){e.preventDefault();toggleStay()});ctl.insertBefore(s,ctl.firstChild)}if(!document.getElementById("ab3")){var st=document.createElement("style");st.id="ab3";st.textContent=".ab{display:grid!important;grid-template-columns:auto auto auto;grid-template-rows:auto auto;gap:8px 12px;align-items:center;justify-items:center}#bs{grid-column:1;grid-row:1}#bb{grid-column:2;grid-row:1}#bx{grid-column:1;grid-row:2}#bu{grid-column:2;grid-row:2}#ba{grid-column:3;grid-row:1/3}";document.head.appendChild(st)}if(ctl&&!document.getElementById("bu")){var u=document.createElement("button");u.id="bu";u.type="button";u.className="b";u.textContent="Ult";u.style.display="none";u.addEventListener("pointerdown",function(e){e.preventDefault();ultimate()});ctl.appendChild(u)}if(ctl&&!document.getElementById("bx")){var x=document.createElement("button");x.id="bx";x.type="button";x.className="b";x.textContent="X";x.title="Reset room";x.addEventListener("pointerdown",function(e){e.preventDefault();resetRoom()});ctl.insertBefore(x,ctl.firstChild)}
  var bb=document.getElementById("bb");if(bb)bb.textContent="Swap";
  var mini=document.querySelector(".mini[style*='center']");if(mini)mini.textContent="Arrows/WASD walk · Space = attack / lantern · Q = swap hero · F = stay/follow · X = reset room · E = ultimate (boss)";
  D.max=ri||0;
  if(ri>0){for(var i=0;i<ri;i++)D.st[i]=mkRoom(i,true)}
  D.ri=ri||0;
  if(!D.st[D.ri])D.st[D.ri]=mkRoom(D.ri,false);D.R=D.st[D.ri];buildBg(D.R);
  var a=D.h[0],b=D.h[1];a.x=4.5*TS;a.y=9.5*TS;b.x=5.5*TS;b.y=9.9*TS;
  if(ri===0&&fresh_){talking=true;FNS=D.fn={t:0,lit:0,fade:1};try{if(!window.__nosong){C3K=null;if(window.__skipFuneral)m3(D.R.d.song);else m3("gustave");var pu=TRK[D.R.d.song];if(pu){window.__pre3=new Audio(pu);window.__pre3.preload="auto";window.__pre3.volume=0;window.__pre3.load()}}}catch(e){}if(!window.__skipFuneral)await seq([["","Chapter 3 · Below the Valley"],["","It has been a season since the sunflower fields and the last ferry. Doodi and Danoya have a cabin, a koi named after her, and a valley that glows a little less every night. And Mira, who fed the whole valley, did not see the first frost. She asked the valley to eat before it cried. The valley is about to try."]]);
  if(window.__skipFuneral){D.fn=null;FNS=null}else await funeral();if(window.__onlyFuneral){talking=false;return}
  talking=true;await seq([["","The valley goes home with lantern light still on its hands. Mira's stall stays shut. Tobi sits outside it anyway, not hungry. Biscuit has stopped chasing pigeons, and everyone says it's the season. But since the Southern Gate opened, the lamps on the south road have gone out one by one, and every night the hum from underneath gets louder. The crystal the Keepers called their sun is dying down there, and the valley is dying with it."],["Danoya","I keep dreaming about a crystal. A big one, gone dark. And a voice saying that the quiet is better than the light."],["Doodi","Then we go find it. Together. I will bring snacks and a sword."],["Danoya","You already own a sword?"],["Doodi","Mr. Rocket sold me a really nice stick. I am calling it a sword."],["Judy","(from far away, carried by the wind) DO NOT DIE, ROMEO! DAN SAYS GOOD LUCK, MAN!"],["Judy","WAIT. STOP. YOU ARE NOT GOING DOWN THERE IN COTTON!"]]);
  D.gv=[{t:"gv",sp:VSPEC.dan,x:100,y:430,d:0,mv:0,bundle:1},{t:"gv",sp:VSPEC.judy,x:190,y:416,d:0,mv:0,bundle:1}];var dg=D.gv[0],jg=D.gv[1];
  await Promise.all([gwalk(dg,112,340,125),gwalk(jg,184,338,125)]);dg.d=0;jg.d=0;
  await seq([["","Judy and Dan skid to a stop at the Southern Gate, out of breath, arms full of bundles wrapped in old festival banners."],["Dan","Mr. Rocket forged the plates. Wren sewed the lining. It is armour, the real kind. It even has your colours on it."],["Danoya","...You made us matching armour."],["Judy","We made you matching armour. Put it on before I cry on it."]]);
  await Promise.all([gwalk(dg,D.h[0].x-22,D.h[0].y+6,80),gwalk(jg,D.h[1].x+22,D.h[1].y+6,80)]);dg.d=1;jg.d=3;
  await sleep(250);dg.bundle=0;jg.bundle=0;ARMOR=true;D.fade=.9;sfx("key");sfx("open");puff(D.h[0].x,D.h[0].y-10,"#ffe27a");puff(D.h[1].x,D.h[1].y-10,"#ffe27a");
  await seq([["Doodi","Okay. I look incredible. Danoya, you look incredible. Nobody is dying today."],["Judy","Good. Now listen, both of you. Nobody had opened that gate since the Storm until you two did, and since that night the whole valley has been dreaming the same hum."],["Dan","We would come with you. We would. But somebody has to keep the valley warm, and somebody has to stop Mr. Rocket selling the next hero another stick."],["Dan","(glancing at the stairs) Also, and I say this with love, that is a very long way down. I'd take one step, look down, and that would be the end of Dan. I do not do heights. Or depths. Anything with a lot of between."],["Doodi","You're not wrong. It is a lot of between."],["Judy","Hesper says the crystal has an old Keeper's name: the Sunheart. It kept every lantern in this valley lit until it went dark."],["Judy","The light listens to you two. It always has. Find the Sunheart. Bring it home."],["Judy","And bring yourselves home. That is the real task. Understood?"],["Judy","And Danoya. If you hear anything down there, anything at all, even if it sounds silly, you tell me when you're back."],["Danoya","I will."],["Danoya","Understood. Armour on. Lantern lit. Judy, Dan, thank you. We will bring the light home."],["Dan","Go. We will keep the valley warm."]]);
  dg.d=2;jg.d=2;await Promise.all([gwalk(dg,dg.x-8,440,95),gwalk(jg,jg.x+8,430,95)]);D.gv=null;
  await seq([["Doodi","...She cried on the armour a little. I saw it."],["Danoya","Down we go."]]);talking=false}
  if(D.R.first&&D.R.d.intro&&!window.__skipIntro){D.R.first=false;talking=true;try{if(D.R.d.song&&!window.__nosong)m3(isBR(D.R)?null:D.R.d.song)}catch(e){}for(var k=0;k<D.R.d.intro.length;k++)await say(D.R.d.intro[k][0],D.R.d.intro[k][1]);talking=false;if(isBR(D.R)){try{if(!window.__nosong)m3(D.R.d.song)}catch(e){}}}
  else{try{if(D.R.d.song&&!window.__nosong&&!window.__m3q)m3(D.R.d.song)}catch(e){}}}
/* ===== Chapter 3 opening: Mira's farewell on the South Green ===== */
var FNS=null;
function drawFN(){
  var E=FNS,t=E.t;cx.fillStyle="#000";cx.fillRect(0,0,320,384);
  cx.save();cx.beginPath();cx.rect(0,72,320,240);cx.clip();cx.translate(0,72);
  edSky("#2b2554","#e39a68");edStars(.55);edHills(148,9,"#3d3a6a",0,.03);edHills(166,7,"#2b4a44",40,.045);
  cx.fillStyle="#2f5d3a";cx.fillRect(0,170,320,70);cx.fillStyle="#27503a";for(var gi=0;gi<24;gi++)cx.fillRect((gi*37)%316,178+(gi*13)%56,9,2);
  cx.strokeStyle="#5a4a3a";cx.lineWidth=1;cx.beginPath();cx.moveTo(0,44);for(var li=0;li<=10;li++)cx.lineTo(li*32,44+Math.sin(li*1.05)*5+4);cx.stroke();
  for(var lj=0;lj<=10;lj++){var lx=lj*32,ly=48+Math.sin(lj*1.05)*5,fl=.55+.2*Math.sin(t*3+lj);edGlow(lx,ly+4,16,"rgba(255,196,110,1)",fl);R(lx-3,ly,6,8,"#ffd89a");R(lx-3,ly,6,1,"#7a4a2a")}
  R(48,170,224,4,"#d9c9a8");R(48,174,224,8,"#6a4326");R(54,182,5,18,"#4a2f1a");R(262,182,5,18,"#4a2f1a");
  for(var bi=0;bi<8;bi++){var bx=64+bi*26;R(bx,166,10,5,"#e8e0d0");R(bx+1,165,8,1,"#b0a898");var sy=160-((t*10+bi*7)%14);cx.globalAlpha=.35;R(bx+4+Math.sin(t*2+bi)*1.5,sy,2,2,"#fff");cx.globalAlpha=1}
  if(E.pet){R(266,160,2,4,"#3f7a3a");R(270,158,2,6,"#3f7a3a");R(264,156,5,4,"#c05a9a");R(269,154,5,4,"#d878b4");R(272,158,4,4,"#a0488a")}R(278,178,14,5,"#8a5a2a");R(278,164,3,16,"#8a5a2a");R(289,164,3,16,"#8a5a2a");R(278,164,14,3,"#8a5a2a");
  R(283,170,6,5,"#fff3dc");cx.globalAlpha=.4;R(285+Math.sin(t*2)*1.5,164-((t*9)%12),2,2,"#fff");cx.globalAlpha=1;
  var lk=E.lit;R(158,150,10,14,"#e8d9b8");R(158,150,10,1,"#7a5a3a");R(158,163,10,1,"#7a5a3a");if(lk>0)edGlow(163,157,34,"rgba(255,214,140,1)",.75*lk);
  var F=[["hesper",70,208,1.25,2],["pim",125,208,1.25,2],["nell",180,208,1.25,2],["tobi",235,210,1.05,2],["ferris",290,208,1.25,2],["doodi",36,238,1.4,1],["danoya",90,238,1.4,1],["wren",146,238,1.4,1],["judy",214,238,1.4,3],["dan",268,238,1.4,3]];
  for(var fi=0;fi<F.length;fi++){var f=F[fi],by=Math.sin(t*1.4+fi)*.7;if(f[0]==="doodi"||f[0]==="danoya")edHero(f[0],f[1],f[2]+by,f[3],f[4],0);else edVil(VSPEC[f[0]],f[1],f[2]+by,f[3],f[4],0)}
  try{drawDog(200,222,true)}catch(e){}
  cx.fillStyle="rgba(12,8,36,.18)";cx.fillRect(0,0,320,240);
  cx.restore();
  edTx("MIRA",160,46,11,"#ffd9a0",Math.min(1,t*.8),"center");cx.fillStyle="#ffd9a066";cx.fillRect(130,58,60,1);
  if(E.fade>0){cx.fillStyle="rgba(0,0,0,"+Math.min(1,E.fade)+")";cx.fillRect(0,0,320,384)}}
async function fnFade(to,ms){var n=18;for(var i=0;i<n;i++){FNS.fade+=(to-FNS.fade)/(n-i);await sleep(ms/n)}FNS.fade=to}
async function funeral(){try{albumAdd("c3_funeral")}catch(x){}
  if(!FNS)FNS=D.fn={t:0,lit:0,fade:1};talking=true;
  try{if(!window.__nosong){m3("gustave")}}catch(e){}
  await fnFade(0,1200);
  await seq([["","Evening on the South Green. The first frost has come early, and with it the day the valley was dreading. There is no coffin. Mira asked for a table."],["","A long table under the lantern branches, laid for the whole valley. At the far end one chair is drawn out and one cup is poured. Nobody sits in it."],
    ["Elder Hesper","Mira left me three instructions. A long table. A cup poured for her, after. And not one wise word from anybody until the soup is gone."],
    ["Baker Tom","(wiping his eyes on a flour sack) I over-salted it. On purpose. She'd have checked."],
    ["Robin","(Biscuit asleep across her boots) She'd say there isn't enough. She'd say it if there were forty pots."],
    ["Tobi","I'm not hungry."],["Doodi","(setting a bowl in front of him) That's fine. It's here if you are."],
    ["","Tobi holds the spoon. He doesn't lift it. Nobody tells him to."],
    ["Elder Hesper","Eat, all of you. Then we cry. In that order. She was very firm about the order."],
    ["Captain Ferris","(arriving with a basket of rolls, for once not telling a story) She told me every week I wasn't eating. Every week, for years. I'd like it noted that I am eating."],
    ["Baker Tom","Noted."],
    ["","The valley eats. It takes a long time and nobody talks, and it is the most honest meal the green has ever seen."],
    ["Elder Hesper","Now the cup. She asked me to pour it once. After."],
    ["","Hesper tops the cup at the empty chair to the brim. The steam rises straight, then leans toward the north hill."],
    ["Elder Hesper","You don't ask who it's for. You only pour."],
    ["Danoya","She told us at the fire. Salt is how you tell somebody you were thinking about them."],
    ["Doodi","Then we have told her a great deal."],
    ["Dan","(low, to Judy) I never learned how to do this part."],["Judy","(taking his sleeve) Nobody does. You just stand next to somebody."]]);
  FNS.pet=1;
  await seq([["","Wren comes last, out of breath from the hill, with a fistful of petunias still dirty at the roots. She doesn't make a speech. She doesn't sell anyone a tea. She sets the flowers beside the empty chair and stands there with her hands folded, and it is the loudest thing anyone does all evening."],
    ["Wren","(very bright, very steady) She said my petunias were a disgrace to the soil. She bought a whole row of them anyway."],
    ["Elder Hesper","Sit, Wren."],["Wren","In a minute. I'm being cheerful. It takes concentration."]]);
  await seq([["","Hesper brings out one lantern. Plain. The paper pale as weak tea, no writing, no ribbons. Mira made it at Lantern Night and would not write on it."],
    ["Elder Hesper","She said it was for somebody who knew what she was like. A promise to the living, not the loss. She didn't say who."],
    ["Tobi","(very small) I know what it says. I just can't spell it yet."],
    ["Elder Hesper","Then it waits. A lantern can wait. That is rather the point of them."]]);
  for(var k=0;k<20;k++){FNS.lit=Math.min(1,FNS.lit+.05);await sleep(60)}sfx("key");
  await seq([["","She lights it anyway. The flame takes, and holds, and leans, just slightly, toward the north hill. Hesper sees. She says nothing."],
    ["Baker Tom","It's too salty, isn't it."],["Tobi","(a long breath) It's always too salty."],["Baker Tom","Good."],
    ["","Danoya hums the three falling notes, very softly, because it is all she has. Nobody asks her to stop."]]);
  try{if(songEl)fadeTo(songEl,0,1200)}catch(e){}
  await fnFade(1,1200);D.fn=null;FNS=null;
  try{if(!window.__nosong&&!window.__onlyFuneral){C3K=null;m3(D.R.d.song)}}catch(e){}}
/* ===== Chapter 3 ending: anime-style ED set to "Last surprise" ===== */
var ED=null;
function mixc(a,b,k){k=Math.max(0,Math.min(1,k));function p(h,i){return parseInt(h.substr(1+i*2,2),16)}return "rgb("+[0,1,2].map(function(i){return Math.round(p(a,i)+(p(b,i)-p(a,i))*k)}).join(",")+")"}
function edSky(c0,c1){var g=cx.createLinearGradient(0,0,0,240);g.addColorStop(0,c0);g.addColorStop(1,c1);cx.fillStyle=g;cx.fillRect(0,0,320,240)}
function edHills(base,amp,col,off,fr){cx.fillStyle=col;cx.beginPath();cx.moveTo(0,240);for(var x=0;x<=320;x+=8)cx.lineTo(x,base-Math.sin((x+off)*fr)*amp-Math.sin((x+off)*fr*2.3)*amp*.4);cx.lineTo(320,240);cx.fill()}
function edStars(a){if(a<=0)return;for(var i=0;i<46;i++){cx.globalAlpha=Math.min(1,a)*(.35+.65*Math.abs(Math.sin(time*2+i)));R((i*67)%320,(i*29)%130,i%5?1:2,i%5?1:2,"#fff")}cx.globalAlpha=1}
function edGlow(x,y,r,c0,a){var g=cx.createRadialGradient(x,y,1,x,y,r);g.addColorStop(0,c0);g.addColorStop(1,"rgba(255,220,120,0)");cx.globalAlpha=a==null?1:a;cx.fillStyle=g;cx.fillRect(x-r,y-r,r*2,r*2);cx.globalAlpha=1}
function edSun(x,y,r){edGlow(x,y,r*3.2,"rgba(255,230,160,.8)",.8);cx.fillStyle="#fff1c4";cx.beginPath();cx.arc(x,y,r,0,7);cx.fill()}
function edPine(x,y,s,c){cx.fillStyle=c;for(var i=0;i<3;i++){cx.beginPath();cx.moveTo(x,y-34*s+i*9*s);cx.lineTo(x-(9+i*4)*s,y-14*s+i*9*s);cx.lineTo(x+(9+i*4)*s,y-14*s+i*9*s);cx.fill()}R(x-2*s,y-8*s,4*s,8*s,c)}
function edTx(s,x,y,sz,col,al,align){cx.save();cx.globalAlpha=al==null?1:Math.max(0,Math.min(1,al));cx.font="bold "+sz+"px sans-serif";var _mx=align==="center"?304:(align==="right"?x-8:312-x),_w=cx.measureText(s).width;if(_w>_mx&&_mx>40){sz=Math.max(6,Math.floor(sz*_mx/_w*10)/10);cx.font="bold "+sz+"px sans-serif"}cx.textAlign=align||"left";cx.textBaseline="middle";cx.fillStyle=col;cx.fillText(s,x,y);cx.restore()}
function edBig(fn,x,y,s){cx.save();cx.translate(x,y);cx.scale(s,s);fn();cx.restore()}
function edCard(name,sub,t,t0,len){var k=t-t0;if(k<0||k>len)return;var a=Math.min(1,k*3,(len-k)*3),e=1-Math.pow(1-Math.min(1,k*2.2),3),x=-170+e*184;cx.save();cx.globalAlpha=a;cx.fillStyle="#000a";cx.fillRect(x,190,156,34);cx.fillStyle="#ffd34d";cx.fillRect(x,190,3,34);cx.restore();edTx(name,x+10,201,12,"#fff",a);edTx(sub,x+10,215,8,"#ffe9b0",a)}
function edHero(who,x,y,s,d,f){edBig(function(){person(-16,-33,d,who,f,false)},x,y,s)}
function edVil(sp,x,y,s,d,f){edBig(function(){villager(-16,-33,d,f,sp,false)},x,y,s)}
function edHeart(x,y,k,c){cx.save();cx.globalAlpha=Math.max(0,1-k);cx.font="bold "+(10+k*6)+"px sans-serif";cx.textAlign="center";cx.fillStyle=c||"#ff6a8a";cx.fillText("♥",x,y-k*40);cx.restore()}
function edPetals(t,n,col){for(var i=0;i<n;i++){var x=((i*53+t*(18+i%5*4))%340)-10,y=((i*37+t*(22+i%4*5))%250)-5;cx.globalAlpha=.8;R(x+Math.sin(t*2+i)*6,y,3,2,col||"#ffc2d6")}cx.globalAlpha=1}

/* ---- scenes: (local time t, length w) drawn in a 320x240 window ---- */
function edA(t,w){var k=t/w;edSky(mixc("#070d26","#33336e",k),mixc("#2a1a4a","#ffa45c",k));edStars(1-k*1.3);edSun(160,236-k*86,22+k*8);
  edHills(188,10,"#1b2750",0,.02);edHills(206,12,"#121a38",40,.025);edHills(224,8,"#0a1026",90,.03);
  for(var i=0;i<14;i++){var lx=10+i*23,ly=214-Math.sin((lx+90)*.03)*9-Math.sin((lx+90)*.069)*3.6;if(t>1.5+i*.55){var a=Math.min(1,(t-1.5-i*.55)*2);edGlow(lx,ly,16,"rgba(255,210,120,.9)",a*.7);R(lx-1,ly-1,3,3,"#ffe9a8")}}}
function edB(t,w){edSky("#ffb27a","#ffe9b8");edSun(246,150,26);var sc=t*30;edHills(172,14,"#e5967a",sc*.2,.02);edHills(194,12,"#b86a5a",sc*.4,.025);
  for(var i=0;i<8;i++)edPine(((i*74-sc*.8)%592+592)%592-90,200,1.2,"#6a3f4c");
  cx.fillStyle="#6e4a3c";cx.fillRect(0,206,320,34);for(var j=0;j<12;j++)R(((j*40-sc*1.4)%480+480)%480-40,214+(j%3)*6,12,2,"#8c6a54");
  var f=Math.floor(t*4)%2?1:2,b=Math.abs(Math.sin(t*8))*1.6;ARMOR=true;edHero("doodi",126,208-b,2.2,1,f);edHero("danoya",190,208-b*.8,2.2,1,f);
  for(var q=0;q<14;q++){var fx=((q*47+t*9)%330),fy=120+((q*31)%80)+Math.sin(t*2+q)*8;edGlow(fx,fy,7,"rgba(255,240,150,.9)",.6+.4*Math.sin(t*4+q))}
  edCard("DOODI","the one with the sword",t,3,5);edCard("DANOYA","the one with the light",t,10,5);edPetals(t,16)}
var EDP=[
 function(t){cx.fillStyle="#1b1724";cx.fillRect(0,0,320,240);for(var y=0;y<240;y+=24)for(var x=((y/24)%2)*20;x<320;x+=40)R(x,y,38,22,"#241f30");var on=t>1.2,k=Math.min(1,Math.max(0,t-1.2)*1.4);R(152,124,16,36,"#4a3b30");R(148,120,24,6,"#6a5446");if(on){edGlow(160,112,40+k*90,"rgba(255,190,90,.95)",.85);R(154,100-k*4,12,22,"#ff9f1c");R(157,94-k*6,6,18,"#ffe27a")}else R(156,108,8,12,"#2a2020");cx.strokeStyle="rgba(255,236,170,"+Math.max(0,1-(t-.9)/1.4)+")";cx.lineWidth=3;cx.beginPath();cx.arc(70,170,Math.max(1,(t-.9)*80),0,7);cx.stroke();cx.lineWidth=1;ARMOR=true;edHero("danoya",70,200,2,0,0)},
 function(t){cx.fillStyle="#17142a";cx.fillRect(0,0,320,240);var cut=t>2.4;edGlow(160,130,70,"rgba(200,140,255,.9)",.55+.2*Math.sin(t*5));if(!cut||t<3){var n=cut?0:1;for(var i=0;i<14;i++){var a=i*.449+t*(.2),rr=26+(i%3)*10,vx=160+Math.cos(a)*rr,vy=130+Math.sin(a)*rr*.9;if(!cut||i<14-(t-2.4)*40)R(vx-4,vy-4,9,9,"#3f9e4a")}}
  cx.fillStyle="#b78bff";cx.beginPath();cx.moveTo(160,100);cx.lineTo(176,128);cx.lineTo(160,160);cx.lineTo(144,128);cx.fill();cx.fillStyle="#e8d6ff";cx.beginPath();cx.moveTo(160,106);cx.lineTo(168,128);cx.lineTo(160,146);cx.fill();
  if(t>2.2&&t<3.2){cx.strokeStyle="rgba(255,255,255,"+(1-(t-2.2))+")";cx.lineWidth=5;cx.beginPath();cx.moveTo(90,80);cx.lineTo(230,190);cx.stroke();cx.lineWidth=1}},
 function(t){cx.fillStyle="#1d1a26";cx.fillRect(0,0,320,240);for(var y=0;y<240;y+=32)for(var x=0;x<320;x+=32)R(x+1,y+1,30,30,"#262233");var bx=70+Math.min(1,t/3)*140,ok=t>3;R(212,150,36,12,"#3a3548");R(214,152,32,8,ok?"#ffd34d":"#5a5468");if(ok)edGlow(230,156,60,"rgba(255,226,120,.9)",.7);R(bx,122,38,38,"#9a6a3a");R(bx+2,124,34,34,"#b98a54");R(bx+16,124,6,34,"#7a4a26");R(bx,138,38,6,"#7a4a26")},
 function(t){cx.fillStyle="#14121f";cx.fillRect(0,0,320,240);var op=Math.min(1,Math.max(0,t-1.6)*.6);R(188,70,70,140,"#2c2638");R(196,80,54,130,"#0b0910");for(var i=0;i<6;i++)R(198+i*9,80-op*70,3,128,"#6a6a80");edGlow(60,140,50,"rgba(255,226,120,.9)",.6);var by=Math.sin(t*3)*5;cx.fillStyle="#ffd34d";cx.beginPath();cx.arc(60,138+by,9,0,7);cx.fill();R(66,141+by,28,5,"#ffd34d");R(86,146+by,5,9,"#ffd34d");R(77,146+by,5,6,"#ffd34d");cx.fillStyle="#14121f";cx.beginPath();cx.arc(60,138+by,4,0,7);cx.fill()},
 function(t){cx.fillStyle="#0f0c1a";cx.fillRect(0,0,320,240);edGlow(160,130,60,"rgba(255,200,110,.7)",.6);for(var i=0;i<5;i++){var bx=((i*90+t*60)%380)-30,by=60+i*26+Math.sin(t*5+i)*12,fl=Math.sin(t*22+i)>0?6:-2;cx.fillStyle="#6a4a9a";cx.beginPath();cx.moveTo(bx,by);cx.lineTo(bx-14,by-fl);cx.lineTo(bx-8,by+6);cx.lineTo(bx,by+3);cx.lineTo(bx+8,by+6);cx.lineTo(bx+14,by-fl);cx.fill();R(bx-3,by-3,6,7,"#2a1a4a");R(bx-2,by-1,2,2,"#ffe27a");R(bx+1,by-1,2,2,"#ffe27a")}},
 function(t){cx.fillStyle="#0e0c18";cx.fillRect(0,0,320,240);var r=Math.max(0,(t-.8)*90);cx.strokeStyle="rgba(255,236,170,"+Math.max(0,1-r/200)+")";cx.lineWidth=4;cx.beginPath();cx.arc(160,170,r,0,7);cx.stroke();cx.lineWidth=1;[[80,110],[160,90],[240,120]].forEach(function(p,i){var lit=r>dist(160,170,p[0],p[1]);edBig(function(){drawShade({x:0,y:0,lt:lit?1:0,fl:0})},p[0],p[1]+Math.sin(t*3+i)*3,3)})}];
function edC(t,w){var i=Math.min(5,Math.floor(t/5)),lt=t-i*5;cx.save();cx.translate(160,120);cx.scale(1+lt*.025,1+lt*.025);cx.translate(-160,-120);EDP[i](lt);cx.restore();
  var v=cx.createRadialGradient(160,120,90,160,120,200);v.addColorStop(0,"rgba(0,0,0,0)");v.addColorStop(1,"rgba(0,0,0,.65)");cx.fillStyle=v;cx.fillRect(0,0,320,240);if(lt<.25){cx.fillStyle="rgba(255,255,255,"+(1-lt*4)+")";cx.fillRect(0,0,320,240)}
  edTx(["Light the torch","Cut the vines","Push the block","Find the key","Mind the bats","Chase the shades"][i],12,226,10,"#ffe9b0",Math.min(1,lt*3))}
function edD(t,w){edSky("#bfe6ff","#fff3d6");edHills(156,12,"#9fd48a",t*4,.02);edHills(176,10,"#7cc06c",t*9,.025);cx.fillStyle="#6cae5c";cx.fillRect(0,196,320,44);cx.fillStyle="#d6b98a";cx.fillRect(0,206,320,22);
  var f=Math.floor(t*4)%2?1:2,keep=ARMOR;ARMOR=false;var oldDay=S&&S.day;
  for(var i=0;i<10;i++){var x=-40-i*60+t*31;if(x<-60||x>380)continue;S.day=i+1;edHero("danoya",x,222,1.7,1,f);var o=OUTFITS[i],a=Math.max(0,1-Math.abs(x-160)/70);if(a>0){cx.save();cx.globalAlpha=a;cx.fillStyle="#000a";cx.fillRect(160-70,20,140,30);cx.restore();edTx(o.e+" "+o.n,160,35,11,"#fff",a,"center")}}
  var dx=-40-10*60+t*31;edHero("doodi",dx,222,1.7,1,f);R(dx-20,196,10,10,"#c0504d");R(dx-30,200,10,10,"#4d7cc0");R(dx-12,194,8,8,"#e0b53a");
  if(S&&oldDay)S.day=oldDay;ARMOR=true;edPetals(t,10,"#ffffff");edTx("Doodi carries the bags.",160,134,9,"#4a3a2a",Math.min(1,Math.max(0,(t-14)*2))*Math.max(0,1-(t-24)*2),"center")}
function edE(t,w){edSky("#2a1a5a","#ff9a5c");edStars(.6);edSun(70,168,16);edHills(190,10,"#3a2250",0,.02);cx.fillStyle="#2c183c";cx.fillRect(0,196,320,44);
  for(var i=0;i<4;i++){var tt=(t*.8+i*1.9)%7.6,fx=40+((i*83)%240),fy=70+((i*37)%40),k=tt/2.6;if(tt<2.6){for(var j=0;j<14;j++){var a=j*.449;cx.globalAlpha=1-k;R(fx+Math.cos(a)*k*38,fy+Math.sin(a)*k*38+k*k*14,2,2,["#ffd34d","#ff6a8a","#7be0ff","#fff"][(i+j)%4])}cx.globalAlpha=1}}
  var V=[[VSPEC.judy,"Judy","the loudest cheerleader"],[VSPEC.dan,"Dan","keeping the valley warm"],[VSPEC.rocket,"Mr. Rocket","forged the armour"],[VSPEC.wren,"Wren","sewed the lining"],[VSPEC.ferris,"Ferris","caught the last ferry"]];
  for(var q=0;q<5;q++){edVil(V[q][0],40+q*60,214,1.7,2,(Math.floor(t*3+q)%2)?1:0)}
  var k=Math.min(4,Math.floor(t/6));edCard(V[k][1],V[k][2],t,k*6+.2,5.6)}
function edF(t,w){cx.fillStyle="#0a0814";cx.fillRect(0,0,320,240);var k=Math.max(0,Math.min(1,(t-8)/12));edGlow(60,200,40+k*180,"rgba(255,200,110,.9)",.25+k*.6);
  var al=Math.max(0,1-Math.max(0,t-22)/6);var ue={x:0,y:0,exp:0,fl:0,stage:1,ph:1,al:al,dsh:null,dead:0,tint:k};cx.save();cx.translate(190,128);cx.scale(1.7,1.7);if(t>20){var rr=Math.min(1,(t-20)/8);cx.globalAlpha=1}drawBoss(ue);cx.restore();
  if(t>8){cx.fillStyle="rgba(255,236,170,"+k*.35*al+")";cx.fillRect(130,60,120,140)}
  if(t>21)for(var i=0;i<16;i++){var m=(t*30+i*19)%110;cx.globalAlpha=Math.max(0,1-m/110);R(170+((i*37)%50),170-m,2,2,"#ffe27a")}cx.globalAlpha=1;ARMOR=true;edHero("danoya",50,224,1.6,1,0);edGlow(74,205,20,"rgba(255,220,120,.9)",.9);
  edTx("Even shadows were once someone's quiet.",160,36,10,"#ffe9b0",Math.min(1,Math.max(0,(t-3)*.8))*Math.max(0,1-(t-26)),"center")}
function edG(t,w){edSky("#050a22","#1c2250");edStars(1);var sx=((t*40)%240)+40;if(t%6<1.4){cx.strokeStyle="rgba(255,255,255,.8)";cx.beginPath();cx.moveTo(sx,20+(t%6)*30);cx.lineTo(sx-30,12+(t%6)*30);cx.stroke()}edSun(262,48,10);edHills(200,8,"#0c1230",0,.03);cx.fillStyle="#0a0e24";cx.fillRect(0,206,320,34);
  R(190,124,100,70,"#3a2a2a");cx.fillStyle="#552e32";cx.beginPath();cx.moveTo(180,126);cx.lineTo(240,92);cx.lineTo(300,126);cx.fill();R(210,146,22,24,"#ffd27a");edGlow(221,158,50,"rgba(255,210,120,.8)",.6);R(252,150,22,44,"#2a1c1c");
  for(var i=0;i<9;i++){var lx=20+i*34,ly=118+Math.sin(i*1.3)*7;edGlow(lx,ly,14,"rgba(255,210,120,.9)",.55+.2*Math.sin(t*3+i));R(lx-1,ly-1,3,3,"#fff2c0")}R(0,214,320,3,"#2a1c1c");
  ARMOR=false;S.day=1;cx.save();edBig(function(){person(-16,-30,1,"doodi",0,true)},108,206,2.1);S.day=7;edBig(function(){person(-16,-30,1,"danoya",0,true)},150,206,2.1);cx.restore();S.day=1;ARMOR=true;
  for(var h=0;h<4;h++)edHeart(129+(h%2)*8,176,((t*.35+h*.25)%1));edTx("Every dark room. Every shadow king.",160,22,10,"#cfd8ff",Math.min(1,(t-1)*.8),"center")}
function edH(t,w){var k=Math.min(1,t/w);edSky(mixc("#ffb86a","#ffd9a0",k),mixc("#ff7a8a","#fff0c8",k));cx.save();cx.translate(160,150);cx.rotate(t*.1);for(var i=0;i<14;i++){cx.fillStyle="rgba(255,244,200,.22)";cx.beginPath();cx.moveTo(0,0);cx.lineTo(Math.cos(i*.449-.1)*300,Math.sin(i*.449-.1)*300);cx.lineTo(Math.cos(i*.449+.1)*300,Math.sin(i*.449+.1)*300);cx.fill()}cx.restore();edSun(160,150,34);
  edHills(196,16,"#e2896a",0,.018);cx.fillStyle="#7a4a52";cx.beginPath();cx.moveTo(0,240);cx.lineTo(0,206);cx.quadraticCurveTo(160,168,320,206);cx.lineTo(320,240);cx.fill();
  cx.save();cx.fillStyle="#2a1830";cx.globalAlpha=1;
  var f=0;ARMOR=true;cx.filter="brightness(.18)";edHero("doodi",138,196,2.3,0,f);edHero("danoya",182,196,2.3,0,f);cx.filter="none";cx.restore();
  edGlow(160,164,34+Math.sin(t*3)*4,"rgba(255,244,190,.95)",.9);cx.fillStyle="#fff7c8";cx.beginPath();cx.moveTo(160,152);cx.lineTo(166,164);cx.lineTo(160,176);cx.lineTo(154,164);cx.fill();edPetals(t,20);
  edTx("Thank you for playing",160,30,14,"#5a2e3e",Math.min(1,Math.max(0,(t-4)*.7)),"center")}
function edI(t,w){cx.fillStyle="#08060f";cx.fillRect(0,0,320,240);var a=Math.min(1,t*.8)*Math.max(0,1-Math.max(0,t-8.5)*1.5);edTx("DANOYA VALLEY",160,96,22,"#ffd9a0",a,"center");edTx("Chapter 3 · Below the Valley",160,122,10,"#ffb3c4",a,"center");edTx("made with love, for Danoya",160,160,11,"#fff",Math.min(1,Math.max(0,(t-2)*.8))*Math.max(0,1-Math.max(0,t-8.5)*1.5),"center");for(var i=0;i<5;i++)edHeart(130+i*15,190,((t*.4+i*.2)%1),"#ff6a8a")}
var EDS=[[0,14,"DAWN",edA],[14,40,"THE WAY HOME",edB],[40,70,"BELOW THE VALLEY",edC],[70,100,"A FASHION PARADE",edD],[100,130,"THE VALLEY CHEERS",edE],[130,160,"UMBRA'S QUIET",edF],[160,195,"THE PORCH",edG],[195,225,"SUNRISE",edH],[225,240,"",edI]];
var EDC=["Danoya Valley · Chapter 3","Starring Doodi and Danoya","With Judy · Dan · Mr. Rocket · Wren · Ferris · and the whole valley","Villain · Umbra, who only wanted quiet","Armour by Mr. Rocket, lining by Wren","Music · Last surprise","A game made for Danoya, by Doodi"];
function drawED(){var E=ED;cx.fillStyle="#000";cx.fillRect(0,0,320,384);var t=E.clock;try{if(songEl&&!songEl.paused&&songEl.currentTime>.2)t=songEl.currentTime}catch(e){}E.t=t;
  var sc=null;for(var i=0;i<EDS.length;i++)if(t>=EDS[i][0]&&t<EDS[i][1]){sc=EDS[i];break}if(!sc&&t>=EDS[EDS.length-1][1])sc=EDS[EDS.length-1];
  if(sc){var lt=Math.max(0,t-sc[0]),w=sc[1]-sc[0];cx.save();cx.beginPath();cx.rect(0,72,320,240);cx.clip();cx.translate(0,72);try{sc[3](Math.min(lt,w),w)}catch(e){}
    var fa=Math.max(0,1-lt*1.4);if(fa>0){cx.fillStyle="rgba(0,0,0,"+fa+")";cx.fillRect(0,0,320,240)}var fb=Math.max(0,1-(w-lt)*1.8);if(fb>0&&sc[2]){cx.fillStyle="rgba(0,0,0,"+fb+")";cx.fillRect(0,0,320,240)}cx.restore();
    edTx(sc[2],160,46,10,"#ffd9a0",Math.min(1,lt*1.2),"center");cx.fillStyle="#ffd9a066";cx.fillRect(110,58,100,1)}
  var ci=Math.floor(t/9)%EDC.length,cl=t%9;edTx(EDC[ci],160,338,11,"#fff",Math.min(1,cl*1.5,(9-cl)*1.5),"center");
  cx.fillStyle="#ffffff22";cx.fillRect(40,362,240,2);cx.fillStyle="#ffd34d";cx.fillRect(40,362,240*Math.min(1,t/236),2);
  if(E.end){}}
function edEnd(){if(!ED||ED.shown)return;ED.shown=true;var sk=document.getElementById("edskip");if(sk)sk.remove();if(window.__cutprev){cutExit(true);return}showOv('<h3>The End 🌅</h3><p>Thank you for playing, Danoya.</p><p class="mini">Far to the north, under the shrine hill, something heard the light come home. And answered.</p><button class="big" id="c3r" type="button">Watch the ending again</button><button class="big" id="c3x" type="button" style="margin-top:8px">Back to the valley menu</button>');
  $("c3r").onclick=function(){hideOv();startED()};$("c3x").onclick=function(){location.href="index.html"}}
function startED(){D.ed=ED={clock:0,t:0,shown:false};ARMOR=true;talking=true;D.cine=null;try{if(!S)S=fresh()}catch(e){S=fresh()}if(!S.day)S.day=1;
  if(window.__nosong){}else{C3K=null;m3("last",false)}
  var b=document.createElement("button");b.id="edskip";b.type="button";b.textContent="Skip ▶▶";b.style.cssText="position:fixed;top:max(10px,env(safe-area-inset-top,0px));right:max(10px,env(safe-area-inset-right,0px));z-index:9999;padding:8px 14px;border-radius:99px;border:2px solid #fff8;background:#000a;color:#fff;font:700 14px sans-serif";b.onclick=function(){ED.clock=239;try{stopSong(true,true)}catch(e){}edEnd()};document.body.appendChild(b)}
window.__ed={start:function(){startED()},set:function(t){if(!ED)startED();ED.clock=t;if(window.__nosong)ED.fixed=1}};

window.__cut3=async function(id){
  window.__cutprev=1;try{if(!S)S=fresh()}catch(e){S=fresh()}
  var rix=function(n){for(var q=0;q<RM.length;q++)if(RM[q].name===n)return q;return 0};var rooms={r1:rix("The Southern Gate"),r10:rix("The Resting Spring"),r13:rix("The Stone Sentinel"),rw:rix("The Written Wall"),r21:rix("Quiet Chamber"),r22:rix("The Hollow Throne")};
  if(id==="carve"){window.__skipIntro=1;await window.__d3start(rooms.r13);window.__skipIntro=0;D.R.ent=[];D.R.open=true;D.R.carved=1;await carveScene();await sleep(1500);return}
  if(id==="funeral"){window.__onlyFuneral=1;await window.__d3start(0,true);window.__onlyFuneral=0;return}
  if(id==="prologue"){window.__skipFuneral=1;await window.__d3start(0,true);window.__skipFuneral=0;return}
  if(rooms[id]!==undefined){await window.__d3start(rooms[id]);return}
  window.__skipIntro=1;window.__m3q=(id==="boss2")?0:1;await window.__d3start(RM.length-1);window.__skipIntro=0;window.__m3q=0;var b=D.R&&D.R.boss;
  if(id==="boss2"&&b)await toStage2(b);
  else if(id==="die"&&b){setStage2(b);m3("omega");await bossDie(b)}
  else if(id==="finale"){if(b){b.dead=.001;b.hp=0;b.exp=0;b.dsh=null}D.ors=[];D.hz=[];D.R.ent=[];D.R.boss=null;D.R.crystal=1;D.cine=null;D.fade=0;await finale()}
  else if(id==="ed"){startED();await new Promise(function(){})}};
(function(){var f=window.__cut3;window.__cut3=async function(id){window.__cutId=id;try{await f(id)}catch(e){try{console.error(e)}catch(x){}}await cutExit(true)}})();
})();
