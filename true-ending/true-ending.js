(()=>{
  'use strict';
  // Resolve assets relative to this script, so both the original site and GitHub Pages project path work.
  const SCRIPT_URL=document.currentScript?.src||location.href;
  const BASE=new URL('./',SCRIPT_URL).href;
  const SITE=new URL('../',BASE).href;
  const asset=(path)=>new URL(path,SITE).href;
  const te=(name)=>new URL(name,BASE).href;
  const OFFICE=asset('scene-assets/office.jpeg');
  const AIRPORT=te('bg_airport_departure_day.png');
  const ORDINARY=asset('bgm/bgm_01_ordinary_days.mp3');
  const ROAD=asset('bgm/bgm_05_where_the_road_leads.mp3');
  const LIN23=te('lin_23_game_sprite.png');
  const ZENG23=te('zeng_23_game_sprite.png');
  const RAIN22=te('rain_22_game_sprite.png');
  const OWNER=te('shop_master_normal.png');
  const all23=[LIN23,ZENG23,RAIN22,OWNER];
  const n=(text,o={})=>({text,...o});
  const d=(speaker,text,o={})=>({speaker,text,...o});
  const sys=(text,o={})=>({text,system:true,...o});
  const bgm=(src)=>({command:'bgm',src});
  const sfx=(text,o={})=>({text,system:true,sfx:true,...o});

  const TE01={id:'TE01',title:'往更遠的地方',defaultBg:OFFICE,steps:[
    bgm(ORDINARY),n('午後的調查保護室和往常差不多。'),n('密密麻麻的行事曆跟逐漸累積而起的卷宗。'),sfx('手機震動'),
    d('少年調查官','喂？'),d('林澈｜電話','你在上班？'),d('少年調查官','不然呢？'),d('林澈｜電話','喔。'),d('林澈｜電話','今天超熱。'),d('少年調查官','你是不是有什麼話要說？'),d('林澈｜電話','沒有啊。'),d('林澈｜電話','就剛好在外面。'),d('少年調查官','你不是今天要去學校？'),d('林澈｜電話','去了啊。'),d('林澈｜電話','剛出來。'),d('曾子豪｜電話遠處','欸——'),d('曾子豪｜電話遠處','你不是有話要說！'),d('林澈｜電話','不要吵啦。'),d('少年調查官','曾子豪也在？'),d('林澈｜電話','嗯。'),d('曾子豪｜電話遠處','他在那邊拖超久——'),d('林澈｜電話','你閉嘴。'),d('曾子豪｜電話','他考上大學啦！'),d('林澈｜電話','幹！'),d('曾子豪｜電話','而且要跟我一起去外縣市——'),d('林澈｜電話','誰要跟你一起去啦！'),d('曾子豪｜電話遠處','同一個縣市就是一起啊！'),d('林澈｜電話','白痴。'),d('少年調查官','所以你考上了？'),d('林澈｜電話','……嗯。'),bgm(ROAD),
    ...[['林澈｜電話','考上了。'],['少年調查官','恭喜。'],['林澈｜電話','嗯。'],['林澈｜電話','然後還有一件事。'],['少年調查官','什麼？'],['林澈｜電話','教我怎麼租房子。'],['少年調查官','……'],['林澈｜電話','幹嘛？'],['少年調查官','沒有。'],['少年調查官','我們先來討論未來半年的花費。'],['林澈｜電話','我哪知道。'],['少年調查官','那我們先從租金預算開始？'],['林澈｜電話','那要讓我想想。'],['曾子豪｜電話遠處','我就說你一定會被問這個——'],['林澈｜電話','你真的很吵。'],['曾子豪','你住我附近就好了啊。'],['林澈','不要。'],['曾子豪','為什麼？'],['林澈','每天看到你很煩。'],['曾子豪','你現在每天也看到我啊。'],['林澈','所以我才想搬遠一點。'],['曾子豪','靠。']].map(([a,b])=>d(a,b,{cg:te('cg_true01_kapok_call.png')})),
    sys('他們的未來仍在繼續',{titleCard:true,cg:te('cg_true01_kapok_call.png'),linger:true})
  ]};

  const TE02={id:'TE02',title:'逆風之後',defaultBg:AIRPORT,steps:[
    bgm(ORDINARY),sys('六年後',{black:true}),
    n('機場出境大廳裡，人來人往。',{characters:[LIN23]}),n('林澈站在稍遠一點的地方，手機貼在耳邊。',{characters:[LIN23]}),n('腳邊是一只大型行李箱。',{characters:[LIN23]}),
    ...[['林澈｜23歲／電話','有啦。'],['林澈｜23歲／電話','我有帶。'],['林澈｜23歲／電話','護照也有。'],['林澈｜23歲／電話','媽。'],['林澈｜23歲／電話','我真的有檢查。']].map(([a,b])=>d(a,b,{characters:[LIN23]})),
    n('電話另一端不知道又交代了什麼。',{characters:[LIN23]}),d('林澈｜23歲／電話','我知道。',{characters:[LIN23]}),d('林澈｜23歲／電話','爸那邊我自己跟他講。',{characters:[LIN23]}),d('林澈｜23歲／電話','妳不用特別跟他聯絡。',{characters:[LIN23]}),n('電話另一端又說了幾句。',{characters:[LIN23]}),
    ...[['林澈｜23歲／電話','沒有。'],['林澈｜23歲／電話','我沒有嫌妳煩。'],['林澈｜23歲／電話','……好啦。'],['林澈｜23歲／電話','到了打給妳。'],['林澈｜23歲／電話','嗯。'],['林澈｜23歲／電話','掰。']].map(([a,b])=>d(a,b,{characters:[LIN23]})),
    n('電話掛斷。',{characters:[LIN23]}),n('林澈把手機收進口袋，拉起行李往這邊走。',{characters:[LIN23]}),
    ...[['曾子豪｜23歲','欸，他來了。'],['小雨｜22歲','終於。'],['豪哥','你們剛剛不是還聊得很開心？'],['曾子豪｜23歲','我們在聊正事。'],['小雨｜22歲','你公司名字想好了沒？'],['曾子豪｜23歲','……'],['小雨｜22歲','你看。'],['林澈｜23歲','還沒喔？'],['曾子豪｜23歲','快了啦。'],['林澈｜23歲','你半年前也這樣講。'],['曾子豪｜23歲','創業最重要的是產品好不好。'],['小雨｜22歲','你連公司都還沒有。'],['曾子豪｜23歲','所以我現在不是在籌備嗎！'],['林澈｜23歲','大學生畢業之後第一件事就是欠錢。'],['曾子豪｜23歲','這叫投資。'],['林澈｜23歲','喔。'],['林澈｜23歲','老闆。'],['曾子豪｜23歲','你那什麼語氣？'],['林澈｜23歲','妳今天不用打工？'],['小雨｜22歲','請假。'],['林澈｜23歲','為了送我？'],['小雨｜22歲','不然咧。'],['曾子豪｜23歲','她上次跑去你家吃飯都沒這麼感人。'],['小雨｜22歲','那次是下午沒課！'],['林澈｜23歲','而且妳吃兩碗。'],['小雨｜22歲','你媽叫我吃的！'],['林澈｜23歲','她叫妳吃妳就真的吃喔。'],['小雨｜22歲','不然我要跟阿姨客氣喔？'],['曾子豪｜23歲','她現在比你還像你們家的人。'],['林澈｜23歲','妳下次自己洗碗。'],['小雨｜22歲','我有洗！']].map(([a,b])=>d(a,b,{characters:all23})),
    ...[['曾子豪｜23歲','所以你媽？'],['林澈｜23歲','嗯。'],['曾子豪｜23歲','哭了沒？'],['林澈｜23歲','沒有。'],['曾子豪｜23歲','你呢？'],['林澈｜23歲','滾。'],['豪哥','東西真的都帶了？'],['林澈｜23歲','有。'],['豪哥','證件？'],['林澈｜23歲','有。'],['豪哥','手機？'],['林澈｜23歲','有。'],['豪哥','錢？'],['林澈｜23歲','有。']].map(([a,b])=>d(a,b,{cg:te('cg_true02_airport_group.png')})),
    n('廣播響起。',{characters:all23}),sfx('登機廣播'),d('林澈｜23歲','差不多了。',{characters:all23}),d('曾子豪｜23歲','到了記得回訊息。',{characters:all23}),d('林澈｜23歲','知道。',{characters:all23}),d('小雨｜22歲','照片。',{characters:all23}),d('林澈｜23歲','知道啦。',{characters:all23}),n('林澈握住行李箱的拉桿。',{characters:[LIN23]}),n('卻沒有立刻走。',{characters:[LIN23]}),d('林澈｜23歲','欸。',{characters:[LIN23]}),d('少年調查官','嗯？',{characters:[LIN23]}),d('林澈｜23歲','……',{characters:[LIN23]}),bgm(ROAD),d('林澈｜23歲','謝謝。',{characters:[LIN23]}),d('少年調查官','謝什麼？',{characters:[LIN23]}),d('林澈｜23歲','很多啊。',{characters:[LIN23]}),d('林澈｜23歲','懶得講。',{characters:[LIN23]}),d('少年調查官','……',{characters:[LIN23]}),d('林澈｜23歲','反正。',{characters:[LIN23]}),d('林澈｜23歲','謝啦。',{characters:[LIN23]}),d('曾子豪｜23歲','你再不走真的不用走了喔——',{characters:all23}),d('林澈｜23歲','靠。',{characters:all23}),n('林澈拉起行李，轉身往出境方向走。',{characters:[LIN23]}),sfx('行李箱輪子聲'),n('走出一段距離後，他忽然停了一下。'),d('林澈｜23歲','那我走了。',{cg:te('cg_true02_airport_goodbye.png')}),d('林澈｜23歲','再見。',{cg:te('cg_true02_airport_goodbye.png'),linger:true}),sys('林澈，23歲。',{cg:te('cg_true02_airport_goodbye.png')}),sys('赴海外加入賽車工程／技術團隊。',{cg:te('cg_true02_airport_goodbye.png')}),sys('他們的未來仍在繼續',{titleCard:true,cg:te('cg_true02_airport_goodbye.png'),linger:true})
  ]};

  const endings={1:TE01,2:TE02}; let overlay=null,current=null,index=0;
  function globalAudio(){return document.querySelector('main audio[aria-hidden="true"], audio[aria-hidden="true"]');}
  function switchBgm(src){const a=globalAudio();if(!a)return;if(a.src!==src){a.src=src;a.load();}a.play().catch(()=>{});}
  function el(tag,cls){const x=document.createElement(tag);if(cls)x.className=cls;return x;}
  function ensureOverlay(){if(overlay)return overlay;overlay=el('section','true-ending-overlay');overlay.setAttribute('aria-label','TRUE ENDING');overlay.tabIndex=0;overlay.innerHTML='<div class="true-ending-bg"></div><div class="true-ending-stage"><div class="true-ending-sprites"></div></div><div class="true-ending-shade"></div><div class="true-ending-heading"><small>TRUE ENDING</small><h2></h2></div><div class="true-ending-dialogue"><b></b><p></p><em>點擊繼續　→</em></div><span class="true-ending-dev-badge">DEV TEST MODE</span><button class="true-ending-close" type="button">退出測試</button>';overlay.querySelector('.true-ending-close').onclick=e=>{e.stopPropagation();close();};overlay.addEventListener('click',e=>{if(e.target.closest('.true-ending-close'))return;advance();});overlay.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();advance();}});document.body.appendChild(overlay);return overlay;}
  function close(){if(overlay){overlay.remove();overlay=null;}current=null;index=0;const u=new URL(location.href);u.searchParams.delete('te');history.replaceState(null,'',u);}
  function render(){if(!current)return;while(index<current.steps.length&&current.steps[index].command){switchBgm(current.steps[index].src);index++;}if(index>=current.steps.length){close();return;}const step=current.steps[index],root=ensureOverlay();root.className='true-ending-overlay'+(step.black?' true-ending-black':'')+(step.system?' true-ending-system':'')+(step.titleCard?' true-ending-title':'')+(step.linger?' true-ending-cg-linger':'');const bg=root.querySelector('.true-ending-bg'),dialog=root.querySelector('.true-ending-dialogue');bg.style.backgroundImage=`url("${current.defaultBg}")`;root.querySelector('.true-ending-heading h2').textContent=current.title;root.querySelector('.true-ending-dialogue b').textContent=step.speaker||'';root.querySelector('.true-ending-dialogue b').style.display=step.speaker?'block':'none';root.querySelector('.true-ending-dialogue p').textContent=step.text||'';root.querySelector('.true-ending-dialogue em').textContent=step.linger?'點擊結束　→':'點擊繼續　→';const old=root.querySelector('.true-ending-cg');if(old)old.remove();if(step.cg){const img=el('img','true-ending-cg');img.src=step.cg;img.alt='TRUE ENDING CG';root.insertBefore(img,root.querySelector('.true-ending-shade'));}const sprites=root.querySelector('.true-ending-sprites');sprites.replaceChildren();(step.characters||[]).forEach(src=>{const img=document.createElement('img');img.src=src;img.alt='角色立繪';sprites.appendChild(img);});dialog.style.display='block';}
  function advance(){if(!current)return;index++;render();} function start(which){current=endings[which];if(!current)return;index=0;ensureOverlay();render();}
  window.RebelliousYouthTrueEnding={start,TE01,TE02,productionThresholdsLocked:false};const requested=new URLSearchParams(location.search).get('te');if(requested==='1'||requested==='2')window.addEventListener('load',()=>setTimeout(()=>start(Number(requested)),250));
})();