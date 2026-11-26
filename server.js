const fs = require('fs');
const crypto = require('crypto');
const readline = require('readline');

// --- PARAMETRI ECONOMICI DEL PROTOCOLLO ---
const MAX_SUPPLY = 11000000;
const HALVING_INTERVAL = 110000;
const INITIAL_REWARD = 50.00000000;

const WALLETS = {
    '1': {
        nome: "Wallet personale",
        indirizzo: "0x57e9449F51c9841cc8112a46719231Dc82554E00",
        file: "wallet_1.json"
    },
    '2': {
        nome: "Wallet Operativo Pool",
        indirizzo: "0x33C5D02510918C18E05690e81f55FD9E7f8bB203",
        file: "wallet_2.json"
    }
};

function calcolaHash(index, previousHash, timestamp, data, nonce) {
    const stringaBlocco = index + previousHash + timestamp + JSON.stringify(data) + nonce;
    const primoHash = crypto.createHash('sha256').update(stringaBlocco).digest('hex');
    return crypto.createHash('sha256').update(primoHash).digest('hex');
}

function avviaNodo(sceltaWallet) {
    let wallet = { indirizzo: sceltaWallet.indirizzo, saldo: 0, totale_minato: 0 };
    if (fs.existsSync(sceltaWallet.file)) {
        wallet = JSON.parse(fs.readFileSync(sceltaWallet.file, 'utf8'));
        wallet.indirizzo = sceltaWallet.indirizzo;
        if (typeof wallet.totale_minato === 'undefined') {
            wallet.totale_minato = wallet.saldo || 0;
        }
    } else {
        fs.writeFileSync(sceltaWallet.file, JSON.stringify(wallet, null, 4));
    }

    let blockchain = [];
    if (fs.existsSync('blockchain_data.json')) {
        blockchain = JSON.parse(fs.readFileSync('blockchain_data.json', 'utf8'));
    } else {
        const genesisBlock = {
            index: 0,
            timestamp: Date.now(),
            previousHash: "0",
            nonce: 0,
            difficulty: 4,
            hash: "0000000000000000000000000000000000000000000000000000000000000000",
            data: { messaggio: "Platincoin Genesis Block Standard Protocol" }
        };
        blockchain.push(genesisBlock);
        fs.writeFileSync('blockchain_data.json', JSON.stringify(blockchain, null, 4));
    }

    function minaBlocco() {
        const ultimoBlocco = blockchain[blockchain.length - 1];
        const prossimoIndex = ultimoBlocco.index + 1;
        const prossimoTimestamp = Date.now();
        const targetDifficulty = 4;
        const targetPrefix = "0".repeat(targetDifficulty);

        const supplyTotale = blockchain.reduce((acc, b) => acc + (b.data?.ricompensa || b.ricompensa || 0), 0);

        if (supplyTotale >= MAX_SUPPLY) {
            console.log("\n🛑 HARD CAP RAGGIUNTO: 11.000.000 PLT estratti. Emissione completata.");
            return;
        }

        const halvings = Math.floor(prossimoIndex / HALVING_INTERVAL);
        let ricompensaAttuale = INITIAL_REWARD / Math.pow(2, halvings);
        if (supplyTotale + ricompensaAttuale > MAX_SUPPLY) {
            ricompensaAttuale = MAX_SUPPLY - supplyTotale;
        }

        let nonce = 0;
        let hashCorrente = "";

        const datiBlocco = {
            miner: wallet.indirizzo,
            ricompensa: ricompensaAttuale
        };

        const prevHash = ultimoBlocco.hash || ultimoBlocco.hashCorrente;

        while (true) {
            hashCorrente = calcolaHash(prossimoIndex, prevHash, prossimoTimestamp, datiBlocco, nonce);
            if (hashCorrente.startsWith(targetPrefix)) {
                break;
            }
            nonce++;
        }

        const nuovoBlocco = {
            index: prossimoIndex,
            timestamp: prossimoTimestamp,
            previousHash: prevHash,
            nonce: nonce,
            difficulty: targetDifficulty,
            hash: hashCorrente,
            data: datiBlocco
        };

        blockchain.push(nuovoBlocco);
        wallet.saldo += ricompensaAttuale;
        wallet.totale_minato += ricompensaAttuale;

        fs.writeFileSync('blockchain_data.json', JSON.stringify(blockchain, null, 4));
        fs.writeFileSync(sceltaWallet.file, JSON.stringify(wallet, null, 4));
        fs.writeFileSync('wallet_privato.json', JSON.stringify(wallet, null, 4));

        console.log("\n==================================================");
        console.log(`💎 BLOCK VALIDATED SECURELY BY CPU [#${nuovoBlocco.index}]`);
        console.log("--------------------------------------------------");
        console.log(`🕒 Timestamp:      ${new Date(nuovoBlocco.timestamp).toLocaleTimeString()}`);
        console.log(`🔑 Block Hash:     \x1b[36m${nuovoBlocco.hash.substring(0, 24)}...${nuovoBlocco.hash.slice(-10)}\x1b[0m`);
        console.log(`🔗 Previous Hash:  \x1b[90m${nuovoBlocco.previousHash.substring(0, 24)}...${nuovoBlocco.previousHash.slice(-10)}\x1b[0m`);
        console.log(`⚙️  Nonce (Tries):  \x1b[33m${nuovoBlocco.nonce}\x1b[0m`);
        console.log(`⚠️  Difficulty:     ${nuovoBlocco.difficulty} Zeros Target`);
        console.log(`🛡️  Miner Verified: plt_${wallet.indirizzo.substring(0, 6)}...${wallet.indirizzo.slice(-4)}`);
        console.log(`💰 Block Reward:   \x1b[32m+${nuovoBlocco.data.ricompensa.toFixed(2)} PLT\x1b[0m`);
        console.log(`🏦 Saldo Prelevabile (${sceltaWallet.nome}): \x1b[1m\x1b[32m${wallet.saldo.toFixed(2)} PLT\x1b[0m`);
        console.log(`📊 Totale Storico Minato: \x1b[36m${wallet.totale_minato.toFixed(2)} PLT\x1b[0m`);
        console.log("==================================================\n");

        setTimeout(minaBlocco, 120000);
    }

    console.log("\n==================================================");
    console.log(" PLATINCOIN CORE NODE v1.0.0 - INITIALIZING");
    console.log(` Sincronizzazione file di registro (${sceltaWallet.file})... OK`);
    console.log(` Wallet Selezionato: ${sceltaWallet.nome}`);
    console.log(` Indirizzo Wallet Rilevato: plt_${wallet.indirizzo}`);
    console.log(` Saldo Prelevabile: ${wallet.saldo.toFixed(2)} PLT | Storico: ${wallet.totale_minato.toFixed(2)} PLT`);
    console.log("--------------------------------------------------");
    console.log(" Avvio del motore di calcolo CPU in background...\n");

    setTimeout(minaBlocco, 2000);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("\n==================================================");
console.log("   SELEZIONA IL WALLET PER QUESTA SESSIONE");
console.log("==================================================");
console.log("1) Wallet personale (0x57e9...4E00)");
console.log("2) Wallet Operativo Pool (0x33C5...B203)");
console.log("==================================================");

rl.question("Digita 1 o 2 e premi Invio: ", (risposta) => {
    const scelta = WALLETS[risposta.trim()];
    if (!scelta) {
        console.log("❌ Scelta non valida. Riavvia e digita 1 oppure 2.");
        rl.close();
        process.exit(1);
    }
    rl.close();
    avviaNodo(scelta);
});
