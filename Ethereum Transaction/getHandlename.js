async function getHandlenameOfAddress(payload) {
    const { publicAddress } = payload;

    const HNContractAddress = '0xd4680db560a9d002f0e4884bf9423753be709cdf';
    const vendorAddress = '0x8102Eee36079E523840c57b45315e0571BFFEAC9'

    var jsonPath = path.join(__dirname, 'HN contract ABI.json');
    var abiHNRegistry = fs.readFileSync(jsonPath, 'utf8');

    let MyHNContract = new ethers.Contract(HNContractAddress, JSON.parse(abiHNRegistry), provider);

    const handlename = await MyHNContract.resolveHandlenameOfAddress(vendorAddress, web3.utils.toHex(handlename));
    
    // return toAddress;
    console.log('Handlename : ' + handlename);
}

getHandlenameOfAddress({publicAddress: 0xEF1cafc02EDF4284DEEcccc02986dA5CF96c5eD1})