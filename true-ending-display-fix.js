(()=>{
  'use strict';
  const spriteMap={
    '林澈':'lin_23_game_sprite.png',
    '曾子豪':'zeng_23_game_sprite.png',
    '小雨':'rain_22_game_sprite.png',
    '豪哥':'shop_master_normal.png'
  };
  const base=()=>new URL('true-ending/',document.baseURI).href;
  function speakerKey(name=''){return Object.keys(spriteMap).find(k=>name.includes(k))||'';}
  function patchStep(step){
    if(!step||step.command||step.cg||step.system)return step;
    if(!step.speaker){step.characters=[];step.narration=true;return step;}
    const key=speakerKey(step.speaker);
    step.characters=key?[new URL(spriteMap[key],base()).href]:[];
    return step;
  }
  function patchEnding(ending){if(ending?.steps)ending.steps.forEach(patchStep);}
  function classify(){
    const root=document.querySelector('.true-ending-overlay');
    const dialog=root?.querySelector('.true-ending-dialogue');
    if(!root||!dialog)return;
    const name=dialog.querySelector('b')?.textContent?.trim()||'';
    const text=dialog.querySelector('p')?.textContent?.trim()||'';
    const isSystem=root.classList.contains('true-ending-system');
    const isBlack=root.classList.contains('true-ending-black');
    const isTitle=root.classList.contains('true-ending-title');
    const isNarration=!name&&!!text&&!isSystem;
    const isSfx=!name&&!!text&&isSystem&&!isBlack&&!isTitle;
    const isTimeCard=!name&&!!text&&isSystem&&isBlack&&!isTitle;
    dialog.classList.toggle('narration',isNarration);
    dialog.classList.toggle('sfx-card',isSfx);
    dialog.classList.toggle('time-card',isTimeCard);
    if(isNarration||isSfx||isTimeCard){
      const sprites=root.querySelector('.true-ending-sprites');
      if(sprites)sprites.replaceChildren();
    }
  }
  function apply(){
    const api=window.RebelliousYouthTrueEnding;
    if(!api)return false;
    patchEnding(api.TE01);patchEnding(api.TE02);
    const observer=new MutationObserver(classify);
    observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['class']});
    classify();
    return true;
  }
  if(!apply())window.addEventListener('load',()=>{let n=0;const t=setInterval(()=>{if(apply()||++n>40)clearInterval(t)},100)});
})();
