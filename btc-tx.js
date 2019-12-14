// const bitcore = require('bitcore-lib');
// var Insight = require("bitcore-explorers").Insight;

// var insight = new Insight("testnet");

// var privateKeyWIF = 'cV1uRKJsJs8qNR7Z1Usq51iHTYc1CcRAkj5LUn6QwhguLQ8iCUrA';
// var privateKey = bitcore.PrivateKey.fromWIF(privateKeyWIF);
// var sourceAddress = privateKey.toAddress(bitcore.Networks.testnet);

// var targetAddress = (new bitcore.PrivateKey).toAddress(bitcore.Networks.testnet);

// console.log(`Private Key : ${privateKey}\nSource Address : ${sourceAddress}\nTarget Address : ${targetAddress}`);

// insight.getUnspentUtxos(sourceAddress, function (error, utxos) {
//     if (error) {
//         console.log('UTXO Error ', error);
//     } else {
//         console.log('UTXO ', utxos);
//         var tx = new bitcore.Transaction();

//         tx.from(utxos);
//         tx.to(targetAddress, 10000);
//         tx.change(sourceAddress);

//         tx.sign(privateKey);
//         tx.serialize();

//         insight.broadcast(tx, function (error, transactionId) {
//             if (error) {
//                 console.log('Broadcast Error ', error);
//             } else {
//                 console.log('Transaction ID ', transactionId);
//             }
//         });
//     }
// });

var bitcoinTransaction = require('bitcoin-transaction');

var from = "2ND8oLqpviYaYBvq65WUQmHC2aKKBBfySMD";
var to = "2MzEGNTQnjJw6dwMBfozDVpTSiFNRhyEeNq";
var privKeyWIF = "cNPhQcuvG4sDbr5ePrrsPRoP2RSQx4fpSTLDQwot1cVEX9E7AcsK";	//Private key in WIF form (Can generate this from bitcoinlib-js)

bitcoinTransaction.getBalance(from, { network: "testnet" }).then((balanceInBTC) => {
    return bitcoinTransaction.sendTransaction({
        from: from,
        to: to,
        privKeyWIF: privKeyWIF,
        btc: 0.0015,
        network: "testnet"
    });
});