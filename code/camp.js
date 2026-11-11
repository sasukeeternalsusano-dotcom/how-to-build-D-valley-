/* ---------- the fire on the South Green: Hesper's story night (Chapter 1) and her lantern night (Chapter 2) ---------- */
var CAMPX=40,CAMPY=72;
function campLit(){return S&&S.day>=2&&S.min>=19*60&&S.min<24*60}
async function campFire(){
  if(S.day<2){await say("",CH2?"A ring of stones, a stack of dry logs, and a table folded flat against a tree. Someone is planning something with their hands.":"A ring of stones and a stack of dry logs. Someone has been preparing this for a while.");return}
  if(S.seen.camp){await say("","The embers are still warm. Somebody has left a cup by the stones, filled to the brim, untouched.");return}
  if(S.min<19*60){await say("","Cold stones, stacked logs. A note pinned under one: 'After seven. "+(CH2?"Bring steady hands.":"Bring something to sit on.")+" — H.'");return}
  if(S.min>=23*60+30){await say("","The fire is down to embers. Everyone has gone home, and the benches are still warm.");return}
  await startCamp()}
async function startCamp(){
  if(S.seen.camp)return;talking=true;setDate(true);
  await fadeOut();
  var fx=CAMPX,fy=CAMPY;P.x=P.tx=fx-1;P.y=P.ty=fy+2;P.px=P.x*T;P.py=P.y*T;P.mv=0;P.d=0;
  N.x=N.tx=fx+1;N.y=N.ty=fy+2;N.px=N.x*T;N.py=N.y*T;N.mv=0;N.path=[];N.d=0;N.away=false;N.hold=true;
  setupScene("camp","camp");
  await fadeIn();
  await (CH2?campCh2():campCh1());
  stopSong(true,true);setDate(false);
  S.seen.camp=1;try{albumAdd("c"+(CH2?2:1)+"_camp")}catch(x){}S.coins+=120;S.totalCoins+=120;addFP(40);
  await lovelyOv(CH2?"🏮 Lantern Night":"🔥 The Fire on the South Green",CH2?"The valley made lanterns again, and every flame leaned toward the Southern Gate.<br><br><b>+🪙120 · +💗</b>":"Everyone came. Hesper told the story, and the valley added its own.<br><br><b>+🪙120 · +💗</b>","Back to the valley");
  await fadeOut();endScene();N.hold=false;N.goal=null;N.path=[];N.emote=null;S.min=Math.min(Math.max(1439,S.min),Math.max(S.min,22*60)+90);paintHud();await fadeIn();
  celebrate(CH2?"Lantern night!":"Story night!");sfxPlay("chime");talking=false;save()}
async function campCh1(){
  await seq([["","Evening on the South Green. Someone has built a fire in the ring of stones, and the whole valley has come to sit around it. Nobody was invited. Everyone brought something."],
   ["","Baker Tom has bread under his arm. Mira has a pot far too big for one fire. Tobi is closer to the flames than anyone, pretending he isn't. Robin sits with Biscuit asleep across her boots, and Ralph has come from the far side of the forest with a single candle, as if he didn't trust the fire to be enough."],
   ["Judy","I was told there would be food. I was not told it would be a pot the size of a bathtub."],
   ["Mira","It is the right size for the number of people. It is the wrong size for the number of people who'll say they aren't hungry."],
   ["Tobi","I'm not hungry."],
   ["Mira","Mm."],
   ["","She ladles him a bowl anyway, and watches him eat the way she always does, as if he might be about to go somewhere."],
   ["Elder Hesper","Sit, all of you. I have a bad knee and a long story, and I'd like to get through both before the fire gets bored of us."],
   ["Elder Hesper","This is the story the valley keeps by heart and doesn't quite believe. I'll tell it in order, so nobody has to carry it in their head."]]);
  await seq([["Elder Hesper","One. Before the first plough, before the lake had a name, there was a door under the north hill. It wasn't built to keep anything out. People were born here and died here, and nobody had agreed where the dying went. So someone built a door, so they could go through in an orderly way, and not be afraid."],
   ["Elder Hesper","Two. A door needs keepers, because doors left alone do foolish things. The Keepers lit a lantern for every step of the road to it. A promise, one flame at a time: the way is lit, you will not walk it in the dark."],
   ["Tobi","That's why we have the lantern festival?"],
   ["Elder Hesper","That's why. We forgot the reason and kept the habit. It's the most reliable way a thing survives."],
   ["Doodi","So the valley lights lanterns for a road nobody remembers."],
   ["Elder Hesper","For a road everybody walks, eventually. The remembering is optional."]]);
  await seq([["Elder Hesper","Three. There were many Keepers. This story is only about the last. A man who didn't sleep. Whether the not sleeping came with the office, or the office with the not sleeping, nobody could say."],
   ["Elder Hesper","He had a wife who made lanterns. She made the first lantern anyone ever lit for a living man. For him. She wrote on it: 'So he can sleep.'"],
   ["Danoya","(quietly) I read that. On the plaque at the shrine gate. The first lantern, lit for a man who couldn't sleep."],
   ["Elder Hesper","You read the plaque. Good. Hardly anyone does."],
   ["Elder Hesper","Four. The shrine on the north hill was built on top of that door, long after. It has been shut for longer than any of our grandmothers could remember. Barred from the inside. Nobody has the key, or the nerve."]]);
  var q=await ask("Doodi","Hesper's voice has gone careful. What do you ask?",["Who was the Keeper?","What happened to him?","Is the Door real?"]);
  await seq([q===0?["Elder Hesper","I have his name. I don't say it near a fire. A name carries, and some of the dead are more comfortable unfound."]:q===1?["Elder Hesper","His wife asked him for something, and he said no. For good reasons. That is the part my grandmother would only say once, and not to me."]:["Elder Hesper","You are standing on it, Doodi. Whether it opens is the only question anyone has ever asked it."],
   ["Elder Hesper","My grandmother told me the true ending is the one that makes you cry when you hear it said plainly, and that I'd know it when I heard it. I haven't yet. I have the shape: a man who kept a door shut for love of everyone, and what that cost him. Nobody tells you what that costs."],
   ["Elder Hesper","Five. He never stopped keeping it. There is a light on the north hill that isn't any of ours. Some say it's the shrine. I say shrines are not usually so punctual."]]);
  await seq([["Ralph","(from the edge of the firelight) The candles lean toward it. All of them, every evening. I stopped correcting them."],
   ["Ralph","And on still nights, three soft knocks from up there. Then quiet. As though someone's waiting to be told to come in."],
   ["Captain Ferris","Same from the south, under the cliffs. Three, and a pause. That's the Southern Gate, the one the Great Storm closed. I told Judy it's pipes."],
   ["Judy","He told me it's pipes. I told him there are no pipes."],
   ["Captain Ferris","Then it's very well-behaved plumbing."],
   ["Captain Ferris","I was nine, the night of the Storm. The sea went flat as a plate in the afternoon, and a flat sea is only polite before it's rude. There was a lamp lit at the bottom of the harbour, three fathoms down. Then the sky came down in one breath, and by morning the Gate was a wall of rock."],
   ["Captain Ferris","Eleven boats lost. No people. The sea took every hull and handed back every soul but one: a boy who went down to the harbour after a light and never came home. That's a trade. Somebody paid."],
   ["Ralph","(very softly) Nobody has ever said who."]]);
  await seq([["Doodi","Let me say it back, so I've got it. North: a door, a shrine on top of it, and someone knocking from inside. South: a gate the Storm sealed, and a hum, and the same knock."],
   ["Elder Hesper","That is all this valley knows, child. Which is why I keep telling it."]]);
  await seq([["Elder Hesper","Now. Everyone here has a small piece of this and thinks it's only theirs. Say yours aloud. I'll tell you where it fits."],
   ["Granny Wren","My husband planted sunflowers in the wrong row for forty years. He said the sun would sort it out. I keep a jar on my shelf for everything he left me, with his name on it in pencil. The ones I can't open are his."],
   ["Elder Hesper","You keep his name where you can see it, so he isn't gone. Wren, that is a lantern. Smaller than the Keepers', and the same promise."],
   ["Ralph","Past the forest there are thirty-three old stones, no names. Every autumn one is warm in the morning. Never the same one. I put a candle on it and I don't ask."],
   ["Elder Hesper","The old road to the Door runs past your stones, Ralph. Warm means someone stopped to rest on it. You've been lighting the way for travellers for years, and calling it gardening."],
   ["Baker Tom","I get up at three! And the valley's so quiet at three it sounds like a held breath. I've never told anyone to slow down in my life, but at three I'd like to."],
   ["Elder Hesper","Three is when the last Keeper kept his longest watch, so the story goes. The valley is still keeping it. You've been awake for him, Tom, and the bread was only the excuse."],
   ["Lio","The bees faced the south cliffs all spring. Now they just hover. Like a compass that can't pick."],
   ["Elder Hesper","Two doors, one north and one south, and a valley between them pulled both ways. The bees are the first to say so."],
   ["Ines","The lake stopped once. Not frozen. Stopped, for as long as it takes to say a long word. I was in the boat."],
   ["Elder Hesper","The lake is fed from the north hill. When the water holds its breath, whatever sleeps under the hill is holding its breath too."],
   ["Oru","The sea says one word, over and over, from the Southern Gate. I think it's 'quiet.' I've decided not to answer it."],
   ["Elder Hesper","Good. Don't. Not yet."],
   ["Mr. Rocket","I have built forty-one things that fell down. I stand them up again anyway. I've never known why."],
   ["Miller Garo","The wheel turns the right way. I check every hour. Last night I checked twice."],
   ["Elder Hesper","Rocket keeps rebuilding. Garo keeps checking. Tom keeps awake. That is all keeping a door ever was: someone who won't stop looking after it."],
   ["Elder Hesper","None of these is a separate thing. The whole valley is leaning, very gently, toward a door it forgot it had."]]);
  await seq([["","Someone is humming. Low, not really meant to be heard. Three notes, falling. Danoya doesn't notice she's the one doing it; she is stirring the pot with Mira's ladle and watching a spark drift up."],
   ["","Elder Hesper stops mid-breath. She looks at Danoya the way you look at a word you've been trying to remember all week."],
   ["Judy","Danoya. You've hummed that for as long as I've known you. Which is, in case you've forgotten, forever."],
   ["Danoya","Have I? I never learned it. It was always just there. Like my own name."],
   ["Elder Hesper","Hm."],
   ["","That is all she says. She turns back to the fire, and for some time she doesn't tell anyone anything."]]);
  await seq([["","The stories change hands. That is how it goes at a fire, once one person has been brave."],
   ["Mira","My mother's house, the night of the festival. There was always a table laid with one more place than we had people. One chair drawn out. One cup poured. Nobody sat in it, and in the morning the cup was always empty, and nobody had drunk from it."],
   ["Mira","I asked her, when I was seven, who it was for. She said: you don't ask who it's for. You only pour."],
   ["Danoya","And when you were older?"],
   ["Mira","(a cough, then a smile) When I was older, I poured. (to Doodi) Salt, you know, is how you tell somebody you were thinking about them. I'd like my cup poured, once. After. That's all."],
   ["Danoya","Don't say that."],
   ["Mira","I say many things, love. Most of them are about soup."],
   ["Tobi","Gran."],
   ["Mira","It was a joke, small one. Eat your bread."]]);
  await seq([["Elder Hesper","Listen to what we do, all of us, without thinking. We pour a cup for an empty chair. We leave a light burning on the porch. We knock before we open any door, even our own. Not one of us can say what for, and still we do it, and it works. That is what I find astonishing."],
   ["Elder Hesper","I think they are all the same custom. Each is a way of making room for someone who hasn't arrived. Or can't. The Keepers did it with a road of lanterns. We do it with a cup. The reason wore away. The habit stayed. And the habit, I think, is what has been keeping the valley's door company all these years."]]);
  await seq([["","The fire settles into red. Tom's last loaf is gone. Tobi is asleep against his grandmother's shoulder with the spoon still in his hand. Biscuit hasn't moved in an hour."],
   ["Elder Hesper","That is all the story there is tonight. The rest isn't mine to tell until it is."],
   ["Danoya","Hesper. If someone knocked. From up there."],
   ["Elder Hesper","Then do the sensible thing, child. Knock back."],
   ["Danoya","How many times?"],
   ["Elder Hesper","Three is traditional."]]);
  var c=await ask("Doodi","At the edge of the circle, one cup stands on the stones, filled and untouched. Mira put it there when nobody was looking.",["Pour a little more into it","Leave it exactly as it is","Sit beside it for a while"]);
  await seq([c===0?["","You top the cup up. The steam rises straight, then leans toward the north hill. Mira sees. She says nothing. She closes her eyes."]:c===1?["","You leave it. It is not yours to touch. Beyond the fire, in the dark, the candles lean the same way as the flame."]:["","You sit beside the cup. Danoya sits beside you. The two of you say nothing for a long time, and in a way that is the right thing to say."],
   ["","The valley goes home in pieces. The last to leave is Hesper, with her bad knee, walking slowly, not looking at the hill, so carefully not looking at it that it is all anyone can see."]])}
async function campCh2(){
  await seq([["","Evening on the South Green. The fire is lit again, but nobody has come to listen. Tables stand around the stones, heaped with wax, willow rods, rolls of pale paper and small pots of ink. Unlit lanterns hang from the branches overhead like fruit that hasn't decided to ripen."],
   ["Elder Hesper","Every festival, this valley hangs lanterns it bought, and every year they are a little less than a lantern should be. We have forgotten how to make one. We have not made one in two generations. I would like the next festival to be lit by our own hands, and I would like that to start tonight."],
   ["Lio","(setting down a block of wax the size of a loaf) I should explain the wax. It's beeswax, which is better than candle wax, because the bees have already done the hard part, which is caring. It burns slower. It smells like July. It also hums slightly, if you hold it to your ear."],
   ["Ines","(holding it to her ear, deadpan) No it doesn't."],
   ["Lio","It hums a little."],
   ["Ines","...A little."]]);
  await seq([["Elder Hesper","Danoya. Come here, child. I want to show you something before the hands get busy."],
   ["","From a bundle of oilcloth she lifts a lantern so old the paper has gone to the colour of weak tea. An iron frame, black with handling. Around its base runs a ring of small cut marks."],
   ["Danoya","Those are the runes. The ones at the Southern Gate. The same strokes."],
   ["Elder Hesper","The same hand, I think. They answer to light, those marks. Put a flame inside the frame and they wake. That is not an accident of the carving. It is the whole design of the thing."],
   ["Elder Hesper","Turn it over."],
   ["","On the underside of the base, scratched small and quick, as if the maker had been interrupted: a single letter. S."],
   ["Danoya","S."],
   ["Elder Hesper","Every old lantern in this valley has it. One letter. No name. Whoever she was, she signed like someone who expected to be asked, one day, and would be glad of it."],
   ["Elder Hesper","I have her lanterns. I do not have her. That is the whole of my grievance with history."]]);
  await seq([["","The work begins. A valley's worth of hands, none of them good at it."],
   ["Tobi","Mine's lopsided."],
   ["Robin","It's a lantern. It's meant to lean on something."],
   ["Tobi","It says NOT HUNGRY on it."],
   ["Mira","(not looking up) Then it's the most honest lantern on the green."],
   ["Captain Ferris","I'm carving a boat. Not the boat I have. The one I told you about. The one that crossed the Strait in a gale with a goat aboard."],
   ["Robin","You never had a goat."],
   ["Captain Ferris","It was a very quiet goat."],
   ["Ralph","(very small, to his lantern) Thirty-three. One for each... I'll just do the one. Maybe I'll do one for each, over time."],
   ["Miller Garo","The paper's crooked."],
   ["Baker Tom","It's PAPER, Garo! It's a lantern! It's all crooked! That's the CHARM!"],
   ["Miller Garo","Hm."]]);
  await seq([["Mira","Mine's going to be plain. I don't need to write on it. I want somebody else to, when it's time. Somebody who knows what I was like. (a cough, then a wave) Don't make that face, love. I'm only making a lantern."],
   ["Elder Hesper","I will not be making one."],
   ["Danoya","Why not?"],
   ["Elder Hesper","Because a lantern is a promise, and I have made all the ones I can keep. Wait for the one I can't. Now. Yours."]]);
  await seq([["Elder Hesper","A word on what to write. Most people write the grief. Don't. A lantern is not for the dead. It is a promise to the living: I will light the road. Write the promise, child. Not the loss."],
   ["Danoya","How do you know which one is which?"],
   ["Elder Hesper","The promise is what you'd still say if no one were ever going to read it."]]);
  var LM=await lanternMaker();var c=LM.m==="name"?0:LM.m==="notes"?1:LM.m==="blank"?2:3;
  S.lanternMark=c;S.lantern=LM;try{if(!/cutscene-preview/.test(SAVEKEY))localStorage.setItem("dv_lantern",JSON.stringify(LM))}catch(e){}
  var lmEsc=function(t){return String(t).replace(/[&<>"]/g,function(ch){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch]})};
  var lmLine=c===0?["","You write DOODI in small neat letters, then, because it looks too plain, a tiny sun beside it. Across the circle, Doodi's own lantern says DANOYA. You didn't plan that. Neither of you says anything about it."]:c===1?["","You draw three short strokes, falling. Not a word. Just the tune you have always carried, written down for the first time. Your hand knows how to do it. It doesn't ask you why."]:c===2?["","You leave the panel blank. The paper waits, a small pale square holding the whole night open. Hesper nods the way you nod to someone who has understood the assignment."]:["","You draw "+({sun:"a small sun with ten careful rays",star:"a star, five points, the way you drew them as a child",boat:"a little boat with one sail, heading somewhere"}[LM.m])+". It is not much of a drawing. It is the right one."];
  var lmSeq=[lmLine];if(LM.t)lmSeq.push(["","Beneath it, in careful letters: \u201c"+lmEsc(LM.t)+"\u201d. You don't show anyone. Hesper reads it upside down anyway, and says nothing, kindly."]);
  await seq(lmSeq);
  await seq([["","Hesper lights the first taper from the fire and goes round the circle, one lantern at a time. Each one takes the flame and holds it, orange behind the paper, throwing small shapes on the grass: a boat, a bee, a dot, a lean."],
   ["","When she reaches yours, the flame ducks, then stands. The runes on the iron ring flare a thin, clear blue. You hadn't carved any. They're there anyway. Shadows, you tell yourself. Then you tell yourself that again."],
   ["","Every flame in the circle is leaning the same way. Not north. Not toward the hill."],
   ["Ralph","(barely audible) That isn't north."],
   ["Captain Ferris","(standing, slowly, the goat forgotten) That's the cliffs. That's due south. Those are leaning at the Gate."],
   ["Ines","Lio. Your bees."],
   ["Lio","(very quiet, listening) They've gone silent. They only do that for big things."],
   ["Elder Hesper","(not afraid, not surprised, the way you are when a long-expected knock arrives) So. It has noticed the light. Good. Then it is time we noticed it back."]]);
  await seq([["Danoya","Hesper. If something is waiting down there. Is it angry?"],
   ["Elder Hesper","I don't think angry is the word. Angry is what you call sorrow when it has stopped being polite. This one has been polite for a very long time. That is what worries me."],
   ["Elder Hesper","One more thing, and then eat. The old Keepers lit every lantern from a single flame: a crystal, kept in the dark under the south cliffs, that was meant to be this valley's sun. My grandmother said it went below with the Southern Gate. If the lamps are dimming and your flame leans that way, child, I would look to the crystal."],
   ["Mira","(quietly, filling a cup and setting it at the edge of the stones) Eat something, all of you. Whatever's coming, it will not be improved by an empty stomach."]]);
  await seq([["","The valley goes home in ones and twos, each person carrying a small lit lantern, and for a while the dark road is full of slow orange stars. Yours leans south all the way back. You let it."]])}

/* ---------- the lantern maker (Chapter 2, Lantern Night) ---------- */
function lanternMaker(){
  var prev=false;try{prev=/cutscene-preview/.test(SAVEKEY||"")}catch(e){}
  if(prev&&!window.__forceMini){try{toast("\ud83c\udfae Minigame auto-completed for this preview")}catch(e){}return new Promise(function(r){setTimeout(function(){r({c:0,m:"notes",t:""})},900)})}
  return new Promise(function(res){
    var d={c:0,m:"notes",t:""};
    showOv('<h3 style="margin:0 0 6px">\ud83c\udfee Make your lantern</h3><canvas id="lmc" width="180" height="200" style="display:block;margin:0 auto 6px;background:#1a1330;border-radius:12px;width:117px;height:130px"></canvas><div id="lmp" style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center"></div><p class="mini" style="margin:6px 0 3px">What goes on it?</p><div id="lmm" style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center"></div><input id="lmt" type="text" maxlength="26" placeholder="Write a promise (optional)" style="width:100%;box-sizing:border-box;margin:8px 0 2px;padding:7px;border-radius:10px;border:2px solid #c79a62;font:700 1rem sans-serif"><button class="big" id="lmok" type="button" style="margin-top:6px">Hang it up</button>');
    var cv=document.getElementById("lmc"),g=cv.getContext("2d");
    function draw(){
      var gr=g.createLinearGradient(0,0,0,200);gr.addColorStop(0,"#1a1330");gr.addColorStop(1,"#3a2a52");g.fillStyle=gr;g.fillRect(0,0,180,200);
      for(var i=0;i<14;i++){g.fillStyle="rgba(255,240,200,"+(.25+.2*((i*37)%3)/3)+")";g.fillRect((i*53)%176+2,(i*29)%70+4,2,2)}
      lanternDraw(g,90,34,1.15,d,true);
      if(d.t){g.font="italic 11px sans-serif";g.fillStyle="#f3e7c8";g.textAlign="center";g.fillText("\u201c"+d.t+"\u201d",90,190)}
    }
    var pb=document.getElementById("lmp"),mb=document.getElementById("lmm");
    LCOL.forEach(function(c,i){var b=document.createElement("button");b.type="button";b.title=c[0];b.setAttribute("aria-label",c[0]);b.style.cssText="width:32px;height:32px;border-radius:50%;border:3px solid "+(i===0?"#c2412e":"#fff")+";background:"+c[1]+";cursor:pointer;box-shadow:0 0 0 1px #0004";b.onclick=function(){d.c=i;[].forEach.call(pb.children,function(x,j){x.style.borderColor=j===i?"#c2412e":"#fff"});draw()};pb.appendChild(b)});
    LMARK.forEach(function(m,i){var b=document.createElement("button");b.type="button";b.textContent=m[1];b.className="mbtn";b.style.cssText=(i===1?"background:#ffe3a8;":"")+"padding:5px 8px;font-size:.78rem";b.onclick=function(){d.m=m[0];[].forEach.call(mb.children,function(x,j){x.style.background=j===i?"#ffe3a8":""});draw()};mb.appendChild(b)});
    document.getElementById("lmt").oninput=function(){d.t=this.value.replace(/[<>&"]/g,"").slice(0,26);draw()};
    document.getElementById("lmok").onclick=function(){hideOv();res(d)};
    draw();
  });
}
