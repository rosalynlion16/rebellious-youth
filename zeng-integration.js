(()=>{
'use strict';
const BASE='/rebellious-youth/';
const OVERLAY_ID='zeng-main-integration-overlay';
let activeStage=null;
let finishing=false;
let miniBusy=false;

function latestSaveHasTrustKey04(){
  try{
    const raw=localStorage.getItem('rebellious-youth-save-slots');
    if(!raw)return false;
    const slots=JSON.parse(raw);
    if(!Array.isArray(slots))return false;
    const ordered=[...slots].filter(Boolean).sort((a,b)=>String(b.savedAt||'').localeCompare(String(a.savedAt||'')));
    return ordered.some(slot=>{
      const d=slot?.data||slot;
      return Array.isArray(d?.trustFlags)&&d.trustFlags.includes('trust_key04_complete');
    });
  }catch{return false;}
}

function syncTrustFlag(){
  if(latestSaveHasTrustKey04()) localStorage.setItem('trust_key04_complete','true');
  else localStorage.removeItem('trust_key04_complete');
}

function stageFromScreen(screen){
  const text=screen?.textContent||'';
  const m=text.match(/ZENG\s+KEY\s+EVENT\s+0?([1-5])/i);
  return m?Number(m[1]):null;
}

function hideTestChrome(frame){
  const run=()=>{
    try{
      const doc=frame.contentDocument;
      if(!doc)return;
      const hide=()=>{
        [...doc.querySelectorAll('button,div,span')].forEach(el=>{
          const t=(el.textContent||'').trim();
          if(t==='DEV TEST MODE'||t==='退出測試') el.style.display='none';
        });
      };
      hide();
      new MutationObserver(hide).observe(doc.body,{childList:true,subtree:true});
    }catch{}
  };
  frame.addEventListener('load',run,{once:true});
}

function closeOverlay(){
  document.getElementById(OVERLAY_ID)?.remove();
  activeStage=null;
  finishing=false;
}

function driveLegacyCompletion(stage){
  if(finishing)return;
  finishing=true;
  const preferred={1:0,2:0,3:0,4:0,5:1};
  let tries=0;
  const tick=()=>{
    tries++;
    if(tries>180){closeOverlay();return;}
    const screen=document.querySelector('section.zeng-event-screen');
    if(!screen){closeOverlay();return;}
    screen.style.visibility='hidden';
    const result=screen.querySelector('.zeng-result .primary-button');
    if(result){
      result.click();
      setTimeout(closeOverlay,180);
      return;
    }
    const choiceBox=screen.querySelector('.zeng-key-choices');
    if(choiceBox){
      const buttons=[...choiceBox.querySelectorAll('button')];
      const button=buttons[preferred[stage]??0]||buttons[0];
      if(button){button.click();setTimeout(tick,50);return;}
    }
    screen.click();
    setTimeout(tick,45);
  };
  tick();
}

function openNewRoute(stage,legacyScreen){
  if(activeStage!==null||!stage)return;
  activeStage=stage;
  finishing=false;
  const completeKey=`zeng_key0${stage}_complete`;
  localStorage.removeItem(completeKey);
  if(stage===5)localStorage.removeItem('zeng_series_complete');
  if(stage===4)syncTrustFlag();

  legacyScreen.style.visibility='hidden';
  const overlay=document.createElement('div');
  overlay.id=OVERLAY_ID;
  overlay.setAttribute('data-stage',String(stage));
  overlay.style.cssText='position:fixed;inset:0;z-index:2147483000;background:#050c14;display:flex;';
  const frame=document.createElement('iframe');
  frame.title=`曾子豪 KEY0${stage}`;
  frame.src=`${BASE}zeng-route/?zeng=${stage}&v=main-integrated-1`;
  frame.style.cssText='width:100%;height:100%;border:0;background:#050c14;';
  overlay.appendChild(frame);
  document.body.appendChild(overlay);
  hideTestChrome(frame);

  const poll=setInterval(()=>{
    if(!document.body.contains(overlay)){clearInterval(poll);return;}
    if(localStorage.getItem(completeKey)==='true'){
      clearInterval(poll);
      driveLegacyCompletion(stage);
    }
  },200);
}

function autoResolveLegacyMini(){
  if(miniBusy||activeStage!==null)return;
  const screen=document.querySelector('section.zeng-mini-screen');
  if(!screen)return;
  miniBusy=true;
  screen.style.visibility='hidden';
  let tries=0;
  const tick=()=>{
    tries++;
    const current=document.querySelector('section.zeng-mini-screen');
    if(!current||tries>80){miniBusy=false;return;}
    const result=current.querySelector('.primary-button');
    if(result){result.click();setTimeout(()=>{miniBusy=false;},80);return;}
    const buttons=[...current.querySelectorAll('button')];
    if(buttons.length){buttons[0].click();setTimeout(tick,60);return;}
    current.click();setTimeout(tick,60);
  };
  tick();
}

function scan(){
  if(activeStage===null){
    const screen=document.querySelector('section.zeng-event-screen');
    if(screen){
      const stage=stageFromScreen(screen);
      if(stage){openNewRoute(stage,screen);return;}
    }
  }
  autoResolveLegacyMini();
}

new MutationObserver(scan).observe(document.documentElement,{childList:true,subtree:true});
window.addEventListener('DOMContentLoaded',scan);
setInterval(scan,500);
})();