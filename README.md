# Ethereum & ERC20 Token Transfer

##  Basic Ethereum Transaction.

### Transaction Flow

1. The etherjs package will be initialised by passing a provider to it's constructor which is Infura in our case.
2. If user wants to input the recepient's handlename, then the address of the handlename would be queried first using the function ```getAddressOfhandlename```.
3. The user's balance is queried and if balance is less than the amount specified, then an error would be thrown to indicate that the user has insufficient funds.
4. The value is converted to Wei from Ether using the function ```ethers.utils.parseEther(value_in_ether)``` 
5. The transaction is sent to the blockchain using the function ```wallet.sendTransaction(to, value)``` by passing the ```to``` and ```value``` as parameters.
6. The transaction data will be received in an object which will contain transaction hash as well.
7. Once the transaction is finished successfully, the transaction receipt will be retrieved using the function ```provider.waitForTransaction(transaction.hash).then((receipt) => { console.log('Transaction receipt : ', receipt); });``` .

##  Advanced Ethereum Transaction.

### Transaction Flow

1. The etherjs package will be initialised by passing a provider to it's constructor which is Infura in our case.
2. If user wants to input the recepient's handlename, then the address of the handlename would be queried first using the function ```getAddressOfhandlename```.
3. The user's balance is queried and if balance is less than the amount specified, then an error would be thrown to indicate that the user has insufficient funds.
4. The value is converted to Wei from Ether using the function ```ethers.utils.parseEther(value_in_ether)```
5. The user will enter their desired gasPrice which will be in Gwei.
6. The gasPrice will be converted from Gwei to Wei using the function ```web3.utils.toWei(gas_price_in_wei, 'gwei')```.
7. The transaction is sent to the blockchain using the function ```wallet.sendTransaction(to, value)``` by passing the ```to``` and ```value``` as parameters.
8. The transaction data will be received in an object which will contain transaction hash as well.
9. Once the transaction is finished successfully, the transaction receipt will be retrieved using the function ```provider.waitForTransaction(transaction.hash).then((receipt) => { console.log('Transaction receipt : ', receipt); });``` .

## Points to Note.

1. All the values which are in different Ether formats like Gwei, Eth, etc. have to be converted to Wei before doing any operations on them.
2. While subtracting gas fees from the total Ethereum balance (in the case where user wants to send all his balance), then the subtraction have to be done only after converting both the values to Wei and it should consider the entire 18 decimal places and not just the first 5 decimal places.
3. The values to be sent should not be rounded off in any case.
