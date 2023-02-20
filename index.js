const Web3 = require('web3');
const BigNumber = require('bignumber.js');
require('dotenv').config()

const localProvider = process.env.PROVIDER

const web3 = new Web3(new Web3.providers.HttpProvider(localProvider));

const wallet_01 = "0xe7d3d37EcE20dCAdE894FAB6e8C8B5e4d4F270E7"
const wallet_12 = "0x3f1dBb0D4920d1665269a448CfBef8e62DbaC09D"
const wallet_13 = "0xF549F601e42F5f8878841e2AFC5729ad5227e7d7"

const TokenA_abi = require('./abis/TokenA.json')
const TokenAA_abi = require('./abis/TokenAA.json')

const TokenA_addr = "0x90f814b6B8EC169a753cd768FFafA83be1967C81"
const TokenAA_addr = "0xe6Be6aa75ffb94E01DfE0c73301BF015eB007595"

const TokenA_contract = new web3.eth.Contract(TokenA_abi, TokenA_addr)
const TokenAA_contract = new web3.eth.Contract(TokenAA_abi, TokenAA_addr)

const main = async () => {
    
    // console.log("Transfer native token - AXC to other wallet")
    // await web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY_WALLET_01);
    // await web3.eth.sendTransaction({
    //     from: wallet_01,
    //     to: wallet_12,
    //     value: BigNumber(10e18),
    //     gas: "21000000"
    // })
    // await web3.eth.sendTransaction({
    //     from: wallet_01,
    //     to: wallet_13,
    //     value: BigNumber(10e18),
    //     gas: "21000000"
    // })
    
    // console.log("With ERC20 - TokenA")
    // console.log("Balances of wallet 01: ", await TokenA_contract.methods.balanceOf(wallet_01).call())
    // console.log("Balances of wallet 12: ", await TokenA_contract.methods.balanceOf(wallet_12).call())
    // console.log("Balances of wallet 13: ", await TokenA_contract.methods.balanceOf(wallet_13).call())

    // console.log("Wallet01 mint to wallet12")
    // await web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY_WALLET_01);
    // await TokenA_contract.methods.mint(wallet_12, BigNumber(400e18)).send({from: wallet_01, gas: "21000000"})
    // console.log("Balances of wallet 01: ", await TokenA_contract.methods.balanceOf(wallet_01).call())
    // console.log("Balances of wallet 12: ", await TokenA_contract.methods.balanceOf(wallet_12).call())
    // console.log("Balances of wallet 13: ", await TokenA_contract.methods.balanceOf(wallet_13).call())

    // console.log("Wallet12 transfer to wallet13")
    // await web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY_WALLET_12);
    // await TokenA_contract.methods.transfer(wallet_13, BigNumber(100e18)).send({from: wallet_12, gas: "21000000"})
    // console.log("Balances of wallet 01: ", await TokenA_contract.methods.balanceOf(wallet_01).call())
    // console.log("Balances of wallet 12: ", await TokenA_contract.methods.balanceOf(wallet_12).call())
    // console.log("Balances of wallet 13: ", await TokenA_contract.methods.balanceOf(wallet_13).call())

    // console.log("Wallet12 approve for wallet13, then wallet13 transfer token of wallet12 to wallet01")
    // await web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY_WALLET_12)
    // await TokenA_contract.methods.approve(wallet_13, BigNumber(55e18)).send({from: wallet_12, gas: "21000000"})
    // await web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY_WALLET_13)
    // await TokenA_contract.methods.transferFrom(wallet_12, wallet_01, BigNumber(50e18)).send({from: wallet_13, gas: "21000000"})
    // console.log("Balances of wallet 01: ", await TokenA_contract.methods.balanceOf(wallet_01).call())
    // console.log("Balances of wallet 12: ", await TokenA_contract.methods.balanceOf(wallet_12).call())
    // console.log("Balances of wallet 13: ", await TokenA_contract.methods.balanceOf(wallet_13).call())

    // console.log("\n============================\n")
    // console.log("With NFT - TokenAA")
    // console.log("Balances of wallet 01: ", await TokenAA_contract.methods.balanceOf(wallet_01).call())
    // console.log("Balances of wallet 12: ", await TokenAA_contract.methods.balanceOf(wallet_12).call())
    // console.log("Balances of wallet 13: ", await TokenAA_contract.methods.balanceOf(wallet_13).call())

    // console.log("Wallet01 mint to wallet12")
    // await web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY_WALLET_01);
    // await TokenAA_contract.methods.safeMint(wallet_12, 1).send({from: wallet_01, gas: "21000000"})
    // console.log("Balances of wallet 01: ", await TokenAA_contract.methods.balanceOf(wallet_01).call())
    // console.log("Balances of wallet 12: ", await TokenAA_contract.methods.balanceOf(wallet_12).call())
    // console.log("Balances of wallet 13: ", await TokenAA_contract.methods.balanceOf(wallet_13).call())

    // console.log("Wallet01 mint to wallet12")
    // await web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY_WALLET_01);
    // await TokenAA_contract.methods.safeMint(wallet_12, 2).send({from: wallet_01, gas: "21000000"})
    // console.log("Balances of wallet 01: ", await TokenAA_contract.methods.balanceOf(wallet_01).call())
    // console.log("Balances of wallet 12: ", await TokenAA_contract.methods.balanceOf(wallet_12).call())
    // console.log("Balances of wallet 13: ", await TokenAA_contract.methods.balanceOf(wallet_13).call())

    // console.log("Wallet01 mint to wallet12")
    // await web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY_WALLET_01);
    // await TokenAA_contract.methods.safeMint(wallet_12, 3).send({from: wallet_01, gas: "21000000"})
    // console.log("Balances of wallet 01: ", await TokenAA_contract.methods.balanceOf(wallet_01).call())
    // console.log("Balances of wallet 12: ", await TokenAA_contract.methods.balanceOf(wallet_12).call())
    // console.log("Balances of wallet 13: ", await TokenAA_contract.methods.balanceOf(wallet_13).call())

    // console.log("Wallet12 transfer to wallet13")
    // await web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY_WALLET_12);
    // await TokenAA_contract.methods.transferFrom(wallet_12, wallet_13, 1).send({from: wallet_12, gas: "21000000"})
    // console.log("Balances of wallet 01: ", await TokenAA_contract.methods.balanceOf(wallet_01).call())
    // console.log("Balances of wallet 12: ", await TokenAA_contract.methods.balanceOf(wallet_12).call())
    // console.log("Balances of wallet 13: ", await TokenAA_contract.methods.balanceOf(wallet_13).call())

    // console.log("Wallet12 approve for wallet13, then wallet13 transfer token of wallet12 to wallet01")
    // await web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY_WALLET_12)
    // await TokenAA_contract.methods.setApprovalForAll(wallet_13, true).send({from: wallet_12, gas: "21000000"})
    // await web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY_WALLET_13)
    // await TokenAA_contract.methods.transferFrom(wallet_12, wallet_01, 2).send({from: wallet_13, gas: "21000000"})
    // console.log("Balances of wallet 01: ", await TokenAA_contract.methods.balanceOf(wallet_01).call())
    // console.log("Balances of wallet 12: ", await TokenAA_contract.methods.balanceOf(wallet_12).call())
    // console.log("Balances of wallet 13: ", await TokenAA_contract.methods.balanceOf(wallet_13).call())
}

main()
