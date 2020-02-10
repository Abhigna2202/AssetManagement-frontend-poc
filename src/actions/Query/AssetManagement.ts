import Web3 from 'web3'
const Manager = require('../../contracts/Manager.json')
// const Manager = require('../../contracts/InvestmentManager.json')


const provider = new Web3.providers.HttpProvider(
  'https://kovan.infura.io/v3/9f8dc888a7c845789d89379aed6be307',
)
let web3 = new Web3()
web3.setProvider(provider)
const ManagerConAddress = Manager.networks[42].address
let managerContract = new web3.eth.Contract(
  Manager.abi,
  ManagerConAddress,
)

export const getAssetPrice = async (stock_key: string) => {
  const actualAssetPrice = await managerContract.methods
    .query(stock_key)
    .call({ value: web3.utils.toHex(1000000000000000) })
  return actualAssetPrice
}

export const getAccountBalance = async (ethInstance: any) => {
  return web3.eth.getBalance(ethInstance.selectedAddress)
}

export const getAssetPortfolio = async (ethInstance: any) => {
  const assetPortfolio = await managerContract.methods.getAssetPortfolio().call({ from: ethInstance.selectedAddress })
  return assetPortfolio
}

export const getTransactionsHistory = async (ethInstance: any) => {
  const transactionsHistory = await managerContract.methods.getTransactionsHistory().call({ from: ethInstance.selectedAddress })
  return transactionsHistory
}

export const getContractBalance = async (ethInstance: any) => {
  const bal = await managerContract.methods.getContractBalance().call({ from: ethInstance.selectedAddress })
  return bal
}

export const getInvestmentAccount = async (ethInstance: any) => {
  const conAddr = await managerContract.methods.getInvestmentAccount().call({ from: ethInstance.selectedAddress })
  return conAddr
}

export const createInvestmentAccount = async (ethInstance: any) => {
  const dataHex = managerContract.methods.createInvestmentAccount().encodeABI();
  const receipt = await sendTransaction(ethInstance, dataHex, 0,ManagerConAddress)
  return receipt
}

export const buyAssets = async (NumberOfUnits: string, stock_key: string, amount: string, ethInstance: any) => {
  const amountInt = parseInt(amount)
  const dataHex = managerContract.methods.buyAssets(NumberOfUnits, stock_key, amount).encodeABI();
  const receipt = await sendTransaction(ethInstance, dataHex, amountInt,ManagerConAddress)
  return receipt

}

export const sellAssets = async (NumberOfUnits: string, stock_key: string, amount: any, ethInstance: any) => {
  const dataHex = managerContract.methods.sellAssets(NumberOfUnits, stock_key, amount).encodeABI();
  const receipt = await sendTransaction(ethInstance, dataHex,0,ManagerConAddress )
  return receipt
}


export const sendTransaction = async (ethInstance: any, dataHex: any, amount: number, address: any) => {
  let nonce = web3.utils.toHex(
    await web3.eth.getTransactionCount(ethInstance.selectedAddress, 'pending'),
  )
  let gasPrice = web3.utils.toHex(await web3.eth.getGasPrice())
  let gasLimitHex = web3.utils.toHex(10000000)
  let transactionParams = {
    nonce: nonce,
    gasPrice: gasPrice,
    gasLimit: gasLimitHex,
    to: address,
    from: ethInstance.selectedAddress,
    value: web3.utils.toHex(amount), //wei
    data: dataHex,
  }
  console.log('========transactionParams====', transactionParams)
  console.warn({ ethInstance })
  let receipt = ethInstance.sendAsync({
    method: 'eth_sendTransaction',
    params: [transactionParams],
    from: ethInstance.selectedAddress
  })
  return receipt;
}
