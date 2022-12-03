//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ClimateNFT is ERC721, Ownable {
    using SafeMath for uint256;
    using Counters for Counters.Counter;


    constructor(string memory baseURI, string memory name, string memory symbol) ERC721(name, symbol) {
        setBaseURI(baseURI);
    }

    Counters.Counter private _tokenIds;

    string public baseTokenURI;


    struct CToken {
        uint256 tokenId;
        string tokenName;
        address owner;
    }

    CToken[] public allTokens;

    mapping(address => CToken[]) public userTokens;

    function setBaseURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }
    function getAllToken() public view returns (CToken[] memory) {
        return allTokens;
    }

    function getUserToken() public view returns (CToken [] memory) {
        return userTokens[msg.sender];
    }

    // Mint new token and update the list
    function mintCToken() public payable {
        string memory _tokenName = "my-token";
        uint256 _tokenId = _tokenIds.current();
        _safeMint(msg.sender, _tokenId);
        _tokenIds.increment();


        CToken memory token = CToken({tokenId:_tokenId, tokenName:_tokenName, owner:msg.sender});
        userTokens[msg.sender].push(token);

        allTokens.push(token);
    }
}

