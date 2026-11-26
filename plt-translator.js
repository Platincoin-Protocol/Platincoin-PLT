function googleTranslateElementInit(){
  new google.translate.TranslateElement({pageLanguage:'en',includedLanguages:'en,it,es,fr'},'google_translate_element');
  const c = localStorage.getItem('plt_lang_code') || 'en';
  if(c !== 'en') setTimeout(()=>pltTriggerCombo(c), 500);
}
function pltTriggerCombo(code){
  let tries = 0;
  const iv = setInterval(()=>{
    const sel = document.querySelector('.goog-te-combo');
    if(sel && sel.options.length > 1){
      sel.value = code;
      sel.dispatchEvent(new Event('change'));
      clearInterval(iv);
    }
    if(++tries > 30) clearInterval(iv);
  }, 250);
}
function pltApplyLang(code, label){
  localStorage.setItem('plt_lang_code', code);
  localStorage.setItem('plt_lang_lbl', label);
  const cur = document.getElementById('plt-cur-lang'); if(cur) cur.textContent = label;
  const l = document.getElementById('plt-lang-list'); if(l) l.style.display='none';
  if(code === 'en'){
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.' + location.hostname;
    location.reload();
  } else {
    document.cookie = 'googtrans=' + '/en/' + code + '; path=/';
    pltTriggerCombo(code);
  }
}
document.addEventListener('click', ()=>{
  const l = document.getElementById('plt-lang-list'); if(l) l.style.display='none';
  const m = document.getElementById('plt-nav-list'); if(m) m.style.display='none';
});
window.addEventListener('DOMContentLoaded', ()=>{
  const cur = document.getElementById('plt-cur-lang');
  if(cur) cur.textContent = localStorage.getItem('plt_lang_lbl') || 'ENG';
});