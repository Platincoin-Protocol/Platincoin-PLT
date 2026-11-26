(function(){
  let nodes = [];
  function collect(){
    if(nodes.length) return;
    const w = document.createTreeWalker(document.body, 4, null, false);
    let n;
    while(n = w.nextNode()){
      const p = n.parentElement;
      if(!p || p.closest('.notranslate, script, style, code, pre')) continue;
      if(n.nodeValue.trim().length > 1) nodes.push({node: n, orig: n.nodeValue});
    }
  }
  async function trBatch(texts, tl){
    const joined = texts.join("\n---PLT---\n");
    const ck = "plt_b3_" + tl + "_" + joined.length + "_" + joined.slice(0,24);
    const cached = localStorage.getItem(ck);
    if(cached) return JSON.parse(cached);
    try{
      const r = await fetch("https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&dt=t&tl=" + tl + "&q=" + encodeURIComponent(joined));
      if(!r.ok) throw new Error("HTTP " + r.status);
      const d = await r.json();
      const full = d[0].map(x => x[0]).join("");
      const out = full.split(/\s*---PLT---\s*/);
      if(out.length === texts.length) localStorage.setItem(ck, JSON.stringify(out));
      return out;
    }catch(e){ return texts; }
  }
  async function translateAll(target){
    collect();
    if(target === 'en'){ nodes.forEach(x => x.node.nodeValue = x.orig); return; }
    for(let i = 0; i < nodes.length; i += 12){
      const slice = nodes.slice(i, i + 12);
      const origs = slice.map(x => x.orig.trim());
      const trs = await trBatch(origs, target);
      slice.forEach((item, idx) => {
        if(trs[idx]) item.node.nodeValue = item.orig.replace(origs[idx], trs[idx].trim());
      });
      await new Promise(r => setTimeout(r, 180));
    }
  }
  window.pltApplyLang = function(code, label){
    localStorage.setItem('plt_lang_code', code);
    localStorage.setItem('plt_lang_lbl', label);
    const cur = document.getElementById('plt-cur-lang'); if(cur) cur.textContent = label;
    const l = document.getElementById('plt-lang-list'); if(l) l.style.display='none';
    translateAll(code);
  };
  document.addEventListener('click', ()=>{
    const l = document.getElementById('plt-lang-list'), m = document.getElementById('plt-nav-list');
    if(l) l.style.display='none'; if(m) m.style.display='none';
  });
  window.addEventListener('DOMContentLoaded', ()=>{
    const c = localStorage.getItem('plt_lang_code') || 'en';
    const lbl = localStorage.getItem('plt_lang_lbl') || 'ENG';
    const cur = document.getElementById('plt-cur-lang'); if(cur) cur.textContent = lbl;
    if(c !== 'en') translateAll(c);
  });
})();