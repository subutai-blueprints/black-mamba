var MarketMaker = artifacts.require("./MarketMaker.sol");
module.exports = function(deployer) {
deployer.deploy(MarketMaker);
};