const { ethers } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();

  const myNFT = await ethers.deployContract("MyNFTVRF", [process.env.VRF_COORDINATOR,
    process.env.LINK_TOKEN,
    process.env.KEY_HASH,
    ethers.parseEther("0.001")]);

    await myNFT.waitForDeployment();

  console.log('MyNFT contract deployed to:', myNFT.target);

  // Mint NFTs here using myNFT.mint()
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });