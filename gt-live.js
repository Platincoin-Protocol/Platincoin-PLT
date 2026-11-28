(function () {
var s = String.fromCharCode(47);
var pool = "0xa51e99928c39ae656b7cb38006b8a1d220479b2c";
var url = "https:" + s + s + "api"+"."+"geckoterminal.com" + s + "api" + s + "v2" + s + "networks" + s + "bsc" + s + "pools" + s + pool;
async function updateGT() {
try {
var res = await fetch(url, { headers: { "Accept": "application/json" } });
var json = await res.json();
var a = json && json.data && json.data.attributes;
if (!a) return;
var price = parseFloat(a.base_token_price_usd || a.quote_token_price_usd);
var chg = a.price_change_percentage && a.price_change_percentage.h24 != null ? parseFloat(a.price_change_percentage.h24) : null;
var liq = a.reserve_in_usd != null ? parseFloat(a.reserve_in_usd) : null;
var vol = a.volume_usd && a.volume_usd.h24 != null ? parseFloat(a.volume_usd.h24) : null;
if (!isNaN(price) && price > 0) {
var txt = "$" + (price < 0.01 ? price.toFixed(6) : price.toFixed(5));
var elP = document.getElementById("tk-live-price");
if (elP) elP.textContent = txt;
var elT = document.getElementById("top-live-price");
if (elT) elT.textContent = txt;
}
if (chg !== null && !isNaN(chg)) {
var elC = document.getElementById("tk-live-change");
if (elC) {
elC.textContent = (chg >= 0 ? "+" : "") + chg.toFixed(2) + "% (24h)";
elC.style.color = chg >= 0 ? "#34d399" : "#f87171";
}
}
if (liq !== null && !isNaN(liq) && liq > 0) {
var elL = document.getElementById("tk-live-liq");
if (elL) elL.textContent = "$" + liq.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
if (vol !== null && !isNaN(vol)) {
var elV = document.getElementById("tk-live-vol");
if (elV) elV.textContent = "$" + vol.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
} catch (e) {}
}
updateGT();
setInterval(updateGT, 15000);
})();
