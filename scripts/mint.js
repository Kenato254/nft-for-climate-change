/*
  You can use this script to quickly manually mintNFTs. To do so:
  Run `truffle exec ./scripts/mint.js`
  If you want to mint more than one NFT, just pass in the number
 */
var ClimateNFT = artifacts.require("./ClimateNFT.sol");

function getErrorMessage(error) {
  if (error instanceof Error) return error.message
  return String(error)
}

const main = async (cb) => {
  try {
    const args = process.argv.slice(4);
    const climatenft = await ClimateNFT.deployed();
    // const PRICE = await climatenft.PRICE();
    // const txn = await climatenft.mintNFTs(numNfts, {value: numNfts * parseInt(PRICE.toString())});
    const txn =  await climatenft.mintCToken("my-token");
    console.log(txn);
  } catch(err) {
    console.log('Doh! ', getErrorMessage(err));
  }
  cb();
}

module.exports = main;