function mixc(a,b,k){k=Math.max(0,Math.min(1,k));function p(h,i){return parseInt(h.substr(1+i*2,2),16)}return "rgb("+[0,1,2].map(function(i){return Math.round(p(a,i)+(p(b,i)-p(a,i))*k)}).join(",")+")"}
function edSky(c0,c1){var g=cx.createLinearGradient(0,0,0,240);g.addColorStop(0,c0);g.addColorStop(1,c1);cx.fillStyle=g;cx.fillRect(0,0,320,240)}
function edHills(base,amp,col,off,fr){cx.fillStyle=col;cx.beginPath();cx.moveTo(0,240);for(var x=0;x<=320;x+=8)cx.lineTo(x,base-Math.sin((x+off)*fr)*amp-Math.sin((x+off)*fr*2.3)*amp*.4);cx.lineTo(320,240);cx.fill()}
function edStars(a){if(a<=0)return;for(var i=0;i<46;i++){cx.globalAlpha=Math.min(1,a)*(.35+.65*Math.abs(Math.sin(time*2+i)));R((i*67)%320,(i*29)%130,i%5?1:2,i%5?1:2,"#fff")}cx.globalAlpha=1}
function edGlow(x,y,r,c0,a){var g=cx.createRadialGradient(x,y,1,x,y,r);g.addColorStop(0,c0);g.addColorStop(1,"rgba(255,220,120,0)");cx.globalAlpha=a==null?1:a;cx.fillStyle=g;cx.fillRect(x-r,y-r,r*2,r*2);cx.globalAlpha=1}
function edSun(x,y,r){edGlow(x,y,r*3.2,"rgba(255,230,160,.8)",.8);cx.fillStyle="#fff1c4";cx.beginPath();cx.arc(x,y,r,0,7);cx.fill()}
function edPine(x,y,s,c){cx.fillStyle=c;for(var i=0;i<3;i++){cx.beginPath();cx.moveTo(x,y-34*s+i*9*s);cx.lineTo(x-(9+i*4)*s,y-14*s+i*9*s);cx.lineTo(x+(9+i*4)*s,y-14*s+i*9*s);cx.fill()}R(x-2*s,y-8*s,4*s,8*s,c)}
function edTx(s,x,y,sz,col,al,align){cx.save();cx.globalAlpha=al==null?1:Math.max(0,Math.min(1,al));cx.font="bold "+sz+"px sans-serif";cx.textAlign=align||"left";cx.textBaseline="middle";cx.fillStyle=col;cx.fillText(s,x,y);cx.restore()}
function edBig(fn,x,y,s){cx.save();cx.translate(x,y);cx.scale(s,s);fn();cx.restore()}
function edCard(name,sub,t,t0,len){var k=t-t0;if(k<0||k>len)return;var a=Math.min(1,k*3,(len-k)*3),e=1-Math.pow(1-Math.min(1,k*2.2),3),x=-170+e*184;cx.save();cx.globalAlpha=a;cx.fillStyle="#000a";cx.fillRect(x,190,156,34);cx.fillStyle="#ffd34d";cx.fillRect(x,190,3,34);cx.restore();edTx(name,x+10,201,12,"#fff",a);edTx(sub,x+10,215,8,"#ffe9b0",a)}
function edHero(who,x,y,s,d,f){edBig(function(){person(-16,-33,d,who,f,false)},x,y,s)}
function edVil(sp,x,y,s,d,f){edBig(function(){villager(-16,-33,d,f,sp,false)},x,y,s)}
function edHeart(x,y,k,c){cx.save();cx.globalAlpha=Math.max(0,1-k);cx.font="bold "+(10+k*6)+"px sans-serif";cx.textAlign="center";cx.fillStyle=c||"#ff6a8a";cx.fillText("♥",x,y-k*40);cx.restore()}
function edPetals(t,n,col){for(var i=0;i<n;i++){var x=((i*53+t*(18+i%5*4))%340)-10,y=((i*37+t*(22+i%4*5))%250)-5;cx.globalAlpha=.8;R(x+Math.sin(t*2+i)*6,y,3,2,col||"#ffc2d6")}cx.globalAlpha=1}

