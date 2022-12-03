var ClimateToken = artifacts.require("./ClimateNFT.sol");

var IMAGE_URI = "/home/kennedy/Pictures/Personal-Images/IMG_2533.jpg";
var TOKEN_NAME = "AfterChurchToken";
var SYMBOL = "ACT";

module.exports = function(deployer) {
  deployer.deploy(ClimateToken, IMAGE_URI, TOKEN_NAME, SYMBOL);
};
