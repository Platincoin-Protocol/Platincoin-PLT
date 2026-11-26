#!/bin/bash
cd ~/platincoin_core
git add blockchain_data.json
git commit -m "Sync live blockchain height & mined supply" >/dev/null 2>&1 && git push origin main >/dev/null 2>&1 && echo "✅ Blocchi sincronizzati online su GitHub Pages!"
