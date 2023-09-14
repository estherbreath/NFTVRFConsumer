const { ethers } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();

  const myNFT = await ethers.deployContract("MyNFTVRF", [process.env.VRF_COORDINATOR,
    process.env.LINK_TOKEN,
    process.env.KEY_HASH,
    ethers.parseEther("0.001")]);

    await myNFT.waitForDeployment();

  console.log('MyNFT contract deployed to:', myNFT.target);

  await ethers.myNFT._mint("0x77aC3a62c12333DD9604f8D5cD6E350Cd33D04b4", "1")

  // Mint NFTs here using myNFT.mint()

  //  function requestRandomness() external onlyOwner {
    //     // Generate a random number using Chainlink VRF
    //     bytes32 requestId = requestRandomness(keyHash, fee);
    // }

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });