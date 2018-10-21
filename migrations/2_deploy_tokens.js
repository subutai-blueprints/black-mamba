var ERC20GwToken = artifacts.require("./contracts/ERC20GwToken.sol");
var ERC20KhanToken = artifacts.require("./contracts/ERC20KhanToken.sol");
var MarketMaker = artifacts.require("./contracts/MarketMaker.sol");
var fs = require('fs');

module.exports = function(deployer) {
   deployer.deploy(ERC20GwToken).then(function() {
    return deployer.deploy(ERC20KhanToken).then(function() { 
        return deployer.deploy(MarketMaker,ERC20KhanToken.address, ERC20GwToken.address ).then(() => fs.writeFile("src/marketmaker.js",
        'import  web3 from \'./web3\';\n' +
        'const address = ' + "\'" + MarketMaker.address + "\';"+ "\n" +
        'const abi='+JSON.stringify(MarketMaker.abi) + "; \n" + 
        'export default  new  web3.eth.Contract(abi, address);'));
    });
   });
};