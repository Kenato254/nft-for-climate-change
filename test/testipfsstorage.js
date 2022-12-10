const Deploy = require("../scripts/ipfs_helper.js");
const ID = require("../scripts/constants.js");


function hello() {
    return "Hello World!";
}

console.assert(hello()=="Hello World!");
let ipfs = new Deploy.IPFS(ID.CONSTANTS.ProjectID);
//ipfs.addToIpfs("/home/kennedy/Pictures/Wallpapers/Rust_programming_language_black_logo.svg.png");
// ipfs.getPinned("QmbAnco6cYmo6vz9HQwgWZ2B83pgHRMGjfPB27JNufYuEe");
ipfs.getPinnedList();
// ipfs.getGetway("Qmcvz5HL6ZSK9NLk4PLxj46nRzfyWWTF5Xy1JbCMKG6t3G");
console.log(Deploy.IPFS);
