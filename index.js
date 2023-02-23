const Web3 = require('web3');
const BigNumber = require('bignumber.js');
require('dotenv').config()

const localProvider = process.env.PROVIDER

const web3 = new Web3(new Web3.providers.HttpProvider(localProvider));

const wallet_01 = process.env.WALLET_01
const wallet_02 = process.env.WALLET_02
const wallet_03 = process.env.WALLET_03

const TokenA_abi = require('./abis/TokenA.json')
const NFTDoberman_abi = require('./abis/NFTDoberman.json')

const TokenA_addr = "0x11528F3B291EEAAEb4eF29bF5fd7972AE53318d4"
const NFTDoberman_addr = "0x9CAaEF8149286022a3423B1c24e6d4F695Cd88d4"

const TokenA_contract = new web3.eth.Contract(TokenA_abi, TokenA_addr)
const NFTDoberman_contract = new web3.eth.Contract(NFTDoberman_abi, NFTDoberman_addr)

const main = async () => {
    await transferNativeTokenAXC()
    await mintTokenA()
    await mintTokenAFail()
    await transferTokenA()
    await approveAndTransferTokenA()
    await mintNFT()
    await transferNFT()
    await approveAndTransferNFT()
    await setNFTURI()
    await getNFTURI()
}

const transferNativeTokenAXC = async () => {
    let tx;
    console.log("Transfer native token - AXC to other wallet")
    console.log("AXC balance of wallet 01", await web3.eth.getBalance(wallet_01))
    console.log("AXC balance of wallet 02", await web3.eth.getBalance(wallet_02))
    console.log("AXC balance of wallet 03", await web3.eth.getBalance(wallet_03))
    await web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY_WALLET_01);
    tx = await web3.eth.sendTransaction({
        from: wallet_01,
        to: wallet_02,
        value: BigNumber(10e18),
        gas: "21000000"
    })
    console.log(tx)

    tx = await web3.eth.sendTransaction({
        from: wallet_01,
        to: wallet_03,
        value: BigNumber(10e18),
        gas: "21000000"
    })
    console.log(tx)
    console.log("AXC balance of wallet 01", await web3.eth.getBalance(wallet_01))
    console.log("AXC balance of wallet 02", await web3.eth.getBalance(wallet_02))
    console.log("AXC balance of wallet 03", await web3.eth.getBalance(wallet_03))
}

const mintTokenA = async () => {
    let tx;
    console.log("With ERC20 - TokenA")
    console.log("Balances of wallet 01: ", await TokenA_contract.methods.balanceOf(wallet_01).call())
    console.log("Balances of wallet 02: ", await TokenA_contract.methods.balanceOf(wallet_02).call())
    console.log("Balances of wallet 03: ", await TokenA_contract.methods.balanceOf(wallet_03).call())

    console.log("Wallet01 mint to wallet02")
    await web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY_WALLET_01);
    tx = await TokenA_contract.methods.mint(wallet_02, BigNumber(400e18)).send({ from: wallet_01, gas: "21000000" })
    console.log("Balances of wallet 01: ", await TokenA_contract.methods.balanceOf(wallet_01).call())
    console.log("Balances of wallet 02: ", await TokenA_contract.methods.balanceOf(wallet_02).call())
    console.log("Balances of wallet 03: ", await TokenA_contract.methods.balanceOf(wallet_03).call())

    console.log(await web3.eth.getTransactionReceipt(tx.transactionHash))
}

const mintTokenAFail = async () => {
    let tx;
    console.log("With ERC20 - TokenA")
    console.log("Balances of wallet 01: ", await TokenA_contract.methods.balanceOf(wallet_01).call())
    console.log("Balances of wallet 02: ", await TokenA_contract.methods.balanceOf(wallet_02).call())
    console.log("Balances of wallet 03: ", await TokenA_contract.methods.balanceOf(wallet_03).call())

    try {
        console.log("Wallet02 mint to wallet02")
        await web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY_WALLET_01);
        tx = await TokenA_contract.methods.mint(wallet_02, BigNumber(400e18)).send({ from: wallet_02, gas: "21000000" })
        console.log(await web3.eth.getTransactionReceipt(tx.transactionHash))
    } catch (error) {
        console.log(error)
    }

    console.log("Balances of wallet 01: ", await TokenA_contract.methods.balanceOf(wallet_01).call())
    console.log("Balances of wallet 02: ", await TokenA_contract.methods.balanceOf(wallet_02).call())
    console.log("Balances of wallet 03: ", await TokenA_contract.methods.balanceOf(wallet_03).call())
}

const transferTokenA = async () => {
    let tx;
    console.log("Wallet02 transfer to wallet03")
    await web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY_WALLET_02);
    tx = await TokenA_contract.methods.transfer(wallet_03, BigNumber(100e18)).send({ from: wallet_02, gas: "21000000" })
    console.log("Balances of wallet 01: ", await TokenA_contract.methods.balanceOf(wallet_01).call())
    console.log("Balances of wallet 02: ", await TokenA_contract.methods.balanceOf(wallet_02).call())
    console.log("Balances of wallet 03: ", await TokenA_contract.methods.balanceOf(wallet_03).call())

    console.log(await web3.eth.getTransactionReceipt(tx.transactionHash))
}

const approveAndTransferTokenA = async () => {
    let tx;
    console.log("Wallet02 approve for wallet03, then wallet03 transfer token of wallet02 to wallet01")
    await web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY_WALLET_02)
    tx = await TokenA_contract.methods.approve(wallet_03, BigNumber(55e18)).send({ from: wallet_02, gas: "21000000" })
    console.log(await web3.eth.getTransactionReceipt(tx.transactionHash))

    await web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY_WALLET_03)
    tx = await TokenA_contract.methods.transferFrom(wallet_02, wallet_01, BigNumber(50e18)).send({ from: wallet_03, gas: "21000000" })
    console.log(await web3.eth.getTransactionReceipt(tx.transactionHash))

    console.log("Balances of wallet 01: ", await TokenA_contract.methods.balanceOf(wallet_01).call())
    console.log("Balances of wallet 02: ", await TokenA_contract.methods.balanceOf(wallet_02).call())
    console.log("Balances of wallet 03: ", await TokenA_contract.methods.balanceOf(wallet_03).call())
}

const mintNFT = async () => {
    let tx;
    console.log("With NFT - NFTDoberman")
    console.log("Balances of wallet 01: ", await NFTDoberman_contract.methods.balanceOf(wallet_01).call())
    console.log("Balances of wallet 02: ", await NFTDoberman_contract.methods.balanceOf(wallet_02).call())
    console.log("Balances of wallet 03: ", await NFTDoberman_contract.methods.balanceOf(wallet_03).call())

    console.log("Wallet01 mint to wallet02")
    await web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY_WALLET_01);
    tx = await NFTDoberman_contract.methods.safeMint(wallet_02, 1).send({ from: wallet_01, gas: "21000000" })
    console.log("Balances of wallet 01: ", await NFTDoberman_contract.methods.balanceOf(wallet_01).call())
    console.log("Balances of wallet 02: ", await NFTDoberman_contract.methods.balanceOf(wallet_02).call())
    console.log("Balances of wallet 03: ", await NFTDoberman_contract.methods.balanceOf(wallet_03).call())

    console.log("Wallet01 mint to wallet02")
    await web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY_WALLET_01);
    await NFTDoberman_contract.methods.safeMint(wallet_02, 2).send({ from: wallet_01, gas: "21000000" })
    console.log("Balances of wallet 01: ", await NFTDoberman_contract.methods.balanceOf(wallet_01).call())
    console.log("Balances of wallet 02: ", await NFTDoberman_contract.methods.balanceOf(wallet_02).call())
    console.log("Balances of wallet 03: ", await NFTDoberman_contract.methods.balanceOf(wallet_03).call())

    console.log("Wallet01 mint to wallet02")
    await web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY_WALLET_01);
    await NFTDoberman_contract.methods.safeMint(wallet_02, 3).send({ from: wallet_01, gas: "21000000" })
    console.log("Balances of wallet 01: ", await NFTDoberman_contract.methods.balanceOf(wallet_01).call())
    console.log("Balances of wallet 02: ", await NFTDoberman_contract.methods.balanceOf(wallet_02).call())
    console.log("Balances of wallet 03: ", await NFTDoberman_contract.methods.balanceOf(wallet_03).call())

    console.log(await web3.eth.getTransactionReceipt(tx.transactionHash))
}

const transferNFT = async () => {
    let tx;
    console.log("Wallet02 transfer to wallet03")
    await web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY_WALLET_02);
    tx = await NFTDoberman_contract.methods.transferFrom(wallet_02, wallet_03, 1).send({ from: wallet_02, gas: "21000000" })
    console.log("Balances of wallet 01: ", await NFTDoberman_contract.methods.balanceOf(wallet_01).call())
    console.log("Balances of wallet 02: ", await NFTDoberman_contract.methods.balanceOf(wallet_02).call())
    console.log("Balances of wallet 03: ", await NFTDoberman_contract.methods.balanceOf(wallet_03).call())

    console.log(await web3.eth.getTransactionReceipt(tx.transactionHash))
}

const approveAndTransferNFT = async () => {
    let tx;
    console.log("Wallet02 approve for wallet03, then wallet03 transfer token of wallet02 to wallet01")
    await web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY_WALLET_02)
    tx = await NFTDoberman_contract.methods.setApprovalForAll(wallet_03, true).send({ from: wallet_02, gas: "21000000" })
    console.log(await web3.eth.getTransactionReceipt(tx.transactionHash))

    await web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY_WALLET_03)
    tx = await NFTDoberman_contract.methods.transferFrom(wallet_02, wallet_01, 2).send({ from: wallet_03, gas: "21000000" })
    console.log(await web3.eth.getTransactionReceipt(tx.transactionHash))

    console.log("Balances of wallet 01: ", await NFTDoberman_contract.methods.balanceOf(wallet_01).call())
    console.log("Balances of wallet 02: ", await NFTDoberman_contract.methods.balanceOf(wallet_02).call())
    console.log("Balances of wallet 03: ", await NFTDoberman_contract.methods.balanceOf(wallet_03).call())
}

const setNFTURI = async () => {
    let tx;
    console.log("Wallet02 set uri for NFTDoberman, which has id = 02")
    await web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY_WALLET_02)
    const imageUri = "https://4.bp.blogspot.com/-lJBqKP4d-cw/U5R4GGtoOUI/AAAAAAAAAME/-8t7w_6RJzk/s1600/1356827633_468284755_3-Purebred-Doberman-Puppies-from-CKC-Registered-Parents-Barrie.jpg"
    tx = await NFTDoberman_contract.methods.setTokenURI(2, imageUri).send({ from: wallet_02, gas: "21000000" })
    console.log("Uri of NFTDoberman-2", await web3.eth.getTransactionReceipt(tx.transactionHash))

}

const getNFTURI = async () => {
    console.log("URI of token 2: ", await NFTDoberman_contract.methods.tokenURI(2).call())
}

module.exports = {
    transferNativeTokenAXC,     // node -e 'require("./index.js").transferNativeTokenAXC()'
    mintTokenA,                 // node -e 'require("./index.js").mintTokenA()'
    mintTokenAFail,             // node -e 'require("./index.js").mintTokenAFail()'
    transferTokenA,             // node -e 'require("./index.js").transferTokenA()'
    approveAndTransferTokenA,   // node -e 'require("./index.js").approveAndTransferTokenA()'
    mintNFT,                    // node -e 'require("./index.js").mintNFT()'
    transferNFT,                // node -e 'require("./index.js").transferNFT()'
    approveAndTransferNFT,      // node -e 'require("./index.js").approveAndTransferNFT()'
    setNFTURI,                  // node -e 'require("./index.js").setNFTURI()'
    getNFTURI,                  // node -e 'require("./index.js").getNFTURI()'
    main,                       // node -e 'require("./index.js").main()'
}

