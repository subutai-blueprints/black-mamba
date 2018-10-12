var MarketMaker = artifacts.require("./MarketMaker.sol");
var fs = require('fs');

module.exports = function(deployer) {
   deployer.deploy(MarketMaker).then(() => fs.writeFile("/tmp/marketmaker", MarketMaker.address));
};