(()=>{
  const MAP={
    '信賴系列':'你成功與少年建立了信任關係',
    '曾子豪系列':'你成功與曾子豪建立了信任關係',
    '豪哥系列':'你成功與店長建立了信任關係',
    '小雨系列':'小雨學會不是每次求救都是徒勞',
    '家庭系列':'林澈重新找回家庭的支柱',
    '校園系列':'林澈對學習產生興趣',
    '生活訓練系列':'林澈學會該如何生活',
    '資源連結系列':'林澈學會如何面對生活問題並且尋找資源'
  };
  const ORDER=['信賴系列','曾子豪系列','豪哥系列','小雨系列','家庭系列','校園系列','生活訓練系列','資源連結系列'];
  const style=document.createElement('style');
  style.textContent=`
    .resource-feedback-image{background:transparent!important;box-shadow:none!important;filter:none!important;object-fit:contain!important}
    .ending-achievement-roll{display:flex;flex-direction:column;gap:12px;margin:16px 0 20px;overflow:hidden}
    .ending-achievement-roll .achievement-row{padding:12px 14px;border-left:3px solid #d96a42;background:rgba(8,22,35,.72);opacity:0;transform:translateX(36px);animation:achievementIn .65s ease forwards}
    .ending-achievement-roll .achievement-row b{display:block;color:#efb36f;font-size:.82em;letter-spacing:.08em;margin-bottom:4px}
    .ending-achievement-roll .achievement-row span{display:block;color:#f3f3ee;line-height:1.55}
    @keyframes achievementIn{to{opacity:1;transform:translateX(0)}}
    @media(max-width:760px){.ending-achievement-roll{gap:8px;margin:10px 0 14px}.ending-achievement-roll .achievement-row{padding:10px 12px}.ending-achievement-roll .achievement-row span{font-size:.92rem}}
  `;
  document.head.appendChild(style);

  function upgrade(){
    const box=document.querySelector('.ending-dialogue--complete');
    if(!box||box.dataset.achievementRoll==='1')return;
    const p=box.querySelector('p');
    if(!p)return;
    const raw=p.textContent||'';
    const done=ORDER.filter(k=>raw.includes(k));
    if(!done.length)return;
    box.dataset.achievementRoll='1';
    const title=box.querySelector('b');
    if(title) title.textContent='這三個月，你們留下了這些改變';
    const roll=document.createElement('div');
    roll.className='ending-achievement-roll';
    done.forEach((k,i)=>{
      const row=document.createElement('div');
      row.className='achievement-row';
      row.style.animationDelay=`${i*.72}s`;
      const label=document.createElement('b');
      label.textContent=k;
      const text=document.createElement('span');
      text.textContent=MAP[k];
      row.append(label,text);
      roll.appendChild(row);
    });
    p.replaceWith(roll);
  }
  const mo=new MutationObserver(upgrade);
  mo.observe(document.documentElement,{subtree:true,childList:true});
  upgrade();
})();
