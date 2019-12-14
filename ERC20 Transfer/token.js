var fs = require('fs');
var path = require('path');
const Tx = require('ethereumjs-tx');
const axios = require('axios');

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/b3a845111c5f4e3eaf646c79bcb4d4c0'));

//  Function for the get Request.
const getRequest = async ({ url }) => {
    try {
        const response = await axios({
            url: `${url}`,
            method: 'GET',
            headers: {
                'cache-control': 'no-cache',
            },
        });

        return response;
    } catch (error) {
        return { error: [{ name: 'server', message: 'There is some issue, Please try after some time' }] };
    }
};

async function sendToken() {

    // This is the sender address.
    const from = '0x703Ad25eb1c7B67988b0F1Eae0dCF3678CA79558';

    //  This is the recipient address.
    const to = '0x0e6dCb1770585E18C6FcFa743cf3aa231C3fCeDF';

    //  This is the amount of token to be transferred.
    const amount = 50000000000000000000;
    const value = await web3.utils.toHex(amount);

    //  Contract address of the token to be transferred.
    const contractAddress = '0x101848D5C5bBca18E6b4431eEdF6B95E9ADF82FA';

    const gasPrice = await web3.eth.getGasPrice();
    const count = await web3.eth.getTransactionCount(from);
    
    //  This is the private key of the sender.
    var privKey = new Buffer.from('3d80f7f644b0943a20cb123246c67a98eef8a2d9caf6e44773288672f7ae2a24', 'hex');
    
    //  This is the API to get the token contract ABI. Use this code instead of the above one on line 49.
    const url = 'https://api.etherscan.io/api?module=contract&action=getabi&address=0xdAC17F958D2ee523a2206206994597C13D831ec7&apikey=C2VBJIH1PWRNFDA2ZT1P3W26NGESGCBUAN';

    const { error, data } = await getRequest({url});

    if (error) {
        return {error};
    }

    //  The ABI will be returned in the result.
    const { result } = data;

    //  This is to create the instance of the token contract deployed in Ethereum.
    const contract = new web3.eth.Contract(JSON.parse(result), contractAddress);

    var rawTransaction = {
        from: from,
        nonce: web3.utils.toHex(count),
        gasPrice: web3.utils.toHex(gasPrice),
        gasLimit: web3.utils.toHex(500000),
        to: contractAddress,
        value: "0x0",
        data: contract.methods.transfer(to, value).encodeABI(),
        chainId: 0x03
    };

    var tx = new Tx(rawTransaction);

    tx.sign(privKey);
    var serializedTx = tx.serialize();

    try {
        const response = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('transactionHash', function (hash) {
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
        console.log("Error : ", error );
    }

};

sendToken()