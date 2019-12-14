const Web3 = require('web3');
const Tx = require('ethereumjs-tx');
const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/b3a845111c5f4e3eaf646c79bcb4d4c0'));

async function transaction() {

    const from = '';
    const to = '';
    const privateKey = '';

    //  The parameter here is the "from" address.
    const count = await web3.eth.getTransactionCount(from);

    const nonce = await web3.utils.toHex(count);

    const gasPrice = await web3.eth.getGasPrice();

    //  The amount of Ether to send.
    const value = await web3.utils.toHex(100000000000);

    //  This is the "to" address.
    web3.eth.defaultAccount = to;

    const rawtx = {
        from,
        to,
        value,
        gas: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(gasPrice),
        nonce,
    };

    const tx = new Tx(rawtx);

    // This is the private key of the sender.
    const pkey = Buffer.from(privateKey, 'hex');
    
    tx.sign(pkey);
    const stringTx = `0x${tx.serialize().toString('hex')}`;

    try {
        const response = await web3.eth.sendSignedTransaction(stringTx).on('transactionHash', function (hash) {
            console.log('Transaction Hash ' + hash);
        }).on('error', function (error) {
            console.log('Error ' + error);
        })
            .on('confirmation', function (confirmationNumber, receipt) {
                console.log(`Confirmation Number & Receipt ', ${confirmationNumber}, ${receipt}`);
            });
        console.log(response);
        return response;
    } catch (error) {
        return error;
    }

}

transaction();