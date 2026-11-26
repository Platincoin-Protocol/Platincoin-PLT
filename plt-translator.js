(function(){
  const c = localStorage.getItem('plt_lang_code') || 'en';
  const lbl = localStorage.getItem('plt_lang_lbl') || 'ENG';
  if(c !== 'en'){
    document.cookie = 'googtrans=' + '/en/' + c + '; path=/';
    document.cookie = 'googtrans=' + '/en/' + c + '; path=/; domain=.' + location.hostname;
  } else {
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.' + location.hostname;
  }
  window.googleTranslateElementInit = function(){
    new google.translate.TranslateElement({pageLanguage:'en',includedLanguages:'en,it,es,fr'},'google_translate_element');
  };
  window.pltApplyLang = function(lang, label){
    localStorage.setItem('plt_lang_code', lang);
    localStorage.setItem('plt_lang_lbl', label);
    if(lang === 'en'){
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.' + location.hostname;
    } else {
      document.cookie = 'googtrans=' + '/en/' + lang + '; path=/';
      document.cookie = 'googtrans=' + '/en/' + lang + '; path=/; domain=.' + location.hostname;
    }
    location.reload();
  };
  document.addEventListener('click', ()=>{
    const l = document.getElementById('plt-lang-list'), m = document.getElementById('plt-nav-list');
    if(l) l.style.display='none'; if(m) m.style.display='none';
  });
  window.addEventListener('DOMContentLoaded', ()=>{
    const cur = document.getElementById('plt-cur-lang');
    if(cur) cur.textContent = lbl;
    const sc = document.createElement('script');
    sc.src = 'https://://google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(sc);
  });
})();