
const { Transaction } = require('@ethereumjs/tx')
const { Common } = require('@ethereumjs/common')

const Web3 = require('web3');
const BigNumber = require('bignumber.js');
require('dotenv').config()

const localProvider = process.env.PROVIDER

const web3 = new Web3(new Web3.providers.HttpProvider(localProvider));

const wallet_01 = process.env.WALLET_01
const wallet_02 = process.env.WALLET_02
const wallet_03 = process.env.WALLET_03

const TokenA_addr = "0x184082eAA310699e6fb9eEaADDC32Fab13CCCD0d" // local
// const TokenA_addr = "0xA8F9954b5F9c53A8eC6472874cA57262e796Da54" // server

const common = Common.custom({ chainId: 9998 })

let serializedSignedTxs = new Array()

const signTx = (from, nonce, to, value, data, privateKey) => {
    const txData = {
        from,
        nonce,
        gasPrice: 52000000000,
        gasLimit: 220000,
        to,
        value,
        data
    }
    const tx = Transaction.fromTxData(txData, { common })
    const signedTx = tx.sign(Buffer.from(privateKey, 'hex'))
    const serializedTx = signedTx.serialize();
    return serializedTx;
}

const main = async () => {
    let serializedSignedTxs = new Array()

    // // wallet01 transfer AXC to wallet02
    // await web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY_WALLET_01);
    // await web3.eth.sendTransaction({
    //     from: wallet_01,
    //     to: wallet_02,
    //     value: BigNumber(1000e18),
    //     gas: "21000000"
    // })

    let nonce1 = await web3.eth.getTransactionCount(process.env.WALLET_01)
    console.log("nonce1", nonce1)
    for (let i = 0; i < 50000; i++) {
        let serializedSignedTx = signTx(wallet_01, nonce1 + i, TokenA_addr, 0, data, process.env.PRIVATE_KEY_WALLET_01)
        serializedSignedTxs.push(serializedSignedTx)
        console.log(i)
    }
    
    // wallet02 send AXC to wallet03
    let nonce2 = await web3.eth.getTransactionCount(process.env.WALLET_02)
    console.log("nonce2", nonce2);
    for (let i = 0; i < 50000; i++) {
        let serializedSignedTx = signTx(wallet_02, nonce2 + i, wallet_03, 2, '', process.env.PRIVATE_KEY_WALLET_02)
        serializedSignedTxs.push(serializedSignedTx)
        console.log(i)
    }

    // wallet01 mint TokenA to wallet02
    let data = web3.eth.abi.encodeFunctionCall({
        name: 'mint',
        type: 'function',
        inputs: [{
            type: 'address',
            name: 'to'
        }, {
            type: 'uint256',
            name: 'amount'
        }]
    }, [wallet_02, 2])



    
    await Promise.all(
        serializedSignedTxs.map(
            async item => await web3.eth.sendSignedTransaction('0x' + item.toString('hex'))
        )
    )

    // for (let i = 0; i < serializedSignedTxs.length; i++) {
    //     console.log(i)
    //     // web3.eth.sendSignedTransaction('0x' + serializedSignedTxs[i].toString('hex'))
    //     console.log(serializedSignedTxs[i])
    // }

    // const loopNumber = serializedSignedTxs.length / 50

    // for (let i = 0; i < loopNumber; i++) {
    //     await Promise.all(
    //         serializedSignedTxs.slice(i*50, (i+1)*50).map(
    //             async item => await web3.eth.sendSignedTransaction('0x' + item.toString('hex'))
    //         )
    //     )
    //     console.log(i+1, "/", loopNumber)
    // }
}

const main1 = async () => {
    // const currentBlockHeight = await web3.eth.getBlockNumber()
    // for (let i = currentBlockHeight; i > currentBlockHeight - 1000; i--) {
    //     const txCount = await web3.eth.getBlockTransactionCount(i)
    //     if (txCount > 0) {
    //         console.log(i, txCount)
    //     }
    // }
    let txSum = 0;
    for (let i = 150618; i > 150078; i--) {
        const txCount = await web3.eth.getBlockTransactionCount(i)
        if (txCount > 0) {
            txSum += txCount
            console.log(i, txCount)
        }
    }
    console.log(txSum)
}

const main2 = async () => {
    console.log(await web3.eth.getPendingTransactions())
}
// main2()

// main1()

main()
