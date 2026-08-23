(()=>{
'use strict';
// TRUE ENDING production thresholds — finalized 2026-08-24.
// TE01: END04 + academic>=64 + responsibility>=70 + trust>=65 + stress<=50
//       + life training + Zeng + school series complete.
// TE02: END03 + academic>=60 + responsibility>=75 + trust>=65 + selfEsteem>=58 + stress<=50
//       + Zeng + shop master + Rain + family series complete.
const TE_CONDITIONS={
  TE01:{baseEnding:4,academic:64,responsibility:70,trust:65,maxStress:50,series:['life_training_series_complete','zeng_series_complete','school_series_complete']},
  TE02:{baseEnding:3,academic:60,responsibility:75,trust:65,selfEsteem:58,maxStress:50,series:['zeng_series_complete','shop_master_series_complete','rain_series_complete','family_series_complete']}
};
const keys={academic:['academic','study'],responsibility:['responsibility'],trust:['trust'],stress:['stress'],selfEsteem:['selfEsteem','self_esteem','esteem']};
function readNumber(obj,names){for(const k of names){const v=obj?.[k];if(Number.isFinite(Number(v)))return Number(v)}return NaN}
function hasSeries(state,key){const bags=[state,state?.flags,state?.completedSeries,state?.series];for(const b of bags){if(!b)continue;if(b[key]===true||b[key]===1||b[key]==='true')return true;if(Array.isArray(b)&&b.includes(key))return true}try{return localStorage.getItem(key)==='true'}catch{return false}}
function evaluate(state,baseEnding){const a=readNumber(state,keys.academic),r=readNumber(state,keys.responsibility),t=readNumber(state,keys.trust),s=readNumber(state,keys.stress),e=readNumber(state,keys.selfEsteem);const okSeries=c=>c.series.every(k=>hasSeries(state,k));const te2=baseEnding===3&&a>=60&&r>=75&&t>=65&&e>=58&&s<=50&&okSeries(TE_CONDITIONS.TE02);if(te2)return 2;const te1=baseEnding===4&&a>=64&&r>=70&&t>=65&&s<=50&&okSeries(TE_CONDITIONS.TE01);if(te1)return 1;return 0}
window.REBELLIOUS_YOUTH_TRUE_ENDING={conditions:TE_CONDITIONS,evaluate};
})();
