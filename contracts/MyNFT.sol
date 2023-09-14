// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
contract MyNFTVRF is ERC721Enumerable, VRFConsumerBase, Ownable {
    // Chainlink VRF variables
    bytes32 internal keyHash;
    uint256 internal fee;

    // NFT traits
    struct Traits {
        uint256 energy;
        uint256 speed;
        uint256 strength;
        uint256 mysticalPowers;
        uint256 specialSkills;
        uint256 backgroundStory;
    }

    // Mapping from token ID to traits
    mapping(uint256 => Traits) public tokenIdToTraits;

    constructor(
        address _vrfCoordinator,
        address _linkToken,
        bytes32 _keyHash,
        uint256 _fee
    )
        ERC721("MyNFT", "NFT")
        VRFConsumerBase(_vrfCoordinator, _linkToken)
    {
        keyHash = _keyHash;
        fee = _fee;
    }

    // Mint function
    function mint() external {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK");
        require(LINK.transferAndCall(address(this), fee, bytes("")), "LINK transfer failed");
    }

    // Chainlink VRF callback function
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        uint256 tokenId = totalSupply() + 1;
        uint256 energy = randomness % 101;
        uint256 speed = (randomness >> 8) % 101;
        uint256 strength = randomness % 100;
        uint256 mysticalPowers = randomness % 105;
        uint256 specialSkills = randomness % 108;
        uint256 backgroundStory = randomness % 100;

        Traits memory newTraits = Traits(energy, speed, strength,mysticalPowers,specialSkills,backgroundStory);
        tokenIdToTraits[tokenId] = newTraits;

        _mint(msg.sender, tokenId);
    }
}
