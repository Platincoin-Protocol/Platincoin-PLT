(function(){
  const c = localStorage.getItem('plt_lang_code') || 'en';
  const lbl = localStorage.getItem('plt_lang_lbl') || 'ENG';
  window.googleTranslateElementInit = function(){
    new google.translate.TranslateElement({pageLanguage:'en',includedLanguages:'en,it,es,fr'},'google_translate_element');
    if(c !== 'en'){
      let t = setInterval(function(){
        const sel = document.querySelector('.goog-te-combo');
        if(sel){ sel.value = c; sel.dispatchEvent(new Event('change')); clearInterval(t); }
      }, 250);
    }
  };
  window.pltApplyLang = function(code, label){
    localStorage.setItem('plt_lang_code', code);
    localStorage.setItem('plt_lang_lbl', label);
    const cur = document.getElementById('plt-cur-lang'); if(cur) cur.textContent = label;
    const l = document.getElementById('plt-lang-list'); if(l) l.style.display='none';
    if(code === 'en'){
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      location.reload();
      return;
    }
    const sel = document.querySelector('.goog-te-combo');
    if(sel){ sel.value = code; sel.dispatchEvent(new Event('change')); }
    else { location.reload(); }
  };
  document.addEventListener('click', function(){
    const l = document.getElementById('plt-lang-list'); if(l) l.style.display='none';
    const m = document.getElementById('plt-nav-list'); if(m) m.style.display='none';
  });
  window.addEventListener('DOMContentLoaded', function(){
    const cur = document.getElementById('plt-cur-lang'); if(cur) cur.textContent = lbl;
    const sc = document.createElement('script'); sc.src = 'https://://google.com/translate_a/element.js?cb=googleTranslateElementInit'; document.body.appendChild(sc);
  });
})();