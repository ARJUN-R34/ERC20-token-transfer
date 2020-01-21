const Web3 = require('web3');
const ethers = require('ethers');
var fs = require('fs');
var path = require('path');

const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/b3a845111c5f4e3eaf646c79bcb4d4c0'));

let provider = new ethers.providers.InfuraProvider(3, "b3a845111c5f4e3eaf646c79bcb4d4c0");
provider.apiAccessToken = '943e3d0b06c74ce2ba1442c0de5d7809';

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

async function advancedTransaction() {
    let privateKey = '80583164092334ADE24073EE7B5E51890B464C21EB5E17DE153776A6ADE7387A';
    let wallet = new ethers.Wallet(privateKey, provider);
    let value;
    let to;
    let customGasPrice;     //  in Gwei

    let customGasPriceInWei = web3.utils.toWei(customGasPrice, 'gwei')
    console.log('custom gas price in wei', customGasPriceInWei)

    //  If user enters handlename
    let handlename;

    const to = await getAddressOfhandlename({ handlename });
    //  End

    const gasPrice = await web3.eth.getGasPrice()
    console.log(gasPrice);

    const balance = await wallet.getBalance();
    console.log(balance);

    const amount = ethers.utils.parseEther(value);
    console.log(amount);

    try {
        const transaction = await wallet.sendTransaction({
            to,
            gasPrice: web3.utils.toHex(customGasPrice),
            value: amount
        });

        console.log('Sent in Transaction: ' + transaction.hash);
    } catch (error) {
        console.log(error);
    }
}

advancedTransaction();
