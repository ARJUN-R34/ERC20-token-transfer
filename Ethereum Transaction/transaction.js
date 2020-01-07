const ethers = require('ethers');
let provider = new ethers.providers.InfuraProvider(3, "b3a845111c5f4e3eaf646c79bcb4d4c0");
provider.apiAccessToken = '943e3d0b06c74ce2ba1442c0de5d7809';

async function transaction() {
    let privateKey = '0x80583164092334ADE24073EE7B5E51890B464C21EB5E17DE153776A6ADE7387A';
    let wallet = new ethers.Wallet(privateKey, provider);
    let value = '0.5';
    let to = '0x7F36aaACbc03C055d52C7E4aFF8aAA22E2Bc306a';
    
    const balance = await wallet.getBalance();
    console.log(balance);

    const amount = ethers.utils.parseEther(value);
    console.log(amount);

    try {
        const transaction = await wallet.sendTransaction({
            to,
            value: amount
        });

        console.log('Sent in Transaction: ' + transaction.hash);
    } catch (error) {
        console.log(error);
    }
}

transaction();
