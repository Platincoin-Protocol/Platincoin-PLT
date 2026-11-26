(function(){
const d={
it:{"Home":"Home","FAQ & Docs":"FAQ e Documenti","Contact Us":"Contatti","PoW Node Explorer":"Explorer Nodi PoW","Protocol Whitepaper & FAQ":"Whitepaper del Protocollo e FAQ","Read Whitepaper":"Leggi il Whitepaper","Verified On-Chain Protocol FAQ":"FAQ Verificate On-Chain del Protocollo","Contact Platincoin ($PLT) Team":"Contatta il Team Platincoin ($PLT)","Your Name / Organization":"Il Tuo Nome / Organizzazione","Your Email Address":"Il Tuo Indirizzo Email","Subject":"Oggetto","Message":"Messaggio","Send Email Directly":"Invia Email Direttamente","Platincoin ($PLT) Protocol Explorer":"Explorer del Protocollo Platincoin ($PLT)"},
es:{"Home":"Inicio","FAQ & Docs":"FAQ y Documentación","Contact Us":"Contáctanos","PoW Node Explorer":"Explorador de Nodos PoW","The Sovereign Digital Platinum Network":"La Red Soberana de Platino Digital","LIVE MARKET PRICE":"PRECIO EN VIVO","BLOCK HEIGHT":"ALTURA DE BLOQUE","CIRCULATING SUPPLY":"OFERTA CIRCULANTE","MAXIMUM SUPPLY":"OFERTA MÁXIMA","Buy $PLT":"Comprar $PLT","Buy $PLT on PancakeSwap":"Comprar $PLT en PancakeSwap","Add $PLT to Wallet":"Añadir $PLT a la Billetera","ON-CHAIN SUPPLY & VAULT ALLOCATION":"DISTRIBUCIÓN ON-CHAIN Y BÓVEDA","LIVE DEX CHART (PLT / USDT)":"GRÁFICO DEX EN VIVO (PLT / USDT)","On-Chain Verification & Public Audits":"Verificación On-Chain y Auditorías","Protocol Development & Audit Trail":"Desarrollo del Protocolo y Hoja de Ruta","Protocol, Security & Ecosystem FAQ":"Preguntas Frecuentes (FAQ)","Protocol Whitepaper & FAQ":"Whitepaper del Protocollo y FAQ","Verified On-Chain Protocol FAQ":"FAQ Verificadas On-Chain","Contact Platincoin ($PLT) Team":"Contactar al Equipo Platincoin ($PLT)","Send Email Directly":"Enviar Correo Directamente","Platincoin ($PLT) Protocol Explorer":"Explorador del Protocolo Platincoin ($PLT)"},
fr:{"Home":"Accueil","FAQ & Docs":"FAQ et Documentation","Contact Us":"Contactez-nous","PoW Node Explorer":"Explorateur de Nœuds PoW","The Sovereign Digital Platinum Network":"Le Réseau Souverain de Platine Numérique","LIVE MARKET PRICE":"PRIX EN DIRECT","BLOCK HEIGHT":"HAUTEUR DE BLOC","CIRCULATING SUPPLY":"OFFRE CIRCULANTE","MAXIMUM SUPPLY":"OFFRE MAXIMALE","Buy $PLT":"Acheter $PLT","Buy $PLT on PancakeSwap":"Acheter $PLT sur PancakeSwap","Add $PLT to Wallet":"Ajouter $PLT au Portefeuille","ON-CHAIN SUPPLY & VAULT ALLOCATION":"ALLOCATION ON-CHAIN ET COFFRE","LIVE DEX CHART (PLT / USDT)":"GRAPHIQUE DEX EN DIRECT (PLT / USDT)","On-Chain Verification & Public Audits":"Vérification On-Chain et Audits","Protocol Development & Audit Trail":"Développement du Protocole et Feuille de Route","Protocol, Security & Ecosystem FAQ":"Foire Aux Questions (FAQ)","Protocol Whitepaper & FAQ":"Livre Blanc du Protocole et FAQ","Verified On-Chain Protocol FAQ":"FAQ Vérifiées On-Chain","Contact Platincoin ($PLT) Team":"Contacter l'Équipe Platincoin ($PLT)","Send Email Directly":"Envoyer l'E-mail Directement","Platincoin ($PLT) Protocol Explorer":"Explorateur du Protocole Platincoin ($PLT)"}
};
let nodes=[];
function scan(){if(!nodes.length){const w=document.createTreeWalker(document.body,4,null,false);let n;while(n=w.nextNode())if(n.nodeValue.trim())nodes.push({n:n,t:n.nodeValue});}}
window.pltApplyLang=function(c,lbl){
scan();localStorage.setItem('plt_lang_code',c);localStorage.setItem('plt_lang_lbl',lbl);
const cur=document.getElementById('plt-cur-lang');if(cur)cur.textContent=lbl;
const l=document.getElementById('plt-lang-list');if(l)l.style.display='none';
nodes.forEach(x=>x.n.nodeValue=x.t);
const isIt=(c==='it');
document.querySelectorAll('.lang-en').forEach(e=>e.style.display=isIt?'none':'inline');
document.querySelectorAll('.lang-it').forEach(e=>e.style.display=isIt?'inline':'none');
if(typeof switchLang==='function')switchLang(isIt?'it':'en');
if(typeof setDocsLang==='function')setDocsLang(isIt?'it':'en');
if(typeof setContactLang==='function')setContactLang(isIt?'it':'en');
if(typeof setL==='function')setL(isIt?'it':'en');
if(d[c]){const m=d[c];nodes.forEach(x=>{let v=x.t;for(const k in m)if(v.includes(k))v=v.split(k).join(m[k]);x.n.nodeValue=v;});}
};
document.addEventListener('click',()=>{const l=document.getElementById('plt-lang-list'),m=document.getElementById('plt-nav-list');if(l)l.style.display='none';if(m)m.style.display='none';});
window.addEventListener('DOMContentLoaded',()=>window.pltApplyLang(localStorage.getItem('plt_lang_code')||'en',localStorage.getItem('plt_lang_lbl')||'ENG'));
})();
