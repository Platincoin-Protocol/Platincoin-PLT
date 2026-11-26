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
  async function translateAll(target){
    collect();
    if(target === 'en'){ nodes.forEach(x => x.node.nodeValue = x.orig); return; }
    for(let i = 0; i < nodes.length; i += 40){
      const slice = nodes.slice(i, i + 40);
      const q = encodeURIComponent(slice.map(x => x.orig.trim()).join(" ||| "));
      try{
        const u = ["https:","","://googleapis.com","translate_a","single?client=gtx&sl=en&dt=t&tl="].join("/") + target + "&q=" + q;
        const r = await fetch(u);
        const data = await r.json();
        const parts = data.map(s => s).join("").split(/\s*\|\|\|\s*/);
        slice.forEach((item, idx) => { if(parts[idx]) item.node.nodeValue = item.orig.replace(item.orig.trim(), parts[idx].trim()); });
      }catch(e){}
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
