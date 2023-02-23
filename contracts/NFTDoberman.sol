// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTDoberman is ERC721, Ownable {
    constructor() ERC721("Doberman", "DBM") {}

    mapping(uint256 => string) private _uri;

    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }

    function setTokenURI(uint256 tokenId, string uri) public {
        _uri[tokenId] = uri;
    }

    function tokenURI(uint256 tokenId) public override returns(string memory) {
        return _uri[tokenId];
    }
}
