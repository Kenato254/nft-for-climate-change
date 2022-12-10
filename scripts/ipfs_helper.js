const Blockfrost = require("@blockfrost/blockfrost-js");
const CONSTANT = require("./constants");

class DeployOnIpfs {
  #IPFS;
  constructor(_projectId) {
    const ipfs = new Blockfrost.BlockFrostIPFS({
      projectId: _projectId, // see: https://blockfrost.io
    });
    this.#IPFS = ipfs;
  }

  async addToIpfs(__dirname) {
    try {
      const added = await this.#IPFS.add(`${__dirname}`);
      // console.log(added);
      return added;

    } catch (err) {
      console.log("error", err);
    }
  }

  async getPinned(path) {
    const pinned = await this.#IPFS.pin(path)
    console.log(pinned);
  }

  async getPinnedList() {
    const pinnedList = await this.#IPFS.list();
    console.log(pinnedList);
  }

  async removePinned(path) {
    const removed = await this.#IPFS.pinRemove(path=path);
    console.log(`Remove {path}`);  
  }

  async getGetway(path) {
    console.log(await this.#IPFS.gateway(path=path));
  }
}
exports.IPFS = DeployOnIpfs;

// let image = "/home/kennedy/Pictures/Wallpapers/Rust_programming_language_black_logo.svg.png";
let cont = CONSTANT.CONSTANTS.ProjectID;

const ipfs = new DeployOnIpfs(projectId=cont);
ipfs.getPinnedList();

// console.log(await ipfs.addToIpfs(image));
