const Web3 = require('web3')
const address = '0xe3ac041517c68ac94f5e0e3ef3c43eb4eb9928db';
const abi=[{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"inputToken","type":"uint256"},{"indexed":false,"name":"outputToken","type":"uint256"},{"indexed":false,"name":"fromToken","type":"string"},{"indexed":false,"name":"toToken","type":"string"}],"name":"exchange","type":"event"},{"constant":false,"inputs":[{"name":"gwAmount","type":"uint256"}],"name":"exchangeGWtoKHAN","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"khanAmount","type":"uint256"}],"name":"exchangeKHANtoGW","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[],"name":"getGWAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getKHANAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getMarketMakerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"GW","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"KHAN","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}];

async function start() {

    console.log('starting ...');

var mainWeb3 = new Web3( new Web3.providers.WebsocketProvider( "ws://85.93.89.128:9898" ));

var mainKhanContract = new mainWeb3.eth.Contract( abi, address );

await mainKhanContract.events.exchange({
    fromBlock: 0,
    toBlock: 'latest'
  }, async ( err, event ) => {

    const tnxHash = event.transactionHash + "";
    const to=event.returnValues.from;
    const tokens= event.returnValues.tokens ;

    console.log( " tnxHash: " + tnxHash + " from : " +  to  +  " amount: " +  tokens );
  });

  console.log('startEd ...');

}
start();