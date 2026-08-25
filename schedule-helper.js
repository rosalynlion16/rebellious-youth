(()=>{
'use strict';
const STORE='rebellious-youth:last-weekday-plan:v1';
const BUTTON_ID='repeat-last-week-plan';
const STYLE_ID='repeat-last-week-plan-style';

function getWeek(){
  const label=document.querySelector('.weekly-screen .week-label')?.textContent||'';
  const m=label.match(/第\s*(\d+)\s*週/);
  return m?Number(m[1]):null;
}

function getWeekdayTitles(){
  const table=document.querySelector('.course-table');
  if(!table)return null;
  const slots=[...table.querySelectorAll('button.schedule-slot')].slice(0,5);
  if(slots.length!==5)return null;
  const titles=slots.map(btn=>{
    if(!btn.classList.contains('filled'))return null;
    const text=(btn.textContent||'').trim();
    const icon=btn.querySelector('span')?.textContent?.trim()||'';
    return icon&&text.startsWith(icon)?text.slice(icon.length).trim():text;
  });
  return titles.every(Boolean)?titles:null;
}

function saveCurrentPlan(){
  const titles=getWeekdayTitles();
  if(!titles)return;
  const week=getWeek();
  localStorage.setItem(STORE,JSON.stringify({week,titles,savedAt:Date.now()}));
}

function readLastPlan(){
  try{
    const v=JSON.parse(localStorage.getItem(STORE)||'null');
    return v&&Array.isArray(v.titles)&&v.titles.length===5?v:null;
  }catch{return null;}
}

function actionButtonFor(title){
  return [...document.querySelectorAll('.action-palette > button')].find(btn=>{
    if(btn.disabled)return false;
    const b=(btn.querySelector('b')?.textContent||'').trim();
    const base=b.split('・已安排')[0].trim();
    return base===title;
  })||null;
}

function wait(ms){return new Promise(r=>setTimeout(r,ms));}

async function applyLastPlan(button){
  const saved=readLastPlan();
  if(!saved)return;
  const table=document.querySelector('.course-table');
  const slots=table?[...table.querySelectorAll('button.schedule-slot')].slice(0,5):[];
  if(slots.length!==5)return;
  button.disabled=true;
  const original=button.textContent;
  button.textContent='套用中…';
  try{
    for(let i=0;i<5;i++){
      const action=actionButtonFor(saved.titles[i]);
      if(!action)continue;
      action.click();
      await wait(80);
      slots[i].click();
      await wait(100);
    }
    button.textContent='已套用上週行程';
    await wait(700);
  }finally{
    button.textContent=original;
    button.disabled=false;
  }
}

function addStyle(){
  if(document.getElementById(STYLE_ID))return;
  const style=document.createElement('style');
  style.id=STYLE_ID;
  style.textContent=`
    #${BUTTON_ID}{
      width:100%;margin:14px 0 8px;padding:14px 18px;
      border:1px solid #96513b;background:#132130;color:#f0d0ba;
      font-weight:800;letter-spacing:.04em;cursor:pointer;
      transition:.15s ease;
    }
    #${BUTTON_ID}:hover{background:#1a2b3c;border-color:#d35b35;color:#fff;}
    #${BUTTON_ID}:disabled{opacity:.45;cursor:not-allowed;}
    #${BUTTON_ID} small{display:block;margin-top:3px;font-weight:500;color:#a9b5c1;letter-spacing:0;}
    @media(max-width:720px){#${BUTTON_ID}{font-size:15px;padding:13px 12px;margin-top:12px;}}
  `;
  document.head.appendChild(style);
}

function mount(){
  addStyle();
  const weekly=document.querySelector('.weekly-screen.schedule-layout');
  const table=document.querySelector('.course-table');
  const primary=[...document.querySelectorAll('.action-side .primary-button')].find(b=>(b.textContent||'').includes('確認平日安排'));
  if(!weekly||!table||!primary)return;

  if(!primary.dataset.repeatPlanCapture){
    primary.dataset.repeatPlanCapture='1';
    primary.addEventListener('click',saveCurrentPlan,true);
  }

  if(document.getElementById(BUTTON_ID))return;
  const week=getWeek();
  const saved=readLastPlan();
  const btn=document.createElement('button');
  btn.id=BUTTON_ID;
  btn.type='button';
  btn.innerHTML='↻ 同上週行程<small>一鍵套用上週週一至週五下午安排</small>';
  const usable=!!saved && (week===null || week>1);
  btn.disabled=!usable;
  if(!saved)btn.title='完成第一週後即可使用';
  btn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();void applyLastPlan(btn);});
  primary.parentNode.insertBefore(btn,primary);
}

const observer=new MutationObserver(()=>mount());
observer.observe(document.documentElement,{childList:true,subtree:true});
window.addEventListener('DOMContentLoaded',mount);
mount();
})();