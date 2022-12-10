const ClimateToken = artifacts.require("./ClimateNFT.sol");

var BASE_URI = "ipfs://";
var TOKEN_NAME = "ClimateChangeToken";
var SYMBOL = "CCT";

module.exports = function(deployer) {
  deployer.deploy(ClimateToken, BASE_URI, TOKEN_NAME, SYMBOL);
};
