const Web3 = require('web3')
//const CryptoUtils = require('crypto-utils');
const { readFileSync } = require('fs')
const LoomTruffleProvider = require('loom-truffle-provider')

const chainId    = 'default'
const writeUrl   = 'http://127.0.0.1:46658/rpc'
const readUrl    = 'http://127.0.0.1:46658/query'
const privateKey1 = readFileSync('./priv_key', 'utf-8')

contract('EIP20', (accounts) => {

  it('connect to private network', async () => {

  var web3 = new Web3('http://192.168.88.66:8501');
  console.log(web3.eth.accounts);
}

// it('Show account list', async () => {

 //   const loomTruffleProvider = new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey1);

  //  loomTruffleProvider.createExtraAccounts(10);
 // });

//   it('Show account list', async () => {

//     const loomTruffleProvider = new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey1);
//     const loomProvider = loomTruffleProvider.getProviderEngine();

//     //const loomTruffleProvider = new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey)
//     //loomTruffleProvider.createExtraAccounts(5);

//     console.log("Accounts list", loomProvider.accountsAddrList)
//   });


//   it('web3 test', async () => {

//     const privateKey = privateKey1;
//     const from =  '0xcf405fa439ad5aba77b94b48b83249b41b6aa5a1';
//     const loomTruffleProvider = new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey1);
//     const loomProvider = loomTruffleProvider.getProviderEngine();
//     const web3 = new Web3(loomProvider);
//     const ABI=[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeSub","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeDiv","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeMul","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeAdd","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"data","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"tokenAddress","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];
//     const contractAddress = '0x20bb0b7adfc654e4ac3c79e5429a8164b8728ceb';
//     const contract = new web3.eth.Contract(ABI, contractAddress, {from});
//     const symbol = await contract.methods.symbol().call();
//     const name = await contract.methods.name().call();
//     const totalSupply = await contract.methods.totalSupply().call();

//     console.log('name: ' + name);
//     console.log('symbol: ' + symbol);
//     console.log('totalSupply: ' + totalSupply);

//     const balance = await contract.methods.balanceOf('0xcf405fa439ad5aba77b94b48b83249b41b6aa5a1').call();
//     const balance1 = await contract.methods.balanceOf('0xc9c91ca1fc67e1ba0e217b2dc0338b5d951d8aaf').call();
//     const balance2 = await contract.methods.balanceOf('0xa46013248f9934f0ff2d5a8271a04d083636513d').call();

//     console.log('0xcf405fa439ad5aba77b94b48b83249b41b6aa5a1: ' + balance + ' GW');
//     console.log('0xc9c91ca1fc67e1ba0e217b2dc0338b5d951d8aaf: ' + balance1 + ' GW');
//     console.log('0xa46013248f9934f0ff2d5a8271a04d083636513d: ' + balance2 + ' GW');


// //    await contract.methods.transfer('0xc9c91ca1fc67e1ba0e217b2dc0338b5d951d8aaf', 1000000 ).send();
//   //  const balance3 = await contract.methods.balanceOf('0xc9c91ca1fc67e1ba0e217b2dc0338b5d951d8aaf').call();

//     //console.log('0xc9c91ca1fc67e1ba0e217b2dc0338b5d951d8aaf: ' + balance3 + ' GW');
//   });

});



