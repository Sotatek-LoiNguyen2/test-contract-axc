const Web3 = require('web3');
const BigNumber = require('bignumber.js');
require('dotenv').config()

const localProvider = process.env.PROVIDER

const web3 = new Web3(new Web3.providers.HttpProvider(localProvider));

const wallet_01 = process.env.WALLET_01
const wallet_02 = process.env.WALLET_02
const wallet_03 = process.env.WALLET_03

const TokenA_abi = require('./abis/TokenA.json')
const TokenAA_abi = require('./abis/TokenAA.json')

const TokenA_addr = process.env.TOKENA_ADDR
const TokenAA_addr = process.env.TOKENAA_ADDR

const TokenA_contract = new web3.eth.Contract(TokenA_abi, TokenA_addr)
const TokenAA_contract = new web3.eth.Contract(TokenAA_abi, TokenAA_addr)

const main = async () => {
    
    console.log("Transfer native token - AXC to other wallet")
    await web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY_WALLET_01);
    await web3.eth.sendTransaction({
        from: wallet_01,
        to: wallet_02,
        value: BigNumber(10e18),
        gas: "21000000"
    })
    await web3.eth.sendTransaction({
        from: wallet_01,
        to: wallet_03,
        value: BigNumber(10e18),
        gas: "21000000"
    })
    
    console.log("With ERC20 - TokenA")
    console.log("Balances of wallet 01: ", await TokenA_contract.methods.balanceOf(wallet_01).call())
    console.log("Balances of wallet 02: ", await TokenA_contract.methods.balanceOf(wallet_02).call())
    console.log("Balances of wallet 03: ", await TokenA_contract.methods.balanceOf(wallet_03).call())

    console.log("Wallet01 mint to wallet02")
    await web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY_WALLET_01);
    await TokenA_contract.methods.mint(wallet_02, BigNumber(400e18)).send({from: wallet_01, gas: "21000000"})
    console.log("Balances of wallet 01: ", await TokenA_contract.methods.balanceOf(wallet_01).call())
    console.log("Balances of wallet 02: ", await TokenA_contract.methods.balanceOf(wallet_02).call())
    console.log("Balances of wallet 03: ", await TokenA_contract.methods.balanceOf(wallet_03).call())

    console.log("Wallet02 transfer to wallet03")
    await web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY_WALLET_02);
    await TokenA_contract.methods.transfer(wallet_03, BigNumber(100e18)).send({from: wallet_02, gas: "21000000"})
    console.log("Balances of wallet 01: ", await TokenA_contract.methods.balanceOf(wallet_01).call())
    console.log("Balances of wallet 02: ", await TokenA_contract.methods.balanceOf(wallet_02).call())
    console.log("Balances of wallet 03: ", await TokenA_contract.methods.balanceOf(wallet_03).call())

    console.log("Wallet02 approve for wallet03, then wallet03 transfer token of wallet02 to wallet01")
    await web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY_WALLET_02)
    await TokenA_contract.methods.approve(wallet_03, BigNumber(55e18)).send({from: wallet_02, gas: "21000000"})
    await web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY_WALLET_03)
    await TokenA_contract.methods.transferFrom(wallet_02, wallet_01, BigNumber(50e18)).send({from: wallet_03, gas: "21000000"})
    console.log("Balances of wallet 01: ", await TokenA_contract.methods.balanceOf(wallet_01).call())
    console.log("Balances of wallet 02: ", await TokenA_contract.methods.balanceOf(wallet_02).call())
    console.log("Balances of wallet 03: ", await TokenA_contract.methods.balanceOf(wallet_03).call())

    console.log("\n============================\n")
    console.log("With NFT - TokenAA")
    console.log("Balances of wallet 01: ", await TokenAA_contract.methods.balanceOf(wallet_01).call())
    console.log("Balances of wallet 02: ", await TokenAA_contract.methods.balanceOf(wallet_02).call())
    console.log("Balances of wallet 03: ", await TokenAA_contract.methods.balanceOf(wallet_03).call())

    console.log("Wallet01 mint to wallet02")
    await web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY_WALLET_01);
    await TokenAA_contract.methods.safeMint(wallet_02, 1).send({from: wallet_01, gas: "21000000"})
    console.log("Balances of wallet 01: ", await TokenAA_contract.methods.balanceOf(wallet_01).call())
    console.log("Balances of wallet 02: ", await TokenAA_contract.methods.balanceOf(wallet_02).call())
    console.log("Balances of wallet 03: ", await TokenAA_contract.methods.balanceOf(wallet_03).call())

    console.log("Wallet01 mint to wallet02")
    await web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY_WALLET_01);
    await TokenAA_contract.methods.safeMint(wallet_02, 2).send({from: wallet_01, gas: "21000000"})
    console.log("Balances of wallet 01: ", await TokenAA_contract.methods.balanceOf(wallet_01).call())
    console.log("Balances of wallet 02: ", await TokenAA_contract.methods.balanceOf(wallet_02).call())
    console.log("Balances of wallet 03: ", await TokenAA_contract.methods.balanceOf(wallet_03).call())

    console.log("Wallet01 mint to wallet02")
    await web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY_WALLET_01);
    await TokenAA_contract.methods.safeMint(wallet_02, 3).send({from: wallet_01, gas: "21000000"})
    console.log("Balances of wallet 01: ", await TokenAA_contract.methods.balanceOf(wallet_01).call())
    console.log("Balances of wallet 02: ", await TokenAA_contract.methods.balanceOf(wallet_02).call())
    console.log("Balances of wallet 03: ", await TokenAA_contract.methods.balanceOf(wallet_03).call())

    console.log("Wallet02 transfer to wallet03")
    await web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY_WALLET_02);
    await TokenAA_contract.methods.transferFrom(wallet_02, wallet_03, 1).send({from: wallet_02, gas: "21000000"})
    console.log("Balances of wallet 01: ", await TokenAA_contract.methods.balanceOf(wallet_01).call())
    console.log("Balances of wallet 02: ", await TokenAA_contract.methods.balanceOf(wallet_02).call())
    console.log("Balances of wallet 03: ", await TokenAA_contract.methods.balanceOf(wallet_03).call())

    console.log("Wallet02 approve for wallet03, then wallet03 transfer token of wallet02 to wallet01")
    await web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY_WALLET_02)
    await TokenAA_contract.methods.setApprovalForAll(wallet_03, true).send({from: wallet_02, gas: "21000000"})
    await web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY_WALLET_03)
    await TokenAA_contract.methods.transferFrom(wallet_02, wallet_01, 2).send({from: wallet_03, gas: "21000000"})
    console.log("Balances of wallet 01: ", await TokenAA_contract.methods.balanceOf(wallet_01).call())
    console.log("Balances of wallet 02: ", await TokenAA_contract.methods.balanceOf(wallet_02).call())
    console.log("Balances of wallet 03: ", await TokenAA_contract.methods.balanceOf(wallet_03).call())
}

main()
