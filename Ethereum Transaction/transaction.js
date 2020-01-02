const Web3 = require('web3');
const Tx = require('ethereumjs-tx');
var fs = require('fs');
var path = require('path');

const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/b3a845111c5f4e3eaf646c79bcb4d4c0'));

var jsonPath = path.join(__dirname, 'HN contract ABI.json');
var abiHNRegistry = fs.readFileSync(jsonPath, 'utf8');

const abiHNRegistry = path.join(__dirname, 'HN contract ABI.json');

async function transaction() {

    const fromAddress;
    const toAddress;
    const privateKey;
    const amount;

    //  If user enters handlename
    const handlename;
    
    //	If user enters the handlename instead of public address
    const MyHNContract = new web3.eth.Contract(JSON.parse(abiHNRegistry), '0xd4680db560a9d002f0e4884bf9423753be709cdf');

    //	This will return the public address of the user whose handlename has been passed in the "to" field.
    const toHandlename = await MyHNContract.methods.resolveAddressOfHandleName('0x8102Eee36079E523840c57b45315e0571BFFEAC9', web3.utils.toHex(handlename)).call();

    //  The parameter here is the "from" address.
    const count = await web3.eth.getTransactionCount(fromAddress);

    const nonce = await web3.utils.toHex(count);

    const gasPrice = await web3.eth.getGasPrice();

    //  The amount of Ether to send.
    const value = await web3.utils.toHex(amount);

    //  This is the "to" address.
    web3.eth.defaultAccount = toAddress;

    const rawtx = {
        fromAddress,
        to: {toAddress or toHandlename},
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
        });
        console.log(response);
        return response;
    } catch (error) {
        return error;
    }

}

transaction();
