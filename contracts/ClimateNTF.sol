//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ClimateNFT is ERC721, Ownable {
    using SafeMath for uint256;
    using Counters for Counters.Counter;

    constructor(string memory baseUrl, string memory name, string memory symbol)
        ERC721(name, symbol)
    {
        _setBaseUrl(baseUrl);
    }

    Counters.Counter private _tokenIds;

    string _baseUrl;

    struct CToken {
        uint256 tokenId;
        string ipfsHash;
        string tokenName;
        string tokenUrl;
        address owner;
    }

    CToken[] public allTokens;

    mapping(address => CToken[]) public userTokens;

    mapping(string => bool) private mintedToken;

    function _setBaseUrl(string memory baseUrl) private onlyOwner {
        _baseUrl = baseUrl;
    }

    function getAllToken() public view returns (CToken[] memory) {
        return allTokens;
    }

    function getUserToken() public view returns (CToken[] memory) {
        return userTokens[msg.sender];
    }

    // Mint new token and update the list
    function mintCToken(
        string memory _tokenName,
        string memory _ipfsHash
    ) public payable {
        require(!mintedToken[_ipfsHash], "This token exist!");

        uint256 _tokenId = _tokenIds.current();
        _safeMint(msg.sender, _tokenId);
        _tokenIds.increment();

        string memory _tokenUrl = string(abi.encodePacked(_baseUrl, _ipfsHash));

        CToken memory token = CToken({
            tokenId: _tokenId,
            ipfsHash: _ipfsHash,
            tokenName: _tokenName,
            tokenUrl: _tokenUrl,
            owner: msg.sender
        });

        mintedToken[_ipfsHash] = true;
        userTokens[msg.sender].push(token);
        allTokens.push(token);
    }
}
