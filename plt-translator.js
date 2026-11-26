(function(){
  const dict = {
    es: {
      "Home":"Inicio","FAQ & Docs":"FAQ y Documentación","Contact Us":"Contáctanos","PoW Node Explorer":"Explorador de Nodos PoW",
      "The Sovereign Digital Platinum Network":"La Red Soberana de Platino Digital",
      "LIVE MARKET PRICE":"PRECIO DE MERCADO EN VIVO","BLOCK HEIGHT":"ALTURA DE BLOQUE","CIRCULATING SUPPLY":"OFERTA CIRCULANTE","MAXIMUM SUPPLY":"OFERTA MÁXIMA",
      "Network Sync Live":"Sincronización en Vivo","Algorithm Mined Amount":"Cantidad Minada por Algoritmo","Hard Cap Limit Parameters":"Parámetros Límite Máximo",
      "Buy $PLT":"Comprar $PLT","Buy $PLT on PancakeSwap":"Comprar $PLT en PancakeSwap","Add $PLT to Wallet":"Añadir $PLT a la Billetera",
      "VERIFIED BEP-20 SMART CONTRACT (BNB SMART CHAIN)":"CONTRATO INTELIGENTE BEP-20 VERIFICADO (BNB SMART CHAIN)",
      "Copy":"Copiar","Live Chart (GeckoTerminal)":"Gráfico en Vivo (GeckoTerminal)","Join Discord":"Unirse a Discord",
      "0% Buy/Sell Tax":"0% Impuesto Compra/Venta","Fixed 11M Supply":"Oferta Fija 11M","1:1 PoW Backed":"Respaldado 1:1 PoW",
      "ABOUT PLATINCOIN ($PLT) — SOVEREIGN PROTOCOL ARCHITECTURE":"ACERCA DE PLATINCOIN ($PLT) — ARQUITECTURA SOBERANA DEL PROTOCOLO",
      "ON-CHAIN SUPPLY & VAULT ALLOCATION":"DISTRIBUCIÓN ON-CHAIN Y BÓVEDA DE MINERÍA",
      "Mining Vault Reserve":"Reserva Bóveda de Minería","Circulating & Locked LP Pool":"Pool Circulante y Liquidez Bloqueada",
      "CPU Public Mining Status:":"Estado Minería Pública CPU:","CLOSED TESTNET (OPENING SOON)":"TESTNET CERRADA (PRÓXIMA APERTURA)",
      "LIVE DEX CHART (PLT / USDT)":"GRÁFICO DEX EN VIVO (PLT / USDT)",
      "Smart Contract & 0% Tax Audit":"Auditoría Contrato Inteligente y 0% Impuestos",
      "1-Year Liquidity Lock (PinkLock)":"Bloqueo de Liquidez 1 Año (PinkLock)",
      "Market Indexing & Explorer Sync":"Indexación de Mercado y Explorador",
      "INDEPENDENT PROOF & TRANSPARENCY":"PRUEBA INDEPENDIENTE Y TRANSPARENCIA",
      "On-Chain Verification & Public Audits":"Verificación On-Chain y Auditorías Públicas",
      "Protocol Development & Audit Trail":"Desarrollo del Protocolo y Hoja de Ruta",
      "FREQUENTLY ASKED QUESTIONS":"PREGUNTAS FRECUENTES",
      "Protocol, Security & Ecosystem FAQ":"Preguntas Frecuentes de Protocolo y Seguridad",
      "Protocol Whitepaper & FAQ":"Whitepaper del Protocolo y FAQ",
      "Verified On-Chain Protocol FAQ":"FAQ Verificadas On-Chain del Protocolo",
      "Contact Platincoin ($PLT) Team":"Contactar al Equipo de Platincoin ($PLT)",
      "Your Name / Organization":"Tu Nombre / Organización","Your Email Address":"Tu Correo Electrónico","Subject":"Asunto","Message":"Mensaje","Send Email Directly":"Enviar Correo Directamente",
      "Platincoin ($PLT) Protocol Explorer":"Explorador del Protocolo Platincoin ($PLT)",
      "Latest Validated Blocks — Ledger Deep Analytics":"Últimos Bloques Validados — Analítica del Registro"
    },
    fr: {
      "Home":"Accueil","FAQ & Docs":"FAQ et Documentation","Contact Us":"Contactez-nous","PoW Node Explorer":"Explorateur de Nœuds PoW",
      "The Sovereign Digital Platinum Network":"Le Réseau Souverain de Platine Numérique",
      "LIVE MARKET PRICE":"PRIX DU MARCHÉ EN DIRECT","BLOCK HEIGHT":"HAUTEUR DE BLOC","CIRCULATING SUPPLY":"OFFRE EN CIRCULATION","MAXIMUM SUPPLY":"OFFRE MAXIMALE",
      "Network Sync Live":"Synchronisation en Direct","Algorithm Mined Amount":"Quantité Minée par Algorithme","Hard Cap Limit Parameters":"Paramètres Plafond Max",
      "Buy $PLT":"Acheter $PLT","Buy $PLT on PancakeSwap":"Acheter $PLT sur PancakeSwap","Add $PLT to Wallet":"Ajouter $PLT au Portefeuille",
      "VERIFIED BEP-20 SMART CONTRACT (BNB SMART CHAIN)":"CONTRAT INTELLIGENT BEP-20 VÉRIFIÉ (BNB SMART CHAIN)",
      "Copy":"Copier","Live Chart (GeckoTerminal)":"Graphique en Direct (GeckoTerminal)","Join Discord":"Rejoindre Discord",
      "0% Buy/Sell Tax":"0% Taxe Achat/Vente","Fixed 11M Supply":"Offre Fixe 11M","1:1 PoW Backed":"Adossé 1:1 PoW",
      "ABOUT PLATINCOIN ($PLT) — SOVEREIGN PROTOCOL ARCHITECTURE":"À PROPOS DE PLATINCOIN ($PLT) — ARCHITECTURE SOUVERAINE DU PROTOCOLE",
      "ON-CHAIN SUPPLY & VAULT ALLOCATION":"ALLOCATION ON-CHAIN ET COFFRE DE MINAGE",
      "Mining Vault Reserve":"Réserve Coffre de Minage","Circulating & Locked LP Pool":"Pool Circulant et Liquidité Verrouillée",
      "CPU Public Mining Status:":"Statut Minage Public CPU :","CLOSED TESTNET (OPENING SOON)":"TESTNET FERMÉ (OUVERTURE PROCHAINE)",
      "LIVE DEX CHART (PLT / USDT)":"GRAPHIQUE DEX EN DIRECT (PLT / USDT)",
      "Smart Contract & 0% Tax Audit":"Audit Contrat Intelligent et 0% Taxe",
      "1-Year Liquidity Lock (PinkLock)":"Verrouillage Liquidité 1 An (PinkLock)",
      "Market Indexing & Explorer Sync":"Indexation Marché et Explorateur",
      "INDEPENDENT PROOF & TRANSPARENCY":"PREUVE INDÉPENDANTE ET TRANSPARENCE",
      "On-Chain Verification & Public Audits":"Vérification On-Chain et Audits Publics",
      "Protocol Development & Audit Trail":"Développement du Protocole et Feuille de Route",
      "FREQUENTLY ASKED QUESTIONS":"QUESTIONS FRÉQUENTES",
      "Protocol, Security & Ecosystem FAQ":"FAQ Protocole, Sécurité et Écosystème",
      "Protocol Whitepaper & FAQ":"Livre Blanc du Protocole et FAQ",
      "Verified On-Chain Protocol FAQ":"FAQ Vérifiées On-Chain du Protocole",
      "Contact Platincoin ($PLT) Team":"Contacter l'Équipe Platincoin ($PLT)",
      "Your Name / Organization":"Votre Nom / Organisation","Your Email Address":"Votre Adresse E-mail","Subject":"Sujet","Message":"Message","Send Email Directly":"Envoyer l'E-mail Directement",
      "Platincoin ($PLT) Protocol Explorer":"Explorateur du Protocole Platincoin ($PLT)",
      "Latest Validated Blocks — Ledger Deep Analytics":"Derniers Blocs Validés — Analytique du Registre"
    }
  };
  let origNodes = [];
  function scan(){
    if(origNodes.length) return;
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let n; while(n = w.nextNode()){ if(n.nodeValue.trim()) origNodes.push({node:n, text:n.nodeValue}); }
  }
  window.pltApplyLang = function(code, label){
    scan();
    localStorage.setItem('plt_lang_code', code);
    localStorage.setItem('plt_lang_lbl', label);
    const cur = document.getElementById('plt-cur-lang'); if(cur) cur.textContent = label;
    const l = document.getElementById('plt-lang-list'); if(l) l.style.display='none';
    origNodes.forEach(x => x.node.nodeValue = x.text);
    const isIt = (code === 'it');
    document.querySelectorAll('.lang-en').forEach(e => e.style.display = isIt ? 'none' : 'inline');
    document.querySelectorAll('.lang-it').forEach(e => e.style.display = isIt ? 'inline' : 'none');
    if(typeof switchLang === 'function') switchLang(isIt ? 'it' : 'en');
    if(typeof setL === 'function') setL(isIt ? 'it' : 'en');
    if(dict[code]){
      const m = dict[code];
      origNodes.forEach(x => {
        let v = x.text;
        for(const k in m){ if(v.includes(k)) v = v.split(k).join(m[k]); }
        x.node.nodeValue = v;
      });
    }
  };
  document.addEventListener('click', ()=>{
    const l = document.getElementById('plt-lang-list'); if(l) l.style.display='none';
    const m = document.getElementById('plt-nav-list'); if(m) m.style.display='none';
  });
  window.addEventListener('DOMContentLoaded', ()=>{
    const c = localStorage.getItem('plt_lang_code') || 'en';
    const lbl = localStorage.getItem('plt_lang_lbl') || 'ENG';
    window.pltApplyLang(c, lbl);
  });
})();