(function(){
  const c = localStorage.getItem('plt_lang_code') || 'en';
  const lbl = localStorage.getItem('plt_lang_lbl') || 'ENG';
  if(c === 'es' || c === 'fr'){
    document.cookie = 'googtrans=' + '/en/' + c + '; path=/';
    document.cookie = 'googtrans=' + '/en/' + c + '; path=/; domain=.' + location.hostname;
  } else {
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.' + location.hostname;
  }
  window.googleTranslateElementInit = function(){
    new google.translate.TranslateElement({pageLanguage:'en',includedLanguages:'en,it,es,fr',autoDisplay:false},'google_translate_element');
  };
  window.pltApplyLang = function(code, label){
    localStorage.setItem('plt_lang_code', code);
    localStorage.setItem('plt_lang_lbl', label);
    if(code === 'en' || code === 'it'){
      localStorage.setItem('plt_lang', code);
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.' + location.hostname;
    } else {
      localStorage.setItem('plt_lang', 'en');
      document.cookie = 'googtrans=' + '/en/' + code + '; path=/';
      document.cookie = 'googtrans=' + '/en/' + code + '; path=/; domain=.' + location.hostname;
    }
    location.reload();
  };
  document.addEventListener('click', function(){
    const l = document.getElementById('plt-lang-list'); if(l) l.style.display='none';
    const m = document.getElementById('plt-nav-list'); if(m) m.style.display='none';
  });
  window.addEventListener('DOMContentLoaded', function(){
    const cur = document.getElementById('plt-cur-lang');
    if(cur) cur.textContent = lbl;
    if(c === 'it'){
      if(typeof switchLang === 'function') switchLang('it');
      if(typeof setL === 'function') setL('it');
    } else if(c === 'es' || c === 'fr'){
      const sc = document.createElement('script');
      sc.src = 'https://://google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(sc);
    }
  });
})();