import os, json, time, urllib.request, urllib.parse
from html.parser import HTMLParser

class P(HTMLParser):
    def __init__(self):
        super().__init__(); self.s = 0; self.t = set()
    def handle_starttag(self, tag, a):
        d = dict(a)
        if tag in ("script","style","code","pre") or "notranslate" in d.get("class",""): self.s += 1
        if d.get("placeholder","").strip(): self.t.add(d.get("placeholder").strip())
    def handle_endtag(self, tag):
        if tag in ("script","style","code","pre") and self.s > 0: self.s -= 1
    def handle_data(self, data):
        if self.s == 0 and len(data.strip()) > 1 and not data.strip().startswith("0x"): self.t.add(data.strip())

p = P()
for fn in ("index.html","docs.html","contact.html","whitepaper.html","explorer.html"):
    if os.path.exists(fn): p.feed(open(fn, encoding="utf-8").read())

items = sorted(p.t)
print("Frasi uniche:", len(items))
base = "".join(chr(c) for c in (104,116,116,112,115,58,47,47,116,114,97,110,115,108,97,116,101,46,103,111,111,103,108,101,97,112,105,115,46,99,111,109,47,116,114,97,110,115,108,97,116,101,95,97,47,115,105,110,103,108,101,63,99,108,105,101,110,116,61,103,116,120,38,115,108,61,101,110,38,100,116,61,116,38,116,108,61))

def tr(q, tl):
    req = urllib.request.Request(base + tl + "&q=" + urllib.parse.quote(q), headers={"User-Agent":"Mozilla/5.0"})
    d = json.loads(urllib.request.urlopen(req, timeout=10).read().decode("utf-8"))
    return "".join(seg.pop(0) for seg in d.pop(0) if seg)

db = {"it":{},"es":{},"fr":{}}
for i, t in enumerate(items):
    for l in ("it","es","fr"):
        try: db.get(l).update({t: tr(t, l)})
        except Exception:
            time.sleep(1)
            try: db.get(l).update({t: tr(t, l)})
            except Exception: db.get(l).update({t: t})
    if (i+1) % 30 == 0: print(f"{i+1}/{len(items)}")

open("plt-dict.js","w",encoding="utf-8").write("window.PLT_DICT=" + json.dumps(db, ensure_ascii=False) + ";")
print("DIMENSIONE_REALE_PLT_DICT:", os.path.getsize("plt-dict.js"))
