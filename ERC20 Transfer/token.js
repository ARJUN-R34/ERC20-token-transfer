// const Tx = require('ethereumjs-tx');
const ethers = require('ethers');
const axios = require('axios');
const web3 = require('web3');

let provider = new ethers.providers.InfuraProvider(3, "b3a845111c5f4e3eaf646c79bcb4d4c0");
provider.apiAccessToken = '943e3d0b06c74ce2ba1442c0de5d7809';

// const Web3 = require('web3');
// const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/b3a845111c5f4e3eaf646c79bcb4d4c0'));

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

async function getAddressOfhandlename(payload) {
    const { handlename } = payload;

    const HNContractAddress = '0xd4680db560a9d002f0e4884bf9423753be709cdf';
    const vendorAddress = '0x8102Eee36079E523840c57b45315e0571BFFEAC9'

    var jsonPath = path.join(__dirname, 'HN contract ABI.json');
    var abiHNRegistry = fs.readFileSync(jsonPath, 'utf8');

    let MyHNContract = new ethers.Contract(HNContractAddress, JSON.parse(abiHNRegistry), provider);

    const toAddress = await MyHNContract.resolveAddressOfHandleName(vendorAddress, web3.utils.toHex(handlename));

    return toAddress;
}

async function sendToken() {

    // //  This is the recipient address.
    const to;

    // //  If user enters handlename, start here,
    const handlename;
    const to = await getAddressOfhandlename({ handlename });
    // //  End.

    //  This is the API to get the token contract ABI. Use this code instead of the above one on line 49.
    const url = 'https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address={contractAddress}&apikey=C2VBJIH1PWRNFDA2ZT1P3W26NGESGCBUAN'

    const { error, data } = await getRequest({url});

    if (error) {
        return {error};
    }

    //  The ABI will be returned in the result.
    const { result } = data;

    let privateKey;
    let wallet = new ethers.Wallet(privateKey, provider);

    var contractAddress;
    var contract = new ethers.Contract(contractAddress, JSON.parse(result), wallet);

    // How many tokens?
    var numberOfDecimals = 18;
    var numberOfTokens = ethers.utils.parseUnits('1.0', numberOfDecimals);

    try {
        const transaction = await wallet.sendTransaction({
            to: contractAddress,
            value: '0x00',
            data: await contract.transfer(to, numberOfTokens),
        });
    
        console.log("Transaction data : " + transaction);
    } catch (error) {
        console.log(error);
    }

};

sendToken()