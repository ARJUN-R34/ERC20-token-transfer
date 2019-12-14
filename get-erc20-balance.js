const axios = require('axios');

async function getBalance() {
    const API = 'https://api.etherscan.io/api?module=account&action=tokenbalance'

    //  ChainLink contract address
    const contractAddress = '0x514910771af9ca656af840dff83e8264ecf986ca';
    const publicAddress = '0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE';

    const url = `${API}&contractAddress=${contractAddress}&address=${publicAddress}&tag=latest&apikey=FEEIVDJPIRIIPHM7KZND3FXNXT4CKHH5T6`

    const { data: { result } } = await getRequest({ url });

    console.log(result);
} 

async function getRequest({ url, headers }) {
    try {
        const response = await axios({
            url: `${url}`,
            method: 'GET',
            headers: headers || {
                'cache-control': 'no-cache',
            },
        });

        return response;
    } catch (error) {
        return { error: [{ name: 'server', messages: 'There is some issue, Please try after some time' }] };
    }
};

getBalance();