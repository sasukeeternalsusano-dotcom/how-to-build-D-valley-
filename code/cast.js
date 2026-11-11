/* ---------- the wider valley: ten neighbours with their own arcs (seeded here, paid off in Chapters 3-5) ---------- */
VSPEC.mira={skin:"#c9976a",hair:"#a8421e",hs:"bun",top:"#b0556a",bot:"#5a4a5a",apron:"#fff4e0",blush:1,wide:1,lash:1};
VSPEC.tobi={skin:"#d9a578",hair:"#2a1a10",hs:"spiky",top:"#4a7ac8",bot:"#3a3a4a",brow:"#2a1a10",brow2:1,};
VSPEC.hesper={skin:"#c9a07a",hair:"#d8dae6",hs:"long",top:"#6a4a8a",bot:"#3a3248",glasses:1,wrink:1,mole:1};
VSPEC.pim={skin:"#e8b898",hair:"#ffffff",hs:"cap",cap:"#ffffff",top:"#fff4e0",bot:"#6a5a4a",apron:"#e8c35a",wide:1,blush:1,stache:"#6a4a2a"};
VSPEC.nell={skin:"#e0b090",hair:"#6a3a1a",hs:"ponytail",rib:"#f08ca8",top:"#f08ca8",bot:"#4a4a6a",lash:1};
VSPEC.bram={skin:"#d9b898",hair:"#8a8a90",hs:"sidepart",top:"#2a2a38",bot:"#1a1a24",glasses:1,brow:"#6a6a70",brow2:1,wrink:1};
VSPEC.lio={skin:"#d9a578",hair:"#c8a040",hs:"side",top:"#f2e8d0",bot:"#6a5a3a",stub:"#c8a04044",};
VSPEC.ines={skin:"#b9835a",hair:"#1a1410",hs:"long",top:"#4aa08a",bot:"#3a4a5a",hat:"#e8c35a",lash:1,blush:1};
VSPEC.garo={skin:"#c98e5a",hair:"#d8d0c0",hs:"bald",top:"#8a6a4a",bot:"#4a3a2a",stache:"#d8d0c0",brow:"#c8c0b0",blush:1};
VSPEC.oru={skin:"#8a5a3c",hair:"#1a1410",hs:"cap",cap:"#2a5a8a",top:"#3a7ab0",bot:"#2a3a4a",beard:"#1a1410",wide:1,brow:"#1a1410"};
[
 {id:"mira",name:"Grandmother Mira",at:[10,71],d:2,from:7,to:19},
 {id:"tobi",name:"Tobi",sched:[[8,13,34,24,3],[13,20,28,27,0]]},
 {id:"hesper",name:"Elder Hesper",at:[44,85],d:3,from:9,to:18},
 {id:"pim",name:"Baker Tom",at:[32,57],d:2,from:6,to:15},
 {id:"nell",name:"Robin",at:[14,85],d:1,from:8,to:19},
 {id:"bram",name:"Ralph",at:[4,27],d:2,from:8,to:20},
 {id:"lio",name:"Lio",at:[52,71],d:3,from:7,to:17},
 {id:"ines",name:"Ines",at:[45,29],d:1,from:6,to:20},
 {id:"garo",name:"Miller Garo",at:[26,85],d:0,from:8,to:18},
 {id:"oru",name:"Oru",at:[46,57],d:2,from:9,to:18}
].forEach(function(v){VN.push(v)});
var NEWL={
 mira:{i2:[["Mira","Danoya! Still bones. Sit. I made too much soup, again. Tobi says that is not how soup works."],["Mira","Doodi has been in twice this week asking what you like. I said soup. He wrote it down. He is learning."]],
  i:[["Mira","Bones! You are all bones. Sit. Eat. I made too much soup."],["Mira","Sit properly, love. The chair is not decoration."]],
  a:["Salt is how you tell someone you were thinking about them. Too much salt means a lot of thinking.","Tobi says he isn't hungry. A child is never not hungry. A child is sad, or a child is lying.","Mind the cough. It's the weather. It's always the weather.","Sit, bones. The valley will keep."],
  b:["Sit, love. I'll teach you the soup properly now. You can't write it down. That's the whole trick.","If Tobi comes by, make him eat something. He listens to pretty people. He doesn't listen to me.","I'm tired, love. Not sleepy tired. The kind where the day took a little more than I'd budgeted."]},
 tobi:{i2:[["Tobi","Danoya! Doodi said you would come this way. I am not following either of you. I am observing."],["Tobi","Gran made soup. Do not tell her I had two bowls."]],
  i:[["Tobi","You're the new farmer! I've been watching you plant things. You water the squashes too much."],["Tobi","I'm not following you. I'm observing. Gran says that's different."]],
  a:["Do you think you could catch a fish bigger than me? I'm small for my age, but still.","Gran made soup again. I said I wasn't hungry. I'm always hungry. I just don't like how she watches me eat, like I'm about to go somewhere.","I'm going to be a ranger. Or a baker. A baker-ranger.","Mr. Rocket says if I build a good enough rocket, he'll let me fly it. I asked how far. He said 'not far'."],
  b:["Doodi has been practising something by the fence. He won't say what. I'm not observing. Okay, I'm observing.","Gran's been sitting down a lot. I don't mind. I just don't like that she says she doesn't mind either.","I told her I'm not hungry, so there's more soup for her. She doesn't need to know that's why."]},
 hesper:{i2:[["Elder Hesper","Danoya. You were at the fire on the Green. You hummed. I have not stopped thinking about it."],["Elder Hesper","Tonight I am teaching the valley to make lanterns again, the way the Keepers did. South Green, after seven. Come. Bring the three notes if you can spare them."]],
  i:[["Elder Hesper","Ah. The farmer. Sit a moment. I tell stories to anyone who stands still, and you've stopped."],["Elder Hesper","There's a tale in this valley. A door beneath the hill that was never meant to open. Some say it was built before the village. Some say the village was built on top of it, like a lid. The shrine up the north path sits right over the spot, and it has been shut for as long as anybody's grandmother can remember."],["Elder Hesper","The Keeper of the door loved the world, so he kept it shut. That's the whole story. A man who said no for love of everyone. Nobody tells you what that costs."]],
  a:["The shrine on the north hill had a fox once, who sang the fog thin when the boats were out. One night she didn't. We stopped saying her name. It seemed kinder than blaming her.","A door is only a story until it hums.","Quiet is good in a valley, if it's the right kind.","Walk up to the shrine one day. The doors are barred from inside and nobody has the key or the nerve, but there's a plaque by the gate that nobody reads. It says the first lantern in the valley was lit for a man who couldn't sleep."],
  b:["Judy says you and Doodi cross two time zones to say goodnight. I wrote that down. I write down the good ones now.","The hum under the south cliffs? My grandmother heard it too. She said it sounded like someone knocking from the wrong side.","If a door opens that has been shut four hundred years, ask who shut it. Then ask why. And if something gentle ever offers you what you have lost, be kind to it. Then say no, as kindly as you can."]},
 pim:{i2:[["Baker Tom","Danoya! Roll? You eat like a sparrow. I made extra, which means the pigeons got less, which means they will be unbearable."],["Baker Tom","Doodi bought four this morning. Said they were for you. I watched him eat two."]],
  i:[["Baker Tom","Fresh! Everything is fresh. The bread is the only part of me that's ever on time."],["Baker Tom","Take a roll. I'm not being nice, I over-baked and it's either you or the pigeons."]],
  a:["I get up at three. The valley is so quiet then. Almost like it's holding its breath.","Mira's soup and my bread. That's the whole village diet. We're thriving.","I have never once told anyone to slow down. I am not equipped for it.","The pigeons have learned my schedule. They're better at punctuality than I am."],
  b:["Danoya! You have the face of someone who skipped breakfast. Take the warm one. It's the good one, and the boy told me to look out for you.","I make a loaf for Mira every day. She never finishes it. I make it anyway.","Rye on Mondays, sourdough on Fridays, and whatever Tobi talks me into the rest of the week."]},
 nell:{i2:[["Robin","Danoya! Biscuit has been at the gate since breakfast. He knows your footsteps."],["Robin","He is thirteen. He will do the walk with you, slowly. Do not hurry him. He has earned slow."]],
  i:[["Robin","Biscuit! No. Biscuit, leave the farmer's shoelaces. He's thirteen, he's orange, he's sorry."],["Robin","He used to chase the pigeons. Now he sits and supervises. We're both retired."]],
  a:["He sleeps more these days. I tell myself it's the weather.","I fix fences, carts, and the occasional heart. Biscuit supervises all three.","Thirteen is old for a dog. I do the maths every night and stop at the end of it.","He still wags when I say his name. I say it more than I need to."],
  b:["Biscuit likes you. He doesn't like anybody. He's just very polite about it.","He's slowing down. He pretends he isn't. We both do.","If something ever happens to him, promise me you'll tell me what he'd have wanted to say. Weird thing to ask. Forget I said it."]},
 bram:{i2:[["Ralph","Danoya. You came past the forest again. People do not. I noticed."],["Ralph","The stones were quiet today. They like you. Or they like the humming. I cannot tell which, and I have decided it does not matter."]],
  i:[["Ralph","...Oh. Hello. People don't come this way. I like that. I mean, I like people. In moderation. Mostly after they've settled."],["Ralph","I keep the old stones past the forest. Somebody should. They don't ask for much."]],
  a:["I talk to them. Not out loud. Well. Sometimes out loud.","On still evenings, the candle flames all lean the same way. Toward the shrine on the north hill, the one that's never open. I've stopped trying to explain it. And some nights, three soft knocks from up there. I tell myself it's a shutter.","Grief is love with nowhere to go. I read that somewhere. I wish I'd written it.","Come by when you've lost someone. Or when you haven't. It's the same quiet."],
  b:["Doodi comes to the stones sometimes and talks about you like a man reading a poem he's afraid he'll lose. I put out a candle. I don't say anything.","Lately the visitors come at night. They stand at the stones and look at the hill. I don't ask.","The garden's quieter than the village. It's the only place where nobody's waiting for anyone to be different."]},
 lio:{i2:[["Lio","Danoya! Two jars. One for you, one for pretending it is for someone else. Ines says I am obvious."],["Lio","The bees went quiet when you walked up. They do that for the people they are listening to."]],
  i:[["Lio","Careful. Bees. They're friendly, but they have opinions."],["Lio","I keep three hives. Ines says they're loud. They're expressive. There's a difference."]],
  a:["Honey for the village, wax for the lanterns, stings for my enemies. I don't have enemies. The stings are a surprise to everyone.","Ines never says thank you for the honey. She just comes back the next day. I think that's how she says it.","The bees know when storms are coming. They also know when someone's sad. They hum lower.","If you hear them go quiet, tell me. They only do that for big things."],
  b:["Danoya! Honey is on the house. Ines still pays me in silence. It is an excellent rate.","The hives faced south all spring. Now they hover. Nobody knows why.","Ines laughed at one of my jokes yesterday. I've been floating."]},
 ines:{i2:[["Ines","Danoya. You came to the lake to be quiet. Same. Do not tell anyone."],["Ines","Doodi's boot is still on my wall, by the way. I have been very kind about it."]],
  i:[["Ines","Don't talk too loud. They can hear you. The fish, I mean. Mostly they disapprove."],["Ines","I fish. I don't catch much. I come for the quiet. People think that's the same thing as fishing. It isn't."]],
  a:["Lio keeps leaving honey on my boat. I have eleven jars. I'm not complaining. I'm rationing my not-complaining.","The water has a mood. Today it's thinking.","Ferris taught me everything about boats. He did not teach me anything about people. That's on me.","I don't hate crowds. I just like them best from far away."],
  b:["Danoya. I have stopped pretending I come to the lake for the fish.","Something in the water sings at night. Low. I told Lio. He said it's the bees. It's not the bees.","I said yes to a walk with Lio. Don't tell him I'm nervous. He's much better at nerves than me."]},
 garo:{i2:[["Miller Garo","Danoya. The reasonable one. Tell Rocket the flour is still not paid for."],["Miller Garo","The wheel turned backward last night. I do not joke. Ask anyone."]],
  i:[["Miller Garo","Hm. The farmer. You're friends with Rocket, I hear. Tell him the flour's still not paid for."],["Miller Garo","We have a history, Rocket and I. It started with a flour delivery and ended with a fire. The fire was his."]],
  a:["The wheel turns the right way. It's always turned the right way. I check.","Nobody grinds seed like I do. Nobody tells me that, either.","A rocket in the lake. A flour fire. A shop with a ten-foot sign. The man has no sense of proportion.","I like routine. A wheel doesn't surprise you. People do."],
  b:["Danoya. You're the reasonable one. Tell Rocket the fire insurance is in my name now, so he'd better be careful.","The wheel hasn't turned backward in forty years. Last night it did. Twice.","My grandfather said the Door was the first thing built in this valley. I thought he was daft. Now I check the wheel every hour."]},
 oru:{i2:[["Oru","Danoya. Fish. Fresh. Do not look at their eyes. You know that by now."],["Oru","Ines sells to me, I sell to Tom. You know the chain. I am the balance."]],
  i:[["Oru","Fish. Fresh. Don't look at their eyes. They look back."],["Oru","I buy from Ines, who doesn't talk, and sell to Tom, who talks too much. I'm the balance."]],
  a:["The fish are leaving the south shore. They go in a line. Politely. I don't like it.","People think a fishmonger's job is selling fish. It's listening to the sea so the sea doesn't feel alone.","Eat the sardines. They're the only honest ones.","The sea has a lot to say lately. I'm choosing not to translate."],
  b:["The harbour is quiet. Too quiet. Ferris says it's resting. Ferris says that about everything.","I sold a fish to a customer who paid in a single silver and a story. Best price I've had all week.","Tell Doodi the tide tables are on the board by the pier. He keeps asking me anyway."]}
};
async function talkNew(v){
  var d=NEWL[v.id];S.metN=S.metN||{};S.nl=S.nl||{};
  if(!S.metN[v.id]){S.metN[v.id]=1;await seq(CH2&&d.i2?d.i2:d.i);return}
  var arr=CH2?d.b:d.a,n=(S.nl[v.id]||0)%arr.length;S.nl[v.id]=n+1;await say(v.name,arr[n])}
var _vt0=vnTalkTo;
vnTalkTo=function(v){if(NEWL[v.id]){v.face=(P.d+2)%4;v.faceUntil=time+8;return talkNew(v)}return _vt0(v)};
function drawDog(x,y,old){var t=time,w=Math.sin(t*(old?4:10))*2;R(x,y+4,14,3,"#00000030");R(x-1,y-4,14,8,"#e8933a");R(x+10,y-9,8,8,"#e8933a");R(x+12,y-12,3,4,"#c0702a");R(x+11,y-6,2,2,"#2a1a10");R(x+17,y-5,3,2,"#2a1a10");R(x-5,y-5+w,6,3,"#e8933a");R(x,y+2,3,5,"#c0702a");R(x+8,y+2,3,5,"#c0702a")}
var _vp0=vnpcPush;
vnpcPush=function(dr){_vp0(dr);if(typeof OPNX!=="undefined"&&OPNX)return;vnList().forEach(function(h){if(h.v.id==="nell")dr.push({y:(h.y+1)*T+1,f:function(){drawDog(h.x*T+32,h.y*T+22,true)}})})};
