var ClimateToken = artifacts.require("./ClimateNFT.sol");

module.exports = function(deployer) {
  deployer.deploy(ClimateToken,"URI HERE","TOKEN NAME","SYMBOL");
};
