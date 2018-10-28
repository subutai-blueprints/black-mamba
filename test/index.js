const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
var fs = require('fs');

var marketMakerJson = JSON.parse(fs.readFileSync('build/contracts/MarketMaker.json', 'utf8'));
var khanJson = JSON.parse(fs.readFileSync('build/contracts/ERC20KhanToken.json', 'utf8'));
var gwJson = JSON.parse(fs.readFileSync('build/contracts/ERC20GwToken.json', 'utf8'));

let localMarketMaker;
let localKhanToken;
let localGwToken;
let accounts;

describe("Market maker contract tests", async function() {
  before(async function() {
    
    //get ganache account list
    accounts = await web3.eth.getAccounts();

    //deploy Khan token
    localKhanToken = await new web3.eth.Contract(khanJson.abi)
    .deploy({data: khanJson.bytecode})
    .send({from: accounts[0], gas: 1000000});
  
    //deploy GW token
    localGwToken = await new web3.eth.Contract(gwJson.abi)
    .deploy({data: gwJson.bytecode})
    .send({from: accounts[0], gas: 1000000});
  
    //deploy Market maker contract
    localMarketMaker = await new web3.eth.Contract(marketMakerJson.abi)
    .deploy({data: marketMakerJson.bytecode, arguments: [localKhanToken.options.address,localGwToken.options.address] })
    .send({from: accounts[0], gas: 1000000});
  });

  it( "verify token addresses", async function() {
    
    const khAddr =  await localMarketMaker.methods.khanAddress().call();
    const gwAddr =  await localMarketMaker.methods.gwAddress().call();
    
    assert.equal(khAddr, localKhanToken.options.address);
    assert.equal(gwAddr, localGwToken.options.address);
  });

});